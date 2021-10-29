let bcrypt = require('bcrypt');
let User = require('../models/User');
const jwt = require('jsonwebtoken');
const configObj = require('../config/config');
const secret = configObj.jwtSecret;
const options = configObj.options;
module.exports = async (req, res) => {
    let reqBody = req.body;
    let username = reqBody.username;
    let password = reqBody.password;
    let isAtLeast5 = (reqBody.username.length >= 5 && reqBody.password.length >= 5);
    let context = {
        layout:false, 
        usernameInput: username, 
        passwordInput: password, 
    };
    let existingUser = await User.findOne({username}).then(user=>{return user});
    if(existingUser){
        bcrypt.compare(password, existingUser.password, (err, result)=>{
            if(result == true){
                let payload = {
                    _id: existingUser._id,
                    username,
                }
                let token = jwt.sign(payload, secret, options);
                res.cookie('username', token);
                res.cookie('userid', existingUser._id);
                res.redirect('/');
            }
        });
    }else {
        context.isError = true;
        if(!isAtLeast5)
        context.errMsg = `inputs must be at least 5 characters. (username ${username.length} characters and password ${password.length} characters.)`;
        //        context.errMsg = `description must be at least 20 characters and at most 50 characters. (${description.length} characters long.)`;

        else
        context.errMsg = 'invalid data.';
        res.render('login', context);
    }
};