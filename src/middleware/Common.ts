module.exports.Auth = (req: any, res: any, next: any) => {
  req.checkCookies('connect.sid', 'Need to be logged in').notEmpty();
  return next();
}
