const express = require('express');
const router = new express.Router()
const Util = require('../utilities/index');
const searchController = require('../controllers/searchController');



router.get('/', searchController.buildSearch)

router.post('/', searchController.searchGame)

module.exports = router