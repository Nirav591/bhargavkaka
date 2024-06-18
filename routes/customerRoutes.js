const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/create', customerController.createCustomer);
router.post('/add-detail', customerController.addDetail);
router.get('/:id', customerController.getCustomerDetails); // Get customer details by ID
router.get('/', customerController.getAllCustomers); // Get all customers
router.delete('/:id', customerController.deleteCustomer); // Delete customer by ID
router.put('/:id', customerController.updateCustomer); // Update customer by ID

module.exports = router;
