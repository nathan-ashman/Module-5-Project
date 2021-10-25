module.exports = {
    development: {
        port: process.env.PORT || 3000
    },
    production: {},
    saltRounds: 9,
    jwtSecret:"user log in",
    options: {expiresIn: '2d'}
};