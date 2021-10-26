let Course = require('../models/Course');
const jwt = require('jsonwebtoken');
let configObj = require('../config/config');
const secret = configObj.jwtSecret;
module.exports =  async (req, res)=>{
    let cookieObj = req.cookies;
    let context = {layout:false};
    let id = req.params.id;
    
    context.id = id;
    let currCourse = await Course.findById(id);
    context.imgURL = currCourse.imgURL;
    context.username = jwt.verify(cookieObj.username, secret).username;
    context.description = currCourse.description;
    context.title = currCourse.title;
    let enrolledList = currCourse.usersEnrolled;
    let userId = cookieObj.userid;
    let matchingUser;
    
    if(enrolledList)
    matchingUser = enrolledList.find(currid=>currid == userId);
    
    context.alreadyEnrolled = (matchingUser) ? true : false;
    context.loggedIn = (cookieObj.username) ? true : false;
    context.areCreator = (cookieObj.userid == currCourse.creator) ? true : false;
    
    res.render('details',context);
}