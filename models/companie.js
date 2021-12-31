const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
const Schema = mongoose.Schema;

const companieSchema = new Schema({
    nume_comp: {
        type: String,
        required: true
    },
    nr_telefon: {
        type: String,
        required: true
    },
    adressa: {
        type: String,
        required: true
    },
    nume_manager: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Companie = mongoose.model('Companie', companieSchema);
module.exports = Companie;