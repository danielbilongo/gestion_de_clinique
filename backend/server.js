const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
const mockUsers = [
  {
    id: 1,
    nom: 'Dr. Marie Dubois',
    email: 'marie.dubois@clinique.com',
    role: 'Médecin',
    statut: 'Active',
    telephone: '01 23 45 67 89',
    specialite: 'Cardiologie',
    photo: null
  },
  {
    id: 2,
    nom: 'Jean Martin',
    email: 'jean.martin@clinique.com',
    role: 'Patient',
    statut: 'Active',
    telephone: '01 98 76 54 32',
    dateNaissance: '1985-03-15',
    adresse: '123 Rue de la Santé, Paris',
    numeroSecuriteSociale: '1850315123456',
    photo: null
  },
  {
    id: 3,
    nom: 'Sophie Leclerc',
    email: 'sophie.leclerc@clinique.com',
    role: 'Secrétaire',
    statut: 'Active',
    telephone: '01 11 22 33 44',
    photo: null
  }
];

const mockStats = {
  totalPatients: 156,
  totalMedecins: 12,
  totalUsers: 15,
  rendezvousAujourdhui: 23,
  rendezvousEnAttente: 8,
  totalAppointments: 320,
  totalRevenue: 253000,
  activeAppointments: 45,
  pendingAppointments: 23,
  completedAppointments: 285,
  cancelledAppointments: 12,
  newPatientsThisMonth: 45,
  revenueThisMonth: 253000,
  systemHealth: {
    databaseUsage: 45,
    serverStatus: 'online',
    lastBackup: 'Il y a 2h',
    activeUsers: 3,
    systemLoad: 25
  }
};

const mockRecentActivity = [
  {
    id: 1,
    type: 'appointment',
    message: 'Nouveau rendez-vous avec Dr. Dubois',
    timestamp: new Date().toISOString(),
    user: 'Jean Martin'
  },
  {
    id: 2,
    type: 'user',
    message: 'Nouvel utilisateur enregistré',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    user: 'Sophie Leclerc'
  }
];

// Routes

// Dashboard routes
app.get('/api/dashboard/stats', (req, res) => {
  res.json(mockStats);
});

app.get('/api/dashboard/recent-activity', (req, res) => {
  res.json(mockRecentActivity);
});

app.get('/api/dashboard/quick-actions', (req, res) => {
  res.json([
    { id: 1, title: 'Nouveau Patient', icon: 'user-plus', action: 'add-patient' },
    { id: 2, title: 'Nouveau RDV', icon: 'calendar-plus', action: 'add-appointment' },
    { id: 3, title: 'Rapports', icon: 'chart-bar', action: 'view-reports' }
  ]);
});

app.get('/api/dashboard/recent-users', (req, res) => {
  res.json(mockUsers.slice(0, 3));
});

app.get('/api/dashboard/alerts', (req, res) => {
  res.json([
    {
      id: 1,
      type: 'warning',
      message: 'Rendez-vous en retard',
      timestamp: new Date().toISOString()
    }
  ]);
});

app.get('/api/dashboard/system-health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: '99.9%',
    lastCheck: new Date().toISOString(),
    activeUsers: 3,
    databaseUsage: 45,
    serverStatus: 'online',
    systemLoad: 25
  });
});

// User routes
app.get('/api/users', (req, res) => {
  res.json(mockUsers);
});

app.post('/api/users', (req, res) => {
  const newUser = {
    id: mockUsers.length + 1,
    ...req.body
  };
  mockUsers.push(newUser);
  res.status(201).json(newUser);
});

app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = mockUsers.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Utilisateur non trouvé' });
  }
  
  mockUsers[userIndex] = { ...mockUsers[userIndex], ...req.body };
  res.json(mockUsers[userIndex]);
});

app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = mockUsers.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Utilisateur non trouvé' });
  }
  
  mockUsers.splice(userIndex, 1);
  res.status(204).send();
});

// Auth routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Simple mock authentication
  if (email && password) {
    res.json({
      token: 'mock-jwt-token',
      user: {
        id: 1,
        nom: 'Admin User',
        email: email,
        role: 'Admin'
      }
    });
  } else {
    res.status(401).json({ error: 'Identifiants invalides' });
  }
});

// Appointment routes (basic mock)
app.get('/api/rendezvous', (req, res) => {
  res.json([
    {
      id: 1,
      patientId: 2,
      medecinId: 1,
      dateHeureDebut: new Date().toISOString(),
      dateHeureFin: new Date(Date.now() + 3600000).toISOString(),
      motif: 'Consultation de routine',
      statut: 'Confirmé',
      salle: 'Salle 1'
    }
  ]);
});

app.post('/api/rendezvous', (req, res) => {
  const newAppointment = {
    id: Date.now(),
    ...req.body
  };
  res.status(201).json(newAppointment);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 Dashboard API: http://localhost:${PORT}/api/dashboard/stats`);
  console.log(`👥 Users API: http://localhost:${PORT}/api/users`);
  console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth/login`);
});
