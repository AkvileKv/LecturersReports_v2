var express = require('express');
const User = require('../models/user');

const dateTime = require('./full-date-time');
const lectReport22_23 = require('./report/lecturers-report22_23');
const lectReport23_24 = require('./report/lecturers-report23_24');
const lectReport24_25 = require('./report/lecturers-report24_25');
const lectReport25_26 = require('./report/lecturers-report25_26');

module.exports = {
    //katedros vedejas atnaujina destytojo ataskaita
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
    },
    //destytojas dirba su savo ataskaita 
    postReportCreate22_23: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    lectReport22_23.updateLecReport(foundUser, req);
                    foundUser.mm2022_2023.destytojas.ivykiuDatos.sukurimas = dateTime.getFullDateTime();
                    foundUser.save(function (err) {
                        if (err) throw err;
                        console.log("Succesfully created 2022-2023");
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
    postReportCreate23_24: function (req, res) {
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
                        res.redirect("/2023-2024/user-window");
                    });
                } else {
                    console.log("User does'f found");
                }
            }
        });
    },
    postReportCreate24_25: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    lectReport24_25.updateLecReport(foundUser, req);
                    foundUser.mm2024_2025.destytojas.ivykiuDatos.sukurimas = dateTime.getFullDateTime();
                    foundUser.save(function (err) {
                        if (err) throw err;
                        console.log("Succesfully created 2024-2025");
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
    postReportCreate25_26: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    lectReport25_26.updateLecReport(foundUser, req);
                    foundUser.mm2025_2026.destytojas.ivykiuDatos.sukurimas = dateTime.getFullDateTime();
                    foundUser.save(function (err) {
                        if (err) throw err;
                        console.log("Succesfully created 2025-2026");
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
    postReportUpdate22_23: function (req, res) {
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
                        console.log("Succesfully updated");
                        res.redirect("/2022-2023/user-window");
                    });
                } else {
                    console.log("User does'f found");
                }
            }
        });
    },
    postReportUpdate23_24: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    lectReport23_24.clearLecReport(foundUser);
                    lectReport23_24.updateLecReport(foundUser, req);
                    foundUser.mm2023_2024.destytojas.ivykiuDatos.atnaujinimas = dateTime.getFullDateTime();
                    foundUser.save(function (err) {
                        if (err) throw err;
                        console.log("Succesfully updated");
                        res.redirect("/2023-2024/user-window");
                    });
                } else {
                    console.log("User does'f found");
                }
            } catch (err) {
                console.log(err);
            }
        });
    },
    postReportUpdate24_25: function (req, res) {
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
                            console.log("Succesfully updated");
                            res.redirect("/2024-2025/user-window");
                        }
                    });
                } else {
                    console.log("User does'f found");
                }
            }
        });
    },
    postReportUpdate25_26: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    lectReport25_26.clearLecReport(foundUser);
                    lectReport25_26.updateLecReport(foundUser, req);
                    foundUser.mm2025_2026.destytojas.ivykiuDatos.atnaujinimas = dateTime.getFullDateTime();

                    foundUser.save(function (err) {
                        if (err) throw err;
                        console.log("Succesfully updated");
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
    postReportSubmit22_23: function (req, res) {
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
    postReportSubmit23_24: function (req, res) {
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
    postReportSubmit24_25: function (req, res) {
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
    postReportSubmit25_26: function (req, res) {
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
                        res.redirect("/2025-2026/submit");
                    });
                } else {
                    console.log("User does'f found");
                }
            } catch (err) {
                console.log(err);
            }
        });
    },
    //administratorius atnaujina destytojo ataskaita
    postReportAdmin22_23: function (req, res) {
        User.findById(req.body.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    //masyvu isvalymas update
                    lectReport22_23.clearLecReport(foundUser);
                    lectReport22_23.updateLecReport(foundUser, req);
                    lectReport22_23.headOfDepAddToLecReport(foundUser, req);
                    foundUser.save(function (err) {
                        if (err) throw err;
                        console.log("Succesfully  updated");
                        res.redirect("/admin/2022-2023/users");
                    });
                } else {
                    console.log("Does'f found");
                }
            } catch (err) {
                console.log(err);
            }
        });
    },
    postReportAdmin23_24: function (req, res) {
        User.findById(req.body.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    lectReport23_24.clearLecReport(foundUser);
                    lectReport23_24.updateLecReport(foundUser, req);
                    lectReport23_24.headOfDepAddToLecReport(foundUser, req);
                    foundUser.save(function (err) {
                        if (err) throw err;
                        console.log("Succesfully  updated");
                        res.redirect("/admin/2023-2024/users");
                    });
                } else {
                    console.log("Does'f found");
                }
            } catch (err) {
                console.log(err);
            }
        });
    },
    postReportAdmin24_25: function (req, res) {
        User.findById(req.body.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    lectReport24_25.clearLecReport(foundUser);
                    lectReport24_25.updateLecReport(foundUser, req);
                    lectReport24_25.headOfDepAddToLecReport(foundUser, req);
                    foundUser.save(function (err) {
                        if (err) throw err;
                        console.log("Succesfully  updated");
                        res.redirect("/admin/2024-2025/users");
                    });
                } else {
                    console.log("Does'f found");
                }
            } catch (err) {
                console.log(err);
            }
        });
    },
    postReportAdmin25_26: function (req, res) {
        User.findById(req.body.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    lectReport25_26.clearLecReport(foundUser);
                    lectReport25_26.updateLecReport(foundUser, req);
                    lectReport25_26.headOfDepAddToLecReport(foundUser, req);
                    foundUser.save(function (err) {
                        if (err) throw err;
                        console.log("Succesfully  updated");
                        res.redirect("/admin/2025-2026/users");
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
