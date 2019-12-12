const express = require('express');
const router = express.Router();

const Orders = require('../models/orders.models');

/*---------------------------------GETS------------------------------------------*/
router.get('/', (req, res, next) => {
    res.status(200).json({message: "GET request to '/orders'"});
    console.log(`${new Date().toString()}`);
    // next()
});


router.get('/:ordername', (req, res, next) => {
    const name = req.params.ordername;
    if(name === "test")
    {
        res.status(200).json({message: "GET request to '/orders/'", ordername: name});
        console.log(`${new Date().toString()}`);
    // next()
    }
    else{
        res.status(200).json({message: "made a request"});
        console.log(`${new Date().toString()}`);
    // next()
    }
    
});

/*---------------------------------POSTS------------------------------------------*/
router.post('/', (req, res, next) => {
    const order = new order({
        //edit
        productId: req.body.productId,
        quantity: req.body.quantity
    });
    order.save().then(result => console.log(result))
    console.log(`${new Date().toString()}`);
    res.status(201).json({
        message: "POST request to '/orders'",
        order: order
    });
    // next()
});

/*---------------------------------UPDATES----------------------------------------*/
router.patch('/:ordername', (req, res, next) => {
    res.status(200).json({message: "PATCH request to '/orders'"});
    console.log(`${new Date().toString()}`);
    // next()
});

/*---------------------------------DELETES-----------------------------------------*/

router.delete('/:ordername', (req, res, next) => {
    res.status(200).json({message: "DELETE request to '/orders'"});
    console.log(`${new Date().toString()}`);
    // next()
});

module.exports = router;