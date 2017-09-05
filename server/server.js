//npm/libaray imports
const express = require('express');
const bodyParser = require('body-parser');

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

app.listen(3001, ()=>{
    console.log('Started on port 3001');
});
