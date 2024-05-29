const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose')


class SiteController {
    async index(req, res,next) {
        Course.find({})
          .then(course => { 
            res.render('home',{ 
                course : mutipleMongooseToObject(course) 
            }); 
          })    
          .catch(next);    
    }
    show(req, res) {
        res.render('New Detail !!!!');
    }
}

module.exports = new SiteController();

