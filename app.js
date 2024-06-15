const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const customerRoutes = require('./routes/customerRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const cors = require('cors');

const app = express();
const port = 6350;

const corsOptions = {
  origin: ['http://localhost:3000', 'https://bhargavkaka.libertyworld.in', 'http://localhost:3001', "https://harharmahadev.unize.co.in", "http://harharmahadev.unize.co.in"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));


app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/transaction', transactionRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
