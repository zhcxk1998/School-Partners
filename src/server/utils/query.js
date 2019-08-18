const mysql = require('mysql');
const MYSQL_CONFIG = require('../config/mysql_config.js');

const pool = mysql.createPool(MYSQL_CONFIG);

const query = (sql, val) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(err)
      else {
        connection.query(sql, val, (err, res) => {
          if (err) reject(err)
          else resolve(res);
          connection.release()
        })
      }
    })
  })
}

module.exports = { query }
