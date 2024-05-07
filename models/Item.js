const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    OrderId: { type: Number, required: true},
    Name: { type: String, required: true },
    Description: { type: String, required: true }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
