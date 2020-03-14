const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create records' schema 
const RecordSchema = new Schema({
    startingTime: Number,
    delivaryTime: Number,
    startStationId: Number,
    destinationId: Number,
    fees: Number,
    userId: Number,
    bikeId: Number
});

//create records' model to migrate to the db 
const Record = mongoose.model('record', RecordSchema);

module.exports = Record;