module.exports.PostUser = (req: any, res: any, next: any) => {
  req.checkBody('User_Type', 'Must specify the type of user').notEmpty();
  req.checkBody('User_Email', 'Needs to be a valid email').isEmail();
  req.checkBody('User_Email', 'Email cannot be that long').len(1,100);
  req.checkBody('User_Password', 'Password must be atleast 5 characters').len(5,100);
  req.checkBody('User_Password_Confirm', 'Password must be atleast 5 characters').len(5,100);
  return next();
}

module.exports.PostUserLogin = (req: any, res: any, next: any) => {
  req.checkBody('User_Email', 'Needs to be a valid email').isEmail();
  req.checkBody('User_Email', 'Email cannot be that long').len(1,100);
  req.checkBody('User_Password', 'Password must be atleast 5 characters').len(5,100);
  return next();
}
