const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Initialize data file if it doesn't exist
function initializeData() {
  if (!fs.existsSync(DATA_FILE)) {
    const initialData = {
      users: {},
      predictions: {},
      knockoutSelections: {},
      realResults: {},
      knockoutResults: {}
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
  }
}

// Read data from file
function readData() {
  try {
    const content = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error reading data:', error);
    return { users: {}, predictions: {}, knockoutSelections: {}, realResults: {}, knockoutResults: {} };
  }
}

// Write data to file
function writeData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing data:', error);
    return false;
  }
}

// Scoring configuration
const SCORING = {
  EXACT_SCORE: 2,        // Marcador exacto
  CORRECT_WINNER: 3,     // Acertar ganador
  CORRECT_TEAM_GOALS: 1, // Acertar goles de un equipo
  CORRECT_GOAL_DIFF: 1,  // Acertar diferencia de gol
  CHAMPION_BONUS: 18,    // Campeón exacto
  RUNNERUP_BONUS: 15,    // Subcampeón exacto
  THIRD_PLACE_BONUS: 12  // Tercer lugar exacto
};

// ============ AUTH ROUTES ============

// Register new user
app.post('/api/register', (req, res) => {
  const { name, pin, adminCode } = req.body;
  const data = readData();
  
  const existingUser = Object.values(data.users).find(u => 
    u.name.toLowerCase() === name.toLowerCase()
  );
  
  if (existingUser) {
    return res.status(400).json({ success: false, error: 'Nombre ya registrado' });
  }
  
  const userId = 'user_' + Date.now();
  const isAdmin = adminCode === 'ADMIN2026';
  
  data.users[userId] = {
    id: userId,
    name: name,
    pin: pin,
    isAdmin: isAdmin,
    createdAt: new Date().toISOString()
  };
  
  data.predictions[userId] = {};
  data.knockoutSelections[userId] = {};
  
  if (writeData(data)) {
    res.json({ success: true, userId, isAdmin });
  } else {
    res.status(500).json({ success: false, error: 'Error al guardar' });
  }
});

// Login
app.post('/api/login', (req, res) => {
  const { name, pin } = req.body;
  const data = readData();
  
  const user = Object.values(data.users).find(u => 
    u.name.toLowerCase() === name.toLowerCase() && u.pin === pin
  );
  
  if (user) {
    res.json({ success: true, userId: user.id, isAdmin: user.isAdmin });
  } else {
    res.status(401).json({ success: false, error: 'Nombre o PIN incorrecto' });
  }
});

// Get all users
app.get('/api/users', (req, res) => {
  const data = readData();
  res.json(data.users);
});

// ============ PREDICTIONS ROUTES ============

app.get('/api/predictions', (req, res) => {
  const data = readData();
  res.json(data.predictions);
});

app.get('/api/predictions/:userId', (req, res) => {
  const data = readData();
  res.json(data.predictions[req.params.userId] || {});
});

app.post('/api/predictions/:userId', (req, res) => {
  const { matchId, team, value } = req.body;
  const data = readData();
  const userId = req.params.userId;
  
  if (!data.predictions[userId]) {
    data.predictions[userId] = {};
  }
  
  if (!data.predictions[userId][matchId]) {
    data.predictions[userId][matchId] = {};
  }
  
  data.predictions[userId][matchId][team] = parseInt(value) || 0;
  
  if (writeData(data)) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false, error: 'Error al guardar' });
  }
});

app.post('/api/predictions/:userId/bulk', (req, res) => {
  const predictions = req.body;
  const data = readData();
  const userId = req.params.userId;
  
  data.predictions[userId] = { ...data.predictions[userId], ...predictions };
  
  if (writeData(data)) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false, error: 'Error al guardar' });
  }
});

// ============ KNOCKOUT SELECTIONS ============

app.get('/api/knockout/:userId', (req, res) => {
  const data = readData();
  res.json(data.knockoutSelections[req.params.userId] || {});
});

app.post('/api/knockout/:userId', (req, res) => {
  const { matchId, teamId } = req.body;
  const data = readData();
  const userId = req.params.userId;
  
  if (!data.knockoutSelections[userId]) {
    data.knockoutSelections[userId] = {};
  }
  
  data.knockoutSelections[userId][matchId] = teamId;
  
  if (writeData(data)) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false, error: 'Error al guardar' });
  }
});

// ============ REAL RESULTS ============

app.get('/api/results', (req, res) => {
  const data = readData();
  res.json(data.realResults);
});

app.post('/api/results', (req, res) => {
  const { matchId, team1Score, team2Score, winner } = req.body;
  const data = readData();
  
  data.realResults[matchId] = {
    team1Score,
    team2Score,
    status: 'completed',
    winner,
    timestamp: new Date().toISOString()
  };
  
  if (writeData(data)) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false, error: 'Error al guardar' });
  }
});

app.delete('/api/results/:matchId', (req, res) => {
  const data = readData();
  delete data.realResults[req.params.matchId];
  
  if (writeData(data)) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false, error: 'Error al guardar' });
  }
});

// ============ SCORING CALCULATION ============

