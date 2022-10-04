var express = require('express');
const User = require('../models/user');
const Faculty = require('../models/faculty');
const _ = require("lodash");

const dateTime = require('./full-date-time');
const lectReport22_23 = require('./report/lecturers-report22_23');
const lectReport23_24 = require('./report/lecturers-report23_24');
const lectReport24_25 = require('./report/lecturers-report24_25');
const lectReport25_26 = require('./report/lecturers-report25_26');

module.exports = {
    getCreate22_23: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
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
    getCreate23_24: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
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
    getCreate24_25: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
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
    getCreate25_26: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
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
    getUpdate22_23: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser.role === "dėstytojas" && foundUser.teachingYear22_23 == true) {
                    const repUpdated = req.flash('report');
                    res.render("edit-2022-2023", {
                        reportUpd: repUpdated,
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
    getUpdate23_24: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser.role === "dėstytojas" && foundUser.teachingYear23_24 == true) {
                    const repUpdated = req.flash('report');
                    res.render("edit-2023-2024", {
                        reportUpd: repUpdated,
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
    getUpdate24_25: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser.role === "dėstytojas" && foundUser.teachingYear24_25 == true) {
                    const repUpdated = req.flash('report');
                    res.render("edit-2024-2025", {
                        reportUpd: repUpdated,
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
    getUpdate25_26: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser.role === "dėstytojas" && foundUser.teachingYear25_26 == true) {
                    const repUpdated = req.flash('report');
                    res.render("edit-2025-2026", {
                        reportUpd: repUpdated,
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
    getSubmit22_23: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            let currentUserFaculty = foundUser.fakultetas;
            try {
                Faculty.findOne({
                    username: currentUserFaculty
                }, function (err, foundFaculty) {
                    if (err) throw err;
                    const repSubmited = req.flash('report');
                    res.render("submit-2022-2023", {
                        reportSubm: repSubmited,
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
    getSubmit23_24: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            let currentUserFaculty = foundUser.fakultetas;
            try {
                Faculty.findOne({
                    username: currentUserFaculty
                }, function (err, foundFaculty) {
                    if (err) throw err;
                    const repSubmited = req.flash('report');
                    res.render("submit-2023-2024", {
                        reportSubm: repSubmited,
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
    getSubmit24_25: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            let currentUserFaculty = foundUser.fakultetas;
            try {
                Faculty.findOne({
                    username: currentUserFaculty
                }, function (err, foundFaculty) {
                    if (err) throw err;
                    const repSubmited = req.flash('report');
                    res.render("submit-2024-2025", {
                        reportSubm: repSubmited,
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
    getSubmit25_26: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            let currentUserFaculty = foundUser.fakultetas;
            try {
                Faculty.findOne({
                    username: currentUserFaculty
                }, function (err, foundFaculty) {
                    if (err) throw err;
                    const repSubmited = req.flash('report');
                    res.render("submit-2025-2026", {
                        reportSubm: repSubmited,
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
    }, //destytojas dirba su savo ataskaita 
    postCreate22_23: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    lectReport22_23.updateLecReport(foundUser, req);
                    foundUser.mm2022_2023.destytojas.ivykiuDatos.sukurimas = dateTime.getFullDateTime();
                    foundUser.save(function (err) {
                        if (err) throw err;
                        console.log("Succesfully created 2022-2023");
                        req.flash('reportCreated', 'Success');
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
            if (err) {
                console.log("Error...");
                console.log(err);
            } else {
                if (foundUser) {
                    lectReport23_24.updateLecReport(foundUser, req);
                    foundUser.mm2023_2024.destytojas.ivykiuDatos.sukurimas = dateTime.getFullDateTime();
                    foundUser.save(function (err) {
                        if (err) throw err;
                        console.log("Succesfully created 2023-2024");
                        req.flash('reportCreated', 'Success');
                        res.redirect("/2023-2024/user-window");
                    });
                } else {
                    console.log("User does'f found");
                }
            }
        });
    },
    postCreate24_25: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    lectReport24_25.updateLecReport(foundUser, req);
                    foundUser.mm2024_2025.destytojas.ivykiuDatos.sukurimas = dateTime.getFullDateTime();
                    foundUser.save(function (err) {
                        if (err) throw err;
                        console.log("Succesfully created 2024-2025");
                        req.flash('reportCreated', 'Success');
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
    postCreate25_26: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    lectReport25_26.updateLecReport(foundUser, req);
                    foundUser.mm2025_2026.destytojas.ivykiuDatos.sukurimas = dateTime.getFullDateTime();
                    foundUser.save(function (err) {
                        if (err) throw err;
                        console.log("Succesfully created 2025-2026");
                        req.flash('reportCreated', 'Success');
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
            if (err) {
                console.log(err);
            } else {
                if (foundUser) {
                    //masyvu isvalymas update
                    lectReport22_23.clearLecReport(foundUser);
                    //įrašymas iš naujo
                    lectReport22_23.updateLecReport(foundUser, req);
                    foundUser.mm2022_2023.destytojas.ivykiuDatos.atnaujinimas = dateTime.getFullDateTime();
                    foundUser.save(function (err) {
                        if (err) throw err;
                        req.flash('report', 'Success');
                        res.redirect("/2022-2023/edit");
                    });
                } else {
                    console.log("User does'f found");
                }
            }
        });
    },
    postUpdate23_24: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    lectReport23_24.clearLecReport(foundUser);
                    lectReport23_24.updateLecReport(foundUser, req);
                    foundUser.mm2023_2024.destytojas.ivykiuDatos.atnaujinimas = dateTime.getFullDateTime();
                    foundUser.save(function (err) {
                        if (err) throw err;
                        req.flash('report', 'Success');
                        res.redirect("/2023-2024/edit");
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
            if (err) {
                console.log(err);
            } else {
                if (foundUser) {
                    lectReport24_25.clearLecReport(foundUser);
                    lectReport24_25.updateLecReport(foundUser, req);
                    foundUser.mm2024_2025.destytojas.ivykiuDatos.atnaujinimas = dateTime.getFullDateTime();

                    foundUser.save(function (err) {
                        if (!err) {
                            req.flash('report', 'Success');
                            res.redirect("/2024-2025/edit");
                        }
                    });
                } else {
                    console.log("User does'f found");
                }
            }
        });
    },
    postUpdate25_26: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    lectReport25_26.clearLecReport(foundUser);
                    lectReport25_26.updateLecReport(foundUser, req);
                    foundUser.mm2025_2026.destytojas.ivykiuDatos.atnaujinimas = dateTime.getFullDateTime();

                    foundUser.save(function (err) {
                        if (err) throw err;
                        req.flash('report', 'Success');
                        res.redirect("/2025-2026/edit");
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
                    lectReport22_23.clearLecReport(foundUser);
                    lectReport22_23.checkAndUpdateLecReport(foundUser, req);
                    foundUser.mm2022_2023.destytojas.ataskaitosPateikimoData = req.body.ataskaitosPateikimoData,
                        foundUser.mm2022_2023.destytojas.ivykiuDatos.pateikimas = dateTime.getFullDateTime();
                    foundUser.save(function (err) {
                        if (err) throw err;
                        console.log("Succesfully submitted");
                        req.flash('report', 'Success');
                        res.redirect("/2022-2023/submit");
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
                    lectReport23_24.clearLecReport(foundUser);
                    lectReport23_24.checkAndUpdateLecReport(foundUser, req);
                    foundUser.mm2023_2024.destytojas.ataskaitosPateikimoData = req.body.ataskaitosPateikimoData,
                        foundUser.mm2023_2024.destytojas.ivykiuDatos.pateikimas = dateTime.getFullDateTime();
                    foundUser.save(function (err) {
                        if (err) throw err;
                        console.log("Succesfully submitted");
                        req.flash('report', 'Success');
                        res.redirect("/2023-2024/submit");
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
                    lectReport24_25.clearLecReport(foundUser);
                    lectReport24_25.checkAndUpdateLecReport(foundUser, req);
                    foundUser.mm2024_2025.destytojas.ataskaitosPateikimoData = req.body.ataskaitosPateikimoData,
                        foundUser.mm2024_2025.destytojas.ivykiuDatos.pateikimas = dateTime.getFullDateTime();
                    foundUser.save(function (err) {
                        if (err) throw err;
                        console.log("Succesfully submitted");
                        req.flash('report', 'Success');
                        res.redirect("/2024-2025/submit");
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
                    lectReport25_26.clearLecReport(foundUser);
                    lectReport25_26.checkAndUpdateLecReport(foundUser, req);
                    foundUser.mm2025_2026.destytojas.ataskaitosPateikimoData = req.body.ataskaitosPateikimoData,
                        foundUser.mm2025_2026.destytojas.ivykiuDatos.pateikimas = dateTime.getFullDateTime();
                    foundUser.save(function (err) {
                        if (err) throw err;
                        console.log("Succesfully submitted");
                        req.flash('report', 'Success');
                        res.redirect("/2025-2026/submit");
                    });
                } else {
                    console.log("User does'f found");
                }
            } catch (err) {
                console.log(err);
            }
        });
    }, //Vedejas atnaujina destytojo ataskaita
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
    },
    postReportLec22_23: function (req, res) {
        User.findById(req.body.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    //masyvu isvalymas
                    lectReport22_23.clearLecReport(foundUser);
                    if (req.body.ataskaitos_busena == "užrakinta") {
                        lectReport22_23.updateLecReport(foundUser, req);
                        lectReport22_23.headOfDepAddToLecReport(foundUser, req);
                    } else if (req.body.ataskaitos_busena == "užrakintaVedėjo") { //busena perduodama paspaudus mygtuka
                        lectReport22_23.checkAndUpdateLecReport(foundUser, req);
                        lectReport22_23.headOfDepAddToLecReport(foundUser, req);
                        foundUser.mm2022_2023.destytojas.ivykiuDatos.pateikimasVedejo = dateTime.getFullDateTime();
                    }
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
    postReportLec23_24: function (req, res) {
        User.findById(req.body.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    lectReport23_24.clearLecReport(foundUser);
                    if (req.body.ataskaitos_busena == "užrakinta") {
                        lectReport23_24.updateLecReport(foundUser, req);
                        lectReport23_24.headOfDepAddToLecReport(foundUser, req);
                    } else if (req.body.ataskaitos_busena == "užrakintaVedėjo") { //busena perduodama paspaudus mygtuka
                        lectReport23_24.checkAndUpdateLecReport(foundUser, req);
                        lectReport23_24.headOfDepAddToLecReport(foundUser, req);
                        foundUser.mm2023_2024.destytojas.ivykiuDatos.pateikimasVedejo = dateTime.getFullDateTime();
                    }
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
    postReportLec24_25: function (req, res) {
        User.findById(req.body.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    lectReport24_25.clearLecReport(foundUser);
                    if (req.body.ataskaitos_busena == "užrakinta") {
                        lectReport24_25.updateLecReport(foundUser, req);
                        lectReport24_25.headOfDepAddToLecReport(foundUser, req);
                    } else if (req.body.ataskaitos_busena == "užrakintaVedėjo") {
                        lectReport24_25.checkAndUpdateLecReport(foundUser, req);
                        lectReport24_25.headOfDepAddToLecReport(foundUser, req);
                        foundUser.mm2024_2025.destytojas.ivykiuDatos.pateikimasVedejo = dateTime.getFullDateTime();
                    } //"užrakintaVedėjo"
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
    postReportLec25_26: function (req, res) {
        User.findById(req.body.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    lectReport25_26.clearLecReport(foundUser);
                    if (req.body.ataskaitos_busena == "užrakinta") {
                        lectReport25_26.updateLecReport(foundUser, req);
                        lectReport25_26.headOfDepAddToLecReport(foundUser, req);
                    } else if (req.body.ataskaitos_busena == "užrakintaVedėjo") {
                        lectReport25_26.checkAndUpdateLecReport(foundUser, req);
                        lectReport25_26.headOfDepAddToLecReport(foundUser, req);
                        foundUser.mm2025_2026.destytojas.ivykiuDatos.pateikimasVedejo = dateTime.getFullDateTime();
                    }
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
    }

}
