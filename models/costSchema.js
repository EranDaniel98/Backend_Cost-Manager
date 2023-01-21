const mongoose = require('mongoose');

const date = new Date();

const costSchema = new mongoose.Schema({
    user_id: {type: Number, ref: 'User', required: true},
    year: {type: Number, default: date.getFullYear(), required: true},
    month: {type: Number, default: date.getMonth() + 1, required: true},
    category: {
        type: Map,
        of: [{
            day: {type: Number},
            description: {type: String},
            sum: {type: Number}
        }],
        required: true
    }
});


const Product = mongoose.model('costs', costSchema);

module.exports = Product;

