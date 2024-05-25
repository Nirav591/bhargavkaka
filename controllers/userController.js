const db = require('../config/db');

exports.signup = (req, res) => {
  const { username, password } = req.body;
  const newUser = { username, password };

  db.query('INSERT INTO users SET ?', newUser, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error occurred while signing up' });
    } else {
      res.status(201).json({ message: 'User signed up successfully' });
    }
  });
};

exports.signin = (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error occurred while signing in' });
    } else if (result.length > 0) {
      res.status(200).json({ message: 'User signed in successfully' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });
};

exports.changePassword = (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, oldPassword], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error occurred while changing password' });
    } else if (result.length > 0) {
      db.query('UPDATE users SET password = ? WHERE username = ?', [newPassword, username], (err, updateResult) => {
        if (err) {
          res.status(500).json({ message: 'Error occurred while updating password' });
        } else {
          res.status(200).json({ message: 'Password changed successfully' });
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid username or old password' });
    }
  });
};