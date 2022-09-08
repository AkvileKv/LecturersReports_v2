var express = require('express');
const User = require('../models/user');

module.exports = {
  getCreateLecReport22_23: function(req, res) {
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "dėstytojas" && foundUser.teachingYear22_23 == true) {
          res.render("create-2022-2023", {
            user: foundUser
          });
        } else {
          res.render("user-window-2022-2023", {
            user: foundUser
          });
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  getCreateLecReport23_24: function(req, res) {
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "dėstytojas" && foundUser.teachingYear23_24 == true) {
          res.render("create-2023-2024", {
            user: foundUser
          });
        } else {
          res.render("user-window-2023-2024", {
            user: foundUser
          });
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  getCreateLecReport24_25: function(req, res) {
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "dėstytojas" && foundUser.teachingYear24_25 == true) {
          res.render("create-2024-2025", {
            user: foundUser
          });
        } else {
          res.render("user-window-2024-2025", {
            user: foundUser
          });
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  getCreateLecReport25_26: function(req, res) {
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "dėstytojas" && foundUser.teachingYear25_26 == true) {
          res.render("create-2025-2026", {
            user: foundUser
          });
        } else {
          res.render("user-window-2025-2026", {
            user: foundUser
          });
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  getUpdateLecReport22_23: function(req, res) {
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "dėstytojas" && foundUser.teachingYear22_23 == true) {
          res.render("edit-2022-2023", {
            user: foundUser
          });
        } else {
          res.redirect("/login");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  getUpdateLecReport23_24: function(req, res) {
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "dėstytojas" && foundUser.teachingYear23_24 == true) {
          res.render("edit-2023-2024", {
            user: foundUser
          });
        } else {
          res.redirect("/login");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  getUpdateLecReport24_25: function(req, res) {
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "dėstytojas" && foundUser.teachingYear24_25 == true) {
          res.render("edit-2024-2025", {
            user: foundUser
          });
        } else {
          res.redirect("/login");
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  getUpdateLecReport25_26: function(req, res) {
    User.findById(req.user.id, function(err, foundUser) {
      try {
        if (foundUser.role === "dėstytojas" && foundUser.teachingYear25_26 == true) {
          res.render("edit-2025-2026", {
            user: foundUser
          });
        } else {
          res.redirect("/login");
        }
      } catch (err) {
        console.log(err);
      }
    });
  }

}
