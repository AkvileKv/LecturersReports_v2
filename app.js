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
const Faculty = require('./models/faculty');
//created modules
const homeRouter = require('./controllers/home');
const registerRouter = require('./controllers/register');
const loginRouter = require('./controllers/login');

const lectGetReport = require('./assets/lecturers-get-report');
const depGetReport = require('./assets/departments-get-report');

const depGetLectList = require('./assets/departments-get-lect-list');
const depLectEdit = require('./assets/departments-get-edit-user');

const lectPostReport = require('./assets/lecturers-post-report');
const depPostReport = require('./assets/departments-post-report');

const userWindow = require('./assets/user-window');
const adminWindow = require('./assets/admin');

//---
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

  User.register({
    username: req.body.username,
    activeUser: "aktyvus",
    currentYear: new Date().getFullYear(),
    updated_for: "Registracija",
    //ataskaitų būsenos
    busena22_23: "nesukurta",
    busena23_24: "nesukurta",
    busena24_25: "nesukurta",
    busena25_26: "nesukurta",
    busenaVedejo22_23: "nesukurta",
    busenaVedejo23_24: "nesukurta",
    busenaVedejo24_25: "nesukurta",
    busenaVedejo25_26: "nesukurta",
    //rolės naudotojo
    role: "dėstytojas",
    rolesKeitimas: false,
    //naudotojo atpažinimui
    teachingYear22_23: false,
    teachingYear23_24: false,
    teachingYear24_25: false,
    teachingYear25_26: false,
    headOfTheDepartment22_23: false,
    headOfTheDepartment23_24: false,
    headOfTheDepartment24_25: false,
    headOfTheDepartment25_26: false,
  }, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/user-window-selection");
      });
    }
  });
});

app.post("/login", (req, res) => {
  //2 rolem negalima prisijungti vienu metu

  //   if (req.isAuthenticated()) {
  // console.log("autentifikavo");
  //     User.findById(req.user.id, function(err, foundUser) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         if (foundUser.role === "dėstytojas") {
  //           res.redirect("/user-window");
  //         } else if (foundUser.role === "katedros vedėjas") {
  //           res.redirect("/user-window-dep");
  //         } else if (foundUser.role === "administratorius") {
  //           res.redirect("/admin/profile");
  //         }
  //       }
  //     });
  //
  // } else {
  //use a Model (User) to create new documents (user) using `new`:
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local", {
        failureRedirect: '/login'
      })(req, res, function () {
        User.findById(req.user.id, function (err, foundUser) {
          try {
            var a = req.user.username;
            foundUser.updated_for = "Prisijungimas" + " " + a;
            foundUser.save(function (err) {
              if (err) throw err;
            });
            if (foundUser.role === "dėstytojas") {
              res.redirect("/user-window-selection");
            } else if (foundUser.role === "katedros vedėjas") {
              res.redirect("/user-window-selection");
            } else if (foundUser.role === "administratorius") {
              res.redirect("/admin/profile");
            }
          } catch (err) {
            console.log(err);
          }
        });
      });
    }
  });
  //}
});

// METHOD FOR LOG
app.get("/admin/history-log", (req, res) => {

  //var HistoryUser = User.historyModel();
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  if (req.isAuthenticated()) {

    User.findById(req.user.id, function (err, foundUser) {
      if (err) {
        console.log(err);
      } else {
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
      }
    });
  } else {
    res.redirect("/login");
  }
});

