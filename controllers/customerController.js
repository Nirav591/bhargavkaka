const db = require('../config/db');

// Create a new customer
exports.createCustomer = async (req, res) => {
  const { name, mobile_number, company_id } = req.body;

  try {
    // Check if company exists
    const company = await db.query('SELECT * FROM companies WHERE id = ?', [company_id]);
    if (company.length === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Proceed with customer creation
    db.query(
      'INSERT INTO customers (name, mobile_number, company_id) VALUES (?, ?, ?)',
      [name, mobile_number, company_id],
      (err, result) => {
        if (err) {
          console.error('Error creating customer:', err);
          res.status(500).json({ message: 'Failed to create customer' });
        } else {
          res.status(201).json({ message: 'Customer created successfully', customerId: result.insertId });
        }
      }
    );
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ message: 'Failed to create customer' });
  }
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

exports.getAllCustomers = (req, res) => {
  db.query('SELECT * FROM customers', (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error occurred while fetching customers' });
    } else {
      res.status(200).json({ customers: result });
    }
  });
};

exports.deleteCustomer = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM details WHERE customer_id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error occurred while deleting associated details' });
    } else {
      db.query('DELETE FROM customers WHERE id = ?', [id], (err, result) => {
        if (err) {
          res.status(500).json({ message: 'Error occurred while deleting customer' });
        } else {
          res.status(200).json({ message: 'Customer deleted successfully' });
        }
      });
    }
  });
};

exports.updateCustomer = (req, res) => {
  const { id } = req.params;
  const { name, mobile_number } = req.body;

  db.query(
    'UPDATE customers SET name = ?, mobile_number = ? WHERE id = ?',
    [name, mobile_number, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Error occurred while updating customer' });
      } else {
        res.status(200).json({ message: 'Customer updated successfully' });
      }
    }
  );
};
