const express = require('express');
const router = new express.Router();

router.get('/', (req, res) => {
  res.send('Hello world');
});

router.use('/contacts', require('./contactRoutes'));

module.exports = router;
