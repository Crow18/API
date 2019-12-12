const express = require('express');
const app = express();
const morgan = require('morgan'); //returns console logs Get, Post, etc.
const bodyParser = require('body-parser'); //allows body to be read in json or web encoded format
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');


//connect to db
const uri = 'mongodb://127.0.0.1:27017/Genesystems';
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true });

app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({ useNewURLParser: true}));
app.use(bodyParser.json());

app.use((res, req, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Allow-Control-Headers',
        'Origin, X-Requested-With, content-Type, Accept, Autharization'
    );
    // if (req.method === 'OPTIONS') {
    //     res.header(
    //         'Access-Control-Allow-Methods',
    //         'PUT, POST, PATCH, DELETE, GET'
    //     );
    //     return res.status(200).json({});
    // }
    next();
});

//handle requests  using these routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//if it gets past all the above without finding... throw error
app.use((req, res, next) => {
    const error = new Error("Not found, out of bounds!");
    error.status= 404;
    next(error);
    
});

//error from anywhere
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
            
        }
    });
});


module.exports = app;