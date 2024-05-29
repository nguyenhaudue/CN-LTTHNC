const express = require('express');
const router = express.Router();

const meCotroller = require('../app/controllers/MeCotroller');


router.get('/stored/courses',meCotroller.storedCourses);
router.get('/trash/courses',meCotroller.trashCourses);

module.exports = router;