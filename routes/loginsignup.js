const express = require('express');
const session = require('express-session');
const router = express.Router();
const data = require('../data')


router.get('/', function(req,res){
    res.render("./loginsignup/login", {title:"login"})
})

router.get('/signup', function(req,res){
    res.render("./loginsignup/signup", {title:"signup"})
})

router.post('/signup', async function(req,res){
    let body = req.body;
    let usersdata = data.users

    let user = {
        "username": body.username,
        "password": body.password,
        "email": body.email,
        "firstname": body.firstname,
        "lastname": body.lastname,
        "usertype": body.usertype
    }
    try{
        let flag = await usersdata.addUser(user)
        if(flag){
            req.session.user = {username: body.username, usertype: body.usertype}
        }
        else{
            console.log("did not inserted")
        }
    }catch(e){
        console.log(e)
    }
    console.log(body.username)
})

router.post('/',async function(req,res){
    let body = req.body;
    let usersdata = data.users

    let user = {
        "username": body.username,
        "password": body.password
    }
    try{
        let flag = await usersdata.findUser(user)
        if(flag){
            req.session.user = {username: body.username}
            console.log("user entered");
        }
        else{
            console.log("wrong input");
        }
    }catch(e){
        console.log(e)
    }
})

module.exports = router