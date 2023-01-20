const express = require('express');
const router = express.Router();
const Product = require('../models/costSchema');

router.get('/report/:year/:month/:id', function (req, res, next) {
    Product.find({
        id: "/"+req.params.id+"/",
        year: req.params.year,
        month: req.params.month
    }).then((products) => res.send(products)).catch(next);
});

module.exports = router;
