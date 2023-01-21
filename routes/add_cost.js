const express = require('express');
const router = express.Router();
const userSchema = require('../models/userSchema')
const Product = require('../models/costSchema');
const categories = ['food', 'health', 'housing', 'sport', 'education', 'transportation', 'other'];

function checkAndCreateCost(user_id, costData, callback) {
    userSchema.findOne({id: user_id}, (err, user) => {
        if (err) return callback(err);
        if (!user) return callback(`Error: User with ID ${user_id} does not exist`);

        Product.findOne({user_id: user_id, year: costData.year, month: costData.month}, (err, cost) => {
            if (err) return callback(err);
            if (!cost) createCost(user_id, costData, callback);
            else addCost(user_id, costData, callback);
        });
    });
}

function createCost(user_id, costData, callback) {
    const cdCategory = costData.category;
    const newCost = new Product({
        user_id: user_id,
        year: costData.year,
        month: costData.month,
        category: {
            food: [],
            health: [],
            housing: [],
            sport: [],
            education: [],
            transportation: [],
            other: []
        }
    });
    newCost.set({
        [`category.${cdCategory}`]: [{
            day: costData.day,
            description: costData.description,
            sum: costData.sum
        }]
    });
    newCost.save((error) => {
        if (error) {
            return callback(error);
        } else {
            console.log('Cost saved successfully');
        }
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
            if (!cost) return callback(`Error: Cost with user_id ${user_id} does not exist in 'costs' collection`);
            else return callback(null, cost);
        });
}

router.post('/add_cost', (req, res) => {
    const user_id = req.body.user_id;
    const costData = req.body;
    const cdCategory = costData.category;

    if (!categories.includes(cdCategory)) {
        return res.status(500).json({error: `Error: ${cdCategory} is not a valid category`});
    }

    checkAndCreateCost(user_id, costData, (err) => {
        if (err) return res.status(500).json({error: err});
    });
});

module.exports = router;
