const db = require('../config/db');

// Create a new customer
exports.createCustomer = (req, res) => {
  const { name, mobile_number } = req.body;

  db.query(
    'INSERT INTO customers (name, mobile_number) VALUES (?, ?)',
    [name, mobile_number],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Error occurred while creating customer' });
      } else {
        res.status(201).json({ message: 'Customer created successfully', customerId: result.insertId });
      }
    }
  );
};

// Add detail for a customer
exports.addDetail = (req, res) => {
  const { customer_id, price, brokrage, broker_name, broker_mobile_number } = req.body;

  db.query(
    'INSERT INTO details (customer_id, price, brokrage, broker_name, broker_mobile_number) VALUES (?, ?, ?, ?, ?)',
    [customer_id, price, brokrage, broker_name, broker_mobile_number],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Error occurred while adding detail' });
      } else {
        res.status(201).json({ message: 'Detail added successfully' });
      }
    }
  );
};

// Get customer details
exports.getCustomerDetails = (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM customers WHERE id = ?', [id], (err, customerResult) => {
    if (err) {
      res.status(500).json({ message: 'Error occurred while fetching customer details' });
    } else if (customerResult.length > 0) {
      db.query('SELECT * FROM details WHERE customer_id = ?', [id], (err, detailResult) => {
        if (err) {
          res.status(500).json({ message: 'Error occurred while fetching customer details' });
        } else {
          res.status(200).json({ customer: customerResult[0], details: detailResult });
        }
      });
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  });
};
