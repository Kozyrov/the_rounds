//npm/libaray imports
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

//local imports
const {mongoose} = require('./db/mongoose');
const {Order} = require('./models/order');
const {User} = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/order', (req, res)=>{
    let order = new Order({
        user: req.body.user,
        location: req.body.location,
        item: req.body.item,
        notes: req.body.notes
    })
    order.save().then((doc)=>{
        res.send(doc);
    }, (err)=>{
        res.status(400).send(err);
    })
});

app.get('/order', (req, res)=>{
    Order.find().then((orders)=>{
        res.send({orders});
    }, (err)=>{
        res.status(400).send(err);
    })
})

app.get('/order/:orderID', (req, res)=>{
    let orderID = req.params.orderID;
    if(!ObjectID.isValid(orderID)){
        res.status(404).send();
    } else {
        Order.findById(orderID).then((order)=>{
            if(!order){
                res.status(404).send();
            } else {
                res.send({order});
            }
        }).catch((err)=>{
            res.status(400).send();
        })
    }
});

//isValid
    //404 - call send without a value.

//find by id
    //success
        //if todo send it back
        //if no todo - if no todo - send back a 404 with nothing send with no argument
    //error
        //400 - send back nothing

app.listen(3001, ()=>{
    console.log('Started on port 3001');
});

module.exports = {app};
