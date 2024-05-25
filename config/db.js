const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 't7x?}>rbmCa~we+',
  database: 'my_database'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

module.exports = db;
