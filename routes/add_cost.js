const express = require('express');
const router = express.Router();
const userSchema = require('../models/userSchema')
const Product = require('../models/costSchema');

function checkUserID(user_id) {
    if (userSchema.findOne({id:user_id}) == null)
        return null;
    else {
        return user_id;
    }
}

router.post('/add_cost', function (req, res, next) {
    req.body.user_id = checkUserID(req.body.user_id);
    Product.create(req.body).then((costItem) => res.send(costItem)).catch(next);
});

module.exports = router;
