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

// Initialize data
function initializeData() {
  if (!fs.existsSync(DATA_FILE)) {
    const initial = { users: {}, predictions: {}, results: {}, knockoutSelections: {} };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2));
  }
}

function readData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return { users: {}, predictions: {}, results: {}, knockoutSelections: {} };
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  return true;
}

// Scoring
const SCORING = {
  EXACT: 2, WINNER: 3, TEAM_GOALS: 1, DIFF: 1,
  CHAMPION: 18, RUNNERUP: 15, THIRD: 12
};

// ============ AUTH ============
app.post('/api/register', (req, res) => {
  const { name, pin, adminCode } = req.body;
  const data = readData();
  
  if (Object.values(data.users).find(u => u.name.toLowerCase() === name.toLowerCase())) {
    return res.status(400).json({ success: false, error: 'Nombre ya registrado' });
  }
  
  const userId = 'user_' + Date.now();
  data.users[userId] = { id: userId, name, pin, isAdmin: adminCode === 'ADMIN2026', createdAt: new Date().toISOString() };
  data.predictions[userId] = {};
  
  if (writeData(data)) {
    res.json({ success: true, userId, isAdmin: data.users[userId].isAdmin });
  } else {
    res.status(500).json({ success: false, error: 'Error al guardar' });
  }
});

app.post('/api/login', (req, res) => {
  const { name, pin } = req.body;
  const data = readData();
  
  const user = Object.values(data.users).find(u => u.name.toLowerCase() === name.toLowerCase() && u.pin === pin);
  
  if (user) {
    res.json({ success: true, userId: user.id, isAdmin: user.isAdmin });
  } else {
    res.status(401).json({ success: false, error: 'Nombre o PIN incorrecto' });
  }
});

app.get('/api/users', (req, res) => {
  res.json(readData().users);
});

// ============ PREDICTIONS ============
app.get('/api/predictions', (req, res) => {
  res.json(readData().predictions);
});

app.post('/api/predictions/:userId', (req, res) => {
  const { matchId, team, value } = req.body;
  const data = readData();
  const userId = req.params.userId;
  
  if (!data.predictions[userId]) data.predictions[userId] = {};
  if (!data.predictions[userId][matchId]) data.predictions[userId][matchId] = {};
  data.predictions[userId][matchId][team] = parseInt(value) || 0;
  
  if (writeData(data)) res.json({ success: true });
  else res.status(500).json({ success: false });
});

app.post('/api/predictions/:userId/bulk', (req, res) => {
  const predictions = req.body;
  const data = readData();
  data.predictions[req.params.userId] = { ...data.predictions[req.params.userId], ...predictions };
  writeData(data) ? res.json({ success: true }) : res.status(500).json({ success: false });
});

// ============ RESULTS ============
app.get('/api/results', (req, res) => {
  res.json(readData().results);
});

app.post('/api/results', (req, res) => {
  const { matchId, team1Score, team2Score } = req.body;
  const data = readData();
  data.results[matchId] = { team1Score, team2Score, status: 'completed', timestamp: new Date().toISOString() };
  writeData(data) ? res.json({ success: true }) : res.status(500).json({ success: false });
});

// ============ SCORES ============
app.get('/api/scores', (req, res) => {
  const data = readData();
  const scores = {};
  
  const MATCHES = require('./matches');
  
  Object.keys(data.users).forEach(userId => {
    let total = 0, exact = 0, winners = 0, teamGoals = 0;
    
    Object.entries(data.results).forEach(([matchId, result]) => {
      const pred = data.predictions[userId]?.[matchId];
      if (!pred) return;
      
      const p1 = pred.team1Score ?? -1;
      const p2 = pred.team2Score ?? -1;
      const r1 = result.team1Score;
      const r2 = result.team2Score;
      
      if (p1 < 0) return;
      
      // Exact score: 2 pts
      if (p1 === r1 && p2 === r2) { total += 2; exact++; }
      
      // Correct winner: 3 pts
      const pd = p1 - p2, rd = r1 - r2;
      if ((pd > 0 && rd > 0) || (pd < 0 && rd < 0) || (pd === 0 && rd === 0)) {
        total += 3; winners++;
      }
      
      // Team goals: 1 pt each
      if (p1 === r1) { total += 1; teamGoals++; }
      if (p2 === r2) { total += 1; teamGoals++; }
      
      // Difference: 1 pt
      if (pd === rd) total += 1;
    });
    
    scores[userId] = { total, exact, winners, teamGoals };
  });
  
  res.json(scores);
});

// ============ RESET ============
app.post('/api/reset', (req, res) => {
  writeData({ users: {}, predictions: {}, results: {}, knockoutSelections: {} });
  res.json({ success: true });
});

// ============ SERVE FRONTEND ============
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/index.html', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// Start
initializeData();
app.listen(PORT, '0.0.0.0', () => {
  console.log('⚽ POLLA MUNDIAL 2026 - Servidor activo en puerto ' + PORT);
});