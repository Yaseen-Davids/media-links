const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).send();
  }
};

module.exports = {
  ensureAuthenticated,
};
