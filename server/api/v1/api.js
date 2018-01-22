const express = require('express');
const router = express.Router();
const tweets = require('./tweets/routes');
const users = require('./users/routes');

router.use('/tweets', tweets);
router.use('/users', users);

router.get('/', (req, res) => {
    res.json({message: 'Bienvenido al api del taller # 2 (express y mongo)!'})
})

module.exports = router;