//Yarin Shelek 212432702
//Eran Daniel 207466319

const express = require('express');
const router = express.Router();

router.get('/about', function (req, res) {
    res.send([{firstname: "Yarin", lastname: "Shelek", id: 212432702, email: "yarinshelek@gmail.com"},
        {firstname: "Eran", lastname: "Daniel", id: 207466319, email: "erand1998@gmail.com"}])
});

module.exports = router;
