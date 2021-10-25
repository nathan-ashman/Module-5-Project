const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.js')[env];
const app = require('express')();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
require('./config/db.js')(app);
require('./config/express')(app);
require('./config/routes')(app);

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));