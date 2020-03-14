const express = require('express');
const router = express.Router();
const Station = require('../models/stations');

//stations' CRUD 
router.get('/', (req, res, next) => {
    Station.find({})
        .then((stations) => {
            res.send(stations);
        })
        .catch(next);
});

router.post('/', (req, res, next) => {
    let station = new Station(req.body);
    station.save()
        .then((station) => {
            res.send(station);
        })
        .catch(next);
});

router.put('/:id', (req, res, next) => {
    Station.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(() => {
            Station.findOne({_id: req.params.id})
                .then((station) => {
                    res.send(station);
                })
                .catch(next);
        })
        .catch(next);   
});

router.delete('/:id', (req, res, next) => {
    Station.findByIdAndRemove({_id: req.params.id})
        .then((station) => {
            res.send(station);
        })
        .catch(next);
});

module.exports = router;