const express = require('express');
const router = new express.Router()
const Util = require('../utilities/index');
const reviewsController = require('../controllers/reviewsController');



router.get('/', reviewsController.buildReviews)

router.post('/',)

module.exports = router