const User = require('../models/user');
const Faculty = require('../models/faculty');

const lectReport22_23 = require('./report/lecturers-report22_23');
const lectReport23_24 = require('./report/lecturers-report23_24');
const lectReport24_25 = require('./report/lecturers-report24_25');
const lectReport25_26 = require('./report/lecturers-report25_26');

const depReport22_23 = require('./report/departments-report22_23');
const depReport23_24 = require('./report/departments-report23_24');
const depReport24_25 = require('./report/departments-report24_25');
const depReport25_26 = require('./report/departments-report25_26');

module.exports = {
  getUpdateUserAllByF: (req, res) => { //new
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.facultyId;

          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            Faculty.findById((reqId), function (err, faculty) {
              if (err) throw err;
              User.find({
                fakultetas: faculty.username,
              
              }, function (err, users) {
                if (err) throw err;
                //const userUpdated = req.flash('user');
                res.render("admin-users-edit-all", {
                  // userUp: userUpdated,
                  faculty: faculty,
                  users: users
                });
              });
            });
          } else {
            res.redirect("/admin/profile");
          }
        } else {
          res.redirect("/login");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  getUpdateUserAllByF22_23: (req, res) => { //new by year
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.facultyId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            Faculty.findById((reqId), function (err, faculty) {
              if (err) throw err;
              User.find({
                fakultetas: faculty.username,
              }, function (err, users) {
                if (err) throw err;
                //const userUpdated = req.flash('user');
                res.render("admin-users-edit-all-2022-2023", {
                  // userUp: userUpdated,
                  faculty: faculty,
                  users: users
                });
              });
            });
          } else {
            res.redirect("/admin/profile");
          }
        } else {
          res.redirect("/login");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  getUpdateUserAllByF23_24: (req, res) => { //new by year
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.facultyId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            Faculty.findById((reqId), function (err, faculty) {
              if (err) throw err;
              User.find({
                fakultetas: faculty.username,
              }, function (err, users) {
                if (err) throw err;
                //const userUpdated = req.flash('user');
                res.render("admin-users-edit-all-2023-2024", {
                  // userUp: userUpdated,
                  faculty: faculty,
                  users: users
                });
              });
            });
          } else {
            res.redirect("/admin/profile");
          }
        } else {
          res.redirect("/login");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  getUpdateUserAllByF24_25: (req, res) => { //new by year
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.facultyId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            Faculty.findById((reqId), function (err, faculty) {
              if (err) throw err;
              User.find({
                fakultetas: faculty.username,
              }, function (err, users) {
                if (err) throw err;
                //const userUpdated = req.flash('user');
                res.render("admin-users-edit-all-2024-2025", {
                  // userUp: userUpdated,
                  faculty: faculty,
                  users: users
                });
              });
            });
          } else {
            res.redirect("/admin/profile");
          }
        } else {
          res.redirect("/login");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  getUpdateUserAllByF25_26: (req, res) => { //new by year
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.facultyId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            Faculty.findById((reqId), function (err, faculty) {
              if (err) throw err;
              User.find({
                fakultetas: faculty.username,
              }, function (err, users) {
                if (err) throw err;
                //const userUpdated = req.flash('user');
                res.render("admin-users-edit-all-2025-2026", {
                  // userUp: userUpdated,
                  faculty: faculty,
                  users: users
                });
              });
            });
          } else {
            res.redirect("/admin/profile");
          }
        } else {
          res.redirect("/login");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  postUpdateAllUsersInfo: (req, res) => {
    for (let i = 1; i <= parseInt(req.body.userTable_name); i++) {

      User.findById(eval("req.body.userId" + i), function (err, foundUser) {
        try {
          if (foundUser) {
              foundUser.teachingYear22_23 = eval("req.body.destymoMetai22_23" + i),
              foundUser.teachingYear23_24 = eval("req.body.destymoMetai23_24" + i),
              foundUser.teachingYear24_25 = eval("req.body.destymoMetai24_25" + i),
              foundUser.teachingYear25_26 = eval("req.body.destymoMetai25_26" + i),
              foundUser.headOfTheDepartment22_23 = eval("req.body.vedejoDarboMetai22_23" + i),
              foundUser.headOfTheDepartment23_24 = eval("req.body.vedejoDarboMetai23_24" + i),
              foundUser.headOfTheDepartment24_25 = eval("req.body.vedejoDarboMetai24_25" + i),
              foundUser.headOfTheDepartment25_26 = eval("req.body.vedejoDarboMetai25_26" + i),
              //foundUser.updated_for = req.user.username //username- prisijungusio userio id paimti iš DB reikia username
            foundUser.save(function (err) {
              if (err) throw err;
              //req.flash('user', "Successfully");
              //res.redirect("/admin/users");
            });
          } else {
            console.log("Does'f found");
            res.redirect("/admin/users");
          }
        } catch (err) {
          console.log(err);
        }
      });
    }
    res.redirect("/admin/faculties");
  },
  postUpdateAllUsersInfoByF22_23: (req, res) => {
    for (let i = 1; i <= parseInt(req.body.userTable_name); i++) {

      User.findById(eval("req.body.userId" + i), function (err, foundUser) {
        try {
          if (foundUser) {
              foundUser.teachingYear22_23 = eval("req.body.destymoMetai22_23" + i),
              foundUser.headOfTheDepartment22_23 = eval("req.body.vedejoDarboMetai22_23" + i),
              //foundUser.updated_for = req.user.username //username- prisijungusio userio id paimti iš DB reikia username
            foundUser.save(function (err) {
              if (err) throw err;
              //req.flash('user', "Successfully");
              //res.redirect("/admin/users");
            });
          } else {
            console.log("Does'f found");
            res.redirect("/admin/2022-2023/faculties");
          }
        } catch (err) {
          console.log(err);
        }
      });
    }
    res.redirect("/admin/2022-2023/faculties");
  },
  postUpdateAllUsersInfoByF23_24: (req, res) => {
    for (let i = 1; i <= parseInt(req.body.userTable_name); i++) {

      User.findById(eval("req.body.userId" + i), function (err, foundUser) {
        try {
          if (foundUser) {
              foundUser.teachingYear23_24 = eval("req.body.destymoMetai23_24" + i),
              foundUser.headOfTheDepartment23_24 = eval("req.body.vedejoDarboMetai23_24" + i),
              //foundUser.updated_for = req.user.username //username- prisijungusio userio id paimti iš DB reikia username
            foundUser.save(function (err) {
              if (err) throw err;
              //req.flash('user', "Successfully");
              //res.redirect("/admin/users");
            });
          } else {
            console.log("Does'f found");
            res.redirect("/admin/2023-2024/faculties");
          }
        } catch (err) {
          console.log(err);
        }
      });
    }
    res.redirect("/admin/2023-2024/faculties");
  },
  postUpdateAllUsersInfoByF24_25: (req, res) => {
    for (let i = 1; i <= parseInt(req.body.userTable_name); i++) {

      User.findById(eval("req.body.userId" + i), function (err, foundUser) {
        try {
          if (foundUser) {
              foundUser.teachingYear24_25 = eval("req.body.destymoMetai24_25" + i),
              foundUser.headOfTheDepartment24_25 = eval("req.body.vedejoDarboMetai24_25" + i),
              //foundUser.updated_for = req.user.username //username- prisijungusio userio id paimti iš DB reikia username
            foundUser.save(function (err) {
              if (err) throw err;
              //req.flash('user', "Successfully");
              //res.redirect("/admin/users");
            });
          } else {
            console.log("Does'f found");
            res.redirect("/admin/2024-2025/faculties");
          }
        } catch (err) {
          console.log(err);
        }
      });
    }
    res.redirect("/admin/2024-2025/faculties");
  },
  postUpdateAllUsersInfoByF25_26: (req, res) => {
    for (let i = 1; i <= parseInt(req.body.userTable_name); i++) {

      User.findById(eval("req.body.userId" + i), function (err, foundUser) {
        try {
          if (foundUser) {
              foundUser.teachingYear25_26 = eval("req.body.destymoMetai25_26" + i),
              foundUser.headOfTheDepartment25_26 = eval("req.body.vedejoDarboMetai25_26" + i),
              //foundUser.updated_for = req.user.username //username- prisijungusio userio id paimti iš DB reikia username
            foundUser.save(function (err) {
              if (err) throw err;
              //req.flash('user', "Successfully");
              //res.redirect("/admin/users");
            });
          } else {
            console.log("Does'f found");
            res.redirect("/admin/2025-2026/faculties");
          }
        } catch (err) {
          console.log(err);
        }
      });
    }
    res.redirect("/admin/2025-2026/faculties");
  },
  getProfile: (req, res) => {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const userN = req.flash('userL');
          const userUpdate = req.flash('userUp');
          res.render("admin-window", {
            userNamee: userN,
            userUpdateProfile: userUpdate,
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
  },
  postUpdateProfile: (req, res) => {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser) {
          foundUser.vardas = req.body.vardas,
            foundUser.pavarde = req.body.pavarde
          foundUser.updated_for = req.user.username //username- savo username paimti
          foundUser.save(function (err) {
            if (err) throw err;
            req.flash('userUp', req.body.vardas);
            res.redirect("/admin/profile");
          });
        } else {
          console.log("User doesn't found");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  getAllUsers: (req, res) => {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          var perPage = 5;
          var page = req.params.page || 1;
          User.find({})
            .skip((perPage * page) - perPage)
            .limit(perPage).exec(function (err, users) {
              if (err) throw err;
              User.countDocuments({}).exec((err, count) => {
                const userUpdate = req.flash('user');
                const userDelete = req.flash('userDeleted');
                res.render("admin-users-list", {
                  userUp: userUpdate,
                  userDel: userDelete,
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
  },
  getUpdateUserInfo: (req, res) => {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function (err, user) {
              if (err) throw err;
              res.render("admin-user-edit", {
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
  },
  postUpdateUserInfo: (req, res) => {
    User.findById(req.body.id, function (err, foundUser) {
      try {
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
          foundUser.save(function (err) {
            if (err) throw err;
            req.flash('user', "Successfully");
            res.redirect("/admin/users");
          });
        } else {
          console.log("Does'f found");
          res.redirect("/admin/users");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  postDeleteUser: (req, res) => {
    User.deleteOne({
      _id: req.body.deleteById
    },
      function (err) {
        if (!err) {
          req.flash('userDeleted', "Successfully");
          res.redirect("/admin/users");
        } else {
          res.send(err);
        }
      }
    );
  },
  getFaculties: (req, res) => {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          Faculty.find({}, function (err, faculties) {
            if (err) throw err;
            const success = req.flash('faculty');
            const successDeleted = req.flash('facultyDelete');
            res.render("admin-faculties-list", {
              facultyUpd: success,
              facultyDel: successDeleted,
              faculties: faculties
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
  },
  getFacultiesByYear22_23: (req, res) => {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          Faculty.find({}, function (err, faculties) {
            if (err) throw err;
            const success = req.flash('faculty');
            res.render("admin-faculties-list-2022-2023", {
              facultyUpd: success,
              faculties: faculties
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
  },
  getFacultiesByYear23_24: (req, res) => {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          Faculty.find({}, function (err, faculties) {
            if (err) throw err;
            const success = req.flash('faculty');
            res.render("admin-faculties-list-2023-2024", {
              facultyUpd: success,
              faculties: faculties
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
  },
  getFacultiesByYear24_25: (req, res) => {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          Faculty.find({}, function (err, faculties) {
            if (err) throw err;
            const success = req.flash('faculty');
            res.render("admin-faculties-list-2024-2025", {
              facultyUpd: success,
              faculties: faculties
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
  },
  getFacultiesByYear25_26: (req, res) => {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          Faculty.find({}, function (err, faculties) {
            if (err) throw err;
            const success = req.flash('faculty');
            res.render("admin-faculties-list-2025-2026", {
              facultyUpd: success,
              faculties: faculties
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
  },
  getCreateFaculty: (req, res) => {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          res.render("admin-faculties-create");
        } else {
          console.log("User role unknown");
          res.redirect("/login");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  postCreateFaculty: (req, res) => {
    const faculty = new Faculty({
      username: req.body.fakultetas,
      dekanas: req.body.dekanas,
      prodekanas: req.body.prodekanas
    });
    faculty.save(function (err) {
      if (err) throw err;
      req.flash("faculty", "Success");
      res.redirect("/admin/faculties");
    });
  },
  getUpdateFaculty: (req, res) => {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.facultyId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            Faculty.findById((reqId), function (err, faculty) {
              if (err) throw err;
              res.render("admin-faculties-edit", {
                faculty: faculty
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
  },
  postUpdateFaculty: (req, res) => {
    Faculty.findById(req.body.id, function (err, foundFaculty) {
      try {
        if (foundFaculty) {
          foundFaculty.dekanas = req.body.dekanas,
            foundFaculty.prodekanas = req.body.prodekanas
          foundFaculty.save(function (err) {
            if (err) throw err;
            req.flash("faculty", "Success");
            res.redirect("/admin/faculties");
          });
        } else {
          console.log("Faculty does'f found");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  postDeleteFaculty: (req, res) => {
    Faculty.deleteOne({
      _id: req.body.deleteById
    },
      function (err) {
        if (!err) {
          req.flash("facultyDelete", "Successfully");
          res.redirect("/admin/faculties");
        } else {
          res.send(err);
        }
      }
    );
  },
  getUsersByYear22_23: (req, res) => {
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
                const success = req.flash('user');
                res.render("admin-users-list-2022-2023", {
                  successMsg: success,
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
  },
  getUsersByYear23_24: (req, res) => {
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
                const success = req.flash('user');
                res.render("admin-users-list-2023-2024", {
                  successMsg: success,
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
  },
  getUsersByYear24_25: (req, res) => {
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
                const success = req.flash('user');
                res.render("admin-users-list-2024-2025", {
                  successMsg: success,
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
  },
  getUsersByYear25_26: (req, res) => {
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
                const success = req.flash('user');
                res.render("admin-users-list-2025-2026", {
                  successMsg: success,
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
  },
  getUpdateUserByYear22_23: (req, res) => {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function (err, user) {
              if (err) throw err;
              res.render("admin-user-edit-2022-2023", {
                user: user
              });
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
  },
  getUpdateUserByYear23_24: (req, res) => {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function (err, user) {
              if (err) throw err;
              res.render("admin-user-edit-2023-2024", {
                user: user
              });
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
  },
  getUpdateUserByYear24_25: (req, res) => {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function (err, user) {
              if (err) throw err;
              res.render("admin-user-edit-2024-2025", {
                user: user
              });
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
  },
  getUpdateUserByYear25_26: (req, res) => {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function (err, user) {
              if (err) throw err;
              res.render("admin-user-edit-2025-2026", {
                user: user
              });
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
  },
  postUpdateUserByYear22_23: (req, res) => {
    User.findById(req.body.id, function (err, foundUser) {
      try {
        if (foundUser) {
          foundUser.busena22_23 = req.body.busena,
            foundUser.busenaVedejo22_23 = req.body.busenaVedejo,
            foundUser.updated_for = req.user.username //username- prisijungusio userio id paimti iš DB reikia username
          foundUser.save(function (err) {
            if (err) throw err;
            req.flash("user", "Success");
            res.redirect("/admin/2022-2023/users");
          });
        } else {
          console.log("Does'f found");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  postUpdateUserByYear23_24: (req, res) => {
    User.findById(req.body.id, function (err, foundUser) {
      try {
        if (foundUser) {
          foundUser.busena23_24 = req.body.busena,
            foundUser.busenaVedejo23_24 = req.body.busenaVedejo,
            foundUser.updated_for = req.user.username
          foundUser.save(function (err) {
            if (err) throw err;
            req.flash("user", "Success");
            res.redirect("/admin/2023-2024/users");
          });
        } else {
          console.log("Does'f found");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  postUpdateUserByYear24_25: (req, res) => {
    User.findById(req.body.id, function (err, foundUser) {
      try {
        if (foundUser) {
          foundUser.busena24_25 = req.body.busena,
            foundUser.busenaVedejo24_25 = req.body.busenaVedejo,
            foundUser.updated_for = req.user.username
          foundUser.save(function (err) {
            if (err) throw err;
            req.flash("user", "Success");
            res.redirect("/admin/2024-2025/users");
          });
        } else {
          console.log("Does'f found");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  postUpdateUserByYear25_26: (req, res) => {
    User.findById(req.body.id, function (err, foundUser) {
      try {
        if (foundUser) {
          foundUser.busena25_26 = req.body.busena,
            foundUser.busenaVedejo25_26 = req.body.busenaVedejo,
            foundUser.updated_for = req.user.username
          foundUser.save(function (err) {
            if (err) throw err;
            req.flash("user", "Success");
            res.redirect("/admin/2025-2026/users");
          });
        } else {
          console.log("Does'f found");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  getUserReportsByYear22_23: (req, res) => {
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
  },
  getUserReportsByYear23_24: (req, res) => {
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
  },
  getUserReportsByYear24_25: (req, res) => {
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
  },
  getUserReportsByYear25_26: (req, res) => {
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
  },
  getLectReportByYear22_23: (req, res) => {
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
  },
  getLectReportByYear23_24: (req, res) => {
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
  },
  getLectReportByYear24_25: (req, res) => {
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
  },
  getLectReportByYear25_26: (req, res) => {
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
  },
  //administratorius atnaujina destytojo ataskaita
  postLectReportUpdateByYear22_23: (req, res) => {
    User.findById(req.body.id, function (err, foundUser) {
      try {
        if (foundUser) {
          lectReport22_23.clearLecReport(foundUser);
          lectReport22_23.updateLecReport(foundUser, req);
          lectReport22_23.headOfDepAddToLecReport(foundUser, req);
          foundUser.save(function (err) {
            if (err) throw err;
            req.flash("user", "Success");
            res.redirect("/admin/2022-2023/users");
          });
        } else {
          console.log("Does'f found");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  postLectReportUpdateByYear23_24: (req, res) => {
    User.findById(req.body.id, function (err, foundUser) {
      try {
        if (foundUser) {
          lectReport23_24.clearLecReport(foundUser);
          lectReport23_24.updateLecReport(foundUser, req);
          lectReport23_24.headOfDepAddToLecReport(foundUser, req);
          foundUser.save(function (err) {
            if (err) throw err;
            req.flash("user", "Success");
            res.redirect("/admin/2023-2024/users");
          });
        } else {
          console.log("Does'f found");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  postLectReportUpdateByYear24_25: (req, res) => {
    User.findById(req.body.id, function (err, foundUser) {
      try {
        if (foundUser) {
          lectReport24_25.clearLecReport(foundUser);
          lectReport24_25.updateLecReport(foundUser, req);
          lectReport24_25.headOfDepAddToLecReport(foundUser, req);
          foundUser.save(function (err) {
            if (err) throw err;
            req.flash("user", "Success");
            res.redirect("/admin/2024-2025/users");
          });
        } else {
          console.log("Does'f found");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  postLectReportUpdateByYear25_26: (req, res) => {
    User.findById(req.body.id, function (err, foundUser) {
      try {
        if (foundUser) {
          lectReport25_26.clearLecReport(foundUser);
          lectReport25_26.updateLecReport(foundUser, req);
          lectReport25_26.headOfDepAddToLecReport(foundUser, req);
          foundUser.save(function (err) {
            if (err) throw err;
            req.flash("user", "Success");
            res.redirect("/admin/2025-2026/users");
          });
        } else {
          console.log("Does'f found");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  getDepReportByYear22_23: (req, res) => {
    User.findById(req.user.id, function (err, foundUser) {
      try {
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
      } catch (err) {
        console.log(err);
      }
    });
  },
  getDepReportByYear23_24: (req, res) => {
    User.findById(req.user.id, function (err, foundUser) {
      try {
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
      } catch (err) {
        console.log(err);
      }
    });
  },
  getDepReportByYear24_25: (req, res) => {
    User.findById(req.user.id, function (err, foundUser) {
      try {
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
      } catch (err) {
        console.log(err);
      }
    });
  },
  getDepReportByYear25_26: (req, res) => {
    User.findById(req.user.id, function (err, foundUser) {
      try {
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
      } catch (err) {
        console.log(err);
      }
    });
  },
  //administratorius atnaujina vedejo ataskaita
  postDepReportUpdateByYear22_23: (req, res) => {
    User.findById(req.body.id, function (err, foundUser) {
      try {
        if (foundUser) {
          depReport22_23.clearDepReport(foundUser);
          depReport22_23.updateDepReport(foundUser, req);
          foundUser.save(function (err) {
            if (err) throw err;
            req.flash("user", "Success");
            res.redirect("admin/2022-2023/users");
          });
        } else {
          console.log("Does'f found");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  postDepReportUpdateByYear23_24: (req, res) => {
    User.findById(req.body.id, function (err, foundUser) {
      try {
        if (foundUser) {
          depReport23_24.clearDepReport(foundUser);
          depReport23_24.updateDepReport(foundUser, req);
          foundUser.save(function (err) {
            if (err) throw err;
            req.flash("user", "Success");
            res.redirect("admin/2023-2024/users");
          });
        } else {
          console.log("Does'f found");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  postDepReportUpdateByYear24_25: (req, res) => {
    User.findById(req.body.id, function (err, foundUser) {
      try {
        if (foundUser) {
          depReport24_25.clearDepReport(foundUser);
          depReport24_25.updateDepReport(foundUser, req);
          foundUser.save(function (err) {
            if (err) throw err;
            req.flash("user", "Success");
            res.redirect("admin/2024-2025/users");
          });
        } else {
          console.log("Does'f found");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  postDepReportUpdateByYear25_26: (req, res) => {
    User.findById(req.body.id, function (err, foundUser) {
      try {
        if (foundUser) {
          depReport25_26.clearDepReport(foundUser);
          depReport25_26.updateDepReport(foundUser, req);
          foundUser.save(function (err) {
            if (err) throw err;
            req.flash("user", "Success");
            res.redirect("admin/2025-2026/users");
          });
        } else {
          console.log("Does'f found");
        }
      } catch (err) {
        console.log(err);
      }
    });
  }

}