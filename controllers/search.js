let Course = require('../models/Course');
let jwt = require('jsonwebtoken');
let configObj = require('../config/config');
const secret = configObj.jwtSecret;
module.exports = async (req, res)=>{
    let query = req.query;
    let searchRegex = new RegExp(query.search,'gi')
    console.log(query);
    let cookies = req.cookies;
    let context = {
        layout:false
    }
    
    if(cookies.username){
        context.username = jwt.verify(cookies.username, secret).username;
        context.loggedIn = true;
    }else {
        context.loggedIn = false;
    }


    let courses = await Course.find({});
    courses.sort((a,b)=> {
        let aMSecs = a.createdAt.getMilliseconds();
        let bMSecs = b.createdAt.getMilliseconds();
        return aMSecs - bMSecs;
    })

    for(let course of courses){
        let origDate = course.createdAt;
        let month = origDate.getMonth();
        let dayNum = origDate.getDate();
        let year = origDate.getFullYear();
        let dayOfWeek = origDate.getDay();
        let hours = origDate.getHours();
        let minutes = origDate.getMinutes();
        let seconds = origDate.getSeconds();

        let fullDate = `${dayOfWeek} ${month} ${dayNum} ${year} ${hours}:${minutes}:${seconds}`
        course.createdAt = fullDate;
    }

    let filteredCourses = courses.filter(course => searchRegex.test(course.title));
    if(filteredCourses.length > 0){
        context.matchingCourses = filteredCourses.map(c=>c.toJSON());
    }else {
        context.matchingCourses = null;
    }

    res.render('search', context);
}