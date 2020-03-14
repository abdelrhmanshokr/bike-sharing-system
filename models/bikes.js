const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create the bikes' schema
const BikeSchema = new Schema({
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    qrCode: String
});

//create the model to migrate it to the db 
const Bike = mongoose.model('bike', BikeSchema);

module.exports = Bike; 