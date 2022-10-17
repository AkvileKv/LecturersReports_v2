const _ = require("lodash");
const passport = require('passport');
const User = require('../models/user');

module.exports = {
  postRegister: (req, res) => {
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
        req.flash('userFail', req.body.username);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function () {
          req.flash('userR', req.body.username);
          res.redirect("/user-window-selection");
        });
      }
    });
  },
  postLogin: (req, res) => {
    //console.log("1");
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
    //console.log("2");
    req.flash('userFail', "Fail"); //nepaima requesto 

    req.login(user, function (err) {
     // console.log("3");
      if (err) throw err;
      passport.authenticate("local", {
        failureRedirect: '/login', failureMessage: true
      })(req, res, function () {
        //console.log("4");
        User.findById(req.user.id, function (err, foundUser) {
        //  console.log("5");
          try {
            let a = req.user.username;
            foundUser.updated_for = "Prisijungimas" + " " + a;

            foundUser.save(function (err) {
              if (err) throw err;
              if (foundUser.role === "dėstytojas" || foundUser.role === "katedros vedėjas") {
                req.flash('userL', req.body.username);
                res.redirect("/user-window-selection");
              } else if (foundUser.role === "administratorius") {
                req.flash('userL', req.body.username);
                res.redirect("/admin/profile");
              }
            });
          } catch (err) {
            console.log(err);
          }
        });
      });
    });
    //}
  },
  getLogout: (req, res, next) => {
    let a = req.user.id;
    if (typeof a === "undefined") {
      console.log("undefined");
      req.flash("userId", "Undefined");
      res.redirect('/');
    }
    User.findById(req.user.id, function (err, foundUser) {
      // if (_.isUndefined(foundUser)){
      //   console.log("undefined");
      //   req.flash("userId", "Undefined");
      //   res.redirect('/');
      // }
      if (err) {
        console.log(err);
        res.redirect('/login');
      } else {
        let a = req.user.username;
        foundUser.updated_for = "Atsijungimas" + " " + a;
        foundUser.save(function (err) {
          if (err) throw err;
        });
      }
      req.logout(function (err) {
        if (err) { return next(err); }
      });
    });
    res.redirect('/');
  },
  get404: (req, res) => {
    User.findById(req.user.id, function (err, foundUser) {
      if (err) throw err;
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
    });
  }

}