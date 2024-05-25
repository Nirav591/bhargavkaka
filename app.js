const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const customerRoutes = require('./routes/customerRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const cors = require('cors');

const app = express();
const port = 6350;

app.use(
  cors({
    origin: 'https://bhargavkaka.libertyworld.in/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/transaction', transactionRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
