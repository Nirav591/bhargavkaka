const db = require('../config/db');

// Add multiple transactions (credit or debit)
exports.addTransactions = (req, res) => {
  const transactions = req.body.transactions; // Array of transactions

  if (!Array.isArray(transactions) || transactions.length === 0) {
    return res.status(400).json({ message: 'Invalid transactions data' });
  }

  const query = 'INSERT INTO transactions (customer_id, type, amount) VALUES ?';
  const values = transactions.map((t) => [t.customer_id, t.type, t.amount]);

  db.query(query, [values], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error occurred while adding transactions' });
    } else {
      res.status(201).json({ message: 'Transactions added successfully' });
    }
  });
};

// Get all transactions for a customer along with total credit and debit
exports.getCustomerTransactions = (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM transactions WHERE customer_id = ?', [id], (err, transactions) => {
    if (err) {
      res.status(500).json({ message: 'Error occurred while fetching transactions' });
    } else {
      db.query(
        'SELECT SUM(amount) AS totalCredit FROM transactions WHERE customer_id = ? AND type = "credit"',
        [id],
        (err, creditResult) => {
          if (err) {
            res.status(500).json({ message: 'Error occurred while calculating total credits' });
          } else {
            db.query(
              'SELECT SUM(amount) AS totalDebit FROM transactions WHERE customer_id = ? AND type = "debit"',
              [id],
              (err, debitResult) => {
                if (err) {
                  res.status(500).json({ message: 'Error occurred while calculating total debits' });
                } else {
                  res.status(200).json({
                    transactions,
                    totalCredit: creditResult[0].totalCredit || 0,
                    totalDebit: debitResult[0].totalDebit || 0,
                  });
                }
              }
            );
          }
        }
      );
    }
  });
};
