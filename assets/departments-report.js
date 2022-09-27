var express = require('express');
const User = require('../models/user');
const Faculty = require('../models/faculty');
const _ = require("lodash");

const dateTime = require('./full-date-time');
const depReport22_23 = require('./report/departments-report22_23');
const depReport23_24 = require('./report/departments-report23_24');
const depReport24_25 = require('./report/departments-report24_25');
const depReport25_26 = require('./report/departments-report25_26');

module.exports = {
  getCreate22_23: function (req, res) {
    User.findById(req.user.id, function (err, logedInUser) {
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
        }, function (err, users) {
          if (err) throw err;
          res.render("dep-create-2022-2023", {
            users: users, //destytojai
            logedInUser: logedInUser //prisijunges katedros vedejas
          });
        });
      } else {
        res.render("user-window-2022-2023", {
          user: logedInUser
        });
      }
    });
  },
  getCreate23_24: function (req, res) {
    User.findById(req.user.id, function (err, logedInUser) {
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
        }, function (err, users) {
          if (err) throw err;
          res.render("dep-create-2023-2024", {
            users: users,
            logedInUser: logedInUser
          });
        });
      } else {
        res.render("user-window-2023-2024", {
          user: logedInUser
        });
      }
    });
  },
  getCreate24_25: function (req, res) {
    User.findById(req.user.id, function (err, logedInUser) {
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
        }, function (err, users) {
          if (err) throw err;
          res.render("dep-create-2024-2025", {
            users: users,
            logedInUser: logedInUser
          });
        });
      } else {
        res.render("user-window-2024-2025", {
          user: logedInUser
        });
      }
    });
  },
  getCreate25_26: function (req, res) {
    User.findById(req.user.id, function (err, logedInUser) {
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
        }, function (err, users) {
          if (err) throw err;
          res.render("dep-create-2025-2026", {
            users: users,
            logedInUser: logedInUser
          });
        });
      } else {
        res.render("user-window-2023-2024", {
          user: logedInUser
        });
      }
    });
  },
  getEdit22_23: function (req, res) {
    User.findById(req.user.id, function (err, foundUser) {
      if (err) throw err;
      res.render("dep-edit-2022-2023", {
        user: foundUser
      });
    });
  },
  getEdit23_24: function (req, res) {
    User.findById(req.user.id, function (err, foundUser) {
      if (err) throw err;
      res.render("dep-edit-2023-2024", {
        user: foundUser
      });
    });
  },
  getEdit24_25: function (req, res) {
    User.findById(req.user.id, function (err, foundUser) {
      if (err) throw err;
      res.render("dep-edit-2024-2025", {
        user: foundUser
      });
    });
  },
  getEdit25_26: function (req, res) {
    User.findById(req.user.id, function (err, foundUser) {
      if (err) throw err;
      res.render("dep-edit-2025-2026", {
        user: foundUser
      });
    });
  },
  getSubmit22_23: function (req, res) {
    User.findById(req.user.id, function (err, foundUser) {
      let currentUserFaculty = foundUser.fakultetas;
      try {
        Faculty.findOne({
          username: currentUserFaculty
        }, function (err, foundFaculty) {
          if (err) throw err;
          res.render("dep-submit-2022-2023", {
            foundFaculty: foundFaculty,
            user: foundUser,
            fakultetasUpper: _.toUpper(foundUser.fakultetas),
            katedraUpper: _.toUpper(foundUser.katedra)
          });
        });
      } catch (err) {
        console.log(err);
      }
    });
  },
  getSubmit23_24: function (req, res) {
    User.findById(req.user.id, function (err, foundUser) {
      let currentUserFaculty = foundUser.fakultetas;
      try {
        Faculty.findOne({
          username: currentUserFaculty
        }, function (err, foundFaculty) {
          if (err) throw err;
          res.render("dep-submit-2023-2024", {
            foundFaculty: foundFaculty,
            user: foundUser,
            fakultetasUpper: _.toUpper(foundUser.fakultetas),
            katedraUpper: _.toUpper(foundUser.katedra)
          });
        });
      } catch (err) {
        console.log(err);
      }
    });
  },
  getSubmit24_25: function (req, res) {
    User.findById(req.user.id, function (err, foundUser) {
      let currentUserFaculty = foundUser.fakultetas;
      try {
        Faculty.findOne({
          username: currentUserFaculty
        }, function (err, foundFaculty) {
          if (err) throw err;
          res.render("dep-submit-2024-2025", {
            foundFaculty: foundFaculty,
            user: foundUser,
            fakultetasUpper: _.toUpper(foundUser.fakultetas),
            katedraUpper: _.toUpper(foundUser.katedra)
          });
        });
      } catch (err) {
        console.log(err);
      }
    });
  },
  getSubmit25_26: function (req, res) {
    User.findById(req.user.id, function (err, foundUser) {
      let currentUserFaculty = foundUser.fakultetas;
      try {
        Faculty.findOne({
          username: currentUserFaculty
        }, function (err, foundFaculty) {
          if (err) throw err;
          res.render("dep-submit-2025-2026", {
            foundFaculty: foundFaculty,
            user: foundUser,
            fakultetasUpper: _.toUpper(foundUser.fakultetas),
            katedraUpper: _.toUpper(foundUser.katedra)
          });
        });
      } catch (err) {
        console.log(err);
      }
    });
  }, //vedejas dirba su savo ataskaita 
  postCreate22_23: function (req, res) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser) {
          depReport22_23.updateDepReport(foundUser, req);
          foundUser.mm2022_2023.katedrosVedejas.ivykiuDatos.sukurimas = dateTime.getFullDateTime();
          foundUser.save(function (err) {
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
  },
  postCreate23_24: function (req, res) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser) {
          depReport23_24.updateDepReport(foundUser, req);
          foundUser.mm2023_2024.katedrosVedejas.ivykiuDatos.sukurimas = dateTime.getFullDateTime();
          foundUser.save(function (err) {
            if (!err) {
              console.log("Succesfully created 2023-2024");
              res.redirect("/2023-2024/user-window");
            }
          });
        } else {
          console.log("User does'f found");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  postCreate24_25: function (req, res) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser) {
          depReport24_25.updateDepReport(foundUser, req);
          foundUser.mm2024_2025.katedrosVedejas.ivykiuDatos.sukurimas = dateTime.getFullDateTime();
          foundUser.save(function (err) {
            if (!err) {
              console.log("Succesfully created 2024-2025");
              res.redirect("/2024-2025/user-window");
            }
          });
        } else {
          console.log("User does'f found");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  postCreate25_26: function (req, res) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser) {
          depReport25_26.updateDepReport(foundUser, req);
          foundUser.mm2025_2026.katedrosVedejas.ivykiuDatos.sukurimas = dateTime.getFullDateTime();
          foundUser.save(function (err) {
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
  },
  postUpdate22_23: function (req, res) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser) {
          depReport22_23.clearDepReport(foundUser);
          depReport22_23.updateDepReport(foundUser, req);
          foundUser.mm2022_2023.katedrosVedejas.ivykiuDatos.atnaujinimas = dateTime.getFullDateTime();
          foundUser.save(function (err) {
            if (err) throw err;
            console.log("Succesfully updated 2022-2023");
            res.redirect("/2022-2023/user-window");
          });
        } else {
          console.log("User does'f found");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  postUpdate23_24: function (req, res) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser) {
          depReport23_24.clearDepReport(foundUser);
          depReport23_24.updateDepReport(foundUser, req);
          foundUser.mm2023_2024.katedrosVedejas.ivykiuDatos.atnaujinimas = dateTime.getFullDateTime();
          foundUser.save(function (err) {
            if (!err) {
              console.log("Succesfully updated 2023-2024");
              res.redirect("/2023-2024/user-window");
            }
          });
        } else {
          console.log("User does'f found");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  postUpdate24_25: function (req, res) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser) {
          depReport24_25.clearDepReport(foundUser);
          depReport24_25.updateDepReport(foundUser, req);
          foundUser.mm2024_2025.katedrosVedejas.ivykiuDatos.atnaujinimas = dateTime.getFullDateTime();
          foundUser.save(function (err) {
            if (err) throw err;
            console.log("Succesfully updated 2024-2025");
            res.redirect("/2024-2025/user-window");
          });
        } else {
          console.log("User does'f found");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  postUpdate25_26: function (req, res) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser) {
          depReport25_26.clearDepReport(foundUser);
          depReport25_26.updateDepReport(foundUser, req);
          foundUser.mm2025_2026.katedrosVedejas.ivykiuDatos.atnaujinimas = dateTime.getFullDateTime();
          foundUser.save(function (err) {
            if (err) throw err;
            console.log("Succesfully updated 2025-2026");
            res.redirect("/2025-2026/user-window");
          });
        } else {
          console.log("User does'f found");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  postSubmit22_23: function (req, res) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser) {
          depReport22_23.clearDepReport(foundUser);
          depReport22_23.checkAndUpdateDepReport(foundUser, req);
          foundUser.mm2022_2023.katedrosVedejas.ataskaitosPateikimoData = req.body.ataskaitosPateikimoData,
            foundUser.mm2022_2023.katedrosVedejas.ivykiuDatos.pateikimas = dateTime.getFullDateTime();
          foundUser.save(function (err) {
            if (err) throw err;
            console.log("Succesfully submitted");
            res.redirect("/user-window-2022-2023");
          });
        } else {
          console.log("User does'f found");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  postSubmit23_24: function (req, res) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser) {
          depReport23_24.clearDepReport(foundUser);
          depReport23_24.checkAndUpdateDepReport(foundUser, req);
          foundUser.mm2023_2024.katedrosVedejas.ataskaitosPateikimoData = req.body.ataskaitosPateikimoData,
            foundUser.mm2023_2024.katedrosVedejas.ivykiuDatos.pateikimas = dateTime.getFullDateTime();
          foundUser.save(function (err) {
            if (err) throw err;
            console.log("Succesfully submitted");
            res.redirect("/user-window-2023-2024");
          });
        } else {
          console.log("User does'f found");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  postSubmit24_25: function (req, res) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser) {
          depReport24_25.clearDepReport(foundUser);
          depReport24_25.checkAndUpdateDepReport(foundUser, req);
          foundUser.mm2024_2025.katedrosVedejas.ataskaitosPateikimoData = req.body.ataskaitosPateikimoData,
            foundUser.mm2024_2025.katedrosVedejas.ivykiuDatos.pateikimas = dateTime.getFullDateTime();
          foundUser.save(function (err) {
            if (err) throw err;
            console.log("Succesfully submitted");
            res.redirect("/user-window-2024-2025");
          });
        } else {
          console.log("User does'f found");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  postSubmit25_26: function (req, res) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser) {
          depReport25_26.clearDepReport(foundUser);
          depReport25_26.checkAndUpdateDepReport(foundUser, req);
          foundUser.mm2025_2026.katedrosVedejas.ataskaitosPateikimoData = req.body.ataskaitosPateikimoData,
            foundUser.mm2025_2026.katedrosVedejas.ivykiuDatos.pateikimas = dateTime.getFullDateTime();
          foundUser.save(function (err) {
            if (err) throw err;
            console.log("Succesfully submitted");
            res.redirect("/user-window-2025-2026");
          });
        } else {
          console.log("User does'f found");
        }
      } catch (err) {
        console.log(err);
      }
    });
  }

}
