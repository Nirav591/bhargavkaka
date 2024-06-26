const db = require('../config/db');

// Add multiple transactions (credit or debit) with reason
exports.addCompanyTransactions = (req, res) => {
  const transactions = req.body.transactions; // Array of transactions

  if (!Array.isArray(transactions) || transactions.length === 0) {
    return res.status(400).json({ message: 'Invalid transactions data' });
  }

  const query = 'INSERT INTO company_transactions (company_id, type, amount, reason, date, reference_number, name) VALUES ?';
  const values = transactions.map(t => [t.company_id, t.type, t.amount, t.reason, t.date, t.reference_number, t.name]);

  db.query(query, [values], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error occurred while adding transactions' });
    } else {
      res.status(201).json({ message: 'Transactions added successfully' });
    }
  });
};

// Get all transactions for a company along with total credit and debit
exports.getCompanyTransactions = (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM company_transactions WHERE company_id = ?', [id], (err, transactions) => {
    if (err) {
      res.status(500).json({ message: 'Error occurred while fetching transactions' });
    } else {
      db.query('SELECT SUM(amount) AS totalCredit FROM company_transactions WHERE company_id = ? AND type = "credit"', [id], (err, creditResult) => {
        if (err) {
          res.status(500).json({ message: 'Error occurred while calculating total credits' });
        } else {
          db.query('SELECT SUM(amount) AS totalDebit FROM company_transactions WHERE company_id = ? AND type = "debit"', [id], (err, debitResult) => {
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

// Delete a transaction
exports.deleteCompanyTransaction = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM company_transactions WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error occurred while deleting transaction' });
    } else {
      res.status(200).json({ message: 'Transaction deleted successfully' });
    }
  });
};

// Update a transaction by ID
exports.updateCompanyTransaction = (req, res) => {
  const { id } = req.params;
  const { reason, amount, reference_number, name, date } = req.body;

  db.query(
    'UPDATE company_transactions SET reason = ?, amount = ?, reference_number = ?, name = ?, date = ? WHERE id = ?',
    [reason, amount, reference_number, name, date, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Error occurred while updating transaction' });
      } else {
        res.status(200).json({ message: 'Transaction updated successfully' });
      }
    }
  );
};
