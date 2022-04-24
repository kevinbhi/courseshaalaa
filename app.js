const express = require('express')
const app = express()

//Public directory(View)
const exphbs = require('express-handlebars');
const static = express.static(__dirname + '/public');
const Handlebars = require('handlebars');
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/public', static);

// For routes
const configRoutes = require('./routes')
app.use(express.json())
app.use(express.urlencoded({extended: true}));

configRoutes(app)

app.listen(3000, ()=>{
    console.log("your server is ready!")
    console.log('Your routes will be running on http://localhost:3000');
})

