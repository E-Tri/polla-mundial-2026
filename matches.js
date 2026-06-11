// Official World Cup 2026 Match Data
const MATCHES = [
  // === GROUP A (Jun 11, 15, 19) ===
  { id: 'G-A-1', team1: 'A1', team2: 'A4', date: '2026-06-11', time: '12:00', venue: 'Mexico City', phase: 'groups', group: 'A', matchNumber: 1 },
  { id: 'G-A-2', team1: 'A2', team2: 'A3', date: '2026-06-11', time: '18:00', venue: 'Guadalajara', phase: 'groups', group: 'A', matchNumber: 2 },
  { id: 'G-A-3', team1: 'A1', team2: 'A2', date: '2026-06-15', time: '12:00', venue: 'Mexico City', phase: 'groups', group: 'A', matchNumber: 3 },
  { id: 'G-A-4', team1: 'A3', team2: 'A4', date: '2026-06-15', time: '18:00', venue: 'Monterrey', phase: 'groups', group: 'A', matchNumber: 4 },
  { id: 'G-A-5', team1: 'A4', team2: 'A2', date: '2026-06-19', time: '12:00', venue: 'Guadalajara', phase: 'groups', group: 'A', matchNumber: 5 },
  { id: 'G-A-6', team1: 'A3', team2: 'A1', date: '2026-06-19', time: '18:00', venue: 'Mexico City', phase: 'groups', group: 'A', matchNumber: 6 },
  
  // === GROUP B (Jun 11, 15, 19) ===
  { id: 'G-B-1', team1: 'B1', team2: 'B3', date: '2026-06-11', time: '15:00', venue: 'Toronto', phase: 'groups', group: 'B', matchNumber: 7 },
  { id: 'G-B-2', team1: 'B2', team2: 'B4', date: '2026-06-11', time: '21:00', venue: 'Vancouver', phase: 'groups', group: 'B', matchNumber: 8 },
  { id: 'G-B-3', team1: 'B1', team2: 'B2', date: '2026-06-15', time: '15:00', venue: 'Toronto', phase: 'groups', group: 'B', matchNumber: 9 },
  { id: 'G-B-4', team1: 'B4', team2: 'B3', date: '2026-06-15', time: '21:00', venue: 'Seattle', phase: 'groups', group: 'B', matchNumber: 10 },
  { id: 'G-B-5', team1: 'B3', team2: 'B2', date: '2026-06-19', time: '15:00', venue: 'Seattle', phase: 'groups', group: 'B', matchNumber: 11 },
  { id: 'G-B-6', team1: 'B4', team2: 'B1', date: '2026-06-19', time: '21:00', venue: 'Toronto', phase: 'groups', group: 'B', matchNumber: 12 },
  
  // === GROUP C (Jun 12, 16, 20) ===
  { id: 'G-C-1', team1: 'C1', team2: 'C4', date: '2026-06-12', time: '12:00', venue: 'Inglewood', phase: 'groups', group: 'C', matchNumber: 13 },
  { id: 'G-C-2', team1: 'C2', team2: 'C3', date: '2026-06-12', time: '18:00', venue: 'Kansas City', phase: 'groups', group: 'C', matchNumber: 14 },
  { id: 'G-C-3', team1: 'C1', team2: 'C2', date: '2026-06-16', time: '12:00', venue: 'Inglewood', phase: 'groups', group: 'C', matchNumber: 15 },
  { id: 'G-C-4', team1: 'C3', team2: 'C4', date: '2026-06-16', time: '18:00', venue: 'Miami', phase: 'groups', group: 'C', matchNumber: 16 },
  { id: 'G-C-5', team1: 'C4', team2: 'C2', date: '2026-06-20', time: '12:00', venue: 'Miami', phase: 'groups', group: 'C', matchNumber: 17 },
  { id: 'G-C-6', team1: 'C3', team2: 'C1', date: '2026-06-20', time: '18:00', venue: 'Kansas City', phase: 'groups', group: 'C', matchNumber: 18 },
  
  // === GROUP D (Jun 12, 19, 25) ===
  { id: 'G-D-1', team1: 'D1', team2: 'D4', date: '2026-06-12', time: '15:00', venue: 'Inglewood', phase: 'groups', group: 'D', matchNumber: 19 },
  { id: 'G-D-2', team1: 'D2', team2: 'D3', date: '2026-06-12', time: '21:00', venue: 'Philadelphia', phase: 'groups', group: 'D', matchNumber: 20 },
  { id: 'G-D-3', team1: 'D1', team2: 'D2', date: '2026-06-19', time: '15:00', venue: 'Inglewood', phase: 'groups', group: 'D', matchNumber: 21 },
  { id: 'G-D-4', team1: 'D3', team2: 'D4', date: '2026-06-19', time: '21:00', venue: 'Seattle', phase: 'groups', group: 'D', matchNumber: 22 },
  { id: 'G-D-5', team1: 'D4', team2: 'D3', date: '2026-06-25', time: '15:00', venue: 'Seattle', phase: 'groups', group: 'D', matchNumber: 23 },
  { id: 'G-D-6', team1: 'D2', team2: 'D1', date: '2026-06-25', time: '21:00', venue: 'Inglewood', phase: 'groups', group: 'D', matchNumber: 24 },
  
  // === GROUP E (Jun 13, 17, 21) ===
  { id: 'G-E-1', team1: 'E1', team2: 'E4', date: '2026-06-13', time: '12:00', venue: 'Dallas', phase: 'groups', group: 'E', matchNumber: 25 },
  { id: 'G-E-2', team1: 'E2', team2: 'E3', date: '2026-06-13', time: '18:00', venue: 'Houston', phase: 'groups', group: 'E', matchNumber: 26 },
  { id: 'G-E-3', team1: 'E1', team2: 'E2', date: '2026-06-17', time: '12:00', venue: 'Dallas', phase: 'groups', group: 'E', matchNumber: 27 },
  { id: 'G-E-4', team1: 'E3', team2: 'E4', date: '2026-06-17', time: '18:00', venue: 'San Antonio', phase: 'groups', group: 'E', matchNumber: 28 },
  { id: 'G-E-5', team1: 'E4', team2: 'E2', date: '2026-06-21', time: '12:00', venue: 'San Antonio', phase: 'groups', group: 'E', matchNumber: 29 },
  { id: 'G-E-6', team1: 'E3', team2: 'E1', date: '2026-06-21', time: '18:00', venue: 'Houston', phase: 'groups', group: 'E', matchNumber: 30 },
  
  // === GROUP F (Jun 13, 17, 21) ===
  { id: 'G-F-1', team1: 'F1', team2: 'F4', date: '2026-06-13', time: '15:00', venue: 'New Jersey', phase: 'groups', group: 'F', matchNumber: 31 },
  { id: 'G-F-2', team1: 'F2', team2: 'F3', date: '2026-06-13', time: '21:00', venue: 'Boston', phase: 'groups', group: 'F', matchNumber: 32 },
  { id: 'G-F-3', team1: 'F1', team2: 'F2', date: '2026-06-17', time: '15:00', venue: 'New Jersey', phase: 'groups', group: 'F', matchNumber: 33 },
  { id: 'G-F-4', team1: 'F3', team2: 'F4', date: '2026-06-17', time: '21:00', venue: 'Miami', phase: 'groups', group: 'F', matchNumber: 34 },
  { id: 'G-F-5', team1: 'F4', team2: 'F2', date: '2026-06-21', time: '15:00', venue: 'Miami', phase: 'groups', group: 'F', matchNumber: 35 },
  { id: 'G-F-6', team1: 'F3', team2: 'F1', date: '2026-06-21', time: '21:00', venue: 'Boston', phase: 'groups', group: 'F', matchNumber: 36 },
  
  // === GROUP G (Jun 14, 18, 22) ===
  { id: 'G-G-1', team1: 'G1', team2: 'G4', date: '2026-06-14', time: '12:00', venue: 'Kansas City', phase: 'groups', group: 'G', matchNumber: 37 },
  { id: 'G-G-2', team1: 'G2', team2: 'G3', date: '2026-06-14', time: '18:00', venue: 'Inglewood', phase: 'groups', group: 'G', matchNumber: 38 },
  { id: 'G-G-3', team1: 'G1', team2: 'G2', date: '2026-06-18', time: '12:00', venue: 'Kansas City', phase: 'groups', group: 'G', matchNumber: 39 },
  { id: 'G-G-4', team1: 'G3', team2: 'G4', date: '2026-06-18', time: '18:00', venue: 'Philadelphia', phase: 'groups', group: 'G', matchNumber: 40 },
  { id: 'G-G-5', team1: 'G4', team2: 'G2', date: '2026-06-22', time: '12:00', venue: 'Philadelphia', phase: 'groups', group: 'G', matchNumber: 41 },
  { id: 'G-G-6', team1: 'G3', team2: 'G1', date: '2026-06-22', time: '18:00', venue: 'Inglewood', phase: 'groups', group: 'G', matchNumber: 42 },
  
  // === GROUP H (Jun 14, 18, 22) ===
  { id: 'G-H-1', team1: 'H1', team2: 'H4', date: '2026-06-14', time: '15:00', venue: 'Houston', phase: 'groups', group: 'H', matchNumber: 43 },
  { id: 'G-H-2', team1: 'H2', team2: 'H3', date: '2026-06-14', time: '21:00', venue: 'Dallas', phase: 'groups', group: 'H', matchNumber: 44 },
  { id: 'G-H-3', team1: 'H1', team2: 'H2', date: '2026-06-18', time: '15:00', venue: 'Houston', phase: 'groups', group: 'H', matchNumber: 45 },
  { id: 'G-H-4', team1: 'H3', team2: 'H4', date: '2026-06-18', time: '21:00', venue: 'San Antonio', phase: 'groups', group: 'H', matchNumber: 46 },
  { id: 'G-H-5', team1: 'H4', team2: 'H2', date: '2026-06-22', time: '15:00', venue: 'San Antonio', phase: 'groups', group: 'H', matchNumber: 47 },
  { id: 'G-H-6', team1: 'H3', team2: 'H1', date: '2026-06-22', time: '21:00', venue: 'Dallas', phase: 'groups', group: 'H', matchNumber: 48 },
  
  // === GROUP I (Jun 15, 19, 25) ===
  { id: 'G-I-1', team1: 'I1', team2: 'I4', date: '2026-06-15', time: '12:00', venue: 'Boston', phase: 'groups', group: 'I', matchNumber: 49 },
  { id: 'G-I-2', team1: 'I2', team2: 'I3', date: '2026-06-15', time: '18:00', venue: 'New Jersey', phase: 'groups', group: 'I', matchNumber: 50 },
  { id: 'G-I-3', team1: 'I1', team2: 'I2', date: '2026-06-19', time: '12:00', venue: 'Boston', phase: 'groups', group: 'I', matchNumber: 51 },
  { id: 'G-I-4', team1: 'I3', team2: 'I4', date: '2026-06-19', time: '18:00', venue: 'Vancouver', phase: 'groups', group: 'I', matchNumber: 52 },
  { id: 'G-I-5', team1: 'I4', team2: 'I3', date: '2026-06-25', time: '12:00', venue: 'Vancouver', phase: 'groups', group: 'I', matchNumber: 53 },
  { id: 'G-I-6', team1: 'I2', team2: 'I1', date: '2026-06-25', time: '18:00', venue: 'New Jersey', phase: 'groups', group: 'I', matchNumber: 54 },
  
  // === GROUP J (Jun 16, 20, 24) ===
  { id: 'G-J-1', team1: 'J1', team2: 'J4', date: '2026-06-16', time: '12:00', venue: 'Miami', phase: 'groups', group: 'J', matchNumber: 55 },
  { id: 'G-J-2', team1: 'J2', team2: 'J3', date: '2026-06-16', time: '18:00', venue: 'Philadelphia', phase: 'groups', group: 'J', matchNumber: 56 },
  { id: 'G-J-3', team1: 'J1', team2: 'J2', date: '2026-06-20', time: '12:00', venue: 'Miami', phase: 'groups', group: 'J', matchNumber: 57 },
  { id: 'G-J-4', team1: 'J3', team2: 'J4', date: '2026-06-20', time: '18:00', venue: 'Seattle', phase: 'groups', group: 'J', matchNumber: 58 },
  { id: 'G-J-5', team1: 'J4', team2: 'J3', date: '2026-06-24', time: '12:00', venue: 'Seattle', phase: 'groups', group: 'J', matchNumber: 59 },
  { id: 'G-J-6', team1: 'J2', team2: 'J1', date: '2026-06-24', time: '18:00', venue: 'Philadelphia', phase: 'groups', group: 'J', matchNumber: 60 },
  
  // === GROUP K (Jun 17, 21, 25) ===
  { id: 'G-K-1', team1: 'K1', team2: 'K4', date: '2026-06-17', time: '12:00', venue: 'New Jersey', phase: 'groups', group: 'K', matchNumber: 61 },
  { id: 'G-K-2', team1: 'K2', team2: 'K3', date: '2026-06-17', time: '18:00', venue: 'Inglewood', phase: 'groups', group: 'K', matchNumber: 62 },
  { id: 'G-K-3', team1: 'K1', team2: 'K2', date: '2026-06-21', time: '12:00', venue: 'New Jersey', phase: 'groups', group: 'K', matchNumber: 63 },
  { id: 'G-K-4', team1: 'K3', team2: 'K4', date: '2026-06-21', time: '18:00', venue: 'Toronto', phase: 'groups', group: 'K', matchNumber: 64 },
  { id: 'G-K-5', team1: 'K4', team2: 'K3', date: '2026-06-25', time: '12:00', venue: 'Toronto', phase: 'groups', group: 'K', matchNumber: 65 },
  { id: 'G-K-6', team1: 'K2', team2: 'K1', date: '2026-06-25', time: '18:00', venue: 'Inglewood', phase: 'groups', group: 'K', matchNumber: 66 },
  
  // === GROUP L (Jun 17, 21, 26) ===
  { id: 'G-L-1', team1: 'L1', team2: 'L4', date: '2026-06-17', time: '15:00', venue: 'Miami', phase: 'groups', group: 'L', matchNumber: 67 },
  { id: 'G-L-2', team1: 'L2', team2: 'L3', date: '2026-06-17', time: '21:00', venue: 'Houston', phase: 'groups', group: 'L', matchNumber: 68 },
  { id: 'G-L-3', team1: 'L1', team2: 'L2', date: '2026-06-21', time: '15:00', venue: 'Miami', phase: 'groups', group: 'L', matchNumber: 69 },
  { id: 'G-L-4', team1: 'L3', team2: 'L4', date: '2026-06-21', time: '21:00', venue: 'San Antonio', phase: 'groups', group: 'L', matchNumber: 70 },
  { id: 'G-L-5', team1: 'L4', team2: 'L2', date: '2026-06-26', time: '15:00', venue: 'San Antonio', phase: 'groups', group: 'L', matchNumber: 71 },
  { id: 'G-L-6', team1: 'L3', team2: 'L1', date: '2026-06-26', time: '21:00', venue: 'Houston', phase: 'groups', group: 'L', matchNumber: 72 },
  
  // === ROUND OF 32 (Jun 28 - Jul 3) ===
  { id: 'R32-1', team1: 'A1', team2: 'C3', date: '2026-06-28', time: '12:00', venue: 'Inglewood', phase: 'round32', matchNumber: 73 },
  { id: 'R32-2', team1: 'B2', team2: 'D3', date: '2026-06-28', time: '18:00', venue: 'Seattle', phase: 'round32', matchNumber: 74 },
  { id: 'R32-3', team1: 'C1', team2: 'A3', date: '2026-06-28', time: '21:00', venue: 'Kansas City', phase: 'round32', matchNumber: 75 },
  { id: 'R32-4', team1: 'D2', team2: 'B3', date: '2026-06-29', time: '12:00', venue: 'Miami', phase: 'round32', matchNumber: 76 },
  { id: 'R32-5', team1: 'E1', team2: 'G3', date: '2026-06-29', time: '18:00', venue: 'Boston', phase: 'round32', matchNumber: 77 },
  { id: 'R32-6', team1: 'F2', team2: 'H3', date: '2026-06-29', time: '21:00', venue: 'New Jersey', phase: 'round32', matchNumber: 78 },
  { id: 'R32-7', team1: 'G1', team2: 'E3', date: '2026-06-30', time: '12:00', venue: 'Dallas', phase: 'round32', matchNumber: 79 },
  { id: 'R32-8', team1: 'H2', team2: 'F3', date: '2026-06-30', time: '18:00', venue: 'Houston', phase: 'round32', matchNumber: 80 },
  { id: 'R32-9', team1: 'I1', team2: 'K3', date: '2026-06-30', time: '21:00', venue: 'Philadelphia', phase: 'round32', matchNumber: 81 },
  { id: 'R32-10', team1: 'J2', team2: 'L3', date: '2026-07-01', time: '12:00', venue: 'Toronto', phase: 'round32', matchNumber: 82 },
  { id: 'R32-11', team1: 'K1', team2: 'I3', date: '2026-07-01', time: '18:00', venue: 'San Antonio', phase: 'round32', matchNumber: 83 },
  { id: 'R32-12', team1: 'L2', team2: 'J3', date: '2026-07-01', time: '21:00', venue: 'Vancouver', phase: 'round32', matchNumber: 84 },
  { id: 'R32-13', team1: 'A2', team2: 'B4', date: '2026-07-02', time: '12:00', venue: 'Mexico City', phase: 'round32', matchNumber: 85 },
  { id: 'R32-14', team1: 'B1', team2: 'A4', date: '2026-07-02', time: '18:00', venue: 'Guadalajara', phase: 'round32', matchNumber: 86 },
  { id: 'R32-15', team1: 'C2', team2: 'D4', date: '2026-07-02', time: '21:00', venue: 'Inglewood', phase: 'round32', matchNumber: 87 },
  { id: 'R32-16', team1: 'D1', team2: 'C4', date: '2026-07-03', time: '18:00', venue: 'Kansas City', phase: 'round32', matchNumber: 88 },
  
  // === ROUND OF 16 (Jul 4-7) ===
  { id: 'R16-1', team1: 'TBD', team2: 'TBD', date: '2026-07-04', time: '12:00', venue: 'Seattle', phase: 'round16', matchNumber: 89 },
  { id: 'R16-2', team1: 'TBD', team2: 'TBD', date: '2026-07-04', time: '18:00', venue: 'Miami', phase: 'round16', matchNumber: 90 },
  { id: 'R16-3', team1: 'TBD', team2: 'TBD', date: '2026-07-04', time: '21:00', venue: 'Boston', phase: 'round16', matchNumber: 91 },
  { id: 'R16-4', team1: 'TBD', team2: 'TBD', date: '2026-07-05', time: '12:00', venue: 'New Jersey', phase: 'round16', matchNumber: 92 },
  { id: 'R16-5', team1: 'TBD', team2: 'TBD', date: '2026-07-05', time: '18:00', venue: 'Dallas', phase: 'round16', matchNumber: 93 },
  { id: 'R16-6', team1: 'TBD', team2: 'TBD', date: '2026-07-05', time: '21:00', venue: 'Houston', phase: 'round16', matchNumber: 94 },
  { id: 'R16-7', team1: 'TBD', team2: 'TBD', date: '2026-07-06', time: '12:00', venue: 'Philadelphia', phase: 'round16', matchNumber: 95 },
  { id: 'R16-8', team1: 'TBD', team2: 'TBD', date: '2026-07-06', time: '18:00', venue: 'Toronto', phase: 'round16', matchNumber: 96 },
  { id: 'R16-9', team1: 'TBD', team2: 'TBD', date: '2026-07-06', time: '21:00', venue: 'San Antonio', phase: 'round16', matchNumber: 97 },
  { id: 'R16-10', team1: 'TBD', team2: 'TBD', date: '2026-07-07', time: '18:00', venue: 'Inglewood', phase: 'round16', matchNumber: 98 },
  { id: 'R16-11', team1: 'TBD', team2: 'TBD', date: '2026-07-07', time: '21:00', venue: 'Kansas City', phase: 'round16', matchNumber: 99 },
  { id: 'R16-12', team1: 'TBD', team2: 'TBD', date: '2026-07-07', time: '21:00', venue: 'Vancouver', phase: 'round16', matchNumber: 100 },
  
  // === QUARTERFINALS (Jul 9-11) ===
  { id: 'QF-1', team1: 'TBD', team2: 'TBD', date: '2026-07-09', time: '15:00', venue: 'Seattle', phase: 'quarters', matchNumber: 101 },
  { id: 'QF-2', team1: 'TBD', team2: 'TBD', date: '2026-07-09', time: '21:00', venue: 'Miami', phase: 'quarters', matchNumber: 102 },
  { id: 'QF-3', team1: 'TBD', team2: 'TBD', date: '2026-07-10', time: '15:00', venue: 'New Jersey', phase: 'quarters', matchNumber: 103 },
  { id: 'QF-4', team1: 'TBD', team2: 'TBD', date: '2026-07-10', time: '21:00', venue: 'Dallas', phase: 'quarters', matchNumber: 104 },
  
  // === SEMIFINALS (Jul 14-15) ===
  { id: 'SF-1', team1: 'TBD', team2: 'TBD', date: '2026-07-14', time: '18:00', venue: 'Inglewood', phase: 'semis', matchNumber: 105 },
  { id: 'SF-2', team1: 'TBD', team2: 'TBD', date: '2026-07-15', time: '18:00', venue: 'Kansas City', phase: 'semis', matchNumber: 106 },
  
  // === THIRD PLACE (Jul 18) ===
  { id: '3RD', team1: 'TBD', team2: 'TBD', date: '2026-07-18', time: '15:00', venue: 'Miami', phase: 'third', matchNumber: 107 },
  
  // === FINAL (Jul 19) ===
  { id: 'FINAL', team1: 'TBD', team2: 'TBD', date: '2026-07-19', time: '18:00', venue: 'New Jersey', phase: 'final', matchNumber: 108 },
];

module.exports = MATCHES;