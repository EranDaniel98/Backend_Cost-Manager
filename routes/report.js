const express = require('express');
const router = express.Router();
const Product = require('../models/costSchema');


router.get('/report/:year/:month/:id', function (req, res, next) {
    Product.findOne({
        id: req.params.id,
        year: req.params.year,
        month: req.params.month
    },{
        category: 1
    }).then((product) => {
        const { category, ...rest } = product;
        res.send(category)
    }).catch(next);
});


module.exports = router;