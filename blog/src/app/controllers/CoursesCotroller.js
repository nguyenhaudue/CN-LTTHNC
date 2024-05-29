const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose')


class CoursesController {
    show(req, res,next) {
        Course.findOne({ slug : req.params.slug})
        .then(course => {
            res.render('courses/show' , { course : mongooseToObject(course) });
        })
        .catch(next);
    }
    

    // [GET] /courses/create
    create(req ,res, next){
        res.render('courses/create')
    }

    // [POST] /courses/store  // Thêm dữ liệu vào trong MongoDB
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/maxresdefault.jpg`;

    
        const course = new Course(formData);
        
        course.save()
        .then(() => res.redirect('/me/stored/courses'))
        .catch(error => {
                // Xử lý lỗi, ví dụ như chuyển nó đến middleware tiếp theo
                //next(error);
            });
           
    }
    // [GET] /courses/:id/edit
    edit(req, res, next){
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course)
            }))
            .catch(next);
    }

    // [PUT] /courses/:id  Sữa 1 cái gì view trong mongodb
    update(req,res,next){
       Course.updateOne({_id : req.params.id } , req.body)
          .then( () => res.redirect('/me/stored/courses'))
          .catch(next)
    }
    
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
          .then(() => res.redirect('back'))
          .catch(next);
    }
    
  
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
        
      }
     // [PATH]  /courses/:id/restore // Khôi phục dữ liệu đã xóa
    restore(req,res,next){
        Course.restore({_id : req.params.id })
            .then( () => res.redirect('back'))
            .catch(next)    
    }

    //[POST] /courses/handle-form-actions
    handleFormActions(req,res,next){
      switch(req.body.action){
        case 'delete':
            Course.delete({_id : {$in:req.params.courseIds} })
                .then( () => res.redirect('back'))
                .catch(next)
            break;
        default:
            res.json({message : 'Action is invalid!'});    
      }
    }
}

module.exports = new CoursesController();