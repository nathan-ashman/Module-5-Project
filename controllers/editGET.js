let Course = require('../models/Course');


module.exports = async (req, res)=>{
    let context = {layout:false};
    let cookieObj = req.cookies;
    let id = req.params.id;
    let currCourse = await Course.findById(id);

    context.title = currCourse.title;
    context.description = currCourse.description;
    context.imgURL = currCourse.imgURL;

    res.render('edit', context);
}