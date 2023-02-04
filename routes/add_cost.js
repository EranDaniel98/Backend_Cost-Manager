const express = require('express');
const router = express.Router();
const userSchema = require('../models/userSchema')
const costSchema = require('../models/costSchema');


async function checkAndCreateCost(user_id, costData) {
    try {
        const user = await userSchema.findOne({id: user_id});
        if (!user) {
            console.log(`User with ID ${user_id} does not exist`);
            return;
        }

        const costRecord = await costSchema.findOne({user_id: user_id, year: costData.year, month: costData.month});
        if (!costRecord) {
            await createCost(user_id, costData);
            console.log("Cost was created")
        } else {
            await addCost(user_id, costData);
            console.log("Cost was added")
        }
    } catch (err) {
        throw err;
    }
}

async function createCost(user_id, costData) {
    const newCost = new costSchema({
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
                sum: costData.sum,
            }]
        }
    });

    try {
        await newCost.save();
        console.log("New costSchema saved");
    } catch (err) {
        throw err;
    }
}

async function addCost(user_id, costData) {
    await costSchema.findOneAndUpdate({user_id: user_id, year: costData.year, month: costData.month},
        {
            $push: {
                [`category.${costData.category}`]: {
                    day: costData.day,
                    description: costData.description,
                    sum: costData.sum
                }
            }
        },
        {upsert: true});
}

router.post('/add_cost', (req, res, next) => {
    const cdCategory = req.body.category;
    const categories = ['food', 'health', 'housing', 'sport', 'education', 'transportation', 'other'];

    if (!categories.includes(cdCategory)) {
        return res.status(500).json({error: `${cdCategory} is not a valid category`});
    }

    Promise.resolve(checkAndCreateCost(req.body.user_id, req.body))
        .then(() => res.status(200).json({message: "success"}))
        //.catch((err) => res.status(500).json({ error: err }));
        .catch(next);
});
module.exports = router;
