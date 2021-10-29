let Course = require('../models/Course');


module.exports = async (req, res)=>{
    let id = req.params.id;
    let reqBody = req.body;
    let title = reqBody.title;
    let description = reqBody.description;
    let imgURL = reqBody.imageUrl;
    let titleValid = (title.length >= 4);
    let descriptionValid = (description.length >= 20 && description.length <= 50);
    let imgValid = (imgURL.startsWith('http'));
    let validData = (titleValid && descriptionValid && imgValid);
    let context = {
        layout:false,
        title,
        description,
        imgURL
    }
    if(validData){
        Course.findByIdAndUpdate(id, {title,description,imgURL}, ()=>{
            res.redirect('/');
        })
    }else {
        context.isError = true;
        if(!titleValid)
        context.errMsg = 'title must be at least 4 characters.';
        else if(!descriptionValid)
        context.errMsg = `description must be at least 20 characters and at most 50 characters. (${description.length} characters long.)`;
        else if(!imgValid)
        context.errMsg = 'image url must start with http/https.';
        res.render('edit', context);
    }
    
}