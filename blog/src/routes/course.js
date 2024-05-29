const express = require('express');
const router = express.Router();

const courseCotroller = require('../app/controllers/CoursesCotroller');

router.get('/create',function (req,res,next){
    if(req.query.permission === 'admin') return next();
   res.status(403).json({ message: "Acess denied"});
},courseCotroller.create);
router.post('/store',courseCotroller.store)
router.get('/:id/edit',courseCotroller.edit);
router.post('/handle-form-actions',courseCotroller.handleFormActions)
router.put('/:id',courseCotroller.update);
router.patch('/:id/restore',courseCotroller.restore);
router.delete('/:id',courseCotroller.destroy);
router.delete('/:id/force',courseCotroller.forceDestroy);
router.get('/:slug',courseCotroller.show);


module.exports = router;