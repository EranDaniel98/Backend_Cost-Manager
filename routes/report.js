const express = require('express');
const router = express.Router();
const cost = require('../models/costSchema');


router.get('/report/:year/:month/:id', function (req, res, next) {
    cost.findOne({user_id: req.params.id, year: req.params.year, month: req.params.month}, {
        category: 1
    }).then((cost) => {
        const {category, ...rest} = cost;
        res.send(category)
    }).catch(next);
});


module.exports = router;