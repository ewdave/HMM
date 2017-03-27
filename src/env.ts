var env: Object = {
  "mysql": {
    "connectionLimit": 10,
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "",
    "multipleStatements": true
  },
  "redis": {
    "host": "localhost",
    "port": 6379
  }
}

if (process.env.NODE_ENV == "production") {

}

module.exports = env;
