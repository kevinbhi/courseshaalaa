const loginsignup = require('./loginsignup')
const mainpage = require('./mainpage')
const gradespage = require('./gradespage')

const constructorMethod = (app) => {

    app.use('/login',loginsignup);

    app.use('/mainpage',mainpage);

    app.use('/grades',gradespage);

    app.use('*', (req, res) => {
        res.sendStatus(404);
    });
}

module.exports = constructorMethod