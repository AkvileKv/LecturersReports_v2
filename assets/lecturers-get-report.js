var express = require('express');
const User = require('../models/user');
const Faculty = require('../models/faculty');
const _ = require("lodash");

module.exports = {
  getCreate22_23: function(req, res) {
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
  getCreate23_24: function(req, res) {
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
  getCreate24_25: function(req, res) {
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
  getCreate25_26: function(req, res) {
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
  getUpdate22_23: function(req, res) {
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
  getUpdate23_24: function(req, res) {
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
  getUpdate24_25: function(req, res) {
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
  getUpdate25_26: function(req, res) {
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
  },
  getSubmit22_23: function(req, res) {
    User.findById(req.user.id, function(err, foundUser) {
      let currentUserFaculty = foundUser.fakultetas;
      try {
        Faculty.findOne({
          username: currentUserFaculty
        }, function(err, foundFaculty) {
          if (err) throw err;
          res.render("submit-2022-2023", {
            foundFaculty: foundFaculty,
            user: foundUser,
            fakultetasUpper: _.toUpper(foundUser.fakultetas),
            katedraUpper: _.toUpper(foundUser.katedra),
            vardasUpper: _.toUpper(foundUser.vardas),
            pavardeUpper: _.toUpper(foundUser.pavarde)
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
          res.render("submit-2023-2024", {
            foundFaculty: foundFaculty,
            user: foundUser,
            fakultetasUpper: _.toUpper(foundUser.fakultetas),
            katedraUpper: _.toUpper(foundUser.katedra),
            vardasUpper: _.toUpper(foundUser.vardas),
            pavardeUpper: _.toUpper(foundUser.pavarde)
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
          res.render("submit-2024-2025", {
            foundFaculty: foundFaculty,
            user: foundUser,
            fakultetasUpper: _.toUpper(foundUser.fakultetas),
            katedraUpper: _.toUpper(foundUser.katedra),
            vardasUpper: _.toUpper(foundUser.vardas),
            pavardeUpper: _.toUpper(foundUser.pavarde)
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
          res.render("submit-2025-2026", {
            foundFaculty: foundFaculty,
            user: foundUser,
            fakultetasUpper: _.toUpper(foundUser.fakultetas),
            katedraUpper: _.toUpper(foundUser.katedra),
            vardasUpper: _.toUpper(foundUser.vardas),
            pavardeUpper: _.toUpper(foundUser.pavarde)
          });
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

}
