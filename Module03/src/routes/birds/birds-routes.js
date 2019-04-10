const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Home router')
});

router.get('/about', (req, res) => {
    res.send('About birds')
});
module.exports = router;