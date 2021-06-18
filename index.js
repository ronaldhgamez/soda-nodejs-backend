const express = require('express');
const morgan = require('morgan');

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(morgan('dev'));

// routes
app.use(require('./routes/routes'));

const port = process.env.PORT || 4000;

// Server starts
app.listen(port, () => {
    console.log("Server running on port: " + port);
});