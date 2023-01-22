const express = require('express');
const router = express.Router();
const userSchema = require('../models/userSchema')
const Product = require('../models/costSchema');

function checkAndCreateCost(user_id, costData, callback) {
    userSchema.findOne({id: user_id}, (err, user) => {
        //if (err) return callback(err);
        if (err || !user) return callback(`User with ID ${user_id} does not exist`, err);

        Product.findOne({user_id: user_id, year: costData.year, month: costData.month}, (err, cost) => {
            if (err) return callback(err);
            if (!cost) createCost(user_id, costData, callback);
            else addCost(user_id, costData, callback);
        });
    });
}

function createCost(user_id, costData, callback) {
    const newCost = new Product({
        user_id,
        year: costData.year,
        month: costData.month,
        category: {
            food: [],
            health: [],
            housing: [],
            sport: [],
            education: [],
            transportation: [],
            other: [],
            [costData.category]: [{
                day: costData.day,
                description: costData.description,
                sum: costData.sum
            }]
        }
    });
    newCost.save((error) => {
        if (error) {
            return callback(error);
        } else return callback();
    });
}

function addCost(user_id, costData, callback) {
    Product.findOneAndUpdate({user_id: user_id, year: costData.year, month: costData.month},
        {
            $push: {
                [`category.${costData.category}`]: {
                    day: costData.day,
                    description: costData.description,
                    sum: costData.sum
                }
            }
        },
        {new: true},
        (err, cost) => {
            if (err) return callback(err);
            if (!cost) return callback(`User_id ${user_id} does not have any expenses`);
            else return callback(null, cost);
        });
}

router.post('/add_cost', (req, res) => {
    const cdCategory = req.body.category;
    const categories = ['food', 'health', 'housing', 'sport', 'education', 'transportation', 'other'];

    if (!categories.includes(cdCategory)) {
        return res.status(500).json({error: `${cdCategory} is not a valid category`});
    }

    checkAndCreateCost(req.body.user_id,  req.body, (err) => {
        if (err) res.status(500).json({error: err});
        else res.status(200).json({message: "success"});
    });
});

module.exports = router;
