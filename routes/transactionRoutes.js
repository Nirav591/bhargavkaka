const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/add', transactionController.addTransaction);
router.get('/customer/:id', transactionController.getCustomerTransactions);

module.exports = router;
