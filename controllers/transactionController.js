const db = require('../config/db');

// Add multiple transactions (credit or debit) with reason
exports.addTransactions = (req, res) => {
  const transactions = req.body.transactions; // Array of transactions

  if (!Array.isArray(transactions) || transactions.length === 0) {
    return res.status(400).json({ message: 'Invalid transactions data' });
  }

  const isValidTransaction = transactions.every(t =>
    t.customer_id && t.type && (t.type === 'credit' || t.type === 'debit') && typeof t.amount === 'number' && t.reason
  );

  if (!isValidTransaction) {
    return res.status(400).json({ message: 'Invalid transaction details' });
  }

  const query = 'INSERT INTO transactions (customer_id, type, amount, reason) VALUES ?';
  const values = transactions.map(t => [t.customer_id, t.type, t.amount, t.reason]);

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

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: 'Invalid customer ID' });
  }

  db.query('SELECT * FROM transactions WHERE customer_id = ?', [id], (err, transactions) => {
    if (err) {
      res.status(500).json({ message: 'Error occurred while fetching transactions' });
    } else {
      db.query('SELECT SUM(amount) AS totalCredit FROM transactions WHERE customer_id = ? AND type = "credit"', [id], (err, creditResult) => {
        if (err) {
          res.status(500).json({ message: 'Error occurred while calculating total credits' });
        } else {
          db.query('SELECT SUM(amount) AS totalDebit FROM transactions WHERE customer_id = ? AND type = "debit"', [id], (err, debitResult) => {
            if (err) {
              res.status(500).json({ message: 'Error occurred while calculating total debits' });
            } else {
              res.status(200).json({
                transactions,
                totalCredit: creditResult[0].totalCredit || 0,
                totalDebit: debitResult[0].totalDebit || 0
              });
            }
          });
        }
      });
    }
  });
};

// Delete a transaction by ID
exports.deleteTransaction = (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: 'Invalid transaction ID' });
  }

  db.query('DELETE FROM transactions WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error occurred while deleting transaction' });
    } else {
      res.status(200).json({ message: 'Transaction deleted successfully' });
    }
  });
};

// Update a transaction by ID
exports.updateTransaction = (req, res) => {
  const { id } = req.params;
  const { reason, amount } = req.body;

  if (!id || isNaN(id) || typeof reason !== 'string' || typeof amount !== 'number') {
    return res.status(400).json({ message: 'Invalid transaction data' });
  }

  db.query(
    'UPDATE transactions SET reason = ?, amount = ? WHERE id = ?',
    [reason, amount, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Error occurred while updating transaction' });
      } else {
        res.status(200).json({ message: 'Transaction updated successfully' });
      }
    }
  );
};
