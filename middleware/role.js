module.exports = function requireRole(role) {
  return function (req, res, next) {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    if (req.session.user.role_id !== role) {
      return res.status(403).send('Brak dostępu');
    }

    next();
  };
}