//---------------------LECTURER-------------------
app.get("/2022-2023/create", function (req, res) {
  if (req.isAuthenticated()) {
    lectGetReport.getCreate22_23(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/2023-2024/create", function (req, res) {
  if (req.isAuthenticated()) {
    lectGetReport.getCreate23_24(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/2024-2025/create", function (req, res) {
  if (req.isAuthenticated()) {
    lectGetReport.getCreate24_25(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/2025-2026/create", function (req, res) {
  if (req.isAuthenticated()) {
    lectGetReport.getCreate25_26(req, res);
  } else {
    res.redirect("/login");
  }
});

app.post("/create-2022-2023", function (req, res) {
  if (req.isAuthenticated()) {
    lectPostReport.postReportCreate22_23(req, res);
  } else {
    res.redirect("/login");
  }
});
app.post("/create-2023-2024", function (req, res) {
  if (req.isAuthenticated()) {
    lectPostReport.postReportCreate23_24(req, res);
  } else {
    res.redirect("/login");
  }
});
app.post("/create-2024-2025", function (req, res) {
  if (req.isAuthenticated()) {
    lectPostReport.postReportCreate24_25(req, res);
  } else {
    res.redirect("/login");
  }
});
app.post("/create-2025-2026", function (req, res) {
  if (req.isAuthenticated()) {
    lectPostReport.postReportCreate25_26(req, res);
  } else {
    res.redirect("/login");
  }
});

app.get("/2022-2023/edit", function (req, res) {
  if (req.isAuthenticated()) {
    lectGetReport.getUpdate22_23(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/2023-2024/edit", function (req, res) {
  if (req.isAuthenticated()) {
    lectGetReport.getUpdate23_24(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/2024-2025/edit", function (req, res) {
  if (req.isAuthenticated()) {
    lectGetReport.getUpdate24_25(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/2025-2026/edit", function (req, res) {
  if (req.isAuthenticated()) {
    lectGetReport.getUpdate25_26(req, res);
  } else {
    res.redirect("/login");
  }
});

app.post("/update-2022-2023", (req, res) => {
  lectPostReport.postReportUpdate22_23(req, res);
});
app.post("/update-2023-2024", (req, res) => {
  lectPostReport.postReportUpdate23_24(req, res);
});
app.post("/update-2024-2025", (req, res) => {
  lectPostReport.postReportUpdate24_25(req, res);
});
app.post("/update-2025-2026", (req, res) => {
  lectPostReport.postReportUpdate25_26(req, res);
});

app.get("/2022-2023/submit", function (req, res) {
  if (req.isAuthenticated()) {
    lectGetReport.getSubmit22_23(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/2023-2024/submit", function (req, res) {
  if (req.isAuthenticated()) {
    lectGetReport.getSubmit23_24(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/2024-2025/submit", function (req, res) {
  if (req.isAuthenticated()) {
    lectGetReport.getSubmit24_25(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/2025-2026/submit", function (req, res) {
  if (req.isAuthenticated()) {
    lectGetReport.getSubmit25_26(req, res);
  } else {
    res.redirect("/login");
  }
});

app.post("/submit-2022-2023", function (req, res) {
  lectPostReport.postReportSubmit22_23(req, res);
});
app.post("/submit-2023-2024", function (req, res) {
  lectPostReport.postReportSubmit23_24(req, res);
});
app.post("/submit-2024-2025", function (req, res) {
  lectPostReport.postReportSubmit24_25(req, res);
});
app.post("/submit-2025-2026", function (req, res) {
  lectPostReport.postReportSubmit25_26(req, res);
});

//---------------------DEPARTMENT-------------------
app.get("/department/2022-2023/create", function (req, res) {
  if (req.isAuthenticated()) {
    depGetReport.getCreate22_23(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/department/2023-2024/create", function (req, res) {
  if (req.isAuthenticated()) {
    depGetReport.getCreate23_24(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/department/2024-2025/create", function (req, res) {
  if (req.isAuthenticated()) {
    depGetReport.getCreate24_25(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/department/2025-2026/create", function (req, res) {
  if (req.isAuthenticated()) {
    depGetReport.getCreate25_26(req, res);
  } else {
    res.redirect("/login");
  }
});

app.post("/dep-create-2022-2023", (req, res) => {
  depPostReport.postReportCreate22_23(req, res);
});
app.post("/dep-create-2023-2024", (req, res) => {
  depPostReport.postReportCreate23_24(req, res);
});
app.post("/dep-create-2024-2025", (req, res) => {
  depPostReport.postReportCreate24_25(req, res);
});
app.post("/dep-create-2025-2026", (req, res) => {
  depPostReport.postReportCreate25_26(req, res);
});

app.get("/department/2022-2023/edit", function (req, res) {
  if (req.isAuthenticated()) {
    depGetReport.getEdit22_23(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/department/2023-2024/edit", function (req, res) {
  if (req.isAuthenticated()) {
    depGetReport.getEdit23_24(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/department/2024-2025/edit", function (req, res) {
  if (req.isAuthenticated()) {
    depGetReport.getEdit24_25(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/department/2025-2026/edit", function (req, res) {
  if (req.isAuthenticated()) {
    depGetReport.getEdit25_26(req, res);
  } else {
    res.redirect("/login");
  }
});

app.post("/dep-update-2022-2023", (req, res) => {
  depPostReport.postReportUpdate22_23(req, res);
});
app.post("/dep-update-2023-2024", (req, res) => {
  depPostReport.postReportUpdate23_24(req, res);
});
app.post("/dep-update-2024-2025", (req, res) => {
  depPostReport.postReportUpdate24_25(req, res);
});
app.post("/dep-update-2025-2026", (req, res) => {
  depPostReport.postReportUpdate25_26(req, res);
});

app.get("/department/2022-2023/submit", function (req, res) {
  if (req.isAuthenticated()) {
    depGetReport.getSubmit22_23(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/department/2023-2024/submit", function (req, res) {
  if (req.isAuthenticated()) {
    depGetReport.getSubmit23_24(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/department/2024-2025/submit", function (req, res) {
  if (req.isAuthenticated()) {
    depGetReport.getSubmit24_25(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/department/2025-2026/submit", function (req, res) {

  if (req.isAuthenticated()) {
    depGetReport.getSubmit25_26(req, res);
  } else {
    res.redirect("/login");
  }
});

app.post("/dep-submit-2022-2023", function (req, res) {
  depPostReport.postReportSubmit22_23(req, res);
});
app.post("/dep-submit-2023-2024", function (req, res) {
  depPostReport.postReportSubmit23_24(req, res);
});
app.post("/dep-submit-2024-2025", function (req, res) {
  depPostReport.postReportSubmit24_25(req, res);
});
app.post("/dep-submit-2025-2026", function (req, res) {
  depPostReport.postReportSubmit25_26(req, res);
});
//--------------------
app.get("/logout", function (req, res) {

  User.findById(req.user.id, function (err, foundUser) {
    if (err) {
      console.log(err);
      res.redirect('/login');
    } else {
      var a = req.user.username;
      foundUser.updated_for = "Atsijungimas" + " " + a;
      foundUser.save(function (err) {
        if (err) {
          console.log(err);
        }
      });
    }
    req.logout();
  });
  console.log("Logout ivykdytas");
  res.redirect('/');
});

app.get("/user-window", function (req, res) {
  if (req.isAuthenticated()) {
    userWindow.getUserWindow(req, res);
  } else {
    res.redirect("/login");
  }
});
app.post("/update-user", function (req, res) {
  if (req.isAuthenticated()) {
    userWindow.postUpdateUser(req, res);
  } else {
    res.redirect("/login");
  }
});

app.get("/user-window-selection", function (req, res) {
  if (req.isAuthenticated()) {
    userWindow.getSelection(req, res);
  } else {
    res.redirect("/login");
  }
});
app.post("/update-user-window-selection-role", function (req, res) {
  if (req.isAuthenticated()) {
    userWindow.postChangeRole(req, res);
  } else {
    res.redirect("/login");
  }
});

app.get("/2022-2023/user-window", function (req, res) {
  if (req.isAuthenticated()) {
    userWindow.getByYear22_23(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/2023-2024/user-window", function (req, res) {
  if (req.isAuthenticated()) {
    userWindow.getByYear23_24(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/2024-2025/user-window", function (req, res) {
  if (req.isAuthenticated()) {
    userWindow.getYear24_25(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/2025-2026/user-window", function (req, res) {
  if (req.isAuthenticated()) {
    userWindow.getByYear25_26(req, res);
  } else {
    res.redirect("/login");
  }
});
//Katedros vedėjas atnaujina dėstytojų sk. info profilyje
app.post("/update-user-dep-2022-2023", function (req, res) {
  if (req.isAuthenticated()) {
    userWindow.postUpdateUserDep22_23(req, res);
  } else {
    res.redirect("/login");
  }
});
app.post("/update-user-dep-2023-2024", function (req, res) {
  if (req.isAuthenticated()) {
    userWindow.postUpdateUserDep23_24(req, res);
  } else {
    res.redirect("/login");
  }
});
app.post("/update-user-dep-2024-2025", function (req, res) {
  if (req.isAuthenticated()) {
    userWindow.postUpdateUserDep24_25(req, res);
  } else {
    res.redirect("/login");
  }
});
app.post("/update-user-dep-2025-2026", function (req, res) {
  if (req.isAuthenticated()) {
    userWindow.postUpdateUserDep25_26(req, res);
  } else {
    res.redirect("/login");
  }
});
//-----------------Head of the DEPARTMENT------------------------------------
app.get("/department/2022-2023/lecturers-list", (req, res) => {
  if (req.isAuthenticated()) {
    depGetLectList.getLecturersList22_23(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/department/2022-2023/lecturers-list/:page", (req, res) => {
  if (req.isAuthenticated()) {
    depGetLectList.getLecturersList22_23(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/department/2023-2024/lecturers-list", (req, res) => {
  if (req.isAuthenticated()) {
    depGetLectList.getLecturersList23_24(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/department/2023-2024/lecturers-list/:page", (req, res) => {
  if (req.isAuthenticated()) {
    depGetLectList.getLecturersList23_24(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/department/2024-2025/lecturers-list", (req, res) => {
  if (req.isAuthenticated()) {
    depGetLectList.getLecturersList24_25(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/department/2024-2025/lecturers-list/:page", (req, res) => {
  if (req.isAuthenticated()) {
    depGetLectList.getLecturersList24_25(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/department/2025-2026/lecturers-list", (req, res) => {
  if (req.isAuthenticated()) {
    depGetLectList.getLecturersList25_26(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/department/2025-2026/lecturers-list/:page", (req, res) => {
  if (req.isAuthenticated()) {
    depGetLectList.getLecturersList25_26(req, res);
  } else {
    res.redirect("/login");
  }
});

app.get("/department/2022-2023/edit-user/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    depLectEdit.getEditLec22_23(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/department/2023-2024/edit-user/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    depLectEdit.getEditLec23_24(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/department/2024-2025/edit-user/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    depLectEdit.getEditLec24_25(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/department/2025-2026/edit-user/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    depLectEdit.getEditLec25_26(req, res);
  } else {
    res.redirect("/login");
  }
});

//Katedros vedėjas atnaujina dėstytojo būseną
app.post("/update-user-info-dep-2022-2023", (req, res) => {
  depLectEdit.postEditLec22_23(req, res);
});
app.post("/update-user-info-dep-2023-2024", (req, res) => {
  depLectEdit.postEditLec23_24(req, res);
});
app.post("/update-user-info-dep-2024-2025", (req, res) => {
  depLectEdit.postEditLec24_25(req, res);
});
app.post("/update-user-info-dep-2025-2026", (req, res) => {
  depLectEdit.postEditLec25_26(req, res);
});

app.get("/department/2022-2023/edit-lecturer-report/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    depLectEdit.getEditLecReport22_23(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/department/2023-2024/edit-lecturer-report/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    depLectEdit.getEditLecReport23_24(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/department/2024-2025/edit-lecturer-report/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    depLectEdit.getEditLecReport24_25(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/department/2025-2026/edit-lecturer-report/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    depLectEdit.getEditLecReport25_26(req, res);
  } else {
    res.redirect("/login");
  }
});
// Katedros vedėjas atnaujina dėstytojo ataskaitą
app.post("/update-report-lecturer-dep-2022-2023", (req, res) => {
  lectPostReport.postReportLec22_23(req, res);
});
app.post("/update-report-lecturer-dep-2023-2024", (req, res) => {
  lectPostReport.postReportLec23_24(req, res);
});
app.post("/update-report-lecturer-dep-2024-2025", (req, res) => {
  lectPostReport.postReportLec24_25(req, res);
});
app.post("/update-report-lecturer-dep-2025-2026", (req, res) => {
  lectPostReport.postReportLec25_26(req, res);
});

//------------------ADMIN----------------------------------------
app.get("/admin/profile", function (req, res) {
  if (req.isAuthenticated()) {
    adminWindow.getProfile(req, res);
  } else {
    res.redirect("/login");
  }
});
// Administratorius atnaujina savo info
app.post("/update-profile-admin", function (req, res) {
  if (req.isAuthenticated()) {
    adminWindow.postUpdateProfile(req, res);
  } else {
    res.redirect("/login");
  }
});

// main list with ALL DB USERS
app.get("/admin/users", (req, res) => {
  if (req.isAuthenticated()) {
    adminWindow.getAllUsers(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/admin/users/:page", (req, res) => {
  if (req.isAuthenticated()) {
    adminWindow.getAllUsers(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/admin/users/edit/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    adminWindow.getUpdateUserInfo(req, res);
  } else {
    res.redirect("/login");
  }
});
// Administratorius atnaujina naudotojo info
app.post("/update-user-info-admin", (req, res) => {
  adminWindow.postUpdateUserInfo(req, res);
});
// Administratorius ištrina naudotoją iš DB
app.post("/delete", function (req, res) {
  adminWindow.postDeleteUser(req, res);
});

app.get("/admin/faculties", (req, res) => {
  if (req.isAuthenticated()) {
    adminWindow.getFaculty(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/admin/faculties/create", (req, res) => {
  if (req.isAuthenticated()) {
    adminWindow.getCreateFaculty(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/admin/faculties/edit/:facultyId", (req, res) => {
  if (req.isAuthenticated()) {
    adminWindow.getUpdateFaculty(req, res);
  } else {
    res.redirect("/login");
  }
});
// Administratorius sukuria fakultetą
app.post("/create-faculty", (req, res) => {
  adminWindow.postCreateFaculty(req, res);
});
// Administratorius atnaujina fakultetą
app.post("/edit-faculty", (req, res) => {
  adminWindow.postUpdateFaculty(req, res);
});
// Administratorius ištrina naudotoją iš DB
app.post("/delete-faculty", function (req, res) {
  adminWindow.postDeleteFaculty(req, res);
});
//end main list with ALL DB USERS

// USERS list by year
app.get("/admin/2022-2023/users", (req, res, next) => {

  if (req.isAuthenticated()) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          var perPage = 5;
          var page = req.params.page || 1;
          User.find({
            teachingYear22_23: true
          })
            .skip((perPage * page) - perPage)
            .limit(perPage).exec(function (err, users) {
              if (err) throw err;
              User.countDocuments({
                teachingYear22_23: true
              }).exec((err, count) => {
                res.render("admin-users-list-2022-2023", {
                  users: users,
                  current: page,
                  pages: Math.ceil(count / perPage)
                });
              });
            });
        } else {
          console.log("You do not have permission");
          res.redirect("/login");
        }
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/admin/2022-2023/users/:page", (req, res, next) => {

  if (req.isAuthenticated()) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          let perPage = 5;
          let page = req.params.page || 1;
          console.log(page);
          User.find({
            teachingYear22_23: true
          }) // pagal metus perduoti
            .skip((perPage * page) - perPage)
            .limit(perPage).exec(function (err, users) {
              if (err) throw err;
              User.countDocuments({
                teachingYear22_23: true
              }).exec((err, count) => {
                res.render("admin-users-list-2022-2023", {
                  users: users,
                  current: page,
                  pages: Math.ceil(count / perPage)
                });
              });
            });
        } else {
          console.log("You do not have permission");
          res.redirect("/login");
        }
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/admin/2023-2024/users", (req, res, next) => {

  if (req.isAuthenticated()) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          var perPage = 5;
          var page = req.params.page || 1;
          User.find({
            teachingYear23_24: true
          })
            .skip((perPage * page) - perPage)
            .limit(perPage).exec(function (err, users) {
              if (err) throw err;
              User.countDocuments({
                teachingYear23_24: true
              }).exec((err, count) => {
                res.render("admin-users-list-2023-2024", {
                  users: users,
                  current: page,
                  pages: Math.ceil(count / perPage)
                });
              });
            });
        } else {
          console.log("You do not have permission");
          res.redirect("/login");
        }
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/admin/2023-2024/users/:page", (req, res, next) => {

  if (req.isAuthenticated()) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          let perPage = 5;
          let page = req.params.page || 1;
          User.find({
            teachingYear23_24: true
          }) // pagal metus perduoti
            .skip((perPage * page) - perPage)
            .limit(perPage).exec(function (err, users) {
              if (err) throw err;
              User.countDocuments({
                teachingYear23_24: true
              }).exec((err, count) => {
                res.render("admin-users-list-2023-2024", {
                  users: users,
                  current: page,
                  pages: Math.ceil(count / perPage)
                });
              });
            });
        } else {
          console.log("You do not have permission");
          res.redirect("/login");
        }
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/admin/2024-2025/users", (req, res, next) => {

  if (req.isAuthenticated()) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          var perPage = 5;
          var page = req.params.page || 1;
          User.find({
            teachingYear24_25: true
          })
            .skip((perPage * page) - perPage)
            .limit(perPage).exec(function (err, users) {
              if (err) throw err;
              User.countDocuments({
                teachingYear24_25: true
              }).exec((err, count) => {
                res.render("admin-users-list-2024-2025", {
                  users: users,
                  current: page,
                  pages: Math.ceil(count / perPage)
                });
              });
            });
        } else {
          console.log("You do not have permission");
          res.redirect("/login");
        }
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/admin/2024-2025/users/:page", (req, res, next) => {

  if (req.isAuthenticated()) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          let perPage = 5;
          let page = req.params.page || 1;
          console.log(page);
          User.find({
            teachingYear24_25: true
          }) // pagal metus perduoti
            .skip((perPage * page) - perPage)
            .limit(perPage).exec(function (err, users) {
              if (err) throw err;
              User.countDocuments({
                teachingYear24_25: true
              }).exec((err, count) => {
                res.render("admin-users-list-2024-2025", {
                  users: users,
                  current: page,
                  pages: Math.ceil(count / perPage)
                });
              });
            });
        } else {
          console.log("You do not have permission");
          res.redirect("/login");
        }
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/admin/2025-2026/users", (req, res, next) => {

  if (req.isAuthenticated()) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          var perPage = 5;
          var page = req.params.page || 1;
          User.find({
            teachingYear25_26: true
          })
            .skip((perPage * page) - perPage)
            .limit(perPage).exec(function (err, users) {
              if (err) throw err;
              User.countDocuments({
                teachingYear25_26: true
              }).exec((err, count) => {
                res.render("admin-users-list-2025-2026", {
                  users: users,
                  current: page,
                  pages: Math.ceil(count / perPage)
                });
              });
            });
        } else {
          console.log("You do not have permission");
          res.redirect("/login");
        }
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/admin/2025-2026/users/:page", (req, res, next) => {

  if (req.isAuthenticated()) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          var perPage = 5;
          var page = req.params.page || 1;
          User.find({
            teachingYear25_26: true
          }) // pagal metus perduoti
            .skip((perPage * page) - perPage)
            .limit(perPage).exec(function (err, users) {
              if (err) throw err;
              User.countDocuments({
                teachingYear25_26: true
              }).exec((err, count) => {
                res.render("admin-users-list-2025-2026", {
                  users: users,
                  current: page,
                  pages: Math.ceil(count / perPage)
                });
              });
            });
        } else {
          console.log("You do not have permission");
          res.redirect("/login");
        }
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res.redirect("/login");
  }
});
//edit user window
app.get("/admin/2022-2023/users/edit/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function (err, user) {
              if (err) {
                console.log(err);
              } else {
                res.render("admin-user-edit-2022-2023", {
                  user: user
                });
              }
            });
          } else {
            res.redirect("/admin/2022-2023/users");
          }
        } else {
          res.redirect("/home");
        }
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/admin/2023-2024/users/edit/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function (err, user) {
              if (err) {
                console.log(err);
              } else {
                res.render("admin-user-edit-2023-2024", {
                  user: user
                });
              }
            });
          } else {
            res.redirect("/admin/2023-2024/users");
          }
        } else {
          res.redirect("/home");
        }
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/admin/2024-2025/users/edit/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function (err, user) {
              if (err) {
                console.log(err);
              } else {
                res.render("admin-user-edit-2024-2025", {
                  user: user
                });
              }
            });
          } else {
            res.redirect("/admin/2024-2025/users");
          }
        } else {
          res.redirect("/home");
        }
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/admin/2025-2026/users/edit/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function (err, user) {
              if (err) {
                console.log(err);
              } else {
                res.render("admin-user-edit-2025-2026", {
                  user: user
                });
              }
            });
          } else {
            res.redirect("/admin/2025-2026/users");
          }
        } else {
          res.redirect("/home");
        }
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res.redirect("/login");
  }
});
// Administratorius atnaujina naudotojo info
app.post("/update-user-info-admin-2022-2023", (req, res) => {

  User.findById(req.body.id, function (err, foundUser) {
    try {
      if (foundUser) {
        foundUser.busena22_23 = req.body.busena,
          foundUser.busenaVedejo22_23 = req.body.busenaVedejo,
          //if (err) throw err;
          foundUser.updated_for = req.user.username //username- prisijungusio userio id paimti iš DB reikia username
        foundUser.save(function (err) {
          if (err) throw err;
          res.redirect("/admin/2022-2023/users");
        });
      } else {
        console.log("Does'f found");
      }
    } catch (err) {
      console.log(err);
    }
  });
});
app.post("/update-user-info-admin-2023-2024", (req, res) => {

  User.findById(req.body.id, function (err, foundUser) {
    y = 5;
    try {
      if (foundUser) {
        foundUser.busena23_24 = req.body.busena,
          foundUser.busenaVedejo23_24 = req.body.busenaVedejo,
          foundUser.updated_for = req.user.username //username- prisijungusio userio id paimti iš DB reikia username
        foundUser.save(function (err) {
          res.redirect("/admin/2023-2024/users");
        });
      } else {
        console.log("Does'f found");
      }
    } catch (err) {
      console.log(err);
    }
  });
});
app.post("/update-user-info-admin-2024-2025", (req, res) => {
  User.findById(req.body.id, function (err, foundUser) {
    try {
      if (foundUser) {
        foundUser.busena24_25 = req.body.busena,
          foundUser.busenaVedejo24_25 = req.body.busenaVedejo,
          foundUser.updated_for = req.user.username //username- prisijungusio userio id paimti iš DB reikia username
        foundUser.save(function (err) {
          if (err) throw err;
          res.redirect("/admin/2024-2025/users");
        });
      } else {
        console.log("Does'f found");
      }
    } catch (err) {
      console.log(err);
    }
  });
});
app.post("/update-user-info-admin-2025-2026", (req, res) => {

  User.findById(req.body.id, function (err, foundUser) {
    try {
      if (foundUser) {
        foundUser.busena25_26 = req.body.busena,
          foundUser.busenaVedejo25_26 = req.body.busenaVedejo,
          foundUser.updated_for = req.user.username //username- prisijungusio userio id paimti iš DB reikia username
        foundUser.save(function (err) {
          if (err) throw err;
          res.redirect("/admin/2025-2026/users");
        });
      } else {
        console.log("Does'f found");
      }
    } catch (err) {
      console.log(err);
    }
  });
});
//END

app.get("/admin/2022-2023/user-reports/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function (err, user) {
              if (err) throw err;
              res.render("admin-user-reports-all-2022-2023", {
                user: user
              });
            });
          } else {
            res.redirect("/admin/profile");
          }
        } else {
          res.redirect("/home");
        }
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/admin/2023-2024/user-reports/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function (err, user) {
              if (err) throw err;
              res.render("admin-user-reports-all-2023-2024", {
                user: user
              });
            });
          } else {
            res.redirect("/admin/profile");
          }
        } else {
          res.redirect("/home");
        }
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/admin/2024-2025/user-reports/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function (err, user) {
              if (err) throw err;
              res.render("admin-user-reports-all-2024-2025", {
                user: user
              });
            });
          } else {
            res.redirect("/admin/profile");
          }
        } else {
          res.redirect("/home");
        }
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/admin/2025-2026/user-reports/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function (err, user) {
              if (err) throw err;
              res.render("admin-user-reports-all-2025-2026", {
                user: user
              });
            });
          } else {
            res.redirect("/admin/profile");
          }
        } else {
          res.redirect("/home");
        }
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/admin/2022-2023/lecturers/edit-report/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function (err, user) {
              if (err) throw err;
              res.render("admin-edit-report-lec-2022-2023", {
                user: user
              });
            });
          } else {
            res.redirect("/admin/profile");
          }
        } else {
          res.redirect("/home");
        }
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/admin/2023-2024/lecturers/edit-report/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function (err, user) {
              if (err) throw err;
              res.render("admin-edit-report-lec-2023-2024", {
                user: user
              });
            });
          } else {
            res.redirect("/admin/profile");
          }
        } else {
          res.redirect("/home");
        }
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/admin/2024-2025/lecturers/edit-report/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function (err, user) {
              if (err) throw err;
              res.render("admin-edit-report-lec-2024-2025", {
                user: user
              });
            });
          } else {
            res.redirect("/admin/profile");
          }
        } else {
          res.redirect("/home");
        }
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/admin/2025-2026/lecturers/edit-report/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function (err, user) {
              if (err) throw err;
              res.render("admin-edit-report-lec-2025-2026", {
                user: user
              });
            });
          } else {
            res.redirect("/admin/profile");
          }
        } else {
          res.redirect("/home");
        }
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res.redirect("/login");
  }
});

// Administratorius atnaujina dėstytojo ataskaitą
app.post("/update-report-lec-admin-2022-2023", (req, res) => {
  lectPostReport.postReportAdmin22_23(req, res);
});
app.post("/update-report-lec-admin-2023-2024", (req, res) => {
  lectPostReport.postReportAdmin23_24(req, res);
});
app.post("/update-report-lec-admin-2024-2025", (req, res) => {
  lectPostReport.postReportAdmin24_25(req, res);
});
app.post("/update-report-lec-admin-2025-2026", (req, res) => {
  lectPostReport.postReportAdmin25_26(req, res);
});

app.get("/admin/2022-2023/departments/edit-report/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function (err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function (err, user) {
              if (err) throw err;
              res.render("admin-edit-report-dep-2022-2023", {
                user: user
              });
            });
          } else {
            res.redirect("/admin/profile");
          }
        } else {
          res.redirect("/home");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/admin/2023-2024/departments/edit-report/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function (err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function (err, user) {
              if (err) throw err;
              res.render("admin-edit-report-dep-2023-2024", {
                user: user
              });
            });
          } else {
            res.redirect("/admin/profile");
          }
        } else {
          res.redirect("/home");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/admin/2024-2025/departments/edit-report/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function (err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function (err, user) {
              if (err) throw err;
              res.render("admin-edit-report-dep-2024-2025", {
                user: user
              });
            });
          } else {
            res.redirect("/admin/profile");
          }
        } else {
          res.redirect("/home");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/admin/2025-2026/departments/edit-report/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function (err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function (err, user) {
              if (err) throw err;
              res.render("admin-edit-report-dep-2025-2026", {
                user: user
              });
            });
          } else {
            res.redirect("/admin/profile");
          }
        } else {
          res.redirect("/home");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});

// Administratorius atnaujina katedros vedėjo ataskaitą
app.post("/update-report-dep-admin-2022-2023", (req, res) => {
  lectPostReport.postReportSubmit22_23(req, res);
});
app.post("/update-report-dep-admin-2023-2024", (req, res) => {
  lectPostReport.postReportSubmit23_24(req, res);
});
app.post("/update-report-dep-admin-2024-2025", (req, res) => {
  lectPostReport.postReportSubmit24_25(req, res);
});
app.post("/update-report-dep-admin-2025-2026", (req, res) => {
  depPostReport.postReportSubmit25_26(req, res);
});

app.use('/*/*/*', (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function (err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "administratorius") {
          res.render("404-admin");
        } else if (foundUser.role === "katedros vedėjas") {
          res.render("404-dep");
        } else if (foundUser.role === "dėstytojas") {
          res.render("404-lecturer");
        } else {
          console.log("User role unknown");
          res.redirect("/404");
        }
      }
    });
  } else {
    res.render("404");
  }
});
app.use('/*/*', (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function (err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "administratorius") {
          res.render("404-admin");
        } else if (foundUser.role === "katedros vedėjas") {
          res.render("404-dep");
        } else if (foundUser.role === "dėstytojas") {
          res.render("404-lecturer");
        } else {
          console.log("User role unknown");
          res.redirect("/404");
        }
      }
    });
  } else {
    res.render("404");
  }
});
app.use('*', (req, res) => {
  if (req.isAuthenticated()) {

    User.findById(req.user.id, function (err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "administratorius") {
          res.render("404-admin");
        } else if (foundUser.role === "katedros vedėjas") {
          res.render("404-dep");
        } else if (foundUser.role === "dėstytojas") {
          res.render("404-lecturer");
        } else {
          console.log("User role unknown");
          res.redirect("/404");
        }
      }
    });
  } else {
    res.render("404");
  }
});

app.listen(3000, function () {
  console.log("ReportsApp has started successfully on port 3000");
});
