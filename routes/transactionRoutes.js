const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/add', transactionController.addTransactions);
router.get('/customer/:id', transactionController.getCustomerTransactions);
router.put('/update/:id', transactionController.updateTransaction);
router.delete('/delete/:id', transactionController.deleteTransaction);

module.exports = router;
