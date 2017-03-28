module.exports.CookieUser = (req, res, next) => {
  req.checkCookies('connect.sid', 'Need to be logged in').notEmpty();
  next();
}
