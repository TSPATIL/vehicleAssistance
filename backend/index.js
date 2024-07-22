const express = require('express')
const connectToMongoDB = require('./db')
const cors = require('cors');
const dotenv = require('dotenv');

connectToMongoDB();
const app = express();

dotenv.config();

const port = process.env.PORT_BACKEND;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', require('./routes/auth'));
app.use('/api/appoint', require('./routes/appoint'));
app.use('/api/mechanic', require('./routes/mechanic'));
app.use('/api/transaction', require('./routes/transact'));
app.use('/api/checkout', require('./routes/payment'));
app.use('/api/contact', require('./routes/contact'));

app.listen(port, () => {
  console.log(`Vehicle breakdown assistance system app listening at http://127.0.0.1:${port}`);
})