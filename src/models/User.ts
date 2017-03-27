let bcrypt: any = require('bcryptjs');
let uuid: any = require('uuid');

module.exports.PostUser = (req: any, cb: any) => {
  req.async.series(
      [
        (callback: any) => {
          req.db.query(
            `
            SELECT * FROM User
            WHERE User_Email = :User_Email
            LIMIT 1
            `,
            {
              'User_Email': req.body.User_Email
            },
            (err: any, rows: any) => {
              if (err) {
                console.log(err);
                return cb({
                  'code': 500,
                  'payload': err
                });
              } else {
                if (rows.length > 0) {
                  return cb({
                    'code': 403,
                    'payload': 'Email already in use...'
                  });
                } else {
                  return callback();
                }
              }
            }
          );
        },
        (callback: any) => {
          req.body.User_Id = uuid.v4();

          if (req.body.User_Password != req.body.User_Password_Confirm) {
            return cb({
              'code': 400,
              'payload': 'Incorrect password...'
            });
          }

          req.body.User_Password = bcrypt.hashSync(req.body.User_Password, 10);
          req.body.User_DateCreated = Number(new Date());
          req.body.User_DateUpdated = Number(new Date());
          req.body.User_AccountStatus = "active";

           req.db.query(
            `
                INSERT INTO User SET
                User_Id = :User_Id,
                User_Type = :User_Type,
                User_Email = :User_Email,
                User_AccountStatus = :User_AccountStatus,
                User_Password = :User_Password,
                User_DateCreated = :User_DateCreated,
                User_DateUpdated = :User_DateUpdated
            `,
            req.body,
            (err: any, rows: any) => {
              if (err) {
                console.log(err);
                return cb({
                  'code': 500,
                  'payload': err
                });
              } else {
                return cb({
                  'code': 200,
                  'payload': 'User signed up!'
                });
              }
            }
          )
        }
      ]
  );
}

module.exports.PostUserLogin = (req: any, cb: any) => {
  req.db.query(
    `
    SELECT * FROM User
    WHERE User_Email = :User_Email
    LIMIT 1
    `,
    {
      User_Email: req.body.User_Email
    },
    (err, row) => {
      if (err) {
        console.log(err);
        return cb({
          'code': 500,
          'payload': err
        });
      } else {
        if (row.length > 0) {
          if (bcrypt.compareSync(req.body.User_Password, row[0].User_Password)) {
            req.session.User = row[0];
            return cb({
              'code': 200,
              'payload': 'User signed up!'
            });
          } else {
            return cb({
              'code': 403,
              'payload': 'Incorrect password'
            });
          }
        } else {
          return cb({
            'code': 403,
            'payload': 'Incorrect email.'
          });
        }
      }
    }
  )
}
