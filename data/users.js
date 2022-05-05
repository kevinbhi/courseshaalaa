const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt')
const saltRounds = 16;

module.exports = {
    addUser: async (user)=>{
        const userscollection = await users();
        let password = await bcrypt.hash(user.password, saltRounds);

        const insertInfo = await userscollection.updateOne({username: user.username},
            {  
                $setOnInsert: { 
                    "password": password,
                    "email": user.email,
                    "firstname": user.firstname,
                    "lastname": user.lastname,
                    "usertype": user.usertype
                } 
            },{upsert:true});
        if(insertInfo.upsertedCount == 0){
            throw "username already exists"
        } 
        return true;
    },

    findUser: async (user)=>{
        const userscollection = await users();
        const searchedUser = await userscollection.findOne({username: user.username});
        if(searchedUser){
            if (await bcrypt.compare(user.password,searchedUser.password)){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }
}