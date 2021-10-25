let Course = require('../models/Course');
module.exports = (req, res)=>{
    let id = req.params.id;
    Course.findByIdAndDelete(id, ()=>{
        res.redirect('/');
    })
}