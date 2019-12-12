const express = require('express');
const router = express.Router();
const mongooose = require('mongoose'); // allows creation of "new" object for mongo using schema

/*---------------------------------Product-Schema--------------------------------*/
const Product = require('../models/products.model');



/*---------------------------------GETS------------------------------------------*/
router.get('/', (req, res, next) => {
    Product.find()
    .exec()
    .then( docs => {
        console.log("from db", docs);
        console.log(`${new Date().toString()} [GET] => ${req.originalUrl}`);
        // if (docs >= 0)
        // {
            res.status(200).json(docs);
        // }
        // else{
        //     res.status(404).json({message: "no entries found"});
        // }
    })
    .catch( err => {
        console.log(err);
        res.status(404).json({
            error: err
        })
    });
});


//get by id
router.get('/:productname', (req, res, next) => {
    const id = req.params.id;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log("from database", doc);
        console.log(`${new Date().toString()} [GET] => ${req.originalUrl}`);
        if (doc){
            res.status(200).json(doc);
        }
        else{
            res.status(404).json({message: "no valid entry found for provided id"});
        }
    })
    .catch(err => { 
        console.log(err);
        res.status(500).json({error: err})
    });
});



/*---------------------------------POSTS------------------------------------------*/
//store data here --> ref. require mongoose
router.post('/', (req, res, next) => {  
    const product = new Product({
        _id: new mongooose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
        console.log(result);
        console.log(`${new Date().toString()}`);
        res.status(201).json({
            createdProduct: result
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
        });
    });
});



/*---------------------------------UPDATES----------------------------------------*/
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOperations = {};
    for(const operations of req.body) {
        updateOperations[operations.propName] = operations.value;
    }
    Product.update({_id : id}, { $set: updateOperations })
    .exec()
    .then( result => {
        res.status(200).json(result);
        console.log(`${new Date().toString()}`);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    });
});



/*---------------------------------DELETES-----------------------------------------*/
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id })
    .exec()
    .then(result => {
        res.status(200).json(result);
        console.log(`${new Date().toString()}`);

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    });
});

module.exports = router;