function calculateMatchScore(prediction, result) {
  if (!prediction || !result || result.status !== 'completed') {
    return { points: 0, details: {} };
  }

  const predTeam1 = prediction.team1Score ?? -1;
  const predTeam2 = prediction.team2Score ?? -1;
  const realTeam1 = result.team1Score;
  const realTeam2 = result.team2Score;

  let points = 0;
  const details = {
    exactScore: false,
    correctWinner: false,
    correctTeam1Goals: false,
    correctTeam2Goals: false,
    correctGoalDiff: false
  };

  // Check if prediction is valid
  if (predTeam1 < 0 || predTeam2 < 0) {
    return { points: 0, details };
  }

  // 1. Exact score: 2 points
  if (predTeam1 === realTeam1 && predTeam2 === realTeam2) {
    points += SCORING.EXACT_SCORE;
    details.exactScore = true;
  }

  // 2. Correct winner: 3 points
  const realDiff = realTeam1 - realTeam2;
  const predDiff = predTeam1 - predTeam2;
  
  if (realDiff > 0 && predDiff > 0) {
    // Team 1 wins
    points += SCORING.CORRECT_WINNER;
    details.correctWinner = true;
  } else if (realDiff < 0 && predDiff < 0) {
    // Team 2 wins
    points += SCORING.CORRECT_WINNER;
    details.correctWinner = true;
  } else if (realDiff === 0 && predDiff === 0) {
    // Draw
    points += SCORING.CORRECT_WINNER;
    details.correctWinner = true;
  }

  // 3. Correct goals for each team: 1 point each
  if (predTeam1 === realTeam1) {
    points += SCORING.CORRECT_TEAM_GOALS;
    details.correctTeam1Goals = true;
  }
  if (predTeam2 === realTeam2) {
    points += SCORING.CORRECT_TEAM_GOALS;
    details.correctTeam2Goals = true;
  }

  // 4. Correct goal difference: 1 point
  if (predDiff === realDiff) {
    points += SCORING.CORRECT_GOAL_DIFF;
    details.correctGoalDiff = true;
  }

  return { points, details };
}

// ============ STATS ============

app.get('/api/scores', (req, res) => {
  const data = readData();
  const scores = {};
  
  // Import matches data
  const MATCHES = require('./matches');
  
  // Group matches
  const groupMatches = MATCHES.filter(m => m.phase === 'groups');
  const knockoutMatches = MATCHES.filter(m => m.phase !== 'groups');
  
  Object.keys(data.users).forEach(userId => {
    let total = 0;
    let exactMatches = 0;
    let correctWinners = 0;
    let correctTeamGoals = 0;
    let correctGoalDiffs = 0;
    let bonusPoints = 0;
    const matchDetails = [];

    // Score all matches (groups + knockout)
    const allMatches = [...groupMatches, ...knockoutMatches];
    
    allMatches.forEach(match => {
      const pred = data.predictions[userId]?.[match.id];
      const result = data.realResults[match.id];
      
      if (result && result.status === 'completed') {
        const { points, details } = calculateMatchScore(pred, result);
        total += points;
        
        if (details.exactScore) exactMatches++;
        if (details.correctWinner) correctWinners++;
        if (details.correctTeam1Goals || details.correctTeam2Goals) correctTeamGoals++;
        if (details.correctGoalDiff) correctGoalDiffs++;
        
        if (points > 0) {
          matchDetails.push({ matchId: match.id, points, phase: match.phase });
        }
      }
    });

    // Bonus for final positions (Champion, Runner-up, Third place)
    const finalMatch = MATCHES.find(m => m.id === 'FINAL');
    const thirdMatch = MATCHES.find(m => m.id === '3RD');
    const semiMatches = MATCHES.filter(m => m.phase === 'semis');
    
    // Champion bonus: 18 points
    if (finalMatch) {
      const finalResult = data.realResults[finalMatch.id];
      if (finalResult?.winner) {
        const userChampion = data.knockoutSelections[userId]?.[finalMatch.id];
        if (userChampion === finalResult.winner) {
          total += SCORING.CHAMPION_BONUS;
          bonusPoints += SCORING.CHAMPION_BONUS;
        }
      }
    }

    // Runner-up bonus: 15 points
    if (finalMatch) {
      const finalResult = data.realResults[finalMatch.id];
      if (finalResult?.winner) {
        const userSelection = data.knockoutSelections[userId]?.[finalMatch.id];
        // Runner-up is the loser of the final
        const team1 = finalMatch.team1;
        const team2 = finalMatch.team2;
        const runnerUp = userSelection === team1 ? team2 : team1;
        
        // We need to check both semifinal results to determine who lost the final
        semiMatches.forEach(semi => {
          const semiResult = data.realResults[semi.id];
          if (semiResult?.winner) {
            // The winner of each semi goes to the final
            // The loser of the final is the runner-up
          }
        });
      }
    }

    // Third place bonus: 12 points
    if (thirdMatch) {
      const thirdResult = data.realResults[thirdMatch.id];
      if (thirdResult?.winner) {
        const userThird = data.knockoutSelections[userId]?.[thirdMatch.id];
        if (userThird === thirdResult.winner) {
          total += SCORING.THIRD_PLACE_BONUS;
          bonusPoints += SCORING.THIRD_PLACE_BONUS;
        }
      }
    }

    scores[userId] = {
      total,
      exactMatches,
      correctWinners,
      correctTeamGoals,
      correctGoalDiffs,
      bonusPoints,
      matchDetails
    };
  });
  
  res.json(scores);
});

// Get all data
app.get('/api/all', (req, res) => {
  const data = readData();
  res.json(data);
});

// Reset all data
app.post('/api/reset', (req, res) => {
  const initialData = {
    users: {},
    predictions: {},
    knockoutSelections: {},
    realResults: {},
    knockoutResults: {}
  };
  
  if (writeData(initialData)) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false, error: 'Error al resetear' });
  }
});

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
initializeData();
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   ⚽ POLLA MUNDIAL 2026 - Servidor activo                 ║
║                                                           ║
║   🌐 Accede desde cualquier dispositivo en la red:        ║
║                                                           ║
║   📱 En esta computadora: http://localhost:${PORT}              ║
║   💻 En otros dispositivos: http://[TU-IP]:${PORT}           ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});