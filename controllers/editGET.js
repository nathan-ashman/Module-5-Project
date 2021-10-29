let Course = require('../models/Course');
const jwt = require('jsonwebtoken');
let configObj = require('../config/config');
const secret = configObj.jwtSecret;

module.exports = async (req, res)=>{
    let context = {layout:false};
    let cookieObj = req.cookies;
    let id = req.params.id;
    let currCourse = await Course.findById(id);

    context.title = currCourse.title;
    context.description = currCourse.description;
    context.imgURL = currCourse.imgURL;
    context.username = jwt.verify(cookieObj.username, secret).username;

    res.render('edit', context);
}