const mysql = require('mysql2');

const pool = mysql.createPool({
  host: '34.101.87.64',
  user: 'root',
  password: 'Programowanie.123',
  database: 'helpdesk-system',
  port: 3306
});

module.exports = pool.promise();