require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const {
  v4: uuidv4
} = require('uuid'); // uuid, To call: uuidv4();
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const _ = require("lodash");

const User = require('./models/user');

//created modules
const homeRouter = require('./controllers/home');
const registerRouter = require('./controllers/register');
const loginRouter = require('./controllers/login');

const depReport = require('./assets/departments-report');
const lectReport = require('./assets/lecturers-report');

const depEditLect = require('./assets/departments-edit-lec');

const userWindow = require('./assets/user-window');
const adminWindow = require('./assets/admin');
const mainModules = require('./assets/main-modules');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(express.static("models"));
app.use(express.static("assets"));

app.use("/", homeRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.use(bodyParser.urlencoded({
  limit: '150mb',
  extended: true,
  parameterLimit: 1000000
}));

app.use(session({
  genid: function (req) {
    return uuidv4();
  },
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 360 * 1000,
    secure: false
  } // 6 hour
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.post("/register", (req, res) => {
  mainModules.postRegister(req, res);
});
app.post("/login", (req, res) => {
  mainModules.postLogin(req, res);
});

// METHOD FOR LOG
app.get("/admin/history-log", isLoggedIn, (req, res) => {

  //var HistoryUser = User.historyModel();
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  User.findById(req.user.id, function (err, foundUser) {
    if (err) throw err;
    if (foundUser.role === "administratorius") {
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        var dbo = db.db("reportsDB_v2");
        dbo.collection("__historiesPlugin")
          .find({}).toArray(function (err, _historiesPlugin) {
            if (err) throw err;
            //console.log(_historiesPlugin.collectionId);
            //console.log(_historiesPlugin);
            res.render("admin-history-log", {
              users_history: _historiesPlugin
            });
            db.close();
          });
      });
    } else {
      console.log("You do not have permission");
      res.redirect("/login");
    }
  });
});

//---------------------LECTURER-------------------
//Create/update/submit lecturer report
app.get("/2022-2023/create", isLoggedIn, (req, res) => {
  lectReport.getCreate22_23(req, res);
});
app.get("/2023-2024/create", isLoggedIn, (req, res) => {
  lectReport.getCreate23_24(req, res);
});
app.get("/2024-2025/create", isLoggedIn, (req, res) => {
  lectReport.getCreate24_25(req, res);
});
app.get("/2025-2026/create", isLoggedIn, (req, res) => {
  lectReport.getCreate25_26(req, res);
});
app.post("/create-2022-2023", isLoggedIn, (req, res) => {
  lectReport.postCreate22_23(req, res);
});
app.post("/create-2023-2024", isLoggedIn, (req, res) => {
  lectReport.postCreate23_24(req, res);
});
app.post("/create-2024-2025", isLoggedIn, (req, res) => {
  lectReport.postCreate24_25(req, res);
});
app.post("/create-2025-2026", isLoggedIn, (req, res) => {
  lectReport.postCreate25_26(req, res);
});
app.get("/2022-2023/edit", isLoggedIn, (req, res) => {
  lectReport.getUpdate22_23(req, res);
});
app.get("/2023-2024/edit", isLoggedIn, (req, res) => {
  lectReport.getUpdate23_24(req, res);
});
app.get("/2024-2025/edit", isLoggedIn, (req, res) => {
  lectReport.getUpdate24_25(req, res);
});
app.get("/2025-2026/edit", isLoggedIn, (req, res) => {
  lectReport.getUpdate25_26(req, res);
});
app.post("/update-2022-2023", isLoggedIn, (req, res) => {
  lectReport.postUpdate22_23(req, res);
});
app.post("/update-2023-2024", isLoggedIn, (req, res) => {
  lectReport.postUpdate23_24(req, res);
});
app.post("/update-2024-2025", isLoggedIn, (req, res) => {
  lectReport.postUpdate24_25(req, res);
});
app.post("/update-2025-2026", isLoggedIn, (req, res) => {
  lectReport.postUpdate25_26(req, res);
});
app.get("/2022-2023/submit", isLoggedIn, (req, res) => {
  lectReport.getSubmit22_23(req, res);
});
app.get("/2023-2024/submit", isLoggedIn, (req, res) => {
  lectReport.getSubmit23_24(req, res);
});
app.get("/2024-2025/submit", isLoggedIn, (req, res) => {
  lectReport.getSubmit24_25(req, res);
});
app.get("/2025-2026/submit", isLoggedIn, (req, res) => {
  lectReport.getSubmit25_26(req, res);
});
app.post("/submit-2022-2023", isLoggedIn, (req, res) => {
  lectReport.postSubmit22_23(req, res);
});
app.post("/submit-2023-2024", isLoggedIn, (req, res) => {
  lectReport.postSubmit23_24(req, res);
});
app.post("/submit-2024-2025", isLoggedIn, (req, res) => {
  lectReport.postSubmit24_25(req, res);
});
app.post("/submit-2025-2026", isLoggedIn, (req, res) => {
  lectReport.postSubmit25_26(req, res);
});
//---------------------HEAD OF DEPARTMENT-------------------
//Create/update/submit head of department report
app.get("/department/2022-2023/create", isLoggedIn, (req, res) => {
  depReport.getCreate22_23(req, res);
});
app.get("/department/2023-2024/create", isLoggedIn, (req, res) => {
  depReport.getCreate23_24(req, res);
});
app.get("/department/2024-2025/create", isLoggedIn, (req, res) => {
  depReport.getCreate24_25(req, res);
});
app.get("/department/2025-2026/create", isLoggedIn, (req, res) => {
  depReport.getCreate25_26(req, res);
});
app.post("/dep-create-2022-2023", isLoggedIn, (req, res) => {
  depReport.postCreate22_23(req, res);
});
app.post("/dep-create-2023-2024", isLoggedIn, (req, res) => {
  depReport.postCreate23_24(req, res);
});
app.post("/dep-create-2024-2025", isLoggedIn, (req, res) => {
  depReport.postCreate24_25(req, res);
});
app.post("/dep-create-2025-2026", isLoggedIn, (req, res) => {
  depReport.postCreate25_26(req, res);
});
app.get("/department/2022-2023/edit", isLoggedIn, (req, res) => {
  depReport.getEdit22_23(req, res);
});
app.get("/department/2023-2024/edit", isLoggedIn, (req, res) => {
  depReport.getEdit23_24(req, res);
});
app.get("/department/2024-2025/edit", isLoggedIn, (req, res) => {
  depReport.getEdit24_25(req, res);
});
app.get("/department/2025-2026/edit", isLoggedIn, (req, res) => {
  depReport.getEdit25_26(req, res);
});
app.post("/dep-update-2022-2023", isLoggedIn, (req, res) => {
  depReport.postUpdate22_23(req, res);
});
app.post("/dep-update-2023-2024", isLoggedIn, (req, res) => {
  depReport.postUpdate23_24(req, res);
});
app.post("/dep-update-2024-2025", isLoggedIn, (req, res) => {
  depReport.postUpdate24_25(req, res);
});
app.post("/dep-update-2025-2026", isLoggedIn, (req, res) => {
  depReport.postUpdate25_26(req, res);
});
app.get("/department/2022-2023/submit", isLoggedIn, (req, res) => {
  depReport.getSubmit22_23(req, res);
});
app.get("/department/2023-2024/submit", isLoggedIn, (req, res) => {
  depReport.getSubmit23_24(req, res);
});
app.get("/department/2024-2025/submit", isLoggedIn, (req, res) => {
  depReport.getSubmit24_25(req, res);
});
app.get("/department/2025-2026/submit", isLoggedIn, (req, res) => {
  depReport.getSubmit25_26(req, res);
});
app.post("/dep-submit-2022-2023", isLoggedIn, (req, res) => {
  depReport.postSubmit22_23(req, res);
});
app.post("/dep-submit-2023-2024", isLoggedIn, (req, res) => {
  depReport.postSubmit23_24(req, res);
});
app.post("/dep-submit-2024-2025", isLoggedIn, (req, res) => {
  depReport.postSubmit24_25(req, res);
});
app.post("/dep-submit-2025-2026", isLoggedIn, (req, res) => {
  depReport.postSubmit25_26(req, res);
});
//User windows for lecturer and head of department
app.get("/user-window", isLoggedIn, (req, res) => {
  userWindow.getUserWindow(req, res);
});
app.post("/update-user", isLoggedIn, (req, res) => {
  userWindow.postUpdateUser(req, res);
});
app.get("/user-window-selection", isLoggedIn, (req, res) => {
  userWindow.getSelection(req, res);
});
app.post("/update-user-window-selection-role", isLoggedIn, (req, res) => {
  userWindow.postChangeRole(req, res);
});
app.get("/2022-2023/user-window", isLoggedIn, (req, res) => {
  userWindow.getByYear22_23(req, res);
});
app.get("/2023-2024/user-window", isLoggedIn, (req, res) => {
  userWindow.getByYear23_24(req, res);
});
app.get("/2024-2025/user-window", isLoggedIn, (req, res) => {
  userWindow.getByYear24_25(req, res);
});
app.get("/2025-2026/user-window", isLoggedIn, (req, res) => {
  userWindow.getByYear25_26(req, res);
});
//Head of department updates number of lecturers by year
app.post("/update-user-dep-2022-2023", isLoggedIn, (req, res) => {
  userWindow.postUpdateUserDep22_23(req, res);
});
app.post("/update-user-dep-2023-2024", isLoggedIn, (req, res) => {
  userWindow.postUpdateUserDep23_24(req, res);
});
app.post("/update-user-dep-2024-2025", isLoggedIn, (req, res) => {
  userWindow.postUpdateUserDep24_25(req, res);
});
app.post("/update-user-dep-2025-2026", isLoggedIn, (req, res) => {
  userWindow.postUpdateUserDep25_26(req, res);
});
//Head of department receives a list of lecturers by year
app.get("/department/2022-2023/lecturers-list", isLoggedIn, (req, res) => {
  depEditLect.getLecturersList22_23(req, res);
});
app.get("/department/2022-2023/lecturers-list/:page", isLoggedIn, (req, res) => {
  depEditLect.getLecturersList22_23(req, res);
});
app.get("/department/2023-2024/lecturers-list", isLoggedIn, (req, res) => {
  depEditLect.getLecturersList23_24(req, res);
});
app.get("/department/2023-2024/lecturers-list/:page", isLoggedIn, (req, res) => {
  depEditLect.getLecturersList23_24(req, res);
});
app.get("/department/2024-2025/lecturers-list", isLoggedIn, (req, res) => {
  depEditLect.getLecturersList24_25(req, res);
});
app.get("/department/2024-2025/lecturers-list/:page", isLoggedIn, (req, res) => {
  depEditLect.getLecturersList24_25(req, res);
});
app.get("/department/2025-2026/lecturers-list", isLoggedIn, (req, res) => {
  depEditLect.getLecturersList25_26(req, res);
});
app.get("/department/2025-2026/lecturers-list/:page", isLoggedIn, (req, res) => {
  depEditLect.getLecturersList25_26(req, res);
});
//Head of department updates the status of lecturers by year
app.get("/department/2022-2023/edit-user/:userId", isLoggedIn, (req, res) => {
  depEditLect.getEditLec22_23(req, res);
});
app.get("/department/2023-2024/edit-user/:userId", isLoggedIn, (req, res) => {
  depEditLect.getEditLec23_24(req, res);
});
app.get("/department/2024-2025/edit-user/:userId", isLoggedIn, (req, res) => {
  depEditLect.getEditLec24_25(req, res);
});
app.get("/department/2025-2026/edit-user/:userId", isLoggedIn, (req, res) => {
  depEditLect.getEditLec25_26(req, res);
});
app.post("/update-user-info-dep-2022-2023", isLoggedIn, (req, res) => {
  depEditLect.postEditLec22_23(req, res);
});
app.post("/update-user-info-dep-2023-2024", isLoggedIn, (req, res) => {
  depEditLect.postEditLec23_24(req, res);
});
app.post("/update-user-info-dep-2024-2025", isLoggedIn, (req, res) => {
  depEditLect.postEditLec24_25(req, res);
});
app.post("/update-user-info-dep-2025-2026", isLoggedIn, (req, res) => {
  depEditLect.postEditLec25_26(req, res);
});
//Head of department receives a list of lecturers reports by year
app.get("/department/2022-2023/edit-lecturer-report/:userId", isLoggedIn, (req, res) => {
  lectReport.getEditLecReport22_23(req, res);
});
app.get("/department/2023-2024/edit-lecturer-report/:userId", isLoggedIn, (req, res) => {
  lectReport.getEditLecReport23_24(req, res);
});
app.get("/department/2024-2025/edit-lecturer-report/:userId", isLoggedIn, (req, res) => {
  lectReport.getEditLecReport24_25(req, res);
});
app.get("/department/2025-2026/edit-lecturer-report/:userId", isLoggedIn, (req, res) => {
  lectReport.getEditLecReport25_26(req, res);
});
//Head of department updates a report of lecturers by year
app.post("/update-report-lecturer-dep-2022-2023", isLoggedIn, (req, res) => {
  lectReport.postReportLec22_23(req, res);
});
app.post("/update-report-lecturer-dep-2023-2024", isLoggedIn, (req, res) => {
  lectReport.postReportLec23_24(req, res);
});
app.post("/update-report-lecturer-dep-2024-2025", isLoggedIn, (req, res) => {
  lectReport.postReportLec24_25(req, res);
});
app.post("/update-report-lecturer-dep-2025-2026", isLoggedIn, (req, res) => {
  lectReport.postReportLec25_26(req, res);
});
//------------------ADMIN-----------------------
//Profile
app.get("/admin/profile", isLoggedIn, (req, res) => {
  adminWindow.getProfile(req, res);
});
app.post("/update-profile-admin", isLoggedIn, (req, res) => {
  adminWindow.postUpdateProfile(req, res);
});
//Main list with ALL db users
app.get("/admin/users", isLoggedIn, (req, res) => {
  adminWindow.getAllUsers(req, res);
});
app.get("/admin/users/:page", isLoggedIn, (req, res) => {
  adminWindow.getAllUsers(req, res);
});
app.get("/admin/users/edit/:userId", isLoggedIn, (req, res) => {
  adminWindow.getUpdateUserInfo(req, res);
});
app.post("/update-user-info-admin", isLoggedIn, (req, res) => {
  adminWindow.postUpdateUserInfo(req, res);
});
app.post("/delete", (req, res) => {
  adminWindow.postDeleteUser(req, res);
});
//----Faculties----
app.get("/admin/faculties", isLoggedIn, (req, res) => {
  adminWindow.getFaculties(req, res);
});
app.get("/admin/faculties/create", isLoggedIn, (req, res) => {
  adminWindow.getCreateFaculty(req, res);
});
app.get("/admin/faculties/edit/:facultyId", isLoggedIn, (req, res) => {
  adminWindow.getUpdateFaculty(req, res);
});
app.post("/create-faculty", isLoggedIn, (req, res) => {
  adminWindow.postCreateFaculty(req, res);
});
app.post("/edit-faculty", isLoggedIn, (req, res) => {
  adminWindow.postUpdateFaculty(req, res);
});
app.post("/delete-faculty", isLoggedIn, (req, res) => {
  adminWindow.postDeleteFaculty(req, res);
});
//Receives a list of lecturers by year
app.get("/admin/2022-2023/users", isLoggedIn, (req, res) => {
  adminWindow.getUsersByYear22_23(req, res);
});
app.get("/admin/2022-2023/users/:page", isLoggedIn, (req, res) => {
  adminWindow.getUsersByYear22_23(req, res);
});
app.get("/admin/2023-2024/users", isLoggedIn, (req, res) => {
  adminWindow.getUsersByYear23_24(req, res);
});
app.get("/admin/2023-2024/users/:page", isLoggedIn, (req, res) => {
  adminWindow.getUsersByYear23_24(req, res);
});
app.get("/admin/2024-2025/users", isLoggedIn, (req, res) => {
  adminWindow.getUsersByYear24_25(req, res);
});
app.get("/admin/2024-2025/users/:page", isLoggedIn, (req, res) => {
  adminWindow.getUsersByYear24_25(req, res);
});
app.get("/admin/2025-2026/users", isLoggedIn, (req, res) => {
  adminWindow.getUsersByYear25_26(req, res);
});
app.get("/admin/2025-2026/users/:page", isLoggedIn, (req, res) => {
  adminWindow.getUsersByYear25_26(req, res);
});
//Update User information by year
app.get("/admin/2022-2023/users/edit/:userId", isLoggedIn, (req, res) => {
  adminWindow.getUpdateUserByYear22_23(req, res);
});
app.get("/admin/2023-2024/users/edit/:userId", isLoggedIn, (req, res) => {
  adminWindow.getUpdateUserByYear23_24(req, res);
});
app.get("/admin/2024-2025/users/edit/:userId", isLoggedIn, (req, res) => {
  adminWindow.getUpdateUserByYear24_25(req, res);
});
app.get("/admin/2025-2026/users/edit/:userId", isLoggedIn, (req, res) => {
  adminWindow.getUpdateUserByYear25_26(req, res);
});
app.post("/update-user-info-admin-2022-2023", isLoggedIn, (req, res) => {
  adminWindow.postUpdateUserByYear22_23(req, res);
});
app.post("/update-user-info-admin-2023-2024", isLoggedIn, (req, res) => {
  adminWindow.postUpdateUserByYear23_24(req, res);
});
app.post("/update-user-info-admin-2024-2025", isLoggedIn, (req, res) => {
  adminWindow.postUpdateUserByYear24_25(req, res);
});
app.post("/update-user-info-admin-2025-2026", isLoggedIn, (req, res) => {
  adminWindow.postUpdateUserByYear25_26(req, res);
});
//Receives a list of lecturers reports by year
app.get("/admin/2022-2023/user-reports/:userId", isLoggedIn, (req, res) => {
  adminWindow.getUserReportsByYear22_23(req, res);
});
app.get("/admin/2023-2024/user-reports/:userId", isLoggedIn, (req, res) => {
  adminWindow.getUserReportsByYear23_24(req, res);
});
app.get("/admin/2024-2025/user-reports/:userId", isLoggedIn, (req, res) => {
  adminWindow.getUserReportsByYear24_25(req, res);
});
app.get("/admin/2025-2026/user-reports/:userId", isLoggedIn, (req, res) => {
  adminWindow.getUserReportsByYear25_26(req, res);
});
app.get("/admin/2022-2023/lecturers/edit-report/:userId", isLoggedIn, (req, res) => {
  adminWindow.getLectReportByYear22_23(req, res);
});
app.get("/admin/2023-2024/lecturers/edit-report/:userId", isLoggedIn, (req, res) => {
  adminWindow.getLectReportByYear23_24(req, res);
});
app.get("/admin/2024-2025/lecturers/edit-report/:userId", isLoggedIn, (req, res) => {
  adminWindow.getLectReportByYear24_25(req, res);
});
app.get("/admin/2025-2026/lecturers/edit-report/:userId", isLoggedIn, (req, res) => {
  adminWindow.getLectReportByYear25_26(req, res);
});
//Updates report of lecturers by year
app.post("/update-report-lec-admin-2022-2023", isLoggedIn, (req, res) => {
  adminWindow.postLectReportUpdateByYear22_23(req, res);
});
app.post("/update-report-lec-admin-2023-2024", isLoggedIn, (req, res) => {
  adminWindow.postLectReportUpdateByYear23_24(req, res);
});
app.post("/update-report-lec-admin-2024-2025", isLoggedIn, (req, res) => {
  adminWindow.postLectReportUpdateByYear24_25(req, res);
});
app.post("/update-report-lec-admin-2025-2026", isLoggedIn, (req, res) => {
  adminWindow.postLectReportUpdateByYear25_26(req, res);
});
app.get("/admin/2022-2023/departments/edit-report/:userId", isLoggedIn, (req, res) => {
  adminWindow.getDepReportByYear22_23(req, res);
});
app.get("/admin/2023-2024/departments/edit-report/:userId", isLoggedIn, (req, res) => {
  adminWindow.getDepReportByYear23_24(req, res);
});
app.get("/admin/2024-2025/departments/edit-report/:userId", isLoggedIn, (req, res) => {
  adminWindow.getDepReportByYear24_25(req, res);
});
app.get("/admin/2025-2026/departments/edit-report/:userId", isLoggedIn, (req, res) => {
  adminWindow.getDepReportByYear25_26(req, res);
});
//Updates report of the head of department by year
app.post("/update-report-dep-admin-2022-2023", isLoggedIn, (req, res) => {
  adminWindow.postDepReportUpdateByYear22_23(req, res);
});
app.post("/update-report-dep-admin-2023-2024", isLoggedIn, (req, res) => {
  adminWindow.postDepReportUpdateByYear23_24(req, res);
});
app.post("/update-report-dep-admin-2024-2025", isLoggedIn, (req, res) => {
  adminWindow.postDepReportUpdateByYear24_25(req, res);
});
app.post("/update-report-dep-admin-2025-2026", isLoggedIn, (req, res) => {
  adminWindow.postDepReportUpdateByYear25_26(req, res);
});

app.get("/logout", (req, res) => {
  mainModules.getLogout(req, res);
});
app.use('/*/*/*', isLoggedIn, (req, res) => {
  mainModules.get404(req, res);
});
app.use('/*/*', isLoggedIn, (req, res) => {
  mainModules.get404(req, res);
});
app.use('*', isLoggedIn, (req, res) => {
  mainModules.get404(req, res);
});

//Check isLoggedIn
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

app.listen(3000, function () {
  console.log("ReportsApp has started successfully on port 3000");
});