var express = require('express');
const User = require('../models/user');
const Faculty = require('../models/faculty');
const _ = require("lodash");

module.exports = {
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
                        res.redirect("/department/2025-2026/lecturers-list");
                    });
                } else {
                    console.log("Does'f found");
                }
            } catch (err) {
                console.log(err);
            }
        });
    },
    getEditLecReport22_23: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser.role === "katedros vedėjas") {
                    const reqId = req.params.userId;
                    if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
                        User.findById((reqId), function (err, user) {
                            let currentUserFaculty = foundUser.fakultetas;
                            if (err) throw err;
                            Faculty.findOne({
                                username: currentUserFaculty
                            }, function (err, foundFaculty) {
                                if (err) throw err;
                                res.render("dep-lecturer-report-2022-2023", {
                                    foundFaculty: foundFaculty,
                                    user: user,
                                    fakultetasUpper: _.toUpper(user.fakultetas),
                                    katedraUpper: _.toUpper(user.katedra),
                                    vardasUpper: _.toUpper(foundUser.vardas),
                                    pavardeUpper: _.toUpper(foundUser.pavarde)
                                });
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
    getEditLecReport23_24: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser.role === "katedros vedėjas") {
                    const reqId = req.params.userId;
                    if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
                        User.findById((reqId), function (err, user) {
                            let currentUserFaculty = foundUser.fakultetas;
                            if (err) throw err;
                            Faculty.findOne({
                                username: currentUserFaculty
                            }, function (err, foundFaculty) {
                                if (err) throw err;
                                res.render("dep-lecturer-report-2023-2024", {
                                    foundFaculty: foundFaculty,
                                    user: user,
                                    fakultetasUpper: _.toUpper(user.fakultetas),
                                    katedraUpper: _.toUpper(user.katedra),
                                    vardasUpper: _.toUpper(foundUser.vardas),
                                    pavardeUpper: _.toUpper(foundUser.pavarde)
                                });
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
    getEditLecReport24_25: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser.role === "katedros vedėjas") {
                    const reqId = req.params.userId;
                    if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
                        User.findById((reqId), function (err, user) {
                            let currentUserFaculty = foundUser.fakultetas;
                            if (err) throw err;
                            Faculty.findOne({
                                username: currentUserFaculty
                            }, function (err, foundFaculty) {
                                if (err) throw err;
                                res.render("dep-lecturer-report-2024-2025", {
                                    foundFaculty: foundFaculty,
                                    user: user,
                                    fakultetasUpper: _.toUpper(user.fakultetas),
                                    katedraUpper: _.toUpper(user.katedra),
                                    vardasUpper: _.toUpper(foundUser.vardas),
                                    pavardeUpper: _.toUpper(foundUser.pavarde)
                                });
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
    getEditLecReport25_26: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser.role === "katedros vedėjas") {
                    const reqId = req.params.userId;
                    if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
                        User.findById((reqId), function (err, user) {
                            let currentUserFaculty = foundUser.fakultetas;
                            if (err) throw err;
                            Faculty.findOne({
                                username: currentUserFaculty
                            }, function (err, foundFaculty) {
                                if (err) throw err;
                                res.render("dep-lecturer-report-2025-2026", {
                                    foundFaculty: foundFaculty,
                                    user: user,
                                    fakultetasUpper: _.toUpper(user.fakultetas),
                                    katedraUpper: _.toUpper(user.katedra),
                                    vardasUpper: _.toUpper(foundUser.vardas),
                                    pavardeUpper: _.toUpper(foundUser.pavarde)
                                });
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
    }

}