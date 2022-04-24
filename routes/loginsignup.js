const express = require('express');
const router = express.Router();

router.get('/', function(req,res){
    res.render("./loginsignup/login", {title:"login"})
})

router.get('/signup', function(req,res){
    res.render("./loginsignup/signup", {title:"login"})
})

router.post('/signup', function(req,res){
    let body = req.body;
    let username = body.username
    let password =body.password
    let email = body.email
    let usertype = body.usertype

    console.log(username)
    
})
module.exports = router