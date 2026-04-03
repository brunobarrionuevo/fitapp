function requireAdmin(req, res, next) {
  if (req.session && req.session.isAdmin) return next();
  res.status(401).json({ error: 'Admin não autenticado' });
}

function requireStudent(req, res, next) {
  if (req.session && (req.session.isAdmin || req.session.studentId)) return next();
  res.status(401).json({ error: 'Não autenticado' });
}

function requireSelfOrAdmin(req, res, next) {
  const id = parseInt(req.params.id);
  if (req.session && (req.session.isAdmin || req.session.studentId === id)) return next();
  res.status(403).json({ error: 'Sem permissão' });
}

module.exports = { requireAdmin, requireStudent, requireSelfOrAdmin };
