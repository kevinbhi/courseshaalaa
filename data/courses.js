const mongoCollections = require('../config/mongoCollections');
const courses = mongoCollections.courses;
const studentcourses =mongoCollections.studentcourses;
const { ObjectId } = require('mongodb');
const upload = require('express-fileupload')

module.exports = { 
    addcourse: async (course)=>{
        const coursescollection = await courses()
        const insertInfo = await coursescollection.updateOne({coursename: course.coursename, username: course.username},
            {  
                $setOnInsert: { 
                    "coursename": course.coursename,
                    "coursetag": course.coursetag,
                    "description": course.description,
                    "startdate": course.startdate,
                    "enddate": course.enddate,
                    "username": course.username,
                    "videos": [] 
                } 
            },{upsert:true});
        if(insertInfo.upsertedCount == 0){
            throw "course already exists"
        } 
        return true;
    },

    getcourses: async (username)=>{
        const coursescollection = await courses()
        const insertInfo = await coursescollection.find({ username: username }).toArray();
        return insertInfo;
    },
    
    getcourse: async (coursename,username)=>{
        const coursescollection = await courses()
        const insertInfo = await coursescollection.findOne({ username: username, coursename: coursename});
        return insertInfo;
    },

    //videos
    addvideo: async(video)=>{
        video._id = ObjectId();
        const coursescollection = await courses();
        insertInfo = await coursescollection.find({$and: [{"coursename":'Web Technologies'}, {"username":'user3'}]},{projection: {"videos":{$slice: -1}, "_id":0}}).toArray();
        if(insertInfo[0].videos[0]){
            video.sequencenumber = Number(insertInfo[0].videos[0].sequencenumber) + 1;
        }
        else{
            video.sequencenumber = 1
        }
        console.log(video.sequencenumber)
        insertInfo = await coursescollection.update({$and: [{"coursename":video.coursename}, {"username":video.username}]}, {$push: {"videos": video}})
    },

    getallvideodetails: async(coursename,username)=>{
        const coursescollection = await courses();
        const findInfo = await coursescollection.find({$and: [{"coursename":coursename}, {"username":username}]}, {projection : {"videos": 1, "_id":0}}).toArray();
        return findInfo;
    },

    deletevideo: async(coursename,username,sequencenumber)=>{
        const coursescollection = await courses();
        
        const findvalue = await coursescollection.updateMany({$and: [{"coursename":coursename}, {"username":username}]}, {$pull: { "videos" : {"sequencenumber" : Number(sequencenumber)}}});
        console.log(findvalue)

        const updateInfo2 = await coursescollection.updateMany({$and: [{"coursename":coursename}, {"username":username}]} , {$inc : { "videos.$[elements].sequencenumber": -1}},{ "arrayFilters": [  { "elements.sequencenumber": {$gt : Number(sequencenumber)}}] });
        console.log(updateInfo2);
        
        return;
    },

    //assignments
    gettotalssignments: async(coursename,username)=>{
        const coursescollection = await courses();

        const assignments = await coursescollection.find({$and: [{"coursename":coursename}, {"username":username}]},{projection: {"Assignments":1, "_id":0}}).toArray();
        return assignments;
    },

    studentsperassignment: async(coursename,teacherusername,assignment_id)=>{
        const studentcoursescollection = await studentcourses();

        const assignments = await studentcoursescollection.find({$and: [{"coursename":coursename}, {"teacherusername":teacherusername},{"assignments.assignment_id": ObjectId(assignment_id)}]},{projection: {"assignments":1, "studentusername": 1, "_id":0}}).toArray();
        return assignments;
    }
}
