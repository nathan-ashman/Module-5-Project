let mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
    username: {type:String, minlength: 5,  required:true},
    password: {type:String, minlength:5, required:true},
})

module.exports = mongoose.model("User",userSchema);