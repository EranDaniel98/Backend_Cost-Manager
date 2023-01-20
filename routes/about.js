const express = require('express');
const router = express.Router();

router.get('/about', function (req, res, next) {
    res.send([{firstname: "Yarin", lastname: "Shelek", id: 212432702, email: "yarinshelek@gmail.com"},
        {firstname: "Eran", lastname: "Daniel", id: 207466319, email: "erand1998@gmail.com"}])
});

module.exports = router;
