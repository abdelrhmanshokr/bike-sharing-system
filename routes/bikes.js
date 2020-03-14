const express = require('express'); 
const router = express.Router(); 
const Bike = require('../models/bikes');

//bikes' CRUD
router.get('/', (req, res, next) => {
    let bikes = Bike.find({})
    .then((users) => {
        res.send(bikes);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
    let bike = new Bike(req.body);
    bike.save()
        .then((bike) => {
            res.send(bike);
        })
        .catch(next);
});

router.put('/:id', (req, res, next) => {
    Bike.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(() => {
            Bike.findOne({_id: req.params.id})
                .then((bike) => {
                    res.send(bike);
                })
                .catch(next);
        })
        .catch(next);
});

router.delete('/:id', (req, res, next) => {
    Bike.findByIdAndRemove({_id: req.params.id})
        .then((bike) => {
            res.send(bike);
        })
        .catch(next);
});

module.exports = router;