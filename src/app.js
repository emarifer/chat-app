const express = require('express');
const morgan = require('morgan');
const path = require('path');

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 3002);

// Middlewares
app.use(morgan('dev'));
app.use('/chat', express.static(path.join(__dirname, 'public'))); // Set static files folder

module.exports = app;