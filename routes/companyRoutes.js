const express = require('express');
const router = express.Router();
const customerController = require('../controllers/companyController');

router.post('/create', customerController.createCompany);
router.post('/add-detail', customerController.addDetail);
router.get('/:id', customerController.getCompanyDetails); // Get customer details by ID
router.get('/', customerController.getAllCompanies); // Get all customers
router.delete('/:id', customerController.deleteCompany); // Delete customer by ID
router.put('/:id', customerController.updateCompany); // Update customer by ID

module.exports = router;
