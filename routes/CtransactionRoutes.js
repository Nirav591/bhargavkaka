const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/tCompanyController');

router.post('/add', transactionController.addCompanyTransactions);
router.get('/customer/:id', transactionController.getCompanyTransactions);
router.put('/update/:id', transactionController.updateCompanyTransaction);
router.delete('/delete/:id', transactionController.deleteCompanyTransaction);

module.exports = router;
