let bcrypt = require('bcrypt');
let User = require('../models/User');
module.exports = (req, res) => {
    let reqBody = req.body;
    let passSame = (reqBody.password == reqBody.repeatPassword);
    let isAtLeast5 = (reqBody.username.length >= 5 && reqBody.password.length >= 5 && reqBody.repeatPassword.length >= 5);
    let englishRegex = new RegExp('[A-Z]', 'gi'); //will match all and is case insensitive
    let isEnglish = englishRegex.test(reqBody.username);
    let validData = (passSame && isAtLeast5 && isEnglish);
    let configObj = require('../config/config');
    let saltRounds = configObj.saltRounds;
    let context = {
        layout:false, 
        usernameInput: reqBody.username, 
        passwordInput: reqBody.password, 
        rPasswordInput: reqBody.repeatPassword
    };
    if(validData) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(reqBody.password, salt,function(err, hash) {
                new User({
                    username: reqBody.username,
                    password: hash
                }).save().then(()=>{
                    res.redirect('/login');
                })
            });
          });
    }else {
        context.isError = true;
        if(!isAtLeast5 || !isEnglish)
        context.errMsg = 'inputs must be at least 5 English characters.';
        else if(!passSame)
        context.errMsg = 'passwords must be the same.';
        res.render('register', context);
    }
    
    
    
};