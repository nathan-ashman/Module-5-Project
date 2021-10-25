let registerPOST = require('../controllers/registerPOST');
let loginPOST = require('../controllers/loginPOST');
let homeGET = require('../controllers/homeGET');
let createPOST = require('../controllers/createPOST');
let detailsGET = require('../controllers/detailsGET');
let editGET = require('../controllers/editGET');
let editPOST = require('../controllers/editPOST');
let deleteCourse = require('../controllers/delete');
const enroll = require('../controllers/enroll');
module.exports = (app)=>{
    app.get('/', homeGET);

    app.get('/details/:id',detailsGET);

    app.get('/course/create', (req, res)=>{
        res.render('create', {layout:false});
    });

    app.post('/course/create', createPOST);    

    app.get('/register', (req, res)=>{
        res.render('register', {layout:false});
    });
    app.post('/register', registerPOST);

    app.get('/login', (req, res)=>{
        res.render('login', {layout:false});
    });

    app.post('/login', loginPOST);

    app.get('/course/edit/:id', editGET);
    app.post('/course/edit/:id', editPOST);

    app.get('/course/delete/:id', deleteCourse);
    app.get('/course/enroll/:id', enroll);


    app.get('/logout', (req, res)=>{
        res.clearCookie('username');
        res.clearCookie('userid');
        res.redirect('/');
    })
    
}