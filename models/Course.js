let mongoose = require('mongoose');

let courseSchema = new mongoose.Schema({
    title: {type:String, required: true, unique: true, minlength: 4},
    description: {type:String, required: true, minlength: 20, maxlength: 50},
    imgURL: {type:String, required: true},
    isPublic: {type:Boolean, default: false},
    createdAt: { type: Date, default: Date.now, required: true },
    usersEnrolled: [{type:mongoose.Schema.Types.ObjectId, ref:"Users"}],
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "Users"}
})


module.exports = mongoose.model("Course", courseSchema);
