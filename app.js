const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');


const app = express();
const port = 6350;

app.use(bodyParser.json());
app.use(cors({origin:"https://bhargavkaka.libertyworld.in/"}));
app.use('/api/user', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
