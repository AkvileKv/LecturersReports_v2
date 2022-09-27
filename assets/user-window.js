const User = require('../models/user');

module.exports = {
    //For lecturers and departments
    getSelection: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
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
    },
    postChangeRole: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    foundUser.role = req.body.role,
                        foundUser.updated_for = req.user.username

                    foundUser.save(function (err) {
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
    },
    getByYear22_23: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser.role === "dėstytojas" || foundUser.role === "katedros vedėjas") {
                    res.render("user-window-2022-2023", {
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
    },
    getByYear23_24: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser.role === "dėstytojas" || foundUser.role === "katedros vedėjas") {
                    res.render("user-window-2023-2024", {
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
    },
    getByYear24_25: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser.role === "dėstytojas" || foundUser.role === "katedros vedėjas") {
                    res.render("user-window-2024-2025", {
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
    },
    getByYear25_26: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser.role === "dėstytojas" || foundUser.role === "katedros vedėjas") {
                    res.render("user-window-2025-2026", {
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
    },
    getUserWindow: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser.role === "dėstytojas" || foundUser.role === "katedros vedėjas") {
                    res.render("user-window", {
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
    },
    postUpdateUser: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    foundUser.vardas = req.body.vardas,
                        foundUser.pavarde = req.body.pavarde,
                        foundUser.updated_for = req.user.username
                    foundUser.save(function (err) {
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
            } catch (err) {
                console.log(err);
            }
        });
    }, // For departments:
    postUpdateUserDep22_23: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    foundUser.mm2022_2023.katedrosVedejas.katedrosDestytojuSk = req.body.katedrosDestytojuSkaicius,
                        foundUser.updated_for = req.user.username
                    foundUser.save(function (err) {
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
            } catch (err) {
                console.log(err);
            }
        });
    },
    postUpdateUserDep23_24: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    foundUser.mm2023_2024.katedrosVedejas.katedrosDestytojuSk = req.body.katedrosDestytojuSkaicius,
                        foundUser.updated_for = req.user.username
                    foundUser.save(function (err) {
                        if (err) throw err;
                        if (foundUser.role === "katedros vedėjas") {
                            res.redirect("/2023-2024/user-window");
                        } else {
                            res.redirect("/login");
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
    postUpdateUserDep24_25: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    foundUser.mm2024_2025.katedrosVedejas.katedrosDestytojuSk = req.body.katedrosDestytojuSkaicius,
                        foundUser.updated_for = req.user.username
                    foundUser.save(function (err) {
                        if (err) throw err;
                        if (foundUser.role === "katedros vedėjas") {
                            res.redirect("/2024-2025/user-window");
                        } else {
                            res.redirect("/login");
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
    postUpdateUserDep25_26: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    foundUser.mm2025_2026.katedrosVedejas.katedrosDestytojuSk = req.body.katedrosDestytojuSkaicius,
                        foundUser.updated_for = req.user.username
                    foundUser.save(function (err) {
                        if (err) throw err;
                        if (foundUser.role === "katedros vedėjas") {
                            res.redirect("/2025-2026/user-window");
                        } else {
                            res.redirect("/login");
                        }
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