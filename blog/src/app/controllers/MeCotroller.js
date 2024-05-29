const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose')


class MeController {
    //[GET] //me/strored/courses
    storedCourses(req, res,next) {
      Promise.all([Course.find({}) , Course.countDocumentsDeleted()])
       .then(([course,deletedCount]) =>
          res.render('me/stored-courses',{
              deletedCount, 
              course : mutipleMongooseToObject(course), 
          })
       )
       .catch(next);
    }
    //[GET] /me/trash/courses
    trashCourses(req, res,next) {
      Course.findWithDeleted({deleted : true}).lean()
        .then(course => { 
          res.render('me/trash-courses',{ 
              title : "Khóa học đã xóa",
              course : course
          }); 
        })    
        .catch(next);    
  }

}

module.exports = new MeController();

