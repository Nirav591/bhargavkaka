const db = require('../config/db');

// Add a transaction (credit or debit)
exports.addTransaction = (req, res) => {
  const { customer_id, type, amount } = req.body;

  db.query(
    'INSERT INTO transactions (customer_id, type, amount) VALUES (?, ?, ?)',
    [customer_id, type, amount],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Error occurred while adding transaction' });
      } else {
        res.status(201).json({ message: 'Transaction added successfully' });
      }
    }
  );
};

// Get all transactions for a customer
exports.getCustomerTransactions = (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM transactions WHERE customer_id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error occurred while fetching transactions' });
    } else {
      res.status(200).json({ transactions: result });
    }
  });
};
