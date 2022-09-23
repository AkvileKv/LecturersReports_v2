const User = require('../models/user');
const Faculty = require('../models/faculty');

module.exports = {
    getProfile: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
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
    },
    postUpdateProfile: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    foundUser.vardas = req.body.vardas,
                        foundUser.pavarde = req.body.pavarde
                    foundUser.updated_for = req.user.username //username- savo username paimti
                    foundUser.save(function (err) {
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
    },
    getAllUsers: function (req, res) {
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
    },
    getUpdateUserInfo: function (req, res) {
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
    postUpdateUserInfo: function (req, res) {
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
    postDeleteUser: function (req, res) {
        User.deleteOne({
            _id: req.body.deleteById
        },
            function (err) {
                if (!err) {
                    res.redirect("/admin/users");
                } else {
                    res.send(err);
                }
            }
        );
    },
    getFaculties: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser.role === "administratorius") {
                    Faculty.find({}, function (err, faculties) {
                        if (err) throw err;
                        res.render("admin-faculties-list", {
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
    getCreateFaculty: function (req, res) {
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
    postCreateFaculty: function (req, res) {
        const faculty = new Faculty({
            username: req.body.fakultetas,
            dekanas: req.body.dekanas,
            prodekanas: req.body.prodekanas
        });
        faculty.save(function (err) {
            if (err) throw err;
            console.log("Succesfully created");
            res.redirect("/admin/faculties");
        });
    },
    getUpdateFaculty: function (req, res) {
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
    postUpdateFaculty: function (req, res) {
        Faculty.findById(req.body.id, function (err, foundFaculty) {
            try {
                if (foundFaculty) {
                    foundFaculty.username = req.body.fakultetas,
                        foundFaculty.dekanas = req.body.dekanas,
                        foundFaculty.prodekanas = req.body.prodekanas
                    foundFaculty.save(function (err) {
                        if (err) throw err;
                        console.log("Succesfully updated");
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
    postDeleteFaculty: function (req, res) {
        Faculty.deleteOne({
            _id: req.body.deleteById
          },
            function (err) {
              if (!err) {
                res.redirect("/admin/faculties");
              } else {
                res.send(err);
              }
            }
          );
    }

}