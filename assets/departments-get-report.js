var express = require('express');
const User = require('../models/user');
const Faculty = require('../models/faculty');
const _ = require("lodash");

module.exports = {
  getCreate22_23: function(req, res) {
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
  getCreate23_24: function(req, res) {
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
  getCreate24_25: function(req, res) {
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
  getCreate25_26: function(req, res) {
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
  getEdit22_23: function(req, res) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) throw err;
      res.render("dep-edit-2022-2023", {
        user: foundUser
      });
    });
  },
  getEdit23_24: function(req, res) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) throw err;
      res.render("dep-edit-2023-2024", {
        user: foundUser
      });
    });
  },
  getEdit24_25: function(req, res) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) throw err;
      res.render("dep-edit-2024-2025", {
        user: foundUser
      });
    });
  },
  getEdit25_26: function(req, res) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) throw err;
      res.render("dep-edit-2025-2026", {
        user: foundUser
      });
    });
  },
  getSubmit22_23: function(req, res) {
    User.findById(req.user.id, function(err, foundUser) {
      let currentUserFaculty = foundUser.fakultetas;
      try {
        Faculty.findOne({
          username: currentUserFaculty
        }, function(err, foundFaculty) {
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
  getSubmit23_24: function(req, res) {
    User.findById(req.user.id, function(err, foundUser) {
      let currentUserFaculty = foundUser.fakultetas;
      try {
        Faculty.findOne({
          username: currentUserFaculty
        }, function(err, foundFaculty) {
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
  getSubmit24_25: function(req, res) {
    User.findById(req.user.id, function(err, foundUser) {
      let currentUserFaculty = foundUser.fakultetas;
      try {
        Faculty.findOne({
          username: currentUserFaculty
        }, function(err, foundFaculty) {
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
  getSubmit25_26: function(req, res) {
    User.findById(req.user.id, function(err, foundUser) {
      let currentUserFaculty = foundUser.fakultetas;
      try {
        Faculty.findOne({
          username: currentUserFaculty
        }, function(err, foundFaculty) {
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
  }

}
