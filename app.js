const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 6340;

app.use(bodyParser.json());
app.use('/api/user', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
