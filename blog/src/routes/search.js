const express = require('express');
const router = express.Router();
const searchController = require('../app/controllers/searchCotroller');

router.get('/search', searchController.search);

module.exports = router;
