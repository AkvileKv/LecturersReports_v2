require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const {
  v4: uuidv4
} = require('uuid'); // uuid, To call: uuidv4();
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const _ = require("lodash");

const User = require('./models/user');
const Faculty = require('./models/faculty');

const homeRouter = require('./controllers/home');
const registerRouter = require('./controllers/register');
const loginRouter = require('./controllers/login');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(express.static("models"));

app.use("/", homeRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 1000000
}));


app.use(session({
  genid: function(req) {
    return uuidv4();
  },
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 360 * 1000,
    secure: false
  } // 6 hour
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.post("/register", (req, res) => {

  User.register({
    username: req.body.username,
    busena: "nesukurta",
    busenaVedejo: "nesukurta",
    role: "dėstytojas",
    rolesKeitimas: false,
    updated_for: "New User Registration"
  }, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/user-window");
      });
    }
  });
});

app.post("/login", (req, res) => {
  //   if (req.isAuthenticated()) {
  // console.log("autentifikavo");
  //     User.findById(req.user.id, function(err, foundUser) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         if (foundUser.role === "dėstytojas") {
  //           res.redirect("/user-window");
  //         } else if (foundUser.role === "katedros vedėjas") {
  //           res.redirect("/user-window-dep");
  //         } else if (foundUser.role === "administratorius") {
  //           res.redirect("/admin-window");
  //         }
  //       }
  //     });
  //
  // } else {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local", {
        failureRedirect: '/login'
      })(req, res, function() {
        User.findById(req.user.id, function(err, foundUser) {
          if (err) {
            console.log(err);
          } else {
            if (foundUser.role === "dėstytojas") {
              res.redirect("/user-window");
            } else if (foundUser.role === "katedros vedėjas") {
              res.redirect("/user-window-dep");
            } else if (foundUser.role === "administratorius") {
              res.redirect("/admin-window");
            }
          }
        });
      });
    }
  });
  //}
});

//TEST METHOD
app.get("/admin-history-log", (req, res) => {

var HistoryUser = User.historyModel();

  if (req.isAuthenticated()) {

    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "administratorius") {

          HistoryUser.find({}, function(err, users_history) {
            if (err) {
              console.log(err);
            } else {
              res.render("admin-history-log", {
                users_history: users_history
              });
            }
          });
        } else {
          console.log("You do not have permission");
          res.redirect("/login");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});
//

app.post("/create", function(req, res) {
  if (req.isAuthenticated()) {

    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log("Error...");
        console.log(err);
      } else {
        if (foundUser) {
          // 2 lent
          var nrcommand = "req.body.nr";
          var dalykascommand = "req.body.dalykas";
          var grupecommand = "req.body.grupe";
          var semestrascommand = "req.body.semestras";
          var planuotosValcommand = "req.body.planuotosVal";
          var atliktosValcommand = "req.body.atliktosVal";
          // 3 lent
          var nD2_M02nrcommand = "req.body.nD2_M02nr";
          var bibliografAprcommand = "req.body.bibliografApr";
          var tipascommand = "req.body.tipas";
          var mokslSritcommand = "req.body.mokslSrit";
          var mokslKryptcommand = "req.body.mokslKrypt";
          // 4 lent
          var nD2_M04nrcommand = "req.body.nD2_M04nr";
          var nD2_M04studProgrcommand = "req.body.nD2_M04studProgr";
          var nD2_M04dalykPavadcommand = "req.body.nD2_M04dalykPavad";
          var nD2_M04busenacommand = "req.body.nD2_M04busena";
          var nD2_M04apimtisKreditcommand = "req.body.nD2_M04apimtisKredit";
          // 5 lent
          var nD2_D01nrcommand = "req.body.nD2_D01nr";
          var nD2_D01komitetascommand = "req.body.nD2_D01komitetas";
          var nD2_D01veiklacommand = "req.body.nD2_D01veikla";
          var nD2_D01rezultataicommand = "req.body.nD2_D01rezultatai";
          // 6 lent
          var nD2_D02nrcommand = "req.body.nD2_D02nr";
          var nD2_D02studKryptcommand = "req.body.nD2_D02studKrypt";
          var nD2_D02veiklacommand = "req.body.nD2_D02veikla";
          var nD2_D02rezultataicommand = "req.body.nD2_D02rezultatai";
          // 7 lent
          var nD2_D03nrcommand = "req.body.nD2_D03nr";
          var nD2_D03studProgrcommand = "req.body.nD2_D03studProgr";
          var nD2_D03veiklacommand = "req.body.nD2_D03veikla";
          var nD2_D03rezultataicommand = "req.body.nD2_D03rezultatai";
          var nD2_D03studKryptiscommand = "req.body.nD2_D03studKryptis";
          // 8 lent
          var nD2_M03nrcommand = "req.body.nD2_M03nr";
          var nD2_M03studProgrcommand = "req.body.nD2_M03studProgr";
          var nD2_M03dalykPavadcommand = "req.body.nD2_M03dalykPavad";
          var nD2_M03apimtisKreditcommand = "req.body.nD2_M03apimtisKredit";
          // 9 lent
          var nD2_S01nrcommand = "req.body.nD2_S01nr";
          var nD2_S01veiklacommand = "req.body.nD2_S01veikla";
          var nD2_S01dataVietacommand = "req.body.nD2_S01dataVieta";
          // savianalize
          var nD2_Snrcommand = "req.body.nD2_Snr";
          var nD2_Sstiprybescommand = "req.body.nD2_Sstiprybes";
          var nD2_Stobulintinacommand = "req.body.nD2_Stobulintina";
          // 10 lent
          var tMTEP3_T01nrcommand = "req.body.tMTEP3_T01nr";
          var tyrTematcommand = "req.body.tyrTemat";
          var tyrGrupcommand = "req.body.tyrGrup";
          var tMTEP3_T01mokslSritcommand = "req.body.tMTEP3_T01mokslSrit";
          var tMTEP3_T01mokslKryptcommand = "req.body.tMTEP3_T01mokslKrypt";
          // 11 lent
          var tMTEP3_T02nrcommand = "req.body.tMTEP3_T02nr";
          var tMTEP3_T02bibliografAprcommand = "req.body.tMTEP3_T02bibliografApr";
          var tMTEP3_T02tipascommand = "req.body.tMTEP3_T02tipas";
          var tMTEP3_T02mokslSritcommand = "req.body.tMTEP3_T02mokslSrit";
          var tMTEP3_T02mokslKryptcommand = "req.body.tMTEP3_T02mokslKrypt";
          var tMTEP3_T02duomBazecommand = "req.body.tMTEP3_T02duomBaze";
          // 12 lent
          var tMTEP3_T03nrcommand = "req.body.tMTEP3_T03nr";
          var tMTEP3_T03pilnasBiblAprcommand = "req.body.tMTEP3_T03pilnasBiblApr";
          var tMTEP3_T03rengTipascommand = "req.body.tMTEP3_T03rengTipas";
          // 13 lent
          var tMTEP3_T04nrcommand = "req.body.tMTEP3_T04nr";
          var tMTEP3_T04uzsakovascommand = "req.body.tMTEP3_T04uzsakovas";
          var tMTEP3_T04temacommand = "req.body.tMTEP3_T04tema";
          var tMTEP3_T04datacommand = "req.body.tMTEP3_T04data";
          var tMTEP3_T04atlygArNecommand = "req.body.tMTEP3_T04atlygArNe";
          // 14.1 lent
          var tMTEP3_T05nrcommand = "req.body.tMTEP3_T05nr";
          var tMTEP3_T05veiklPavadcommand = "req.body.tMTEP3_T05veiklPavad";
          var tMTEP3_T05veiklRezultcommand = "req.body.tMTEP3_T05veiklRezult";
          var tMTEP3_T05atlygArNecommand = "req.body.tMTEP3_T05atlygArNe";
          // 14.2 lent
          var tMTEP3_142pavadinimascommand = "req.body.tMTEP3_142pavadinimas";
          var tMTEP3_142pastaboscommand = "req.body.tMTEP3_142pastabos";
          // 14.3 lent
          var tMTEP3_143pavadinimascommand = "req.body.tMTEP3_143pavadinimas";
          var tMTEP3_143uzsakovascommand = "req.body.tMTEP3_143uzsakovas";
          // 15 lent
          var tMTEP3_T06nrcommand = "req.body.tMTEP3_T06nr";
          var tMTEP3_T06autoriuscommand = "req.body.tMTEP3_T06autorius";
          var tMTEP3_T06menoSritcommand = "req.body.tMTEP3_T06menoSrit";
          var tMTEP3_T06pobudiscommand = "req.body.tMTEP3_T06pobudis";
          var tMTEP3_T06realizVietacommand = "req.body.tMTEP3_T06realizVieta";
          var tMTEP3_T06datacommand = "req.body.tMTEP3_T06data";
          var tMTEP3_T06atlygArNecommand = "req.body.tMTEP3_T06atlygArNe";
          // 16 lent
          var tMTEP3_T07nrcommand = "req.body.tMTEP3_T07nr";
          var tMTEP3_T07menoSritcommand = "req.body.tMTEP3_T07menoSrit";
          var tMTEP3_T07pavadinimascommand = "req.body.tMTEP3_T07pavadinimas";
          var tMTEP3_T07atlikVietacommand = "req.body.tMTEP3_T07atlikVieta";
          var tMTEP3_T07datacommand = "req.body.tMTEP3_T07data";
          var tMTEP3_T07atlygArNecommand = "req.body.tMTEP3_T07atlygArNe";
          // 17 lent
          var tMTEP3_T08Snrcommand = "req.body.tMTEP3_T08Snr";
          var tMTEP3_T08menoSritcommand = "req.body.tMTEP3_T08menoSrit";
          var tMTEP3_T08pavadinimascommand = "req.body.tMTEP3_T08pavadinimas";
          var tMTEP3_T08atlikVietacommand = "req.body.tMTEP3_T08atlikVieta";
          var tMTEP3_T08datacommand = "req.body.tMTEP3_T08data";
          var tMTEP3_T08atlygArNecommand = "req.body.tMTEP3_T08atlygArNe";
          // 18 lent
          var tMTEP3_T09nrcommand = "req.body.tMTEP3_T09nr";
          var tMTEP3_T09menoSritcommand = "req.body.tMTEP3_T09menoSrit";
          var tMTEP3_T09pavadinimascommand = "req.body.tMTEP3_T09pavadinimas";
          var tMTEP3_T09atlikVietacommand = "req.body.tMTEP3_T09atlikVieta";
          var tMTEP3_T09datacommand = "req.body.tMTEP3_T09data";
          var tMTEP3_T09atlygArNecommand = "req.body.tMTEP3_T09atlygArNe";
          // 19 lent
          var tMTEP3_T10nrcommand = "req.body.tMTEP3_T10nr";
          var tMTEP3_T10veiklPobudcommand = "req.body.tMTEP3_T10veiklPobud";
          var tMTEP3_T10veiklTikslcommand = "req.body.tMTEP3_T10veiklTiksl";
          var tMTEP3_T10dataVietacommand = "req.body.tMTEP3_T10dataVieta";
          var tMTEP3_T10dalyvSkcommand = "req.body.tMTEP3_T10dalyvSk";
          var tMTEP3_T10ktKomentaraicommand = "req.body.tMTEP3_T10ktKomentarai";
          var tMTEP3_T10atlygArNecommand = "req.body.tMTEP3_T10atlygArNe";
          // 20 lent
          var tMTEP3_T11nrcommand = "req.body.tMTEP3_T11nr";
          var tMTEP3_T11veiklPobudcommand = "req.body.tMTEP3_T11veiklPobud";
          var tMTEP3_T11veiklTikslcommand = "req.body.tMTEP3_T11veiklTiksl";
          var tMTEP3_T11dataVietacommand = "req.body.tMTEP3_T11dataVieta";
          var tMTEP3_T11dalyvSkcommand = "req.body.tMTEP3_T11dalyvSk";
          var tMTEP3_T11ktKomentaraicommand = "req.body.tMTEP3_T11ktKomentarai";
          var tMTEP3_T11atlygArNecommand = "req.body.tMTEP3_T11atlygArNe";
          // 21 lent
          var tMTEP3_T12nrcommand = "req.body.tMTEP3_T12nr";
          var tMTEP3_T12veiklPobudcommand = "req.body.tMTEP3_T12veiklPobud";
          var tMTEP3_T12dataVietacommand = "req.body.tMTEP3_T12dataVieta";
          // 22 lent
          var tMTEP3_T13nrcommand = "req.body.tMTEP3_T13nr";
          var tMTEP3_T13studDuomcommand = "req.body.tMTEP3_T13studDuom";
          var tMTEP3_T13renginioPavadcommand = "req.body.tMTEP3_T13renginioPavad";
          var tMTEP3_T13rezultatascommand = "req.body.tMTEP3_T13rezultatas";
          var tMTEP3_T13datacommand = "req.body.tMTEP3_T13data";
          // 23 lent
          var tMTEP3_T14nrcommand = "req.body.tMTEP3_T14nr";
          var tMTEP3_T14renginyscommand = "req.body.tMTEP3_T14renginys";
          var tMTEP3_T14veiklPobudcommand = "req.body.tMTEP3_T14veiklPobud";
          var tMTEP3_T14dataVietacommand = "req.body.tMTEP3_T14dataVieta";
          // savianalize
          var tMTEP3_Snrcommand = "req.body.tMTEP3_Snr";
          var tMTEP3_Sstiprybescommand = "req.body.tMTEP3_Sstiprybes";
          var tMTEP3_Stobulintinacommand = "req.body.tMTEP3_Stobulintina";
          // 24 lent
          //mokymosi
          var kTOV4_mokymopavadcommand = "req.body.kTOV4_mokymopavad";
          var kTOV4_mokymopazymNrcommand = "req.body.kTOV4_mokymopazymNr";
          var kTOV4_mokymotrukmeValLTcommand = "req.body.kTOV4_mokymotrukmeValLT";
          var kTOV4_mokymotrukmeValNeLTcommand = "req.body.kTOV4_mokymotrukmeValNeLT";
          // tyrimu
          var kTOV4_tyrimupavadcommand = "req.body.kTOV4_tyrimupavad";
          var kTOV4_tyrimupazymNrcommand = "req.body.kTOV4_tyrimupazymNr";
          var kTOV4_tyrimutrukmeValLTcommand = "req.body.kTOV4_tyrimutrukmeValLT";
          var kTOV4_tyrimutrukmeValNeLTcommand = "req.body.kTOV4_tyrimutrukmeValNeLT";
          //bendrosios
          var kTOV4_bendrosiospavadcommand = "req.body.kTOV4_bendrosiospavad";
          var kTOV4_bendrosiospazymNrcommand = "req.body.kTOV4_bendrosiospazymNr";
          var kTOV4_bendrosiostrukmeValLTcommand = "req.body.kTOV4_bendrosiostrukmeValLT";
          var kTOV4_bendrosiostrukmeValNeLTcommand = "req.body.kTOV4_bendrosiostrukmeValNeLT";
          //dalykines
          var kTOV4_dalykpavadcommand = "req.body.kTOV4_dalykpavad";
          var kTOV4_dalykpazymNrcommand = "req.body.kTOV4_dalykpazymNr";
          var kTOV4_dalyktrukmeValLTcommand = "req.body.kTOV4_dalyktrukmeValLT";
          var kTOV4_dalyktrukmeValNeLTcommand = "req.body.kTOV4_dalyktrukmeValNeLT";
          // 25 lent
          var kTOV4_25renginysTemacommand = "req.body.kTOV4_25renginysTema";
          var kTOV4_25kompGrupecommand = "req.body.kTOV4_25kompGrupe";
          var kTOV4_25skirtacommand = "req.body.kTOV4_25skirta";
          // 26 lent
          var kTOV4_26imonIstaigcommand = "req.body.kTOV4_26imonIstaig";
          var kTOV4_26kompGrupecommand = "req.body.kTOV4_26kompGrupe";
          var kTOV4_26trukmeValcommand = "req.body.kTOV4_26trukmeVal";
          var kTOV4_26datacommand = "req.body.kTOV4_26data";
          // 27 lent
          var kTOV4_KV03nrcommand = "req.body.kTOV4_KV03nr";
          var kTOV4_KV03studKryptiscommand = "req.body.kTOV4_KV03studKryptis";
          var kTOV4_KV03saliscommand = "req.body.kTOV4_KV03salis";
          var kTOV4_KV03institucijacommand = "req.body.kTOV4_KV03institucija";
          var kTOV4_KV03dalykascommand = "req.body.kTOV4_KV03dalykas";
          // 28.1 lent
          var kTOV4_O01_1nrcommand = "req.body.kTOV4_O01_1nr";
          var kTOV4_O01_1veiklPobudcommand = "req.body.kTOV4_O01_1veiklPobud";
          var kTOV4_O01_1isakNrDatacommand = "req.body.kTOV4_O01_1isakNrData";
          // 28.2 lent
          var kTOV4_O01_2nrcommand = "req.body.kTOV4_O01_2nr";
          var kTOV4_O01_2destytojascommand = "req.body.kTOV4_O01_2destytojas";
          var kTOV4_O01_2veiklPobudcommand = "req.body.kTOV4_O01_2veiklPobud";
          var kTOV4_O01_2dataVietacommand = "req.body.kTOV4_O01_2dataVieta";
          var kTOV4_O01_2ktKomentaraicommand = "req.body.kTOV4_O01_2ktKomentarai";
          // 29 lent
          var kTOV4_29veiklacommand = "req.body.kTOV4_29veikla";
          var kTOV4_29socPartneriscommand = "req.body.kTOV4_29socPartneris";
          // savianalize
          var kTOV4_Snrcommand = "req.body.kTOV4_Snr";
          var kTOV4_Sstiprybescommand = "req.body.kTOV4_Sstiprybes";
          var kTOV4_Stobulintinacommand = "req.body.kTOV4_Stobulintina";
          // 30 lent
          var kV5_KT02nrcommand = "req.body.kV5_KT02nr";
          var kV5_KT02studKryptiscommand = "req.body.kV5_KT02studKryptis";
          var kV5_KT02diplomantascommand = "req.body.kV5_KT02diplomantas";
          var kV5_KT02studProgrcommand = "req.body.kV5_KT02studProgr";
          var kV5_KT02darboTemacommand = "req.body.kV5_KT02darboTema";
          // 31 lent
          var kV5_KT01nrcommand = "req.body.kV5_KT01nr";
          var kV5_KT01diplomantascommand = "req.body.kV5_KT01diplomantas";
          var kV5_KT01studProgrcommand = "req.body.kV5_KT01studProgr";
          var kV5_KT01darboTemacommand = "req.body.kV5_KT01darboTema";
          var kV5_KT01uzsakovascommand = "req.body.kV5_KT01uzsakovas";
          var kV5_KT01studKryptiscommand = "req.body.kV5_KT01studKryptis";
          // 32 lent
          var kV5_32socaprasymascommand = "req.body.kV5_32socaprasymas";
          var kV5_32aplinkaprasymascommand = "req.body.kV5_32aplinkaprasymas";
          var kV5_32valstybaprasymascommand = "req.body.kV5_32valstybaprasymas";
          var kV5_32etnoaprasymascommand = "req.body.kV5_32etnoaprasymas";
          var kV5_32savaprasymascommand = "req.body.kV5_32savaprasymas";
          // 33 lent
          var kV5_33veiklacommand = "req.body.kV5_33veikla";
          var kV5_33veiklPartnercommand = "req.body.kV5_33veiklPartner";
          var kV5_33organizaccommand = "req.body.kV5_33organizac";
          var kV5_33veiklOrientavimcommand = "req.body.kV5_33veiklOrientavim";
          var kV5_33dalyviaicommand = "req.body.kV5_33dalyviai";
          var kV5_33laikascommand = "req.body.kV5_33laikas";
          var kV5_33vietacommand = "req.body.kV5_33vieta";
          // 34 lent
          var kV5_34pavadinimascommand = "req.body.kV5_34pavadinimas";
          var kV5_34vykdytPartnercommand = "req.body.kV5_34vykdytPartner";
          var kV5_34dalyviaicommand = "req.body.kV5_34dalyviai";
          var kV5_34finansavimcommand = "req.body.kV5_34finansavim";
          var kV5_34rezultataicommand = "req.body.kV5_34rezultatai";
          var kV5_34salisDatacommand = "req.body.kV5_34salisData";
          // 2 lentelė create
          for (let i = 1; i <= parseInt(req.body.table2_name); i++) {
            foundUser.destytojas.kD1_K01.kD1_K01_array.push({
              nr: eval(nrcommand + i),
              dalykas: eval(dalykascommand + i),
              grupe: eval(grupecommand + i),
              semestras: eval(semestrascommand + i),
              planuotosVal: eval(planuotosValcommand + i),
              atliktosVal: eval(atliktosValcommand + i)
            })
          }
          foundUser.destytojas.kD1_K01.isVisoValPlan = req.body.kD1_K01isVisoValPlan,
            foundUser.destytojas.kD1_K01.isVisoValAtl = req.body.kD1_K01isVisoValAtl,
            foundUser.destytojas.kD1_K01.isJuSrautaisValPlan = req.body.isJuSrautaisValPlan,
            foundUser.destytojas.kD1_K01.isJuSrautaisValAtl = req.body.isJuSrautaisValAtl,
            foundUser.destytojas.kD1_K01.isJuUzsienioValPlan = req.body.isJuUzsienioValPlan,
            foundUser.destytojas.kD1_K01.isJuUzsienioValAtl = req.body.isJuUzsienioValAtl,
            foundUser.destytojas.kD1_K01.priezastys = req.body.kD1_K01priezastys,

            foundUser.destytojas.nD2.nekSuStud_planVal = req.body.nekSuStud_planVal,
            foundUser.destytojas.nD2.nekSuStud_atlVal = req.body.nekSuStud_atlVal,
            foundUser.destytojas.nD2.pasirengDest_planVal = req.body.pasirengDest_planVal,
            foundUser.destytojas.nD2.pasirengDest_atlVal = req.body.pasirengDest_atlVal,
            foundUser.destytojas.nD2.metod_planVal = req.body.metod_planVal,
            foundUser.destytojas.nD2.metod_atlVal = req.body.metod_atlVal,
            foundUser.destytojas.nD2.dalyvSPKUV_planVal = req.body.dalyvSPKUV_planVal,
            foundUser.destytojas.nD2.dalyvSPKUV_atlVal = req.body.dalyvSPKUV_atlVal,
            foundUser.destytojas.nD2.studPop_planVal = req.body.studPop_planVal,
            foundUser.destytojas.nD2.studPop_atlVal = req.body.studPop_atlVal,
            foundUser.destytojas.nD2.isVisoValPlan = req.body.nD2isVisoValPlan,
            foundUser.destytojas.nD2.isVisoValAtl = req.body.nD2isVisoValAtl,
            foundUser.destytojas.nD2.priezastys = req.body.nD2priezastys
          // 3 lentelė create
          for (let i = 1; i <= parseInt(req.body.table3_name); i++) {
            foundUser.destytojas.nD2_M02.push({
              nr: eval(nrcommand + i),
              bibliografApr: eval(bibliografAprcommand + i),
              tipas: eval(tipascommand + i),
              mokslSrit: eval(mokslSritcommand + i),
              mokslKrypt: eval(mokslKryptcommand + i)
            })
          }
          // 4 lentelė create
          for (let i = 1; i <= parseInt(req.body.table4_name); i++) {
            foundUser.destytojas.nD2_M04.push({
              nr: eval(nD2_M04nrcommand + i),
              studProgr: eval(nD2_M04studProgrcommand + i),
              dalykPavad: eval(nD2_M04dalykPavadcommand + i),
              busena: eval(nD2_M04busenacommand + i),
              apimtisKredit: eval(nD2_M04apimtisKreditcommand + i)
            })
          } // 5 lentelė create
          for (let i = 1; i <= parseInt(req.body.table5_name); i++) {
            foundUser.destytojas.nD2_D01.push({
              nr: eval(nD2_D01nrcommand + i),
              komitetas: eval(nD2_D01komitetascommand + i),
              veikla: eval(nD2_D01veiklacommand + i),
              rezultatai: eval(nD2_D01rezultataicommand + i)
            })
          } // 6 lentelė create
          for (let i = 1; i <= parseInt(req.body.table6_name); i++) {
            foundUser.destytojas.nD2_D02.push({
              nr: eval(nD2_D02nrcommand + i),
              studKryptis: eval(nD2_D02studKryptcommand + i),
              veikla: eval(nD2_D02veiklacommand + i),
              rezultatai: eval(nD2_D02rezultataicommand + i)
            })
          } // 7 lentelė create
          for (let i = 1; i <= parseInt(req.body.table7_name); i++) {
            foundUser.destytojas.nD2_D03.push({
              nr: eval(nD2_D03nrcommand + i),
              studKryptis: eval(nD2_D03studKryptiscommand + i),
              studProgr: eval(nD2_D03studProgrcommand + i),
              veikla: eval(nD2_D03veiklacommand + i),
              rezultatai: eval(nD2_D03rezultataicommand + i)
            })
          } // 8 lentelė create
          for (let i = 1; i <= parseInt(req.body.table8_name); i++) {
            foundUser.destytojas.nD2_M03.push({
              nr: eval(nD2_M03nrcommand + i),
              studProgr: eval(nD2_M03studProgrcommand + i),
              dalykPavad: eval(nD2_M03dalykPavadcommand + i),
              apimtisKredit: eval(nD2_M03apimtisKreditcommand + i)
            })
          } // 9 lentelė create
          for (let i = 1; i <= parseInt(req.body.table9_name); i++) {
            foundUser.destytojas.nD2_S01.push({
              nr: eval(nD2_S01nrcommand + i),
              veikla: eval(nD2_S01veiklacommand + i),
              dataVieta: eval(nD2_S01dataVietacommand + i)
            })
          } // savianalize
          for (let i = 1; i <= parseInt(req.body.tablenD2_S_name); i++) {
            foundUser.destytojas.nD2_S.push({
              nr: eval(nD2_Snrcommand + i),
              stiprybes: eval(nD2_Sstiprybescommand + i),
              tobulintina: eval(nD2_Stobulintinacommand + i)
            })
          }
          foundUser.destytojas.tMTEP3.tMTEPveiklRez_planVal = req.body.tMTEPveiklRez_planVal,
            foundUser.destytojas.tMTEP3.tMTEPveiklRez_atlVal = req.body.tMTEPveiklRez_atlVal,
            foundUser.destytojas.tMTEP3.menoVeikl_planVal = req.body.menoVeikl_planVal,
            foundUser.destytojas.tMTEP3.menoVeikl_atlVal = req.body.menoVeikl_atlVal,
            foundUser.destytojas.tMTEP3.tMTEPmenoVeiklPop_planVal = req.body.tMTEPmenoVeiklPop_planVal,
            foundUser.destytojas.tMTEP3.tMTEPmenoVeiklPop_atlVal = req.body.tMTEPmenoVeiklPop_atlVal,
            foundUser.destytojas.tMTEP3.studReng_planVal = req.body.studReng_planVal,
            foundUser.destytojas.tMTEP3.studReng_atlVal = req.body.studReng_atlVal,
            foundUser.destytojas.tMTEP3.kitaVeikl_planVal = req.body.kitaVeikl_planVal,
            foundUser.destytojas.tMTEP3.kitaVeikl_atlVal = req.body.kitaVeikl_atlVal,
            foundUser.destytojas.tMTEP3.isVisoValPlan = req.body.tMTEP3isVisoValPlan,
            foundUser.destytojas.tMTEP3.isVisoValAtl = req.body.tMTEP3isVisoValAtl,
            foundUser.destytojas.tMTEP3.priezastys = req.body.tMTEP3priezastys
          // 10 lentelė create
          for (let i = 1; i <= parseInt(req.body.table10_name); i++) {
            foundUser.destytojas.tMTEP3_T01.push({
              nr: eval(tMTEP3_T01nrcommand + i),
              tyrTemat: eval(tyrTematcommand + i),
              tyrGrup: eval(tyrGrupcommand + i),
              mokslSrit: eval(tMTEP3_T01mokslSritcommand + i),
              mokslKrypt: eval(tMTEP3_T01mokslKryptcommand + i)
            })
          } // 11 lentelė create
          for (let i = 1; i <= parseInt(req.body.table11_name); i++) {
            foundUser.destytojas.tMTEP3_T02.push({
              nr: eval(tMTEP3_T02nrcommand + i),
              bibliografApr: eval(tMTEP3_T02bibliografAprcommand + i),
              tipas: eval(tMTEP3_T02tipascommand + i),
              mokslSrit: eval(tMTEP3_T02mokslSritcommand + i),
              mokslKrypt: eval(tMTEP3_T02mokslKryptcommand + i),
              duomBaze: eval(tMTEP3_T02duomBazecommand + i)
            })
          } // 12 lentelė create
          for (let i = 1; i <= parseInt(req.body.table12_name); i++) {
            foundUser.destytojas.tMTEP3_T03.push({
              nr: eval(tMTEP3_T03nrcommand + i),
              pilnasBiblApr: eval(tMTEP3_T03pilnasBiblAprcommand + i),
              rengTipas: eval(tMTEP3_T03rengTipascommand + i)
            })
          } // 13 lentelė create
          for (let i = 1; i <= parseInt(req.body.table13_name); i++) {
            foundUser.destytojas.tMTEP3_T04.push({
              nr: eval(tMTEP3_T04nrcommand + i),
              uzsakovas: eval(tMTEP3_T04uzsakovascommand + i),
              tema: eval(tMTEP3_T04temacommand + i),
              data: eval(tMTEP3_T04datacommand + i),
              atlygArNe: eval(tMTEP3_T04atlygArNecommand + i)
            })
          } // 14.1 lentelė create
          for (let i = 1; i <= parseInt(req.body.table141_name); i++) {
            foundUser.destytojas.tMTEP3_T05.push({
              nr: eval(tMTEP3_T05nrcommand + i),
              veiklPavad: eval(tMTEP3_T05veiklPavadcommand + i),
              veiklRezult: eval(tMTEP3_T05veiklRezultcommand + i),
              atlygArNe: eval(tMTEP3_T05atlygArNecommand + i)
            })
          } // 14.2 lentelė create
          for (let i = 1; i <= parseInt(req.body.table142_name); i++) {
            foundUser.destytojas.tMTEP3_142.push({
              nr: i,
              pavadinimas: eval(tMTEP3_142pavadinimascommand + i),
              pastabos: eval(tMTEP3_142pastaboscommand + i)
            })
          } // 14.3 lentelė create
          for (let i = 1; i <= parseInt(req.body.table143_name); i++) {
            foundUser.destytojas.tMTEP3_143.push({
              nr: i,
              pavadinimas: eval(tMTEP3_143pavadinimascommand + i),
              uzsakovas: eval(tMTEP3_143uzsakovascommand + i)
            })
          } // 15 lentelė create
          for (let i = 1; i <= parseInt(req.body.table15_name); i++) {
            foundUser.destytojas.tMTEP3_T06.push({
              nr: i,
              autorius: eval(tMTEP3_T06autoriuscommand + i),
              menoSrit: eval(tMTEP3_T06menoSritcommand + i),
              pobudis: eval(tMTEP3_T06pobudiscommand + i),
              realizVieta: eval(tMTEP3_T06realizVietacommand + i),
              data: eval(tMTEP3_T06datacommand + i),
              atlygArNe: eval(tMTEP3_T06atlygArNecommand + i)
            })
          } // 16 lentelė create
          for (let i = 1; i <= parseInt(req.body.table16_name); i++) {
            foundUser.destytojas.tMTEP3_T07.push({
              nr: eval(tMTEP3_T07nrcommand + i),
              menoSrit: eval(tMTEP3_T07menoSritcommand + i),
              pavadinimas: eval(tMTEP3_T07pavadinimascommand + i),
              atlikVieta: eval(tMTEP3_T07atlikVietacommand + i),
              data: eval(tMTEP3_T07datacommand + i),
              atlygArNe: eval(tMTEP3_T07atlygArNecommand + i)
            })
          } // 17 lentelė create
          for (let i = 1; i <= parseInt(req.body.table17_name); i++) {
            foundUser.destytojas.tMTEP3_T08.push({
              nr: eval(tMTEP3_T08Snrcommand + i),
              menoSrit: eval(tMTEP3_T08menoSritcommand + i),
              pavadinimas: eval(tMTEP3_T08pavadinimascommand + i),
              atlikVieta: eval(tMTEP3_T08atlikVietacommand + i),
              data: eval(tMTEP3_T08datacommand + i),
              atlygArNe: eval(tMTEP3_T08atlygArNecommand + i)
            })
          } // 18 lentelė create
          for (let i = 1; i <= parseInt(req.body.table18_name); i++) {
            foundUser.destytojas.tMTEP3_T09.push({
              nr: eval(tMTEP3_T09nrcommand + i),
              menoSrit: eval(tMTEP3_T09menoSritcommand + i),
              pavadinimas: eval(tMTEP3_T09pavadinimascommand + i),
              atlikVieta: eval(tMTEP3_T09atlikVietacommand + i),
              data: eval(tMTEP3_T09datacommand + i),
              atlygArNe: eval(tMTEP3_T09atlygArNecommand + i)
            })
          } // 19 lentelė create
          for (let i = 1; i <= parseInt(req.body.table19_name); i++) {
            foundUser.destytojas.tMTEP3_T10.push({
              nr: eval(tMTEP3_T10nrcommand + i),
              veiklPobud: eval(tMTEP3_T10veiklPobudcommand + i),
              veiklTiksl: eval(tMTEP3_T10veiklTikslcommand + i),
              dataVieta: eval(tMTEP3_T10dataVietacommand + i),
              dalyvSk: eval(tMTEP3_T10dalyvSkcommand + i),
              ktKomentarai: eval(tMTEP3_T10ktKomentaraicommand + i),
              atlygArNe: eval(tMTEP3_T10atlygArNecommand + i)
            })
          } // 20 lentelė create
          for (let i = 1; i <= parseInt(req.body.table20_name); i++) {
            foundUser.destytojas.tMTEP3_T11.push({
              nr: eval(tMTEP3_T11nrcommand + i),
              veiklPobud: eval(tMTEP3_T11veiklPobudcommand + i),
              veiklTiksl: eval(tMTEP3_T11veiklTikslcommand + i),
              dataVieta: eval(tMTEP3_T11dataVietacommand + i),
              dalyvSk: eval(tMTEP3_T11dalyvSkcommand + i),
              ktKomentarai: eval(tMTEP3_T11ktKomentaraicommand + i),
              atlygArNe: eval(tMTEP3_T11atlygArNecommand + i)
            })
          } // 21 lentelė create
          for (let i = 1; i <= parseInt(req.body.table21_name); i++) {
            foundUser.destytojas.tMTEP3_T12.push({
              nr: eval(tMTEP3_T12nrcommand + i),
              veiklPobud: eval(tMTEP3_T12veiklPobudcommand + i),
              dataVieta: eval(tMTEP3_T12dataVietacommand + i)
            })
          } // 22 lentelė create
          for (let i = 1; i <= parseInt(req.body.table22_name); i++) {
            foundUser.destytojas.tMTEP3_T13.push({
              nr: eval(tMTEP3_T13nrcommand + i),
              studDuom: eval(tMTEP3_T13studDuomcommand + i),
              renginioPavad: eval(tMTEP3_T13renginioPavadcommand + i),
              rezultatas: eval(tMTEP3_T13rezultatascommand + i),
              data: eval(tMTEP3_T13datacommand + i)
            })
          } // 23 lentelė create
          for (let i = 1; i <= parseInt(req.body.table23_name); i++) {
            foundUser.destytojas.tMTEP3_T14.push({
              nr: eval(tMTEP3_T14nrcommand + i),
              renginys: eval(tMTEP3_T14renginyscommand + i),
              veiklPobud: eval(tMTEP3_T14veiklPobudcommand + i),
              dataVieta: eval(tMTEP3_T14dataVietacommand + i)
            })
          } // savianalize
          for (let i = 1; i <= parseInt(req.body.tableTMTEP3_S_name); i++) {
            foundUser.destytojas.tMTEP3_S.push({
              nr: eval(tMTEP3_Snrcommand + i),
              stiprybes: eval(tMTEP3_Sstiprybescommand + i),
              tobulintina: eval(tMTEP3_Stobulintinacommand + i)
            })
          }
          foundUser.destytojas.kTOV4.kompTobulinimas_planVal = req.body.kTOV4kompTobulinimas_planVal,
            foundUser.destytojas.kTOV4.kompTobulinimas_atlVal = req.body.kTOV4kompTobulinimas_atlVal,
            foundUser.destytojas.kTOV4.organizacVeikl_planVal = req.body.kTOV4organizacVeikl_planVal,
            foundUser.destytojas.kTOV4.organizacVeikl_atlVal = req.body.kTOV4organizacVeikl_atlVal,
            foundUser.destytojas.kTOV4.isVisoValPlan = req.body.kTOV4isVisoValPlan,
            foundUser.destytojas.kTOV4.isVisoValAtl = req.body.kTOV4isVisoValAtl,
            foundUser.destytojas.kTOV4.priezastys = req.body.kTOV4priezastys
          // 24 lentelė create
          //mokymosi
          for (let i = 1; i <= parseInt(req.body.table241_name); i++) {
            foundUser.destytojas.kTOV4_KV01.kompetencijos.mokymosi.push({
              pavadinimas: eval(kTOV4_mokymopavadcommand + i),
              pazymNr: eval(kTOV4_mokymopazymNrcommand + i),
              trukmeValLT: eval(kTOV4_mokymotrukmeValLTcommand + i),
              trukmeValNeLT: eval(kTOV4_mokymotrukmeValNeLTcommand + i)
            })
            foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoMokymosiKomp = true
          } // tyrimu
          for (let i = 1; i <= parseInt(req.body.table242_name); i++) {
            foundUser.destytojas.kTOV4_KV01.kompetencijos.tyrimu.push({
              pavadinimas: eval(kTOV4_tyrimupavadcommand + i),
              pazymNr: eval(kTOV4_tyrimupazymNrcommand + i),
              trukmeValLT: eval(kTOV4_tyrimutrukmeValLTcommand + i),
              trukmeValNeLT: eval(kTOV4_tyrimutrukmeValNeLTcommand + i)
            })
            foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoTyrimuKomp = true
          } //bendrosios
          for (let i = 1; i <= parseInt(req.body.table243_name); i++) {
            foundUser.destytojas.kTOV4_KV01.kompetencijos.bendrosios.push({
              pavadinimas: eval(kTOV4_bendrosiospavadcommand + i),
              pazymNr: eval(kTOV4_bendrosiospazymNrcommand + i),
              trukmeValLT: eval(kTOV4_bendrosiostrukmeValLTcommand + i),
              trukmeValNeLT: eval(kTOV4_bendrosiostrukmeValNeLTcommand + i)
            })
            foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoBendrKomp = true
          } //dalykines
          for (let i = 1; i <= parseInt(req.body.table244_name); i++) {
            foundUser.destytojas.kTOV4_KV01.kompetencijos.dalykines.push({
              pavadinimas: eval(kTOV4_dalykpavadcommand + i),
              pazymNr: eval(kTOV4_dalykpazymNrcommand + i),
              trukmeValLT: eval(kTOV4_dalyktrukmeValLTcommand + i),
              trukmeValNeLT: eval(kTOV4_dalyktrukmeValNeLTcommand + i)
            })
            foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoDalykKomp = true
          }
          foundUser.destytojas.kTOV4_KV01.kompetencijos.isVisoValLT = req.body.kTOV4_trukmeValLT,
            foundUser.destytojas.kTOV4_KV01.kompetencijos.isVisoValNeLT = req.body.kTOV4_trukmeValNeLT
          // 25 lentelė create
          for (let i = 1; i <= parseInt(req.body.table25_name); i++) {
            foundUser.destytojas.kTOV4_25.push({
              nr: i,
              renginysTema: eval(kTOV4_25renginysTemacommand + i),
              kompGrupe: eval(kTOV4_25kompGrupecommand + i),
              skirta: eval(kTOV4_25skirtacommand + i)
            })
          } // 26 lentelė create
          for (let i = 1; i <= parseInt(req.body.table26_name); i++) {
            foundUser.destytojas.kTOV4_26.push({
              nr: i,
              imonIstaig: eval(kTOV4_26imonIstaigcommand + i),
              kompGrupe: eval(kTOV4_26kompGrupecommand + i),
              trukmeVal: eval(kTOV4_26trukmeValcommand + i),
              data: eval(kTOV4_26datacommand + i)
            })
          } // 27 lentelė create
          for (let i = 1; i <= parseInt(req.body.table27_name); i++) {
            foundUser.destytojas.kTOV4_KV03.push({
              nr: eval(kTOV4_KV03nrcommand + i),
              studKryptis: eval(kTOV4_KV03studKryptiscommand + i),
              salis: eval(kTOV4_KV03saliscommand + i),
              institucija: eval(kTOV4_KV03institucijacommand + i),
              dalykas: eval(kTOV4_KV03dalykascommand + i)
            })
          } // 28.1 lentelė create
          for (let i = 1; i <= parseInt(req.body.table281_name); i++) {
            foundUser.destytojas.kTOV4_O01.kTOV4_O01_1.push({
              nr: eval(kTOV4_O01_1nrcommand + i),
              veiklPobud: eval(kTOV4_O01_1veiklPobudcommand + i),
              isakNrData: eval(kTOV4_O01_1isakNrDatacommand + i)
            })
          } // 28.2 lentelė create
          for (let i = 1; i <= parseInt(req.body.table282_name); i++) {
            foundUser.destytojas.kTOV4_O01.kTOV4_O01_2.push({
              nr: eval(kTOV4_O01_2nrcommand + i),
              destytojas: eval(kTOV4_O01_2destytojascommand + i),
              veiklPobud: eval(kTOV4_O01_2veiklPobudcommand + i),
              dataVieta: eval(kTOV4_O01_2dataVietacommand + i),
              ktKomentarai: eval(kTOV4_O01_2ktKomentaraicommand + i)
            })
          } // 29 lentelė create
          for (let i = 1; i <= parseInt(req.body.table29_name); i++) {
            foundUser.destytojas.kTOV4_29.push({
              nr: i,
              veikla: eval(kTOV4_29veiklacommand + i),
              socPartneris: eval(kTOV4_29socPartneriscommand + i)
            })
          } // savianalize
          for (let i = 1; i <= parseInt(req.body.tablekTOV4_S_name); i++) {
            foundUser.destytojas.kTOV4_S.push({
              nr: eval(kTOV4_Snrcommand + i),
              stiprybes: eval(kTOV4_Sstiprybescommand + i),
              tobulintina: eval(kTOV4_Stobulintinacommand + i)
            })
          } // 30 lentelė create
          for (let i = 1; i <= parseInt(req.body.table30_name); i++) {
            foundUser.destytojas.kV5_KT02.push({
              nr: eval(kV5_KT02nrcommand + i),
              studKryptis: eval(kV5_KT02studKryptiscommand + i),
              diplomantas: eval(kV5_KT02diplomantascommand + i),
              studProgr: eval(kV5_KT02studProgrcommand + i),
              darboTema: eval(kV5_KT02darboTemacommand + i)
            })
          } // 31 lentelė create
          for (let i = 1; i <= parseInt(req.body.table31_name); i++) {
            foundUser.destytojas.kV5_KT01.push({
              nr: eval(kV5_KT01nrcommand + i),
              studKryptis: eval(kV5_KT01studKryptiscommand + i),
              diplomantas: eval(kV5_KT01diplomantascommand + i),
              studProgr: eval(kV5_KT01studProgrcommand + i),
              darboTema: eval(kV5_KT01darboTemacommand + i),
              uzsakovas: eval(kV5_KT01uzsakovascommand + i)
            })
          }
          // 32 lentelė create
          for (let i = 1; i <= parseInt(req.body.table321_name); i++) {
            foundUser.destytojas.kV5_32.socAtskMaz.push({
              aprasymas: eval(kV5_32socaprasymascommand + i)
            })
          }
          for (let i = 1; i <= parseInt(req.body.table322_name); i++) {
            foundUser.destytojas.kV5_32.aplinkosaugInic.push({
              aprasymas: eval(kV5_32aplinkaprasymascommand + i)
            })
          }
          for (let i = 1; i <= parseInt(req.body.table323_name); i++) {
            foundUser.destytojas.kV5_32.lietValstybPuosel.push({
              aprasymas: eval(kV5_32valstybaprasymascommand + i)
            })
          }
          for (let i = 1; i <= parseInt(req.body.table324_name); i++) {
            foundUser.destytojas.kV5_32.lietEtnokPuos.push({
              aprasymas: eval(kV5_32etnoaprasymascommand + i)
            })
          }
          for (let i = 1; i <= parseInt(req.body.table325_name); i++) {
            foundUser.destytojas.kV5_32.savanorystIniciatyv.push({
              aprasymas: eval(kV5_32savaprasymascommand + i)
            })
          } // 33 lentelė create
          for (let i = 1; i <= parseInt(req.body.table33_name); i++) {
            foundUser.destytojas.kV5_33.push({
              nr: i,
              veikla: eval(kV5_33veiklacommand + i),
              veiklPartner: eval(kV5_33veiklPartnercommand + i),
              organizac: eval(kV5_33organizaccommand + i),
              veiklOrientavim: eval(kV5_33veiklOrientavimcommand + i),
              dalyviai: eval(kV5_33dalyviaicommand + i),
              laikas: eval(kV5_33laikascommand + i),
              vieta: eval(kV5_33vietacommand + i)
            })
          } // 34 lentelė create
          for (let i = 1; i <= parseInt(req.body.table34_name); i++) {
            foundUser.destytojas.kV5_34.push({
              nr: i,
              pavadinimas: eval(kV5_34pavadinimascommand + i),
              vykdytPartner: eval(kV5_34vykdytPartnercommand + i),
              dalyviai: eval(kV5_34dalyviaicommand + i),
              finansavim: eval(kV5_34finansavimcommand + i),
              rezultatai: eval(kV5_34rezultataicommand + i),
              salisData: eval(kV5_34salisDatacommand + i)
            })
          }
          foundUser.destytojas.kV5_kitaInfo = req.body.kV5_kitaInfo,
            foundUser.updated_for = req.user.username,
            foundUser.busena = req.body.ataskaitos_busena

          foundUser.save(function(err) {
            if (!err) {
              console.log("Succesfully created");
              res.redirect("/user-window");
            } else {
              console.log(err);
            }
          });
        } else {
          console.log("User does'f found");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/create", function(req, res) {

  if (req.isAuthenticated()) {

    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        res.render("create", {
          user: foundUser
        });
      }
    });

  } else {
    res.redirect("/login");
  }
});

app.get("/edit", function(req, res) {
  if (req.isAuthenticated()) {

    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log("Error...");
        console.log(err);
      } else {
        if (foundUser.role === "dėstytojas") {
          res.render("edit", {
            user: foundUser
          });
        } else {
          console.log("User role unknown");
          console.log(foundUser.role);
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.post("/update", (req, res) => {

  User.findById(req.user.id, function(err, foundUser) {
    if (err) {
      console.log("Error...");
      console.log(err);

    } else {
      if (foundUser) {
        // 2 lent
        var nrcommand = "req.body.nr";
        var dalykascommand = "req.body.dalykas";
        var grupecommand = "req.body.grupe";
        var semestrascommand = "req.body.semestras";
        var planuotosValcommand = "req.body.planuotosVal";
        var atliktosValcommand = "req.body.atliktosVal";
        // 3 lent
        var nD2_M02nrcommand = "req.body.nD2_M02nr";
        var bibliografAprcommand = "req.body.bibliografApr";
        var tipascommand = "req.body.tipas";
        var mokslSritcommand = "req.body.mokslSrit";
        var mokslKryptcommand = "req.body.mokslKrypt";
        // 4 lent
        var nD2_M04nrcommand = "req.body.nD2_M04nr";
        var nD2_M04studProgrcommand = "req.body.nD2_M04studProgr";
        var nD2_M04dalykPavadcommand = "req.body.nD2_M04dalykPavad";
        var nD2_M04busenacommand = "req.body.nD2_M04busena";
        var nD2_M04apimtisKreditcommand = "req.body.nD2_M04apimtisKredit";
        // 5 lent
        var nD2_D01nrcommand = "req.body.nD2_D01nr";
        var nD2_D01komitetascommand = "req.body.nD2_D01komitetas";
        var nD2_D01veiklacommand = "req.body.nD2_D01veikla";
        var nD2_D01rezultataicommand = "req.body.nD2_D01rezultatai";
        // 6 lent
        var nD2_D02nrcommand = "req.body.nD2_D02nr";
        var nD2_D02studKryptcommand = "req.body.nD2_D02studKrypt";
        var nD2_D02veiklacommand = "req.body.nD2_D02veikla";
        var nD2_D02rezultataicommand = "req.body.nD2_D02rezultatai";
        // 7 lent
        var nD2_D03nrcommand = "req.body.nD2_D03nr";
        var nD2_D03studProgrcommand = "req.body.nD2_D03studProgr";
        var nD2_D03veiklacommand = "req.body.nD2_D03veikla";
        var nD2_D03rezultataicommand = "req.body.nD2_D03rezultatai";
        var nD2_D03studKryptiscommand = "req.body.nD2_D03studKryptis";
        // 8 lent
        var nD2_M03nrcommand = "req.body.nD2_M03nr";
        var nD2_M03studProgrcommand = "req.body.nD2_M03studProgr";
        var nD2_M03dalykPavadcommand = "req.body.nD2_M03dalykPavad";
        var nD2_M03apimtisKreditcommand = "req.body.nD2_M03apimtisKredit";
        // 9 lent
        var nD2_S01nrcommand = "req.body.nD2_S01nr";
        var nD2_S01veiklacommand = "req.body.nD2_S01veikla";
        var nD2_S01dataVietacommand = "req.body.nD2_S01dataVieta";
        // savianalize
        var nD2_Snrcommand = "req.body.nD2_Snr";
        var nD2_Sstiprybescommand = "req.body.nD2_Sstiprybes";
        var nD2_Stobulintinacommand = "req.body.nD2_Stobulintina";
        // 10 lent
        var tMTEP3_T01nrcommand = "req.body.tMTEP3_T01nr";
        var tyrTematcommand = "req.body.tyrTemat";
        var tyrGrupcommand = "req.body.tyrGrup";
        var tMTEP3_T01mokslSritcommand = "req.body.tMTEP3_T01mokslSrit";
        var tMTEP3_T01mokslKryptcommand = "req.body.tMTEP3_T01mokslKrypt";
        // 11 lent
        var tMTEP3_T02nrcommand = "req.body.tMTEP3_T02nr";
        var tMTEP3_T02bibliografAprcommand = "req.body.tMTEP3_T02bibliografApr";
        var tMTEP3_T02tipascommand = "req.body.tMTEP3_T02tipas";
        var tMTEP3_T02mokslSritcommand = "req.body.tMTEP3_T02mokslSrit";
        var tMTEP3_T02mokslKryptcommand = "req.body.tMTEP3_T02mokslKrypt";
        var tMTEP3_T02duomBazecommand = "req.body.tMTEP3_T02duomBaze";
        // 12 lent
        var tMTEP3_T03nrcommand = "req.body.tMTEP3_T03nr";
        var tMTEP3_T03pilnasBiblAprcommand = "req.body.tMTEP3_T03pilnasBiblApr";
        var tMTEP3_T03rengTipascommand = "req.body.tMTEP3_T03rengTipas";
        // 13 lent
        var tMTEP3_T04nrcommand = "req.body.tMTEP3_T04nr";
        var tMTEP3_T04uzsakovascommand = "req.body.tMTEP3_T04uzsakovas";
        var tMTEP3_T04temacommand = "req.body.tMTEP3_T04tema";
        var tMTEP3_T04datacommand = "req.body.tMTEP3_T04data";
        var tMTEP3_T04atlygArNecommand = "req.body.tMTEP3_T04atlygArNe";
        // 14.1 lent
        var tMTEP3_T05nrcommand = "req.body.tMTEP3_T05nr";
        var tMTEP3_T05veiklPavadcommand = "req.body.tMTEP3_T05veiklPavad";
        var tMTEP3_T05veiklRezultcommand = "req.body.tMTEP3_T05veiklRezult";
        var tMTEP3_T05atlygArNecommand = "req.body.tMTEP3_T05atlygArNe";
        // 14.2 lent
        var tMTEP3_142pavadinimascommand = "req.body.tMTEP3_142pavadinimas";
        var tMTEP3_142pastaboscommand = "req.body.tMTEP3_142pastabos";
        // 14.3 lent
        var tMTEP3_143pavadinimascommand = "req.body.tMTEP3_143pavadinimas";
        var tMTEP3_143uzsakovascommand = "req.body.tMTEP3_143uzsakovas";
        // 15 lent
        var tMTEP3_T06nrcommand = "req.body.tMTEP3_T06nr";
        var tMTEP3_T06autoriuscommand = "req.body.tMTEP3_T06autorius";
        var tMTEP3_T06menoSritcommand = "req.body.tMTEP3_T06menoSrit";
        var tMTEP3_T06pobudiscommand = "req.body.tMTEP3_T06pobudis";
        var tMTEP3_T06realizVietacommand = "req.body.tMTEP3_T06realizVieta";
        var tMTEP3_T06datacommand = "req.body.tMTEP3_T06data";
        var tMTEP3_T06atlygArNecommand = "req.body.tMTEP3_T06atlygArNe";
        // 16 lent
        var tMTEP3_T07nrcommand = "req.body.tMTEP3_T07nr";
        var tMTEP3_T07menoSritcommand = "req.body.tMTEP3_T07menoSrit";
        var tMTEP3_T07pavadinimascommand = "req.body.tMTEP3_T07pavadinimas";
        var tMTEP3_T07atlikVietacommand = "req.body.tMTEP3_T07atlikVieta";
        var tMTEP3_T07datacommand = "req.body.tMTEP3_T07data";
        var tMTEP3_T07atlygArNecommand = "req.body.tMTEP3_T07atlygArNe";
        // 17 lent
        var tMTEP3_T08Snrcommand = "req.body.tMTEP3_T08Snr";
        var tMTEP3_T08menoSritcommand = "req.body.tMTEP3_T08menoSrit";
        var tMTEP3_T08pavadinimascommand = "req.body.tMTEP3_T08pavadinimas";
        var tMTEP3_T08atlikVietacommand = "req.body.tMTEP3_T08atlikVieta";
        var tMTEP3_T08datacommand = "req.body.tMTEP3_T08data";
        var tMTEP3_T08atlygArNecommand = "req.body.tMTEP3_T08atlygArNe";
        // 18 lent
        var tMTEP3_T09nrcommand = "req.body.tMTEP3_T09nr";
        var tMTEP3_T09menoSritcommand = "req.body.tMTEP3_T09menoSrit";
        var tMTEP3_T09pavadinimascommand = "req.body.tMTEP3_T09pavadinimas";
        var tMTEP3_T09atlikVietacommand = "req.body.tMTEP3_T09atlikVieta";
        var tMTEP3_T09datacommand = "req.body.tMTEP3_T09data";
        var tMTEP3_T09atlygArNecommand = "req.body.tMTEP3_T09atlygArNe";
        // 19 lent
        var tMTEP3_T10nrcommand = "req.body.tMTEP3_T10nr";
        var tMTEP3_T10veiklPobudcommand = "req.body.tMTEP3_T10veiklPobud";
        var tMTEP3_T10veiklTikslcommand = "req.body.tMTEP3_T10veiklTiksl";
        var tMTEP3_T10dataVietacommand = "req.body.tMTEP3_T10dataVieta";
        var tMTEP3_T10dalyvSkcommand = "req.body.tMTEP3_T10dalyvSk";
        var tMTEP3_T10ktKomentaraicommand = "req.body.tMTEP3_T10ktKomentarai";
        var tMTEP3_T10atlygArNecommand = "req.body.tMTEP3_T10atlygArNe";
        // 20 lent
        var tMTEP3_T11nrcommand = "req.body.tMTEP3_T11nr";
        var tMTEP3_T11veiklPobudcommand = "req.body.tMTEP3_T11veiklPobud";
        var tMTEP3_T11veiklTikslcommand = "req.body.tMTEP3_T11veiklTiksl";
        var tMTEP3_T11dataVietacommand = "req.body.tMTEP3_T11dataVieta";
        var tMTEP3_T11dalyvSkcommand = "req.body.tMTEP3_T11dalyvSk";
        var tMTEP3_T11ktKomentaraicommand = "req.body.tMTEP3_T11ktKomentarai";
        var tMTEP3_T11atlygArNecommand = "req.body.tMTEP3_T11atlygArNe";
        // 21 lent
        var tMTEP3_T12nrcommand = "req.body.tMTEP3_T12nr";
        var tMTEP3_T12veiklPobudcommand = "req.body.tMTEP3_T12veiklPobud";
        var tMTEP3_T12dataVietacommand = "req.body.tMTEP3_T12dataVieta";
        // 22 lent
        var tMTEP3_T13nrcommand = "req.body.tMTEP3_T13nr";
        var tMTEP3_T13studDuomcommand = "req.body.tMTEP3_T13studDuom";
        var tMTEP3_T13renginioPavadcommand = "req.body.tMTEP3_T13renginioPavad";
        var tMTEP3_T13rezultatascommand = "req.body.tMTEP3_T13rezultatas";
        var tMTEP3_T13datacommand = "req.body.tMTEP3_T13data";
        // 23 lent
        var tMTEP3_T14nrcommand = "req.body.tMTEP3_T14nr";
        var tMTEP3_T14renginyscommand = "req.body.tMTEP3_T14renginys";
        var tMTEP3_T14veiklPobudcommand = "req.body.tMTEP3_T14veiklPobud";
        var tMTEP3_T14dataVietacommand = "req.body.tMTEP3_T14dataVieta";
        // savianalize
        var tMTEP3_Snrcommand = "req.body.tMTEP3_Snr";
        var tMTEP3_Sstiprybescommand = "req.body.tMTEP3_Sstiprybes";
        var tMTEP3_Stobulintinacommand = "req.body.tMTEP3_Stobulintina";
        // 24 lent
        //mokymosi
        var kTOV4_mokymopavadcommand = "req.body.kTOV4_mokymopavad";
        var kTOV4_mokymopazymNrcommand = "req.body.kTOV4_mokymopazymNr";
        var kTOV4_mokymotrukmeValLTcommand = "req.body.kTOV4_mokymotrukmeValLT";
        var kTOV4_mokymotrukmeValNeLTcommand = "req.body.kTOV4_mokymotrukmeValNeLT";
        // tyrimu
        var kTOV4_tyrimupavadcommand = "req.body.kTOV4_tyrimupavad";
        var kTOV4_tyrimupazymNrcommand = "req.body.kTOV4_tyrimupazymNr";
        var kTOV4_tyrimutrukmeValLTcommand = "req.body.kTOV4_tyrimutrukmeValLT";
        var kTOV4_tyrimutrukmeValNeLTcommand = "req.body.kTOV4_tyrimutrukmeValNeLT";
        //bendrosios
        var kTOV4_bendrosiospavadcommand = "req.body.kTOV4_bendrosiospavad";
        var kTOV4_bendrosiospazymNrcommand = "req.body.kTOV4_bendrosiospazymNr";
        var kTOV4_bendrosiostrukmeValLTcommand = "req.body.kTOV4_bendrosiostrukmeValLT";
        var kTOV4_bendrosiostrukmeValNeLTcommand = "req.body.kTOV4_bendrosiostrukmeValNeLT";
        //dalykines
        var kTOV4_dalykpavadcommand = "req.body.kTOV4_dalykpavad";
        var kTOV4_dalykpazymNrcommand = "req.body.kTOV4_dalykpazymNr";
        var kTOV4_dalyktrukmeValLTcommand = "req.body.kTOV4_dalyktrukmeValLT";
        var kTOV4_dalyktrukmeValNeLTcommand = "req.body.kTOV4_dalyktrukmeValNeLT";
        // 25 lent
        var kTOV4_25renginysTemacommand = "req.body.kTOV4_25renginysTema";
        var kTOV4_25kompGrupecommand = "req.body.kTOV4_25kompGrupe";
        var kTOV4_25skirtacommand = "req.body.kTOV4_25skirta";
        // 26 lent
        var kTOV4_26imonIstaigcommand = "req.body.kTOV4_26imonIstaig";
        var kTOV4_26kompGrupecommand = "req.body.kTOV4_26kompGrupe";
        var kTOV4_26trukmeValcommand = "req.body.kTOV4_26trukmeVal";
        var kTOV4_26datacommand = "req.body.kTOV4_26data";
        // 27 lent
        var kTOV4_KV03nrcommand = "req.body.kTOV4_KV03nr";
        var kTOV4_KV03studKryptiscommand = "req.body.kTOV4_KV03studKryptis";
        var kTOV4_KV03saliscommand = "req.body.kTOV4_KV03salis";
        var kTOV4_KV03institucijacommand = "req.body.kTOV4_KV03institucija";
        var kTOV4_KV03dalykascommand = "req.body.kTOV4_KV03dalykas";
        // 28.1 lent
        var kTOV4_O01_1nrcommand = "req.body.kTOV4_O01_1nr";
        var kTOV4_O01_1veiklPobudcommand = "req.body.kTOV4_O01_1veiklPobud";
        var kTOV4_O01_1isakNrDatacommand = "req.body.kTOV4_O01_1isakNrData";
        // 28.2 lent
        var kTOV4_O01_2nrcommand = "req.body.kTOV4_O01_2nr";
        var kTOV4_O01_2destytojascommand = "req.body.kTOV4_O01_2destytojas";
        var kTOV4_O01_2veiklPobudcommand = "req.body.kTOV4_O01_2veiklPobud";
        var kTOV4_O01_2dataVietacommand = "req.body.kTOV4_O01_2dataVieta";
        var kTOV4_O01_2ktKomentaraicommand = "req.body.kTOV4_O01_2ktKomentarai";
        // 29 lent
        var kTOV4_29veiklacommand = "req.body.kTOV4_29veikla";
        var kTOV4_29socPartneriscommand = "req.body.kTOV4_29socPartneris";
        // savianalize
        var kTOV4_Snrcommand = "req.body.kTOV4_Snr";
        var kTOV4_Sstiprybescommand = "req.body.kTOV4_Sstiprybes";
        var kTOV4_Stobulintinacommand = "req.body.kTOV4_Stobulintina";
        // 30 lent
        var kV5_KT02nrcommand = "req.body.kV5_KT02nr";
        var kV5_KT02studKryptiscommand = "req.body.kV5_KT02studKryptis";
        var kV5_KT02diplomantascommand = "req.body.kV5_KT02diplomantas";
        var kV5_KT02studProgrcommand = "req.body.kV5_KT02studProgr";
        var kV5_KT02darboTemacommand = "req.body.kV5_KT02darboTema";
        // 31 lent
        var kV5_KT01nrcommand = "req.body.kV5_KT01nr";
        var kV5_KT01diplomantascommand = "req.body.kV5_KT01diplomantas";
        var kV5_KT01studProgrcommand = "req.body.kV5_KT01studProgr";
        var kV5_KT01darboTemacommand = "req.body.kV5_KT01darboTema";
        var kV5_KT01uzsakovascommand = "req.body.kV5_KT01uzsakovas";
        var kV5_KT01studKryptiscommand = "req.body.kV5_KT01studKryptis";
        // 32 lent
        var kV5_32socaprasymascommand = "req.body.kV5_32socaprasymas";
        var kV5_32aplinkaprasymascommand = "req.body.kV5_32aplinkaprasymas";
        var kV5_32valstybaprasymascommand = "req.body.kV5_32valstybaprasymas";
        var kV5_32etnoaprasymascommand = "req.body.kV5_32etnoaprasymas";
        var kV5_32savaprasymascommand = "req.body.kV5_32savaprasymas";
        // 33 lent
        var kV5_33veiklacommand = "req.body.kV5_33veikla";
        var kV5_33veiklPartnercommand = "req.body.kV5_33veiklPartner";
        var kV5_33organizaccommand = "req.body.kV5_33organizac";
        var kV5_33veiklOrientavimcommand = "req.body.kV5_33veiklOrientavim";
        var kV5_33dalyviaicommand = "req.body.kV5_33dalyviai";
        var kV5_33laikascommand = "req.body.kV5_33laikas";
        var kV5_33vietacommand = "req.body.kV5_33vieta";
        // 34 lent
        var kV5_34pavadinimascommand = "req.body.kV5_34pavadinimas";
        var kV5_34vykdytPartnercommand = "req.body.kV5_34vykdytPartner";
        var kV5_34dalyviaicommand = "req.body.kV5_34dalyviai";
        var kV5_34finansavimcommand = "req.body.kV5_34finansavim";
        var kV5_34rezultataicommand = "req.body.kV5_34rezultatai";
        var kV5_34salisDatacommand = "req.body.kV5_34salisData";
        //masyvu isvalymas update
        foundUser.destytojas.kD1_K01.kD1_K01_array = new Array();
        foundUser.destytojas.nD2_M02 = new Array();
        foundUser.destytojas.nD2_M03 = new Array();
        foundUser.destytojas.nD2_M04 = new Array();
        foundUser.destytojas.nD2_D01 = new Array();
        foundUser.destytojas.nD2_D02 = new Array();
        foundUser.destytojas.nD2_D03 = new Array();
        foundUser.destytojas.nD2_S01 = new Array();
        foundUser.destytojas.nD2_S = new Array();
        foundUser.destytojas.tMTEP3_T01 = new Array();
        foundUser.destytojas.tMTEP3_T02 = new Array();
        foundUser.destytojas.tMTEP3_T03 = new Array();
        foundUser.destytojas.tMTEP3_T04 = new Array();
        foundUser.destytojas.tMTEP3_T05 = new Array();
        foundUser.destytojas.tMTEP3_142 = new Array();
        foundUser.destytojas.tMTEP3_143 = new Array();
        foundUser.destytojas.tMTEP3_T06 = new Array();
        foundUser.destytojas.tMTEP3_T07 = new Array();
        foundUser.destytojas.tMTEP3_T08 = new Array();
        foundUser.destytojas.tMTEP3_T09 = new Array();
        foundUser.destytojas.tMTEP3_T10 = new Array();
        foundUser.destytojas.tMTEP3_T11 = new Array();
        foundUser.destytojas.tMTEP3_T12 = new Array();
        foundUser.destytojas.tMTEP3_T13 = new Array();
        foundUser.destytojas.tMTEP3_T14 = new Array();
        foundUser.destytojas.tMTEP3_S = new Array();
        //24 lentelė
        foundUser.destytojas.kTOV4_KV01.kompetencijos.mokymosi = new Array();
        foundUser.destytojas.kTOV4_KV01.kompetencijos.tyrimu = new Array();
        foundUser.destytojas.kTOV4_KV01.kompetencijos.bendrosios = new Array();
        foundUser.destytojas.kTOV4_KV01.kompetencijos.dalykines = new Array();
        // UPDATE post. Skaiciui "dalyvavusiu" nustatyti Vedejo ataskaitoje
        foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoMokymosiKomp = false;
        foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoTyrimuKomp = false;
        foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoBendrKomp = false;
        foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoDalykKomp = false;

        foundUser.destytojas.kTOV4_25 = new Array();
        foundUser.destytojas.kTOV4_26 = new Array();
        foundUser.destytojas.kTOV4_KV03 = new Array();
        foundUser.destytojas.kTOV4_O01.kTOV4_O01_1 = new Array();
        foundUser.destytojas.kTOV4_O01.kTOV4_O01_2 = new Array();
        foundUser.destytojas.kTOV4_29 = new Array();
        foundUser.destytojas.kTOV4_S = new Array();
        foundUser.destytojas.kV5_KT01 = new Array();
        foundUser.destytojas.kV5_KT02 = new Array();

        //32 lentelė
        foundUser.destytojas.kV5_32.socAtskMaz = new Array();
        foundUser.destytojas.kV5_32.aplinkosaugInic = new Array();
        foundUser.destytojas.kV5_32.lietValstybPuosel = new Array();
        foundUser.destytojas.kV5_32.lietEtnokPuos = new Array();
        foundUser.destytojas.kV5_32.savanorystIniciatyv = new Array();

        foundUser.destytojas.kV5_33 = new Array();
        foundUser.destytojas.kV5_34 = new Array();

        // 2 lentelė update
        for (let i = 1; i <= parseInt(req.body.table2_name); i++) {
          foundUser.destytojas.kD1_K01.kD1_K01_array.push({
            nr: eval(nrcommand + i),
            dalykas: eval(dalykascommand + i),
            grupe: eval(grupecommand + i),
            semestras: eval(semestrascommand + i),
            planuotosVal: eval(planuotosValcommand + i),
            atliktosVal: eval(atliktosValcommand + i)
          })
        }
        foundUser.destytojas.kD1_K01.isVisoValPlan = req.body.kD1_K01isVisoValPlan,
          foundUser.destytojas.kD1_K01.isVisoValAtl = req.body.kD1_K01isVisoValAtl,
          foundUser.destytojas.kD1_K01.isJuSrautaisValPlan = req.body.isJuSrautaisValPlan,
          foundUser.destytojas.kD1_K01.isJuSrautaisValAtl = req.body.isJuSrautaisValAtl,
          foundUser.destytojas.kD1_K01.isJuUzsienioValPlan = req.body.isJuUzsienioValPlan,
          foundUser.destytojas.kD1_K01.isJuUzsienioValAtl = req.body.isJuUzsienioValAtl,
          foundUser.destytojas.kD1_K01.priezastys = req.body.kD1_K01priezastys,

          foundUser.destytojas.nD2.nekSuStud_planVal = req.body.nekSuStud_planVal,
          foundUser.destytojas.nD2.nekSuStud_atlVal = req.body.nekSuStud_atlVal,
          foundUser.destytojas.nD2.pasirengDest_planVal = req.body.pasirengDest_planVal,
          foundUser.destytojas.nD2.pasirengDest_atlVal = req.body.pasirengDest_atlVal,
          foundUser.destytojas.nD2.metod_planVal = req.body.metod_planVal,
          foundUser.destytojas.nD2.metod_atlVal = req.body.metod_atlVal,
          foundUser.destytojas.nD2.dalyvSPKUV_planVal = req.body.dalyvSPKUV_planVal,
          foundUser.destytojas.nD2.dalyvSPKUV_atlVal = req.body.dalyvSPKUV_atlVal,
          foundUser.destytojas.nD2.studPop_planVal = req.body.studPop_planVal,
          foundUser.destytojas.nD2.studPop_atlVal = req.body.studPop_atlVal,
          foundUser.destytojas.nD2.isVisoValPlan = req.body.nD2isVisoValPlan,
          foundUser.destytojas.nD2.isVisoValAtl = req.body.nD2isVisoValAtl,
          foundUser.destytojas.nD2.priezastys = req.body.nD2priezastys
        // 3 lentelė update
        for (let i = 1; i <= parseInt(req.body.table3_name); i++) {
          foundUser.destytojas.nD2_M02.push({
            nr: eval(nrcommand + i),
            bibliografApr: eval(bibliografAprcommand + i),
            tipas: eval(tipascommand + i),
            mokslSrit: eval(mokslSritcommand + i),
            mokslKrypt: eval(mokslKryptcommand + i)
          })
        } // 4 lentelė update
        for (let i = 1; i <= parseInt(req.body.table4_name); i++) {
          foundUser.destytojas.nD2_M04.push({
            nr: eval(nD2_M04nrcommand + i),
            studProgr: eval(nD2_M04studProgrcommand + i),
            dalykPavad: eval(nD2_M04dalykPavadcommand + i),
            busena: eval(nD2_M04busenacommand + i),
            apimtisKredit: eval(nD2_M04apimtisKreditcommand + i)
          })
        } // 5 lentelė update
        for (let i = 1; i <= parseInt(req.body.table5_name); i++) {
          foundUser.destytojas.nD2_D01.push({
            nr: eval(nD2_D01nrcommand + i),
            komitetas: eval(nD2_D01komitetascommand + i),
            veikla: eval(nD2_D01veiklacommand + i),
            rezultatai: eval(nD2_D01rezultataicommand + i)
          })
        } // 6 lentelė update
        for (let i = 1; i <= parseInt(req.body.table6_name); i++) {
          foundUser.destytojas.nD2_D02.push({
            nr: eval(nD2_D02nrcommand + i),
            studKryptis: eval(nD2_D02studKryptcommand + i),
            veikla: eval(nD2_D02veiklacommand + i),
            rezultatai: eval(nD2_D02rezultataicommand + i)
          })
        } // 7 lentelė update
        for (let i = 1; i <= parseInt(req.body.table7_name); i++) {
          foundUser.destytojas.nD2_D03.push({
            nr: eval(nD2_D03nrcommand + i),
            studKryptis: eval(nD2_D03studKryptiscommand + i),
            studProgr: eval(nD2_D03studProgrcommand + i),
            veikla: eval(nD2_D03veiklacommand + i),
            rezultatai: eval(nD2_D03rezultataicommand + i)
          })
        } // 8 lentelė update
        for (let i = 1; i <= parseInt(req.body.table8_name); i++) {
          foundUser.destytojas.nD2_M03.push({
            nr: eval(nD2_M03nrcommand + i),
            studProgr: eval(nD2_M03studProgrcommand + i),
            dalykPavad: eval(nD2_M03dalykPavadcommand + i),
            apimtisKredit: eval(nD2_M03apimtisKreditcommand + i)
          })
        } // 9 lentelė update
        for (let i = 1; i <= parseInt(req.body.table9_name); i++) {
          foundUser.destytojas.nD2_S01.push({
            nr: eval(nD2_S01nrcommand + i),
            veikla: eval(nD2_S01veiklacommand + i),
            dataVieta: eval(nD2_S01dataVietacommand + i)
          })
        } // savianalize
        for (let i = 1; i <= parseInt(req.body.tablenD2_S_name); i++) {
          foundUser.destytojas.nD2_S.push({
            nr: eval(nD2_Snrcommand + i),
            stiprybes: eval(nD2_Sstiprybescommand + i),
            tobulintina: eval(nD2_Stobulintinacommand + i)
          })
        }
        foundUser.destytojas.tMTEP3.tMTEPveiklRez_planVal = req.body.tMTEPveiklRez_planVal,
          foundUser.destytojas.tMTEP3.tMTEPveiklRez_atlVal = req.body.tMTEPveiklRez_atlVal,
          foundUser.destytojas.tMTEP3.menoVeikl_planVal = req.body.menoVeikl_planVal,
          foundUser.destytojas.tMTEP3.menoVeikl_atlVal = req.body.menoVeikl_atlVal,
          foundUser.destytojas.tMTEP3.tMTEPmenoVeiklPop_planVal = req.body.tMTEPmenoVeiklPop_planVal,
          foundUser.destytojas.tMTEP3.tMTEPmenoVeiklPop_atlVal = req.body.tMTEPmenoVeiklPop_atlVal,
          foundUser.destytojas.tMTEP3.studReng_planVal = req.body.studReng_planVal,
          foundUser.destytojas.tMTEP3.studReng_atlVal = req.body.studReng_atlVal,
          foundUser.destytojas.tMTEP3.kitaVeikl_planVal = req.body.kitaVeikl_planVal,
          foundUser.destytojas.tMTEP3.kitaVeikl_atlVal = req.body.kitaVeikl_atlVal,
          foundUser.destytojas.tMTEP3.isVisoValPlan = req.body.tMTEP3isVisoValPlan,
          foundUser.destytojas.tMTEP3.isVisoValAtl = req.body.tMTEP3isVisoValAtl,
          foundUser.destytojas.tMTEP3.priezastys = req.body.tMTEP3priezastys
        // 10 lentelė update
        for (let i = 1; i <= parseInt(req.body.table10_name); i++) {
          foundUser.destytojas.tMTEP3_T01.push({
            nr: eval(tMTEP3_T01nrcommand + i),
            tyrTemat: eval(tyrTematcommand + i),
            tyrGrup: eval(tyrGrupcommand + i),
            mokslSrit: eval(tMTEP3_T01mokslSritcommand + i),
            mokslKrypt: eval(tMTEP3_T01mokslKryptcommand + i)
          })
        } // 11 lentelė update
        for (let i = 1; i <= parseInt(req.body.table11_name); i++) {
          foundUser.destytojas.tMTEP3_T02.push({
            nr: eval(tMTEP3_T02nrcommand + i),
            bibliografApr: eval(tMTEP3_T02bibliografAprcommand + i),
            tipas: eval(tMTEP3_T02tipascommand + i),
            mokslSrit: eval(tMTEP3_T02mokslSritcommand + i),
            mokslKrypt: eval(tMTEP3_T02mokslKryptcommand + i),
            duomBaze: eval(tMTEP3_T02duomBazecommand + i)
          })
        } // 12 lentelė update
        for (let i = 1; i <= parseInt(req.body.table12_name); i++) {
          foundUser.destytojas.tMTEP3_T03.push({
            nr: eval(tMTEP3_T03nrcommand + i),
            pilnasBiblApr: eval(tMTEP3_T03pilnasBiblAprcommand + i),
            rengTipas: eval(tMTEP3_T03rengTipascommand + i)
          })
        } // 13 lentelė update
        for (let i = 1; i <= parseInt(req.body.table13_name); i++) {
          foundUser.destytojas.tMTEP3_T04.push({
            nr: eval(tMTEP3_T04nrcommand + i),
            uzsakovas: eval(tMTEP3_T04uzsakovascommand + i),
            tema: eval(tMTEP3_T04temacommand + i),
            data: eval(tMTEP3_T04datacommand + i),
            atlygArNe: eval(tMTEP3_T04atlygArNecommand + i)
          })
        } // 14.1 lentelė update
        for (let i = 1; i <= parseInt(req.body.table141_name); i++) {
          foundUser.destytojas.tMTEP3_T05.push({
            nr: eval(tMTEP3_T05nrcommand + i),
            veiklPavad: eval(tMTEP3_T05veiklPavadcommand + i),
            veiklRezult: eval(tMTEP3_T05veiklRezultcommand + i),
            atlygArNe: eval(tMTEP3_T05atlygArNecommand + i)
          })
        } // 14.2 lentelė update
        for (let i = 1; i <= parseInt(req.body.table142_name); i++) {
          foundUser.destytojas.tMTEP3_142.push({
            nr: i,
            pavadinimas: eval(tMTEP3_142pavadinimascommand + i),
            pastabos: eval(tMTEP3_142pastaboscommand + i)
          })
        } // 14.3 lentelė update
        for (let i = 1; i <= parseInt(req.body.table143_name); i++) {
          foundUser.destytojas.tMTEP3_143.push({
            nr: i,
            pavadinimas: eval(tMTEP3_143pavadinimascommand + i),
            uzsakovas: eval(tMTEP3_143uzsakovascommand + i)
          })
        } // 15 lentelė update
        for (let i = 1; i <= parseInt(req.body.table15_name); i++) {
          foundUser.destytojas.tMTEP3_T06.push({
            nr: i,
            autorius: eval(tMTEP3_T06autoriuscommand + i),
            menoSrit: eval(tMTEP3_T06menoSritcommand + i),
            pobudis: eval(tMTEP3_T06pobudiscommand + i),
            realizVieta: eval(tMTEP3_T06realizVietacommand + i),
            data: eval(tMTEP3_T06datacommand + i),
            atlygArNe: eval(tMTEP3_T06atlygArNecommand + i)
          })
        } // 16 lentelė update
        for (let i = 1; i <= parseInt(req.body.table16_name); i++) {
          foundUser.destytojas.tMTEP3_T07.push({
            nr: eval(tMTEP3_T07nrcommand + i),
            menoSrit: eval(tMTEP3_T07menoSritcommand + i),
            pavadinimas: eval(tMTEP3_T07pavadinimascommand + i),
            atlikVieta: eval(tMTEP3_T07atlikVietacommand + i),
            data: eval(tMTEP3_T07datacommand + i),
            atlygArNe: eval(tMTEP3_T07atlygArNecommand + i)
          })
        } // 17 lentelė update
        for (let i = 1; i <= parseInt(req.body.table17_name); i++) {
          foundUser.destytojas.tMTEP3_T08.push({
            nr: eval(tMTEP3_T08Snrcommand + i),
            menoSrit: eval(tMTEP3_T08menoSritcommand + i),
            pavadinimas: eval(tMTEP3_T08pavadinimascommand + i),
            atlikVieta: eval(tMTEP3_T08atlikVietacommand + i),
            data: eval(tMTEP3_T08datacommand + i),
            atlygArNe: eval(tMTEP3_T08atlygArNecommand + i)
          })
        } // 18 lentelė update
        for (let i = 1; i <= parseInt(req.body.table18_name); i++) {
          foundUser.destytojas.tMTEP3_T09.push({
            nr: eval(tMTEP3_T09nrcommand + i),
            menoSrit: eval(tMTEP3_T09menoSritcommand + i),
            pavadinimas: eval(tMTEP3_T09pavadinimascommand + i),
            atlikVieta: eval(tMTEP3_T09atlikVietacommand + i),
            data: eval(tMTEP3_T09datacommand + i),
            atlygArNe: eval(tMTEP3_T09atlygArNecommand + i)
          })
        } // 19 lentelė update
        for (let i = 1; i <= parseInt(req.body.table19_name); i++) {
          foundUser.destytojas.tMTEP3_T10.push({
            nr: eval(tMTEP3_T10nrcommand + i),
            veiklPobud: eval(tMTEP3_T10veiklPobudcommand + i),
            veiklTiksl: eval(tMTEP3_T10veiklTikslcommand + i),
            dataVieta: eval(tMTEP3_T10dataVietacommand + i),
            dalyvSk: eval(tMTEP3_T10dalyvSkcommand + i),
            ktKomentarai: eval(tMTEP3_T10ktKomentaraicommand + i),
            atlygArNe: eval(tMTEP3_T10atlygArNecommand + i)
          })
        } // 20 lentelė update
        for (let i = 1; i <= parseInt(req.body.table20_name); i++) {
          foundUser.destytojas.tMTEP3_T11.push({
            nr: eval(tMTEP3_T11nrcommand + i),
            veiklPobud: eval(tMTEP3_T11veiklPobudcommand + i),
            veiklTiksl: eval(tMTEP3_T11veiklTikslcommand + i),
            dataVieta: eval(tMTEP3_T11dataVietacommand + i),
            dalyvSk: eval(tMTEP3_T11dalyvSkcommand + i),
            ktKomentarai: eval(tMTEP3_T11ktKomentaraicommand + i),
            atlygArNe: eval(tMTEP3_T11atlygArNecommand + i)
          })
        } // 21 lentelė update
        for (let i = 1; i <= parseInt(req.body.table21_name); i++) {
          foundUser.destytojas.tMTEP3_T12.push({
            nr: eval(tMTEP3_T12nrcommand + i),
            veiklPobud: eval(tMTEP3_T12veiklPobudcommand + i),
            dataVieta: eval(tMTEP3_T12dataVietacommand + i)
          })
        } // 22 lentelė update
        for (let i = 1; i <= parseInt(req.body.table22_name); i++) {
          foundUser.destytojas.tMTEP3_T13.push({
            nr: eval(tMTEP3_T13nrcommand + i),
            studDuom: eval(tMTEP3_T13studDuomcommand + i),
            renginioPavad: eval(tMTEP3_T13renginioPavadcommand + i),
            rezultatas: eval(tMTEP3_T13rezultatascommand + i),
            data: eval(tMTEP3_T13datacommand + i)
          })
        } // 23 lentelė update
        for (let i = 1; i <= parseInt(req.body.table23_name); i++) {
          foundUser.destytojas.tMTEP3_T14.push({
            nr: eval(tMTEP3_T14nrcommand + i),
            renginys: eval(tMTEP3_T14renginyscommand + i),
            veiklPobud: eval(tMTEP3_T14veiklPobudcommand + i),
            dataVieta: eval(tMTEP3_T14dataVietacommand + i)
          })
        } // savianalize
        for (let i = 1; i <= parseInt(req.body.tableTMTEP3_S_name); i++) {
          foundUser.destytojas.tMTEP3_S.push({
            nr: eval(tMTEP3_Snrcommand + i),
            stiprybes: eval(tMTEP3_Sstiprybescommand + i),
            tobulintina: eval(tMTEP3_Stobulintinacommand + i)
          })
        }
        foundUser.destytojas.kTOV4.kompTobulinimas_planVal = req.body.kTOV4kompTobulinimas_planVal,
          foundUser.destytojas.kTOV4.kompTobulinimas_atlVal = req.body.kTOV4kompTobulinimas_atlVal,
          foundUser.destytojas.kTOV4.organizacVeikl_planVal = req.body.kTOV4organizacVeikl_planVal,
          foundUser.destytojas.kTOV4.organizacVeikl_atlVal = req.body.kTOV4organizacVeikl_atlVal,
          foundUser.destytojas.kTOV4.isVisoValPlan = req.body.kTOV4isVisoValPlan,
          foundUser.destytojas.kTOV4.isVisoValAtl = req.body.kTOV4isVisoValAtl,
          foundUser.destytojas.kTOV4.priezastys = req.body.kTOV4priezastys
        // 24 lentelė update
        //mokymosi
        for (let i = 1; i <= parseInt(req.body.table241_name); i++) {
          foundUser.destytojas.kTOV4_KV01.kompetencijos.mokymosi.push({
            pavadinimas: eval(kTOV4_mokymopavadcommand + i),
            pazymNr: eval(kTOV4_mokymopazymNrcommand + i),
            trukmeValLT: eval(kTOV4_mokymotrukmeValLTcommand + i),
            trukmeValNeLT: eval(kTOV4_mokymotrukmeValNeLTcommand + i)
          })
          foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoMokymosiKomp = true
        } // tyrimu
        for (let i = 1; i <= parseInt(req.body.table242_name); i++) {
          foundUser.destytojas.kTOV4_KV01.kompetencijos.tyrimu.push({
            pavadinimas: eval(kTOV4_tyrimupavadcommand + i),
            pazymNr: eval(kTOV4_tyrimupazymNrcommand + i),
            trukmeValLT: eval(kTOV4_tyrimutrukmeValLTcommand + i),
            trukmeValNeLT: eval(kTOV4_tyrimutrukmeValNeLTcommand + i)
          })
          foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoTyrimuKomp = true
        } //bendrosios
        for (let i = 1; i <= parseInt(req.body.table243_name); i++) {
          foundUser.destytojas.kTOV4_KV01.kompetencijos.bendrosios.push({
            pavadinimas: eval(kTOV4_bendrosiospavadcommand + i),
            pazymNr: eval(kTOV4_bendrosiospazymNrcommand + i),
            trukmeValLT: eval(kTOV4_bendrosiostrukmeValLTcommand + i),
            trukmeValNeLT: eval(kTOV4_bendrosiostrukmeValNeLTcommand + i)
          })
          foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoBendrKomp = true
        } //dalykines
        for (let i = 1; i <= parseInt(req.body.table244_name); i++) {
          foundUser.destytojas.kTOV4_KV01.kompetencijos.dalykines.push({
            pavadinimas: eval(kTOV4_dalykpavadcommand + i),
            pazymNr: eval(kTOV4_dalykpazymNrcommand + i),
            trukmeValLT: eval(kTOV4_dalyktrukmeValLTcommand + i),
            trukmeValNeLT: eval(kTOV4_dalyktrukmeValNeLTcommand + i)
          })
          foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoDalykKomp = true
        }
        foundUser.destytojas.kTOV4_KV01.kompetencijos.isVisoValLT = req.body.kTOV4_trukmeValLT,
          foundUser.destytojas.kTOV4_KV01.kompetencijos.isVisoValNeLT = req.body.kTOV4_trukmeValNeLT

        // 25 lentelė update
        for (let i = 1; i <= parseInt(req.body.table25_name); i++) {
          foundUser.destytojas.kTOV4_25.push({
            nr: i,
            renginysTema: eval(kTOV4_25renginysTemacommand + i),
            kompGrupe: eval(kTOV4_25kompGrupecommand + i),
            skirta: eval(kTOV4_25skirtacommand + i)
          })
        } // 26 lentelė update
        for (let i = 1; i <= parseInt(req.body.table26_name); i++) {
          foundUser.destytojas.kTOV4_26.push({
            nr: i,
            imonIstaig: eval(kTOV4_26imonIstaigcommand + i),
            kompGrupe: eval(kTOV4_26kompGrupecommand + i),
            trukmeVal: eval(kTOV4_26trukmeValcommand + i),
            data: eval(kTOV4_26datacommand + i)
          })
        } // 27 lentelė update
        for (let i = 1; i <= parseInt(req.body.table27_name); i++) {
          foundUser.destytojas.kTOV4_KV03.push({
            nr: eval(kTOV4_KV03nrcommand + i),
            studKryptis: eval(kTOV4_KV03studKryptiscommand + i),
            salis: eval(kTOV4_KV03saliscommand + i),
            institucija: eval(kTOV4_KV03institucijacommand + i),
            dalykas: eval(kTOV4_KV03dalykascommand + i)
          })
        } // 28.1 lentelė update
        for (let i = 1; i <= parseInt(req.body.table281_name); i++) {
          foundUser.destytojas.kTOV4_O01.kTOV4_O01_1.push({
            nr: eval(kTOV4_O01_1nrcommand + i),
            veiklPobud: eval(kTOV4_O01_1veiklPobudcommand + i),
            isakNrData: eval(kTOV4_O01_1isakNrDatacommand + i)
          })
        } // 28.2 lentelė update
        for (let i = 1; i <= parseInt(req.body.table282_name); i++) {
          foundUser.destytojas.kTOV4_O01.kTOV4_O01_2.push({
            nr: eval(kTOV4_O01_2nrcommand + i),
            destytojas: eval(kTOV4_O01_2destytojascommand + i),
            veiklPobud: eval(kTOV4_O01_2veiklPobudcommand + i),
            dataVieta: eval(kTOV4_O01_2dataVietacommand + i),
            ktKomentarai: eval(kTOV4_O01_2ktKomentaraicommand + i)
          })
        } // 29 lentelė update
        for (let i = 1; i <= parseInt(req.body.table29_name); i++) {
          foundUser.destytojas.kTOV4_29.push({
            nr: i,
            veikla: eval(kTOV4_29veiklacommand + i),
            socPartneris: eval(kTOV4_29socPartneriscommand + i)
          })
        } // savianalize
        for (let i = 1; i <= parseInt(req.body.tablekTOV4_S_name); i++) {
          foundUser.destytojas.kTOV4_S.push({
            nr: eval(kTOV4_Snrcommand + i),
            stiprybes: eval(kTOV4_Sstiprybescommand + i),
            tobulintina: eval(kTOV4_Stobulintinacommand + i)
          })
        } // 30 lentelė update
        for (let i = 1; i <= parseInt(req.body.table30_name); i++) {
          foundUser.destytojas.kV5_KT02.push({
            nr: eval(kV5_KT02nrcommand + i),
            studKryptis: eval(kV5_KT02studKryptiscommand + i),
            diplomantas: eval(kV5_KT02diplomantascommand + i),
            studProgr: eval(kV5_KT02studProgrcommand + i),
            darboTema: eval(kV5_KT02darboTemacommand + i)
          })
        } // 31 lentelė update
        for (let i = 1; i <= parseInt(req.body.table31_name); i++) {
          foundUser.destytojas.kV5_KT01.push({
            nr: eval(kV5_KT01nrcommand + i),
            studKryptis: eval(kV5_KT01studKryptiscommand + i),
            diplomantas: eval(kV5_KT01diplomantascommand + i),
            studProgr: eval(kV5_KT01studProgrcommand + i),
            darboTema: eval(kV5_KT01darboTemacommand + i),
            uzsakovas: eval(kV5_KT01uzsakovascommand + i)
          })
        } // 32 lentelė update
        for (let i = 1; i <= parseInt(req.body.table321_name); i++) {
          foundUser.destytojas.kV5_32.socAtskMaz.push({
            aprasymas: eval(kV5_32socaprasymascommand + i)
          })
        }
        for (let i = 1; i <= parseInt(req.body.table322_name); i++) {
          foundUser.destytojas.kV5_32.aplinkosaugInic.push({
            aprasymas: eval(kV5_32aplinkaprasymascommand + i)
          })
        }
        for (let i = 1; i <= parseInt(req.body.table323_name); i++) {
          foundUser.destytojas.kV5_32.lietValstybPuosel.push({
            aprasymas: eval(kV5_32valstybaprasymascommand + i)
          })
        }
        for (let i = 1; i <= parseInt(req.body.table324_name); i++) {
          foundUser.destytojas.kV5_32.lietEtnokPuos.push({
            aprasymas: eval(kV5_32etnoaprasymascommand + i)
          })
        }
        for (let i = 1; i <= parseInt(req.body.table325_name); i++) {
          foundUser.destytojas.kV5_32.savanorystIniciatyv.push({
            aprasymas: eval(kV5_32savaprasymascommand + i)
          })
        } // 33 lentelė update
        for (let i = 1; i <= parseInt(req.body.table33_name); i++) {
          foundUser.destytojas.kV5_33.push({
            nr: i,
            veikla: eval(kV5_33veiklacommand + i),
            veiklPartner: eval(kV5_33veiklPartnercommand + i),
            organizac: eval(kV5_33organizaccommand + i),
            veiklOrientavim: eval(kV5_33veiklOrientavimcommand + i),
            dalyviai: eval(kV5_33dalyviaicommand + i),
            laikas: eval(kV5_33laikascommand + i),
            vieta: eval(kV5_33vietacommand + i)
          })
        } // 34 lentelė update
        for (let i = 1; i <= parseInt(req.body.table34_name); i++) {
          foundUser.destytojas.kV5_34.push({
            nr: i,
            pavadinimas: eval(kV5_34pavadinimascommand + i),
            vykdytPartner: eval(kV5_34vykdytPartnercommand + i),
            dalyviai: eval(kV5_34dalyviaicommand + i),
            finansavim: eval(kV5_34finansavimcommand + i),
            rezultatai: eval(kV5_34rezultataicommand + i),
            salisData: eval(kV5_34salisDatacommand + i)
          })
        }
        foundUser.destytojas.kV5_kitaInfo = req.body.kV5_kitaInfo,
          foundUser.updated_for = req.user.username,
          foundUser.busena = req.body.ataskaitos_busena

        foundUser.save(function(err) {
          if (!err) {
            console.log("Succesfully updated");
            res.redirect("/user-window");
          }
        });
      } else {
        console.log("User does'f found");
      }
    }
  });
});

app.get("/submit", function(req, res) {
  if (req.isAuthenticated()) {

    User.findById(req.user.id, function(err, foundUser) {

      let currentUserFaculty = foundUser.fakultetas;

      if (err) {
        console.log(err);
      } else {
        Faculty.findOne({
          username: currentUserFaculty
        }, function(err, foundFaculty) {
          if (err) {
            console.log(err);
          } else {
            res.render("submit", {
              foundFaculty: foundFaculty,
              user: foundUser,
              fakultetasUpper: _.toUpper(foundUser.fakultetas),
              katedraUpper: _.toUpper(foundUser.katedra),
              vardasUpper: _.toUpper(foundUser.vardas),
              pavardeUpper: _.toUpper(foundUser.pavarde)
            });
          }
        });
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.post("/submit", function(req, res) {

  User.findById(req.user.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        // 2 lent
        var nrcommand = "req.body.nr";
        var dalykascommand = "req.body.dalykas";
        var grupecommand = "req.body.grupe";
        var semestrascommand = "req.body.semestras";
        var planuotosValcommand = "req.body.planuotosVal";
        var atliktosValcommand = "req.body.atliktosVal";
        // 3 lent
        var nD2_M02nrcommand = "req.body.nD2_M02nr";
        var bibliografAprcommand = "req.body.bibliografApr";
        var tipascommand = "req.body.tipas";
        var mokslSritcommand = "req.body.mokslSrit";
        var mokslKryptcommand = "req.body.mokslKrypt";
        // 4 lent
        var nD2_M04nrcommand = "req.body.nD2_M04nr";
        var nD2_M04studProgrcommand = "req.body.nD2_M04studProgr";
        var nD2_M04dalykPavadcommand = "req.body.nD2_M04dalykPavad";
        var nD2_M04busenacommand = "req.body.nD2_M04busena";
        var nD2_M04apimtisKreditcommand = "req.body.nD2_M04apimtisKredit";
        // 5 lent
        var nD2_D01nrcommand = "req.body.nD2_D01nr";
        var nD2_D01komitetascommand = "req.body.nD2_D01komitetas";
        var nD2_D01veiklacommand = "req.body.nD2_D01veikla";
        var nD2_D01rezultataicommand = "req.body.nD2_D01rezultatai";
        // 6 lent
        var nD2_D02nrcommand = "req.body.nD2_D02nr";
        var nD2_D02studKryptcommand = "req.body.nD2_D02studKrypt";
        var nD2_D02veiklacommand = "req.body.nD2_D02veikla";
        var nD2_D02rezultataicommand = "req.body.nD2_D02rezultatai";
        // 7 lent
        var nD2_D03nrcommand = "req.body.nD2_D03nr";
        var nD2_D03studProgrcommand = "req.body.nD2_D03studProgr";
        var nD2_D03veiklacommand = "req.body.nD2_D03veikla";
        var nD2_D03rezultataicommand = "req.body.nD2_D03rezultatai";
        var nD2_D03studKryptiscommand = "req.body.nD2_D03studKryptis";
        // 8 lent
        var nD2_M03nrcommand = "req.body.nD2_M03nr";
        var nD2_M03studProgrcommand = "req.body.nD2_M03studProgr";
        var nD2_M03dalykPavadcommand = "req.body.nD2_M03dalykPavad";
        var nD2_M03apimtisKreditcommand = "req.body.nD2_M03apimtisKredit";
        // 9 lent
        var nD2_S01nrcommand = "req.body.nD2_S01nr";
        var nD2_S01veiklacommand = "req.body.nD2_S01veikla";
        var nD2_S01dataVietacommand = "req.body.nD2_S01dataVieta";
        // savianalize
        var nD2_Snrcommand = "req.body.nD2_Snr";
        var nD2_Sstiprybescommand = "req.body.nD2_Sstiprybes";
        var nD2_Stobulintinacommand = "req.body.nD2_Stobulintina";
        // 10 lent
        var tMTEP3_T01nrcommand = "req.body.tMTEP3_T01nr";
        var tyrTematcommand = "req.body.tyrTemat";
        var tyrGrupcommand = "req.body.tyrGrup";
        var tMTEP3_T01mokslSritcommand = "req.body.tMTEP3_T01mokslSrit";
        var tMTEP3_T01mokslKryptcommand = "req.body.tMTEP3_T01mokslKrypt";
        // 11 lent
        var tMTEP3_T02nrcommand = "req.body.tMTEP3_T02nr";
        var tMTEP3_T02bibliografAprcommand = "req.body.tMTEP3_T02bibliografApr";
        var tMTEP3_T02tipascommand = "req.body.tMTEP3_T02tipas";
        var tMTEP3_T02mokslSritcommand = "req.body.tMTEP3_T02mokslSrit";
        var tMTEP3_T02mokslKryptcommand = "req.body.tMTEP3_T02mokslKrypt";
        var tMTEP3_T02duomBazecommand = "req.body.tMTEP3_T02duomBaze";
        // 12 lent
        var tMTEP3_T03nrcommand = "req.body.tMTEP3_T03nr";
        var tMTEP3_T03pilnasBiblAprcommand = "req.body.tMTEP3_T03pilnasBiblApr";
        var tMTEP3_T03rengTipascommand = "req.body.tMTEP3_T03rengTipas";
        // 13 lent
        var tMTEP3_T04nrcommand = "req.body.tMTEP3_T04nr";
        var tMTEP3_T04uzsakovascommand = "req.body.tMTEP3_T04uzsakovas";
        var tMTEP3_T04temacommand = "req.body.tMTEP3_T04tema";
        var tMTEP3_T04datacommand = "req.body.tMTEP3_T04data";
        var tMTEP3_T04atlygArNecommand = "req.body.tMTEP3_T04atlygArNe";
        // 14.1 lent
        var tMTEP3_T05nrcommand = "req.body.tMTEP3_T05nr";
        var tMTEP3_T05veiklPavadcommand = "req.body.tMTEP3_T05veiklPavad";
        var tMTEP3_T05veiklRezultcommand = "req.body.tMTEP3_T05veiklRezult";
        var tMTEP3_T05atlygArNecommand = "req.body.tMTEP3_T05atlygArNe";
        // 14.2 lent
        var tMTEP3_142pavadinimascommand = "req.body.tMTEP3_142pavadinimas";
        var tMTEP3_142pastaboscommand = "req.body.tMTEP3_142pastabos";
        // 14.3 lent
        var tMTEP3_143pavadinimascommand = "req.body.tMTEP3_143pavadinimas";
        var tMTEP3_143uzsakovascommand = "req.body.tMTEP3_143uzsakovas";
        // 15 lent
        var tMTEP3_T06nrcommand = "req.body.tMTEP3_T06nr";
        var tMTEP3_T06autoriuscommand = "req.body.tMTEP3_T06autorius";
        var tMTEP3_T06menoSritcommand = "req.body.tMTEP3_T06menoSrit";
        var tMTEP3_T06pobudiscommand = "req.body.tMTEP3_T06pobudis";
        var tMTEP3_T06realizVietacommand = "req.body.tMTEP3_T06realizVieta";
        var tMTEP3_T06datacommand = "req.body.tMTEP3_T06data";
        var tMTEP3_T06atlygArNecommand = "req.body.tMTEP3_T06atlygArNe";
        // 16 lent
        var tMTEP3_T07nrcommand = "req.body.tMTEP3_T07nr";
        var tMTEP3_T07menoSritcommand = "req.body.tMTEP3_T07menoSrit";
        var tMTEP3_T07pavadinimascommand = "req.body.tMTEP3_T07pavadinimas";
        var tMTEP3_T07atlikVietacommand = "req.body.tMTEP3_T07atlikVieta";
        var tMTEP3_T07datacommand = "req.body.tMTEP3_T07data";
        var tMTEP3_T07atlygArNecommand = "req.body.tMTEP3_T07atlygArNe";
        // 17 lent
        var tMTEP3_T08Snrcommand = "req.body.tMTEP3_T08Snr";
        var tMTEP3_T08menoSritcommand = "req.body.tMTEP3_T08menoSrit";
        var tMTEP3_T08pavadinimascommand = "req.body.tMTEP3_T08pavadinimas";
        var tMTEP3_T08atlikVietacommand = "req.body.tMTEP3_T08atlikVieta";
        var tMTEP3_T08datacommand = "req.body.tMTEP3_T08data";
        var tMTEP3_T08atlygArNecommand = "req.body.tMTEP3_T08atlygArNe";
        // 18 lent
        var tMTEP3_T09nrcommand = "req.body.tMTEP3_T09nr";
        var tMTEP3_T09menoSritcommand = "req.body.tMTEP3_T09menoSrit";
        var tMTEP3_T09pavadinimascommand = "req.body.tMTEP3_T09pavadinimas";
        var tMTEP3_T09atlikVietacommand = "req.body.tMTEP3_T09atlikVieta";
        var tMTEP3_T09datacommand = "req.body.tMTEP3_T09data";
        var tMTEP3_T09atlygArNecommand = "req.body.tMTEP3_T09atlygArNe";
        // 19 lent
        var tMTEP3_T10nrcommand = "req.body.tMTEP3_T10nr";
        var tMTEP3_T10veiklPobudcommand = "req.body.tMTEP3_T10veiklPobud";
        var tMTEP3_T10veiklTikslcommand = "req.body.tMTEP3_T10veiklTiksl";
        var tMTEP3_T10dataVietacommand = "req.body.tMTEP3_T10dataVieta";
        var tMTEP3_T10dalyvSkcommand = "req.body.tMTEP3_T10dalyvSk";
        var tMTEP3_T10ktKomentaraicommand = "req.body.tMTEP3_T10ktKomentarai";
        var tMTEP3_T10atlygArNecommand = "req.body.tMTEP3_T10atlygArNe";
        // 20 lent
        var tMTEP3_T11nrcommand = "req.body.tMTEP3_T11nr";
        var tMTEP3_T11veiklPobudcommand = "req.body.tMTEP3_T11veiklPobud";
        var tMTEP3_T11veiklTikslcommand = "req.body.tMTEP3_T11veiklTiksl";
        var tMTEP3_T11dataVietacommand = "req.body.tMTEP3_T11dataVieta";
        var tMTEP3_T11dalyvSkcommand = "req.body.tMTEP3_T11dalyvSk";
        var tMTEP3_T11ktKomentaraicommand = "req.body.tMTEP3_T11ktKomentarai";
        var tMTEP3_T11atlygArNecommand = "req.body.tMTEP3_T11atlygArNe";
        // 21 lent
        var tMTEP3_T12nrcommand = "req.body.tMTEP3_T12nr";
        var tMTEP3_T12veiklPobudcommand = "req.body.tMTEP3_T12veiklPobud";
        var tMTEP3_T12dataVietacommand = "req.body.tMTEP3_T12dataVieta";
        // 22 lent
        var tMTEP3_T13nrcommand = "req.body.tMTEP3_T13nr";
        var tMTEP3_T13studDuomcommand = "req.body.tMTEP3_T13studDuom";
        var tMTEP3_T13renginioPavadcommand = "req.body.tMTEP3_T13renginioPavad";
        var tMTEP3_T13rezultatascommand = "req.body.tMTEP3_T13rezultatas";
        var tMTEP3_T13datacommand = "req.body.tMTEP3_T13data";
        // 23 lent
        var tMTEP3_T14nrcommand = "req.body.tMTEP3_T14nr";
        var tMTEP3_T14renginyscommand = "req.body.tMTEP3_T14renginys";
        var tMTEP3_T14veiklPobudcommand = "req.body.tMTEP3_T14veiklPobud";
        var tMTEP3_T14dataVietacommand = "req.body.tMTEP3_T14dataVieta";
        // savianalize
        var tMTEP3_Snrcommand = "req.body.tMTEP3_Snr";
        var tMTEP3_Sstiprybescommand = "req.body.tMTEP3_Sstiprybes";
        var tMTEP3_Stobulintinacommand = "req.body.tMTEP3_Stobulintina";
        // 24 lent
        //mokymosi
        var kTOV4_mokymopavadcommand = "req.body.kTOV4_mokymopavad";
        var kTOV4_mokymopazymNrcommand = "req.body.kTOV4_mokymopazymNr";
        var kTOV4_mokymotrukmeValLTcommand = "req.body.kTOV4_mokymotrukmeValLT";
        var kTOV4_mokymotrukmeValNeLTcommand = "req.body.kTOV4_mokymotrukmeValNeLT";
        // tyrimu
        var kTOV4_tyrimupavadcommand = "req.body.kTOV4_tyrimupavad";
        var kTOV4_tyrimupazymNrcommand = "req.body.kTOV4_tyrimupazymNr";
        var kTOV4_tyrimutrukmeValLTcommand = "req.body.kTOV4_tyrimutrukmeValLT";
        var kTOV4_tyrimutrukmeValNeLTcommand = "req.body.kTOV4_tyrimutrukmeValNeLT";
        //bendrosios
        var kTOV4_bendrosiospavadcommand = "req.body.kTOV4_bendrosiospavad";
        var kTOV4_bendrosiospazymNrcommand = "req.body.kTOV4_bendrosiospazymNr";
        var kTOV4_bendrosiostrukmeValLTcommand = "req.body.kTOV4_bendrosiostrukmeValLT";
        var kTOV4_bendrosiostrukmeValNeLTcommand = "req.body.kTOV4_bendrosiostrukmeValNeLT";
        //dalykines
        var kTOV4_dalykpavadcommand = "req.body.kTOV4_dalykpavad";
        var kTOV4_dalykpazymNrcommand = "req.body.kTOV4_dalykpazymNr";
        var kTOV4_dalyktrukmeValLTcommand = "req.body.kTOV4_dalyktrukmeValLT";
        var kTOV4_dalyktrukmeValNeLTcommand = "req.body.kTOV4_dalyktrukmeValNeLT";
        // 25 lent
        var kTOV4_25renginysTemacommand = "req.body.kTOV4_25renginysTema";
        var kTOV4_25kompGrupecommand = "req.body.kTOV4_25kompGrupe";
        var kTOV4_25skirtacommand = "req.body.kTOV4_25skirta";
        // 26 lent
        var kTOV4_26imonIstaigcommand = "req.body.kTOV4_26imonIstaig";
        var kTOV4_26kompGrupecommand = "req.body.kTOV4_26kompGrupe";
        var kTOV4_26trukmeValcommand = "req.body.kTOV4_26trukmeVal";
        var kTOV4_26datacommand = "req.body.kTOV4_26data";
        // 27 lent
        var kTOV4_KV03nrcommand = "req.body.kTOV4_KV03nr";
        var kTOV4_KV03studKryptiscommand = "req.body.kTOV4_KV03studKryptis";
        var kTOV4_KV03saliscommand = "req.body.kTOV4_KV03salis";
        var kTOV4_KV03institucijacommand = "req.body.kTOV4_KV03institucija";
        var kTOV4_KV03dalykascommand = "req.body.kTOV4_KV03dalykas";
        // 28.1 lent
        var kTOV4_O01_1nrcommand = "req.body.kTOV4_O01_1nr";
        var kTOV4_O01_1veiklPobudcommand = "req.body.kTOV4_O01_1veiklPobud";
        var kTOV4_O01_1isakNrDatacommand = "req.body.kTOV4_O01_1isakNrData";
        // 28.2 lent
        var kTOV4_O01_2nrcommand = "req.body.kTOV4_O01_2nr";
        var kTOV4_O01_2destytojascommand = "req.body.kTOV4_O01_2destytojas";
        var kTOV4_O01_2veiklPobudcommand = "req.body.kTOV4_O01_2veiklPobud";
        var kTOV4_O01_2dataVietacommand = "req.body.kTOV4_O01_2dataVieta";
        var kTOV4_O01_2ktKomentaraicommand = "req.body.kTOV4_O01_2ktKomentarai";
        // 29 lent
        var kTOV4_29veiklacommand = "req.body.kTOV4_29veikla";
        var kTOV4_29socPartneriscommand = "req.body.kTOV4_29socPartneris";
        // savianalize
        var kTOV4_Snrcommand = "req.body.kTOV4_Snr";
        var kTOV4_Sstiprybescommand = "req.body.kTOV4_Sstiprybes";
        var kTOV4_Stobulintinacommand = "req.body.kTOV4_Stobulintina";
        // 30 lent
        var kV5_KT02nrcommand = "req.body.kV5_KT02nr";
        var kV5_KT02studKryptiscommand = "req.body.kV5_KT02studKryptis";
        var kV5_KT02diplomantascommand = "req.body.kV5_KT02diplomantas";
        var kV5_KT02studProgrcommand = "req.body.kV5_KT02studProgr";
        var kV5_KT02darboTemacommand = "req.body.kV5_KT02darboTema";
        // 31 lent
        var kV5_KT01nrcommand = "req.body.kV5_KT01nr";
        var kV5_KT01diplomantascommand = "req.body.kV5_KT01diplomantas";
        var kV5_KT01studProgrcommand = "req.body.kV5_KT01studProgr";
        var kV5_KT01darboTemacommand = "req.body.kV5_KT01darboTema";
        var kV5_KT01uzsakovascommand = "req.body.kV5_KT01uzsakovas";
        var kV5_KT01studKryptiscommand = "req.body.kV5_KT01studKryptis";
        // 32 lent
        var kV5_32socaprasymascommand = "req.body.kV5_32socaprasymas";
        var kV5_32aplinkaprasymascommand = "req.body.kV5_32aplinkaprasymas";
        var kV5_32valstybaprasymascommand = "req.body.kV5_32valstybaprasymas";
        var kV5_32etnoaprasymascommand = "req.body.kV5_32etnoaprasymas";
        var kV5_32savaprasymascommand = "req.body.kV5_32savaprasymas";
        // 33 lent
        var kV5_33veiklacommand = "req.body.kV5_33veikla";
        var kV5_33veiklPartnercommand = "req.body.kV5_33veiklPartner";
        var kV5_33organizaccommand = "req.body.kV5_33organizac";
        var kV5_33veiklOrientavimcommand = "req.body.kV5_33veiklOrientavim";
        var kV5_33dalyviaicommand = "req.body.kV5_33dalyviai";
        var kV5_33laikascommand = "req.body.kV5_33laikas";
        var kV5_33vietacommand = "req.body.kV5_33vieta";
        // 34 lent
        var kV5_34pavadinimascommand = "req.body.kV5_34pavadinimas";
        var kV5_34vykdytPartnercommand = "req.body.kV5_34vykdytPartner";
        var kV5_34dalyviaicommand = "req.body.kV5_34dalyviai";
        var kV5_34finansavimcommand = "req.body.kV5_34finansavim";
        var kV5_34rezultataicommand = "req.body.kV5_34rezultatai";
        var kV5_34salisDatacommand = "req.body.kV5_34salisData";
        //masyvu isvalymas submit
        foundUser.destytojas.kD1_K01.kD1_K01_array = new Array();
        foundUser.destytojas.nD2_M02 = new Array();
        foundUser.destytojas.nD2_M03 = new Array();
        foundUser.destytojas.nD2_M04 = new Array();
        foundUser.destytojas.nD2_D01 = new Array();
        foundUser.destytojas.nD2_D02 = new Array();
        foundUser.destytojas.nD2_D03 = new Array();
        foundUser.destytojas.nD2_S01 = new Array();
        foundUser.destytojas.nD2_S = new Array();
        foundUser.destytojas.tMTEP3_T01 = new Array();
        foundUser.destytojas.tMTEP3_T02 = new Array();
        foundUser.destytojas.tMTEP3_T03 = new Array();
        foundUser.destytojas.tMTEP3_T04 = new Array();
        foundUser.destytojas.tMTEP3_T05 = new Array();
        foundUser.destytojas.tMTEP3_142 = new Array();
        foundUser.destytojas.tMTEP3_143 = new Array();
        foundUser.destytojas.tMTEP3_T06 = new Array();
        foundUser.destytojas.tMTEP3_T07 = new Array();
        foundUser.destytojas.tMTEP3_T08 = new Array();
        foundUser.destytojas.tMTEP3_T09 = new Array();
        foundUser.destytojas.tMTEP3_T10 = new Array();
        foundUser.destytojas.tMTEP3_T11 = new Array();
        foundUser.destytojas.tMTEP3_T12 = new Array();
        foundUser.destytojas.tMTEP3_T13 = new Array();
        foundUser.destytojas.tMTEP3_T14 = new Array();
        foundUser.destytojas.tMTEP3_S = new Array();
        //24 lentelė
        foundUser.destytojas.kTOV4_KV01.kompetencijos.mokymosi = new Array();
        foundUser.destytojas.kTOV4_KV01.kompetencijos.tyrimu = new Array();
        foundUser.destytojas.kTOV4_KV01.kompetencijos.bendrosios = new Array();
        foundUser.destytojas.kTOV4_KV01.kompetencijos.dalykines = new Array();
        // SUBMIT post. Skaiciui "dalyvavusiu" nustatyti Vedejo ataskaitoje
        foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoMokymosiKomp = false;
        foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoTyrimuKomp = false;
        foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoBendrKomp = false;
        foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoDalykKomp = false;
        //-----------
        foundUser.destytojas.kTOV4_25 = new Array();
        foundUser.destytojas.kTOV4_26 = new Array();
        foundUser.destytojas.kTOV4_KV03 = new Array();
        foundUser.destytojas.kTOV4_O01.kTOV4_O01_1 = new Array();
        foundUser.destytojas.kTOV4_O01.kTOV4_O01_2 = new Array();
        foundUser.destytojas.kTOV4_29 = new Array();
        foundUser.destytojas.kTOV4_S = new Array();
        foundUser.destytojas.kV5_KT01 = new Array();
        foundUser.destytojas.kV5_KT02 = new Array();

        //32 lentelė
        foundUser.destytojas.kV5_32.socAtskMaz = new Array();
        foundUser.destytojas.kV5_32.aplinkosaugInic = new Array();
        foundUser.destytojas.kV5_32.lietValstybPuosel = new Array();
        foundUser.destytojas.kV5_32.lietEtnokPuos = new Array();
        foundUser.destytojas.kV5_32.savanorystIniciatyv = new Array();

        foundUser.destytojas.kV5_33 = new Array();
        foundUser.destytojas.kV5_34 = new Array();

        // 2 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table2_name); i++) {
          if (eval(dalykascommand + i) != "" || eval(grupecommand + i) != "" || eval(semestrascommand + i) != "" ||
            eval(planuotosValcommand + i) != "" || eval(atliktosValcommand + i) != "") {
            foundUser.destytojas.kD1_K01.kD1_K01_array.push({
              nr: eval(nrcommand + i),
              dalykas: eval(dalykascommand + i),
              grupe: eval(grupecommand + i),
              semestras: eval(semestrascommand + i),
              planuotosVal: eval(planuotosValcommand + i),
              atliktosVal: eval(atliktosValcommand + i)
            })
          }
        }
        foundUser.destytojas.kD1_K01.isVisoValPlan = req.body.kD1_K01isVisoValPlan,
          foundUser.destytojas.kD1_K01.isVisoValAtl = req.body.kD1_K01isVisoValAtl,
          foundUser.destytojas.kD1_K01.isJuSrautaisValPlan = req.body.isJuSrautaisValPlan,
          foundUser.destytojas.kD1_K01.isJuSrautaisValAtl = req.body.isJuSrautaisValAtl,
          foundUser.destytojas.kD1_K01.isJuUzsienioValPlan = req.body.isJuUzsienioValPlan,
          foundUser.destytojas.kD1_K01.isJuUzsienioValAtl = req.body.isJuUzsienioValAtl,
          foundUser.destytojas.kD1_K01.priezastys = req.body.kD1_K01priezastys,

          foundUser.destytojas.nD2.nekSuStud_planVal = req.body.nekSuStud_planVal,
          foundUser.destytojas.nD2.nekSuStud_atlVal = req.body.nekSuStud_atlVal,
          foundUser.destytojas.nD2.pasirengDest_planVal = req.body.pasirengDest_planVal,
          foundUser.destytojas.nD2.pasirengDest_atlVal = req.body.pasirengDest_atlVal,
          foundUser.destytojas.nD2.metod_planVal = req.body.metod_planVal,
          foundUser.destytojas.nD2.metod_atlVal = req.body.metod_atlVal,
          foundUser.destytojas.nD2.dalyvSPKUV_planVal = req.body.dalyvSPKUV_planVal,
          foundUser.destytojas.nD2.dalyvSPKUV_atlVal = req.body.dalyvSPKUV_atlVal,
          foundUser.destytojas.nD2.studPop_planVal = req.body.studPop_planVal,
          foundUser.destytojas.nD2.studPop_atlVal = req.body.studPop_atlVal,
          foundUser.destytojas.nD2.isVisoValPlan = req.body.nD2isVisoValPlan,
          foundUser.destytojas.nD2.isVisoValAtl = req.body.nD2isVisoValAtl,
          foundUser.destytojas.nD2.priezastys = req.body.nD2priezastys
        // 3 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table3_name); i++) {
          if (eval(bibliografAprcommand + i) != "" || eval(tipascommand + i) != "" || eval(mokslSritcommand + i) != "" ||
            eval(mokslKryptcommand + i) != "") {
            foundUser.destytojas.nD2_M02.push({
              nr: eval(nrcommand + i),
              bibliografApr: eval(bibliografAprcommand + i),
              tipas: eval(tipascommand + i),
              mokslSrit: eval(mokslSritcommand + i),
              mokslKrypt: eval(mokslKryptcommand + i)
            })
          }
        } // 4 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table4_name); i++) {
          if (eval(nD2_M04studProgrcommand + i) != "" || eval(nD2_M04dalykPavadcommand + i) != "" ||
            eval(nD2_M04busenacommand + i) != "" || eval(nD2_M04apimtisKreditcommand + i) != "") {
            foundUser.destytojas.nD2_M04.push({
              nr: eval(nD2_M04nrcommand + i),
              studProgr: eval(nD2_M04studProgrcommand + i),
              dalykPavad: eval(nD2_M04dalykPavadcommand + i),
              busena: eval(nD2_M04busenacommand + i),
              apimtisKredit: eval(nD2_M04apimtisKreditcommand + i)
            })
          }
        } // 5 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table5_name); i++) {
          if (eval(nD2_D01komitetascommand + i) != "" || eval(nD2_D01veiklacommand + i) != "" ||
            eval(nD2_D01rezultataicommand + i) != "") {
            foundUser.destytojas.nD2_D01.push({
              nr: eval(nD2_D01nrcommand + i),
              komitetas: eval(nD2_D01komitetascommand + i),
              veikla: eval(nD2_D01veiklacommand + i),
              rezultatai: eval(nD2_D01rezultataicommand + i)
            })
          }
        } // 6 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table6_name); i++) {
          if (eval(nD2_D02studKryptcommand + i) != "" || eval(nD2_D02veiklacommand + i) != "" ||
            eval(nD2_D02rezultataicommand + i) != "") {
            foundUser.destytojas.nD2_D02.push({
              nr: eval(nD2_D02nrcommand + i),
              studKryptis: eval(nD2_D02studKryptcommand + i),
              veikla: eval(nD2_D02veiklacommand + i),
              rezultatai: eval(nD2_D02rezultataicommand + i)
            })
          }
        } // 7 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table7_name); i++) {
          if (eval(nD2_D03studKryptiscommand + i) != "" || eval(nD2_D03studProgrcommand + i) != "" ||
            eval(nD2_D03veiklacommand + i) != "" || eval(nD2_D03rezultataicommand + i) != "") {
            foundUser.destytojas.nD2_D03.push({
              nr: eval(nD2_D03nrcommand + i),
              studKryptis: eval(nD2_D03studKryptiscommand + i),
              studProgr: eval(nD2_D03studProgrcommand + i),
              veikla: eval(nD2_D03veiklacommand + i),
              rezultatai: eval(nD2_D03rezultataicommand + i)
            })
          }
        } // 8 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table8_name); i++) {
          if (eval(nD2_M03studProgrcommand + i) != "" || eval(nD2_M03dalykPavadcommand + i) != "" ||
            eval(nD2_M03apimtisKreditcommand + i) != "") {
            foundUser.destytojas.nD2_M03.push({
              nr: eval(nD2_M03nrcommand + i),
              studProgr: eval(nD2_M03studProgrcommand + i),
              dalykPavad: eval(nD2_M03dalykPavadcommand + i),
              apimtisKredit: eval(nD2_M03apimtisKreditcommand + i)
            })
          }
        } // 9 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table9_name); i++) {
          if (eval(nD2_S01veiklacommand + i) != "" || eval(nD2_S01dataVietacommand + i) != "") {
            foundUser.destytojas.nD2_S01.push({
              nr: eval(nD2_S01nrcommand + i),
              veikla: eval(nD2_S01veiklacommand + i),
              dataVieta: eval(nD2_S01dataVietacommand + i)
            })
          }
        } // savianalize submit
        for (let i = 1; i <= parseInt(req.body.tablenD2_S_name); i++) {
          if (eval(nD2_Sstiprybescommand + i) != "" || eval(nD2_Stobulintinacommand + i) != "") {
            foundUser.destytojas.nD2_S.push({
              nr: eval(nD2_Snrcommand + i),
              stiprybes: eval(nD2_Sstiprybescommand + i),
              tobulintina: eval(nD2_Stobulintinacommand + i)
            })
          }
        }
        foundUser.destytojas.tMTEP3.tMTEPveiklRez_planVal = req.body.tMTEPveiklRez_planVal,
          foundUser.destytojas.tMTEP3.tMTEPveiklRez_atlVal = req.body.tMTEPveiklRez_atlVal,
          foundUser.destytojas.tMTEP3.menoVeikl_planVal = req.body.menoVeikl_planVal,
          foundUser.destytojas.tMTEP3.menoVeikl_atlVal = req.body.menoVeikl_atlVal,
          foundUser.destytojas.tMTEP3.tMTEPmenoVeiklPop_planVal = req.body.tMTEPmenoVeiklPop_planVal,
          foundUser.destytojas.tMTEP3.tMTEPmenoVeiklPop_atlVal = req.body.tMTEPmenoVeiklPop_atlVal,
          foundUser.destytojas.tMTEP3.studReng_planVal = req.body.studReng_planVal,
          foundUser.destytojas.tMTEP3.studReng_atlVal = req.body.studReng_atlVal,
          foundUser.destytojas.tMTEP3.kitaVeikl_planVal = req.body.kitaVeikl_planVal,
          foundUser.destytojas.tMTEP3.kitaVeikl_atlVal = req.body.kitaVeikl_atlVal,
          foundUser.destytojas.tMTEP3.isVisoValPlan = req.body.tMTEP3isVisoValPlan,
          foundUser.destytojas.tMTEP3.isVisoValAtl = req.body.tMTEP3isVisoValAtl,
          foundUser.destytojas.tMTEP3.priezastys = req.body.tMTEP3priezastys
        // 10 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table10_name); i++) {
          if (eval(tyrTematcommand + i) != "" || eval(tyrGrupcommand + i) != "" ||
            eval(tMTEP3_T01mokslSritcommand + i) != "" || eval(tMTEP3_T01mokslKryptcommand + i) != "") {
            foundUser.destytojas.tMTEP3_T01.push({
              nr: eval(tMTEP3_T01nrcommand + i),
              tyrTemat: eval(tyrTematcommand + i),
              tyrGrup: eval(tyrGrupcommand + i),
              mokslSrit: eval(tMTEP3_T01mokslSritcommand + i),
              mokslKrypt: eval(tMTEP3_T01mokslKryptcommand + i)
            })
          }
        } // 11 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table11_name); i++) {
          if (eval(tMTEP3_T02bibliografAprcommand + i) != "" || eval(tMTEP3_T02tipascommand + i) != "" ||
            eval(tMTEP3_T02mokslSritcommand + i) != "" || eval(tMTEP3_T02mokslKryptcommand + i) != "" ||
            eval(tMTEP3_T02duomBazecommand + i) != "") {
            foundUser.destytojas.tMTEP3_T02.push({
              nr: eval(tMTEP3_T02nrcommand + i),
              bibliografApr: eval(tMTEP3_T02bibliografAprcommand + i),
              tipas: eval(tMTEP3_T02tipascommand + i),
              mokslSrit: eval(tMTEP3_T02mokslSritcommand + i),
              mokslKrypt: eval(tMTEP3_T02mokslKryptcommand + i),
              duomBaze: eval(tMTEP3_T02duomBazecommand + i)
            })
          }
        } // 12 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table12_name); i++) {
          if (eval(tMTEP3_T03pilnasBiblAprcommand + i) != "" || eval(tMTEP3_T03rengTipascommand + i) != "") {
            foundUser.destytojas.tMTEP3_T03.push({
              nr: eval(tMTEP3_T03nrcommand + i),
              pilnasBiblApr: eval(tMTEP3_T03pilnasBiblAprcommand + i),
              rengTipas: eval(tMTEP3_T03rengTipascommand + i)
            })
          }
        } // 13 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table13_name); i++) {
          if (eval(tMTEP3_T04uzsakovascommand + i) != "" || eval(tMTEP3_T04temacommand + i) != "" ||
            eval(tMTEP3_T04datacommand + i) != "" || eval(tMTEP3_T04atlygArNecommand + i) != "") {
            foundUser.destytojas.tMTEP3_T04.push({
              nr: eval(tMTEP3_T04nrcommand + i),
              uzsakovas: eval(tMTEP3_T04uzsakovascommand + i),
              tema: eval(tMTEP3_T04temacommand + i),
              data: eval(tMTEP3_T04datacommand + i),
              atlygArNe: eval(tMTEP3_T04atlygArNecommand + i)
            })
          }
        } // 14.1 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table141_name); i++) {
          if (eval(tMTEP3_T05veiklPavadcommand + i) != "" || eval(tMTEP3_T05veiklRezultcommand + i) != "" ||
            eval(tMTEP3_T05atlygArNecommand + i) != "") {
            foundUser.destytojas.tMTEP3_T05.push({
              nr: eval(tMTEP3_T05nrcommand + i),
              veiklPavad: eval(tMTEP3_T05veiklPavadcommand + i),
              veiklRezult: eval(tMTEP3_T05veiklRezultcommand + i),
              atlygArNe: eval(tMTEP3_T05atlygArNecommand + i)
            })
          }
        } // 14.2 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table142_name); i++) {
          if (eval(tMTEP3_142pavadinimascommand + i) != "" || eval(tMTEP3_142pastaboscommand + i) != "") {
            foundUser.destytojas.tMTEP3_142.push({
              nr: i,
              pavadinimas: eval(tMTEP3_142pavadinimascommand + i),
              pastabos: eval(tMTEP3_142pastaboscommand + i)
            })
          }
        } // 14.3 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table143_name); i++) {
          if (eval(tMTEP3_143pavadinimascommand + i) != "" || eval(tMTEP3_143uzsakovascommand + i) != "") {
            foundUser.destytojas.tMTEP3_143.push({
              nr: i,
              pavadinimas: eval(tMTEP3_143pavadinimascommand + i),
              uzsakovas: eval(tMTEP3_143uzsakovascommand + i)
            })
          }
        } // 15 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table15_name); i++) {
          if (eval(tMTEP3_T06autoriuscommand + i) != "" || eval(tMTEP3_T06menoSritcommand + i) != "" || eval(tMTEP3_T06pobudiscommand + i) != "" ||
            eval(tMTEP3_T06realizVietacommand + i) != "" || eval(tMTEP3_T06datacommand + i) != "" || eval(tMTEP3_T06atlygArNecommand + i) != "") {
            foundUser.destytojas.tMTEP3_T06.push({
              nr: i,
              autorius: eval(tMTEP3_T06autoriuscommand + i),
              menoSrit: eval(tMTEP3_T06menoSritcommand + i),
              pobudis: eval(tMTEP3_T06pobudiscommand + i),
              realizVieta: eval(tMTEP3_T06realizVietacommand + i),
              data: eval(tMTEP3_T06datacommand + i),
              atlygArNe: eval(tMTEP3_T06atlygArNecommand + i)
            })
          }
        } // 16 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table16_name); i++) {
          if (eval(tMTEP3_T07menoSritcommand + i) != "" || eval(tMTEP3_T07pavadinimascommand + i) != "" ||
            eval(tMTEP3_T07atlikVietacommand + i) != "" || eval(tMTEP3_T07datacommand + i) != "" ||
            eval(tMTEP3_T07atlygArNecommand + i) != "") {
            foundUser.destytojas.tMTEP3_T07.push({
              nr: eval(tMTEP3_T07nrcommand + i),
              menoSrit: eval(tMTEP3_T07menoSritcommand + i),
              pavadinimas: eval(tMTEP3_T07pavadinimascommand + i),
              atlikVieta: eval(tMTEP3_T07atlikVietacommand + i),
              data: eval(tMTEP3_T07datacommand + i),
              atlygArNe: eval(tMTEP3_T07atlygArNecommand + i)
            })
          }
        } // 17 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table17_name); i++) {
          if (eval(tMTEP3_T08menoSritcommand + i) != "" || eval(tMTEP3_T08pavadinimascommand + i) != "" ||
            eval(tMTEP3_T08atlikVietacommand + i) != "" || eval(tMTEP3_T08datacommand + i) != "" ||
            eval(tMTEP3_T08atlygArNecommand + i) != "") {
            foundUser.destytojas.tMTEP3_T08.push({
              nr: eval(tMTEP3_T08Snrcommand + i),
              menoSrit: eval(tMTEP3_T08menoSritcommand + i),
              pavadinimas: eval(tMTEP3_T08pavadinimascommand + i),
              atlikVieta: eval(tMTEP3_T08atlikVietacommand + i),
              data: eval(tMTEP3_T08datacommand + i),
              atlygArNe: eval(tMTEP3_T08atlygArNecommand + i)
            })
          }
        } // 18 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table18_name); i++) {
          if (eval(tMTEP3_T09menoSritcommand + i) != "" || eval(tMTEP3_T09pavadinimascommand + i) != "" ||
            eval(tMTEP3_T09atlikVietacommand + i) != "" || eval(tMTEP3_T09datacommand + i) != "" ||
            eval(tMTEP3_T09atlygArNecommand + i) != "") {
            foundUser.destytojas.tMTEP3_T09.push({
              nr: eval(tMTEP3_T09nrcommand + i),
              menoSrit: eval(tMTEP3_T09menoSritcommand + i),
              pavadinimas: eval(tMTEP3_T09pavadinimascommand + i),
              atlikVieta: eval(tMTEP3_T09atlikVietacommand + i),
              data: eval(tMTEP3_T09datacommand + i),
              atlygArNe: eval(tMTEP3_T09atlygArNecommand + i)
            })
          }
        } // 19 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table19_name); i++) {
          if (eval(tMTEP3_T10veiklPobudcommand + i) != "" || eval(tMTEP3_T10veiklTikslcommand + i) != "" ||
            eval(tMTEP3_T10dataVietacommand + i) != "" || eval(tMTEP3_T10dalyvSkcommand + i) != "" || eval(tMTEP3_T10ktKomentaraicommand + i) != "" ||
            eval(tMTEP3_T10atlygArNecommand + i) != "") {
            foundUser.destytojas.tMTEP3_T10.push({
              nr: eval(tMTEP3_T10nrcommand + i),
              veiklPobud: eval(tMTEP3_T10veiklPobudcommand + i),
              veiklTiksl: eval(tMTEP3_T10veiklTikslcommand + i),
              dataVieta: eval(tMTEP3_T10dataVietacommand + i),
              dalyvSk: eval(tMTEP3_T10dalyvSkcommand + i),
              ktKomentarai: eval(tMTEP3_T10ktKomentaraicommand + i),
              atlygArNe: eval(tMTEP3_T10atlygArNecommand + i)
            })
          }
        } // 20 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table20_name); i++) {
          if (eval(tMTEP3_T11veiklPobudcommand + i) != "" || eval(tMTEP3_T11veiklTikslcommand + i) != "" ||
            eval(tMTEP3_T11dataVietacommand + i) != "" || eval(tMTEP3_T11dalyvSkcommand + i) != "" || eval(tMTEP3_T11ktKomentaraicommand + i) != "" ||
            eval(tMTEP3_T11atlygArNecommand + i) != "") {
            foundUser.destytojas.tMTEP3_T11.push({
              nr: eval(tMTEP3_T11nrcommand + i),
              veiklPobud: eval(tMTEP3_T11veiklPobudcommand + i),
              veiklTiksl: eval(tMTEP3_T11veiklTikslcommand + i),
              dataVieta: eval(tMTEP3_T11dataVietacommand + i),
              dalyvSk: eval(tMTEP3_T11dalyvSkcommand + i),
              ktKomentarai: eval(tMTEP3_T11ktKomentaraicommand + i),
              atlygArNe: eval(tMTEP3_T11atlygArNecommand + i)
            })
          }
        } // 21 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table21_name); i++) {
          if (eval(tMTEP3_T12veiklPobudcommand + i) != "" || eval(tMTEP3_T12dataVietacommand + i) != "") {
            foundUser.destytojas.tMTEP3_T12.push({
              nr: eval(tMTEP3_T12nrcommand + i),
              veiklPobud: eval(tMTEP3_T12veiklPobudcommand + i),
              dataVieta: eval(tMTEP3_T12dataVietacommand + i)
            })
          }
        } // 22 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table22_name); i++) {
          if (eval(tMTEP3_T13studDuomcommand + i) != "" || eval(tMTEP3_T13renginioPavadcommand + i) != "" ||
            eval(tMTEP3_T13rezultatascommand + i) != "" || eval(tMTEP3_T13datacommand + i) != "") {
            foundUser.destytojas.tMTEP3_T13.push({
              nr: eval(tMTEP3_T13nrcommand + i),
              studDuom: eval(tMTEP3_T13studDuomcommand + i),
              renginioPavad: eval(tMTEP3_T13renginioPavadcommand + i),
              rezultatas: eval(tMTEP3_T13rezultatascommand + i),
              data: eval(tMTEP3_T13datacommand + i)
            })
          }
        } // 23 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table23_name); i++) {
          if (eval(tMTEP3_T14renginyscommand + i) != "" || eval(tMTEP3_T14veiklPobudcommand + i) != "" ||
            eval(tMTEP3_T14dataVietacommand + i) != "") {
            foundUser.destytojas.tMTEP3_T14.push({
              nr: eval(tMTEP3_T14nrcommand + i),
              renginys: eval(tMTEP3_T14renginyscommand + i),
              veiklPobud: eval(tMTEP3_T14veiklPobudcommand + i),
              dataVieta: eval(tMTEP3_T14dataVietacommand + i)
            })
          }
        } // savianalize submit
        for (let i = 1; i <= parseInt(req.body.tableTMTEP3_S_name); i++) {
          if (eval(tMTEP3_Sstiprybescommand + i) != "" || eval(tMTEP3_Stobulintinacommand + i) != "") {
            foundUser.destytojas.tMTEP3_S.push({
              nr: eval(tMTEP3_Snrcommand + i),
              stiprybes: eval(tMTEP3_Sstiprybescommand + i),
              tobulintina: eval(tMTEP3_Stobulintinacommand + i)
            })
          }
        }
        foundUser.destytojas.kTOV4.kompTobulinimas_planVal = req.body.kTOV4kompTobulinimas_planVal,
          foundUser.destytojas.kTOV4.kompTobulinimas_atlVal = req.body.kTOV4kompTobulinimas_atlVal,
          foundUser.destytojas.kTOV4.organizacVeikl_planVal = req.body.kTOV4organizacVeikl_planVal,
          foundUser.destytojas.kTOV4.organizacVeikl_atlVal = req.body.kTOV4organizacVeikl_atlVal,
          foundUser.destytojas.kTOV4.isVisoValPlan = req.body.kTOV4isVisoValPlan,
          foundUser.destytojas.kTOV4.isVisoValAtl = req.body.kTOV4isVisoValAtl,
          foundUser.destytojas.kTOV4.priezastys = req.body.kTOV4priezastys

        // 24 lentelė submit
        //mokymosi
        for (let i = 1; i <= parseInt(req.body.table241_name); i++) {
          if (eval(kTOV4_mokymopavadcommand + i) != "" || eval(kTOV4_mokymopazymNrcommand + i) != "" ||
            eval(kTOV4_mokymotrukmeValLTcommand + i) != "" || eval(kTOV4_mokymotrukmeValNeLTcommand + i) != "") {
            foundUser.destytojas.kTOV4_KV01.kompetencijos.mokymosi.push({
              pavadinimas: eval(kTOV4_mokymopavadcommand + i),
              pazymNr: eval(kTOV4_mokymopazymNrcommand + i),
              trukmeValLT: eval(kTOV4_mokymotrukmeValLTcommand + i),
              trukmeValNeLT: eval(kTOV4_mokymotrukmeValNeLTcommand + i)
            })
            foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoMokymosiKomp = true
          }
        } // tyrimu
        for (let i = 1; i <= parseInt(req.body.table242_name); i++) {
          if (eval(kTOV4_tyrimupavadcommand + i) != "" || eval(kTOV4_tyrimupazymNrcommand + i) != "" ||
            eval(kTOV4_tyrimutrukmeValLTcommand + i) != "" || eval(kTOV4_tyrimutrukmeValNeLTcommand + i) != "") {
            foundUser.destytojas.kTOV4_KV01.kompetencijos.tyrimu.push({
              pavadinimas: eval(kTOV4_tyrimupavadcommand + i),
              pazymNr: eval(kTOV4_tyrimupazymNrcommand + i),
              trukmeValLT: eval(kTOV4_tyrimutrukmeValLTcommand + i),
              trukmeValNeLT: eval(kTOV4_tyrimutrukmeValNeLTcommand + i)
            })
            foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoTyrimuKomp = true
          }
        } //bendrosios
        for (let i = 1; i <= parseInt(req.body.table243_name); i++) {
          if (eval(kTOV4_bendrosiospavadcommand + i) != "" || eval(kTOV4_bendrosiospazymNrcommand + i) != "" ||
            eval(kTOV4_bendrosiostrukmeValLTcommand + i) != "" || eval(kTOV4_bendrosiostrukmeValNeLTcommand + i) != "") {
            foundUser.destytojas.kTOV4_KV01.kompetencijos.bendrosios.push({
              pavadinimas: eval(kTOV4_bendrosiospavadcommand + i),
              pazymNr: eval(kTOV4_bendrosiospazymNrcommand + i),
              trukmeValLT: eval(kTOV4_bendrosiostrukmeValLTcommand + i),
              trukmeValNeLT: eval(kTOV4_bendrosiostrukmeValNeLTcommand + i)
            })
            foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoBendrKomp = true
          }
        } //dalykines
        for (let i = 1; i <= parseInt(req.body.table244_name); i++) {
          if (eval(kTOV4_dalykpavadcommand + i) != "" || eval(kTOV4_dalykpazymNrcommand + i) != "" ||
            eval(kTOV4_dalyktrukmeValLTcommand + i) != "" || eval(kTOV4_dalyktrukmeValNeLTcommand + i) != "") {
            foundUser.destytojas.kTOV4_KV01.kompetencijos.dalykines.push({
              pavadinimas: eval(kTOV4_dalykpavadcommand + i),
              pazymNr: eval(kTOV4_dalykpazymNrcommand + i),
              trukmeValLT: eval(kTOV4_dalyktrukmeValLTcommand + i),
              trukmeValNeLT: eval(kTOV4_dalyktrukmeValNeLTcommand + i)
            })
            foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoDalykKomp = true
          }
        }
        foundUser.destytojas.kTOV4_KV01.kompetencijos.isVisoValLT = req.body.kTOV4_trukmeValLT,
          foundUser.destytojas.kTOV4_KV01.kompetencijos.isVisoValNeLT = req.body.kTOV4_trukmeValNeLT
        // 25 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table25_name); i++) {
          if (eval(kTOV4_25renginysTemacommand + i) != "" || eval(kTOV4_25kompGrupecommand + i) != "" ||
            eval(kTOV4_25skirtacommand + i) != "") {
            foundUser.destytojas.kTOV4_25.push({
              nr: i,
              renginysTema: eval(kTOV4_25renginysTemacommand + i),
              kompGrupe: eval(kTOV4_25kompGrupecommand + i),
              skirta: eval(kTOV4_25skirtacommand + i)
            })
          }
        } // 26 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table26_name); i++) {
          if (eval(kTOV4_26imonIstaigcommand + i) != "" || eval(kTOV4_26kompGrupecommand + i) != "" ||
            eval(kTOV4_26trukmeValcommand + i) != "" || eval(kTOV4_26datacommand + i) != "") {
            foundUser.destytojas.kTOV4_26.push({
              nr: i,
              imonIstaig: eval(kTOV4_26imonIstaigcommand + i),
              kompGrupe: eval(kTOV4_26kompGrupecommand + i),
              trukmeVal: eval(kTOV4_26trukmeValcommand + i),
              data: eval(kTOV4_26datacommand + i)
            })
          }
        } // 27 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table27_name); i++) {
          if (eval(kTOV4_KV03studKryptiscommand + i) != "" || eval(kTOV4_KV03saliscommand + i) != "" ||
            eval(kTOV4_KV03institucijacommand + i) != "" || eval(kTOV4_KV03dalykascommand + i) != "") {
            foundUser.destytojas.kTOV4_KV03.push({
              nr: eval(kTOV4_KV03nrcommand + i),
              studKryptis: eval(kTOV4_KV03studKryptiscommand + i),
              salis: eval(kTOV4_KV03saliscommand + i),
              institucija: eval(kTOV4_KV03institucijacommand + i),
              dalykas: eval(kTOV4_KV03dalykascommand + i)
            })
          }
        } // 28.1 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table281_name); i++) {
          if (eval(kTOV4_O01_1veiklPobudcommand + i) != "" || eval(kTOV4_O01_1isakNrDatacommand + i) != "") {
            foundUser.destytojas.kTOV4_O01.kTOV4_O01_1.push({
              nr: eval(kTOV4_O01_1nrcommand + i),
              veiklPobud: eval(kTOV4_O01_1veiklPobudcommand + i),
              isakNrData: eval(kTOV4_O01_1isakNrDatacommand + i)
            })
          }
        } // 28.2 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table282_name); i++) {
          if (eval(kTOV4_O01_2destytojascommand + i) != "" || eval(kTOV4_O01_2veiklPobudcommand + i) != "" ||
            eval(kTOV4_O01_2dataVietacommand + i) != "" || eval(kTOV4_O01_2ktKomentaraicommand + i) != "") {
            foundUser.destytojas.kTOV4_O01.kTOV4_O01_2.push({
              nr: eval(kTOV4_O01_2nrcommand + i),
              destytojas: eval(kTOV4_O01_2destytojascommand + i),
              veiklPobud: eval(kTOV4_O01_2veiklPobudcommand + i),
              dataVieta: eval(kTOV4_O01_2dataVietacommand + i),
              ktKomentarai: eval(kTOV4_O01_2ktKomentaraicommand + i)
            })
          }
        } // 29 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table29_name); i++) {
          if (eval(kTOV4_29veiklacommand + i) != "" || eval(kTOV4_29socPartneriscommand + i) != "") {
            foundUser.destytojas.kTOV4_29.push({
              nr: i,
              veikla: eval(kTOV4_29veiklacommand + i),
              socPartneris: eval(kTOV4_29socPartneriscommand + i)
            })
          }
        } // savianalize lentelė submit
        for (let i = 1; i <= parseInt(req.body.tablekTOV4_S_name); i++) {
          if (eval(kTOV4_Sstiprybescommand + i) != "" || eval(kTOV4_Stobulintinacommand + i) != "") {
            foundUser.destytojas.kTOV4_S.push({
              nr: eval(kTOV4_Snrcommand + i),
              stiprybes: eval(kTOV4_Sstiprybescommand + i),
              tobulintina: eval(kTOV4_Stobulintinacommand + i)
            })
          }
        } // 30 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table30_name); i++) {
          if (eval(kV5_KT02studKryptiscommand + i) != "" || eval(kV5_KT02diplomantascommand + i) != "" ||
            eval(kV5_KT02studProgrcommand + i) != "" || eval(kV5_KT02darboTemacommand + i) != "") {
            foundUser.destytojas.kV5_KT02.push({
              nr: eval(kV5_KT02nrcommand + i),
              studKryptis: eval(kV5_KT02studKryptiscommand + i),
              diplomantas: eval(kV5_KT02diplomantascommand + i),
              studProgr: eval(kV5_KT02studProgrcommand + i),
              darboTema: eval(kV5_KT02darboTemacommand + i)
            })
          }
        } // 31 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table31_name); i++) {
          if (eval(kV5_KT01studKryptiscommand + i) != "" || eval(kV5_KT01diplomantascommand + i) != "" ||
            eval(kV5_KT01studProgrcommand + i) != "" || eval(kV5_KT01darboTemacommand + i) != "" ||
            eval(kV5_KT01uzsakovascommand + i) != "") {
            foundUser.destytojas.kV5_KT01.push({
              nr: eval(kV5_KT01nrcommand + i),
              studKryptis: eval(kV5_KT01studKryptiscommand + i),
              diplomantas: eval(kV5_KT01diplomantascommand + i),
              studProgr: eval(kV5_KT01studProgrcommand + i),
              darboTema: eval(kV5_KT01darboTemacommand + i),
              uzsakovas: eval(kV5_KT01uzsakovascommand + i)
            })
          }
        }
        // 32 table submit
        for (let i = 1; i <= parseInt(req.body.table321_name); i++) {
          if (eval(kV5_32socaprasymascommand + i) != "") {
            foundUser.destytojas.kV5_32.socAtskMaz.push({
              aprasymas: eval(kV5_32socaprasymascommand + i)
            })
          }
        }
        for (let i = 1; i <= parseInt(req.body.table322_name); i++) {
          if (eval(kV5_32aplinkaprasymascommand + i) != "") {
            foundUser.destytojas.kV5_32.aplinkosaugInic.push({
              aprasymas: eval(kV5_32aplinkaprasymascommand + i)
            })
          }
        }
        for (let i = 1; i <= parseInt(req.body.table323_name); i++) {
          if (eval(kV5_32valstybaprasymascommand + i) != "") {
            foundUser.destytojas.kV5_32.lietValstybPuosel.push({
              aprasymas: eval(kV5_32valstybaprasymascommand + i)
            })
          }
        }
        for (let i = 1; i <= parseInt(req.body.table324_name); i++) {
          if (eval(kV5_32etnoaprasymascommand + i) != "") {
            foundUser.destytojas.kV5_32.lietEtnokPuos.push({
              aprasymas: eval(kV5_32etnoaprasymascommand + i)
            })
          }
        }
        for (let i = 1; i <= parseInt(req.body.table325_name); i++) {
          if (eval(kV5_32savaprasymascommand + i) != "") {
            foundUser.destytojas.kV5_32.savanorystIniciatyv.push({
              aprasymas: eval(kV5_32savaprasymascommand + i)
            })
          }
        } // 33 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table33_name); i++) {
          if (eval(kV5_33veiklacommand + i) != "" || eval(kV5_33veiklPartnercommand + i) != "" ||
            eval(kV5_33organizaccommand + i) != "" || eval(kV5_33veiklOrientavimcommand + i) != "" ||
            eval(kV5_33dalyviaicommand + i) != "" || eval(kV5_33laikascommand + i) != "" || eval(kV5_33vietacommand + i) != "") {
            foundUser.destytojas.kV5_33.push({
              nr: i,
              veikla: eval(kV5_33veiklacommand + i),
              veiklPartner: eval(kV5_33veiklPartnercommand + i),
              organizac: eval(kV5_33organizaccommand + i),
              veiklOrientavim: eval(kV5_33veiklOrientavimcommand + i),
              dalyviai: eval(kV5_33dalyviaicommand + i),
              laikas: eval(kV5_33laikascommand + i),
              vieta: eval(kV5_33vietacommand + i)
            })
          }
        } // 34 lentelė submit
        for (let i = 1; i <= parseInt(req.body.table34_name); i++) {
          if (eval(kV5_34pavadinimascommand + i) != "" || eval(kV5_34vykdytPartnercommand + i) != "" ||
            eval(kV5_34dalyviaicommand + i) != "" || eval(kV5_34finansavimcommand + i) != "" ||
            eval(kV5_34rezultataicommand + i) != "" || eval(kV5_34salisDatacommand + i) != "") {
            foundUser.destytojas.kV5_34.push({
              nr: i,
              pavadinimas: eval(kV5_34pavadinimascommand + i),
              vykdytPartner: eval(kV5_34vykdytPartnercommand + i),
              dalyviai: eval(kV5_34dalyviaicommand + i),
              finansavim: eval(kV5_34finansavimcommand + i),
              rezultatai: eval(kV5_34rezultataicommand + i),
              salisData: eval(kV5_34salisDatacommand + i)
            })
          }
        }
        foundUser.destytojas.kV5_kitaInfo = req.body.kV5_kitaInfo,
          foundUser.updated_for = req.user.username,
          foundUser.busena = req.body.ataskaitos_busena

        foundUser.save(function(err) {
          if (!err) {
            console.log("Succesfully submitted");
            res.redirect("/user-window");
          }
        });
      } else {
        console.log("User does'f found");
      }
    }
  });
});

//----------------------------------------------------------katedros vedejai
app.get("/create-dep", function(req, res) {
  //turi isvesti visu destytoju info
  if (req.isAuthenticated()) {

    User.findById(req.user.id, function(err, logedInUser) {
      if (err) {
        console.log(err);
      } else {

        let vedejoKatedra = req.user.katedra;

        User.find({
          katedra: vedejoKatedra,
          busena: "užrakinta"
        }, function(err, users) {
          if (err) {
            console.log(err);
          } else {
            res.render("create-dep", {
              users: users,
              logedInUser: logedInUser
            });
          }
        });

      }
    });
  } else {
    res.redirect("/login");
  }

});

app.post("/create-dep", (req, res) => {


  User.findById(req.user.id, function(err, foundUser) {
    if (err) {
      console.log("Error...");
      console.log(err);

    } else {
      if (foundUser) {
        // 1 lentelė
        var mV2_D04nrcommand = "req.body.mV2_D04nr";
        var mV2_D04studKryptiscommand = "req.body.mV2_D04studKryptis";
        var mV2_D04studProgrcommand = "req.body.mV2_D04studProgr";
        var mV2_D04progrKodascommand = "req.body.mV2_D04progrKodas";
        var mV2_D04isakNrDatacommand = "req.body.mV2_D04isakNrData";
        var mV2_D04studKryptAkreditcommand = "req.body.mV2_D04studKryptAkredit";
        var mV2_D04akreditLaikotcommand = "req.body.mV2_D04akreditLaikot";
        var mV2_D04eCTS1command = "req.body.mV2_D04eCTS";
        // 2 lent
        var lent2_nrcommand = "req.body.lent2_nr";
        var lent2_pavVardcommand = "req.body.lent2_pavVard";
        var lent2_pareigoscommand = "req.body.lent2_pareigos";
        var lent2_darbovTipascommand = "req.body.lent2_darbovTipas";
        var lent2_pedagogStazascommand = "req.body.lent2_pedagogStazas";
        var lent2_praktinStazascommand = "req.body.lent2_praktinStazas";
        //3 lent
        var lent3_nrcommand = "req.body.lent3_nr";
        var lent3_studKryptiscommand = "req.body.lent3_studKryptis";
        var lent3_studProgrcommand = "req.body.lent3_studProgr";
        var lent3_destytojascommand = "req.body.lent3_destytojas";
        var lent3_imonIstaigcommand = "req.body.lent3_imonIstaig";
        // 4 lent
        var lent4_nrcommand = "req.body.lent4_nr";
        var lent4_bibliografAprcommand = "req.body.lent4_bibliografApr";
        var lent4_tipascommand = "req.body.lent4_tipas";
        var lent4_mokslSritcommand = "req.body.lent4_mokslSrit";
        var lent4_mokslKryptcommand = "req.body.lent4_mokslKrypt";
        // 5 lent
        var mV2_M04nrcommand = "req.body.mV2_M04nr";
        var mV2_M04destytojascommand = "req.body.mV2_M04destytojas";
        var mV2_M04studProgrcommand = "req.body.mV2_M04studProgr";
        var mV2_M04dalykPavadcommand = "req.body.mV2_M04dalykPavad";
        var mV2_M04apimtisKreditcommand = "req.body.mV2_M04apimtisKredit";
        var mV2_M04busenacommand = "req.body.mV2_M04busena";
        // 6 lent
        var mV2_D06nrcommand = "req.body.mV2_D06nr";
        var mV2_D06studProgrcommand = "req.body.mV2_D06studProgr";
        var mV2_D06progrKodascommand = "req.body.mV2_D06progrKodas";
        var mV2_D06atlPatobulincommand = "req.body.mV2_D06atlPatobulin";
        var mV2_D06tobulinPriezastcommand = "req.body.mV2_D06tobulinPriezast";
        var mV2_D06tobulinIrodcommand = "req.body.mV2_D06tobulinIrod";
        // 7 lent
        var mV2_D01nrcommand = "req.body.mV2_D01nr";
        var mV2_D01destytojascommand = "req.body.mV2_D01destytojas";
        var mV2_D01komitetascommand = "req.body.mV2_D01komitetas";
        var mV2_D01veiklacommand = "req.body.mV2_D01veikla";
        var mV2_D01rezultataicommand = "req.body.mV2_D01rezultatai";
        //8 lent
        var mV2_D02nrcommand = "req.body.mV2_D02nr";
        var mV2_D02destytojascommand = "req.body.mV2_D02destytojas";
        var mV2_D02studKryptcommand = "req.body.mV2_D02studKrypt";
        var mV2_D02veiklacommand = "req.body.mV2_D02veikla";
        var mV2_D02rezultataicommand = "req.body.mV2_D02rezultatai";
        //9 lent
        var mV2_D03nrcommand = "req.body.mV2_D03nr";
        var mV2_D03destytojascommand = "req.body.mV2_D03destytojas";
        var mV2_D03studKryptiscommand = "req.body.mV2_D03studKryptis";
        var mV2_D03studProgrcommand = "req.body.mV2_D03studProgr";
        var mV2_D03veiklacommand = "req.body.mV2_D03veikla";
        var mV2_D03rezultataicommand = "req.body.mV2_D03rezultatai";
        // 10 lent
        var mV2_M03nrcommand = "req.body.mV2_M03nr";
        var mV2_M03destytojascommand = "req.body.mV2_M03destytojas";
        var mV2_M03studProgrcommand = "req.body.mV2_M03studProgr";
        var mV2_M03dalykPavadcommand = "req.body.mV2_M03dalykPavad";
        var mV2_M03apimtisKreditcommand = "req.body.mV2_M03apimtisKredit";
        //11 lent
        var mV2_S01nrcommand = "req.body.mV2_S01nr";
        var mV2_S01destytojascommand = "req.body.mV2_S01destytojas";
        var mV2_S01veiklacommand = "req.body.mV2_S01veikla";
        var mV2_S01dataVietacommand = "req.body.mV2_S01dataVieta";
        //mV2_S
        var mV2_Snrcommand = "req.body.mV2_Snr";
        var mV2_Sstiprybescommand = "req.body.mV2_Sstiprybes";
        var mV2_Stobulintinacommand = "req.body.mV2_Stobulintina";
        // 12 lent
        var tMTEP3_T01nrcommand = "req.body.tMTEP3_T01nr";
        var tMTEP3_T01tyrTematcommand = "req.body.tMTEP3_T01tyrTemat";
        var tMTEP3_T01destytojascommand = "req.body.tMTEP3_T01destytojas";
        var tMTEP3_T01tyrGrupcommand = "req.body.tMTEP3_T01tyrGrup";
        var tMTEP3_T01mokslSritcommand = "req.body.tMTEP3_T01mokslSrit";
        var tMTEP3_T01mokslKryptcommand = "req.body.tMTEP3_T01mokslKrypt";
        // 13 lent
        var tMTEP3_T02nrcommand = "req.body.tMTEP3_T02nr";
        var tMTEP3_T02bibliografAprcommand = "req.body.tMTEP3_T02bibliografApr";
        var tMTEP3_T02tipascommand = "req.body.tMTEP3_T02tipas";
        var tMTEP3_T02mokslSritcommand = "req.body.tMTEP3_T02mokslSrit";
        var tMTEP3_T02mokslKryptcommand = "req.body.tMTEP3_T02mokslKrypt";
        var tMTEP3_T02duomBazecommand = "req.body.tMTEP3_T02duomBaze";
        //14 lent
        var tMTEP3_T03nrcommand = "req.body.tMTEP3_T03nr";
        var tMTEP3_T03pilnasBiblAprcommand = "req.body.tMTEP3_T03pilnasBiblApr";
        var tMTEP3_T03rengTipascommand = "req.body.tMTEP3_T03rengTipas";
        //15 lent
        var tMTEP3_T04nrcommand = "req.body.tMTEP3_T04nr";
        var tMTEP3_T04konsultantascommand = "req.body.tMTEP3_T04konsultantas";
        var tMTEP3_T04uzsakovascommand = "req.body.tMTEP3_T04uzsakovas";
        var tMTEP3_T04temacommand = "req.body.tMTEP3_T04tema";
        var tMTEP3_T04datacommand = "req.body.tMTEP3_T04data";
        var tMTEP3_T04atlygArNecommand = "req.body.tMTEP3_T04atlygArNe";
        // 16.1 lent
        var tMTEP3_T05nrcommand = "req.body.tMTEP3_T05nr";
        var tMTEP3_T05destytojascommand = "req.body.tMTEP3_T05destytojas";
        var tMTEP3_T05veiklPavadcommand = "req.body.tMTEP3_T05veiklPavad";
        var tMTEP3_T05veiklRezultcommand = "req.body.tMTEP3_T05veiklRezult";
        var tMTEP3_T05atlygArNecommand = "req.body.tMTEP3_T05atlygArNe";
        //16.2 lent
        var lent162_nrnrcommand = "req.body.lent162_nr";
        var lent162_destytojascommand = "req.body.lent162_destytojas";
        var lent162_pavadinimascommand = "req.body.lent162_pavadinimas";
        var lent162_pastaboscommand = "req.body.lent162_pastabos";
        //16.3 lent
        var tMTEP3_T16nrcommand = "req.body.tMTEP3_T16nr";
        var tMTEP3_T16autoriuscommand = "req.body.tMTEP3_T16autorius";
        var tMTEP3_T16pavadinimascommand = "req.body.tMTEP3_T16pavadinimas";
        var tMTEP3_T16uzsakovascommand = "req.body.tMTEP3_T16uzsakovas";
        //17 lent
        var tMTEP3_T06nrcommand = "req.body.tMTEP3_T06nr";
        var tMTEP3_T06autoriuscommand = "req.body.tMTEP3_T06autorius";
        var tMTEP3_T06menoSritcommand = "req.body.tMTEP3_T06menoSrit";
        var tMTEP3_T06pobudiscommand = "req.body.tMTEP3_T06pobudis";
        var tMTEP3_T06realizVietacommand = "req.body.tMTEP3_T06realizVieta";
        var tMTEP3_T06datacommand = "req.body.tMTEP3_T06data";
        var tMTEP3_T06atlygArNecommand = "req.body.tMTEP3_T06atlygArNe";
        //18 lent
        var tMTEP3_T07nrcommand = "req.body.tMTEP3_T07nr";
        var tMTEP3_T07atlikejascommand = "req.body.tMTEP3_T07atlikejas";
        var tMTEP3_T07menoSritcommand = "req.body.tMTEP3_T07menoSrit";
        var tMTEP3_T07pavadinimascommand = "req.body.tMTEP3_T07pavadinimas";
        var tMTEP3_T07atlikVietacommand = "req.body.tMTEP3_T07atlikVieta";
        var tMTEP3_T07datacommand = "req.body.tMTEP3_T07data";
        var tMTEP3_T07atlygArNecommand = "req.body.tMTEP3_T07atlygArNe";
        //19 lent
        var tMTEP3_T08Snrcommand = "req.body.tMTEP3_T08Snr";
        var tMTEP3_T08atlikejascommand = "req.body.tMTEP3_T08atlikejas";
        var tMTEP3_T08menoSritcommand = "req.body.tMTEP3_T08menoSrit";
        var tMTEP3_T08pavadinimascommand = "req.body.tMTEP3_T08pavadinimas";
        var tMTEP3_T08atlikVietacommand = "req.body.tMTEP3_T08atlikVieta";
        var tMTEP3_T08datacommand = "req.body.tMTEP3_T08data";
        var tMTEP3_T08atlygArNecommand = "req.body.tMTEP3_T08atlygArNe";
        //20 lent
        var tMTEP3_T09nrcommand = "req.body.tMTEP3_T09nr";
        var tMTEP3_T09atlikejascommand = "req.body.tMTEP3_T09atlikejas";
        var tMTEP3_T09menoSritcommand = "req.body.tMTEP3_T09menoSrit";
        var tMTEP3_T09pavadinimascommand = "req.body.tMTEP3_T09pavadinimas";
        var tMTEP3_T09atlikVietacommand = "req.body.tMTEP3_T09atlikVieta";
        var tMTEP3_T09datacommand = "req.body.tMTEP3_T09data";
        var tMTEP3_T09atlygArNecommand = "req.body.tMTEP3_T09atlygArNe";
        //21 lent
        var tMTEP3_T10nrcommand = "req.body.tMTEP3_T10nr";
        var tMTEP3_T10destytojascommand = "req.body.tMTEP3_T10destytojas";
        var tMTEP3_T10veiklPobudcommand = "req.body.tMTEP3_T10veiklPobud";
        var tMTEP3_T10veiklTikslcommand = "req.body.tMTEP3_T10veiklTiksl";
        var tMTEP3_T10dataVietacommand = "req.body.tMTEP3_T10dataVieta";
        var tMTEP3_T10dalyvSkcommand = "req.body.tMTEP3_T10dalyvSk";
        var tMTEP3_T10ktKomentaraicommand = "req.body.tMTEP3_T10ktKomentarai";
        var tMTEP3_T10atlygArNecommand = "req.body.tMTEP3_T10atlygArNe";
        //22 lent
        var tMTEP3_T11nrcommand = "req.body.tMTEP3_T11nr";
        var tMTEP3_T11destytojascommand = "req.body.tMTEP3_T11destytojas";
        var tMTEP3_T11veiklPobudcommand = "req.body.tMTEP3_T11veiklPobud";
        var tMTEP3_T11veiklTikslcommand = "req.body.tMTEP3_T11veiklTiksl";
        var tMTEP3_T11dataVietacommand = "req.body.tMTEP3_T11dataVieta";
        var tMTEP3_T11dalyvSkcommand = "req.body.tMTEP3_T11dalyvSk";
        var tMTEP3_T11ktKomentaraicommand = "req.body.tMTEP3_T11ktKomentarai";
        var tMTEP3_T11atlygArNecommand = "req.body.tMTEP3_T11atlygArNe";
        //23 lent
        var tMTEP3_T12nrcommand = "req.body.tMTEP3_T12nr";
        var tMTEP3_T12destytojascommand = "req.body.tMTEP3_T12destytojas";
        var tMTEP3_T12veiklPobudcommand = "req.body.tMTEP3_T12veiklPobud";
        var tMTEP3_T12dataVietacommand = "req.body.tMTEP3_T12dataVieta";
        //24 lent
        var tMTEP3_T14nrcommand = "req.body.tMTEP3_T14nr";
        var tMTEP3_T14destytojascommand = "req.body.tMTEP3_T14destytojas";
        var tMTEP3_T14renginyscommand = "req.body.tMTEP3_T14renginys";
        var tMTEP3_T14veiklPobudcommand = "req.body.tMTEP3_T14veiklPobud";
        var tMTEP3_T14dataVietacommand = "req.body.tMTEP3_T14dataVieta";
        //25 lent
        var tMTEP3_T13nrcommand = "req.body.tMTEP3_T13nr";
        var tMTEP3_T13destytojascommand = "req.body.tMTEP3_T13destytojas";
        var tMTEP3_T13studDuomcommand = "req.body.tMTEP3_T13studDuom";
        var tMTEP3_T13renginioPavadcommand = "req.body.tMTEP3_T13renginioPavad";
        var tMTEP3_T13rezultatascommand = "req.body.tMTEP3_T13rezultatas";
        var tMTEP3_T13datacommand = "req.body.tMTEP3_T13data";
        //TMTEP_S
        var tMTEP3_Snrcommand = "req.body.tMTEP3_Snr";
        var tMTEP3_Sstiprybescommand = "req.body.tMTEP3_Sstiprybes";
        var tMTEP3_Stobulintinacommand = "req.body.tMTEP3_Stobulintina";
        //26 lent priedas
        //mokymosi
        var kTOV4_KV01mokymosiKomppavadcommand = "req.body.kTOV4_KV01mokymosiKomppavad";
        var kTOV4_KV01mokymosiKomppazymNrcommand = "req.body.kTOV4_KV01mokymosiKomppazymNr";
        var kTOV4_KV01mokymosiKomptrukmeValLTcommand = "req.body.kTOV4_KV01mokymosiKomptrukmeValLT";
        var kTOV4_KV01mokymosiKomptrukmeValNeLTcommand = "req.body.kTOV4_KV01mokymosiKomptrukmeValNeLT";
        var kTOV4_KV01mokymosiKompdalyviscommand = "req.body.kTOV4_KV01mokymosiKompdalyvis";
        // tyrimu
        var kTOV4_KV01tyrimuKomppavadcommand = "req.body.kTOV4_KV01tyrimuKomppavad";
        var kTOV4_KV01tyrimuKomppazymNrcommand = "req.body.kTOV4_KV01tyrimuKomppazymNr";
        var kTOV4_KV01tyrimuKomptrukmeValLTcommand = "req.body.kTOV4_KV01tyrimuKomptrukmeValLT";
        var kTOV4_KV01tyrimuKomptrukmeValNeLTcommand = "req.body.kTOV4_KV01tyrimuKomptrukmeValNeLT";
        var kTOV4_KV01tyrimuKompdalyviscommand = "req.body.kTOV4_KV01tyrimuKompdalyvis";
        //bendrosios
        var kTOV4_KV01bendrKomppavadcommand = "req.body.kTOV4_KV01bendrKomppavad";
        var kTOV4_KV01bendrKomppazymNrcommand = "req.body.kTOV4_KV01bendrKomppazymNr";
        var kTOV4_KV01bendrKomptrukmeValLTcommand = "req.body.kTOV4_KV01bendrKomptrukmeValLT";
        var kTOV4_KV01bendrKomptrukmeValNeLTcommand = "req.body.kTOV4_KV01bendrKomptrukmeValNeLT";
        var kTOV4_KV01bendrKompdalyviscommand = "req.body.kTOV4_KV01bendrKompdalyvis";
        //dalykines
        var kTOV4_KV01dalykKomppavadcommand = "req.body.kTOV4_KV01dalykKomppavad";
        var kTOV4_KV01dalykKomppazymNrcommand = "req.body.kTOV4_KV01dalykKomppazymNr";
        var kTOV4_KV01dalykKompTrukmeValLTcommand = "req.body.kTOV4_KV01dalykKompTrukmeValLT";
        var kTOV4_KV01dalykKompTrukmeValNeLTcommand = "req.body.kTOV4_KV01dalykKompTrukmeValNeLT";
        var kTOV4_KV01dalykKompdalyviscommand = "req.body.kTOV4_KV01dalykKompdalyvis";

        //26 lent
        //mokymosi
        // var tyrimuLTdestytojuSkcommand = "req.body.tyrimuLTdestytojuSk";
        // var mokymosiLTtrukmeValcommand = "req.body.mokymosiLTtrukmeVal";
        // var mokymosiNeLttrukmeValcommand = "req.body.mokymosiNeLttrukmeVal";
        // var mokymosiIsVisoValcommand = "req.body.mokymosiIsVisoVal";
        //tyrimu
        // var mokymosiLTdestytojuSkcommand = "req.body.mokymosiLTdestytojuSk";
        // var tyrimuLTtrukmeValcommand = "req.body.tyrimuLTtrukmeVal";
        // var tyrimuNeLttrukmeValcommand = "req.body.tyrimuNeLttrukmeVal";
        // var tyrimuIsVisoValcommand = "req.body.tyrimuIsVisoVal";
        //bendrosios
        // var bendrosiosLTdestytojuSkcommand = "req.body.bendrosiosLTdestytojuSk";
        // var bendrosiosLTtrukmeValcommand = "req.body.bendrosiosLTtrukmeVal";
        // var bendrosiosNeLttrukmeValcommand = "req.body.bendrosiosNeLttrukmeVal";
        // var bendrosiosIsVisoValcommand = "req.body.bendrosiosIsVisoVal";
        //dalykines
        // var dalykinesLTdestytojuSkcommand = "req.body.dalykinesLTdestytojuSk";
        // var dalykinesLTtrukmeValcommand = "req.body.dalykinesLTtrukmeVal";
        // var dalykinesNeLttrukmeValcommand = "req.body.dalykinesNeLttrukmeVal";
        // var dalykinesIsVisoValcommand = "req.body.dalykinesIsVisoVal";

        //27 lent
        var lent27_nrcommand = "req.body.lent27_nr";
        var lent27_renginysTemacommand = "req.body.lent27_renginysTema";
        var lent27_kompGrupecommand = "req.body.lent27_kompGrupe";
        var lent27_skirtacommand = "req.body.lent27_skirta";
        var lent27_lektoriuscommand = "req.body.lent27_lektorius";
        var lent27_lektTipascommand = "req.body.lent27_lektTipas";
        //28 lent
        var lent28_nrcommand = "req.body.lent28_nr";
        var lent28_destytojascommand = "req.body.lent28_destytojas";
        var lent28_imonIstaigcommand = "req.body.lent28_imonIstaig";
        var lent28_kompGrupecommand = "req.body.lent28_kompGrupe";
        var lent28_trukmeValcommand = "req.body.lent28_trukmeVal";
        var lent28_datacommand = "req.body.lent28_data";
        //29 lent
        var kTOV4_KV03nrcommand = "req.body.kTOV4_KV03nr";
        var kTOV4_KV03destytojascommand = "req.body.kTOV4_KV03destytojas";
        var kTOV4_KV03studKryptiscommand = "req.body.kTOV4_KV03studKryptis";
        var kTOV4_KV03saliscommand = "req.body.kTOV4_KV03salis";
        var kTOV4_KV03institucijacommand = "req.body.kTOV4_KV03institucija";
        var kTOV4_KV03dalykascommand = "req.body.kTOV4_KV03dalykas";
        //30 lent
        var lent30_nrcommand = "req.body.lent30_nr";
        var lent30_destytojascommand = "req.body.lent30_destytojas";
        var lent30_studKryptiscommand = "req.body.lent30_studKryptis";
        var lent30_saliscommand = "req.body.lent30_salis";
        var lent30_institucijacommand = "req.body.lent30_institucija";
        var lent30_dalykascommand = "req.body.lent30_dalykas";
        // 31.1 lent
        var kTOV4_O01_1nrcommand = "req.body.kTOV4_O01_1nr";
        var kTOV4_O01_1destytojascommand = "req.body.kTOV4_O01_1destytojas";
        var kTOV4_O01_1veiklPobudcommand = "req.body.kTOV4_O01_1veiklPobud";
        var kTOV4_O01_1isakNrDatacommand = "req.body.kTOV4_O01_1isakNrData";
        // 31.2 lent
        var kTOV4_O01_2nrcommand = "req.body.kTOV4_O01_2nr";
        var kTOV4_O01_2destytojascommand = "req.body.kTOV4_O01_2destytojas";
        var kTOV4_O01_2veiklPobudcommand = "req.body.kTOV4_O01_2veiklPobud";
        var kTOV4_O01_2dataVietacommand = "req.body.kTOV4_O01_2dataVieta";
        var kTOV4_O01_2ktKomentaraicommand = "req.body.kTOV4_O01_2ktKomentarai";
        //kTOV4_S
        var kTOV4_Snrcommand = "req.body.kTOV4_Snr";
        var kTOV4_Sstiprybescommand = "req.body.kTOV4_Sstiprybes";
        var kTOV4_Stobulintinacommand = "req.body.kTOV4_Stobulintina";
        //32 lent
        var lent32_nrcommand = "req.body.lent32_nr";
        var lent32_studKryptiscommand = "req.body.lent32_studKryptis";
        var lent32_studProgrcommand = "req.body.lent32_studProgr";
        var lent32_strategPartnercommand = "req.body.lent32_strategPartner";
        //33 lent
        var lent33_nrcommand = "req.body.lent33_nr";
        var lent33_veiklacommand = "req.body.lent33_veikla";
        var lent33_socPartneriscommand = "req.body.lent33_socPartneris";
        var lent33_destytojascommand = "req.body.lent33_destytojas";
        //34 lent
        var lent34_nrcommand = "req.body.lent34_nr";
        var lent34_studKryptiscommand = "req.body.lent34_studKryptis";
        var lent34_studProgrcommand = "req.body.lent34_studProgr";
        var lent34_studentuSk1_command = "req.body.lent34_studentuSk1_";
        var lent34_studentuSk2_command = "req.body.lent34_studentuSk2_";
        var lent34_studentuSk3_command = "req.body.lent34_studentuSk3_";
        var lent34_studentuSk4_command = "req.body.lent34_studentuSk4_";
        var lent34_studentuSk5_command = "req.body.lent34_studentuSk5_";
        //35 lent
        var lent35_nrcommand = "req.body.lent35_nr";
        var lent35_studKryptiscommand = "req.body.lent35_studKryptis";
        var lent35_studProgrcommand = "req.body.lent35_studProgr";
        var lent35_studentuSkBendr1_command = "req.body.lent35_studentuSkBendr1_";
        var lent35_studentuSk1_command = "req.body.lent35_studentuSk1_";
        var lent35_studentuSkBendr2_command = "req.body.lent35_studentuSkBendr2_";
        var lent35_studentuSk2_command = "req.body.lent35_studentuSk2_";
        var lent35_studentuSkBendr3_command = "req.body.lent35_studentuSkBendr3_";
        var lent35_studentuSk3_command = "req.body.lent35_studentuSk3_";
        var lent35_studentuSkBendr4_command = "req.body.lent35_studentuSkBendr4_";
        var lent35_studentuSk4_command = "req.body.lent35_studentuSk4_";
        var lent35_studentuSkBendr5_command = "req.body.lent35_studentuSkBendr5_";
        var lent35_studentuSk5_command = "req.body.lent35_studentuSk5_";
        //36 lent
        var kV5_KT02nrcommand = "req.body.kV5_KT02nr";
        var kV5_KT02studKryptiscommand = "req.body.kV5_KT02studKryptis";
        var kV5_KT02studProgrcommand = "req.body.kV5_KT02studProgr";
        var kV5_KT02diplomantascommand = "req.body.kV5_KT02diplomantas";
        var kV5_KT02darboTemacommand = "req.body.kV5_KT02darboTema";
        //37 lent
        var kV5_KT01nrcommand = "req.body.kV5_KT01nr";
        var kV5_KT01studKryptiscommand = "req.body.kV5_KT01studKryptis";
        var kV5_KT01studProgrcommand = "req.body.kV5_KT01studProgr";
        var kV5_KT01diplomantascommand = "req.body.kV5_KT01diplomantas";
        var kV5_KT01darboTemacommand = "req.body.kV5_KT01darboTema";
        var kV5_KT01uzsakovascommand = "req.body.kV5_KT01uzsakovas";
        //38 lent
        var lent38_nrcommand = "req.body.lent38_nr";
        var lent38_pavadinimascommand = "req.body.lent38_pavadinimas";
        var lent38_vykdytPartnercommand = "req.body.lent38_vykdytPartner";
        var lent38_dalyviaicommand = "req.body.lent38_dalyviai";
        var lent38_finansavimcommand = "req.body.lent38_finansavim";
        var lent38_rezultataicommand = "req.body.lent38_rezultatai";
        var lent38_salisDatacommand = "req.body.lent38_salisData";
        //39 lent
        var lent39_nrcommand = "req.body.lent39_nr";
        var lent39_kryptyscommand = "req.body.lent39_kryptys";
        var lent39_aprasymascommand = "req.body.lent39_aprasymas";

        //40 lent 1
        var lent40_socAprasymascommand = "req.body.lent40_socaprasymas";
        var lent40_socDestytojascommand = "req.body.lent40_socdestytojas";
        //40 lent 2
        var lent40_aplinkAprasymascommand = "req.body.lent40_aplinkaprasymas";
        var lent40_aplinkDestytojascommand = "req.body.lent40_aplinkdestytojas";
        //40 lent 3
        var lent40_valstybAprasymascommand = "req.body.lent40_valstybaprasymas";
        var lent40_valstybDestytojascommand = "req.body.lent40_valstybdestytojas";
        //40 lent 4
        var lent40_etnoAprasymascommand = "req.body.lent40_etnoaprasymas";
        var lent40_etnoDestytojascommand = "req.body.lent40_savdestytojas";
        //40 lent 5
        var lent40_savAprasymascommand = "req.body.lent40_savaprasymas";
        var lent40_savDestytojascommand = "req.body.lent40_savdestytojas";
        //41 lent
        var lent41_nrcommand = "req.body.lent41_nr";
        var lent41_veiklacommand = "req.body.lent41_veikla";
        var lent41_veiklPartnercommand = "req.body.lent41_veiklPartner";
        var lent41_organizaccommand = "req.body.lent41_organizac";
        var lent41_veiklOrientavimcommand = "req.body.lent41_veiklOrientavim"
        var lent41_dalyviaicommand = "req.body.lent41_dalyviai";
        var lent41_laikascommand = "req.body.lent41_laikas";
        var lent41_vietacommand = "req.body.lent41_vieta";
        //veiklSavinalize
        var veiklSavinalizestiprybescommand = "req.body.veiklSavianalizStiprybes";
        var veiklSavinalizetobulintinacommand = "req.body.veiklSavianalizTobulintina";

        //template
        // var command = "req.body.kV5_KT01nr";
        // var command = "req.body.kV5_KT01studKryptis";
        // var command = "req.body.kV5_KT01studProgr";
        // var command = "req.body.kV5_KT01diplomantas";
        // var command = "req.body.kV5_KT01darboTema";
        // var command = "req.body.kV5_KT01uzsakovas";

        // 1 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table1_name); i++) {
          foundUser.katedrosVedejas.kKPP1_1.push({
            nr: eval(mV2_D04nrcommand + i),
            studKryptis: eval(mV2_D04studKryptiscommand + i),
            studProgr: eval(mV2_D04studProgrcommand + i),
            progrKodas: eval(mV2_D04progrKodascommand + i),
            isakNrData: eval(mV2_D04isakNrDatacommand + i),
            studKryptAkredit: eval(mV2_D04studKryptAkreditcommand + i),
            akreditLaikot: eval(mV2_D04akreditLaikotcommand + i),
            eCTS: eval(mV2_D04eCTS1command + i)
          })
        } // 2 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table2_name); i++) {
          foundUser.katedrosVedejas.kDS1.push({
            nr: eval(lent2_nrcommand + i),
            vardPavard: eval(lent2_pavVardcommand + i),
            pareigos: eval(lent2_pareigoscommand + i),
            darbovTipas: eval(lent2_darbovTipascommand + i),
            pedagogStazas: eval(lent2_pedagogStazascommand + i),
            praktinStazas: eval(lent2_praktinStazascommand + i)
          })
        } // 3 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table3_name); i++) {
          foundUser.katedrosVedejas.kKPP1_3.push({
            nr: eval(lent3_nrcommand + i),
            studKryptis: eval(lent3_studKryptiscommand + i),
            studProgr: eval(lent3_studProgrcommand + i),
            destytojas: eval(lent3_destytojascommand + i),
            imonIstaig: eval(lent3_imonIstaigcommand + i)
          })
        } // 4 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table4_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_M02.push({
            nr: eval(lent4_nrcommand + i),
            bibliografApr: eval(lent4_bibliografAprcommand + i),
            tipas: eval(lent4_tipascommand + i),
            mokslSrit: eval(lent4_mokslSritcommand + i),
            mokslKrypt: eval(lent4_mokslKryptcommand + i)
          })
        } // 5 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table5_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_M04.push({
            nr: eval(mV2_M04nrcommand + i),
            destytojas: eval(mV2_M04destytojascommand + i),
            studProgr: eval(mV2_M04studProgrcommand + i),
            dalykPavad: eval(mV2_M04dalykPavadcommand + i),
            apimtisKredit: eval(mV2_M04apimtisKreditcommand + i),
            busena: eval(mV2_M04busenacommand + i)
          })
        } // 6 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table6_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_D06.push({
            nr: eval(mV2_D06nrcommand + i),
            studProgr: eval(mV2_D06studProgrcommand + i),
            progrKodas: eval(mV2_D06progrKodascommand + i),
            atlPatobulin: eval(mV2_D06atlPatobulincommand + i),
            tobulinPriezast: eval(mV2_D06tobulinPriezastcommand + i),
            tobulinIrod: eval(mV2_D06tobulinIrodcommand + i)
          })
        } // 7 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table7_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_D01.push({
            nr: eval(mV2_D01nrcommand + i),
            destytojas: eval(mV2_D01destytojascommand + i),
            komitetas: eval(mV2_D01komitetascommand + i),
            veikla: eval(mV2_D01veiklacommand + i),
            rezultatai: eval(mV2_D01rezultataicommand + i)
          })
        } // 8 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table8_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_D02.push({
            nr: eval(mV2_D02nrcommand + i),
            destytojas: eval(mV2_D02destytojascommand + i),
            studKryptis: eval(mV2_D02studKryptcommand + i),
            veikla: eval(mV2_D02veiklacommand + i),
            rezultatai: eval(mV2_D02rezultataicommand + i)
          })
        } // 9 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table9_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_D03.push({
            nr: eval(mV2_D03nrcommand + i),
            destytojas: eval(mV2_D03destytojascommand + i),
            studKryptis: eval(mV2_D03studKryptiscommand + i),
            studProgr: eval(mV2_D03studProgrcommand + i),
            veikla: eval(mV2_D03veiklacommand + i),
            rezultatai: eval(mV2_D03rezultataicommand + i)
          })
        } // 10 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table10_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_M03.push({
            nr: eval(mV2_M03nrcommand + i),
            destytojas: eval(mV2_M03destytojascommand + i),
            studProgr: eval(mV2_M03studProgrcommand + i),
            dalykPavad: eval(mV2_M03dalykPavadcommand + i),
            apimtisKredit: eval(mV2_M03apimtisKreditcommand + i)

          })
        } // 11 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table11_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_S01.push({
            nr: eval(mV2_S01nrcommand + i),
            destytojas: eval(mV2_S01destytojascommand + i),
            veikla: eval(mV2_S01veiklacommand + i),
            dataVieta: eval(mV2_S01dataVietacommand + i)
          })
        }
        for (let i = 1; i <= parseInt(req.body.tablemV2_S_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_S.push({
            nr: eval(mV2_Snrcommand + i),
            stiprybes: eval(mV2_Sstiprybescommand + i),
            tobulintina: eval(mV2_Stobulintinacommand + i)
          })
        } // 12 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table12_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T01.push({
            nr: eval(tMTEP3_T01nrcommand + i),
            tyrTemat: eval(tMTEP3_T01tyrTematcommand + i),
            destytojas: eval(tMTEP3_T01destytojascommand + i),
            tyrGrup: eval(tMTEP3_T01tyrGrupcommand + i),
            mokslSrit: eval(tMTEP3_T01mokslSritcommand + i),
            mokslKrypt: eval(tMTEP3_T01mokslKryptcommand + i)
          })
        } // 13 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table13_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T02.push({
            nr: eval(tMTEP3_T02nrcommand + i),
            bibliografApr: eval(tMTEP3_T02bibliografAprcommand + i),
            tipas: eval(tMTEP3_T02tipascommand + i),
            mokslSrit: eval(tMTEP3_T02mokslSritcommand + i),
            mokslKrypt: eval(tMTEP3_T02mokslKryptcommand + i),
            duomBaze: eval(tMTEP3_T02duomBazecommand + i)
          })
        } // 14 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table14_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T03.push({
            nr: eval(tMTEP3_T03nrcommand + i),
            pilnasBiblApr: eval(tMTEP3_T03pilnasBiblAprcommand + i),
            rengTipas: eval(tMTEP3_T03rengTipascommand + i)
          })
        } // 15 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table15_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T04.push({
            nr: eval(tMTEP3_T04nrcommand + i),
            konsultantas: eval(tMTEP3_T04konsultantascommand + i),
            uzsakovas: eval(tMTEP3_T04uzsakovascommand + i),
            tema: eval(tMTEP3_T04temacommand + i),
            data: eval(tMTEP3_T04datacommand + i),
            atlygArNe: eval(tMTEP3_T04atlygArNecommand + i)
          })
        } // 16 lentelė 1 create-dep
        for (let i = 1; i <= parseInt(req.body.table161_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T05.push({
            nr: eval(tMTEP3_T05nrcommand + i),
            destytojas: eval(tMTEP3_T05destytojascommand + i),
            veiklPavad: eval(tMTEP3_T05veiklPavadcommand + i),
            veiklRezult: eval(tMTEP3_T05veiklRezultcommand + i),
            atlygArNe: eval(tMTEP3_T05atlygArNecommand + i)
          })
        } // 16 lentelė 2 create-dep
        for (let i = 1; i <= parseInt(req.body.table162_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_162.push({
            nr: eval(lent162_nrnrcommand + i),
            destytojas: eval(lent162_destytojascommand + i),
            pavadinimas: eval(lent162_pavadinimascommand + i),
            pastabos: eval(lent162_pastaboscommand + i)
          })
        } // 16 lentelė 3 create-dep
        for (let i = 1; i <= parseInt(req.body.table163_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T16.push({
            nr: eval(tMTEP3_T16nrcommand + i),
            rengejai: eval(tMTEP3_T16autoriuscommand + i),
            pavadinimas: eval(tMTEP3_T16pavadinimascommand + i),
            uzsakovas: eval(tMTEP3_T16uzsakovascommand + i)
          })
        } // 17 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table17_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T06.push({
            nr: eval(tMTEP3_T06nrcommand + i),
            autorius: eval(tMTEP3_T06autoriuscommand + i),
            menoSrit: eval(tMTEP3_T06menoSritcommand + i),
            pobudis: eval(tMTEP3_T06pobudiscommand + i),
            realizVieta: eval(tMTEP3_T06realizVietacommand + i),
            data: eval(tMTEP3_T06datacommand + i),
            atlygArNe: eval(tMTEP3_T06atlygArNecommand + i)
          })
        } // 18 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table18_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T07.push({
            nr: eval(tMTEP3_T07nrcommand + i),
            atlikejas: eval(tMTEP3_T07atlikejascommand + i),
            menoSrit: eval(tMTEP3_T07menoSritcommand + i),
            pavadinimas: eval(tMTEP3_T07pavadinimascommand + i),
            atlikVieta: eval(tMTEP3_T07atlikVietacommand + i),
            data: eval(tMTEP3_T07datacommand + i),
            atlygArNe: eval(tMTEP3_T07atlygArNecommand + i)
          })
        } // 19 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table19_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T08.push({
            nr: eval(tMTEP3_T08Snrcommand + i),
            atlikejas: eval(tMTEP3_T08atlikejascommand + i),
            menoSrit: eval(tMTEP3_T08menoSritcommand + i),
            pavadinimas: eval(tMTEP3_T08pavadinimascommand + i),
            atlikVieta: eval(tMTEP3_T08atlikVietacommand + i),
            data: eval(tMTEP3_T08datacommand + i),
            atlygArNe: eval(tMTEP3_T08atlygArNecommand + i)
          })
        } // 20 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table20_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T09.push({
            nr: eval(tMTEP3_T09nrcommand + i),
            atlikejas: eval(tMTEP3_T09atlikejascommand + i),
            menoSrit: eval(tMTEP3_T09menoSritcommand + i),
            pavadinimas: eval(tMTEP3_T09pavadinimascommand + i),
            atlikVieta: eval(tMTEP3_T09atlikVietacommand + i),
            data: eval(tMTEP3_T09datacommand + i),
            atlygArNe: eval(tMTEP3_T09atlygArNecommand + i)
          })
        } // 21 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table21_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T10.push({
            nr: eval(tMTEP3_T10nrcommand + i),
            destytojas: eval(tMTEP3_T10destytojascommand + i),
            veiklPobud: eval(tMTEP3_T10veiklPobudcommand + i),
            veiklTiksl: eval(tMTEP3_T10veiklTikslcommand + i),
            dataVieta: eval(tMTEP3_T10dataVietacommand + i),
            dalyvSk: eval(tMTEP3_T10dalyvSkcommand + i),
            ktKomentarai: eval(tMTEP3_T10ktKomentaraicommand + i),
            atlygArNe: eval(tMTEP3_T10atlygArNecommand + i)
          })
        } // 22 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table22_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T11.push({
            nr: eval(tMTEP3_T11nrcommand + i),
            destytojas: eval(tMTEP3_T11destytojascommand + i),
            veiklPobud: eval(tMTEP3_T11veiklPobudcommand + i),
            veiklTiksl: eval(tMTEP3_T11veiklTikslcommand + i),
            dataVieta: eval(tMTEP3_T11dataVietacommand + i),
            dalyvSk: eval(tMTEP3_T11dalyvSkcommand + i),
            ktKomentarai: eval(tMTEP3_T11ktKomentaraicommand + i),
            atlygArNe: eval(tMTEP3_T11atlygArNecommand + i)
          })
        } // 23 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table23_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T12.push({
            nr: eval(tMTEP3_T12nrcommand + i),
            destytojas: eval(tMTEP3_T12destytojascommand + i),
            veiklPobud: eval(tMTEP3_T12veiklPobudcommand + i),
            dataVieta: eval(tMTEP3_T12dataVietacommand + i)
          })
        } // 24 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table24_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T14.push({
            nr: eval(tMTEP3_T14nrcommand + i),
            destytojas: eval(tMTEP3_T14destytojascommand + i),
            renginys: eval(tMTEP3_T14renginyscommand + i),
            veiklPobud: eval(tMTEP3_T14veiklPobudcommand + i),
            dataVieta: eval(tMTEP3_T14dataVietacommand + i)
          })
        } // 25 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table25_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T13.push({
            nr: eval(tMTEP3_T13nrcommand + i),
            destytojas: eval(tMTEP3_T13destytojascommand + i),
            studDuom: eval(tMTEP3_T13studDuomcommand + i),
            renginioPavad: eval(tMTEP3_T13renginioPavadcommand + i),
            rezultatas: eval(tMTEP3_T13rezultatascommand + i),
            data: eval(tMTEP3_T13datacommand + i)
          })
        }
        for (let i = 1; i <= parseInt(req.body.tMTEP3_S_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_S.push({
            nr: eval(tMTEP3_Snrcommand + i),
            stiprybes: eval(tMTEP3_Sstiprybescommand + i),
            tobulintina: eval(tMTEP3_Stobulintinacommand + i)
          })
        }
        // 26 lentelė create-dep priedas
        // mokymosi
        for (let i = 1; i <= parseInt(req.body.table261_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.mokymosi.push({
            pavadinimas: eval(kTOV4_KV01mokymosiKomppavadcommand + i),
            pazymNr: eval(kTOV4_KV01mokymosiKomppazymNrcommand + i),
            trukmeValLT: eval(kTOV4_KV01mokymosiKomptrukmeValLTcommand + i),
            trukmeValNeLT: eval(kTOV4_KV01mokymosiKomptrukmeValNeLTcommand + i),
            destytojas: eval(kTOV4_KV01mokymosiKompdalyviscommand + i)
          })
        }
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.mokymosiIsVisoValLT = req.body.kTOV4_trukmeMokymValLT1,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.mokymosiIsVisoValNeLT = req.body.kTOV4_trukmeMokymValNeLT1
        // tyrimu
        for (let i = 1; i <= parseInt(req.body.table262_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.tyrimu.push({
            pavadinimas: eval(kTOV4_KV01tyrimuKomppavadcommand + i),
            pazymNr: eval(kTOV4_KV01tyrimuKomppazymNrcommand + i),
            trukmeValLT: eval(kTOV4_KV01tyrimuKomptrukmeValLTcommand + i),
            trukmeValNeLT: eval(kTOV4_KV01tyrimuKomptrukmeValNeLTcommand + i),
            destytojas: eval(kTOV4_KV01tyrimuKompdalyviscommand + i)
          })
        }
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.tyrimuIsVisoValLT = req.body.kTOV4_trukmeTyrimValLT2,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.tyrimuIsVisoValNeLT = req.body.kTOV4_trukmeTyrimValNeLT2
        //bendrosios
        for (let i = 1; i <= parseInt(req.body.table263_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.bendrosios.push({
            pavadinimas: eval(kTOV4_KV01bendrKomppavadcommand + i),
            pazymNr: eval(kTOV4_KV01bendrKomppazymNrcommand + i),
            trukmeValLT: eval(kTOV4_KV01bendrKomptrukmeValLTcommand + i),
            trukmeValNeLT: eval(kTOV4_KV01bendrKomptrukmeValNeLTcommand + i),
            destytojas: eval(kTOV4_KV01bendrKompdalyviscommand + i)
          })
        }
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.bendrosiosIsVisoValLT = req.body.kTOV4_trukmeBendrValLT3,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.bendrosiosIsVisoValNeLT = req.body.kTOV4_trukmeBendrValNeLT3
        //dalykines
        for (let i = 1; i <= parseInt(req.body.table264_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.dalykines.push({
            pavadinimas: eval(kTOV4_KV01dalykKomppavadcommand + i),
            pazymNr: eval(kTOV4_KV01dalykKomppazymNrcommand + i),
            trukmeValLT: eval(kTOV4_KV01dalykKompTrukmeValLTcommand + i),
            trukmeValNeLT: eval(kTOV4_KV01dalykKompTrukmeValNeLTcommand + i),
            destytojas: eval(kTOV4_KV01dalykKompdalyviscommand + i)
          })
        }
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.dalykinesIsVisoValLT = req.body.kTOV4_trukmeDalykValLT4,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.dalykinesIsVisoValNeLT = req.body.kTOV4_trukmeDalykValNeLT4

        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.isVisoValLT = req.body.kTOV4_trukmeValLTbendr,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.isVisoValNeLT = req.body.kTOV4_trukmeValNeLTbendr,
          //26 lent
          //mokymosi
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.mokymosi.destytojuSk = req.body.mokymosiLTdestytojuSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.mokymosi.trukmeValLT = req.body.mokymosiLTtrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.mokymosi.trukmeValNeLT = req.body.mokymosiNeLttrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.mokymosi.isVisoVal = req.body.mokymosiIsVisoVal,
          //tyrimu
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.tyrimu.destytojuSk = req.body.tyrimuLTdestytojuSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.tyrimu.trukmeValLT = req.body.tyrimuLTtrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.tyrimu.trukmeValNeLT = req.body.tyrimuNeLttrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.tyrimu.isVisoVal = req.body.tyrimuIsVisoVal,
          //bendrosios
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.bendrosios.destytojuSk = req.body.bendrosiosLTdestytojuSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.bendrosios.trukmeValLT = req.body.bendrosiosLTtrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.bendrosios.trukmeValNeLT = req.body.bendrosiosNeLttrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.bendrosios.isVisoVal = req.body.bendrosiosIsVisoVal,
          //dalykines
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.dalykines.destytojuSk = req.body.dalykinesLTdestytojuSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.dalykines.trukmeValLT = req.body.dalykinesLTtrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.dalykines.trukmeValNeLT = req.body.dalykinesNeLttrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.dalykines.isVisoVal = req.body.dalykinesIsVisoVal
        // 27 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table27_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_27.push({
            nr: eval(lent27_nrcommand + i),
            renginysTema: eval(lent27_renginysTemacommand + i),
            kompGrupe: eval(lent27_kompGrupecommand + i),
            skirta: eval(lent27_skirtacommand + i),
            lektorius: eval(lent27_lektoriuscommand + i),
            lektTipas: eval(lent27_lektTipascommand + i)
          })
        } // 28 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table28_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_28.push({
            nr: eval(lent28_nrcommand + i),
            destytojas: eval(lent28_destytojascommand + i),
            imonIstaig: eval(lent28_imonIstaigcommand + i),
            kompGrupe: eval(lent28_kompGrupecommand + i),
            trukmeVal: eval(lent28_trukmeValcommand + i),
            data: eval(lent28_datacommand + i)
          })
        } // 29 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table29_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV03.push({
            nr: eval(kTOV4_KV03nrcommand + i),
            destytojas: eval(kTOV4_KV03destytojascommand + i),
            studKryptis: eval(kTOV4_KV03studKryptiscommand + i),
            salis: eval(kTOV4_KV03saliscommand + i),
            institucija: eval(kTOV4_KV03institucijacommand + i),
            dalykas: eval(kTOV4_KV03dalykascommand + i)
          })
        } // 30 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table30_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_30.push({
            nr: eval(lent30_nrcommand + i),
            destytojas: eval(lent30_destytojascommand + i),
            studKryptis: eval(lent30_studKryptiscommand + i),
            salis: eval(lent30_saliscommand + i),
            institucija: eval(lent30_institucijacommand + i),
            dalykas: eval(lent30_dalykascommand + i)
            //BAIGTA
          })
        } // 31 lentelė create-dep 1
        for (let i = 1; i <= parseInt(req.body.table311_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_O01.kTOV4_O01_1.push({
            nr: eval(kTOV4_O01_1nrcommand + i),
            destytojas: eval(kTOV4_O01_1destytojascommand + i),
            veiklPobud: eval(kTOV4_O01_1veiklPobudcommand + i),
            isakNrData: eval(kTOV4_O01_1isakNrDatacommand + i)
          })
        } // 31 lentelė create-dep 2
        for (let i = 1; i <= parseInt(req.body.table312_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_O01.kTOV4_O01_2.push({
            nr: eval(kTOV4_O01_2nrcommand + i),
            destytojas: eval(kTOV4_O01_2destytojascommand + i),
            veiklPobud: eval(kTOV4_O01_2veiklPobudcommand + i),
            dataVieta: eval(kTOV4_O01_2dataVietacommand + i),
            ktKomentarai: eval(kTOV4_O01_2ktKomentaraicommand + i)
          })
        }
        for (let i = 1; i <= parseInt(req.body.tablekTOV4_S_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_S.push({
            nr: eval(kTOV4_Snrcommand + i),
            stiprybes: eval(kTOV4_Sstiprybescommand + i),
            tobulintina: eval(kTOV4_Stobulintinacommand + i)
          })
        } // 32 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table32_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_32.push({
            nr: eval(lent32_nrcommand + i),
            studKryptis: eval(lent32_studKryptiscommand + i),
            studProgr: eval(lent32_studProgrcommand + i),
            strategPartner: eval(lent32_strategPartnercommand + i)
          })
        } // 33 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table33_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_33.push({
            nr: eval(lent33_nrcommand + i),
            veikla: eval(lent33_veiklacommand + i),
            socPartneris: eval(lent33_socPartneriscommand + i),
            destytojas: eval(lent33_destytojascommand + i)
          })
        } // 34 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table34_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_34.push({
            nr: eval(lent34_nrcommand + i),
            studKryptis: eval(lent34_studKryptiscommand + i),
            studProgr: eval(lent34_studProgrcommand + i),
            studentuSk1: eval(lent34_studentuSk1_command + i),
            studentuSk2: eval(lent34_studentuSk2_command + i),
            studentuSk3: eval(lent34_studentuSk3_command + i),
            studentuSk4: eval(lent34_studentuSk4_command + i),
            studentuSk5: eval(lent34_studentuSk5_command + i)
          })
        } // 35 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table35_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_35.push({
            nr: eval(lent35_nrcommand + i),
            studKryptis: eval(lent35_studKryptiscommand + i),
            studProgr: eval(lent35_studProgrcommand + i),
            studentuSk1: eval(lent35_studentuSkBendr1_command + i),
            pasPartnerSk1: eval(lent35_studentuSk1_command + i),
            studentuSk2: eval(lent35_studentuSkBendr2_command + i),
            pasPartnerSk2: eval(lent35_studentuSk2_command + i),
            studentuSk3: eval(lent35_studentuSkBendr3_command + i),
            pasPartnerSk3: eval(lent35_studentuSk3_command + i),
            studentuSk4: eval(lent35_studentuSkBendr4_command + i),
            pasPartnerSk4: eval(lent35_studentuSk4_command + i),
            studentuSk5: eval(lent35_studentuSkBendr5_command + i),
            pasPartnerSk5: eval(lent35_studentuSk5_command + i)
          })
        } // 36 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table36_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_KT02.push({
            nr: eval(kV5_KT02nrcommand + i),
            studKryptis: eval(kV5_KT02studKryptiscommand + i),
            studProgr: eval(kV5_KT02studProgrcommand + i),
            diplomantas: eval(kV5_KT02diplomantascommand + i),
            darboTema: eval(kV5_KT02darboTemacommand + i)
          })
        } // 37 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table37_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_KT01.push({
            nr: eval(kV5_KT01nrcommand + i),
            studKryptis: eval(kV5_KT01studKryptiscommand + i),
            studProgr: eval(kV5_KT01studProgrcommand + i),
            diplomantas: eval(kV5_KT01diplomantascommand + i),
            darboTema: eval(kV5_KT01darboTemacommand + i),
            uzsakovas: eval(kV5_KT01uzsakovascommand + i)
          })
        } // 38 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table38_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_38.push({
            nr: eval(lent38_nrcommand + i),
            pavadinimas: eval(lent38_pavadinimascommand + i),
            vykdytPartner: eval(lent38_vykdytPartnercommand + i),
            dalyviai: eval(lent38_dalyviaicommand + i),
            finansavim: eval(lent38_finansavimcommand + i),
            rezultatai: eval(lent38_rezultataicommand + i),
            salisData: eval(lent38_salisDatacommand + i)
          })
        } // 39 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table39_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_39.push({
            nr: eval(lent39_nrcommand + i),
            kryptys: eval(lent39_kryptyscommand + i),
            aprasymas: eval(lent39_aprasymascommand + i)
          })
        } // 40 lentelė create-dep 1
        for (let i = 1; i <= parseInt(req.body.table401_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_40.socAtskMaz.push({
            aprasymas: eval(lent40_socAprasymascommand + i),
            destytojas: eval(lent40_socDestytojascommand + i)
          })
        } // 40 lentelė create-dep 2
        for (let i = 1; i <= parseInt(req.body.table402_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_40.aplinkosaugInic.push({
            aprasymas: eval(lent40_aplinkAprasymascommand + i),
            destytojas: eval(lent40_aplinkDestytojascommand + i)
          })
        } // 40 lentelė create-dep 3
        for (let i = 1; i <= parseInt(req.body.table403_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_40.lietValstybPuosel.push({
            aprasymas: eval(lent40_valstybAprasymascommand + i),
            destytojas: eval(lent40_valstybDestytojascommand + i)
          })
        } // 40 lentelė create-dep 4
        for (let i = 1; i <= parseInt(req.body.table404_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_40.lietEtnokPuos.push({
            aprasymas: eval(lent40_etnoAprasymascommand + i),
            destytojas: eval(lent40_etnoDestytojascommand + i)
          })
        } // 40 lentelė create-dep 5
        for (let i = 1; i <= parseInt(req.body.table405_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_40.savanorystIniciatyv.push({
            aprasymas: eval(lent40_savAprasymascommand + i),
            destytojas: eval(lent40_savDestytojascommand + i)
          })
        } // 41 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table41_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_41.push({
            nr: eval(lent41_nrcommand + i),
            veikla: eval(lent41_veiklacommand + i),
            veiklPartner: eval(lent41_veiklPartnercommand + i),
            organizac: eval(lent41_organizaccommand + i),
            veiklOrientavim: eval(lent41_veiklOrientavimcommand + i),
            dalyviai: eval(lent41_dalyviaicommand + i),
            laikas: eval(lent41_laikascommand + i),
            vieta: eval(lent41_vietacommand + i)
          })
        }
        for (let i = 1; i <= parseInt(req.body.tableVeiklS_name); i++) {
          foundUser.katedrosVedejas.kV5.veiklSavinalize.veiklSavinalize_array.push({
            stiprybes: eval(veiklSavinalizestiprybescommand + i),
            tobulintina: eval(veiklSavinalizetobulintinacommand + i)
          })
        }
        foundUser.katedrosVedejas.kV5.veiklSavinalize.isvadosApieVeikl = req.body.isvadosApieVeikl,

          foundUser.busenaVedejo = req.body.ataskaitos_busena,
          foundUser.updated_for = req.user.username

        foundUser.save(function(err) {
          if (!err) {
            console.log("Succesfully created");
            res.redirect("/user-window-dep");
          }
        });
      } else {
        console.log("User does'f found");
      }
    }
  });
});

app.get("/edit-dep", function(req, res) {
  if (req.isAuthenticated()) {

    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log("Error...");
        console.log(err);
      } else {
        if (foundUser.role === "katedros vedėjas") {
          res.render("edit-dep", {
            user: foundUser
          });
        } else {
          console.log("User role unknown");
          console.log(foundUser.role);
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.post("/edit-dep", (req, res) => {

  User.findById(req.user.id, function(err, foundUser) {
    if (err) {
      console.log("Error...");
      console.log(err);

    } else {
      if (foundUser) {
        // 1 lentelė
        var mV2_D04nrcommand = "req.body.mV2_D04nr";
        var mV2_D04studKryptiscommand = "req.body.mV2_D04studKryptis";
        var mV2_D04studProgrcommand = "req.body.mV2_D04studProgr";
        var mV2_D04progrKodascommand = "req.body.mV2_D04progrKodas";
        var mV2_D04isakNrDatacommand = "req.body.mV2_D04isakNrData";
        var mV2_D04studKryptAkreditcommand = "req.body.mV2_D04studKryptAkredit";
        var mV2_D04akreditLaikotcommand = "req.body.mV2_D04akreditLaikot";
        var mV2_D04eCTS1command = "req.body.mV2_D04eCTS";
        // 2 lent
        var lent2_nrcommand = "req.body.lent2_nr";
        var lent2_pavVardcommand = "req.body.lent2_pavVard";
        var lent2_pareigoscommand = "req.body.lent2_pareigos";
        var lent2_darbovTipascommand = "req.body.lent2_darbovTipas";
        var lent2_pedagogStazascommand = "req.body.lent2_pedagogStazas";
        var lent2_praktinStazascommand = "req.body.lent2_praktinStazas";
        //3 lent
        var lent3_nrcommand = "req.body.lent3_nr";
        var lent3_studKryptiscommand = "req.body.lent3_studKryptis";
        var lent3_studProgrcommand = "req.body.lent3_studProgr";
        var lent3_destytojascommand = "req.body.lent3_destytojas";
        var lent3_imonIstaigcommand = "req.body.lent3_imonIstaig";
        // 4 lent
        var lent4_nrcommand = "req.body.lent4_nr";
        var lent4_bibliografAprcommand = "req.body.lent4_bibliografApr";
        var lent4_tipascommand = "req.body.lent4_tipas";
        var lent4_mokslSritcommand = "req.body.lent4_mokslSrit";
        var lent4_mokslKryptcommand = "req.body.lent4_mokslKrypt";
        // 5 lent
        var mV2_M04nrcommand = "req.body.mV2_M04nr";
        var mV2_M04destytojascommand = "req.body.mV2_M04destytojas";
        var mV2_M04studProgrcommand = "req.body.mV2_M04studProgr";
        var mV2_M04dalykPavadcommand = "req.body.mV2_M04dalykPavad";
        var mV2_M04apimtisKreditcommand = "req.body.mV2_M04apimtisKredit";
        var mV2_M04busenacommand = "req.body.mV2_M04busena";
        // 6 lent
        var mV2_D06nrcommand = "req.body.mV2_D06nr";
        var mV2_D06studProgrcommand = "req.body.mV2_D06studProgr";
        var mV2_D06progrKodascommand = "req.body.mV2_D06progrKodas";
        var mV2_D06atlPatobulincommand = "req.body.mV2_D06atlPatobulin";
        var mV2_D06tobulinPriezastcommand = "req.body.mV2_D06tobulinPriezast";
        var mV2_D06tobulinIrodcommand = "req.body.mV2_D06tobulinIrod";
        // 7 lent
        var mV2_D01nrcommand = "req.body.mV2_D01nr";
        var mV2_D01destytojascommand = "req.body.mV2_D01destytojas";
        var mV2_D01komitetascommand = "req.body.mV2_D01komitetas";
        var mV2_D01veiklacommand = "req.body.mV2_D01veikla";
        var mV2_D01rezultataicommand = "req.body.mV2_D01rezultatai";
        //8 lent
        var mV2_D02nrcommand = "req.body.mV2_D02nr";
        var mV2_D02destytojascommand = "req.body.mV2_D02destytojas";
        var mV2_D02studKryptcommand = "req.body.mV2_D02studKrypt";
        var mV2_D02veiklacommand = "req.body.mV2_D02veikla";
        var mV2_D02rezultataicommand = "req.body.mV2_D02rezultatai";
        //9 lent
        var mV2_D03nrcommand = "req.body.mV2_D03nr";
        var mV2_D03destytojascommand = "req.body.mV2_D03destytojas";
        var mV2_D03studKryptiscommand = "req.body.mV2_D03studKryptis";
        var mV2_D03studProgrcommand = "req.body.mV2_D03studProgr";
        var mV2_D03veiklacommand = "req.body.mV2_D03veikla";
        var mV2_D03rezultataicommand = "req.body.mV2_D03rezultatai";
        // 10 lent
        var mV2_M03nrcommand = "req.body.mV2_M03nr";
        var mV2_M03destytojascommand = "req.body.mV2_M03destytojas";
        var mV2_M03studProgrcommand = "req.body.mV2_M03studProgr";
        var mV2_M03dalykPavadcommand = "req.body.mV2_M03dalykPavad";
        var mV2_M03apimtisKreditcommand = "req.body.mV2_M03apimtisKredit";
        //11 lent
        var mV2_S01nrcommand = "req.body.mV2_S01nr";
        var mV2_S01destytojascommand = "req.body.mV2_S01destytojas";
        var mV2_S01veiklacommand = "req.body.mV2_S01veikla";
        var mV2_S01dataVietacommand = "req.body.mV2_S01dataVieta";
        //mV2_S
        var mV2_Snrcommand = "req.body.mV2_Snr";
        var mV2_Sstiprybescommand = "req.body.mV2_Sstiprybes";
        var mV2_Stobulintinacommand = "req.body.mV2_Stobulintina";
        // 12 lent
        var tMTEP3_T01nrcommand = "req.body.tMTEP3_T01nr";
        var tMTEP3_T01tyrTematcommand = "req.body.tMTEP3_T01tyrTemat";
        var tMTEP3_T01destytojascommand = "req.body.tMTEP3_T01destytojas";
        var tMTEP3_T01tyrGrupcommand = "req.body.tMTEP3_T01tyrGrup";
        var tMTEP3_T01mokslSritcommand = "req.body.tMTEP3_T01mokslSrit";
        var tMTEP3_T01mokslKryptcommand = "req.body.tMTEP3_T01mokslKrypt";
        // 13 lent
        var tMTEP3_T02nrcommand = "req.body.tMTEP3_T02nr";
        var tMTEP3_T02bibliografAprcommand = "req.body.tMTEP3_T02bibliografApr";
        var tMTEP3_T02tipascommand = "req.body.tMTEP3_T02tipas";
        var tMTEP3_T02mokslSritcommand = "req.body.tMTEP3_T02mokslSrit";
        var tMTEP3_T02mokslKryptcommand = "req.body.tMTEP3_T02mokslKrypt";
        var tMTEP3_T02duomBazecommand = "req.body.tMTEP3_T02duomBaze";
        //14 lent
        var tMTEP3_T03nrcommand = "req.body.tMTEP3_T03nr";
        var tMTEP3_T03pilnasBiblAprcommand = "req.body.tMTEP3_T03pilnasBiblApr";
        var tMTEP3_T03rengTipascommand = "req.body.tMTEP3_T03rengTipas";
        //15 lent
        var tMTEP3_T04nrcommand = "req.body.tMTEP3_T04nr";
        var tMTEP3_T04konsultantascommand = "req.body.tMTEP3_T04konsultantas";
        var tMTEP3_T04uzsakovascommand = "req.body.tMTEP3_T04uzsakovas";
        var tMTEP3_T04temacommand = "req.body.tMTEP3_T04tema";
        var tMTEP3_T04datacommand = "req.body.tMTEP3_T04data";
        var tMTEP3_T04atlygArNecommand = "req.body.tMTEP3_T04atlygArNe";
        // 16.1 lent
        var tMTEP3_T05nrcommand = "req.body.tMTEP3_T05nr";
        var tMTEP3_T05destytojascommand = "req.body.tMTEP3_T05destytojas";
        var tMTEP3_T05veiklPavadcommand = "req.body.tMTEP3_T05veiklPavad";
        var tMTEP3_T05veiklRezultcommand = "req.body.tMTEP3_T05veiklRezult";
        var tMTEP3_T05atlygArNecommand = "req.body.tMTEP3_T05atlygArNe";
        //16.2 lent
        var lent162_nrnrcommand = "req.body.lent162_nr";
        var lent162_destytojascommand = "req.body.lent162_destytojas";
        var lent162_pavadinimascommand = "req.body.lent162_pavadinimas";
        var lent162_pastaboscommand = "req.body.lent162_pastabos";
        //16.3 lent
        var tMTEP3_T16nrcommand = "req.body.tMTEP3_T16nr";
        var tMTEP3_T16autoriuscommand = "req.body.tMTEP3_T16autorius";
        var tMTEP3_T16pavadinimascommand = "req.body.tMTEP3_T16pavadinimas";
        var tMTEP3_T16uzsakovascommand = "req.body.tMTEP3_T16uzsakovas";
        //17 lent
        var tMTEP3_T06nrcommand = "req.body.tMTEP3_T06nr";
        var tMTEP3_T06autoriuscommand = "req.body.tMTEP3_T06autorius";
        var tMTEP3_T06menoSritcommand = "req.body.tMTEP3_T06menoSrit";
        var tMTEP3_T06pobudiscommand = "req.body.tMTEP3_T06pobudis";
        var tMTEP3_T06realizVietacommand = "req.body.tMTEP3_T06realizVieta";
        var tMTEP3_T06datacommand = "req.body.tMTEP3_T06data";
        var tMTEP3_T06atlygArNecommand = "req.body.tMTEP3_T06atlygArNe";
        //18 lent
        var tMTEP3_T07nrcommand = "req.body.tMTEP3_T07nr";
        var tMTEP3_T07atlikejascommand = "req.body.tMTEP3_T07atlikejas";
        var tMTEP3_T07menoSritcommand = "req.body.tMTEP3_T07menoSrit";
        var tMTEP3_T07pavadinimascommand = "req.body.tMTEP3_T07pavadinimas";
        var tMTEP3_T07atlikVietacommand = "req.body.tMTEP3_T07atlikVieta";
        var tMTEP3_T07datacommand = "req.body.tMTEP3_T07data";
        var tMTEP3_T07atlygArNecommand = "req.body.tMTEP3_T07atlygArNe";
        //19 lent
        var tMTEP3_T08Snrcommand = "req.body.tMTEP3_T08Snr";
        var tMTEP3_T08atlikejascommand = "req.body.tMTEP3_T08atlikejas";
        var tMTEP3_T08menoSritcommand = "req.body.tMTEP3_T08menoSrit";
        var tMTEP3_T08pavadinimascommand = "req.body.tMTEP3_T08pavadinimas";
        var tMTEP3_T08atlikVietacommand = "req.body.tMTEP3_T08atlikVieta";
        var tMTEP3_T08datacommand = "req.body.tMTEP3_T08data";
        var tMTEP3_T08atlygArNecommand = "req.body.tMTEP3_T08atlygArNe";
        //20 lent
        var tMTEP3_T09nrcommand = "req.body.tMTEP3_T09nr";
        var tMTEP3_T09atlikejascommand = "req.body.tMTEP3_T09atlikejas";
        var tMTEP3_T09menoSritcommand = "req.body.tMTEP3_T09menoSrit";
        var tMTEP3_T09pavadinimascommand = "req.body.tMTEP3_T09pavadinimas";
        var tMTEP3_T09atlikVietacommand = "req.body.tMTEP3_T09atlikVieta";
        var tMTEP3_T09datacommand = "req.body.tMTEP3_T09data";
        var tMTEP3_T09atlygArNecommand = "req.body.tMTEP3_T09atlygArNe";
        //21 lent
        var tMTEP3_T10nrcommand = "req.body.tMTEP3_T10nr";
        var tMTEP3_T10destytojascommand = "req.body.tMTEP3_T10destytojas";
        var tMTEP3_T10veiklPobudcommand = "req.body.tMTEP3_T10veiklPobud";
        var tMTEP3_T10veiklTikslcommand = "req.body.tMTEP3_T10veiklTiksl";
        var tMTEP3_T10dataVietacommand = "req.body.tMTEP3_T10dataVieta";
        var tMTEP3_T10dalyvSkcommand = "req.body.tMTEP3_T10dalyvSk";
        var tMTEP3_T10ktKomentaraicommand = "req.body.tMTEP3_T10ktKomentarai";
        var tMTEP3_T10atlygArNecommand = "req.body.tMTEP3_T10atlygArNe";
        //22 lent
        var tMTEP3_T11nrcommand = "req.body.tMTEP3_T11nr";
        var tMTEP3_T11destytojascommand = "req.body.tMTEP3_T11destytojas";
        var tMTEP3_T11veiklPobudcommand = "req.body.tMTEP3_T11veiklPobud";
        var tMTEP3_T11veiklTikslcommand = "req.body.tMTEP3_T11veiklTiksl";
        var tMTEP3_T11dataVietacommand = "req.body.tMTEP3_T11dataVieta";
        var tMTEP3_T11dalyvSkcommand = "req.body.tMTEP3_T11dalyvSk";
        var tMTEP3_T11ktKomentaraicommand = "req.body.tMTEP3_T11ktKomentarai";
        var tMTEP3_T11atlygArNecommand = "req.body.tMTEP3_T11atlygArNe";
        //23 lent
        var tMTEP3_T12nrcommand = "req.body.tMTEP3_T12nr";
        var tMTEP3_T12destytojascommand = "req.body.tMTEP3_T12destytojas";
        var tMTEP3_T12veiklPobudcommand = "req.body.tMTEP3_T12veiklPobud";
        var tMTEP3_T12dataVietacommand = "req.body.tMTEP3_T12dataVieta";
        //24 lent
        var tMTEP3_T14nrcommand = "req.body.tMTEP3_T14nr";
        var tMTEP3_T14destytojascommand = "req.body.tMTEP3_T14destytojas";
        var tMTEP3_T14renginyscommand = "req.body.tMTEP3_T14renginys";
        var tMTEP3_T14veiklPobudcommand = "req.body.tMTEP3_T14veiklPobud";
        var tMTEP3_T14dataVietacommand = "req.body.tMTEP3_T14dataVieta";
        //25 lent
        var tMTEP3_T13nrcommand = "req.body.tMTEP3_T13nr";
        var tMTEP3_T13destytojascommand = "req.body.tMTEP3_T13destytojas";
        var tMTEP3_T13studDuomcommand = "req.body.tMTEP3_T13studDuom";
        var tMTEP3_T13renginioPavadcommand = "req.body.tMTEP3_T13renginioPavad";
        var tMTEP3_T13rezultatascommand = "req.body.tMTEP3_T13rezultatas";
        var tMTEP3_T13datacommand = "req.body.tMTEP3_T13data";
        //TMTEP_S
        var tMTEP3_Snrcommand = "req.body.tMTEP3_Snr";
        var tMTEP3_Sstiprybescommand = "req.body.tMTEP3_Sstiprybes";
        var tMTEP3_Stobulintinacommand = "req.body.tMTEP3_Stobulintina";
        //26 lent priedas
        //mokymosi
        var kTOV4_KV01mokymosiKomppavadcommand = "req.body.kTOV4_KV01mokymosiKomppavad";
        var kTOV4_KV01mokymosiKomppazymNrcommand = "req.body.kTOV4_KV01mokymosiKomppazymNr";
        var kTOV4_KV01mokymosiKomptrukmeValLTcommand = "req.body.kTOV4_KV01mokymosiKomptrukmeValLT";
        var kTOV4_KV01mokymosiKomptrukmeValNeLTcommand = "req.body.kTOV4_KV01mokymosiKomptrukmeValNeLT";
        var kTOV4_KV01mokymosiKompdalyviscommand = "req.body.kTOV4_KV01mokymosiKompdalyvis";
        // tyrimu
        var kTOV4_KV01tyrimuKomppavadcommand = "req.body.kTOV4_KV01tyrimuKomppavad";
        var kTOV4_KV01tyrimuKomppazymNrcommand = "req.body.kTOV4_KV01tyrimuKomppazymNr";
        var kTOV4_KV01tyrimuKomptrukmeValLTcommand = "req.body.kTOV4_KV01tyrimuKomptrukmeValLT";
        var kTOV4_KV01tyrimuKomptrukmeValNeLTcommand = "req.body.kTOV4_KV01tyrimuKomptrukmeValNeLT";
        var kTOV4_KV01tyrimuKompdalyviscommand = "req.body.kTOV4_KV01tyrimuKompdalyvis";
        //bendrosios
        var kTOV4_KV01bendrKomppavadcommand = "req.body.kTOV4_KV01bendrKomppavad";
        var kTOV4_KV01bendrKomppazymNrcommand = "req.body.kTOV4_KV01bendrKomppazymNr";
        var kTOV4_KV01bendrKomptrukmeValLTcommand = "req.body.kTOV4_KV01bendrKomptrukmeValLT";
        var kTOV4_KV01bendrKomptrukmeValNeLTcommand = "req.body.kTOV4_KV01bendrKomptrukmeValNeLT";
        var kTOV4_KV01bendrKompdalyviscommand = "req.body.kTOV4_KV01bendrKompdalyvis";
        //dalykines
        var kTOV4_KV01dalykKomppavadcommand = "req.body.kTOV4_KV01dalykKomppavad";
        var kTOV4_KV01dalykKomppazymNrcommand = "req.body.kTOV4_KV01dalykKomppazymNr";
        var kTOV4_KV01dalykKompTrukmeValLTcommand = "req.body.kTOV4_KV01dalykKompTrukmeValLT";
        var kTOV4_KV01dalykKompTrukmeValNeLTcommand = "req.body.kTOV4_KV01dalykKompTrukmeValNeLT";
        var kTOV4_KV01dalykKompdalyviscommand = "req.body.kTOV4_KV01dalykKompdalyvis";
        //27 lent
        var lent27_nrcommand = "req.body.lent27_nr";
        var lent27_renginysTemacommand = "req.body.lent27_renginysTema";
        var lent27_kompGrupecommand = "req.body.lent27_kompGrupe";
        var lent27_skirtacommand = "req.body.lent27_skirta";
        var lent27_lektoriuscommand = "req.body.lent27_lektorius";
        var lent27_lektTipascommand = "req.body.lent27_lektTipas";
        //28 lent
        var lent28_nrcommand = "req.body.lent28_nr";
        var lent28_destytojascommand = "req.body.lent28_destytojas";
        var lent28_imonIstaigcommand = "req.body.lent28_imonIstaig";
        var lent28_kompGrupecommand = "req.body.lent28_kompGrupe";
        var lent28_trukmeValcommand = "req.body.lent28_trukmeVal";
        var lent28_datacommand = "req.body.lent28_data";
        //29 lent
        var kTOV4_KV03nrcommand = "req.body.kTOV4_KV03nr";
        var kTOV4_KV03destytojascommand = "req.body.kTOV4_KV03destytojas";
        var kTOV4_KV03studKryptiscommand = "req.body.kTOV4_KV03studKryptis";
        var kTOV4_KV03saliscommand = "req.body.kTOV4_KV03salis";
        var kTOV4_KV03institucijacommand = "req.body.kTOV4_KV03institucija";
        var kTOV4_KV03dalykascommand = "req.body.kTOV4_KV03dalykas";
        //30 lent
        var lent30_nrcommand = "req.body.lent30_nr";
        var lent30_destytojascommand = "req.body.lent30_destytojas";
        var lent30_studKryptiscommand = "req.body.lent30_studKryptis";
        var lent30_saliscommand = "req.body.lent30_salis";
        var lent30_institucijacommand = "req.body.lent30_institucija";
        var lent30_dalykascommand = "req.body.lent30_dalykas";
        // 31.1 lent
        var kTOV4_O01_1nrcommand = "req.body.kTOV4_O01_1nr";
        var kTOV4_O01_1destytojascommand = "req.body.kTOV4_O01_1destytojas";
        var kTOV4_O01_1veiklPobudcommand = "req.body.kTOV4_O01_1veiklPobud";
        var kTOV4_O01_1isakNrDatacommand = "req.body.kTOV4_O01_1isakNrData";
        // 31.2 lent
        var kTOV4_O01_2nrcommand = "req.body.kTOV4_O01_2nr";
        var kTOV4_O01_2destytojascommand = "req.body.kTOV4_O01_2destytojas";
        var kTOV4_O01_2veiklPobudcommand = "req.body.kTOV4_O01_2veiklPobud";
        var kTOV4_O01_2dataVietacommand = "req.body.kTOV4_O01_2dataVieta";
        var kTOV4_O01_2ktKomentaraicommand = "req.body.kTOV4_O01_2ktKomentarai";
        //kTOV4_S
        var kTOV4_Snrcommand = "req.body.kTOV4_Snr";
        var kTOV4_Sstiprybescommand = "req.body.kTOV4_Sstiprybes";
        var kTOV4_Stobulintinacommand = "req.body.kTOV4_Stobulintina";
        //32 lent
        var lent32_nrcommand = "req.body.lent32_nr";
        var lent32_studKryptiscommand = "req.body.lent32_studKryptis";
        var lent32_studProgrcommand = "req.body.lent32_studProgr";
        var lent32_strategPartnercommand = "req.body.lent32_strategPartner";
        //33 lent
        var lent33_nrcommand = "req.body.lent33_nr";
        var lent33_veiklacommand = "req.body.lent33_veikla";
        var lent33_socPartneriscommand = "req.body.lent33_socPartneris";
        var lent33_destytojascommand = "req.body.lent33_destytojas";
        //34 lent
        var lent34_nrcommand = "req.body.lent34_nr";
        var lent34_studKryptiscommand = "req.body.lent34_studKryptis";
        var lent34_studProgrcommand = "req.body.lent34_studProgr";
        var lent34_studentuSk1_command = "req.body.lent34_studentuSk1_";
        var lent34_studentuSk2_command = "req.body.lent34_studentuSk2_";
        var lent34_studentuSk3_command = "req.body.lent34_studentuSk3_";
        var lent34_studentuSk4_command = "req.body.lent34_studentuSk4_";
        var lent34_studentuSk5_command = "req.body.lent34_studentuSk5_";
        //35 lent
        var lent35_nrcommand = "req.body.lent35_nr";
        var lent35_studKryptiscommand = "req.body.lent35_studKryptis";
        var lent35_studProgrcommand = "req.body.lent35_studProgr";
        var lent35_studentuSkBendr1_command = "req.body.lent35_studentuSkBendr1_";
        var lent35_studentuSk1_command = "req.body.lent35_studentuSk1_";
        var lent35_studentuSkBendr2_command = "req.body.lent35_studentuSkBendr2_";
        var lent35_studentuSk2_command = "req.body.lent35_studentuSk2_";
        var lent35_studentuSkBendr3_command = "req.body.lent35_studentuSkBendr3_";
        var lent35_studentuSk3_command = "req.body.lent35_studentuSk3_";
        var lent35_studentuSkBendr4_command = "req.body.lent35_studentuSkBendr4_";
        var lent35_studentuSk4_command = "req.body.lent35_studentuSk4_";
        var lent35_studentuSkBendr5_command = "req.body.lent35_studentuSkBendr5_";
        var lent35_studentuSk5_command = "req.body.lent35_studentuSk5_";
        //36 lent
        var kV5_KT02nrcommand = "req.body.kV5_KT02nr";
        var kV5_KT02studKryptiscommand = "req.body.kV5_KT02studKryptis";
        var kV5_KT02studProgrcommand = "req.body.kV5_KT02studProgr";
        var kV5_KT02diplomantascommand = "req.body.kV5_KT02diplomantas";
        var kV5_KT02darboTemacommand = "req.body.kV5_KT02darboTema";
        //37 lent
        var kV5_KT01nrcommand = "req.body.kV5_KT01nr";
        var kV5_KT01studKryptiscommand = "req.body.kV5_KT01studKryptis";
        var kV5_KT01studProgrcommand = "req.body.kV5_KT01studProgr";
        var kV5_KT01diplomantascommand = "req.body.kV5_KT01diplomantas";
        var kV5_KT01darboTemacommand = "req.body.kV5_KT01darboTema";
        var kV5_KT01uzsakovascommand = "req.body.kV5_KT01uzsakovas";
        //38 lent
        var lent38_nrcommand = "req.body.lent38_nr";
        var lent38_pavadinimascommand = "req.body.lent38_pavadinimas";
        var lent38_vykdytPartnercommand = "req.body.lent38_vykdytPartner";
        var lent38_dalyviaicommand = "req.body.lent38_dalyviai";
        var lent38_finansavimcommand = "req.body.lent38_finansavim";
        var lent38_rezultataicommand = "req.body.lent38_rezultatai";
        var lent38_salisDatacommand = "req.body.lent38_salisData";
        //39 lent
        var lent39_nrcommand = "req.body.lent39_nr";
        var lent39_kryptyscommand = "req.body.lent39_kryptys";
        var lent39_aprasymascommand = "req.body.lent39_aprasymas";

        //40 lent 1
        var lent40_socAprasymascommand = "req.body.lent40_socaprasymas";
        var lent40_socDestytojascommand = "req.body.lent40_socdestytojas";
        //40 lent 2
        var lent40_aplinkAprasymascommand = "req.body.lent40_aplinkaprasymas";
        var lent40_aplinkDestytojascommand = "req.body.lent40_aplinkdestytojas";
        //40 lent 3
        var lent40_valstybAprasymascommand = "req.body.lent40_valstybaprasymas";
        var lent40_valstybDestytojascommand = "req.body.lent40_valstybdestytojas";
        //40 lent 4
        var lent40_etnoAprasymascommand = "req.body.lent40_etnoaprasymas";
        var lent40_etnoDestytojascommand = "req.body.lent40_savdestytojas";
        //40 lent 5
        var lent40_savAprasymascommand = "req.body.lent40_savaprasymas";
        var lent40_savDestytojascommand = "req.body.lent40_savdestytojas";
        //41 lent
        var lent41_nrcommand = "req.body.lent41_nr";
        var lent41_veiklacommand = "req.body.lent41_veikla";
        var lent41_veiklPartnercommand = "req.body.lent41_veiklPartner";
        var lent41_organizaccommand = "req.body.lent41_organizac";
        var lent41_veiklOrientavimcommand = "req.body.lent41_veiklOrientavim"
        var lent41_dalyviaicommand = "req.body.lent41_dalyviai";
        var lent41_laikascommand = "req.body.lent41_laikas";
        var lent41_vietacommand = "req.body.lent41_vieta";
        //veiklSavinalize
        var veiklSavinalizestiprybescommand = "req.body.veiklSavianalizStiprybes";
        var veiklSavinalizetobulintinacommand = "req.body.veiklSavianalizTobulintina";

        foundUser.katedrosVedejas.kKPP1_1 = new Array(); // 1
        foundUser.katedrosVedejas.kDS1 = new Array(); // 2
        foundUser.katedrosVedejas.kKPP1_3 = new Array(); // 3
        foundUser.katedrosVedejas.mV2.mV2_M02 = new Array(); // 4
        foundUser.katedrosVedejas.mV2.mV2_M04 = new Array(); // 5
        foundUser.katedrosVedejas.mV2.mV2_D06 = new Array(); // 6
        foundUser.katedrosVedejas.mV2.mV2_D01 = new Array(); // 7
        foundUser.katedrosVedejas.mV2.mV2_D02 = new Array(); // 8
        foundUser.katedrosVedejas.mV2.mV2_D03 = new Array(); // 9
        foundUser.katedrosVedejas.mV2.mV2_M03 = new Array(); // 10
        foundUser.katedrosVedejas.mV2.mV2_S01 = new Array(); // 11
        foundUser.katedrosVedejas.mV2.mV2_S = new Array(); // Savianalizė
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T01 = new Array(); // 12
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T02 = new Array(); // 13
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T03 = new Array(); // 14
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T04 = new Array(); // 15
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T05 = new Array(); // 16.1
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_162 = new Array(); // 16.2
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T16 = new Array(); // 16.3
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T06 = new Array(); // 17
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T07 = new Array(); // 18
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T08 = new Array(); // 19
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T09 = new Array(); // 20
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T10 = new Array(); // 21
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T11 = new Array(); // 22
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T12 = new Array(); // 23
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T14 = new Array(); // 24
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T13 = new Array(); // 25
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_S = new Array(); // Savianalizė

        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.mokymosi = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.tyrimu = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.bendrosios = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.dalykines = new Array();

        foundUser.katedrosVedejas.kTOV4.kTOV4_27 = new Array(); // 27
        foundUser.katedrosVedejas.kTOV4.kTOV4_28 = new Array(); // 28
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV03 = new Array(); // 29
        foundUser.katedrosVedejas.kTOV4.kTOV4_30 = new Array(); // 30
        foundUser.katedrosVedejas.kTOV4.kTOV4_O01.kTOV4_O01_1 = new Array(); // 31.1
        foundUser.katedrosVedejas.kTOV4.kTOV4_O01.kTOV4_O01_2 = new Array(); // 31.2
        foundUser.katedrosVedejas.kTOV4.kTOV4_S = new Array(); // Savianalizė
        foundUser.katedrosVedejas.kV5.kV5_32 = new Array(); // 32
        foundUser.katedrosVedejas.kV5.kV5_33 = new Array(); // 33
        foundUser.katedrosVedejas.kV5.kV5_34 = new Array(); // 34
        foundUser.katedrosVedejas.kV5.kV5_35 = new Array(); // 35
        foundUser.katedrosVedejas.kV5.kV5_KT02 = new Array(); // 36
        foundUser.katedrosVedejas.kV5.kV5_KT01 = new Array(); // 37
        foundUser.katedrosVedejas.kV5.kV5_38 = new Array(); // 38
        foundUser.katedrosVedejas.kV5.kV5_39 = new Array(); // 39
        foundUser.katedrosVedejas.kV5.kV5_40.socAtskMaz = new Array(); // 40.1
        foundUser.katedrosVedejas.kV5.kV5_40.aplinkosaugInic = new Array(); // 40.2
        foundUser.katedrosVedejas.kV5.kV5_40.lietValstybPuosel = new Array(); // 40.3
        foundUser.katedrosVedejas.kV5.kV5_40.lietEtnokPuos = new Array(); // 40.4
        foundUser.katedrosVedejas.kV5.kV5_40.savanorystIniciatyv = new Array(); // 40.5
        foundUser.katedrosVedejas.kV5.kV5_41 = new Array(); // 41
        foundUser.katedrosVedejas.kV5.veiklSavinalize.veiklSavinalize_array = new Array(); // Savianalizė

        // 1 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table1_name); i++) {
          foundUser.katedrosVedejas.kKPP1_1.push({
            nr: eval(mV2_D04nrcommand + i),
            studKryptis: eval(mV2_D04studKryptiscommand + i),
            studProgr: eval(mV2_D04studProgrcommand + i),
            progrKodas: eval(mV2_D04progrKodascommand + i),
            isakNrData: eval(mV2_D04isakNrDatacommand + i),
            studKryptAkredit: eval(mV2_D04studKryptAkreditcommand + i),
            akreditLaikot: eval(mV2_D04akreditLaikotcommand + i),
            eCTS: eval(mV2_D04eCTS1command + i)
          })
        }
        // 2 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table2_name); i++) {
          foundUser.katedrosVedejas.kDS1.push({
            nr: eval(lent2_nrcommand + i),
            vardPavard: eval(lent2_pavVardcommand + i),
            pareigos: eval(lent2_pareigoscommand + i),
            darbovTipas: eval(lent2_darbovTipascommand + i),
            pedagogStazas: eval(lent2_pedagogStazascommand + i),
            praktinStazas: eval(lent2_praktinStazascommand + i)
          })
        }
        // 3 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table3_name); i++) {
          foundUser.katedrosVedejas.kKPP1_3.push({
            nr: eval(lent3_nrcommand + i),
            studKryptis: eval(lent3_studKryptiscommand + i),
            studProgr: eval(lent3_studProgrcommand + i),
            destytojas: eval(lent3_destytojascommand + i),
            imonIstaig: eval(lent3_imonIstaigcommand + i)
          })
        }
        // 4 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table4_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_M02.push({
            nr: eval(lent4_nrcommand + i),
            bibliografApr: eval(lent4_bibliografAprcommand + i),
            tipas: eval(lent4_tipascommand + i),
            mokslSrit: eval(lent4_mokslSritcommand + i),
            mokslKrypt: eval(lent4_mokslKryptcommand + i)
          })
        }
        // 5 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table5_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_M04.push({
            nr: eval(mV2_M04nrcommand + i),
            destytojas: eval(mV2_M04destytojascommand + i),
            studProgr: eval(mV2_M04studProgrcommand + i),
            dalykPavad: eval(mV2_M04dalykPavadcommand + i),
            apimtisKredit: eval(mV2_M04apimtisKreditcommand + i),
            busena: eval(mV2_M04busenacommand + i)
          })
        }
        // 6 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table6_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_D06.push({
            nr: eval(mV2_D06nrcommand + i),
            studProgr: eval(mV2_D06studProgrcommand + i),
            progrKodas: eval(mV2_D06progrKodascommand + i),
            atlPatobulin: eval(mV2_D06atlPatobulincommand + i),
            tobulinPriezast: eval(mV2_D06tobulinPriezastcommand + i),
            tobulinIrod: eval(mV2_D06tobulinIrodcommand + i)
          })
        }
        // 7 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table7_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_D01.push({
            nr: eval(mV2_D01nrcommand + i),
            destytojas: eval(mV2_D01destytojascommand + i),
            komitetas: eval(mV2_D01komitetascommand + i),
            veikla: eval(mV2_D01veiklacommand + i),
            rezultatai: eval(mV2_D01rezultataicommand + i)
          })
        }
        // 8 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table8_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_D02.push({
            nr: eval(mV2_D02nrcommand + i),
            destytojas: eval(mV2_D02destytojascommand + i),
            studKryptis: eval(mV2_D02studKryptcommand + i),
            veikla: eval(mV2_D02veiklacommand + i),
            rezultatai: eval(mV2_D02rezultataicommand + i)
          })
        }
        // 9 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table9_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_D03.push({
            nr: eval(mV2_D03nrcommand + i),
            destytojas: eval(mV2_D03destytojascommand + i),
            studKryptis: eval(mV2_D03studKryptiscommand + i),
            studProgr: eval(mV2_D03studProgrcommand + i),
            veikla: eval(mV2_D03veiklacommand + i),
            rezultatai: eval(mV2_D03rezultataicommand + i)
          })
        }
        // 10 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table10_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_M03.push({
            nr: eval(mV2_M03nrcommand + i),
            destytojas: eval(mV2_M03destytojascommand + i),
            studProgr: eval(mV2_M03studProgrcommand + i),
            dalykPavad: eval(mV2_M03dalykPavadcommand + i),
            apimtisKredit: eval(mV2_M03apimtisKreditcommand + i)
          })
        }
        // 11 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table11_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_S01.push({
            nr: eval(mV2_S01nrcommand + i),
            destytojas: eval(mV2_S01destytojascommand + i),
            veikla: eval(mV2_S01veiklacommand + i),
            dataVieta: eval(mV2_S01dataVietacommand + i)
          })
        }
        for (let i = 1; i <= parseInt(req.body.tablemV2_S_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_S.push({
            nr: eval(mV2_Snrcommand + i),
            stiprybes: eval(mV2_Sstiprybescommand + i),
            tobulintina: eval(mV2_Stobulintinacommand + i)
          })
        }
        // 12 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table12_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T01.push({
            nr: eval(tMTEP3_T01nrcommand + i),
            tyrTemat: eval(tMTEP3_T01tyrTematcommand + i),
            destytojas: eval(tMTEP3_T01destytojascommand + i),
            tyrGrup: eval(tMTEP3_T01tyrGrupcommand + i),
            mokslSrit: eval(tMTEP3_T01mokslSritcommand + i),
            mokslKrypt: eval(tMTEP3_T01mokslKryptcommand + i)
          })
        }
        // 13 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table13_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T02.push({
            nr: eval(tMTEP3_T02nrcommand + i),
            bibliografApr: eval(tMTEP3_T02bibliografAprcommand + i),
            tipas: eval(tMTEP3_T02tipascommand + i),
            mokslSrit: eval(tMTEP3_T02mokslSritcommand + i),
            mokslKrypt: eval(tMTEP3_T02mokslKryptcommand + i),
            duomBaze: eval(tMTEP3_T02duomBazecommand + i)
          })
        }
        // 14 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table14_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T03.push({
            nr: eval(tMTEP3_T03nrcommand + i),
            pilnasBiblApr: eval(tMTEP3_T03pilnasBiblAprcommand + i),
            rengTipas: eval(tMTEP3_T03rengTipascommand + i)
          })
        }
        // 15 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table15_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T04.push({
            nr: eval(tMTEP3_T04nrcommand + i),
            konsultantas: eval(tMTEP3_T04konsultantascommand + i),
            uzsakovas: eval(tMTEP3_T04uzsakovascommand + i),
            tema: eval(tMTEP3_T04temacommand + i),
            data: eval(tMTEP3_T04datacommand + i),
            atlygArNe: eval(tMTEP3_T04atlygArNecommand + i)
          })
        }
        // 16 lentelė 1 edit-dep
        for (let i = 1; i <= parseInt(req.body.table161_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T05.push({
            nr: eval(tMTEP3_T05nrcommand + i),
            destytojas: eval(tMTEP3_T05destytojascommand + i),
            veiklPavad: eval(tMTEP3_T05veiklPavadcommand + i),
            veiklRezult: eval(tMTEP3_T05veiklRezultcommand + i),
            atlygArNe: eval(tMTEP3_T05atlygArNecommand + i)
          })
        }
        // 16 lentelė 2 edit-dep
        for (let i = 1; i <= parseInt(req.body.table162_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_162.push({
            nr: eval(lent162_nrnrcommand + i),
            destytojas: eval(lent162_destytojascommand + i),
            pavadinimas: eval(lent162_pavadinimascommand + i),
            pastabos: eval(lent162_pastaboscommand + i)
          })
        } // 16 lentelė 3 edit-dep
        for (let i = 1; i <= parseInt(req.body.table163_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T16.push({
            nr: eval(tMTEP3_T16nrcommand + i),
            rengejai: eval(tMTEP3_T16autoriuscommand + i),
            pavadinimas: eval(tMTEP3_T16pavadinimascommand + i),
            uzsakovas: eval(tMTEP3_T16uzsakovascommand + i)
          })
        }
        // 17 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table17_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T06.push({
            nr: eval(tMTEP3_T06nrcommand + i),
            autorius: eval(tMTEP3_T06autoriuscommand + i),
            menoSrit: eval(tMTEP3_T06menoSritcommand + i),
            pobudis: eval(tMTEP3_T06pobudiscommand + i),
            realizVieta: eval(tMTEP3_T06realizVietacommand + i),
            data: eval(tMTEP3_T06datacommand + i),
            atlygArNe: eval(tMTEP3_T06atlygArNecommand + i)
          })
        } // 18 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table18_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T07.push({
            nr: eval(tMTEP3_T07nrcommand + i),
            atlikejas: eval(tMTEP3_T07atlikejascommand + i),
            menoSrit: eval(tMTEP3_T07menoSritcommand + i),
            pavadinimas: eval(tMTEP3_T07pavadinimascommand + i),
            atlikVieta: eval(tMTEP3_T07atlikVietacommand + i),
            data: eval(tMTEP3_T07datacommand + i),
            atlygArNe: eval(tMTEP3_T07atlygArNecommand + i)
          })
        } // 19 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table19_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T08.push({
            nr: eval(tMTEP3_T08Snrcommand + i),
            atlikejas: eval(tMTEP3_T08atlikejascommand + i),
            menoSrit: eval(tMTEP3_T08menoSritcommand + i),
            pavadinimas: eval(tMTEP3_T08pavadinimascommand + i),
            atlikVieta: eval(tMTEP3_T08atlikVietacommand + i),
            data: eval(tMTEP3_T08datacommand + i),
            atlygArNe: eval(tMTEP3_T08atlygArNecommand + i)
          })
        } // 20 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table20_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T09.push({
            nr: eval(tMTEP3_T09nrcommand + i),
            atlikejas: eval(tMTEP3_T09atlikejascommand + i),
            menoSrit: eval(tMTEP3_T09menoSritcommand + i),
            pavadinimas: eval(tMTEP3_T09pavadinimascommand + i),
            atlikVieta: eval(tMTEP3_T09atlikVietacommand + i),
            data: eval(tMTEP3_T09datacommand + i),
            atlygArNe: eval(tMTEP3_T09atlygArNecommand + i)
          })
        } // 21 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table21_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T10.push({
            nr: eval(tMTEP3_T10nrcommand + i),
            destytojas: eval(tMTEP3_T10destytojascommand + i),
            veiklPobud: eval(tMTEP3_T10veiklPobudcommand + i),
            veiklTiksl: eval(tMTEP3_T10veiklTikslcommand + i),
            dataVieta: eval(tMTEP3_T10dataVietacommand + i),
            dalyvSk: eval(tMTEP3_T10dalyvSkcommand + i),
            ktKomentarai: eval(tMTEP3_T10ktKomentaraicommand + i),
            atlygArNe: eval(tMTEP3_T10atlygArNecommand + i)
          })
        } // 22 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table22_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T11.push({
            nr: eval(tMTEP3_T11nrcommand + i),
            destytojas: eval(tMTEP3_T11destytojascommand + i),
            veiklPobud: eval(tMTEP3_T11veiklPobudcommand + i),
            veiklTiksl: eval(tMTEP3_T11veiklTikslcommand + i),
            dataVieta: eval(tMTEP3_T11dataVietacommand + i),
            dalyvSk: eval(tMTEP3_T11dalyvSkcommand + i),
            ktKomentarai: eval(tMTEP3_T11ktKomentaraicommand + i),
            atlygArNe: eval(tMTEP3_T11atlygArNecommand + i)
          })
        } // 23 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table23_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T12.push({
            nr: eval(tMTEP3_T12nrcommand + i),
            destytojas: eval(tMTEP3_T12destytojascommand + i),
            veiklPobud: eval(tMTEP3_T12veiklPobudcommand + i),
            dataVieta: eval(tMTEP3_T12dataVietacommand + i)
          })
        } // 24 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table24_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T14.push({
            nr: eval(tMTEP3_T14nrcommand + i),
            destytojas: eval(tMTEP3_T14destytojascommand + i),
            renginys: eval(tMTEP3_T14renginyscommand + i),
            veiklPobud: eval(tMTEP3_T14veiklPobudcommand + i),
            dataVieta: eval(tMTEP3_T14dataVietacommand + i)
          })
        } // 25 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table25_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T13.push({
            nr: eval(tMTEP3_T13nrcommand + i),
            destytojas: eval(tMTEP3_T13destytojascommand + i),
            studDuom: eval(tMTEP3_T13studDuomcommand + i),
            renginioPavad: eval(tMTEP3_T13renginioPavadcommand + i),
            rezultatas: eval(tMTEP3_T13rezultatascommand + i),
            data: eval(tMTEP3_T13datacommand + i)
          })
        }
        for (let i = 1; i <= parseInt(req.body.tMTEP3_S_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_S.push({
            nr: eval(tMTEP3_Snrcommand + i),
            stiprybes: eval(tMTEP3_Sstiprybescommand + i),
            tobulintina: eval(tMTEP3_Stobulintinacommand + i)
          })
        }
        // 26 lentelė edit-dep priedas
        // mokymosi
        for (let i = 1; i <= parseInt(req.body.table261_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.mokymosi.push({
            pavadinimas: eval(kTOV4_KV01mokymosiKomppavadcommand + i),
            pazymNr: eval(kTOV4_KV01mokymosiKomppazymNrcommand + i),
            trukmeValLT: eval(kTOV4_KV01mokymosiKomptrukmeValLTcommand + i),
            trukmeValNeLT: eval(kTOV4_KV01mokymosiKomptrukmeValNeLTcommand + i),
            destytojas: eval(kTOV4_KV01mokymosiKompdalyviscommand + i)
          })
        }
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.mokymosiIsVisoValLT = req.body.kTOV4_trukmeMokymValLT1,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.mokymosiIsVisoValNeLT = req.body.kTOV4_trukmeMokymValNeLT1
        // tyrimu
        for (let i = 1; i <= parseInt(req.body.table262_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.tyrimu.push({
            pavadinimas: eval(kTOV4_KV01tyrimuKomppavadcommand + i),
            pazymNr: eval(kTOV4_KV01tyrimuKomppazymNrcommand + i),
            trukmeValLT: eval(kTOV4_KV01tyrimuKomptrukmeValLTcommand + i),
            trukmeValNeLT: eval(kTOV4_KV01tyrimuKomptrukmeValNeLTcommand + i),
            destytojas: eval(kTOV4_KV01tyrimuKompdalyviscommand + i)
          })
        }
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.tyrimuIsVisoValLT = req.body.kTOV4_trukmeTyrimValLT2,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.tyrimuIsVisoValNeLT = req.body.kTOV4_trukmeTyrimValNeLT2
        //bendrosios
        for (let i = 1; i <= parseInt(req.body.table263_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.bendrosios.push({
            pavadinimas: eval(kTOV4_KV01bendrKomppavadcommand + i),
            pazymNr: eval(kTOV4_KV01bendrKomppazymNrcommand + i),
            trukmeValLT: eval(kTOV4_KV01bendrKomptrukmeValLTcommand + i),
            trukmeValNeLT: eval(kTOV4_KV01bendrKomptrukmeValNeLTcommand + i),
            destytojas: eval(kTOV4_KV01bendrKompdalyviscommand + i)
          })
        }
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.bendrosiosIsVisoValLT = req.body.kTOV4_trukmeBendrValLT3,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.bendrosiosIsVisoValNeLT = req.body.kTOV4_trukmeBendrValNeLT3
        //dalykines
        for (let i = 1; i <= parseInt(req.body.table264_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.dalykines.push({
            pavadinimas: eval(kTOV4_KV01dalykKomppavadcommand + i),
            pazymNr: eval(kTOV4_KV01dalykKomppazymNrcommand + i),
            trukmeValLT: eval(kTOV4_KV01dalykKompTrukmeValLTcommand + i),
            trukmeValNeLT: eval(kTOV4_KV01dalykKompTrukmeValNeLTcommand + i),
            destytojas: eval(kTOV4_KV01dalykKompdalyviscommand + i)
          })
        }
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.dalykinesIsVisoValLT = req.body.kTOV4_trukmeDalykValLT4,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.dalykinesIsVisoValNeLT = req.body.kTOV4_trukmeDalykValNeLT4

        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.isVisoValLT = req.body.kTOV4_trukmeValLTbendr,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.isVisoValNeLT = req.body.kTOV4_trukmeValNeLTbendr,
          //26 lent
          //mokymosi
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.mokymosi.destytojuSk = req.body.mokymosiLTdestytojuSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.mokymosi.trukmeValLT = req.body.mokymosiLTtrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.mokymosi.trukmeValNeLT = req.body.mokymosiNeLttrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.mokymosi.isVisoVal = req.body.mokymosiIsVisoVal,
          //tyrimu
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.tyrimu.destytojuSk = req.body.tyrimuLTdestytojuSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.tyrimu.trukmeValLT = req.body.tyrimuLTtrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.tyrimu.trukmeValNeLT = req.body.tyrimuNeLttrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.tyrimu.isVisoVal = req.body.tyrimuIsVisoVal,
          //bendrosios
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.bendrosios.destytojuSk = req.body.bendrosiosLTdestytojuSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.bendrosios.trukmeValLT = req.body.bendrosiosLTtrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.bendrosios.trukmeValNeLT = req.body.bendrosiosNeLttrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.bendrosios.isVisoVal = req.body.bendrosiosIsVisoVal,
          //dalykines
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.dalykines.destytojuSk = req.body.dalykinesLTdestytojuSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.dalykines.trukmeValLT = req.body.dalykinesLTtrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.dalykines.trukmeValNeLT = req.body.dalykinesNeLttrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.dalykines.isVisoVal = req.body.dalykinesIsVisoVal
        // 27 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table27_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_27.push({
            nr: eval(lent27_nrcommand + i),
            renginysTema: eval(lent27_renginysTemacommand + i),
            kompGrupe: eval(lent27_kompGrupecommand + i),
            skirta: eval(lent27_skirtacommand + i),
            lektorius: eval(lent27_lektoriuscommand + i),
            lektTipas: eval(lent27_lektTipascommand + i)
          })
        } // 28 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table28_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_28.push({
            nr: eval(lent28_nrcommand + i),
            destytojas: eval(lent28_destytojascommand + i),
            imonIstaig: eval(lent28_imonIstaigcommand + i),
            kompGrupe: eval(lent28_kompGrupecommand + i),
            trukmeVal: eval(lent28_trukmeValcommand + i),
            data: eval(lent28_datacommand + i)
          })
        } // 29 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table29_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV03.push({
            nr: eval(kTOV4_KV03nrcommand + i),
            destytojas: eval(kTOV4_KV03destytojascommand + i),
            studKryptis: eval(kTOV4_KV03studKryptiscommand + i),
            salis: eval(kTOV4_KV03saliscommand + i),
            institucija: eval(kTOV4_KV03institucijacommand + i),
            dalykas: eval(kTOV4_KV03dalykascommand + i)
          })
        } // 30 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table30_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_30.push({
            nr: eval(lent30_nrcommand + i),
            destytojas: eval(lent30_destytojascommand + i),
            studKryptis: eval(lent30_studKryptiscommand + i),
            salis: eval(lent30_saliscommand + i),
            institucija: eval(lent30_institucijacommand + i),
            dalykas: eval(lent30_dalykascommand + i)
          })
        } // 31 lentelė edit-dep 1
        for (let i = 1; i <= parseInt(req.body.table311_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_O01.kTOV4_O01_1.push({
            nr: eval(kTOV4_O01_1nrcommand + i),
            destytojas: eval(kTOV4_O01_1destytojascommand + i),
            veiklPobud: eval(kTOV4_O01_1veiklPobudcommand + i),
            isakNrData: eval(kTOV4_O01_1isakNrDatacommand + i)
          })
        } // 31 lentelė edit-dep 2
        for (let i = 1; i <= parseInt(req.body.table312_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_O01.kTOV4_O01_2.push({
            nr: eval(kTOV4_O01_2nrcommand + i),
            destytojas: eval(kTOV4_O01_2destytojascommand + i),
            veiklPobud: eval(kTOV4_O01_2veiklPobudcommand + i),
            dataVieta: eval(kTOV4_O01_2dataVietacommand + i),
            ktKomentarai: eval(kTOV4_O01_2ktKomentaraicommand + i)
          })
        }
        for (let i = 1; i <= parseInt(req.body.tablekTOV4_S_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_S.push({
            nr: eval(kTOV4_Snrcommand + i),
            stiprybes: eval(kTOV4_Sstiprybescommand + i),
            tobulintina: eval(kTOV4_Stobulintinacommand + i)
          })
        } // 32 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table32_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_32.push({
            nr: eval(lent32_nrcommand + i),
            studKryptis: eval(lent32_studKryptiscommand + i),
            studProgr: eval(lent32_studProgrcommand + i),
            strategPartner: eval(lent32_strategPartnercommand + i)
          })
        } // 33 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table33_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_33.push({
            nr: eval(lent33_nrcommand + i),
            veikla: eval(lent33_veiklacommand + i),
            socPartneris: eval(lent33_socPartneriscommand + i),
            destytojas: eval(lent33_destytojascommand + i)
          })
        } // 34 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table34_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_34.push({
            nr: eval(lent34_nrcommand + i),
            studKryptis: eval(lent34_studKryptiscommand + i),
            studProgr: eval(lent34_studProgrcommand + i),
            studentuSk1: eval(lent34_studentuSk1_command + i),
            studentuSk2: eval(lent34_studentuSk2_command + i),
            studentuSk3: eval(lent34_studentuSk3_command + i),
            studentuSk4: eval(lent34_studentuSk4_command + i),
            studentuSk5: eval(lent34_studentuSk5_command + i)
          })
        } // 35 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table35_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_35.push({
            nr: eval(lent35_nrcommand + i),
            studKryptis: eval(lent35_studKryptiscommand + i),
            studProgr: eval(lent35_studProgrcommand + i),
            studentuSk1: eval(lent35_studentuSkBendr1_command + i),
            pasPartnerSk1: eval(lent35_studentuSk1_command + i),
            studentuSk2: eval(lent35_studentuSkBendr2_command + i),
            pasPartnerSk2: eval(lent35_studentuSk2_command + i),
            studentuSk3: eval(lent35_studentuSkBendr3_command + i),
            pasPartnerSk3: eval(lent35_studentuSk3_command + i),
            studentuSk4: eval(lent35_studentuSkBendr4_command + i),
            pasPartnerSk4: eval(lent35_studentuSk4_command + i),
            studentuSk5: eval(lent35_studentuSkBendr5_command + i),
            pasPartnerSk5: eval(lent35_studentuSk5_command + i)
          })
        } // 36 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table36_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_KT02.push({
            nr: eval(kV5_KT02nrcommand + i),
            studKryptis: eval(kV5_KT02studKryptiscommand + i),
            studProgr: eval(kV5_KT02studProgrcommand + i),
            diplomantas: eval(kV5_KT02diplomantascommand + i),
            darboTema: eval(kV5_KT02darboTemacommand + i)
          })
        } // 37 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table37_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_KT01.push({
            nr: eval(kV5_KT01nrcommand + i),
            studKryptis: eval(kV5_KT01studKryptiscommand + i),
            studProgr: eval(kV5_KT01studProgrcommand + i),
            diplomantas: eval(kV5_KT01diplomantascommand + i),
            darboTema: eval(kV5_KT01darboTemacommand + i),
            uzsakovas: eval(kV5_KT01uzsakovascommand + i)
          })
        } // 38 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table38_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_38.push({
            nr: eval(lent38_nrcommand + i),
            pavadinimas: eval(lent38_pavadinimascommand + i),
            vykdytPartner: eval(lent38_vykdytPartnercommand + i),
            dalyviai: eval(lent38_dalyviaicommand + i),
            finansavim: eval(lent38_finansavimcommand + i),
            rezultatai: eval(lent38_rezultataicommand + i),
            salisData: eval(lent38_salisDatacommand + i)
          })
        } // 39 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table39_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_39.push({
            nr: eval(lent39_nrcommand + i),
            kryptys: eval(lent39_kryptyscommand + i),
            aprasymas: eval(lent39_aprasymascommand + i)
          })
        } // 40 lentelė edit-dep 1
        for (let i = 1; i <= parseInt(req.body.table401_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_40.socAtskMaz.push({
            aprasymas: eval(lent40_socAprasymascommand + i),
            destytojas: eval(lent40_socDestytojascommand + i)
          })
        } // 40 lentelė edit-dep 2
        for (let i = 1; i <= parseInt(req.body.table402_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_40.aplinkosaugInic.push({
            aprasymas: eval(lent40_aplinkAprasymascommand + i),
            destytojas: eval(lent40_aplinkDestytojascommand + i)
          })
        } // 40 lentelė edit-dep 3
        for (let i = 1; i <= parseInt(req.body.table403_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_40.lietValstybPuosel.push({
            aprasymas: eval(lent40_valstybAprasymascommand + i),
            destytojas: eval(lent40_valstybDestytojascommand + i)
          })
        } // 40 lentelė edit-dep 4
        for (let i = 1; i <= parseInt(req.body.table404_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_40.lietEtnokPuos.push({
            aprasymas: eval(lent40_etnoAprasymascommand + i),
            destytojas: eval(lent40_etnoDestytojascommand + i)
          })
        } // 40 lentelė edit-dep 5
        for (let i = 1; i <= parseInt(req.body.table405_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_40.savanorystIniciatyv.push({
            aprasymas: eval(lent40_savAprasymascommand + i),
            destytojas: eval(lent40_savDestytojascommand + i)
          })
        } // 41 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table41_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_41.push({
            nr: eval(lent41_nrcommand + i),
            veikla: eval(lent41_veiklacommand + i),
            veiklPartner: eval(lent41_veiklPartnercommand + i),
            organizac: eval(lent41_organizaccommand + i),
            veiklOrientavim: eval(lent41_veiklOrientavimcommand + i),
            dalyviai: eval(lent41_dalyviaicommand + i),
            laikas: eval(lent41_laikascommand + i),
            vieta: eval(lent41_vietacommand + i)
          })
        }
        for (let i = 1; i <= parseInt(req.body.tableVeiklS_name); i++) {
          foundUser.katedrosVedejas.kV5.veiklSavinalize.veiklSavinalize_array.push({
            stiprybes: eval(veiklSavinalizestiprybescommand + i),
            tobulintina: eval(veiklSavinalizetobulintinacommand + i)
          })
        }
        foundUser.katedrosVedejas.kV5.veiklSavinalize.isvadosApieVeikl = req.body.isvadosApieVeikl,

          foundUser.busenaVedejo = req.body.ataskaitos_busena,
          foundUser.updated_for = req.user.username

        foundUser.save(function(err) {
          if (!err) {
            console.log("Succesfully updated");
            res.redirect("/user-window-dep");
          }
        });
      } else {
        console.log("User does'f found");
      }
    }
  });
});

app.get("/submit-dep", function(req, res) {
  if (req.isAuthenticated()) {

    User.findById(req.user.id, function(err, foundUser) {

      let currentUserFaculty = foundUser.fakultetas;

      if (err) {
        console.log(err);
      } else {
        Faculty.findOne({
          username: currentUserFaculty
        }, function(err, foundFaculty) {
          if (err) {
            console.log(err);
          } else {

            res.render("submit-dep", {
              foundFaculty: foundFaculty,
              user: foundUser,
              fakultetasUpper: _.toUpper(foundUser.fakultetas),
              katedraUpper: _.toUpper(foundUser.katedra)
            });
          }
        });

      }
    });
  } else {
    res.redirect("/login");
  }
});

app.post("/submit-dep", function(req, res) {

  User.findById(req.user.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        // 1 lentelė
        var mV2_D04nrcommand = "req.body.mV2_D04nr";
        var mV2_D04studKryptiscommand = "req.body.mV2_D04studKryptis";
        var mV2_D04studProgrcommand = "req.body.mV2_D04studProgr";
        var mV2_D04progrKodascommand = "req.body.mV2_D04progrKodas";
        var mV2_D04isakNrDatacommand = "req.body.mV2_D04isakNrData";
        var mV2_D04studKryptAkreditcommand = "req.body.mV2_D04studKryptAkredit";
        var mV2_D04akreditLaikotcommand = "req.body.mV2_D04akreditLaikot";
        var mV2_D04eCTS1command = "req.body.mV2_D04eCTS";
        // 2 lent
        var lent2_nrcommand = "req.body.lent2_nr";
        var lent2_pavVardcommand = "req.body.lent2_pavVard";
        var lent2_pareigoscommand = "req.body.lent2_pareigos";
        var lent2_darbovTipascommand = "req.body.lent2_darbovTipas";
        var lent2_pedagogStazascommand = "req.body.lent2_pedagogStazas";
        var lent2_praktinStazascommand = "req.body.lent2_praktinStazas";
        //3 lent
        var lent3_nrcommand = "req.body.lent3_nr";
        var lent3_studKryptiscommand = "req.body.lent3_studKryptis";
        var lent3_studProgrcommand = "req.body.lent3_studProgr";
        var lent3_destytojascommand = "req.body.lent3_destytojas";
        var lent3_imonIstaigcommand = "req.body.lent3_imonIstaig";
        // 4 lent
        var lent4_nrcommand = "req.body.lent4_nr";
        var lent4_bibliografAprcommand = "req.body.lent4_bibliografApr";
        var lent4_tipascommand = "req.body.lent4_tipas";
        var lent4_mokslSritcommand = "req.body.lent4_mokslSrit";
        var lent4_mokslKryptcommand = "req.body.lent4_mokslKrypt";
        // 5 lent
        var mV2_M04nrcommand = "req.body.mV2_M04nr";
        var mV2_M04destytojascommand = "req.body.mV2_M04destytojas";
        var mV2_M04studProgrcommand = "req.body.mV2_M04studProgr";
        var mV2_M04dalykPavadcommand = "req.body.mV2_M04dalykPavad";
        var mV2_M04apimtisKreditcommand = "req.body.mV2_M04apimtisKredit";
        var mV2_M04busenacommand = "req.body.mV2_M04busena";
        // 6 lent
        var mV2_D06nrcommand = "req.body.mV2_D06nr";
        var mV2_D06studProgrcommand = "req.body.mV2_D06studProgr";
        var mV2_D06progrKodascommand = "req.body.mV2_D06progrKodas";
        var mV2_D06atlPatobulincommand = "req.body.mV2_D06atlPatobulin";
        var mV2_D06tobulinPriezastcommand = "req.body.mV2_D06tobulinPriezast";
        var mV2_D06tobulinIrodcommand = "req.body.mV2_D06tobulinIrod";
        // 7 lent
        var mV2_D01nrcommand = "req.body.mV2_D01nr";
        var mV2_D01destytojascommand = "req.body.mV2_D01destytojas";
        var mV2_D01komitetascommand = "req.body.mV2_D01komitetas";
        var mV2_D01veiklacommand = "req.body.mV2_D01veikla";
        var mV2_D01rezultataicommand = "req.body.mV2_D01rezultatai";
        //8 lent
        var mV2_D02nrcommand = "req.body.mV2_D02nr";
        var mV2_D02destytojascommand = "req.body.mV2_D02destytojas";
        var mV2_D02studKryptcommand = "req.body.mV2_D02studKrypt";
        var mV2_D02veiklacommand = "req.body.mV2_D02veikla";
        var mV2_D02rezultataicommand = "req.body.mV2_D02rezultatai";
        //9 lent
        var mV2_D03nrcommand = "req.body.mV2_D03nr";
        var mV2_D03destytojascommand = "req.body.mV2_D03destytojas";
        var mV2_D03studKryptiscommand = "req.body.mV2_D03studKryptis";
        var mV2_D03studProgrcommand = "req.body.mV2_D03studProgr";
        var mV2_D03veiklacommand = "req.body.mV2_D03veikla";
        var mV2_D03rezultataicommand = "req.body.mV2_D03rezultatai";
        // 10 lent
        var mV2_M03nrcommand = "req.body.mV2_M03nr";
        var mV2_M03destytojascommand = "req.body.mV2_M03destytojas";
        var mV2_M03studProgrcommand = "req.body.mV2_M03studProgr";
        var mV2_M03dalykPavadcommand = "req.body.mV2_M03dalykPavad";
        var mV2_M03apimtisKreditcommand = "req.body.mV2_M03apimtisKredit";
        //11 lent
        var mV2_S01nrcommand = "req.body.mV2_S01nr";
        var mV2_S01destytojascommand = "req.body.mV2_S01destytojas";
        var mV2_S01veiklacommand = "req.body.mV2_S01veikla";
        var mV2_S01dataVietacommand = "req.body.mV2_S01dataVieta";
        //mV2_S
        var mV2_Snrcommand = "req.body.mV2_Snr";
        var mV2_Sstiprybescommand = "req.body.mV2_Sstiprybes";
        var mV2_Stobulintinacommand = "req.body.mV2_Stobulintina";
        // 12 lent
        var tMTEP3_T01nrcommand = "req.body.tMTEP3_T01nr";
        var tMTEP3_T01tyrTematcommand = "req.body.tMTEP3_T01tyrTemat";
        var tMTEP3_T01destytojascommand = "req.body.tMTEP3_T01destytojas";
        var tMTEP3_T01tyrGrupcommand = "req.body.tMTEP3_T01tyrGrup";
        var tMTEP3_T01mokslSritcommand = "req.body.tMTEP3_T01mokslSrit";
        var tMTEP3_T01mokslKryptcommand = "req.body.tMTEP3_T01mokslKrypt";
        // 13 lent
        var tMTEP3_T02nrcommand = "req.body.tMTEP3_T02nr";
        var tMTEP3_T02bibliografAprcommand = "req.body.tMTEP3_T02bibliografApr";
        var tMTEP3_T02tipascommand = "req.body.tMTEP3_T02tipas";
        var tMTEP3_T02mokslSritcommand = "req.body.tMTEP3_T02mokslSrit";
        var tMTEP3_T02mokslKryptcommand = "req.body.tMTEP3_T02mokslKrypt";
        var tMTEP3_T02duomBazecommand = "req.body.tMTEP3_T02duomBaze";
        //14 lent
        var tMTEP3_T03nrcommand = "req.body.tMTEP3_T03nr";
        var tMTEP3_T03pilnasBiblAprcommand = "req.body.tMTEP3_T03pilnasBiblApr";
        var tMTEP3_T03rengTipascommand = "req.body.tMTEP3_T03rengTipas";
        //15 lent
        var tMTEP3_T04nrcommand = "req.body.tMTEP3_T04nr";
        var tMTEP3_T04konsultantascommand = "req.body.tMTEP3_T04konsultantas";
        var tMTEP3_T04uzsakovascommand = "req.body.tMTEP3_T04uzsakovas";
        var tMTEP3_T04temacommand = "req.body.tMTEP3_T04tema";
        var tMTEP3_T04datacommand = "req.body.tMTEP3_T04data";
        var tMTEP3_T04atlygArNecommand = "req.body.tMTEP3_T04atlygArNe";
        // 16.1 lent
        var tMTEP3_T05nrcommand = "req.body.tMTEP3_T05nr";
        var tMTEP3_T05destytojascommand = "req.body.tMTEP3_T05destytojas";
        var tMTEP3_T05veiklPavadcommand = "req.body.tMTEP3_T05veiklPavad";
        var tMTEP3_T05veiklRezultcommand = "req.body.tMTEP3_T05veiklRezult";
        var tMTEP3_T05atlygArNecommand = "req.body.tMTEP3_T05atlygArNe";
        //16.2 lent
        var lent162_nrnrcommand = "req.body.lent162_nr";
        var lent162_destytojascommand = "req.body.lent162_destytojas";
        var lent162_pavadinimascommand = "req.body.lent162_pavadinimas";
        var lent162_pastaboscommand = "req.body.lent162_pastabos";
        //16.3 lent
        var tMTEP3_T16nrcommand = "req.body.tMTEP3_T16nr";
        var tMTEP3_T16autoriuscommand = "req.body.tMTEP3_T16autorius";
        var tMTEP3_T16pavadinimascommand = "req.body.tMTEP3_T16pavadinimas";
        var tMTEP3_T16uzsakovascommand = "req.body.tMTEP3_T16uzsakovas";
        //17 lent
        var tMTEP3_T06nrcommand = "req.body.tMTEP3_T06nr";
        var tMTEP3_T06autoriuscommand = "req.body.tMTEP3_T06autorius";
        var tMTEP3_T06menoSritcommand = "req.body.tMTEP3_T06menoSrit";
        var tMTEP3_T06pobudiscommand = "req.body.tMTEP3_T06pobudis";
        var tMTEP3_T06realizVietacommand = "req.body.tMTEP3_T06realizVieta";
        var tMTEP3_T06datacommand = "req.body.tMTEP3_T06data";
        var tMTEP3_T06atlygArNecommand = "req.body.tMTEP3_T06atlygArNe";
        //18 lent
        var tMTEP3_T07nrcommand = "req.body.tMTEP3_T07nr";
        var tMTEP3_T07atlikejascommand = "req.body.tMTEP3_T07atlikejas";
        var tMTEP3_T07menoSritcommand = "req.body.tMTEP3_T07menoSrit";
        var tMTEP3_T07pavadinimascommand = "req.body.tMTEP3_T07pavadinimas";
        var tMTEP3_T07atlikVietacommand = "req.body.tMTEP3_T07atlikVieta";
        var tMTEP3_T07datacommand = "req.body.tMTEP3_T07data";
        var tMTEP3_T07atlygArNecommand = "req.body.tMTEP3_T07atlygArNe";
        //19 lent
        var tMTEP3_T08Snrcommand = "req.body.tMTEP3_T08Snr";
        var tMTEP3_T08atlikejascommand = "req.body.tMTEP3_T08atlikejas";
        var tMTEP3_T08menoSritcommand = "req.body.tMTEP3_T08menoSrit";
        var tMTEP3_T08pavadinimascommand = "req.body.tMTEP3_T08pavadinimas";
        var tMTEP3_T08atlikVietacommand = "req.body.tMTEP3_T08atlikVieta";
        var tMTEP3_T08datacommand = "req.body.tMTEP3_T08data";
        var tMTEP3_T08atlygArNecommand = "req.body.tMTEP3_T08atlygArNe";
        //20 lent
        var tMTEP3_T09nrcommand = "req.body.tMTEP3_T09nr";
        var tMTEP3_T09atlikejascommand = "req.body.tMTEP3_T09atlikejas";
        var tMTEP3_T09menoSritcommand = "req.body.tMTEP3_T09menoSrit";
        var tMTEP3_T09pavadinimascommand = "req.body.tMTEP3_T09pavadinimas";
        var tMTEP3_T09atlikVietacommand = "req.body.tMTEP3_T09atlikVieta";
        var tMTEP3_T09datacommand = "req.body.tMTEP3_T09data";
        var tMTEP3_T09atlygArNecommand = "req.body.tMTEP3_T09atlygArNe";
        //21 lent
        var tMTEP3_T10nrcommand = "req.body.tMTEP3_T10nr";
        var tMTEP3_T10destytojascommand = "req.body.tMTEP3_T10destytojas";
        var tMTEP3_T10veiklPobudcommand = "req.body.tMTEP3_T10veiklPobud";
        var tMTEP3_T10veiklTikslcommand = "req.body.tMTEP3_T10veiklTiksl";
        var tMTEP3_T10dataVietacommand = "req.body.tMTEP3_T10dataVieta";
        var tMTEP3_T10dalyvSkcommand = "req.body.tMTEP3_T10dalyvSk";
        var tMTEP3_T10ktKomentaraicommand = "req.body.tMTEP3_T10ktKomentarai";
        var tMTEP3_T10atlygArNecommand = "req.body.tMTEP3_T10atlygArNe";
        //22 lent
        var tMTEP3_T11nrcommand = "req.body.tMTEP3_T11nr";
        var tMTEP3_T11destytojascommand = "req.body.tMTEP3_T11destytojas";
        var tMTEP3_T11veiklPobudcommand = "req.body.tMTEP3_T11veiklPobud";
        var tMTEP3_T11veiklTikslcommand = "req.body.tMTEP3_T11veiklTiksl";
        var tMTEP3_T11dataVietacommand = "req.body.tMTEP3_T11dataVieta";
        var tMTEP3_T11dalyvSkcommand = "req.body.tMTEP3_T11dalyvSk";
        var tMTEP3_T11ktKomentaraicommand = "req.body.tMTEP3_T11ktKomentarai";
        var tMTEP3_T11atlygArNecommand = "req.body.tMTEP3_T11atlygArNe";
        //23 lent
        var tMTEP3_T12nrcommand = "req.body.tMTEP3_T12nr";
        var tMTEP3_T12destytojascommand = "req.body.tMTEP3_T12destytojas";
        var tMTEP3_T12veiklPobudcommand = "req.body.tMTEP3_T12veiklPobud";
        var tMTEP3_T12dataVietacommand = "req.body.tMTEP3_T12dataVieta";
        //24 lent
        var tMTEP3_T14nrcommand = "req.body.tMTEP3_T14nr";
        var tMTEP3_T14destytojascommand = "req.body.tMTEP3_T14destytojas";
        var tMTEP3_T14renginyscommand = "req.body.tMTEP3_T14renginys";
        var tMTEP3_T14veiklPobudcommand = "req.body.tMTEP3_T14veiklPobud";
        var tMTEP3_T14dataVietacommand = "req.body.tMTEP3_T14dataVieta";
        //25 lent
        var tMTEP3_T13nrcommand = "req.body.tMTEP3_T13nr";
        var tMTEP3_T13destytojascommand = "req.body.tMTEP3_T13destytojas";
        var tMTEP3_T13studDuomcommand = "req.body.tMTEP3_T13studDuom";
        var tMTEP3_T13renginioPavadcommand = "req.body.tMTEP3_T13renginioPavad";
        var tMTEP3_T13rezultatascommand = "req.body.tMTEP3_T13rezultatas";
        var tMTEP3_T13datacommand = "req.body.tMTEP3_T13data";
        //TMTEP_S
        var tMTEP3_Snrcommand = "req.body.tMTEP3_Snr";
        var tMTEP3_Sstiprybescommand = "req.body.tMTEP3_Sstiprybes";
        var tMTEP3_Stobulintinacommand = "req.body.tMTEP3_Stobulintina";
        //26 lent priedas
        //mokymosi
        var kTOV4_KV01mokymosiKomppavadcommand = "req.body.kTOV4_KV01mokymosiKomppavad";
        var kTOV4_KV01mokymosiKomppazymNrcommand = "req.body.kTOV4_KV01mokymosiKomppazymNr";
        var kTOV4_KV01mokymosiKomptrukmeValLTcommand = "req.body.kTOV4_KV01mokymosiKomptrukmeValLT";
        var kTOV4_KV01mokymosiKomptrukmeValNeLTcommand = "req.body.kTOV4_KV01mokymosiKomptrukmeValNeLT";
        var kTOV4_KV01mokymosiKompdalyviscommand = "req.body.kTOV4_KV01mokymosiKompdalyvis";
        // tyrimu
        var kTOV4_KV01tyrimuKomppavadcommand = "req.body.kTOV4_KV01tyrimuKomppavad";
        var kTOV4_KV01tyrimuKomppazymNrcommand = "req.body.kTOV4_KV01tyrimuKomppazymNr";
        var kTOV4_KV01tyrimuKomptrukmeValLTcommand = "req.body.kTOV4_KV01tyrimuKomptrukmeValLT";
        var kTOV4_KV01tyrimuKomptrukmeValNeLTcommand = "req.body.kTOV4_KV01tyrimuKomptrukmeValNeLT";
        var kTOV4_KV01tyrimuKompdalyviscommand = "req.body.kTOV4_KV01tyrimuKompdalyvis";
        //bendrosios
        var kTOV4_KV01bendrKomppavadcommand = "req.body.kTOV4_KV01bendrKomppavad";
        var kTOV4_KV01bendrKomppazymNrcommand = "req.body.kTOV4_KV01bendrKomppazymNr";
        var kTOV4_KV01bendrKomptrukmeValLTcommand = "req.body.kTOV4_KV01bendrKomptrukmeValLT";
        var kTOV4_KV01bendrKomptrukmeValNeLTcommand = "req.body.kTOV4_KV01bendrKomptrukmeValNeLT";
        var kTOV4_KV01bendrKompdalyviscommand = "req.body.kTOV4_KV01bendrKompdalyvis";
        //dalykines
        var kTOV4_KV01dalykKomppavadcommand = "req.body.kTOV4_KV01dalykKomppavad";
        var kTOV4_KV01dalykKomppazymNrcommand = "req.body.kTOV4_KV01dalykKomppazymNr";
        var kTOV4_KV01dalykKompTrukmeValLTcommand = "req.body.kTOV4_KV01dalykKompTrukmeValLT";
        var kTOV4_KV01dalykKompTrukmeValNeLTcommand = "req.body.kTOV4_KV01dalykKompTrukmeValNeLT";
        var kTOV4_KV01dalykKompdalyviscommand = "req.body.kTOV4_KV01dalykKompdalyvis";
        //27 lent
        var lent27_nrcommand = "req.body.lent27_nr";
        var lent27_renginysTemacommand = "req.body.lent27_renginysTema";
        var lent27_kompGrupecommand = "req.body.lent27_kompGrupe";
        var lent27_skirtacommand = "req.body.lent27_skirta";
        var lent27_lektoriuscommand = "req.body.lent27_lektorius";
        var lent27_lektTipascommand = "req.body.lent27_lektTipas";
        //28 lent
        var lent28_nrcommand = "req.body.lent28_nr";
        var lent28_destytojascommand = "req.body.lent28_destytojas";
        var lent28_imonIstaigcommand = "req.body.lent28_imonIstaig";
        var lent28_kompGrupecommand = "req.body.lent28_kompGrupe";
        var lent28_trukmeValcommand = "req.body.lent28_trukmeVal";
        var lent28_datacommand = "req.body.lent28_data";
        //29 lent
        var kTOV4_KV03nrcommand = "req.body.kTOV4_KV03nr";
        var kTOV4_KV03destytojascommand = "req.body.kTOV4_KV03destytojas";
        var kTOV4_KV03studKryptiscommand = "req.body.kTOV4_KV03studKryptis";
        var kTOV4_KV03saliscommand = "req.body.kTOV4_KV03salis";
        var kTOV4_KV03institucijacommand = "req.body.kTOV4_KV03institucija";
        var kTOV4_KV03dalykascommand = "req.body.kTOV4_KV03dalykas";
        //30 lent
        var lent30_nrcommand = "req.body.lent30_nr";
        var lent30_destytojascommand = "req.body.lent30_destytojas";
        var lent30_studKryptiscommand = "req.body.lent30_studKryptis";
        var lent30_saliscommand = "req.body.lent30_salis";
        var lent30_institucijacommand = "req.body.lent30_institucija";
        var lent30_dalykascommand = "req.body.lent30_dalykas";
        // 31.1 lent
        var kTOV4_O01_1nrcommand = "req.body.kTOV4_O01_1nr";
        var kTOV4_O01_1destytojascommand = "req.body.kTOV4_O01_1destytojas";
        var kTOV4_O01_1veiklPobudcommand = "req.body.kTOV4_O01_1veiklPobud";
        var kTOV4_O01_1isakNrDatacommand = "req.body.kTOV4_O01_1isakNrData";
        // 31.2 lent
        var kTOV4_O01_2nrcommand = "req.body.kTOV4_O01_2nr";
        var kTOV4_O01_2destytojascommand = "req.body.kTOV4_O01_2destytojas";
        var kTOV4_O01_2veiklPobudcommand = "req.body.kTOV4_O01_2veiklPobud";
        var kTOV4_O01_2dataVietacommand = "req.body.kTOV4_O01_2dataVieta";
        var kTOV4_O01_2ktKomentaraicommand = "req.body.kTOV4_O01_2ktKomentarai";
        //kTOV4_S
        var kTOV4_Snrcommand = "req.body.kTOV4_Snr";
        var kTOV4_Sstiprybescommand = "req.body.kTOV4_Sstiprybes";
        var kTOV4_Stobulintinacommand = "req.body.kTOV4_Stobulintina";
        //32 lent
        var lent32_nrcommand = "req.body.lent32_nr";
        var lent32_studKryptiscommand = "req.body.lent32_studKryptis";
        var lent32_studProgrcommand = "req.body.lent32_studProgr";
        var lent32_strategPartnercommand = "req.body.lent32_strategPartner";
        //33 lent
        var lent33_nrcommand = "req.body.lent33_nr";
        var lent33_veiklacommand = "req.body.lent33_veikla";
        var lent33_socPartneriscommand = "req.body.lent33_socPartneris";
        var lent33_destytojascommand = "req.body.lent33_destytojas";
        //34 lent
        var lent34_nrcommand = "req.body.lent34_nr";
        var lent34_studKryptiscommand = "req.body.lent34_studKryptis";
        var lent34_studProgrcommand = "req.body.lent34_studProgr";
        var lent34_studentuSk1_command = "req.body.lent34_studentuSk1_";
        var lent34_studentuSk2_command = "req.body.lent34_studentuSk2_";
        var lent34_studentuSk3_command = "req.body.lent34_studentuSk3_";
        var lent34_studentuSk4_command = "req.body.lent34_studentuSk4_";
        var lent34_studentuSk5_command = "req.body.lent34_studentuSk5_";
        //35 lent
        var lent35_nrcommand = "req.body.lent35_nr";
        var lent35_studKryptiscommand = "req.body.lent35_studKryptis";
        var lent35_studProgrcommand = "req.body.lent35_studProgr";
        var lent35_studentuSkBendr1_command = "req.body.lent35_studentuSkBendr1_";
        var lent35_studentuSk1_command = "req.body.lent35_studentuSk1_";
        var lent35_studentuSkBendr2_command = "req.body.lent35_studentuSkBendr2_";
        var lent35_studentuSk2_command = "req.body.lent35_studentuSk2_";
        var lent35_studentuSkBendr3_command = "req.body.lent35_studentuSkBendr3_";
        var lent35_studentuSk3_command = "req.body.lent35_studentuSk3_";
        var lent35_studentuSkBendr4_command = "req.body.lent35_studentuSkBendr4_";
        var lent35_studentuSk4_command = "req.body.lent35_studentuSk4_";
        var lent35_studentuSkBendr5_command = "req.body.lent35_studentuSkBendr5_";
        var lent35_studentuSk5_command = "req.body.lent35_studentuSk5_";
        //36 lent
        var kV5_KT02nrcommand = "req.body.kV5_KT02nr";
        var kV5_KT02studKryptiscommand = "req.body.kV5_KT02studKryptis";
        var kV5_KT02studProgrcommand = "req.body.kV5_KT02studProgr";
        var kV5_KT02diplomantascommand = "req.body.kV5_KT02diplomantas";
        var kV5_KT02darboTemacommand = "req.body.kV5_KT02darboTema";
        //37 lent
        var kV5_KT01nrcommand = "req.body.kV5_KT01nr";
        var kV5_KT01studKryptiscommand = "req.body.kV5_KT01studKryptis";
        var kV5_KT01studProgrcommand = "req.body.kV5_KT01studProgr";
        var kV5_KT01diplomantascommand = "req.body.kV5_KT01diplomantas";
        var kV5_KT01darboTemacommand = "req.body.kV5_KT01darboTema";
        var kV5_KT01uzsakovascommand = "req.body.kV5_KT01uzsakovas";
        //38 lent
        var lent38_nrcommand = "req.body.lent38_nr";
        var lent38_pavadinimascommand = "req.body.lent38_pavadinimas";
        var lent38_vykdytPartnercommand = "req.body.lent38_vykdytPartner";
        var lent38_dalyviaicommand = "req.body.lent38_dalyviai";
        var lent38_finansavimcommand = "req.body.lent38_finansavim";
        var lent38_rezultataicommand = "req.body.lent38_rezultatai";
        var lent38_salisDatacommand = "req.body.lent38_salisData";
        //39 lent
        var lent39_nrcommand = "req.body.lent39_nr";
        var lent39_kryptyscommand = "req.body.lent39_kryptys";
        var lent39_aprasymascommand = "req.body.lent39_aprasymas";

        //40 lent 1
        var lent40_socAprasymascommand = "req.body.lent40_socaprasymas";
        var lent40_socDestytojascommand = "req.body.lent40_socdestytojas";
        //40 lent 2
        var lent40_aplinkAprasymascommand = "req.body.lent40_aplinkaprasymas";
        var lent40_aplinkDestytojascommand = "req.body.lent40_aplinkdestytojas";
        //40 lent 3
        var lent40_valstybAprasymascommand = "req.body.lent40_valstybaprasymas";
        var lent40_valstybDestytojascommand = "req.body.lent40_valstybdestytojas";
        //40 lent 4
        var lent40_etnoAprasymascommand = "req.body.lent40_etnoaprasymas";
        var lent40_etnoDestytojascommand = "req.body.lent40_savdestytojas";
        //40 lent 5
        var lent40_savAprasymascommand = "req.body.lent40_savaprasymas";
        var lent40_savDestytojascommand = "req.body.lent40_savdestytojas";
        //41 lent
        var lent41_nrcommand = "req.body.lent41_nr";
        var lent41_veiklacommand = "req.body.lent41_veikla";
        var lent41_veiklPartnercommand = "req.body.lent41_veiklPartner";
        var lent41_organizaccommand = "req.body.lent41_organizac";
        var lent41_veiklOrientavimcommand = "req.body.lent41_veiklOrientavim"
        var lent41_dalyviaicommand = "req.body.lent41_dalyviai";
        var lent41_laikascommand = "req.body.lent41_laikas";
        var lent41_vietacommand = "req.body.lent41_vieta";
        //veiklSavinalize
        var veiklSavinalizestiprybescommand = "req.body.veiklSavianalizStiprybes";
        var veiklSavinalizetobulintinacommand = "req.body.veiklSavianalizTobulintina";

        foundUser.katedrosVedejas.kKPP1_1 = new Array(); // 1
        foundUser.katedrosVedejas.kDS1 = new Array(); // 2
        foundUser.katedrosVedejas.kKPP1_3 = new Array(); // 3
        foundUser.katedrosVedejas.mV2.mV2_M02 = new Array(); // 4
        foundUser.katedrosVedejas.mV2.mV2_M04 = new Array(); // 5
        foundUser.katedrosVedejas.mV2.mV2_D06 = new Array(); // 6
        foundUser.katedrosVedejas.mV2.mV2_D01 = new Array(); // 7
        foundUser.katedrosVedejas.mV2.mV2_D02 = new Array(); // 8
        foundUser.katedrosVedejas.mV2.mV2_D03 = new Array(); // 9
        foundUser.katedrosVedejas.mV2.mV2_M03 = new Array(); // 10
        foundUser.katedrosVedejas.mV2.mV2_S01 = new Array(); // 11
        foundUser.katedrosVedejas.mV2.mV2_S = new Array(); // Savianalizė
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T01 = new Array(); // 12
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T02 = new Array(); // 13
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T03 = new Array(); // 14
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T04 = new Array(); // 15
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T05 = new Array(); // 16.1
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_162 = new Array(); // 16.2
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T16 = new Array(); // 16.3
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T06 = new Array(); // 17
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T07 = new Array(); // 18
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T08 = new Array(); // 19
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T09 = new Array(); // 20
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T10 = new Array(); // 21
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T11 = new Array(); // 22
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T12 = new Array(); // 23
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T14 = new Array(); // 24
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T13 = new Array(); // 25
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_S = new Array(); // Savianalizė

        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.mokymosi = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.tyrimu = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.bendrosios = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.dalykines = new Array();

        foundUser.katedrosVedejas.kTOV4.kTOV4_27 = new Array(); // 27
        foundUser.katedrosVedejas.kTOV4.kTOV4_28 = new Array(); // 28
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV03 = new Array(); // 29
        foundUser.katedrosVedejas.kTOV4.kTOV4_30 = new Array(); // 30
        foundUser.katedrosVedejas.kTOV4.kTOV4_O01.kTOV4_O01_1 = new Array(); // 31.1
        foundUser.katedrosVedejas.kTOV4.kTOV4_O01.kTOV4_O01_2 = new Array(); // 31.2
        foundUser.katedrosVedejas.kTOV4.kTOV4_S = new Array(); // Savianalizė
        foundUser.katedrosVedejas.kV5.kV5_32 = new Array(); // 32
        foundUser.katedrosVedejas.kV5.kV5_33 = new Array(); // 33
        foundUser.katedrosVedejas.kV5.kV5_34 = new Array(); // 34
        foundUser.katedrosVedejas.kV5.kV5_35 = new Array(); // 35
        foundUser.katedrosVedejas.kV5.kV5_KT02 = new Array(); // 36
        foundUser.katedrosVedejas.kV5.kV5_KT01 = new Array(); // 37
        foundUser.katedrosVedejas.kV5.kV5_38 = new Array(); // 38
        foundUser.katedrosVedejas.kV5.kV5_39 = new Array(); // 39
        foundUser.katedrosVedejas.kV5.kV5_40.socAtskMaz = new Array(); // 40.1
        foundUser.katedrosVedejas.kV5.kV5_40.aplinkosaugInic = new Array(); // 40.2
        foundUser.katedrosVedejas.kV5.kV5_40.lietValstybPuosel = new Array(); // 40.3
        foundUser.katedrosVedejas.kV5.kV5_40.lietEtnokPuos = new Array(); // 40.4
        foundUser.katedrosVedejas.kV5.kV5_40.savanorystIniciatyv = new Array(); // 40.5
        foundUser.katedrosVedejas.kV5.kV5_41 = new Array(); // 41
        foundUser.katedrosVedejas.kV5.veiklSavinalize.veiklSavinalize_array = new Array(); // Savianalizė

        // 1 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table1_name); i++) {
          if (eval(mV2_D04studKryptiscommand + i) != "" || eval(mV2_D04studProgrcommand + i) != "" || eval(mV2_D04progrKodascommand + i) != "" ||
            eval(mV2_D04isakNrDatacommand + i) != "" || eval(mV2_D04studKryptAkreditcommand + i) != "" || eval(mV2_D04akreditLaikotcommand + i) != "" ||
            eval(mV2_D04eCTS1command + i) != "") {
            foundUser.katedrosVedejas.kKPP1_1.push({
              nr: eval(mV2_D04nrcommand + i),
              studKryptis: eval(mV2_D04studKryptiscommand + i),
              studProgr: eval(mV2_D04studProgrcommand + i),
              progrKodas: eval(mV2_D04progrKodascommand + i),
              isakNrData: eval(mV2_D04isakNrDatacommand + i),
              studKryptAkredit: eval(mV2_D04studKryptAkreditcommand + i),
              akreditLaikot: eval(mV2_D04akreditLaikotcommand + i),
              eCTS: eval(mV2_D04eCTS1command + i)
            })
          }
        } // 2 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table2_name); i++) {
          if (eval(lent2_pavVardcommand + i) != "" || eval(lent2_pareigoscommand + i) != "" || eval(lent2_darbovTipascommand + i) != "" ||
            eval(lent2_pedagogStazascommand + i) != "" || eval(lent2_praktinStazascommand + i) != "") {
            foundUser.katedrosVedejas.kDS1.push({
              nr: eval(lent2_nrcommand + i),
              vardPavard: eval(lent2_pavVardcommand + i),
              pareigos: eval(lent2_pareigoscommand + i),
              darbovTipas: eval(lent2_darbovTipascommand + i),
              pedagogStazas: eval(lent2_pedagogStazascommand + i),
              praktinStazas: eval(lent2_praktinStazascommand + i)
            })
          }
        } // 3 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table3_name); i++) {
          if (eval(lent3_studKryptiscommand + i) != "" || eval(lent3_studProgrcommand + i) != "" ||
            eval(lent3_destytojascommand + i) != "" || eval(lent3_imonIstaigcommand + i) != "") {
            foundUser.katedrosVedejas.kKPP1_3.push({
              nr: eval(lent3_nrcommand + i),
              studKryptis: eval(lent3_studKryptiscommand + i),
              studProgr: eval(lent3_studProgrcommand + i),
              destytojas: eval(lent3_destytojascommand + i),
              imonIstaig: eval(lent3_imonIstaigcommand + i)
            })
          }
        } // 4 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table4_name); i++) {
          if (eval(lent4_bibliografAprcommand + i) != "" || eval(lent4_tipascommand + i) != "" ||
            eval(lent4_mokslSritcommand + i) != "" || eval(lent4_mokslKryptcommand + i) != "") {
            foundUser.katedrosVedejas.mV2.mV2_M02.push({
              nr: eval(lent4_nrcommand + i),
              bibliografApr: eval(lent4_bibliografAprcommand + i),
              tipas: eval(lent4_tipascommand + i),
              mokslSrit: eval(lent4_mokslSritcommand + i),
              mokslKrypt: eval(lent4_mokslKryptcommand + i)
            })
          }
        } // 5 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table5_name); i++) {
          if (eval(mV2_M04destytojascommand + i) != "" || eval(mV2_M04studProgrcommand + i) != "" ||
            eval(mV2_M04dalykPavadcommand + i) != "" || eval(mV2_M04apimtisKreditcommand + i) != "" || eval(mV2_M04busenacommand + i) != "") {
            foundUser.katedrosVedejas.mV2.mV2_M04.push({
              nr: eval(mV2_M04nrcommand + i),
              destytojas: eval(mV2_M04destytojascommand + i),
              studProgr: eval(mV2_M04studProgrcommand + i),
              dalykPavad: eval(mV2_M04dalykPavadcommand + i),
              apimtisKredit: eval(mV2_M04apimtisKreditcommand + i),
              busena: eval(mV2_M04busenacommand + i)
            })
          }
        } // 6 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table6_name); i++) {
          if (eval(mV2_D06studProgrcommand + i) != "" || eval(mV2_D06progrKodascommand + i) != "" ||
            eval(mV2_D06atlPatobulincommand + i) != "" || eval(mV2_D06tobulinPriezastcommand + i) != "" ||
            eval(mV2_D06tobulinIrodcommand + i) != "") {
            foundUser.katedrosVedejas.mV2.mV2_D06.push({
              nr: eval(mV2_D06nrcommand + i),
              studProgr: eval(mV2_D06studProgrcommand + i),
              progrKodas: eval(mV2_D06progrKodascommand + i),
              atlPatobulin: eval(mV2_D06atlPatobulincommand + i),
              tobulinPriezast: eval(mV2_D06tobulinPriezastcommand + i),
              tobulinIrod: eval(mV2_D06tobulinIrodcommand + i)
            })
          }
        } // 7 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table7_name); i++) {
          if (eval(mV2_D01destytojascommand + i) != "" || eval(mV2_D01komitetascommand + i) != "" ||
            eval(mV2_D01veiklacommand + i) != "" || eval(mV2_D01rezultataicommand + i) != "") {
            foundUser.katedrosVedejas.mV2.mV2_D01.push({
              nr: eval(mV2_D01nrcommand + i),
              destytojas: eval(mV2_D01destytojascommand + i),
              komitetas: eval(mV2_D01komitetascommand + i),
              veikla: eval(mV2_D01veiklacommand + i),
              rezultatai: eval(mV2_D01rezultataicommand + i)
            })
          }
        } // 8 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table8_name); i++) {
          if (eval(mV2_D02destytojascommand + i) != "" || eval(mV2_D02studKryptcommand + i) != "" ||
            eval(mV2_D02veiklacommand + i) != "" || eval(mV2_D02rezultataicommand + i) != "") {
            foundUser.katedrosVedejas.mV2.mV2_D02.push({
              nr: eval(mV2_D02nrcommand + i),
              destytojas: eval(mV2_D02destytojascommand + i),
              studKryptis: eval(mV2_D02studKryptcommand + i),
              veikla: eval(mV2_D02veiklacommand + i),
              rezultatai: eval(mV2_D02rezultataicommand + i)
            })
          }
        } // 9 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table9_name); i++) {
          if (eval(mV2_D03destytojascommand + i) != "" || eval(mV2_D03studKryptiscommand + i) != "" ||
            eval(mV2_D03studProgrcommand + i) != "" || eval(mV2_D03veiklacommand + i) != "" || eval(mV2_D03rezultataicommand + i) != "") {
            foundUser.katedrosVedejas.mV2.mV2_D03.push({
              nr: eval(mV2_D03nrcommand + i),
              destytojas: eval(mV2_D03destytojascommand + i),
              studKryptis: eval(mV2_D03studKryptiscommand + i),
              studProgr: eval(mV2_D03studProgrcommand + i),
              veikla: eval(mV2_D03veiklacommand + i),
              rezultatai: eval(mV2_D03rezultataicommand + i)
            })
          }
        } // 10 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table10_name); i++) {
          if (eval(mV2_M03destytojascommand + i) != "" || eval(mV2_M03studProgrcommand + i) != "" ||
            eval(mV2_M03dalykPavadcommand + i) != "" || eval(mV2_M03apimtisKreditcommand + i) != "") {
            foundUser.katedrosVedejas.mV2.mV2_M03.push({
              nr: eval(mV2_M03nrcommand + i),
              destytojas: eval(mV2_M03destytojascommand + i),
              studProgr: eval(mV2_M03studProgrcommand + i),
              dalykPavad: eval(mV2_M03dalykPavadcommand + i),
              apimtisKredit: eval(mV2_M03apimtisKreditcommand + i)
            })
          }
        } // 11 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table11_name); i++) {
          if (eval(mV2_S01destytojascommand + i) != "" || eval(mV2_S01veiklacommand + i) != "" ||
            eval(mV2_S01dataVietacommand + i) != "") {
            foundUser.katedrosVedejas.mV2.mV2_S01.push({
              nr: eval(mV2_S01nrcommand + i),
              destytojas: eval(mV2_S01destytojascommand + i),
              veikla: eval(mV2_S01veiklacommand + i),
              dataVieta: eval(mV2_S01dataVietacommand + i)
            })
          }
        }
        for (let i = 1; i <= parseInt(req.body.tablemV2_S_name); i++) {
          if (eval(mV2_Sstiprybescommand + i) != "" || eval(mV2_Stobulintinacommand + i) != "") {
            foundUser.katedrosVedejas.mV2.mV2_S.push({
              nr: eval(mV2_Snrcommand + i),
              stiprybes: eval(mV2_Sstiprybescommand + i),
              tobulintina: eval(mV2_Stobulintinacommand + i)
            })
          }
        } // 12 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table12_name); i++) {
          if (eval(tMTEP3_T01tyrTematcommand + i) != "" || eval(tMTEP3_T01destytojascommand + i) != "" ||
            eval(tMTEP3_T01tyrGrupcommand + i) != "" || eval(tMTEP3_T01mokslSritcommand + i) != "" ||
            eval(tMTEP3_T01mokslKryptcommand + i) != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_T01.push({
              nr: eval(tMTEP3_T01nrcommand + i),
              tyrTemat: eval(tMTEP3_T01tyrTematcommand + i),
              destytojas: eval(tMTEP3_T01destytojascommand + i),
              tyrGrup: eval(tMTEP3_T01tyrGrupcommand + i),
              mokslSrit: eval(tMTEP3_T01mokslSritcommand + i),
              mokslKrypt: eval(tMTEP3_T01mokslKryptcommand + i)
            })
          }
        } // 13 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table13_name); i++) {
          if (eval(tMTEP3_T02bibliografAprcommand + i) != "" || eval(tMTEP3_T02tipascommand + i) != "" ||
            eval(tMTEP3_T02mokslSritcommand + i) != "" || eval(tMTEP3_T02mokslKryptcommand + i) != "" ||
            eval(tMTEP3_T02duomBazecommand + i) != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_T02.push({
              nr: eval(tMTEP3_T02nrcommand + i),
              bibliografApr: eval(tMTEP3_T02bibliografAprcommand + i),
              tipas: eval(tMTEP3_T02tipascommand + i),
              mokslSrit: eval(tMTEP3_T02mokslSritcommand + i),
              mokslKrypt: eval(tMTEP3_T02mokslKryptcommand + i),
              duomBaze: eval(tMTEP3_T02duomBazecommand + i)
            })
          }
        } // 14 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table14_name); i++) {
          if (eval(tMTEP3_T03pilnasBiblAprcommand + i) != "" || eval(tMTEP3_T03rengTipascommand + i) != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_T03.push({
              nr: eval(tMTEP3_T03nrcommand + i),
              pilnasBiblApr: eval(tMTEP3_T03pilnasBiblAprcommand + i),
              rengTipas: eval(tMTEP3_T03rengTipascommand + i)
            })
          }
        } // 15 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table15_name); i++) {
          if (eval(tMTEP3_T04konsultantascommand + i) != "" || eval(tMTEP3_T04uzsakovascommand + i) != "" ||
            eval(tMTEP3_T04temacommand + i) != "" || eval(tMTEP3_T04datacommand + i) != "" ||
            eval(tMTEP3_T04datacommand + i) != "" || eval(tMTEP3_T04atlygArNecommand + i) != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_T04.push({
              nr: eval(tMTEP3_T04nrcommand + i),
              konsultantas: eval(tMTEP3_T04konsultantascommand + i),
              uzsakovas: eval(tMTEP3_T04uzsakovascommand + i),
              tema: eval(tMTEP3_T04temacommand + i),
              data: eval(tMTEP3_T04datacommand + i),
              atlygArNe: eval(tMTEP3_T04atlygArNecommand + i)
            })
          }
        } // 16 lentelė 1 submit-dep
        for (let i = 1; i <= parseInt(req.body.table161_name); i++) {
          if (eval(tMTEP3_T05destytojascommand + i) != "" || eval(tMTEP3_T05veiklPavadcommand + i) != "" ||
            eval(tMTEP3_T05veiklRezultcommand + i) != "" || eval(tMTEP3_T05atlygArNecommand + i) != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_T05.push({
              nr: eval(tMTEP3_T05nrcommand + i),
              destytojas: eval(tMTEP3_T05destytojascommand + i),
              veiklPavad: eval(tMTEP3_T05veiklPavadcommand + i),
              veiklRezult: eval(tMTEP3_T05veiklRezultcommand + i),
              atlygArNe: eval(tMTEP3_T05atlygArNecommand + i)
            })
          }
        } // 16 lentelė 2 submit-dep
        for (let i = 1; i <= parseInt(req.body.table162_name); i++) {
          if (eval(lent162_destytojascommand + i) != "" || eval(lent162_pavadinimascommand + i) != "" ||
            eval(lent162_pastaboscommand + i) != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_162.push({
              nr: eval(lent162_nrnrcommand + i),
              destytojas: eval(lent162_destytojascommand + i),
              pavadinimas: eval(lent162_pavadinimascommand + i),
              pastabos: eval(lent162_pastaboscommand + i)
            })
          }
        } // 16 lentelė 3 submit-dep
        for (let i = 1; i <= parseInt(req.body.table163_name); i++) {
          if (eval(tMTEP3_T16autoriuscommand + i) != "" || eval(tMTEP3_T16pavadinimascommand + i) != "" ||
            eval(tMTEP3_T16uzsakovascommand + i) != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_T16.push({
              nr: eval(tMTEP3_T16nrcommand + i),
              rengejai: eval(tMTEP3_T16autoriuscommand + i),
              pavadinimas: eval(tMTEP3_T16pavadinimascommand + i),
              uzsakovas: eval(tMTEP3_T16uzsakovascommand + i)
            })
          }
        } // 17 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table17_name); i++) {
          if (eval(tMTEP3_T06autoriuscommand + i) != "" || eval(tMTEP3_T06menoSritcommand + i) != "" ||
            eval(tMTEP3_T06pobudiscommand + i) != "" || eval(tMTEP3_T06realizVietacommand + i) != "" ||
            eval(tMTEP3_T06datacommand + i) != "" || eval(tMTEP3_T06atlygArNecommand + i) != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_T06.push({
              nr: eval(tMTEP3_T06nrcommand + i),
              autorius: eval(tMTEP3_T06autoriuscommand + i),
              menoSrit: eval(tMTEP3_T06menoSritcommand + i),
              pobudis: eval(tMTEP3_T06pobudiscommand + i),
              realizVieta: eval(tMTEP3_T06realizVietacommand + i),
              data: eval(tMTEP3_T06datacommand + i),
              atlygArNe: eval(tMTEP3_T06atlygArNecommand + i)
            })
          }
        } // 18 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table18_name); i++) {
          if (eval(tMTEP3_T07atlikejascommand + i) != "" || eval(tMTEP3_T07menoSritcommand + i) != "" ||
            eval(tMTEP3_T07pavadinimascommand + i) != "" || eval(tMTEP3_T07atlikVietacommand + i) != "" ||
            eval(tMTEP3_T07datacommand + i) != "" || eval(tMTEP3_T07atlygArNecommand + i) != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_T07.push({
              nr: eval(tMTEP3_T07nrcommand + i),
              atlikejas: eval(tMTEP3_T07atlikejascommand + i),
              menoSrit: eval(tMTEP3_T07menoSritcommand + i),
              pavadinimas: eval(tMTEP3_T07pavadinimascommand + i),
              atlikVieta: eval(tMTEP3_T07atlikVietacommand + i),
              data: eval(tMTEP3_T07datacommand + i),
              atlygArNe: eval(tMTEP3_T07atlygArNecommand + i)
            })
          }
        } // 19 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table19_name); i++) {
          if (eval(tMTEP3_T08atlikejascommand + i) != "" || eval(tMTEP3_T08menoSritcommand + i) != "" ||
            eval(tMTEP3_T08pavadinimascommand + i) != "" || eval(tMTEP3_T08atlikVietacommand + i) != "" ||
            eval(tMTEP3_T08datacommand + i) != "" || eval(tMTEP3_T08atlygArNecommand + i) != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_T08.push({
              nr: eval(tMTEP3_T08Snrcommand + i),
              atlikejas: eval(tMTEP3_T08atlikejascommand + i),
              menoSrit: eval(tMTEP3_T08menoSritcommand + i),
              pavadinimas: eval(tMTEP3_T08pavadinimascommand + i),
              atlikVieta: eval(tMTEP3_T08atlikVietacommand + i),
              data: eval(tMTEP3_T08datacommand + i),
              atlygArNe: eval(tMTEP3_T08atlygArNecommand + i)
            })
          }
        } // 20 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table20_name); i++) {
          if (eval(tMTEP3_T09atlikejascommand + i) != "" || eval(tMTEP3_T09menoSritcommand + i) != "" ||
            eval(tMTEP3_T09pavadinimascommand + i) != "" || eval(tMTEP3_T09atlikVietacommand + i) != "" ||
            eval(tMTEP3_T09datacommand + i) != "" || eval(tMTEP3_T09atlygArNecommand + i) != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_T09.push({
              nr: eval(tMTEP3_T09nrcommand + i),
              atlikejas: eval(tMTEP3_T09atlikejascommand + i),
              menoSrit: eval(tMTEP3_T09menoSritcommand + i),
              pavadinimas: eval(tMTEP3_T09pavadinimascommand + i),
              atlikVieta: eval(tMTEP3_T09atlikVietacommand + i),
              data: eval(tMTEP3_T09datacommand + i),
              atlygArNe: eval(tMTEP3_T09atlygArNecommand + i)
            })
          }
        } // 21 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table21_name); i++) {
          if (eval(tMTEP3_T10destytojascommand + i) != "" || eval(tMTEP3_T10veiklPobudcommand + i) != "" ||
            eval(tMTEP3_T10veiklTikslcommand + i) != "" || eval(tMTEP3_T10dataVietacommand + i) != "" ||
            eval(tMTEP3_T10dalyvSkcommand + i) != "" || eval(tMTEP3_T10ktKomentaraicommand + i) != "" ||
            eval(tMTEP3_T10atlygArNecommand + i) != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_T10.push({
              nr: eval(tMTEP3_T10nrcommand + i),
              destytojas: eval(tMTEP3_T10destytojascommand + i),
              veiklPobud: eval(tMTEP3_T10veiklPobudcommand + i),
              veiklTiksl: eval(tMTEP3_T10veiklTikslcommand + i),
              dataVieta: eval(tMTEP3_T10dataVietacommand + i),
              dalyvSk: eval(tMTEP3_T10dalyvSkcommand + i),
              ktKomentarai: eval(tMTEP3_T10ktKomentaraicommand + i),
              atlygArNe: eval(tMTEP3_T10atlygArNecommand + i)
            })
          }
        } // 22 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table22_name); i++) {
          if (eval(tMTEP3_T11destytojascommand + i) != "" || eval(tMTEP3_T11veiklPobudcommand + i) != "" ||
            eval(tMTEP3_T11veiklTikslcommand + i) != "" || eval(tMTEP3_T11dataVietacommand + i) != "" ||
            eval(tMTEP3_T11dalyvSkcommand + i) != "" || eval(tMTEP3_T11ktKomentaraicommand + i) != "" ||
            eval(tMTEP3_T11atlygArNecommand + i) != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_T11.push({
              nr: eval(tMTEP3_T11nrcommand + i),
              destytojas: eval(tMTEP3_T11destytojascommand + i),
              veiklPobud: eval(tMTEP3_T11veiklPobudcommand + i),
              veiklTiksl: eval(tMTEP3_T11veiklTikslcommand + i),
              dataVieta: eval(tMTEP3_T11dataVietacommand + i),
              dalyvSk: eval(tMTEP3_T11dalyvSkcommand + i),
              ktKomentarai: eval(tMTEP3_T11ktKomentaraicommand + i),
              atlygArNe: eval(tMTEP3_T11atlygArNecommand + i)
            })
          }
        } // 23 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table23_name); i++) {
          if (eval(tMTEP3_T12destytojascommand + i) != "" || eval(tMTEP3_T12veiklPobudcommand + i) != "" ||
            eval(tMTEP3_T12dataVietacommand + i) != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_T12.push({
              nr: eval(tMTEP3_T12nrcommand + i),
              destytojas: eval(tMTEP3_T12destytojascommand + i),
              veiklPobud: eval(tMTEP3_T12veiklPobudcommand + i),
              dataVieta: eval(tMTEP3_T12dataVietacommand + i)
            })
          }
        } // 24 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table24_name); i++) {
          if (eval(tMTEP3_T14destytojascommand + i) != "" || eval(tMTEP3_T14renginyscommand + i) != "" ||
            eval(tMTEP3_T14veiklPobudcommand + i) != "" || eval(tMTEP3_T14dataVietacommand + i) != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_T14.push({
              nr: eval(tMTEP3_T14nrcommand + i),
              destytojas: eval(tMTEP3_T14destytojascommand + i),
              renginys: eval(tMTEP3_T14renginyscommand + i),
              veiklPobud: eval(tMTEP3_T14veiklPobudcommand + i),
              dataVieta: eval(tMTEP3_T14dataVietacommand + i)
            })
          }
        } // 25 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table25_name); i++) {
          if (eval(tMTEP3_T13destytojascommand + i) != "" || eval(tMTEP3_T13studDuomcommand + i) != "" ||
            eval(tMTEP3_T13renginioPavadcommand + i) != "" || eval(tMTEP3_T13rezultatascommand + i) != "" ||
            eval(tMTEP3_T13datacommand + i) != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_T13.push({
              nr: eval(tMTEP3_T13nrcommand + i),
              destytojas: eval(tMTEP3_T13destytojascommand + i),
              studDuom: eval(tMTEP3_T13studDuomcommand + i),
              renginioPavad: eval(tMTEP3_T13renginioPavadcommand + i),
              rezultatas: eval(tMTEP3_T13rezultatascommand + i),
              data: eval(tMTEP3_T13datacommand + i)
            })
          }
        } // savianalizė submit-dep
        for (let i = 1; i <= parseInt(req.body.tMTEP3_S_name); i++) {
          if (eval(tMTEP3_Sstiprybescommand + i) != "" || eval(tMTEP3_Stobulintinacommand + i) != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_S.push({
              nr: eval(tMTEP3_Snrcommand + i),
              stiprybes: eval(tMTEP3_Sstiprybescommand + i),
              tobulintina: eval(tMTEP3_Stobulintinacommand + i)
            })
          }
        } // 26 lentelė submit-dep priedas
        // mokymosi
        for (let i = 1; i <= parseInt(req.body.table261_name); i++) {
          if (eval(kTOV4_KV01mokymosiKomppavadcommand + i) != "" || eval(kTOV4_KV01mokymosiKomppazymNrcommand + i) != "" ||
            eval(kTOV4_KV01mokymosiKomptrukmeValLTcommand + i) != "" || eval(kTOV4_KV01mokymosiKomptrukmeValNeLTcommand + i) != "" ||
            eval(kTOV4_KV01mokymosiKompdalyviscommand + i) != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.mokymosi.push({
              pavadinimas: eval(kTOV4_KV01mokymosiKomppavadcommand + i),
              pazymNr: eval(kTOV4_KV01mokymosiKomppazymNrcommand + i),
              trukmeValLT: eval(kTOV4_KV01mokymosiKomptrukmeValLTcommand + i),
              trukmeValNeLT: eval(kTOV4_KV01mokymosiKomptrukmeValNeLTcommand + i),
              destytojas: eval(kTOV4_KV01mokymosiKompdalyviscommand + i)
            })
          }
        }
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.mokymosiIsVisoValLT = req.body.kTOV4_trukmeMokymValLT1,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.mokymosiIsVisoValNeLT = req.body.kTOV4_trukmeMokymValNeLT1
        // tyrimu
        for (let i = 1; i <= parseInt(req.body.table262_name); i++) {
          if (eval(kTOV4_KV01tyrimuKomppavadcommand + i) != "" || eval(kTOV4_KV01tyrimuKomppazymNrcommand + i) != "" ||
            eval(kTOV4_KV01tyrimuKomptrukmeValLTcommand + i) != "" || eval(kTOV4_KV01tyrimuKomptrukmeValNeLTcommand + i) != "" ||
            eval(kTOV4_KV01tyrimuKompdalyviscommand + i) != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.tyrimu.push({
              pavadinimas: eval(kTOV4_KV01tyrimuKomppavadcommand + i),
              pazymNr: eval(kTOV4_KV01tyrimuKomppazymNrcommand + i),
              trukmeValLT: eval(kTOV4_KV01tyrimuKomptrukmeValLTcommand + i),
              trukmeValNeLT: eval(kTOV4_KV01tyrimuKomptrukmeValNeLTcommand + i),
              destytojas: eval(kTOV4_KV01tyrimuKompdalyviscommand + i)
            })
          }
        }
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.tyrimuIsVisoValLT = req.body.kTOV4_trukmeTyrimValLT2,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.tyrimuIsVisoValNeLT = req.body.kTOV4_trukmeTyrimValNeLT2
        //bendrosios
        for (let i = 1; i <= parseInt(req.body.table263_name); i++) {
          if (eval(kTOV4_KV01bendrKomppavadcommand + i) != "" || eval(kTOV4_KV01bendrKomppazymNrcommand + i) != "" ||
            eval(kTOV4_KV01bendrKomptrukmeValLTcommand + i) != "" || eval(kTOV4_KV01bendrKomptrukmeValNeLTcommand + i) != "" ||
            eval(kTOV4_KV01bendrKompdalyviscommand + i) != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.bendrosios.push({
              pavadinimas: eval(kTOV4_KV01bendrKomppavadcommand + i),
              pazymNr: eval(kTOV4_KV01bendrKomppazymNrcommand + i),
              trukmeValLT: eval(kTOV4_KV01bendrKomptrukmeValLTcommand + i),
              trukmeValNeLT: eval(kTOV4_KV01bendrKomptrukmeValNeLTcommand + i),
              destytojas: eval(kTOV4_KV01bendrKompdalyviscommand + i)
            })
          }
        }
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.bendrosiosIsVisoValLT = req.body.kTOV4_trukmeBendrValLT3,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.bendrosiosIsVisoValNeLT = req.body.kTOV4_trukmeBendrValNeLT3
        //dalykines
        for (let i = 1; i <= parseInt(req.body.table264_name); i++) {
          if (eval(kTOV4_KV01dalykKomppavadcommand + i) != "" || eval(kTOV4_KV01dalykKomppazymNrcommand + i) != "" ||
            eval(kTOV4_KV01dalykKompTrukmeValLTcommand + i) != "" || eval(kTOV4_KV01dalykKompTrukmeValNeLTcommand + i) != "" ||
            eval(kTOV4_KV01dalykKompdalyviscommand + i) != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.dalykines.push({
              pavadinimas: eval(kTOV4_KV01dalykKomppavadcommand + i),
              pazymNr: eval(kTOV4_KV01dalykKomppazymNrcommand + i),
              trukmeValLT: eval(kTOV4_KV01dalykKompTrukmeValLTcommand + i),
              trukmeValNeLT: eval(kTOV4_KV01dalykKompTrukmeValNeLTcommand + i),
              destytojas: eval(kTOV4_KV01dalykKompdalyviscommand + i)
            })
          }
        }
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.dalykinesIsVisoValLT = req.body.kTOV4_trukmeDalykValLT4,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.dalykinesIsVisoValNeLT = req.body.kTOV4_trukmeDalykValNeLT4
        // bendros val.
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.isVisoValLT = req.body.kTOV4_trukmeValLTbendr,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.isVisoValNeLT = req.body.kTOV4_trukmeValNeLTbendr,
          //26 lentelė
          //mokymosi
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.mokymosi.destytojuSk = req.body.mokymosiLTdestytojuSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.mokymosi.trukmeValLT = req.body.mokymosiLTtrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.mokymosi.trukmeValNeLT = req.body.mokymosiNeLttrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.mokymosi.isVisoVal = req.body.mokymosiIsVisoVal,
          //tyrimu
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.tyrimu.destytojuSk = req.body.tyrimuLTdestytojuSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.tyrimu.trukmeValLT = req.body.tyrimuLTtrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.tyrimu.trukmeValNeLT = req.body.tyrimuNeLttrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.tyrimu.isVisoVal = req.body.tyrimuIsVisoVal,
          //bendrosios
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.bendrosios.destytojuSk = req.body.bendrosiosLTdestytojuSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.bendrosios.trukmeValLT = req.body.bendrosiosLTtrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.bendrosios.trukmeValNeLT = req.body.bendrosiosNeLttrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.bendrosios.isVisoVal = req.body.bendrosiosIsVisoVal,
          //dalykines
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.dalykines.destytojuSk = req.body.dalykinesLTdestytojuSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.dalykines.trukmeValLT = req.body.dalykinesLTtrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.dalykines.trukmeValNeLT = req.body.dalykinesNeLttrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.dalykines.isVisoVal = req.body.dalykinesIsVisoVal

        // 27 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table27_name); i++) {
          if (eval(lent27_renginysTemacommand + i) != "" || eval(lent27_kompGrupecommand + i) != "" ||
            eval(lent27_skirtacommand + i) != "" || eval(lent27_lektoriuscommand + i) != "" ||
            eval(lent27_lektTipascommand + i) != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_27.push({
              nr: eval(lent27_nrcommand + i),
              renginysTema: eval(lent27_renginysTemacommand + i),
              kompGrupe: eval(lent27_kompGrupecommand + i),
              skirta: eval(lent27_skirtacommand + i),
              lektorius: eval(lent27_lektoriuscommand + i),
              lektTipas: eval(lent27_lektTipascommand + i)
            })
          }
        } // 28 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table28_name); i++) {
          if (eval(lent28_destytojascommand + i) != "" || eval(lent28_imonIstaigcommand + i) != "" ||
            eval(lent28_kompGrupecommand + i) != "" || eval(lent28_trukmeValcommand + i) != "" ||
            eval(lent28_datacommand + i) != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_28.push({
              nr: eval(lent28_nrcommand + i),
              destytojas: eval(lent28_destytojascommand + i),
              imonIstaig: eval(lent28_imonIstaigcommand + i),
              kompGrupe: eval(lent28_kompGrupecommand + i),
              trukmeVal: eval(lent28_trukmeValcommand + i),
              data: eval(lent28_datacommand + i)
            })
          }
        } // 29 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table29_name); i++) {
          if (eval(kTOV4_KV03destytojascommand + i) != "" || eval(kTOV4_KV03studKryptiscommand + i) != "" ||
            eval(kTOV4_KV03saliscommand + i) != "" || eval(kTOV4_KV03institucijacommand + i) != "" ||
            eval(kTOV4_KV03dalykascommand + i) != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_KV03.push({
              nr: eval(kTOV4_KV03nrcommand + i),
              destytojas: eval(kTOV4_KV03destytojascommand + i),
              studKryptis: eval(kTOV4_KV03studKryptiscommand + i),
              salis: eval(kTOV4_KV03saliscommand + i),
              institucija: eval(kTOV4_KV03institucijacommand + i),
              dalykas: eval(kTOV4_KV03dalykascommand + i)
            })
          }
        } // 30 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table30_name); i++) {
          if (eval(lent30_destytojascommand + i) != "" || eval(lent30_studKryptiscommand + i) != "" ||
            eval(lent30_saliscommand + i) != "" || eval(lent30_institucijacommand + i) != "" ||
            eval(lent30_dalykascommand + i) != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_30.push({
              nr: eval(lent30_nrcommand + i),
              destytojas: eval(lent30_destytojascommand + i),
              studKryptis: eval(lent30_studKryptiscommand + i),
              salis: eval(lent30_saliscommand + i),
              institucija: eval(lent30_institucijacommand + i),
              dalykas: eval(lent30_dalykascommand + i)
            })
          }
        } // 31 lentelė submit-dep 1
        for (let i = 1; i <= parseInt(req.body.table311_name); i++) {
          if (eval(kTOV4_O01_1destytojascommand + i) != "" || eval(kTOV4_O01_1veiklPobudcommand + i) != "" ||
            eval(kTOV4_O01_1isakNrDatacommand + i) != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_O01.kTOV4_O01_1.push({
              nr: eval(kTOV4_O01_1nrcommand + i),
              destytojas: eval(kTOV4_O01_1destytojascommand + i),
              veiklPobud: eval(kTOV4_O01_1veiklPobudcommand + i),
              isakNrData: eval(kTOV4_O01_1isakNrDatacommand + i)
            })
          }
        } // 31 lentelė submit-dep 2
        for (let i = 1; i <= parseInt(req.body.table312_name); i++) {
          if (eval(kTOV4_O01_2destytojascommand + i) != "" || eval(kTOV4_O01_2veiklPobudcommand + i) != "" ||
            eval(kTOV4_O01_2dataVietacommand + i) != "" || eval(kTOV4_O01_2ktKomentaraicommand + i) != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_O01.kTOV4_O01_2.push({
              nr: eval(kTOV4_O01_2nrcommand + i),
              destytojas: eval(kTOV4_O01_2destytojascommand + i),
              veiklPobud: eval(kTOV4_O01_2veiklPobudcommand + i),
              dataVieta: eval(kTOV4_O01_2dataVietacommand + i),
              ktKomentarai: eval(kTOV4_O01_2ktKomentaraicommand + i)
            })
          }
        } // savianalizė submit-dep
        for (let i = 1; i <= parseInt(req.body.tablekTOV4_S_name); i++) {
          if (eval(kTOV4_Sstiprybescommand + i) != "" || eval(kTOV4_Stobulintinacommand + i) != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_S.push({
              nr: eval(kTOV4_Snrcommand + i),
              stiprybes: eval(kTOV4_Sstiprybescommand + i),
              tobulintina: eval(kTOV4_Stobulintinacommand + i)
            })
          }
        } // 32 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table32_name); i++) {
          if (eval(lent32_studKryptiscommand + i) != "" || eval(lent32_studProgrcommand + i) != "" ||
            eval(lent32_strategPartnercommand + i) != "") {
            foundUser.katedrosVedejas.kV5.kV5_32.push({
              nr: eval(lent32_nrcommand + i),
              studKryptis: eval(lent32_studKryptiscommand + i),
              studProgr: eval(lent32_studProgrcommand + i),
              strategPartner: eval(lent32_strategPartnercommand + i)
            })
          }
        } // 33 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table33_name); i++) {
          if (eval(lent33_veiklacommand + i) != "" || eval(lent33_socPartneriscommand + i) != "" ||
            eval(lent33_destytojascommand + i) != "") {
            foundUser.katedrosVedejas.kV5.kV5_33.push({
              nr: eval(lent33_nrcommand + i),
              veikla: eval(lent33_veiklacommand + i),
              socPartneris: eval(lent33_socPartneriscommand + i),
              destytojas: eval(lent33_destytojascommand + i)
            })
          }
        } // 34 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table34_name); i++) {
          if (eval(lent34_studKryptiscommand + i) != "" || eval(lent34_studProgrcommand + i) != "" ||
            eval(lent34_studentuSk1_command + i) != "" || eval(lent34_studentuSk2_command + i) != "" ||
            eval(lent34_studentuSk3_command + i) != "" || eval(lent34_studentuSk4_command + i) != "" ||
            eval(lent34_studentuSk5_command + i) != "") {
            foundUser.katedrosVedejas.kV5.kV5_34.push({
              nr: eval(lent34_nrcommand + i),
              studKryptis: eval(lent34_studKryptiscommand + i),
              studProgr: eval(lent34_studProgrcommand + i),
              studentuSk1: eval(lent34_studentuSk1_command + i),
              studentuSk2: eval(lent34_studentuSk2_command + i),
              studentuSk3: eval(lent34_studentuSk3_command + i),
              studentuSk4: eval(lent34_studentuSk4_command + i),
              studentuSk5: eval(lent34_studentuSk5_command + i)
            })
          }
        } // 35 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table35_name); i++) {
          if (eval(lent35_studKryptiscommand + i) != "" || eval(lent35_studProgrcommand + i) != "" ||
            eval(lent35_studentuSkBendr1_command + i) != "" || eval(lent35_studentuSk1_command + i) != "" ||
            eval(lent35_studentuSkBendr2_command + i) != "" || eval(lent35_studentuSk2_command + i) != "" ||
            eval(lent35_studentuSkBendr3_command + i) != "" || eval(lent35_studentuSk3_command + i) != "" ||
            eval(lent35_studentuSkBendr4_command + i) != "" || eval(lent35_studentuSk4_command + i) != "" ||
            eval(lent35_studentuSkBendr5_command + i) != "" || eval(lent35_studentuSk5_command + i) != "") {
            foundUser.katedrosVedejas.kV5.kV5_35.push({
              nr: eval(lent35_nrcommand + i),
              studKryptis: eval(lent35_studKryptiscommand + i),
              studProgr: eval(lent35_studProgrcommand + i),
              studentuSk1: eval(lent35_studentuSkBendr1_command + i),
              pasPartnerSk1: eval(lent35_studentuSk1_command + i),
              studentuSk2: eval(lent35_studentuSkBendr2_command + i),
              pasPartnerSk2: eval(lent35_studentuSk2_command + i),
              studentuSk3: eval(lent35_studentuSkBendr3_command + i),
              pasPartnerSk3: eval(lent35_studentuSk3_command + i),
              studentuSk4: eval(lent35_studentuSkBendr4_command + i),
              pasPartnerSk4: eval(lent35_studentuSk4_command + i),
              studentuSk5: eval(lent35_studentuSkBendr5_command + i),
              pasPartnerSk5: eval(lent35_studentuSk5_command + i)
            })
          }
        } // 36 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table36_name); i++) {
          if (eval(kV5_KT02studKryptiscommand + i) != "" || eval(kV5_KT02studProgrcommand + i) != "" ||
            eval(kV5_KT02diplomantascommand + i) != "" || eval(kV5_KT02darboTemacommand + i) != "") {
            foundUser.katedrosVedejas.kV5.kV5_KT02.push({
              nr: eval(kV5_KT02nrcommand + i),
              studKryptis: eval(kV5_KT02studKryptiscommand + i),
              studProgr: eval(kV5_KT02studProgrcommand + i),
              diplomantas: eval(kV5_KT02diplomantascommand + i),
              darboTema: eval(kV5_KT02darboTemacommand + i)
            })
          }
        } // 37 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table37_name); i++) {
          if (eval(kV5_KT01studKryptiscommand + i) != "" || eval(kV5_KT01studProgrcommand + i) != "" ||
            eval(kV5_KT01diplomantascommand + i) != "" || eval(kV5_KT01darboTemacommand + i) != "" ||
            eval(kV5_KT01uzsakovascommand + i) != "") {
            foundUser.katedrosVedejas.kV5.kV5_KT01.push({
              nr: eval(kV5_KT01nrcommand + i),
              studKryptis: eval(kV5_KT01studKryptiscommand + i),
              studProgr: eval(kV5_KT01studProgrcommand + i),
              diplomantas: eval(kV5_KT01diplomantascommand + i),
              darboTema: eval(kV5_KT01darboTemacommand + i),
              uzsakovas: eval(kV5_KT01uzsakovascommand + i)
            })
          }
        } // 38 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table38_name); i++) {
          if (eval(lent38_pavadinimascommand + i) != "" || eval(lent38_vykdytPartnercommand + i) != "" ||
            eval(lent38_dalyviaicommand + i) != "" || eval(lent38_finansavimcommand + i) != "" ||
            eval(lent38_rezultataicommand + i) != "" || eval(lent38_salisDatacommand + i) != "") {
            foundUser.katedrosVedejas.kV5.kV5_38.push({
              nr: eval(lent38_nrcommand + i),
              pavadinimas: eval(lent38_pavadinimascommand + i),
              vykdytPartner: eval(lent38_vykdytPartnercommand + i),
              dalyviai: eval(lent38_dalyviaicommand + i),
              finansavim: eval(lent38_finansavimcommand + i),
              rezultatai: eval(lent38_rezultataicommand + i),
              salisData: eval(lent38_salisDatacommand + i)
            })
          }
        } // 39 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table39_name); i++) {
          if (eval(lent39_kryptyscommand + i) != "" || eval(lent39_aprasymascommand + i) != "") {
            foundUser.katedrosVedejas.kV5.kV5_39.push({
              nr: eval(lent39_nrcommand + i),
              kryptys: eval(lent39_kryptyscommand + i),
              aprasymas: eval(lent39_aprasymascommand + i)
            })
          }
        } // 40 lentelė submit-dep 1
        for (let i = 1; i <= parseInt(req.body.table401_name); i++) {
          if (eval(lent40_socAprasymascommand + i) != "" || eval(lent40_socDestytojascommand + i) != "") {
            foundUser.katedrosVedejas.kV5.kV5_40.socAtskMaz.push({
              aprasymas: eval(lent40_socAprasymascommand + i),
              destytojas: eval(lent40_socDestytojascommand + i)
            })
          }
        } // 40 lentelė submit-dep 2
        for (let i = 1; i <= parseInt(req.body.table402_name); i++) {
          if (eval(lent40_aplinkAprasymascommand + i) != "" || eval(lent40_aplinkDestytojascommand + i) != "") {
            foundUser.katedrosVedejas.kV5.kV5_40.aplinkosaugInic.push({
              aprasymas: eval(lent40_aplinkAprasymascommand + i),
              destytojas: eval(lent40_aplinkDestytojascommand + i)
            })
          }
        } // 40 lentelė submit-dep 3
        for (let i = 1; i <= parseInt(req.body.table403_name); i++) {
          if (eval(lent40_valstybAprasymascommand + i) != "" || eval(lent40_valstybDestytojascommand + i) != "") {
            foundUser.katedrosVedejas.kV5.kV5_40.lietValstybPuosel.push({
              aprasymas: eval(lent40_valstybAprasymascommand + i),
              destytojas: eval(lent40_valstybDestytojascommand + i)
            })
          }
        } // 40 lentelė submit-dep 4
        for (let i = 1; i <= parseInt(req.body.table404_name); i++) {
          if (eval(lent40_etnoAprasymascommand + i) != "" || eval(lent40_etnoDestytojascommand + i) != "") {
            foundUser.katedrosVedejas.kV5.kV5_40.lietEtnokPuos.push({
              aprasymas: eval(lent40_etnoAprasymascommand + i),
              destytojas: eval(lent40_etnoDestytojascommand + i)
            })
          }
        } // 40 lentelė submit-dep 5
        for (let i = 1; i <= parseInt(req.body.table405_name); i++) {
          if (eval(lent40_savAprasymascommand + i) != "" || eval(lent40_savDestytojascommand + i) != "") {
            foundUser.katedrosVedejas.kV5.kV5_40.savanorystIniciatyv.push({
              aprasymas: eval(lent40_savAprasymascommand + i),
              destytojas: eval(lent40_savDestytojascommand + i)
            })
          }
        } // 41 lentelė submit-dep
        for (let i = 1; i <= parseInt(req.body.table41_name); i++) {
          if (eval(lent41_veiklacommand + i) != "" || eval(lent41_veiklPartnercommand + i) != "" ||
            eval(lent41_organizaccommand + i) != "" || eval(lent41_veiklOrientavimcommand + i) != "" ||
            eval(lent41_dalyviaicommand + i) != "" || eval(lent41_laikascommand + i) != "" ||
            eval(lent41_vietacommand + i) != "") {
            foundUser.katedrosVedejas.kV5.kV5_41.push({
              nr: eval(lent41_nrcommand + i),
              veikla: eval(lent41_veiklacommand + i),
              veiklPartner: eval(lent41_veiklPartnercommand + i),
              organizac: eval(lent41_organizaccommand + i),
              veiklOrientavim: eval(lent41_veiklOrientavimcommand + i),
              dalyviai: eval(lent41_dalyviaicommand + i),
              laikas: eval(lent41_laikascommand + i),
              vieta: eval(lent41_vietacommand + i)
            })
          }
        }
        for (let i = 1; i <= parseInt(req.body.tableVeiklS_name); i++) {
          if (eval(veiklSavinalizestiprybescommand + i) != "" || eval(veiklSavinalizetobulintinacommand + i) != "") {
            foundUser.katedrosVedejas.kV5.veiklSavinalize.veiklSavinalize_array.push({
              stiprybes: eval(veiklSavinalizestiprybescommand + i),
              tobulintina: eval(veiklSavinalizetobulintinacommand + i)
            })
          }
        }
        foundUser.katedrosVedejas.kV5.veiklSavinalize.isvadosApieVeikl = req.body.isvadosApieVeikl,

          foundUser.busenaVedejo = req.body.ataskaitos_busena,
          foundUser.updated_for = req.user.username
        foundUser.save(function(err) {
          if (!err) {
            console.log("Succesfully submitted");
            res.redirect("/user-window-dep");
          }
        });
      } else {
        console.log("User does'f found");
      }
    }
  });
});

app.get("/user-window-dep", function(req, res) {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        //console.log("Error...");
        console.log(err);
      } else {
        if (foundUser.role === "katedros vedėjas") {
          res.render("user-window-dep", {
            user: foundUser
          });
        } else {
          console.log("You do not have permission");
          console.log("user-window-dep nepraleidžia");
          res.redirect("/login");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});


app.get("/logout", function(req, res) {
  req.logout();
  console.log("Logout ivykdytas");
  res.redirect('/');
});

app.get("/user-window", function(req, res) {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        //console.log("Error...");
        console.log(err);
      } else {
        if (foundUser.role === "dėstytojas") {
          res.render("user-window", {
            user: foundUser
          });
        } else {
          console.log("You don't have permission");
          console.log("user-window nepraleidžia");
          res.redirect("/login");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.post("/update-user", function(req, res) {
  if (req.isAuthenticated()) {

    User.findById(req.user.id, function(err, foundUser) {
          if (err) {
            console.log(err);
          } else {
            if (foundUser) {
              if (foundUser.rolesKeitimas === true && foundUser.role != req.body.role) {
                foundUser.role = req.body.role
              }

              if (foundUser.vardas != req.body.vardas) {
                foundUser.vardas = req.body.vardas
              } else if (foundUser.pavarde != req.body.pavarde) {
                foundUser.pavarde = req.body.pavarde
              } else if (foundUser.katedra != req.body.katedra) {
                foundUser.katedra = req.body.katedra
              } else if (foundUser.fakultetas != req.body.fakultetas) {
                foundUser.fakultetas = req.body.fakultetas
              } else if (foundUser.destytojas.issilavinimas != req.body.issilavinimas) {
                foundUser.destytojas.issilavinimas = req.body.issilavinimas
              } else if (foundUser.destytojas.darbovietesTipas != req.body.darbovietesTipas) {
                foundUser.destytojas.darbovietesTipas = req.body.darbovietesTipas
              } else if (foundUser.destytojas.pareigos != req.body.pareigos) {
                foundUser.destytojas.pareigos = req.body.pareigos
              } else if (foundUser.destytojas.pedagogStazas != req.body.pedagogStazas) {
                foundUser.destytojas.pedagogStazas = req.body.pedagogStazas
              } else if (foundUser.destytojas.praktVeiklStazas != req.body.praktVeiklStazas) {
                foundUser.destytojas.praktVeiklStazas = req.body.praktVeiklStazas
              } else {

              }
               foundUser.updated_for = req.user.username

          foundUser.save(function(err) {
            if (!err) {
              console.log("Dėstytojas info succesfully updated ");
              if (foundUser.role === "dėstytojas") {
                res.redirect("/user-window");
              } else if (foundUser.role === "katedros vedėjas") {
                res.redirect("/user-window-dep");
              } else {
                res.redirect("/login");
              }
            } else {
              console.log(err);
            }
          });

        } else {
          console.log("User does'f found");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});

//Katedros vedėjas atnaujina savo info
app.post("/update-user-dep", function(req, res) {
  if (req.isAuthenticated()) {

    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          if (foundUser.rolesKeitimas === true) {
            foundUser.role = req.body.role
          }
          foundUser.updated_for = req.user.username,
            foundUser.vardas = req.body.vardas,
            foundUser.pavarde = req.body.pavarde,
            foundUser.katedra = req.body.katedra,
            foundUser.fakultetas = req.body.fakultetas,
            foundUser.updated_for = req.user.username

          foundUser.save(function(err) {
            if (!err) {
              console.log("Katedros vedėjas info succesfully updated");
              if (foundUser.role === "dėstytojas") {
                //console.log("destytojas");
                res.redirect("/user-window");
              } else if (foundUser.role === "katedros vedėjas") {
                //console.log("vedejas");
                res.redirect("/user-window-dep");
              } else {
                res.redirect("/login");
              }
            } else {
              console.log(err);
            }
          });

        } else {
          console.log("User does'f found");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});
//-----------------Head of the DEPARTMENT------------------------------------
app.get("/dep-lecturers-list", (req, res) => {

  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      let vedejoKatedra = req.user.katedra
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "katedros vedėjas") {
          User.find({
            katedra: vedejoKatedra,

          }, function(err, users) {
            if (err) {
              console.log(err);
            } else {
              res.render("dep-lecturers-list", {
                users: users
              });
            }
          });
        } else {
          console.log("You do not have permission");
          res.redirect("/login");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/dep-edit-user/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "katedros vedėjas") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function(err, user) {
              if (err) {
                console.log(err);
              } else {
                res.render("dep-edit-user", {
                  user: user
                });
              }
            });
          } else {
            res.redirect("/user-window-dep");
          }
        } else {
          res.redirect("/home");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});

//Katedros vedėjas atnaujina dėstytojo būseną
app.post("/update-user-info-dep", (req, res) => {
  User.findById(req.body.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.busena = req.body.busena,
          foundUser.updated_for = req.user.username
        foundUser.save(function(err) {
          if (!err) {
            res.redirect("/dep-lecturers-list");
          }
        });
      } else {
        console.log("Does'f found");
      }
    }
  });
});

app.get("/dep-lecturer-report/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "katedros vedėjas") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function(err, user) {

              let currentUserFaculty = foundUser.fakultetas;

              if (err) {
                console.log(err);
              } else {
                Faculty.findOne({
                  username: currentUserFaculty
                }, function(err, foundFaculty) {
                  if (err) {
                    console.log(err);
                  } else {

                    res.render("dep-lecturer-report", {
                      foundFaculty: foundFaculty,
                      user: user,
                      fakultetasUpper: _.toUpper(user.fakultetas),
                      katedraUpper: _.toUpper(user.katedra),
                      vardasUpper: _.toUpper(foundUser.vardas),
                      pavardeUpper: _.toUpper(foundUser.pavarde)
                    });
                  }
                });

              }
            });
          } else {
            res.redirect("/user-window-dep");
          }
        } else {
          res.redirect("/home");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});
// Katedros vedėjas atnaujina dėstytojo ataskaitą
app.post("/update-report-lecturer-dep", (req, res) => {
  User.findById(req.body.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        // 2 lent
        var nrcommand = "req.body.nr";
        var dalykascommand = "req.body.dalykas";
        var grupecommand = "req.body.grupe";
        var semestrascommand = "req.body.semestras";
        var planuotosValcommand = "req.body.planuotosVal";
        var atliktosValcommand = "req.body.atliktosVal";
        // 3 lent
        var nD2_M02nrcommand = "req.body.nD2_M02nr";
        var bibliografAprcommand = "req.body.bibliografApr";
        var tipascommand = "req.body.tipas";
        var mokslSritcommand = "req.body.mokslSrit";
        var mokslKryptcommand = "req.body.mokslKrypt";
        // 4 lent
        var nD2_M04nrcommand = "req.body.nD2_M04nr";
        var nD2_M04studProgrcommand = "req.body.nD2_M04studProgr";
        var nD2_M04dalykPavadcommand = "req.body.nD2_M04dalykPavad";
        var nD2_M04busenacommand = "req.body.nD2_M04busena";
        var nD2_M04apimtisKreditcommand = "req.body.nD2_M04apimtisKredit";
        // 5 lent
        var nD2_D01nrcommand = "req.body.nD2_D01nr";
        var nD2_D01komitetascommand = "req.body.nD2_D01komitetas";
        var nD2_D01veiklacommand = "req.body.nD2_D01veikla";
        var nD2_D01rezultataicommand = "req.body.nD2_D01rezultatai";
        // 6 lent
        var nD2_D02nrcommand = "req.body.nD2_D02nr";
        var nD2_D02studKryptcommand = "req.body.nD2_D02studKrypt";
        var nD2_D02veiklacommand = "req.body.nD2_D02veikla";
        var nD2_D02rezultataicommand = "req.body.nD2_D02rezultatai";
        // 7 lent
        var nD2_D03nrcommand = "req.body.nD2_D03nr";
        var nD2_D03studProgrcommand = "req.body.nD2_D03studProgr";
        var nD2_D03veiklacommand = "req.body.nD2_D03veikla";
        var nD2_D03rezultataicommand = "req.body.nD2_D03rezultatai";
        var nD2_D03studKryptiscommand = "req.body.nD2_D03studKryptis";
        // 8 lent
        var nD2_M03nrcommand = "req.body.nD2_M03nr";
        var nD2_M03studProgrcommand = "req.body.nD2_M03studProgr";
        var nD2_M03dalykPavadcommand = "req.body.nD2_M03dalykPavad";
        var nD2_M03apimtisKreditcommand = "req.body.nD2_M03apimtisKredit";
        // 9 lent
        var nD2_S01nrcommand = "req.body.nD2_S01nr";
        var nD2_S01veiklacommand = "req.body.nD2_S01veikla";
        var nD2_S01dataVietacommand = "req.body.nD2_S01dataVieta";
        // savianalize
        var nD2_Snrcommand = "req.body.nD2_Snr";
        var nD2_Sstiprybescommand = "req.body.nD2_Sstiprybes";
        var nD2_Stobulintinacommand = "req.body.nD2_Stobulintina";
        // 10 lent
        var tMTEP3_T01nrcommand = "req.body.tMTEP3_T01nr";
        var tyrTematcommand = "req.body.tyrTemat";
        var tyrGrupcommand = "req.body.tyrGrup";
        var tMTEP3_T01mokslSritcommand = "req.body.tMTEP3_T01mokslSrit";
        var tMTEP3_T01mokslKryptcommand = "req.body.tMTEP3_T01mokslKrypt";
        // 11 lent
        var tMTEP3_T02nrcommand = "req.body.tMTEP3_T02nr";
        var tMTEP3_T02bibliografAprcommand = "req.body.tMTEP3_T02bibliografApr";
        var tMTEP3_T02tipascommand = "req.body.tMTEP3_T02tipas";
        var tMTEP3_T02mokslSritcommand = "req.body.tMTEP3_T02mokslSrit";
        var tMTEP3_T02mokslKryptcommand = "req.body.tMTEP3_T02mokslKrypt";
        var tMTEP3_T02duomBazecommand = "req.body.tMTEP3_T02duomBaze";
        // 12 lent
        var tMTEP3_T03nrcommand = "req.body.tMTEP3_T03nr";
        var tMTEP3_T03pilnasBiblAprcommand = "req.body.tMTEP3_T03pilnasBiblApr";
        var tMTEP3_T03rengTipascommand = "req.body.tMTEP3_T03rengTipas";
        // 13 lent
        var tMTEP3_T04nrcommand = "req.body.tMTEP3_T04nr";
        var tMTEP3_T04uzsakovascommand = "req.body.tMTEP3_T04uzsakovas";
        var tMTEP3_T04temacommand = "req.body.tMTEP3_T04tema";
        var tMTEP3_T04datacommand = "req.body.tMTEP3_T04data";
        var tMTEP3_T04atlygArNecommand = "req.body.tMTEP3_T04atlygArNe";
        // 14.1 lent
        var tMTEP3_T05nrcommand = "req.body.tMTEP3_T05nr";
        var tMTEP3_T05veiklPavadcommand = "req.body.tMTEP3_T05veiklPavad";
        var tMTEP3_T05veiklRezultcommand = "req.body.tMTEP3_T05veiklRezult";
        var tMTEP3_T05atlygArNecommand = "req.body.tMTEP3_T05atlygArNe";
        // 14.2 lent
        var tMTEP3_142pavadinimascommand = "req.body.tMTEP3_142pavadinimas";
        var tMTEP3_142pastaboscommand = "req.body.tMTEP3_142pastabos";
        // 14.3 lent
        var tMTEP3_143pavadinimascommand = "req.body.tMTEP3_143pavadinimas";
        var tMTEP3_143uzsakovascommand = "req.body.tMTEP3_143uzsakovas";
        // 15 lent
        var tMTEP3_T06nrcommand = "req.body.tMTEP3_T06nr";
        var tMTEP3_T06autoriuscommand = "req.body.tMTEP3_T06autorius";
        var tMTEP3_T06menoSritcommand = "req.body.tMTEP3_T06menoSrit";
        var tMTEP3_T06pobudiscommand = "req.body.tMTEP3_T06pobudis";
        var tMTEP3_T06realizVietacommand = "req.body.tMTEP3_T06realizVieta";
        var tMTEP3_T06datacommand = "req.body.tMTEP3_T06data";
        var tMTEP3_T06atlygArNecommand = "req.body.tMTEP3_T06atlygArNe";
        // 16 lent
        var tMTEP3_T07nrcommand = "req.body.tMTEP3_T07nr";
        var tMTEP3_T07menoSritcommand = "req.body.tMTEP3_T07menoSrit";
        var tMTEP3_T07pavadinimascommand = "req.body.tMTEP3_T07pavadinimas";
        var tMTEP3_T07atlikVietacommand = "req.body.tMTEP3_T07atlikVieta";
        var tMTEP3_T07datacommand = "req.body.tMTEP3_T07data";
        var tMTEP3_T07atlygArNecommand = "req.body.tMTEP3_T07atlygArNe";
        // 17 lent
        var tMTEP3_T08Snrcommand = "req.body.tMTEP3_T08Snr";
        var tMTEP3_T08menoSritcommand = "req.body.tMTEP3_T08menoSrit";
        var tMTEP3_T08pavadinimascommand = "req.body.tMTEP3_T08pavadinimas";
        var tMTEP3_T08atlikVietacommand = "req.body.tMTEP3_T08atlikVieta";
        var tMTEP3_T08datacommand = "req.body.tMTEP3_T08data";
        var tMTEP3_T08atlygArNecommand = "req.body.tMTEP3_T08atlygArNe";
        // 18 lent
        var tMTEP3_T09nrcommand = "req.body.tMTEP3_T09nr";
        var tMTEP3_T09menoSritcommand = "req.body.tMTEP3_T09menoSrit";
        var tMTEP3_T09pavadinimascommand = "req.body.tMTEP3_T09pavadinimas";
        var tMTEP3_T09atlikVietacommand = "req.body.tMTEP3_T09atlikVieta";
        var tMTEP3_T09datacommand = "req.body.tMTEP3_T09data";
        var tMTEP3_T09atlygArNecommand = "req.body.tMTEP3_T09atlygArNe";
        // 19 lent
        var tMTEP3_T10nrcommand = "req.body.tMTEP3_T10nr";
        var tMTEP3_T10veiklPobudcommand = "req.body.tMTEP3_T10veiklPobud";
        var tMTEP3_T10veiklTikslcommand = "req.body.tMTEP3_T10veiklTiksl";
        var tMTEP3_T10dataVietacommand = "req.body.tMTEP3_T10dataVieta";
        var tMTEP3_T10dalyvSkcommand = "req.body.tMTEP3_T10dalyvSk";
        var tMTEP3_T10ktKomentaraicommand = "req.body.tMTEP3_T10ktKomentarai";
        var tMTEP3_T10atlygArNecommand = "req.body.tMTEP3_T10atlygArNe";
        // 20 lent
        var tMTEP3_T11nrcommand = "req.body.tMTEP3_T11nr";
        var tMTEP3_T11veiklPobudcommand = "req.body.tMTEP3_T11veiklPobud";
        var tMTEP3_T11veiklTikslcommand = "req.body.tMTEP3_T11veiklTiksl";
        var tMTEP3_T11dataVietacommand = "req.body.tMTEP3_T11dataVieta";
        var tMTEP3_T11dalyvSkcommand = "req.body.tMTEP3_T11dalyvSk";
        var tMTEP3_T11ktKomentaraicommand = "req.body.tMTEP3_T11ktKomentarai";
        var tMTEP3_T11atlygArNecommand = "req.body.tMTEP3_T11atlygArNe";
        // 21 lent
        var tMTEP3_T12nrcommand = "req.body.tMTEP3_T12nr";
        var tMTEP3_T12veiklPobudcommand = "req.body.tMTEP3_T12veiklPobud";
        var tMTEP3_T12dataVietacommand = "req.body.tMTEP3_T12dataVieta";
        // 22 lent
        var tMTEP3_T13nrcommand = "req.body.tMTEP3_T13nr";
        var tMTEP3_T13studDuomcommand = "req.body.tMTEP3_T13studDuom";
        var tMTEP3_T13renginioPavadcommand = "req.body.tMTEP3_T13renginioPavad";
        var tMTEP3_T13rezultatascommand = "req.body.tMTEP3_T13rezultatas";
        var tMTEP3_T13datacommand = "req.body.tMTEP3_T13data";
        // 23 lent
        var tMTEP3_T14nrcommand = "req.body.tMTEP3_T14nr";
        var tMTEP3_T14renginyscommand = "req.body.tMTEP3_T14renginys";
        var tMTEP3_T14veiklPobudcommand = "req.body.tMTEP3_T14veiklPobud";
        var tMTEP3_T14dataVietacommand = "req.body.tMTEP3_T14dataVieta";
        // savianalize
        var tMTEP3_Snrcommand = "req.body.tMTEP3_Snr";
        var tMTEP3_Sstiprybescommand = "req.body.tMTEP3_Sstiprybes";
        var tMTEP3_Stobulintinacommand = "req.body.tMTEP3_Stobulintina";
        // 24 lent
        //mokymosi
        var kTOV4_mokymopavadcommand = "req.body.kTOV4_mokymopavad";
        var kTOV4_mokymopazymNrcommand = "req.body.kTOV4_mokymopazymNr";
        var kTOV4_mokymotrukmeValLTcommand = "req.body.kTOV4_mokymotrukmeValLT";
        var kTOV4_mokymotrukmeValNeLTcommand = "req.body.kTOV4_mokymotrukmeValNeLT";
        // tyrimu
        var kTOV4_tyrimupavadcommand = "req.body.kTOV4_tyrimupavad";
        var kTOV4_tyrimupazymNrcommand = "req.body.kTOV4_tyrimupazymNr";
        var kTOV4_tyrimutrukmeValLTcommand = "req.body.kTOV4_tyrimutrukmeValLT";
        var kTOV4_tyrimutrukmeValNeLTcommand = "req.body.kTOV4_tyrimutrukmeValNeLT";
        //bendrosios
        var kTOV4_bendrosiospavadcommand = "req.body.kTOV4_bendrosiospavad";
        var kTOV4_bendrosiospazymNrcommand = "req.body.kTOV4_bendrosiospazymNr";
        var kTOV4_bendrosiostrukmeValLTcommand = "req.body.kTOV4_bendrosiostrukmeValLT";
        var kTOV4_bendrosiostrukmeValNeLTcommand = "req.body.kTOV4_bendrosiostrukmeValNeLT";
        //dalykines
        var kTOV4_dalykpavadcommand = "req.body.kTOV4_dalykpavad";
        var kTOV4_dalykpazymNrcommand = "req.body.kTOV4_dalykpazymNr";
        var kTOV4_dalyktrukmeValLTcommand = "req.body.kTOV4_dalyktrukmeValLT";
        var kTOV4_dalyktrukmeValNeLTcommand = "req.body.kTOV4_dalyktrukmeValNeLT";
        // 25 lent
        var kTOV4_25renginysTemacommand = "req.body.kTOV4_25renginysTema";
        var kTOV4_25kompGrupecommand = "req.body.kTOV4_25kompGrupe";
        var kTOV4_25skirtacommand = "req.body.kTOV4_25skirta";
        // 26 lent
        var kTOV4_26imonIstaigcommand = "req.body.kTOV4_26imonIstaig";
        var kTOV4_26kompGrupecommand = "req.body.kTOV4_26kompGrupe";
        var kTOV4_26trukmeValcommand = "req.body.kTOV4_26trukmeVal";
        var kTOV4_26datacommand = "req.body.kTOV4_26data";
        // 27 lent
        var kTOV4_KV03nrcommand = "req.body.kTOV4_KV03nr";
        var kTOV4_KV03studKryptiscommand = "req.body.kTOV4_KV03studKryptis";
        var kTOV4_KV03saliscommand = "req.body.kTOV4_KV03salis";
        var kTOV4_KV03institucijacommand = "req.body.kTOV4_KV03institucija";
        var kTOV4_KV03dalykascommand = "req.body.kTOV4_KV03dalykas";
        // 28.1 lent
        var kTOV4_O01_1nrcommand = "req.body.kTOV4_O01_1nr";
        var kTOV4_O01_1veiklPobudcommand = "req.body.kTOV4_O01_1veiklPobud";
        var kTOV4_O01_1isakNrDatacommand = "req.body.kTOV4_O01_1isakNrData";
        // 28.2 lent
        var kTOV4_O01_2nrcommand = "req.body.kTOV4_O01_2nr";
        var kTOV4_O01_2destytojascommand = "req.body.kTOV4_O01_2destytojas";
        var kTOV4_O01_2veiklPobudcommand = "req.body.kTOV4_O01_2veiklPobud";
        var kTOV4_O01_2dataVietacommand = "req.body.kTOV4_O01_2dataVieta";
        var kTOV4_O01_2ktKomentaraicommand = "req.body.kTOV4_O01_2ktKomentarai";
        // 29 lent
        var kTOV4_29veiklacommand = "req.body.kTOV4_29veikla";
        var kTOV4_29socPartneriscommand = "req.body.kTOV4_29socPartneris";
        // savianalize
        var kTOV4_Snrcommand = "req.body.kTOV4_Snr";
        var kTOV4_Sstiprybescommand = "req.body.kTOV4_Sstiprybes";
        var kTOV4_Stobulintinacommand = "req.body.kTOV4_Stobulintina";
        // 30 lent
        var kV5_KT02nrcommand = "req.body.kV5_KT02nr";
        var kV5_KT02studKryptiscommand = "req.body.kV5_KT02studKryptis";
        var kV5_KT02diplomantascommand = "req.body.kV5_KT02diplomantas";
        var kV5_KT02studProgrcommand = "req.body.kV5_KT02studProgr";
        var kV5_KT02darboTemacommand = "req.body.kV5_KT02darboTema";
        // 31 lent
        var kV5_KT01nrcommand = "req.body.kV5_KT01nr";
        var kV5_KT01diplomantascommand = "req.body.kV5_KT01diplomantas";
        var kV5_KT01studProgrcommand = "req.body.kV5_KT01studProgr";
        var kV5_KT01darboTemacommand = "req.body.kV5_KT01darboTema";
        var kV5_KT01uzsakovascommand = "req.body.kV5_KT01uzsakovas";
        var kV5_KT01studKryptiscommand = "req.body.kV5_KT01studKryptis";
        // 32 lent
        var kV5_32socaprasymascommand = "req.body.kV5_32socaprasymas";
        var kV5_32aplinkaprasymascommand = "req.body.kV5_32aplinkaprasymas";
        var kV5_32valstybaprasymascommand = "req.body.kV5_32valstybaprasymas";
        var kV5_32etnoaprasymascommand = "req.body.kV5_32etnoaprasymas";
        var kV5_32savaprasymascommand = "req.body.kV5_32savaprasymas";
        // 33 lent
        var kV5_33veiklacommand = "req.body.kV5_33veikla";
        var kV5_33veiklPartnercommand = "req.body.kV5_33veiklPartner";
        var kV5_33organizaccommand = "req.body.kV5_33organizac";
        var kV5_33veiklOrientavimcommand = "req.body.kV5_33veiklOrientavim";
        var kV5_33dalyviaicommand = "req.body.kV5_33dalyviai";
        var kV5_33laikascommand = "req.body.kV5_33laikas";
        var kV5_33vietacommand = "req.body.kV5_33vieta";
        // 34 lent
        var kV5_34pavadinimascommand = "req.body.kV5_34pavadinimas";
        var kV5_34vykdytPartnercommand = "req.body.kV5_34vykdytPartner";
        var kV5_34dalyviaicommand = "req.body.kV5_34dalyviai";
        var kV5_34finansavimcommand = "req.body.kV5_34finansavim";
        var kV5_34rezultataicommand = "req.body.kV5_34rezultatai";
        var kV5_34salisDatacommand = "req.body.kV5_34salisData";
        //masyvu isvalymas update-report-lecturer-dep
        foundUser.destytojas.kD1_K01.kD1_K01_array = new Array();
        foundUser.destytojas.nD2_M02 = new Array();
        foundUser.destytojas.nD2_M03 = new Array();
        foundUser.destytojas.nD2_M04 = new Array();
        foundUser.destytojas.nD2_D01 = new Array();
        foundUser.destytojas.nD2_D02 = new Array();
        foundUser.destytojas.nD2_D03 = new Array();
        foundUser.destytojas.nD2_S01 = new Array();
        foundUser.destytojas.nD2_S = new Array();
        foundUser.destytojas.tMTEP3_T01 = new Array();
        foundUser.destytojas.tMTEP3_T02 = new Array();
        foundUser.destytojas.tMTEP3_T03 = new Array();
        foundUser.destytojas.tMTEP3_T04 = new Array();
        foundUser.destytojas.tMTEP3_T05 = new Array();
        foundUser.destytojas.tMTEP3_142 = new Array();
        foundUser.destytojas.tMTEP3_143 = new Array();
        foundUser.destytojas.tMTEP3_T06 = new Array();
        foundUser.destytojas.tMTEP3_T07 = new Array();
        foundUser.destytojas.tMTEP3_T08 = new Array();
        foundUser.destytojas.tMTEP3_T09 = new Array();
        foundUser.destytojas.tMTEP3_T10 = new Array();
        foundUser.destytojas.tMTEP3_T11 = new Array();
        foundUser.destytojas.tMTEP3_T12 = new Array();
        foundUser.destytojas.tMTEP3_T13 = new Array();
        foundUser.destytojas.tMTEP3_T14 = new Array();
        foundUser.destytojas.tMTEP3_S = new Array();
        //24 lentelė
        foundUser.destytojas.kTOV4_KV01.kompetencijos.mokymosi = new Array();
        foundUser.destytojas.kTOV4_KV01.kompetencijos.tyrimu = new Array();
        foundUser.destytojas.kTOV4_KV01.kompetencijos.bendrosios = new Array();
        foundUser.destytojas.kTOV4_KV01.kompetencijos.dalykines = new Array();
        // UPDATE post. Skaiciui "dalyvavusiu" nustatyti Vedejo ataskaitoje
        foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoMokymosiKomp = false;
        foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoTyrimuKomp = false;
        foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoBendrKomp = false;
        foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoDalykKomp = false;

        foundUser.destytojas.kTOV4_25 = new Array();
        foundUser.destytojas.kTOV4_26 = new Array();
        foundUser.destytojas.kTOV4_KV03 = new Array();
        foundUser.destytojas.kTOV4_O01.kTOV4_O01_1 = new Array();
        foundUser.destytojas.kTOV4_O01.kTOV4_O01_2 = new Array();
        foundUser.destytojas.kTOV4_29 = new Array();
        foundUser.destytojas.kTOV4_S = new Array();
        foundUser.destytojas.kV5_KT01 = new Array();
        foundUser.destytojas.kV5_KT02 = new Array();
        //32 lentelė
        foundUser.destytojas.kV5_32.socAtskMaz = new Array();
        foundUser.destytojas.kV5_32.aplinkosaugInic = new Array();
        foundUser.destytojas.kV5_32.lietValstybPuosel = new Array();
        foundUser.destytojas.kV5_32.lietEtnokPuos = new Array();
        foundUser.destytojas.kV5_32.savanorystIniciatyv = new Array();

        foundUser.destytojas.kV5_33 = new Array();
        foundUser.destytojas.kV5_34 = new Array();

        if (req.body.ataskaitos_busena == "užrakinta") { //kiekvienam atskirai reikia updated_for aprašyti
          // 2 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table2_name); i++) {
            foundUser.destytojas.kD1_K01.kD1_K01_array.push({
              nr: eval(nrcommand + i),
              dalykas: eval(dalykascommand + i),
              grupe: eval(grupecommand + i),
              semestras: eval(semestrascommand + i),
              planuotosVal: eval(planuotosValcommand + i),
              atliktosVal: eval(atliktosValcommand + i)
            })
          }
          foundUser.destytojas.kD1_K01.isVisoValPlan = req.body.kD1_K01isVisoValPlan,
            foundUser.destytojas.kD1_K01.isVisoValAtl = req.body.kD1_K01isVisoValAtl,
            foundUser.destytojas.kD1_K01.isJuSrautaisValPlan = req.body.isJuSrautaisValPlan,
            foundUser.destytojas.kD1_K01.isJuSrautaisValAtl = req.body.isJuSrautaisValAtl,
            foundUser.destytojas.kD1_K01.isJuUzsienioValPlan = req.body.isJuUzsienioValPlan,
            foundUser.destytojas.kD1_K01.isJuUzsienioValAtl = req.body.isJuUzsienioValAtl,
            foundUser.destytojas.kD1_K01.priezastys = req.body.kD1_K01priezastys,

            foundUser.destytojas.nD2.nekSuStud_planVal = req.body.nekSuStud_planVal,
            foundUser.destytojas.nD2.nekSuStud_atlVal = req.body.nekSuStud_atlVal,
            foundUser.destytojas.nD2.pasirengDest_planVal = req.body.pasirengDest_planVal,
            foundUser.destytojas.nD2.pasirengDest_atlVal = req.body.pasirengDest_atlVal,
            foundUser.destytojas.nD2.metod_planVal = req.body.metod_planVal,
            foundUser.destytojas.nD2.metod_atlVal = req.body.metod_atlVal,
            foundUser.destytojas.nD2.dalyvSPKUV_planVal = req.body.dalyvSPKUV_planVal,
            foundUser.destytojas.nD2.dalyvSPKUV_atlVal = req.body.dalyvSPKUV_atlVal,
            foundUser.destytojas.nD2.studPop_planVal = req.body.studPop_planVal,
            foundUser.destytojas.nD2.studPop_atlVal = req.body.studPop_atlVal,
            foundUser.destytojas.nD2.isVisoValPlan = req.body.nD2isVisoValPlan,
            foundUser.destytojas.nD2.isVisoValAtl = req.body.nD2isVisoValAtl,
            foundUser.destytojas.nD2.priezastys = req.body.nD2priezastys
          // 3 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table3_name); i++) {
            foundUser.destytojas.nD2_M02.push({
              nr: eval(nrcommand + i),
              bibliografApr: eval(bibliografAprcommand + i),
              tipas: eval(tipascommand + i),
              mokslSrit: eval(mokslSritcommand + i),
              mokslKrypt: eval(mokslKryptcommand + i)
            })
          } // 4 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table4_name); i++) {
            foundUser.destytojas.nD2_M04.push({
              nr: eval(nD2_M04nrcommand + i),
              studProgr: eval(nD2_M04studProgrcommand + i),
              dalykPavad: eval(nD2_M04dalykPavadcommand + i),
              busena: eval(nD2_M04busenacommand + i),
              apimtisKredit: eval(nD2_M04apimtisKreditcommand + i)
            })
          } // 5 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table5_name); i++) {
            foundUser.destytojas.nD2_D01.push({
              nr: eval(nD2_D01nrcommand + i),
              komitetas: eval(nD2_D01komitetascommand + i),
              veikla: eval(nD2_D01veiklacommand + i),
              rezultatai: eval(nD2_D01rezultataicommand + i)
            })
          } // 6 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table6_name); i++) {
            foundUser.destytojas.nD2_D02.push({
              nr: eval(nD2_D02nrcommand + i),
              studKryptis: eval(nD2_D02studKryptcommand + i),
              veikla: eval(nD2_D02veiklacommand + i),
              rezultatai: eval(nD2_D02rezultataicommand + i)
            })
          } // 7 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table7_name); i++) {
            foundUser.destytojas.nD2_D03.push({
              nr: eval(nD2_D03nrcommand + i),
              studKryptis: eval(nD2_D03studKryptiscommand + i),
              studProgr: eval(nD2_D03studProgrcommand + i),
              veikla: eval(nD2_D03veiklacommand + i),
              rezultatai: eval(nD2_D03rezultataicommand + i)
            })
          } // 8 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table8_name); i++) {
            foundUser.destytojas.nD2_M03.push({
              nr: eval(nD2_M03nrcommand + i),
              studProgr: eval(nD2_M03studProgrcommand + i),
              dalykPavad: eval(nD2_M03dalykPavadcommand + i),
              apimtisKredit: eval(nD2_M03apimtisKreditcommand + i)
            })
          } // 9 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table9_name); i++) {
            foundUser.destytojas.nD2_S01.push({
              nr: eval(nD2_S01nrcommand + i),
              veikla: eval(nD2_S01veiklacommand + i),
              dataVieta: eval(nD2_S01dataVietacommand + i)
            })
          } // savianalize
          for (let i = 1; i <= parseInt(req.body.tablenD2_S_name); i++) {
            foundUser.destytojas.nD2_S.push({
              nr: eval(nD2_Snrcommand + i),
              stiprybes: eval(nD2_Sstiprybescommand + i),
              tobulintina: eval(nD2_Stobulintinacommand + i)
            })
          }
          foundUser.destytojas.tMTEP3.tMTEPveiklRez_planVal = req.body.tMTEPveiklRez_planVal,
            foundUser.destytojas.tMTEP3.tMTEPveiklRez_atlVal = req.body.tMTEPveiklRez_atlVal,
            foundUser.destytojas.tMTEP3.menoVeikl_planVal = req.body.menoVeikl_planVal,
            foundUser.destytojas.tMTEP3.menoVeikl_atlVal = req.body.menoVeikl_atlVal,
            foundUser.destytojas.tMTEP3.tMTEPmenoVeiklPop_planVal = req.body.tMTEPmenoVeiklPop_planVal,
            foundUser.destytojas.tMTEP3.tMTEPmenoVeiklPop_atlVal = req.body.tMTEPmenoVeiklPop_atlVal,
            foundUser.destytojas.tMTEP3.studReng_planVal = req.body.studReng_planVal,
            foundUser.destytojas.tMTEP3.studReng_atlVal = req.body.studReng_atlVal,
            foundUser.destytojas.tMTEP3.kitaVeikl_planVal = req.body.kitaVeikl_planVal,
            foundUser.destytojas.tMTEP3.kitaVeikl_atlVal = req.body.kitaVeikl_atlVal,
            foundUser.destytojas.tMTEP3.isVisoValPlan = req.body.tMTEP3isVisoValPlan,
            foundUser.destytojas.tMTEP3.isVisoValAtl = req.body.tMTEP3isVisoValAtl,
            foundUser.destytojas.tMTEP3.priezastys = req.body.tMTEP3priezastys
          // 10 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table10_name); i++) {
            foundUser.destytojas.tMTEP3_T01.push({
              nr: eval(tMTEP3_T01nrcommand + i),
              tyrTemat: eval(tyrTematcommand + i),
              tyrGrup: eval(tyrGrupcommand + i),
              mokslSrit: eval(tMTEP3_T01mokslSritcommand + i),
              mokslKrypt: eval(tMTEP3_T01mokslKryptcommand + i)
            })
          } // 11 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table11_name); i++) {
            foundUser.destytojas.tMTEP3_T02.push({
              nr: eval(tMTEP3_T02nrcommand + i),
              bibliografApr: eval(tMTEP3_T02bibliografAprcommand + i),
              tipas: eval(tMTEP3_T02tipascommand + i),
              mokslSrit: eval(tMTEP3_T02mokslSritcommand + i),
              mokslKrypt: eval(tMTEP3_T02mokslKryptcommand + i),
              duomBaze: eval(tMTEP3_T02duomBazecommand + i)
            })
          } // 12 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table12_name); i++) {
            foundUser.destytojas.tMTEP3_T03.push({
              nr: eval(tMTEP3_T03nrcommand + i),
              pilnasBiblApr: eval(tMTEP3_T03pilnasBiblAprcommand + i),
              rengTipas: eval(tMTEP3_T03rengTipascommand + i)
            })
          } // 13 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table13_name); i++) {
            foundUser.destytojas.tMTEP3_T04.push({
              nr: eval(tMTEP3_T04nrcommand + i),
              uzsakovas: eval(tMTEP3_T04uzsakovascommand + i),
              tema: eval(tMTEP3_T04temacommand + i),
              data: eval(tMTEP3_T04datacommand + i),
              atlygArNe: eval(tMTEP3_T04atlygArNecommand + i)
            })
          } // 14.1 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table141_name); i++) {
            foundUser.destytojas.tMTEP3_T05.push({
              nr: eval(tMTEP3_T05nrcommand + i),
              veiklPavad: eval(tMTEP3_T05veiklPavadcommand + i),
              veiklRezult: eval(tMTEP3_T05veiklRezultcommand + i),
              atlygArNe: eval(tMTEP3_T05atlygArNecommand + i)
            })
          } // 14.2 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table142_name); i++) {
            foundUser.destytojas.tMTEP3_142.push({
              nr: i,
              pavadinimas: eval(tMTEP3_142pavadinimascommand + i),
              pastabos: eval(tMTEP3_142pastaboscommand + i)
            })
          } // 14.3 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table143_name); i++) {
            foundUser.destytojas.tMTEP3_143.push({
              nr: i,
              pavadinimas: eval(tMTEP3_143pavadinimascommand + i),
              uzsakovas: eval(tMTEP3_143uzsakovascommand + i)
            })
          } // 15 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table15_name); i++) {
            foundUser.destytojas.tMTEP3_T06.push({
              nr: i,
              autorius: eval(tMTEP3_T06autoriuscommand + i),
              menoSrit: eval(tMTEP3_T06menoSritcommand + i),
              pobudis: eval(tMTEP3_T06pobudiscommand + i),
              realizVieta: eval(tMTEP3_T06realizVietacommand + i),
              data: eval(tMTEP3_T06datacommand + i),
              atlygArNe: eval(tMTEP3_T06atlygArNecommand + i)
            })
          } // 16 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table16_name); i++) {
            foundUser.destytojas.tMTEP3_T07.push({
              nr: eval(tMTEP3_T07nrcommand + i),
              menoSrit: eval(tMTEP3_T07menoSritcommand + i),
              pavadinimas: eval(tMTEP3_T07pavadinimascommand + i),
              atlikVieta: eval(tMTEP3_T07atlikVietacommand + i),
              data: eval(tMTEP3_T07datacommand + i),
              atlygArNe: eval(tMTEP3_T07atlygArNecommand + i)
            })
          } // 17 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table17_name); i++) {
            foundUser.destytojas.tMTEP3_T08.push({
              nr: eval(tMTEP3_T08Snrcommand + i),
              menoSrit: eval(tMTEP3_T08menoSritcommand + i),
              pavadinimas: eval(tMTEP3_T08pavadinimascommand + i),
              atlikVieta: eval(tMTEP3_T08atlikVietacommand + i),
              data: eval(tMTEP3_T08datacommand + i),
              atlygArNe: eval(tMTEP3_T08atlygArNecommand + i)
            })
          } // 18 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table18_name); i++) {
            foundUser.destytojas.tMTEP3_T09.push({
              nr: eval(tMTEP3_T09nrcommand + i),
              menoSrit: eval(tMTEP3_T09menoSritcommand + i),
              pavadinimas: eval(tMTEP3_T09pavadinimascommand + i),
              atlikVieta: eval(tMTEP3_T09atlikVietacommand + i),
              data: eval(tMTEP3_T09datacommand + i),
              atlygArNe: eval(tMTEP3_T09atlygArNecommand + i)
            })
          } // 19 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table19_name); i++) {
            foundUser.destytojas.tMTEP3_T10.push({
              nr: eval(tMTEP3_T10nrcommand + i),
              veiklPobud: eval(tMTEP3_T10veiklPobudcommand + i),
              veiklTiksl: eval(tMTEP3_T10veiklTikslcommand + i),
              dataVieta: eval(tMTEP3_T10dataVietacommand + i),
              dalyvSk: eval(tMTEP3_T10dalyvSkcommand + i),
              ktKomentarai: eval(tMTEP3_T10ktKomentaraicommand + i),
              atlygArNe: eval(tMTEP3_T10atlygArNecommand + i)
            })
          } // 20 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table20_name); i++) {
            foundUser.destytojas.tMTEP3_T11.push({
              nr: eval(tMTEP3_T11nrcommand + i),
              veiklPobud: eval(tMTEP3_T11veiklPobudcommand + i),
              veiklTiksl: eval(tMTEP3_T11veiklTikslcommand + i),
              dataVieta: eval(tMTEP3_T11dataVietacommand + i),
              dalyvSk: eval(tMTEP3_T11dalyvSkcommand + i),
              ktKomentarai: eval(tMTEP3_T11ktKomentaraicommand + i),
              atlygArNe: eval(tMTEP3_T11atlygArNecommand + i)
            })
          } // 21 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table21_name); i++) {
            foundUser.destytojas.tMTEP3_T12.push({
              nr: eval(tMTEP3_T12nrcommand + i),
              veiklPobud: eval(tMTEP3_T12veiklPobudcommand + i),
              dataVieta: eval(tMTEP3_T12dataVietacommand + i)
            })
          } // 22 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table22_name); i++) {
            foundUser.destytojas.tMTEP3_T13.push({
              nr: eval(tMTEP3_T13nrcommand + i),
              studDuom: eval(tMTEP3_T13studDuomcommand + i),
              renginioPavad: eval(tMTEP3_T13renginioPavadcommand + i),
              rezultatas: eval(tMTEP3_T13rezultatascommand + i),
              data: eval(tMTEP3_T13datacommand + i)
            })
          } // 23 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table23_name); i++) {
            foundUser.destytojas.tMTEP3_T14.push({
              nr: eval(tMTEP3_T14nrcommand + i),
              renginys: eval(tMTEP3_T14renginyscommand + i),
              veiklPobud: eval(tMTEP3_T14veiklPobudcommand + i),
              dataVieta: eval(tMTEP3_T14dataVietacommand + i)
            })
          } // savianalize
          for (let i = 1; i <= parseInt(req.body.tableTMTEP3_S_name); i++) {
            foundUser.destytojas.tMTEP3_S.push({
              nr: eval(tMTEP3_Snrcommand + i),
              stiprybes: eval(tMTEP3_Sstiprybescommand + i),
              tobulintina: eval(tMTEP3_Stobulintinacommand + i)
            })
          }
          foundUser.destytojas.kTOV4.kompTobulinimas_planVal = req.body.kTOV4kompTobulinimas_planVal,
            foundUser.destytojas.kTOV4.kompTobulinimas_atlVal = req.body.kTOV4kompTobulinimas_atlVal,
            foundUser.destytojas.kTOV4.organizacVeikl_planVal = req.body.kTOV4organizacVeikl_planVal,
            foundUser.destytojas.kTOV4.organizacVeikl_atlVal = req.body.kTOV4organizacVeikl_atlVal,
            foundUser.destytojas.kTOV4.isVisoValPlan = req.body.kTOV4isVisoValPlan,
            foundUser.destytojas.kTOV4.isVisoValAtl = req.body.kTOV4isVisoValAtl,
            foundUser.destytojas.kTOV4.priezastys = req.body.kTOV4priezastys
          // 24 lentelė update-report-lecturer-dep
          //mokymosi prekes
          for (let i = 1; i <= parseInt(req.body.table241_name); i++) {
            foundUser.destytojas.kTOV4_KV01.kompetencijos.mokymosi.push({
              pavadinimas: eval(kTOV4_mokymopavadcommand + i),
              pazymNr: eval(kTOV4_mokymopazymNrcommand + i),
              trukmeValLT: eval(kTOV4_mokymotrukmeValLTcommand + i),
              trukmeValNeLT: eval(kTOV4_mokymotrukmeValNeLTcommand + i)
            })
            foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoMokymosiKomp = true
          } // tyrimu
          for (let i = 1; i <= parseInt(req.body.table242_name); i++) {
            foundUser.destytojas.kTOV4_KV01.kompetencijos.tyrimu.push({
              pavadinimas: eval(kTOV4_tyrimupavadcommand + i),
              pazymNr: eval(kTOV4_tyrimupazymNrcommand + i),
              trukmeValLT: eval(kTOV4_tyrimutrukmeValLTcommand + i),
              trukmeValNeLT: eval(kTOV4_tyrimutrukmeValNeLTcommand + i)
            })
            foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoTyrimuKomp = true
          } //bendrosios
          for (let i = 1; i <= parseInt(req.body.table243_name); i++) {
            foundUser.destytojas.kTOV4_KV01.kompetencijos.bendrosios.push({
              pavadinimas: eval(kTOV4_bendrosiospavadcommand + i),
              pazymNr: eval(kTOV4_bendrosiospazymNrcommand + i),
              trukmeValLT: eval(kTOV4_bendrosiostrukmeValLTcommand + i),
              trukmeValNeLT: eval(kTOV4_bendrosiostrukmeValNeLTcommand + i)
            })
            foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoBendrKomp = true
          } //dalykines
          for (let i = 1; i <= parseInt(req.body.table244_name); i++) {
            foundUser.destytojas.kTOV4_KV01.kompetencijos.dalykines.push({
              pavadinimas: eval(kTOV4_dalykpavadcommand + i),
              pazymNr: eval(kTOV4_dalykpazymNrcommand + i),
              trukmeValLT: eval(kTOV4_dalyktrukmeValLTcommand + i),
              trukmeValNeLT: eval(kTOV4_dalyktrukmeValNeLTcommand + i)
            })
            foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoDalykKomp = true
          }
          foundUser.destytojas.kTOV4_KV01.kompetencijos.isVisoValLT = req.body.kTOV4_trukmeValLT,
            foundUser.destytojas.kTOV4_KV01.kompetencijos.isVisoValNeLT = req.body.kTOV4_trukmeValNeLT
          // 25 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table25_name); i++) {
            foundUser.destytojas.kTOV4_25.push({
              nr: i,
              renginysTema: eval(kTOV4_25renginysTemacommand + i),
              kompGrupe: eval(kTOV4_25kompGrupecommand + i),
              skirta: eval(kTOV4_25skirtacommand + i)
            })
          } // 26 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table26_name); i++) {
            foundUser.destytojas.kTOV4_26.push({
              nr: i,
              imonIstaig: eval(kTOV4_26imonIstaigcommand + i),
              kompGrupe: eval(kTOV4_26kompGrupecommand + i),
              trukmeVal: eval(kTOV4_26trukmeValcommand + i),
              data: eval(kTOV4_26datacommand + i)
            })
          } // 27 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table27_name); i++) {
            foundUser.destytojas.kTOV4_KV03.push({
              nr: eval(kTOV4_KV03nrcommand + i),
              studKryptis: eval(kTOV4_KV03studKryptiscommand + i),
              salis: eval(kTOV4_KV03saliscommand + i),
              institucija: eval(kTOV4_KV03institucijacommand + i),
              dalykas: eval(kTOV4_KV03dalykascommand + i)
            })
          } // 28.1 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table281_name); i++) {
            foundUser.destytojas.kTOV4_O01.kTOV4_O01_1.push({
              nr: eval(kTOV4_O01_1nrcommand + i),
              veiklPobud: eval(kTOV4_O01_1veiklPobudcommand + i),
              isakNrData: eval(kTOV4_O01_1isakNrDatacommand + i)
            })
          } // 28.2 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table282_name); i++) {
            foundUser.destytojas.kTOV4_O01.kTOV4_O01_2.push({
              nr: eval(kTOV4_O01_2nrcommand + i),
              destytojas: eval(kTOV4_O01_2destytojascommand + i),
              veiklPobud: eval(kTOV4_O01_2veiklPobudcommand + i),
              dataVieta: eval(kTOV4_O01_2dataVietacommand + i),
              ktKomentarai: eval(kTOV4_O01_2ktKomentaraicommand + i)
            })
          } // 29 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table29_name); i++) {
            foundUser.destytojas.kTOV4_29.push({
              nr: i,
              veikla: eval(kTOV4_29veiklacommand + i),
              socPartneris: eval(kTOV4_29socPartneriscommand + i)
            })
          } // savianalize
          for (let i = 1; i <= parseInt(req.body.tablekTOV4_S_name); i++) {
            foundUser.destytojas.kTOV4_S.push({
              nr: eval(kTOV4_Snrcommand + i),
              stiprybes: eval(kTOV4_Sstiprybescommand + i),
              tobulintina: eval(kTOV4_Stobulintinacommand + i)
            })
          } // 30 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table30_name); i++) {
            foundUser.destytojas.kV5_KT02.push({
              nr: eval(kV5_KT02nrcommand + i),
              studKryptis: eval(kV5_KT02studKryptiscommand + i),
              diplomantas: eval(kV5_KT02diplomantascommand + i),
              studProgr: eval(kV5_KT02studProgrcommand + i),
              darboTema: eval(kV5_KT02darboTemacommand + i)
            })
          } // 31 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table31_name); i++) {
            foundUser.destytojas.kV5_KT01.push({
              nr: eval(kV5_KT01nrcommand + i),
              studKryptis: eval(kV5_KT01studKryptiscommand + i),
              diplomantas: eval(kV5_KT01diplomantascommand + i),
              studProgr: eval(kV5_KT01studProgrcommand + i),
              darboTema: eval(kV5_KT01darboTemacommand + i),
              uzsakovas: eval(kV5_KT01uzsakovascommand + i)
            })
          } // 32 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table321_name); i++) {
            foundUser.destytojas.kV5_32.socAtskMaz.push({
              aprasymas: eval(kV5_32socaprasymascommand + i)
            })
          }
          for (let i = 1; i <= parseInt(req.body.table322_name); i++) {
            foundUser.destytojas.kV5_32.aplinkosaugInic.push({
              aprasymas: eval(kV5_32aplinkaprasymascommand + i)
            })
          }
          for (let i = 1; i <= parseInt(req.body.table323_name); i++) {
            foundUser.destytojas.kV5_32.lietValstybPuosel.push({
              aprasymas: eval(kV5_32valstybaprasymascommand + i)
            })
          }
          for (let i = 1; i <= parseInt(req.body.table324_name); i++) {
            foundUser.destytojas.kV5_32.lietEtnokPuos.push({
              aprasymas: eval(kV5_32etnoaprasymascommand + i)
            })
          }
          for (let i = 1; i <= parseInt(req.body.table325_name); i++) {
            foundUser.destytojas.kV5_32.savanorystIniciatyv.push({
              aprasymas: eval(kV5_32savaprasymascommand + i)
            })
          } // 33 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table33_name); i++) {
            foundUser.destytojas.kV5_33.push({
              nr: i,
              veikla: eval(kV5_33veiklacommand + i),
              veiklPartner: eval(kV5_33veiklPartnercommand + i),
              organizac: eval(kV5_33organizaccommand + i),
              veiklOrientavim: eval(kV5_33veiklOrientavimcommand + i),
              dalyviai: eval(kV5_33dalyviaicommand + i),
              laikas: eval(kV5_33laikascommand + i),
              vieta: eval(kV5_33vietacommand + i)
            })
          } // 34 lentelė update-report-lecturer-dep
          for (let i = 1; i <= parseInt(req.body.table34_name); i++) {
            foundUser.destytojas.kV5_34.push({
              nr: i,
              pavadinimas: eval(kV5_34pavadinimascommand + i),
              vykdytPartner: eval(kV5_34vykdytPartnercommand + i),
              dalyviai: eval(kV5_34dalyviaicommand + i),
              finansavim: eval(kV5_34finansavimcommand + i),
              rezultatai: eval(kV5_34rezultataicommand + i),
              salisData: eval(kV5_34salisDatacommand + i)
            })
          }
          foundUser.destytojas.kV5_kitaInfo = req.body.kV5_kitaInfo,

            // vedėjo uzpildyta update-report-lecturer-dep
            foundUser.destytojas.katedrosV_isvados = req.body.vedejo_katedrosV_isvados,
            foundUser.destytojas.katedrosV_rekomendacijos.kontaktD = req.body.vedejo_kontaktD,
            foundUser.destytojas.katedrosV_rekomendacijos.neKontaktD = req.body.vedejo_neKontaktD,
            foundUser.destytojas.katedrosV_rekomendacijos.tMTEP_vykdymas = req.body.vedejo_tMTEP_vykdymas,
            foundUser.destytojas.katedrosV_rekomendacijos.kompTobulinimas = req.body.vedejo_kompTobulinimas,
            foundUser.destytojas.katedrosV_rekomendacijos.kitosVeikl = req.body.vedejo_kitosVeikl,

            foundUser.busena = req.body.ataskaitos_busena

        } else if (req.body.ataskaitos_busena == "užrakintaVedėjo") { //busena perduodama paspaudus mygtuka
          // 2 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table2_name); i++) {
            if (eval(dalykascommand + i) != "" || eval(grupecommand + i) != "" || eval(semestrascommand + i) != "" ||
              eval(planuotosValcommand + i) != "" || eval(atliktosValcommand + i) != "") {
              foundUser.destytojas.kD1_K01.kD1_K01_array.push({
                nr: eval(nrcommand + i),
                dalykas: eval(dalykascommand + i),
                grupe: eval(grupecommand + i),
                semestras: eval(semestrascommand + i),
                planuotosVal: eval(planuotosValcommand + i),
                atliktosVal: eval(atliktosValcommand + i)
              })
            }
          }
          foundUser.destytojas.kD1_K01.isVisoValPlan = req.body.kD1_K01isVisoValPlan,
            foundUser.destytojas.kD1_K01.isVisoValAtl = req.body.kD1_K01isVisoValAtl,
            foundUser.destytojas.kD1_K01.isJuSrautaisValPlan = req.body.isJuSrautaisValPlan,
            foundUser.destytojas.kD1_K01.isJuSrautaisValAtl = req.body.isJuSrautaisValAtl,
            foundUser.destytojas.kD1_K01.isJuUzsienioValPlan = req.body.isJuUzsienioValPlan,
            foundUser.destytojas.kD1_K01.isJuUzsienioValAtl = req.body.isJuUzsienioValAtl,
            foundUser.destytojas.kD1_K01.priezastys = req.body.kD1_K01priezastys,

            foundUser.destytojas.nD2.nekSuStud_planVal = req.body.nekSuStud_planVal,
            foundUser.destytojas.nD2.nekSuStud_atlVal = req.body.nekSuStud_atlVal,
            foundUser.destytojas.nD2.pasirengDest_planVal = req.body.pasirengDest_planVal,
            foundUser.destytojas.nD2.pasirengDest_atlVal = req.body.pasirengDest_atlVal,
            foundUser.destytojas.nD2.metod_planVal = req.body.metod_planVal,
            foundUser.destytojas.nD2.metod_atlVal = req.body.metod_atlVal,
            foundUser.destytojas.nD2.dalyvSPKUV_planVal = req.body.dalyvSPKUV_planVal,
            foundUser.destytojas.nD2.dalyvSPKUV_atlVal = req.body.dalyvSPKUV_atlVal,
            foundUser.destytojas.nD2.studPop_planVal = req.body.studPop_planVal,
            foundUser.destytojas.nD2.studPop_atlVal = req.body.studPop_atlVal,
            foundUser.destytojas.nD2.isVisoValPlan = req.body.nD2isVisoValPlan,
            foundUser.destytojas.nD2.isVisoValAtl = req.body.nD2isVisoValAtl,
            foundUser.destytojas.nD2.priezastys = req.body.nD2priezastys
          // 3 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table3_name); i++) {
            if (eval(bibliografAprcommand + i) != "" || eval(tipascommand + i) != "" || eval(mokslSritcommand + i) != "" ||
              eval(mokslKryptcommand + i) != "") {
              foundUser.destytojas.nD2_M02.push({
                nr: eval(nrcommand + i),
                bibliografApr: eval(bibliografAprcommand + i),
                tipas: eval(tipascommand + i),
                mokslSrit: eval(mokslSritcommand + i),
                mokslKrypt: eval(mokslKryptcommand + i)
              })
            }
          } // 4 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table4_name); i++) {
            if (eval(nD2_M04studProgrcommand + i) != "" || eval(nD2_M04dalykPavadcommand + i) != "" ||
              eval(nD2_M04busenacommand + i) != "" || eval(nD2_M04apimtisKreditcommand + i) != "") {
              foundUser.destytojas.nD2_M04.push({
                nr: eval(nD2_M04nrcommand + i),
                studProgr: eval(nD2_M04studProgrcommand + i),
                dalykPavad: eval(nD2_M04dalykPavadcommand + i),
                busena: eval(nD2_M04busenacommand + i),
                apimtisKredit: eval(nD2_M04apimtisKreditcommand + i)
              })
            }
          } // 5 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table5_name); i++) {
            if (eval(nD2_D01komitetascommand + i) != "" || eval(nD2_D01veiklacommand + i) != "" ||
              eval(nD2_D01rezultataicommand + i) != "") {
              foundUser.destytojas.nD2_D01.push({
                nr: eval(nD2_D01nrcommand + i),
                komitetas: eval(nD2_D01komitetascommand + i),
                veikla: eval(nD2_D01veiklacommand + i),
                rezultatai: eval(nD2_D01rezultataicommand + i)
              })
            }
          } // 6 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table6_name); i++) {
            if (eval(nD2_D02studKryptcommand + i) != "" || eval(nD2_D02veiklacommand + i) != "" ||
              eval(nD2_D02rezultataicommand + i) != "") {
              foundUser.destytojas.nD2_D02.push({
                nr: eval(nD2_D02nrcommand + i),
                studKryptis: eval(nD2_D02studKryptcommand + i),
                veikla: eval(nD2_D02veiklacommand + i),
                rezultatai: eval(nD2_D02rezultataicommand + i)
              })
            }
          } // 7 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table7_name); i++) {
            if (eval(nD2_D03studKryptiscommand + i) != "" || eval(nD2_D03studProgrcommand + i) != "" ||
              eval(nD2_D03veiklacommand + i) != "" || eval(nD2_D03rezultataicommand + i) != "") {
              foundUser.destytojas.nD2_D03.push({
                nr: eval(nD2_D03nrcommand + i),
                studKryptis: eval(nD2_D03studKryptiscommand + i),
                studProgr: eval(nD2_D03studProgrcommand + i),
                veikla: eval(nD2_D03veiklacommand + i),
                rezultatai: eval(nD2_D03rezultataicommand + i)
              })
            }
          } // 8 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table8_name); i++) {
            if (eval(nD2_M03studProgrcommand + i) != "" || eval(nD2_M03dalykPavadcommand + i) != "" ||
              eval(nD2_M03apimtisKreditcommand + i) != "") {
              foundUser.destytojas.nD2_M03.push({
                nr: eval(nD2_M03nrcommand + i),
                studProgr: eval(nD2_M03studProgrcommand + i),
                dalykPavad: eval(nD2_M03dalykPavadcommand + i),
                apimtisKredit: eval(nD2_M03apimtisKreditcommand + i)
              })
            }
          } // 9 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table9_name); i++) {
            if (eval(nD2_S01veiklacommand + i) != "" || eval(nD2_S01dataVietacommand + i) != "") {
              foundUser.destytojas.nD2_S01.push({
                nr: eval(nD2_S01nrcommand + i),
                veikla: eval(nD2_S01veiklacommand + i),
                dataVieta: eval(nD2_S01dataVietacommand + i)
              })
            }
          } // savianalize update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.tablenD2_S_name); i++) {
            if (eval(nD2_Sstiprybescommand + i) != "" || eval(nD2_Stobulintinacommand + i) != "") {
              foundUser.destytojas.nD2_S.push({
                nr: eval(nD2_Snrcommand + i),
                stiprybes: eval(nD2_Sstiprybescommand + i),
                tobulintina: eval(nD2_Stobulintinacommand + i)
              })
            }
          }
          foundUser.destytojas.tMTEP3.tMTEPveiklRez_planVal = req.body.tMTEPveiklRez_planVal,
            foundUser.destytojas.tMTEP3.tMTEPveiklRez_atlVal = req.body.tMTEPveiklRez_atlVal,
            foundUser.destytojas.tMTEP3.menoVeikl_planVal = req.body.menoVeikl_planVal,
            foundUser.destytojas.tMTEP3.menoVeikl_atlVal = req.body.menoVeikl_atlVal,
            foundUser.destytojas.tMTEP3.tMTEPmenoVeiklPop_planVal = req.body.tMTEPmenoVeiklPop_planVal,
            foundUser.destytojas.tMTEP3.tMTEPmenoVeiklPop_atlVal = req.body.tMTEPmenoVeiklPop_atlVal,
            foundUser.destytojas.tMTEP3.studReng_planVal = req.body.studReng_planVal,
            foundUser.destytojas.tMTEP3.studReng_atlVal = req.body.studReng_atlVal,
            foundUser.destytojas.tMTEP3.kitaVeikl_planVal = req.body.kitaVeikl_planVal,
            foundUser.destytojas.tMTEP3.kitaVeikl_atlVal = req.body.kitaVeikl_atlVal,
            foundUser.destytojas.tMTEP3.isVisoValPlan = req.body.tMTEP3isVisoValPlan,
            foundUser.destytojas.tMTEP3.isVisoValAtl = req.body.tMTEP3isVisoValAtl,
            foundUser.destytojas.tMTEP3.priezastys = req.body.tMTEP3priezastys
          // 10 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table10_name); i++) {
            if (eval(tyrTematcommand + i) != "" || eval(tyrGrupcommand + i) != "" ||
              eval(tMTEP3_T01mokslSritcommand + i) != "" || eval(tMTEP3_T01mokslKryptcommand + i) != "") {
              foundUser.destytojas.tMTEP3_T01.push({
                nr: eval(tMTEP3_T01nrcommand + i),
                tyrTemat: eval(tyrTematcommand + i),
                tyrGrup: eval(tyrGrupcommand + i),
                mokslSrit: eval(tMTEP3_T01mokslSritcommand + i),
                mokslKrypt: eval(tMTEP3_T01mokslKryptcommand + i)
              })
            }
          } // 11 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table11_name); i++) {
            if (eval(tMTEP3_T02bibliografAprcommand + i) != "" || eval(tMTEP3_T02tipascommand + i) != "" ||
              eval(tMTEP3_T02mokslSritcommand + i) != "" || eval(tMTEP3_T02mokslKryptcommand + i) != "" ||
              eval(tMTEP3_T02duomBazecommand + i) != "") {
              foundUser.destytojas.tMTEP3_T02.push({
                nr: eval(tMTEP3_T02nrcommand + i),
                bibliografApr: eval(tMTEP3_T02bibliografAprcommand + i),
                tipas: eval(tMTEP3_T02tipascommand + i),
                mokslSrit: eval(tMTEP3_T02mokslSritcommand + i),
                mokslKrypt: eval(tMTEP3_T02mokslKryptcommand + i),
                duomBaze: eval(tMTEP3_T02duomBazecommand + i)
              })
            }
          } // 12 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table12_name); i++) {
            if (eval(tMTEP3_T03pilnasBiblAprcommand + i) != "" || eval(tMTEP3_T03rengTipascommand + i) != "") {
              foundUser.destytojas.tMTEP3_T03.push({
                nr: eval(tMTEP3_T03nrcommand + i),
                pilnasBiblApr: eval(tMTEP3_T03pilnasBiblAprcommand + i),
                rengTipas: eval(tMTEP3_T03rengTipascommand + i)
              })
            }
          } // 13 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table13_name); i++) {
            if (eval(tMTEP3_T04uzsakovascommand + i) != "" || eval(tMTEP3_T04temacommand + i) != "" ||
              eval(tMTEP3_T04datacommand + i) != "" || eval(tMTEP3_T04atlygArNecommand + i) != "") {
              foundUser.destytojas.tMTEP3_T04.push({
                nr: eval(tMTEP3_T04nrcommand + i),
                uzsakovas: eval(tMTEP3_T04uzsakovascommand + i),
                tema: eval(tMTEP3_T04temacommand + i),
                data: eval(tMTEP3_T04datacommand + i),
                atlygArNe: eval(tMTEP3_T04atlygArNecommand + i)
              })
            }
          } // 14.1 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table141_name); i++) {
            if (eval(tMTEP3_T05veiklPavadcommand + i) != "" || eval(tMTEP3_T05veiklRezultcommand + i) != "" ||
              eval(tMTEP3_T05atlygArNecommand + i) != "") {
              foundUser.destytojas.tMTEP3_T05.push({
                nr: eval(tMTEP3_T05nrcommand + i),
                veiklPavad: eval(tMTEP3_T05veiklPavadcommand + i),
                veiklRezult: eval(tMTEP3_T05veiklRezultcommand + i),
                atlygArNe: eval(tMTEP3_T05atlygArNecommand + i)
              })
            }
          } // 14.2 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table142_name); i++) {
            if (eval(tMTEP3_142pavadinimascommand + i) != "" || eval(tMTEP3_142pastaboscommand + i) != "") {
              foundUser.destytojas.tMTEP3_142.push({
                nr: i,
                pavadinimas: eval(tMTEP3_142pavadinimascommand + i),
                pastabos: eval(tMTEP3_142pastaboscommand + i)
              })
            }
          } // 14.3 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table143_name); i++) {
            if (eval(tMTEP3_143pavadinimascommand + i) != "" || eval(tMTEP3_143uzsakovascommand + i) != "") {
              foundUser.destytojas.tMTEP3_143.push({
                nr: i,
                pavadinimas: eval(tMTEP3_143pavadinimascommand + i),
                uzsakovas: eval(tMTEP3_143uzsakovascommand + i)
              })
            }
          } // 15 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table15_name); i++) {
            if (eval(tMTEP3_T06autoriuscommand + i) != "" || eval(tMTEP3_T06menoSritcommand + i) != "" || eval(tMTEP3_T06pobudiscommand + i) != "" ||
              eval(tMTEP3_T06realizVietacommand + i) != "" || eval(tMTEP3_T06datacommand + i) != "" || eval(tMTEP3_T06atlygArNecommand + i) != "") {
              foundUser.destytojas.tMTEP3_T06.push({
                nr: i,
                autorius: eval(tMTEP3_T06autoriuscommand + i),
                menoSrit: eval(tMTEP3_T06menoSritcommand + i),
                pobudis: eval(tMTEP3_T06pobudiscommand + i),
                realizVieta: eval(tMTEP3_T06realizVietacommand + i),
                data: eval(tMTEP3_T06datacommand + i),
                atlygArNe: eval(tMTEP3_T06atlygArNecommand + i)
              })
            }
          } // 16 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table16_name); i++) {
            if (eval(tMTEP3_T07menoSritcommand + i) != "" || eval(tMTEP3_T07pavadinimascommand + i) != "" ||
              eval(tMTEP3_T07atlikVietacommand + i) != "" || eval(tMTEP3_T07datacommand + i) != "" ||
              eval(tMTEP3_T07atlygArNecommand + i) != "") {
              foundUser.destytojas.tMTEP3_T07.push({
                nr: eval(tMTEP3_T07nrcommand + i),
                menoSrit: eval(tMTEP3_T07menoSritcommand + i),
                pavadinimas: eval(tMTEP3_T07pavadinimascommand + i),
                atlikVieta: eval(tMTEP3_T07atlikVietacommand + i),
                data: eval(tMTEP3_T07datacommand + i),
                atlygArNe: eval(tMTEP3_T07atlygArNecommand + i)
              })
            }
          } // 17 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table17_name); i++) {
            if (eval(tMTEP3_T08menoSritcommand + i) != "" || eval(tMTEP3_T08pavadinimascommand + i) != "" ||
              eval(tMTEP3_T08atlikVietacommand + i) != "" || eval(tMTEP3_T08datacommand + i) != "" ||
              eval(tMTEP3_T08atlygArNecommand + i) != "") {
              foundUser.destytojas.tMTEP3_T08.push({
                nr: eval(tMTEP3_T08Snrcommand + i),
                menoSrit: eval(tMTEP3_T08menoSritcommand + i),
                pavadinimas: eval(tMTEP3_T08pavadinimascommand + i),
                atlikVieta: eval(tMTEP3_T08atlikVietacommand + i),
                data: eval(tMTEP3_T08datacommand + i),
                atlygArNe: eval(tMTEP3_T08atlygArNecommand + i)
              })
            }
          } // 18 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table18_name); i++) {
            if (eval(tMTEP3_T09menoSritcommand + i) != "" || eval(tMTEP3_T09pavadinimascommand + i) != "" ||
              eval(tMTEP3_T09atlikVietacommand + i) != "" || eval(tMTEP3_T09datacommand + i) != "" ||
              eval(tMTEP3_T09atlygArNecommand + i) != "") {
              foundUser.destytojas.tMTEP3_T09.push({
                nr: eval(tMTEP3_T09nrcommand + i),
                menoSrit: eval(tMTEP3_T09menoSritcommand + i),
                pavadinimas: eval(tMTEP3_T09pavadinimascommand + i),
                atlikVieta: eval(tMTEP3_T09atlikVietacommand + i),
                data: eval(tMTEP3_T09datacommand + i),
                atlygArNe: eval(tMTEP3_T09atlygArNecommand + i)
              })
            }
          } // 19 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table19_name); i++) {
            if (eval(tMTEP3_T10veiklPobudcommand + i) != "" || eval(tMTEP3_T10veiklTikslcommand + i) != "" ||
              eval(tMTEP3_T10dataVietacommand + i) != "" || eval(tMTEP3_T10dalyvSkcommand + i) != "" || eval(tMTEP3_T10ktKomentaraicommand + i) != "" ||
              eval(tMTEP3_T10atlygArNecommand + i) != "") {
              foundUser.destytojas.tMTEP3_T10.push({
                nr: eval(tMTEP3_T10nrcommand + i),
                veiklPobud: eval(tMTEP3_T10veiklPobudcommand + i),
                veiklTiksl: eval(tMTEP3_T10veiklTikslcommand + i),
                dataVieta: eval(tMTEP3_T10dataVietacommand + i),
                dalyvSk: eval(tMTEP3_T10dalyvSkcommand + i),
                ktKomentarai: eval(tMTEP3_T10ktKomentaraicommand + i),
                atlygArNe: eval(tMTEP3_T10atlygArNecommand + i)
              })
            }
          } // 20 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table20_name); i++) {
            if (eval(tMTEP3_T11veiklPobudcommand + i) != "" || eval(tMTEP3_T11veiklTikslcommand + i) != "" ||
              eval(tMTEP3_T11dataVietacommand + i) != "" || eval(tMTEP3_T11dalyvSkcommand + i) != "" || eval(tMTEP3_T11ktKomentaraicommand + i) != "" ||
              eval(tMTEP3_T11atlygArNecommand + i) != "") {
              foundUser.destytojas.tMTEP3_T11.push({
                nr: eval(tMTEP3_T11nrcommand + i),
                veiklPobud: eval(tMTEP3_T11veiklPobudcommand + i),
                veiklTiksl: eval(tMTEP3_T11veiklTikslcommand + i),
                dataVieta: eval(tMTEP3_T11dataVietacommand + i),
                dalyvSk: eval(tMTEP3_T11dalyvSkcommand + i),
                ktKomentarai: eval(tMTEP3_T11ktKomentaraicommand + i),
                atlygArNe: eval(tMTEP3_T11atlygArNecommand + i)
              })
            }
          } // 21 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table21_name); i++) {
            if (eval(tMTEP3_T12veiklPobudcommand + i) != "" || eval(tMTEP3_T12dataVietacommand + i) != "") {
              foundUser.destytojas.tMTEP3_T12.push({
                nr: eval(tMTEP3_T12nrcommand + i),
                veiklPobud: eval(tMTEP3_T12veiklPobudcommand + i),
                dataVieta: eval(tMTEP3_T12dataVietacommand + i)
              })
            }
          } // 22 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table22_name); i++) {
            if (eval(tMTEP3_T13studDuomcommand + i) != "" || eval(tMTEP3_T13renginioPavadcommand + i) != "" ||
              eval(tMTEP3_T13rezultatascommand + i) != "" || eval(tMTEP3_T13datacommand + i) != "") {
              foundUser.destytojas.tMTEP3_T13.push({
                nr: eval(tMTEP3_T13nrcommand + i),
                studDuom: eval(tMTEP3_T13studDuomcommand + i),
                renginioPavad: eval(tMTEP3_T13renginioPavadcommand + i),
                rezultatas: eval(tMTEP3_T13rezultatascommand + i),
                data: eval(tMTEP3_T13datacommand + i)
              })
            }
          } // 23 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table23_name); i++) {
            if (eval(tMTEP3_T14renginyscommand + i) != "" || eval(tMTEP3_T14veiklPobudcommand + i) != "" ||
              eval(tMTEP3_T14dataVietacommand + i) != "") {
              foundUser.destytojas.tMTEP3_T14.push({
                nr: eval(tMTEP3_T14nrcommand + i),
                renginys: eval(tMTEP3_T14renginyscommand + i),
                veiklPobud: eval(tMTEP3_T14veiklPobudcommand + i),
                dataVieta: eval(tMTEP3_T14dataVietacommand + i)
              })
            }
          } // savianalize update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.tableTMTEP3_S_name); i++) {
            if (eval(tMTEP3_Sstiprybescommand + i) != "" || eval(tMTEP3_Stobulintinacommand + i) != "") {
              foundUser.destytojas.tMTEP3_S.push({
                nr: eval(tMTEP3_Snrcommand + i),
                stiprybes: eval(tMTEP3_Sstiprybescommand + i),
                tobulintina: eval(tMTEP3_Stobulintinacommand + i)
              })
            }
          }
          foundUser.destytojas.kTOV4.kompTobulinimas_planVal = req.body.kTOV4kompTobulinimas_planVal,
            foundUser.destytojas.kTOV4.kompTobulinimas_atlVal = req.body.kTOV4kompTobulinimas_atlVal,
            foundUser.destytojas.kTOV4.organizacVeikl_planVal = req.body.kTOV4organizacVeikl_planVal,
            foundUser.destytojas.kTOV4.organizacVeikl_atlVal = req.body.kTOV4organizacVeikl_atlVal,
            foundUser.destytojas.kTOV4.isVisoValPlan = req.body.kTOV4isVisoValPlan,
            foundUser.destytojas.kTOV4.isVisoValAtl = req.body.kTOV4isVisoValAtl,
            foundUser.destytojas.kTOV4.priezastys = req.body.kTOV4priezastys
          // 24 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          //mokymosi
          for (let i = 1; i <= parseInt(req.body.table241_name); i++) {
            if (eval(kTOV4_mokymopavadcommand + i) != "" || eval(kTOV4_mokymopazymNrcommand + i) != "" ||
              eval(kTOV4_mokymotrukmeValLTcommand + i) != "" || eval(kTOV4_mokymotrukmeValNeLTcommand + i) != "") {
              foundUser.destytojas.kTOV4_KV01.kompetencijos.mokymosi.push({
                pavadinimas: eval(kTOV4_mokymopavadcommand + i),
                pazymNr: eval(kTOV4_mokymopazymNrcommand + i),
                trukmeValLT: eval(kTOV4_mokymotrukmeValLTcommand + i),
                trukmeValNeLT: eval(kTOV4_mokymotrukmeValNeLTcommand + i)
              })
              foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoMokymosiKomp = true
            }
          } // tyrimu
          for (let i = 1; i <= parseInt(req.body.table242_name); i++) {
            if (eval(kTOV4_tyrimupavadcommand + i) != "" || eval(kTOV4_tyrimupazymNrcommand + i) != "" ||
              eval(kTOV4_tyrimutrukmeValLTcommand + i) != "" || eval(kTOV4_tyrimutrukmeValNeLTcommand + i) != "") {
              foundUser.destytojas.kTOV4_KV01.kompetencijos.tyrimu.push({
                pavadinimas: eval(kTOV4_tyrimupavadcommand + i),
                pazymNr: eval(kTOV4_tyrimupazymNrcommand + i),
                trukmeValLT: eval(kTOV4_tyrimutrukmeValLTcommand + i),
                trukmeValNeLT: eval(kTOV4_tyrimutrukmeValNeLTcommand + i)
              })
              foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoTyrimuKomp = true
            }
          } //bendrosios
          for (let i = 1; i <= parseInt(req.body.table243_name); i++) {
            if (eval(kTOV4_bendrosiospavadcommand + i) != "" || eval(kTOV4_bendrosiospazymNrcommand + i) != "" ||
              eval(kTOV4_bendrosiostrukmeValLTcommand + i) != "" || eval(kTOV4_bendrosiostrukmeValNeLTcommand + i) != "") {
              foundUser.destytojas.kTOV4_KV01.kompetencijos.bendrosios.push({
                pavadinimas: eval(kTOV4_bendrosiospavadcommand + i),
                pazymNr: eval(kTOV4_bendrosiospazymNrcommand + i),
                trukmeValLT: eval(kTOV4_bendrosiostrukmeValLTcommand + i),
                trukmeValNeLT: eval(kTOV4_bendrosiostrukmeValNeLTcommand + i)
              })
              foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoBendrKomp = true
            }
          } //dalykines
          for (let i = 1; i <= parseInt(req.body.table244_name); i++) {
            if (eval(kTOV4_dalykpavadcommand + i) != "" || eval(kTOV4_dalykpazymNrcommand + i) != "" ||
              eval(kTOV4_dalyktrukmeValLTcommand + i) != "" || eval(kTOV4_dalyktrukmeValNeLTcommand + i) != "") {
              foundUser.destytojas.kTOV4_KV01.kompetencijos.dalykines.push({
                pavadinimas: eval(kTOV4_dalykpavadcommand + i),
                pazymNr: eval(kTOV4_dalykpazymNrcommand + i),
                trukmeValLT: eval(kTOV4_dalyktrukmeValLTcommand + i),
                trukmeValNeLT: eval(kTOV4_dalyktrukmeValNeLTcommand + i)
              })
              foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoDalykKomp = true
            }
          }
          foundUser.destytojas.kTOV4_KV01.kompetencijos.isVisoValLT = req.body.kTOV4_trukmeValLT,
            foundUser.destytojas.kTOV4_KV01.kompetencijos.isVisoValNeLT = req.body.kTOV4_trukmeValNeLT
          // 25 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table25_name); i++) {
            if (eval(kTOV4_25renginysTemacommand + i) != "" || eval(kTOV4_25kompGrupecommand + i) != "" ||
              eval(kTOV4_25skirtacommand + i) != "") {
              foundUser.destytojas.kTOV4_25.push({
                nr: i,
                renginysTema: eval(kTOV4_25renginysTemacommand + i),
                kompGrupe: eval(kTOV4_25kompGrupecommand + i),
                skirta: eval(kTOV4_25skirtacommand + i)
              })
            }
          } // 26 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table26_name); i++) {
            if (eval(kTOV4_26imonIstaigcommand + i) != "" || eval(kTOV4_26kompGrupecommand + i) != "" ||
              eval(kTOV4_26trukmeValcommand + i) != "" || eval(kTOV4_26datacommand + i) != "") {
              foundUser.destytojas.kTOV4_26.push({
                nr: i,
                imonIstaig: eval(kTOV4_26imonIstaigcommand + i),
                kompGrupe: eval(kTOV4_26kompGrupecommand + i),
                trukmeVal: eval(kTOV4_26trukmeValcommand + i),
                data: eval(kTOV4_26datacommand + i)
              })
            }
          } // 27 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table27_name); i++) {
            if (eval(kTOV4_KV03studKryptiscommand + i) != "" || eval(kTOV4_KV03saliscommand + i) != "" ||
              eval(kTOV4_KV03institucijacommand + i) != "" || eval(kTOV4_KV03dalykascommand + i) != "") {
              foundUser.destytojas.kTOV4_KV03.push({
                nr: eval(kTOV4_KV03nrcommand + i),
                studKryptis: eval(kTOV4_KV03studKryptiscommand + i),
                salis: eval(kTOV4_KV03saliscommand + i),
                institucija: eval(kTOV4_KV03institucijacommand + i),
                dalykas: eval(kTOV4_KV03dalykascommand + i)
              })
            }
          } // 28.1 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table281_name); i++) {
            if (eval(kTOV4_O01_1veiklPobudcommand + i) != "" || eval(kTOV4_O01_1isakNrDatacommand + i) != "") {
              foundUser.destytojas.kTOV4_O01.kTOV4_O01_1.push({
                nr: eval(kTOV4_O01_1nrcommand + i),
                veiklPobud: eval(kTOV4_O01_1veiklPobudcommand + i),
                isakNrData: eval(kTOV4_O01_1isakNrDatacommand + i)
              })
            }
          } // 28.2 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table282_name); i++) {
            if (eval(kTOV4_O01_2destytojascommand + i) != "" || eval(kTOV4_O01_2veiklPobudcommand + i) != "" ||
              eval(kTOV4_O01_2dataVietacommand + i) != "" || eval(kTOV4_O01_2ktKomentaraicommand + i) != "") {
              foundUser.destytojas.kTOV4_O01.kTOV4_O01_2.push({
                nr: eval(kTOV4_O01_2nrcommand + i),
                destytojas: eval(kTOV4_O01_2destytojascommand + i),
                veiklPobud: eval(kTOV4_O01_2veiklPobudcommand + i),
                dataVieta: eval(kTOV4_O01_2dataVietacommand + i),
                ktKomentarai: eval(kTOV4_O01_2ktKomentaraicommand + i)
              })
            }
          } // 29 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table29_name); i++) {
            if (eval(kTOV4_29veiklacommand + i) != "" || eval(kTOV4_29socPartneriscommand + i) != "") {
              foundUser.destytojas.kTOV4_29.push({
                nr: i,
                veikla: eval(kTOV4_29veiklacommand + i),
                socPartneris: eval(kTOV4_29socPartneriscommand + i)
              })
            }
          } // savianalize lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.tablekTOV4_S_name); i++) {
            if (eval(kTOV4_Sstiprybescommand + i) != "" || eval(kTOV4_Stobulintinacommand + i) != "") {
              foundUser.destytojas.kTOV4_S.push({
                nr: eval(kTOV4_Snrcommand + i),
                stiprybes: eval(kTOV4_Sstiprybescommand + i),
                tobulintina: eval(kTOV4_Stobulintinacommand + i)
              })
            }
          } // 30 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table30_name); i++) {
            if (eval(kV5_KT02studKryptiscommand + i) != "" || eval(kV5_KT02diplomantascommand + i) != "" ||
              eval(kV5_KT02studProgrcommand + i) != "" || eval(kV5_KT02darboTemacommand + i) != "") {
              foundUser.destytojas.kV5_KT02.push({
                nr: eval(kV5_KT02nrcommand + i),
                studKryptis: eval(kV5_KT02studKryptiscommand + i),
                diplomantas: eval(kV5_KT02diplomantascommand + i),
                studProgr: eval(kV5_KT02studProgrcommand + i),
                darboTema: eval(kV5_KT02darboTemacommand + i)
              })
            }
          } // 31 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table31_name); i++) {
            if (eval(kV5_KT01studKryptiscommand + i) != "" || eval(kV5_KT01diplomantascommand + i) != "" ||
              eval(kV5_KT01studProgrcommand + i) != "" || eval(kV5_KT01darboTemacommand + i) != "" ||
              eval(kV5_KT01uzsakovascommand + i) != "") {
              foundUser.destytojas.kV5_KT01.push({
                nr: eval(kV5_KT01nrcommand + i),
                studKryptis: eval(kV5_KT01studKryptiscommand + i),
                diplomantas: eval(kV5_KT01diplomantascommand + i),
                studProgr: eval(kV5_KT01studProgrcommand + i),
                darboTema: eval(kV5_KT01darboTemacommand + i),
                uzsakovas: eval(kV5_KT01uzsakovascommand + i)
              })
            }
          }
          // 32 table update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table321_name); i++) {
            if (eval(kV5_32socaprasymascommand + i) != "") {
              foundUser.destytojas.kV5_32.socAtskMaz.push({
                aprasymas: eval(kV5_32socaprasymascommand + i)
              })
            }
          }
          for (let i = 1; i <= parseInt(req.body.table322_name); i++) {
            if (eval(kV5_32aplinkaprasymascommand + i) != "") {
              foundUser.destytojas.kV5_32.aplinkosaugInic.push({
                aprasymas: eval(kV5_32aplinkaprasymascommand + i)
              })
            }
          }
          for (let i = 1; i <= parseInt(req.body.table323_name); i++) {
            if (eval(kV5_32valstybaprasymascommand + i) != "") {
              foundUser.destytojas.kV5_32.lietValstybPuosel.push({
                aprasymas: eval(kV5_32valstybaprasymascommand + i)
              })
            }
          }
          for (let i = 1; i <= parseInt(req.body.table324_name); i++) {
            if (eval(kV5_32etnoaprasymascommand + i) != "") {
              foundUser.destytojas.kV5_32.lietEtnokPuos.push({
                aprasymas: eval(kV5_32etnoaprasymascommand + i)
              })
            }
          }
          for (let i = 1; i <= parseInt(req.body.table325_name); i++) {
            if (eval(kV5_32savaprasymascommand + i) != "") {
              foundUser.destytojas.kV5_32.savanorystIniciatyv.push({
                aprasymas: eval(kV5_32savaprasymascommand + i)
              })
            }
          } // 33 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table33_name); i++) {
            if (eval(kV5_33veiklacommand + i) != "" || eval(kV5_33veiklPartnercommand + i) != "" ||
              eval(kV5_33organizaccommand + i) != "" || eval(kV5_33veiklOrientavimcommand + i) != "" ||
              eval(kV5_33dalyviaicommand + i) != "" || eval(kV5_33laikascommand + i) != "" || eval(kV5_33vietacommand + i) != "") {
              foundUser.destytojas.kV5_33.push({
                nr: i,
                veikla: eval(kV5_33veiklacommand + i),
                veiklPartner: eval(kV5_33veiklPartnercommand + i),
                organizac: eval(kV5_33organizaccommand + i),
                veiklOrientavim: eval(kV5_33veiklOrientavimcommand + i),
                dalyviai: eval(kV5_33dalyviaicommand + i),
                laikas: eval(kV5_33laikascommand + i),
                vieta: eval(kV5_33vietacommand + i)
              })
            }
          } // 34 lentelė update-report-lecturer-dep busena == "užrakintaVedėjo"
          for (let i = 1; i <= parseInt(req.body.table34_name); i++) {
            if (eval(kV5_34pavadinimascommand + i) != "" || eval(kV5_34vykdytPartnercommand + i) != "" ||
              eval(kV5_34dalyviaicommand + i) != "" || eval(kV5_34finansavimcommand + i) != "" ||
              eval(kV5_34rezultataicommand + i) != "" || eval(kV5_34salisDatacommand + i) != "") {
              foundUser.destytojas.kV5_34.push({
                nr: i,
                pavadinimas: eval(kV5_34pavadinimascommand + i),
                vykdytPartner: eval(kV5_34vykdytPartnercommand + i),
                dalyviai: eval(kV5_34dalyviaicommand + i),
                finansavim: eval(kV5_34finansavimcommand + i),
                rezultatai: eval(kV5_34rezultataicommand + i),
                salisData: eval(kV5_34salisDatacommand + i)
              })
            }
          }
          foundUser.destytojas.kV5_kitaInfo = req.body.kV5_kitaInfo,

            // vedėjas uzpildo update-report-lecturer-dep
            foundUser.destytojas.katedrosV_isvados = req.body.vedejo_katedrosV_isvados,
            foundUser.destytojas.katedrosV_rekomendacijos.kontaktD = req.body.vedejo_kontaktD,
            foundUser.destytojas.katedrosV_rekomendacijos.neKontaktD = req.body.vedejo_neKontaktD,
            foundUser.destytojas.katedrosV_rekomendacijos.tMTEP_vykdymas = req.body.vedejo_tMTEP_vykdymas,
            foundUser.destytojas.katedrosV_rekomendacijos.kompTobulinimas = req.body.vedejo_kompTobulinimas,
            foundUser.destytojas.katedrosV_rekomendacijos.kitosVeikl = req.body.vedejo_kitosVeikl,

            foundUser.busena = req.body.ataskaitos_busena
        }
        foundUser.updated_for = req.user.username

        foundUser.save(function(err) {
          if (!err) {
            res.redirect("/dep-lecturers-list");
          }
        });
      } else {
        console.log("Does'f found");
      }
    }
  });
});

//------------------ADMIN----------------------------------------
app.get("/admin-window", function(req, res) {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "administratorius") {
          res.render("admin-window", {
            user: foundUser
          });
        } else {
          console.log("You dont have permission");
          res.redirect("/login");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/admin-users-list", (req, res) => {

  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "administratorius") {
          User.find({}, function(err, users) {
            if (err) {
              console.log(err);
            } else {
              res.render("admin-users-list", {
                users: users
              });
            }
          });
        } else {
          console.log("You do not have permission");
          res.redirect("/login");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});
// Administratorius ištrina naudotoją iš DB
app.post("/delete", function(req, res) {

  User.deleteOne({
      _id: req.body.deleteById
    },
    function(err) {
      if (!err) {
        res.redirect("/admin-users-list");
      } else {
        res.send(err);
      }
    }
  );
});
// Administratorius atnaujina savo info
app.post("/update-profile-admin", function(req, res) {
  if (req.isAuthenticated()) {

    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          foundUser.vardas = req.body.vardas,
            foundUser.pavarde = req.body.pavarde,
            foundUser.updated_for = req.user.username //username- savo username paimti
          foundUser.save(function(err) {
            if (!err) {
              console.log("User info succesfully updated");
              res.redirect("/admin-window");
            } else {
              console.log(err);
            }
          });
        } else {
          console.log("User doesn't found");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/admin-edit-user/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function(err, user) {
              if (err) {
                console.log(err);
              } else {
                res.render("admin-edit-user", {
                  user: user
                });
              }
            });
          } else {
            res.redirect("/admin-window");
          }
        } else {
          res.redirect("/home");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/admin-edit-report-lec/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function(err, user) {
              if (err) {
                console.log(err);
              } else {
                res.render("admin-edit-report-lec", {
                  user: user
                });
              }
            });
          } else {
            res.redirect("/admin-window");
          }
        } else {
          res.redirect("/home");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/admin-edit-report-dep/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function(err, user) {
              if (err) {
                console.log(err);
              } else {
                res.render("admin-edit-report-dep", {
                  user: user
                });
              }
            });
          } else {
            res.redirect("/admin-window");
          }
        } else {
          res.redirect("/home");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/admin-all-user-reports/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.userId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById((reqId), function(err, user) {
              if (err) {
                console.log(err);
              } else {
                res.render("admin-all-user-reports", {
                  user: user
                });
              }
            });
          } else {
            res.redirect("/admin-window");
          }
        } else {
          res.redirect("/home");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});

// Administratorius atnaujina naudotojo info
app.post("/update-user-info-admin", (req, res) => {

  User.findById(req.body.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.vardas = req.body.vardas,
          foundUser.pavarde = req.body.pavarde,
          foundUser.username = req.body.elpastas,
          foundUser.fakultetas = req.body.fakultetas,
          foundUser.katedra = req.body.katedra,
          foundUser.role = req.body.role,
          foundUser.rolesKeitimas = req.body.rolesKeitimas,
          foundUser.busena = req.body.busena,
          foundUser.busenaVedejo = req.body.busenaVedejo,
          foundUser.updated_for = req.user.username //username- prisijungusio userio id paimti iš DB reikia username
        foundUser.save(function(err) {
          if (!err) {
            res.redirect("/admin-users-list");
          }
        });
      } else {
        console.log("Does'f found");
      }
    }
  });
});
// Administratorius atnaujina dėstytojo ataskaitą
app.post("/update-report-lec-admin", (req, res) => {

  User.findById(req.body.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        // 2 lent
        var nrcommand = "req.body.nr";
        var dalykascommand = "req.body.dalykas";
        var grupecommand = "req.body.grupe";
        var semestrascommand = "req.body.semestras";
        var planuotosValcommand = "req.body.planuotosVal";
        var atliktosValcommand = "req.body.atliktosVal";
        // 3 lent
        var nD2_M02nrcommand = "req.body.nD2_M02nr";
        var bibliografAprcommand = "req.body.bibliografApr";
        var tipascommand = "req.body.tipas";
        var mokslSritcommand = "req.body.mokslSrit";
        var mokslKryptcommand = "req.body.mokslKrypt";
        // 4 lent
        var nD2_M04nrcommand = "req.body.nD2_M04nr";
        var nD2_M04studProgrcommand = "req.body.nD2_M04studProgr";
        var nD2_M04dalykPavadcommand = "req.body.nD2_M04dalykPavad";
        var nD2_M04busenacommand = "req.body.nD2_M04busena";
        var nD2_M04apimtisKreditcommand = "req.body.nD2_M04apimtisKredit";
        // 5 lent
        var nD2_D01nrcommand = "req.body.nD2_D01nr";
        var nD2_D01komitetascommand = "req.body.nD2_D01komitetas";
        var nD2_D01veiklacommand = "req.body.nD2_D01veikla";
        var nD2_D01rezultataicommand = "req.body.nD2_D01rezultatai";
        // 6 lent
        var nD2_D02nrcommand = "req.body.nD2_D02nr";
        var nD2_D02studKryptcommand = "req.body.nD2_D02studKrypt";
        var nD2_D02veiklacommand = "req.body.nD2_D02veikla";
        var nD2_D02rezultataicommand = "req.body.nD2_D02rezultatai";
        // 7 lent
        var nD2_D03nrcommand = "req.body.nD2_D03nr";
        var nD2_D03studProgrcommand = "req.body.nD2_D03studProgr";
        var nD2_D03veiklacommand = "req.body.nD2_D03veikla";
        var nD2_D03rezultataicommand = "req.body.nD2_D03rezultatai";
        var nD2_D03studKryptiscommand = "req.body.nD2_D03studKryptis";
        // 8 lent
        var nD2_M03nrcommand = "req.body.nD2_M03nr";
        var nD2_M03studProgrcommand = "req.body.nD2_M03studProgr";
        var nD2_M03dalykPavadcommand = "req.body.nD2_M03dalykPavad";
        var nD2_M03apimtisKreditcommand = "req.body.nD2_M03apimtisKredit";
        // 9 lent
        var nD2_S01nrcommand = "req.body.nD2_S01nr";
        var nD2_S01veiklacommand = "req.body.nD2_S01veikla";
        var nD2_S01dataVietacommand = "req.body.nD2_S01dataVieta";
        // savianalize
        var nD2_Snrcommand = "req.body.nD2_Snr";
        var nD2_Sstiprybescommand = "req.body.nD2_Sstiprybes";
        var nD2_Stobulintinacommand = "req.body.nD2_Stobulintina";
        // 10 lent
        var tMTEP3_T01nrcommand = "req.body.tMTEP3_T01nr";
        var tyrTematcommand = "req.body.tyrTemat";
        var tyrGrupcommand = "req.body.tyrGrup";
        var tMTEP3_T01mokslSritcommand = "req.body.tMTEP3_T01mokslSrit";
        var tMTEP3_T01mokslKryptcommand = "req.body.tMTEP3_T01mokslKrypt";
        // 11 lent
        var tMTEP3_T02nrcommand = "req.body.tMTEP3_T02nr";
        var tMTEP3_T02bibliografAprcommand = "req.body.tMTEP3_T02bibliografApr";
        var tMTEP3_T02tipascommand = "req.body.tMTEP3_T02tipas";
        var tMTEP3_T02mokslSritcommand = "req.body.tMTEP3_T02mokslSrit";
        var tMTEP3_T02mokslKryptcommand = "req.body.tMTEP3_T02mokslKrypt";
        var tMTEP3_T02duomBazecommand = "req.body.tMTEP3_T02duomBaze";
        // 12 lent
        var tMTEP3_T03nrcommand = "req.body.tMTEP3_T03nr";
        var tMTEP3_T03pilnasBiblAprcommand = "req.body.tMTEP3_T03pilnasBiblApr";
        var tMTEP3_T03rengTipascommand = "req.body.tMTEP3_T03rengTipas";
        // 13 lent
        var tMTEP3_T04nrcommand = "req.body.tMTEP3_T04nr";
        var tMTEP3_T04uzsakovascommand = "req.body.tMTEP3_T04uzsakovas";
        var tMTEP3_T04temacommand = "req.body.tMTEP3_T04tema";
        var tMTEP3_T04datacommand = "req.body.tMTEP3_T04data";
        var tMTEP3_T04atlygArNecommand = "req.body.tMTEP3_T04atlygArNe";
        // 14.1 lent
        var tMTEP3_T05nrcommand = "req.body.tMTEP3_T05nr";
        var tMTEP3_T05veiklPavadcommand = "req.body.tMTEP3_T05veiklPavad";
        var tMTEP3_T05veiklRezultcommand = "req.body.tMTEP3_T05veiklRezult";
        var tMTEP3_T05atlygArNecommand = "req.body.tMTEP3_T05atlygArNe";
        // 14.2 lent
        var tMTEP3_142pavadinimascommand = "req.body.tMTEP3_142pavadinimas";
        var tMTEP3_142pastaboscommand = "req.body.tMTEP3_142pastabos";
        // 14.3 lent
        var tMTEP3_143pavadinimascommand = "req.body.tMTEP3_143pavadinimas";
        var tMTEP3_143uzsakovascommand = "req.body.tMTEP3_143uzsakovas";
        // 15 lent
        var tMTEP3_T06nrcommand = "req.body.tMTEP3_T06nr";
        var tMTEP3_T06autoriuscommand = "req.body.tMTEP3_T06autorius";
        var tMTEP3_T06menoSritcommand = "req.body.tMTEP3_T06menoSrit";
        var tMTEP3_T06pobudiscommand = "req.body.tMTEP3_T06pobudis";
        var tMTEP3_T06realizVietacommand = "req.body.tMTEP3_T06realizVieta";
        var tMTEP3_T06datacommand = "req.body.tMTEP3_T06data";
        var tMTEP3_T06atlygArNecommand = "req.body.tMTEP3_T06atlygArNe";
        // 16 lent
        var tMTEP3_T07nrcommand = "req.body.tMTEP3_T07nr";
        var tMTEP3_T07menoSritcommand = "req.body.tMTEP3_T07menoSrit";
        var tMTEP3_T07pavadinimascommand = "req.body.tMTEP3_T07pavadinimas";
        var tMTEP3_T07atlikVietacommand = "req.body.tMTEP3_T07atlikVieta";
        var tMTEP3_T07datacommand = "req.body.tMTEP3_T07data";
        var tMTEP3_T07atlygArNecommand = "req.body.tMTEP3_T07atlygArNe";
        // 17 lent
        var tMTEP3_T08Snrcommand = "req.body.tMTEP3_T08Snr";
        var tMTEP3_T08menoSritcommand = "req.body.tMTEP3_T08menoSrit";
        var tMTEP3_T08pavadinimascommand = "req.body.tMTEP3_T08pavadinimas";
        var tMTEP3_T08atlikVietacommand = "req.body.tMTEP3_T08atlikVieta";
        var tMTEP3_T08datacommand = "req.body.tMTEP3_T08data";
        var tMTEP3_T08atlygArNecommand = "req.body.tMTEP3_T08atlygArNe";
        // 18 lent
        var tMTEP3_T09nrcommand = "req.body.tMTEP3_T09nr";
        var tMTEP3_T09menoSritcommand = "req.body.tMTEP3_T09menoSrit";
        var tMTEP3_T09pavadinimascommand = "req.body.tMTEP3_T09pavadinimas";
        var tMTEP3_T09atlikVietacommand = "req.body.tMTEP3_T09atlikVieta";
        var tMTEP3_T09datacommand = "req.body.tMTEP3_T09data";
        var tMTEP3_T09atlygArNecommand = "req.body.tMTEP3_T09atlygArNe";
        // 19 lent
        var tMTEP3_T10nrcommand = "req.body.tMTEP3_T10nr";
        var tMTEP3_T10veiklPobudcommand = "req.body.tMTEP3_T10veiklPobud";
        var tMTEP3_T10veiklTikslcommand = "req.body.tMTEP3_T10veiklTiksl";
        var tMTEP3_T10dataVietacommand = "req.body.tMTEP3_T10dataVieta";
        var tMTEP3_T10dalyvSkcommand = "req.body.tMTEP3_T10dalyvSk";
        var tMTEP3_T10ktKomentaraicommand = "req.body.tMTEP3_T10ktKomentarai";
        var tMTEP3_T10atlygArNecommand = "req.body.tMTEP3_T10atlygArNe";
        // 20 lent
        var tMTEP3_T11nrcommand = "req.body.tMTEP3_T11nr";
        var tMTEP3_T11veiklPobudcommand = "req.body.tMTEP3_T11veiklPobud";
        var tMTEP3_T11veiklTikslcommand = "req.body.tMTEP3_T11veiklTiksl";
        var tMTEP3_T11dataVietacommand = "req.body.tMTEP3_T11dataVieta";
        var tMTEP3_T11dalyvSkcommand = "req.body.tMTEP3_T11dalyvSk";
        var tMTEP3_T11ktKomentaraicommand = "req.body.tMTEP3_T11ktKomentarai";
        var tMTEP3_T11atlygArNecommand = "req.body.tMTEP3_T11atlygArNe";
        // 21 lent
        var tMTEP3_T12nrcommand = "req.body.tMTEP3_T12nr";
        var tMTEP3_T12veiklPobudcommand = "req.body.tMTEP3_T12veiklPobud";
        var tMTEP3_T12dataVietacommand = "req.body.tMTEP3_T12dataVieta";
        // 22 lent
        var tMTEP3_T13nrcommand = "req.body.tMTEP3_T13nr";
        var tMTEP3_T13studDuomcommand = "req.body.tMTEP3_T13studDuom";
        var tMTEP3_T13renginioPavadcommand = "req.body.tMTEP3_T13renginioPavad";
        var tMTEP3_T13rezultatascommand = "req.body.tMTEP3_T13rezultatas";
        var tMTEP3_T13datacommand = "req.body.tMTEP3_T13data";
        // 23 lent
        var tMTEP3_T14nrcommand = "req.body.tMTEP3_T14nr";
        var tMTEP3_T14renginyscommand = "req.body.tMTEP3_T14renginys";
        var tMTEP3_T14veiklPobudcommand = "req.body.tMTEP3_T14veiklPobud";
        var tMTEP3_T14dataVietacommand = "req.body.tMTEP3_T14dataVieta";
        // savianalize
        var tMTEP3_Snrcommand = "req.body.tMTEP3_Snr";
        var tMTEP3_Sstiprybescommand = "req.body.tMTEP3_Sstiprybes";
        var tMTEP3_Stobulintinacommand = "req.body.tMTEP3_Stobulintina";
        // 24 lent
        //mokymosi
        var kTOV4_mokymopavadcommand = "req.body.kTOV4_mokymopavad";
        var kTOV4_mokymopazymNrcommand = "req.body.kTOV4_mokymopazymNr";
        var kTOV4_mokymotrukmeValLTcommand = "req.body.kTOV4_mokymotrukmeValLT";
        var kTOV4_mokymotrukmeValNeLTcommand = "req.body.kTOV4_mokymotrukmeValNeLT";
        // tyrimu
        var kTOV4_tyrimupavadcommand = "req.body.kTOV4_tyrimupavad";
        var kTOV4_tyrimupazymNrcommand = "req.body.kTOV4_tyrimupazymNr";
        var kTOV4_tyrimutrukmeValLTcommand = "req.body.kTOV4_tyrimutrukmeValLT";
        var kTOV4_tyrimutrukmeValNeLTcommand = "req.body.kTOV4_tyrimutrukmeValNeLT";
        //bendrosios
        var kTOV4_bendrosiospavadcommand = "req.body.kTOV4_bendrosiospavad";
        var kTOV4_bendrosiospazymNrcommand = "req.body.kTOV4_bendrosiospazymNr";
        var kTOV4_bendrosiostrukmeValLTcommand = "req.body.kTOV4_bendrosiostrukmeValLT";
        var kTOV4_bendrosiostrukmeValNeLTcommand = "req.body.kTOV4_bendrosiostrukmeValNeLT";
        //dalykines
        var kTOV4_dalykpavadcommand = "req.body.kTOV4_dalykpavad";
        var kTOV4_dalykpazymNrcommand = "req.body.kTOV4_dalykpazymNr";
        var kTOV4_dalyktrukmeValLTcommand = "req.body.kTOV4_dalyktrukmeValLT";
        var kTOV4_dalyktrukmeValNeLTcommand = "req.body.kTOV4_dalyktrukmeValNeLT";
        // 25 lent
        var kTOV4_25renginysTemacommand = "req.body.kTOV4_25renginysTema";
        var kTOV4_25kompGrupecommand = "req.body.kTOV4_25kompGrupe";
        var kTOV4_25skirtacommand = "req.body.kTOV4_25skirta";
        // 26 lent
        var kTOV4_26imonIstaigcommand = "req.body.kTOV4_26imonIstaig";
        var kTOV4_26kompGrupecommand = "req.body.kTOV4_26kompGrupe";
        var kTOV4_26trukmeValcommand = "req.body.kTOV4_26trukmeVal";
        var kTOV4_26datacommand = "req.body.kTOV4_26data";
        // 27 lent
        var kTOV4_KV03nrcommand = "req.body.kTOV4_KV03nr";
        var kTOV4_KV03studKryptiscommand = "req.body.kTOV4_KV03studKryptis";
        var kTOV4_KV03saliscommand = "req.body.kTOV4_KV03salis";
        var kTOV4_KV03institucijacommand = "req.body.kTOV4_KV03institucija";
        var kTOV4_KV03dalykascommand = "req.body.kTOV4_KV03dalykas";
        // 28.1 lent
        var kTOV4_O01_1nrcommand = "req.body.kTOV4_O01_1nr";
        var kTOV4_O01_1veiklPobudcommand = "req.body.kTOV4_O01_1veiklPobud";
        var kTOV4_O01_1isakNrDatacommand = "req.body.kTOV4_O01_1isakNrData";
        // 28.2 lent
        var kTOV4_O01_2nrcommand = "req.body.kTOV4_O01_2nr";
        var kTOV4_O01_2destytojascommand = "req.body.kTOV4_O01_2destytojas";
        var kTOV4_O01_2veiklPobudcommand = "req.body.kTOV4_O01_2veiklPobud";
        var kTOV4_O01_2dataVietacommand = "req.body.kTOV4_O01_2dataVieta";
        var kTOV4_O01_2ktKomentaraicommand = "req.body.kTOV4_O01_2ktKomentarai";
        // 29 lent
        var kTOV4_29veiklacommand = "req.body.kTOV4_29veikla";
        var kTOV4_29socPartneriscommand = "req.body.kTOV4_29socPartneris";
        // savianalize
        var kTOV4_Snrcommand = "req.body.kTOV4_Snr";
        var kTOV4_Sstiprybescommand = "req.body.kTOV4_Sstiprybes";
        var kTOV4_Stobulintinacommand = "req.body.kTOV4_Stobulintina";
        // 30 lent
        var kV5_KT02nrcommand = "req.body.kV5_KT02nr";
        var kV5_KT02studKryptiscommand = "req.body.kV5_KT02studKryptis";
        var kV5_KT02diplomantascommand = "req.body.kV5_KT02diplomantas";
        var kV5_KT02studProgrcommand = "req.body.kV5_KT02studProgr";
        var kV5_KT02darboTemacommand = "req.body.kV5_KT02darboTema";
        // 31 lent
        var kV5_KT01nrcommand = "req.body.kV5_KT01nr";
        var kV5_KT01diplomantascommand = "req.body.kV5_KT01diplomantas";
        var kV5_KT01studProgrcommand = "req.body.kV5_KT01studProgr";
        var kV5_KT01darboTemacommand = "req.body.kV5_KT01darboTema";
        var kV5_KT01uzsakovascommand = "req.body.kV5_KT01uzsakovas";
        var kV5_KT01studKryptiscommand = "req.body.kV5_KT01studKryptis";
        // 32 lent
        var kV5_32socaprasymascommand = "req.body.kV5_32socaprasymas";
        var kV5_32aplinkaprasymascommand = "req.body.kV5_32aplinkaprasymas";
        var kV5_32valstybaprasymascommand = "req.body.kV5_32valstybaprasymas";
        var kV5_32etnoaprasymascommand = "req.body.kV5_32etnoaprasymas";
        var kV5_32savaprasymascommand = "req.body.kV5_32savaprasymas";
        // 33 lent
        var kV5_33veiklacommand = "req.body.kV5_33veikla";
        var kV5_33veiklPartnercommand = "req.body.kV5_33veiklPartner";
        var kV5_33organizaccommand = "req.body.kV5_33organizac";
        var kV5_33veiklOrientavimcommand = "req.body.kV5_33veiklOrientavim";
        var kV5_33dalyviaicommand = "req.body.kV5_33dalyviai";
        var kV5_33laikascommand = "req.body.kV5_33laikas";
        var kV5_33vietacommand = "req.body.kV5_33vieta";
        // 34 lent
        var kV5_34pavadinimascommand = "req.body.kV5_34pavadinimas";
        var kV5_34vykdytPartnercommand = "req.body.kV5_34vykdytPartner";
        var kV5_34dalyviaicommand = "req.body.kV5_34dalyviai";
        var kV5_34finansavimcommand = "req.body.kV5_34finansavim";
        var kV5_34rezultataicommand = "req.body.kV5_34rezultatai";
        var kV5_34salisDatacommand = "req.body.kV5_34salisData";
        //masyvu isvalymas update-report-lec-admin
        foundUser.destytojas.kD1_K01.kD1_K01_array = new Array();
        foundUser.destytojas.nD2_M02 = new Array();
        foundUser.destytojas.nD2_M03 = new Array();
        foundUser.destytojas.nD2_M04 = new Array();
        foundUser.destytojas.nD2_D01 = new Array();
        foundUser.destytojas.nD2_D02 = new Array();
        foundUser.destytojas.nD2_D03 = new Array();
        foundUser.destytojas.nD2_S01 = new Array();
        foundUser.destytojas.nD2_S = new Array();
        foundUser.destytojas.tMTEP3_T01 = new Array();
        foundUser.destytojas.tMTEP3_T02 = new Array();
        foundUser.destytojas.tMTEP3_T03 = new Array();
        foundUser.destytojas.tMTEP3_T04 = new Array();
        foundUser.destytojas.tMTEP3_T05 = new Array();
        foundUser.destytojas.tMTEP3_142 = new Array();
        foundUser.destytojas.tMTEP3_143 = new Array();
        foundUser.destytojas.tMTEP3_T06 = new Array();
        foundUser.destytojas.tMTEP3_T07 = new Array();
        foundUser.destytojas.tMTEP3_T08 = new Array();
        foundUser.destytojas.tMTEP3_T09 = new Array();
        foundUser.destytojas.tMTEP3_T10 = new Array();
        foundUser.destytojas.tMTEP3_T11 = new Array();
        foundUser.destytojas.tMTEP3_T12 = new Array();
        foundUser.destytojas.tMTEP3_T13 = new Array();
        foundUser.destytojas.tMTEP3_T14 = new Array();
        foundUser.destytojas.tMTEP3_S = new Array();
        //24 lentelė
        foundUser.destytojas.kTOV4_KV01.kompetencijos.mokymosi = new Array();
        foundUser.destytojas.kTOV4_KV01.kompetencijos.tyrimu = new Array();
        foundUser.destytojas.kTOV4_KV01.kompetencijos.bendrosios = new Array();
        foundUser.destytojas.kTOV4_KV01.kompetencijos.dalykines = new Array();
        // UPDATE post. Skaiciui "dalyvavusiu" nustatyti Vedejo ataskaitoje
        foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoMokymosiKomp = false;
        foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoTyrimuKomp = false;
        foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoBendrKomp = false;
        foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoDalykKomp = false;

        foundUser.destytojas.kTOV4_25 = new Array();
        foundUser.destytojas.kTOV4_26 = new Array();
        foundUser.destytojas.kTOV4_KV03 = new Array();
        foundUser.destytojas.kTOV4_O01.kTOV4_O01_1 = new Array();
        foundUser.destytojas.kTOV4_O01.kTOV4_O01_2 = new Array();
        foundUser.destytojas.kTOV4_29 = new Array();
        foundUser.destytojas.kTOV4_S = new Array();
        foundUser.destytojas.kV5_KT01 = new Array();
        foundUser.destytojas.kV5_KT02 = new Array();
        //32 lentelė
        foundUser.destytojas.kV5_32.socAtskMaz = new Array();
        foundUser.destytojas.kV5_32.aplinkosaugInic = new Array();
        foundUser.destytojas.kV5_32.lietValstybPuosel = new Array();
        foundUser.destytojas.kV5_32.lietEtnokPuos = new Array();
        foundUser.destytojas.kV5_32.savanorystIniciatyv = new Array();

        foundUser.destytojas.kV5_33 = new Array();
        foundUser.destytojas.kV5_34 = new Array();

        // 2 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table2_name); i++) {
          foundUser.destytojas.kD1_K01.kD1_K01_array.push({
            nr: eval(nrcommand + i),
            dalykas: eval(dalykascommand + i),
            grupe: eval(grupecommand + i),
            semestras: eval(semestrascommand + i),
            planuotosVal: eval(planuotosValcommand + i),
            atliktosVal: eval(atliktosValcommand + i)
          })
        }
        foundUser.destytojas.kD1_K01.isVisoValPlan = req.body.kD1_K01isVisoValPlan,
          foundUser.destytojas.kD1_K01.isVisoValAtl = req.body.kD1_K01isVisoValAtl,
          foundUser.destytojas.kD1_K01.isJuSrautaisValPlan = req.body.isJuSrautaisValPlan,
          foundUser.destytojas.kD1_K01.isJuSrautaisValAtl = req.body.isJuSrautaisValAtl,
          foundUser.destytojas.kD1_K01.isJuUzsienioValPlan = req.body.isJuUzsienioValPlan,
          foundUser.destytojas.kD1_K01.isJuUzsienioValAtl = req.body.isJuUzsienioValAtl,
          foundUser.destytojas.kD1_K01.priezastys = req.body.kD1_K01priezastys,

          foundUser.destytojas.nD2.nekSuStud_planVal = req.body.nekSuStud_planVal,
          foundUser.destytojas.nD2.nekSuStud_atlVal = req.body.nekSuStud_atlVal,
          foundUser.destytojas.nD2.pasirengDest_planVal = req.body.pasirengDest_planVal,
          foundUser.destytojas.nD2.pasirengDest_atlVal = req.body.pasirengDest_atlVal,
          foundUser.destytojas.nD2.metod_planVal = req.body.metod_planVal,
          foundUser.destytojas.nD2.metod_atlVal = req.body.metod_atlVal,
          foundUser.destytojas.nD2.dalyvSPKUV_planVal = req.body.dalyvSPKUV_planVal,
          foundUser.destytojas.nD2.dalyvSPKUV_atlVal = req.body.dalyvSPKUV_atlVal,
          foundUser.destytojas.nD2.studPop_planVal = req.body.studPop_planVal,
          foundUser.destytojas.nD2.studPop_atlVal = req.body.studPop_atlVal,
          foundUser.destytojas.nD2.isVisoValPlan = req.body.nD2isVisoValPlan,
          foundUser.destytojas.nD2.isVisoValAtl = req.body.nD2isVisoValAtl,
          foundUser.destytojas.nD2.priezastys = req.body.nD2priezastys
        // 3 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table3_name); i++) {
          foundUser.destytojas.nD2_M02.push({
            nr: eval(nrcommand + i),
            bibliografApr: eval(bibliografAprcommand + i),
            tipas: eval(tipascommand + i),
            mokslSrit: eval(mokslSritcommand + i),
            mokslKrypt: eval(mokslKryptcommand + i)
          })
        } // 4 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table4_name); i++) {
          foundUser.destytojas.nD2_M04.push({
            nr: eval(nD2_M04nrcommand + i),
            studProgr: eval(nD2_M04studProgrcommand + i),
            dalykPavad: eval(nD2_M04dalykPavadcommand + i),
            busena: eval(nD2_M04busenacommand + i),
            apimtisKredit: eval(nD2_M04apimtisKreditcommand + i)
          })
        } // 5 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table5_name); i++) {
          foundUser.destytojas.nD2_D01.push({
            nr: eval(nD2_D01nrcommand + i),
            komitetas: eval(nD2_D01komitetascommand + i),
            veikla: eval(nD2_D01veiklacommand + i),
            rezultatai: eval(nD2_D01rezultataicommand + i)
          })
        } // 6 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table6_name); i++) {
          foundUser.destytojas.nD2_D02.push({
            nr: eval(nD2_D02nrcommand + i),
            studKryptis: eval(nD2_D02studKryptcommand + i),
            veikla: eval(nD2_D02veiklacommand + i),
            rezultatai: eval(nD2_D02rezultataicommand + i)
          })
        } // 7 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table7_name); i++) {
          foundUser.destytojas.nD2_D03.push({
            nr: eval(nD2_D03nrcommand + i),
            studKryptis: eval(nD2_D03studKryptiscommand + i),
            studProgr: eval(nD2_D03studProgrcommand + i),
            veikla: eval(nD2_D03veiklacommand + i),
            rezultatai: eval(nD2_D03rezultataicommand + i)
          })
        } // 8 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table8_name); i++) {
          foundUser.destytojas.nD2_M03.push({
            nr: eval(nD2_M03nrcommand + i),
            studProgr: eval(nD2_M03studProgrcommand + i),
            dalykPavad: eval(nD2_M03dalykPavadcommand + i),
            apimtisKredit: eval(nD2_M03apimtisKreditcommand + i)
          })
        } // 9 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table9_name); i++) {
          foundUser.destytojas.nD2_S01.push({
            nr: eval(nD2_S01nrcommand + i),
            veikla: eval(nD2_S01veiklacommand + i),
            dataVieta: eval(nD2_S01dataVietacommand + i)
          })
        } // savianalize
        for (let i = 1; i <= parseInt(req.body.tablenD2_S_name); i++) {
          foundUser.destytojas.nD2_S.push({
            nr: eval(nD2_Snrcommand + i),
            stiprybes: eval(nD2_Sstiprybescommand + i),
            tobulintina: eval(nD2_Stobulintinacommand + i)
          })
        }
        foundUser.destytojas.tMTEP3.tMTEPveiklRez_planVal = req.body.tMTEPveiklRez_planVal,
          foundUser.destytojas.tMTEP3.tMTEPveiklRez_atlVal = req.body.tMTEPveiklRez_atlVal,
          foundUser.destytojas.tMTEP3.menoVeikl_planVal = req.body.menoVeikl_planVal,
          foundUser.destytojas.tMTEP3.menoVeikl_atlVal = req.body.menoVeikl_atlVal,
          foundUser.destytojas.tMTEP3.tMTEPmenoVeiklPop_planVal = req.body.tMTEPmenoVeiklPop_planVal,
          foundUser.destytojas.tMTEP3.tMTEPmenoVeiklPop_atlVal = req.body.tMTEPmenoVeiklPop_atlVal,
          foundUser.destytojas.tMTEP3.studReng_planVal = req.body.studReng_planVal,
          foundUser.destytojas.tMTEP3.studReng_atlVal = req.body.studReng_atlVal,
          foundUser.destytojas.tMTEP3.kitaVeikl_planVal = req.body.kitaVeikl_planVal,
          foundUser.destytojas.tMTEP3.kitaVeikl_atlVal = req.body.kitaVeikl_atlVal,
          foundUser.destytojas.tMTEP3.isVisoValPlan = req.body.tMTEP3isVisoValPlan,
          foundUser.destytojas.tMTEP3.isVisoValAtl = req.body.tMTEP3isVisoValAtl,
          foundUser.destytojas.tMTEP3.priezastys = req.body.tMTEP3priezastys
        // 10 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table10_name); i++) {
          foundUser.destytojas.tMTEP3_T01.push({
            nr: eval(tMTEP3_T01nrcommand + i),
            tyrTemat: eval(tyrTematcommand + i),
            tyrGrup: eval(tyrGrupcommand + i),
            mokslSrit: eval(tMTEP3_T01mokslSritcommand + i),
            mokslKrypt: eval(tMTEP3_T01mokslKryptcommand + i)
          })
        } // 11 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table11_name); i++) {
          foundUser.destytojas.tMTEP3_T02.push({
            nr: eval(tMTEP3_T02nrcommand + i),
            bibliografApr: eval(tMTEP3_T02bibliografAprcommand + i),
            tipas: eval(tMTEP3_T02tipascommand + i),
            mokslSrit: eval(tMTEP3_T02mokslSritcommand + i),
            mokslKrypt: eval(tMTEP3_T02mokslKryptcommand + i),
            duomBaze: eval(tMTEP3_T02duomBazecommand + i)
          })
        } // 12 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table12_name); i++) {
          foundUser.destytojas.tMTEP3_T03.push({
            nr: eval(tMTEP3_T03nrcommand + i),
            pilnasBiblApr: eval(tMTEP3_T03pilnasBiblAprcommand + i),
            rengTipas: eval(tMTEP3_T03rengTipascommand + i)
          })
        } // 13 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table13_name); i++) {
          foundUser.destytojas.tMTEP3_T04.push({
            nr: eval(tMTEP3_T04nrcommand + i),
            uzsakovas: eval(tMTEP3_T04uzsakovascommand + i),
            tema: eval(tMTEP3_T04temacommand + i),
            data: eval(tMTEP3_T04datacommand + i),
            atlygArNe: eval(tMTEP3_T04atlygArNecommand + i)
          })
        } // 14.1 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table141_name); i++) {
          foundUser.destytojas.tMTEP3_T05.push({
            nr: eval(tMTEP3_T05nrcommand + i),
            veiklPavad: eval(tMTEP3_T05veiklPavadcommand + i),
            veiklRezult: eval(tMTEP3_T05veiklRezultcommand + i),
            atlygArNe: eval(tMTEP3_T05atlygArNecommand + i)
          })
        } // 14.2 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table142_name); i++) {
          foundUser.destytojas.tMTEP3_142.push({
            nr: i,
            pavadinimas: eval(tMTEP3_142pavadinimascommand + i),
            pastabos: eval(tMTEP3_142pastaboscommand + i)
          })
        } // 14.3 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table143_name); i++) {
          foundUser.destytojas.tMTEP3_143.push({
            nr: i,
            pavadinimas: eval(tMTEP3_143pavadinimascommand + i),
            uzsakovas: eval(tMTEP3_143uzsakovascommand + i)
          })
        } // 15 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table15_name); i++) {
          foundUser.destytojas.tMTEP3_T06.push({
            nr: i,
            autorius: eval(tMTEP3_T06autoriuscommand + i),
            menoSrit: eval(tMTEP3_T06menoSritcommand + i),
            pobudis: eval(tMTEP3_T06pobudiscommand + i),
            realizVieta: eval(tMTEP3_T06realizVietacommand + i),
            data: eval(tMTEP3_T06datacommand + i),
            atlygArNe: eval(tMTEP3_T06atlygArNecommand + i)
          })
        } // 16 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table16_name); i++) {
          foundUser.destytojas.tMTEP3_T07.push({
            nr: eval(tMTEP3_T07nrcommand + i),
            menoSrit: eval(tMTEP3_T07menoSritcommand + i),
            pavadinimas: eval(tMTEP3_T07pavadinimascommand + i),
            atlikVieta: eval(tMTEP3_T07atlikVietacommand + i),
            data: eval(tMTEP3_T07datacommand + i),
            atlygArNe: eval(tMTEP3_T07atlygArNecommand + i)
          })
        } // 17 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table17_name); i++) {
          foundUser.destytojas.tMTEP3_T08.push({
            nr: eval(tMTEP3_T08Snrcommand + i),
            menoSrit: eval(tMTEP3_T08menoSritcommand + i),
            pavadinimas: eval(tMTEP3_T08pavadinimascommand + i),
            atlikVieta: eval(tMTEP3_T08atlikVietacommand + i),
            data: eval(tMTEP3_T08datacommand + i),
            atlygArNe: eval(tMTEP3_T08atlygArNecommand + i)
          })
        } // 18 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table18_name); i++) {
          foundUser.destytojas.tMTEP3_T09.push({
            nr: eval(tMTEP3_T09nrcommand + i),
            menoSrit: eval(tMTEP3_T09menoSritcommand + i),
            pavadinimas: eval(tMTEP3_T09pavadinimascommand + i),
            atlikVieta: eval(tMTEP3_T09atlikVietacommand + i),
            data: eval(tMTEP3_T09datacommand + i),
            atlygArNe: eval(tMTEP3_T09atlygArNecommand + i)
          })
        } // 19 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table19_name); i++) {
          foundUser.destytojas.tMTEP3_T10.push({
            nr: eval(tMTEP3_T10nrcommand + i),
            veiklPobud: eval(tMTEP3_T10veiklPobudcommand + i),
            veiklTiksl: eval(tMTEP3_T10veiklTikslcommand + i),
            dataVieta: eval(tMTEP3_T10dataVietacommand + i),
            dalyvSk: eval(tMTEP3_T10dalyvSkcommand + i),
            ktKomentarai: eval(tMTEP3_T10ktKomentaraicommand + i),
            atlygArNe: eval(tMTEP3_T10atlygArNecommand + i)
          })
        } // 20 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table20_name); i++) {
          foundUser.destytojas.tMTEP3_T11.push({
            nr: eval(tMTEP3_T11nrcommand + i),
            veiklPobud: eval(tMTEP3_T11veiklPobudcommand + i),
            veiklTiksl: eval(tMTEP3_T11veiklTikslcommand + i),
            dataVieta: eval(tMTEP3_T11dataVietacommand + i),
            dalyvSk: eval(tMTEP3_T11dalyvSkcommand + i),
            ktKomentarai: eval(tMTEP3_T11ktKomentaraicommand + i),
            atlygArNe: eval(tMTEP3_T11atlygArNecommand + i)
          })
        } // 21 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table21_name); i++) {
          foundUser.destytojas.tMTEP3_T12.push({
            nr: eval(tMTEP3_T12nrcommand + i),
            veiklPobud: eval(tMTEP3_T12veiklPobudcommand + i),
            dataVieta: eval(tMTEP3_T12dataVietacommand + i)
          })
        } // 22 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table22_name); i++) {
          foundUser.destytojas.tMTEP3_T13.push({
            nr: eval(tMTEP3_T13nrcommand + i),
            studDuom: eval(tMTEP3_T13studDuomcommand + i),
            renginioPavad: eval(tMTEP3_T13renginioPavadcommand + i),
            rezultatas: eval(tMTEP3_T13rezultatascommand + i),
            data: eval(tMTEP3_T13datacommand + i)
          })
        } // 23 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table23_name); i++) {
          foundUser.destytojas.tMTEP3_T14.push({
            nr: eval(tMTEP3_T14nrcommand + i),
            renginys: eval(tMTEP3_T14renginyscommand + i),
            veiklPobud: eval(tMTEP3_T14veiklPobudcommand + i),
            dataVieta: eval(tMTEP3_T14dataVietacommand + i)
          })
        } // savianalize
        for (let i = 1; i <= parseInt(req.body.tableTMTEP3_S_name); i++) {
          foundUser.destytojas.tMTEP3_S.push({
            nr: eval(tMTEP3_Snrcommand + i),
            stiprybes: eval(tMTEP3_Sstiprybescommand + i),
            tobulintina: eval(tMTEP3_Stobulintinacommand + i)
          })
        }
        foundUser.destytojas.kTOV4.kompTobulinimas_planVal = req.body.kTOV4kompTobulinimas_planVal,
          foundUser.destytojas.kTOV4.kompTobulinimas_atlVal = req.body.kTOV4kompTobulinimas_atlVal,
          foundUser.destytojas.kTOV4.organizacVeikl_planVal = req.body.kTOV4organizacVeikl_planVal,
          foundUser.destytojas.kTOV4.organizacVeikl_atlVal = req.body.kTOV4organizacVeikl_atlVal,
          foundUser.destytojas.kTOV4.isVisoValPlan = req.body.kTOV4isVisoValPlan,
          foundUser.destytojas.kTOV4.isVisoValAtl = req.body.kTOV4isVisoValAtl,
          foundUser.destytojas.kTOV4.priezastys = req.body.kTOV4priezastys
        // 24 lentelė update-report-lec-admin
        //mokymosi prekes
        for (let i = 1; i <= parseInt(req.body.table241_name); i++) {
          foundUser.destytojas.kTOV4_KV01.kompetencijos.mokymosi.push({
            pavadinimas: eval(kTOV4_mokymopavadcommand + i),
            pazymNr: eval(kTOV4_mokymopazymNrcommand + i),
            trukmeValLT: eval(kTOV4_mokymotrukmeValLTcommand + i),
            trukmeValNeLT: eval(kTOV4_mokymotrukmeValNeLTcommand + i)
          })
          foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoMokymosiKomp = true
        } // tyrimu
        for (let i = 1; i <= parseInt(req.body.table242_name); i++) {
          foundUser.destytojas.kTOV4_KV01.kompetencijos.tyrimu.push({
            pavadinimas: eval(kTOV4_tyrimupavadcommand + i),
            pazymNr: eval(kTOV4_tyrimupazymNrcommand + i),
            trukmeValLT: eval(kTOV4_tyrimutrukmeValLTcommand + i),
            trukmeValNeLT: eval(kTOV4_tyrimutrukmeValNeLTcommand + i)
          })
          foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoTyrimuKomp = true
        } //bendrosios
        for (let i = 1; i <= parseInt(req.body.table243_name); i++) {
          foundUser.destytojas.kTOV4_KV01.kompetencijos.bendrosios.push({
            pavadinimas: eval(kTOV4_bendrosiospavadcommand + i),
            pazymNr: eval(kTOV4_bendrosiospazymNrcommand + i),
            trukmeValLT: eval(kTOV4_bendrosiostrukmeValLTcommand + i),
            trukmeValNeLT: eval(kTOV4_bendrosiostrukmeValNeLTcommand + i)
          })
          foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoBendrKomp = true
        } //dalykines
        for (let i = 1; i <= parseInt(req.body.table244_name); i++) {
          foundUser.destytojas.kTOV4_KV01.kompetencijos.dalykines.push({
            pavadinimas: eval(kTOV4_dalykpavadcommand + i),
            pazymNr: eval(kTOV4_dalykpazymNrcommand + i),
            trukmeValLT: eval(kTOV4_dalyktrukmeValLTcommand + i),
            trukmeValNeLT: eval(kTOV4_dalyktrukmeValNeLTcommand + i)
          })
          foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoDalykKomp = true
        }
        foundUser.destytojas.kTOV4_KV01.kompetencijos.isVisoValLT = req.body.kTOV4_trukmeValLT,
          foundUser.destytojas.kTOV4_KV01.kompetencijos.isVisoValNeLT = req.body.kTOV4_trukmeValNeLT
        // 25 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table25_name); i++) {
          foundUser.destytojas.kTOV4_25.push({
            nr: i,
            renginysTema: eval(kTOV4_25renginysTemacommand + i),
            kompGrupe: eval(kTOV4_25kompGrupecommand + i),
            skirta: eval(kTOV4_25skirtacommand + i)
          })
        } // 26 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table26_name); i++) {
          foundUser.destytojas.kTOV4_26.push({
            nr: i,
            imonIstaig: eval(kTOV4_26imonIstaigcommand + i),
            kompGrupe: eval(kTOV4_26kompGrupecommand + i),
            trukmeVal: eval(kTOV4_26trukmeValcommand + i),
            data: eval(kTOV4_26datacommand + i)
          })
        } // 27 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table27_name); i++) {
          foundUser.destytojas.kTOV4_KV03.push({
            nr: eval(kTOV4_KV03nrcommand + i),
            studKryptis: eval(kTOV4_KV03studKryptiscommand + i),
            salis: eval(kTOV4_KV03saliscommand + i),
            institucija: eval(kTOV4_KV03institucijacommand + i),
            dalykas: eval(kTOV4_KV03dalykascommand + i)
          })
        } // 28.1 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table281_name); i++) {
          foundUser.destytojas.kTOV4_O01.kTOV4_O01_1.push({
            nr: eval(kTOV4_O01_1nrcommand + i),
            veiklPobud: eval(kTOV4_O01_1veiklPobudcommand + i),
            isakNrData: eval(kTOV4_O01_1isakNrDatacommand + i)
          })
        } // 28.2 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table282_name); i++) {
          foundUser.destytojas.kTOV4_O01.kTOV4_O01_2.push({
            nr: eval(kTOV4_O01_2nrcommand + i),
            destytojas: eval(kTOV4_O01_2destytojascommand + i),
            veiklPobud: eval(kTOV4_O01_2veiklPobudcommand + i),
            dataVieta: eval(kTOV4_O01_2dataVietacommand + i),
            ktKomentarai: eval(kTOV4_O01_2ktKomentaraicommand + i)
          })
        } // 29 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table29_name); i++) {
          foundUser.destytojas.kTOV4_29.push({
            nr: i,
            veikla: eval(kTOV4_29veiklacommand + i),
            socPartneris: eval(kTOV4_29socPartneriscommand + i)
          })
        } // savianalize
        for (let i = 1; i <= parseInt(req.body.tablekTOV4_S_name); i++) {
          foundUser.destytojas.kTOV4_S.push({
            nr: eval(kTOV4_Snrcommand + i),
            stiprybes: eval(kTOV4_Sstiprybescommand + i),
            tobulintina: eval(kTOV4_Stobulintinacommand + i)
          })
        } // 30 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table30_name); i++) {
          foundUser.destytojas.kV5_KT02.push({
            nr: eval(kV5_KT02nrcommand + i),
            studKryptis: eval(kV5_KT02studKryptiscommand + i),
            diplomantas: eval(kV5_KT02diplomantascommand + i),
            studProgr: eval(kV5_KT02studProgrcommand + i),
            darboTema: eval(kV5_KT02darboTemacommand + i)
          })
        } // 31 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table31_name); i++) {
          foundUser.destytojas.kV5_KT01.push({
            nr: eval(kV5_KT01nrcommand + i),
            studKryptis: eval(kV5_KT01studKryptiscommand + i),
            diplomantas: eval(kV5_KT01diplomantascommand + i),
            studProgr: eval(kV5_KT01studProgrcommand + i),
            darboTema: eval(kV5_KT01darboTemacommand + i),
            uzsakovas: eval(kV5_KT01uzsakovascommand + i)
          })
        } // 32 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table321_name); i++) {
          foundUser.destytojas.kV5_32.socAtskMaz.push({
            aprasymas: eval(kV5_32socaprasymascommand + i)
          })
        }
        for (let i = 1; i <= parseInt(req.body.table322_name); i++) {
          foundUser.destytojas.kV5_32.aplinkosaugInic.push({
            aprasymas: eval(kV5_32aplinkaprasymascommand + i)
          })
        }
        for (let i = 1; i <= parseInt(req.body.table323_name); i++) {
          foundUser.destytojas.kV5_32.lietValstybPuosel.push({
            aprasymas: eval(kV5_32valstybaprasymascommand + i)
          })
        }
        for (let i = 1; i <= parseInt(req.body.table324_name); i++) {
          foundUser.destytojas.kV5_32.lietEtnokPuos.push({
            aprasymas: eval(kV5_32etnoaprasymascommand + i)
          })
        }
        for (let i = 1; i <= parseInt(req.body.table325_name); i++) {
          foundUser.destytojas.kV5_32.savanorystIniciatyv.push({
            aprasymas: eval(kV5_32savaprasymascommand + i)
          })
        } // 33 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table33_name); i++) {
          foundUser.destytojas.kV5_33.push({
            nr: i,
            veikla: eval(kV5_33veiklacommand + i),
            veiklPartner: eval(kV5_33veiklPartnercommand + i),
            organizac: eval(kV5_33organizaccommand + i),
            veiklOrientavim: eval(kV5_33veiklOrientavimcommand + i),
            dalyviai: eval(kV5_33dalyviaicommand + i),
            laikas: eval(kV5_33laikascommand + i),
            vieta: eval(kV5_33vietacommand + i)
          })
        } // 34 lentelė update-report-lec-admin
        for (let i = 1; i <= parseInt(req.body.table34_name); i++) {
          foundUser.destytojas.kV5_34.push({
            nr: i,
            pavadinimas: eval(kV5_34pavadinimascommand + i),
            vykdytPartner: eval(kV5_34vykdytPartnercommand + i),
            dalyviai: eval(kV5_34dalyviaicommand + i),
            finansavim: eval(kV5_34finansavimcommand + i),
            rezultatai: eval(kV5_34rezultataicommand + i),
            salisData: eval(kV5_34salisDatacommand + i)
          })
        }
        foundUser.destytojas.kV5_kitaInfo = req.body.kV5_kitaInfo,

          // vedėjo uzpildyta update-report-lec-admin
          foundUser.destytojas.katedrosV_isvados = req.body.vedejo_katedrosV_isvados,
          foundUser.destytojas.katedrosV_rekomendacijos.kontaktD = req.body.vedejo_kontaktD,
          foundUser.destytojas.katedrosV_rekomendacijos.neKontaktD = req.body.vedejo_neKontaktD,
          foundUser.destytojas.katedrosV_rekomendacijos.tMTEP_vykdymas = req.body.vedejo_tMTEP_vykdymas,
          foundUser.destytojas.katedrosV_rekomendacijos.kompTobulinimas = req.body.vedejo_kompTobulinimas,
          foundUser.destytojas.katedrosV_rekomendacijos.kitosVeikl = req.body.vedejo_kitosVeikl,

          foundUser.updated_for = req.user.username

        foundUser.save(function(err) {
          if (!err) {
            console.log("Succesfully  updated");
            res.redirect("/admin-users-list");
          }
        });
      } else {
        console.log("Does'f found");
      }
    }
  });
});
// Administratorius atnaujina katedros vedėjo ataskaitą
app.post("/update-report-dep-admin", (req, res) => {
  User.findById(req.body.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        // 1 lentelė
        var mV2_D04nrcommand = "req.body.mV2_D04nr";
        var mV2_D04studKryptiscommand = "req.body.mV2_D04studKryptis";
        var mV2_D04studProgrcommand = "req.body.mV2_D04studProgr";
        var mV2_D04progrKodascommand = "req.body.mV2_D04progrKodas";
        var mV2_D04isakNrDatacommand = "req.body.mV2_D04isakNrData";
        var mV2_D04studKryptAkreditcommand = "req.body.mV2_D04studKryptAkredit";
        var mV2_D04akreditLaikotcommand = "req.body.mV2_D04akreditLaikot";
        var mV2_D04eCTS1command = "req.body.mV2_D04eCTS";
        // 2 lent
        var lent2_nrcommand = "req.body.lent2_nr";
        var lent2_pavVardcommand = "req.body.lent2_pavVard";
        var lent2_pareigoscommand = "req.body.lent2_pareigos";
        var lent2_darbovTipascommand = "req.body.lent2_darbovTipas";
        var lent2_pedagogStazascommand = "req.body.lent2_pedagogStazas";
        var lent2_praktinStazascommand = "req.body.lent2_praktinStazas";
        //3 lent
        var lent3_nrcommand = "req.body.lent3_nr";
        var lent3_studKryptiscommand = "req.body.lent3_studKryptis";
        var lent3_studProgrcommand = "req.body.lent3_studProgr";
        var lent3_destytojascommand = "req.body.lent3_destytojas";
        var lent3_imonIstaigcommand = "req.body.lent3_imonIstaig";
        // 4 lent
        var lent4_nrcommand = "req.body.lent4_nr";
        var lent4_bibliografAprcommand = "req.body.lent4_bibliografApr";
        var lent4_tipascommand = "req.body.lent4_tipas";
        var lent4_mokslSritcommand = "req.body.lent4_mokslSrit";
        var lent4_mokslKryptcommand = "req.body.lent4_mokslKrypt";
        // 5 lent
        var mV2_M04nrcommand = "req.body.mV2_M04nr";
        var mV2_M04destytojascommand = "req.body.mV2_M04destytojas";
        var mV2_M04studProgrcommand = "req.body.mV2_M04studProgr";
        var mV2_M04dalykPavadcommand = "req.body.mV2_M04dalykPavad";
        var mV2_M04apimtisKreditcommand = "req.body.mV2_M04apimtisKredit";
        var mV2_M04busenacommand = "req.body.mV2_M04busena";
        // 6 lent
        var mV2_D06nrcommand = "req.body.mV2_D06nr";
        var mV2_D06studProgrcommand = "req.body.mV2_D06studProgr";
        var mV2_D06progrKodascommand = "req.body.mV2_D06progrKodas";
        var mV2_D06atlPatobulincommand = "req.body.mV2_D06atlPatobulin";
        var mV2_D06tobulinPriezastcommand = "req.body.mV2_D06tobulinPriezast";
        var mV2_D06tobulinIrodcommand = "req.body.mV2_D06tobulinIrod";
        // 7 lent
        var mV2_D01nrcommand = "req.body.mV2_D01nr";
        var mV2_D01destytojascommand = "req.body.mV2_D01destytojas";
        var mV2_D01komitetascommand = "req.body.mV2_D01komitetas";
        var mV2_D01veiklacommand = "req.body.mV2_D01veikla";
        var mV2_D01rezultataicommand = "req.body.mV2_D01rezultatai";
        //8 lent
        var mV2_D02nrcommand = "req.body.mV2_D02nr";
        var mV2_D02destytojascommand = "req.body.mV2_D02destytojas";
        var mV2_D02studKryptcommand = "req.body.mV2_D02studKrypt";
        var mV2_D02veiklacommand = "req.body.mV2_D02veikla";
        var mV2_D02rezultataicommand = "req.body.mV2_D02rezultatai";
        //9 lent
        var mV2_D03nrcommand = "req.body.mV2_D03nr";
        var mV2_D03destytojascommand = "req.body.mV2_D03destytojas";
        var mV2_D03studKryptiscommand = "req.body.mV2_D03studKryptis";
        var mV2_D03studProgrcommand = "req.body.mV2_D03studProgr";
        var mV2_D03veiklacommand = "req.body.mV2_D03veikla";
        var mV2_D03rezultataicommand = "req.body.mV2_D03rezultatai";
        // 10 lent
        var mV2_M03nrcommand = "req.body.mV2_M03nr";
        var mV2_M03destytojascommand = "req.body.mV2_M03destytojas";
        var mV2_M03studProgrcommand = "req.body.mV2_M03studProgr";
        var mV2_M03dalykPavadcommand = "req.body.mV2_M03dalykPavad";
        var mV2_M03apimtisKreditcommand = "req.body.mV2_M03apimtisKredit";
        //11 lent
        var mV2_S01nrcommand = "req.body.mV2_S01nr";
        var mV2_S01destytojascommand = "req.body.mV2_S01destytojas";
        var mV2_S01veiklacommand = "req.body.mV2_S01veikla";
        var mV2_S01dataVietacommand = "req.body.mV2_S01dataVieta";
        //mV2_S
        var mV2_Snrcommand = "req.body.mV2_Snr";
        var mV2_Sstiprybescommand = "req.body.mV2_Sstiprybes";
        var mV2_Stobulintinacommand = "req.body.mV2_Stobulintina";
        // 12 lent
        var tMTEP3_T01nrcommand = "req.body.tMTEP3_T01nr";
        var tMTEP3_T01tyrTematcommand = "req.body.tMTEP3_T01tyrTemat";
        var tMTEP3_T01destytojascommand = "req.body.tMTEP3_T01destytojas";
        var tMTEP3_T01tyrGrupcommand = "req.body.tMTEP3_T01tyrGrup";
        var tMTEP3_T01mokslSritcommand = "req.body.tMTEP3_T01mokslSrit";
        var tMTEP3_T01mokslKryptcommand = "req.body.tMTEP3_T01mokslKrypt";
        // 13 lent
        var tMTEP3_T02nrcommand = "req.body.tMTEP3_T02nr";
        var tMTEP3_T02bibliografAprcommand = "req.body.tMTEP3_T02bibliografApr";
        var tMTEP3_T02tipascommand = "req.body.tMTEP3_T02tipas";
        var tMTEP3_T02mokslSritcommand = "req.body.tMTEP3_T02mokslSrit";
        var tMTEP3_T02mokslKryptcommand = "req.body.tMTEP3_T02mokslKrypt";
        var tMTEP3_T02duomBazecommand = "req.body.tMTEP3_T02duomBaze";
        //14 lent
        var tMTEP3_T03nrcommand = "req.body.tMTEP3_T03nr";
        var tMTEP3_T03pilnasBiblAprcommand = "req.body.tMTEP3_T03pilnasBiblApr";
        var tMTEP3_T03rengTipascommand = "req.body.tMTEP3_T03rengTipas";
        //15 lent
        var tMTEP3_T04nrcommand = "req.body.tMTEP3_T04nr";
        var tMTEP3_T04konsultantascommand = "req.body.tMTEP3_T04konsultantas";
        var tMTEP3_T04uzsakovascommand = "req.body.tMTEP3_T04uzsakovas";
        var tMTEP3_T04temacommand = "req.body.tMTEP3_T04tema";
        var tMTEP3_T04datacommand = "req.body.tMTEP3_T04data";
        var tMTEP3_T04atlygArNecommand = "req.body.tMTEP3_T04atlygArNe";
        // 16.1 lent
        var tMTEP3_T05nrcommand = "req.body.tMTEP3_T05nr";
        var tMTEP3_T05destytojascommand = "req.body.tMTEP3_T05destytojas";
        var tMTEP3_T05veiklPavadcommand = "req.body.tMTEP3_T05veiklPavad";
        var tMTEP3_T05veiklRezultcommand = "req.body.tMTEP3_T05veiklRezult";
        var tMTEP3_T05atlygArNecommand = "req.body.tMTEP3_T05atlygArNe";
        //16.2 lent
        var lent162_nrnrcommand = "req.body.lent162_nr";
        var lent162_destytojascommand = "req.body.lent162_destytojas";
        var lent162_pavadinimascommand = "req.body.lent162_pavadinimas";
        var lent162_pastaboscommand = "req.body.lent162_pastabos";
        //16.3 lent
        var tMTEP3_T16nrcommand = "req.body.tMTEP3_T16nr";
        var tMTEP3_T16autoriuscommand = "req.body.tMTEP3_T16autorius";
        var tMTEP3_T16pavadinimascommand = "req.body.tMTEP3_T16pavadinimas";
        var tMTEP3_T16uzsakovascommand = "req.body.tMTEP3_T16uzsakovas";
        //17 lent
        var tMTEP3_T06nrcommand = "req.body.tMTEP3_T06nr";
        var tMTEP3_T06autoriuscommand = "req.body.tMTEP3_T06autorius";
        var tMTEP3_T06menoSritcommand = "req.body.tMTEP3_T06menoSrit";
        var tMTEP3_T06pobudiscommand = "req.body.tMTEP3_T06pobudis";
        var tMTEP3_T06realizVietacommand = "req.body.tMTEP3_T06realizVieta";
        var tMTEP3_T06datacommand = "req.body.tMTEP3_T06data";
        var tMTEP3_T06atlygArNecommand = "req.body.tMTEP3_T06atlygArNe";
        //18 lent
        var tMTEP3_T07nrcommand = "req.body.tMTEP3_T07nr";
        var tMTEP3_T07atlikejascommand = "req.body.tMTEP3_T07atlikejas";
        var tMTEP3_T07menoSritcommand = "req.body.tMTEP3_T07menoSrit";
        var tMTEP3_T07pavadinimascommand = "req.body.tMTEP3_T07pavadinimas";
        var tMTEP3_T07atlikVietacommand = "req.body.tMTEP3_T07atlikVieta";
        var tMTEP3_T07datacommand = "req.body.tMTEP3_T07data";
        var tMTEP3_T07atlygArNecommand = "req.body.tMTEP3_T07atlygArNe";
        //19 lent
        var tMTEP3_T08Snrcommand = "req.body.tMTEP3_T08Snr";
        var tMTEP3_T08atlikejascommand = "req.body.tMTEP3_T08atlikejas";
        var tMTEP3_T08menoSritcommand = "req.body.tMTEP3_T08menoSrit";
        var tMTEP3_T08pavadinimascommand = "req.body.tMTEP3_T08pavadinimas";
        var tMTEP3_T08atlikVietacommand = "req.body.tMTEP3_T08atlikVieta";
        var tMTEP3_T08datacommand = "req.body.tMTEP3_T08data";
        var tMTEP3_T08atlygArNecommand = "req.body.tMTEP3_T08atlygArNe";
        //20 lent
        var tMTEP3_T09nrcommand = "req.body.tMTEP3_T09nr";
        var tMTEP3_T09atlikejascommand = "req.body.tMTEP3_T09atlikejas";
        var tMTEP3_T09menoSritcommand = "req.body.tMTEP3_T09menoSrit";
        var tMTEP3_T09pavadinimascommand = "req.body.tMTEP3_T09pavadinimas";
        var tMTEP3_T09atlikVietacommand = "req.body.tMTEP3_T09atlikVieta";
        var tMTEP3_T09datacommand = "req.body.tMTEP3_T09data";
        var tMTEP3_T09atlygArNecommand = "req.body.tMTEP3_T09atlygArNe";
        //21 lent
        var tMTEP3_T10nrcommand = "req.body.tMTEP3_T10nr";
        var tMTEP3_T10destytojascommand = "req.body.tMTEP3_T10destytojas";
        var tMTEP3_T10veiklPobudcommand = "req.body.tMTEP3_T10veiklPobud";
        var tMTEP3_T10veiklTikslcommand = "req.body.tMTEP3_T10veiklTiksl";
        var tMTEP3_T10dataVietacommand = "req.body.tMTEP3_T10dataVieta";
        var tMTEP3_T10dalyvSkcommand = "req.body.tMTEP3_T10dalyvSk";
        var tMTEP3_T10ktKomentaraicommand = "req.body.tMTEP3_T10ktKomentarai";
        var tMTEP3_T10atlygArNecommand = "req.body.tMTEP3_T10atlygArNe";
        //22 lent
        var tMTEP3_T11nrcommand = "req.body.tMTEP3_T11nr";
        var tMTEP3_T11destytojascommand = "req.body.tMTEP3_T11destytojas";
        var tMTEP3_T11veiklPobudcommand = "req.body.tMTEP3_T11veiklPobud";
        var tMTEP3_T11veiklTikslcommand = "req.body.tMTEP3_T11veiklTiksl";
        var tMTEP3_T11dataVietacommand = "req.body.tMTEP3_T11dataVieta";
        var tMTEP3_T11dalyvSkcommand = "req.body.tMTEP3_T11dalyvSk";
        var tMTEP3_T11ktKomentaraicommand = "req.body.tMTEP3_T11ktKomentarai";
        var tMTEP3_T11atlygArNecommand = "req.body.tMTEP3_T11atlygArNe";
        //23 lent
        var tMTEP3_T12nrcommand = "req.body.tMTEP3_T12nr";
        var tMTEP3_T12destytojascommand = "req.body.tMTEP3_T12destytojas";
        var tMTEP3_T12veiklPobudcommand = "req.body.tMTEP3_T12veiklPobud";
        var tMTEP3_T12dataVietacommand = "req.body.tMTEP3_T12dataVieta";
        //24 lent
        var tMTEP3_T14nrcommand = "req.body.tMTEP3_T14nr";
        var tMTEP3_T14destytojascommand = "req.body.tMTEP3_T14destytojas";
        var tMTEP3_T14renginyscommand = "req.body.tMTEP3_T14renginys";
        var tMTEP3_T14veiklPobudcommand = "req.body.tMTEP3_T14veiklPobud";
        var tMTEP3_T14dataVietacommand = "req.body.tMTEP3_T14dataVieta";
        //25 lent
        var tMTEP3_T13nrcommand = "req.body.tMTEP3_T13nr";
        var tMTEP3_T13destytojascommand = "req.body.tMTEP3_T13destytojas";
        var tMTEP3_T13studDuomcommand = "req.body.tMTEP3_T13studDuom";
        var tMTEP3_T13renginioPavadcommand = "req.body.tMTEP3_T13renginioPavad";
        var tMTEP3_T13rezultatascommand = "req.body.tMTEP3_T13rezultatas";
        var tMTEP3_T13datacommand = "req.body.tMTEP3_T13data";
        //TMTEP_S
        var tMTEP3_Snrcommand = "req.body.tMTEP3_Snr";
        var tMTEP3_Sstiprybescommand = "req.body.tMTEP3_Sstiprybes";
        var tMTEP3_Stobulintinacommand = "req.body.tMTEP3_Stobulintina";
        //26 lent priedas
        //mokymosi
        var kTOV4_KV01mokymosiKomppavadcommand = "req.body.kTOV4_KV01mokymosiKomppavad";
        var kTOV4_KV01mokymosiKomppazymNrcommand = "req.body.kTOV4_KV01mokymosiKomppazymNr";
        var kTOV4_KV01mokymosiKomptrukmeValLTcommand = "req.body.kTOV4_KV01mokymosiKomptrukmeValLT";
        var kTOV4_KV01mokymosiKomptrukmeValNeLTcommand = "req.body.kTOV4_KV01mokymosiKomptrukmeValNeLT";
        var kTOV4_KV01mokymosiKompdalyviscommand = "req.body.kTOV4_KV01mokymosiKompdalyvis";
        // tyrimu
        var kTOV4_KV01tyrimuKomppavadcommand = "req.body.kTOV4_KV01tyrimuKomppavad";
        var kTOV4_KV01tyrimuKomppazymNrcommand = "req.body.kTOV4_KV01tyrimuKomppazymNr";
        var kTOV4_KV01tyrimuKomptrukmeValLTcommand = "req.body.kTOV4_KV01tyrimuKomptrukmeValLT";
        var kTOV4_KV01tyrimuKomptrukmeValNeLTcommand = "req.body.kTOV4_KV01tyrimuKomptrukmeValNeLT";
        var kTOV4_KV01tyrimuKompdalyviscommand = "req.body.kTOV4_KV01tyrimuKompdalyvis";
        //bendrosios
        var kTOV4_KV01bendrKomppavadcommand = "req.body.kTOV4_KV01bendrKomppavad";
        var kTOV4_KV01bendrKomppazymNrcommand = "req.body.kTOV4_KV01bendrKomppazymNr";
        var kTOV4_KV01bendrKomptrukmeValLTcommand = "req.body.kTOV4_KV01bendrKomptrukmeValLT";
        var kTOV4_KV01bendrKomptrukmeValNeLTcommand = "req.body.kTOV4_KV01bendrKomptrukmeValNeLT";
        var kTOV4_KV01bendrKompdalyviscommand = "req.body.kTOV4_KV01bendrKompdalyvis";
        //dalykines
        var kTOV4_KV01dalykKomppavadcommand = "req.body.kTOV4_KV01dalykKomppavad";
        var kTOV4_KV01dalykKomppazymNrcommand = "req.body.kTOV4_KV01dalykKomppazymNr";
        var kTOV4_KV01dalykKompTrukmeValLTcommand = "req.body.kTOV4_KV01dalykKompTrukmeValLT";
        var kTOV4_KV01dalykKompTrukmeValNeLTcommand = "req.body.kTOV4_KV01dalykKompTrukmeValNeLT";
        var kTOV4_KV01dalykKompdalyviscommand = "req.body.kTOV4_KV01dalykKompdalyvis";
        //27 lent
        var lent27_nrcommand = "req.body.lent27_nr";
        var lent27_renginysTemacommand = "req.body.lent27_renginysTema";
        var lent27_kompGrupecommand = "req.body.lent27_kompGrupe";
        var lent27_skirtacommand = "req.body.lent27_skirta";
        var lent27_lektoriuscommand = "req.body.lent27_lektorius";
        var lent27_lektTipascommand = "req.body.lent27_lektTipas";
        //28 lent
        var lent28_nrcommand = "req.body.lent28_nr";
        var lent28_destytojascommand = "req.body.lent28_destytojas";
        var lent28_imonIstaigcommand = "req.body.lent28_imonIstaig";
        var lent28_kompGrupecommand = "req.body.lent28_kompGrupe";
        var lent28_trukmeValcommand = "req.body.lent28_trukmeVal";
        var lent28_datacommand = "req.body.lent28_data";
        //29 lent
        var kTOV4_KV03nrcommand = "req.body.kTOV4_KV03nr";
        var kTOV4_KV03destytojascommand = "req.body.kTOV4_KV03destytojas";
        var kTOV4_KV03studKryptiscommand = "req.body.kTOV4_KV03studKryptis";
        var kTOV4_KV03saliscommand = "req.body.kTOV4_KV03salis";
        var kTOV4_KV03institucijacommand = "req.body.kTOV4_KV03institucija";
        var kTOV4_KV03dalykascommand = "req.body.kTOV4_KV03dalykas";
        //30 lent
        var lent30_nrcommand = "req.body.lent30_nr";
        var lent30_destytojascommand = "req.body.lent30_destytojas";
        var lent30_studKryptiscommand = "req.body.lent30_studKryptis";
        var lent30_saliscommand = "req.body.lent30_salis";
        var lent30_institucijacommand = "req.body.lent30_institucija";
        var lent30_dalykascommand = "req.body.lent30_dalykas";
        // 31.1 lent
        var kTOV4_O01_1nrcommand = "req.body.kTOV4_O01_1nr";
        var kTOV4_O01_1destytojascommand = "req.body.kTOV4_O01_1destytojas";
        var kTOV4_O01_1veiklPobudcommand = "req.body.kTOV4_O01_1veiklPobud";
        var kTOV4_O01_1isakNrDatacommand = "req.body.kTOV4_O01_1isakNrData";
        // 31.2 lent
        var kTOV4_O01_2nrcommand = "req.body.kTOV4_O01_2nr";
        var kTOV4_O01_2destytojascommand = "req.body.kTOV4_O01_2destytojas";
        var kTOV4_O01_2veiklPobudcommand = "req.body.kTOV4_O01_2veiklPobud";
        var kTOV4_O01_2dataVietacommand = "req.body.kTOV4_O01_2dataVieta";
        var kTOV4_O01_2ktKomentaraicommand = "req.body.kTOV4_O01_2ktKomentarai";
        //kTOV4_S
        var kTOV4_Snrcommand = "req.body.kTOV4_Snr";
        var kTOV4_Sstiprybescommand = "req.body.kTOV4_Sstiprybes";
        var kTOV4_Stobulintinacommand = "req.body.kTOV4_Stobulintina";
        //32 lent
        var lent32_nrcommand = "req.body.lent32_nr";
        var lent32_studKryptiscommand = "req.body.lent32_studKryptis";
        var lent32_studProgrcommand = "req.body.lent32_studProgr";
        var lent32_strategPartnercommand = "req.body.lent32_strategPartner";
        //33 lent
        var lent33_nrcommand = "req.body.lent33_nr";
        var lent33_veiklacommand = "req.body.lent33_veikla";
        var lent33_socPartneriscommand = "req.body.lent33_socPartneris";
        var lent33_destytojascommand = "req.body.lent33_destytojas";
        //34 lent
        var lent34_nrcommand = "req.body.lent34_nr";
        var lent34_studKryptiscommand = "req.body.lent34_studKryptis";
        var lent34_studProgrcommand = "req.body.lent34_studProgr";
        var lent34_studentuSk1_command = "req.body.lent34_studentuSk1_";
        var lent34_studentuSk2_command = "req.body.lent34_studentuSk2_";
        var lent34_studentuSk3_command = "req.body.lent34_studentuSk3_";
        var lent34_studentuSk4_command = "req.body.lent34_studentuSk4_";
        var lent34_studentuSk5_command = "req.body.lent34_studentuSk5_";
        //35 lent
        var lent35_nrcommand = "req.body.lent35_nr";
        var lent35_studKryptiscommand = "req.body.lent35_studKryptis";
        var lent35_studProgrcommand = "req.body.lent35_studProgr";
        var lent35_studentuSkBendr1_command = "req.body.lent35_studentuSkBendr1_";
        var lent35_studentuSk1_command = "req.body.lent35_studentuSk1_";
        var lent35_studentuSkBendr2_command = "req.body.lent35_studentuSkBendr2_";
        var lent35_studentuSk2_command = "req.body.lent35_studentuSk2_";
        var lent35_studentuSkBendr3_command = "req.body.lent35_studentuSkBendr3_";
        var lent35_studentuSk3_command = "req.body.lent35_studentuSk3_";
        var lent35_studentuSkBendr4_command = "req.body.lent35_studentuSkBendr4_";
        var lent35_studentuSk4_command = "req.body.lent35_studentuSk4_";
        var lent35_studentuSkBendr5_command = "req.body.lent35_studentuSkBendr5_";
        var lent35_studentuSk5_command = "req.body.lent35_studentuSk5_";
        //36 lent
        var kV5_KT02nrcommand = "req.body.kV5_KT02nr";
        var kV5_KT02studKryptiscommand = "req.body.kV5_KT02studKryptis";
        var kV5_KT02studProgrcommand = "req.body.kV5_KT02studProgr";
        var kV5_KT02diplomantascommand = "req.body.kV5_KT02diplomantas";
        var kV5_KT02darboTemacommand = "req.body.kV5_KT02darboTema";
        //37 lent
        var kV5_KT01nrcommand = "req.body.kV5_KT01nr";
        var kV5_KT01studKryptiscommand = "req.body.kV5_KT01studKryptis";
        var kV5_KT01studProgrcommand = "req.body.kV5_KT01studProgr";
        var kV5_KT01diplomantascommand = "req.body.kV5_KT01diplomantas";
        var kV5_KT01darboTemacommand = "req.body.kV5_KT01darboTema";
        var kV5_KT01uzsakovascommand = "req.body.kV5_KT01uzsakovas";
        //38 lent
        var lent38_nrcommand = "req.body.lent38_nr";
        var lent38_pavadinimascommand = "req.body.lent38_pavadinimas";
        var lent38_vykdytPartnercommand = "req.body.lent38_vykdytPartner";
        var lent38_dalyviaicommand = "req.body.lent38_dalyviai";
        var lent38_finansavimcommand = "req.body.lent38_finansavim";
        var lent38_rezultataicommand = "req.body.lent38_rezultatai";
        var lent38_salisDatacommand = "req.body.lent38_salisData";
        //39 lent
        var lent39_nrcommand = "req.body.lent39_nr";
        var lent39_kryptyscommand = "req.body.lent39_kryptys";
        var lent39_aprasymascommand = "req.body.lent39_aprasymas";

        //40 lent 1
        var lent40_socAprasymascommand = "req.body.lent40_socaprasymas";
        var lent40_socDestytojascommand = "req.body.lent40_socdestytojas";
        //40 lent 2
        var lent40_aplinkAprasymascommand = "req.body.lent40_aplinkaprasymas";
        var lent40_aplinkDestytojascommand = "req.body.lent40_aplinkdestytojas";
        //40 lent 3
        var lent40_valstybAprasymascommand = "req.body.lent40_valstybaprasymas";
        var lent40_valstybDestytojascommand = "req.body.lent40_valstybdestytojas";
        //40 lent 4
        var lent40_etnoAprasymascommand = "req.body.lent40_etnoaprasymas";
        var lent40_etnoDestytojascommand = "req.body.lent40_savdestytojas";
        //40 lent 5
        var lent40_savAprasymascommand = "req.body.lent40_savaprasymas";
        var lent40_savDestytojascommand = "req.body.lent40_savdestytojas";
        //41 lent
        var lent41_nrcommand = "req.body.lent41_nr";
        var lent41_veiklacommand = "req.body.lent41_veikla";
        var lent41_veiklPartnercommand = "req.body.lent41_veiklPartner";
        var lent41_organizaccommand = "req.body.lent41_organizac";
        var lent41_veiklOrientavimcommand = "req.body.lent41_veiklOrientavim"
        var lent41_dalyviaicommand = "req.body.lent41_dalyviai";
        var lent41_laikascommand = "req.body.lent41_laikas";
        var lent41_vietacommand = "req.body.lent41_vieta";
        //veiklSavinalize
        var veiklSavinalizestiprybescommand = "req.body.veiklSavianalizStiprybes";
        var veiklSavinalizetobulintinacommand = "req.body.veiklSavianalizTobulintina";

        foundUser.katedrosVedejas.kKPP1_1 = new Array(); // 1
        foundUser.katedrosVedejas.kDS1 = new Array(); // 2
        foundUser.katedrosVedejas.kKPP1_3 = new Array(); // 3
        foundUser.katedrosVedejas.mV2.mV2_M02 = new Array(); // 4
        foundUser.katedrosVedejas.mV2.mV2_M04 = new Array(); // 5
        foundUser.katedrosVedejas.mV2.mV2_D06 = new Array(); // 6
        foundUser.katedrosVedejas.mV2.mV2_D01 = new Array(); // 7
        foundUser.katedrosVedejas.mV2.mV2_D02 = new Array(); // 8
        foundUser.katedrosVedejas.mV2.mV2_D03 = new Array(); // 9
        foundUser.katedrosVedejas.mV2.mV2_M03 = new Array(); // 10
        foundUser.katedrosVedejas.mV2.mV2_S01 = new Array(); // 11
        foundUser.katedrosVedejas.mV2.mV2_S = new Array(); // Savianalizė
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T01 = new Array(); // 12
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T02 = new Array(); // 13
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T03 = new Array(); // 14
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T04 = new Array(); // 15
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T05 = new Array(); // 16.1
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_162 = new Array(); // 16.2
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T16 = new Array(); // 16.3
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T06 = new Array(); // 17
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T07 = new Array(); // 18
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T08 = new Array(); // 19
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T09 = new Array(); // 20
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T10 = new Array(); // 21
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T11 = new Array(); // 22
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T12 = new Array(); // 23
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T14 = new Array(); // 24
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T13 = new Array(); // 25
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_S = new Array(); // Savianalizė

        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.mokymosi = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.tyrimu = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.bendrosios = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.dalykines = new Array();

        foundUser.katedrosVedejas.kTOV4.kTOV4_27 = new Array(); // 27
        foundUser.katedrosVedejas.kTOV4.kTOV4_28 = new Array(); // 28
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV03 = new Array(); // 29
        foundUser.katedrosVedejas.kTOV4.kTOV4_30 = new Array(); // 30
        foundUser.katedrosVedejas.kTOV4.kTOV4_O01.kTOV4_O01_1 = new Array(); // 31.1
        foundUser.katedrosVedejas.kTOV4.kTOV4_O01.kTOV4_O01_2 = new Array(); // 31.2
        foundUser.katedrosVedejas.kTOV4.kTOV4_S = new Array(); // Savianalizė
        foundUser.katedrosVedejas.kV5.kV5_32 = new Array(); // 32
        foundUser.katedrosVedejas.kV5.kV5_33 = new Array(); // 33
        foundUser.katedrosVedejas.kV5.kV5_34 = new Array(); // 34
        foundUser.katedrosVedejas.kV5.kV5_35 = new Array(); // 35
        foundUser.katedrosVedejas.kV5.kV5_KT02 = new Array(); // 36
        foundUser.katedrosVedejas.kV5.kV5_KT01 = new Array(); // 37
        foundUser.katedrosVedejas.kV5.kV5_38 = new Array(); // 38
        foundUser.katedrosVedejas.kV5.kV5_39 = new Array(); // 39
        foundUser.katedrosVedejas.kV5.kV5_40.socAtskMaz = new Array(); // 40.1
        foundUser.katedrosVedejas.kV5.kV5_40.aplinkosaugInic = new Array(); // 40.2
        foundUser.katedrosVedejas.kV5.kV5_40.lietValstybPuosel = new Array(); // 40.3
        foundUser.katedrosVedejas.kV5.kV5_40.lietEtnokPuos = new Array(); // 40.4
        foundUser.katedrosVedejas.kV5.kV5_40.savanorystIniciatyv = new Array(); // 40.5
        foundUser.katedrosVedejas.kV5.kV5_41 = new Array(); // 41
        foundUser.katedrosVedejas.kV5.veiklSavinalize.veiklSavinalize_array = new Array(); // Savianalizė

        // 1 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table1_name); i++) {
          foundUser.katedrosVedejas.kKPP1_1.push({
            nr: eval(mV2_D04nrcommand + i),
            studKryptis: eval(mV2_D04studKryptiscommand + i),
            studProgr: eval(mV2_D04studProgrcommand + i),
            progrKodas: eval(mV2_D04progrKodascommand + i),
            isakNrData: eval(mV2_D04isakNrDatacommand + i),
            studKryptAkredit: eval(mV2_D04studKryptAkreditcommand + i),
            akreditLaikot: eval(mV2_D04akreditLaikotcommand + i),
            eCTS: eval(mV2_D04eCTS1command + i)
          })
        }
        // 2 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table2_name); i++) {
          foundUser.katedrosVedejas.kDS1.push({
            nr: eval(lent2_nrcommand + i),
            vardPavard: eval(lent2_pavVardcommand + i),
            pareigos: eval(lent2_pareigoscommand + i),
            darbovTipas: eval(lent2_darbovTipascommand + i),
            pedagogStazas: eval(lent2_pedagogStazascommand + i),
            praktinStazas: eval(lent2_praktinStazascommand + i)
          })
        }
        // 3 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table3_name); i++) {
          foundUser.katedrosVedejas.kKPP1_3.push({
            nr: eval(lent3_nrcommand + i),
            studKryptis: eval(lent3_studKryptiscommand + i),
            studProgr: eval(lent3_studProgrcommand + i),
            destytojas: eval(lent3_destytojascommand + i),
            imonIstaig: eval(lent3_imonIstaigcommand + i)
          })
        }
        // 4 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table4_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_M02.push({
            nr: eval(lent4_nrcommand + i),
            bibliografApr: eval(lent4_bibliografAprcommand + i),
            tipas: eval(lent4_tipascommand + i),
            mokslSrit: eval(lent4_mokslSritcommand + i),
            mokslKrypt: eval(lent4_mokslKryptcommand + i)
          })
        }
        // 5 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table5_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_M04.push({
            nr: eval(mV2_M04nrcommand + i),
            destytojas: eval(mV2_M04destytojascommand + i),
            studProgr: eval(mV2_M04studProgrcommand + i),
            dalykPavad: eval(mV2_M04dalykPavadcommand + i),
            apimtisKredit: eval(mV2_M04apimtisKreditcommand + i),
            busena: eval(mV2_M04busenacommand + i)
          })
        }
        // 6 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table6_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_D06.push({
            nr: eval(mV2_D06nrcommand + i),
            studProgr: eval(mV2_D06studProgrcommand + i),
            progrKodas: eval(mV2_D06progrKodascommand + i),
            atlPatobulin: eval(mV2_D06atlPatobulincommand + i),
            tobulinPriezast: eval(mV2_D06tobulinPriezastcommand + i),
            tobulinIrod: eval(mV2_D06tobulinIrodcommand + i)
          })
        }
        // 7 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table7_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_D01.push({
            nr: eval(mV2_D01nrcommand + i),
            destytojas: eval(mV2_D01destytojascommand + i),
            komitetas: eval(mV2_D01komitetascommand + i),
            veikla: eval(mV2_D01veiklacommand + i),
            rezultatai: eval(mV2_D01rezultataicommand + i)
          })
        }
        // 8 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table8_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_D02.push({
            nr: eval(mV2_D02nrcommand + i),
            destytojas: eval(mV2_D02destytojascommand + i),
            studKryptis: eval(mV2_D02studKryptcommand + i),
            veikla: eval(mV2_D02veiklacommand + i),
            rezultatai: eval(mV2_D02rezultataicommand + i)
          })
        }
        // 9 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table9_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_D03.push({
            nr: eval(mV2_D03nrcommand + i),
            destytojas: eval(mV2_D03destytojascommand + i),
            studKryptis: eval(mV2_D03studKryptiscommand + i),
            studProgr: eval(mV2_D03studProgrcommand + i),
            veikla: eval(mV2_D03veiklacommand + i),
            rezultatai: eval(mV2_D03rezultataicommand + i)
          })
        }
        // 10 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table10_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_M03.push({
            nr: eval(mV2_M03nrcommand + i),
            destytojas: eval(mV2_M03destytojascommand + i),
            studProgr: eval(mV2_M03studProgrcommand + i),
            dalykPavad: eval(mV2_M03dalykPavadcommand + i),
            apimtisKredit: eval(mV2_M03apimtisKreditcommand + i)
          })
        }
        // 11 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table11_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_S01.push({
            nr: eval(mV2_S01nrcommand + i),
            destytojas: eval(mV2_S01destytojascommand + i),
            veikla: eval(mV2_S01veiklacommand + i),
            dataVieta: eval(mV2_S01dataVietacommand + i)
          })
        }
        for (let i = 1; i <= parseInt(req.body.tablemV2_S_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_S.push({
            nr: eval(mV2_Snrcommand + i),
            stiprybes: eval(mV2_Sstiprybescommand + i),
            tobulintina: eval(mV2_Stobulintinacommand + i)
          })
        }
        // 12 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table12_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T01.push({
            nr: eval(tMTEP3_T01nrcommand + i),
            tyrTemat: eval(tMTEP3_T01tyrTematcommand + i),
            destytojas: eval(tMTEP3_T01destytojascommand + i),
            tyrGrup: eval(tMTEP3_T01tyrGrupcommand + i),
            mokslSrit: eval(tMTEP3_T01mokslSritcommand + i),
            mokslKrypt: eval(tMTEP3_T01mokslKryptcommand + i)
          })
        }
        // 13 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table13_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T02.push({
            nr: eval(tMTEP3_T02nrcommand + i),
            bibliografApr: eval(tMTEP3_T02bibliografAprcommand + i),
            tipas: eval(tMTEP3_T02tipascommand + i),
            mokslSrit: eval(tMTEP3_T02mokslSritcommand + i),
            mokslKrypt: eval(tMTEP3_T02mokslKryptcommand + i),
            duomBaze: eval(tMTEP3_T02duomBazecommand + i)
          })
        }
        // 14 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table14_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T03.push({
            nr: eval(tMTEP3_T03nrcommand + i),
            pilnasBiblApr: eval(tMTEP3_T03pilnasBiblAprcommand + i),
            rengTipas: eval(tMTEP3_T03rengTipascommand + i)
          })
        }
        // 15 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table15_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T04.push({
            nr: eval(tMTEP3_T04nrcommand + i),
            konsultantas: eval(tMTEP3_T04konsultantascommand + i),
            uzsakovas: eval(tMTEP3_T04uzsakovascommand + i),
            tema: eval(tMTEP3_T04temacommand + i),
            data: eval(tMTEP3_T04datacommand + i),
            atlygArNe: eval(tMTEP3_T04atlygArNecommand + i)
          })
        }
        // 16 lentelė 1 update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table161_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T05.push({
            nr: eval(tMTEP3_T05nrcommand + i),
            destytojas: eval(tMTEP3_T05destytojascommand + i),
            veiklPavad: eval(tMTEP3_T05veiklPavadcommand + i),
            veiklRezult: eval(tMTEP3_T05veiklRezultcommand + i),
            atlygArNe: eval(tMTEP3_T05atlygArNecommand + i)
          })
        }
        // 16 lentelė 2 update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table162_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_162.push({
            nr: eval(lent162_nrnrcommand + i),
            destytojas: eval(lent162_destytojascommand + i),
            pavadinimas: eval(lent162_pavadinimascommand + i),
            pastabos: eval(lent162_pastaboscommand + i)
          })
        } // 16 lentelė 3 update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table163_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T16.push({
            nr: eval(tMTEP3_T16nrcommand + i),
            rengejai: eval(tMTEP3_T16autoriuscommand + i),
            pavadinimas: eval(tMTEP3_T16pavadinimascommand + i),
            uzsakovas: eval(tMTEP3_T16uzsakovascommand + i)
          })
        }
        // 17 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table17_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T06.push({
            nr: eval(tMTEP3_T06nrcommand + i),
            autorius: eval(tMTEP3_T06autoriuscommand + i),
            menoSrit: eval(tMTEP3_T06menoSritcommand + i),
            pobudis: eval(tMTEP3_T06pobudiscommand + i),
            realizVieta: eval(tMTEP3_T06realizVietacommand + i),
            data: eval(tMTEP3_T06datacommand + i),
            atlygArNe: eval(tMTEP3_T06atlygArNecommand + i)
          })
        } // 18 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table18_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T07.push({
            nr: eval(tMTEP3_T07nrcommand + i),
            atlikejas: eval(tMTEP3_T07atlikejascommand + i),
            menoSrit: eval(tMTEP3_T07menoSritcommand + i),
            pavadinimas: eval(tMTEP3_T07pavadinimascommand + i),
            atlikVieta: eval(tMTEP3_T07atlikVietacommand + i),
            data: eval(tMTEP3_T07datacommand + i),
            atlygArNe: eval(tMTEP3_T07atlygArNecommand + i)
          })
        } // 19 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table19_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T08.push({
            nr: eval(tMTEP3_T08Snrcommand + i),
            atlikejas: eval(tMTEP3_T08atlikejascommand + i),
            menoSrit: eval(tMTEP3_T08menoSritcommand + i),
            pavadinimas: eval(tMTEP3_T08pavadinimascommand + i),
            atlikVieta: eval(tMTEP3_T08atlikVietacommand + i),
            data: eval(tMTEP3_T08datacommand + i),
            atlygArNe: eval(tMTEP3_T08atlygArNecommand + i)
          })
        } // 20 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table20_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T09.push({
            nr: eval(tMTEP3_T09nrcommand + i),
            atlikejas: eval(tMTEP3_T09atlikejascommand + i),
            menoSrit: eval(tMTEP3_T09menoSritcommand + i),
            pavadinimas: eval(tMTEP3_T09pavadinimascommand + i),
            atlikVieta: eval(tMTEP3_T09atlikVietacommand + i),
            data: eval(tMTEP3_T09datacommand + i),
            atlygArNe: eval(tMTEP3_T09atlygArNecommand + i)
          })
        } // 21 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table21_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T10.push({
            nr: eval(tMTEP3_T10nrcommand + i),
            destytojas: eval(tMTEP3_T10destytojascommand + i),
            veiklPobud: eval(tMTEP3_T10veiklPobudcommand + i),
            veiklTiksl: eval(tMTEP3_T10veiklTikslcommand + i),
            dataVieta: eval(tMTEP3_T10dataVietacommand + i),
            dalyvSk: eval(tMTEP3_T10dalyvSkcommand + i),
            ktKomentarai: eval(tMTEP3_T10ktKomentaraicommand + i),
            atlygArNe: eval(tMTEP3_T10atlygArNecommand + i)
          })
        } // 22 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table22_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T11.push({
            nr: eval(tMTEP3_T11nrcommand + i),
            destytojas: eval(tMTEP3_T11destytojascommand + i),
            veiklPobud: eval(tMTEP3_T11veiklPobudcommand + i),
            veiklTiksl: eval(tMTEP3_T11veiklTikslcommand + i),
            dataVieta: eval(tMTEP3_T11dataVietacommand + i),
            dalyvSk: eval(tMTEP3_T11dalyvSkcommand + i),
            ktKomentarai: eval(tMTEP3_T11ktKomentaraicommand + i),
            atlygArNe: eval(tMTEP3_T11atlygArNecommand + i)
          })
        } // 23 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table23_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T12.push({
            nr: eval(tMTEP3_T12nrcommand + i),
            destytojas: eval(tMTEP3_T12destytojascommand + i),
            veiklPobud: eval(tMTEP3_T12veiklPobudcommand + i),
            dataVieta: eval(tMTEP3_T12dataVietacommand + i)
          })
        } // 24 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table24_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T14.push({
            nr: eval(tMTEP3_T14nrcommand + i),
            destytojas: eval(tMTEP3_T14destytojascommand + i),
            renginys: eval(tMTEP3_T14renginyscommand + i),
            veiklPobud: eval(tMTEP3_T14veiklPobudcommand + i),
            dataVieta: eval(tMTEP3_T14dataVietacommand + i)
          })
        } // 25 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table25_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T13.push({
            nr: eval(tMTEP3_T13nrcommand + i),
            destytojas: eval(tMTEP3_T13destytojascommand + i),
            studDuom: eval(tMTEP3_T13studDuomcommand + i),
            renginioPavad: eval(tMTEP3_T13renginioPavadcommand + i),
            rezultatas: eval(tMTEP3_T13rezultatascommand + i),
            data: eval(tMTEP3_T13datacommand + i)
          })
        }
        for (let i = 1; i <= parseInt(req.body.tMTEP3_S_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_S.push({
            nr: eval(tMTEP3_Snrcommand + i),
            stiprybes: eval(tMTEP3_Sstiprybescommand + i),
            tobulintina: eval(tMTEP3_Stobulintinacommand + i)
          })
        }
        // 26 lentelė update-report-dep-admin priedas
        // mokymosi
        for (let i = 1; i <= parseInt(req.body.table261_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.mokymosi.push({
            pavadinimas: eval(kTOV4_KV01mokymosiKomppavadcommand + i),
            pazymNr: eval(kTOV4_KV01mokymosiKomppazymNrcommand + i),
            trukmeValLT: eval(kTOV4_KV01mokymosiKomptrukmeValLTcommand + i),
            trukmeValNeLT: eval(kTOV4_KV01mokymosiKomptrukmeValNeLTcommand + i),
            destytojas: eval(kTOV4_KV01mokymosiKompdalyviscommand + i)
          })
        }
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.mokymosiIsVisoValLT = req.body.kTOV4_trukmeMokymValLT1,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.mokymosiIsVisoValNeLT = req.body.kTOV4_trukmeMokymValNeLT1
        // tyrimu
        for (let i = 1; i <= parseInt(req.body.table262_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.tyrimu.push({
            pavadinimas: eval(kTOV4_KV01tyrimuKomppavadcommand + i),
            pazymNr: eval(kTOV4_KV01tyrimuKomppazymNrcommand + i),
            trukmeValLT: eval(kTOV4_KV01tyrimuKomptrukmeValLTcommand + i),
            trukmeValNeLT: eval(kTOV4_KV01tyrimuKomptrukmeValNeLTcommand + i),
            destytojas: eval(kTOV4_KV01tyrimuKompdalyviscommand + i)
          })
        }
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.tyrimuIsVisoValLT = req.body.kTOV4_trukmeTyrimValLT2,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.tyrimuIsVisoValNeLT = req.body.kTOV4_trukmeTyrimValNeLT2
        //bendrosios
        for (let i = 1; i <= parseInt(req.body.table263_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.bendrosios.push({
            pavadinimas: eval(kTOV4_KV01bendrKomppavadcommand + i),
            pazymNr: eval(kTOV4_KV01bendrKomppazymNrcommand + i),
            trukmeValLT: eval(kTOV4_KV01bendrKomptrukmeValLTcommand + i),
            trukmeValNeLT: eval(kTOV4_KV01bendrKomptrukmeValNeLTcommand + i),
            destytojas: eval(kTOV4_KV01bendrKompdalyviscommand + i)
          })
        }
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.bendrosiosIsVisoValLT = req.body.kTOV4_trukmeBendrValLT3,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.bendrosiosIsVisoValNeLT = req.body.kTOV4_trukmeBendrValNeLT3
        //dalykines
        for (let i = 1; i <= parseInt(req.body.table264_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.dalykines.push({
            pavadinimas: eval(kTOV4_KV01dalykKomppavadcommand + i),
            pazymNr: eval(kTOV4_KV01dalykKomppazymNrcommand + i),
            trukmeValLT: eval(kTOV4_KV01dalykKompTrukmeValLTcommand + i),
            trukmeValNeLT: eval(kTOV4_KV01dalykKompTrukmeValNeLTcommand + i),
            destytojas: eval(kTOV4_KV01dalykKompdalyviscommand + i)
          })
        }
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.dalykinesIsVisoValLT = req.body.kTOV4_trukmeDalykValLT4,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.dalykinesIsVisoValNeLT = req.body.kTOV4_trukmeDalykValNeLT4

        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.isVisoValLT = req.body.kTOV4_trukmeValLTbendr,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.isVisoValNeLT = req.body.kTOV4_trukmeValNeLTbendr,
          //26 lent
          //mokymosi
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.mokymosi.destytojuSk = req.body.mokymosiLTdestytojuSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.mokymosi.trukmeValLT = req.body.mokymosiLTtrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.mokymosi.trukmeValNeLT = req.body.mokymosiNeLttrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.mokymosi.isVisoVal = req.body.mokymosiIsVisoVal,
          //tyrimu
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.tyrimu.destytojuSk = req.body.tyrimuLTdestytojuSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.tyrimu.trukmeValLT = req.body.tyrimuLTtrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.tyrimu.trukmeValNeLT = req.body.tyrimuNeLttrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.tyrimu.isVisoVal = req.body.tyrimuIsVisoVal,
          //bendrosios
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.bendrosios.destytojuSk = req.body.bendrosiosLTdestytojuSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.bendrosios.trukmeValLT = req.body.bendrosiosLTtrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.bendrosios.trukmeValNeLT = req.body.bendrosiosNeLttrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.bendrosios.isVisoVal = req.body.bendrosiosIsVisoVal,
          //dalykines
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.dalykines.destytojuSk = req.body.dalykinesLTdestytojuSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.dalykines.trukmeValLT = req.body.dalykinesLTtrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.dalykines.trukmeValNeLT = req.body.dalykinesNeLttrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.dalykines.isVisoVal = req.body.dalykinesIsVisoVal
        // 27 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table27_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_27.push({
            nr: eval(lent27_nrcommand + i),
            renginysTema: eval(lent27_renginysTemacommand + i),
            kompGrupe: eval(lent27_kompGrupecommand + i),
            skirta: eval(lent27_skirtacommand + i),
            lektorius: eval(lent27_lektoriuscommand + i),
            lektTipas: eval(lent27_lektTipascommand + i)
          })
        } // 28 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table28_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_28.push({
            nr: eval(lent28_nrcommand + i),
            destytojas: eval(lent28_destytojascommand + i),
            imonIstaig: eval(lent28_imonIstaigcommand + i),
            kompGrupe: eval(lent28_kompGrupecommand + i),
            trukmeVal: eval(lent28_trukmeValcommand + i),
            data: eval(lent28_datacommand + i)
          })
        } // 29 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table29_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV03.push({
            nr: eval(kTOV4_KV03nrcommand + i),
            destytojas: eval(kTOV4_KV03destytojascommand + i),
            studKryptis: eval(kTOV4_KV03studKryptiscommand + i),
            salis: eval(kTOV4_KV03saliscommand + i),
            institucija: eval(kTOV4_KV03institucijacommand + i),
            dalykas: eval(kTOV4_KV03dalykascommand + i)
          })
        } // 30 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table30_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_30.push({
            nr: eval(lent30_nrcommand + i),
            destytojas: eval(lent30_destytojascommand + i),
            studKryptis: eval(lent30_studKryptiscommand + i),
            salis: eval(lent30_saliscommand + i),
            institucija: eval(lent30_institucijacommand + i),
            dalykas: eval(lent30_dalykascommand + i)
          })
        } // 31 lentelė update-report-dep-admin 1
        for (let i = 1; i <= parseInt(req.body.table311_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_O01.kTOV4_O01_1.push({
            nr: eval(kTOV4_O01_1nrcommand + i),
            destytojas: eval(kTOV4_O01_1destytojascommand + i),
            veiklPobud: eval(kTOV4_O01_1veiklPobudcommand + i),
            isakNrData: eval(kTOV4_O01_1isakNrDatacommand + i)
          })
        } // 31 lentelė update-report-dep-admin 2
        for (let i = 1; i <= parseInt(req.body.table312_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_O01.kTOV4_O01_2.push({
            nr: eval(kTOV4_O01_2nrcommand + i),
            destytojas: eval(kTOV4_O01_2destytojascommand + i),
            veiklPobud: eval(kTOV4_O01_2veiklPobudcommand + i),
            dataVieta: eval(kTOV4_O01_2dataVietacommand + i),
            ktKomentarai: eval(kTOV4_O01_2ktKomentaraicommand + i)
          })
        }
        for (let i = 1; i <= parseInt(req.body.tablekTOV4_S_name); i++) {
          foundUser.katedrosVedejas.kTOV4.kTOV4_S.push({
            nr: eval(kTOV4_Snrcommand + i),
            stiprybes: eval(kTOV4_Sstiprybescommand + i),
            tobulintina: eval(kTOV4_Stobulintinacommand + i)
          })
        } // 32 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table32_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_32.push({
            nr: eval(lent32_nrcommand + i),
            studKryptis: eval(lent32_studKryptiscommand + i),
            studProgr: eval(lent32_studProgrcommand + i),
            strategPartner: eval(lent32_strategPartnercommand + i)
          })
        } // 33 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table33_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_33.push({
            nr: eval(lent33_nrcommand + i),
            veikla: eval(lent33_veiklacommand + i),
            socPartneris: eval(lent33_socPartneriscommand + i),
            destytojas: eval(lent33_destytojascommand + i)
          })
        } // 34 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table34_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_34.push({
            nr: eval(lent34_nrcommand + i),
            studKryptis: eval(lent34_studKryptiscommand + i),
            studProgr: eval(lent34_studProgrcommand + i),
            studentuSk1: eval(lent34_studentuSk1_command + i),
            studentuSk2: eval(lent34_studentuSk2_command + i),
            studentuSk3: eval(lent34_studentuSk3_command + i),
            studentuSk4: eval(lent34_studentuSk4_command + i),
            studentuSk5: eval(lent34_studentuSk5_command + i)
          })
        } // 35 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table35_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_35.push({
            nr: eval(lent35_nrcommand + i),
            studKryptis: eval(lent35_studKryptiscommand + i),
            studProgr: eval(lent35_studProgrcommand + i),
            studentuSk1: eval(lent35_studentuSkBendr1_command + i),
            pasPartnerSk1: eval(lent35_studentuSk1_command + i),
            studentuSk2: eval(lent35_studentuSkBendr2_command + i),
            pasPartnerSk2: eval(lent35_studentuSk2_command + i),
            studentuSk3: eval(lent35_studentuSkBendr3_command + i),
            pasPartnerSk3: eval(lent35_studentuSk3_command + i),
            studentuSk4: eval(lent35_studentuSkBendr4_command + i),
            pasPartnerSk4: eval(lent35_studentuSk4_command + i),
            studentuSk5: eval(lent35_studentuSkBendr5_command + i),
            pasPartnerSk5: eval(lent35_studentuSk5_command + i)
          })
        } // 36 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table36_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_KT02.push({
            nr: eval(kV5_KT02nrcommand + i),
            studKryptis: eval(kV5_KT02studKryptiscommand + i),
            studProgr: eval(kV5_KT02studProgrcommand + i),
            diplomantas: eval(kV5_KT02diplomantascommand + i),
            darboTema: eval(kV5_KT02darboTemacommand + i)
          })
        } // 37 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table37_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_KT01.push({
            nr: eval(kV5_KT01nrcommand + i),
            studKryptis: eval(kV5_KT01studKryptiscommand + i),
            studProgr: eval(kV5_KT01studProgrcommand + i),
            diplomantas: eval(kV5_KT01diplomantascommand + i),
            darboTema: eval(kV5_KT01darboTemacommand + i),
            uzsakovas: eval(kV5_KT01uzsakovascommand + i)
          })
        } // 38 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table38_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_38.push({
            nr: eval(lent38_nrcommand + i),
            pavadinimas: eval(lent38_pavadinimascommand + i),
            vykdytPartner: eval(lent38_vykdytPartnercommand + i),
            dalyviai: eval(lent38_dalyviaicommand + i),
            finansavim: eval(lent38_finansavimcommand + i),
            rezultatai: eval(lent38_rezultataicommand + i),
            salisData: eval(lent38_salisDatacommand + i)
          })
        } // 39 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table39_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_39.push({
            nr: eval(lent39_nrcommand + i),
            kryptys: eval(lent39_kryptyscommand + i),
            aprasymas: eval(lent39_aprasymascommand + i)
          })
        } // 40 lentelė update-report-dep-admin 1
        for (let i = 1; i <= parseInt(req.body.table401_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_40.socAtskMaz.push({
            aprasymas: eval(lent40_socAprasymascommand + i),
            destytojas: eval(lent40_socDestytojascommand + i)
          })
        } // 40 lentelė update-report-dep-admin 2
        for (let i = 1; i <= parseInt(req.body.table402_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_40.aplinkosaugInic.push({
            aprasymas: eval(lent40_aplinkAprasymascommand + i),
            destytojas: eval(lent40_aplinkDestytojascommand + i)
          })
        } // 40 lentelė update-report-dep-admin 3
        for (let i = 1; i <= parseInt(req.body.table403_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_40.lietValstybPuosel.push({
            aprasymas: eval(lent40_valstybAprasymascommand + i),
            destytojas: eval(lent40_valstybDestytojascommand + i)
          })
        } // 40 lentelė update-report-dep-admin 4
        for (let i = 1; i <= parseInt(req.body.table404_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_40.lietEtnokPuos.push({
            aprasymas: eval(lent40_etnoAprasymascommand + i),
            destytojas: eval(lent40_etnoDestytojascommand + i)
          })
        } // 40 lentelė update-report-dep-admin 5
        for (let i = 1; i <= parseInt(req.body.table405_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_40.savanorystIniciatyv.push({
            aprasymas: eval(lent40_savAprasymascommand + i),
            destytojas: eval(lent40_savDestytojascommand + i)
          })
        } // 41 lentelė update-report-dep-admin
        for (let i = 1; i <= parseInt(req.body.table41_name); i++) {
          foundUser.katedrosVedejas.kV5.kV5_41.push({
            nr: eval(lent41_nrcommand + i),
            veikla: eval(lent41_veiklacommand + i),
            veiklPartner: eval(lent41_veiklPartnercommand + i),
            organizac: eval(lent41_organizaccommand + i),
            veiklOrientavim: eval(lent41_veiklOrientavimcommand + i),
            dalyviai: eval(lent41_dalyviaicommand + i),
            laikas: eval(lent41_laikascommand + i),
            vieta: eval(lent41_vietacommand + i)
          })
        }
        for (let i = 1; i <= parseInt(req.body.tableVeiklS_name); i++) {
          foundUser.katedrosVedejas.kV5.veiklSavinalize.veiklSavinalize_array.push({
            stiprybes: eval(veiklSavinalizestiprybescommand + i),
            tobulintina: eval(veiklSavinalizetobulintinacommand + i)
          })
        }
        foundUser.katedrosVedejas.kV5.veiklSavinalize.isvadosApieVeikl = req.body.isvadosApieVeikl,

          foundUser.updated_for = req.user.username

        foundUser.save(function(err) {
          if (!err) {
            // console.log("Succesfully  updated");
            res.redirect("/admin-users-list");
          }
        });
      } else {
        console.log("Does'f found");
      }
    }
  });
});

app.get("/admin-faculties-list", (req, res) => {

  if (req.isAuthenticated()) {

    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "administratorius") {

          Faculty.find({}, function(err, faculties) {
            if (err) {
              console.log(err);
            } else {
              res.render("admin-faculties-list", {
                faculties: faculties
              });
            }
          });
        } else {
          console.log("You do not have permission");
          res.redirect("/login");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/admin-faculties-create", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "administratorius") {
          res.render("admin-faculties-create");
        } else {
          console.log("User role unknown");
          res.redirect("/login");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});

// Aadministratorius sukuria fakultetą
app.post("/create-faculty", (req, res) => {
  const faculty = new Faculty({
    username: req.body.fakultetas,
    dekanas: req.body.dekanas,
    prodekanas: req.body.prodekanas
  });
  faculty.save(function(err) {
    if (!err) {
      console.log("Succesfully created");
      res.redirect("/admin-faculties-list");
    } else {
      console.log(err);
      //res.redirect("/admin-faculties-create");
    }
  });
});

app.get("/admin-faculties-edit/:facultyId", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.role === "administratorius") {
          const reqId = req.params.facultyId;
          if (reqId.match(/^[0-9a-fA-F]{24}$/)) {
            Faculty.findById((reqId), function(err, faculty) {
              if (err) {
                console.log(err);
              } else {
                res.render("admin-faculties-edit", {
                  faculty: faculty
                });
              }
            });
          } else {
            res.redirect("/admin-window");
          }
        } else {
          res.redirect("/home");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});

// Aadministratorius sukuria fakultetą
app.post("/edit-faculty", (req, res) => {

  Faculty.findById(req.body.id, function(err, foundFaculty) {
    if (err) {
      console.log(err);
    } else {
      if (foundFaculty) {
        foundFaculty.username = req.body.fakultetas,
          foundFaculty.dekanas = req.body.dekanas,
          foundFaculty.prodekanas = req.body.prodekanas
        foundFaculty.save(function(err) {
          if (!err) {
            console.log("Succesfully updated");
            res.redirect("/admin-faculties-list");
          }
        });
      } else {
        console.log("Faculty does'f found");
      }
    }
  });
});

app.listen(3000, function() {
  console.log("Lecturers Reports App has started successfully on port 3000");
});
