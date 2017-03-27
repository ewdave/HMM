const db: any = require('./db')();

async.series(
  [
    (callback: any) => {
      db.query(
        `
        CREATE TABLE IF NOT EXISTS User
          (
              User_Id VARCHAR(36) NOT NULL PRIMARY KEY,
              User_Type VARCHAR(10),
              User_Email VARCHAR(100),
              User_FacebookId VARCHAR(100),
              User_AccountStatus VARCHAR(30),
              User_Photo TEXT,
              User_Password VARCHAR(100),
              User_Username VARCHAR(200),
              User_DateCreated VARCHAR(30),
              User_DateUpdated VARCHAR(30)
          );
        `,
        (err: any, rows: any) => {
          if (err) {
            throw err;
          } else {
            console.log("User Table Created...");
            return callback();
          }
        }
      );
    }
  ],
  () => {
    console.log("All tables created!");
  }
)
