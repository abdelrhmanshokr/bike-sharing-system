const express = require('express');
const router = express.Router();
const Record = require('../models/records');

//records CRUD 
router.get('/', (req, res, next) => {
    Record.find({})
        .then((record) => {
            res.send(record);
        })
        .catch(next);
});

router.post('/', (req, res, next) => {
    let record = new Record(req.body);
    record.save()
        .then((record) => {
            res.send(record);
        })
        .catch(next);
});

router.put('/:id', (req, res, next) => {
    Record.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(() => {
            Record.findOne({_id: req.params.id})
                .then((record) => {
                    res.send(record);
                })
                .catch(next);
        })
        .catch(next);
});

router.delete('/:id', (req, res, next) => {
    Record.findByIdAndRemove({_id: req.params.id})
        .then((record) => {
            res.send(record);
        })
        .catch(next);
});

module.exports = router;