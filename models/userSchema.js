const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {type: Number, required: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    birthday: {type: String, required: true}
});

const Product = mongoose.model('users', userSchema);

module.exports = Product;