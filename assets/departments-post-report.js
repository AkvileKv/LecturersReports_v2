var express = require('express');
const User = require('../models/user');

const dateTime = require('./full-date-time');
const depReport22_23 = require('./report/departments-report22_23');
const depReport23_24 = require('./report/departments-report23_24');
const depReport24_25 = require('./report/departments-report24_25');
const depReport25_26 = require('./report/departments-report25_26');

module.exports = {
    //vedejas dirba su savo ataskaita 
    postReportCreate22_23: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    depReport22_23.updateDepReport(foundUser, req);
                    foundUser.mm2022_2023.katedrosVedejas.ivykiuDatos.sukurimas = dateTime.getFullDateTime();
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
            try {
                if (foundUser) {
                    depReport23_24.updateDepReport(foundUser, req);
                    foundUser.mm2023_2024.katedrosVedejas.ivykiuDatos.sukurimas = dateTime.getFullDateTime();
                    foundUser.save(function (err) {
                        if (!err) {
                            console.log("Succesfully created 2023-2024");
                            res.redirect("/2023-2024/user-window");
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
    postReportCreate24_25: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    depReport24_25.updateDepReport(foundUser, req);
                    foundUser.mm2024_2025.katedrosVedejas.ivykiuDatos.sukurimas = dateTime.getFullDateTime();
                    foundUser.save(function (err) {
                        if (!err) {
                            console.log("Succesfully created 2024-2025");
                            res.redirect("/2024-2025/user-window");
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
    postReportCreate25_26: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    depReport25_26.updateDepReport(foundUser, req);
                    foundUser.mm2025_2026.katedrosVedejas.ivykiuDatos.sukurimas = dateTime.getFullDateTime();
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
            try {
                if (foundUser) {
                    depReport22_23.clearDepReport(foundUser);
                    depReport22_23.updateDepReport(foundUser, req);
                    foundUser.mm2022_2023.katedrosVedejas.ivykiuDatos.atnaujinimas = dateTime.getFullDateTime();
                    foundUser.save(function (err) {
                        if (err) throw err;
                        console.log("Succesfully updated 2022-2023");
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
    postReportUpdate23_24: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    depReport23_24.clearDepReport(foundUser);
                    depReport23_24.updateDepReport(foundUser, req);
                    foundUser.mm2023_2024.katedrosVedejas.ivykiuDatos.atnaujinimas = dateTime.getFullDateTime();
                    foundUser.save(function (err) {
                        if (!err) {
                            console.log("Succesfully updated 2023-2024");
                            res.redirect("/2023-2024/user-window");
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
    postReportUpdate24_25: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    depReport24_25.clearDepReport(foundUser);
                    depReport24_25.updateDepReport(foundUser, req);
                    foundUser.mm2024_2025.katedrosVedejas.ivykiuDatos.atnaujinimas = dateTime.getFullDateTime();
                    foundUser.save(function (err) {
                        if (err) throw err;
                        console.log("Succesfully updated 2024-2025");
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
    postReportUpdate25_26: function (req, res) {
        User.findById(req.user.id, function (err, foundUser) {
            try {
                if (foundUser) {
                    depReport25_26.clearDepReport(foundUser);
                    depReport25_26.updateDepReport(foundUser, req);
                    foundUser.mm2025_2026.katedrosVedejas.ivykiuDatos.atnaujinimas = dateTime.getFullDateTime();
                    foundUser.save(function (err) {
                        if (err) throw err;
                        console.log("Succesfully updated 2025-2026");
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
                    depReport22_23.clearDepReport(foundUser);
                    depReport22_23.checkAndUpdateDepReport(foundUser, req);
                    foundUser.mm2022_2023.katedrosVedejas.ataskaitosPateikimoData = req.body.ataskaitosPateikimoData,
                        foundUser.mm2022_2023.katedrosVedejas.ivykiuDatos.pateikimas = dateTime.getFullDateTime();
                    foundUser.save(function (err) {
                        if (err) throw err;
                        console.log("Succesfully submitted");
                        res.redirect("/user-window-2022-2023");
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
                    depReport23_24.clearDepReport(foundUser);
                    depReport23_24.checkAndUpdateDepReport(foundUser, req);
                    foundUser.mm2023_2024.katedrosVedejas.ataskaitosPateikimoData = req.body.ataskaitosPateikimoData,
                        foundUser.mm2023_2024.katedrosVedejas.ivykiuDatos.pateikimas = dateTime.getFullDateTime();
                    foundUser.save(function (err) {
                        if (err) throw err;
                        console.log("Succesfully submitted");
                        res.redirect("/user-window-2023-2024");
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
                    depReport24_25.clearDepReport(foundUser);
                    depReport24_25.checkAndUpdateDepReport(foundUser, req);
                    foundUser.mm2024_2025.katedrosVedejas.ataskaitosPateikimoData = req.body.ataskaitosPateikimoData,
                        foundUser.mm2024_2025.katedrosVedejas.ivykiuDatos.pateikimas = dateTime.getFullDateTime();
                    foundUser.save(function (err) {
                        if (err) throw err;
                        console.log("Succesfully submitted");
                        res.redirect("/user-window-2024-2025");
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
                    depReport25_26.clearDepReport(foundUser);
                    depReport25_26.checkAndUpdateDepReport(foundUser, req);
                    foundUser.mm2025_2026.katedrosVedejas.ataskaitosPateikimoData = req.body.ataskaitosPateikimoData,
                        foundUser.mm2025_2026.katedrosVedejas.ivykiuDatos.pateikimas = dateTime.getFullDateTime();
                    foundUser.save(function (err) {
                        if (err) throw err;
                        console.log("Succesfully submitted");
                        res.redirect("/user-window-2025-2026");
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