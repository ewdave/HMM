module.exports = (app: any) => {

  const router: any = app.get('router');
  const Middleware: any = require('../middleware/User');
  const Common: any = require('../middleware/Common');
  const Models: any = require('../models/User');

  router.post('/user', Middleware.PostUser, (req: any, res: any) => {

    if (req.body.User_Type == 'admin' && req.body.Passcode != '') {
      return res.status(403).send("Incorrect passcode...");
    }

    req
    .getValidationResult()
    .then((result: any) => {
      if (result.isEmpty() == false) {
        return res.status(400).send(result.array());
      } else {
        Models.PostUser(req, (response: any) => {
          return res.status(response.code).send(response.payload);
        })
      }
    })
  });

  router.post('/user/login', Middleware.PostUserLogin, (req: any, res: any) => {
    req
    .getValidationResult()
    .then((result: any) => {
      if (result.isEmpty() == false) {
        return res.status(400).send(result.array());
      } else {
        Models.PostUserLogin(req, (response: any) => {
          return res.status(200).status(response.code).send(response.payload);
        });
      }
    })
  });

  return router;

}
