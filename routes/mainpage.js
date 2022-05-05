const express = require("express");
const session = require("express-session");
const upload = require("express-fileupload");
const fs = require("fs");
const res = require("express/lib/response");
const router = express.Router();
const data = require("../data");
const AppError = require("../middleware/appError");
const { ErrorType } = require("../middleware/enum");

router.use(upload());

router.get("/", async function (req, res, next) {
  try {
    // let username = req.session.user.username;
    let username = "user3";
    let coursesData = data.courses;
    let courses = await coursesData.getcourses(username);
    for (x in courses) {
      let string = "";
      for (let y of courses[x].description) {
        string = string + y;
        if (y === ".") {
          string = string + y;
          break;
        }
      }
      courses[x].description = string;
    }

    res.render("./mainpage/teachers", { navbar: true, courses: courses });
  } catch (error) {
    next(error);
  }
});

router.get("/createcourse", async function (req, res) {
  res.render("./mainpage/createcourse", { navbar: true });
});

router.post("/addcourse", async function (req, res, next) {
  let body = req.body;
  try {
    if (
      !body.coursename ||
      !body.coursetag ||
      !body.description ||
      !body.startdate ||
      !body.enddate
    ) {
      throw new AppError(
        "Please insert all the values",
        ErrorType.validation_error
      );
    }
  } catch (error) {
    return next(error);
  }
  let course = {
    coursename: body.coursename,
    coursetag: body.coursetag,
    description: body.description,
    startdate: body.startdate,
    enddate: body.enddate,
    deployed: 0,
    // username: req.session.user.username
  };
  course.username = "user3";
  let coursesData = data.courses;
  try {
    let flag = await coursesData.addcourse(course);
    if (flag === "true") {
      res.redirect("/mainpage");
    } else {
      console.log("did not inserted");
      throw new AppError("Failed to insert", ErrorType.unknown_error);
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/gettagsfordropdown", async function (req, res, next) {
  try {
    let coursesData = data.courses;
    let tags = await coursesData.gettagsdropdown("tags");
    console.log(tags[0].tags);
    return res.json({ tags: tags[0].tags });
  } catch (error) {
    next(error);
  }
});

router.get("/uploadedvideos/:id", async function (req, res, next) {
  try {
    // let username = req.session.user.username;
    // let coursename = req.params.id;

    let username = "user3";
    let coursename = "Web Technologies";
    coursename = decodeURI(coursename);
    let videodetails = data.courses;
    let result = await videodetails.getallvideodetails(coursename, username);
    if (!result) {
      throw new AppError("failed to get all video", ErrorType.unknown_error);
    }
    result = JSON.stringify(result);
    // console.log(result)
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async function (req, res, next) {
  // const coursename = req.params.id
  // const username = req.session.user.username

  const username = "user3";
  const coursename = "Web Technologies";
  let coursedata = data.courses;
  try {
    let data = await coursedata.getcourse(coursename, username);
    data.coursename = encodeURI(data.coursename);
    res.render("./mainpage/coursedetails", { navbar: true, data: data });
  } catch (e) {
    next(e);
  }
  console.log(coursename);
});

router.post("/uploadvideo", async function (req, res, next) {
  let filedata = req.files.video;
  let filename = req.files.video.name;

  // let username = req.session.user.username;
  let username = "user3";
  let coursename = decodeURI(req.body.coursename);
  let videotitle = decodeURI(req.body.videotitle);
  let sequencenumber = decodeURI(req.body.sequencenumber);
  let videodescription = decodeURI(req.body.description);

  let initialpath = "/public/uploads/";

  try {
    if (!fs.existsSync("." + initialpath + username)) {
      fs.mkdirSync("." + initialpath + username);
    }
    if (!fs.existsSync("." + initialpath + username + "/" + coursename)) {
      fs.mkdirSync("." + initialpath + username + "/" + coursename);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }

  let finalpath = initialpath + username + "/" + coursename + "/";

  filedata.mv("." + finalpath + filename, function (err) {
    if (err) {
      // return res.json({true: true})
    } else {
      // return res.json({true: true})
    }
  });

  let transferdata = {
    username: username,
    coursename: coursename,
    videotitle: videotitle,
    sequencenumber: sequencenumber,
    videodescription: videodescription,
    path: finalpath + filename,
  };
  let addvideo = data.courses;
  try {
    let result = await addvideo.addvideo(transferdata);
    // testing file names

    return res.json({ status: true, data: transferdata });
  } catch (error) {
    next(error);
  }
});

router.post("/deletevideo", async function (req, res, next) {
  try {
    // let username = req.session.user.username;

    let reqdata = req.body;
    let username = "user3";
    let coursename = decodeURI(reqdata.coursename);
    let sequencenumber = decodeURI(reqdata.deleteId);
    let path = decodeURI(reqdata.path);
    console.log(path);
    if (fs.existsSync("." + path)) {
      console.log("true");
      fs.unlinkSync("." + path);
    }
    console.log(username + " " + coursename + " " + sequencenumber);

    // for deleting data in database
    let videos = data.courses;
    let result = await videos.deletevideo(coursename, username, sequencenumber);

    return res.json({ status: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
