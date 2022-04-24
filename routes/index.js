const loginsignup = require('./loginsignup')

const constructorMethod = (app) => {
    app.use('/',loginsignup);

    app.use('*', (req, res) => {
        res.sendStatus(404);
    });
}

module.exports = constructorMethod