let Course = require('../models/Course');
let User = require('../models/User');


module.exports = async (req, res)=>{
    let reqBody = req.body;
    let cookieObj = req.cookies;
    let title = reqBody.title;
    let description = reqBody.description;
    let imgURL = reqBody.imageUrl;
    let status = reqBody.isPublic;
    let isPublic = (status == 'on') ? true : false; 
    let creator = cookieObj.userid;
    let titleValid = (title.length >= 4);
    let descriptionValid = (description.length >= 20 && description.length <= 50);
    let imgValid = (imgURL.startsWith('http'));
    let username = await User.findById(cookieObj.userid).username;
    let validData = (titleValid && descriptionValid && imgValid);
    let context = {
        layout:false,
        title,
        description,
        imgURL,
        username
    }
    if(validData){
        new Course({
            title,
            description,
            imgURL,
            isPublic,
            creator
        }).save().then(()=>{
            res.redirect('/');
        })
    }else {
        context.isError = true;
        if(!titleValid)
        context.errMsg = 'title must be at least 4 characters.';
        else if(!descriptionValid)
        context.errMsg = 'description must be at least 20 characters and at longest 50 characters.';
        else if(!imgValid)
        context.errMsg = 'image url must start with http/https.';
        res.render('create', context);
    }
}