const mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    naziv: {
        type: String,
        required: 'Ovo polje je obavezno.'
    },
    autor: {
        type: String,
        required: 'Ovo polje je obavezno.'
    },
    godina_objave: {
        type: String,
        required: 'Ovo polje je obavezno.'
    },
    datum_objave: {
        type: String,
        required: 'Ovo polje je obavezno.'
    },
    cijena: {
        type: String,
        required: 'Ovo polje je obavezno.'
    },
    broj_stranica: {
        type: String,
        required: 'Ovo polje je obavezno.'
    }
});

mongoose.model('Book', bookSchema);