const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');

//users' CRUD 
router.get('/', (req, res, next) => {
    User.find({})
        .then((users) => {
            res.send(users);
        })
        .catch(next);
});

router.post('/', (req, res, next) => {
    let user = new User(req.body);
    user.save()
        .then((user) => {
            res.send(user);
        })
        .catch(next);   
});

router.put('/:id', (req, res, next) => {
    User.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(() => {
            User.findOne({_id: req.params.id})
                .then((user) => {
                    res.send(user);
                })
                .catch(next);
        })
        .catch(next);
});

router.delete('/:id', (req, res, next) => {
    User.findByIdAndRemove({_id: req.params.id})
        .then((user) => {
            res.send(user);
        })
        .catch(next);
});

//users' login route
router.get('/login', (req, res) => {
    res.send('login');
});

//users' register route 
router.post('/register', (req, res, next) => {
    const {name, email, password} = req.body;

    //validation
    const errors = [];

    //check the required fields
    if(!name || !email || !password){
        errors.push({ msg: 'please fill in all fields'});
    }

    //check pass length
    if(password.length < 6){
        errors.push({ msg: 'password must be at least 6 chars'});
    }

    if(errors.length > 0){
        res.send(errors);
    }else{
        //validation passed 
        if(User.findOne({ email: email })){
            errors.push({ msg: 'user aleady exists'});
            res.send(errors);
        }else{
            let user = new User(req.body);
            bcrypt.genSalt(10, (err, salt) =>{
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if(err){
                        throw err;
                    }
                    user.password = hash;
                });
            });
            user.save()
                .then((user) => {
                    res.send(user.password);
                })
                .catch(next);
        }
    }
});

module.exports = router; 