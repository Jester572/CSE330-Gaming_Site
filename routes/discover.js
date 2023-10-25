const express = require('express');
const router = new express.Router()
const Util = require('../utilities/index');
const discoverController = require('../controllers/discoverController');



router.get('/', discoverController.buildDiscover)

router.post('/',)

module.exports = router