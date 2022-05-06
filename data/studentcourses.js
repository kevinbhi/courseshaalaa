const mongoCollections = require("../config/mongoCollections");
const courses = mongoCollections.courses;
const studentcourses = mongoCollections.studentcourses;
const { ObjectId } = require("mongodb");
const upload = require("express-fileupload");
const { dropdowndata } = require("../config/mongoCollections");
const AppError = require("../middleware/appError");
const { ErrorType } = require("../middleware/enum");


async function gettagsdropdown(type){
    const dropdowndatacollection = await dropdowndata();
      const info = await dropdowndatacollection.find({}).toArray();
      if (!info) {
        throw new AppError("failed to get tags", ErrorType.not_found);
      }
      return info;

}
async function addcourse(coursename,studentusername,teacherusername,type){
    const scoursescollection = await studentcourses();
    let stud = {
        // _id: ObjectId, 
        coursename: coursename.trim(),
        studentusername: studentusername,
        teacherusername: teacherusername,
        type: type,
        assignments: []
        
    }
    const insertInfo = await scoursescollection.insertOne(stud);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw 'Could not add';
    console.log( await`${coursename} created`)
    const newId = insertInfo.insertedId.toString();

    // const bad = await this.get(newId);
    // return bad;
    return newId
}



async function recommendedcourses(){
    const coursescollection = await courses();
        const insertInfo = await coursescollection
          .find({})
          .toArray();
        return insertInfo;
}

async function enrolledcourses(username){
    const coursescollection = await studentcourses();
        const enrolledinfo = await coursescollection
          .find({ $and: [{ studentusername: username },{type:"enrolled"}]},{ projection: { coursename: 1, _id: 0 } })
          .toArray();
        return enrolledinfo;
}
async function main(){
    console.log(await recommendedcourses())
}
main()
module.exports={
    addcourse,
    recommendedcourses,
    enrolledcourses
}