//npm/libaray imports
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

//local imports
const {mongoose} = require('./db/mongoose');
const {Order} = require('./models/order');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT || 3001;

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
    });
});

app.get('/order', (req, res)=>{
    Order.find().then((orders)=>{
        res.send({orders});
    }, (err)=>{
        res.status(400).send(err);
    });
});

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
        });
    }
});

app.delete('/order/:orderID', (req, res)=>{
    let orderID = req.params.orderID;
    if(!ObjectID.isValid(orderID)){
        res.status(404).send();
    } else {
        Order.findByIdAndRemove(orderID).then((order)=>{
            if(!order){
                res.status(404).send();
            } else {
                res.status(200).send({order});
            }
        }).catch((err)=>{
            res.status(400).send();
        });
     }
});

app.patch('/order/:orderID', (req, res)=>{
    let orderID = req.params.orderID;
    let body = _.pick(req.body, ['user', 'notes', 'item', 'location', 'completed']);
    if(!ObjectID.isValid(orderID)){
        res.status(404).send();
    } else {
        if(_.isBoolean(body.completed) && body.completed){
            body.completedAt = new Date().getTime();
        } else {
            body.completed = false;
            body.completedAt = null;
        }
    }
    Order.findByIdAndUpdate(orderID, {$set: body}, {new: true}).then((order)=> {
        if(!order){
            res.status(404).send();
        } else {
            res.send({order});
        }
    }, (err) =>{
        res.status(400).send();
    });
});

app.post('/user', (req, res)=>{
    let body = _.pick(req.body, ['display_name', 'email', 'password']);
    let user = new User(body);
    user.save().then(()=>{
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth', token).send(user);
    }).catch((err)=>{
        res.status(400).send(err);
    });
});

app.get('/user/me', authenticate, (req, res)=>{
    res.send(req.user);
});

app.post('/user/login', (req, res)=>{
    let body =_.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password).then((user)=>{
        return user.generateAuthToken().then((token)=>{
            res.header('x-auth', token).send(user);
        });
    }).catch((err)=>{
        res.status(400).send();
    });
});

app.listen(port, ()=>{
    console.log(`Started on port ${port}`);
});

module.exports = {app};
