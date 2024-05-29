const Course = require('../models/Course');

exports.search = async (req, res) => {
    try {
        const name = req.query.name;
        let courses = [];

        if (name) {
            // Lọc các khóa học có tên chứa từ khóa tìm kiếm
            courses = await Course.find({ name: { $regex: new RegExp(name, "i") } });
        } else {
            // Nếu không có tên được nhập, lấy tất cả các khóa học
            courses = await Course.find();
        }

        res.render('home', { posts: courses });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};
