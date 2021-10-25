let Course = require('../models/Course');
module.exports = async (req, res)=>{
    let id = req.params.id;
    let cookieObj = req.cookies;
    let userid = cookieObj.userid;
    let courseToEnrollIn = await Course.findById(id);
    courseToEnrollIn.usersEnrolled.push(userid);
    courseToEnrollIn.save();
    res.redirect(`/details/${id}`);
}