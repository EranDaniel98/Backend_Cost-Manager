const express = require('express');
const router = express.Router();
const costSchema = require('../models/costSchema');


router.get('/report/:year/:month/:id', function (req, res, next) {
    costSchema.findOne({user_id: req.params.id, year: req.params.year, month: req.params.month}, {
        category: 1
    }).then((cost) => {
        const {category, ...rest} = cost;
        res.send(category)
    }).catch(next);
});


module.exports = router;