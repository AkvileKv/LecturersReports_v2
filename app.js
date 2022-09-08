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

const dateTime = require('./assets/full-date-time');
const lectReport22_23 = require('./assets/lecturers-report22_23');
const lectReport23_24 = require('./assets/lecturers-report23_24');
const lectReport24_25 = require('./assets/lecturers-report24_25');
const lectReport25_26 = require('./assets/lecturers-report25_26');

const depReport22_23 = require('./assets/departments-report22_23');
const depReport23_24 = require('./assets/departments-report23_24');
const depReport24_25 = require('./assets/departments-report24_25');
const depReport25_26 = require('./assets/departments-report25_26');

const lectGetReport = require('./assets/lecturers-get-report');

//---
const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(express.static("models"));

app.use("/", homeRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.use(bodyParser.urlencoded({
  limit: '150mb',
  extended: true,
  parameterLimit: 1000000
}));

app.use(session({
  genid: function(req) {
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
  }, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function() {
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

  req.login(user, function(err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local", {
        failureRedirect: '/login'
      })(req, res, function() {
        User.findById(req.user.id, function(err, foundUser) {
          try {
            var a = req.user.username;
            foundUser.updated_for = "Prisijungimas" + " " + a;
            foundUser.save(function(err) {
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

    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "administratorius") {

          MongoClient.connect(url, function(err, db) {
            if (err) throw err;

            var dbo = db.db("reportsDB_v2");
            dbo.collection("__historiesPlugin")
              .find({}).toArray(function(err, _historiesPlugin) {
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
app.get("/2022-2023/create", function(req, res) {

  if (req.isAuthenticated()) {
    lectGetReport.getCreateLecReport22_23(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/2023-2024/create", function(req, res) {

  if (req.isAuthenticated()) {
    lectGetReport.getCreateLecReport23_24(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/2024-2025/create", function(req, res) {

  if (req.isAuthenticated()) {
    lectGetReport.getCreateLecReport24_25(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/2025-2026/create", function(req, res) {

  if (req.isAuthenticated()) {
    lectGetReport.getCreateLecReport25_26(req, res);
  } else {
    res.redirect("/login");
  }
});

app.post("/create-2022-2023", function(req, res) {

  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser) {
          lectReport22_23.updateLecReport(foundUser, req);
          foundUser.mm2022_2023.destytojas.ivykiuDatos.sukurimas = dateTime.getFullDateTime();
          foundUser.save(function(err) {
            if (err) throw err;
            console.log("Succesfully created 2022-2023");
            res.redirect("/2022-2023/user-window");
          });
        } else {
          console.log("User does'f found");
        }
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res.redirect("/login");
  }
}); //create 2022-2023
app.post("/create-2023-2024", function(req, res) {
  if (req.isAuthenticated()) {

    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log("Error...");
        console.log(err);
      } else {
        if (foundUser) {
          lectReport23_24.updateLecReport(foundUser, req);
          foundUser.mm2023_2024.destytojas.ivykiuDatos.sukurimas = dateTime.getFullDateTime();
          foundUser.save(function(err) {
            if (err) throw err;
            console.log("Succesfully created 2023-2024");
            res.redirect("/2023-2024/user-window");
          });
        } else {
          console.log("User does'f found");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
}); //create 20223-2024
app.post("/create-2024-2025", function(req, res) {
  if (req.isAuthenticated()) {

    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser) {
          lectReport24_25.updateLecReport(foundUser, req);
          foundUser.mm2024_2025.destytojas.ivykiuDatos.sukurimas = dateTime.getFullDateTime();
          foundUser.save(function(err) {
            if (err) throw err;
            console.log("Succesfully created 2024-2025");
            res.redirect("/2024-2025/user-window");
          });
        } else {
          console.log("User does'f found");
        }
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res.redirect("/login");
  }
}); //create 2024-2025
app.post("/create-2025-2026", function(req, res) {
  if (req.isAuthenticated()) {

    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser) {
          lectReport25_26.updateLecReport(foundUser, req);
          foundUser.mm2025_2026.destytojas.ivykiuDatos.sukurimas = dateTime.getFullDateTime();
          foundUser.save(function(err) {
            if (err) throw err;
            console.log("Succesfully created 2025-2026");
            res.redirect("/2025-2026/user-window");
          });
        } else {
          console.log("User does'f found");
        }
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res.redirect("/login");
  }
}); //create 2025-2026

app.get("/2022-2023/edit", function(req, res) {
  if (req.isAuthenticated()) {
    lectGetReport.getUpdateLecReport22_23(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/2023-2024/edit", function(req, res) {
  if (req.isAuthenticated()) {
  lectGetReport.getUpdateLecReport23_24(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/2024-2025/edit", function(req, res) {
  if (req.isAuthenticated()) {
  lectGetReport.getUpdateLecReport24_25(req, res);
  } else {
    res.redirect("/login");
  }
});
app.get("/2025-2026/edit", function(req, res) {
  if (req.isAuthenticated()) {
  lectGetReport.getUpdateLecReport25_26(req, res);
  } else {
    res.redirect("/login");
  }
});

app.post("/update-2022-2023", (req, res) => {

  User.findById(req.user.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        //masyvu isvalymas update
        lectReport22_23.clearLecReport(foundUser);
        //įrašymas iš naujo
        lectReport22_23.updateLecReport(foundUser, req);
        foundUser.mm2022_2023.destytojas.ivykiuDatos.atnaujinimas = dateTime.getFullDateTime();
        foundUser.save(function(err) {
          if (err) throw err;
          console.log("Succesfully updated");
          res.redirect("/2022-2023/user-window");
        });
      } else {
        console.log("User does'f found");
      }
    }
  });
}); //update 2022-2023
app.post("/update-2023-2024", (req, res) => {

  User.findById(req.user.id, function(err, foundUser) {
    try {
      if (foundUser) {
        lectReport23_24.clearLecReport(foundUser);
        lectReport23_24.updateLecReport(foundUser, req);
        foundUser.mm2023_2024.destytojas.ivykiuDatos.atnaujinimas = dateTime.getFullDateTime();
        foundUser.save(function(err) {
          if (err) throw err;
          console.log("Succesfully updated");
          res.redirect("/2023-2024/user-window");
        });
      } else {
        console.log("User does'f found");
      }
    } catch (err) {
      console.log(err);
    }
  });
}); //update 2023-2024
app.post("/update-2024-2025", (req, res) => {

  User.findById(req.user.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        lectReport24_25.clearLecReport(foundUser);
        lectReport24_25.updateLecReport(foundUser, req);
        foundUser.mm2024_2025.destytojas.ivykiuDatos.atnaujinimas = dateTime.getFullDateTime();

        foundUser.save(function(err) {
          if (!err) {
            console.log("Succesfully updated");
            res.redirect("/2024-2025/user-window");
          }
        });
      } else {
        console.log("User does'f found");
      }
    }
  });
}); //update 2024-2025
app.post("/update-2025-2026", (req, res) => {

  User.findById(req.user.id, function(err, foundUser) {
    try {
      if (foundUser) {
        lectReport25_26.clearLecReport(foundUser);
        lectReport25_26.updateLecReport(foundUser, req);
        foundUser.mm2025_2026.destytojas.ivykiuDatos.atnaujinimas = dateTime.getFullDateTime();

        foundUser.save(function(err) {
          if (err) throw err;
          console.log("Succesfully updated");
          res.redirect("/2025-2026/user-window");
        });
      } else {
        console.log("User does'f found");
      }
    } catch (err) {
      console.log(err);
    }
  });
}); //update 2025-2026

app.get("/2022-2023/submit", function(req, res) {
  if (req.isAuthenticated()) {

    User.findById(req.user.id, function(err, foundUser) {
      let currentUserFaculty = foundUser.fakultetas;
      if (err) {
        console.log(err);
      } else {
        Faculty.findOne({
          username: currentUserFaculty
        }, function(err, foundFaculty) {
          if (err) {
            console.log(err);
          } else {
            res.render("submit-2022-2023", {
              foundFaculty: foundFaculty,
              user: foundUser,
              fakultetasUpper: _.toUpper(foundUser.fakultetas),
              katedraUpper: _.toUpper(foundUser.katedra),
              vardasUpper: _.toUpper(foundUser.vardas),
              pavardeUpper: _.toUpper(foundUser.pavarde)
            });
          }
        });
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/2023-2024/submit", function(req, res) {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      let currentUserFaculty = foundUser.fakultetas;
      if (err) {
        console.log(err);
      } else {
        Faculty.findOne({
          username: currentUserFaculty
        }, function(err, foundFaculty) {
          if (err) {
            console.log(err);
          } else {
            res.render("submit-2023-2024", {
              foundFaculty: foundFaculty,
              user: foundUser,
              fakultetasUpper: _.toUpper(foundUser.fakultetas),
              katedraUpper: _.toUpper(foundUser.katedra),
              vardasUpper: _.toUpper(foundUser.vardas),
              pavardeUpper: _.toUpper(foundUser.pavarde)
            });
          }
        });
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/2024-2025/submit", function(req, res) {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      let currentUserFaculty = foundUser.fakultetas;
      if (err) {
        console.log(err);
      } else {
        Faculty.findOne({
          username: currentUserFaculty
        }, function(err, foundFaculty) {
          if (err) {
            console.log(err);
          } else {
            res.render("submit-2024-2025", {
              foundFaculty: foundFaculty,
              user: foundUser,
              fakultetasUpper: _.toUpper(foundUser.fakultetas),
              katedraUpper: _.toUpper(foundUser.katedra),
              vardasUpper: _.toUpper(foundUser.vardas),
              pavardeUpper: _.toUpper(foundUser.pavarde)
            });
          }
        });
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/2025-2026/submit", function(req, res) {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      let currentUserFaculty = foundUser.fakultetas;
      if (err) {
        console.log(err);
      } else {
        Faculty.findOne({
          username: currentUserFaculty
        }, function(err, foundFaculty) {
          if (err) {
            console.log(err);
          } else {
            res.render("submit-2025-2026", {
              foundFaculty: foundFaculty,
              user: foundUser,
              fakultetasUpper: _.toUpper(foundUser.fakultetas),
              katedraUpper: _.toUpper(foundUser.katedra),
              vardasUpper: _.toUpper(foundUser.vardas),
              pavardeUpper: _.toUpper(foundUser.pavarde)
            });
          }
        });
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.post("/submit-2022-2023", function(req, res) {

  User.findById(req.user.id, function(err, foundUser) {
    try {
      if (foundUser) {
        lectReport22_23.clearLecReport(foundUser);
        lectReport22_23.checkAndUpdateLecReport(foundUser, req);
        foundUser.mm2022_2023.destytojas.ataskaitosPateikimoData = req.body.ataskaitosPateikimoData,
          foundUser.mm2022_2023.destytojas.ivykiuDatos.pateikimas = dateTime.getFullDateTime();
        foundUser.save(function(err) {
          if (err) throw err;
          console.log("Succesfully submitted");
          res.redirect("/2022-2023/submit");
        });
      } else {
        console.log("User does'f found");
      }
    } catch (err) {
      console.log(err);
    }
  });
});
app.post("/submit-2023-2024", function(req, res) {

  User.findById(req.user.id, function(err, foundUser) {
    try {
      if (foundUser) {
        lectReport23_24.clearLecReport(foundUser);
        lectReport23_24.checkAndUpdateLecReport(foundUser, req);
        foundUser.mm2023_2024.destytojas.ataskaitosPateikimoData = req.body.ataskaitosPateikimoData,
          foundUser.mm2023_2024.destytojas.ivykiuDatos.pateikimas = dateTime.getFullDateTime();

        foundUser.save(function(err) {
          if (err) throw err;
          console.log("Succesfully submitted");
          res.redirect("/2023-2024/submit");
        });
      } else {
        console.log("User does'f found");
      }
    } catch (err) {
      console.log(err);
    }
  });
});
app.post("/submit-2024-2025", function(req, res) {

  User.findById(req.user.id, function(err, foundUser) {
    try {
      if (foundUser) {
        lectReport24_25.clearLecReport(foundUser);
        lectReport24_25.checkAndUpdateLecReport(foundUser, req);
        foundUser.mm2024_2025.destytojas.ataskaitosPateikimoData = req.body.ataskaitosPateikimoData,
          foundUser.mm2024_2025.destytojas.ivykiuDatos.pateikimas = dateTime.getFullDateTime();

        foundUser.save(function(err) {
          if (err) throw err;
          console.log("Succesfully submitted");
          res.redirect("/2024-2025/submit");
        });
      } else {
        console.log("User does'f found");
      }
    } catch (err) {
      console.log(err);
    }
  });
});
app.post("/submit-2025-2026", function(req, res) {

  User.findById(req.user.id, function(err, foundUser) {
    try {
      if (foundUser) {
        lectReport25_26.clearLecReport(foundUser);
        lectReport25_26.checkAndUpdateLecReport(foundUser, req);
        foundUser.mm2025_2026.destytojas.ataskaitosPateikimoData = req.body.ataskaitosPateikimoData,
          foundUser.mm2025_2026.destytojas.ivykiuDatos.pateikimas = dateTime.getFullDateTime();

        foundUser.save(function(err) {
          if (err) throw err;
          console.log("Succesfully submitted");
          res.redirect("/2025-2026/submit");
        });
      } else {
        console.log("User does'f found");
      }
    } catch (err) {
      console.log(err);
    }
  });
});

//---------------------DEPARTMENT-------------------
app.get("/department/2022-2023/create", function(req, res) {
  //turi isvesti visu destytoju info
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, logedInUser) {
      if (err) {
        console.log(err);
      } else if (logedInUser.role === "katedros vedėjas" && logedInUser.headOfTheDepartment22_23 === true) {
        let vedejoKatedra = req.user.katedra;
        User.find({
          katedra: vedejoKatedra,
          $or: [{
            busena22_23: "užrakinta"
          }, {
            busena22_23: "užrakintaVedėjo"
          }]
        }, function(err, users) {
          if (err) {
            console.log(err);
          } else {
            res.render("dep-create-2022-2023", {
              users: users, //destytojai
              logedInUser: logedInUser //prisijunges katedros vedejas
            });
          }
        });
      } else {
        res.render("user-window-2022-2023", {
          user: logedInUser
        });
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/department/2023-2024/create", function(req, res) {
  //turi isvesti visu destytoju info
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, logedInUser) {
      if (err) {
        console.log(err);
      } else if (logedInUser.role === "katedros vedėjas" && logedInUser.headOfTheDepartment23_24 === true) {
        let vedejoKatedra = req.user.katedra;
        User.find({
          katedra: vedejoKatedra,
          $or: [{
            busena23_24: "užrakinta"
          }, {
            busena23_24: "užrakintaVedėjo"
          }]
        }, function(err, users) {
          if (err) {
            console.log(err);
          } else {
            res.render("dep-create-2023-2024", {
              users: users,
              logedInUser: logedInUser
            });
          }
        });
      } else {
        res.render("user-window-2023-2024", {
          user: logedInUser
        });
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/department/2024-2025/create", function(req, res) {
  //turi isvesti visu destytoju info
  if (req.isAuthenticated()) {

    User.findById(req.user.id, function(err, logedInUser) {
      if (err) {
        console.log(err);
      } else if (logedInUser.role === "katedros vedėjas" && logedInUser.headOfTheDepartment24_25 === true) {
        let vedejoKatedra = req.user.katedra;
        User.find({
          katedra: vedejoKatedra,
          $or: [{
            busena24_25: "užrakinta"
          }, {
            busena24_25: "užrakintaVedėjo"
          }]
        }, function(err, users) {
          if (err) {
            console.log(err);
          } else {
            res.render("dep-create-2024-2025", {
              users: users,
              logedInUser: logedInUser
            });
          }
        });
      } else {
        res.render("dep-create-2023-2024", {
          users: users,
          logedInUser: logedInUser
        });
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/department/2025-2026/create", function(req, res) {
  //turi isvesti visu destytoju info
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, logedInUser) {
      if (err) {
        console.log(err);
      } else if (logedInUser.role === "katedros vedėjas" && logedInUser.headOfTheDepartment25_26 === true) {
        let vedejoKatedra = req.user.katedra;
        User.find({
          katedra: vedejoKatedra,
          $or: [{
            busena25_26: "užrakinta"
          }, {
            busena25_26: "užrakintaVedėjo"
          }]
        }, function(err, users) {
          if (err) {
            console.log(err);
          } else {
            res.render("dep-create-2025-2026", {
              users: users,
              logedInUser: logedInUser
            });
          }
        });
      } else {
        res.render("user-window-2023-2024", {
          user: logedInUser
        });
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.post("/dep-create-2022-2023", (req, res) => {

  User.findById(req.user.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        depReport22_23.updateDepReport(foundUser, req);
        foundUser.mm2022_2023.katedrosVedejas.ivykiuDatos.sukurimas = dateTime.getFullDateTime();
        foundUser.save(function(err) {
          if (err) throw err;
          console.log("Succesfully created 2022-2023");
          res.redirect("/2022-2023/user-window");
        });
      } else {
        console.log("User does'f found");
      }
    }
  });
});
app.post("/dep-create-2023-2024", (req, res) => {

  User.findById(req.user.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        depReport23_24.updateDepReport(foundUser, req);
        foundUser.mm2023_2024.katedrosVedejas.ivykiuDatos.sukurimas = dateTime.getFullDateTime();
        foundUser.save(function(err) {
          if (!err) {
            console.log("Succesfully created 2023-2024");
            res.redirect("/2023-2024/user-window");
          }
        });
      } else {
        console.log("User does'f found");
      }
    }
  });
});
app.post("/dep-create-2024-2025", (req, res) => {

  User.findById(req.user.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        depReport24_25.updateDepReport(foundUser, req);
        foundUser.mm2024_2025.katedrosVedejas.ivykiuDatos.sukurimas = dateTime.getFullDateTime();

        foundUser.save(function(err) {
          if (!err) {
            console.log("Succesfully created 2024-2025");
            res.redirect("/2024-2025/user-window");
          }
        });
      } else {
        console.log("User does'f found");
      }
    }
  });
});
app.post("/dep-create-2025-2026", (req, res) => {

  User.findById(req.user.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        depReport26_26.updateDepReport(foundUser, req);
        foundUser.mm2025_2026.katedrosVedejas.ivykiuDatos.sukurimas = dateTime.getFullDateTime();
        foundUser.save(function(err) {
          if (err) throw err;
          console.log("Succesfully created 2025-2026");
          res.redirect("/2025-2026/user-window");
        });
      } else {
        console.log("User does'f found");
      }
    }
  });
});

app.get("/department/2022-2023/edit", function(req, res) {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        res.render("dep-edit-2022-2023", {
          user: foundUser
        });
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/department/2023-2024/edit", function(req, res) {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        res.render("dep-edit-2023-2024", {
          user: foundUser
        });
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/department/2024-2025/edit", function(req, res) {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        res.render("dep-edit-2024-2025", {
          user: foundUser
        });
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/department/2025-2026/edit", function(req, res) {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        res.render("dep-edit-2025-2026", {
          user: foundUser
        });
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.post("/dep-update-2022-2023", (req, res) => {

  User.findById(req.user.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        depReport22_23.clearDepReport(foundUser);
        depReport22_23.updateDepReport(foundUser, req);
        foundUser.mm2022_2023.katedrosVedejas.ivykiuDatos.atnaujinimas = dateTime.getFullDateTime();
        foundUser.save(function(err) {
          if (err) throw err;
          console.log("Succesfully updated 2022-2023");
          res.redirect("/2022-2023/user-window");
        });
      } else {
        console.log("User does'f found");
      }
    }
  });
});
app.post("/dep-update-2023-2024", (req, res) => {

  User.findById(req.user.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        depReport23_24.clearDepReport(foundUser);
        depReport23_24.updateDepReport(foundUser, req);
        foundUser.mm2023_2024.katedrosVedejas.ivykiuDatos.atnaujinimas = dateTime.getFullDateTime();

        foundUser.save(function(err) {
          if (!err) {
            console.log("Succesfully updated 2023-2024");
            res.redirect("/2023-2024/user-window");
          }
        });
      } else {
        console.log("User does'f found");
      }
    }
  });
});
app.post("/dep-update-2024-2025", (req, res) => {

  User.findById(req.user.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        depReport24_25.clearDepReport(foundUser);
        depReport24_25.updateDepReport(foundUser, req);
        foundUser.mm2024_2025.katedrosVedejas.ivykiuDatos.atnaujinimas = dateTime.getFullDateTime();

        foundUser.save(function(err) {
          if (err) throw err;
          console.log("Succesfully updated 2024-2025");
          res.redirect("/2024-2025/user-window");
        });
      } else {
        console.log("User does'f found");
      }
    }
  });
});
app.post("/dep-update-2025-2026", (req, res) => {

  User.findById(req.user.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        depReport25_26.clearDepReport(foundUser);
        depReport25_26.updateDepReport(foundUser, req);
        foundUser.mm2025_2026.katedrosVedejas.ivykiuDatos.atnaujinimas = dateTime.getFullDateTime();

        foundUser.save(function(err) {
          if (err) throw err;
          console.log("Succesfully updated 2025-2026");
          res.redirect("/2025-2026/user-window");

        });
      } else {
        console.log("User does'f found");
      }
    }
  });
});

app.get("/department/2022-2023/submit", function(req, res) {

  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      let currentUserFaculty = foundUser.fakultetas;
      if (err) {
        console.log(err);
      } else {
        Faculty.findOne({
          username: currentUserFaculty
        }, function(err, foundFaculty) {
          if (err) {
            console.log(err);
          } else {
            res.render("dep-submit-2022-2023", {
              foundFaculty: foundFaculty,
              user: foundUser,
              fakultetasUpper: _.toUpper(foundUser.fakultetas),
              katedraUpper: _.toUpper(foundUser.katedra)
            });
          }
        });
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/department/2023-2024/submit", function(req, res) {

  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      let currentUserFaculty = foundUser.fakultetas;
      if (err) {
        console.log(err);
      } else {
        Faculty.findOne({
          username: currentUserFaculty
        }, function(err, foundFaculty) {
          if (err) {
            console.log(err);
          } else {
            res.render("dep-submit-2023-2024", {
              foundFaculty: foundFaculty,
              user: foundUser,
              fakultetasUpper: _.toUpper(foundUser.fakultetas),
              katedraUpper: _.toUpper(foundUser.katedra)
            });
          }
        });
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/department/2024-2025/submit", function(req, res) {

  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      let currentUserFaculty = foundUser.fakultetas;
      if (err) {
        console.log(err);
      } else {
        Faculty.findOne({
          username: currentUserFaculty
        }, function(err, foundFaculty) {
          if (err) {
            console.log(err);
          } else {
            res.render("dep-submit-2024-2025", {
              foundFaculty: foundFaculty,
              user: foundUser,
              fakultetasUpper: _.toUpper(foundUser.fakultetas),
              katedraUpper: _.toUpper(foundUser.katedra)
            });
          }
        });
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/department/2025-2026/submit", function(req, res) {

  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      let currentUserFaculty = foundUser.fakultetas;
      if (err) {
        console.log(err);
      } else {
        Faculty.findOne({
          username: currentUserFaculty
        }, function(err, foundFaculty) {
          if (err) {
            console.log(err);
          } else {
            res.render("dep-submit-2025-2026", {
              foundFaculty: foundFaculty,
              user: foundUser,
              fakultetasUpper: _.toUpper(foundUser.fakultetas),
              katedraUpper: _.toUpper(foundUser.katedra)
            });
          }
        });
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.post("/dep-submit-2022-2023", function(req, res) {

  User.findById(req.user.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        depReport22_23.clearDepReport(foundUser);
        depReport22_23.checkAndUpdateDepReport(foundUser, req);
        foundUser.mm2022_2023.katedrosVedejas.ataskaitosPateikimoData = req.body.ataskaitosPateikimoData,
          foundUser.mm2022_2023.katedrosVedejas.ivykiuDatos.pateikimas = dateTime.getFullDateTime();

        foundUser.save(function(err) {
          if (err) throw err;
          console.log("Succesfully submitted");
          res.redirect("/user-window-2022-2023");
        });
      } else {
        console.log("User does'f found");
      }
    }
  });
});
app.post("/dep-submit-2023-2024", function(req, res) {

  User.findById(req.user.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        depReport23_24.clearDepReport(foundUser);
        depReport23_24.checkAndUpdateDepReport(foundUser, req);
        foundUser.mm2023_2024.katedrosVedejas.ataskaitosPateikimoData = req.body.ataskaitosPateikimoData,
          foundUser.mm2023_2024.katedrosVedejas.ivykiuDatos.pateikimas = dateTime.getFullDateTime();

        foundUser.save(function(err) {
          if (err) throw err;
          console.log("Succesfully submitted");
          res.redirect("/user-window-2023-2024");
        });
      } else {
        console.log("User does'f found");
      }
    }
  });
});
app.post("/dep-submit-2024-2025", function(req, res) {

  User.findById(req.user.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        depReport24_25.clearDepReport(foundUser);
        depReport24_25.checkAndUpdateDepReport(foundUser, req);
        foundUser.mm2024_2025.katedrosVedejas.ataskaitosPateikimoData = req.body.ataskaitosPateikimoData,
          foundUser.mm2024_2025.katedrosVedejas.ivykiuDatos.pateikimas = dateTime.getFullDateTime();

        foundUser.save(function(err) {
          if (err) throw err;
          console.log("Succesfully submitted");
          res.redirect("/user-window-2024-2025");
        });
      } else {
        console.log("User does'f found");
      }
    }
  });
});
app.post("/dep-submit-2025-2026", function(req, res) {

  User.findById(req.user.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        depReport25_26.clearDepReport(foundUser);
        depReport25_26.checkAndUpdateDepReport(foundUser, req);
        foundUser.mm2025_2026.katedrosVedejas.ataskaitosPateikimoData = req.body.ataskaitosPateikimoData,
          foundUser.mm2025_2026.katedrosVedejas.ivykiuDatos.pateikimas = dateTime.getFullDateTime();

        foundUser.save(function(err) {
          if (err) throw err;
          console.log("Succesfully submitted");
          res.redirect("/user-window-2025-2026");
        });
      } else {
        console.log("User does'f found");
      }
    }
  });
});

app.get("/logout", function(req, res) {

  User.findById(req.user.id, function(err, foundUser) {
    if (err) {
      console.log(err);
      res.redirect('/login');
    } else {
      var a = req.user.username;
      foundUser.updated_for = "Atsijungimas" + " " + a;
      foundUser.save(function(err) {
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

app.get("/user-window", function(req, res) {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        //console.log("Error...");
        console.log(err);
      } else {
        if (foundUser.role === "dėstytojas" || foundUser.role === "katedros vedėjas") {
          res.render("user-window", {
            user: foundUser
          });
        } else {
          console.log("You don't have permission");
          console.log("user-window nepraleidžia");
          res.redirect("/login");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.post("/update-user", function(req, res) {
  if (req.isAuthenticated()) {

    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          foundUser.vardas = req.body.vardas,
            foundUser.pavarde = req.body.pavarde,
            foundUser.updated_for = req.user.username

          foundUser.save(function(err) {
            if (err) throw err;
            console.log("Dėstytojas info succesfully updated ");
            if (foundUser.role === "dėstytojas" || foundUser.role === "katedros vedėjas") {
              res.redirect("/user-window");
            } else {
              res.redirect("/login");
            }
          });
        } else {
          console.log("User does'f found");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/user-window-selection", function(req, res) {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "dėstytojas" || foundUser.role === "katedros vedėjas") {
          res.render("user-window-selection", {
            user: foundUser
          });
        } else {
          console.log("You don't have permission");
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
app.post("/update-user-window-selection-role", function(req, res) {
  if (req.isAuthenticated()) {

    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser) {
          foundUser.role = req.body.role,
            foundUser.updated_for = req.user.username

          foundUser.save(function(err) {
            if (err) throw err;
            res.redirect("/user-window");
          });
        } else {
          console.log("User does'f found");
        }
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/2022-2023/user-window", function(req, res) {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "dėstytojas" || foundUser.role === "katedros vedėjas") {
          res.render("user-window-2022-2023", {
            user: foundUser
          });
        } else {
          console.log("You don't have permission");
          res.redirect("/login");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/2023-2024/user-window", function(req, res) {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "dėstytojas" || foundUser.role === "katedros vedėjas") {
          res.render("user-window-2023-2024", {
            user: foundUser
          });
        } else {
          console.log("You don't have permission");
          console.log("user-window nepraleidžia");
          res.redirect("/login");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/2024-2025/user-window", function(req, res) {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "dėstytojas" || foundUser.role === "katedros vedėjas") {
          res.render("user-window-2024-2025", {
            user: foundUser
          });
        } else {
          console.log("You don't have permission");
          console.log("user-window nepraleidžia");
          res.redirect("/login");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/2025-2026/user-window", function(req, res) {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "dėstytojas" || foundUser.role === "katedros vedėjas") {
          res.render("user-window-2025-2026", {
            user: foundUser
          });
        } else {
          console.log("You don't have permission");
          console.log("user-window nepraleidžia");
          res.redirect("/login");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});
//Katedros vedėjas atnaujina dėstytojų sk. info profilyje
app.post("/update-user-dep-2022-2023", function(req, res) {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          //foundUser.katedra = req.body.katedra,
          //foundUser.fakultetas = req.body.fakultetas,
          foundUser.mm2022_2023.katedrosVedejas.katedrosDestytojuSk = req.body.katedrosDestytojuSkaicius,
            foundUser.updated_for = req.user.username
          foundUser.save(function(err) {
            if (err) throw err;
            if (foundUser.role === "katedros vedėjas") {
              res.redirect("/2022-2023/user-window");
            } else {
              res.redirect("/login");
            }
          });
        } else {
          console.log("User does'f found");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.post("/update-user-dep-2023-2024", function(req, res) {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          //foundUser.katedra = req.body.katedra,
          //foundUser.fakultetas = req.body.fakultetas,
          foundUser.mm2023_2024.katedrosVedejas.katedrosDestytojuSk = req.body.katedrosDestytojuSkaicius,
            foundUser.updated_for = req.user.username
          foundUser.save(function(err) {
            if (err) throw err;
            if (foundUser.role === "katedros vedėjas") {
              //console.log("vedejas");
              res.redirect("/2023-2024/user-window");
            } else {
              res.redirect("/login");
            }
          });
        } else {
          console.log("User does'f found");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.post("/update-user-dep-2024-2025", function(req, res) {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          //foundUser.katedra = req.body.katedra,
          //foundUser.fakultetas = req.body.fakultetas,
          foundUser.mm2024_2025.katedrosVedejas.katedrosDestytojuSk = req.body.katedrosDestytojuSkaicius,
            foundUser.updated_for = req.user.username
          foundUser.save(function(err) {
            if (err) throw err;
            if (foundUser.role === "katedros vedėjas") {
              //console.log("vedejas");
              res.redirect("/2024-2025/user-window");
            } else {
              res.redirect("/login");
            }
          });
        } else {
          console.log("User does'f found");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.post("/update-user-dep-2025-2026", function(req, res) {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          //foundUser.katedra = req.body.katedra,
          //foundUser.fakultetas = req.body.fakultetas,
          foundUser.mm2025_2026.katedrosVedejas.katedrosDestytojuSk = req.body.katedrosDestytojuSkaicius,
            foundUser.updated_for = req.user.username
          foundUser.save(function(err) {
            if (err) throw err;
            if (foundUser.role === "katedros vedėjas") {
              //console.log("vedejas");
              res.redirect("/2025-2026/user-window");
            } else {
              res.redirect("/login");
            }
          });
        } else {
          console.log("User does'f found");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});
//-----------------Head of the DEPARTMENT------------------------------------
app.get("/department/2022-2023/lecturers-list", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      let vedejoKatedra;
      if (req.user.katedra === "") {
        vedejoKatedra = "nepriskirta";
      } else {
        vedejoKatedra = req.user.katedra
      }
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "katedros vedėjas") {
          User.find({
            katedra: vedejoKatedra,
          }, function(err, users) {
            if (err) {
              console.log(err);
            } else {
              res.render("dep-lecturers-list-2022-2023", {
                users: users,
                depUser: foundUser
              });
            }
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
app.get("/department/2023-2024/lecturers-list", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      let vedejoKatedra;
      if (req.user.katedra === "") {
        vedejoKatedra = "nepriskirta";
      } else {
        vedejoKatedra = req.user.katedra
      }
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "katedros vedėjas") {
          User.find({
            katedra: vedejoKatedra,
          }, function(err, users) {
            if (err) {
              console.log(err);
            } else {
              res.render("dep-lecturers-list-2023-2024", {
                users: users,
                depUser: foundUser
              });
            }
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
app.get("/department/2024-2025/lecturers-list", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      let vedejoKatedra;
      if (req.user.katedra === "") {
        vedejoKatedra = "nepriskirta";
      } else {
        vedejoKatedra = req.user.katedra
      }
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "katedros vedėjas") {
          User.find({
            katedra: vedejoKatedra,
          }, function(err, users) {
            if (err) {
              console.log(err);
            } else {
              res.render("dep-lecturers-list-2024-2025", {
                users: users,
                depUser: foundUser
              });
            }
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
app.get("/department/2025-2026/lecturers-list", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      let vedejoKatedra;
      if (req.user.katedra === "") {
        vedejoKatedra = "nepriskirta";
      } else {
        vedejoKatedra = req.user.katedra
      }
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "katedros vedėjas") {
          User.find({
            katedra: vedejoKatedra,
          }, function(err, users) {
            if (err) {
              console.log(err);
            } else {
              res.render("dep-lecturers-list-2025-2026", {
                users: users,
                depUser: foundUser
              });
            }
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

app.get("/department/2022-2023/edit-user/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "katedros vedėjas") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function(err, user) {
              if (err) {
                console.log(err);
              } else {
                res.render("dep-edit-user-2022-2023", {
                  user: user
                });
              }
            });
          } else {
            res.redirect("/user-window");
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
app.get("/department/2023-2024/edit-user/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "katedros vedėjas") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function(err, user) {
              if (err) {
                console.log(err);
              } else {
                res.render("dep-edit-user-2023-2024", {
                  user: user
                });
              }
            });
          } else {
            res.redirect("/user-window");
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
app.get("/department/2024-2025/edit-user/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "katedros vedėjas") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function(err, user) {
              if (err) {
                console.log(err);
              } else {
                res.render("dep-edit-user-2024-2025", {
                  user: user
                });
              }
            });
          } else {
            res.redirect("/user-window");
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
app.get("/department/2025-2026/edit-user/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "katedros vedėjas") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function(err, user) {
              if (err) {
                console.log(err);
              } else {
                res.render("dep-edit-user-2025-2026", {
                  user: user
                });
              }
            });
          } else {
            res.redirect("/user-window");
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

//Katedros vedėjas atnaujina dėstytojo būseną
app.post("/update-user-info-dep-2022-2023", (req, res) => {
  User.findById(req.body.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.busena22_23 = req.body.busena,
          foundUser.updated_for = req.user.username
        foundUser.save(function(err) {
          if (err) throw err;
          res.redirect("/department/2022-2023/lecturers-list");
        });
      } else {
        console.log("Does'f found");
      }
    }
  });
});
app.post("/update-user-info-dep-2023-2024", (req, res) => {
  User.findById(req.body.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.busena23_24 = req.body.busena,
          foundUser.updated_for = req.user.username
        foundUser.save(function(err) {
          if (err) throw err;
          res.redirect("/department/2023-2024/lecturers-list");
        });
      } else {
        console.log("Does'f found");
      }
    }
  });
});
app.post("/update-user-info-dep-2024-2025", (req, res) => {
  User.findById(req.body.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.busena24_25 = req.body.busena,
          foundUser.updated_for = req.user.username
        foundUser.save(function(err) {
          if (err) throw err;
          res.redirect("/department/2024-2025/lecturers-list");
        });
      } else {
        console.log("Does'f found");
      }
    }
  });
});
app.post("/update-user-info-dep-2025-2026", (req, res) => {
  User.findById(req.body.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.busena25_26 = req.body.busena,
          foundUser.updated_for = req.user.username
        foundUser.save(function(err) {
          if (err) throw err;
          res.redirect("/department/2025-2026/lecturers-list");
        });
      } else {
        console.log("Does'f found");
      }
    }
  });
});

app.get("/department/2022-2023/edit-lecturer-report/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "katedros vedėjas") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function(err, user) {
              let currentUserFaculty = foundUser.fakultetas;
              if (err) {
                console.log(err);
              } else {
                Faculty.findOne({
                  username: currentUserFaculty
                }, function(err, foundFaculty) {
                  if (err) {
                    console.log(err);
                  } else {
                    res.render("dep-lecturer-report-2022-2023", {
                      foundFaculty: foundFaculty,
                      user: user,
                      fakultetasUpper: _.toUpper(user.fakultetas),
                      katedraUpper: _.toUpper(user.katedra),
                      vardasUpper: _.toUpper(foundUser.vardas),
                      pavardeUpper: _.toUpper(foundUser.pavarde)
                    });
                  }
                });

              }
            });
          } else {
            res.redirect("/user-window");
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
app.get("/department/2023-2024/edit-lecturer-report/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "katedros vedėjas") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function(err, user) {
              let currentUserFaculty = foundUser.fakultetas;
              if (err) {
                console.log(err);
              } else {
                Faculty.findOne({
                  username: currentUserFaculty
                }, function(err, foundFaculty) {
                  if (err) {
                    console.log(err);
                  } else {
                    res.render("dep-lecturer-report-2023-2024", {
                      foundFaculty: foundFaculty,
                      user: user,
                      fakultetasUpper: _.toUpper(user.fakultetas),
                      katedraUpper: _.toUpper(user.katedra),
                      vardasUpper: _.toUpper(foundUser.vardas),
                      pavardeUpper: _.toUpper(foundUser.pavarde)
                    });
                  }
                });

              }
            });
          } else {
            res.redirect("/user-window");
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
app.get("/department/2024-2025/edit-lecturer-report/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "katedros vedėjas") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function(err, user) {
              let currentUserFaculty = foundUser.fakultetas;
              if (err) {
                console.log(err);
              } else {
                Faculty.findOne({
                  username: currentUserFaculty
                }, function(err, foundFaculty) {
                  if (err) {
                    console.log(err);
                  } else {
                    res.render("dep-lecturer-report-2024-2025", {
                      foundFaculty: foundFaculty,
                      user: user,
                      fakultetasUpper: _.toUpper(user.fakultetas),
                      katedraUpper: _.toUpper(user.katedra),
                      vardasUpper: _.toUpper(foundUser.vardas),
                      pavardeUpper: _.toUpper(foundUser.pavarde)
                    });
                  }
                });

              }
            });
          } else {
            res.redirect("/user-window");
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
app.get("/department/2025-2026/edit-lecturer-report/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "katedros vedėjas") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function(err, user) {
              let currentUserFaculty = foundUser.fakultetas;
              if (err) {
                console.log(err);
              } else {
                Faculty.findOne({
                  username: currentUserFaculty
                }, function(err, foundFaculty) {
                  if (err) {
                    console.log(err);
                  } else {
                    res.render("dep-lecturer-report-2025-2026", {
                      foundFaculty: foundFaculty,
                      user: user,
                      fakultetasUpper: _.toUpper(user.fakultetas),
                      katedraUpper: _.toUpper(user.katedra),
                      vardasUpper: _.toUpper(foundUser.vardas),
                      pavardeUpper: _.toUpper(foundUser.pavarde)
                    });
                  }
                });

              }
            });
          } else {
            res.redirect("/user-window");
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
// Katedros vedėjas atnaujina dėstytojo ataskaitą
app.post("/update-report-lecturer-dep-2022-2023", (req, res) => {
  User.findById(req.body.id, function(err, foundUser) {
    try {
      if (foundUser) {
        //masyvu isvalymas
        lectReport22_23.clearLecReport(foundUser);
        if (req.body.ataskaitos_busena == "užrakinta") {
          lectReport22_23.updateLecReport(foundUser, req);
          lectReport22_23.headOfDepAddToLecReport(foundUser, req);
        } else if (req.body.ataskaitos_busena == "užrakintaVedėjo") { //busena perduodama paspaudus mygtuka
          lectReport22_23.checkAndUpdateLecReport(foundUser, req);
          lectReport22_23.headOfDepAddToLecReport(foundUser, req);
          foundUser.mm2022_2023.destytojas.ivykiuDatos.pateikimasVedejo = dateTime.getFullDateTime();
        }
        foundUser.save(function(err) {
          if (err) throw err;
          res.redirect("/department/2022-2023/lecturers-list");
        });
      } else {
        console.log("Does'f found");
      }
    } catch (err) {
      console.log(err);
    }
  });
});
app.post("/update-report-lecturer-dep-2023-2024", (req, res) => {
  User.findById(req.body.id, function(err, foundUser) {
    try {
      if (foundUser) {
        lectReport23_24.clearLecReport(foundUser);
        if (req.body.ataskaitos_busena == "užrakinta") {
          lectReport23_24.updateLecReport(foundUser, req);
          lectReport23_24.headOfDepAddToLecReport(foundUser, req);
        } else if (req.body.ataskaitos_busena == "užrakintaVedėjo") { //busena perduodama paspaudus mygtuka
          lectReport23_24.checkAndUpdateLecReport(foundUser, req);
          lectReport23_24.headOfDepAddToLecReport(foundUser, req);
          foundUser.mm2023_2024.destytojas.ivykiuDatos.pateikimasVedejo = dateTime.getFullDateTime();
        }
        foundUser.save(function(err) {
          if (err) throw err;
          res.redirect("/department/2023-2024/lecturers-list");
        });
      } else {
        console.log("Does'f found");
      }
    } catch (err) {
      console.log(err);
    }
  });
});
app.post("/update-report-lecturer-dep-2024-2025", (req, res) => {
  User.findById(req.body.id, function(err, foundUser) {
    try {
      if (foundUser) {
        lectReport24_25.clearLecReport(foundUser);
        if (req.body.ataskaitos_busena == "užrakinta") {
          lectReport24_25.updateLecReport(foundUser, req);
          lectReport24_25.headOfDepAddToLecReport(foundUser, req);
        } else if (req.body.ataskaitos_busena == "užrakintaVedėjo") {
          lectReport24_25.checkAndUpdateLecReport(foundUser, req);
          lectReport24_25.headOfDepAddToLecReport(foundUser, req);
          foundUser.mm2024_2025.destytojas.ivykiuDatos.pateikimasVedejo = dateTime.getFullDateTime();
        } //"užrakintaVedėjo"

        foundUser.save(function(err) {
          if (err) throw err;
          res.redirect("/department/2024-2025/lecturers-list");
        });
      } else {
        console.log("Does'f found");
      }
    } catch (err) {
      console.log(err);
    }
  });
});
app.post("/update-report-lecturer-dep-2025-2026", (req, res) => {
  User.findById(req.body.id, function(err, foundUser) {
    try {
      if (foundUser) {
        lectReport25_26.clearLecReport(foundUser);
        if (req.body.ataskaitos_busena == "užrakinta") {
          lectReport25_26.updateLecReport(foundUser, req);
          lectReport25_26.headOfDepAddToLecReport(foundUser, req);
        } else if (req.body.ataskaitos_busena == "užrakintaVedėjo") {
          lectReport25_26.checkAndUpdateLecReport(foundUser, req);
          lectReport25_26.headOfDepAddToLecReport(foundUser, req);
          foundUser.mm2025_2026.destytojas.ivykiuDatos.pateikimasVedejo = dateTime.getFullDateTime();
        }
        foundUser.save(function(err) {
          if (err) throw err;
          res.redirect("/department/2025-2026/lecturers-list");
        });
      } else {
        console.log("Does'f found");
      }
    } catch (err) {
      console.log(err);
    }

  });
});

//------------------ADMIN----------------------------------------
app.get("/admin/profile", function(req, res) {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          res.render("admin-window", {
            user: foundUser
          });
        } else {
          console.log("You dont have permission");
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
// Administratorius atnaujina savo info
app.post("/update-profile-admin", function(req, res) {

  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser) {
          foundUser.vardas = req.body.vardas,
            foundUser.pavarde = req.body.pavarde
          foundUser.updated_for = req.user.username //username- savo username paimti
          foundUser.save(function(err) {
            if (err) throw err;
            console.log("User info succesfully updated");
            res.redirect("/admin/profile");
          });
        } else {
          console.log("User doesn't found");
        }
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res.redirect("/login");
  }
});

// main list with ALL DB USERS
app.get("/admin/users", (req, res, next) => {

  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          var perPage = 5;
          var page = req.params.page || 1;
          User.find({})
            .skip((perPage * page) - perPage)
            .limit(perPage).exec(function(err, users) {
              if (err) throw err;
              User.countDocuments({}).exec((err, count) => {
                res.render("admin-users-list", {
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
app.get("/admin/users/:page", (req, res, next) => {

  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          var perPage = 5;
          var page = req.params.page || 1;
          User.find({})
            .skip((perPage * page) - perPage)
            .limit(perPage).exec(function(err, users) {

              if (err) throw err;
              User.countDocuments({}).exec((err, count) => {
                res.render("admin-users-list", {
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
app.get("/admin/users/edit/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function(err, user) {
              if (err) {
                console.log(err);
              } else {
                res.render("admin-user-edit", {
                  user: user
                });
              }
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
// Administratorius atnaujina naudotojo info
app.post("/update-user-info-admin", (req, res) => {

  User.findById(req.body.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.activeUser = req.body.isActive,
          foundUser.vardas = req.body.vardas,
          foundUser.pavarde = req.body.pavarde,
          foundUser.username = req.body.elpastas,
          foundUser.fakultetas = req.body.fakultetas,
          foundUser.katedra = req.body.katedra,

          foundUser.rolesKeitimas = req.body.rolesKeitimas,
          foundUser.role = req.body.role,

          foundUser.teachingYear22_23 = req.body.destymoMetai22_23,
          foundUser.teachingYear23_24 = req.body.destymoMetai23_24,
          foundUser.teachingYear24_25 = req.body.destymoMetai24_25,
          foundUser.teachingYear25_26 = req.body.destymoMetai25_26,
          foundUser.headOfTheDepartment22_23 = req.body.vedejoDarboMetai22_23,
          foundUser.headOfTheDepartment23_24 = req.body.vedejoDarboMetai23_24,
          foundUser.headOfTheDepartment24_25 = req.body.vedejoDarboMetai24_25,
          foundUser.headOfTheDepartment25_26 = req.body.vedejoDarboMetai25_26,
          foundUser.updated_for = req.user.username //username- prisijungusio userio id paimti iš DB reikia username
        foundUser.save(function(err) {
          if (err) throw err;
          res.redirect("/admin/users");
        });
      } else {
        console.log("Does'f found");
      }
    }
  });
});
// Administratorius ištrina naudotoją iš DB
app.post("/delete", function(req, res) {
  User.deleteOne({
      _id: req.body.deleteById
    },
    function(err) {
      if (!err) {
        res.redirect("/admin/users");
      } else {
        res.send(err);
      }
    }
  );
});

app.get("/admin/faculties", (req, res) => {

  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "administratorius") {
          Faculty.find({}, function(err, faculties) {
            if (err) {
              console.log(err);
            } else {
              res.render("admin-faculties-list", {
                faculties: faculties
              });
            }
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
app.get("/admin/faculties/create", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "administratorius") {
          res.render("admin-faculties-create");
        } else {
          console.log("User role unknown");
          res.redirect("/login");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/admin/faculties/edit/:facultyId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.facultyId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            Faculty.findById((reqId), function(err, faculty) {
              if (err) {
                console.log(err);
              } else {
                res.render("admin-faculties-edit", {
                  faculty: faculty
                });
              }
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
// Administratorius sukuria fakultetą
app.post("/create-faculty", (req, res) => {
  const faculty = new Faculty({
    username: req.body.fakultetas,
    dekanas: req.body.dekanas,
    prodekanas: req.body.prodekanas
  });
  faculty.save(function(err) {
    if (err) throw err;
    console.log("Succesfully created");
    res.redirect("/admin/faculties");
  });
});
// Administratorius atnaujina fakultetą
app.post("/edit-faculty", (req, res) => {

  Faculty.findById(req.body.id, function(err, foundFaculty) {
    if (err) {
      console.log(err);
    } else {
      if (foundFaculty) {
        foundFaculty.username = req.body.fakultetas,
          foundFaculty.dekanas = req.body.dekanas,
          foundFaculty.prodekanas = req.body.prodekanas
        foundFaculty.save(function(err) {
          if (err) throw err;
          console.log("Succesfully updated");
          res.redirect("/admin/faculties");
        });
      } else {
        console.log("Faculty does'f found");
      }
    }
  });
});
// Administratorius ištrina naudotoją iš DB
app.post("/delete-faculty", function(req, res) {

  Faculty.deleteOne({
      _id: req.body.deleteById
    },
    function(err) {
      if (!err) {
        res.redirect("/admin/faculties");
      } else {
        res.send(err);
      }
    }
  );
});
//end main list with ALL DB USERS

// USERS list by year
app.get("/admin/2022-2023/users", (req, res, next) => {

  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          var perPage = 5;
          var page = req.params.page || 1;
          User.find({
              teachingYear22_23: true
            })
            .skip((perPage * page) - perPage)
            .limit(perPage).exec(function(err, users) {
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
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          let perPage = 5;
          let page = req.params.page || 1;
          console.log(page);
          User.find({
              teachingYear22_23: true
            }) // pagal metus perduoti
            .skip((perPage * page) - perPage)
            .limit(perPage).exec(function(err, users) {
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
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          var perPage = 5;
          var page = req.params.page || 1;
          User.find({
              teachingYear23_24: true
            })
            .skip((perPage * page) - perPage)
            .limit(perPage).exec(function(err, users) {
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
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          let perPage = 5;
          let page = req.params.page || 1;
          User.find({
              teachingYear23_24: true
            }) // pagal metus perduoti
            .skip((perPage * page) - perPage)
            .limit(perPage).exec(function(err, users) {
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
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          var perPage = 5;
          var page = req.params.page || 1;
          User.find({
              teachingYear24_25: true
            })
            .skip((perPage * page) - perPage)
            .limit(perPage).exec(function(err, users) {
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
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          let perPage = 5;
          let page = req.params.page || 1;
          console.log(page);
          User.find({
              teachingYear24_25: true
            }) // pagal metus perduoti
            .skip((perPage * page) - perPage)
            .limit(perPage).exec(function(err, users) {
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
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          var perPage = 5;
          var page = req.params.page || 1;
          User.find({
              teachingYear25_26: true
            })
            .skip((perPage * page) - perPage)
            .limit(perPage).exec(function(err, users) {
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
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          var perPage = 5;
          var page = req.params.page || 1;
          User.find({
              teachingYear25_26: true
            }) // pagal metus perduoti
            .skip((perPage * page) - perPage)
            .limit(perPage).exec(function(err, users) {
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
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function(err, user) {
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
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function(err, user) {
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
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function(err, user) {
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
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function(err, user) {
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

  User.findById(req.body.id, function(err, foundUser) {
    try {
      if (foundUser) {
        foundUser.busena22_23 = req.body.busena,
          foundUser.busenaVedejo22_23 = req.body.busenaVedejo,
          //if (err) throw err;
          foundUser.updated_for = req.user.username //username- prisijungusio userio id paimti iš DB reikia username
        foundUser.save(function(err) {
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

  User.findById(req.body.id, function(err, foundUser) {
    y = 5;
    try {
      if (foundUser) {
        foundUser.busena23_24 = req.body.busena,
          foundUser.busenaVedejo23_24 = req.body.busenaVedejo,
          foundUser.updated_for = req.user.username //username- prisijungusio userio id paimti iš DB reikia username
        foundUser.save(function(err) {
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
  User.findById(req.body.id, function(err, foundUser) {
    try {
      if (foundUser) {
        foundUser.busena24_25 = req.body.busena,
          foundUser.busenaVedejo24_25 = req.body.busenaVedejo,
          foundUser.updated_for = req.user.username //username- prisijungusio userio id paimti iš DB reikia username
        foundUser.save(function(err) {
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

  User.findById(req.body.id, function(err, foundUser) {
    try {
      if (foundUser) {
        foundUser.busena25_26 = req.body.busena,
          foundUser.busenaVedejo25_26 = req.body.busenaVedejo,
          foundUser.updated_for = req.user.username //username- prisijungusio userio id paimti iš DB reikia username
        foundUser.save(function(err) {
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
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function(err, user) {
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
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function(err, user) {
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
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function(err, user) {
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
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function(err, user) {
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
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function(err, user) {
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
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function(err, user) {
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
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function(err, user) {
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
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function(err, user) {
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

  User.findById(req.body.id, function(err, foundUser) {
    try {
      if (foundUser) {
        //masyvu isvalymas update
        lectReport22_23.clearLecReport(foundUser);
        lectReport22_23.updateLecReport(foundUser, req);
        lectReport22_23.headOfDepAddToLecReport(foundUser, req);
        foundUser.save(function(err) {
          if (err) throw err;
          console.log("Succesfully  updated");
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
app.post("/update-report-lec-admin-2023-2024", (req, res) => {

  User.findById(req.body.id, function(err, foundUser) {
    try {
      if (foundUser) {
        lectReport23_24.clearLecReport(foundUser);
        lectReport23_24.updateLecReport(foundUser, req);
        lectReport23_24.headOfDepAddToLecReport(foundUser, req);
        foundUser.save(function(err) {
          if (err) throw err;
          console.log("Succesfully  updated");
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
app.post("/update-report-lec-admin-2024-2025", (req, res) => {

  User.findById(req.body.id, function(err, foundUser) {
    try {
      if (foundUser) {
        lectReport24_25.clearLecReport(foundUser);
        lectReport24_25.updateLecReport(foundUser, req);
        lectReport24_25.headOfDepAddToLecReport(foundUser, req);
        foundUser.save(function(err) {
          if (err) throw err;
          console.log("Succesfully  updated");
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
app.post("/update-report-lec-admin-2025-2026", (req, res) => {

  User.findById(req.body.id, function(err, foundUser) {
    try {
      if (foundUser) {
        lectReport25_26.clearLecReport(foundUser);
        lectReport25_26.updateLecReport(foundUser, req);
        lectReport25_26.headOfDepAddToLecReport(foundUser, req);
        foundUser.save(function(err) {
          if (err) throw err;
          console.log("Succesfully  updated");
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

app.get("/admin/2022-2023/departments/edit-report/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function(err, user) {
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
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function(err, user) {
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
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function(err, user) {
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
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function(err, user) {
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
  User.findById(req.body.id, function(err, foundUser) {
    try {
      if (foundUser) {
        depReport22_23.clearDepReport(foundUser);
        depReport22_23.update(foundUser, req);
        foundUser.save(function(err) {
          if (err) throw err;
          console.log("Succesfully  updated");
          res.redirect("admin/2022-2023/users");
        });
      } else {
        console.log("Does'f found");
      }
    } catch (err) {
      console.log(err);
    }
  });
});
app.post("/update-report-dep-admin-2023-2024", (req, res) => {
  User.findById(req.body.id, function(err, foundUser) {
    try {
      if (foundUser) {
        depReport23_24.clearDepReport(foundUser);
        depReport23_24.update(foundUser, req);
        foundUser.save(function(err) {
          if (err) throw err;
          console.log("Succesfully  updated");
          res.redirect("admin/2023-2024/users");
        });
      } else {
        console.log("Does'f found");
      }
    } catch (err) {
      console.log(err);
    }
  });
});
app.post("/update-report-dep-admin-2024-2025", (req, res) => {
  User.findById(req.body.id, function(err, foundUser) {
    try {
      if (foundUser) {
        depReport24_25.clearDepReport(foundUser);
        depReport24_25.update(foundUser, req);
        foundUser.save(function(err) {
          if (err) throw err;
          console.log("Succesfully  updated");
          res.redirect("admin/2024-2025/users");
        });
      } else {
        console.log("Does'f found");
      }
    } catch (err) {
      console.log(err);
    }
  });
});
app.post("/update-report-dep-admin-2025-2026", (req, res) => {
  User.findById(req.body.id, function(err, foundUser) {
    try {
      if (foundUser) {
        depReport25_26.clearDepReport(foundUser);
        depReport25_26.update(foundUser, req);
        foundUser.save(function(err) {
          if (err) throw err;
          console.log("Succesfully  updated");
          res.redirect("admin/2025-2026/users");
        });
      } else {
        console.log("Does'f found");
      }
    }
    catch (err) {
      console.log(err);
    }
  });
});

app.use('/*/*/*', (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
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
    User.findById(req.user.id, function(err, foundUser) {
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

    User.findById(req.user.id, function(err, foundUser) {
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

app.listen(3000, function() {
  console.log("ReportsApp has started successfully on port 3000");
});
