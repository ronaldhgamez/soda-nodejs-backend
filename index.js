const express = require('express');
const morgan = require('morgan');

const app = express();
app.set('port', 4000);

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(morgan('dev'));

// routes
app.use(require('./routes/routes'));

// Server starts
app.listen(app.get('port'), () => {
    console.log("Server running on port: " + app.get('port'));
});