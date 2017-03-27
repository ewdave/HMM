module.exports = () => {
  const mysql = require('mysql');
  const Environment = require('./env');
  const pool: any = mysql.createPool(Environment['mysql']);

  pool.config.connectionConfig.queryFormat = function (query: any, values: any) {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function (txt: any, key: any) {
      if (values.hasOwnProperty(key)) {
        return this.escape(values[key]);
      }
      return txt;
    }.bind(this));
  };

  return pool;
}
