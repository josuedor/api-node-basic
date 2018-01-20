const express = require('express');
const router = express.Router();
const tweets = require('./tweets/routes');
const authors = require('./authors/routes');

router.use('/tweets', tweets);
router.use('/authors', authors);

router.get('/', (req, res) => {
    res.json({message: 'Bienvenido al api del taller # 2 (express y mongo)!'})
})

module.exports = router;