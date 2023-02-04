const mongoose = require('mongoose');
const date = new Date();

const costSchema = new mongoose.Schema({
    user_id: {type: Number, ref: 'users', required: true},
    year: {type: Number, default: date.getFullYear(), required: true},
    month: {type: Number, default: date.getMonth() + 1, required: true},
    category: {
        type: Map,
        of: [{
            day: {type: Number, default: date.getDate()},
            description: {type: String},
            sum: {type: Number},
            _id: false
        }],
        required: true
    }
});


const cost = mongoose.model('costs', costSchema);

module.exports = cost;

