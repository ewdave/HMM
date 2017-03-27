module.exports = (app: any) => {

  const router: any = app.get('router');

  app.get('/ping', (req: any, res: any) => {
    if (!req.session.User) {
      return res.status(403).send("No user...");
    } else {
      return res.status(200).send({
        'type': req.session.User.User_Type,
        'id': req.session.User.User_Id,
      })
    }
  });

  app.get('/logout', (req: any, res: any) => {
   if (!req.session.User) {
     return res.status(403).send("Not logged in...");
   } else {
     delete req.session.User;
     return res.status(200).send("Logged out...");
   }
  });

  return router;

}
