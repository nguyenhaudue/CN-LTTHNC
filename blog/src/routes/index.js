
const meRouter = require('./me');    
const siteRouter = require('./site');
const coursesRouter = require('./course');
const searchRouter = require('./search');

function route(app){
      app.use('/me',meRouter);
      app.use('/',siteRouter);
      app.use('/courses',coursesRouter);
      app.use('/search', searchRouter);
}
module.exports = route;