const User = require('../models/user');

module.exports = {
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
    },
    getLogout: (req, res) => {
        User.findById(req.user.id, function (err, foundUser) {
            if (err) {
              console.log(err);
              res.redirect('/login');
            } else {
              var a = req.user.username;
              foundUser.updated_for = "Atsijungimas" + " " + a;
              foundUser.save(function (err) {
                if (err) throw err; 
              });
            }
            req.logout();
          });
          console.log("Logout ivykdytas");
          res.redirect('/');
    },
    postRegister: (req, res) => { 
        
    }



}