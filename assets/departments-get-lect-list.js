var express = require('express');
const User = require('../models/user');

module.exports = {
  getLecturersList22_23: function (req, res) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "katedros vedėjas") {
          let vedejoKatedra;
          if (req.user.katedra === "") {
            vedejoKatedra = "nepriskirta";
          } else {
            vedejoKatedra = req.user.katedra
          }
          if (err) throw err;
          var perPage = 5;
          var page = req.params.page || 1;
          User.find({
            katedra: vedejoKatedra,
            teachingYear22_23: true
          })
            .skip((perPage * page) - perPage)
            .limit(perPage).exec(function (err, users) {
              if (err) throw err;
              User.countDocuments({
                teachingYear22_23: true,
                katedra: vedejoKatedra
              }).exec((err, count) => {
                res.render("dep-lecturers-list-2022-2023", {
                  users: users,
                  depUser: foundUser,
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
  getLecturersList23_24: function (req, res) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "katedros vedėjas") {
          let vedejoKatedra;
          if (req.user.katedra === "") {
            vedejoKatedra = "nepriskirta";
          } else {
            vedejoKatedra = req.user.katedra
          }
          if (err) throw err;
          var perPage = 5;
          var page = req.params.page || 1;
          User.find({
            katedra: vedejoKatedra,
            teachingYear23_24: true
          })
            .skip((perPage * page) - perPage)
            .limit(perPage).exec(function (err, users) {
              if (err) throw err;
              User.countDocuments({
                teachingYear23_24: true,
                katedra: vedejoKatedra
              }).exec((err, count) => {
                res.render("dep-lecturers-list-2023-2024", {
                  users: users,
                  depUser: foundUser,
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
  getLecturersList24_25: function (req, res) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "katedros vedėjas") {
          let vedejoKatedra;
          if (req.user.katedra === "") {
            vedejoKatedra = "nepriskirta";
          } else {
            vedejoKatedra = req.user.katedra
          }
          if (err) throw err;
          var perPage = 5;
          var page = req.params.page || 1;
          User.find({
            katedra: vedejoKatedra,
            teachingYear24_25: true
          })
            .skip((perPage * page) - perPage)
            .limit(perPage).exec(function (err, users) {
              if (err) throw err;
              User.countDocuments({
                teachingYear24_25: true,
                katedra: vedejoKatedra
              }).exec((err, count) => {
                res.render("dep-lecturers-list-2024-2025", {
                  users: users,
                  depUser: foundUser,
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
  getLecturersList25_26: function (req, res) {
    User.findById(req.user.id, function (err, foundUser) {
      try {
        if (foundUser.role === "katedros vedėjas") {
          let vedejoKatedra;
          if (req.user.katedra === "") {
            vedejoKatedra = "nepriskirta";
          } else {
            vedejoKatedra = req.user.katedra
          }
          if (err) throw err;
          var perPage = 5;
          var page = req.params.page || 1;
          User.find({
            katedra: vedejoKatedra,
            teachingYear25_26: true
          })
            .skip((perPage * page) - perPage)
            .limit(perPage).exec(function (err, users) {
              if (err) throw err;
              User.countDocuments({
                teachingYear25_26: true,
                katedra: vedejoKatedra
              }).exec((err, count) => {
                res.render("dep-lecturers-list-2025-2026", {
                  users: users,
                  depUser: foundUser,
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
  }
}