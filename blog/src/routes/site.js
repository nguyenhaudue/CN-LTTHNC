const express = require('express');
const router = express.Router();

const siteCotroller = require('../app/controllers/SiteCotroller');


router.get('/:slug',siteCotroller.show);
router.get('/',siteCotroller.index);

module.exports = router;