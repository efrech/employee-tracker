// Connect to database
const chalk = require('chalk');
const mysql = require('mysql2');
// const Connection = require('mysql2/typings/mysql/lib/Connection');
const DB = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password here
      password: '',
      database: 'cms_db'
    }
  );

  module.exports = DB;