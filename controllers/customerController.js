const db = require('../config/db');

// Create a new customer
exports.createCustomer = (req, res) => {
  const { name, mobile_number, company_id } = req.body;

  // Fetch company_tag from the companies table based on company_id
  db.query('SELECT company_tag FROM companies WHERE id = ?', [company_id], (err, companyResult) => {
    if (err) {
      res.status(500).json({ message: 'Error occurred while fetching company information' });
    } else if (companyResult.length === 0) {
      res.status(404).json({ message: 'Company not found' });
    } else {
      const company_tag = companyResult[0].company_tag;

      // Insert customer details along with company_tag
      db.query(
        'INSERT INTO customers (name, mobile_number, company_tag) VALUES (?, ?, ?)',
        [name, mobile_number, company_tag],
        (err, result) => {
          if (err) {
            res.status(500).json({ message: 'Error occurred while creating customer' });
          } else {
            res.status(201).json({ message: 'Customer created successfully', customerId: result.insertId });
          }
        }
      );
    }
  });
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
