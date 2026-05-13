const express = require('express');
const router = new express.Router();

router.use('/', require('./swaggerRoutes'));

router.get('/', (req, res) => {
  res.send('Hello world');
});

router.use('/contacts', require('./contactRoutes'));

module.exports = router;
