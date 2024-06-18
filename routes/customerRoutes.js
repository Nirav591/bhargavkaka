const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/create', customerController.createCustomer);
router.post('/add-detail', customerController.addDetail);
router.get('/:id', customerController.getCustomerDetails);
router.get('/', customerController.getAllCustomers);
router.delete('/:id', customerController.deleteCustomer);
router.delete('/:id', customerController.deleteCustomer);
router.put('/customer/:id', customerController.updateCustomer);



module.exports = router;
