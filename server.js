require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path    = require('path');

const app = express();

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'gym-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 8 * 60 * 60 * 1000 } // 8 horas
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth',      require('./routes/auth'));
app.use('/api/students',  require('./routes/students'));
app.use('/api/exercises', require('./routes/exercises'));
app.use('/api/programs',  require('./routes/programs'));
app.use('/api',           require('./routes/logs'));
app.use('/api',           require('./routes/assessments'));

app.get('*', (_, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🏋️  Academia App rodando em http://localhost:${PORT}`);
  console.log(`   Admin: senha "${process.env.ADMIN_PASSWORD}"\n`);
});
