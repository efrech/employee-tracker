// Connect to database
const mysql = require('mysql2');
const DB = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password here
      password: '',
      database: 'cms_db'
    },
    console.log(`Connected to the cms_db database.`)
  );

  module.exports = DB;