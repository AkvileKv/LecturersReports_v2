var express = require('express');
const User = require('../models/user');
const Faculty = require('../models/faculty');
const _ = require("lodash");

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
                                const userUpdated = req.flash('user');
                                res.render("dep-lecturers-list-2022-2023", {
                                    userUpd: userUpdated,
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
                                const userUpdated = req.flash('user');
                                res.render("dep-lecturers-list-2023-2024", {
                                    userUpd: userUpdated,
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
                                const userUpdated = req.flash('user');
                                res.render("dep-lecturers-list-2024-2025", {
                                    userUpd: userUpdated,
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
                                const userUpdated = req.flash('user');
                                res.render("dep-lecturers-list-2025-2026", {
                                    userUpd: userUpdated,
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
    getEditLec22_23: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser.role === "katedros vedėjas") {
                    const reqId = req.params.userId;
                    if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
                        User.findById((reqId), function (err, user) {
                            if (err) throw err;
                            res.render("dep-edit-user-2022-2023", {
                                user: user
                            });
                        });
                    } else {
                        res.redirect("/user-window");
                    }
                } else {
                    res.redirect("/home");
                }
            } catch (err) {
                console.log(err);
            }

        });
    },
    getEditLec23_24: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser.role === "katedros vedėjas") {
                    const reqId = req.params.userId;
                    if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
                        User.findById((reqId), function (err, user) {
                            if (err) throw err;
                            res.render("dep-edit-user-2023-2024", {
                                user: user
                            });
                        });
                    } else {
                        res.redirect("/user-window");
                    }
                } else {
                    res.redirect("/home");
                }
            } catch (err) {
                console.log(err);
            }

        });
    },
    getEditLec24_25: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser.role === "katedros vedėjas") {
                    const reqId = req.params.userId;
                    if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
                        User.findById((reqId), function (err, user) {
                            if (err) throw err;
                            res.render("dep-edit-user-2024-2025", {
                                user: user
                            });
                        });
                    } else {
                        res.redirect("/user-window");
                    }
                } else {
                    res.redirect("/home");
                }
            } catch (err) {
                console.log(err);
            }
        });
    },
    getEditLec25_26: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser.role === "katedros vedėjas") {
                    const reqId = req.params.userId;
                    if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
                        User.findById((reqId), function (err, user) {
                            if (err) throw err;
                            res.render("dep-edit-user-2025-2026", {
                                user: user
                            });
                        });
                    } else {
                        res.redirect("/user-window");
                    }
                } else {
                    res.redirect("/home");
                }
            } catch (err) {
                console.log(err);
            }

        });
    },
    postEditLec22_23: function (req, res) {
        User.findById(req.body.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    foundUser.busena22_23 = req.body.busena,
                        foundUser.updated_for = req.user.username
                    foundUser.save(function (err) {
                        if (err) throw err;
                        req.flash('user', 'Success');
                        res.redirect("/department/2022-2023/lecturers-list");
                    });
                } else {
                    console.log("Does'f found");
                }
            } catch (err) {
                console.log(err);
            }
        });
    },
    postEditLec23_24: function (req, res) {
        User.findById(req.body.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    foundUser.busena23_24 = req.body.busena,
                        foundUser.updated_for = req.user.username
                    foundUser.save(function (err) {
                        if (err) throw err;
                        req.flash('user', 'Success');
                        res.redirect("/department/2023-2024/lecturers-list");
                    });
                } else {
                    console.log("Does'f found");
                }
            } catch (err) {
                console.log(err);
            }
        });
    },
    postEditLec24_25: function (req, res) {
        User.findById(req.body.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    foundUser.busena24_25 = req.body.busena,
                        foundUser.updated_for = req.user.username
                    foundUser.save(function (err) {
                        if (err) throw err;
                        req.flash('user', 'Success');
                        res.redirect("/department/2024-2025/lecturers-list");
                    });
                } else {
                    console.log("Does'f found");
                }
            } catch (err) {
                console.log(err);
            }
        });
    },
    postEditLec25_26: function (req, res) {
        User.findById(req.body.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    foundUser.busena25_26 = req.body.busena,
                        foundUser.updated_for = req.user.username
                    foundUser.save(function (err) {
                        if (err) throw err;
                        req.flash('user', 'Success');
                        res.redirect("/department/2025-2026/lecturers-list");
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