const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const routes = require('./routes');
const auth = require('./middleware/auth');

const app = express();
const port = 3000;

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(auth.initialize()); 
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});