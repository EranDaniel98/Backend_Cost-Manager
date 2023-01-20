const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const date = new Date()

const costSchema = new Schema({
    user_id: {type: Number, required: [true, 'Must have a valid/existing user id']},
    year: {type: Number, default: date.getFullYear()},
    month: {type: Number, default: date.getMonth() + 1},
    day: {type: Number, default: date.getDate()},
    description: {type: String, required: true},
    category: {type: String, required: true},
    sum: {type: Number, required: true}
});

const Product = mongoose.model('costs', costSchema);

module.exports = Product;

