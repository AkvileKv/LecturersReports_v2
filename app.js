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
    updated_for: "User Registration"
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
          }  // 14.2 lentelė create
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
          for (let i = 1; i <= parseInt(req.body.yonder40); i++) {
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
              studKryptis: (kTOV4_KV03studKryptiscommand + i),
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
            foundUser.updated_for = req.user.id,
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
          } // 8 lentelė create
          for (let i = 1; i <= parseInt(req.body.table8_name); i++) {
            foundUser.destytojas.nD2_M03.push({
              nr: eval(nD2_M03nrcommand + i),
              studProgr: eval(nD2_M03studProgrcommand + i),
              dalykPavad: eval(nD2_M03dalykPavadcommand + i),
              apimtisKredit: eval(nD2_M03apimtisKreditcommand + i)
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
          }// 6 lentelė create
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
          }// 11 lentelė create
          for (let i = 1; i <= parseInt(req.body.table11_name); i++) {
            foundUser.destytojas.tMTEP3_T02.push({
              nr: eval(tMTEP3_T02nrcommand + i),
              bibliografApr: eval(tMTEP3_T02bibliografAprcommand + i),
              tipas: eval(tMTEP3_T02tipascommand + i),
              mokslSrit: eval(tMTEP3_T02mokslSritcommand + i),
              mokslKrypt: eval(tMTEP3_T02mokslKryptcommand + i),
              duomBaze: eval(tMTEP3_T02duomBazecommand + i)
            })
          }// 12 lentelė create
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
          }// 14.2 lentelė create
          for (let i = 1; i <= parseInt(req.body.table142_name); i++) {
            foundUser.destytojas.tMTEP3_142.push({
              nr: i,
              pavadinimas: eval(tMTEP3_142pavadinimascommand + i),
              pastabos: eval(tMTEP3_142pastaboscommand + i)
            })
          }// 14.3 lentelė create
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
          }// 18 lentelė create
          for (let i = 1; i <= parseInt(req.body.yonder40); i++) {
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
          }// 21 lentelė create
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
            studKryptis: (kTOV4_KV03studKryptiscommand + i),
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
        }// 29 lentelė create
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
        }// 32 lentelė create
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
          foundUser.updated_for = req.user.id,
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
//deklaracijos submit
        var nrcommand = "req.body.nr";
        var dalykascommand = "req.body.dalykas";
        var grupecommand = "req.body.grupe";
        var semestrascommand = "req.body.semestras";
        var planuotosValcommand = "req.body.planuotosVal";
        var atliktosValcommand = "req.body.atliktosVal";
        var nD2_M02nrcommand = "req.body.nD2_M02nr";
        var bibliografAprcommand = "req.body.bibliografApr";
        var tipascommand = "req.body.tipas";
        var mokslSritcommand = "req.body.mokslSrit";
        var mokslKryptcommand = "req.body.mokslKrypt";
        var nD2_M03nrcommand = "req.body.nD2_M03nr";
        var nD2_M03studProgrcommand = "req.body.nD2_M03studProgr";
        var nD2_M03dalykPavadcommand = "req.body.nD2_M03dalykPavad";
        var nD2_M03apimtisKreditcommand = "req.body.nD2_M03apimtisKredit";
        var nD2_M04nrcommand = "req.body.nD2_M04nr";
        var nD2_M04studProgrcommand = "req.body.nD2_M04studProgr";
        var nD2_M04dalykPavadcommand = "req.body.nD2_M04dalykPavad";
        var nD2_M04busenacommand = "req.body.nD2_M04busena";
        var nD2_M04apimtisKreditcommand = "req.body.nD2_M04apimtisKredit";
        var nD2_D01nrcommand = "req.body.nD2_D01nr";
        var nD2_D01komitetascommand = "req.body.nD2_D01komitetas";
        var nD2_D01veiklacommand = "req.body.nD2_D01veikla";
        var nD2_D01rezultataicommand = "req.body.nD2_D01rezultatai";
        var nD2_D02nrcommand = "req.body.nD2_D02nr";
        var nD2_D02studKryptcommand = "req.body.nD2_D02studKrypt";
        var nD2_D02veiklacommand = "req.body.nD2_D02veikla";
        var nD2_D02rezultataicommand = "req.body.nD2_D02rezultatai";
        var nD2_D03nrcommand = "req.body.nD2_D03nr";
        var nD2_D03studProgrcommand = "req.body.nD2_D03studProgr";
        var nD2_D03veiklacommand = "req.body.nD2_D03veikla";
        var nD2_D03rezultataicommand = "req.body.nD2_D03rezultatai";
        var nD2_S01nrcommand = "req.body.nD2_S01nr";
        var nD2_S01veiklacommand = "req.body.nD2_S01veikla";
        var nD2_S01dataVietacommand = "req.body.nD2_S01dataVieta";
        var nD2_Snrcommand = "req.body.nD2_Snr";
        var nD2_Sstiprybescommand = "req.body.nD2_Sstiprybes";
        var nD2_Stobulintinacommand = "req.body.nD2_Stobulintina";
        var tMTEP3_T01nrcommand = "req.body.tMTEP3_T01nr";
        var tyrTematcommand = "req.body.tyrTemat";
        var tyrGrupcommand = "req.body.tyrGrup";
        var tMTEP3_T01mokslSritcommand = "req.body.tMTEP3_T01mokslSrit";
        var tMTEP3_T01mokslKryptcommand = "req.body.tMTEP3_T01mokslKrypt";
        var tMTEP3_T02nrcommand = "req.body.tMTEP3_T02nr";
        var tMTEP3_T02bibliografAprcommand = "req.body.tMTEP3_T02bibliografApr";
        var tMTEP3_T02tipascommand = "req.body.tMTEP3_T02tipas";
        var tMTEP3_T02mokslSritcommand = "req.body.tMTEP3_T02mokslSrit";
        var tMTEP3_T02mokslKryptcommand = "req.body.tMTEP3_T02mokslKrypt";
        var tMTEP3_T02duomBazecommand = "req.body.tMTEP3_T02duomBaze";
        var tMTEP3_T03nrcommand = "req.body.tMTEP3_T03nr";
        var tMTEP3_T03pilnasBiblAprcommand = "req.body.tMTEP3_T03pilnasBiblApr";
        var tMTEP3_T04nrcommand = "req.body.tMTEP3_T04nr";
        var tMTEP3_T04uzsakovascommand = "req.body.tMTEP3_T04uzsakovas";
        var tMTEP3_T04temacommand = "req.body.tMTEP3_T04tema";
        var tMTEP3_T04datacommand = "req.body.tMTEP3_T04data";
        var tMTEP3_T05nrcommand = "req.body.tMTEP3_T05nr";
        var tMTEP3_T05veiklPavadcommand = "req.body.tMTEP3_T05veiklPavad";
        var tMTEP3_T05veiklRezultcommand = "req.body.tMTEP3_T05veiklRezult";
        var tMTEP3_T06nrcommand = "req.body.tMTEP3_T06nr";
        var tMTEP3_T06autoriuscommand = "req.body.tMTEP3_T06autorius";
        var tMTEP3_T06menoSritcommand = "req.body.tMTEP3_T06menoSrit";
        var tMTEP3_T06pobudiscommand = "req.body.tMTEP3_T06pobudis";
        var tMTEP3_T06realizVietacommand = "req.body.tMTEP3_T06realizVieta";
        var tMTEP3_T06datacommand = "req.body.tMTEP3_T06data";
        var tMTEP3_T07nrcommand = "req.body.tMTEP3_T07nr";
        var tMTEP3_T07menoSritcommand = "req.body.tMTEP3_T07menoSrit";
        var tMTEP3_T07pavadinimascommand = "req.body.tMTEP3_T07pavadinimas";
        var tMTEP3_T07atlikVietacommand = "req.body.tMTEP3_T07atlikVieta";
        var tMTEP3_T07datacommand = "req.body.tMTEP3_T07data";
        var tMTEP3_T08Snrcommand = "req.body.tMTEP3_T08Snr";
        var tMTEP3_T08menoSritcommand = "req.body.tMTEP3_T08menoSrit";
        var tMTEP3_T08pavadinimascommand = "req.body.tMTEP3_T08pavadinimas";
        var tMTEP3_T08atlikVietacommand = "req.body.tMTEP3_T08atlikVieta";
        var tMTEP3_T08datacommand = "req.body.tMTEP3_T08data";
        var tMTEP3_T09nrcommand = "req.body.tMTEP3_T09nr";
        var tMTEP3_T09menoSritcommand = "req.body.tMTEP3_T09menoSrit";
        var tMTEP3_T09pavadinimascommand = "req.body.tMTEP3_T09pavadinimas";
        var tMTEP3_T09atlikVietacommand = "req.body.tMTEP3_T09atlikVieta";
        var tMTEP3_T09datacommand = "req.body.tMTEP3_T09data";
        var tMTEP3_T10nrcommand = "req.body.tMTEP3_T10nr";
        var tMTEP3_T10veiklPobudcommand = "req.body.tMTEP3_T10veiklPobud";
        var tMTEP3_T10veiklTikslcommand = "req.body.tMTEP3_T10veiklTiksl";
        var tMTEP3_T10dataVietacommand = "req.body.tMTEP3_T10dataVieta";
        var tMTEP3_T10dalyvSkcommand = "req.body.tMTEP3_T10dalyvSk";
        var tMTEP3_T10ktKomentaraicommand = "req.body.tMTEP3_T10ktKomentarai";
        var tMTEP3_T11nrcommand = "req.body.tMTEP3_T11nr";
        var tMTEP3_T11veiklPobudcommand = "req.body.tMTEP3_T11veiklPobud";
        var tMTEP3_T11veiklTikslcommand = "req.body.tMTEP3_T11veiklTiksl";
        var tMTEP3_T11dataVietacommand = "req.body.tMTEP3_T11dataVieta";
        var tMTEP3_T11dalyvSkcommand = "req.body.tMTEP3_T11dalyvSk";
        var tMTEP3_T11ktKomentaraicommand = "req.body.tMTEP3_T11ktKomentarai";
        var tMTEP3_T12nrcommand = "req.body.tMTEP3_T12nr";
        var tMTEP3_T12veiklPobudcommand = "req.body.tMTEP3_T12veiklPobud";
        var tMTEP3_T12dataVietacommand = "req.body.tMTEP3_T12dataVieta";
        var tMTEP3_T13nrcommand = "req.body.tMTEP3_T13nr";
        var tMTEP3_T13studDuomcommand = "req.body.tMTEP3_T13studDuom";
        var tMTEP3_T13renginioPavadcommand = "req.body.tMTEP3_T13renginioPavad";
        var tMTEP3_T13rezultatascommand = "req.body.tMTEP3_T13rezultatas";
        var tMTEP3_T13datacommand = "req.body.tMTEP3_T13data";
        var tMTEP3_T14nrcommand = "req.body.tMTEP3_T14nr";
        var tMTEP3_T14renginyscommand = "req.body.tMTEP3_T14renginys";
        var tMTEP3_T14veiklPobudcommand = "req.body.tMTEP3_T14veiklPobud";
        var tMTEP3_T14dataVietacommand = "req.body.tMTEP3_T14dataVieta";
        var tMTEP3_Snrcommand = "req.body.tMTEP3_Snr";
        var tMTEP3_Sstiprybescommand = "req.body.tMTEP3_Sstiprybes";
        var tMTEP3_Stobulintinacommand = "req.body.tMTEP3_Stobulintina";

        var kTOV4_KV03nrcommand = "req.body.kTOV4_KV03nr";
        var kTOV4_KV03saliscommand = "req.body.kTOV4_KV03salis";
        var kTOV4_KV03institucijacommand = "req.body.kTOV4_KV03institucija";
        var kTOV4_KV03dalykascommand = "req.body.kTOV4_KV03dalykas";
        var kTOV4_O01_1nrcommand = "req.body.kTOV4_O01_1nr";
        var kTOV4_O01_1veiklPobudcommand = "req.body.kTOV4_O01_1veiklPobud";
        var kTOV4_O01_1isakNrDatacommand = "req.body.kTOV4_O01_1isakNrData";
        var kTOV4_O01_2nrcommand = "req.body.kTOV4_O01_2nr";
        var kTOV4_O01_2veiklPobudcommand = "req.body.kTOV4_O01_2veiklPobud";
        var kTOV4_O01_2dataVietacommand = "req.body.kTOV4_O01_2dataVieta";
        var kTOV4_O01_2ktKomentaraicommand = "req.body.kTOV4_O01_2ktKomentarai";
        var kTOV4_Snrcommand = "req.body.kTOV4_Snr";
        var kTOV4_Sstiprybescommand = "req.body.kTOV4_Sstiprybes";
        var kTOV4_Stobulintinacommand = "req.body.kTOV4_Stobulintina";
        var kV5_KT01nrcommand = "req.body.kV5_KT01nr";
        var kV5_KT01diplomantascommand = "req.body.kV5_KT01diplomantas";
        var kV5_KT01studProgrcommand = "req.body.kV5_KT01studProgr";
        var kV5_KT01darboTemacommand = "req.body.kV5_KT01darboTema";
        var kV5_KT01uzsakovascommand = "req.body.kV5_KT01uzsakovas";
        var kV5_KT02nrcommand = "req.body.kV5_KT02nr";
        var kV5_KT02diplomantascommand = "req.body.kV5_KT02diplomantas";
        var kV5_KT02studProgrcommand = "req.body.kV5_KT02studProgr";
        var kV5_KT02darboTemacommand = "req.body.kV5_KT02darboTema";
        var nD2_D03studKryptiscommand = "req.body.nD2_D03studKryptis";
        // new :
        var tMTEP3_T03rengTipascommand = "req.body.tMTEP3_T03rengTipas";
        var tMTEP3_T04atlygArNecommand = "req.body.tMTEP3_T04atlygArNe";
        var tMTEP3_T05atlygArNecommand = "req.body.tMTEP3_T05atlygArNe";
        var tMTEP3_142pavadinimascommand = "req.body.tMTEP3_142pavadinimas";
        var tMTEP3_142pastaboscommand = "req.body.tMTEP3_142pastabos";
        var tMTEP3_143pavadinimascommand = "req.body.tMTEP3_143pavadinimas";
        var tMTEP3_143uzsakovascommand = "req.body.tMTEP3_143uzsakovas";
        var tMTEP3_T06atlygArNecommand = "req.body.tMTEP3_T06atlygArNe";
        var tMTEP3_T07atlygArNecommand = "req.body.tMTEP3_T07atlygArNe";
        var tMTEP3_T08atlygArNecommand = "req.body.tMTEP3_T08atlygArNe";
        var tMTEP3_T09atlygArNecommand = "req.body.tMTEP3_T09atlygArNe";
        var tMTEP3_T10atlygArNecommand = "req.body.tMTEP3_T10atlygArNe";
        var tMTEP3_T11atlygArNecommand = "req.body.tMTEP3_T11atlygArNe";

        var kTOV4_mokymopavadcommand = "req.body.kTOV4_mokymopavad";
        var kTOV4_mokymopazymNrcommand = "req.body.kTOV4_mokymopazymNr";
        var kTOV4_mokymotrukmeValLTcommand = "req.body.kTOV4_mokymotrukmeValLT";
        var kTOV4_mokymotrukmeValNeLTcommand = "req.body.kTOV4_mokymotrukmeValNeLT";

        var kTOV4_tyrimupavadcommand = "req.body.kTOV4_tyrimupavad";
        var kTOV4_tyrimupazymNrcommand = "req.body.kTOV4_tyrimupazymNr";
        var kTOV4_tyrimutrukmeValLTcommand = "req.body.kTOV4_tyrimutrukmeValLT";
        var kTOV4_tyrimutrukmeValNeLTcommand = "req.body.kTOV4_tyrimutrukmeValNeLT";

        var kTOV4_bendrosiospavadcommand = "req.body.kTOV4_bendrosiospavad";
        var kTOV4_bendrosiospazymNrcommand = "req.body.kTOV4_bendrosiospazymNr";
        var kTOV4_bendrosiostrukmeValLTcommand = "req.body.kTOV4_bendrosiostrukmeValLT";
        var kTOV4_bendrosiostrukmeValNeLTcommand = "req.body.kTOV4_bendrosiostrukmeValNeLT";

        var kTOV4_dalykpavadcommand = "req.body.kTOV4_dalykpavad";
        var kTOV4_dalykpazymNrcommand = "req.body.kTOV4_dalykpazymNr";
        var kTOV4_dalyktrukmeValLTcommand = "req.body.kTOV4_dalyktrukmeValLT";
        var kTOV4_dalyktrukmeValNeLTcommand = "req.body.kTOV4_dalyktrukmeValNeLT";

        var kTOV4_25renginysTemacommand = "req.body.kTOV4_25renginysTema";
        var kTOV4_25kompGrupecommand = "req.body.kTOV4_25kompGrupe";
        var kTOV4_25skirtacommand = "req.body.kTOV4_25skirta";

        var kTOV4_26imonIstaigcommand = "req.body.kTOV4_26imonIstaig";
        var kTOV4_26kompGrupecommand = "req.body.kTOV4_26kompGrupe";
        var kTOV4_26trukmeValcommand = "req.body.kTOV4_26trukmeVal";
        var kTOV4_26datacommand = "req.body.kTOV4_26data";

        var kTOV4_KV03studKryptiscommand = "req.body.kTOV4_KV03studKryptis";
        var kTOV4_O01_2destytojascommand = "req.body.kTOV4_O01_2destytojas";
        var kTOV4_29veiklacommand = "req.body.kTOV4_29veikla";
        var kTOV4_29socPartneriscommand = "req.body.kTOV4_29socPartneris";
        var kV5_KT01studKryptiscommand = "req.body.kV5_KT01studKryptis";
        var kV5_KT02studKryptiscommand = "req.body.kV5_KT02studKryptis";
        var kV5_32socaprasymascommand = "req.body.kV5_32socaprasymas";
        var kV5_32aplinkaprasymascommand = "req.body.kV5_32aplinkaprasymas";
        var kV5_32valstybaprasymascommand = "req.body.kV5_32valstybaprasymas";
        var kV5_32etnoaprasymascommand = "req.body.kV5_32etnoaprasymas";
        var kV5_32savaprasymascommand = "req.body.kV5_32savaprasymas";

        var kV5_33veiklacommand = "req.body.kV5_33veikla";
        var kV5_33veiklPartnercommand = "req.body.kV5_33veiklPartner";
        var kV5_33organizaccommand = "req.body.kV5_33organizac";
        var kV5_33veiklOrientavimcommand = "req.body.kV5_33veiklOrientavim";
        var kV5_33dalyviaicommand = "req.body.kV5_33dalyviai";
        var kV5_33laikascommand = "req.body.kV5_33laikas";
        var kV5_33vietacommand = "req.body.kV5_33vieta";

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

        //ciklai
      //Irasinejimas i DB prasideda:
        for (let i = 1; i <= parseInt(req.body.yond2); i++) {
          var iteracija = i;
          var nriteracija = nrcommand + iteracija;
          var dalykasiteracija = dalykascommand + iteracija;
          var grupeiteracija = grupecommand + iteracija;
          var semestrasiteracija = semestrascommand + iteracija;
          var planuotosValiteracija = planuotosValcommand + iteracija;
          var atliktosValiteracija = atliktosValcommand + iteracija;
          var joinednr = eval(nriteracija);
          var joineddalykas = eval(dalykasiteracija);
          var joinedgrupe = eval(grupeiteracija);
          var joinedsemestras = eval(semestrasiteracija);
          var joinedplanuotosVal = eval(planuotosValiteracija);
          var joinedatliktosVal = eval(atliktosValiteracija);
          if (joineddalykas != "" || joinedgrupe != "" || joinedsemestras != "" || joinedplanuotosVal != "" || joinedatliktosVal != "") {
            foundUser.destytojas.kD1_K01.kD1_K01_array.push({
              nr: joinednr,
              dalykas: joineddalykas,
              grupe: joinedgrupe,
              semestras: joinedsemestras,
              planuotosVal: joinedplanuotosVal,
              atliktosVal: joinedatliktosVal
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

        for (let c = 1; c <= parseInt(req.body.yond8); c++) {
          var iteracija4 = c;
          var nD2_M02nriteracija = nD2_M02nrcommand + iteracija4;
          var bibliografApriteracija = bibliografAprcommand + iteracija4;
          var tipasiteracija = tipascommand + iteracija4;
          var mokslSrititeracija = mokslSritcommand + iteracija4;
          var mokslKryptiteracija = mokslKryptcommand + iteracija4;
          var joinednD2_M02nr = eval(nD2_M02nriteracija);
          var joinedbibliografApr = eval(bibliografApriteracija);
          var joinedtipas = eval(tipasiteracija);
          var joinedmokslSritit = eval(mokslSrititeracija);
          var joinedmokslKrypt = eval(mokslKryptiteracija);
          if (joinedbibliografApr != "" || joinedtipas != "" || joinedmokslSritit != "" || joinedmokslKrypt != "") {
            foundUser.destytojas.nD2_M02.push({
              nr: joinednD2_M02nr,
              bibliografApr: joinedbibliografApr,
              tipas: joinedtipas,
              mokslSrit: joinedmokslSritit,
              mokslKrypt: joinedmokslKrypt,
            })
          }
        }
        for (let d = 1; d <= parseInt(req.body.yond10); d++) {
          var iteracija5 = d;
          var nD2_M03nriteracija = nD2_M03nrcommand + iteracija5;
          var nD2_M03studProgriteracija = nD2_M03studProgrcommand + iteracija5;
          var nD2_M03dalykPavaditeracija = nD2_M03dalykPavadcommand + iteracija5;
          var nD2_M03apimtisKredititeracija = nD2_M03apimtisKreditcommand + iteracija5;
          var joinednD2_M03nr = eval(nD2_M03nriteracija);
          var joinednD2_M03studProgr = eval(nD2_M03studProgriteracija);
          var joinednD2_M03dalykPavad = eval(nD2_M03dalykPavaditeracija);
          var joinednD2_M03apimtisKredit = eval(nD2_M03apimtisKredititeracija);
          if (joinednD2_M03studProgr != "" || joinednD2_M03dalykPavad != "" || joinednD2_M03apimtisKredit != "") {
            foundUser.destytojas.nD2_M03.push({
              nr: joinednD2_M03nr,
              studProgr: joinednD2_M03studProgr,
              dalykPavad: joinednD2_M03dalykPavad,
              apimtisKredit: joinednD2_M03apimtisKredit
            })
          }
        }
        for (let e = 1; e <= parseInt(req.body.yond12); e++) {
          var iteracija6 = e;
          var nD2_M04nriteracija = nD2_M04nrcommand + iteracija6;
          var nD2_M04studProgriteracija = nD2_M04studProgrcommand + iteracija6;
          var nD2_M04dalykPavaditeracija = nD2_M04dalykPavadcommand + iteracija6;
          var nD2_M04busenaiteracija = nD2_M04busenacommand + iteracija6;
          var nD2_M04apimtisKredititeracija = nD2_M04apimtisKreditcommand + iteracija6;
          var joinednD2_M04nr = eval(nD2_M04nriteracija);
          var joinednD2_M04studProgr = eval(nD2_M04studProgriteracija);
          var joinednD2_M04dalykPavad = eval(nD2_M04dalykPavaditeracija);
          var joinednD2_M04busena = eval(nD2_M04busenaiteracija);
          var joinednD2_M04apimtisKredit = eval(nD2_M04apimtisKredititeracija);
          if (joinednD2_M04studProgr != "" || joinednD2_M04dalykPavad != "" || joinednD2_M04busena != "" || joinednD2_M04apimtisKredit != "") {
            foundUser.destytojas.nD2_M04.push({
              nr: joinednD2_M04nr,
              studProgr: joinednD2_M04studProgr,
              dalykPavad: joinednD2_M04dalykPavad,
              busena: joinednD2_M04busena,
              apimtisKredit: joinednD2_M04apimtisKredit
            })
          }
        }
        for (let f = 1; f <= parseInt(req.body.yond14); f++) {
          var iteracija7 = f;
          var nD2_D01nriteracija = nD2_D01nrcommand + iteracija7;
          var nD2_D01komitetasiteracija = nD2_D01komitetascommand + iteracija7;
          var nD2_D01veiklaiteracija = nD2_D01veiklacommand + iteracija7;
          var nD2_D01rezultataiiteracija = nD2_D01rezultataicommand + iteracija7;
          var joinednD2_D01nr = eval(nD2_D01nriteracija);
          var joinednD2_D01komitetas = eval(nD2_D01komitetasiteracija);
          var joinednD2_D01veikla = eval(nD2_D01veiklaiteracija);
          var joinednD2_D01rezultatai = eval(nD2_D01rezultataiiteracija);
          if (joinednD2_D01komitetas != "" || joinednD2_D01veikla != "" || joinednD2_D01rezultatai != "") {
            foundUser.destytojas.nD2_D01.push({
              nr: joinednD2_D01nr,
              komitetas: joinednD2_D01komitetas,
              veikla: joinednD2_D01veikla,
              rezultatai: joinednD2_D01rezultatai
            })
          }
        }
        for (let g = 1; g <= parseInt(req.body.yond16); g++) {
          var iteracija8 = g;
          var nD2_D02nriteracija = nD2_D02nrcommand + iteracija8;
          var nD2_D02studKryptiteracija = nD2_D02studKryptcommand + iteracija8;
          var nD2_D02veiklaiteracija = nD2_D02veiklacommand + iteracija8;
          var nD2_D02rezultataiiteracija = nD2_D02rezultataicommand + iteracija8;
          var joinednD2_D02nr = eval(nD2_D02nriteracija);
          var joinednD2_D02studKrypt = eval(nD2_D02studKryptiteracija);
          var joinednD2_D02veikla = eval(nD2_D02veiklaiteracija);
          var joinednD2_D02rezultatai = eval(nD2_D02rezultataiiteracija);
          if (joinednD2_D02studKrypt != "" || joinednD2_D02veikla != "" || joinednD2_D02rezultatai != "") {
            foundUser.destytojas.nD2_D02.push({
              nr: joinednD2_D02nr,
              studKryptis: joinednD2_D02studKrypt,
              veikla: joinednD2_D02veikla,
              rezultatai: joinednD2_D02rezultatai
            })
          }
        }
        for (let h = 1; h <= parseInt(req.body.yond18); h++) {
          var iteracija9 = h;
          var nD2_D03nriteracija = nD2_D03nrcommand + iteracija9;
          var nD2_D03studKryptisiteracija = nD2_D03studKryptiscommand + h;
          var nD2_D03studProgriteracija = nD2_D03studProgrcommand + iteracija9;
          var nD2_D03veiklaiteracija = nD2_D03veiklacommand + iteracija9;
          var nD2_D03rezultataiiteracija = nD2_D03rezultataicommand + iteracija9;
          var joinednD2_D03nr = eval(nD2_D03nriteracija);
          var joinednD2_D03studKryptis = eval(nD2_D03studKryptisiteracija);
          var joinednD2_D03studProgr = eval(nD2_D03studProgriteracija);
          var joinednD2_D03veikla = eval(nD2_D03veiklaiteracija);
          var joinednD2_D03rezultatai = eval(nD2_D03rezultataiiteracija);
          if (joinednD2_D03studKryptis != "" || joinednD2_D03studProgr != "" || joinednD2_D03veikla != "" || joinednD2_D03rezultatai != "") {
          foundUser.destytojas.nD2_D03.push({
            nr: joinednD2_D03nr,
            studKryptis: joinednD2_D03studKryptis,
            studProgr: joinednD2_D03studProgr,
            veikla: joinednD2_D03veikla,
            rezultatai: joinednD2_D03rezultatai
          })
        }
        }
        for (let j = 1; j <= parseInt(req.body.yond20); j++) {
          var iteracija10 = j;
          var nD2_S01nriteracija = nD2_S01nrcommand + iteracija10;
          var nD2_S01veiklaiteracija = nD2_S01veiklacommand + iteracija10;
          var nD2_S01dataVietaiteracija = nD2_S01dataVietacommand + iteracija10;
          var joinednD2_S01nr = eval(nD2_S01nriteracija);
          var joinednD2_S01veikla = eval(nD2_S01veiklaiteracija);
          var joinednD2_S01dataVieta = eval(nD2_S01dataVietaiteracija);
          if (joinednD2_S01veikla != "" || joinednD2_S01dataVieta != "") {
            foundUser.destytojas.nD2_S01.push({
              nr: joinednD2_S01nr,
              veikla: joinednD2_S01veikla,
              dataVieta: joinednD2_S01dataVieta
            })
          }
        }
        for (let k = 1; k <= parseInt(req.body.yond22); k++) {
          var iteracija11 = k;
          var nD2_Snriteracija = nD2_Snrcommand + iteracija11;
          var nD2_Sstiprybesiteracija = nD2_Sstiprybescommand + iteracija11;
          var nD2_Stobulintinaiteracija = nD2_Stobulintinacommand + iteracija11;
          var joinednD2_Snr = eval(nD2_Snriteracija);
          var joinednD2_Sstiprybes = eval(nD2_Sstiprybesiteracija);
          var joinednD2_Stobulintina = eval(nD2_Stobulintinaiteracija);
          if (joinednD2_Sstiprybes != "" || joinednD2_Stobulintina != "") {
            foundUser.destytojas.nD2_S.push({
              nr: joinednD2_Snr,
              stiprybes: joinednD2_Sstiprybes,
              tobulintina: joinednD2_Stobulintina
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

        for (let l = 1; l <= parseInt(req.body.yond24); l++) {
          var iteracija12 = l;
          var tMTEP3_T01nriteracija = tMTEP3_T01nrcommand + iteracija12;
          var tyrTematiteracija = tyrTematcommand + iteracija12;
          var tyrGrupiteracija = tyrGrupcommand + iteracija12;
          var tMTEP3_T01mokslSrititeracija = tMTEP3_T01mokslSritcommand + iteracija12;
          var tMTEP3_T01mokslKryptiteracija = tMTEP3_T01mokslKryptcommand + iteracija12;
          var joinedtMTEP3_T01nr = eval(tMTEP3_T01nriteracija);
          var joinedtyrTemat = eval(tyrTematiteracija);
          var joinedtyrGrup = eval(tyrGrupiteracija);
          var joinedtMTEP3_T01mokslSrit = eval(tMTEP3_T01mokslSrititeracija);
          var joinedtMTEP3_T01mokslKrypt = eval(tMTEP3_T01mokslKryptiteracija);
          if (joinedtyrTemat != "" || joinedtyrGrup != "" || joinedtMTEP3_T01mokslSrit != "" || joinedtMTEP3_T01mokslKrypt != "") {
            foundUser.destytojas.tMTEP3_T01.push({
              nr: joinedtMTEP3_T01nr,
              tyrTemat: joinedtyrTemat,
              tyrGrup: joinedtyrGrup,
              mokslSrit: joinedtMTEP3_T01mokslSrit,
              mokslKrypt: joinedtMTEP3_T01mokslKrypt
            })
          }
        }
        for (let m = 1; m <= parseInt(req.body.yond26); m++) {
          var iteracija13 = m;
          var tMTEP3_T02nriteracija = tMTEP3_T02nrcommand + iteracija13;
          var tMTEP3_T02bibliografApriteracija = tMTEP3_T02bibliografAprcommand + iteracija13;
          var tMTEP3_T02tipasiteracija = tMTEP3_T02tipascommand + iteracija13;
          var tMTEP3_T02mokslSrititeracija = tMTEP3_T02mokslSritcommand + iteracija13;
          var tMTEP3_T02mokslKryptiteracija = tMTEP3_T02mokslKryptcommand + iteracija13;
          var tMTEP3_T02duomBazeiteracija = tMTEP3_T02duomBazecommand + iteracija13;
          var joinedtMTEP3_T02nr = eval(tMTEP3_T02nriteracija);
          var joinedtMTEP3_T02bibliografApr = eval(tMTEP3_T02bibliografApriteracija);
          var joinedtMTEP3_T02tipas = eval(tMTEP3_T02tipasiteracija);
          var joinedtMTEP3_T02mokslSrit = eval(tMTEP3_T02mokslSrititeracija);
          var joinedtMTEP3_T02mokslKrypt = eval(tMTEP3_T02mokslKryptiteracija);
          var joinedtMTEP3_T02duomBaze = eval(tMTEP3_T02duomBazeiteracija);
          if (joinedtMTEP3_T02bibliografApr != "" || joinedtMTEP3_T02tipas != "" || joinedtMTEP3_T02mokslSrit != "" || joinedtMTEP3_T02mokslKrypt != "" || joinedtMTEP3_T02duomBaze != "") {
            foundUser.destytojas.tMTEP3_T02.push({
              nr: joinedtMTEP3_T02nr,
              bibliografApr: joinedtMTEP3_T02bibliografApr,
              tipas: joinedtMTEP3_T02tipas,
              mokslSrit: joinedtMTEP3_T02mokslSrit,
              mokslKrypt: joinedtMTEP3_T02mokslKrypt,
              duomBaze: joinedtMTEP3_T02duomBaze
            })
          }
        }
        for (let n = 1; n <= parseInt(req.body.yond28); n++) {
          var iteracija14 = n;
          var tMTEP3_T03nriteracija = tMTEP3_T03nrcommand + iteracija14;
          var tMTEP3_T03pilnasBiblApriteracija = tMTEP3_T03pilnasBiblAprcommand + iteracija14;
          var tMTEP3_T03rengTipasiteracija = tMTEP3_T03rengTipascommand + n;
          var joinedtMTEP3_T03nr = eval(tMTEP3_T03nriteracija);
          var joinedtMTEP3_T03pilnasBiblApr = eval(tMTEP3_T03pilnasBiblApriteracija);
          var joinedtMTEP3_T03rengTipas = eval(tMTEP3_T03rengTipasiteracija);
          if (joinedtMTEP3_T03pilnasBiblApr != "" || joinedtMTEP3_T03rengTipas != "") {
            foundUser.destytojas.tMTEP3_T03.push({
              nr: joinedtMTEP3_T03nr,
              pilnasBiblApr: joinedtMTEP3_T03pilnasBiblApr,
              rengTipas: joinedtMTEP3_T03rengTipas
            })
          }
        }
        for (let o = 1; o <= parseInt(req.body.yond30); o++) {
          var tMTEP3_T04nriteracija = tMTEP3_T04nrcommand + o;
          var tMTEP3_T04uzsakovasiteracija = tMTEP3_T04uzsakovascommand + o;
          var tMTEP3_T04temaiteracija = tMTEP3_T04temacommand + o;
          var tMTEP3_T04dataiteracija = tMTEP3_T04datacommand + o;
          var tMTEP3_T04atlygArNeiteracija = tMTEP3_T04atlygArNecommand + o;
          var joinedtMTEP3_T04nr = eval(tMTEP3_T04nriteracija);
          var joinedtMTEP3_T04uzsakovas = eval(tMTEP3_T04uzsakovasiteracija);
          var joinedtMTEP3_T04tema = eval(tMTEP3_T04temaiteracija);
          var joinedtMTEP3_T04data = eval(tMTEP3_T04dataiteracija);
          var joinedtMTEP3_T04atlygArNe = eval(tMTEP3_T04atlygArNeiteracija);
          if (joinedtMTEP3_T04uzsakovas != "" || joinedtMTEP3_T04tema != "" || joinedtMTEP3_T04data != "" || joinedtMTEP3_T04atlygArNe != "") {
            foundUser.destytojas.tMTEP3_T04.push({
              nr: joinedtMTEP3_T04nr,
              uzsakovas: joinedtMTEP3_T04uzsakovas,
              tema: joinedtMTEP3_T04tema,
              data: joinedtMTEP3_T04data,
              atlygArNe: joinedtMTEP3_T04atlygArNe
            })
          }
        }
        for (let p = 1; p <= parseInt(req.body.yond32); p++) {

          var tMTEP3_T05nriteracija = tMTEP3_T05nrcommand + p;
          var tMTEP3_T05veiklPavaditeracija = tMTEP3_T05veiklPavadcommand + p;
          var tMTEP3_T05veiklRezultiteracija = tMTEP3_T05veiklRezultcommand + p;
          var tMTEP3_T05atlygArNeiteracija = tMTEP3_T05atlygArNecommand + p;
          var joinedtMTEP3_T05nr = eval(tMTEP3_T05nriteracija);
          var joinedtMTEP3_T05veiklPavad = eval(tMTEP3_T05veiklPavaditeracija);
          var joinedtMTEP3_T05veiklRezult = eval(tMTEP3_T05veiklRezultiteracija);
          var joinedtMTEP3_T05atlygArNe = eval(tMTEP3_T05atlygArNeiteracija);
          if (joinedtMTEP3_T05veiklPavad != "" || joinedtMTEP3_T05veiklRezult != "" || joinedtMTEP3_T05atlygArNe != "") {
            foundUser.destytojas.tMTEP3_T05.push({
              nr: joinedtMTEP3_T05nr,
              veiklPavad: joinedtMTEP3_T05veiklPavad,
              veiklRezult: joinedtMTEP3_T05veiklRezult,
              atlygArNe: joinedtMTEP3_T05atlygArNe
            })
          }
        }
        for (let i = 1; i <= parseInt(req.body.new2); i++) {
          var tMTEP3_142pavadinimasi = tMTEP3_142pavadinimascommand + i;
          var tMTEP3_142pastabosi = tMTEP3_142pastaboscommand + i;
          var joinedtMTEP3_142pavadinimas = eval(tMTEP3_142pavadinimasi);
          var joinedtMTEP3_142pastabos = eval(tMTEP3_142pastabosi);
            if (joinedtMTEP3_142pavadinimas != "" || joinedtMTEP3_142pastabos != "") {
          foundUser.destytojas.tMTEP3_142.push({
            nr: i,
            pavadinimas: joinedtMTEP3_142pavadinimas,
            pastabos: joinedtMTEP3_142pastabos
          })
        }
        }
        for (let i = 1; i <= parseInt(req.body.new4); i++) {
          var tMTEP3_143pavadinimasi = tMTEP3_143pavadinimascommand + i;
          var tMTEP3_143uzsakovasi = tMTEP3_143uzsakovascommand + i;
          var joinedtMTEP3_143pavadinimas = eval(tMTEP3_143pavadinimasi);
          var joinedtMTEP3_143uzsakovas = eval(tMTEP3_143uzsakovasi);
          if (joinedtMTEP3_143pavadinimas != "" || joinedtMTEP3_143uzsakovas != "") {
          foundUser.destytojas.tMTEP3_143.push({
            nr: i,
            pavadinimas: joinedtMTEP3_143pavadinimas,
            uzsakovas: joinedtMTEP3_143uzsakovas
          })
        }
        }
        for (let q = 1; q <= parseInt(req.body.yond34); q++) {
          var tMTEP3_T06nriteracija = tMTEP3_T06nrcommand + q;
          var tMTEP3_T06autoriusiteracija = tMTEP3_T06autoriuscommand + q;
          var tMTEP3_T06menoSrititeracija = tMTEP3_T06menoSritcommand + q;
          var tMTEP3_T06pobudisiteracija = tMTEP3_T06pobudiscommand + q;
          var tMTEP3_T06realizVietaiteracija = tMTEP3_T06realizVietacommand + q;
          var tMTEP3_T06dataiteracija = tMTEP3_T06datacommand + q;
          var tMTEP3_T06atlygArNeiteracija = tMTEP3_T06atlygArNecommand + q;
          var joinedtMTEP3_T06nr = eval(tMTEP3_T06nriteracija);
          var joinedtMTEP3_T06autorius = eval(tMTEP3_T06autoriusiteracija);
          var joinedtMTEP3_T06menoSrit = eval(tMTEP3_T06menoSrititeracija);
          var joinedtMTEP3_T06pobudis = eval(tMTEP3_T06pobudisiteracija);
          var joinedtMTEP3_T06realizVieta = eval(tMTEP3_T06realizVietaiteracija);
          var joinedtMTEP3_T06data = eval(tMTEP3_T06dataiteracija);
          var joinedtMTEP3_T06atlygArNe = eval(tMTEP3_T06atlygArNeiteracija);
          if (joinedtMTEP3_T06autorius != "" || joinedtMTEP3_T06menoSrit != "" || joinedtMTEP3_T06pobudis != ""
          || joinedtMTEP3_T06realizVieta != "" || joinedtMTEP3_T06data != "" || joinedtMTEP3_T06atlygArNe != "") {
            foundUser.destytojas.tMTEP3_T06.push({
              nr: joinedtMTEP3_T06nr,
              autorius: joinedtMTEP3_T06autorius,
              menoSrit: joinedtMTEP3_T06menoSrit,
              pobudis: joinedtMTEP3_T06pobudis,
              realizVieta: joinedtMTEP3_T06realizVieta,
              data: joinedtMTEP3_T06data,
              atlygArNe: joinedtMTEP3_T06atlygArNe
            })
          }
        }
        for (let r = 1; r <= parseInt(req.body.yond36); r++) {
          var tMTEP3_T07nriteracija = tMTEP3_T07nrcommand + r;
          var tMTEP3_T07menoSrititeracija = tMTEP3_T07menoSritcommand + r;
          var tMTEP3_T07pavadinimasiteracija = tMTEP3_T07pavadinimascommand + r;
          var tMTEP3_T07atlikVietaiteracija = tMTEP3_T07atlikVietacommand + r;
          var tMTEP3_T07dataiteracija = tMTEP3_T07datacommand + r;
          var tMTEP3_T07atlygArNeiteracija = tMTEP3_T07atlygArNecommand + r;
          var joinedtMTEP3_T07nr = eval(tMTEP3_T07nriteracija);
          var joinedtMTEP3_T07menoSrit = eval(tMTEP3_T07menoSrititeracija);
          var joinedtMTEP3_T07pavadinimas = eval(tMTEP3_T07pavadinimasiteracija);
          var joinedtMTEP3_T07atlikVieta = eval(tMTEP3_T07atlikVietaiteracija);
          var joinedtMTEP3_T07data = eval(tMTEP3_T07dataiteracija);
          var joinedtMTEP3_T07atlygArNe = eval(tMTEP3_T07atlygArNeiteracija);
          if (joinedtMTEP3_T07menoSrit != "" || joinedtMTEP3_T07pavadinimas != "" || joinedtMTEP3_T07atlikVieta != "" ||
          joinedtMTEP3_T07data != "" || joinedtMTEP3_T07menoSrit != "" || joinedtMTEP3_T06atlygArNe != "") {
            foundUser.destytojas.tMTEP3_T07.push({
              nr: joinedtMTEP3_T07nr,
              menoSrit: joinedtMTEP3_T07menoSrit,
              pavadinimas: joinedtMTEP3_T07pavadinimas,
              atlikVieta: joinedtMTEP3_T07atlikVieta,
              data: joinedtMTEP3_T07data,
              atlygArNe: joinedtMTEP3_T07atlygArNe
            })
          }
        }
        for (let s = 1; s <= parseInt(req.body.yond38); s++) {
          var tMTEP3_T08Snriteracija = tMTEP3_T08Snrcommand + s;
          var tMTEP3_T08menoSrititeracija = tMTEP3_T08menoSritcommand + s;
          var tMTEP3_T08pavadinimasiteracija = tMTEP3_T08pavadinimascommand + s;
          var tMTEP3_T08atlikVietaiteracija = tMTEP3_T08atlikVietacommand + s;
          var tMTEP3_T08dataiteracija = tMTEP3_T08datacommand + s;
          var tMTEP3_T08atlygArNeiteracija = tMTEP3_T08atlygArNecommand + s;
          var joinedtMTEP3_T08Snr = eval(tMTEP3_T08Snriteracija);
          var joinedtMTEP3_T08menoSrit = eval(tMTEP3_T08menoSrititeracija);
          var joinedtMTEP3_T08pavadinimas = eval(tMTEP3_T08pavadinimasiteracija);
          var joinedtMTEP3_T08atlikVieta = eval(tMTEP3_T08atlikVietaiteracija);
          var joinedtMTEP3_T08data = eval(tMTEP3_T08dataiteracija);
          var joinedtMTEP3_T08atlygArNe = eval(tMTEP3_T08atlygArNeiteracija);
          if (joinedtMTEP3_T08menoSrit != "" || joinedtMTEP3_T08pavadinimas != "" ||
          joinedtMTEP3_T08atlikVieta != "" || joinedtMTEP3_T08data != "" || joinedtMTEP3_T06atlygArNe != "") {
            foundUser.destytojas.tMTEP3_T08.push({
              nr: joinedtMTEP3_T08Snr,
              menoSrit: joinedtMTEP3_T08menoSrit,
              pavadinimas: joinedtMTEP3_T08pavadinimas,
              atlikVieta: joinedtMTEP3_T08atlikVieta,
              data: joinedtMTEP3_T08data,
              atlygArNe: joinedtMTEP3_T08atlygArNe
            })
          }
        }
        for (let t = 1; t <= parseInt(req.body.yond40); t++) {
          var tMTEP3_T09nriteracija = tMTEP3_T09nrcommand + t;
          var tMTEP3_T09menoSrititeracija = tMTEP3_T09menoSritcommand + t;
          var tMTEP3_T09pavadinimasiteracija = tMTEP3_T09pavadinimascommand + t;
          var tMTEP3_T09atlikVietaiteracija = tMTEP3_T09atlikVietacommand + t;
          var tMTEP3_T09dataiteracija = tMTEP3_T09datacommand + t;
          var tMTEP3_T09atlygArNeiteracija = tMTEP3_T09atlygArNecommand + t;
          var joinedtMTEP3_T09nr = eval(tMTEP3_T09nriteracija);
          var joinedtMTEP3_T09menoSrit = eval(tMTEP3_T09menoSrititeracija);
          var joinedtMTEP3_T09pavadinimas = eval(tMTEP3_T09pavadinimasiteracija);
          var joinedtMTEP3_T09atlikVieta = eval(tMTEP3_T09atlikVietaiteracija);
          var joinedtMTEP3_T09data = eval(tMTEP3_T09dataiteracija);
          var joinedtMTEP3_T09atlygArNe = eval(tMTEP3_T09atlygArNeiteracija);
          if (joinedtMTEP3_T09menoSrit != "" || joinedtMTEP3_T09pavadinimas != "" ||
          joinedtMTEP3_T09atlikVieta != "" || joinedtMTEP3_T09data != "" || joinedtMTEP3_T06atlygArNe != "") {
            foundUser.destytojas.tMTEP3_T09.push({
              nr: joinedtMTEP3_T09nr,
              menoSrit: joinedtMTEP3_T09menoSrit,
              pavadinimas: joinedtMTEP3_T09pavadinimas,
              atlikVieta: joinedtMTEP3_T09atlikVieta,
              data: joinedtMTEP3_T09data,
              atlygArNe: joinedtMTEP3_T09atlygArNe
            })
          }
        }
        for (let u = 1; u <= parseInt(req.body.yond42); u++) {
          var tMTEP3_T10nriteracija = tMTEP3_T10nrcommand + u;
          var tMTEP3_T10veiklPobuditeracija = tMTEP3_T10veiklPobudcommand + u;
          var tMTEP3_T10veiklTiksliteracija = tMTEP3_T10veiklTikslcommand + u;
          var tMTEP3_T10dataVietaiteracija = tMTEP3_T10dataVietacommand + u;
          var tMTEP3_T10dalyvSkiteracija = tMTEP3_T10dalyvSkcommand + u;
          var tMTEP3_T10ktKomentaraiiteracija = tMTEP3_T10ktKomentaraicommand + u;
          var tMTEP3_T10atlygArNeiteracija = tMTEP3_T10atlygArNecommand + u;
          var joinedtMTEP3_T10nr = eval(tMTEP3_T10nriteracija);
          var joinedtMTEP3_T10veiklPobud = eval(tMTEP3_T10veiklPobuditeracija);
          var joinedtMTEP3_T10veiklTiksl = eval(tMTEP3_T10veiklTiksliteracija);
          var joinedtMTEP3_T10dataVieta = eval(tMTEP3_T10dataVietaiteracija);
          var joinedtMTEP3_T10dalyvSk = eval(tMTEP3_T10dalyvSkiteracija);
          var joinedtMTEP3_T10ktKomentarai = eval(tMTEP3_T10ktKomentaraiiteracija);
          var joinedtMTEP3_T10atlygArNe = eval(tMTEP3_T10atlygArNeiteracija);
          if (joinedtMTEP3_T10veiklPobud != "" || joinedtMTEP3_T10veiklTiksl != "" ||
          joinedtMTEP3_T10dataVieta != "" || joinedtMTEP3_T10dalyvSk != "" || joinedtMTEP3_T10ktKomentarai != ""
          || joinedtMTEP3_T06atlygArNe != "") {
            foundUser.destytojas.tMTEP3_T10.push({
              nr: joinedtMTEP3_T10nr,
              veiklPobud: joinedtMTEP3_T10veiklPobud,
              veiklTiksl: joinedtMTEP3_T10veiklTiksl,
              dataVieta: joinedtMTEP3_T10dataVieta,
              dalyvSk: joinedtMTEP3_T10dalyvSk,
              ktKomentarai: joinedtMTEP3_T10ktKomentarai,
              atlygArNe: joinedtMTEP3_T10atlygArNe
            })
          }
        }
        for (let v = 1; v <= parseInt(req.body.yond44); v++) {
          var tMTEP3_T11nriteracija = tMTEP3_T11nrcommand + v;
          var tMTEP3_T11veiklPobuditeracija = tMTEP3_T11veiklPobudcommand + v;
          var tMTEP3_T11veiklTiksliteracija = tMTEP3_T11veiklTikslcommand + v;
          var tMTEP3_T11dataVietaiteracija = tMTEP3_T11dataVietacommand + v;
          var tMTEP3_T11dalyvSkiteracija = tMTEP3_T11dalyvSkcommand + v;
          var tMTEP3_T11ktKomentaraiiteracija = tMTEP3_T11ktKomentaraicommand + v;
          var tMTEP3_T11atlygArNeiteracija = tMTEP3_T11atlygArNecommand + v;
          var joinedtMTEP3_T11nr = eval(tMTEP3_T11nriteracija);
          var joinedtMTEP3_T11veiklPobud = eval(tMTEP3_T11veiklPobuditeracija);
          var joinedtMTEP3_T11veiklTiksl = eval(tMTEP3_T11veiklTiksliteracija);
          var joinedtMTEP3_T11dataVieta = eval(tMTEP3_T11dataVietaiteracija);
          var joinedtMTEP3_T11dalyvSk = eval(tMTEP3_T11dalyvSkiteracija);
          var joinedtMTEP3_T11ktKomentarai = eval(tMTEP3_T11ktKomentaraiiteracija);
          var joinedtMTEP3_T11atlygArNe = eval(tMTEP3_T11atlygArNeiteracija);
          if (joinedtMTEP3_T11veiklPobud != "" || joinedtMTEP3_T11veiklTiksl != "" ||
          joinedtMTEP3_T11dataVieta != "" || joinedtMTEP3_T11dalyvSk != "" || joinedtMTEP3_T11ktKomentarai != ""
          || joinedtMTEP3_T06atlygArNe != "") {
            foundUser.destytojas.tMTEP3_T11.push({
              nr: joinedtMTEP3_T11nr,
              veiklPobud: joinedtMTEP3_T11veiklPobud,
              veiklTiksl: joinedtMTEP3_T11veiklTiksl,
              dataVieta: joinedtMTEP3_T11dataVieta,
              dalyvSk: joinedtMTEP3_T11dalyvSk,
              ktKomentarai: joinedtMTEP3_T11ktKomentarai,
              atlygArNe: joinedtMTEP3_T11atlygArNe
            })
          }
        }
        for (let w = 1; w <= parseInt(req.body.yond46); w++) {
          var tMTEP3_T12nriteracija = tMTEP3_T12nrcommand + w;
          var tMTEP3_T12veiklPobuditeracija = tMTEP3_T12veiklPobudcommand + w;
          var tMTEP3_T12dataVietaiteracija = tMTEP3_T12dataVietacommand + w;
          var joinedtMTEP3_T12nr = eval(tMTEP3_T12nriteracija);
          var joinedtMTEP3_T12veiklPobud = eval(tMTEP3_T12veiklPobuditeracija);
          var joinedtMTEP3_T12dataVieta = eval(tMTEP3_T12dataVietaiteracija);
          if (joinedtMTEP3_T12veiklPobud != "" || joinedtMTEP3_T12dataVieta != "") {
            foundUser.destytojas.tMTEP3_T12.push({
              nr: joinedtMTEP3_T12nr,
              veiklPobud: joinedtMTEP3_T12veiklPobud,
              dataVieta: joinedtMTEP3_T12dataVieta
            })
          }
        }
        for (let x = 1; x <= parseInt(req.body.yond48); x++) {
          var tMTEP3_T13nriteracija = tMTEP3_T13nrcommand + x;
          var tMTEP3_T13studDuomiteracija = tMTEP3_T13studDuomcommand + x;
          var tMTEP3_T13renginioPavaditeracija = tMTEP3_T13renginioPavadcommand + x;
          var tMTEP3_T13rezultatasiteracija = tMTEP3_T13rezultatascommand + x;
          var tMTEP3_T13dataiteracija = tMTEP3_T13datacommand + x;
          var joinedtMTEP3_T13nr = eval(tMTEP3_T13nriteracija);
          var joinedtMTEP3_T13studDuom = eval(tMTEP3_T13studDuomiteracija);
          var joinedtMTEP3_T13renginioPavad = eval(tMTEP3_T13renginioPavaditeracija);
          var joinedtMTEP3_T13rezultatas = eval(tMTEP3_T13rezultatasiteracija);
          var joinedtMTEP3_T13data = eval(tMTEP3_T13dataiteracija);
          if (joinedtMTEP3_T13studDuom != "" || joinedtMTEP3_T13renginioPavad != "" ||
          joinedtMTEP3_T13rezultatas != "" || joinedtMTEP3_T13data != "") {
            foundUser.destytojas.tMTEP3_T13.push({
              nr: joinedtMTEP3_T13nr,
              studDuom: joinedtMTEP3_T13studDuom,
              renginioPavad: joinedtMTEP3_T13renginioPavad,
              rezultatas: joinedtMTEP3_T13rezultatas,
              data: joinedtMTEP3_T13data
            })
          }
        }
        for (let y = 1; y <= parseInt(req.body.yond50); y++) {
          var tMTEP3_T14nriteracija = tMTEP3_T14nrcommand + y;
          var tMTEP3_T14renginysiteracija = tMTEP3_T14renginyscommand + y;
          var tMTEP3_T14veiklPobuditeracija = tMTEP3_T14veiklPobudcommand + y;
          var tMTEP3_T14dataVietaiteracija = tMTEP3_T14dataVietacommand + y;
          var joinedtMTEP3_T14nr = eval(tMTEP3_T14nriteracija);
          var joinedtMTEP3_T14renginys = eval(tMTEP3_T14renginysiteracija);
          var joinedtMTEP3_T14veiklPobud = eval(tMTEP3_T14veiklPobuditeracija);
          var joinedtMTEP3_T14dataVieta = eval(tMTEP3_T14dataVietaiteracija);
          if (joinedtMTEP3_T14renginys != "" || joinedtMTEP3_T14veiklPobud != ""
          || joinedtMTEP3_T14dataVieta != "") {
            foundUser.destytojas.tMTEP3_T14.push({
              nr: joinedtMTEP3_T14nr,
              renginys: joinedtMTEP3_T14renginys,
              veiklPobud: joinedtMTEP3_T14veiklPobud,
              dataVieta: joinedtMTEP3_T14dataVieta
            })
          }
        }
        for (let z = 1; z <= parseInt(req.body.yond52); z++) {
          var tMTEP3_Snriteracija = tMTEP3_Snrcommand + z;
          var tMTEP3_Sstiprybesiteracija = tMTEP3_Sstiprybescommand + z;
          var tMTEP3_Stobulintinaiteracija = tMTEP3_Stobulintinacommand + z;
          var joinedtMTEP3_Snr = eval(tMTEP3_Snriteracija);
          var joinedtMTEP3_Sstiprybes = eval(tMTEP3_Sstiprybesiteracija);
          var joinedtMTEP3_Stobulintina = eval(tMTEP3_Stobulintinaiteracija);
          if (joinedtMTEP3_Sstiprybes != "" || joinedtMTEP3_Stobulintina != "") {
            foundUser.destytojas.tMTEP3_S.push({
              nr: joinedtMTEP3_Snr,
              stiprybes: joinedtMTEP3_Sstiprybes,
              tobulintina: joinedtMTEP3_Stobulintina
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
          // new
          for (let i = 1; i <= parseInt(req.body.new6); i++) {
            var kTOV4_mokymopavadi = kTOV4_mokymopavadcommand + i;
            var kTOV4_mokymopazymNri = kTOV4_mokymopazymNrcommand + i;
            var kTOV4_mokymotrukmeValLTi = kTOV4_mokymotrukmeValLTcommand + i;
            var kTOV4_mokymotrukmeValNeLTi = kTOV4_mokymotrukmeValNeLTcommand + i;
            var joinedkTOV4_mokymopavad = eval(kTOV4_mokymopavadi);
            var joinedkTOV4_mokymopazymNr = eval(kTOV4_mokymopazymNri);
            var joinedkTOV4_mokymotrukmeValLT = eval(kTOV4_mokymotrukmeValLTi);
            var joinedkTOV4_mokymotrukmeValNeLT = eval(kTOV4_mokymotrukmeValNeLTi);
            if (joinedkTOV4_mokymopavad != "" || joinedkTOV4_mokymopazymNr != ""
            || joinedkTOV4_mokymotrukmeValLT != "" || joinedkTOV4_mokymotrukmeValNeLT != "") {
            foundUser.destytojas.kTOV4_KV01.kompetencijos.mokymosi.push({
              nr: i,
              pavadinimas: joinedkTOV4_mokymopavad,
              pazymNr: joinedkTOV4_mokymopazymNr,
              trukmeValLT: joinedkTOV4_mokymotrukmeValLT,
              trukmeValNeLT: joinedkTOV4_mokymotrukmeValNeLT
            })
              foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoMokymosiKomp = true
          }
          }
          for (let i = 1; i <= parseInt(req.body.new8); i++) {
            var kTOV4_tyrimupavadi = kTOV4_tyrimupavadcommand + i;
            var kTOV4_tyrimupazymNri = kTOV4_tyrimupazymNrcommand + i;
            var kTOV4_tyrimutrukmeValLTi = kTOV4_tyrimutrukmeValLTcommand + i;
            var kTOV4_tyrimutrukmeValNeLTi = kTOV4_tyrimutrukmeValNeLTcommand + i;
            var kTOV4_tyrimupavad = eval(kTOV4_tyrimupavadi);
            var kTOV4_tyrimupazymNr = eval(kTOV4_tyrimupazymNri);
            var joinedkTOV4_tyrimutrukmeValLT = eval(kTOV4_tyrimutrukmeValLTi);
            var joinedkTOV4_tyrimutrukmeValNeLT = eval(kTOV4_tyrimutrukmeValNeLTi);
            if (kTOV4_tyrimupavad != "" || kTOV4_tyrimupazymNr != "" || joinedkTOV4_tyrimutrukmeValLT != ""
            || joinedkTOV4_tyrimutrukmeValNeLT != "") {
            foundUser.destytojas.kTOV4_KV01.kompetencijos.tyrimu.push({
              nr: i,
              pavadinimas: kTOV4_tyrimupavad,
              pazymNr: kTOV4_tyrimupazymNr,
              trukmeValLT: joinedkTOV4_tyrimutrukmeValLT,
              trukmeValNeLT: joinedkTOV4_tyrimutrukmeValNeLT
            })
              foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoTyrimuKomp = true
          }
          }
          for (let i = 1; i <= parseInt(req.body.new10); i++) {
            var kTOV4_bendrosiospavadi = kTOV4_bendrosiospavadcommand + i;
            var kTOV4_bendrosiospazymNri = kTOV4_bendrosiospazymNrcommand + i;
            var kTOV4_bendrosiostrukmeValLTi = kTOV4_bendrosiostrukmeValLTcommand + i;
            var kTOV4_bendrosiostrukmeValNeLTi = kTOV4_bendrosiostrukmeValNeLTcommand + i;
            var kTOV4_bendrosiospavad = eval(kTOV4_bendrosiospavadi);
            var kTOV4_bendrosiospazymNr = eval(kTOV4_bendrosiospazymNri);
            var joinedkTOV4_bendrosiostrukmeValLT = eval(kTOV4_bendrosiostrukmeValLTi);
            var joinedkTOV4_bendrosiostrukmeValNeLT = eval(kTOV4_bendrosiostrukmeValNeLTi);
            if (kTOV4_bendrosiospavad != "" || kTOV4_bendrosiospazymNr != "" || joinedkTOV4_bendrosiostrukmeValLT != ""
            || joinedkTOV4_bendrosiostrukmeValNeLT != "") {
            foundUser.destytojas.kTOV4_KV01.kompetencijos.bendrosios.push({
              nr: i,
              pavadinimas: kTOV4_bendrosiospavad,
              pazymNr: kTOV4_bendrosiospazymNr,
              trukmeValLT: joinedkTOV4_bendrosiostrukmeValLT,
              trukmeValNeLT: joinedkTOV4_bendrosiostrukmeValNeLT
            })
              foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoBendrKomp = true
          }
          }
          for (let i = 1; i <= parseInt(req.body.new12); i++) {
            var kTOV4_dalykpavadi = kTOV4_dalykpavadcommand + i;
            var kTOV4_dalykpazymNri = kTOV4_dalykpazymNrcommand + i;
            var kTOV4_dalyktrukmeValLTi = kTOV4_dalyktrukmeValLTcommand + i;
            var kTOV4_dalyktrukmeValNeLTi = kTOV4_dalyktrukmeValNeLTcommand + i;
            var kTOV4_dalykpavad = eval(kTOV4_dalykpavadi);
            var kTOV4_dalykpazymNr = eval(kTOV4_dalykpazymNri);
            var joinedkTOV4_dalyktrukmeValLT = eval(kTOV4_dalyktrukmeValLTi);
            var joinedkTOV4_dalyktrukmeValNeLT = eval(kTOV4_dalyktrukmeValNeLTi);
            if (kTOV4_dalykpavad != "" || kTOV4_dalykpazymNr != "" || joinedkTOV4_dalyktrukmeValLT != ""
            || joinedkTOV4_dalyktrukmeValNeLT != "") {
            foundUser.destytojas.kTOV4_KV01.kompetencijos.dalykines.push({
              nr: i,
              pavadinimas: kTOV4_dalykpavad,
              pazymNr: kTOV4_dalykpazymNr,
              trukmeValLT: joinedkTOV4_dalyktrukmeValLT,
              trukmeValNeLT: joinedkTOV4_dalyktrukmeValNeLT
            })
              foundUser.destytojas.kTOV4_KV01.kompetencijos.dalyvavoDalykKomp = true
          }
        }
          foundUser.destytojas.kTOV4_KV01.kompetencijos.isVisoValLT = req.body.kTOV4_trukmeValLT,
          foundUser.destytojas.kTOV4_KV01.kompetencijos.isVisoValNeLT = req.body.kTOV4_trukmeValNeLT

          for (let i = 1; i <= parseInt(req.body.new14); i++) {
            var kTOV4_25renginysTemai = kTOV4_25renginysTemacommand + i;
            var kTOV4_25kompGrupei = kTOV4_25kompGrupecommand + i;
            var kTOV4_25skirtai = kTOV4_25skirtacommand + i;
            var joinedkTOV4_25renginysTema = eval(kTOV4_25renginysTemai);
            var joinedkTOV4_25kompGrupe = eval(kTOV4_25kompGrupei);
            var joinedkTOV4_25skirta = eval(kTOV4_25skirtai);
            if (joinedkTOV4_25renginysTema != "" || joinedkTOV4_25kompGrupe != "" ||
            joinedkTOV4_25skirta != "") {
            foundUser.destytojas.kTOV4_25.push({
              nr: i,
              renginysTema: joinedkTOV4_25renginysTema,
              kompGrupe: joinedkTOV4_25kompGrupe,
              skirta: joinedkTOV4_25skirta
            })
          }
          }
          for (let i = 1; i <= parseInt(req.body.new16); i++) {
            var kTOV4_26imonIstaigi = kTOV4_26imonIstaigcommand + i;
            var kTOV4_26kompGrupei = kTOV4_26kompGrupecommand + i;
            var kTOV4_26trukmeVali = kTOV4_26trukmeValcommand + i;
            var kTOV4_26datai = kTOV4_26datacommand + i;
            var joinedkTOV4_26imonIstaig = eval(kTOV4_26imonIstaigi);
            var joinedkTOV4_26kompGrupe = eval(kTOV4_26kompGrupei);
            var joinedkTOV4_26trukmeVal = eval(kTOV4_26trukmeVali);
            var joinedkTOV4_26data = eval(kTOV4_26datai);
            if (joinedkTOV4_26imonIstaig != "" || joinedkTOV4_26kompGrupe != "" ||
            joinedkTOV4_26trukmeVal != "" || joinedkTOV4_26data != "") {
            foundUser.destytojas.kTOV4_26.push({
              nr: i,
              imonIstaig: joinedkTOV4_26imonIstaig,
              kompGrupe: joinedkTOV4_26kompGrupe,
              trukmeVal: joinedkTOV4_26trukmeVal,
              data: joinedkTOV4_26data
            })
          }
          }
          // baigta
        for (let aa = 1; aa <= parseInt(req.body.yond54); aa++) {
          var kTOV4_KV03nriteracija = kTOV4_KV03nrcommand + aa;
          var kTOV4_KV03salisiteracija = kTOV4_KV03saliscommand + aa;
          var kTOV4_KV03institucijaiteracija = kTOV4_KV03institucijacommand + aa;
          var kTOV4_KV03dalykasiteracija = kTOV4_KV03dalykascommand + aa;
          var kTOV4_KV03studKryptisiteracija = kTOV4_KV03studKryptiscommand + aa;
          var joinedkTOV4_KV03nr = eval(kTOV4_KV03nriteracija);
          var joinedkTOV4_KV03salis = eval(kTOV4_KV03salisiteracija);
          var joinedkTOV4_KV03institucija = eval(kTOV4_KV03institucijaiteracija);
          var joinedkTOV4_KV03dalykas = eval(kTOV4_KV03dalykasiteracija);
          var joinedkTOV4_KV03studKryptis = eval(kTOV4_KV03studKryptisiteracija);
          if (joinedkTOV4_KV03salis != "" || joinedkTOV4_KV03institucija != "" ||
          joinedkTOV4_KV03dalykas != "" || joinedkTOV4_KV03studKryptis != "") {
            foundUser.destytojas.kTOV4_KV03.push({
              nr: joinedkTOV4_KV03nr,
              studKryptis: joinedkTOV4_KV03studKryptis,
              salis: joinedkTOV4_KV03salis,
              institucija: joinedkTOV4_KV03institucija,
              dalykas: joinedkTOV4_KV03dalykas
            })
          }
        }
        for (let ab = 1; ab <= parseInt(req.body.yond56); ab++) {
          var kTOV4_O01_1nriteracija = kTOV4_O01_1nrcommand + ab;
          var kTOV4_O01_1veiklPobuditeracija = kTOV4_O01_1veiklPobudcommand + ab;
          var kTOV4_O01_1isakNrDataiteracija = kTOV4_O01_1isakNrDatacommand + ab;
          var joinedkTOV4_O01_1nr = eval(kTOV4_O01_1nriteracija);
          var joinedkTOV4_O01_1veiklPobud = eval(kTOV4_O01_1veiklPobuditeracija);
          var joinedkTOV4_O01_1isakNrData = eval(kTOV4_O01_1isakNrDataiteracija);
          if (joinedkTOV4_O01_1veiklPobud != "" || joinedkTOV4_O01_1isakNrData != "") {
            foundUser.destytojas.kTOV4_O01.kTOV4_O01_1.push({
              nr: joinedkTOV4_O01_1nr,
              veiklPobud: joinedkTOV4_O01_1veiklPobud,
              isakNrData: joinedkTOV4_O01_1isakNrData
            })
          }
        }
        for (let ac = 1; ac <= parseInt(req.body.yond58); ac++) {
          var kTOV4_O01_2nriteracija = kTOV4_O01_2nrcommand + ac;
          var kTOV4_O01_2destytojasi = kTOV4_O01_2destytojascommand + ac;
          var kTOV4_O01_2veiklPobuditeracija = kTOV4_O01_2veiklPobudcommand + ac;
          var kTOV4_O01_2dataVietaiteracija = kTOV4_O01_2dataVietacommand + ac;
          var kTOV4_O01_2ktKomentaraiiteracija = kTOV4_O01_2ktKomentaraicommand + ac;
          var joinedkTOV4_O01_2nr = eval(kTOV4_O01_2nriteracija);
          var joinedkTOV4_O01_2destytojas = eval(kTOV4_O01_2destytojasi);
          var joinedkTOV4_O01_2veiklPobud = eval(kTOV4_O01_2veiklPobuditeracija);
          var joinedkTOV4_O01_2dataVieta = eval(kTOV4_O01_2dataVietaiteracija);
          var joinedkTOV4_O01_2ktKomentarai = eval(kTOV4_O01_2ktKomentaraiiteracija);
          if (joinedkTOV4_O01_2destytojas != "" || joinedkTOV4_O01_2veiklPobud != "" ||
          joinedkTOV4_O01_2dataVieta != "" || joinedkTOV4_O01_2ktKomentarai != "") {
            foundUser.destytojas.kTOV4_O01.kTOV4_O01_2.push({
              nr: joinedkTOV4_O01_2nr,
              destytojas: joinedkTOV4_O01_2destytojas,
              veiklPobud: joinedkTOV4_O01_2veiklPobud,
              dataVieta: joinedkTOV4_O01_2dataVieta,
              ktKomentarai: joinedkTOV4_O01_2ktKomentarai
            })
          }
        }
        for (let i = 1; i <= parseInt(req.body.new18); i++) {
          var kTOV4_29veiklai = kTOV4_29veiklacommand + i;
          var kTOV4_29socPartnerisi = kTOV4_29socPartneriscommand + i;
          var joinedkTOV4_29veikla = eval(kTOV4_29veiklai);
          var joinedkTOV4_29socPartneris = eval(kTOV4_29socPartnerisi);
          if (joinedkTOV4_29veikla != "" || joinedkTOV4_29socPartneris != "" ) {
          foundUser.destytojas.kTOV4_29.push({
            nr: i,
            veikla: joinedkTOV4_29veikla,
            socPartneris: joinedkTOV4_29socPartneris
          })
        }
      }
        for (let ad = 1; ad <= parseInt(req.body.yond60); ad++) {
          var kTOV4_Snriteracija = kTOV4_Snrcommand + ad;
          var kTOV4_Sstiprybesiteracija = kTOV4_Sstiprybescommand + ad;
          var kTOV4_Stobulintinaiteracija = kTOV4_Stobulintinacommand + ad;
          var joinedkTOV4_Snr = eval(kTOV4_Snriteracija);
          var joinedkTOV4_Sstiprybes = eval(kTOV4_Sstiprybesiteracija);
          var joinedkTOV4_Stobulintina = eval(kTOV4_Stobulintinaiteracija);
          if (joinedkTOV4_Sstiprybes != "" || joinedkTOV4_Stobulintina != "") {
            foundUser.destytojas.kTOV4_S.push({
              nr: joinedkTOV4_Snr,
              stiprybes: joinedkTOV4_Sstiprybes,
              tobulintina: joinedkTOV4_Stobulintina
            })
          }
        }
        for (let ae = 1; ae <= parseInt(req.body.yond62); ae++) {
          var kV5_KT01nriteracija = kV5_KT01nrcommand + ae;
          var kV5_KT01studKryptisi = kV5_KT01studKryptiscommand + ae;
          var kV5_KT01diplomantasiteracija = kV5_KT01diplomantascommand + ae;
          var kV5_KT01studProgriteracija = kV5_KT01studProgrcommand + ae;
          var kV5_KT01darboTemaiteracija = kV5_KT01darboTemacommand + ae;
          var kV5_KT01uzsakovasiteracija = kV5_KT01uzsakovascommand + ae;
          var joinedkV5_KT01nr = eval(kV5_KT01nriteracija);
          var joinedkV5_KT01studKryptis = eval(kV5_KT01studKryptisi);
          var joinedkV5_KT01diplomantas = eval(kV5_KT01diplomantasiteracija);
          var joinedkV5_KT01studProgr = eval(kV5_KT01studProgriteracija);
          var joinedkV5_KT01darboTema = eval(kV5_KT01darboTemaiteracija);
          var joinedkV5_KT01uzsakovas = eval(kV5_KT01uzsakovasiteracija);
          if (joinedkV5_KT01studKryptis != "" || joinedkV5_KT01diplomantas != "" || joinedkV5_KT01studProgr != ""
          || joinedkV5_KT01darboTema != "" || joinedkV5_KT01uzsakovas != "") {
            foundUser.destytojas.kV5_KT01.push({
              nr: joinedkV5_KT01nr,
              studKryptis: joinedkV5_KT01studKryptis,
              diplomantas: joinedkV5_KT01diplomantas,
              studProgr: joinedkV5_KT01studProgr,
              darboTema: joinedkV5_KT01darboTema,
              uzsakovas: joinedkV5_KT01uzsakovas
            })
          }
        }
        for (let af = 1; af <= parseInt(req.body.yond64); af++) {
          var kV5_KT02nriteracija = kV5_KT02nrcommand + af;
          var kV5_KT02studKryptisi = kV5_KT02studKryptiscommand + af;
          var kV5_KT02diplomantasiteracija = kV5_KT02diplomantascommand + af;
          var kV5_KT02studProgriteracija = kV5_KT02studProgrcommand + af;
          var kV5_KT02darboTemaiteracija = kV5_KT02darboTemacommand + af;
          var joinedkV5_KT02studKryptis = eval(kV5_KT02studKryptisi);
          var joinedkV5_KT02nr = eval(kV5_KT02nriteracija);
          var joinedkV5_KT02diplomantas = eval(kV5_KT02diplomantasiteracija);
          var joinedkV5_KT02studProgr = eval(kV5_KT02studProgriteracija);
          var joinedkV5_KT02darboTema = eval(kV5_KT02darboTemaiteracija);
          if (joinedkV5_KT01studKryptis != "" || joinedkV5_KT02diplomantas != "" ||
          joinedkV5_KT02studProgr != "" || joinedkV5_KT02darboTema != "") {
            foundUser.destytojas.kV5_KT02.push({
              nr: joinedkV5_KT02nr,
              studKryptis: joinedkV5_KT02studKryptis,
              diplomantas: joinedkV5_KT02diplomantas,
              studProgr: joinedkV5_KT02studProgr,
              darboTema: joinedkV5_KT02darboTema
            })
          }
        }
        // 32 table
        for (let i = 1; i <= parseInt(req.body.new20); i++) {
          var kV5_32socaprasymasi = kV5_32socaprasymascommand + i;
          var joinedkV5_32socaprasymas = eval(kV5_32socaprasymasi);
          if (joinedkV5_32socaprasymas != "" ) {
          foundUser.destytojas.kV5_32.socAtskMaz.push({
            aprasymas: joinedkV5_32socaprasymas
          })
        }
        }
        for (let i = 1; i <= parseInt(req.body.new22); i++) {
          var kV5_32aplinkaprasymasi = kV5_32aplinkaprasymascommand + i;
          var joinedkV5_32aplinkaprasymas = eval(kV5_32aplinkaprasymasi);
            if (joinedkV5_32aplinkaprasymas != "" ) {
          foundUser.destytojas.kV5_32.aplinkosaugInic.push({
            aprasymas: joinedkV5_32aplinkaprasymas
          })
        }
        }
        for (let i = 1; i <= parseInt(req.body.new24); i++) {
          var kV5_32valstybaprasymasi = kV5_32valstybaprasymascommand + i;
          var joinedkV5_32valstybaprasymas = eval(kV5_32valstybaprasymasi);
            if (joinedkV5_32valstybaprasymas != "" ) {
          foundUser.destytojas.kV5_32.lietValstybPuosel.push({
            aprasymas: joinedkV5_32valstybaprasymas
          })
        }
        }
        for (let i = 1; i <= parseInt(req.body.new26); i++) {
          var kV5_32etnoaprasymasi = kV5_32etnoaprasymascommand + i;
          var joinedkV5_32etnoaprasymas = eval(kV5_32etnoaprasymasi);
            if (joinedkV5_32etnoaprasymas != "" ) {
          foundUser.destytojas.kV5_32.lietEtnokPuos.push({
            aprasymas: joinedkV5_32etnoaprasymas
          })
        }
        }
        for (let i = 1; i <= parseInt(req.body.new28); i++) {
          var kV5_32savaprasymasi = kV5_32savaprasymascommand + i;
          var joinedkV5_32savaprasymas = eval(kV5_32savaprasymasi);
            if (joinedkV5_32savaprasymas != "" ) {
          foundUser.destytojas.kV5_32.savanorystIniciatyv.push({
            aprasymas: joinedkV5_32savaprasymas
          })
        }
        }
        for (let i = 1; i <= parseInt(req.body.new30); i++) {
          var kV5_33veiklai = kV5_33veiklacommand + i;
          var kV5_33veiklPartneri = kV5_33veiklPartnercommand + i;
          var kV5_33organizaci = kV5_33organizaccommand + i;
          var kV5_33veiklOrientavimi = kV5_33veiklOrientavimcommand + i;
          var kV5_33dalyviaii = kV5_33dalyviaicommand + i;
          var kV5_33vietai = kV5_33vietacommand + i;
          var kV5_33laikasi = kV5_33laikascommand + i

          var joinedkV5_33veikla = eval(kV5_33veiklai);
          var joinedkV5_33veiklPartner = eval(kV5_33veiklPartneri);
          var joinedkV5_33organizac = eval(kV5_33organizaci);
          var joinedkV5_33veiklOrientavim = eval(kV5_33veiklOrientavimi);
          var joinedkV5_33dalyviai = eval(kV5_33dalyviaii);
          var joinedkV5_33vieta = eval(kV5_33vietai);
          var joinedkV5_33laikas = eval(kV5_33laikasi);

          if (joinedkV5_33veikla != "" || joinedkV5_33veiklPartner != "" ||
          joinedkV5_33organizac != "" || joinedkV5_33veiklOrientavim != ""
          || joinedkV5_33dalyviai != "" || joinedkV5_33laikas != "" || joinedkV5_33vieta != "") {
          foundUser.destytojas.kV5_33.push({

            veikla: joinedkV5_33veikla,
            veiklPartner: joinedkV5_33veiklPartner,
            organizac: joinedkV5_33organizac,
            veiklOrientavim: joinedkV5_33veiklOrientavim,
            dalyviai: joinedkV5_33dalyviai,
            laikas: joinedkV5_33laikas,
            vieta: joinedkV5_33vieta
          })
        }
        }
        for (let i = 1; i <= parseInt(req.body.new32); i++) {
          var kV5_34pavadinimasi = kV5_34pavadinimascommand + i;
          var kV5_34vykdytPartneri = kV5_34vykdytPartnercommand + i;
          var kV5_34dalyviaii = kV5_34dalyviaicommand + i;
          var kV5_34finansavimi = kV5_34finansavimcommand + i;
          var kV5_34rezultataii = kV5_34rezultataicommand + i;
          var kV5_34salisDatai = kV5_34salisDatacommand + i;
          var joinedkV5_34pavadinimas = eval(kV5_34pavadinimasi);
          var joinedkV5_34vykdytPartner = eval(kV5_34vykdytPartneri);
          var joinedkV5_34dalyviai = eval(kV5_34dalyviaii);
          var joinedkV5_34finansavim = eval(kV5_34finansavimi);
          var joinedkV5_34rezultatai = eval(kV5_34rezultataii);
          var joinedkV5_34salisData = eval(kV5_34salisDatai);
          if (joinedkV5_34pavadinimas != "" || joinedkV5_34vykdytPartner != "" ||
          joinedkV5_34dalyviai != "" || joinedkV5_34finansavim != ""
          || joinedkV5_34rezultatai != "" || joinedkV5_34salisData != "") {
          foundUser.destytojas.kV5_34.push({
            nr: i,
            pavadinimas: joinedkV5_34pavadinimas,
            vykdytPartner: joinedkV5_34vykdytPartner,
            dalyviai: joinedkV5_34dalyviai,
            finansavim: joinedkV5_34finansavim,
            rezultatai: joinedkV5_34rezultatai,
            salisData: joinedkV5_34salisData
          })
        }
        }
        foundUser.destytojas.kV5_kitaInfo = req.body.kV5_kitaInfo,
        foundUser.updated_for = req.user.id,
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
          katedra: vedejoKatedra
          //busena: "užrakinta"
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
        }// 2 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table2_name); i++) {
          foundUser.katedrosVedejas.kDS1.push({
            nr: eval(lent2_nrcommand + i),
            vardPavard: eval(lent2_pavVardcommand + i),
            pareigos: eval(lent2_pareigoscommand + i),
            darbovTipas: eval(lent2_darbovTipascommand + i),
            pedagogStazas: eval(lent2_pedagogStazascommand + i),
            praktinStazas:eval(lent2_praktinStazascommand + i)
          })
        }// 3 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table3_name); i++) {
          foundUser.katedrosVedejas.kKPP1_3.push({
            nr: eval(lent3_nrcommand + i),
            studKryptis: eval(lent3_studKryptiscommand + i),
            studProgr: eval(lent3_studProgrcommand + i),
            destytojas: eval(lent3_destytojascommand + i),
            imonIstaig: eval(lent3_imonIstaigcommand + i)
          })
        }// 4 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table4_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_M02.push({
            nr: eval(lent4_nrcommand + i),
            bibliografApr: eval(lent4_bibliografAprcommand + i),
            tipas: eval(lent4_tipascommand + i),
            mokslSrit: eval(lent4_mokslSritcommand + i),
            mokslKrypt: eval(lent4_mokslKryptcommand + i)
          })
        }// 5 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table5_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_M04.push({
            nr: eval(mV2_M04nrcommand + i),
            destytojas: eval(mV2_M04destytojascommand + i),
            studProgr: eval(mV2_M04studProgrcommand + i),
            dalykPavad: eval(mV2_M04dalykPavadcommand + i),
            apimtisKredit: eval(mV2_M04apimtisKreditcommand + i),
            busena:eval(mV2_M04busenacommand + i)
          })
        }// 6 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table6_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_D06.push({
            nr: eval(mV2_D06nrcommand + i),
            studProgr: eval(mV2_D06studProgrcommand + i),
            progrKodas: eval(mV2_D06progrKodascommand + i),
            atlPatobulin: eval(mV2_D06atlPatobulincommand + i),
            tobulinPriezast: eval(mV2_D06tobulinPriezastcommand + i),
            tobulinIrod:eval(mV2_D06tobulinIrodcommand + i)
          })
        }// 7 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table7_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_D01.push({
            nr: eval(mV2_D01nrcommand + i),
            destytojas: eval(mV2_D01destytojascommand + i),
            komitetas: eval(mV2_D01komitetascommand + i),
            veikla: eval(mV2_D01veiklacommand + i),
            rezultatai: eval(mV2_D01rezultataicommand + i)
          })
        }// 8 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table8_name); i++) {
        foundUser.katedrosVedejas.mV2.mV2_D02.push({
        nr: eval(mV2_D02nrcommand + i),
        destytojas: eval(mV2_D02destytojascommand + i),
        studKryptis: eval(mV2_D02studKryptcommand + i),
        veikla: eval(mV2_D02veiklacommand + i),
        rezultatai: eval(mV2_D02rezultataicommand + i)
          })
        }// 9 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table9_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_D03.push({
        nr: eval(mV2_D03nrcommand + i),
        destytojas: eval(mV2_D03destytojascommand + i),
        studKryptis: eval(mV2_D03studKryptiscommand + i),
        studProgr: eval(mV2_D03studProgrcommand + i),
        veikla: eval(mV2_D03veiklacommand + i),
        rezultatai :eval(mV2_D03rezultataicommand + i)
          })
        }// 10 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table10_name); i++) {
          foundUser.katedrosVedejas.mV2.mV2_M03.push({
            nr: eval(mV2_M03nrcommand + i),
            destytojas: eval(mV2_M03destytojascommand + i),
            studProgr: eval(mV2_M03studProgrcommand + i),
            dalykPavad: eval(mV2_M03dalykPavadcommand + i),
            apimtisKredit: eval(mV2_M03apimtisKreditcommand + i)

          })
        }// 11 lentelė create-dep
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
        }// 12 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table12_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T01.push({
            nr: eval(tMTEP3_T01nrcommand + i),
            tyrTemat: eval(tMTEP3_T01tyrTematcommand + i),
            destytojas: eval(tMTEP3_T01destytojascommand + i),
            tyrGrup: eval(tMTEP3_T01tyrGrupcommand + i),
            mokslSrit: eval(tMTEP3_T01mokslSritcommand + i),
            mokslKrypt:eval(tMTEP3_T01mokslKryptcommand + i)
          })
        }// 13 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table13_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T02.push({
        nr: eval(tMTEP3_T02nrcommand + i),
        bibliografApr: eval(tMTEP3_T02bibliografAprcommand + i),
        tipas: eval(tMTEP3_T02tipascommand + i),
        mokslSrit: eval(tMTEP3_T02mokslSritcommand + i),
        mokslKrypt: eval(tMTEP3_T02mokslKryptcommand + i),
        duomBaze: eval(tMTEP3_T02duomBazecommand + i)
          })
        }// 14 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table14_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T03.push({
          nr: eval(tMTEP3_T03nrcommand + i),
          pilnasBiblApr: eval(tMTEP3_T03pilnasBiblAprcommand + i),
          rengTipas: eval(tMTEP3_T03rengTipascommand + i)
          })
        }// 15 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table15_name); i++) {
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T04.push({
        nr: eval(tMTEP3_T04nrcommand + i),
        konsultantas: eval(tMTEP3_T04konsultantascommand + i),
        uzsakovas: eval(tMTEP3_T04uzsakovascommand + i),
        tema: eval(tMTEP3_T04temacommand + i),
        data: eval(tMTEP3_T04datacommand + i),
        atlygArNe: eval(tMTEP3_T04atlygArNecommand + i)
          })
        }// 16 lentelė 1 create-dep
        for (let i = 1; i <= parseInt(req.body.table161_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T05.push({
            nr: eval(tMTEP3_T05nrcommand + i),
            destytojas: eval(tMTEP3_T05destytojascommand + i),
            veiklPavad: eval(tMTEP3_T05veiklPavadcommand + i),
            veiklRezult: eval(tMTEP3_T05veiklRezultcommand + i),
            atlygArNe: eval(tMTEP3_T05atlygArNecommand + i)
          })
        }// 16 lentelė 2 create-dep
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
        }// 17 lentelė create-dep
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
            data:eval(tMTEP3_T07datacommand + i),
            atlygArNe:eval(tMTEP3_T07atlygArNecommand + i)
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
            dalyvSk:eval(tMTEP3_T10dalyvSkcommand + i),
            ktKomentarai:eval(tMTEP3_T10ktKomentaraicommand + i),
            atlygArNe:eval(tMTEP3_T10atlygArNecommand + i)
          })
        } // 22 lentelė create-dep
        for (let i = 1; i <= parseInt(req.body.table22_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T11.push({
            nr: eval(tMTEP3_T11nrcommand + i),
            destytojas: eval(tMTEP3_T11destytojascommand + i),
            veiklPobud: eval(tMTEP3_T11veiklPobudcommand + i),
            veiklTiksl: eval(tMTEP3_T11veiklTikslcommand + i),
            dataVieta: eval(tMTEP3_T11dataVietacommand + i),
            dalyvSk:eval(tMTEP3_T11dalyvSkcommand + i),
            ktKomentarai:eval(tMTEP3_T11ktKomentaraicommand + i),
            atlygArNe:eval(tMTEP3_T11atlygArNecommand + i)
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
            //template
            // nr: eval(lent2_nrcommand + i),
            // vardPavard: eval( + i),
            // pareigos: eval( + i),
            // darbovTipas: eval( + i),
            // pedagogStazas: eval( + i),
            // praktinStazas:eval( + i)
          })
        }
        foundUser.katedrosVedejas.kV5.veiklSavinalize.isvadosApieVeikl = req.body.isvadosApieVeikl,

         foundUser.busenaVedejo = req.body.ataskaitos_busena,
         foundUser.updated_for = req.user.id

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
            praktinStazas:eval(lent2_praktinStazascommand + i)
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
            busena:eval(mV2_M04busenacommand + i)
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
            tobulinIrod:eval(mV2_D06tobulinIrodcommand + i)
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
        rezultatai :eval(mV2_D03rezultataicommand + i)
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
            mokslKrypt:eval(tMTEP3_T01mokslKryptcommand + i)
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
            data:eval(tMTEP3_T07datacommand + i),
            atlygArNe:eval(tMTEP3_T07atlygArNecommand + i)
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
            dalyvSk:eval(tMTEP3_T10dalyvSkcommand + i),
            ktKomentarai:eval(tMTEP3_T10ktKomentaraicommand + i),
            atlygArNe:eval(tMTEP3_T10atlygArNecommand + i)
          })
        } // 22 lentelė edit-dep
        for (let i = 1; i <= parseInt(req.body.table22_name); i++) {
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T11.push({
            nr: eval(tMTEP3_T11nrcommand + i),
            destytojas: eval(tMTEP3_T11destytojascommand + i),
            veiklPobud: eval(tMTEP3_T11veiklPobudcommand + i),
            veiklTiksl: eval(tMTEP3_T11veiklTikslcommand + i),
            dataVieta: eval(tMTEP3_T11dataVietacommand + i),
            dalyvSk:eval(tMTEP3_T11dalyvSkcommand + i),
            ktKomentarai:eval(tMTEP3_T11ktKomentaraicommand + i),
            atlygArNe:eval(tMTEP3_T11atlygArNecommand + i)
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
        foundUser.updated_for = req.user.id

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
        var vardPavardcommand = "req.body.vardPavard";
        var issilavinimascommand = "req.body.issilavinimas";
        var pareigoscommand = "req.body.pareigos";
        var darbovTipascommand = "req.body.darbovTipas";
        var praktinStazascommand = "req.body.praktinStazas";
        var pedagogStazascommand = "req.body.pedagogStazas";
        var mV2_M01nrcommand = "req.body.mV2_M01nr";
        var mV2_M01veiklPavadcommand = "req.body.mV2_M01veiklPavad";
        var mV2_M01veiklRezultcommand = "req.body.mV2_M01veiklRezult";
        var mV2_M01destytojascommand = "req.body.mV2_M01destytojas";
        var mV2_M02nrcommand = "req.body.mV2_M02nr";
        var bibliografAprcommand = "req.body.bibliografApr";
        var tipascommand = "req.body.tipas";
        var mokslSritcommand = "req.body.mokslSrit";
        var mokslKryptcommand = "req.body.mokslKrypt";
        var katedracommand = "req.body.katedra";
        var mV2_M03nrcommand = "req.body.mV2_M03nr";
        var mV2_M03studProgrcommand = "req.body.mV2_M03studProgr";
        var mV2_M03dalykPavadcommand = "req.body.mV2_M03dalykPavad";
        var mV2_M03apimtisKreditcommand = "req.body.mV2_M03apimtisKredit";
        var mV2_M03destytojascommand = "req.body.mV2_M03destytojas";
        var mV2_M04nrcommand = "req.body.mV2_M04nr";
        var mV2_M04studProgrcommand = "req.body.mV2_M04studProgr";
        var mV2_M04dalykPavadcommand = "req.body.mV2_M04dalykPavad";
        var mV2_M04busenacommand = "req.body.mV2_M04busena";
        var mV2_M04apimtisKreditcommand = "req.body.mV2_M04apimtisKredit";
        var mV2_M04destytojascommand = "req.body.mV2_M04destytojas";
        var mV2_D01nrcommand = "req.body.mV2_D01nr";
        var mV2_D01studProgrcommand = "req.body.mV2_D01studProgr";
        var mV2_D01veiklacommand = "req.body.mV2_D01veikla";
        var mV2_D01rezultataicommand = "req.body.mV2_D01rezultatai";
        var mV2_D01destytojascommand = "req.body.mV2_D01destytojas";
        var mV2_D02nrcommand = "req.body.mV2_D02nr";
        var mV2_D02studProgrcommand = "req.body.mV2_D02studProgr";
        var mV2_D02veiklacommand = "req.body.mV2_D02veikla";
        var mV2_D02rezultataicommand = "req.body.mV2_D02rezultatai";
        var mV2_D02destytojascommand = "req.body.mV2_D02destytojas";
        var mV2_D03nrcommand = "req.body.mV2_D03nr";
        var mV2_D03studProgrcommand = "req.body.mV2_D03studProgr";
        var mV2_D03veiklacommand = "req.body.mV2_D03veikla";
        var mV2_D03rezultataicommand = "req.body.mV2_D03rezultatai";
        var mV2_D03destytojascommand = "req.body.mV2_D03destytojas";
        var mV2_D04nrcommand = "req.body.mV2_D04nr";
        var mV2_D04studProgrApimtcommand = "req.body.mV2_D04studProgrApimt";
        var mV2_D04progrKodascommand = "req.body.mV2_D04progrKodas";
        var mV2_D04studKryptiscommand = "req.body.mV2_D04studKryptis";
        var mV2_D04rezultataicommand = "req.body.mV2_D04rezultatai";
        var mV2_D05nrcommand = "req.body.mV2_D05nr";
        var mV2_D05studProgrcommand = "req.body.mV2_D05studProgr";
        var mV2_D05dalykPavadcommand = "req.body.mV2_D05dalykPavad";
        var mV2_D05dalykPaskirtcommand = "req.body.mV2_D05dalykPaskirt";
        var mV2_D05destytojascommand = "req.body.mV2_D05destytojas";
        var mV2_D05uzsienKalbacommand = "req.body.mV2_D05uzsienKalba";
        var mV2_D05apimtisKreditcommand = "req.body.mV2_D05apimtisKredit";
        var mV2_D06nrcommand = "req.body.mV2_D06nr";
        var mV2_D06studProgrcommand = "req.body.mV2_D06studProgr";
        var mV2_D06progrKodascommand = "req.body.mV2_D06progrKodas";
        var mV2_D06atlPatobulincommand = "req.body.mV2_D06atlPatobulin";
        var mV2_D06tobulinPriezastcommand = "req.body.mV2_D06tobulinPriezast";
        var mV2_D06tobulinIrodcommand = "req.body.mV2_D06tobulinIrod";
        var mV2_D08nrcommand = "req.body.mV2_D08nr";
        var mV2_D08studKryptiscommand = "req.body.mV2_D08studKryptis";
        var mV2_D08studProgrcommand = "req.body.mV2_D08studProgr";
        var mV2_D08progrKodascommand = "req.body.mV2_D08progrKodas";
        var mV2_D08isakDatacommand = "req.body.mV2_D08isakData";
        var mV2_D08numatomDatacommand = "req.body.mV2_D08numatomData";
        var mV2_S01nrcommand = "req.body.mV2_S01nr";
        var mV2_S01veiklacommand = "req.body.mV2_S01veikla";
        var mV2_S01dataVietacommand = "req.body.mV2_S01dataVieta";
        var mV2_S01destytojascommand = "req.body.mV2_S01destytojas";
        var mV2_Snrcommand = "req.body.mV2_Snr";
        var mV2_Sstiprybescommand = "req.body.mV2_Sstiprybes";
        var mV2_Stobulintinacommand = "req.body.mV2_Stobulintina";
        var tMTEP3_T01nrcommand = "req.body.tMTEP3_T01nr";
        var tyrTematcommand = "req.body.tyrTemat";
        var tyrGrupcommand = "req.body.tyrGrup";
        var tMTEP3_T01mokslSritcommand = "req.body.tMTEP3_T01mokslSrit";
        var tMTEP3_T01mokslKryptcommand = "req.body.tMTEP3_T01mokslKrypt";
        var tMTEP3_T01destytojascommand = "req.body.tMTEP3_T01destytojas";
        var tMTEP3_T02nrcommand = "req.body.tMTEP3_T02nr";
        var tMTEP3_T02bibliografAprcommand = "req.body.tMTEP3_T02bibliografApr";
        var tMTEP3_T02tipascommand = "req.body.tMTEP3_T02tipas";
        var tMTEP3_T02mokslSritcommand = "req.body.tMTEP3_T02mokslSrit";
        var tMTEP3_T02mokslKryptcommand = "req.body.tMTEP3_T02mokslKrypt";
        var tMTEP3_T02duomBazecommand = "req.body.tMTEP3_T02duomBaze";
        var tMTEP3_T03nrcommand = "req.body.tMTEP3_T03nr";
        var tMTEP3_T03pilnasBiblAprcommand = "req.body.tMTEP3_T03pilnasBiblApr";
        var tMTEP3_T04nrcommand = "req.body.tMTEP3_T04nr";
        var tMTEP3_T04uzsakovascommand = "req.body.tMTEP3_T04uzsakovas";
        var tMTEP3_T04temacommand = "req.body.tMTEP3_T04tema";
        var tMTEP3_T04datacommand = "req.body.tMTEP3_T04data";
        var tMTEP3_T04konsultantascommand = "req.body.tMTEP3_T04konsultantas";
        var tMTEP3_T05nrcommand = "req.body.tMTEP3_T05nr";
        var tMTEP3_T05veiklPavadcommand = "req.body.tMTEP3_T05veiklPavad";
        var tMTEP3_T05veiklRezultcommand = "req.body.tMTEP3_T05veiklRezult";
        var tMTEP3_T05destytojascommand = "req.body.tMTEP3_T05destytojas";
        var tMTEP3_T06nrcommand = "req.body.tMTEP3_T06nr";
        var tMTEP3_T06autoriuscommand = "req.body.tMTEP3_T06autorius";
        var tMTEP3_T06menoSritcommand = "req.body.tMTEP3_T06menoSrit";
        var tMTEP3_T06pobudiscommand = "req.body.tMTEP3_T06pobudis";
        var tMTEP3_T06realizVietacommand = "req.body.tMTEP3_T06realizVieta";
        var tMTEP3_T06datacommand = "req.body.tMTEP3_T06data";
        var tMTEP3_T07nrcommand = "req.body.tMTEP3_T07nr";
        var tMTEP3_T07atlikejascommand = "req.body.tMTEP3_T07atlikejas";
        var tMTEP3_T07menoSritcommand = "req.body.tMTEP3_T07menoSrit";
        var tMTEP3_T07pavadinimascommand = "req.body.tMTEP3_T07pavadinimas";
        var tMTEP3_T07atlikVietacommand = "req.body.tMTEP3_T07atlikVieta";
        var tMTEP3_T07datacommand = "req.body.tMTEP3_T07data";
        var tMTEP3_T08Snrcommand = "req.body.tMTEP3_T08Snr";
        var tMTEP3_T08atlikejascommand = "req.body.tMTEP3_T08atlikejas";
        var tMTEP3_T08menoSritcommand = "req.body.tMTEP3_T08menoSrit";
        var tMTEP3_T08pavadinimascommand = "req.body.tMTEP3_T08pavadinimas";
        var tMTEP3_T08atlikVietacommand = "req.body.tMTEP3_T08atlikVieta";
        var tMTEP3_T08datacommand = "req.body.tMTEP3_T08data";
        var tMTEP3_T09nrcommand = "req.body.tMTEP3_T09nr";
        var tMTEP3_T09atlikejascommand = "req.body.tMTEP3_T09atlikejas";
        var tMTEP3_T09menoSritcommand = "req.body.tMTEP3_T09menoSrit";
        var tMTEP3_T09pavadinimascommand = "req.body.tMTEP3_T09pavadinimas";
        var tMTEP3_T09atlikVietacommand = "req.body.tMTEP3_T09atlikVieta";
        var tMTEP3_T09datacommand = "req.body.tMTEP3_T09data";
        var tMTEP3_T10nrcommand = "req.body.tMTEP3_T10nr";
        var tMTEP3_T10destytojascommand = "req.body.tMTEP3_T10destytojas";
        var tMTEP3_T10veiklPobudcommand = "req.body.tMTEP3_T10veiklPobud";
        var tMTEP3_T10veiklTikslcommand = "req.body.tMTEP3_T10veiklTiksl";
        var tMTEP3_T10dataVietacommand = "req.body.tMTEP3_T10dataVieta";
        var tMTEP3_T10dalyvSkcommand = "req.body.tMTEP3_T10dalyvSk";
        var tMTEP3_T10ktKomentaraicommand = "req.body.tMTEP3_T10ktKomentarai";
        var tMTEP3_T11nrcommand = "req.body.tMTEP3_T11nr";
        var tMTEP3_T11destytojascommand = "req.body.tMTEP3_T11destytojas";
        var tMTEP3_T11veiklPobudcommand = "req.body.tMTEP3_T11veiklPobud";
        var tMTEP3_T11veiklTikslcommand = "req.body.tMTEP3_T11veiklTiksl";
        var tMTEP3_T11dataVietacommand = "req.body.tMTEP3_T11dataVieta";
        var tMTEP3_T11dalyvSkcommand = "req.body.tMTEP3_T11dalyvSk";
        var tMTEP3_T11ktKomentaraicommand = "req.body.tMTEP3_T11ktKomentarai";
        var tMTEP3_T12nrcommand = "req.body.tMTEP3_T12nr";
        var tMTEP3_T12destytojascommand = "req.body.tMTEP3_T12destytojas";
        var tMTEP3_T12veiklPobudcommand = "req.body.tMTEP3_T12veiklPobud";
        var tMTEP3_T12dataVietacommand = "req.body.tMTEP3_T12dataVieta";
        var tMTEP3_T13nrcommand = "req.body.tMTEP3_T13nr";
        var tMTEP3_T13destytojascommand = "req.body.tMTEP3_T13destytojas";
        var tMTEP3_T13studDuomcommand = "req.body.tMTEP3_T13studDuom";
        var tMTEP3_T13renginioPavadcommand = "req.body.tMTEP3_T13renginioPavad";
        var tMTEP3_T13rezultatascommand = "req.body.tMTEP3_T13rezultatas";
        var tMTEP3_T13datacommand = "req.body.tMTEP3_T13data";
        var tMTEP3_T14nrcommand = "req.body.tMTEP3_T14nr";
        var tMTEP3_T14destytojascommand = "req.body.tMTEP3_T14destytojas";
        var tMTEP3_T14renginyscommand = "req.body.tMTEP3_T14renginys";
        var tMTEP3_T14veiklPobudcommand = "req.body.tMTEP3_T14veiklPobud";
        var tMTEP3_T14dataVietacommand = "req.body.tMTEP3_T14dataVieta";
        var tMTEP3_T15nrcommand = "req.body.tMTEP3_T15nr";
        var tMTEP3_T15mokymaicommand = "req.body.tMTEP3_T15mokymai";
        var tMTEP3_T15vykdytojaicommand = "req.body.tMTEP3_T15vykdytojai";
        var tMTEP3_T15uzsakovascommand = "req.body.tMTEP3_T15uzsakovas";
        var tMTEP3_T15sumacommand = "req.body.tMTEP3_T15suma";
        var tMTEP3_T15nrDatacommand = "req.body.tMTEP3_T15nrData";
        var tMTEP3_T15klausytojaicommand = "req.body.tMTEP3_T15klausytojai";
        var tMTEP3_T15trukmecommand = "req.body.tMTEP3_T15trukme";
        var tMTEP3_T16nrcommand = "req.body.tMTEP3_T16nr";
        var tMTEP3_T16pavadinimascommand = "req.body.tMTEP3_T16pavadinimas";
        var tMTEP3_T16uzsakovascommand = "req.body.tMTEP3_T16uzsakovas";
        var tMTEP3_T16rengejaicommand = "req.body.tMTEP3_T16rengejai";
        var tMTEP3_Snrcommand = "req.body.tMTEP3_Snr";
        var tMTEP3_Sstiprybescommand = "req.body.tMTEP3_Sstiprybes";
        var tMTEP3_Stobulintinacommand = "req.body.tMTEP3_Stobulintina";
        var kTOV4_KV01dalykStazuotespavadcommand = "req.body.kTOV4_KV01dalykStazuotespavad";
        var kTOV4_KV01dalykStazuotespavadcommand = "req.body.kTOV4_KV01dalykStazuotespavad";
        var kTOV4_KV01dalykStazuotespazymNrcommand = "req.body.kTOV4_KV01dalykStazuotespazymNr";
        var kTOV4_KV01dalykStazuotestrukmeValcommand = "req.body.kTOV4_KV01dalykStazuotestrukmeVal";
        var kTOV4_KV01dalykStazuotesdalyviscommand = "req.body.kTOV4_KV01dalykStazuotesdalyvis";
        var kTOV4_KV01dalykSeminaraipavadcommand = "req.body.kTOV4_KV01dalykSeminaraipavad";
        var kTOV4_KV01dalykSeminaraipazymNrcommand = "req.body.kTOV4_KV01dalykSeminaraipazymNr";
        var kTOV4_KV01dalykSeminaraitrukmeValcommand = "req.body.kTOV4_KV01dalykSeminaraitrukmeVal";
        var kTOV4_KV01dalykSeminaraidalyviscommand = "req.body.kTOV4_KV01dalykSeminaraidalyvis";
        var kTOV4_KV01dalykKonfpavadcommand = "req.body.kTOV4_KV01dalykKonfpavad";
        var kTOV4_KV01dalykKonfpazymNrcommand = "req.body.kTOV4_KV01dalykKonfpazymNr";
        var kTOV4_KV01dalykKonftrukmeValcommand = "req.body.kTOV4_KV01dalykKonftrukmeVal";
        var kTOV4_KV01dalykKonfdalyviscommand = "req.body.kTOV4_KV01dalykKonfdalyvis";
        var kTOV4_KV01dalykKursaipavadcommand = "req.body.kTOV4_KV01dalykKursaipavad";
        var kTOV4_KV01dalykKursaipazymNrcommand = "req.body.kTOV4_KV01dalykKursaipazymNr";
        var kTOV4_KV01dalykKursaitrukmeValcommand = "req.body.kTOV4_KV01dalykKursaitrukmeVal";
        var kTOV4_KV01dalykKursaidalyviscommand = "req.body.kTOV4_KV01dalykKursaidalyvis";
        var kTOV4_KV01didakStazuotespavadcommand = "req.body.kTOV4_KV01didakStazuotespavad";
        var kTOV4_KV01didakStazuotespazymNrcommand = "req.body.kTOV4_KV01didakStazuotespazymNr";
        var kTOV4_KV01didakStazuotestrukmeValcommand = "req.body.kTOV4_KV01didakStazuotestrukmeVal";
        var kTOV4_KV01didakStazuotesdalyviscommand = "req.body.kTOV4_KV01didakStazuotesdalyvis";
        var kTOV4_KV01didakSeminaraipavadcommand = "req.body.kTOV4_KV01didakSeminaraipavad";
        var kTOV4_KV01didakSeminaraipazymNrcommand = "req.body.kTOV4_KV01didakSeminaraipazymNr";
        var kTOV4_KV01didakSeminaraitrukmeValcommand = "req.body.kTOV4_KV01didakSeminaraitrukmeVal";
        var kTOV4_KV01didakSeminaraidalyviscommand = "req.body.kTOV4_KV01didakSeminaraidalyvis";
        var kTOV4_KV01didakKonfpavadcommand = "req.body.kTOV4_KV01didakKonfpavad";
        var kTOV4_KV01didakKonfpazymNrcommand = "req.body.kTOV4_KV01didakKonfpazymNr";
        var kTOV4_KV01didakKonftrukmeValcommand = "req.body.kTOV4_KV01didakKonftrukmeVal";
        var kTOV4_KV01didakKonfdalyviscommand = "req.body.kTOV4_KV01didakKonfdalyvis";
        var kTOV4_KV01didakKursaipavadcommand = "req.body.kTOV4_KV01didakKursaipavad";
        var kTOV4_KV01didakKursaipazymNrcommand = "req.body.kTOV4_KV01didakKursaipazymNr";
        var kTOV4_KV01didakKursaitrukmeValcommand = "req.body.kTOV4_KV01didakKursaitrukmeVal";
        var kTOV4_KV01didakKursaidalyviscommand = "req.body.kTOV4_KV01didakKursaidalyvis";
        var kTOV4_KV01bendrStazuotespavadcommand = "req.body.kTOV4_KV01bendrStazuotespavad";
        var kTOV4_KV01bendrStazuotespazymNrcommand = "req.body.kTOV4_KV01bendrStazuotespazymNr";
        var kTOV4_KV01bendrStazuotestrukmeValcommand = "req.body.kTOV4_KV01bendrStazuotestrukmeVal";
        var kTOV4_KV01bendrStazuotesdalyviscommand = "req.body.kTOV4_KV01bendrStazuotesdalyvis";
        var kTOV4_KV01bendrSeminaraipavadcommand = "req.body.kTOV4_KV01bendrSeminaraipavad";
        var kTOV4_KV01bendrSeminaraipazymNrcommand = "req.body.kTOV4_KV01bendrSeminaraipazymNr";
        var kTOV4_KV01bendrSeminaraitrukmeValcommand = "req.body.kTOV4_KV01bendrSeminaraitrukmeVal";
        var kTOV4_KV01bendrSeminaraidalyviscommand = "req.body.kTOV4_KV01bendrSeminaraidalyvis";
        var kTOV4_KV01bendrKonfpavadcommand = "req.body.kTOV4_KV01bendrKonfpavad";
        var kTOV4_KV01bendrKonfpazymNrcommand = "req.body.kTOV4_KV01bendrKonfpazymNr";
        var kTOV4_KV01bendrKonftrukmeValcommand = "req.body.kTOV4_KV01bendrKonftrukmeVal";
        var kTOV4_KV01bendrKonfdalyviscommand = "req.body.kTOV4_KV01bendrKonfdalyvis";
        var kTOV4_KV01bendrKursaipavadcommand = "req.body.kTOV4_KV01bendrKursaipavad";
        var kTOV4_KV01bendrKursaipazymNrcommand = "req.body.kTOV4_KV01bendrKursaipazymNr";
        var kTOV4_KV01bendrKursaitrukmeValcommand = "req.body.kTOV4_KV01bendrKursaitrukmeVal";
        var kTOV4_KV01bendrKursaidalyviscommand = "req.body.kTOV4_KV01bendrKursaidalyvis";

        var kTOV4_KV02dalykStazuotespavadcommand = "req.body.kTOV4_KV02dalykStazuotespavad";
        var kTOV4_KV02dalykStazuotespavadcommand = "req.body.kTOV4_KV02dalykStazuotespavad";
        var kTOV4_KV02dalykStazuotespazymNrcommand = "req.body.kTOV4_KV02dalykStazuotespazymNr";
        var kTOV4_KV02dalykStazuotestrukmeValcommand = "req.body.kTOV4_KV02dalykStazuotestrukmeVal";
        var kTOV4_KV02dalykStazuotesdalyviscommand = "req.body.kTOV4_KV02dalykStazuotesdalyvis";
        var kTOV4_KV02dalykSeminaraipavadcommand = "req.body.kTOV4_KV02dalykSeminaraipavad";
        var kTOV4_KV02dalykSeminaraipazymNrcommand = "req.body.kTOV4_KV02dalykSeminaraipazymNr";
        var kTOV4_KV02dalykSeminaraitrukmeValcommand = "req.body.kTOV4_KV02dalykSeminaraitrukmeVal";
        var kTOV4_KV02dalykSeminaraidalyviscommand = "req.body.kTOV4_KV02dalykSeminaraidalyvis";
        var kTOV4_KV02dalykKonfpavadcommand = "req.body.kTOV4_KV02dalykKonfpavad";
        var kTOV4_KV02dalykKonfpazymNrcommand = "req.body.kTOV4_KV02dalykKonfpazymNr";
        var kTOV4_KV02dalykKonftrukmeValcommand = "req.body.kTOV4_KV02dalykKonftrukmeVal";
        var kTOV4_KV02dalykKonfdalyviscommand = "req.body.kTOV4_KV02dalykKonfdalyvis";
        var kTOV4_KV02dalykKursaipavadcommand = "req.body.kTOV4_KV02dalykKursaipavad";
        var kTOV4_KV02dalykKursaipazymNrcommand = "req.body.kTOV4_KV02dalykKursaipazymNr";
        var kTOV4_KV02dalykKursaitrukmeValcommand = "req.body.kTOV4_KV02dalykKursaitrukmeVal";
        var kTOV4_KV02dalykKursaidalyviscommand = "req.body.kTOV4_KV02dalykKursaidalyvis";
        var kTOV4_KV02didakStazuotespavadcommand = "req.body.kTOV4_KV02didakStazuotespavad";
        var kTOV4_KV02didakStazuotespazymNrcommand = "req.body.kTOV4_KV02didakStazuotespazymNr";
        var kTOV4_KV02didakStazuotestrukmeValcommand = "req.body.kTOV4_KV02didakStazuotestrukmeVal";
        var kTOV4_KV02didakStazuotesdalyviscommand = "req.body.kTOV4_KV02didakStazuotesdalyvis";
        var kTOV4_KV02didakSeminaraipavadcommand = "req.body.kTOV4_KV02didakSeminaraipavad";
        var kTOV4_KV02didakSeminaraipazymNrcommand = "req.body.kTOV4_KV02didakSeminaraipazymNr";
        var kTOV4_KV02didakSeminaraitrukmeValcommand = "req.body.kTOV4_KV02didakSeminaraitrukmeVal";
        var kTOV4_KV02didakSeminaraidalyviscommand = "req.body.kTOV4_KV02didakSeminaraidalyvis";
        var kTOV4_KV02didakKonfpavadcommand = "req.body.kTOV4_KV02didakKonfpavad";
        var kTOV4_KV02didakKonfpazymNrcommand = "req.body.kTOV4_KV02didakKonfpazymNr";
        var kTOV4_KV02didakKonftrukmeValcommand = "req.body.kTOV4_KV02didakKonftrukmeVal";
        var kTOV4_KV02didakKonfdalyviscommand = "req.body.kTOV4_KV02didakKonfdalyvis";
        var kTOV4_KV02didakKursaipavadcommand = "req.body.kTOV4_KV02didakKursaipavad";
        var kTOV4_KV02didakKursaipazymNrcommand = "req.body.kTOV4_KV02didakKursaipazymNr";
        var kTOV4_KV02didakKursaitrukmeValcommand = "req.body.kTOV4_KV02didakKursaitrukmeVal";
        var kTOV4_KV02didakKursaidalyviscommand = "req.body.kTOV4_KV02didakKursaidalyvis";
        var kTOV4_KV02bendrStazuotespavadcommand = "req.body.kTOV4_KV02bendrStazuotespavad";
        var kTOV4_KV02bendrStazuotespazymNrcommand = "req.body.kTOV4_KV02bendrStazuotespazymNr";
        var kTOV4_KV02bendrStazuotestrukmeValcommand = "req.body.kTOV4_KV02bendrStazuotestrukmeVal";
        var kTOV4_KV02bendrStazuotesdalyviscommand = "req.body.kTOV4_KV02bendrStazuotesdalyvis";
        var kTOV4_KV02bendrSeminaraipavadcommand = "req.body.kTOV4_KV02bendrSeminaraipavad";
        var kTOV4_KV02bendrSeminaraipazymNrcommand = "req.body.kTOV4_KV02bendrSeminaraipazymNr";
        var kTOV4_KV02bendrSeminaraitrukmeValcommand = "req.body.kTOV4_KV02bendrSeminaraitrukmeVal";
        var kTOV4_KV02bendrSeminaraidalyviscommand = "req.body.kTOV4_KV02bendrSeminaraidalyvis";
        var kTOV4_KV02bendrKonfpavadcommand = "req.body.kTOV4_KV02bendrKonfpavad";
        var kTOV4_KV02bendrKonfpazymNrcommand = "req.body.kTOV4_KV02bendrKonfpazymNr";
        var kTOV4_KV02bendrKonftrukmeValcommand = "req.body.kTOV4_KV02bendrKonftrukmeVal";
        var kTOV4_KV02bendrKonfdalyviscommand = "req.body.kTOV4_KV02bendrKonfdalyvis";
        var kTOV4_KV02bendrKursaipavadcommand = "req.body.kTOV4_KV02bendrKursaipavad";
        var kTOV4_KV02bendrKursaipazymNrcommand = "req.body.kTOV4_KV02bendrKursaipazymNr";
        var kTOV4_KV02bendrKursaitrukmeValcommand = "req.body.kTOV4_KV02bendrKursaitrukmeVal";
        var kTOV4_KV02bendrKursaidalyviscommand = "req.body.kTOV4_KV02bendrKursaidalyvis";
        var kTOV4_KV03nrcommand = "req.body.kTOV4_KV03nr";
        var kTOV4_KV03destytojascommand = "req.body.kTOV4_KV03destytojas";
        var kTOV4_KV03saliscommand = "req.body.kTOV4_KV03salis";
        var kTOV4_KV03institucijacommand = "req.body.kTOV4_KV03institucija";
        var kTOV4_KV03dalykascommand = "req.body.kTOV4_KV03dalykas";
        var kTOV4_O01_1nrcommand = "req.body.kTOV4_O01_1nr";
        var kTOV4_O01_1destytojascommand = "req.body.kTOV4_O01_1destytojas";
        var kTOV4_O01_1veiklPobudcommand = "req.body.kTOV4_O01_1veiklPobud";
        var kTOV4_O01_1isakNrDatacommand = "req.body.kTOV4_O01_1isakNrData";
        var kTOV4_O01_2nrcommand = "req.body.kTOV4_O01_2nr";
        var kTOV4_O01_2destytojascommand = "req.body.kTOV4_O01_2destytojas";
        var kTOV4_O01_2veiklPobudcommand = "req.body.kTOV4_O01_2veiklPobud";
        var kTOV4_O01_2dataVietacommand = "req.body.kTOV4_O01_2dataVieta";
        var kTOV4_O01_2dalyvSkcommand = "req.body.kTOV4_O01_2dalyvSk";
        var kTOV4_O01_2ktKomentaraicommand = "req.body.kTOV4_O01_2ktKomentarai";
        var kTOV4_O02nrcommand = "req.body.kTOV4_O02nr";
        var kTOV4_O02atstovascommand = "req.body.kTOV4_O02atstovas";
        var kTOV4_O02partneriaicommand = "req.body.kTOV4_O02partneriai";
        var kTOV4_O02formacommand = "req.body.kTOV4_O02forma";
        var kTOV4_O02rezultataicommand = "req.body.kTOV4_O02rezultatai";
        var kTOV4_O02sutartiscommand = "req.body.kTOV4_O02sutartis";
        var kTOV4_O02tipascommand = "req.body.kTOV4_O02tipas";
        var kTOV4_Snrcommand = "req.body.kTOV4_Snr";
        var kTOV4_Sstiprybescommand = "req.body.kTOV4_Sstiprybes";
        var kTOV4_Stobulintinacommand = "req.body.kTOV4_Stobulintina";
        var kV5_KT01nrcommand = "req.body.kV5_KT01nr";
        var kV5_KT01diplomantascommand = "req.body.kV5_KT01diplomantas";
        var kV5_KT01studProgrcommand = "req.body.kV5_KT01studProgr";
        var kV5_KT01darboTemacommand = "req.body.kV5_KT01darboTema";
        var kV5_KT01uzsakovascommand = "req.body.kV5_KT01uzsakovas";
        var kV5_KT02nrcommand = "req.body.kV5_KT02nr";
        var kV5_KT02diplomantascommand = "req.body.kV5_KT02diplomantas";
        var kV5_KT02studProgrcommand = "req.body.kV5_KT02studProgr";
        var kV5_KT02darboTemacommand = "req.body.kV5_KT02darboTema";
        var kV5_KT03nrcommand = "req.body.kV5_KT03nr";
        var kV5_KT03studProgrcommand = "req.body.kV5_KT03studProgr";
        var kV5_KT03baigSkcommand = "req.body.kV5_KT03baigSk";
        var kV5_KT03iregUzimtumSkcommand = "req.body.kV5_KT03iregUzimtumSk";
        var kV5_KT03isidarbinProccommand = "req.body.kV5_KT03isidarbinProc";
        var kV5_KT04nrcommand = "req.body.kV5_KT04nr";
        var kV5_KT04autoriuscommand = "req.body.kV5_KT04autorius";
        var kV5_KT04veiklTipascommand = "req.body.kV5_KT04veiklTipas";
        var kV5_KT04pavadinimascommand = "req.body.kV5_KT04pavadinimas";
        var kV5_KT04sutartNrcommand = "req.body.kV5_KT04sutartNr";
        var kV5_KT04uzsakovascommand = "req.body.kV5_KT04uzsakovas";
        var kV5_KT04uzsakSumacommand = "req.body.kV5_KT04uzsakSuma";
        var veiklSavinalizenrcommand = "req.body.veiklSavinalizenr";
        var veiklSavinalizestiprybescommand = "req.body.veiklSavinalizestiprybes";
        var veiklSavinalizetobulintinacommand = "req.body.veiklSavinalizetobulintina";
        foundUser.katedrosVedejas.mV2.mV2_M01 = new Array();
        foundUser.katedrosVedejas.mV2.mV2_M02 = new Array();
        foundUser.katedrosVedejas.mV2.mV2_M03 = new Array();
        foundUser.katedrosVedejas.mV2.mV2_M04 = new Array();
        foundUser.katedrosVedejas.mV2.mV2_D01 = new Array();
        foundUser.katedrosVedejas.mV2.mV2_D02 = new Array();
        foundUser.katedrosVedejas.mV2.mV2_D03 = new Array();
        foundUser.katedrosVedejas.mV2.mV2_D04 = new Array();
        foundUser.katedrosVedejas.mV2.mV2_D05 = new Array();
        foundUser.katedrosVedejas.mV2.mV2_D06 = new Array();
        foundUser.katedrosVedejas.mV2.mV2_D08 = new Array();
        foundUser.katedrosVedejas.mV2.mV2_S01 = new Array();
        foundUser.katedrosVedejas.mV2.mV2_S = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T01 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T02 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T03 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T04 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T05 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T06 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T07 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T08 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T09 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T10 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T11 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T12 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T13 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T14 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T15 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T16 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_S = new Array();

        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01dalykines_komp.stazuotes = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01dalykines_komp.seminarai = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01dalykines_komp.konferencijos = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01dalykines_komp.kursai = new Array();

        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01didaktines_komp.stazuotes = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01didaktines_komp.seminarai = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01didaktines_komp.konferencijos = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01didaktines_komp.kursai = new Array();

        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01bendrosios_komp.stazuotes = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01bendrosios_komp.seminarai = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01bendrosios_komp.konferencijos = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01bendrosios_komp.kursai = new Array();

        foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02dalykines_komp.stazuotes = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02dalykines_komp.seminarai = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02dalykines_komp.konferencijos = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02dalykines_komp.kursai = new Array();

        foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02didaktines_komp.stazuotes = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02didaktines_komp.seminarai = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02didaktines_komp.konferencijos = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02didaktines_komp.kursai = new Array();

        foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02bendrosios_komp.stazuotes = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02bendrosios_komp.seminarai = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02bendrosios_komp.konferencijos = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02bendrosios_komp.kursai = new Array();

        foundUser.katedrosVedejas.kTOV4.kTOV4_O01.kTOV4_O01_1 = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_O01.kTOV4_O01_2 = new Array();

        foundUser.katedrosVedejas.kTOV4.kTOV4_KV03 = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_O02 = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_S = new Array();
        foundUser.katedrosVedejas.kV5.kV5_KT03.kV5_KT03_array = new Array();
        foundUser.katedrosVedejas.kV5.kV5_KT01 = new Array();
        foundUser.katedrosVedejas.kV5.kV5_KT02 = new Array();
        foundUser.katedrosVedejas.kV5.kV5_KT04 = new Array();
        foundUser.katedrosVedejas.kV5.veiklSavinalize.veiklSavinaliz_array = new Array();
        foundUser.katedrosVedejas.kDS1 = new Array();

        for (let i = 1; i <= parseInt(req.body.deslist); i++) {
          var vardPavardcommandi = vardPavardcommand + i;
          var issilavinimascommandi = issilavinimascommand + i;
          var pareigoscommandi = pareigoscommand + i;
          var darbovTipascommandi = darbovTipascommand + i;
          var praktinStazascommandi = praktinStazascommand + i;
          var pedagogStazascommandi = pedagogStazascommand + i;
          var joinedvardPavardcommand = eval(vardPavardcommandi);
          var joinedpareigoscommand = eval(pareigoscommandi);
          var joineddarbovTipascommand = eval(darbovTipascommandi);
          var joinedpraktinStazascommand = eval(praktinStazascommandi);
          var joinedpedagogStazascommand = eval(pedagogStazascommandi);
          var joinedissilavinimascommand = eval(issilavinimascommandi);
          foundUser.katedrosVedejas.kDS1.push({
            nr: i,
            vardPavard: joinedvardPavardcommand,
            issilavinimas: joinedissilavinimascommand,
            pareigos: joinedpareigoscommand,
            darbovTipas: joineddarbovTipascommand,
            pedagogStazas: joinedpedagogStazascommand,
            praktinStazas: joinedpraktinStazascommand
          })
        }


        for (let i = 1; i <= parseInt(req.body.yond6); i++) {
          var mV2_M01nrcommandi = mV2_M01nrcommand + i;
          var mV2_M01veiklPavadcommandi = mV2_M01veiklPavadcommand + i;
          var mV2_M01veiklRezultcommandi = mV2_M01veiklRezultcommand + i;
          var mV2_M01destytojascommandi = mV2_M01destytojascommand + i;
          var joinedmV2_M01nr = eval(mV2_M01nrcommandi);
          var joinedmV2_M01veiklPavad = eval(mV2_M01veiklPavadcommandi);
          var joinedmV2_M01veiklRezult = eval(mV2_M01veiklRezultcommandi);
          var joinedmV2_M01destytojas = eval(mV2_M01destytojascommandi);
          if (joinedmV2_M01veiklPavad != "" || joinedmV2_M01veiklRezult != "" || joinedmV2_M01destytojas != "") {
            foundUser.katedrosVedejas.mV2.mV2_M01.push({
              nr: joinedmV2_M01nr,
              veiklPavad: joinedmV2_M01veiklPavad,
              veiklRezult: joinedmV2_M01veiklRezult,
              destytojas: joinedmV2_M01destytojas
            })
          }
        }
        for (let i = 1; i <= parseInt(req.body.yond8); i++) {
          var mV2_M02nrcommandi = mV2_M02nrcommand + i;
          var bibliografAprcommandi = bibliografAprcommand + i;
          var tipascommandi = tipascommand + i;
          var mokslSritcommandi = mokslSritcommand + i;
          var mokslKryptcommandi = mokslKryptcommand + i;
          var katedracommandi = katedracommand + i;
          var joinedmV2_M02nr = eval(mV2_M02nrcommandi);
          var joinedbibliografApr = eval(bibliografAprcommandi);
          var joinedtipas = eval(tipascommandi);
          var joinedmokslSrit = eval(mokslSritcommandi);
          var joinedmokslKrypt = eval(mokslKryptcommandi);
          var joinedkatedra = eval(katedracommandi);
          if (joinedbibliografApr != "" || joinedtipas != "" || joinedmokslSrit != "" || joinedmokslKrypt != "" || joinedkatedra != "") {
            foundUser.katedrosVedejas.mV2.mV2_M02.push({
              nr: joinedmV2_M02nr,
              bibliografApr: joinedbibliografApr,
              tipas: joinedtipas,
              mokslSrit: joinedmokslSrit,
              mokslKrypt: joinedmokslKrypt,
              katedra: joinedkatedra
            })
          }
        }
        for (let i = 1; i <= parseInt(req.body.yond10); i++) {
          var mV2_M03nrcommandi = mV2_M03nrcommand + i;
          var mV2_M03studProgrcommandi = mV2_M03studProgrcommand + i;
          var mV2_M03dalykPavadcommandi = mV2_M03dalykPavadcommand + i;
          var mV2_M03apimtisKreditcommandi = mV2_M03apimtisKreditcommand + i;
          var mV2_M03destytojascommandi = mV2_M03destytojascommand + i;
          var joinedmV2_M03nr = eval(mV2_M03nrcommandi);
          var joinedmV2_M03studProgr = eval(mV2_M03studProgrcommandi);
          var joinedmV2_M03dalykPavad = eval(mV2_M03dalykPavadcommandi);
          var joinedmV2_M03apimtisKredit = eval(mV2_M03apimtisKreditcommandi);
          var joinedmV2_M03destytojas = eval(mV2_M03destytojascommandi);
          if (joinedmV2_M03studProgr != "" || joinedmV2_M03dalykPavad != "" || joinedmV2_M03apimtisKredit != "" || joinedmV2_M03destytojas != "") {
            foundUser.katedrosVedejas.mV2.mV2_M03.push({
              nr: joinedmV2_M03nr,
              studProgr: joinedmV2_M03studProgr,
              dalykPavad: joinedmV2_M03dalykPavad,
              apimtisKredit: joinedmV2_M03apimtisKredit,
              destytojas: joinedmV2_M03destytojas
            })
          }
        }
        for (let i = 1; i <= parseInt(req.body.yond12); i++) {
          var mV2_M04nrcommandi = mV2_M04nrcommand + i;
          var mV2_M04studProgrcommandi = mV2_M04studProgrcommand + i;
          var mV2_M04dalykPavadcommandi = mV2_M04dalykPavadcommand + i;
          var mV2_M04busenacommandi = mV2_M04busenacommand + i;
          var mV2_M04apimtisKreditcommandi = mV2_M04apimtisKreditcommand + i;
          var mV2_M04destytojascommandi = mV2_M04destytojascommand + i;
          var joinedmV2_M04nr = eval(mV2_M04nrcommandi);
          var joinedmV2_M04studProgr = eval(mV2_M04studProgrcommandi);
          var joinedmV2_M04dalykPavad = eval(mV2_M04dalykPavadcommandi);
          var joinedmV2_M04busena = eval(mV2_M04busenacommandi);
          var joinedmV2_M04apimtisKredit = eval(mV2_M04apimtisKreditcommandi);
          var joinedmV2_M04destytojas = eval(mV2_M04destytojascommandi);
          if (joinedmV2_M04studProgr != "" || joinedmV2_M04dalykPavad != "" || joinedmV2_M04busena != "" || joinedmV2_M04apimtisKredit != "" || joinedmV2_M04destytojas != "") {
            foundUser.katedrosVedejas.mV2.mV2_M04.push({
              nr: joinedmV2_M04nr,
              studProgr: joinedmV2_M04studProgr,
              dalykPavad: joinedmV2_M04dalykPavad,
              busena: joinedmV2_M04busena,
              apimtisKredit: joinedmV2_M04apimtisKredit,
              destytojas: joinedmV2_M04destytojas
            })
          }
        }
        for (let i = 1; i <= parseInt(req.body.yond14); i++) {
          var mV2_D01nrcommandi = mV2_D01nrcommand + i;
          var mV2_D01studProgrcommandi = mV2_D01studProgrcommand + i;
          var mV2_D01veiklacommandi = mV2_D01veiklacommand + i;
          var mV2_D01rezultataicommandi = mV2_D01rezultataicommand + i;
          var mV2_D01destytojascommandi = mV2_D01destytojascommand + i;
          var joinedmV2_D01nr = eval(mV2_D01nrcommandi);
          var joinedmV2_D01studProgr = eval(mV2_D01studProgrcommandi);
          var joinedmV2_D01veikla = eval(mV2_D01veiklacommandi);
          var joinedmV2_D01rezultatai = eval(mV2_D01rezultataicommandi);
          var joinedmV2_D01destytojas = eval(mV2_D01destytojascommandi);
          if (joinedmV2_D01studProgr != "" || joinedmV2_D01veikla != "" || joinedmV2_D01rezultatai != "" || joinedmV2_D01destytojas != "") {
            foundUser.katedrosVedejas.mV2.mV2_D01.push({
              nr: joinedmV2_D01nr,
              studProgr: joinedmV2_D01studProgr,
              veikla: joinedmV2_D01veikla,
              rezultatai: joinedmV2_D01rezultatai,
              destytojas: joinedmV2_D01destytojas
            })
          }
        }
        for (let i = 1; i <= parseInt(req.body.yond16); i++) {
          var mV2_D02nrcommandi = mV2_D02nrcommand + i;
          var mV2_D02studProgrcommandi = mV2_D02studProgrcommand + i;
          var mV2_D02veiklacommandi = mV2_D02veiklacommand + i;
          var mV2_D02rezultataicommandi = mV2_D02rezultataicommand + i;
          var mV2_D02destytojascommandi = mV2_D02destytojascommand + i;
          var joinedmV2_D02nr = eval(mV2_D02nrcommandi);
          var joinedmV2_D02studProgr = eval(mV2_D02studProgrcommandi);
          var joinedmV2_D02veikla = eval(mV2_D02veiklacommandi);
          var joinedmV2_D02rezultatai = eval(mV2_D02rezultataicommandi);
          var joinedmV2_D02destytojas = eval(mV2_D02destytojascommandi);
          if (joinedmV2_D02studProgr != "" || joinedmV2_D02veikla != "" || joinedmV2_D02rezultatai != "" || joinedmV2_D02destytojas != "") {
            foundUser.katedrosVedejas.mV2.mV2_D02.push({
              nr: joinedmV2_D02nr,
              studProgr: joinedmV2_D02studProgr,
              veikla: joinedmV2_D02veikla,
              rezultatai: joinedmV2_D02rezultatai,
              destytojas: joinedmV2_D02destytojas
            })
          }
        }
        for (let i = 1; i <= parseInt(req.body.yond18); i++) {
          var mV2_D03nrcommandi = mV2_D03nrcommand + i;
          var mV2_D03studProgrcommandi = mV2_D03studProgrcommand + i;
          var mV2_D03veiklacommandi = mV2_D03veiklacommand + i;
          var mV2_D03rezultataicommandi = mV2_D03rezultataicommand + i;
          var mV2_D03destytojascommandi = mV2_D03destytojascommand + i;
          var joinedmV2_D03nr = eval(mV2_D03nrcommandi);
          var joinedmV2_D03studProgr = eval(mV2_D03studProgrcommandi);
          var joinedmV2_D03veikla = eval(mV2_D03veiklacommandi);
          var joinedmV2_D03rezultatai = eval(mV2_D03rezultataicommandi);
          var joinedmV2_D03destytojas = eval(mV2_D03destytojascommandi);
          if (joinedmV2_D03studProgr != "" || joinedmV2_D03veikla != "" || joinedmV2_D03rezultatai != "" || joinedmV2_D03destytojas != "") {
            foundUser.katedrosVedejas.mV2.mV2_D03.push({
              nr: joinedmV2_D03nr,
              studProgr: joinedmV2_D03studProgr,
              veikla: joinedmV2_D03veikla,
              rezultatai: joinedmV2_D03rezultatai,
              destytojas: joinedmV2_D03destytojas
            })
          }
        }
        for (let i = 1; i <= parseInt(req.body.yonder2); i++) {
          var mV2_D04nrcommandi = mV2_D04nrcommand + i;
          var mV2_D04studProgrApimtcommandi = mV2_D04studProgrApimtcommand + i;
          var mV2_D04progrKodascommandi = mV2_D04progrKodascommand + i;
          var mV2_D04studKryptiscommandi = mV2_D04studKryptiscommand + i;
          var mV2_D04rezultataicommandi = mV2_D04rezultataicommand + i;
          var joinedmV2_D04nr = eval(mV2_D04nrcommandi);
          var joinedmV2_D04studProgrApimt = eval(mV2_D04studProgrApimtcommandi);
          var joinedmV2_D04progrKodas = eval(mV2_D04progrKodascommandi);
          var joinedmV2_D04studKryptis = eval(mV2_D04studKryptiscommandi);
          var joinedmV2_D04rezultatai = eval(mV2_D04rezultataicommandi);
          if (joinedmV2_D04studProgrApimt != "" || joinedmV2_D04progrKodas != "" || joinedmV2_D04studKryptis != "" || joinedmV2_D04rezultatai != "") {
            foundUser.katedrosVedejas.mV2.mV2_D04.push({
              nr: joinedmV2_D04nr,
              studProgrApimt: joinedmV2_D04studProgrApimt,
              progrKodas: joinedmV2_D04progrKodas,
              studKryptis: joinedmV2_D04studKryptis,
              rezultatai: joinedmV2_D04rezultatai
            })
          }
        }
        for (let i = 1; i <= parseInt(req.body.yonder4); i++) {
          var mV2_D05nrcommandi = mV2_D05nrcommand + i;
          var mV2_D05studProgrcommandi = mV2_D05studProgrcommand + i;
          var mV2_D05dalykPavadcommandi = mV2_D05dalykPavadcommand + i;
          var mV2_D05dalykPaskirtcommandi = mV2_D05dalykPaskirtcommand + i;
          var mV2_D05destytojascommandi = mV2_D05destytojascommand + i;
          var mV2_D05uzsienKalbacommandi = mV2_D05uzsienKalbacommand + i;
          var mV2_D05apimtisKreditcommandi = mV2_D05apimtisKreditcommand + i;
          var joinedmV2_D05nr = eval(mV2_D05nrcommandi);
          var joinedmV2_D05studProgr = eval(mV2_D05studProgrcommandi);
          var joinedmV2_D05dalykPavad = eval(mV2_D05dalykPavadcommandi);
          var joinedmV2_D05dalykPaskirt = eval(mV2_D05dalykPaskirtcommandi);
          var joinedmV2_D05destytojas = eval(mV2_D05destytojascommandi);
          var joinedmV2_D05uzsienKalba = eval(mV2_D05uzsienKalbacommandi);
          var joinedmV2_D05apimtisKredit = eval(mV2_D05apimtisKreditcommandi);
          if (joinedmV2_D05studProgr != "" || joinedmV2_D05dalykPavad != "" || joinedmV2_D05dalykPaskirt != "" || joinedmV2_D05destytojas != "" || joinedmV2_D05uzsienKalba != "" || joinedmV2_D05apimtisKredit != "") {
            foundUser.katedrosVedejas.mV2.mV2_D05.push({
              nr: joinedmV2_D05nr,
              studProgr: joinedmV2_D05studProgr,
              dalykPavad: joinedmV2_D05dalykPavad,
              dalykPaskirt: joinedmV2_D05dalykPaskirt,
              destytojas: joinedmV2_D05destytojas,
              uzsienKalba: joinedmV2_D05uzsienKalba,
              apimtisKredit: joinedmV2_D05apimtisKredit
            })
          }
        }
        for (let i = 1; i <= parseInt(req.body.yonder6); i++) {
          var mV2_D06nrcommandi = mV2_D06nrcommand + i;
          var mV2_D06studProgrcommandi = mV2_D06studProgrcommand + i;
          var mV2_D06progrKodascommandi = mV2_D06progrKodascommand + i;
          var mV2_D06atlPatobulincommandi = mV2_D06atlPatobulincommand + i;
          var mV2_D06tobulinPriezastcommandi = mV2_D06tobulinPriezastcommand + i;
          var mV2_D06tobulinIrodcommandi = mV2_D06tobulinIrodcommand + i;
          var joinedmV2_D06nr = eval(mV2_D06nrcommandi);
          var joinedmV2_D06studProgr = eval(mV2_D06studProgrcommandi);
          var joinedmV2_D06progrKodas = eval(mV2_D06progrKodascommandi);
          var joinedmV2_D06atlPatobulin = eval(mV2_D06atlPatobulincommandi);
          var joinedmV2_D06tobulinPriezast = eval(mV2_D06tobulinPriezastcommandi);
          var joinedmV2_D06tobulinIrod = eval(mV2_D06tobulinIrodcommandi);
          if (joinedmV2_D06studProgr != "" || joinedmV2_D06progrKodas != "" || joinedmV2_D06atlPatobulin != "" || joinedmV2_D06tobulinPriezast != "" || joinedmV2_D06tobulinIrod != "") {
            foundUser.katedrosVedejas.mV2.mV2_D06.push({
              nr: joinedmV2_D06nr,
              studProgr: joinedmV2_D06studProgr,
              progrKodas: joinedmV2_D06progrKodas,
              atlPatobulin: joinedmV2_D06atlPatobulin,
              tobulinPriezast: joinedmV2_D06tobulinPriezast,
              tobulinIrod: joinedmV2_D06tobulinIrod
            })
          }
        }
        foundUser.katedrosVedejas.mV2.mV2_D07.derinimas = req.body.mV2_D07derinimas

        for (let i = 1; i <= parseInt(req.body.yonder8); i++) {
          var mV2_D08nrcommandi = mV2_D08nrcommand + i;
          var mV2_D08studKryptiscommandi = mV2_D08studKryptiscommand + i;
          var mV2_D08studProgrcommandi = mV2_D08studProgrcommand + i;
          var mV2_D08progrKodascommandi = mV2_D08progrKodascommand + i;
          var mV2_D08isakDatacommandi = mV2_D08isakDatacommand + i;
          var mV2_D08numatomDatacommandi = mV2_D08numatomDatacommand + i;
          var joinedmV2_D08nr = eval(mV2_D08nrcommandi);
          var joinedmV2_D08studKryptis = eval(mV2_D08studKryptiscommandi);
          var joinedmV2_D08studProgr = eval(mV2_D08studProgrcommandi);
          var joinedmV2_D08progrKodas = eval(mV2_D08progrKodascommandi);
          var joinedmV2_D08isakData = eval(mV2_D08isakDatacommandi);
          var joinedmV2_D08numatomData = eval(mV2_D08numatomDatacommandi);
          if (joinedmV2_D08studKryptis != "" || joinedmV2_D08studProgr != "" || joinedmV2_D08progrKodas != "" || joinedmV2_D08isakData != "" || joinedmV2_D08numatomData != "") {
            foundUser.katedrosVedejas.mV2.mV2_D08.push({
              nr: joinedmV2_D08nr,
              studKryptis: joinedmV2_D08studKryptis,
              studProgr: joinedmV2_D08studProgr,
              progrKodas: joinedmV2_D08progrKodas,
              isakData: joinedmV2_D08isakData,
              numatomData: joinedmV2_D08numatomData
            })
          }
        }
        for (let i = 1; i <= parseInt(req.body.yonda2); i++) {
          var mV2_S01nrcommandi = mV2_S01nrcommand + i;
          var mV2_S01veiklacommandi = mV2_S01veiklacommand + i;
          var mV2_S01dataVietacommandi = mV2_S01dataVietacommand + i;
          var mV2_S01destytojascommandi = mV2_S01destytojascommand + i;
          var joinedmV2_S01nr = eval(mV2_S01nrcommandi);
          var joinedmV2_S01veikla = eval(mV2_S01veiklacommandi);
          var joinedmV2_S01dataVieta = eval(mV2_S01dataVietacommandi);
          var joinedmV2_S01destytojas = eval(mV2_S01destytojascommandi);
          if (joinedmV2_S01veikla != "" || joinedmV2_S01dataVieta != "" || joinedmV2_S01destytojas != "") {
            foundUser.katedrosVedejas.mV2.mV2_S01.push({
              nr: joinedmV2_S01nr,
              veikla: joinedmV2_S01veikla,
              dataVieta: joinedmV2_S01dataVieta,
              destytojas: joinedmV2_S01destytojas
            })
          }
        }
        for (let i = 1; i <= parseInt(req.body.yonder10); i++) {
          var mV2_Snrcommandi = mV2_Snrcommand + i;
          var mV2_Sstiprybescommandi = mV2_Sstiprybescommand + i;
          var mV2_Stobulintinacommandi = mV2_Stobulintinacommand + i;
          var joinedmV2_Snr = eval(mV2_Snrcommandi);
          var joinedmV2_Sstiprybes = eval(mV2_Sstiprybescommandi);
          var joinedmV2_Stobulintina = eval(mV2_Stobulintinacommandi);
          if (joinedmV2_Sstiprybes != "" || joinedmV2_Stobulintina != "") {
            foundUser.katedrosVedejas.mV2.mV2_S.push({
              nr: joinedmV2_Snr,
              stiprybes: joinedmV2_Sstiprybes,
              tobulintina: joinedmV2_Stobulintina
            })
          }
        }
        for (let l = 1; l <= parseInt(req.body.yond24); l++) {
          var iteracija12 = l;
          var tMTEP3_T01nriteracija = tMTEP3_T01nrcommand + iteracija12;
          var tyrTematiteracija = tyrTematcommand + iteracija12;
          var tyrGrupiteracija = tyrGrupcommand + iteracija12;
          var tMTEP3_T01mokslSrititeracija = tMTEP3_T01mokslSritcommand + iteracija12;
          var tMTEP3_T01mokslKryptiteracija = tMTEP3_T01mokslKryptcommand + iteracija12;
          var tMTEP3_T01destytojas = tMTEP3_T01destytojascommand + iteracija12;
          var joinedtMTEP3_T01nr = eval(tMTEP3_T01nriteracija);
          var joinedtyrTemat = eval(tyrTematiteracija);
          var joinedtyrGrup = eval(tyrGrupiteracija);
          var joinedtMTEP3_T01mokslSrit = eval(tMTEP3_T01mokslSrititeracija);
          var joinedtMTEP3_T01mokslKrypt = eval(tMTEP3_T01mokslKryptiteracija);
          var joinedtMTEP3_T01destytojas = eval(tMTEP3_T01destytojas);
          if (joinedtyrTemat != "" || joinedtyrGrup != "" || joinedtMTEP3_T01mokslSrit != "" || joinedtMTEP3_T01mokslKrypt != "" || joinedtMTEP3_T01destytojas != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_T01.push({
              nr: joinedtMTEP3_T01nr,
              tyrTemat: joinedtyrTemat,
              tyrGrup: joinedtyrGrup,
              mokslSrit: joinedtMTEP3_T01mokslSrit,
              mokslKrypt: joinedtMTEP3_T01mokslKrypt,
              destytojas: joinedtMTEP3_T01destytojas
            })
          }
        }
        for (let m = 1; m <= parseInt(req.body.yond26); m++) {
          var iteracija13 = m;
          var tMTEP3_T02nriteracija = tMTEP3_T02nrcommand + iteracija13;
          var tMTEP3_T02bibliografApriteracija = tMTEP3_T02bibliografAprcommand + iteracija13;
          var tMTEP3_T02tipasiteracija = tMTEP3_T02tipascommand + iteracija13;
          var tMTEP3_T02mokslSrititeracija = tMTEP3_T02mokslSritcommand + iteracija13;
          var tMTEP3_T02mokslKryptiteracija = tMTEP3_T02mokslKryptcommand + iteracija13;
          var tMTEP3_T02duomBazeiteracija = tMTEP3_T02duomBazecommand + iteracija13;
          var joinedtMTEP3_T02nr = eval(tMTEP3_T02nriteracija);
          var joinedtMTEP3_T02bibliografApr = eval(tMTEP3_T02bibliografApriteracija);
          var joinedtMTEP3_T02tipas = eval(tMTEP3_T02tipasiteracija);
          var joinedtMTEP3_T02mokslSrit = eval(tMTEP3_T02mokslSrititeracija);
          var joinedtMTEP3_T02mokslKrypt = eval(tMTEP3_T02mokslKryptiteracija);
          var joinedtMTEP3_T02duomBaze = eval(tMTEP3_T02duomBazeiteracija);
          if (joinedtMTEP3_T02bibliografApr != "" || joinedtMTEP3_T02tipas != "" || joinedtMTEP3_T02mokslSrit != "" || joinedtMTEP3_T02mokslKrypt != "" || joinedtMTEP3_T02duomBaze != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_T02.push({
              nr: joinedtMTEP3_T02nr,
              bibliografApr: joinedtMTEP3_T02bibliografApr,
              tipas: joinedtMTEP3_T02tipas,
              mokslSrit: joinedtMTEP3_T02mokslSrit,
              mokslKrypt: joinedtMTEP3_T02mokslKrypt,
              duomBaze: joinedtMTEP3_T02duomBaze
            })
          }
        }
        for (let n = 1; n <= parseInt(req.body.yond28); n++) {
          var iteracija14 = n;
          var tMTEP3_T03nriteracija = tMTEP3_T03nrcommand + iteracija14;
          var tMTEP3_T03pilnasBiblApriteracija = tMTEP3_T03pilnasBiblAprcommand + iteracija14;
          var joinedtMTEP3_T03nr = eval(tMTEP3_T03nriteracija);
          var joinedtMTEP3_T03pilnasBiblApr = eval(tMTEP3_T03pilnasBiblApriteracija);
          if (joinedtMTEP3_T03pilnasBiblApr != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_T03.push({
              nr: joinedtMTEP3_T03nr,
              pilnasBiblApr: joinedtMTEP3_T03pilnasBiblApr
            })
          }

        }
        for (let o = 1; o <= parseInt(req.body.yond30); o++) {
          var tMTEP3_T04nriteracija = tMTEP3_T04nrcommand + o;
          var tMTEP3_T04uzsakovasiteracija = tMTEP3_T04uzsakovascommand + o;
          var tMTEP3_T04temaiteracija = tMTEP3_T04temacommand + o;
          var tMTEP3_T04dataiteracija = tMTEP3_T04datacommand + o;
          var tMTEP3_T04konsultantasiteracija = tMTEP3_T04konsultantascommand + o;
          var joinedtMTEP3_T04nr = eval(tMTEP3_T04nriteracija);
          var joinedtMTEP3_T04uzsakovas = eval(tMTEP3_T04uzsakovasiteracija);
          var joinedtMTEP3_T04tema = eval(tMTEP3_T04temaiteracija);
          var joinedtMTEP3_T04data = eval(tMTEP3_T04dataiteracija);
          var joinedtMTEP3_T04konsultantas = eval(tMTEP3_T04konsultantasiteracija);
          if (joinedtMTEP3_T04uzsakovas != "" || joinedtMTEP3_T04tema != "" || joinedtMTEP3_T04data != "" || joinedtMTEP3_T04konsultantas != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_T04.push({
              nr: joinedtMTEP3_T04nr,
              uzsakovas: joinedtMTEP3_T04uzsakovas,
              tema: joinedtMTEP3_T04tema,
              data: joinedtMTEP3_T04data,
              konsultantas: joinedtMTEP3_T04konsultantas
            })
          }
        }
        for (let p = 1; p <= parseInt(req.body.yond32); p++) {

          var tMTEP3_T05nriteracija = tMTEP3_T05nrcommand + p;
          var tMTEP3_T05veiklPavaditeracija = tMTEP3_T05veiklPavadcommand + p;
          var tMTEP3_T05veiklRezultiteracija = tMTEP3_T05veiklRezultcommand + p;
          var tMTEP3_T05destytojasiteracija = tMTEP3_T05destytojascommand + p;
          var joinedtMTEP3_T05nr = eval(tMTEP3_T05nriteracija);
          var joinedtMTEP3_T05veiklPavad = eval(tMTEP3_T05veiklPavaditeracija);
          var joinedtMTEP3_T05veiklRezult = eval(tMTEP3_T05veiklRezultiteracija);
          var joinedtMTEP3_T05destytojas = eval(tMTEP3_T05destytojasiteracija);
          if (joinedtMTEP3_T05veiklPavad != "" || joinedtMTEP3_T05veiklRezult != "" || joinedtMTEP3_T05destytojas != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_T05.push({
              nr: joinedtMTEP3_T05nr,
              veiklPavad: joinedtMTEP3_T05veiklPavad,
              veiklRezult: joinedtMTEP3_T05veiklRezult,
              destytojas: joinedtMTEP3_T05destytojas
            })
          }
        }
        for (let q = 1; q <= parseInt(req.body.yond34); q++) {
          var tMTEP3_T06nriteracija = tMTEP3_T06nrcommand + q;
          var tMTEP3_T06autoriusiteracija = tMTEP3_T06autoriuscommand + q;
          var tMTEP3_T06menoSrititeracija = tMTEP3_T06menoSritcommand + q;
          var tMTEP3_T06pobudisiteracija = tMTEP3_T06pobudiscommand + q;
          var tMTEP3_T06realizVietaiteracija = tMTEP3_T06realizVietacommand + q;
          var tMTEP3_T06dataiteracija = tMTEP3_T06datacommand + q;
          var joinedtMTEP3_T06nr = eval(tMTEP3_T06nriteracija);
          var joinedtMTEP3_T06autorius = eval(tMTEP3_T06autoriusiteracija);
          var joinedtMTEP3_T06menoSrit = eval(tMTEP3_T06menoSrititeracija);
          var joinedtMTEP3_T06pobudis = eval(tMTEP3_T06pobudisiteracija);
          var joinedtMTEP3_T06realizVieta = eval(tMTEP3_T06realizVietaiteracija);
          var joinedtMTEP3_T06data = eval(tMTEP3_T06dataiteracija);
          if (joinedtMTEP3_T06autorius != "" || joinedtMTEP3_T06menoSrit != "" || joinedtMTEP3_T06pobudis != "" || joinedtMTEP3_T06realizVieta != "" || joinedtMTEP3_T06data != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_T06.push({
              nr: joinedtMTEP3_T06nr,
              autorius: joinedtMTEP3_T06autorius,
              menoSrit: joinedtMTEP3_T06menoSrit,
              pobudis: joinedtMTEP3_T06pobudis,
              realizVieta: joinedtMTEP3_T06realizVieta,
              data: joinedtMTEP3_T06data
            })
          }
        }
        for (let r = 1; r <= parseInt(req.body.yond36); r++) {
          var tMTEP3_T07nriteracija = tMTEP3_T07nrcommand + r;
          var tMTEP3_T07atlikejasiteracija = tMTEP3_T07atlikejascommand + r;
          var tMTEP3_T07menoSrititeracija = tMTEP3_T07menoSritcommand + r;
          var tMTEP3_T07pavadinimasiteracija = tMTEP3_T07pavadinimascommand + r;
          var tMTEP3_T07atlikVietaiteracija = tMTEP3_T07atlikVietacommand + r;
          var tMTEP3_T07dataiteracija = tMTEP3_T07datacommand + r;
          var joinedtMTEP3_T07nr = eval(tMTEP3_T07nriteracija);
          var joinedtMTEP3_T07atlikejas = eval(tMTEP3_T07atlikejasiteracija);
          var joinedtMTEP3_T07menoSrit = eval(tMTEP3_T07menoSrititeracija);
          var joinedtMTEP3_T07pavadinimas = eval(tMTEP3_T07pavadinimasiteracija);
          var joinedtMTEP3_T07atlikVieta = eval(tMTEP3_T07atlikVietaiteracija);
          var joinedtMTEP3_T07data = eval(tMTEP3_T07dataiteracija);
          if (joinedtMTEP3_T07atlikejas != "" || joinedtMTEP3_T07menoSrit != "" || joinedtMTEP3_T07pavadinimas != "" || joinedtMTEP3_T07atlikVieta != "" || joinedtMTEP3_T07data != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_T07.push({
              nr: joinedtMTEP3_T07nr,
              atlikejas: joinedtMTEP3_T07atlikejas,
              menoSrit: joinedtMTEP3_T07menoSrit,
              pavadinimas: joinedtMTEP3_T07pavadinimas,
              atlikVieta: joinedtMTEP3_T07atlikVieta,
              data: joinedtMTEP3_T07data
            })
          }
        }
        for (let s = 1; s <= parseInt(req.body.yond38); s++) {
          var tMTEP3_T08Snriteracija = tMTEP3_T08Snrcommand + s;
          var tMTEP3_T08atlikejasiteracija = tMTEP3_T08atlikejascommand + s;
          var tMTEP3_T08menoSrititeracija = tMTEP3_T08menoSritcommand + s;
          var tMTEP3_T08pavadinimasiteracija = tMTEP3_T08pavadinimascommand + s;
          var tMTEP3_T08atlikVietaiteracija = tMTEP3_T08atlikVietacommand + s;
          var tMTEP3_T08dataiteracija = tMTEP3_T08datacommand + s;
          var joinedtMTEP3_T08Snr = eval(tMTEP3_T08Snriteracija);
          var joinedtMTEP3_T08atlikejas = eval(tMTEP3_T08atlikejasiteracija);
          var joinedtMTEP3_T08menoSrit = eval(tMTEP3_T08menoSrititeracija);
          var joinedtMTEP3_T08pavadinimas = eval(tMTEP3_T08pavadinimasiteracija);
          var joinedtMTEP3_T08atlikVieta = eval(tMTEP3_T08atlikVietaiteracija);
          var joinedtMTEP3_T08data = eval(tMTEP3_T08dataiteracija);
          if (joinedtMTEP3_T08atlikejas != "" || joinedtMTEP3_T08menoSrit != "" || joinedtMTEP3_T08pavadinimas != "" || joinedtMTEP3_T08atlikVieta != "" || joinedtMTEP3_T08data != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_T08.push({
              nr: joinedtMTEP3_T08Snr,
              atlikejas: joinedtMTEP3_T08atlikejas,
              menoSrit: joinedtMTEP3_T08menoSrit,
              pavadinimas: joinedtMTEP3_T08pavadinimas,
              atlikVieta: joinedtMTEP3_T08atlikVieta,
              data: joinedtMTEP3_T08data
            })
          }
        }
        for (let t = 1; t <= parseInt(req.body.yond40); t++) {
          var tMTEP3_T09nriteracija = tMTEP3_T09nrcommand + t;
          var tMTEP3_T09atlikejasiteracija = tMTEP3_T09atlikejascommand + t;
          var tMTEP3_T09menoSrititeracija = tMTEP3_T09menoSritcommand + t;
          var tMTEP3_T09pavadinimasiteracija = tMTEP3_T09pavadinimascommand + t;
          var tMTEP3_T09atlikVietaiteracija = tMTEP3_T09atlikVietacommand + t;
          var tMTEP3_T09dataiteracija = tMTEP3_T09datacommand + t;
          var joinedtMTEP3_T09nr = eval(tMTEP3_T09nriteracija);
          var joinedtMTEP3_T09atlikejas = eval(tMTEP3_T09atlikejasiteracija);
          var joinedtMTEP3_T09menoSrit = eval(tMTEP3_T09menoSrititeracija);
          var joinedtMTEP3_T09pavadinimas = eval(tMTEP3_T09pavadinimasiteracija);
          var joinedtMTEP3_T09atlikVieta = eval(tMTEP3_T09atlikVietaiteracija);
          var joinedtMTEP3_T09data = eval(tMTEP3_T09dataiteracija);
          if (joinedtMTEP3_T09atlikejas != "" || joinedtMTEP3_T09menoSrit != "" || joinedtMTEP3_T09pavadinimas != "" || joinedtMTEP3_T09atlikVieta != "" || joinedtMTEP3_T09data != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_T09.push({
              nr: joinedtMTEP3_T09nr,
              atlikejas: joinedtMTEP3_T09atlikejas,
              menoSrit: joinedtMTEP3_T09menoSrit,
              pavadinimas: joinedtMTEP3_T09pavadinimas,
              atlikVieta: joinedtMTEP3_T09atlikVieta,
              data: joinedtMTEP3_T09data
            })
          }
        }
        for (let u = 1; u <= parseInt(req.body.yond42); u++) {
          var tMTEP3_T10nriteracija = tMTEP3_T10nrcommand + u;
          var tMTEP3_T10destytojasiteracija = tMTEP3_T10destytojascommand + u;
          var tMTEP3_T10veiklPobuditeracija = tMTEP3_T10veiklPobudcommand + u;
          var tMTEP3_T10veiklTiksliteracija = tMTEP3_T10veiklTikslcommand + u;
          var tMTEP3_T10dataVietaiteracija = tMTEP3_T10dataVietacommand + u;
          var tMTEP3_T10dalyvSkiteracija = tMTEP3_T10dalyvSkcommand + u;
          var tMTEP3_T10ktKomentaraiiteracija = tMTEP3_T10ktKomentaraicommand + u;
          var joinedtMTEP3_T10nr = eval(tMTEP3_T10nriteracija);
          var joinedtMTEP3_T10destytojas = eval(tMTEP3_T10destytojasiteracija);
          var joinedtMTEP3_T10veiklPobud = eval(tMTEP3_T10veiklPobuditeracija);
          var joinedtMTEP3_T10veiklTiksl = eval(tMTEP3_T10veiklTiksliteracija);
          var joinedtMTEP3_T10dataVieta = eval(tMTEP3_T10dataVietaiteracija);
          var joinedtMTEP3_T10dalyvSk = eval(tMTEP3_T10dalyvSkiteracija);
          var joinedtMTEP3_T10ktKomentarai = eval(tMTEP3_T10ktKomentaraiiteracija);
          if (joinedtMTEP3_T10destytojas != "" || joinedtMTEP3_T10veiklPobud != "" || joinedtMTEP3_T10veiklTiksl != "" || joinedtMTEP3_T10dataVieta != "" || joinedtMTEP3_T10dalyvSk != "" || joinedtMTEP3_T10ktKomentarai != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_T10.push({
              nr: joinedtMTEP3_T10nr,
              destytojas: joinedtMTEP3_T10destytojas,
              veiklPobud: joinedtMTEP3_T10veiklPobud,
              veiklTiksl: joinedtMTEP3_T10veiklTiksl,
              dataVieta: joinedtMTEP3_T10dataVieta,
              dalyvSk: joinedtMTEP3_T10dalyvSk,
              ktKomentarai: joinedtMTEP3_T10ktKomentarai
            })
          }
        }
        for (let v = 1; v <= parseInt(req.body.yond44); v++) {
          var tMTEP3_T11nriteracija = tMTEP3_T11nrcommand + v;
          var tMTEP3_T11veiklPobuditeracija = tMTEP3_T11veiklPobudcommand + v;
          var tMTEP3_T11destytojasiteracija = tMTEP3_T11destytojascommand + v;
          var tMTEP3_T11veiklTiksliteracija = tMTEP3_T11veiklTikslcommand + v;
          var tMTEP3_T11dataVietaiteracija = tMTEP3_T11dataVietacommand + v;
          var tMTEP3_T11dalyvSkiteracija = tMTEP3_T11dalyvSkcommand + v;
          var tMTEP3_T11ktKomentaraiiteracija = tMTEP3_T11ktKomentaraicommand + v;
          var joinedtMTEP3_T11nr = eval(tMTEP3_T11nriteracija);
          var joinedtMTEP3_T11destytojas = eval(tMTEP3_T11destytojasiteracija);
          var joinedtMTEP3_T11veiklPobud = eval(tMTEP3_T11veiklPobuditeracija);
          var joinedtMTEP3_T11veiklTiksl = eval(tMTEP3_T11veiklTiksliteracija);
          var joinedtMTEP3_T11dataVieta = eval(tMTEP3_T11dataVietaiteracija);
          var joinedtMTEP3_T11dalyvSk = eval(tMTEP3_T11dalyvSkiteracija);
          var joinedtMTEP3_T11ktKomentarai = eval(tMTEP3_T11ktKomentaraiiteracija);
          if (joinedtMTEP3_T11destytojas != "" || joinedtMTEP3_T11veiklPobud != "" || joinedtMTEP3_T11veiklTiksl != "" || joinedtMTEP3_T11dataVieta != "" || joinedtMTEP3_T11dalyvSk != "" || joinedtMTEP3_T11ktKomentarai != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_T11.push({
              nr: joinedtMTEP3_T11nr,
              destytojas: joinedtMTEP3_T11destytojas,
              veiklPobud: joinedtMTEP3_T11veiklPobud,
              veiklTiksl: joinedtMTEP3_T11veiklTiksl,
              dataVieta: joinedtMTEP3_T11dataVieta,
              dalyvSk: joinedtMTEP3_T11dalyvSk,
              ktKomentarai: joinedtMTEP3_T11ktKomentarai
            })
          }
        }
        for (let w = 1; w <= parseInt(req.body.yond46); w++) {
          var tMTEP3_T12nriteracija = tMTEP3_T12nrcommand + w;
          var tMTEP3_T12destytojasiteracija = tMTEP3_T12destytojascommand + w;
          var tMTEP3_T12veiklPobuditeracija = tMTEP3_T12veiklPobudcommand + w;
          var tMTEP3_T12dataVietaiteracija = tMTEP3_T12dataVietacommand + w;
          var joinedtMTEP3_T12nr = eval(tMTEP3_T12nriteracija);
          var joinedtMTEP3_T12destytojas = eval(tMTEP3_T12destytojasiteracija);
          var joinedtMTEP3_T12veiklPobud = eval(tMTEP3_T12veiklPobuditeracija);
          var joinedtMTEP3_T12dataVieta = eval(tMTEP3_T12dataVietaiteracija);
          if (joinedtMTEP3_T12destytojas != "" || joinedtMTEP3_T12veiklPobud != "" || joinedtMTEP3_T12dataVieta != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_T12.push({
              nr: joinedtMTEP3_T12nr,
              destytojas: joinedtMTEP3_T12destytojas,
              veiklPobud: joinedtMTEP3_T12veiklPobud,
              dataVieta: joinedtMTEP3_T12dataVieta
            })
          }
        }
        for (let i = 1; i <= parseInt(req.body.yond48); i++) {
          var tMTEP3_T13nri = tMTEP3_T13nrcommand + i;
          var tMTEP3_T13destytojasi = tMTEP3_T13destytojascommand + i;
          var tMTEP3_T13studDuomi = tMTEP3_T13studDuomcommand + i;
          var tMTEP3_T13renginioPavadi = tMTEP3_T13renginioPavadcommand + i;
          var tMTEP3_T13rezultatasi = tMTEP3_T13rezultatascommand + i;
          var tMTEP3_T13datai = tMTEP3_T13datacommand + i;
          var joinedtMTEP3_T13nr = eval(tMTEP3_T13nri);
          var joinedtMTEP3_T13destytojas = eval(tMTEP3_T13destytojasi);
          var joinedtMTEP3_T13studDuom = eval(tMTEP3_T13studDuomi);
          var joinedtMTEP3_T13renginioPavad = eval(tMTEP3_T13renginioPavadi);
          var joinedtMTEP3_T13rezultatas = eval(tMTEP3_T13rezultatasi);
          var joinedtMTEP3_T13data = eval(tMTEP3_T13datai);
          if (joinedtMTEP3_T13destytojas != "" || joinedtMTEP3_T13studDuom != "" || joinedtMTEP3_T13renginioPavad != "" || joinedtMTEP3_T13rezultatas != "" || joinedtMTEP3_T13data != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_T13.push({
              nr: joinedtMTEP3_T13nr,
              destytojas: joinedtMTEP3_T13destytojas,
              studDuom: joinedtMTEP3_T13studDuom,
              renginioPavad: joinedtMTEP3_T13renginioPavad,
              rezultatas: joinedtMTEP3_T13rezultatas,
              data: joinedtMTEP3_T13data
            })
          }
        }
        for (let y = 1; y <= parseInt(req.body.yond50); y++) {
          var tMTEP3_T14nri = tMTEP3_T14nrcommand + y;
          var tMTEP3_T14destytojasi = tMTEP3_T14destytojascommand + y;
          var tMTEP3_T14renginysi = tMTEP3_T14renginyscommand + y;
          var tMTEP3_T14veiklPobudi = tMTEP3_T14veiklPobudcommand + y;
          var tMTEP3_T14dataVietai = tMTEP3_T14dataVietacommand + y;
          var joinedtMTEP3_T14nr = eval(tMTEP3_T14nri);
          var joinedtMTEP3_T14destytojas = eval(tMTEP3_T14destytojasi);
          var joinedtMTEP3_T14renginys = eval(tMTEP3_T14renginysi);
          var joinedtMTEP3_T14veiklPobud = eval(tMTEP3_T14veiklPobudi);
          var joinedtMTEP3_T14dataVieta = eval(tMTEP3_T14dataVietai);
          if (joinedtMTEP3_T14destytojas != "" || joinedtMTEP3_T14renginys != "" || joinedtMTEP3_T14veiklPobud != "" || joinedtMTEP3_T14dataVieta != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_T14.push({
              nr: joinedtMTEP3_T14nr,
              destytojas: joinedtMTEP3_T14destytojas,
              renginys: joinedtMTEP3_T14renginys,
              veiklPobud: joinedtMTEP3_T14veiklPobud,
              dataVieta: joinedtMTEP3_T14dataVieta
            })
          }
        }
        for (let i = 1; i <= parseInt(req.body.yonder12); i++) {
          var tMTEP3_T15nri = tMTEP3_T15nrcommand + i;
          var tMTEP3_T15mokymaii = tMTEP3_T15mokymaicommand + i;
          var tMTEP3_T15vykdytojaii = tMTEP3_T15vykdytojaicommand + i;
          var tMTEP3_T15uzsakovasi = tMTEP3_T15uzsakovascommand + i;
          var tMTEP3_T15sumai = tMTEP3_T15sumacommand + i;
          var tMTEP3_T15nrDatai = tMTEP3_T15nrDatacommand + i;
          var tMTEP3_T15klausytojaii = tMTEP3_T15klausytojaicommand + i;
          var tMTEP3_T15trukmei = tMTEP3_T15trukmecommand + i;
          var joinedtMTEP3_T15nr = eval(tMTEP3_T15nri);
          var joinedtMTEP3_T15mokymai = eval(tMTEP3_T15mokymaii);
          var joinedtMTEP3_T15vykdytojai = eval(tMTEP3_T15vykdytojaii);
          var joinedtMTEP3_T15uzsakovas = eval(tMTEP3_T15uzsakovasi);
          var joinedtMTEP3_T15suma = eval(tMTEP3_T15sumai);
          var joinedtMTEP3_T15nrData = eval(tMTEP3_T15nrDatai);
          var joinedtMTEP3_T15klausytojai = eval(tMTEP3_T15klausytojaii);
          var joinedtMTEP3_T15trukme = eval(tMTEP3_T15trukmei);
          if (joinedtMTEP3_T15mokymai != "" || joinedtMTEP3_T15vykdytojai != "" || joinedtMTEP3_T15uzsakovas != "" || joinedtMTEP3_T15suma != "" || joinedtMTEP3_T15nrData != "" || joinedtMTEP3_T15klausytojai != "" || joinedtMTEP3_T15trukme != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_T15.push({
              nr: joinedtMTEP3_T15nr,
              mokymai: joinedtMTEP3_T15mokymai,
              vykdytojai: joinedtMTEP3_T15vykdytojai,
              uzsakovas: joinedtMTEP3_T15uzsakovas,
              suma: joinedtMTEP3_T15suma,
              nrData: joinedtMTEP3_T15nrData,
              klausytojai: joinedtMTEP3_T15klausytojai,
              trukme: joinedtMTEP3_T15trukme
            })
          }
        }
        for (let i = 1; i <= parseInt(req.body.yonder14); i++) {
          var tMTEP3_T16nri = tMTEP3_T16nrcommand + i;
          var tMTEP3_T16pavadinimasi = tMTEP3_T16pavadinimascommand + i;
          var tMTEP3_T16uzsakovasi = tMTEP3_T16uzsakovascommand + i;
          var tMTEP3_T16rengejaii = tMTEP3_T16rengejaicommand + i;
          var joinedtMTEP3_T16nr = eval(tMTEP3_T16nri);
          var joinedtMTEP3_T16pavadinimas = eval(tMTEP3_T16pavadinimasi);
          var joinedtMTEP3_T16uzsakovas = eval(tMTEP3_T16uzsakovasi);
          var joinedtMTEP3_T16rengejai = eval(tMTEP3_T16rengejaii);
          if (joinedtMTEP3_T16pavadinimas != "" || joinedtMTEP3_T16uzsakovas != "" || joinedtMTEP3_T16rengejai != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_T16.push({
              nr: joinedtMTEP3_T16nr,
              pavadinimas: joinedtMTEP3_T16pavadinimas,
              uzsakovas: joinedtMTEP3_T16uzsakovas,
              rengejai: joinedtMTEP3_T16rengejai
            })
          }
        }
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T17.komentaras = req.body.tMTEP3_T17komentaras,
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T18.komentaras = req.body.tMTEP3_T18komentaras

        for (let i = 1; i <= parseInt(req.body.yonder16); i++) {
          var tMTEP3_Snri = tMTEP3_Snrcommand + i;
          var tMTEP3_Sstiprybesi = tMTEP3_Sstiprybescommand + i;
          var tMTEP3_Stobulintinai = tMTEP3_Stobulintinacommand + i;
          var tMTEP3_Snr = eval(tMTEP3_Snri);
          var tMTEP3_Sstiprybes = eval(tMTEP3_Sstiprybesi);
          var tMTEP3_Stobulintina = eval(tMTEP3_Stobulintinai);
          if (tMTEP3_Sstiprybes != "" || tMTEP3_Stobulintina != "") {
            foundUser.katedrosVedejas.tMTEP3.tMTEP3_S.push({
              nr: tMTEP3_Snr,
              stiprybes: tMTEP3_Sstiprybes,
              tobulintina: tMTEP3_Stobulintina
            })
          }
        }
        // //kTOV4_KV01
        // //kTOV4_KV01dalykines_komp
        for (let ba = 1; ba <= parseInt(req.body.number2); ba++) {
          var kTOV4_KV01dalykStazuotespavaditeracija = kTOV4_KV01dalykStazuotespavadcommand + ba;
          var kTOV4_KV01dalykStazuotespazymNriteracija = kTOV4_KV01dalykStazuotespazymNrcommand + ba;
          var kTOV4_KV01dalykStazuotestrukmeValiteracija = kTOV4_KV01dalykStazuotestrukmeValcommand + ba;
          var kTOV4_KV01dalykStazuotesdalyvisi = kTOV4_KV01dalykStazuotesdalyviscommand + ba;
          var joinedkTOV4_KV01dalykStazuotespavad = eval(kTOV4_KV01dalykStazuotespavaditeracija);
          var joinedkTOV4_KV01dalykStazuotespazymNr = eval(kTOV4_KV01dalykStazuotespazymNriteracija);
          var joinedkTOV4_KV01dalykStazuotestrukmeVal = eval(kTOV4_KV01dalykStazuotestrukmeValiteracija);
          var joinedkTOV4_KV01dalykStazuotesdalyvis = eval(kTOV4_KV01dalykStazuotesdalyvisi);
          if (joinedkTOV4_KV01dalykStazuotespavad != "" || joinedkTOV4_KV01dalykStazuotespazymNr != "" || joinedkTOV4_KV01dalykStazuotestrukmeVal != "" || joinedkTOV4_KV01dalykStazuotesdalyvis != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01dalykines_komp.stazuotes.push({
              pavadinimas: joinedkTOV4_KV01dalykStazuotespavad,
              pazymNr: joinedkTOV4_KV01dalykStazuotespazymNr,
              trukmeVal: joinedkTOV4_KV01dalykStazuotestrukmeVal,
              dalyvis: joinedkTOV4_KV01dalykStazuotesdalyvis
            })
          }
        }
        for (let bb = 1; bb <= parseInt(req.body.number4); bb++) {
          var kTOV4_KV01dalykSeminaraipavaditeracija = kTOV4_KV01dalykSeminaraipavadcommand + bb;
          var kTOV4_KV01dalykSeminaraipazymNriteracija = kTOV4_KV01dalykSeminaraipazymNrcommand + bb;
          var kTOV4_KV01dalykSeminaraitrukmeValiteracija = kTOV4_KV01dalykSeminaraitrukmeValcommand + bb;
          var kTOV4_KV01dalykSeminaraidalyvisi = kTOV4_KV01dalykSeminaraidalyviscommand + bb;
          var joinedkTOV4_KV01dalykSeminaraipavad = eval(kTOV4_KV01dalykSeminaraipavaditeracija);
          var joinedkTOV4_KV01dalykSeminaraipazymNr = eval(kTOV4_KV01dalykSeminaraipazymNriteracija);
          var joinedkTOV4_KV01dalykSeminaraitrukmeVal = eval(kTOV4_KV01dalykSeminaraitrukmeValiteracija);
          var joinedkTOV4_KV01dalykSeminaraidalyvis = eval(kTOV4_KV01dalykSeminaraidalyvisi);
          if (joinedkTOV4_KV01dalykSeminaraipavad != "" || joinedkTOV4_KV01dalykSeminaraipazymNr != "" || joinedkTOV4_KV01dalykSeminaraitrukmeVal != "" || joinedkTOV4_KV01dalykSeminaraidalyvis != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01dalykines_komp.seminarai.push({
              pavadinimas: joinedkTOV4_KV01dalykSeminaraipavad,
              pazymNr: joinedkTOV4_KV01dalykSeminaraipazymNr,
              trukmeVal: joinedkTOV4_KV01dalykSeminaraitrukmeVal,
              dalyvis: joinedkTOV4_KV01dalykSeminaraidalyvis
            })
          }
        }
        for (let bc = 1; bc <= parseInt(req.body.number6); bc++) {
          var kTOV4_KV01dalykKonfpavaditeracija = kTOV4_KV01dalykKonfpavadcommand + bc;
          var kTOV4_KV01dalykKonfpazymNriteracija = kTOV4_KV01dalykKonfpazymNrcommand + bc;
          var kTOV4_KV01dalykKonftrukmeValiteracija = kTOV4_KV01dalykKonftrukmeValcommand + bc;
          var kTOV4_KV01dalykKonfdalyvisiteracija = kTOV4_KV01dalykKonfdalyviscommand + bc;
          var joinedkTOV4_KV01dalykKonfpavad = eval(kTOV4_KV01dalykKonfpavaditeracija);
          var joinedkTOV4_KV01dalykKonfpazymNr = eval(kTOV4_KV01dalykKonfpazymNriteracija);
          var joinedkTOV4_KV01dalykKonftrukmeVal = eval(kTOV4_KV01dalykKonftrukmeValiteracija);
          var joinedkTOV4_KV01dalykKonfdalyvis = eval(kTOV4_KV01dalykKonfdalyvisiteracija);
          if (joinedkTOV4_KV01dalykKonfpavad != "" || joinedkTOV4_KV01dalykKonfpazymNr != "" || joinedkTOV4_KV01dalykKonftrukmeVal != "" || joinedkTOV4_KV01dalykKonfdalyvis != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01dalykines_komp.konferencijos.push({
              pavadinimas: joinedkTOV4_KV01dalykKonfpavad,
              pazymNr: joinedkTOV4_KV01dalykKonfpazymNr,
              trukmeVal: joinedkTOV4_KV01dalykKonftrukmeVal,
              dalyvis: joinedkTOV4_KV01dalykKonfdalyvis
            })
          }
        }
        for (let bd = 1; bd <= parseInt(req.body.number8); bd++) {
          var kTOV4_KV01dalykKursaipavaditeracija = kTOV4_KV01dalykKursaipavadcommand + bd;
          var kTOV4_KV01dalykKursaipazymNriteracija = kTOV4_KV01dalykKursaipazymNrcommand + bd;
          var kTOV4_KV01dalykKursaitrukmeValiteracija = kTOV4_KV01dalykKursaitrukmeValcommand + bd;
          var kTOV4_KV01dalykKursaidalyvisiteracija = kTOV4_KV01dalykKursaidalyviscommand + bd;
          var joinedkTOV4_KV01dalykKursaipavad = eval(kTOV4_KV01dalykKursaipavaditeracija);
          var joinedkTOV4_KV01dalykKursaipazymNr = eval(kTOV4_KV01dalykKursaipazymNriteracija);
          var joinedkTOV4_KV01dalykKursaitrukmeVal = eval(kTOV4_KV01dalykKursaitrukmeValiteracija);
          var joinedkTOV4_KV01dalykKursaidalyvis = eval(kTOV4_KV01dalykKursaidalyvisiteracija);
          if (joinedkTOV4_KV01dalykKursaipavad != "" || joinedkTOV4_KV01dalykKursaipazymNr != "" || joinedkTOV4_KV01dalykKursaitrukmeVal != "" || joinedkTOV4_KV01dalykKursaidalyvis != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01dalykines_komp.kursai.push({
              pavadinimas: joinedkTOV4_KV01dalykKursaipavad,
              pazymNr: joinedkTOV4_KV01dalykKursaipazymNr,
              trukmeVal: joinedkTOV4_KV01dalykKursaitrukmeVal,
              dalyvis: joinedkTOV4_KV01dalykKursaidalyvis
            })
          }
        }
        //kTOV4_KV01didaktines_komp
        for (let be = 1; be <= parseInt(req.body.number10); be++) {
          var kTOV4_KV01didakStazuotespavaditeracija = kTOV4_KV01didakStazuotespavadcommand + be;
          var kTOV4_KV01didakStazuotespazymNriteracija = kTOV4_KV01didakStazuotespazymNrcommand + be;
          var kTOV4_KV01didakStazuotestrukmeValiteracija = kTOV4_KV01didakStazuotestrukmeValcommand + be;
          var kTOV4_KV01didakStazuotesdalyvisiteracija = kTOV4_KV01didakStazuotesdalyviscommand + be;
          var joinedkTOV4_KV01didakStazuotespavad = eval(kTOV4_KV01didakStazuotespavaditeracija);
          var joinedkTOV4_KV01didakStazuotespazymNr = eval(kTOV4_KV01didakStazuotespazymNriteracija);
          var joinedkTOV4_KV01didakStazuotestrukmeVal = eval(kTOV4_KV01didakStazuotestrukmeValiteracija);
          var joinedkTOV4_KV01didakStazuotesdalyvis = eval(kTOV4_KV01didakStazuotesdalyvisiteracija);
          if (joinedkTOV4_KV01didakStazuotespavad != "" || joinedkTOV4_KV01didakStazuotespazymNr != "" || joinedkTOV4_KV01didakStazuotestrukmeVal != "" || joinedkTOV4_KV01didakStazuotesdalyvis != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01didaktines_komp.stazuotes.push({
              pavadinimas: joinedkTOV4_KV01didakStazuotespavad,
              pazymNr: joinedkTOV4_KV01didakStazuotespazymNr,
              trukmeVal: joinedkTOV4_KV01didakStazuotestrukmeVal,
              dalyvis: joinedkTOV4_KV01didakStazuotesdalyvis
            })
          }
        }
        for (let bf = 1; bf <= parseInt(req.body.number12); bf++) {
          var kTOV4_KV01didakSeminaraipavaditeracija = kTOV4_KV01didakSeminaraipavadcommand + bf;
          var kTOV4_KV01didakSeminaraipazymNriteracija = kTOV4_KV01didakSeminaraipazymNrcommand + bf;
          var kTOV4_KV01didakSeminaraitrukmeValiteracija = kTOV4_KV01didakSeminaraitrukmeValcommand + bf;
          var kTOV4_KV01didakSeminaraidalyvisiteracija = kTOV4_KV01didakSeminaraidalyviscommand + bf;
          var joinedkTOV4_KV01didakSeminaraipavad = eval(kTOV4_KV01didakSeminaraipavaditeracija);
          var joinedkTOV4_KV01didakSeminaraipazymNr = eval(kTOV4_KV01didakSeminaraipazymNriteracija);
          var joinedkTOV4_KV01didakSeminaraitrukmeVal = eval(kTOV4_KV01didakSeminaraitrukmeValiteracija);
          var joinedkTOV4_KV01didakSeminaraidalyvis = eval(kTOV4_KV01didakSeminaraidalyvisiteracija);
          if (joinedkTOV4_KV01didakSeminaraipavad != "" || joinedkTOV4_KV01didakSeminaraipavad != "" || joinedkTOV4_KV01didakSeminaraitrukmeVal != "" || joinedkTOV4_KV01didakSeminaraidalyvis != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01didaktines_komp.seminarai.push({
              pavadinimas: joinedkTOV4_KV01didakSeminaraipavad,
              pazymNr: joinedkTOV4_KV01didakSeminaraipazymNr,
              trukmeVal: joinedkTOV4_KV01didakSeminaraitrukmeVal,
              dalyvis: joinedkTOV4_KV01didakSeminaraidalyvis
            })
          }
        }
        for (let bg = 1; bg <= parseInt(req.body.number14); bg++) {
          var kTOV4_KV01didakKonfpavaditeracija = kTOV4_KV01didakKonfpavadcommand + bg;
          var kTOV4_KV01didakKonfpazymNriteracija = kTOV4_KV01didakKonfpazymNrcommand + bg;
          var kTOV4_KV01didakKonftrukmeValiteracija = kTOV4_KV01didakKonftrukmeValcommand + bg;
          var kTOV4_KV01didakKonfdalyvisiteracija = kTOV4_KV01didakKonfdalyviscommand + bg;
          var joinedkTOV4_KV01didakKonfpavad = eval(kTOV4_KV01didakKonfpavaditeracija);
          var joinedkTOV4_KV01didakKonfpazymNr = eval(kTOV4_KV01didakKonfpazymNriteracija);
          var joinedkTOV4_KV01didakKonftrukmeVal = eval(kTOV4_KV01didakKonftrukmeValiteracija);
          var joinedkTOV4_KV01didakKonfdalyvis = eval(kTOV4_KV01didakKonfdalyvisiteracija);
          if (joinedkTOV4_KV01didakKonfpavad != "" || joinedkTOV4_KV01didakKonfpazymNr != "" || joinedkTOV4_KV01didakKonftrukmeVal != "" || joinedkTOV4_KV01didakKonfdalyvis != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01didaktines_komp.konferencijos.push({
              pavadinimas: joinedkTOV4_KV01didakKonfpavad,
              pazymNr: joinedkTOV4_KV01didakKonfpazymNr,
              trukmeVal: joinedkTOV4_KV01didakKonftrukmeVal,
              dalyvis: joinedkTOV4_KV01didakKonfdalyvis
            })
          }
        }
        for (let bh = 1; bh <= parseInt(req.body.number16); bh++) {
          var kTOV4_KV01didakKursaipavaditeracija = kTOV4_KV01didakKursaipavadcommand + bh;
          var kTOV4_KV01didakKursaipazymNriteracija = kTOV4_KV01didakKursaipazymNrcommand + bh;
          var kTOV4_KV01didakKursaitrukmeValiteracija = kTOV4_KV01didakKursaitrukmeValcommand + bh;
          var kTOV4_KV01didakKursaidalyvisiteracija = kTOV4_KV01didakKursaidalyviscommand + bh;
          var joinedkTOV4_KV01didakKursaipavad = eval(kTOV4_KV01didakKursaipavaditeracija);
          var joinedkTOV4_KV01didakKursaipazymNr = eval(kTOV4_KV01didakKursaipazymNriteracija);
          var joinedkTOV4_KV01didakKursaitrukmeVal = eval(kTOV4_KV01didakKursaitrukmeValiteracija);
          var joinedkTOV4_KV01didakKursaidalyvis = eval(kTOV4_KV01didakKursaidalyvisiteracija);
          if (joinedkTOV4_KV01didakKursaipavad != "" || joinedkTOV4_KV01didakKursaipazymNr != "" || joinedkTOV4_KV01didakKursaitrukmeVal != "" || joinedkTOV4_KV01didakKursaidalyvis != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01didaktines_komp.kursai.push({
              pavadinimas: joinedkTOV4_KV01didakKursaipavad,
              pazymNr: joinedkTOV4_KV01didakKursaipazymNr,
              trukmeVal: joinedkTOV4_KV01didakKursaitrukmeVal,
              dalyvis: joinedkTOV4_KV01didakKursaidalyvis
            })
          }
        }
        //kTOV4_KV01bendrosios_komp
        for (let bi = 1; bi <= parseInt(req.body.number18); bi++) {
          var kTOV4_KV01bendrStazuotespavaditeracija = kTOV4_KV01bendrStazuotespavadcommand + bi;
          var kTOV4_KV01bendrStazuotespazymNriteracija = kTOV4_KV01bendrStazuotespazymNrcommand + bi;
          var kTOV4_KV01bendrStazuotestrukmeValiteracija = kTOV4_KV01bendrStazuotestrukmeValcommand + bi;
          var kTOV4_KV01bendrStazuotesdalyvisiteracija = kTOV4_KV01bendrStazuotesdalyviscommand + bi;
          var joinedkTOV4_KV01bendrStazuotespavad = eval(kTOV4_KV01bendrStazuotespavaditeracija);
          var joinedkTOV4_KV01bendrStazuotespazymNr = eval(kTOV4_KV01bendrStazuotespazymNriteracija);
          var joinedkTOV4_KV01bendrStazuotestrukmeVal = eval(kTOV4_KV01bendrStazuotestrukmeValiteracija);
          var joinedkTOV4_KV01bendrStazuotesdalyvis = eval(kTOV4_KV01bendrStazuotesdalyvisiteracija);
          if (joinedkTOV4_KV01bendrStazuotespavad != "" || joinedkTOV4_KV01bendrStazuotespazymNr != "" || joinedkTOV4_KV01bendrStazuotestrukmeVal != "" || joinedkTOV4_KV01bendrStazuotesdalyvis != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01bendrosios_komp.stazuotes.push({
              pavadinimas: joinedkTOV4_KV01bendrStazuotespavad,
              pazymNr: joinedkTOV4_KV01bendrStazuotespazymNr,
              trukmeVal: joinedkTOV4_KV01bendrStazuotestrukmeVal,
              dalyvis: joinedkTOV4_KV01bendrStazuotesdalyvis
            })
          }
        }
        for (let bj = 1; bj <= parseInt(req.body.number20); bj++) {
          var kTOV4_KV01bendrSeminaraipavaditeracija = kTOV4_KV01bendrSeminaraipavadcommand + bj;
          var kTOV4_KV01bendrSeminaraipazymNriteracija = kTOV4_KV01bendrSeminaraipazymNrcommand + bj;
          var kTOV4_KV01bendrSeminaraitrukmeValiteracija = kTOV4_KV01bendrSeminaraitrukmeValcommand + bj;
          var kTOV4_KV01bendrSeminaraidalyvisiteracija = kTOV4_KV01bendrSeminaraidalyviscommand + bj;
          var joinedkTOV4_KV01bendrSeminaraipavad = eval(kTOV4_KV01bendrSeminaraipavaditeracija);
          var joinedkTOV4_KV01bendrSeminaraipazymNr = eval(kTOV4_KV01bendrSeminaraipazymNriteracija);
          var joinedkTOV4_KV01bendrSeminaraitrukmeVal = eval(kTOV4_KV01bendrSeminaraitrukmeValiteracija);
          var joinedkTOV4_KV01bendrSeminaraidalyvis = eval(kTOV4_KV01bendrSeminaraidalyvisiteracija);
          if (joinedkTOV4_KV01bendrSeminaraipavad != "" || joinedkTOV4_KV01bendrSeminaraipazymNr != "" || joinedkTOV4_KV01bendrSeminaraitrukmeVal != "" || joinedkTOV4_KV01bendrSeminaraidalyvis != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01bendrosios_komp.seminarai.push({
              pavadinimas: joinedkTOV4_KV01bendrSeminaraipavad,
              pazymNr: joinedkTOV4_KV01bendrSeminaraipazymNr,
              trukmeVal: joinedkTOV4_KV01bendrSeminaraitrukmeVal,
              dalyvis: joinedkTOV4_KV01bendrSeminaraidalyvis
            })
          }
        }
        for (let bk = 1; bk <= parseInt(req.body.number22); bk++) {
          var kTOV4_KV01bendrKonfpavaditeracija = kTOV4_KV01bendrKonfpavadcommand + bk;
          var kTOV4_KV01bendrKonfpazymNriteracija = kTOV4_KV01bendrKonfpazymNrcommand + bk;
          var kTOV4_KV01bendrKonftrukmeValiteracija = kTOV4_KV01bendrKonftrukmeValcommand + bk;
          var kTOV4_KV01bendrKonfdalyvisiteracija = kTOV4_KV01bendrKonfdalyviscommand + bk;
          var joinedkTOV4_KV01bendrKonfpavad = eval(kTOV4_KV01bendrKonfpavaditeracija);
          var joinedkTOV4_KV01bendrKonfpazymNr = eval(kTOV4_KV01bendrKonfpazymNriteracija);
          var joinedkTOV4_KV01bendrKonftrukmeVal = eval(kTOV4_KV01bendrKonftrukmeValiteracija);
          var joinedkTOV4_KV01bendrKonfdalyvis = eval(kTOV4_KV01bendrKonfdalyvisiteracija);
          if (joinedkTOV4_KV01bendrKonfpavad != "" || joinedkTOV4_KV01bendrKonfpazymNr != "" || joinedkTOV4_KV01bendrKonftrukmeVal != "" || joinedkTOV4_KV01bendrKonfdalyvis != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01bendrosios_komp.konferencijos.push({
              pavadinimas: joinedkTOV4_KV01bendrKonfpavad,
              pazymNr: joinedkTOV4_KV01bendrKonfpazymNr,
              trukmeVal: joinedkTOV4_KV01bendrKonftrukmeVal,
              dalyvis: joinedkTOV4_KV01bendrKonfdalyvis
            })
          }
        }
        for (let bl = 1; bl <= parseInt(req.body.number24); bl++) {
          var kTOV4_KV01bendrKursaipavaditeracija = kTOV4_KV01bendrKursaipavadcommand + bl;
          var kTOV4_KV01bendrKursaipazymNriteracija = kTOV4_KV01bendrKursaipazymNrcommand + bl;
          var kTOV4_KV01bendrKursaitrukmeValiteracija = kTOV4_KV01bendrKursaitrukmeValcommand + bl;
          var kTOV4_KV01bendrKursaidalyvisiteracija = kTOV4_KV01bendrKursaidalyviscommand + bl;
          var joinedkTOV4_KV01bendrKursaipavad = eval(kTOV4_KV01bendrKursaipavaditeracija);
          var joinedkTOV4_KV01bendrKursaipazymNr = eval(kTOV4_KV01bendrKursaipazymNriteracija);
          var joinedkTOV4_KV01bendrKursaitrukmeVal = eval(kTOV4_KV01bendrKursaitrukmeValiteracija);
          var joinedkTOV4_KV01bendrKursaidalyvis = eval(kTOV4_KV01bendrKursaidalyvisiteracija);
          if (joinedkTOV4_KV01bendrKursaipavad != "" || joinedkTOV4_KV01bendrKursaipazymNr != "" || joinedkTOV4_KV01bendrKursaitrukmeVal != "" || joinedkTOV4_KV01bendrKursaidalyvis != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01bendrosios_komp.kursai.push({
              pavadinimas: joinedkTOV4_KV01bendrKursaipavad,
              pazymNr: joinedkTOV4_KV01bendrKursaipazymNr,
              trukmeVal: joinedkTOV4_KV01bendrKursaitrukmeVal,
              dalyvis: joinedkTOV4_KV01bendrKursaidalyvis
            })
          }
        }
        //kTOV4_KV02
        //kTOV4_KV02dalykines_komp
        for (let bm = 1; bm <= parseInt(req.body.number26); bm++) {
          var kTOV4_KV02dalykStazuotespavaditeracija = kTOV4_KV02dalykStazuotespavadcommand + bm;
          var kTOV4_KV02dalykStazuotespazymNriteracija = kTOV4_KV02dalykStazuotespazymNrcommand + bm;
          var kTOV4_KV02dalykStazuotestrukmeValiteracija = kTOV4_KV02dalykStazuotestrukmeValcommand + bm;
          var kTOV4_KV02dalykStazuotesdalyvisiteracija = kTOV4_KV02dalykStazuotesdalyviscommand + bm;
          var joinedkTOV4_KV02dalykStazuotespavad = eval(kTOV4_KV02dalykStazuotespavaditeracija);
          var joinedkTOV4_KV02dalykStazuotespazymNr = eval(kTOV4_KV02dalykStazuotespazymNriteracija);
          var joinedkTOV4_KV02dalykStazuotestrukmeVal = eval(kTOV4_KV02dalykStazuotestrukmeValiteracija);
          var joinedkTOV4_KV02dalykStazuotesdalyvis = eval(kTOV4_KV02dalykStazuotesdalyvisiteracija);
          if (joinedkTOV4_KV02dalykStazuotespavad != "" || joinedkTOV4_KV02dalykStazuotespazymNr != "" || joinedkTOV4_KV02dalykStazuotestrukmeVal != "" || joinedkTOV4_KV02dalykStazuotesdalyvis != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02dalykines_komp.stazuotes.push({
              pavadinimas: joinedkTOV4_KV02dalykStazuotespavad,
              pazymNr: joinedkTOV4_KV02dalykStazuotespazymNr,
              trukmeVal: joinedkTOV4_KV02dalykStazuotestrukmeVal,
              dalyvis: joinedkTOV4_KV02dalykStazuotesdalyvis
            })
          }
        }
        for (let bn = 1; bn <= parseInt(req.body.number28); bn++) {
          var kTOV4_KV02dalykSeminaraipavaditeracija = kTOV4_KV02dalykSeminaraipavadcommand + bn;
          var kTOV4_KV02dalykSeminaraipazymNriteracija = kTOV4_KV02dalykSeminaraipazymNrcommand + bn;
          var kTOV4_KV02dalykSeminaraitrukmeValiteracija = kTOV4_KV02dalykSeminaraitrukmeValcommand + bn;
          var kTOV4_KV02dalykSeminaraidalyvisiteracija = kTOV4_KV02dalykSeminaraidalyviscommand + bn;
          var joinedkTOV4_KV02dalykSeminaraipavad = eval(kTOV4_KV02dalykSeminaraipavaditeracija);
          var joinedkTOV4_KV02dalykSeminaraipazymNr = eval(kTOV4_KV02dalykSeminaraipazymNriteracija);
          var joinedkTOV4_KV02dalykSeminaraitrukmeVal = eval(kTOV4_KV02dalykSeminaraitrukmeValiteracija);
          var joinedkTOV4_KV02dalykSeminaraidalyvis = eval(kTOV4_KV02dalykSeminaraidalyvisiteracija);
          if (joinedkTOV4_KV02dalykSeminaraipavad != "" || joinedkTOV4_KV02dalykSeminaraipazymNr != "" || joinedkTOV4_KV02dalykSeminaraitrukmeVal != "" || joinedkTOV4_KV02dalykSeminaraidalyvis != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02dalykines_komp.seminarai.push({
              pavadinimas: joinedkTOV4_KV02dalykSeminaraipavad,
              pazymNr: joinedkTOV4_KV02dalykSeminaraipazymNr,
              trukmeVal: joinedkTOV4_KV02dalykSeminaraitrukmeVal,
              dalyvis: joinedkTOV4_KV02dalykSeminaraidalyvis
            })
          }
        }
        for (let bo = 1; bo <= parseInt(req.body.number30); bo++) {
          var kTOV4_KV02dalykKonfpavaditeracija = kTOV4_KV02dalykKonfpavadcommand + bo;
          var kTOV4_KV02dalykKonfpazymNriteracija = kTOV4_KV02dalykKonfpazymNrcommand + bo;
          var kTOV4_KV02dalykKonftrukmeValiteracija = kTOV4_KV02dalykKonftrukmeValcommand + bo;
          var kTOV4_KV02dalykKonfdalyvisiteracija = kTOV4_KV02dalykKonfdalyviscommand + bo;
          var joinedkTOV4_KV02dalykKonfpavad = eval(kTOV4_KV02dalykKonfpavaditeracija);
          var joinedkTOV4_KV02dalykKonfpazymNr = eval(kTOV4_KV02dalykKonfpazymNriteracija);
          var joinedkTOV4_KV02dalykKonftrukmeVal = eval(kTOV4_KV02dalykKonftrukmeValiteracija);
          var joinedkTOV4_KV02dalykKonfdalyvis = eval(kTOV4_KV02dalykKonfdalyvisiteracija);
          if (joinedkTOV4_KV02dalykKonfpavad != "" || joinedkTOV4_KV02dalykKonfpazymNr != "" || joinedkTOV4_KV02dalykKonftrukmeVal != "" || joinedkTOV4_KV02dalykKonfdalyvis != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02dalykines_komp.konferencijos.push({
              pavadinimas: joinedkTOV4_KV02dalykKonfpavad,
              pazymNr: joinedkTOV4_KV02dalykKonfpazymNr,
              trukmeVal: joinedkTOV4_KV02dalykKonftrukmeVal,
              dalyvis: joinedkTOV4_KV02dalykKonfdalyvis
            })
          }
        }
        for (let bp = 1; bp <= parseInt(req.body.number32); bp++) {
          var kTOV4_KV02dalykKursaipavaditeracija = kTOV4_KV02dalykKursaipavadcommand + bp;
          var kTOV4_KV02dalykKursaipazymNriteracija = kTOV4_KV02dalykKursaipazymNrcommand + bp;
          var kTOV4_KV02dalykKursaitrukmeValiteracija = kTOV4_KV02dalykKursaitrukmeValcommand + bp;
          var kTOV4_KV02dalykKursaidalyvisiteracija = kTOV4_KV02dalykKursaidalyviscommand + bp;
          var joinedkTOV4_KV02dalykKursaipavad = eval(kTOV4_KV02dalykKursaipavaditeracija);
          var joinedkTOV4_KV02dalykKursaipazymNr = eval(kTOV4_KV02dalykKursaipazymNriteracija);
          var joinedkTOV4_KV02dalykKursaitrukmeVal = eval(kTOV4_KV02dalykKursaitrukmeValiteracija);
          var joinedkTOV4_KV02dalykKursaidalyvis = eval(kTOV4_KV02dalykKursaidalyvisiteracija);
          if (joinedkTOV4_KV02dalykKursaipavad != "" || joinedkTOV4_KV02dalykKursaipazymNr != "" || joinedkTOV4_KV02dalykKursaitrukmeVal != "" || joinedkTOV4_KV02dalykKursaidalyvis != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02dalykines_komp.kursai.push({
              pavadinimas: joinedkTOV4_KV02dalykKursaipavad,
              pazymNr: joinedkTOV4_KV02dalykKursaipazymNr,
              trukmeVal: joinedkTOV4_KV02dalykKursaitrukmeVal,
              dalyvis: joinedkTOV4_KV02dalykKursaidalyvis
            })
          }
        }
        //kTOV4_KV02didaktines_komp
        for (let bq = 1; bq <= parseInt(req.body.number34); bq++) {
          var kTOV4_KV02didakStazuotespavaditeracija = kTOV4_KV02didakStazuotespavadcommand + bq;
          var kTOV4_KV02didakStazuotespazymNriteracija = kTOV4_KV02didakStazuotespazymNrcommand + bq;
          var kTOV4_KV02didakStazuotestrukmeValiteracija = kTOV4_KV02didakStazuotestrukmeValcommand + bq;
          var kTOV4_KV02didakStazuotesdalyvisiteracija = kTOV4_KV02didakStazuotesdalyviscommand + bq;
          var joinedkTOV4_KV02didakStazuotespavad = eval(kTOV4_KV02didakStazuotespavaditeracija);
          var joinedkTOV4_KV02didakStazuotespazymNr = eval(kTOV4_KV02didakStazuotespazymNriteracija);
          var joinedkTOV4_KV02didakStazuotestrukmeVal = eval(kTOV4_KV02didakStazuotestrukmeValiteracija);
          var joinedkTOV4_KV02didakStazuotesdalyvis = eval(kTOV4_KV02didakStazuotesdalyvisiteracija);
          if (joinedkTOV4_KV02didakStazuotespavad != "" || joinedkTOV4_KV02didakStazuotespazymNr != "" || joinedkTOV4_KV02didakStazuotestrukmeVal != "" || joinedkTOV4_KV02didakStazuotesdalyvis != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02didaktines_komp.stazuotes.push({
              pavadinimas: joinedkTOV4_KV02didakStazuotespavad,
              pazymNr: joinedkTOV4_KV02didakStazuotespazymNr,
              trukmeVal: joinedkTOV4_KV02didakStazuotestrukmeVal,
              dalyvis: joinedkTOV4_KV02didakStazuotesdalyvis
            })
          }
        }
        for (let br = 1; br <= parseInt(req.body.number36); br++) {
          var kTOV4_KV02didakSeminaraipavaditeracija = kTOV4_KV02didakSeminaraipavadcommand + br;
          var kTOV4_KV02didakSeminaraipazymNriteracija = kTOV4_KV02didakSeminaraipazymNrcommand + br;
          var kTOV4_KV02didakSeminaraitrukmeValiteracija = kTOV4_KV02didakSeminaraitrukmeValcommand + br;
          var kTOV4_KV02didakSeminaraidalyvisiteracija = kTOV4_KV02didakSeminaraidalyviscommand + br;
          var joinedkTOV4_KV02didakSeminaraipavad = eval(kTOV4_KV02didakSeminaraipavaditeracija);
          var joinedkTOV4_KV02didakSeminaraipazymNr = eval(kTOV4_KV02didakSeminaraipazymNriteracija);
          var joinedkTOV4_KV02didakSeminaraitrukmeVal = eval(kTOV4_KV02didakSeminaraitrukmeValiteracija);
          var joinedkTOV4_KV02didakSeminaraidalyvis = eval(kTOV4_KV02didakSeminaraidalyvisiteracija);
          if (joinedkTOV4_KV02didakSeminaraipavad != "" || joinedkTOV4_KV02didakSeminaraipazymNr != "" || joinedkTOV4_KV02didakSeminaraitrukmeVal != "" || joinedkTOV4_KV02didakSeminaraidalyvis != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02didaktines_komp.seminarai.push({
              pavadinimas: joinedkTOV4_KV02didakSeminaraipavad,
              pazymNr: joinedkTOV4_KV02didakSeminaraipazymNr,
              trukmeVal: joinedkTOV4_KV02didakSeminaraitrukmeVal,
              dalyvis: joinedkTOV4_KV02didakSeminaraidalyvis
            })
          }
        }
        for (let bs = 1; bs <= parseInt(req.body.number38); bs++) {
          var kTOV4_KV02didakKonfpavaditeracija = kTOV4_KV02didakKonfpavadcommand + bs;
          var kTOV4_KV02didakKonfpazymNriteracija = kTOV4_KV02didakKonfpazymNrcommand + bs;
          var kTOV4_KV02didakKonftrukmeValiteracija = kTOV4_KV02didakKonftrukmeValcommand + bs;
          var kTOV4_KV02didakKonfdalyvisiteracija = kTOV4_KV02didakKonfdalyviscommand + bs;
          var joinedkTOV4_KV02didakKonfpavad = eval(kTOV4_KV02didakKonfpavaditeracija);
          var joinedkTOV4_KV02didakKonfpazymNr = eval(kTOV4_KV02didakKonfpazymNriteracija);
          var joinedkTOV4_KV02didakKonftrukmeVal = eval(kTOV4_KV02didakKonftrukmeValiteracija);
          var joinedkTOV4_KV02didakKonfdalyvis = eval(kTOV4_KV02didakKonfdalyvisiteracija);
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02didaktines_komp.konferencijos.push({
            pavadinimas: joinedkTOV4_KV02didakKonfpavad,
            pazymNr: joinedkTOV4_KV02didakKonfpazymNr,
            trukmeVal: joinedkTOV4_KV02didakKonftrukmeVal,
            dalyvis: joinedkTOV4_KV02didakKonfdalyvis
          })
        }
        for (let bt = 1; bt <= parseInt(req.body.number40); bt++) {
          var kTOV4_KV02didakKursaipavaditeracija = kTOV4_KV02didakKursaipavadcommand + bt;
          var kTOV4_KV02didakKursaipazymNriteracija = kTOV4_KV02didakKursaipazymNrcommand + bt;
          var kTOV4_KV02didakKursaitrukmeValiteracija = kTOV4_KV02didakKursaitrukmeValcommand + bt;
          var kTOV4_KV02didakKursaidalyvisiteracija = kTOV4_KV02didakKursaidalyviscommand + bt;
          var joinedkTOV4_KV02didakKursaipavad = eval(kTOV4_KV02didakKursaipavaditeracija);
          var joinedkTOV4_KV02didakKursaipazymNr = eval(kTOV4_KV02didakKursaipazymNriteracija);
          var joinedkTOV4_KV02didakKursaitrukmeVal = eval(kTOV4_KV02didakKursaitrukmeValiteracija);
          var joinedkTOV4_KV02didakKursaidalyvis = eval(kTOV4_KV02didakKursaidalyvisiteracija);
          if (joinedkTOV4_KV02didakKursaipavad != "" || joinedkTOV4_KV02didakKursaipazymNr != "" || joinedkTOV4_KV02didakKursaitrukmeVal != "" || joinedkTOV4_KV02didakKursaidalyvis != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02didaktines_komp.kursai.push({
              pavadinimas: joinedkTOV4_KV02didakKursaipavad,
              pazymNr: joinedkTOV4_KV02didakKursaipazymNr,
              trukmeVal: joinedkTOV4_KV02didakKursaitrukmeVal,
              dalyvis: joinedkTOV4_KV02didakKursaidalyvis
            })
          }
        }
        //kTOV4_KV02bendrosios_komp
        for (let bu = 1; bu <= parseInt(req.body.number42); bu++) {
          var kTOV4_KV02bendrStazuotespavaditeracija = kTOV4_KV02bendrStazuotespavadcommand + bu;
          var kTOV4_KV02bendrStazuotespazymNriteracija = kTOV4_KV02bendrStazuotespazymNrcommand + bu;
          var kTOV4_KV02bendrStazuotestrukmeValiteracija = kTOV4_KV02bendrStazuotestrukmeValcommand + bu;
          var kTOV4_KV02bendrStazuotesdalyvisiteracija = kTOV4_KV02bendrStazuotesdalyviscommand + bu;
          var joinedkTOV4_KV02bendrStazuotespavad = eval(kTOV4_KV02bendrStazuotespavaditeracija);
          var joinedkTOV4_KV02bendrStazuotespazymNr = eval(kTOV4_KV02bendrStazuotespazymNriteracija);
          var joinedkTOV4_KV02bendrStazuotestrukmeVal = eval(kTOV4_KV02bendrStazuotestrukmeValiteracija);
          var joinedkTOV4_KV02bendrStazuotesdalyvis = eval(kTOV4_KV02bendrStazuotesdalyvisiteracija);
          if (joinedkTOV4_KV02bendrStazuotespavad != "" || joinedkTOV4_KV02bendrStazuotespazymNr != "" || joinedkTOV4_KV02bendrStazuotestrukmeVal != "" || joinedkTOV4_KV02bendrStazuotesdalyvis != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02bendrosios_komp.stazuotes.push({
              pavadinimas: joinedkTOV4_KV02bendrStazuotespavad,
              pazymNr: joinedkTOV4_KV02bendrStazuotespazymNr,
              trukmeVal: joinedkTOV4_KV02bendrStazuotestrukmeVal,
              dalyvis: joinedkTOV4_KV02bendrStazuotesdalyvis
            })
          }
        }
        for (let bv = 1; bv <= parseInt(req.body.number44); bv++) {
          var kTOV4_KV02bendrSeminaraipavaditeracija = kTOV4_KV02bendrSeminaraipavadcommand + bv;
          var kTOV4_KV02bendrSeminaraipazymNriteracija = kTOV4_KV02bendrSeminaraipazymNrcommand + bv;
          var kTOV4_KV02bendrSeminaraitrukmeValiteracija = kTOV4_KV02bendrSeminaraitrukmeValcommand + bv;
          var kTOV4_KV02bendrSeminaraidalyvisiteracija = kTOV4_KV02bendrSeminaraidalyviscommand + bv;
          var joinedkTOV4_KV02bendrSeminaraipavad = eval(kTOV4_KV02bendrSeminaraipavaditeracija);
          var joinedkTOV4_KV02bendrSeminaraipazymNr = eval(kTOV4_KV02bendrSeminaraipazymNriteracija);
          var joinedkTOV4_KV02bendrSeminaraitrukmeVal = eval(kTOV4_KV02bendrSeminaraitrukmeValiteracija);
          var joinedkTOV4_KV02bendrSeminaraidalyvis = eval(kTOV4_KV02bendrSeminaraidalyvisiteracija);
          if (joinedkTOV4_KV02bendrSeminaraipavad != "" || joinedkTOV4_KV02bendrSeminaraipazymNr != "" || joinedkTOV4_KV02bendrSeminaraitrukmeVal != "" || joinedkTOV4_KV02bendrSeminaraidalyvis != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02bendrosios_komp.seminarai.push({
              pavadinimas: joinedkTOV4_KV02bendrSeminaraipavad,
              pazymNr: joinedkTOV4_KV02bendrSeminaraipazymNr,
              trukmeVal: joinedkTOV4_KV02bendrSeminaraitrukmeVal,
              dalyvis: joinedkTOV4_KV02bendrSeminaraidalyvis
            })
          }
        }
        for (let bw = 1; bw <= parseInt(req.body.number46); bw++) {
          var kTOV4_KV02bendrKonfpavaditeracija = kTOV4_KV02bendrKonfpavadcommand + bw;
          var kTOV4_KV02bendrKonfpazymNriteracija = kTOV4_KV02bendrKonfpazymNrcommand + bw;
          var kTOV4_KV02bendrKonftrukmeValiteracija = kTOV4_KV02bendrKonftrukmeValcommand + bw;
          var kTOV4_KV02bendrKonfdalyvisiteracija = kTOV4_KV02bendrKonfdalyviscommand + bw;
          var joinedkTOV4_KV02bendrKonfpavad = eval(kTOV4_KV02bendrKonfpavaditeracija);
          var joinedkTOV4_KV02bendrKonfpazymNr = eval(kTOV4_KV02bendrKonfpazymNriteracija);
          var joinedkTOV4_KV02bendrKonftrukmeVal = eval(kTOV4_KV02bendrKonftrukmeValiteracija);
          var joinedkTOV4_KV02bendrKonfdalyvis = eval(kTOV4_KV02bendrKonfdalyvisiteracija);
          if (joinedkTOV4_KV02bendrKonfpavad != "" || joinedkTOV4_KV02bendrKonfpazymNr != "" || joinedkTOV4_KV02bendrKonftrukmeVal != "" || joinedkTOV4_KV02bendrKonfdalyvis != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02bendrosios_komp.konferencijos.push({
              pavadinimas: joinedkTOV4_KV02bendrKonfpavad,
              pazymNr: joinedkTOV4_KV02bendrKonfpazymNr,
              trukmeVal: joinedkTOV4_KV02bendrKonftrukmeVal,
              dalyvis: joinedkTOV4_KV02bendrKonfdalyvis
            })
          }
        }
        for (let bx = 1; bx <= parseInt(req.body.number48); bx++) {
          var kTOV4_KV02bendrKursaipavaditeracija = kTOV4_KV02bendrKursaipavadcommand + bx;
          var kTOV4_KV02bendrKursaipazymNriteracija = kTOV4_KV02bendrKursaipazymNrcommand + bx;
          var kTOV4_KV02bendrKursaitrukmeValiteracija = kTOV4_KV02bendrKursaitrukmeValcommand + bx;
          var kTOV4_KV02bendrKursaidalyvisiteracija = kTOV4_KV02bendrKursaidalyviscommand + bx;
          var joinedkTOV4_KV02bendrKursaipavad = eval(kTOV4_KV02bendrKursaipavaditeracija);
          var joinedkTOV4_KV02bendrKursaipazymNr = eval(kTOV4_KV02bendrKursaipazymNriteracija);
          var joinedkTOV4_KV02bendrKursaitrukmeVal = eval(kTOV4_KV02bendrKursaitrukmeValiteracija);
          var joinedkTOV4_KV02bendrKursaidalyvis = eval(kTOV4_KV02bendrKursaidalyvisiteracija);
          if (joinedkTOV4_KV02bendrKursaipavad != "" || joinedkTOV4_KV02bendrKursaipazymNr != "" || joinedkTOV4_KV02bendrKursaitrukmeVal != "" || joinedkTOV4_KV02bendrKursaidalyvis != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02bendrosios_komp.kursai.push({
              pavadinimas: joinedkTOV4_KV02bendrKursaipavad,
              pazymNr: joinedkTOV4_KV02bendrKursaipazymNr,
              trukmeVal: joinedkTOV4_KV02bendrKursaitrukmeVal,
              dalyvis: joinedkTOV4_KV02bendrKursaidalyvis
            })
          }
        }
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.dalykinesLT.destytojuSk = req.body.dalykinesLTdestytojuSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.dalykinesLT.trukmeVal = req.body.dalykinesLTtrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.dalykinesLT.stazuotSk = req.body.dalykinesLTstazuotSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.dalykinesLT.seminarSk = req.body.dalykinesLTseminarSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.dalykinesLT.konferencSk = req.body.dalykinesLTkonferencSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.dalykinesLT.kursaiSk = req.body.dalykinesLTkursaiSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.didaktinesLT.destytojuSk = req.body.didaktinesLTdestytojuSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.didaktinesLT.trukmeVal = req.body.didaktinesLTtrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.didaktinesLT.stazuotSk = req.body.didaktinesLTstazuotSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.didaktinesLT.seminarSk = req.body.didaktinesLTseminarSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.didaktinesLT.konferencSk = req.body.didaktinesLTkonferencSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.didaktinesLT.kursaiSk = req.body.didaktinesLTkursaiSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.bendrosiosLT.destytojuSk = req.body.bendrosiosLTdestytojuSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.bendrosiosLT.trukmeVal = req.body.bendrosiosLTtrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.bendrosiosLT.stazuotSk = req.body.bendrosiosLTstazuotSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.bendrosiosLT.seminarSk = req.body.bendrosiosLTseminarSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.bendrosiosLT.konferencSk = req.body.bendrosiosLTkonferencSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.bendrosiosLT.kursaiSk = req.body.bendrosiosLTkursaiSk,

          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.dalykinesNeLt.destytojuSk = req.body.dalykinesNeLtdestytojuSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.dalykinesNeLt.trukmeVal = req.body.dalykinesNeLttrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.dalykinesNeLt.stazuotSk = req.body.dalykinesNeLtstazuotSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.dalykinesNeLt.seminarSk = req.body.dalykinesNeLtseminarSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.dalykinesNeLt.konferencSk = req.body.dalykinesNeLtkonferencSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.dalykinesNeLt.kursaiSk = req.body.dalykinesNeLtkursaiSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.didaktinesNeLt.destytojuSk = req.body.didaktinesNeLtdestytojuSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.didaktinesNeLt.trukmeVal = req.body.didaktinesNeLttrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.didaktinesNeLt.stazuotSk = req.body.didaktinesNeLtstazuotSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.didaktinesNeLt.seminarSk = req.body.didaktinesNeLtseminarSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.didaktinesNeLt.konferencSk = req.body.didaktinesNeLtkonferencSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.didaktinesNeLt.kursaiSk = req.body.didaktinesNeLtkursaiSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.bendrosiosNeLt.destytojuSk = req.body.bendrosiosNeLtdestytojuSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.bendrosiosNeLt.trukmeVal = req.body.bendrosiosNeLttrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.bendrosiosNeLt.stazuotSk = req.body.bendrosiosNeLtstazuotSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.bendrosiosNeLt.seminarSk = req.body.bendrosiosNeLtseminarSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.bendrosiosNeLt.kursuoseSk = req.body.bendrosiosNeLtkursaiSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.bendrosiosNeLt.konferencSk = req.body.bendrosiosNeLtkonferencSk




        for (let i = 1; i <= parseInt(req.body.yonder28); i++) {
          var kTOV4_KV03nrcommandi = kTOV4_KV03nrcommand + i;
          var kTOV4_KV03destytojascommandi = kTOV4_KV03destytojascommand + i;
          var kTOV4_KV03saliscommandi = kTOV4_KV03saliscommand + i;
          var kTOV4_KV03institucijacommandi = kTOV4_KV03institucijacommand + i;
          var kTOV4_KV03dalykascommandi = kTOV4_KV03dalykascommand + i;
          var joinedkTOV4_KV03nr = eval(kTOV4_KV03nrcommandi);
          var joinedkTOV4_KV03destytojas = eval(kTOV4_KV03destytojascommandi);
          var joinedkTOV4_KV03salis = eval(kTOV4_KV03saliscommandi);
          var joinedkTOV4_KV03institucija = eval(kTOV4_KV03institucijacommandi);
          var joinedkTOV4_KV03dalykas = eval(kTOV4_KV03dalykascommandi);
          if (joinedkTOV4_KV03destytojas != "" || joinedkTOV4_KV03salis != "" || joinedkTOV4_KV03institucija != "" || joinedkTOV4_KV03dalykas != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_KV03.push({
              nr: joinedkTOV4_KV03nr,
              destytojas: joinedkTOV4_KV03destytojas,
              salis: joinedkTOV4_KV03salis,
              institucija: joinedkTOV4_KV03institucija,
              dalykas: joinedkTOV4_KV03dalykas
            })
          }
        }
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV04.judrumoDinamika = req.body.kTOV4_KV04judrumoDinamika,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV05.poveikisVeiklai = req.body.kTOV4_KV05poveikisVeiklai

        for (let i = 1; i <= parseInt(req.body.yond56); i++) {
          var kTOV4_O01_1nri = kTOV4_O01_1nrcommand + i;
          var kTOV4_O01_1destytojasi = kTOV4_O01_1destytojascommand + i;
          var kTOV4_O01_1veiklPobudi = kTOV4_O01_1veiklPobudcommand + i;
          var kTOV4_O01_1isakNrDatai = kTOV4_O01_1isakNrDatacommand + i;
          var joinedkTOV4_O01_1nr = eval(kTOV4_O01_1nri);
          var joinedkTOV4_O01_1destytojas = eval(kTOV4_O01_1destytojasi);
          var joinedkTOV4_O01_1veiklPobud = eval(kTOV4_O01_1veiklPobudi);
          var joinedkTOV4_O01_1isakNrData = eval(kTOV4_O01_1isakNrDatai);
          if (joinedkTOV4_O01_1destytojas != "" || joinedkTOV4_O01_1veiklPobud != "" || joinedkTOV4_O01_1isakNrData != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_O01.kTOV4_O01_1.push({
              nr: joinedkTOV4_O01_1nr,
              destytojas: joinedkTOV4_O01_1destytojas,
              veiklPobud: joinedkTOV4_O01_1veiklPobud,
              isakNrData: joinedkTOV4_O01_1isakNrData
            })
          }
        }
        for (let i = 1; i <= parseInt(req.body.yond58); i++) {
          var kTOV4_O01_2nri = kTOV4_O01_2nrcommand + i;
          var kTOV4_O01_2destytojasi = kTOV4_O01_2destytojascommand + i;
          var kTOV4_O01_2veiklPobudi = kTOV4_O01_2veiklPobudcommand + i;
          var kTOV4_O01_2dataVietai = kTOV4_O01_2dataVietacommand + i;
          var kTOV4_O01_2dalyvSki = kTOV4_O01_2dalyvSkcommand + i;
          var kTOV4_O01_2ktKomentaraii = kTOV4_O01_2ktKomentaraicommand + i;
          var joinedkTOV4_O01_2nr = eval(kTOV4_O01_2nri);
          var joinedkTOV4_O01_2destytojas = eval(kTOV4_O01_2destytojasi);
          var joinedkTOV4_O01_2veiklPobud = eval(kTOV4_O01_2veiklPobudi);
          var joinedkTOV4_O01_2dataVieta = eval(kTOV4_O01_2dataVietai);
          var joinedkTOV4_O01_2dalyvSk = eval(kTOV4_O01_2dalyvSki);
          var joinedkTOV4_O01_2ktKomentarai = eval(kTOV4_O01_2ktKomentaraii);
          if (joinedkTOV4_O01_2destytojas != "" || joinedkTOV4_O01_2veiklPobud != "" || joinedkTOV4_O01_2dataVieta != "" || joinedkTOV4_O01_2dalyvSk != "" || joinedkTOV4_O01_2ktKomentarai != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_O01.kTOV4_O01_2.push({
              nr: joinedkTOV4_O01_2nr,
              destytojas: joinedkTOV4_O01_2destytojas,
              veiklPobud: joinedkTOV4_O01_2veiklPobud,
              dataVieta: joinedkTOV4_O01_2dataVieta,
              dalyvSk: joinedkTOV4_O01_2dalyvSk,
              ktKomentarai: joinedkTOV4_O01_2ktKomentarai
            })
          }
        }
        for (let i = 1; i <= parseInt(req.body.yonder18); i++) {
          var kTOV4_O02nri = kTOV4_O02nrcommand + i;
          var kTOV4_O02atstovasi = kTOV4_O02atstovascommand + i;
          var kTOV4_O02partneriaii = kTOV4_O02partneriaicommand + i;
          var kTOV4_O02formai = kTOV4_O02formacommand + i;
          var kTOV4_O02rezultataii = kTOV4_O02rezultataicommand + i;
          var kTOV4_O02sutartisi = kTOV4_O02sutartiscommand + i;
          var kTOV4_O02tipasi = kTOV4_O02tipascommand + i;
          var joinedkTOV4_O02nr = eval(kTOV4_O02nri);
          var joinedkTOV4_O02atstovas = eval(kTOV4_O02atstovasi);
          var joinedkTOV4_O02partneriai = eval(kTOV4_O02partneriaii);
          var joinedkTOV4_O02forma = eval(kTOV4_O02formai);
          var joinedkTOV4_O02rezultatai = eval(kTOV4_O02rezultataii);
          var joinedkTOV4_O02sutartis = eval(kTOV4_O02sutartisi);
          var joinedkTOV4_O02tipas = eval(kTOV4_O02tipasi);
          if (joinedkTOV4_O02atstovas != "" || joinedkTOV4_O02partneriai != "" || joinedkTOV4_O02forma != "" || joinedkTOV4_O02rezultatai != "" || joinedkTOV4_O02sutartis != "" || joinedkTOV4_O02tipas != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_O02.push({
              nr: joinedkTOV4_O02nr,
              atstovas: joinedkTOV4_O02atstovas,
              partneriai: joinedkTOV4_O02partneriai,
              forma: joinedkTOV4_O02forma,
              rezultatai: joinedkTOV4_O02rezultatai,
              sutartis: joinedkTOV4_O02sutartis,
              tipas: joinedkTOV4_O02tipas
            })
          }
        }
        for (let i = 1; i <= parseInt(req.body.yond60); i++) {
          var kTOV4_Snri = kTOV4_Snrcommand + i;
          var kTOV4_Sstiprybesi = kTOV4_Sstiprybescommand + i;
          var kTOV4_Stobulintinai = kTOV4_Stobulintinacommand + i;
          var joinedkTOV4_Snr = eval(kTOV4_Snri);
          var joinedkTOV4_Sstiprybes = eval(kTOV4_Sstiprybesi);
          var joinedkTOV4_Stobulintina = eval(kTOV4_Stobulintinai);
          if (joinedkTOV4_Sstiprybes != "" || joinedkTOV4_Stobulintina != "") {
            foundUser.katedrosVedejas.kTOV4.kTOV4_S.push({
              nr: joinedkTOV4_Snr,
              stiprybes: joinedkTOV4_Sstiprybes,
              tobulintina: joinedkTOV4_Stobulintina
            })
          }
        }
        for (let i = 1; i <= parseInt(req.body.yond62); i++) {
          var kV5_KT01nri = kV5_KT01nrcommand + i;
          var kV5_KT01diplomantasi = kV5_KT01diplomantascommand + i;
          var kV5_KT01studProgri = kV5_KT01studProgrcommand + i;
          var kV5_KT01darboTemai = kV5_KT01darboTemacommand + i;
          var kV5_KT01uzsakovasi = kV5_KT01uzsakovascommand + i;
          var joinedkV5_KT01nr = eval(kV5_KT01nri);
          var joinedkV5_KT01diplomantas = eval(kV5_KT01diplomantasi);
          var joinedkV5_KT01studProgr = eval(kV5_KT01studProgri);
          var joinedkV5_KT01darboTema = eval(kV5_KT01darboTemai);
          var joinedkV5_KT01uzsakovas = eval(kV5_KT01uzsakovasi);
          if (joinedkV5_KT01diplomantas != "" || joinedkV5_KT01studProgr != "" || joinedkV5_KT01darboTema != "" || joinedkV5_KT01uzsakovas != "") {
            foundUser.katedrosVedejas.kV5.kV5_KT01.push({
              nr: joinedkV5_KT01nr,
              diplomantas: joinedkV5_KT01diplomantas,
              studProgr: joinedkV5_KT01studProgr,
              darboTema: joinedkV5_KT01darboTema,
              uzsakovas: joinedkV5_KT01uzsakovas
            })
          }
        }
        for (let i = 1; i <= parseInt(req.body.yond64); i++) {
          var kV5_KT02nri = kV5_KT02nrcommand + i;
          var kV5_KT02diplomantasi = kV5_KT02diplomantascommand + i;
          var kV5_KT02studProgri = kV5_KT02studProgrcommand + i;
          var kV5_KT02darboTemai = kV5_KT02darboTemacommand + i;
          var joinedkV5_KT02nr = eval(kV5_KT02nri);
          var joinedkV5_KT02diplomantas = eval(kV5_KT02diplomantasi);
          var joinedkV5_KT02studProgr = eval(kV5_KT02studProgri);
          var joinedkV5_KT02darboTema = eval(kV5_KT02darboTemai);
          if (joinedkV5_KT02diplomantas != "" || joinedkV5_KT02studProgr != "" || joinedkV5_KT02darboTema != "") {
            foundUser.katedrosVedejas.kV5.kV5_KT02.push({
              nr: joinedkV5_KT02nr,
              diplomantas: joinedkV5_KT02diplomantas,
              studProgr: joinedkV5_KT02studProgr,
              darboTema: joinedkV5_KT02darboTema
            })
          }
        }
        for (let i = 1; i <= parseInt(req.body.yonder22); i++) {
          var kV5_KT03nri = kV5_KT03nrcommand + i;
          var kV5_KT03studProgri = kV5_KT03studProgrcommand + i;
          var kV5_KT03baigSki = kV5_KT03baigSkcommand + i;
          var kV5_KT03iregUzimtumSki = kV5_KT03iregUzimtumSkcommand + i;
          var kV5_KT03isidarbinProci = kV5_KT03isidarbinProccommand + i;
          var joinedkV5_KT03nr = eval(kV5_KT03nri);
          var joinedkV5_KT03studProgr = eval(kV5_KT03studProgri);
          var joinedkV5_KT03baigSk = eval(kV5_KT03baigSki);
          var joinedkV5_KT03iregUzimtumSk = eval(kV5_KT03iregUzimtumSki);
          var joinedkV5_KT03isidarbinProc = eval(kV5_KT03isidarbinProci);
          if (joinedkV5_KT03studProgr != "" || joinedkV5_KT03baigSk != "" || joinedkV5_KT03iregUzimtumSk != "" || joinedkV5_KT03isidarbinProc != "") {
            foundUser.katedrosVedejas.kV5.kV5_KT03.kV5_KT03_array.push({
              nr: joinedkV5_KT03nr,
              studProgr: joinedkV5_KT03studProgr,
              baigSk: joinedkV5_KT03baigSk,
              iregUzimtumSk: joinedkV5_KT03iregUzimtumSk,
              isidarbinProc: joinedkV5_KT03isidarbinProc
            })
          }
        }
        for (let i = 1; i <= parseInt(req.body.yonder24); i++) {
          var kV5_KT04nri = kV5_KT04nrcommand + i;
          var kV5_KT04autoriusi = kV5_KT04autoriuscommand + i;
          var kV5_KT04veiklTipasi = kV5_KT04veiklTipascommand + i;
          var kV5_KT04pavadinimasi = kV5_KT04pavadinimascommand + i;
          var kV5_KT04sutartNri = kV5_KT04sutartNrcommand + i;
          var kV5_KT04uzsakovasi = kV5_KT04uzsakovascommand + i;
          var kV5_KT04uzsakSumai = kV5_KT04uzsakSumacommand + i;
          var joinedkV5_KT04nr = eval(kV5_KT04nri);
          var joinedkV5_KT04autorius = eval(kV5_KT04autoriusi);
          var joinedkV5_KT04veiklTipas = eval(kV5_KT04veiklTipasi);
          var joinedkV5_KT04pavadinimas = eval(kV5_KT04pavadinimasi);
          var joinedkV5_KT04sutartNr = eval(kV5_KT04sutartNri);
          var joinedkV5_KT04uzsakovas = eval(kV5_KT04uzsakovasi);
          var joinedkV5_KT04uzsakSuma = eval(kV5_KT04uzsakSumai);
          if (joinedkV5_KT04autorius != "" || joinedkV5_KT04veiklTipas != "" || joinedkV5_KT04pavadinimas != "" || joinedkV5_KT04sutartNr != "" || joinedkV5_KT04uzsakovas != "" || joinedkV5_KT04uzsakSuma != "") {
            foundUser.katedrosVedejas.kV5.kV5_KT04.push({
              nr: joinedkV5_KT04nr,
              autorius: joinedkV5_KT04autorius,
              veiklTipas: joinedkV5_KT04veiklTipas,
              pavadinimas: joinedkV5_KT04pavadinimas,
              sutartNr: joinedkV5_KT04sutartNr,
              uzsakovas: joinedkV5_KT04uzsakovas,
              uzsakSuma: joinedkV5_KT04uzsakSuma
            })
          }
        }
        for (let i = 1; i <= parseInt(req.body.yonder26); i++) {
          var veiklSavinalizenri = veiklSavinalizenrcommand + i;
          var veiklSavinalizestiprybesi = veiklSavinalizestiprybescommand + i;
          var veiklSavinalizetobulintinai = veiklSavinalizetobulintinacommand + i;
          var joinedveiklSavinalizenr = eval(veiklSavinalizenri);
          var joinedveiklSavinalizestiprybes = eval(veiklSavinalizestiprybesi);
          var joinedveiklSavinalizetobulintina = eval(veiklSavinalizetobulintinai);
          if (joinedveiklSavinalizestiprybes != "" || joinedveiklSavinalizetobulintina != "") {
            foundUser.katedrosVedejas.kV5.veiklSavinalize.veiklSavinaliz_array.push({
              nr: joinedveiklSavinalizenr,
              stiprybes: joinedveiklSavinalizestiprybes,
              tobulintina: joinedveiklSavinalizetobulintina
            })
          }
        }
        foundUser.katedrosVedejas.kV5.kV5_KT05.bendradarbiavSklaid = req.body.kV5_KT05bendradarbiavSklaid,
          foundUser.katedrosVedejas.kV5.kV5_KT05.praktVeiklSklaid = req.body.kV5_KT05praktVeiklSklaid,
          foundUser.katedrosVedejas.kV5.kV5_KT05.dalyvavSklaid = req.body.kV5_KT05dalyvavSklaid,
          foundUser.katedrosVedejas.kV5.kV5_KT06.moklsPopSklaid = req.body.kV5_KT06moklsPopSklaid,
          foundUser.katedrosVedejas.kV5.kV5_KT06.tyrimuSklaid = req.body.kV5_KT06tyrimuSklaid,
          foundUser.katedrosVedejas.kV5.kV5_KT06.modernKultSklaid = req.body.kV5_KT06modernKultSklaid,
          foundUser.katedrosVedejas.kV5.kV5_KT06.bendrLavinSklaid = req.body.kV5_KT06bendrLavinSklaid,
          foundUser.katedrosVedejas.kV5.kV5_KT06.socAtskirtSklaid = req.body.kV5_KT06socAtskirtSklaid,
          foundUser.katedrosVedejas.kV5.kV5_KT06.aplinkApsaugSklaid = req.body.kV5_KT06aplinkApsaugSklaid,
          foundUser.katedrosVedejas.kV5.kV5_KT07.kompUgdymas = req.body.kV5_KT07kompUgdymas,
          foundUser.katedrosVedejas.kV5.kV5_KT08.rezFormulavimas = req.body.kV5_KT08rezFormulavimas,
          foundUser.katedrosVedejas.kV5.kV5_KT09.darnVystItrauk = req.body.kV5_KT09darnVystItrauk,
          foundUser.katedrosVedejas.kV5.veiklSavinalize.isvadosApieVeikl = req.body.isvadosApieVeikl,
          foundUser.katedrosVedejas.kV5.kV5_KT03.isVisoBaigSk = req.body.kV5_KT03isVisoBaigSk,
          foundUser.katedrosVedejas.kV5.kV5_KT03.isVisoIregUzimt = req.body.kV5_KT03isVisoIregUzimt,
          foundUser.katedrosVedejas.kV5.kV5_KT03.isVisoIsidarbProc = req.body.kV5_KT03isVisoIsidarbProc,
          foundUser.busenaVedejo = req.body.ataskaitos_busena,
          foundUser.updated_for = req.user.id
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
          if (foundUser.rolesKeitimas === true) {
            foundUser.role = req.body.role
            //console.log(foundUser.role);
          }
          foundUser.updated_for = req.user.id,
            foundUser.vardas = req.body.vardas,
            foundUser.pavarde = req.body.pavarde,
            foundUser.katedra = req.body.katedra,
            foundUser.fakultetas = req.body.fakultetas,
            foundUser.destytojas.issilavinimas = req.body.issilavinimas,
            foundUser.destytojas.darbovietesTipas = req.body.darbovietesTipas,
            foundUser.destytojas.pareigos = req.body.pareigos,
            foundUser.destytojas.pedagogStazas = req.body.pedagogStazas,
            foundUser.destytojas.praktVeiklStazas = req.body.praktVeiklStazas,
            foundUser.updated_for = req.user.id

          foundUser.save(function(err) {
            if (!err) {
              console.log("Dėstytojas info succesfully updated ");
              if (foundUser.role === "dėstytojas") {
                //console.log("dest");
                res.redirect("/user-window");
              } else if (foundUser.role === "katedros vedėjas") {
                //console.log("vedej");
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
          foundUser.updated_for = req.user.id,
            foundUser.vardas = req.body.vardas,
            foundUser.pavarde = req.body.pavarde,
            foundUser.katedra = req.body.katedra,
            foundUser.fakultetas = req.body.fakultetas,
            foundUser.updated_for = req.user.id

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

app.post("/update-user-info-dep", (req, res) => {

  User.findById(req.body.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.busena = req.body.busena,
          foundUser.updated_for = req.user._id

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

app.post("/update-report-lecturer-dep", (req, res) => {
  User.findById(req.body.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        if (req.body.ataskaitos_busena == "užrakinta") { //kiekvienam atskirai reikia updated_for aprašyti
          var nrcommand = "req.body.nr";
          var dalykascommand = "req.body.dalykas";
          var grupecommand = "req.body.grupe";
          var semestrascommand = "req.body.semestras";
          var planuotosValcommand = "req.body.planuotosVal";
          var atliktosValcommand = "req.body.atliktosVal";
          var nD2_P01nrcommand = "req.body.nD2_P01nr";
          var nD2_P01veiklPavadcommand = "req.body.nD2_P01veiklPavad";
          var nD2_P01veiklRezultcommand = "req.body.nD2_P01veiklRezult";
          var nD2_M01nrcommand = "req.body.nD2_M01nr";
          var nD2_M01veiklPavadcommand = "req.body.nD2_M01veiklPavad";
          var nD2_M01veiklRezultcommand = "req.body.nD2_M01veiklRezult";
          var nD2_M02nrcommand = "req.body.nD2_M02nr";
          var bibliografAprcommand = "req.body.bibliografApr";
          var tipascommand = "req.body.tipas";
          var mokslSritcommand = "req.body.mokslSrit";
          var mokslKryptcommand = "req.body.mokslKrypt";
          var katedracommand = "req.body.katedra";
          var nD2_M03nrcommand = "req.body.nD2_M03nr";
          var nD2_M03studProgrcommand = "req.body.nD2_M03studProgr";
          var nD2_M03dalykPavadcommand = "req.body.nD2_M03dalykPavad";
          var nD2_M03apimtisKreditcommand = "req.body.nD2_M03apimtisKredit";
          var nD2_M04nrcommand = "req.body.nD2_M04nr";
          var nD2_M04studProgrcommand = "req.body.nD2_M04studProgr";
          var nD2_M04dalykPavadcommand = "req.body.nD2_M04dalykPavad";
          var nD2_M04busenacommand = "req.body.nD2_M04busena";
          var nD2_M04apimtisKreditcommand = "req.body.nD2_M04apimtisKredit";
          var nD2_D01nrcommand = "req.body.nD2_D01nr";
          var nD2_D01komitetascommand = "req.body.nD2_D01komitetas";
          var nD2_D01veiklacommand = "req.body.nD2_D01veikla";
          var nD2_D01rezultataicommand = "req.body.nD2_D01rezultatai";
          var nD2_D02nrcommand = "req.body.nD2_D02nr";
          var nD2_D02studKryptcommand = "req.body.nD2_D02studKrypt";
          var nD2_D02veiklacommand = "req.body.nD2_D02veikla";
          var nD2_D02rezultataicommand = "req.body.nD2_D02rezultatai";
          var nD2_D03nrcommand = "req.body.nD2_D03nr";
          var nD2_D03studProgrcommand = "req.body.nD2_D03studProgr";
          var nD2_D03veiklacommand = "req.body.nD2_D03veikla";
          var nD2_D03rezultataicommand = "req.body.nD2_D03rezultatai";
          var nD2_S01nrcommand = "req.body.nD2_S01nr";
          var nD2_S01veiklacommand = "req.body.nD2_S01veikla";
          var nD2_S01dataVietacommand = "req.body.nD2_S01dataVieta";
          var nD2_Snrcommand = "req.body.nD2_Snr";
          var nD2_Sstiprybescommand = "req.body.nD2_Sstiprybes";
          var nD2_Stobulintinacommand = "req.body.nD2_Stobulintina";
          var tMTEP3_T01nrcommand = "req.body.tMTEP3_T01nr";
          var tyrTematcommand = "req.body.tyrTemat";
          var tyrGrupcommand = "req.body.tyrGrup";
          var tMTEP3_T01mokslSritcommand = "req.body.tMTEP3_T01mokslSrit";
          var tMTEP3_T01mokslKryptcommand = "req.body.tMTEP3_T01mokslKrypt";
          var tMTEP3_T02nrcommand = "req.body.tMTEP3_T02nr";
          var tMTEP3_T02bibliografAprcommand = "req.body.tMTEP3_T02bibliografApr";
          var tMTEP3_T02tipascommand = "req.body.tMTEP3_T02tipas";
          var tMTEP3_T02mokslSritcommand = "req.body.tMTEP3_T02mokslSrit";
          var tMTEP3_T02mokslKryptcommand = "req.body.tMTEP3_T02mokslKrypt";
          var tMTEP3_T02duomBazecommand = "req.body.tMTEP3_T02duomBaze";
          var tMTEP3_T03nrcommand = "req.body.tMTEP3_T03nr";
          var tMTEP3_T03pilnasBiblAprcommand = "req.body.tMTEP3_T03pilnasBiblApr";
          var tMTEP3_T04nrcommand = "req.body.tMTEP3_T04nr";
          var tMTEP3_T04uzsakovascommand = "req.body.tMTEP3_T04uzsakovas";
          var tMTEP3_T04temacommand = "req.body.tMTEP3_T04tema";
          var tMTEP3_T04datacommand = "req.body.tMTEP3_T04data";
          var tMTEP3_T05nrcommand = "req.body.tMTEP3_T05nr";
          var tMTEP3_T05veiklPavadcommand = "req.body.tMTEP3_T05veiklPavad";
          var tMTEP3_T05veiklRezultcommand = "req.body.tMTEP3_T05veiklRezult";
          var tMTEP3_T06nrcommand = "req.body.tMTEP3_T06nr";
          var tMTEP3_T06autoriuscommand = "req.body.tMTEP3_T06autorius";
          var tMTEP3_T06menoSritcommand = "req.body.tMTEP3_T06menoSrit";
          var tMTEP3_T06pobudiscommand = "req.body.tMTEP3_T06pobudis";
          var tMTEP3_T06realizVietacommand = "req.body.tMTEP3_T06realizVieta";
          var tMTEP3_T06datacommand = "req.body.tMTEP3_T06data";
          var tMTEP3_T07nrcommand = "req.body.tMTEP3_T07nr";
          var tMTEP3_T07atlikejascommand = "req.body.tMTEP3_T07atlikejas";
          var tMTEP3_T07menoSritcommand = "req.body.tMTEP3_T07menoSrit";
          var tMTEP3_T07pavadinimascommand = "req.body.tMTEP3_T07pavadinimas";
          var tMTEP3_T07atlikVietacommand = "req.body.tMTEP3_T07atlikVieta";
          var tMTEP3_T07datacommand = "req.body.tMTEP3_T07data";
          var tMTEP3_T08Snrcommand = "req.body.tMTEP3_T08Snr";
          var tMTEP3_T08atlikejascommand = "req.body.tMTEP3_T08atlikejas";
          var tMTEP3_T08menoSritcommand = "req.body.tMTEP3_T08menoSrit";
          var tMTEP3_T08pavadinimascommand = "req.body.tMTEP3_T08pavadinimas";
          var tMTEP3_T08atlikVietacommand = "req.body.tMTEP3_T08atlikVieta";
          var tMTEP3_T08datacommand = "req.body.tMTEP3_T08data";
          var tMTEP3_T09nrcommand = "req.body.tMTEP3_T09nr";
          var tMTEP3_T09atlikejascommand = "req.body.tMTEP3_T09atlikejas";
          var tMTEP3_T09menoSritcommand = "req.body.tMTEP3_T09menoSrit";
          var tMTEP3_T09pavadinimascommand = "req.body.tMTEP3_T09pavadinimas";
          var tMTEP3_T09atlikVietacommand = "req.body.tMTEP3_T09atlikVieta";
          var tMTEP3_T09datacommand = "req.body.tMTEP3_T09data";
          var tMTEP3_T10nrcommand = "req.body.tMTEP3_T10nr";
          var tMTEP3_T10veiklPobudcommand = "req.body.tMTEP3_T10veiklPobud";
          var tMTEP3_T10veiklTikslcommand = "req.body.tMTEP3_T10veiklTiksl";
          var tMTEP3_T10dataVietacommand = "req.body.tMTEP3_T10dataVieta";
          var tMTEP3_T10dalyvSkcommand = "req.body.tMTEP3_T10dalyvSk";
          var tMTEP3_T10ktKomentaraicommand = "req.body.tMTEP3_T10ktKomentarai";
          var tMTEP3_T11nrcommand = "req.body.tMTEP3_T11nr";
          var tMTEP3_T11veiklPobudcommand = "req.body.tMTEP3_T11veiklPobud";
          var tMTEP3_T11veiklTikslcommand = "req.body.tMTEP3_T11veiklTiksl";
          var tMTEP3_T11dataVietacommand = "req.body.tMTEP3_T11dataVieta";
          var tMTEP3_T11dalyvSkcommand = "req.body.tMTEP3_T11dalyvSk";
          var tMTEP3_T11ktKomentaraicommand = "req.body.tMTEP3_T11ktKomentarai";
          var tMTEP3_T12nrcommand = "req.body.tMTEP3_T12nr";
          var tMTEP3_T12veiklPobudcommand = "req.body.tMTEP3_T12veiklPobud";
          var tMTEP3_T12dataVietacommand = "req.body.tMTEP3_T12dataVieta";
          var tMTEP3_T13nrcommand = "req.body.tMTEP3_T13nr";
          var tMTEP3_T13studDuomcommand = "req.body.tMTEP3_T13studDuom";
          var tMTEP3_T13renginioPavadcommand = "req.body.tMTEP3_T13renginioPavad";
          var tMTEP3_T13rezultatascommand = "req.body.tMTEP3_T13rezultatas";
          var tMTEP3_T13datacommand = "req.body.tMTEP3_T13data";
          var tMTEP3_T14nrcommand = "req.body.tMTEP3_T14nr";
          var tMTEP3_T14renginyscommand = "req.body.tMTEP3_T14renginys";
          var tMTEP3_T14veiklPobudcommand = "req.body.tMTEP3_T14veiklPobud";
          var tMTEP3_T14dataVietacommand = "req.body.tMTEP3_T14dataVieta";
          var tMTEP3_Snrcommand = "req.body.tMTEP3_Snr";
          var tMTEP3_Sstiprybescommand = "req.body.tMTEP3_Sstiprybes";
          var tMTEP3_Stobulintinacommand = "req.body.tMTEP3_Stobulintina";
          var kTOV4_KV03nrcommand = "req.body.kTOV4_KV03nr";
          var kTOV4_KV03saliscommand = "req.body.kTOV4_KV03salis";
          var kTOV4_KV03institucijacommand = "req.body.kTOV4_KV03institucija";
          var kTOV4_KV03dalykascommand = "req.body.kTOV4_KV03dalykas";
          var kTOV4_O01_1nrcommand = "req.body.kTOV4_O01_1nr";
          var kTOV4_O01_1veiklPobudcommand = "req.body.kTOV4_O01_1veiklPobud";
          var kTOV4_O01_1isakNrDatacommand = "req.body.kTOV4_O01_1isakNrData";
          var kTOV4_O01_2nrcommand = "req.body.kTOV4_O01_2nr";
          var kTOV4_O01_2veiklPobudcommand = "req.body.kTOV4_O01_2veiklPobud";
          var kTOV4_O01_2dataVietacommand = "req.body.kTOV4_O01_2dataVieta";
          var kTOV4_O01_2dalyvSkcommand = "req.body.kTOV4_O01_2dalyvSk";
          var kTOV4_O01_2ktKomentaraicommand = "req.body.kTOV4_O01_2ktKomentarai";
          var kTOV4_Snrcommand = "req.body.kTOV4_Snr";
          var kTOV4_Sstiprybescommand = "req.body.kTOV4_Sstiprybes";
          var kTOV4_Stobulintinacommand = "req.body.kTOV4_Stobulintina";
          var kV5_KT01nrcommand = "req.body.kV5_KT01nr";
          var kV5_KT01diplomantascommand = "req.body.kV5_KT01diplomantas";
          var kV5_KT01studProgrcommand = "req.body.kV5_KT01studProgr";
          var kV5_KT01darboTemacommand = "req.body.kV5_KT01darboTema";
          var kV5_KT01uzsakovascommand = "req.body.kV5_KT01uzsakovas";
          var kV5_KT02nrcommand = "req.body.kV5_KT02nr";
          var kV5_KT02diplomantascommand = "req.body.kV5_KT02diplomantas";
          var kV5_KT02studProgrcommand = "req.body.kV5_KT02studProgr";
          var kV5_KT02darboTemacommand = "req.body.kV5_KT02darboTema";
          var kTOV4_KV01dalykStazuotespavadcommand = "req.body.kTOV4_KV01dalykStazuotespavad";
          var kTOV4_KV01dalykStazuotespavadcommand = "req.body.kTOV4_KV01dalykStazuotespavad";
          var kTOV4_KV01dalykStazuotespazymNrcommand = "req.body.kTOV4_KV01dalykStazuotespazymNr";
          var kTOV4_KV01dalykStazuotestrukmeValcommand = "req.body.kTOV4_KV01dalykStazuotestrukmeVal";
          var kTOV4_KV01dalykSeminaraipavadcommand = "req.body.kTOV4_KV01dalykSeminaraipavad";
          var kTOV4_KV01dalykSeminaraipazymNrcommand = "req.body.kTOV4_KV01dalykSeminaraipazymNr";
          var kTOV4_KV01dalykSeminaraitrukmeValcommand = "req.body.kTOV4_KV01dalykSeminaraitrukmeVal";
          var kTOV4_KV01dalykKonfpavadcommand = "req.body.kTOV4_KV01dalykKonfpavad";
          var kTOV4_KV01dalykKonfpazymNrcommand = "req.body.kTOV4_KV01dalykKonfpazymNr";
          var kTOV4_KV01dalykKonftrukmeValcommand = "req.body.kTOV4_KV01dalykKonftrukmeVal";
          var kTOV4_KV01dalykKursaipavadcommand = "req.body.kTOV4_KV01dalykKursaipavad";
          var kTOV4_KV01dalykKursaipazymNrcommand = "req.body.kTOV4_KV01dalykKursaipazymNr";
          var kTOV4_KV01dalykKursaitrukmeValcommand = "req.body.kTOV4_KV01dalykKursaitrukmeVal";
          var kTOV4_KV01didakStazuotespavadcommand = "req.body.kTOV4_KV01didakStazuotespavad";
          var kTOV4_KV01didakStazuotespazymNrcommand = "req.body.kTOV4_KV01didakStazuotespazymNr";
          var kTOV4_KV01didakStazuotestrukmeValcommand = "req.body.kTOV4_KV01didakStazuotestrukmeVal";
          var kTOV4_KV01didakSeminaraipavadcommand = "req.body.kTOV4_KV01didakSeminaraipavad";
          var kTOV4_KV01didakSeminaraipazymNrcommand = "req.body.kTOV4_KV01didakSeminaraipazymNr";
          var kTOV4_KV01didakSeminaraitrukmeValcommand = "req.body.kTOV4_KV01didakSeminaraitrukmeVal";
          var kTOV4_KV01didakKonfpavadcommand = "req.body.kTOV4_KV01didakKonfpavad";
          var kTOV4_KV01didakKonfpazymNrcommand = "req.body.kTOV4_KV01didakKonfpazymNr";
          var kTOV4_KV01didakKonftrukmeValcommand = "req.body.kTOV4_KV01didakKonftrukmeVal";
          var kTOV4_KV01didakKursaipavadcommand = "req.body.kTOV4_KV01didakKursaipavad";
          var kTOV4_KV01didakKursaipazymNrcommand = "req.body.kTOV4_KV01didakKursaipazymNr";
          var kTOV4_KV01didakKursaitrukmeValcommand = "req.body.kTOV4_KV01didakKursaitrukmeVal";
          var kTOV4_KV01bendrStazuotespavadcommand = "req.body.kTOV4_KV01bendrStazuotespavad";
          var kTOV4_KV01bendrStazuotespazymNrcommand = "req.body.kTOV4_KV01bendrStazuotespazymNr";
          var kTOV4_KV01bendrStazuotestrukmeValcommand = "req.body.kTOV4_KV01bendrStazuotestrukmeVal";
          var kTOV4_KV01bendrSeminaraipavadcommand = "req.body.kTOV4_KV01bendrSeminaraipavad";
          var kTOV4_KV01bendrSeminaraipazymNrcommand = "req.body.kTOV4_KV01bendrSeminaraipazymNr";
          var kTOV4_KV01bendrSeminaraitrukmeValcommand = "req.body.kTOV4_KV01bendrSeminaraitrukmeVal";
          var kTOV4_KV01bendrKonfpavadcommand = "req.body.kTOV4_KV01bendrKonfpavad";
          var kTOV4_KV01bendrKonfpazymNrcommand = "req.body.kTOV4_KV01bendrKonfpazymNr";
          var kTOV4_KV01bendrKonftrukmeValcommand = "req.body.kTOV4_KV01bendrKonftrukmeVal";
          var kTOV4_KV01bendrKursaipavadcommand = "req.body.kTOV4_KV01bendrKursaipavad";
          var kTOV4_KV01bendrKursaipazymNrcommand = "req.body.kTOV4_KV01bendrKursaipazymNr";
          var kTOV4_KV01bendrKursaitrukmeValcommand = "req.body.kTOV4_KV01bendrKursaitrukmeVal";

          var kTOV4_KV02dalykStazuotespavadcommand = "req.body.kTOV4_KV02dalykStazuotespavad";
          var kTOV4_KV02dalykStazuotespavadcommand = "req.body.kTOV4_KV02dalykStazuotespavad";
          var kTOV4_KV02dalykStazuotespazymNrcommand = "req.body.kTOV4_KV02dalykStazuotespazymNr";
          var kTOV4_KV02dalykStazuotestrukmeValcommand = "req.body.kTOV4_KV02dalykStazuotestrukmeVal";
          var kTOV4_KV02dalykSeminaraipavadcommand = "req.body.kTOV4_KV02dalykSeminaraipavad";
          var kTOV4_KV02dalykSeminaraipazymNrcommand = "req.body.kTOV4_KV02dalykSeminaraipazymNr";
          var kTOV4_KV02dalykSeminaraitrukmeValcommand = "req.body.kTOV4_KV02dalykSeminaraitrukmeVal";
          var kTOV4_KV02dalykKonfpavadcommand = "req.body.kTOV4_KV02dalykKonfpavad";
          var kTOV4_KV02dalykKonfpazymNrcommand = "req.body.kTOV4_KV02dalykKonfpazymNr";
          var kTOV4_KV02dalykKonftrukmeValcommand = "req.body.kTOV4_KV02dalykKonftrukmeVal";
          var kTOV4_KV02dalykKursaipavadcommand = "req.body.kTOV4_KV02dalykKursaipavad";
          var kTOV4_KV02dalykKursaipazymNrcommand = "req.body.kTOV4_KV02dalykKursaipazymNr";
          var kTOV4_KV02dalykKursaitrukmeValcommand = "req.body.kTOV4_KV02dalykKursaitrukmeVal";
          var kTOV4_KV02didakStazuotespavadcommand = "req.body.kTOV4_KV02didakStazuotespavad";
          var kTOV4_KV02didakStazuotespazymNrcommand = "req.body.kTOV4_KV02didakStazuotespazymNr";
          var kTOV4_KV02didakStazuotestrukmeValcommand = "req.body.kTOV4_KV02didakStazuotestrukmeVal";
          var kTOV4_KV02didakSeminaraipavadcommand = "req.body.kTOV4_KV02didakSeminaraipavad";
          var kTOV4_KV02didakSeminaraipazymNrcommand = "req.body.kTOV4_KV02didakSeminaraipazymNr";
          var kTOV4_KV02didakSeminaraitrukmeValcommand = "req.body.kTOV4_KV02didakSeminaraitrukmeVal";
          var kTOV4_KV02didakKonfpavadcommand = "req.body.kTOV4_KV02didakKonfpavad";
          var kTOV4_KV02didakKonfpazymNrcommand = "req.body.kTOV4_KV02didakKonfpazymNr";
          var kTOV4_KV02didakKonftrukmeValcommand = "req.body.kTOV4_KV02didakKonftrukmeVal";
          var kTOV4_KV02didakKursaipavadcommand = "req.body.kTOV4_KV02didakKursaipavad";
          var kTOV4_KV02didakKursaipazymNrcommand = "req.body.kTOV4_KV02didakKursaipazymNr";
          var kTOV4_KV02didakKursaitrukmeValcommand = "req.body.kTOV4_KV02didakKursaitrukmeVal";
          var kTOV4_KV02bendrStazuotespavadcommand = "req.body.kTOV4_KV02bendrStazuotespavad";
          var kTOV4_KV02bendrStazuotespazymNrcommand = "req.body.kTOV4_KV02bendrStazuotespazymNr";
          var kTOV4_KV02bendrStazuotestrukmeValcommand = "req.body.kTOV4_KV02bendrStazuotestrukmeVal";
          var kTOV4_KV02bendrSeminaraipavadcommand = "req.body.kTOV4_KV02bendrSeminaraipavad";
          var kTOV4_KV02bendrSeminaraipazymNrcommand = "req.body.kTOV4_KV02bendrSeminaraipazymNr";
          var kTOV4_KV02bendrSeminaraitrukmeValcommand = "req.body.kTOV4_KV02bendrSeminaraitrukmeVal";
          var kTOV4_KV02bendrKonfpavadcommand = "req.body.kTOV4_KV02bendrKonfpavad";
          var kTOV4_KV02bendrKonfpazymNrcommand = "req.body.kTOV4_KV02bendrKonfpazymNr";
          var kTOV4_KV02bendrKonftrukmeValcommand = "req.body.kTOV4_KV02bendrKonftrukmeVal";
          var kTOV4_KV02bendrKursaipavadcommand = "req.body.kTOV4_KV02bendrKursaipavad";
          var kTOV4_KV02bendrKursaipazymNrcommand = "req.body.kTOV4_KV02bendrKursaipazymNr";
          var kTOV4_KV02bendrKursaitrukmeValcommand = "req.body.kTOV4_KV02bendrKursaitrukmeVal";
          foundUser.destytojas.kD1_K01.kD1_K01_array = new Array();
          foundUser.destytojas.nD2_P01 = new Array();
          foundUser.destytojas.nD2_M01 = new Array();
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
          foundUser.destytojas.kTOV4_KV03 = new Array();
          foundUser.destytojas.kTOV4_S = new Array();
          foundUser.destytojas.kV5_KT01 = new Array();
          foundUser.destytojas.kV5_KT02.kV5_KT02_array = new Array();
          foundUser.destytojas.kTOV4_O01.kTOV4_O01_1 = new Array();
          foundUser.destytojas.kTOV4_O01.kTOV4_O01_2 = new Array();

          foundUser.destytojas.kTOV4_KV01.kTOV4_KV01dalykines_komp.stazuotes = new Array();
          foundUser.destytojas.kTOV4_KV01.kTOV4_KV01dalykines_komp.seminarai = new Array();
          foundUser.destytojas.kTOV4_KV01.kTOV4_KV01dalykines_komp.konferencijos = new Array();
          foundUser.destytojas.kTOV4_KV01.kTOV4_KV01dalykines_komp.kursai = new Array();

          foundUser.destytojas.kTOV4_KV01.kTOV4_KV01didaktines_komp.stazuotes = new Array();
          foundUser.destytojas.kTOV4_KV01.kTOV4_KV01didaktines_komp.seminarai = new Array();
          foundUser.destytojas.kTOV4_KV01.kTOV4_KV01didaktines_komp.konferencijos = new Array();
          foundUser.destytojas.kTOV4_KV01.kTOV4_KV01didaktines_komp.kursai = new Array();

          foundUser.destytojas.kTOV4_KV01.kTOV4_KV01bendrosios_komp.stazuotes = new Array();
          foundUser.destytojas.kTOV4_KV01.kTOV4_KV01bendrosios_komp.seminarai = new Array();
          foundUser.destytojas.kTOV4_KV01.kTOV4_KV01bendrosios_komp.konferencijos = new Array();
          foundUser.destytojas.kTOV4_KV01.kTOV4_KV01bendrosios_komp.kursai = new Array();

          foundUser.destytojas.kTOV4_KV02.kTOV4_KV02dalykines_komp.stazuotes = new Array();
          foundUser.destytojas.kTOV4_KV02.kTOV4_KV02dalykines_komp.seminarai = new Array();
          foundUser.destytojas.kTOV4_KV02.kTOV4_KV02dalykines_komp.konferencijos = new Array();
          foundUser.destytojas.kTOV4_KV02.kTOV4_KV02dalykines_komp.kursai = new Array();

          foundUser.destytojas.kTOV4_KV02.kTOV4_KV02didaktines_komp.stazuotes = new Array();
          foundUser.destytojas.kTOV4_KV02.kTOV4_KV02didaktines_komp.seminarai = new Array();
          foundUser.destytojas.kTOV4_KV02.kTOV4_KV02didaktines_komp.konferencijos = new Array();
          foundUser.destytojas.kTOV4_KV02.kTOV4_KV02didaktines_komp.kursai = new Array();

          foundUser.destytojas.kTOV4_KV02.kTOV4_KV02bendrosios_komp.stazuotes = new Array();
          foundUser.destytojas.kTOV4_KV02.kTOV4_KV02bendrosios_komp.seminarai = new Array();
          foundUser.destytojas.kTOV4_KV02.kTOV4_KV02bendrosios_komp.konferencijos = new Array();
          foundUser.destytojas.kTOV4_KV02.kTOV4_KV02bendrosios_komp.kursai = new Array();

          // foundUser.destytojas.kTOV4_KV01.kTOV4_KV01dalykines_komp.dalyvavoDalyk = false;
          // foundUser.destytojas.kTOV4_KV01.kTOV4_KV01didaktines_komp.dalyvavoDidak = false;
          // foundUser.destytojas.kTOV4_KV01.kTOV4_KV01bendrosios_komp.dalyvavoBendr = false;
          // foundUser.destytojas.kTOV4_KV02.kTOV4_KV02dalykines_komp.dalyvavoDalyk = false;
          // foundUser.destytojas.kTOV4_KV02.kTOV4_KV02didaktines_komp.dalyvavoDidak = false;
          // foundUser.destytojas.kTOV4_KV02.kTOV4_KV02bendrosios_komp.dalyvavoBendr = false;


          foundUser.destytojas.kD1_K01.isVisoValPlan = req.body.kD1_K01isVisoValPlan,
            foundUser.destytojas.kD1_K01.isVisoValAtl = req.body.kD1_K01isVisoValAtl,
            foundUser.destytojas.kD1_K01.isJuSrautaisValPlan = req.body.isJuSrautaisValPlan,
            foundUser.destytojas.kD1_K01.isJuSrautaisValAtl = req.body.isJuSrautaisValAtl,
            foundUser.destytojas.kD1_K01.isJuUzsienioValPlan = req.body.isJuUzsienioValPlan,
            foundUser.destytojas.kD1_K01.isJuUzsienioValAtl = req.body.isJuUzsienioValAtl,
            foundUser.destytojas.kD1_K01.priezastys = req.body.kD1_K01priezastys
          for (let i = 1; i <= parseInt(req.body.yond2); i++) {
            var iteracija = i;
            var nriteracija = nrcommand + iteracija;
            var dalykasiteracija = dalykascommand + iteracija;
            var grupeiteracija = grupecommand + iteracija;
            var semestrasiteracija = semestrascommand + iteracija;
            var planuotosValiteracija = planuotosValcommand + iteracija;
            var atliktosValiteracija = atliktosValcommand + iteracija;
            var joinednr = eval(nriteracija);
            var joineddalykas = eval(dalykasiteracija);
            var joinedgrupe = eval(grupeiteracija);
            var joinedsemestras = eval(semestrasiteracija);
            var joinedplanuotosVal = eval(planuotosValiteracija);
            var joinedatliktosVal = eval(atliktosValiteracija);
            foundUser.destytojas.kD1_K01.kD1_K01_array.push({
              nr: joinednr,
              dalykas: joineddalykas,
              grupe: joinedgrupe,
              semestras: joinedsemestras,
              planuotosVal: joinedplanuotosVal,
              atliktosVal: joinedatliktosVal
            })
          }
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
            foundUser.destytojas.nD2.priezastys = req.body.nD2priezastys,

            foundUser.destytojas.nD2_N01.priezastys = req.body.nD2_N01priezastys


          for (let a = 1; a <= parseInt(req.body.yond4); a++) {
            var iteracija2 = a;
            var nD2_P01nriteracija = nD2_P01nrcommand + iteracija2;
            var nD2_P01veiklPavaditeracija = nD2_P01veiklPavadcommand + iteracija2;
            var nD2_P01veiklRezultiteracija = nD2_P01veiklRezultcommand + iteracija2;
            var joinednr2 = eval(nD2_P01nriteracija);
            var joinednD2_P01veiklPavad = eval(nD2_P01veiklPavaditeracija);
            var joinednD2_P01veiklRezult = eval(nD2_P01veiklRezultiteracija);
            foundUser.destytojas.nD2_P01.push({
              nr: joinednr2,
              veiklPavad: joinednD2_P01veiklPavad,
              veiklRezult: joinednD2_P01veiklRezult
            })
          }
          for (let b = 1; b <= parseInt(req.body.yond6); b++) {
            var iteracija3 = b;
            var nD2_M01nriteracija = nD2_M01nrcommand + iteracija3;
            var nD2_M01veiklPavaditeracija = nD2_M01veiklPavadcommand + iteracija3;
            var nD2_M01veiklRezultiteracija = nD2_M01veiklRezultcommand + iteracija3;
            var joinednr3 = eval(nD2_M01nriteracija);
            var joinednD2_M01veiklPavad = eval(nD2_M01veiklPavaditeracija);
            var joinednD2_M01veiklRezult = eval(nD2_M01veiklRezultiteracija);
            foundUser.destytojas.nD2_M01.push({
              nr: joinednr3,
              veiklPavad: joinednD2_M01veiklPavad,
              veiklRezult: joinednD2_M01veiklRezult
            })
          }

          for (let c = 1; c <= parseInt(req.body.yond8); c++) {
            var iteracija4 = c;
            var nD2_M02nriteracija = nD2_M02nrcommand + iteracija4;
            var bibliografApriteracija = bibliografAprcommand + iteracija4;
            var tipasiteracija = tipascommand + iteracija4;
            var mokslSrititeracija = mokslSritcommand + iteracija4;
            var mokslKryptiteracija = mokslKryptcommand + iteracija4;
            var katedraiteracija = katedracommand + iteracija4;
            var joinednD2_M02nr = eval(nD2_M02nriteracija);
            var joinedbibliografApr = eval(bibliografApriteracija);
            var joinedtipas = eval(tipasiteracija);
            var joinedmokslSritit = eval(mokslSrititeracija);
            var joinedmokslKrypt = eval(mokslKryptiteracija);
            var joinedkatedra = eval(katedraiteracija);
            foundUser.destytojas.nD2_M02.push({
              nr: joinednD2_M02nr,
              bibliografApr: joinedbibliografApr,
              tipas: joinedtipas,
              mokslSrit: joinedmokslSritit,
              mokslKrypt: joinedmokslKrypt,
              katedra: joinedkatedra
            })
          }
          for (let d = 1; d <= parseInt(req.body.yond10); d++) {
            var iteracija5 = d;
            var nD2_M03nriteracija = nD2_M03nrcommand + iteracija5;
            var nD2_M03studProgriteracija = nD2_M03studProgrcommand + iteracija5;
            var nD2_M03dalykPavaditeracija = nD2_M03dalykPavadcommand + iteracija5;
            var nD2_M03apimtisKredititeracija = nD2_M03apimtisKreditcommand + iteracija5;
            var joinednD2_M03nr = eval(nD2_M03nriteracija);
            var joinednD2_M03studProgr = eval(nD2_M03studProgriteracija);
            var joinednD2_M03dalykPavad = eval(nD2_M03dalykPavaditeracija);
            var joinednD2_M03apimtisKredit = eval(nD2_M03apimtisKredititeracija);
            foundUser.destytojas.nD2_M03.push({
              nr: joinednD2_M03nr,
              studProgr: joinednD2_M03studProgr,
              dalykPavad: joinednD2_M03dalykPavad,
              apimtisKredit: joinednD2_M03apimtisKredit
            })
          }
          for (let e = 1; e <= parseInt(req.body.yond12); e++) {
            var iteracija6 = e;
            var nD2_M04nriteracija = nD2_M04nrcommand + iteracija6;
            var nD2_M04studProgriteracija = nD2_M04studProgrcommand + iteracija6;
            var nD2_M04dalykPavaditeracija = nD2_M04dalykPavadcommand + iteracija6;
            var nD2_M04busenaiteracija = nD2_M04busenacommand + iteracija6;
            var nD2_M04apimtisKredititeracija = nD2_M04apimtisKreditcommand + iteracija6;
            var joinednD2_M04nr = eval(nD2_M04nriteracija);
            var joinednD2_M04studProgr = eval(nD2_M04studProgriteracija);
            var joinednD2_M04dalykPavad = eval(nD2_M04dalykPavaditeracija);
            var joinednD2_M04busena = eval(nD2_M04busenaiteracija);
            var joinednD2_M04apimtisKredit = eval(nD2_M04apimtisKredititeracija);
            foundUser.destytojas.nD2_M04.push({
              nr: joinednD2_M04nr,
              studProgr: joinednD2_M04studProgr,
              dalykPavad: joinednD2_M04dalykPavad,
              busena: joinednD2_M04busena,
              apimtisKredit: joinednD2_M04apimtisKredit
            })
          }
          for (let f = 1; f <= parseInt(req.body.yond14); f++) {
            var iteracija7 = f;
            var nD2_D01nriteracija = nD2_D01nrcommand + iteracija7;
            var nD2_D01komitetasiteracija = nD2_D01komitetascommand + iteracija7;
            var nD2_D01veiklaiteracija = nD2_D01veiklacommand + iteracija7;
            var nD2_D01rezultataiiteracija = nD2_D01rezultataicommand + iteracija7;
            var joinednD2_D01nr = eval(nD2_D01nriteracija);
            var joinednD2_D01komitetas = eval(nD2_D01komitetasiteracija);
            var joinednD2_D01veikla = eval(nD2_D01veiklaiteracija);
            var joinednD2_D01rezultatai = eval(nD2_D01rezultataiiteracija);
            foundUser.destytojas.nD2_D01.push({
              nr: joinednD2_D01nr,
              komitetas: joinednD2_D01komitetas,
              veikla: joinednD2_D01veikla,
              rezultatai: joinednD2_D01rezultatai
            })
          }
          for (let g = 1; g <= parseInt(req.body.yond16); g++) {
            var iteracija8 = g;
            var nD2_D02nriteracija = nD2_D02nrcommand + iteracija8;
            var nD2_D02studKryptiteracija = nD2_D02studKryptcommand + iteracija8;
            var nD2_D02veiklaiteracija = nD2_D02veiklacommand + iteracija8;
            var nD2_D02rezultataiiteracija = nD2_D02rezultataicommand + iteracija8;
            var joinednD2_D02nr = eval(nD2_D02nriteracija);
            var joinednD2_D02studKrypt = eval(nD2_D02studKryptiteracija);
            var joinednD2_D02veikla = eval(nD2_D02veiklaiteracija);
            var joinednD2_D02rezultatai = eval(nD2_D02rezultataiiteracija);
            foundUser.destytojas.nD2_D02.push({
              nr: joinednD2_D02nr,
              studKryptis: joinednD2_D02studKrypt,
              veikla: joinednD2_D02veikla,
              rezultatai: joinednD2_D02rezultatai
            })
          }
          for (let h = 1; h <= parseInt(req.body.yond18); h++) {
            var iteracija9 = h;
            var nD2_D03nriteracija = nD2_D03nrcommand + iteracija9;
            var nD2_D03studProgriteracija = nD2_D03studProgrcommand + iteracija9;
            var nD2_D03veiklaiteracija = nD2_D03veiklacommand + iteracija9;
            var nD2_D03rezultataiiteracija = nD2_D03rezultataicommand + iteracija9;
            var joinednD2_D03nr = eval(nD2_D03nriteracija);
            var joinednD2_D03studProgr = eval(nD2_D03studProgriteracija);
            var joinednD2_D03veikla = eval(nD2_D03veiklaiteracija);
            var joinednD2_D03rezultatai = eval(nD2_D03rezultataiiteracija);
            foundUser.destytojas.nD2_D03.push({
              nr: joinednD2_D03nr,
              studProgr: joinednD2_D03studProgr,
              veikla: joinednD2_D03veikla,
              rezultatai: joinednD2_D03rezultatai
            })
          }
          for (let j = 1; j <= parseInt(req.body.yond20); j++) {
            var iteracija10 = j;
            var nD2_S01nriteracija = nD2_S01nrcommand + iteracija10;
            var nD2_S01veiklaiteracija = nD2_S01veiklacommand + iteracija10;
            var nD2_S01dataVietaiteracija = nD2_S01dataVietacommand + iteracija10;
            var joinednD2_S01nr = eval(nD2_S01nriteracija);
            var joinednD2_S01veikla = eval(nD2_S01veiklaiteracija);
            var joinednD2_S01dataVieta = eval(nD2_S01dataVietaiteracija);
            foundUser.destytojas.nD2_S01.push({
              nr: joinednD2_S01nr,
              veikla: joinednD2_S01veikla,
              dataVieta: joinednD2_S01dataVieta
            })
          }
          for (let k = 1; k <= parseInt(req.body.yond22); k++) {
            var iteracija11 = k;
            var nD2_Snriteracija = nD2_Snrcommand + iteracija11;
            var nD2_Sstiprybesiteracija = nD2_Sstiprybescommand + iteracija11;
            var nD2_Stobulintinaiteracija = nD2_Stobulintinacommand + iteracija11;
            var joinednD2_Snr = eval(nD2_Snriteracija);
            var joinednD2_Sstiprybes = eval(nD2_Sstiprybesiteracija);
            var joinednD2_Stobulintina = eval(nD2_Stobulintinaiteracija);
            foundUser.destytojas.nD2_S.push({
              nr: joinednD2_Snr,
              stiprybes: joinednD2_Sstiprybes,
              tobulintina: joinednD2_Stobulintina
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

          for (let l = 1; l <= parseInt(req.body.yond24); l++) {
            var iteracija12 = l;
            var tMTEP3_T01nriteracija = tMTEP3_T01nrcommand + iteracija12;
            var tyrTematiteracija = tyrTematcommand + iteracija12;
            var tyrGrupiteracija = tyrGrupcommand + iteracija12;
            var tMTEP3_T01mokslSrititeracija = tMTEP3_T01mokslSritcommand + iteracija12;
            var tMTEP3_T01mokslKryptiteracija = tMTEP3_T01mokslKryptcommand + iteracija12;
            var joinedtMTEP3_T01nr = eval(tMTEP3_T01nriteracija);
            var joinedtyrTemat = eval(tyrTematiteracija);
            var joinedtyrGrup = eval(tyrGrupiteracija);
            var joinedtMTEP3_T01mokslSrit = eval(tMTEP3_T01mokslSrititeracija);
            var joinedtMTEP3_T01mokslKrypt = eval(tMTEP3_T01mokslKryptiteracija);
            foundUser.destytojas.tMTEP3_T01.push({
              nr: joinedtMTEP3_T01nr,
              tyrTemat: joinedtyrTemat,
              tyrGrup: joinedtyrGrup,
              mokslSrit: joinedtMTEP3_T01mokslSrit,
              mokslKrypt: joinedtMTEP3_T01mokslKrypt
            })
          }
          for (let m = 1; m <= parseInt(req.body.yond26); m++) {
            var iteracija13 = m;
            var tMTEP3_T02nriteracija = tMTEP3_T02nrcommand + iteracija13;
            var tMTEP3_T02bibliografApriteracija = tMTEP3_T02bibliografAprcommand + iteracija13;
            var tMTEP3_T02tipasiteracija = tMTEP3_T02tipascommand + iteracija13;
            var tMTEP3_T02mokslSrititeracija = tMTEP3_T02mokslSritcommand + iteracija13;
            var tMTEP3_T02mokslKryptiteracija = tMTEP3_T02mokslKryptcommand + iteracija13;
            var tMTEP3_T02duomBazeiteracija = tMTEP3_T02duomBazecommand + iteracija13;
            var joinedtMTEP3_T02nr = eval(tMTEP3_T02nriteracija);
            var joinedtMTEP3_T02bibliografApr = eval(tMTEP3_T02bibliografApriteracija);
            var joinedtMTEP3_T02tipas = eval(tMTEP3_T02tipasiteracija);
            var joinedtMTEP3_T02mokslSrit = eval(tMTEP3_T02mokslSrititeracija);
            var joinedtMTEP3_T02mokslKrypt = eval(tMTEP3_T02mokslKryptiteracija);
            var joinedtMTEP3_T02duomBaze = eval(tMTEP3_T02duomBazeiteracija);
            foundUser.destytojas.tMTEP3_T02.push({
              nr: joinedtMTEP3_T02nr,
              bibliografApr: joinedtMTEP3_T02bibliografApr,
              tipas: joinedtMTEP3_T02tipas,
              mokslSrit: joinedtMTEP3_T02mokslSrit,
              mokslKrypt: joinedtMTEP3_T02mokslKrypt,
              duomBaze: joinedtMTEP3_T02duomBaze
            })
          }
          for (let n = 1; n <= parseInt(req.body.yond28); n++) {
            var iteracija14 = n;
            var tMTEP3_T03nriteracija = tMTEP3_T03nrcommand + iteracija14;
            var tMTEP3_T03pilnasBiblApriteracija = tMTEP3_T03pilnasBiblAprcommand + iteracija14;
            var joinedtMTEP3_T03nr = eval(tMTEP3_T03nriteracija);
            var joinedtMTEP3_T03pilnasBiblApr = eval(tMTEP3_T03pilnasBiblApriteracija);
            foundUser.destytojas.tMTEP3_T03.push({
              nr: joinedtMTEP3_T03nr,
              pilnasBiblApr: joinedtMTEP3_T03pilnasBiblApr
            })
          }
          for (let o = 1; o <= parseInt(req.body.yond30); o++) {
            var tMTEP3_T04nriteracija = tMTEP3_T04nrcommand + o;
            var tMTEP3_T04uzsakovasiteracija = tMTEP3_T04uzsakovascommand + o;
            var tMTEP3_T04temaiteracija = tMTEP3_T04temacommand + o;
            var tMTEP3_T04dataiteracija = tMTEP3_T04datacommand + o;
            var joinedtMTEP3_T04nr = eval(tMTEP3_T04nriteracija);
            var joinedtMTEP3_T04uzsakovas = eval(tMTEP3_T04uzsakovasiteracija);
            var joinedtMTEP3_T04tema = eval(tMTEP3_T04temaiteracija);
            var joinedtMTEP3_T04data = eval(tMTEP3_T04dataiteracija);
            foundUser.destytojas.tMTEP3_T04.push({
              nr: joinedtMTEP3_T04nr,
              uzsakovas: joinedtMTEP3_T04uzsakovas,
              tema: joinedtMTEP3_T04tema,
              data: joinedtMTEP3_T04data
            })
          }
          for (let p = 1; p <= parseInt(req.body.yond32); p++) {

            var tMTEP3_T05nriteracija = tMTEP3_T05nrcommand + p;
            var tMTEP3_T05veiklPavaditeracija = tMTEP3_T05veiklPavadcommand + p;
            var tMTEP3_T05veiklRezultiteracija = tMTEP3_T05veiklRezultcommand + p;
            var joinedtMTEP3_T05nr = eval(tMTEP3_T05nriteracija);
            var joinedtMTEP3_T05veiklPavad = eval(tMTEP3_T05veiklPavaditeracija);
            var joinedtMTEP3_T05veiklRezult = eval(tMTEP3_T05veiklRezultiteracija);
            foundUser.destytojas.tMTEP3_T05.push({
              nr: joinedtMTEP3_T05nr,
              veiklPavad: joinedtMTEP3_T05veiklPavad,
              veiklRezult: joinedtMTEP3_T05veiklRezult
            })
          }
          for (let q = 1; q <= parseInt(req.body.yond34); q++) {
            var tMTEP3_T06nriteracija = tMTEP3_T06nrcommand + q;
            var tMTEP3_T06autoriusiteracija = tMTEP3_T06autoriuscommand + q;
            var tMTEP3_T06menoSrititeracija = tMTEP3_T06menoSritcommand + q;
            var tMTEP3_T06pobudisiteracija = tMTEP3_T06pobudiscommand + q;
            var tMTEP3_T06realizVietaiteracija = tMTEP3_T06realizVietacommand + q;
            var tMTEP3_T06dataiteracija = tMTEP3_T06datacommand + q;
            var joinedtMTEP3_T06nr = eval(tMTEP3_T06nriteracija);
            var joinedtMTEP3_T06autorius = eval(tMTEP3_T06autoriusiteracija);
            var joinedtMTEP3_T06menoSrit = eval(tMTEP3_T06menoSrititeracija);
            var joinedtMTEP3_T06pobudis = eval(tMTEP3_T06pobudisiteracija);
            var joinedtMTEP3_T06realizVieta = eval(tMTEP3_T06realizVietaiteracija);
            var joinedtMTEP3_T06data = eval(tMTEP3_T06dataiteracija);
            foundUser.destytojas.tMTEP3_T06.push({
              nr: joinedtMTEP3_T06nr,
              autorius: joinedtMTEP3_T06autorius,
              menoSrit: joinedtMTEP3_T06menoSrit,
              pobudis: joinedtMTEP3_T06pobudis,
              realizVieta: joinedtMTEP3_T06realizVieta,
              data: joinedtMTEP3_T06data
            })
          }
          for (let r = 1; r <= parseInt(req.body.yond36); r++) {
            var tMTEP3_T07nriteracija = tMTEP3_T07nrcommand + r;
            var tMTEP3_T07atlikejasiteracija = tMTEP3_T07atlikejascommand + r;
            var tMTEP3_T07menoSrititeracija = tMTEP3_T07menoSritcommand + r;
            var tMTEP3_T07pavadinimasiteracija = tMTEP3_T07pavadinimascommand + r;
            var tMTEP3_T07atlikVietaiteracija = tMTEP3_T07atlikVietacommand + r;
            var tMTEP3_T07dataiteracija = tMTEP3_T07datacommand + r;
            var joinedtMTEP3_T07nr = eval(tMTEP3_T07nriteracija);
            var joinedtMTEP3_T07atlikejas = eval(tMTEP3_T07atlikejasiteracija);
            var joinedtMTEP3_T07menoSrit = eval(tMTEP3_T07menoSrititeracija);
            var joinedtMTEP3_T07pavadinimas = eval(tMTEP3_T07pavadinimasiteracija);
            var joinedtMTEP3_T07atlikVieta = eval(tMTEP3_T07atlikVietaiteracija);
            var joinedtMTEP3_T07data = eval(tMTEP3_T07dataiteracija);
            foundUser.destytojas.tMTEP3_T07.push({
              nr: joinedtMTEP3_T07nr,
              atlikejas: joinedtMTEP3_T07atlikejas,
              menoSrit: joinedtMTEP3_T07menoSrit,
              pavadinimas: joinedtMTEP3_T07pavadinimas,
              atlikVieta: joinedtMTEP3_T07atlikVieta,
              data: joinedtMTEP3_T07data
            })
          }
          for (let s = 1; s <= parseInt(req.body.yond38); s++) {
            var tMTEP3_T08Snriteracija = tMTEP3_T08Snrcommand + s;
            var tMTEP3_T08atlikejasiteracija = tMTEP3_T08atlikejascommand + s;
            var tMTEP3_T08menoSrititeracija = tMTEP3_T08menoSritcommand + s;
            var tMTEP3_T08pavadinimasiteracija = tMTEP3_T08pavadinimascommand + s;
            var tMTEP3_T08atlikVietaiteracija = tMTEP3_T08atlikVietacommand + s;
            var tMTEP3_T08dataiteracija = tMTEP3_T08datacommand + s;
            var joinedtMTEP3_T08Snr = eval(tMTEP3_T08Snriteracija);
            var joinedtMTEP3_T08atlikejas = eval(tMTEP3_T08atlikejasiteracija);
            var joinedtMTEP3_T08menoSrit = eval(tMTEP3_T08menoSrititeracija);
            var joinedtMTEP3_T08pavadinimas = eval(tMTEP3_T08pavadinimasiteracija);
            var joinedtMTEP3_T08atlikVieta = eval(tMTEP3_T08atlikVietaiteracija);
            var joinedtMTEP3_T08data = eval(tMTEP3_T08dataiteracija);
            foundUser.destytojas.tMTEP3_T08.push({
              nr: joinedtMTEP3_T08Snr,
              atlikejas: joinedtMTEP3_T08atlikejas,
              menoSrit: joinedtMTEP3_T08menoSrit,
              pavadinimas: joinedtMTEP3_T08pavadinimas,
              atlikVieta: joinedtMTEP3_T08atlikVieta,
              data: joinedtMTEP3_T08data
            })
          }
          for (let t = 1; t <= parseInt(req.body.yond40); t++) {
            var tMTEP3_T09nriteracija = tMTEP3_T09nrcommand + t;
            var tMTEP3_T09atlikejasiteracija = tMTEP3_T09atlikejascommand + t;
            var tMTEP3_T09menoSrititeracija = tMTEP3_T09menoSritcommand + t;
            var tMTEP3_T09pavadinimasiteracija = tMTEP3_T09pavadinimascommand + t;
            var tMTEP3_T09atlikVietaiteracija = tMTEP3_T09atlikVietacommand + t;
            var tMTEP3_T09dataiteracija = tMTEP3_T09datacommand + t;
            var joinedtMTEP3_T09nr = eval(tMTEP3_T09nriteracija);
            var joinedtMTEP3_T09atlikejas = eval(tMTEP3_T09atlikejasiteracija);
            var joinedtMTEP3_T09menoSrit = eval(tMTEP3_T09menoSrititeracija);
            var joinedtMTEP3_T09pavadinimas = eval(tMTEP3_T09pavadinimasiteracija);
            var joinedtMTEP3_T09atlikVieta = eval(tMTEP3_T09atlikVietaiteracija);
            var joinedtMTEP3_T09data = eval(tMTEP3_T09dataiteracija);
            foundUser.destytojas.tMTEP3_T09.push({
              nr: joinedtMTEP3_T09nr,
              atlikejas: joinedtMTEP3_T09atlikejas,
              menoSrit: joinedtMTEP3_T09menoSrit,
              pavadinimas: joinedtMTEP3_T09pavadinimas,
              atlikVieta: joinedtMTEP3_T09atlikVieta,
              data: joinedtMTEP3_T09data
            })
          }
          for (let u = 1; u <= parseInt(req.body.yond42); u++) {
            var tMTEP3_T10nriteracija = tMTEP3_T10nrcommand + u;
            var tMTEP3_T10veiklPobuditeracija = tMTEP3_T10veiklPobudcommand + u;
            var tMTEP3_T10veiklTiksliteracija = tMTEP3_T10veiklTikslcommand + u;
            var tMTEP3_T10dataVietaiteracija = tMTEP3_T10dataVietacommand + u;
            var tMTEP3_T10dalyvSkiteracija = tMTEP3_T10dalyvSkcommand + u;
            var tMTEP3_T10ktKomentaraiiteracija = tMTEP3_T10ktKomentaraicommand + u;
            var joinedtMTEP3_T10nr = eval(tMTEP3_T10nriteracija);
            var joinedtMTEP3_T10veiklPobud = eval(tMTEP3_T10veiklPobuditeracija);
            var joinedtMTEP3_T10veiklTiksl = eval(tMTEP3_T10veiklTiksliteracija);
            var joinedtMTEP3_T10dataVieta = eval(tMTEP3_T10dataVietaiteracija);
            var joinedtMTEP3_T10dalyvSk = eval(tMTEP3_T10dalyvSkiteracija);
            var joinedtMTEP3_T10ktKomentarai = eval(tMTEP3_T10ktKomentaraiiteracija);
            foundUser.destytojas.tMTEP3_T10.push({
              nr: joinedtMTEP3_T10nr,
              veiklPobud: joinedtMTEP3_T10veiklPobud,
              veiklTiksl: joinedtMTEP3_T10veiklTiksl,
              dataVieta: joinedtMTEP3_T10dataVieta,
              dalyvSk: joinedtMTEP3_T10dalyvSk,
              ktKomentarai: joinedtMTEP3_T10ktKomentarai
            })
          }
          for (let v = 1; v <= parseInt(req.body.yond44); v++) {
            var tMTEP3_T11nriteracija = tMTEP3_T11nrcommand + v;
            var tMTEP3_T11veiklPobuditeracija = tMTEP3_T11veiklPobudcommand + v;
            var tMTEP3_T11veiklTiksliteracija = tMTEP3_T11veiklTikslcommand + v;
            var tMTEP3_T11dataVietaiteracija = tMTEP3_T11dataVietacommand + v;
            var tMTEP3_T11dalyvSkiteracija = tMTEP3_T11dalyvSkcommand + v;
            var tMTEP3_T11ktKomentaraiiteracija = tMTEP3_T11ktKomentaraicommand + v;
            var joinedtMTEP3_T11nr = eval(tMTEP3_T11nriteracija);
            var joinedtMTEP3_T11veiklPobud = eval(tMTEP3_T11veiklPobuditeracija);
            var joinedtMTEP3_T11veiklTiksl = eval(tMTEP3_T11veiklTiksliteracija);
            var joinedtMTEP3_T11dataVieta = eval(tMTEP3_T11dataVietaiteracija);
            var joinedtMTEP3_T11dalyvSk = eval(tMTEP3_T11dalyvSkiteracija);
            var joinedtMTEP3_T11ktKomentarai = eval(tMTEP3_T11ktKomentaraiiteracija);
            foundUser.destytojas.tMTEP3_T11.push({
              nr: joinedtMTEP3_T11nr,
              veiklPobud: joinedtMTEP3_T11veiklPobud,
              veiklTiksl: joinedtMTEP3_T11veiklTiksl,
              dataVieta: joinedtMTEP3_T11dataVieta,
              dalyvSk: joinedtMTEP3_T11dalyvSk,
              ktKomentarai: joinedtMTEP3_T11ktKomentarai
            })
          }
          for (let w = 1; w <= parseInt(req.body.yond46); w++) {
            var tMTEP3_T12nriteracija = tMTEP3_T12nrcommand + w;
            var tMTEP3_T12veiklPobuditeracija = tMTEP3_T12veiklPobudcommand + w;
            var tMTEP3_T12dataVietaiteracija = tMTEP3_T12dataVietacommand + w;
            var joinedtMTEP3_T12nr = eval(tMTEP3_T12nriteracija);
            var joinedtMTEP3_T12veiklPobud = eval(tMTEP3_T12veiklPobuditeracija);
            var joinedtMTEP3_T12dataVieta = eval(tMTEP3_T12dataVietaiteracija);
            foundUser.destytojas.tMTEP3_T12.push({
              nr: joinedtMTEP3_T12nr,
              veiklPobud: joinedtMTEP3_T12veiklPobud,
              dataVieta: joinedtMTEP3_T12dataVieta
            })
          }
          for (let x = 1; x <= parseInt(req.body.yond48); x++) {
            var tMTEP3_T13nriteracija = tMTEP3_T13nrcommand + x;
            var tMTEP3_T13studDuomiteracija = tMTEP3_T13studDuomcommand + x;
            var tMTEP3_T13renginioPavaditeracija = tMTEP3_T13renginioPavadcommand + x;
            var tMTEP3_T13rezultatasiteracija = tMTEP3_T13rezultatascommand + x;
            var tMTEP3_T13dataiteracija = tMTEP3_T13datacommand + x;
            var joinedtMTEP3_T13nr = eval(tMTEP3_T13nriteracija);
            var joinedtMTEP3_T13studDuom = eval(tMTEP3_T13studDuomiteracija);
            var joinedtMTEP3_T13renginioPavad = eval(tMTEP3_T13renginioPavaditeracija);
            var joinedtMTEP3_T13rezultatas = eval(tMTEP3_T13rezultatasiteracija);
            var joinedtMTEP3_T13data = eval(tMTEP3_T13dataiteracija);
            foundUser.destytojas.tMTEP3_T13.push({
              nr: joinedtMTEP3_T13nr,
              studDuom: joinedtMTEP3_T13studDuom,
              renginioPavad: joinedtMTEP3_T13renginioPavad,
              rezultatas: joinedtMTEP3_T13rezultatas,
              data: joinedtMTEP3_T13data
            })
          }
          for (let y = 1; y <= parseInt(req.body.yond50); y++) {
            var tMTEP3_T14nriteracija = tMTEP3_T14nrcommand + y;
            var tMTEP3_T14renginysiteracija = tMTEP3_T14renginyscommand + y;
            var tMTEP3_T14veiklPobuditeracija = tMTEP3_T14veiklPobudcommand + y;
            var tMTEP3_T14dataVietaiteracija = tMTEP3_T14dataVietacommand + y;
            var joinedtMTEP3_T14nr = eval(tMTEP3_T14nriteracija);
            var joinedtMTEP3_T14renginys = eval(tMTEP3_T14renginysiteracija);
            var joinedtMTEP3_T14veiklPobud = eval(tMTEP3_T14veiklPobuditeracija);
            var joinedtMTEP3_T14dataVieta = eval(tMTEP3_T14dataVietaiteracija);
            foundUser.destytojas.tMTEP3_T14.push({
              nr: joinedtMTEP3_T14nr,
              renginys: joinedtMTEP3_T14renginys,
              veiklPobud: joinedtMTEP3_T14veiklPobud,
              dataVieta: joinedtMTEP3_T14dataVieta
            })
          }
          for (let z = 1; z <= parseInt(req.body.yond52); z++) {
            var tMTEP3_Snriteracija = tMTEP3_Snrcommand + z;
            var tMTEP3_Sstiprybesiteracija = tMTEP3_Sstiprybescommand + z;
            var tMTEP3_Stobulintinaiteracija = tMTEP3_Stobulintinacommand + z;
            var joinedtMTEP3_Snr = eval(tMTEP3_Snriteracija);
            var joinedtMTEP3_Sstiprybes = eval(tMTEP3_Sstiprybesiteracija);
            var joinedtMTEP3_Stobulintina = eval(tMTEP3_Stobulintinaiteracija);
            foundUser.destytojas.tMTEP3_S.push({
              nr: joinedtMTEP3_Snr,
              stiprybes: joinedtMTEP3_Sstiprybes,
              tobulintina: joinedtMTEP3_Stobulintina
            })
          }
          foundUser.destytojas.kTOV4.kompTobulinimas_planVal = req.body.kTOV4kompTobulinimas_planVal,
            foundUser.destytojas.kTOV4.kompTobulinimas_atlVal = req.body.kTOV4kompTobulinimas_atlVal,
            foundUser.destytojas.kTOV4.organizacVeikl_planVal = req.body.kTOV4organizacVeikl_planVal,
            foundUser.destytojas.kTOV4.organizacVeikl_atlVal = req.body.kTOV4organizacVeikl_atlVal,
            foundUser.destytojas.kTOV4.isVisoValPlan = req.body.kTOV4isVisoValPlan,
            foundUser.destytojas.kTOV4.isVisoValAtl = req.body.kTOV4isVisoValAtl,
            foundUser.destytojas.kTOV4.priezastys = req.body.kTOV4priezastys

          for (let aa = 1; aa <= parseInt(req.body.yond54); aa++) {
            var kTOV4_KV03nriteracija = kTOV4_KV03nrcommand + aa;
            var kTOV4_KV03salisiteracija = kTOV4_KV03saliscommand + aa;
            var kTOV4_KV03institucijaiteracija = kTOV4_KV03institucijacommand + aa;
            var kTOV4_KV03dalykasiteracija = kTOV4_KV03dalykascommand + aa;
            var joinedkTOV4_KV03nr = eval(kTOV4_KV03nriteracija);
            var joinedkTOV4_KV03salis = eval(kTOV4_KV03salisiteracija);
            var joinedkTOV4_KV03institucija = eval(kTOV4_KV03institucijaiteracija);
            var joinedkTOV4_KV03dalykas = eval(kTOV4_KV03dalykasiteracija);
            foundUser.destytojas.kTOV4_KV03.push({
              nr: joinedkTOV4_KV03nr,
              salis: joinedkTOV4_KV03salis,
              institucija: joinedkTOV4_KV03institucija,
              dalykas: joinedkTOV4_KV03dalykas
            })
          }
          for (let ab = 1; ab <= parseInt(req.body.yond56); ab++) {
            var kTOV4_O01_1nriteracija = kTOV4_O01_1nrcommand + ab;
            var kTOV4_O01_1veiklPobuditeracija = kTOV4_O01_1veiklPobudcommand + ab;
            var kTOV4_O01_1isakNrDataiteracija = kTOV4_O01_1isakNrDatacommand + ab;
            var joinedkTOV4_O01_1nr = eval(kTOV4_O01_1nriteracija);
            var joinedkTOV4_O01_1veiklPobud = eval(kTOV4_O01_1veiklPobuditeracija);
            var joinedkTOV4_O01_1isakNrData = eval(kTOV4_O01_1isakNrDataiteracija);
            foundUser.destytojas.kTOV4_O01.kTOV4_O01_1.push({
              nr: joinedkTOV4_O01_1nr,
              veiklPobud: joinedkTOV4_O01_1veiklPobud,
              isakNrData: joinedkTOV4_O01_1isakNrData
            })
          }
          for (let ac = 1; ac <= parseInt(req.body.yond58); ac++) {
            var kTOV4_O01_2nriteracija = kTOV4_O01_2nrcommand + ac;
            var kTOV4_O01_2veiklPobuditeracija = kTOV4_O01_2veiklPobudcommand + ac;
            var kTOV4_O01_2dataVietaiteracija = kTOV4_O01_2dataVietacommand + ac;
            var kTOV4_O01_2dalyvSkiteracija = kTOV4_O01_2dalyvSkcommand + ac;
            var kTOV4_O01_2ktKomentaraiiteracija = kTOV4_O01_2ktKomentaraicommand + ac;
            var joinedkTOV4_O01_2nr = eval(kTOV4_O01_2nriteracija);
            var joinedkTOV4_O01_2veiklPobud = eval(kTOV4_O01_2veiklPobuditeracija);
            var joinedkTOV4_O01_2dataVieta = eval(kTOV4_O01_2dataVietaiteracija);
            var joinedkTOV4_O01_2dalyvSk = eval(kTOV4_O01_2dalyvSkiteracija);
            var joinedkTOV4_O01_2ktKomentarai = eval(kTOV4_O01_2ktKomentaraiiteracija);
            foundUser.destytojas.kTOV4_O01.kTOV4_O01_2.push({
              nr: joinedkTOV4_O01_2nr,
              veiklPobud: joinedkTOV4_O01_2veiklPobud,
              dataVieta: joinedkTOV4_O01_2dataVieta,
              dalyvSk: joinedkTOV4_O01_2dalyvSk,
              ktKomentarai: joinedkTOV4_O01_2ktKomentarai
            })
          }
          for (let ad = 1; ad <= parseInt(req.body.yond60); ad++) {
            var kTOV4_Snriteracija = kTOV4_Snrcommand + ad;
            var kTOV4_Sstiprybesiteracija = kTOV4_Sstiprybescommand + ad;
            var kTOV4_Stobulintinaiteracija = kTOV4_Stobulintinacommand + ad;
            var joinedkTOV4_Snr = eval(kTOV4_Snriteracija);
            var joinedkTOV4_Sstiprybes = eval(kTOV4_Sstiprybesiteracija);
            var joinedkTOV4_Stobulintina = eval(kTOV4_Stobulintinaiteracija);
            foundUser.destytojas.kTOV4_S.push({
              nr: joinedkTOV4_Snr,
              stiprybes: joinedkTOV4_Sstiprybes,
              tobulintina: joinedkTOV4_Stobulintina
            })
          }
          for (let ae = 1; ae <= parseInt(req.body.yond62); ae++) {
            var kV5_KT01nriteracija = kV5_KT01nrcommand + ae;
            var kV5_KT01diplomantasiteracija = kV5_KT01diplomantascommand + ae;
            var kV5_KT01studProgriteracija = kV5_KT01studProgrcommand + ae;
            var kV5_KT01darboTemaiteracija = kV5_KT01darboTemacommand + ae;
            var kV5_KT01uzsakovasiteracija = kV5_KT01uzsakovascommand + ae;
            var joinedkV5_KT01nr = eval(kV5_KT01nriteracija);
            var joinedkV5_KT01diplomantas = eval(kV5_KT01diplomantasiteracija);
            var joinedkV5_KT01studProgr = eval(kV5_KT01studProgriteracija);
            var joinedkV5_KT01darboTema = eval(kV5_KT01darboTemaiteracija);
            var joinedkV5_KT01uzsakovas = eval(kV5_KT01uzsakovasiteracija);
            foundUser.destytojas.kV5_KT01.push({
              nr: joinedkV5_KT01nr,
              diplomantas: joinedkV5_KT01diplomantas,
              studProgr: joinedkV5_KT01studProgr,
              darboTema: joinedkV5_KT01darboTema,
              uzsakovas: joinedkV5_KT01uzsakovas
            })
          }
          for (let af = 1; af <= parseInt(req.body.yond64); af++) {
            var kV5_KT02nriteracija = kV5_KT02nrcommand + af;
            var kV5_KT02diplomantasiteracija = kV5_KT02diplomantascommand + af;
            var kV5_KT02studProgriteracija = kV5_KT02studProgrcommand + af;
            var kV5_KT02darboTemaiteracija = kV5_KT02darboTemacommand + af;
            var joinedkV5_KT02nr = eval(kV5_KT02nriteracija);
            var joinedkV5_KT02diplomantas = eval(kV5_KT02diplomantasiteracija);
            var joinedkV5_KT02studProgr = eval(kV5_KT02studProgriteracija);
            var joinedkV5_KT02darboTema = eval(kV5_KT02darboTemaiteracija);
            foundUser.destytojas.kV5_KT02.kV5_KT02_array.push({
              nr: joinedkV5_KT02nr,
              diplomantas: joinedkV5_KT02diplomantas,
              studProgr: joinedkV5_KT02studProgr,
              darboTema: joinedkV5_KT02darboTema
            })
          }
          foundUser.destytojas.kV5_KT02.analize = req.body.kV5_KT02analize;
          foundUser.destytojas.katedrosV_isvados = req.body.katedrosV_isvados;
          foundUser.destytojas.katedrosV_rekomendacijos.kontaktD = req.body.kontaktD;
          foundUser.destytojas.katedrosV_rekomendacijos.neKontaktD = req.body.neKontaktD;
          foundUser.destytojas.katedrosV_rekomendacijos.tMTEP_vykdymas = req.body.tMTEP_vykdymas;
          foundUser.destytojas.katedrosV_rekomendacijos.kompTobulinimas = req.body.kompTobulinimas;
        } else if (req.body.ataskaitos_busena == "užrakintaVedėjo") {
          var nrcommand = "req.body.nr";
          var dalykascommand = "req.body.dalykas";
          var grupecommand = "req.body.grupe";
          var semestrascommand = "req.body.semestras";
          var planuotosValcommand = "req.body.planuotosVal";
          var atliktosValcommand = "req.body.atliktosVal";
          var nD2_P01nrcommand = "req.body.nD2_P01nr";
          var nD2_P01veiklPavadcommand = "req.body.nD2_P01veiklPavad";
          var nD2_P01veiklRezultcommand = "req.body.nD2_P01veiklRezult";
          var nD2_M01nrcommand = "req.body.nD2_M01nr";
          var nD2_M01veiklPavadcommand = "req.body.nD2_M01veiklPavad";
          var nD2_M01veiklRezultcommand = "req.body.nD2_M01veiklRezult";
          var nD2_M02nrcommand = "req.body.nD2_M02nr";
          var bibliografAprcommand = "req.body.bibliografApr";
          var tipascommand = "req.body.tipas";
          var mokslSritcommand = "req.body.mokslSrit";
          var mokslKryptcommand = "req.body.mokslKrypt";
          var katedracommand = "req.body.katedra";
          var nD2_M03nrcommand = "req.body.nD2_M03nr";
          var nD2_M03studProgrcommand = "req.body.nD2_M03studProgr";
          var nD2_M03dalykPavadcommand = "req.body.nD2_M03dalykPavad";
          var nD2_M03apimtisKreditcommand = "req.body.nD2_M03apimtisKredit";
          var nD2_M04nrcommand = "req.body.nD2_M04nr";
          var nD2_M04studProgrcommand = "req.body.nD2_M04studProgr";
          var nD2_M04dalykPavadcommand = "req.body.nD2_M04dalykPavad";
          var nD2_M04busenacommand = "req.body.nD2_M04busena";
          var nD2_M04apimtisKreditcommand = "req.body.nD2_M04apimtisKredit";
          var nD2_D01nrcommand = "req.body.nD2_D01nr";
          var nD2_D01komitetascommand = "req.body.nD2_D01komitetas";
          var nD2_D01veiklacommand = "req.body.nD2_D01veikla";
          var nD2_D01rezultataicommand = "req.body.nD2_D01rezultatai";
          var nD2_D02nrcommand = "req.body.nD2_D02nr";
          var nD2_D02studKryptcommand = "req.body.nD2_D02studKrypt";
          var nD2_D02veiklacommand = "req.body.nD2_D02veikla";
          var nD2_D02rezultataicommand = "req.body.nD2_D02rezultatai";
          var nD2_D03nrcommand = "req.body.nD2_D03nr";
          var nD2_D03studProgrcommand = "req.body.nD2_D03studProgr";
          var nD2_D03veiklacommand = "req.body.nD2_D03veikla";
          var nD2_D03rezultataicommand = "req.body.nD2_D03rezultatai";
          var nD2_S01nrcommand = "req.body.nD2_S01nr";
          var nD2_S01veiklacommand = "req.body.nD2_S01veikla";
          var nD2_S01dataVietacommand = "req.body.nD2_S01dataVieta";
          var nD2_Snrcommand = "req.body.nD2_Snr";
          var nD2_Sstiprybescommand = "req.body.nD2_Sstiprybes";
          var nD2_Stobulintinacommand = "req.body.nD2_Stobulintina";
          var tMTEP3_T01nrcommand = "req.body.tMTEP3_T01nr";
          var tyrTematcommand = "req.body.tyrTemat";
          var tyrGrupcommand = "req.body.tyrGrup";
          var tMTEP3_T01mokslSritcommand = "req.body.tMTEP3_T01mokslSrit";
          var tMTEP3_T01mokslKryptcommand = "req.body.tMTEP3_T01mokslKrypt";
          var tMTEP3_T02nrcommand = "req.body.tMTEP3_T02nr";
          var tMTEP3_T02bibliografAprcommand = "req.body.tMTEP3_T02bibliografApr";
          var tMTEP3_T02tipascommand = "req.body.tMTEP3_T02tipas";
          var tMTEP3_T02mokslSritcommand = "req.body.tMTEP3_T02mokslSrit";
          var tMTEP3_T02mokslKryptcommand = "req.body.tMTEP3_T02mokslKrypt";
          var tMTEP3_T02duomBazecommand = "req.body.tMTEP3_T02duomBaze";
          var tMTEP3_T03nrcommand = "req.body.tMTEP3_T03nr";
          var tMTEP3_T03pilnasBiblAprcommand = "req.body.tMTEP3_T03pilnasBiblApr";
          var tMTEP3_T04nrcommand = "req.body.tMTEP3_T04nr";
          var tMTEP3_T04uzsakovascommand = "req.body.tMTEP3_T04uzsakovas";
          var tMTEP3_T04temacommand = "req.body.tMTEP3_T04tema";
          var tMTEP3_T04datacommand = "req.body.tMTEP3_T04data";
          var tMTEP3_T05nrcommand = "req.body.tMTEP3_T05nr";
          var tMTEP3_T05veiklPavadcommand = "req.body.tMTEP3_T05veiklPavad";
          var tMTEP3_T05veiklRezultcommand = "req.body.tMTEP3_T05veiklRezult";
          var tMTEP3_T06nrcommand = "req.body.tMTEP3_T06nr";
          var tMTEP3_T06autoriuscommand = "req.body.tMTEP3_T06autorius";
          var tMTEP3_T06menoSritcommand = "req.body.tMTEP3_T06menoSrit";
          var tMTEP3_T06pobudiscommand = "req.body.tMTEP3_T06pobudis";
          var tMTEP3_T06realizVietacommand = "req.body.tMTEP3_T06realizVieta";
          var tMTEP3_T06datacommand = "req.body.tMTEP3_T06data";
          var tMTEP3_T07nrcommand = "req.body.tMTEP3_T07nr";
          var tMTEP3_T07atlikejascommand = "req.body.tMTEP3_T07atlikejas";
          var tMTEP3_T07menoSritcommand = "req.body.tMTEP3_T07menoSrit";
          var tMTEP3_T07pavadinimascommand = "req.body.tMTEP3_T07pavadinimas";
          var tMTEP3_T07atlikVietacommand = "req.body.tMTEP3_T07atlikVieta";
          var tMTEP3_T07datacommand = "req.body.tMTEP3_T07data";
          var tMTEP3_T08Snrcommand = "req.body.tMTEP3_T08Snr";
          var tMTEP3_T08atlikejascommand = "req.body.tMTEP3_T08atlikejas";
          var tMTEP3_T08menoSritcommand = "req.body.tMTEP3_T08menoSrit";
          var tMTEP3_T08pavadinimascommand = "req.body.tMTEP3_T08pavadinimas";
          var tMTEP3_T08atlikVietacommand = "req.body.tMTEP3_T08atlikVieta";
          var tMTEP3_T08datacommand = "req.body.tMTEP3_T08data";
          var tMTEP3_T09nrcommand = "req.body.tMTEP3_T09nr";
          var tMTEP3_T09atlikejascommand = "req.body.tMTEP3_T09atlikejas";
          var tMTEP3_T09menoSritcommand = "req.body.tMTEP3_T09menoSrit";
          var tMTEP3_T09pavadinimascommand = "req.body.tMTEP3_T09pavadinimas";
          var tMTEP3_T09atlikVietacommand = "req.body.tMTEP3_T09atlikVieta";
          var tMTEP3_T09datacommand = "req.body.tMTEP3_T09data";
          var tMTEP3_T10nrcommand = "req.body.tMTEP3_T10nr";
          var tMTEP3_T10veiklPobudcommand = "req.body.tMTEP3_T10veiklPobud";
          var tMTEP3_T10veiklTikslcommand = "req.body.tMTEP3_T10veiklTiksl";
          var tMTEP3_T10dataVietacommand = "req.body.tMTEP3_T10dataVieta";
          var tMTEP3_T10dalyvSkcommand = "req.body.tMTEP3_T10dalyvSk";
          var tMTEP3_T10ktKomentaraicommand = "req.body.tMTEP3_T10ktKomentarai";
          var tMTEP3_T11nrcommand = "req.body.tMTEP3_T11nr";
          var tMTEP3_T11veiklPobudcommand = "req.body.tMTEP3_T11veiklPobud";
          var tMTEP3_T11veiklTikslcommand = "req.body.tMTEP3_T11veiklTiksl";
          var tMTEP3_T11dataVietacommand = "req.body.tMTEP3_T11dataVieta";
          var tMTEP3_T11dalyvSkcommand = "req.body.tMTEP3_T11dalyvSk";
          var tMTEP3_T11ktKomentaraicommand = "req.body.tMTEP3_T11ktKomentarai";
          var tMTEP3_T12nrcommand = "req.body.tMTEP3_T12nr";
          var tMTEP3_T12veiklPobudcommand = "req.body.tMTEP3_T12veiklPobud";
          var tMTEP3_T12dataVietacommand = "req.body.tMTEP3_T12dataVieta";
          var tMTEP3_T13nrcommand = "req.body.tMTEP3_T13nr";
          var tMTEP3_T13studDuomcommand = "req.body.tMTEP3_T13studDuom";
          var tMTEP3_T13renginioPavadcommand = "req.body.tMTEP3_T13renginioPavad";
          var tMTEP3_T13rezultatascommand = "req.body.tMTEP3_T13rezultatas";
          var tMTEP3_T13datacommand = "req.body.tMTEP3_T13data";
          var tMTEP3_T14nrcommand = "req.body.tMTEP3_T14nr";
          var tMTEP3_T14renginyscommand = "req.body.tMTEP3_T14renginys";
          var tMTEP3_T14veiklPobudcommand = "req.body.tMTEP3_T14veiklPobud";
          var tMTEP3_T14dataVietacommand = "req.body.tMTEP3_T14dataVieta";
          var tMTEP3_Snrcommand = "req.body.tMTEP3_Snr";
          var tMTEP3_Sstiprybescommand = "req.body.tMTEP3_Sstiprybes";
          var tMTEP3_Stobulintinacommand = "req.body.tMTEP3_Stobulintina";
          var kTOV4_KV03nrcommand = "req.body.kTOV4_KV03nr";
          var kTOV4_KV03saliscommand = "req.body.kTOV4_KV03salis";
          var kTOV4_KV03institucijacommand = "req.body.kTOV4_KV03institucija";
          var kTOV4_KV03dalykascommand = "req.body.kTOV4_KV03dalykas";
          var kTOV4_O01_1nrcommand = "req.body.kTOV4_O01_1nr";
          var kTOV4_O01_1veiklPobudcommand = "req.body.kTOV4_O01_1veiklPobud";
          var kTOV4_O01_1isakNrDatacommand = "req.body.kTOV4_O01_1isakNrData";
          var kTOV4_O01_2nrcommand = "req.body.kTOV4_O01_2nr";
          var kTOV4_O01_2veiklPobudcommand = "req.body.kTOV4_O01_2veiklPobud";
          var kTOV4_O01_2dataVietacommand = "req.body.kTOV4_O01_2dataVieta";
          var kTOV4_O01_2dalyvSkcommand = "req.body.kTOV4_O01_2dalyvSk";
          var kTOV4_O01_2ktKomentaraicommand = "req.body.kTOV4_O01_2ktKomentarai";
          var kTOV4_Snrcommand = "req.body.kTOV4_Snr";
          var kTOV4_Sstiprybescommand = "req.body.kTOV4_Sstiprybes";
          var kTOV4_Stobulintinacommand = "req.body.kTOV4_Stobulintina";
          var kV5_KT01nrcommand = "req.body.kV5_KT01nr";
          var kV5_KT01diplomantascommand = "req.body.kV5_KT01diplomantas";
          var kV5_KT01studProgrcommand = "req.body.kV5_KT01studProgr";
          var kV5_KT01darboTemacommand = "req.body.kV5_KT01darboTema";
          var kV5_KT01uzsakovascommand = "req.body.kV5_KT01uzsakovas";
          var kV5_KT02nrcommand = "req.body.kV5_KT02nr";
          var kV5_KT02diplomantascommand = "req.body.kV5_KT02diplomantas";
          var kV5_KT02studProgrcommand = "req.body.kV5_KT02studProgr";
          var kV5_KT02darboTemacommand = "req.body.kV5_KT02darboTema";
          var kTOV4_KV01dalykStazuotespavadcommand = "req.body.kTOV4_KV01dalykStazuotespavad";
          var kTOV4_KV01dalykStazuotespavadcommand = "req.body.kTOV4_KV01dalykStazuotespavad";
          var kTOV4_KV01dalykStazuotespazymNrcommand = "req.body.kTOV4_KV01dalykStazuotespazymNr";
          var kTOV4_KV01dalykStazuotestrukmeValcommand = "req.body.kTOV4_KV01dalykStazuotestrukmeVal";
          var kTOV4_KV01dalykSeminaraipavadcommand = "req.body.kTOV4_KV01dalykSeminaraipavad";
          var kTOV4_KV01dalykSeminaraipazymNrcommand = "req.body.kTOV4_KV01dalykSeminaraipazymNr";
          var kTOV4_KV01dalykSeminaraitrukmeValcommand = "req.body.kTOV4_KV01dalykSeminaraitrukmeVal";
          var kTOV4_KV01dalykKonfpavadcommand = "req.body.kTOV4_KV01dalykKonfpavad";
          var kTOV4_KV01dalykKonfpazymNrcommand = "req.body.kTOV4_KV01dalykKonfpazymNr";
          var kTOV4_KV01dalykKonftrukmeValcommand = "req.body.kTOV4_KV01dalykKonftrukmeVal";
          var kTOV4_KV01dalykKursaipavadcommand = "req.body.kTOV4_KV01dalykKursaipavad";
          var kTOV4_KV01dalykKursaipazymNrcommand = "req.body.kTOV4_KV01dalykKursaipazymNr";
          var kTOV4_KV01dalykKursaitrukmeValcommand = "req.body.kTOV4_KV01dalykKursaitrukmeVal";
          var kTOV4_KV01didakStazuotespavadcommand = "req.body.kTOV4_KV01didakStazuotespavad";
          var kTOV4_KV01didakStazuotespazymNrcommand = "req.body.kTOV4_KV01didakStazuotespazymNr";
          var kTOV4_KV01didakStazuotestrukmeValcommand = "req.body.kTOV4_KV01didakStazuotestrukmeVal";
          var kTOV4_KV01didakSeminaraipavadcommand = "req.body.kTOV4_KV01didakSeminaraipavad";
          var kTOV4_KV01didakSeminaraipazymNrcommand = "req.body.kTOV4_KV01didakSeminaraipazymNr";
          var kTOV4_KV01didakSeminaraitrukmeValcommand = "req.body.kTOV4_KV01didakSeminaraitrukmeVal";
          var kTOV4_KV01didakKonfpavadcommand = "req.body.kTOV4_KV01didakKonfpavad";
          var kTOV4_KV01didakKonfpazymNrcommand = "req.body.kTOV4_KV01didakKonfpazymNr";
          var kTOV4_KV01didakKonftrukmeValcommand = "req.body.kTOV4_KV01didakKonftrukmeVal";
          var kTOV4_KV01didakKursaipavadcommand = "req.body.kTOV4_KV01didakKursaipavad";
          var kTOV4_KV01didakKursaipazymNrcommand = "req.body.kTOV4_KV01didakKursaipazymNr";
          var kTOV4_KV01didakKursaitrukmeValcommand = "req.body.kTOV4_KV01didakKursaitrukmeVal";
          var kTOV4_KV01bendrStazuotespavadcommand = "req.body.kTOV4_KV01bendrStazuotespavad";
          var kTOV4_KV01bendrStazuotespazymNrcommand = "req.body.kTOV4_KV01bendrStazuotespazymNr";
          var kTOV4_KV01bendrStazuotestrukmeValcommand = "req.body.kTOV4_KV01bendrStazuotestrukmeVal";
          var kTOV4_KV01bendrSeminaraipavadcommand = "req.body.kTOV4_KV01bendrSeminaraipavad";
          var kTOV4_KV01bendrSeminaraipazymNrcommand = "req.body.kTOV4_KV01bendrSeminaraipazymNr";
          var kTOV4_KV01bendrSeminaraitrukmeValcommand = "req.body.kTOV4_KV01bendrSeminaraitrukmeVal";
          var kTOV4_KV01bendrKonfpavadcommand = "req.body.kTOV4_KV01bendrKonfpavad";
          var kTOV4_KV01bendrKonfpazymNrcommand = "req.body.kTOV4_KV01bendrKonfpazymNr";
          var kTOV4_KV01bendrKonftrukmeValcommand = "req.body.kTOV4_KV01bendrKonftrukmeVal";
          var kTOV4_KV01bendrKursaipavadcommand = "req.body.kTOV4_KV01bendrKursaipavad";
          var kTOV4_KV01bendrKursaipazymNrcommand = "req.body.kTOV4_KV01bendrKursaipazymNr";
          var kTOV4_KV01bendrKursaitrukmeValcommand = "req.body.kTOV4_KV01bendrKursaitrukmeVal";

          var kTOV4_KV02dalykStazuotespavadcommand = "req.body.kTOV4_KV02dalykStazuotespavad";
          var kTOV4_KV02dalykStazuotespavadcommand = "req.body.kTOV4_KV02dalykStazuotespavad";
          var kTOV4_KV02dalykStazuotespazymNrcommand = "req.body.kTOV4_KV02dalykStazuotespazymNr";
          var kTOV4_KV02dalykStazuotestrukmeValcommand = "req.body.kTOV4_KV02dalykStazuotestrukmeVal";
          var kTOV4_KV02dalykSeminaraipavadcommand = "req.body.kTOV4_KV02dalykSeminaraipavad";
          var kTOV4_KV02dalykSeminaraipazymNrcommand = "req.body.kTOV4_KV02dalykSeminaraipazymNr";
          var kTOV4_KV02dalykSeminaraitrukmeValcommand = "req.body.kTOV4_KV02dalykSeminaraitrukmeVal";
          var kTOV4_KV02dalykKonfpavadcommand = "req.body.kTOV4_KV02dalykKonfpavad";
          var kTOV4_KV02dalykKonfpazymNrcommand = "req.body.kTOV4_KV02dalykKonfpazymNr";
          var kTOV4_KV02dalykKonftrukmeValcommand = "req.body.kTOV4_KV02dalykKonftrukmeVal";
          var kTOV4_KV02dalykKursaipavadcommand = "req.body.kTOV4_KV02dalykKursaipavad";
          var kTOV4_KV02dalykKursaipazymNrcommand = "req.body.kTOV4_KV02dalykKursaipazymNr";
          var kTOV4_KV02dalykKursaitrukmeValcommand = "req.body.kTOV4_KV02dalykKursaitrukmeVal";
          var kTOV4_KV02didakStazuotespavadcommand = "req.body.kTOV4_KV02didakStazuotespavad";
          var kTOV4_KV02didakStazuotespazymNrcommand = "req.body.kTOV4_KV02didakStazuotespazymNr";
          var kTOV4_KV02didakStazuotestrukmeValcommand = "req.body.kTOV4_KV02didakStazuotestrukmeVal";
          var kTOV4_KV02didakSeminaraipavadcommand = "req.body.kTOV4_KV02didakSeminaraipavad";
          var kTOV4_KV02didakSeminaraipazymNrcommand = "req.body.kTOV4_KV02didakSeminaraipazymNr";
          var kTOV4_KV02didakSeminaraitrukmeValcommand = "req.body.kTOV4_KV02didakSeminaraitrukmeVal";
          var kTOV4_KV02didakKonfpavadcommand = "req.body.kTOV4_KV02didakKonfpavad";
          var kTOV4_KV02didakKonfpazymNrcommand = "req.body.kTOV4_KV02didakKonfpazymNr";
          var kTOV4_KV02didakKonftrukmeValcommand = "req.body.kTOV4_KV02didakKonftrukmeVal";
          var kTOV4_KV02didakKursaipavadcommand = "req.body.kTOV4_KV02didakKursaipavad";
          var kTOV4_KV02didakKursaipazymNrcommand = "req.body.kTOV4_KV02didakKursaipazymNr";
          var kTOV4_KV02didakKursaitrukmeValcommand = "req.body.kTOV4_KV02didakKursaitrukmeVal";
          var kTOV4_KV02bendrStazuotespavadcommand = "req.body.kTOV4_KV02bendrStazuotespavad";
          var kTOV4_KV02bendrStazuotespazymNrcommand = "req.body.kTOV4_KV02bendrStazuotespazymNr";
          var kTOV4_KV02bendrStazuotestrukmeValcommand = "req.body.kTOV4_KV02bendrStazuotestrukmeVal";
          var kTOV4_KV02bendrSeminaraipavadcommand = "req.body.kTOV4_KV02bendrSeminaraipavad";
          var kTOV4_KV02bendrSeminaraipazymNrcommand = "req.body.kTOV4_KV02bendrSeminaraipazymNr";
          var kTOV4_KV02bendrSeminaraitrukmeValcommand = "req.body.kTOV4_KV02bendrSeminaraitrukmeVal";
          var kTOV4_KV02bendrKonfpavadcommand = "req.body.kTOV4_KV02bendrKonfpavad";
          var kTOV4_KV02bendrKonfpazymNrcommand = "req.body.kTOV4_KV02bendrKonfpazymNr";
          var kTOV4_KV02bendrKonftrukmeValcommand = "req.body.kTOV4_KV02bendrKonftrukmeVal";
          var kTOV4_KV02bendrKursaipavadcommand = "req.body.kTOV4_KV02bendrKursaipavad";
          var kTOV4_KV02bendrKursaipazymNrcommand = "req.body.kTOV4_KV02bendrKursaipazymNr";
          var kTOV4_KV02bendrKursaitrukmeValcommand = "req.body.kTOV4_KV02bendrKursaitrukmeVal";
          foundUser.destytojas.kD1_K01.kD1_K01_array = new Array();
          foundUser.destytojas.nD2_P01 = new Array();
          foundUser.destytojas.nD2_M01 = new Array();
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
          foundUser.destytojas.kTOV4_KV03 = new Array();
          foundUser.destytojas.kTOV4_S = new Array();
          foundUser.destytojas.kV5_KT01 = new Array();
          foundUser.destytojas.kV5_KT02.kV5_KT02_array = new Array();
          foundUser.destytojas.kTOV4_O01.kTOV4_O01_1 = new Array();
          foundUser.destytojas.kTOV4_O01.kTOV4_O01_2 = new Array();

          foundUser.destytojas.kTOV4_KV01.kTOV4_KV01dalykines_komp.stazuotes = new Array();
          foundUser.destytojas.kTOV4_KV01.kTOV4_KV01dalykines_komp.seminarai = new Array();
          foundUser.destytojas.kTOV4_KV01.kTOV4_KV01dalykines_komp.konferencijos = new Array();
          foundUser.destytojas.kTOV4_KV01.kTOV4_KV01dalykines_komp.kursai = new Array();

          foundUser.destytojas.kTOV4_KV01.kTOV4_KV01didaktines_komp.stazuotes = new Array();
          foundUser.destytojas.kTOV4_KV01.kTOV4_KV01didaktines_komp.seminarai = new Array();
          foundUser.destytojas.kTOV4_KV01.kTOV4_KV01didaktines_komp.konferencijos = new Array();
          foundUser.destytojas.kTOV4_KV01.kTOV4_KV01didaktines_komp.kursai = new Array();

          foundUser.destytojas.kTOV4_KV01.kTOV4_KV01bendrosios_komp.stazuotes = new Array();
          foundUser.destytojas.kTOV4_KV01.kTOV4_KV01bendrosios_komp.seminarai = new Array();
          foundUser.destytojas.kTOV4_KV01.kTOV4_KV01bendrosios_komp.konferencijos = new Array();
          foundUser.destytojas.kTOV4_KV01.kTOV4_KV01bendrosios_komp.kursai = new Array();

          foundUser.destytojas.kTOV4_KV02.kTOV4_KV02dalykines_komp.stazuotes = new Array();
          foundUser.destytojas.kTOV4_KV02.kTOV4_KV02dalykines_komp.seminarai = new Array();
          foundUser.destytojas.kTOV4_KV02.kTOV4_KV02dalykines_komp.konferencijos = new Array();
          foundUser.destytojas.kTOV4_KV02.kTOV4_KV02dalykines_komp.kursai = new Array();

          foundUser.destytojas.kTOV4_KV02.kTOV4_KV02didaktines_komp.stazuotes = new Array();
          foundUser.destytojas.kTOV4_KV02.kTOV4_KV02didaktines_komp.seminarai = new Array();
          foundUser.destytojas.kTOV4_KV02.kTOV4_KV02didaktines_komp.konferencijos = new Array();
          foundUser.destytojas.kTOV4_KV02.kTOV4_KV02didaktines_komp.kursai = new Array();

          foundUser.destytojas.kTOV4_KV02.kTOV4_KV02bendrosios_komp.stazuotes = new Array();
          foundUser.destytojas.kTOV4_KV02.kTOV4_KV02bendrosios_komp.seminarai = new Array();
          foundUser.destytojas.kTOV4_KV02.kTOV4_KV02bendrosios_komp.konferencijos = new Array();
          foundUser.destytojas.kTOV4_KV02.kTOV4_KV02bendrosios_komp.kursai = new Array();

          // foundUser.destytojas.kTOV4_KV01.kTOV4_KV01dalykines_komp.dalyvavoDalyk = false;
          // foundUser.destytojas.kTOV4_KV01.kTOV4_KV01didaktines_komp.dalyvavoDidak = false;
          // foundUser.destytojas.kTOV4_KV01.kTOV4_KV01bendrosios_komp.dalyvavoBendr = false;
          // foundUser.destytojas.kTOV4_KV02.kTOV4_KV02dalykines_komp.dalyvavoDalyk = false;
          // foundUser.destytojas.kTOV4_KV02.kTOV4_KV02didaktines_komp.dalyvavoDidak = false;
          // foundUser.destytojas.kTOV4_KV02.kTOV4_KV02bendrosios_komp.dalyvavoBendr = false;

          foundUser.destytojas.kD1_K01.isVisoValPlan = req.body.kD1_K01isVisoValPlan,
            foundUser.destytojas.kD1_K01.isVisoValAtl = req.body.kD1_K01isVisoValAtl,
            foundUser.destytojas.kD1_K01.isJuSrautaisValPlan = req.body.isJuSrautaisValPlan,
            foundUser.destytojas.kD1_K01.isJuSrautaisValAtl = req.body.isJuSrautaisValAtl,
            foundUser.destytojas.kD1_K01.isJuUzsienioValPlan = req.body.isJuUzsienioValPlan,
            foundUser.destytojas.kD1_K01.isJuUzsienioValAtl = req.body.isJuUzsienioValAtl,
            foundUser.destytojas.kD1_K01.priezastys = req.body.kD1_K01priezastys
          for (let i = 1; i <= parseInt(req.body.yond2); i++) {
            var iteracija = i;
            var nriteracija = nrcommand + iteracija;
            var dalykasiteracija = dalykascommand + iteracija;
            var grupeiteracija = grupecommand + iteracija;
            var semestrasiteracija = semestrascommand + iteracija;
            var planuotosValiteracija = planuotosValcommand + iteracija;
            var atliktosValiteracija = atliktosValcommand + iteracija;
            var joinednr = eval(nriteracija);
            var joineddalykas = eval(dalykasiteracija);
            var joinedgrupe = eval(grupeiteracija);
            var joinedsemestras = eval(semestrasiteracija);
            var joinedplanuotosVal = eval(planuotosValiteracija);
            var joinedatliktosVal = eval(atliktosValiteracija);
            if (joineddalykas != "" || joinedgrupe != "" || joinedsemestras != "" || joinedplanuotosVal != "" || joinedatliktosVal != "") {
              foundUser.destytojas.kD1_K01.kD1_K01_array.push({
                nr: joinednr,
                dalykas: joineddalykas,
                grupe: joinedgrupe,
                semestras: joinedsemestras,
                planuotosVal: joinedplanuotosVal,
                atliktosVal: joinedatliktosVal
              })
            }

          }
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
            foundUser.destytojas.nD2.priezastys = req.body.nD2priezastys,

            foundUser.destytojas.nD2_N01.priezastys = req.body.nD2_N01priezastys


          for (let a = 1; a <= parseInt(req.body.yond4); a++) {
            var iteracija2 = a;
            var nD2_P01nriteracija = nD2_P01nrcommand + iteracija2;
            var nD2_P01veiklPavaditeracija = nD2_P01veiklPavadcommand + iteracija2;
            var nD2_P01veiklRezultiteracija = nD2_P01veiklRezultcommand + iteracija2;
            var joinednr2 = eval(nD2_P01nriteracija);
            var joinednD2_P01veiklPavad = eval(nD2_P01veiklPavaditeracija);
            var joinednD2_P01veiklRezult = eval(nD2_P01veiklRezultiteracija);
            if (joinednD2_P01veiklPavad != "" || joinednD2_P01veiklRezult != "") {
              foundUser.destytojas.nD2_P01.push({
                nr: joinednr2,
                veiklPavad: joinednD2_P01veiklPavad,
                veiklRezult: joinednD2_P01veiklRezult
              })
            }
          }
          for (let b = 1; b <= parseInt(req.body.yond6); b++) {
            var iteracija3 = b;
            var nD2_M01nriteracija = nD2_M01nrcommand + iteracija3;
            var nD2_M01veiklPavaditeracija = nD2_M01veiklPavadcommand + iteracija3;
            var nD2_M01veiklRezultiteracija = nD2_M01veiklRezultcommand + iteracija3;
            var joinednr3 = eval(nD2_M01nriteracija);
            var joinednD2_M01veiklPavad = eval(nD2_M01veiklPavaditeracija);
            var joinednD2_M01veiklRezult = eval(nD2_M01veiklRezultiteracija);
            if (joinednD2_M01veiklPavad != "" || joinednD2_M01veiklRezult != "") {
              foundUser.destytojas.nD2_M01.push({
                nr: joinednr3,
                veiklPavad: joinednD2_M01veiklPavad,
                veiklRezult: joinednD2_M01veiklRezult
              })
            }
          }

          for (let c = 1; c <= parseInt(req.body.yond8); c++) {
            var iteracija4 = c;
            var nD2_M02nriteracija = nD2_M02nrcommand + iteracija4;
            var bibliografApriteracija = bibliografAprcommand + iteracija4;
            var tipasiteracija = tipascommand + iteracija4;
            var mokslSrititeracija = mokslSritcommand + iteracija4;
            var mokslKryptiteracija = mokslKryptcommand + iteracija4;
            var katedraiteracija = katedracommand + iteracija4;
            var joinednD2_M02nr = eval(nD2_M02nriteracija);
            var joinedbibliografApr = eval(bibliografApriteracija);
            var joinedtipas = eval(tipasiteracija);
            var joinedmokslSritit = eval(mokslSrititeracija);
            var joinedmokslKrypt = eval(mokslKryptiteracija);
            var joinedkatedra = eval(katedraiteracija);
            if (joinedbibliografApr != "" || joinedtipas != "" || joinedmokslSritit != "" || joinedmokslKrypt != "" || joinedkatedra != "") {
              foundUser.destytojas.nD2_M02.push({
                nr: joinednD2_M02nr,
                bibliografApr: joinedbibliografApr,
                tipas: joinedtipas,
                mokslSrit: joinedmokslSritit,
                mokslKrypt: joinedmokslKrypt,
                katedra: joinedkatedra
              })
            }
          }
          for (let d = 1; d <= parseInt(req.body.yond10); d++) {
            var iteracija5 = d;
            var nD2_M03nriteracija = nD2_M03nrcommand + iteracija5;
            var nD2_M03studProgriteracija = nD2_M03studProgrcommand + iteracija5;
            var nD2_M03dalykPavaditeracija = nD2_M03dalykPavadcommand + iteracija5;
            var nD2_M03apimtisKredititeracija = nD2_M03apimtisKreditcommand + iteracija5;
            var joinednD2_M03nr = eval(nD2_M03nriteracija);
            var joinednD2_M03studProgr = eval(nD2_M03studProgriteracija);
            var joinednD2_M03dalykPavad = eval(nD2_M03dalykPavaditeracija);
            var joinednD2_M03apimtisKredit = eval(nD2_M03apimtisKredititeracija);
            if (joinednD2_M03studProgr != "" || joinednD2_M03dalykPavad != "" || joinednD2_M03apimtisKredit != "") {
              foundUser.destytojas.nD2_M03.push({
                nr: joinednD2_M03nr,
                studProgr: joinednD2_M03studProgr,
                dalykPavad: joinednD2_M03dalykPavad,
                apimtisKredit: joinednD2_M03apimtisKredit
              })
            }
          }
          for (let e = 1; e <= parseInt(req.body.yond12); e++) {
            var iteracija6 = e;
            var nD2_M04nriteracija = nD2_M04nrcommand + iteracija6;
            var nD2_M04studProgriteracija = nD2_M04studProgrcommand + iteracija6;
            var nD2_M04dalykPavaditeracija = nD2_M04dalykPavadcommand + iteracija6;
            var nD2_M04busenaiteracija = nD2_M04busenacommand + iteracija6;
            var nD2_M04apimtisKredititeracija = nD2_M04apimtisKreditcommand + iteracija6;
            var joinednD2_M04nr = eval(nD2_M04nriteracija);
            var joinednD2_M04studProgr = eval(nD2_M04studProgriteracija);
            var joinednD2_M04dalykPavad = eval(nD2_M04dalykPavaditeracija);
            var joinednD2_M04busena = eval(nD2_M04busenaiteracija);
            var joinednD2_M04apimtisKredit = eval(nD2_M04apimtisKredititeracija);
            if (joinednD2_M04studProgr != "" || joinednD2_M04dalykPavad != "" || joinednD2_M04busena != "" || joinednD2_M04apimtisKredit != "") {
              foundUser.destytojas.nD2_M04.push({
                nr: joinednD2_M04nr,
                studProgr: joinednD2_M04studProgr,
                dalykPavad: joinednD2_M04dalykPavad,
                busena: joinednD2_M04busena,
                apimtisKredit: joinednD2_M04apimtisKredit
              })
            }
          }
          for (let f = 1; f <= parseInt(req.body.yond14); f++) {
            var iteracija7 = f;
            var nD2_D01nriteracija = nD2_D01nrcommand + iteracija7;
            var nD2_D01komitetasiteracija = nD2_D01komitetascommand + iteracija7;
            var nD2_D01veiklaiteracija = nD2_D01veiklacommand + iteracija7;
            var nD2_D01rezultataiiteracija = nD2_D01rezultataicommand + iteracija7;
            var joinednD2_D01nr = eval(nD2_D01nriteracija);
            var joinednD2_D01komitetas = eval(nD2_D01komitetasiteracija);
            var joinednD2_D01veikla = eval(nD2_D01veiklaiteracija);
            var joinednD2_D01rezultatai = eval(nD2_D01rezultataiiteracija);
            if (joinednD2_D01komitetas != "" || joinednD2_D01veikla != "" || joinednD2_D01rezultatai != "") {
              foundUser.destytojas.nD2_D01.push({
                nr: joinednD2_D01nr,
                komitetas: joinednD2_D01komitetas,
                veikla: joinednD2_D01veikla,
                rezultatai: joinednD2_D01rezultatai
              })
            }
          }
          for (let g = 1; g <= parseInt(req.body.yond16); g++) {
            var iteracija8 = g;
            var nD2_D02nriteracija = nD2_D02nrcommand + iteracija8;
            var nD2_D02studKryptiteracija = nD2_D02studKryptcommand + iteracija8;
            var nD2_D02veiklaiteracija = nD2_D02veiklacommand + iteracija8;
            var nD2_D02rezultataiiteracija = nD2_D02rezultataicommand + iteracija8;
            var joinednD2_D02nr = eval(nD2_D02nriteracija);
            var joinednD2_D02studKrypt = eval(nD2_D02studKryptiteracija);
            var joinednD2_D02veikla = eval(nD2_D02veiklaiteracija);
            var joinednD2_D02rezultatai = eval(nD2_D02rezultataiiteracija);
            if (joinednD2_D02studKrypt != "" || joinednD2_D02veikla != "" || joinednD2_D02rezultatai != "") {
              foundUser.destytojas.nD2_D02.push({
                nr: joinednD2_D02nr,
                studKryptis: joinednD2_D02studKrypt,
                veikla: joinednD2_D02veikla,
                rezultatai: joinednD2_D02rezultatai
              })
            }
          }
          for (let h = 1; h <= parseInt(req.body.yond18); h++) {
            var iteracija9 = h;
            var nD2_D03nriteracija = nD2_D03nrcommand + iteracija9;
            var nD2_D03studProgriteracija = nD2_D03studProgrcommand + iteracija9;
            var nD2_D03veiklaiteracija = nD2_D03veiklacommand + iteracija9;
            var nD2_D03rezultataiiteracija = nD2_D03rezultataicommand + iteracija9;
            var joinednD2_D03nr = eval(nD2_D03nriteracija);
            var joinednD2_D03studProgr = eval(nD2_D03studProgriteracija);
            var joinednD2_D03veikla = eval(nD2_D03veiklaiteracija);
            var joinednD2_D03rezultatai = eval(nD2_D03rezultataiiteracija);
            if (joinednD2_D03studProgr != "" || joinednD2_D03veikla != "" || joinednD2_D03rezultatai != "") {
              foundUser.destytojas.nD2_D03.push({
                nr: joinednD2_D03nr,
                studProgr: joinednD2_D03studProgr,
                veikla: joinednD2_D03veikla,
                rezultatai: joinednD2_D03rezultatai
              })
            }
          }
          for (let j = 1; j <= parseInt(req.body.yond20); j++) {
            var iteracija10 = j;
            var nD2_S01nriteracija = nD2_S01nrcommand + iteracija10;
            var nD2_S01veiklaiteracija = nD2_S01veiklacommand + iteracija10;
            var nD2_S01dataVietaiteracija = nD2_S01dataVietacommand + iteracija10;
            var joinednD2_S01nr = eval(nD2_S01nriteracija);
            var joinednD2_S01veikla = eval(nD2_S01veiklaiteracija);
            var joinednD2_S01dataVieta = eval(nD2_S01dataVietaiteracija);
            if (joinednD2_S01veikla != "" || joinednD2_S01dataVieta != "") {
              foundUser.destytojas.nD2_S01.push({
                nr: joinednD2_S01nr,
                veikla: joinednD2_S01veikla,
                dataVieta: joinednD2_S01dataVieta
              })
            }
          }
          for (let k = 1; k <= parseInt(req.body.yond22); k++) {
            var iteracija11 = k;
            var nD2_Snriteracija = nD2_Snrcommand + iteracija11;
            var nD2_Sstiprybesiteracija = nD2_Sstiprybescommand + iteracija11;
            var nD2_Stobulintinaiteracija = nD2_Stobulintinacommand + iteracija11;
            var joinednD2_Snr = eval(nD2_Snriteracija);
            var joinednD2_Sstiprybes = eval(nD2_Sstiprybesiteracija);
            var joinednD2_Stobulintina = eval(nD2_Stobulintinaiteracija);
            if (joinednD2_Sstiprybes != "" || joinednD2_Stobulintina != "") {
              foundUser.destytojas.nD2_S.push({
                nr: joinednD2_Snr,
                stiprybes: joinednD2_Sstiprybes,
                tobulintina: joinednD2_Stobulintina
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

          for (let l = 1; l <= parseInt(req.body.yond24); l++) {
            var iteracija12 = l;
            var tMTEP3_T01nriteracija = tMTEP3_T01nrcommand + iteracija12;
            var tyrTematiteracija = tyrTematcommand + iteracija12;
            var tyrGrupiteracija = tyrGrupcommand + iteracija12;
            var tMTEP3_T01mokslSrititeracija = tMTEP3_T01mokslSritcommand + iteracija12;
            var tMTEP3_T01mokslKryptiteracija = tMTEP3_T01mokslKryptcommand + iteracija12;
            var joinedtMTEP3_T01nr = eval(tMTEP3_T01nriteracija);
            var joinedtyrTemat = eval(tyrTematiteracija);
            var joinedtyrGrup = eval(tyrGrupiteracija);
            var joinedtMTEP3_T01mokslSrit = eval(tMTEP3_T01mokslSrititeracija);
            var joinedtMTEP3_T01mokslKrypt = eval(tMTEP3_T01mokslKryptiteracija);
            if (joinedtyrTemat != "" || joinedtyrGrup != "" || joinedtMTEP3_T01mokslSrit != "" || joinedtMTEP3_T01mokslKrypt != "") {
              foundUser.destytojas.tMTEP3_T01.push({
                nr: joinedtMTEP3_T01nr,
                tyrTemat: joinedtyrTemat,
                tyrGrup: joinedtyrGrup,
                mokslSrit: joinedtMTEP3_T01mokslSrit,
                mokslKrypt: joinedtMTEP3_T01mokslKrypt
              })
            }
          }
          for (let m = 1; m <= parseInt(req.body.yond26); m++) {
            var iteracija13 = m;
            var tMTEP3_T02nriteracija = tMTEP3_T02nrcommand + iteracija13;
            var tMTEP3_T02bibliografApriteracija = tMTEP3_T02bibliografAprcommand + iteracija13;
            var tMTEP3_T02tipasiteracija = tMTEP3_T02tipascommand + iteracija13;
            var tMTEP3_T02mokslSrititeracija = tMTEP3_T02mokslSritcommand + iteracija13;
            var tMTEP3_T02mokslKryptiteracija = tMTEP3_T02mokslKryptcommand + iteracija13;
            var tMTEP3_T02duomBazeiteracija = tMTEP3_T02duomBazecommand + iteracija13;
            var joinedtMTEP3_T02nr = eval(tMTEP3_T02nriteracija);
            var joinedtMTEP3_T02bibliografApr = eval(tMTEP3_T02bibliografApriteracija);
            var joinedtMTEP3_T02tipas = eval(tMTEP3_T02tipasiteracija);
            var joinedtMTEP3_T02mokslSrit = eval(tMTEP3_T02mokslSrititeracija);
            var joinedtMTEP3_T02mokslKrypt = eval(tMTEP3_T02mokslKryptiteracija);
            var joinedtMTEP3_T02duomBaze = eval(tMTEP3_T02duomBazeiteracija);
            if (joinedtMTEP3_T02bibliografApr != "" || joinedtMTEP3_T02tipas != "" || joinedtMTEP3_T02mokslSrit != "" || joinedtMTEP3_T02mokslKrypt != "" || joinedtMTEP3_T02duomBaze != "") {
              foundUser.destytojas.tMTEP3_T02.push({
                nr: joinedtMTEP3_T02nr,
                bibliografApr: joinedtMTEP3_T02bibliografApr,
                tipas: joinedtMTEP3_T02tipas,
                mokslSrit: joinedtMTEP3_T02mokslSrit,
                mokslKrypt: joinedtMTEP3_T02mokslKrypt,
                duomBaze: joinedtMTEP3_T02duomBaze
              })
            }
          }
          for (let n = 1; n <= parseInt(req.body.yond28); n++) {
            var iteracija14 = n;
            var tMTEP3_T03nriteracija = tMTEP3_T03nrcommand + iteracija14;
            var tMTEP3_T03pilnasBiblApriteracija = tMTEP3_T03pilnasBiblAprcommand + iteracija14;
            var joinedtMTEP3_T03nr = eval(tMTEP3_T03nriteracija);
            var joinedtMTEP3_T03pilnasBiblApr = eval(tMTEP3_T03pilnasBiblApriteracija);
            if (joinedtMTEP3_T03pilnasBiblApr != "") {
              foundUser.destytojas.tMTEP3_T03.push({
                nr: joinedtMTEP3_T03nr,
                pilnasBiblApr: joinedtMTEP3_T03pilnasBiblApr
              })
            }
          }
          for (let o = 1; o <= parseInt(req.body.yond30); o++) {
            var tMTEP3_T04nriteracija = tMTEP3_T04nrcommand + o;
            var tMTEP3_T04uzsakovasiteracija = tMTEP3_T04uzsakovascommand + o;
            var tMTEP3_T04temaiteracija = tMTEP3_T04temacommand + o;
            var tMTEP3_T04dataiteracija = tMTEP3_T04datacommand + o;
            var joinedtMTEP3_T04nr = eval(tMTEP3_T04nriteracija);
            var joinedtMTEP3_T04uzsakovas = eval(tMTEP3_T04uzsakovasiteracija);
            var joinedtMTEP3_T04tema = eval(tMTEP3_T04temaiteracija);
            var joinedtMTEP3_T04data = eval(tMTEP3_T04dataiteracija);
            if (joinedtMTEP3_T04uzsakovas != "" || joinedtMTEP3_T04tema != "" || joinedtMTEP3_T04data != "") {
              foundUser.destytojas.tMTEP3_T04.push({
                nr: joinedtMTEP3_T04nr,
                uzsakovas: joinedtMTEP3_T04uzsakovas,
                tema: joinedtMTEP3_T04tema,
                data: joinedtMTEP3_T04data
              })
            }
          }
          for (let p = 1; p <= parseInt(req.body.yond32); p++) {

            var tMTEP3_T05nriteracija = tMTEP3_T05nrcommand + p;
            var tMTEP3_T05veiklPavaditeracija = tMTEP3_T05veiklPavadcommand + p;
            var tMTEP3_T05veiklRezultiteracija = tMTEP3_T05veiklRezultcommand + p;
            var joinedtMTEP3_T05nr = eval(tMTEP3_T05nriteracija);
            var joinedtMTEP3_T05veiklPavad = eval(tMTEP3_T05veiklPavaditeracija);
            var joinedtMTEP3_T05veiklRezult = eval(tMTEP3_T05veiklRezultiteracija);
            if (joinedtMTEP3_T05veiklPavad != "" || joinedtMTEP3_T05veiklRezult != "") {
              foundUser.destytojas.tMTEP3_T05.push({
                nr: joinedtMTEP3_T05nr,
                veiklPavad: joinedtMTEP3_T05veiklPavad,
                veiklRezult: joinedtMTEP3_T05veiklRezult
              })
            }
          }
          for (let q = 1; q <= parseInt(req.body.yond34); q++) {
            var tMTEP3_T06nriteracija = tMTEP3_T06nrcommand + q;
            var tMTEP3_T06autoriusiteracija = tMTEP3_T06autoriuscommand + q;
            var tMTEP3_T06menoSrititeracija = tMTEP3_T06menoSritcommand + q;
            var tMTEP3_T06pobudisiteracija = tMTEP3_T06pobudiscommand + q;
            var tMTEP3_T06realizVietaiteracija = tMTEP3_T06realizVietacommand + q;
            var tMTEP3_T06dataiteracija = tMTEP3_T06datacommand + q;
            var joinedtMTEP3_T06nr = eval(tMTEP3_T06nriteracija);
            var joinedtMTEP3_T06autorius = eval(tMTEP3_T06autoriusiteracija);
            var joinedtMTEP3_T06menoSrit = eval(tMTEP3_T06menoSrititeracija);
            var joinedtMTEP3_T06pobudis = eval(tMTEP3_T06pobudisiteracija);
            var joinedtMTEP3_T06realizVieta = eval(tMTEP3_T06realizVietaiteracija);
            var joinedtMTEP3_T06data = eval(tMTEP3_T06dataiteracija);
            if (joinedtMTEP3_T06autorius != "" || joinedtMTEP3_T06menoSrit != "" || joinedtMTEP3_T06pobudis != "" || joinedtMTEP3_T06realizVieta != "" || joinedtMTEP3_T06data != "") {
              foundUser.destytojas.tMTEP3_T06.push({
                nr: joinedtMTEP3_T06nr,
                autorius: joinedtMTEP3_T06autorius,
                menoSrit: joinedtMTEP3_T06menoSrit,
                pobudis: joinedtMTEP3_T06pobudis,
                realizVieta: joinedtMTEP3_T06realizVieta,
                data: joinedtMTEP3_T06data
              })
            }
          }
          for (let r = 1; r <= parseInt(req.body.yond36); r++) {
            var tMTEP3_T07nriteracija = tMTEP3_T07nrcommand + r;
            var tMTEP3_T07atlikejasiteracija = tMTEP3_T07atlikejascommand + r;
            var tMTEP3_T07menoSrititeracija = tMTEP3_T07menoSritcommand + r;
            var tMTEP3_T07pavadinimasiteracija = tMTEP3_T07pavadinimascommand + r;
            var tMTEP3_T07atlikVietaiteracija = tMTEP3_T07atlikVietacommand + r;
            var tMTEP3_T07dataiteracija = tMTEP3_T07datacommand + r;
            var joinedtMTEP3_T07nr = eval(tMTEP3_T07nriteracija);
            var joinedtMTEP3_T07atlikejas = eval(tMTEP3_T07atlikejasiteracija);
            var joinedtMTEP3_T07menoSrit = eval(tMTEP3_T07menoSrititeracija);
            var joinedtMTEP3_T07pavadinimas = eval(tMTEP3_T07pavadinimasiteracija);
            var joinedtMTEP3_T07atlikVieta = eval(tMTEP3_T07atlikVietaiteracija);
            var joinedtMTEP3_T07data = eval(tMTEP3_T07dataiteracija);
            if (joinedtMTEP3_T07atlikejas != "" || joinedtMTEP3_T07menoSrit != "" || joinedtMTEP3_T07pavadinimas != "" || joinedtMTEP3_T07atlikVieta != "" || joinedtMTEP3_T07data != "") {
              foundUser.destytojas.tMTEP3_T07.push({
                nr: joinedtMTEP3_T07nr,
                atlikejas: joinedtMTEP3_T07atlikejas,
                menoSrit: joinedtMTEP3_T07menoSrit,
                pavadinimas: joinedtMTEP3_T07pavadinimas,
                atlikVieta: joinedtMTEP3_T07atlikVieta,
                data: joinedtMTEP3_T07data
              })
            }
          }
          for (let s = 1; s <= parseInt(req.body.yond38); s++) {
            var tMTEP3_T08Snriteracija = tMTEP3_T08Snrcommand + s;
            var tMTEP3_T08atlikejasiteracija = tMTEP3_T08atlikejascommand + s;
            var tMTEP3_T08menoSrititeracija = tMTEP3_T08menoSritcommand + s;
            var tMTEP3_T08pavadinimasiteracija = tMTEP3_T08pavadinimascommand + s;
            var tMTEP3_T08atlikVietaiteracija = tMTEP3_T08atlikVietacommand + s;
            var tMTEP3_T08dataiteracija = tMTEP3_T08datacommand + s;
            var joinedtMTEP3_T08Snr = eval(tMTEP3_T08Snriteracija);
            var joinedtMTEP3_T08atlikejas = eval(tMTEP3_T08atlikejasiteracija);
            var joinedtMTEP3_T08menoSrit = eval(tMTEP3_T08menoSrititeracija);
            var joinedtMTEP3_T08pavadinimas = eval(tMTEP3_T08pavadinimasiteracija);
            var joinedtMTEP3_T08atlikVieta = eval(tMTEP3_T08atlikVietaiteracija);
            var joinedtMTEP3_T08data = eval(tMTEP3_T08dataiteracija);
            if (joinedtMTEP3_T08atlikejas != "" || joinedtMTEP3_T08menoSrit != "" || joinedtMTEP3_T08pavadinimas != "" || joinedtMTEP3_T08atlikVieta != "" || joinedtMTEP3_T08data != "") {
              foundUser.destytojas.tMTEP3_T08.push({
                nr: joinedtMTEP3_T08Snr,
                atlikejas: joinedtMTEP3_T08atlikejas,
                menoSrit: joinedtMTEP3_T08menoSrit,
                pavadinimas: joinedtMTEP3_T08pavadinimas,
                atlikVieta: joinedtMTEP3_T08atlikVieta,
                data: joinedtMTEP3_T08data
              })
            }
          }
          for (let t = 1; t <= parseInt(req.body.yond40); t++) {
            var tMTEP3_T09nriteracija = tMTEP3_T09nrcommand + t;
            var tMTEP3_T09atlikejasiteracija = tMTEP3_T09atlikejascommand + t;
            var tMTEP3_T09menoSrititeracija = tMTEP3_T09menoSritcommand + t;
            var tMTEP3_T09pavadinimasiteracija = tMTEP3_T09pavadinimascommand + t;
            var tMTEP3_T09atlikVietaiteracija = tMTEP3_T09atlikVietacommand + t;
            var tMTEP3_T09dataiteracija = tMTEP3_T09datacommand + t;
            var joinedtMTEP3_T09nr = eval(tMTEP3_T09nriteracija);
            var joinedtMTEP3_T09atlikejas = eval(tMTEP3_T09atlikejasiteracija);
            var joinedtMTEP3_T09menoSrit = eval(tMTEP3_T09menoSrititeracija);
            var joinedtMTEP3_T09pavadinimas = eval(tMTEP3_T09pavadinimasiteracija);
            var joinedtMTEP3_T09atlikVieta = eval(tMTEP3_T09atlikVietaiteracija);
            var joinedtMTEP3_T09data = eval(tMTEP3_T09dataiteracija);
            if (joinedtMTEP3_T09atlikejas != "" || joinedtMTEP3_T09menoSrit != "" || joinedtMTEP3_T09pavadinimas != "" || joinedtMTEP3_T09atlikVieta != "" || joinedtMTEP3_T09data != "") {
              foundUser.destytojas.tMTEP3_T09.push({
                nr: joinedtMTEP3_T09nr,
                atlikejas: joinedtMTEP3_T09atlikejas,
                menoSrit: joinedtMTEP3_T09menoSrit,
                pavadinimas: joinedtMTEP3_T09pavadinimas,
                atlikVieta: joinedtMTEP3_T09atlikVieta,
                data: joinedtMTEP3_T09data
              })
            }
          }
          for (let u = 1; u <= parseInt(req.body.yond42); u++) {
            var tMTEP3_T10nriteracija = tMTEP3_T10nrcommand + u;
            var tMTEP3_T10veiklPobuditeracija = tMTEP3_T10veiklPobudcommand + u;
            var tMTEP3_T10veiklTiksliteracija = tMTEP3_T10veiklTikslcommand + u;
            var tMTEP3_T10dataVietaiteracija = tMTEP3_T10dataVietacommand + u;
            var tMTEP3_T10dalyvSkiteracija = tMTEP3_T10dalyvSkcommand + u;
            var tMTEP3_T10ktKomentaraiiteracija = tMTEP3_T10ktKomentaraicommand + u;
            var joinedtMTEP3_T10nr = eval(tMTEP3_T10nriteracija);
            var joinedtMTEP3_T10veiklPobud = eval(tMTEP3_T10veiklPobuditeracija);
            var joinedtMTEP3_T10veiklTiksl = eval(tMTEP3_T10veiklTiksliteracija);
            var joinedtMTEP3_T10dataVieta = eval(tMTEP3_T10dataVietaiteracija);
            var joinedtMTEP3_T10dalyvSk = eval(tMTEP3_T10dalyvSkiteracija);
            var joinedtMTEP3_T10ktKomentarai = eval(tMTEP3_T10ktKomentaraiiteracija);
            if (joinedtMTEP3_T10veiklPobud != "" || joinedtMTEP3_T10veiklTiksl != "" || joinedtMTEP3_T10dataVieta != "" || joinedtMTEP3_T10dalyvSk != "" || joinedtMTEP3_T10ktKomentarai != "") {
              foundUser.destytojas.tMTEP3_T10.push({
                nr: joinedtMTEP3_T10nr,
                veiklPobud: joinedtMTEP3_T10veiklPobud,
                veiklTiksl: joinedtMTEP3_T10veiklTiksl,
                dataVieta: joinedtMTEP3_T10dataVieta,
                dalyvSk: joinedtMTEP3_T10dalyvSk,
                ktKomentarai: joinedtMTEP3_T10ktKomentarai
              })
            }
          }
          for (let v = 1; v <= parseInt(req.body.yond44); v++) {
            var tMTEP3_T11nriteracija = tMTEP3_T11nrcommand + v;
            var tMTEP3_T11veiklPobuditeracija = tMTEP3_T11veiklPobudcommand + v;
            var tMTEP3_T11veiklTiksliteracija = tMTEP3_T11veiklTikslcommand + v;
            var tMTEP3_T11dataVietaiteracija = tMTEP3_T11dataVietacommand + v;
            var tMTEP3_T11dalyvSkiteracija = tMTEP3_T11dalyvSkcommand + v;
            var tMTEP3_T11ktKomentaraiiteracija = tMTEP3_T11ktKomentaraicommand + v;
            var joinedtMTEP3_T11nr = eval(tMTEP3_T11nriteracija);
            var joinedtMTEP3_T11veiklPobud = eval(tMTEP3_T11veiklPobuditeracija);
            var joinedtMTEP3_T11veiklTiksl = eval(tMTEP3_T11veiklTiksliteracija);
            var joinedtMTEP3_T11dataVieta = eval(tMTEP3_T11dataVietaiteracija);
            var joinedtMTEP3_T11dalyvSk = eval(tMTEP3_T11dalyvSkiteracija);
            var joinedtMTEP3_T11ktKomentarai = eval(tMTEP3_T11ktKomentaraiiteracija);
            if (joinedtMTEP3_T11veiklPobud != "" || joinedtMTEP3_T11veiklTiksl != "" || joinedtMTEP3_T11dataVieta != "" || joinedtMTEP3_T11dalyvSk != "" || joinedtMTEP3_T11ktKomentarai != "") {
              foundUser.destytojas.tMTEP3_T11.push({
                nr: joinedtMTEP3_T11nr,
                veiklPobud: joinedtMTEP3_T11veiklPobud,
                veiklTiksl: joinedtMTEP3_T11veiklTiksl,
                dataVieta: joinedtMTEP3_T11dataVieta,
                dalyvSk: joinedtMTEP3_T11dalyvSk,
                ktKomentarai: joinedtMTEP3_T11ktKomentarai
              })
            }
          }
          for (let w = 1; w <= parseInt(req.body.yond46); w++) {
            var tMTEP3_T12nriteracija = tMTEP3_T12nrcommand + w;
            var tMTEP3_T12veiklPobuditeracija = tMTEP3_T12veiklPobudcommand + w;
            var tMTEP3_T12dataVietaiteracija = tMTEP3_T12dataVietacommand + w;
            var joinedtMTEP3_T12nr = eval(tMTEP3_T12nriteracija);
            var joinedtMTEP3_T12veiklPobud = eval(tMTEP3_T12veiklPobuditeracija);
            var joinedtMTEP3_T12dataVieta = eval(tMTEP3_T12dataVietaiteracija);
            if (joinedtMTEP3_T12veiklPobud != "" || joinedtMTEP3_T12dataVieta != "") {
              foundUser.destytojas.tMTEP3_T12.push({
                nr: joinedtMTEP3_T12nr,
                veiklPobud: joinedtMTEP3_T12veiklPobud,
                dataVieta: joinedtMTEP3_T12dataVieta
              })
            }
          }
          for (let x = 1; x <= parseInt(req.body.yond48); x++) {
            var tMTEP3_T13nriteracija = tMTEP3_T13nrcommand + x;
            var tMTEP3_T13studDuomiteracija = tMTEP3_T13studDuomcommand + x;
            var tMTEP3_T13renginioPavaditeracija = tMTEP3_T13renginioPavadcommand + x;
            var tMTEP3_T13rezultatasiteracija = tMTEP3_T13rezultatascommand + x;
            var tMTEP3_T13dataiteracija = tMTEP3_T13datacommand + x;
            var joinedtMTEP3_T13nr = eval(tMTEP3_T13nriteracija);
            var joinedtMTEP3_T13studDuom = eval(tMTEP3_T13studDuomiteracija);
            var joinedtMTEP3_T13renginioPavad = eval(tMTEP3_T13renginioPavaditeracija);
            var joinedtMTEP3_T13rezultatas = eval(tMTEP3_T13rezultatasiteracija);
            var joinedtMTEP3_T13data = eval(tMTEP3_T13dataiteracija);
            if (joinedtMTEP3_T13studDuom != "" || joinedtMTEP3_T13renginioPavad != "" || joinedtMTEP3_T13rezultatas != "" || joinedtMTEP3_T13data != "") {
              foundUser.destytojas.tMTEP3_T13.push({
                nr: joinedtMTEP3_T13nr,
                studDuom: joinedtMTEP3_T13studDuom,
                renginioPavad: joinedtMTEP3_T13renginioPavad,
                rezultatas: joinedtMTEP3_T13rezultatas,
                data: joinedtMTEP3_T13data
              })
            }
          }
          for (let y = 1; y <= parseInt(req.body.yond50); y++) {
            var tMTEP3_T14nriteracija = tMTEP3_T14nrcommand + y;
            var tMTEP3_T14renginysiteracija = tMTEP3_T14renginyscommand + y;
            var tMTEP3_T14veiklPobuditeracija = tMTEP3_T14veiklPobudcommand + y;
            var tMTEP3_T14dataVietaiteracija = tMTEP3_T14dataVietacommand + y;
            var joinedtMTEP3_T14nr = eval(tMTEP3_T14nriteracija);
            var joinedtMTEP3_T14renginys = eval(tMTEP3_T14renginysiteracija);
            var joinedtMTEP3_T14veiklPobud = eval(tMTEP3_T14veiklPobuditeracija);
            var joinedtMTEP3_T14dataVieta = eval(tMTEP3_T14dataVietaiteracija);
            if (joinedtMTEP3_T14renginys != "" || joinedtMTEP3_T14veiklPobud != "" || joinedtMTEP3_T14dataVieta != "") {
              foundUser.destytojas.tMTEP3_T14.push({
                nr: joinedtMTEP3_T14nr,
                renginys: joinedtMTEP3_T14renginys,
                veiklPobud: joinedtMTEP3_T14veiklPobud,
                dataVieta: joinedtMTEP3_T14dataVieta
              })
            }
          }
          for (let z = 1; z <= parseInt(req.body.yond52); z++) {
            var tMTEP3_Snriteracija = tMTEP3_Snrcommand + z;
            var tMTEP3_Sstiprybesiteracija = tMTEP3_Sstiprybescommand + z;
            var tMTEP3_Stobulintinaiteracija = tMTEP3_Stobulintinacommand + z;
            var joinedtMTEP3_Snr = eval(tMTEP3_Snriteracija);
            var joinedtMTEP3_Sstiprybes = eval(tMTEP3_Sstiprybesiteracija);
            var joinedtMTEP3_Stobulintina = eval(tMTEP3_Stobulintinaiteracija);
            if (joinedtMTEP3_Sstiprybes != "" || joinedtMTEP3_Stobulintina != "") {
              foundUser.destytojas.tMTEP3_S.push({
                nr: joinedtMTEP3_Snr,
                stiprybes: joinedtMTEP3_Sstiprybes,
                tobulintina: joinedtMTEP3_Stobulintina
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

          for (let aa = 1; aa <= parseInt(req.body.yond54); aa++) {
            var kTOV4_KV03nriteracija = kTOV4_KV03nrcommand + aa;
            var kTOV4_KV03salisiteracija = kTOV4_KV03saliscommand + aa;
            var kTOV4_KV03institucijaiteracija = kTOV4_KV03institucijacommand + aa;
            var kTOV4_KV03dalykasiteracija = kTOV4_KV03dalykascommand + aa;
            var joinedkTOV4_KV03nr = eval(kTOV4_KV03nriteracija);
            var joinedkTOV4_KV03salis = eval(kTOV4_KV03salisiteracija);
            var joinedkTOV4_KV03institucija = eval(kTOV4_KV03institucijaiteracija);
            var joinedkTOV4_KV03dalykas = eval(kTOV4_KV03dalykasiteracija);
            if (joinedkTOV4_KV03salis != "" || joinedkTOV4_KV03institucija != "" || joinedkTOV4_KV03dalykas != "") {
              foundUser.destytojas.kTOV4_KV03.push({
                nr: joinedkTOV4_KV03nr,
                salis: joinedkTOV4_KV03salis,
                institucija: joinedkTOV4_KV03institucija,
                dalykas: joinedkTOV4_KV03dalykas
              })
            }
          }
          for (let ab = 1; ab <= parseInt(req.body.yond56); ab++) {
            var kTOV4_O01_1nriteracija = kTOV4_O01_1nrcommand + ab;
            var kTOV4_O01_1veiklPobuditeracija = kTOV4_O01_1veiklPobudcommand + ab;
            var kTOV4_O01_1isakNrDataiteracija = kTOV4_O01_1isakNrDatacommand + ab;
            var joinedkTOV4_O01_1nr = eval(kTOV4_O01_1nriteracija);
            var joinedkTOV4_O01_1veiklPobud = eval(kTOV4_O01_1veiklPobuditeracija);
            var joinedkTOV4_O01_1isakNrData = eval(kTOV4_O01_1isakNrDataiteracija);
            if (joinedkTOV4_O01_1veiklPobud != "" || joinedkTOV4_O01_1isakNrData != "") {
              foundUser.destytojas.kTOV4_O01.kTOV4_O01_1.push({
                nr: joinedkTOV4_O01_1nr,
                veiklPobud: joinedkTOV4_O01_1veiklPobud,
                isakNrData: joinedkTOV4_O01_1isakNrData
              })
            }
          }
          for (let ac = 1; ac <= parseInt(req.body.yond58); ac++) {
            var kTOV4_O01_2nriteracija = kTOV4_O01_2nrcommand + ac;
            var kTOV4_O01_2veiklPobuditeracija = kTOV4_O01_2veiklPobudcommand + ac;
            var kTOV4_O01_2dataVietaiteracija = kTOV4_O01_2dataVietacommand + ac;
            var kTOV4_O01_2dalyvSkiteracija = kTOV4_O01_2dalyvSkcommand + ac;
            var kTOV4_O01_2ktKomentaraiiteracija = kTOV4_O01_2ktKomentaraicommand + ac;
            var joinedkTOV4_O01_2nr = eval(kTOV4_O01_2nriteracija);
            var joinedkTOV4_O01_2veiklPobud = eval(kTOV4_O01_2veiklPobuditeracija);
            var joinedkTOV4_O01_2dataVieta = eval(kTOV4_O01_2dataVietaiteracija);
            var joinedkTOV4_O01_2dalyvSk = eval(kTOV4_O01_2dalyvSkiteracija);
            var joinedkTOV4_O01_2ktKomentarai = eval(kTOV4_O01_2ktKomentaraiiteracija);
            if (joinedkTOV4_O01_2veiklPobud != "" || joinedkTOV4_O01_2dataVieta != "" || joinedkTOV4_O01_2dalyvSk != "" || joinedkTOV4_O01_2ktKomentarai != "") {
              foundUser.destytojas.kTOV4_O01.kTOV4_O01_2.push({
                nr: joinedkTOV4_O01_2nr,
                veiklPobud: joinedkTOV4_O01_2veiklPobud,
                dataVieta: joinedkTOV4_O01_2dataVieta,
                dalyvSk: joinedkTOV4_O01_2dalyvSk,
                ktKomentarai: joinedkTOV4_O01_2ktKomentarai
              })
            }
          }
          for (let ad = 1; ad <= parseInt(req.body.yond60); ad++) {
            var kTOV4_Snriteracija = kTOV4_Snrcommand + ad;
            var kTOV4_Sstiprybesiteracija = kTOV4_Sstiprybescommand + ad;
            var kTOV4_Stobulintinaiteracija = kTOV4_Stobulintinacommand + ad;
            var joinedkTOV4_Snr = eval(kTOV4_Snriteracija);
            var joinedkTOV4_Sstiprybes = eval(kTOV4_Sstiprybesiteracija);
            var joinedkTOV4_Stobulintina = eval(kTOV4_Stobulintinaiteracija);
            if (joinedkTOV4_Sstiprybes != "" || joinedkTOV4_Stobulintina != "") {
              foundUser.destytojas.kTOV4_S.push({
                nr: joinedkTOV4_Snr,
                stiprybes: joinedkTOV4_Sstiprybes,
                tobulintina: joinedkTOV4_Stobulintina
              })
            }
          }
          for (let ae = 1; ae <= parseInt(req.body.yond62); ae++) {
            var kV5_KT01nriteracija = kV5_KT01nrcommand + ae;
            var kV5_KT01diplomantasiteracija = kV5_KT01diplomantascommand + ae;
            var kV5_KT01studProgriteracija = kV5_KT01studProgrcommand + ae;
            var kV5_KT01darboTemaiteracija = kV5_KT01darboTemacommand + ae;
            var kV5_KT01uzsakovasiteracija = kV5_KT01uzsakovascommand + ae;
            var joinedkV5_KT01nr = eval(kV5_KT01nriteracija);
            var joinedkV5_KT01diplomantas = eval(kV5_KT01diplomantasiteracija);
            var joinedkV5_KT01studProgr = eval(kV5_KT01studProgriteracija);
            var joinedkV5_KT01darboTema = eval(kV5_KT01darboTemaiteracija);
            var joinedkV5_KT01uzsakovas = eval(kV5_KT01uzsakovasiteracija);
            if (joinedkV5_KT01diplomantas != "" || joinedkV5_KT01studProgr != "" || joinedkV5_KT01darboTema != "" || joinedkV5_KT01uzsakovas != "") {
              foundUser.destytojas.kV5_KT01.push({
                nr: joinedkV5_KT01nr,
                diplomantas: joinedkV5_KT01diplomantas,
                studProgr: joinedkV5_KT01studProgr,
                darboTema: joinedkV5_KT01darboTema,
                uzsakovas: joinedkV5_KT01uzsakovas
              })
            }
          }
          for (let af = 1; af <= parseInt(req.body.yond64); af++) {
            var kV5_KT02nriteracija = kV5_KT02nrcommand + af;
            var kV5_KT02diplomantasiteracija = kV5_KT02diplomantascommand + af;
            var kV5_KT02studProgriteracija = kV5_KT02studProgrcommand + af;
            var kV5_KT02darboTemaiteracija = kV5_KT02darboTemacommand + af;
            var joinedkV5_KT02nr = eval(kV5_KT02nriteracija);
            var joinedkV5_KT02diplomantas = eval(kV5_KT02diplomantasiteracija);
            var joinedkV5_KT02studProgr = eval(kV5_KT02studProgriteracija);
            var joinedkV5_KT02darboTema = eval(kV5_KT02darboTemaiteracija);
            if (joinedkV5_KT02diplomantas != "" || joinedkV5_KT02studProgr != "" || joinedkV5_KT02darboTema != "") {
              foundUser.destytojas.kV5_KT02.kV5_KT02_array.push({
                nr: joinedkV5_KT02nr,
                diplomantas: joinedkV5_KT02diplomantas,
                studProgr: joinedkV5_KT02studProgr,
                darboTema: joinedkV5_KT02darboTema
              })
            }
          }
          foundUser.destytojas.kV5_KT02.analize = req.body.kV5_KT02analize;
          foundUser.destytojas.katedrosV_isvados = req.body.katedrosV_isvados;
          foundUser.destytojas.katedrosV_rekomendacijos.kontaktD = req.body.kontaktD;
          foundUser.destytojas.katedrosV_rekomendacijos.neKontaktD = req.body.neKontaktD;
          foundUser.destytojas.katedrosV_rekomendacijos.tMTEP_vykdymas = req.body.tMTEP_vykdymas;
          foundUser.destytojas.katedrosV_rekomendacijos.kompTobulinimas = req.body.kompTobulinimas;
          foundUser.destytojas.kV5_KT02.analize = req.body.kV5_KT02analize,
            //
            foundUser.busena = req.body.ataskaitos_busena

          // User.findById(req.user.id, function(err, loggedUser) {
          //   if (err) {
          //     console.log(err);
          //   } else {
          //     foundUser.updated_for = loggedUser._id
          //   }
          // });


        }
        foundUser.updated_for = req.user.id
        //console.log(req.user.id);

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

// app.post("/delete", function(req, res) {
//
//       User.findById(req.body.id, function(err, foundUser) {
//         if (err) {
//           console.log(err);
//         } else {
//           if (foundUser) {
//
//             User.deleteOne({
//                 _id: req.body.deleteById
//               },
//               function(err) {
//                 if (!err) {
//                   foundUser.updated_for = req.user.id
//                   foundUser.save(function(err) {
//                     if (!err) {
//                       res.redirect("/admin-users-list");
//                     }
//                   });
//                 } else {
//                   console.log("Does'f found");
//                 }
//                 res.redirect("/admin-users-list");
//               } else {
//                 res.send(err);
//               }
//             }
//           );
//
//         }
//       });


// foundUser.updated_for = req.user.id
// foundUser.save(function(err) {
//   if (!err) {
//     res.redirect("/dep-lecturers-list");
//   }
// });

// });

app.post("/update-profile-admin", function(req, res) {
  if (req.isAuthenticated()) {

    User.findById(req.user.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          foundUser.vardas = req.body.vardas,
            foundUser.pavarde = req.body.pavarde,
            foundUser.updated_for = req.user.id //id- savo id paimti

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
          foundUser.updated_for = req.user._id //id- prisijungusio userio id paimti iš DB reikia _id

        // User.findById(req.user.id, function(err, loggedUser) {
        //   if (err) {
        //     console.log(err);
        //   } else {
        //     foundUser.updated_for = loggedUser._id
        //   }
        // });

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

app.post("/update-report-lec-admin", (req, res) => {

  User.findById(req.body.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        var nrcommand = "req.body.nr";
        var dalykascommand = "req.body.dalykas";
        var grupecommand = "req.body.grupe";
        var semestrascommand = "req.body.semestras";
        var planuotosValcommand = "req.body.planuotosVal";
        var atliktosValcommand = "req.body.atliktosVal";
        var nD2_P01nrcommand = "req.body.nD2_P01nr";
        var nD2_P01veiklPavadcommand = "req.body.nD2_P01veiklPavad";
        var nD2_P01veiklRezultcommand = "req.body.nD2_P01veiklRezult";
        var nD2_M01nrcommand = "req.body.nD2_M01nr";
        var nD2_M01veiklPavadcommand = "req.body.nD2_M01veiklPavad";
        var nD2_M01veiklRezultcommand = "req.body.nD2_M01veiklRezult";
        var nD2_M02nrcommand = "req.body.nD2_M02nr";
        var bibliografAprcommand = "req.body.bibliografApr";
        var tipascommand = "req.body.tipas";
        var mokslSritcommand = "req.body.mokslSrit";
        var mokslKryptcommand = "req.body.mokslKrypt";
        var katedracommand = "req.body.katedra";
        var nD2_M03nrcommand = "req.body.nD2_M03nr";
        var nD2_M03studProgrcommand = "req.body.nD2_M03studProgr";
        var nD2_M03dalykPavadcommand = "req.body.nD2_M03dalykPavad";
        var nD2_M03apimtisKreditcommand = "req.body.nD2_M03apimtisKredit";
        var nD2_M04nrcommand = "req.body.nD2_M04nr";
        var nD2_M04studProgrcommand = "req.body.nD2_M04studProgr";
        var nD2_M04dalykPavadcommand = "req.body.nD2_M04dalykPavad";
        var nD2_M04busenacommand = "req.body.nD2_M04busena";
        var nD2_M04apimtisKreditcommand = "req.body.nD2_M04apimtisKredit";
        var nD2_D01nrcommand = "req.body.nD2_D01nr";
        var nD2_D01komitetascommand = "req.body.nD2_D01komitetas";
        var nD2_D01veiklacommand = "req.body.nD2_D01veikla";
        var nD2_D01rezultataicommand = "req.body.nD2_D01rezultatai";
        var nD2_D02nrcommand = "req.body.nD2_D02nr";
        var nD2_D02studKryptcommand = "req.body.nD2_D02studKrypt";
        var nD2_D02veiklacommand = "req.body.nD2_D02veikla";
        var nD2_D02rezultataicommand = "req.body.nD2_D02rezultatai";
        var nD2_D03nrcommand = "req.body.nD2_D03nr";
        var nD2_D03studProgrcommand = "req.body.nD2_D03studProgr";
        var nD2_D03veiklacommand = "req.body.nD2_D03veikla";
        var nD2_D03rezultataicommand = "req.body.nD2_D03rezultatai";
        var nD2_S01nrcommand = "req.body.nD2_S01nr";
        var nD2_S01veiklacommand = "req.body.nD2_S01veikla";
        var nD2_S01dataVietacommand = "req.body.nD2_S01dataVieta";
        var nD2_Snrcommand = "req.body.nD2_Snr";
        var nD2_Sstiprybescommand = "req.body.nD2_Sstiprybes";
        var nD2_Stobulintinacommand = "req.body.nD2_Stobulintina";
        var tMTEP3_T01nrcommand = "req.body.tMTEP3_T01nr";
        var tyrTematcommand = "req.body.tyrTemat";
        var tyrGrupcommand = "req.body.tyrGrup";
        var tMTEP3_T01mokslSritcommand = "req.body.tMTEP3_T01mokslSrit";
        var tMTEP3_T01mokslKryptcommand = "req.body.tMTEP3_T01mokslKrypt";
        var tMTEP3_T02nrcommand = "req.body.tMTEP3_T02nr";
        var tMTEP3_T02bibliografAprcommand = "req.body.tMTEP3_T02bibliografApr";
        var tMTEP3_T02tipascommand = "req.body.tMTEP3_T02tipas";
        var tMTEP3_T02mokslSritcommand = "req.body.tMTEP3_T02mokslSrit";
        var tMTEP3_T02mokslKryptcommand = "req.body.tMTEP3_T02mokslKrypt";
        var tMTEP3_T02duomBazecommand = "req.body.tMTEP3_T02duomBaze";
        var tMTEP3_T03nrcommand = "req.body.tMTEP3_T03nr";
        var tMTEP3_T03pilnasBiblAprcommand = "req.body.tMTEP3_T03pilnasBiblApr";
        var tMTEP3_T04nrcommand = "req.body.tMTEP3_T04nr";
        var tMTEP3_T04uzsakovascommand = "req.body.tMTEP3_T04uzsakovas";
        var tMTEP3_T04temacommand = "req.body.tMTEP3_T04tema";
        var tMTEP3_T04datacommand = "req.body.tMTEP3_T04data";
        var tMTEP3_T05nrcommand = "req.body.tMTEP3_T05nr";
        var tMTEP3_T05veiklPavadcommand = "req.body.tMTEP3_T05veiklPavad";
        var tMTEP3_T05veiklRezultcommand = "req.body.tMTEP3_T05veiklRezult";
        var tMTEP3_T06nrcommand = "req.body.tMTEP3_T06nr";
        var tMTEP3_T06autoriuscommand = "req.body.tMTEP3_T06autorius";
        var tMTEP3_T06menoSritcommand = "req.body.tMTEP3_T06menoSrit";
        var tMTEP3_T06pobudiscommand = "req.body.tMTEP3_T06pobudis";
        var tMTEP3_T06realizVietacommand = "req.body.tMTEP3_T06realizVieta";
        var tMTEP3_T06datacommand = "req.body.tMTEP3_T06data";
        var tMTEP3_T07nrcommand = "req.body.tMTEP3_T07nr";
        var tMTEP3_T07atlikejascommand = "req.body.tMTEP3_T07atlikejas";
        var tMTEP3_T07menoSritcommand = "req.body.tMTEP3_T07menoSrit";
        var tMTEP3_T07pavadinimascommand = "req.body.tMTEP3_T07pavadinimas";
        var tMTEP3_T07atlikVietacommand = "req.body.tMTEP3_T07atlikVieta";
        var tMTEP3_T07datacommand = "req.body.tMTEP3_T07data";
        var tMTEP3_T08Snrcommand = "req.body.tMTEP3_T08Snr";
        var tMTEP3_T08atlikejascommand = "req.body.tMTEP3_T08atlikejas";
        var tMTEP3_T08menoSritcommand = "req.body.tMTEP3_T08menoSrit";
        var tMTEP3_T08pavadinimascommand = "req.body.tMTEP3_T08pavadinimas";
        var tMTEP3_T08atlikVietacommand = "req.body.tMTEP3_T08atlikVieta";
        var tMTEP3_T08datacommand = "req.body.tMTEP3_T08data";
        var tMTEP3_T09nrcommand = "req.body.tMTEP3_T09nr";
        var tMTEP3_T09atlikejascommand = "req.body.tMTEP3_T09atlikejas";
        var tMTEP3_T09menoSritcommand = "req.body.tMTEP3_T09menoSrit";
        var tMTEP3_T09pavadinimascommand = "req.body.tMTEP3_T09pavadinimas";
        var tMTEP3_T09atlikVietacommand = "req.body.tMTEP3_T09atlikVieta";
        var tMTEP3_T09datacommand = "req.body.tMTEP3_T09data";
        var tMTEP3_T10nrcommand = "req.body.tMTEP3_T10nr";
        var tMTEP3_T10veiklPobudcommand = "req.body.tMTEP3_T10veiklPobud";
        var tMTEP3_T10veiklTikslcommand = "req.body.tMTEP3_T10veiklTiksl";
        var tMTEP3_T10dataVietacommand = "req.body.tMTEP3_T10dataVieta";
        var tMTEP3_T10dalyvSkcommand = "req.body.tMTEP3_T10dalyvSk";
        var tMTEP3_T10ktKomentaraicommand = "req.body.tMTEP3_T10ktKomentarai";
        var tMTEP3_T11nrcommand = "req.body.tMTEP3_T11nr";
        var tMTEP3_T11veiklPobudcommand = "req.body.tMTEP3_T11veiklPobud";
        var tMTEP3_T11veiklTikslcommand = "req.body.tMTEP3_T11veiklTiksl";
        var tMTEP3_T11dataVietacommand = "req.body.tMTEP3_T11dataVieta";
        var tMTEP3_T11dalyvSkcommand = "req.body.tMTEP3_T11dalyvSk";
        var tMTEP3_T11ktKomentaraicommand = "req.body.tMTEP3_T11ktKomentarai";
        var tMTEP3_T12nrcommand = "req.body.tMTEP3_T12nr";
        var tMTEP3_T12veiklPobudcommand = "req.body.tMTEP3_T12veiklPobud";
        var tMTEP3_T12dataVietacommand = "req.body.tMTEP3_T12dataVieta";
        var tMTEP3_T13nrcommand = "req.body.tMTEP3_T13nr";
        var tMTEP3_T13studDuomcommand = "req.body.tMTEP3_T13studDuom";
        var tMTEP3_T13renginioPavadcommand = "req.body.tMTEP3_T13renginioPavad";
        var tMTEP3_T13rezultatascommand = "req.body.tMTEP3_T13rezultatas";
        var tMTEP3_T13datacommand = "req.body.tMTEP3_T13data";
        var tMTEP3_T14nrcommand = "req.body.tMTEP3_T14nr";
        var tMTEP3_T14renginyscommand = "req.body.tMTEP3_T14renginys";
        var tMTEP3_T14veiklPobudcommand = "req.body.tMTEP3_T14veiklPobud";
        var tMTEP3_T14dataVietacommand = "req.body.tMTEP3_T14dataVieta";
        var tMTEP3_Snrcommand = "req.body.tMTEP3_Snr";
        var tMTEP3_Sstiprybescommand = "req.body.tMTEP3_Sstiprybes";
        var tMTEP3_Stobulintinacommand = "req.body.tMTEP3_Stobulintina";
        var kTOV4_KV03nrcommand = "req.body.kTOV4_KV03nr";
        var kTOV4_KV03saliscommand = "req.body.kTOV4_KV03salis";
        var kTOV4_KV03institucijacommand = "req.body.kTOV4_KV03institucija";
        var kTOV4_KV03dalykascommand = "req.body.kTOV4_KV03dalykas";
        var kTOV4_O01_1nrcommand = "req.body.kTOV4_O01_1nr";
        var kTOV4_O01_1veiklPobudcommand = "req.body.kTOV4_O01_1veiklPobud";
        var kTOV4_O01_1isakNrDatacommand = "req.body.kTOV4_O01_1isakNrData";
        var kTOV4_O01_2nrcommand = "req.body.kTOV4_O01_2nr";
        var kTOV4_O01_2veiklPobudcommand = "req.body.kTOV4_O01_2veiklPobud";
        var kTOV4_O01_2dataVietacommand = "req.body.kTOV4_O01_2dataVieta";
        var kTOV4_O01_2dalyvSkcommand = "req.body.kTOV4_O01_2dalyvSk";
        var kTOV4_O01_2ktKomentaraicommand = "req.body.kTOV4_O01_2ktKomentarai";
        var kTOV4_Snrcommand = "req.body.kTOV4_Snr";
        var kTOV4_Sstiprybescommand = "req.body.kTOV4_Sstiprybes";
        var kTOV4_Stobulintinacommand = "req.body.kTOV4_Stobulintina";
        var kV5_KT01nrcommand = "req.body.kV5_KT01nr";
        var kV5_KT01diplomantascommand = "req.body.kV5_KT01diplomantas";
        var kV5_KT01studProgrcommand = "req.body.kV5_KT01studProgr";
        var kV5_KT01darboTemacommand = "req.body.kV5_KT01darboTema";
        var kV5_KT01uzsakovascommand = "req.body.kV5_KT01uzsakovas";
        var kV5_KT02nrcommand = "req.body.kV5_KT02nr";
        var kV5_KT02diplomantascommand = "req.body.kV5_KT02diplomantas";
        var kV5_KT02studProgrcommand = "req.body.kV5_KT02studProgr";
        var kV5_KT02darboTemacommand = "req.body.kV5_KT02darboTema";
        var kTOV4_KV01dalykStazuotespavadcommand = "req.body.kTOV4_KV01dalykStazuotespavad";
        var kTOV4_KV01dalykStazuotespavadcommand = "req.body.kTOV4_KV01dalykStazuotespavad";
        var kTOV4_KV01dalykStazuotespazymNrcommand = "req.body.kTOV4_KV01dalykStazuotespazymNr";
        var kTOV4_KV01dalykStazuotestrukmeValcommand = "req.body.kTOV4_KV01dalykStazuotestrukmeVal";
        var kTOV4_KV01dalykSeminaraipavadcommand = "req.body.kTOV4_KV01dalykSeminaraipavad";
        var kTOV4_KV01dalykSeminaraipazymNrcommand = "req.body.kTOV4_KV01dalykSeminaraipazymNr";
        var kTOV4_KV01dalykSeminaraitrukmeValcommand = "req.body.kTOV4_KV01dalykSeminaraitrukmeVal";
        var kTOV4_KV01dalykKonfpavadcommand = "req.body.kTOV4_KV01dalykKonfpavad";
        var kTOV4_KV01dalykKonfpazymNrcommand = "req.body.kTOV4_KV01dalykKonfpazymNr";
        var kTOV4_KV01dalykKonftrukmeValcommand = "req.body.kTOV4_KV01dalykKonftrukmeVal";
        var kTOV4_KV01dalykKursaipavadcommand = "req.body.kTOV4_KV01dalykKursaipavad";
        var kTOV4_KV01dalykKursaipazymNrcommand = "req.body.kTOV4_KV01dalykKursaipazymNr";
        var kTOV4_KV01dalykKursaitrukmeValcommand = "req.body.kTOV4_KV01dalykKursaitrukmeVal";
        var kTOV4_KV01didakStazuotespavadcommand = "req.body.kTOV4_KV01didakStazuotespavad";
        var kTOV4_KV01didakStazuotespazymNrcommand = "req.body.kTOV4_KV01didakStazuotespazymNr";
        var kTOV4_KV01didakStazuotestrukmeValcommand = "req.body.kTOV4_KV01didakStazuotestrukmeVal";
        var kTOV4_KV01didakSeminaraipavadcommand = "req.body.kTOV4_KV01didakSeminaraipavad";
        var kTOV4_KV01didakSeminaraipazymNrcommand = "req.body.kTOV4_KV01didakSeminaraipazymNr";
        var kTOV4_KV01didakSeminaraitrukmeValcommand = "req.body.kTOV4_KV01didakSeminaraitrukmeVal";
        var kTOV4_KV01didakKonfpavadcommand = "req.body.kTOV4_KV01didakKonfpavad";
        var kTOV4_KV01didakKonfpazymNrcommand = "req.body.kTOV4_KV01didakKonfpazymNr";
        var kTOV4_KV01didakKonftrukmeValcommand = "req.body.kTOV4_KV01didakKonftrukmeVal";
        var kTOV4_KV01didakKursaipavadcommand = "req.body.kTOV4_KV01didakKursaipavad";
        var kTOV4_KV01didakKursaipazymNrcommand = "req.body.kTOV4_KV01didakKursaipazymNr";
        var kTOV4_KV01didakKursaitrukmeValcommand = "req.body.kTOV4_KV01didakKursaitrukmeVal";
        var kTOV4_KV01bendrStazuotespavadcommand = "req.body.kTOV4_KV01bendrStazuotespavad";
        var kTOV4_KV01bendrStazuotespazymNrcommand = "req.body.kTOV4_KV01bendrStazuotespazymNr";
        var kTOV4_KV01bendrStazuotestrukmeValcommand = "req.body.kTOV4_KV01bendrStazuotestrukmeVal";
        var kTOV4_KV01bendrSeminaraipavadcommand = "req.body.kTOV4_KV01bendrSeminaraipavad";
        var kTOV4_KV01bendrSeminaraipazymNrcommand = "req.body.kTOV4_KV01bendrSeminaraipazymNr";
        var kTOV4_KV01bendrSeminaraitrukmeValcommand = "req.body.kTOV4_KV01bendrSeminaraitrukmeVal";
        var kTOV4_KV01bendrKonfpavadcommand = "req.body.kTOV4_KV01bendrKonfpavad";
        var kTOV4_KV01bendrKonfpazymNrcommand = "req.body.kTOV4_KV01bendrKonfpazymNr";
        var kTOV4_KV01bendrKonftrukmeValcommand = "req.body.kTOV4_KV01bendrKonftrukmeVal";
        var kTOV4_KV01bendrKursaipavadcommand = "req.body.kTOV4_KV01bendrKursaipavad";
        var kTOV4_KV01bendrKursaipazymNrcommand = "req.body.kTOV4_KV01bendrKursaipazymNr";
        var kTOV4_KV01bendrKursaitrukmeValcommand = "req.body.kTOV4_KV01bendrKursaitrukmeVal";

        var kTOV4_KV02dalykStazuotespavadcommand = "req.body.kTOV4_KV02dalykStazuotespavad";
        var kTOV4_KV02dalykStazuotespavadcommand = "req.body.kTOV4_KV02dalykStazuotespavad";
        var kTOV4_KV02dalykStazuotespazymNrcommand = "req.body.kTOV4_KV02dalykStazuotespazymNr";
        var kTOV4_KV02dalykStazuotestrukmeValcommand = "req.body.kTOV4_KV02dalykStazuotestrukmeVal";
        var kTOV4_KV02dalykSeminaraipavadcommand = "req.body.kTOV4_KV02dalykSeminaraipavad";
        var kTOV4_KV02dalykSeminaraipazymNrcommand = "req.body.kTOV4_KV02dalykSeminaraipazymNr";
        var kTOV4_KV02dalykSeminaraitrukmeValcommand = "req.body.kTOV4_KV02dalykSeminaraitrukmeVal";
        var kTOV4_KV02dalykKonfpavadcommand = "req.body.kTOV4_KV02dalykKonfpavad";
        var kTOV4_KV02dalykKonfpazymNrcommand = "req.body.kTOV4_KV02dalykKonfpazymNr";
        var kTOV4_KV02dalykKonftrukmeValcommand = "req.body.kTOV4_KV02dalykKonftrukmeVal";
        var kTOV4_KV02dalykKursaipavadcommand = "req.body.kTOV4_KV02dalykKursaipavad";
        var kTOV4_KV02dalykKursaipazymNrcommand = "req.body.kTOV4_KV02dalykKursaipazymNr";
        var kTOV4_KV02dalykKursaitrukmeValcommand = "req.body.kTOV4_KV02dalykKursaitrukmeVal";
        var kTOV4_KV02didakStazuotespavadcommand = "req.body.kTOV4_KV02didakStazuotespavad";
        var kTOV4_KV02didakStazuotespazymNrcommand = "req.body.kTOV4_KV02didakStazuotespazymNr";
        var kTOV4_KV02didakStazuotestrukmeValcommand = "req.body.kTOV4_KV02didakStazuotestrukmeVal";
        var kTOV4_KV02didakSeminaraipavadcommand = "req.body.kTOV4_KV02didakSeminaraipavad";
        var kTOV4_KV02didakSeminaraipazymNrcommand = "req.body.kTOV4_KV02didakSeminaraipazymNr";
        var kTOV4_KV02didakSeminaraitrukmeValcommand = "req.body.kTOV4_KV02didakSeminaraitrukmeVal";
        var kTOV4_KV02didakKonfpavadcommand = "req.body.kTOV4_KV02didakKonfpavad";
        var kTOV4_KV02didakKonfpazymNrcommand = "req.body.kTOV4_KV02didakKonfpazymNr";
        var kTOV4_KV02didakKonftrukmeValcommand = "req.body.kTOV4_KV02didakKonftrukmeVal";
        var kTOV4_KV02didakKursaipavadcommand = "req.body.kTOV4_KV02didakKursaipavad";
        var kTOV4_KV02didakKursaipazymNrcommand = "req.body.kTOV4_KV02didakKursaipazymNr";
        var kTOV4_KV02didakKursaitrukmeValcommand = "req.body.kTOV4_KV02didakKursaitrukmeVal";
        var kTOV4_KV02bendrStazuotespavadcommand = "req.body.kTOV4_KV02bendrStazuotespavad";
        var kTOV4_KV02bendrStazuotespazymNrcommand = "req.body.kTOV4_KV02bendrStazuotespazymNr";
        var kTOV4_KV02bendrStazuotestrukmeValcommand = "req.body.kTOV4_KV02bendrStazuotestrukmeVal";
        var kTOV4_KV02bendrSeminaraipavadcommand = "req.body.kTOV4_KV02bendrSeminaraipavad";
        var kTOV4_KV02bendrSeminaraipazymNrcommand = "req.body.kTOV4_KV02bendrSeminaraipazymNr";
        var kTOV4_KV02bendrSeminaraitrukmeValcommand = "req.body.kTOV4_KV02bendrSeminaraitrukmeVal";
        var kTOV4_KV02bendrKonfpavadcommand = "req.body.kTOV4_KV02bendrKonfpavad";
        var kTOV4_KV02bendrKonfpazymNrcommand = "req.body.kTOV4_KV02bendrKonfpazymNr";
        var kTOV4_KV02bendrKonftrukmeValcommand = "req.body.kTOV4_KV02bendrKonftrukmeVal";
        var kTOV4_KV02bendrKursaipavadcommand = "req.body.kTOV4_KV02bendrKursaipavad";
        var kTOV4_KV02bendrKursaipazymNrcommand = "req.body.kTOV4_KV02bendrKursaipazymNr";
        var kTOV4_KV02bendrKursaitrukmeValcommand = "req.body.kTOV4_KV02bendrKursaitrukmeVal";

        foundUser.destytojas.kD1_K01.kD1_K01_array = new Array();
        foundUser.destytojas.nD2_P01 = new Array();
        foundUser.destytojas.nD2_M01 = new Array();
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
        foundUser.destytojas.kTOV4_KV03 = new Array();
        foundUser.destytojas.kTOV4_S = new Array();
        foundUser.destytojas.kV5_KT01 = new Array();
        foundUser.destytojas.kV5_KT02.kV5_KT02_array = new Array();
        foundUser.destytojas.kTOV4_O01.kTOV4_O01_1 = new Array();
        foundUser.destytojas.kTOV4_O01.kTOV4_O01_2 = new Array();

        foundUser.destytojas.kTOV4_KV01.kTOV4_KV01dalykines_komp.stazuotes = new Array();
        foundUser.destytojas.kTOV4_KV01.kTOV4_KV01dalykines_komp.seminarai = new Array();
        foundUser.destytojas.kTOV4_KV01.kTOV4_KV01dalykines_komp.konferencijos = new Array();
        foundUser.destytojas.kTOV4_KV01.kTOV4_KV01dalykines_komp.kursai = new Array();

        foundUser.destytojas.kTOV4_KV01.kTOV4_KV01didaktines_komp.stazuotes = new Array();
        foundUser.destytojas.kTOV4_KV01.kTOV4_KV01didaktines_komp.seminarai = new Array();
        foundUser.destytojas.kTOV4_KV01.kTOV4_KV01didaktines_komp.konferencijos = new Array();
        foundUser.destytojas.kTOV4_KV01.kTOV4_KV01didaktines_komp.kursai = new Array();

        foundUser.destytojas.kTOV4_KV01.kTOV4_KV01bendrosios_komp.stazuotes = new Array();
        foundUser.destytojas.kTOV4_KV01.kTOV4_KV01bendrosios_komp.seminarai = new Array();
        foundUser.destytojas.kTOV4_KV01.kTOV4_KV01bendrosios_komp.konferencijos = new Array();
        foundUser.destytojas.kTOV4_KV01.kTOV4_KV01bendrosios_komp.kursai = new Array();

        foundUser.destytojas.kTOV4_KV02.kTOV4_KV02dalykines_komp.stazuotes = new Array();
        foundUser.destytojas.kTOV4_KV02.kTOV4_KV02dalykines_komp.seminarai = new Array();
        foundUser.destytojas.kTOV4_KV02.kTOV4_KV02dalykines_komp.konferencijos = new Array();
        foundUser.destytojas.kTOV4_KV02.kTOV4_KV02dalykines_komp.kursai = new Array();

        foundUser.destytojas.kTOV4_KV02.kTOV4_KV02didaktines_komp.stazuotes = new Array();
        foundUser.destytojas.kTOV4_KV02.kTOV4_KV02didaktines_komp.seminarai = new Array();
        foundUser.destytojas.kTOV4_KV02.kTOV4_KV02didaktines_komp.konferencijos = new Array();
        foundUser.destytojas.kTOV4_KV02.kTOV4_KV02didaktines_komp.kursai = new Array();

        foundUser.destytojas.kTOV4_KV02.kTOV4_KV02bendrosios_komp.stazuotes = new Array();
        foundUser.destytojas.kTOV4_KV02.kTOV4_KV02bendrosios_komp.seminarai = new Array();
        foundUser.destytojas.kTOV4_KV02.kTOV4_KV02bendrosios_komp.konferencijos = new Array();
        foundUser.destytojas.kTOV4_KV02.kTOV4_KV02bendrosios_komp.kursai = new Array();

        // foundUser.destytojas.kTOV4_KV01.kTOV4_KV01dalykines_komp.dalyvavoDalyk = false;
        // foundUser.destytojas.kTOV4_KV01.kTOV4_KV01didaktines_komp.dalyvavoDidak = false;
        // foundUser.destytojas.kTOV4_KV01.kTOV4_KV01bendrosios_komp.dalyvavoBendr = false;
        // foundUser.destytojas.kTOV4_KV02.kTOV4_KV02dalykines_komp.dalyvavoDalyk = false;
        // foundUser.destytojas.kTOV4_KV02.kTOV4_KV02didaktines_komp.dalyvavoDidak = false;
        // foundUser.destytojas.kTOV4_KV02.kTOV4_KV02bendrosios_komp.dalyvavoBendr = false;

        foundUser.destytojas.kD1_K01.isVisoValPlan = req.body.kD1_K01isVisoValPlan,
          foundUser.destytojas.kD1_K01.isVisoValAtl = req.body.kD1_K01isVisoValAtl,
          foundUser.destytojas.kD1_K01.isJuSrautaisValPlan = req.body.isJuSrautaisValPlan,
          foundUser.destytojas.kD1_K01.isJuSrautaisValAtl = req.body.isJuSrautaisValAtl,
          foundUser.destytojas.kD1_K01.isJuUzsienioValPlan = req.body.isJuUzsienioValPlan,
          foundUser.destytojas.kD1_K01.isJuUzsienioValAtl = req.body.isJuUzsienioValAtl,
          foundUser.destytojas.kD1_K01.priezastys = req.body.kD1_K01priezastys
        for (let i = 1; i <= parseInt(req.body.yond2); i++) {
          var iteracija = i;
          var nriteracija = nrcommand + iteracija;
          var dalykasiteracija = dalykascommand + iteracija;
          var grupeiteracija = grupecommand + iteracija;
          var semestrasiteracija = semestrascommand + iteracija;
          var planuotosValiteracija = planuotosValcommand + iteracija;
          var atliktosValiteracija = atliktosValcommand + iteracija;
          var joinednr = eval(nriteracija);
          var joineddalykas = eval(dalykasiteracija);
          var joinedgrupe = eval(grupeiteracija);
          var joinedsemestras = eval(semestrasiteracija);
          var joinedplanuotosVal = eval(planuotosValiteracija);
          var joinedatliktosVal = eval(atliktosValiteracija);
          foundUser.destytojas.kD1_K01.kD1_K01_array.push({
            nr: joinednr,
            dalykas: joineddalykas,
            grupe: joinedgrupe,
            semestras: joinedsemestras,
            planuotosVal: joinedplanuotosVal,
            atliktosVal: joinedatliktosVal
          })
        }
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
          foundUser.destytojas.nD2.priezastys = req.body.nD2priezastys,

          foundUser.destytojas.nD2_N01.priezastys = req.body.nD2_N01priezastys


        for (let a = 1; a <= parseInt(req.body.yond4); a++) {
          var iteracija2 = a;
          var nD2_P01nriteracija = nD2_P01nrcommand + iteracija2;
          var nD2_P01veiklPavaditeracija = nD2_P01veiklPavadcommand + iteracija2;
          var nD2_P01veiklRezultiteracija = nD2_P01veiklRezultcommand + iteracija2;
          var joinednr2 = eval(nD2_P01nriteracija);
          var joinednD2_P01veiklPavad = eval(nD2_P01veiklPavaditeracija);
          var joinednD2_P01veiklRezult = eval(nD2_P01veiklRezultiteracija);
          foundUser.destytojas.nD2_P01.push({
            nr: joinednr2,
            veiklPavad: joinednD2_P01veiklPavad,
            veiklRezult: joinednD2_P01veiklRezult
          })
        }
        for (let b = 1; b <= parseInt(req.body.yond6); b++) {
          var iteracija3 = b;
          var nD2_M01nriteracija = nD2_M01nrcommand + iteracija3;
          var nD2_M01veiklPavaditeracija = nD2_M01veiklPavadcommand + iteracija3;
          var nD2_M01veiklRezultiteracija = nD2_M01veiklRezultcommand + iteracija3;
          var joinednr3 = eval(nD2_M01nriteracija);
          var joinednD2_M01veiklPavad = eval(nD2_M01veiklPavaditeracija);
          var joinednD2_M01veiklRezult = eval(nD2_M01veiklRezultiteracija);
          foundUser.destytojas.nD2_M01.push({
            nr: joinednr3,
            veiklPavad: joinednD2_M01veiklPavad,
            veiklRezult: joinednD2_M01veiklRezult
          })
        }

        for (let c = 1; c <= parseInt(req.body.yond8); c++) {
          var iteracija4 = c;
          var nD2_M02nriteracija = nD2_M02nrcommand + iteracija4;
          var bibliografApriteracija = bibliografAprcommand + iteracija4;
          var tipasiteracija = tipascommand + iteracija4;
          var mokslSrititeracija = mokslSritcommand + iteracija4;
          var mokslKryptiteracija = mokslKryptcommand + iteracija4;
          var katedraiteracija = katedracommand + iteracija4;
          var joinednD2_M02nr = eval(nD2_M02nriteracija);
          var joinedbibliografApr = eval(bibliografApriteracija);
          var joinedtipas = eval(tipasiteracija);
          var joinedmokslSritit = eval(mokslSrititeracija);
          var joinedmokslKrypt = eval(mokslKryptiteracija);
          var joinedkatedra = eval(katedraiteracija);
          foundUser.destytojas.nD2_M02.push({
            nr: joinednD2_M02nr,
            bibliografApr: joinedbibliografApr,
            tipas: joinedtipas,
            mokslSrit: joinedmokslSritit,
            mokslKrypt: joinedmokslKrypt,
            katedra: joinedkatedra
          })
        }
        for (let d = 1; d <= parseInt(req.body.yond10); d++) {
          var iteracija5 = d;
          var nD2_M03nriteracija = nD2_M03nrcommand + iteracija5;
          var nD2_M03studProgriteracija = nD2_M03studProgrcommand + iteracija5;
          var nD2_M03dalykPavaditeracija = nD2_M03dalykPavadcommand + iteracija5;
          var nD2_M03apimtisKredititeracija = nD2_M03apimtisKreditcommand + iteracija5;
          var joinednD2_M03nr = eval(nD2_M03nriteracija);
          var joinednD2_M03studProgr = eval(nD2_M03studProgriteracija);
          var joinednD2_M03dalykPavad = eval(nD2_M03dalykPavaditeracija);
          var joinednD2_M03apimtisKredit = eval(nD2_M03apimtisKredititeracija);
          foundUser.destytojas.nD2_M03.push({
            nr: joinednD2_M03nr,
            studProgr: joinednD2_M03studProgr,
            dalykPavad: joinednD2_M03dalykPavad,
            apimtisKredit: joinednD2_M03apimtisKredit
          })
        }
        for (let e = 1; e <= parseInt(req.body.yond12); e++) {
          var iteracija6 = e;
          var nD2_M04nriteracija = nD2_M04nrcommand + iteracija6;
          var nD2_M04studProgriteracija = nD2_M04studProgrcommand + iteracija6;
          var nD2_M04dalykPavaditeracija = nD2_M04dalykPavadcommand + iteracija6;
          var nD2_M04busenaiteracija = nD2_M04busenacommand + iteracija6;
          var nD2_M04apimtisKredititeracija = nD2_M04apimtisKreditcommand + iteracija6;
          var joinednD2_M04nr = eval(nD2_M04nriteracija);
          var joinednD2_M04studProgr = eval(nD2_M04studProgriteracija);
          var joinednD2_M04dalykPavad = eval(nD2_M04dalykPavaditeracija);
          var joinednD2_M04busena = eval(nD2_M04busenaiteracija);
          var joinednD2_M04apimtisKredit = eval(nD2_M04apimtisKredititeracija);
          foundUser.destytojas.nD2_M04.push({
            nr: joinednD2_M04nr,
            studProgr: joinednD2_M04studProgr,
            dalykPavad: joinednD2_M04dalykPavad,
            busena: joinednD2_M04busena,
            apimtisKredit: joinednD2_M04apimtisKredit
          })
        }
        for (let f = 1; f <= parseInt(req.body.yond14); f++) {
          var iteracija7 = f;
          var nD2_D01nriteracija = nD2_D01nrcommand + iteracija7;
          var nD2_D01komitetasiteracija = nD2_D01komitetascommand + iteracija7;
          var nD2_D01veiklaiteracija = nD2_D01veiklacommand + iteracija7;
          var nD2_D01rezultataiiteracija = nD2_D01rezultataicommand + iteracija7;
          var joinednD2_D01nr = eval(nD2_D01nriteracija);
          var joinednD2_D01komitetas = eval(nD2_D01komitetasiteracija);
          var joinednD2_D01veikla = eval(nD2_D01veiklaiteracija);
          var joinednD2_D01rezultatai = eval(nD2_D01rezultataiiteracija);
          foundUser.destytojas.nD2_D01.push({
            nr: joinednD2_D01nr,
            komitetas: joinednD2_D01komitetas,
            veikla: joinednD2_D01veikla,
            rezultatai: joinednD2_D01rezultatai
          })
        }
        for (let g = 1; g <= parseInt(req.body.yond16); g++) {
          var iteracija8 = g;
          var nD2_D02nriteracija = nD2_D02nrcommand + iteracija8;
          var nD2_D02studKryptiteracija = nD2_D02studKryptcommand + iteracija8;
          var nD2_D02veiklaiteracija = nD2_D02veiklacommand + iteracija8;
          var nD2_D02rezultataiiteracija = nD2_D02rezultataicommand + iteracija8;
          var joinednD2_D02nr = eval(nD2_D02nriteracija);
          var joinednD2_D02studKrypt = eval(nD2_D02studKryptiteracija);
          var joinednD2_D02veikla = eval(nD2_D02veiklaiteracija);
          var joinednD2_D02rezultatai = eval(nD2_D02rezultataiiteracija);
          foundUser.destytojas.nD2_D02.push({
            nr: joinednD2_D02nr,
            studKryptis: joinednD2_D02studKrypt,
            veikla: joinednD2_D02veikla,
            rezultatai: joinednD2_D02rezultatai
          })
        }
        for (let h = 1; h <= parseInt(req.body.yond18); h++) {
          var iteracija9 = h;
          var nD2_D03nriteracija = nD2_D03nrcommand + iteracija9;
          var nD2_D03studProgriteracija = nD2_D03studProgrcommand + iteracija9;
          var nD2_D03veiklaiteracija = nD2_D03veiklacommand + iteracija9;
          var nD2_D03rezultataiiteracija = nD2_D03rezultataicommand + iteracija9;
          var joinednD2_D03nr = eval(nD2_D03nriteracija);
          var joinednD2_D03studProgr = eval(nD2_D03studProgriteracija);
          var joinednD2_D03veikla = eval(nD2_D03veiklaiteracija);
          var joinednD2_D03rezultatai = eval(nD2_D03rezultataiiteracija);
          foundUser.destytojas.nD2_D03.push({
            nr: joinednD2_D03nr,
            studProgr: joinednD2_D03studProgr,
            veikla: joinednD2_D03veikla,
            rezultatai: joinednD2_D03rezultatai
          })
        }
        for (let j = 1; j <= parseInt(req.body.yond20); j++) {
          var iteracija10 = j;
          var nD2_S01nriteracija = nD2_S01nrcommand + iteracija10;
          var nD2_S01veiklaiteracija = nD2_S01veiklacommand + iteracija10;
          var nD2_S01dataVietaiteracija = nD2_S01dataVietacommand + iteracija10;
          var joinednD2_S01nr = eval(nD2_S01nriteracija);
          var joinednD2_S01veikla = eval(nD2_S01veiklaiteracija);
          var joinednD2_S01dataVieta = eval(nD2_S01dataVietaiteracija);
          foundUser.destytojas.nD2_S01.push({
            nr: joinednD2_S01nr,
            veikla: joinednD2_S01veikla,
            dataVieta: joinednD2_S01dataVieta
          })
        }
        for (let k = 1; k <= parseInt(req.body.yond22); k++) {
          var iteracija11 = k;
          var nD2_Snriteracija = nD2_Snrcommand + iteracija11;
          var nD2_Sstiprybesiteracija = nD2_Sstiprybescommand + iteracija11;
          var nD2_Stobulintinaiteracija = nD2_Stobulintinacommand + iteracija11;
          var joinednD2_Snr = eval(nD2_Snriteracija);
          var joinednD2_Sstiprybes = eval(nD2_Sstiprybesiteracija);
          var joinednD2_Stobulintina = eval(nD2_Stobulintinaiteracija);
          foundUser.destytojas.nD2_S.push({
            nr: joinednD2_Snr,
            stiprybes: joinednD2_Sstiprybes,
            tobulintina: joinednD2_Stobulintina
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

        for (let l = 1; l <= parseInt(req.body.yond24); l++) {
          var iteracija12 = l;
          var tMTEP3_T01nriteracija = tMTEP3_T01nrcommand + iteracija12;
          var tyrTematiteracija = tyrTematcommand + iteracija12;
          var tyrGrupiteracija = tyrGrupcommand + iteracija12;
          var tMTEP3_T01mokslSrititeracija = tMTEP3_T01mokslSritcommand + iteracija12;
          var tMTEP3_T01mokslKryptiteracija = tMTEP3_T01mokslKryptcommand + iteracija12;
          var joinedtMTEP3_T01nr = eval(tMTEP3_T01nriteracija);
          var joinedtyrTemat = eval(tyrTematiteracija);
          var joinedtyrGrup = eval(tyrGrupiteracija);
          var joinedtMTEP3_T01mokslSrit = eval(tMTEP3_T01mokslSrititeracija);
          var joinedtMTEP3_T01mokslKrypt = eval(tMTEP3_T01mokslKryptiteracija);
          foundUser.destytojas.tMTEP3_T01.push({
            nr: joinedtMTEP3_T01nr,
            tyrTemat: joinedtyrTemat,
            tyrGrup: joinedtyrGrup,
            mokslSrit: joinedtMTEP3_T01mokslSrit,
            mokslKrypt: joinedtMTEP3_T01mokslKrypt
          })
        }
        for (let m = 1; m <= parseInt(req.body.yond26); m++) {
          var iteracija13 = m;
          var tMTEP3_T02nriteracija = tMTEP3_T02nrcommand + iteracija13;
          var tMTEP3_T02bibliografApriteracija = tMTEP3_T02bibliografAprcommand + iteracija13;
          var tMTEP3_T02tipasiteracija = tMTEP3_T02tipascommand + iteracija13;
          var tMTEP3_T02mokslSrititeracija = tMTEP3_T02mokslSritcommand + iteracija13;
          var tMTEP3_T02mokslKryptiteracija = tMTEP3_T02mokslKryptcommand + iteracija13;
          var tMTEP3_T02duomBazeiteracija = tMTEP3_T02duomBazecommand + iteracija13;
          var joinedtMTEP3_T02nr = eval(tMTEP3_T02nriteracija);
          var joinedtMTEP3_T02bibliografApr = eval(tMTEP3_T02bibliografApriteracija);
          var joinedtMTEP3_T02tipas = eval(tMTEP3_T02tipasiteracija);
          var joinedtMTEP3_T02mokslSrit = eval(tMTEP3_T02mokslSrititeracija);
          var joinedtMTEP3_T02mokslKrypt = eval(tMTEP3_T02mokslKryptiteracija);
          var joinedtMTEP3_T02duomBaze = eval(tMTEP3_T02duomBazeiteracija);
          foundUser.destytojas.tMTEP3_T02.push({
            nr: joinedtMTEP3_T02nr,
            bibliografApr: joinedtMTEP3_T02bibliografApr,
            tipas: joinedtMTEP3_T02tipas,
            mokslSrit: joinedtMTEP3_T02mokslSrit,
            mokslKrypt: joinedtMTEP3_T02mokslKrypt,
            duomBaze: joinedtMTEP3_T02duomBaze
          })
        }
        for (let n = 1; n <= parseInt(req.body.yond28); n++) {
          var iteracija14 = n;
          var tMTEP3_T03nriteracija = tMTEP3_T03nrcommand + iteracija14;
          var tMTEP3_T03pilnasBiblApriteracija = tMTEP3_T03pilnasBiblAprcommand + iteracija14;
          var joinedtMTEP3_T03nr = eval(tMTEP3_T03nriteracija);
          var joinedtMTEP3_T03pilnasBiblApr = eval(tMTEP3_T03pilnasBiblApriteracija);
          foundUser.destytojas.tMTEP3_T03.push({
            nr: joinedtMTEP3_T03nr,
            pilnasBiblApr: joinedtMTEP3_T03pilnasBiblApr
          })
        }
        for (let o = 1; o <= parseInt(req.body.yond30); o++) {
          var tMTEP3_T04nriteracija = tMTEP3_T04nrcommand + o;
          var tMTEP3_T04uzsakovasiteracija = tMTEP3_T04uzsakovascommand + o;
          var tMTEP3_T04temaiteracija = tMTEP3_T04temacommand + o;
          var tMTEP3_T04dataiteracija = tMTEP3_T04datacommand + o;
          var joinedtMTEP3_T04nr = eval(tMTEP3_T04nriteracija);
          var joinedtMTEP3_T04uzsakovas = eval(tMTEP3_T04uzsakovasiteracija);
          var joinedtMTEP3_T04tema = eval(tMTEP3_T04temaiteracija);
          var joinedtMTEP3_T04data = eval(tMTEP3_T04dataiteracija);
          foundUser.destytojas.tMTEP3_T04.push({
            nr: joinedtMTEP3_T04nr,
            uzsakovas: joinedtMTEP3_T04uzsakovas,
            tema: joinedtMTEP3_T04tema,
            data: joinedtMTEP3_T04data
          })
        }
        for (let p = 1; p <= parseInt(req.body.yond32); p++) {

          var tMTEP3_T05nriteracija = tMTEP3_T05nrcommand + p;
          var tMTEP3_T05veiklPavaditeracija = tMTEP3_T05veiklPavadcommand + p;
          var tMTEP3_T05veiklRezultiteracija = tMTEP3_T05veiklRezultcommand + p;
          var joinedtMTEP3_T05nr = eval(tMTEP3_T05nriteracija);
          var joinedtMTEP3_T05veiklPavad = eval(tMTEP3_T05veiklPavaditeracija);
          var joinedtMTEP3_T05veiklRezult = eval(tMTEP3_T05veiklRezultiteracija);
          foundUser.destytojas.tMTEP3_T05.push({
            nr: joinedtMTEP3_T05nr,
            veiklPavad: joinedtMTEP3_T05veiklPavad,
            veiklRezult: joinedtMTEP3_T05veiklRezult
          })
        }
        for (let q = 1; q <= parseInt(req.body.yond34); q++) {
          var tMTEP3_T06nriteracija = tMTEP3_T06nrcommand + q;
          var tMTEP3_T06autoriusiteracija = tMTEP3_T06autoriuscommand + q;
          var tMTEP3_T06menoSrititeracija = tMTEP3_T06menoSritcommand + q;
          var tMTEP3_T06pobudisiteracija = tMTEP3_T06pobudiscommand + q;
          var tMTEP3_T06realizVietaiteracija = tMTEP3_T06realizVietacommand + q;
          var tMTEP3_T06dataiteracija = tMTEP3_T06datacommand + q;
          var joinedtMTEP3_T06nr = eval(tMTEP3_T06nriteracija);
          var joinedtMTEP3_T06autorius = eval(tMTEP3_T06autoriusiteracija);
          var joinedtMTEP3_T06menoSrit = eval(tMTEP3_T06menoSrititeracija);
          var joinedtMTEP3_T06pobudis = eval(tMTEP3_T06pobudisiteracija);
          var joinedtMTEP3_T06realizVieta = eval(tMTEP3_T06realizVietaiteracija);
          var joinedtMTEP3_T06data = eval(tMTEP3_T06dataiteracija);
          foundUser.destytojas.tMTEP3_T06.push({
            nr: joinedtMTEP3_T06nr,
            autorius: joinedtMTEP3_T06autorius,
            menoSrit: joinedtMTEP3_T06menoSrit,
            pobudis: joinedtMTEP3_T06pobudis,
            realizVieta: joinedtMTEP3_T06realizVieta,
            data: joinedtMTEP3_T06data
          })
        }
        for (let r = 1; r <= parseInt(req.body.yond36); r++) {
          var tMTEP3_T07nriteracija = tMTEP3_T07nrcommand + r;
          var tMTEP3_T07atlikejasiteracija = tMTEP3_T07atlikejascommand + r;
          var tMTEP3_T07menoSrititeracija = tMTEP3_T07menoSritcommand + r;
          var tMTEP3_T07pavadinimasiteracija = tMTEP3_T07pavadinimascommand + r;
          var tMTEP3_T07atlikVietaiteracija = tMTEP3_T07atlikVietacommand + r;
          var tMTEP3_T07dataiteracija = tMTEP3_T07datacommand + r;
          var joinedtMTEP3_T07nr = eval(tMTEP3_T07nriteracija);
          var joinedtMTEP3_T07atlikejas = eval(tMTEP3_T07atlikejasiteracija);
          var joinedtMTEP3_T07menoSrit = eval(tMTEP3_T07menoSrititeracija);
          var joinedtMTEP3_T07pavadinimas = eval(tMTEP3_T07pavadinimasiteracija);
          var joinedtMTEP3_T07atlikVieta = eval(tMTEP3_T07atlikVietaiteracija);
          var joinedtMTEP3_T07data = eval(tMTEP3_T07dataiteracija);
          foundUser.destytojas.tMTEP3_T07.push({
            nr: joinedtMTEP3_T07nr,
            atlikejas: joinedtMTEP3_T07atlikejas,
            menoSrit: joinedtMTEP3_T07menoSrit,
            pavadinimas: joinedtMTEP3_T07pavadinimas,
            atlikVieta: joinedtMTEP3_T07atlikVieta,
            data: joinedtMTEP3_T07data
          })
        }
        for (let s = 1; s <= parseInt(req.body.yond38); s++) {
          var tMTEP3_T08Snriteracija = tMTEP3_T08Snrcommand + s;
          var tMTEP3_T08atlikejasiteracija = tMTEP3_T08atlikejascommand + s;
          var tMTEP3_T08menoSrititeracija = tMTEP3_T08menoSritcommand + s;
          var tMTEP3_T08pavadinimasiteracija = tMTEP3_T08pavadinimascommand + s;
          var tMTEP3_T08atlikVietaiteracija = tMTEP3_T08atlikVietacommand + s;
          var tMTEP3_T08dataiteracija = tMTEP3_T08datacommand + s;
          var joinedtMTEP3_T08Snr = eval(tMTEP3_T08Snriteracija);
          var joinedtMTEP3_T08atlikejas = eval(tMTEP3_T08atlikejasiteracija);
          var joinedtMTEP3_T08menoSrit = eval(tMTEP3_T08menoSrititeracija);
          var joinedtMTEP3_T08pavadinimas = eval(tMTEP3_T08pavadinimasiteracija);
          var joinedtMTEP3_T08atlikVieta = eval(tMTEP3_T08atlikVietaiteracija);
          var joinedtMTEP3_T08data = eval(tMTEP3_T08dataiteracija);
          foundUser.destytojas.tMTEP3_T08.push({
            nr: joinedtMTEP3_T08Snr,
            atlikejas: joinedtMTEP3_T08atlikejas,
            menoSrit: joinedtMTEP3_T08menoSrit,
            pavadinimas: joinedtMTEP3_T08pavadinimas,
            atlikVieta: joinedtMTEP3_T08atlikVieta,
            data: joinedtMTEP3_T08data
          })
        }
        for (let t = 1; t <= parseInt(req.body.yond40); t++) {
          var tMTEP3_T09nriteracija = tMTEP3_T09nrcommand + t;
          var tMTEP3_T09atlikejasiteracija = tMTEP3_T09atlikejascommand + t;
          var tMTEP3_T09menoSrititeracija = tMTEP3_T09menoSritcommand + t;
          var tMTEP3_T09pavadinimasiteracija = tMTEP3_T09pavadinimascommand + t;
          var tMTEP3_T09atlikVietaiteracija = tMTEP3_T09atlikVietacommand + t;
          var tMTEP3_T09dataiteracija = tMTEP3_T09datacommand + t;
          var joinedtMTEP3_T09nr = eval(tMTEP3_T09nriteracija);
          var joinedtMTEP3_T09atlikejas = eval(tMTEP3_T09atlikejasiteracija);
          var joinedtMTEP3_T09menoSrit = eval(tMTEP3_T09menoSrititeracija);
          var joinedtMTEP3_T09pavadinimas = eval(tMTEP3_T09pavadinimasiteracija);
          var joinedtMTEP3_T09atlikVieta = eval(tMTEP3_T09atlikVietaiteracija);
          var joinedtMTEP3_T09data = eval(tMTEP3_T09dataiteracija);
          foundUser.destytojas.tMTEP3_T09.push({
            nr: joinedtMTEP3_T09nr,
            atlikejas: joinedtMTEP3_T09atlikejas,
            menoSrit: joinedtMTEP3_T09menoSrit,
            pavadinimas: joinedtMTEP3_T09pavadinimas,
            atlikVieta: joinedtMTEP3_T09atlikVieta,
            data: joinedtMTEP3_T09data
          })
        }
        for (let u = 1; u <= parseInt(req.body.yond42); u++) {
          var tMTEP3_T10nriteracija = tMTEP3_T10nrcommand + u;
          var tMTEP3_T10veiklPobuditeracija = tMTEP3_T10veiklPobudcommand + u;
          var tMTEP3_T10veiklTiksliteracija = tMTEP3_T10veiklTikslcommand + u;
          var tMTEP3_T10dataVietaiteracija = tMTEP3_T10dataVietacommand + u;
          var tMTEP3_T10dalyvSkiteracija = tMTEP3_T10dalyvSkcommand + u;
          var tMTEP3_T10ktKomentaraiiteracija = tMTEP3_T10ktKomentaraicommand + u;
          var joinedtMTEP3_T10nr = eval(tMTEP3_T10nriteracija);
          var joinedtMTEP3_T10veiklPobud = eval(tMTEP3_T10veiklPobuditeracija);
          var joinedtMTEP3_T10veiklTiksl = eval(tMTEP3_T10veiklTiksliteracija);
          var joinedtMTEP3_T10dataVieta = eval(tMTEP3_T10dataVietaiteracija);
          var joinedtMTEP3_T10dalyvSk = eval(tMTEP3_T10dalyvSkiteracija);
          var joinedtMTEP3_T10ktKomentarai = eval(tMTEP3_T10ktKomentaraiiteracija);
          foundUser.destytojas.tMTEP3_T10.push({
            nr: joinedtMTEP3_T10nr,
            veiklPobud: joinedtMTEP3_T10veiklPobud,
            veiklTiksl: joinedtMTEP3_T10veiklTiksl,
            dataVieta: joinedtMTEP3_T10dataVieta,
            dalyvSk: joinedtMTEP3_T10dalyvSk,
            ktKomentarai: joinedtMTEP3_T10ktKomentarai
          })
        }
        for (let v = 1; v <= parseInt(req.body.yond44); v++) {
          var tMTEP3_T11nriteracija = tMTEP3_T11nrcommand + v;
          var tMTEP3_T11veiklPobuditeracija = tMTEP3_T11veiklPobudcommand + v;
          var tMTEP3_T11veiklTiksliteracija = tMTEP3_T11veiklTikslcommand + v;
          var tMTEP3_T11dataVietaiteracija = tMTEP3_T11dataVietacommand + v;
          var tMTEP3_T11dalyvSkiteracija = tMTEP3_T11dalyvSkcommand + v;
          var tMTEP3_T11ktKomentaraiiteracija = tMTEP3_T11ktKomentaraicommand + v;
          var joinedtMTEP3_T11nr = eval(tMTEP3_T11nriteracija);
          var joinedtMTEP3_T11veiklPobud = eval(tMTEP3_T11veiklPobuditeracija);
          var joinedtMTEP3_T11veiklTiksl = eval(tMTEP3_T11veiklTiksliteracija);
          var joinedtMTEP3_T11dataVieta = eval(tMTEP3_T11dataVietaiteracija);
          var joinedtMTEP3_T11dalyvSk = eval(tMTEP3_T11dalyvSkiteracija);
          var joinedtMTEP3_T11ktKomentarai = eval(tMTEP3_T11ktKomentaraiiteracija);
          foundUser.destytojas.tMTEP3_T11.push({
            nr: joinedtMTEP3_T11nr,
            veiklPobud: joinedtMTEP3_T11veiklPobud,
            veiklTiksl: joinedtMTEP3_T11veiklTiksl,
            dataVieta: joinedtMTEP3_T11dataVieta,
            dalyvSk: joinedtMTEP3_T11dalyvSk,
            ktKomentarai: joinedtMTEP3_T11ktKomentarai
          })
        }
        for (let w = 1; w <= parseInt(req.body.yond46); w++) {
          var tMTEP3_T12nriteracija = tMTEP3_T12nrcommand + w;
          var tMTEP3_T12veiklPobuditeracija = tMTEP3_T12veiklPobudcommand + w;
          var tMTEP3_T12dataVietaiteracija = tMTEP3_T12dataVietacommand + w;
          var joinedtMTEP3_T12nr = eval(tMTEP3_T12nriteracija);
          var joinedtMTEP3_T12veiklPobud = eval(tMTEP3_T12veiklPobuditeracija);
          var joinedtMTEP3_T12dataVieta = eval(tMTEP3_T12dataVietaiteracija);
          foundUser.destytojas.tMTEP3_T12.push({
            nr: joinedtMTEP3_T12nr,
            veiklPobud: joinedtMTEP3_T12veiklPobud,
            dataVieta: joinedtMTEP3_T12dataVieta
          })
        }
        for (let x = 1; x <= parseInt(req.body.yond48); x++) {
          var tMTEP3_T13nriteracija = tMTEP3_T13nrcommand + x;
          var tMTEP3_T13studDuomiteracija = tMTEP3_T13studDuomcommand + x;
          var tMTEP3_T13renginioPavaditeracija = tMTEP3_T13renginioPavadcommand + x;
          var tMTEP3_T13rezultatasiteracija = tMTEP3_T13rezultatascommand + x;
          var tMTEP3_T13dataiteracija = tMTEP3_T13datacommand + x;
          var joinedtMTEP3_T13nr = eval(tMTEP3_T13nriteracija);
          var joinedtMTEP3_T13studDuom = eval(tMTEP3_T13studDuomiteracija);
          var joinedtMTEP3_T13renginioPavad = eval(tMTEP3_T13renginioPavaditeracija);
          var joinedtMTEP3_T13rezultatas = eval(tMTEP3_T13rezultatasiteracija);
          var joinedtMTEP3_T13data = eval(tMTEP3_T13dataiteracija);
          foundUser.destytojas.tMTEP3_T13.push({
            nr: joinedtMTEP3_T13nr,
            studDuom: joinedtMTEP3_T13studDuom,
            renginioPavad: joinedtMTEP3_T13renginioPavad,
            rezultatas: joinedtMTEP3_T13rezultatas,
            data: joinedtMTEP3_T13data
          })
        }
        for (let y = 1; y <= parseInt(req.body.yond50); y++) {
          var tMTEP3_T14nriteracija = tMTEP3_T14nrcommand + y;
          var tMTEP3_T14renginysiteracija = tMTEP3_T14renginyscommand + y;
          var tMTEP3_T14veiklPobuditeracija = tMTEP3_T14veiklPobudcommand + y;
          var tMTEP3_T14dataVietaiteracija = tMTEP3_T14dataVietacommand + y;
          var joinedtMTEP3_T14nr = eval(tMTEP3_T14nriteracija);
          var joinedtMTEP3_T14renginys = eval(tMTEP3_T14renginysiteracija);
          var joinedtMTEP3_T14veiklPobud = eval(tMTEP3_T14veiklPobuditeracija);
          var joinedtMTEP3_T14dataVieta = eval(tMTEP3_T14dataVietaiteracija);
          foundUser.destytojas.tMTEP3_T14.push({
            nr: joinedtMTEP3_T14nr,
            renginys: joinedtMTEP3_T14renginys,
            veiklPobud: joinedtMTEP3_T14veiklPobud,
            dataVieta: joinedtMTEP3_T14dataVieta
          })
        }
        for (let z = 1; z <= parseInt(req.body.yond52); z++) {
          var tMTEP3_Snriteracija = tMTEP3_Snrcommand + z;
          var tMTEP3_Sstiprybesiteracija = tMTEP3_Sstiprybescommand + z;
          var tMTEP3_Stobulintinaiteracija = tMTEP3_Stobulintinacommand + z;
          var joinedtMTEP3_Snr = eval(tMTEP3_Snriteracija);
          var joinedtMTEP3_Sstiprybes = eval(tMTEP3_Sstiprybesiteracija);
          var joinedtMTEP3_Stobulintina = eval(tMTEP3_Stobulintinaiteracija);
          foundUser.destytojas.tMTEP3_S.push({
            nr: joinedtMTEP3_Snr,
            stiprybes: joinedtMTEP3_Sstiprybes,
            tobulintina: joinedtMTEP3_Stobulintina
          })
        }
        foundUser.destytojas.kTOV4.kompTobulinimas_planVal = req.body.kTOV4kompTobulinimas_planVal,
          foundUser.destytojas.kTOV4.kompTobulinimas_atlVal = req.body.kTOV4kompTobulinimas_atlVal,
          foundUser.destytojas.kTOV4.organizacVeikl_planVal = req.body.kTOV4organizacVeikl_planVal,
          foundUser.destytojas.kTOV4.organizacVeikl_atlVal = req.body.kTOV4organizacVeikl_atlVal,
          foundUser.destytojas.kTOV4.isVisoValPlan = req.body.kTOV4isVisoValPlan,
          foundUser.destytojas.kTOV4.isVisoValAtl = req.body.kTOV4isVisoValAtl,
          foundUser.destytojas.kTOV4.priezastys = req.body.kTOV4priezastys

        for (let aa = 1; aa <= parseInt(req.body.yond54); aa++) {
          var kTOV4_KV03nriteracija = kTOV4_KV03nrcommand + aa;
          var kTOV4_KV03salisiteracija = kTOV4_KV03saliscommand + aa;
          var kTOV4_KV03institucijaiteracija = kTOV4_KV03institucijacommand + aa;
          var kTOV4_KV03dalykasiteracija = kTOV4_KV03dalykascommand + aa;
          var joinedkTOV4_KV03nr = eval(kTOV4_KV03nriteracija);
          var joinedkTOV4_KV03salis = eval(kTOV4_KV03salisiteracija);
          var joinedkTOV4_KV03institucija = eval(kTOV4_KV03institucijaiteracija);
          var joinedkTOV4_KV03dalykas = eval(kTOV4_KV03dalykasiteracija);
          foundUser.destytojas.kTOV4_KV03.push({
            nr: joinedkTOV4_KV03nr,
            salis: joinedkTOV4_KV03salis,
            institucija: joinedkTOV4_KV03institucija,
            dalykas: joinedkTOV4_KV03dalykas
          })
        }
        for (let ab = 1; ab <= parseInt(req.body.yond56); ab++) {
          var kTOV4_O01_1nriteracija = kTOV4_O01_1nrcommand + ab;
          var kTOV4_O01_1veiklPobuditeracija = kTOV4_O01_1veiklPobudcommand + ab;
          var kTOV4_O01_1isakNrDataiteracija = kTOV4_O01_1isakNrDatacommand + ab;
          var joinedkTOV4_O01_1nr = eval(kTOV4_O01_1nriteracija);
          var joinedkTOV4_O01_1veiklPobud = eval(kTOV4_O01_1veiklPobuditeracija);
          var joinedkTOV4_O01_1isakNrData = eval(kTOV4_O01_1isakNrDataiteracija);
          foundUser.destytojas.kTOV4_O01.kTOV4_O01_1.push({
            nr: joinedkTOV4_O01_1nr,
            veiklPobud: joinedkTOV4_O01_1veiklPobud,
            isakNrData: joinedkTOV4_O01_1isakNrData
          })
        }
        for (let ac = 1; ac <= parseInt(req.body.yond58); ac++) {
          var kTOV4_O01_2nriteracija = kTOV4_O01_2nrcommand + ac;
          var kTOV4_O01_2veiklPobuditeracija = kTOV4_O01_2veiklPobudcommand + ac;
          var kTOV4_O01_2dataVietaiteracija = kTOV4_O01_2dataVietacommand + ac;
          var kTOV4_O01_2dalyvSkiteracija = kTOV4_O01_2dalyvSkcommand + ac;
          var kTOV4_O01_2ktKomentaraiiteracija = kTOV4_O01_2ktKomentaraicommand + ac;
          var joinedkTOV4_O01_2nr = eval(kTOV4_O01_2nriteracija);
          var joinedkTOV4_O01_2veiklPobud = eval(kTOV4_O01_2veiklPobuditeracija);
          var joinedkTOV4_O01_2dataVieta = eval(kTOV4_O01_2dataVietaiteracija);
          var joinedkTOV4_O01_2dalyvSk = eval(kTOV4_O01_2dalyvSkiteracija);
          var joinedkTOV4_O01_2ktKomentarai = eval(kTOV4_O01_2ktKomentaraiiteracija);
          foundUser.destytojas.kTOV4_O01.kTOV4_O01_2.push({
            nr: joinedkTOV4_O01_2nr,
            veiklPobud: joinedkTOV4_O01_2veiklPobud,
            dataVieta: joinedkTOV4_O01_2dataVieta,
            dalyvSk: joinedkTOV4_O01_2dalyvSk,
            ktKomentarai: joinedkTOV4_O01_2ktKomentarai
          })
        }
        for (let ad = 1; ad <= parseInt(req.body.yond60); ad++) {
          var kTOV4_Snriteracija = kTOV4_Snrcommand + ad;
          var kTOV4_Sstiprybesiteracija = kTOV4_Sstiprybescommand + ad;
          var kTOV4_Stobulintinaiteracija = kTOV4_Stobulintinacommand + ad;
          var joinedkTOV4_Snr = eval(kTOV4_Snriteracija);
          var joinedkTOV4_Sstiprybes = eval(kTOV4_Sstiprybesiteracija);
          var joinedkTOV4_Stobulintina = eval(kTOV4_Stobulintinaiteracija);
          foundUser.destytojas.kTOV4_S.push({
            nr: joinedkTOV4_Snr,
            stiprybes: joinedkTOV4_Sstiprybes,
            tobulintina: joinedkTOV4_Stobulintina
          })
        }
        for (let ae = 1; ae <= parseInt(req.body.yond62); ae++) {
          var kV5_KT01nriteracija = kV5_KT01nrcommand + ae;
          var kV5_KT01diplomantasiteracija = kV5_KT01diplomantascommand + ae;
          var kV5_KT01studProgriteracija = kV5_KT01studProgrcommand + ae;
          var kV5_KT01darboTemaiteracija = kV5_KT01darboTemacommand + ae;
          var kV5_KT01uzsakovasiteracija = kV5_KT01uzsakovascommand + ae;
          var joinedkV5_KT01nr = eval(kV5_KT01nriteracija);
          var joinedkV5_KT01diplomantas = eval(kV5_KT01diplomantasiteracija);
          var joinedkV5_KT01studProgr = eval(kV5_KT01studProgriteracija);
          var joinedkV5_KT01darboTema = eval(kV5_KT01darboTemaiteracija);
          var joinedkV5_KT01uzsakovas = eval(kV5_KT01uzsakovasiteracija);
          foundUser.destytojas.kV5_KT01.push({
            nr: joinedkV5_KT01nr,
            diplomantas: joinedkV5_KT01diplomantas,
            studProgr: joinedkV5_KT01studProgr,
            darboTema: joinedkV5_KT01darboTema,
            uzsakovas: joinedkV5_KT01uzsakovas
          })
        }
        for (let af = 1; af <= parseInt(req.body.yond64); af++) {
          var kV5_KT02nriteracija = kV5_KT02nrcommand + af;
          var kV5_KT02diplomantasiteracija = kV5_KT02diplomantascommand + af;
          var kV5_KT02studProgriteracija = kV5_KT02studProgrcommand + af;
          var kV5_KT02darboTemaiteracija = kV5_KT02darboTemacommand + af;
          var joinedkV5_KT02nr = eval(kV5_KT02nriteracija);
          var joinedkV5_KT02diplomantas = eval(kV5_KT02diplomantasiteracija);
          var joinedkV5_KT02studProgr = eval(kV5_KT02studProgriteracija);
          var joinedkV5_KT02darboTema = eval(kV5_KT02darboTemaiteracija);
          foundUser.destytojas.kV5_KT02.kV5_KT02_array.push({
            nr: joinedkV5_KT02nr,
            diplomantas: joinedkV5_KT02diplomantas,
            studProgr: joinedkV5_KT02studProgr,
            darboTema: joinedkV5_KT02darboTema
          })
        }
        foundUser.destytojas.kV5_KT02.analize = req.body.kV5_KT02analize,
          foundUser.updated_for = req.user.id

        // User.findById(req.user.id, function(err, loggedUser) {
        //   if (err) {
        //     console.log(err);
        //   } else {
        //     foundUser.updated_for = loggedUser._id
        //   }
        // });

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

app.post("/update-report-dep-admin", (req, res) => {
  User.findById(req.body.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        var vardPavardcommand = "req.body.vardPavard";
        var issilavinimascommand = "req.body.issilavinimas";
        var pareigoscommand = "req.body.pareigos";
        var darbovTipascommand = "req.body.darbovTipas";
        var praktinStazascommand = "req.body.praktinStazas";
        var pedagogStazascommand = "req.body.pedagogStazas";
        var mV2_M01nrcommand = "req.body.mV2_M01nr";
        var mV2_M01veiklPavadcommand = "req.body.mV2_M01veiklPavad";
        var mV2_M01veiklRezultcommand = "req.body.mV2_M01veiklRezult";
        var mV2_M01destytojascommand = "req.body.mV2_M01destytojas";
        var mV2_M02nrcommand = "req.body.mV2_M02nr";
        var bibliografAprcommand = "req.body.bibliografApr";
        var tipascommand = "req.body.tipas";
        var mokslSritcommand = "req.body.mokslSrit";
        var mokslKryptcommand = "req.body.mokslKrypt";
        var katedracommand = "req.body.katedra";
        var mV2_M03nrcommand = "req.body.mV2_M03nr";
        var mV2_M03studProgrcommand = "req.body.mV2_M03studProgr";
        var mV2_M03dalykPavadcommand = "req.body.mV2_M03dalykPavad";
        var mV2_M03apimtisKreditcommand = "req.body.mV2_M03apimtisKredit";
        var mV2_M03destytojascommand = "req.body.mV2_M03destytojas";
        var mV2_M04nrcommand = "req.body.mV2_M04nr";
        var mV2_M04studProgrcommand = "req.body.mV2_M04studProgr";
        var mV2_M04dalykPavadcommand = "req.body.mV2_M04dalykPavad";
        var mV2_M04busenacommand = "req.body.mV2_M04busena";
        var mV2_M04apimtisKreditcommand = "req.body.mV2_M04apimtisKredit";
        var mV2_M04destytojascommand = "req.body.mV2_M04destytojas";
        var mV2_D01nrcommand = "req.body.mV2_D01nr";
        var mV2_D01studProgrcommand = "req.body.mV2_D01studProgr";
        var mV2_D01veiklacommand = "req.body.mV2_D01veikla";
        var mV2_D01rezultataicommand = "req.body.mV2_D01rezultatai";
        var mV2_D01destytojascommand = "req.body.mV2_D01destytojas";
        var mV2_D02nrcommand = "req.body.mV2_D02nr";
        var mV2_D02studProgrcommand = "req.body.mV2_D02studProgr";
        var mV2_D02veiklacommand = "req.body.mV2_D02veikla";
        var mV2_D02rezultataicommand = "req.body.mV2_D02rezultatai";
        var mV2_D02destytojascommand = "req.body.mV2_D02destytojas";
        var mV2_D03nrcommand = "req.body.mV2_D03nr";
        var mV2_D03studProgrcommand = "req.body.mV2_D03studProgr";
        var mV2_D03veiklacommand = "req.body.mV2_D03veikla";
        var mV2_D03rezultataicommand = "req.body.mV2_D03rezultatai";
        var mV2_D03destytojascommand = "req.body.mV2_D03destytojas";
        var mV2_D04nrcommand = "req.body.mV2_D04nr";
        var mV2_D04studProgrApimtcommand = "req.body.mV2_D04studProgrApimt";
        var mV2_D04progrKodascommand = "req.body.mV2_D04progrKodas";
        var mV2_D04studKryptiscommand = "req.body.mV2_D04studKryptis";
        var mV2_D04rezultataicommand = "req.body.mV2_D04rezultatai";
        var mV2_D05nrcommand = "req.body.mV2_D05nr";
        var mV2_D05studProgrcommand = "req.body.mV2_D05studProgr";
        var mV2_D05dalykPavadcommand = "req.body.mV2_D05dalykPavad";
        var mV2_D05dalykPaskirtcommand = "req.body.mV2_D05dalykPaskirt";
        var mV2_D05destytojascommand = "req.body.mV2_D05destytojas";
        var mV2_D05uzsienKalbacommand = "req.body.mV2_D05uzsienKalba";
        var mV2_D05apimtisKreditcommand = "req.body.mV2_D05apimtisKredit";
        var mV2_D06nrcommand = "req.body.mV2_D06nr";
        var mV2_D06studProgrcommand = "req.body.mV2_D06studProgr";
        var mV2_D06progrKodascommand = "req.body.mV2_D06progrKodas";
        var mV2_D06atlPatobulincommand = "req.body.mV2_D06atlPatobulin";
        var mV2_D06tobulinPriezastcommand = "req.body.mV2_D06tobulinPriezast";
        var mV2_D06tobulinIrodcommand = "req.body.mV2_D06tobulinIrod";
        var mV2_D08nrcommand = "req.body.mV2_D08nr";
        var mV2_D08studKryptiscommand = "req.body.mV2_D08studKryptis";
        var mV2_D08studProgrcommand = "req.body.mV2_D08studProgr";
        var mV2_D08progrKodascommand = "req.body.mV2_D08progrKodas";
        var mV2_D08isakDatacommand = "req.body.mV2_D08isakData";
        var mV2_D08numatomDatacommand = "req.body.mV2_D08numatomData";
        var mV2_S01nrcommand = "req.body.mV2_S01nr";
        var mV2_S01veiklacommand = "req.body.mV2_S01veikla";
        var mV2_S01dataVietacommand = "req.body.mV2_S01dataVieta";
        var mV2_S01destytojascommand = "req.body.mV2_S01destytojas";
        var mV2_Snrcommand = "req.body.mV2_Snr";
        var mV2_Sstiprybescommand = "req.body.mV2_Sstiprybes";
        var mV2_Stobulintinacommand = "req.body.mV2_Stobulintina";
        var tMTEP3_T01nrcommand = "req.body.tMTEP3_T01nr";
        var tyrTematcommand = "req.body.tyrTemat";
        var tyrGrupcommand = "req.body.tyrGrup";
        var tMTEP3_T01mokslSritcommand = "req.body.tMTEP3_T01mokslSrit";
        var tMTEP3_T01mokslKryptcommand = "req.body.tMTEP3_T01mokslKrypt";
        var tMTEP3_T01destytojascommand = "req.body.tMTEP3_T01destytojas";
        var tMTEP3_T02nrcommand = "req.body.tMTEP3_T02nr";
        var tMTEP3_T02bibliografAprcommand = "req.body.tMTEP3_T02bibliografApr";
        var tMTEP3_T02tipascommand = "req.body.tMTEP3_T02tipas";
        var tMTEP3_T02mokslSritcommand = "req.body.tMTEP3_T02mokslSrit";
        var tMTEP3_T02mokslKryptcommand = "req.body.tMTEP3_T02mokslKrypt";
        var tMTEP3_T02duomBazecommand = "req.body.tMTEP3_T02duomBaze";
        var tMTEP3_T03nrcommand = "req.body.tMTEP3_T03nr";
        var tMTEP3_T03pilnasBiblAprcommand = "req.body.tMTEP3_T03pilnasBiblApr";
        var tMTEP3_T04nrcommand = "req.body.tMTEP3_T04nr";
        var tMTEP3_T04uzsakovascommand = "req.body.tMTEP3_T04uzsakovas";
        var tMTEP3_T04temacommand = "req.body.tMTEP3_T04tema";
        var tMTEP3_T04datacommand = "req.body.tMTEP3_T04data";
        var tMTEP3_T04konsultantascommand = "req.body.tMTEP3_T04konsultantas";
        var tMTEP3_T05nrcommand = "req.body.tMTEP3_T05nr";
        var tMTEP3_T05veiklPavadcommand = "req.body.tMTEP3_T05veiklPavad";
        var tMTEP3_T05veiklRezultcommand = "req.body.tMTEP3_T05veiklRezult";
        var tMTEP3_T05destytojascommand = "req.body.tMTEP3_T05destytojas";
        var tMTEP3_T06nrcommand = "req.body.tMTEP3_T06nr";
        var tMTEP3_T06autoriuscommand = "req.body.tMTEP3_T06autorius";
        var tMTEP3_T06menoSritcommand = "req.body.tMTEP3_T06menoSrit";
        var tMTEP3_T06pobudiscommand = "req.body.tMTEP3_T06pobudis";
        var tMTEP3_T06realizVietacommand = "req.body.tMTEP3_T06realizVieta";
        var tMTEP3_T06datacommand = "req.body.tMTEP3_T06data";
        var tMTEP3_T07nrcommand = "req.body.tMTEP3_T07nr";
        var tMTEP3_T07atlikejascommand = "req.body.tMTEP3_T07atlikejas";
        var tMTEP3_T07menoSritcommand = "req.body.tMTEP3_T07menoSrit";
        var tMTEP3_T07pavadinimascommand = "req.body.tMTEP3_T07pavadinimas";
        var tMTEP3_T07atlikVietacommand = "req.body.tMTEP3_T07atlikVieta";
        var tMTEP3_T07datacommand = "req.body.tMTEP3_T07data";
        var tMTEP3_T08Snrcommand = "req.body.tMTEP3_T08Snr";
        var tMTEP3_T08atlikejascommand = "req.body.tMTEP3_T08atlikejas";
        var tMTEP3_T08menoSritcommand = "req.body.tMTEP3_T08menoSrit";
        var tMTEP3_T08pavadinimascommand = "req.body.tMTEP3_T08pavadinimas";
        var tMTEP3_T08atlikVietacommand = "req.body.tMTEP3_T08atlikVieta";
        var tMTEP3_T08datacommand = "req.body.tMTEP3_T08data";
        var tMTEP3_T09nrcommand = "req.body.tMTEP3_T09nr";
        var tMTEP3_T09atlikejascommand = "req.body.tMTEP3_T09atlikejas";
        var tMTEP3_T09menoSritcommand = "req.body.tMTEP3_T09menoSrit";
        var tMTEP3_T09pavadinimascommand = "req.body.tMTEP3_T09pavadinimas";
        var tMTEP3_T09atlikVietacommand = "req.body.tMTEP3_T09atlikVieta";
        var tMTEP3_T09datacommand = "req.body.tMTEP3_T09data";
        var tMTEP3_T10nrcommand = "req.body.tMTEP3_T10nr";
        var tMTEP3_T10destytojascommand = "req.body.tMTEP3_T10destytojas";
        var tMTEP3_T10veiklPobudcommand = "req.body.tMTEP3_T10veiklPobud";
        var tMTEP3_T10veiklTikslcommand = "req.body.tMTEP3_T10veiklTiksl";
        var tMTEP3_T10dataVietacommand = "req.body.tMTEP3_T10dataVieta";
        var tMTEP3_T10dalyvSkcommand = "req.body.tMTEP3_T10dalyvSk";
        var tMTEP3_T10ktKomentaraicommand = "req.body.tMTEP3_T10ktKomentarai";
        var tMTEP3_T11nrcommand = "req.body.tMTEP3_T11nr";
        var tMTEP3_T11destytojascommand = "req.body.tMTEP3_T11destytojas";
        var tMTEP3_T11veiklPobudcommand = "req.body.tMTEP3_T11veiklPobud";
        var tMTEP3_T11veiklTikslcommand = "req.body.tMTEP3_T11veiklTiksl";
        var tMTEP3_T11dataVietacommand = "req.body.tMTEP3_T11dataVieta";
        var tMTEP3_T11dalyvSkcommand = "req.body.tMTEP3_T11dalyvSk";
        var tMTEP3_T11ktKomentaraicommand = "req.body.tMTEP3_T11ktKomentarai";
        var tMTEP3_T12nrcommand = "req.body.tMTEP3_T12nr";
        var tMTEP3_T12destytojascommand = "req.body.tMTEP3_T12destytojas";
        var tMTEP3_T12veiklPobudcommand = "req.body.tMTEP3_T12veiklPobud";
        var tMTEP3_T12dataVietacommand = "req.body.tMTEP3_T12dataVieta";
        var tMTEP3_T13nrcommand = "req.body.tMTEP3_T13nr";
        var tMTEP3_T13destytojascommand = "req.body.tMTEP3_T13destytojas";
        var tMTEP3_T13studDuomcommand = "req.body.tMTEP3_T13studDuom";
        var tMTEP3_T13renginioPavadcommand = "req.body.tMTEP3_T13renginioPavad";
        var tMTEP3_T13rezultatascommand = "req.body.tMTEP3_T13rezultatas";
        var tMTEP3_T13datacommand = "req.body.tMTEP3_T13data";
        var tMTEP3_T14nrcommand = "req.body.tMTEP3_T14nr";
        var tMTEP3_T14destytojascommand = "req.body.tMTEP3_T14destytojas";
        var tMTEP3_T14renginyscommand = "req.body.tMTEP3_T14renginys";
        var tMTEP3_T14veiklPobudcommand = "req.body.tMTEP3_T14veiklPobud";
        var tMTEP3_T14dataVietacommand = "req.body.tMTEP3_T14dataVieta";
        var tMTEP3_T15nrcommand = "req.body.tMTEP3_T15nr";
        var tMTEP3_T15mokymaicommand = "req.body.tMTEP3_T15mokymai";
        var tMTEP3_T15vykdytojaicommand = "req.body.tMTEP3_T15vykdytojai";
        var tMTEP3_T15uzsakovascommand = "req.body.tMTEP3_T15uzsakovas";
        var tMTEP3_T15sumacommand = "req.body.tMTEP3_T15suma";
        var tMTEP3_T15nrDatacommand = "req.body.tMTEP3_T15nrData";
        var tMTEP3_T15klausytojaicommand = "req.body.tMTEP3_T15klausytojai";
        var tMTEP3_T15trukmecommand = "req.body.tMTEP3_T15trukme";
        var tMTEP3_T16nrcommand = "req.body.tMTEP3_T16nr";
        var tMTEP3_T16pavadinimascommand = "req.body.tMTEP3_T16pavadinimas";
        var tMTEP3_T16uzsakovascommand = "req.body.tMTEP3_T16uzsakovas";
        var tMTEP3_T16rengejaicommand = "req.body.tMTEP3_T16rengejai";
        var tMTEP3_Snrcommand = "req.body.tMTEP3_Snr";
        var tMTEP3_Sstiprybescommand = "req.body.tMTEP3_Sstiprybes";
        var tMTEP3_Stobulintinacommand = "req.body.tMTEP3_Stobulintina";
        var kTOV4_KV01dalykStazuotespavadcommand = "req.body.kTOV4_KV01dalykStazuotespavad";
        var kTOV4_KV01dalykStazuotespavadcommand = "req.body.kTOV4_KV01dalykStazuotespavad";
        var kTOV4_KV01dalykStazuotespazymNrcommand = "req.body.kTOV4_KV01dalykStazuotespazymNr";
        var kTOV4_KV01dalykStazuotestrukmeValcommand = "req.body.kTOV4_KV01dalykStazuotestrukmeVal";
        var kTOV4_KV01dalykStazuotesdalyviscommand = "req.body.kTOV4_KV01dalykStazuotesdalyvis";
        var kTOV4_KV01dalykSeminaraipavadcommand = "req.body.kTOV4_KV01dalykSeminaraipavad";
        var kTOV4_KV01dalykSeminaraipazymNrcommand = "req.body.kTOV4_KV01dalykSeminaraipazymNr";
        var kTOV4_KV01dalykSeminaraitrukmeValcommand = "req.body.kTOV4_KV01dalykSeminaraitrukmeVal";
        var kTOV4_KV01dalykSeminaraidalyviscommand = "req.body.kTOV4_KV01dalykSeminaraidalyvis";
        var kTOV4_KV01dalykKonfpavadcommand = "req.body.kTOV4_KV01dalykKonfpavad";
        var kTOV4_KV01dalykKonfpazymNrcommand = "req.body.kTOV4_KV01dalykKonfpazymNr";
        var kTOV4_KV01dalykKonftrukmeValcommand = "req.body.kTOV4_KV01dalykKonftrukmeVal";
        var kTOV4_KV01dalykKonfdalyviscommand = "req.body.kTOV4_KV01dalykKonfdalyvis";
        var kTOV4_KV01dalykKursaipavadcommand = "req.body.kTOV4_KV01dalykKursaipavad";
        var kTOV4_KV01dalykKursaipazymNrcommand = "req.body.kTOV4_KV01dalykKursaipazymNr";
        var kTOV4_KV01dalykKursaitrukmeValcommand = "req.body.kTOV4_KV01dalykKursaitrukmeVal";
        var kTOV4_KV01dalykKursaidalyviscommand = "req.body.kTOV4_KV01dalykKursaidalyvis";
        var kTOV4_KV01didakStazuotespavadcommand = "req.body.kTOV4_KV01didakStazuotespavad";
        var kTOV4_KV01didakStazuotespazymNrcommand = "req.body.kTOV4_KV01didakStazuotespazymNr";
        var kTOV4_KV01didakStazuotestrukmeValcommand = "req.body.kTOV4_KV01didakStazuotestrukmeVal";
        var kTOV4_KV01didakStazuotesdalyviscommand = "req.body.kTOV4_KV01didakStazuotesdalyvis";
        var kTOV4_KV01didakSeminaraipavadcommand = "req.body.kTOV4_KV01didakSeminaraipavad";
        var kTOV4_KV01didakSeminaraipazymNrcommand = "req.body.kTOV4_KV01didakSeminaraipazymNr";
        var kTOV4_KV01didakSeminaraitrukmeValcommand = "req.body.kTOV4_KV01didakSeminaraitrukmeVal";
        var kTOV4_KV01didakSeminaraidalyviscommand = "req.body.kTOV4_KV01didakSeminaraidalyvis";
        var kTOV4_KV01didakKonfpavadcommand = "req.body.kTOV4_KV01didakKonfpavad";
        var kTOV4_KV01didakKonfpazymNrcommand = "req.body.kTOV4_KV01didakKonfpazymNr";
        var kTOV4_KV01didakKonftrukmeValcommand = "req.body.kTOV4_KV01didakKonftrukmeVal";
        var kTOV4_KV01didakKonfdalyviscommand = "req.body.kTOV4_KV01didakKonfdalyvis";
        var kTOV4_KV01didakKursaipavadcommand = "req.body.kTOV4_KV01didakKursaipavad";
        var kTOV4_KV01didakKursaipazymNrcommand = "req.body.kTOV4_KV01didakKursaipazymNr";
        var kTOV4_KV01didakKursaitrukmeValcommand = "req.body.kTOV4_KV01didakKursaitrukmeVal";
        var kTOV4_KV01didakKursaidalyviscommand = "req.body.kTOV4_KV01didakKursaidalyvis";
        var kTOV4_KV01bendrStazuotespavadcommand = "req.body.kTOV4_KV01bendrStazuotespavad";
        var kTOV4_KV01bendrStazuotespazymNrcommand = "req.body.kTOV4_KV01bendrStazuotespazymNr";
        var kTOV4_KV01bendrStazuotestrukmeValcommand = "req.body.kTOV4_KV01bendrStazuotestrukmeVal";
        var kTOV4_KV01bendrStazuotesdalyviscommand = "req.body.kTOV4_KV01bendrStazuotesdalyvis";
        var kTOV4_KV01bendrSeminaraipavadcommand = "req.body.kTOV4_KV01bendrSeminaraipavad";
        var kTOV4_KV01bendrSeminaraipazymNrcommand = "req.body.kTOV4_KV01bendrSeminaraipazymNr";
        var kTOV4_KV01bendrSeminaraitrukmeValcommand = "req.body.kTOV4_KV01bendrSeminaraitrukmeVal";
        var kTOV4_KV01bendrSeminaraidalyviscommand = "req.body.kTOV4_KV01bendrSeminaraidalyvis";
        var kTOV4_KV01bendrKonfpavadcommand = "req.body.kTOV4_KV01bendrKonfpavad";
        var kTOV4_KV01bendrKonfpazymNrcommand = "req.body.kTOV4_KV01bendrKonfpazymNr";
        var kTOV4_KV01bendrKonftrukmeValcommand = "req.body.kTOV4_KV01bendrKonftrukmeVal";
        var kTOV4_KV01bendrKonfdalyviscommand = "req.body.kTOV4_KV01bendrKonfdalyvis";
        var kTOV4_KV01bendrKursaipavadcommand = "req.body.kTOV4_KV01bendrKursaipavad";
        var kTOV4_KV01bendrKursaipazymNrcommand = "req.body.kTOV4_KV01bendrKursaipazymNr";
        var kTOV4_KV01bendrKursaitrukmeValcommand = "req.body.kTOV4_KV01bendrKursaitrukmeVal";
        var kTOV4_KV01bendrKursaidalyviscommand = "req.body.kTOV4_KV01bendrKursaidalyvis";

        var kTOV4_KV02dalykStazuotespavadcommand = "req.body.kTOV4_KV02dalykStazuotespavad";
        var kTOV4_KV02dalykStazuotespavadcommand = "req.body.kTOV4_KV02dalykStazuotespavad";
        var kTOV4_KV02dalykStazuotespazymNrcommand = "req.body.kTOV4_KV02dalykStazuotespazymNr";
        var kTOV4_KV02dalykStazuotestrukmeValcommand = "req.body.kTOV4_KV02dalykStazuotestrukmeVal";
        var kTOV4_KV02dalykStazuotesdalyviscommand = "req.body.kTOV4_KV02dalykStazuotesdalyvis";
        var kTOV4_KV02dalykSeminaraipavadcommand = "req.body.kTOV4_KV02dalykSeminaraipavad";
        var kTOV4_KV02dalykSeminaraipazymNrcommand = "req.body.kTOV4_KV02dalykSeminaraipazymNr";
        var kTOV4_KV02dalykSeminaraitrukmeValcommand = "req.body.kTOV4_KV02dalykSeminaraitrukmeVal";
        var kTOV4_KV02dalykSeminaraidalyviscommand = "req.body.kTOV4_KV02dalykSeminaraidalyvis";
        var kTOV4_KV02dalykKonfpavadcommand = "req.body.kTOV4_KV02dalykKonfpavad";
        var kTOV4_KV02dalykKonfpazymNrcommand = "req.body.kTOV4_KV02dalykKonfpazymNr";
        var kTOV4_KV02dalykKonftrukmeValcommand = "req.body.kTOV4_KV02dalykKonftrukmeVal";
        var kTOV4_KV02dalykKonfdalyviscommand = "req.body.kTOV4_KV02dalykKonfdalyvis";
        var kTOV4_KV02dalykKursaipavadcommand = "req.body.kTOV4_KV02dalykKursaipavad";
        var kTOV4_KV02dalykKursaipazymNrcommand = "req.body.kTOV4_KV02dalykKursaipazymNr";
        var kTOV4_KV02dalykKursaitrukmeValcommand = "req.body.kTOV4_KV02dalykKursaitrukmeVal";
        var kTOV4_KV02dalykKursaidalyviscommand = "req.body.kTOV4_KV02dalykKursaidalyvis";
        var kTOV4_KV02didakStazuotespavadcommand = "req.body.kTOV4_KV02didakStazuotespavad";
        var kTOV4_KV02didakStazuotespazymNrcommand = "req.body.kTOV4_KV02didakStazuotespazymNr";
        var kTOV4_KV02didakStazuotestrukmeValcommand = "req.body.kTOV4_KV02didakStazuotestrukmeVal";
        var kTOV4_KV02didakStazuotesdalyviscommand = "req.body.kTOV4_KV02didakStazuotesdalyvis";
        var kTOV4_KV02didakSeminaraipavadcommand = "req.body.kTOV4_KV02didakSeminaraipavad";
        var kTOV4_KV02didakSeminaraipazymNrcommand = "req.body.kTOV4_KV02didakSeminaraipazymNr";
        var kTOV4_KV02didakSeminaraitrukmeValcommand = "req.body.kTOV4_KV02didakSeminaraitrukmeVal";
        var kTOV4_KV02didakSeminaraidalyviscommand = "req.body.kTOV4_KV02didakSeminaraidalyvis";
        var kTOV4_KV02didakKonfpavadcommand = "req.body.kTOV4_KV02didakKonfpavad";
        var kTOV4_KV02didakKonfpazymNrcommand = "req.body.kTOV4_KV02didakKonfpazymNr";
        var kTOV4_KV02didakKonftrukmeValcommand = "req.body.kTOV4_KV02didakKonftrukmeVal";
        var kTOV4_KV02didakKonfdalyviscommand = "req.body.kTOV4_KV02didakKonfdalyvis";
        var kTOV4_KV02didakKursaipavadcommand = "req.body.kTOV4_KV02didakKursaipavad";
        var kTOV4_KV02didakKursaipazymNrcommand = "req.body.kTOV4_KV02didakKursaipazymNr";
        var kTOV4_KV02didakKursaitrukmeValcommand = "req.body.kTOV4_KV02didakKursaitrukmeVal";
        var kTOV4_KV02didakKursaidalyviscommand = "req.body.kTOV4_KV02didakKursaidalyvis";
        var kTOV4_KV02bendrStazuotespavadcommand = "req.body.kTOV4_KV02bendrStazuotespavad";
        var kTOV4_KV02bendrStazuotespazymNrcommand = "req.body.kTOV4_KV02bendrStazuotespazymNr";
        var kTOV4_KV02bendrStazuotestrukmeValcommand = "req.body.kTOV4_KV02bendrStazuotestrukmeVal";
        var kTOV4_KV02bendrStazuotesdalyviscommand = "req.body.kTOV4_KV02bendrStazuotesdalyvis";
        var kTOV4_KV02bendrSeminaraipavadcommand = "req.body.kTOV4_KV02bendrSeminaraipavad";
        var kTOV4_KV02bendrSeminaraipazymNrcommand = "req.body.kTOV4_KV02bendrSeminaraipazymNr";
        var kTOV4_KV02bendrSeminaraitrukmeValcommand = "req.body.kTOV4_KV02bendrSeminaraitrukmeVal";
        var kTOV4_KV02bendrSeminaraidalyviscommand = "req.body.kTOV4_KV02bendrSeminaraidalyvis";
        var kTOV4_KV02bendrKonfpavadcommand = "req.body.kTOV4_KV02bendrKonfpavad";
        var kTOV4_KV02bendrKonfpazymNrcommand = "req.body.kTOV4_KV02bendrKonfpazymNr";
        var kTOV4_KV02bendrKonftrukmeValcommand = "req.body.kTOV4_KV02bendrKonftrukmeVal";
        var kTOV4_KV02bendrKonfdalyviscommand = "req.body.kTOV4_KV02bendrKonfdalyvis";
        var kTOV4_KV02bendrKursaipavadcommand = "req.body.kTOV4_KV02bendrKursaipavad";
        var kTOV4_KV02bendrKursaipazymNrcommand = "req.body.kTOV4_KV02bendrKursaipazymNr";
        var kTOV4_KV02bendrKursaitrukmeValcommand = "req.body.kTOV4_KV02bendrKursaitrukmeVal";
        var kTOV4_KV02bendrKursaidalyviscommand = "req.body.kTOV4_KV02bendrKursaidalyvis";
        var kTOV4_KV03nrcommand = "req.body.kTOV4_KV03nr";
        var kTOV4_KV03destytojascommand = "req.body.kTOV4_KV03destytojas";
        var kTOV4_KV03saliscommand = "req.body.kTOV4_KV03salis";
        var kTOV4_KV03institucijacommand = "req.body.kTOV4_KV03institucija";
        var kTOV4_KV03dalykascommand = "req.body.kTOV4_KV03dalykas";
        var kTOV4_O01_1nrcommand = "req.body.kTOV4_O01_1nr";
        var kTOV4_O01_1destytojascommand = "req.body.kTOV4_O01_1destytojas";
        var kTOV4_O01_1veiklPobudcommand = "req.body.kTOV4_O01_1veiklPobud";
        var kTOV4_O01_1isakNrDatacommand = "req.body.kTOV4_O01_1isakNrData";
        var kTOV4_O01_2nrcommand = "req.body.kTOV4_O01_2nr";
        var kTOV4_O01_2destytojascommand = "req.body.kTOV4_O01_2destytojas";
        var kTOV4_O01_2veiklPobudcommand = "req.body.kTOV4_O01_2veiklPobud";
        var kTOV4_O01_2dataVietacommand = "req.body.kTOV4_O01_2dataVieta";
        var kTOV4_O01_2dalyvSkcommand = "req.body.kTOV4_O01_2dalyvSk";
        var kTOV4_O01_2ktKomentaraicommand = "req.body.kTOV4_O01_2ktKomentarai";
        var kTOV4_O02nrcommand = "req.body.kTOV4_O02nr";
        var kTOV4_O02atstovascommand = "req.body.kTOV4_O02atstovas";
        var kTOV4_O02partneriaicommand = "req.body.kTOV4_O02partneriai";
        var kTOV4_O02formacommand = "req.body.kTOV4_O02forma";
        var kTOV4_O02rezultataicommand = "req.body.kTOV4_O02rezultatai";
        var kTOV4_O02sutartiscommand = "req.body.kTOV4_O02sutartis";
        var kTOV4_O02tipascommand = "req.body.kTOV4_O02tipas";
        var kTOV4_Snrcommand = "req.body.kTOV4_Snr";
        var kTOV4_Sstiprybescommand = "req.body.kTOV4_Sstiprybes";
        var kTOV4_Stobulintinacommand = "req.body.kTOV4_Stobulintina";
        var kV5_KT01nrcommand = "req.body.kV5_KT01nr";
        var kV5_KT01diplomantascommand = "req.body.kV5_KT01diplomantas";
        var kV5_KT01studProgrcommand = "req.body.kV5_KT01studProgr";
        var kV5_KT01darboTemacommand = "req.body.kV5_KT01darboTema";
        var kV5_KT01uzsakovascommand = "req.body.kV5_KT01uzsakovas";
        var kV5_KT02nrcommand = "req.body.kV5_KT02nr";
        var kV5_KT02diplomantascommand = "req.body.kV5_KT02diplomantas";
        var kV5_KT02studProgrcommand = "req.body.kV5_KT02studProgr";
        var kV5_KT02darboTemacommand = "req.body.kV5_KT02darboTema";
        var kV5_KT03nrcommand = "req.body.kV5_KT03nr";
        var kV5_KT03studProgrcommand = "req.body.kV5_KT03studProgr";
        var kV5_KT03baigSkcommand = "req.body.kV5_KT03baigSk";
        var kV5_KT03iregUzimtumSkcommand = "req.body.kV5_KT03iregUzimtumSk";
        var kV5_KT03isidarbinProccommand = "req.body.kV5_KT03isidarbinProc";
        var kV5_KT04nrcommand = "req.body.kV5_KT04nr";
        var kV5_KT04autoriuscommand = "req.body.kV5_KT04autorius";
        var kV5_KT04veiklTipascommand = "req.body.kV5_KT04veiklTipas";
        var kV5_KT04pavadinimascommand = "req.body.kV5_KT04pavadinimas";
        var kV5_KT04sutartNrcommand = "req.body.kV5_KT04sutartNr";
        var kV5_KT04uzsakovascommand = "req.body.kV5_KT04uzsakovas";
        var kV5_KT04uzsakSumacommand = "req.body.kV5_KT04uzsakSuma";
        var veiklSavinalizenrcommand = "req.body.veiklSavinalizenr";
        var veiklSavinalizestiprybescommand = "req.body.veiklSavinalizestiprybes";
        var veiklSavinalizetobulintinacommand = "req.body.veiklSavinalizetobulintina";
        foundUser.katedrosVedejas.kDS1 = new Array();
        foundUser.katedrosVedejas.mV2.mV2_M01 = new Array();
        foundUser.katedrosVedejas.mV2.mV2_M02 = new Array();
        foundUser.katedrosVedejas.mV2.mV2_M03 = new Array();
        foundUser.katedrosVedejas.mV2.mV2_M04 = new Array();
        foundUser.katedrosVedejas.mV2.mV2_D01 = new Array();
        foundUser.katedrosVedejas.mV2.mV2_D02 = new Array();
        foundUser.katedrosVedejas.mV2.mV2_D03 = new Array();
        foundUser.katedrosVedejas.mV2.mV2_D04 = new Array();
        foundUser.katedrosVedejas.mV2.mV2_D05 = new Array();
        foundUser.katedrosVedejas.mV2.mV2_D06 = new Array();
        foundUser.katedrosVedejas.mV2.mV2_D08 = new Array();
        foundUser.katedrosVedejas.mV2.mV2_S01 = new Array();
        foundUser.katedrosVedejas.mV2.mV2_S = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T01 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T02 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T03 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T04 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T05 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T06 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T07 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T08 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T09 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T10 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T11 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T12 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T13 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T14 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T15 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T16 = new Array();
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_S = new Array();

        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01dalykines_komp.stazuotes = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01dalykines_komp.seminarai = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01dalykines_komp.konferencijos = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01dalykines_komp.kursai = new Array();

        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01didaktines_komp.stazuotes = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01didaktines_komp.seminarai = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01didaktines_komp.konferencijos = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01didaktines_komp.kursai = new Array();

        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01bendrosios_komp.stazuotes = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01bendrosios_komp.seminarai = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01bendrosios_komp.konferencijos = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01bendrosios_komp.kursai = new Array();

        foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02dalykines_komp.stazuotes = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02dalykines_komp.seminarai = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02dalykines_komp.konferencijos = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02dalykines_komp.kursai = new Array();

        foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02didaktines_komp.stazuotes = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02didaktines_komp.seminarai = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02didaktines_komp.konferencijos = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02didaktines_komp.kursai = new Array();

        foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02bendrosios_komp.stazuotes = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02bendrosios_komp.seminarai = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02bendrosios_komp.konferencijos = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02bendrosios_komp.kursai = new Array();

        foundUser.katedrosVedejas.kTOV4.kTOV4_O01.kTOV4_O01_1 = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_O01.kTOV4_O01_2 = new Array();

        foundUser.katedrosVedejas.kTOV4.kTOV4_KV03 = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_O02 = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_S = new Array();
        foundUser.katedrosVedejas.kV5.kV5_KT03.kV5_KT03_array = new Array();
        foundUser.katedrosVedejas.kV5.kV5_KT01 = new Array();
        foundUser.katedrosVedejas.kV5.kV5_KT02 = new Array();
        foundUser.katedrosVedejas.kV5.kV5_KT04 = new Array();
        foundUser.katedrosVedejas.kV5.veiklSavinalize.veiklSavinaliz_array = new Array();

        for (let i = 1; i <= parseInt(req.body.deslist); i++) {
          var vardPavardcommandi = vardPavardcommand + i;
          var issilavinimascommandi = issilavinimascommand + i;
          var pareigoscommandi = pareigoscommand + i;
          var darbovTipascommandi = darbovTipascommand + i;
          var praktinStazascommandi = praktinStazascommand + i;
          var pedagogStazascommandi = pedagogStazascommand + i;
          var joinedvardPavardcommand = eval(vardPavardcommandi);
          var joinedpareigoscommand = eval(pareigoscommandi);
          var joineddarbovTipascommand = eval(darbovTipascommandi);
          var joinedpraktinStazascommand = eval(praktinStazascommandi);
          var joinedpedagogStazascommand = eval(pedagogStazascommandi);
          var joinedissilavinimascommand = eval(issilavinimascommandi);
          foundUser.katedrosVedejas.kDS1.push({
            nr: i,
            vardPavard: joinedvardPavardcommand,
            issilavinimas: joinedissilavinimascommand,
            pareigos: joinedpareigoscommand,
            darbovTipas: joineddarbovTipascommand,
            pedagogStazas: joinedpedagogStazascommand,
            praktinStazas: joinedpraktinStazascommand
          })
        }
        for (let i = 1; i <= parseInt(req.body.yond6); i++) {
          var mV2_M01nrcommandi = mV2_M01nrcommand + i;
          var mV2_M01veiklPavadcommandi = mV2_M01veiklPavadcommand + i;
          var mV2_M01veiklRezultcommandi = mV2_M01veiklRezultcommand + i;
          var mV2_M01destytojascommandi = mV2_M01destytojascommand + i;
          var joinedmV2_M01nr = eval(mV2_M01nrcommandi);
          var joinedmV2_M01veiklPavad = eval(mV2_M01veiklPavadcommandi);
          var joinedmV2_M01veiklRezult = eval(mV2_M01veiklRezultcommandi);
          var joinedmV2_M01destytojas = eval(mV2_M01destytojascommandi);
          foundUser.katedrosVedejas.mV2.mV2_M01.push({
            nr: joinedmV2_M01nr,
            veiklPavad: joinedmV2_M01veiklPavad,
            veiklRezult: joinedmV2_M01veiklRezult,
            destytojas: joinedmV2_M01destytojas
          })
        }
        for (let i = 1; i <= parseInt(req.body.yond8); i++) {
          var mV2_M02nrcommandi = mV2_M02nrcommand + i;
          var bibliografAprcommandi = bibliografAprcommand + i;
          var tipascommandi = tipascommand + i;
          var mokslSritcommandi = mokslSritcommand + i;
          var mokslKryptcommandi = mokslKryptcommand + i;
          var katedracommandi = katedracommand + i;
          var joinedmV2_M02nr = eval(mV2_M02nrcommandi);
          var joinedbibliografApr = eval(bibliografAprcommandi);
          var joinedtipas = eval(tipascommandi);
          var joinedmokslSrit = eval(mokslSritcommandi);
          var joinedmokslKrypt = eval(mokslKryptcommandi);
          var joinedkatedra = eval(katedracommandi);
          foundUser.katedrosVedejas.mV2.mV2_M02.push({
            nr: joinedmV2_M02nr,
            bibliografApr: joinedbibliografApr,
            destytojas: joinedbibliografApr,
            tipas: joinedtipas,
            mokslSrit: joinedmokslSrit,
            mokslKrypt: joinedmokslKrypt,
            katedra: joinedkatedra
          })
        }
        for (let i = 1; i <= parseInt(req.body.yond10); i++) {
          var mV2_M03nrcommandi = mV2_M03nrcommand + i;
          var mV2_M03studProgrcommandi = mV2_M03studProgrcommand + i;
          var mV2_M03dalykPavadcommandi = mV2_M03dalykPavadcommand + i;
          var mV2_M03apimtisKreditcommandi = mV2_M03apimtisKreditcommand + i;
          var mV2_M03destytojascommandi = mV2_M03destytojascommand + i;
          var joinedmV2_M03nr = eval(mV2_M03nrcommandi);
          var joinedmV2_M03studProgr = eval(mV2_M03studProgrcommandi);
          var joinedmV2_M03dalykPavad = eval(mV2_M03dalykPavadcommandi);
          var joinedmV2_M03apimtisKredit = eval(mV2_M03apimtisKreditcommandi);
          var joinedmV2_M03destytojas = eval(mV2_M03destytojascommandi);
          foundUser.katedrosVedejas.mV2.mV2_M03.push({
            nr: joinedmV2_M03nr,
            studProgr: joinedmV2_M03studProgr,
            dalykPavad: joinedmV2_M03dalykPavad,
            apimtisKredit: joinedmV2_M03apimtisKredit,
            destytojas: joinedmV2_M03destytojas
          })
        }
        for (let i = 1; i <= parseInt(req.body.yond12); i++) {
          var mV2_M04nrcommandi = mV2_M04nrcommand + i;
          var mV2_M04studProgrcommandi = mV2_M04studProgrcommand + i;
          var mV2_M04dalykPavadcommandi = mV2_M04dalykPavadcommand + i;
          var mV2_M04busenacommandi = mV2_M04busenacommand + i;
          var mV2_M04apimtisKreditcommandi = mV2_M04apimtisKreditcommand + i;
          var mV2_M04destytojascommandi = mV2_M04destytojascommand + i;
          var joinedmV2_M04nr = eval(mV2_M04nrcommandi);
          var joinedmV2_M04studProgr = eval(mV2_M04studProgrcommandi);
          var joinedmV2_M04dalykPavad = eval(mV2_M04dalykPavadcommandi);
          var joinedmV2_M04busena = eval(mV2_M04busenacommandi);
          var joinedmV2_M04apimtisKredit = eval(mV2_M04apimtisKreditcommandi);
          var joinedmV2_M04destytojas = eval(mV2_M04destytojascommandi);
          foundUser.katedrosVedejas.mV2.mV2_M04.push({
            nr: joinedmV2_M04nr,
            studProgr: joinedmV2_M04studProgr,
            dalykPavad: joinedmV2_M04dalykPavad,
            busena: joinedmV2_M04busena,
            apimtisKredit: joinedmV2_M04apimtisKredit,
            destytojas: joinedmV2_M04destytojas
          })
        }
        for (let i = 1; i <= parseInt(req.body.yond14); i++) {
          var mV2_D01nrcommandi = mV2_D01nrcommand + i;
          var mV2_D01studProgrcommandi = mV2_D01studProgrcommand + i;
          var mV2_D01veiklacommandi = mV2_D01veiklacommand + i;
          var mV2_D01rezultataicommandi = mV2_D01rezultataicommand + i;
          var mV2_D01destytojascommandi = mV2_D01destytojascommand + i;
          var joinedmV2_D01nr = eval(mV2_D01nrcommandi);
          var joinedmV2_D01studProgr = eval(mV2_D01studProgrcommandi);
          var joinedmV2_D01veikla = eval(mV2_D01veiklacommandi);
          var joinedmV2_D01rezultatai = eval(mV2_D01rezultataicommandi);
          var joinedmV2_D01destytojas = eval(mV2_D01destytojascommandi);
          foundUser.katedrosVedejas.mV2.mV2_D01.push({
            nr: joinedmV2_D01nr,
            studProgr: joinedmV2_D01studProgr,
            veikla: joinedmV2_D01veikla,
            rezultatai: joinedmV2_D01rezultatai,
            destytojas: joinedmV2_D01destytojas
          })
        }
        for (let i = 1; i <= parseInt(req.body.yond16); i++) {
          var mV2_D02nrcommandi = mV2_D02nrcommand + i;
          var mV2_D02studProgrcommandi = mV2_D02studProgrcommand + i;
          var mV2_D02veiklacommandi = mV2_D02veiklacommand + i;
          var mV2_D02rezultataicommandi = mV2_D02rezultataicommand + i;
          var mV2_D02destytojascommandi = mV2_D02destytojascommand + i;
          var joinedmV2_D02nr = eval(mV2_D02nrcommandi);
          var joinedmV2_D02studProgr = eval(mV2_D02studProgrcommandi);
          var joinedmV2_D02veikla = eval(mV2_D02veiklacommandi);
          var joinedmV2_D02rezultatai = eval(mV2_D02rezultataicommandi);
          var joinedmV2_D02destytojas = eval(mV2_D02destytojascommandi);
          foundUser.katedrosVedejas.mV2.mV2_D02.push({
            nr: joinedmV2_D02nr,
            studProgr: joinedmV2_D02studProgr,
            veikla: joinedmV2_D02veikla,
            rezultatai: joinedmV2_D02rezultatai,
            destytojas: joinedmV2_D02destytojas
          })
        }
        for (let i = 1; i <= parseInt(req.body.yond18); i++) {
          var mV2_D03nrcommandi = mV2_D03nrcommand + i;
          var mV2_D03studProgrcommandi = mV2_D03studProgrcommand + i;
          var mV2_D03veiklacommandi = mV2_D03veiklacommand + i;
          var mV2_D03rezultataicommandi = mV2_D03rezultataicommand + i;
          var mV2_D03destytojascommandi = mV2_D03destytojascommand + i;
          var joinedmV2_D03nr = eval(mV2_D03nrcommandi);
          var joinedmV2_D03studProgr = eval(mV2_D03studProgrcommandi);
          var joinedmV2_D03veikla = eval(mV2_D03veiklacommandi);
          var joinedmV2_D03rezultatai = eval(mV2_D03rezultataicommandi);
          var joinedmV2_D03destytojas = eval(mV2_D03destytojascommandi);
          foundUser.katedrosVedejas.mV2.mV2_D03.push({
            nr: joinedmV2_D03nr,
            studProgr: joinedmV2_D03studProgr,
            veikla: joinedmV2_D03veikla,
            rezultatai: joinedmV2_D03rezultatai,
            destytojas: joinedmV2_D03destytojas
          })
        }
        for (let i = 1; i <= parseInt(req.body.yonder2); i++) {
          var mV2_D04nrcommandi = mV2_D04nrcommand + i;
          var mV2_D04studProgrApimtcommandi = mV2_D04studProgrApimtcommand + i;
          var mV2_D04progrKodascommandi = mV2_D04progrKodascommand + i;
          var mV2_D04studKryptiscommandi = mV2_D04studKryptiscommand + i;
          var mV2_D04rezultataicommandi = mV2_D04rezultataicommand + i;
          var joinedmV2_D04nr = eval(mV2_D04nrcommandi);
          var joinedmV2_D04studProgrApimt = eval(mV2_D04studProgrApimtcommandi);
          var joinedmV2_D04progrKodas = eval(mV2_D04progrKodascommandi);
          var joinedmV2_D04studKryptis = eval(mV2_D04studKryptiscommandi);
          var joinedmV2_D04rezultatai = eval(mV2_D04rezultataicommandi);
          foundUser.katedrosVedejas.mV2.mV2_D04.push({
            nr: joinedmV2_D04nr,
            studProgrApimt: joinedmV2_D04studProgrApimt,
            progrKodas: joinedmV2_D04progrKodas,
            studKryptis: joinedmV2_D04studKryptis,
            rezultatai: joinedmV2_D04rezultatai
          })
        }
        for (let i = 1; i <= parseInt(req.body.yonder4); i++) {
          var mV2_D05nrcommandi = mV2_D05nrcommand + i;
          var mV2_D05studProgrcommandi = mV2_D05studProgrcommand + i;
          var mV2_D05dalykPavadcommandi = mV2_D05dalykPavadcommand + i;
          var mV2_D05dalykPaskirtcommandi = mV2_D05dalykPaskirtcommand + i;
          var mV2_D05destytojascommandi = mV2_D05destytojascommand + i;
          var mV2_D05uzsienKalbacommandi = mV2_D05uzsienKalbacommand + i;
          var mV2_D05apimtisKreditcommandi = mV2_D05apimtisKreditcommand + i;
          var joinedmV2_D05nr = eval(mV2_D05nrcommandi);
          var joinedmV2_D05studProgr = eval(mV2_D05studProgrcommandi);
          var joinedmV2_D05dalykPavad = eval(mV2_D05dalykPavadcommandi);
          var joinedmV2_D05dalykPaskirt = eval(mV2_D05dalykPaskirtcommandi);
          var joinedmV2_D05destytojas = eval(mV2_D05destytojascommandi);
          var joinedmV2_D05uzsienKalba = eval(mV2_D05uzsienKalbacommandi);
          var joinedmV2_D05apimtisKredit = eval(mV2_D05apimtisKreditcommandi);
          foundUser.katedrosVedejas.mV2.mV2_D05.push({
            nr: joinedmV2_D05nr,
            studProgr: joinedmV2_D05studProgr,
            dalykPavad: joinedmV2_D05dalykPavad,
            dalykPaskirt: joinedmV2_D05dalykPaskirt,
            destytojas: joinedmV2_D05destytojas,
            uzsienKalba: joinedmV2_D05uzsienKalba,
            apimtisKredit: joinedmV2_D05apimtisKredit
          })
        }
        for (let i = 1; i <= parseInt(req.body.yonder6); i++) {
          var mV2_D06nrcommandi = mV2_D06nrcommand + i;
          var mV2_D06studProgrcommandi = mV2_D06studProgrcommand + i;
          var mV2_D06progrKodascommandi = mV2_D06progrKodascommand + i;
          var mV2_D06atlPatobulincommandi = mV2_D06atlPatobulincommand + i;
          var mV2_D06tobulinPriezastcommandi = mV2_D06tobulinPriezastcommand + i;
          var mV2_D06tobulinIrodcommandi = mV2_D06tobulinIrodcommand + i;
          var joinedmV2_D06nr = eval(mV2_D06nrcommandi);
          var joinedmV2_D06studProgr = eval(mV2_D06studProgrcommandi);
          var joinedmV2_D06progrKodas = eval(mV2_D06progrKodascommandi);
          var joinedmV2_D06atlPatobulin = eval(mV2_D06atlPatobulincommandi);
          var joinedmV2_D06tobulinPriezast = eval(mV2_D06tobulinPriezastcommandi);
          var joinedmV2_D06tobulinIrod = eval(mV2_D06tobulinIrodcommandi);
          foundUser.katedrosVedejas.mV2.mV2_D06.push({
            nr: joinedmV2_D06nr,
            studProgr: joinedmV2_D06studProgr,
            progrKodas: joinedmV2_D06progrKodas,
            atlPatobulin: joinedmV2_D06atlPatobulin,
            tobulinPriezast: joinedmV2_D06tobulinPriezast,
            tobulinIrod: joinedmV2_D06tobulinIrod
          })
        }
        foundUser.katedrosVedejas.mV2.mV2_D07.derinimas = req.body.mV2_D07derinimas

        for (let i = 1; i <= parseInt(req.body.yonder8); i++) {
          var mV2_D08nrcommandi = mV2_D08nrcommand + i;
          var mV2_D08studKryptiscommandi = mV2_D08studKryptiscommand + i;
          var mV2_D08studProgrcommandi = mV2_D08studProgrcommand + i;
          var mV2_D08progrKodascommandi = mV2_D08progrKodascommand + i;
          var mV2_D08isakDatacommandi = mV2_D08isakDatacommand + i;
          var mV2_D08numatomDatacommandi = mV2_D08numatomDatacommand + i;
          var joinedmV2_D08nr = eval(mV2_D08nrcommandi);
          var joinedmV2_D08studKryptis = eval(mV2_D08studKryptiscommandi);
          var joinedmV2_D08studProgr = eval(mV2_D08studProgrcommandi);
          var joinedmV2_D08progrKodas = eval(mV2_D08progrKodascommandi);
          var joinedmV2_D08isakData = eval(mV2_D08isakDatacommandi);
          var joinedmV2_D08numatomData = eval(mV2_D08numatomDatacommandi);
          foundUser.katedrosVedejas.mV2.mV2_D08.push({
            nr: joinedmV2_D08nr,
            studKryptis: joinedmV2_D08studKryptis,
            studProgr: joinedmV2_D08studProgr,
            progrKodas: joinedmV2_D08progrKodas,
            isakData: joinedmV2_D08isakData,
            numatomData: joinedmV2_D08numatomData
          })
        }
        for (let i = 1; i <= parseInt(req.body.yonda2); i++) {
          var mV2_S01nrcommandi = mV2_S01nrcommand + i;
          var mV2_S01veiklacommandi = mV2_S01veiklacommand + i;
          var mV2_S01dataVietacommandi = mV2_S01dataVietacommand + i;
          var mV2_S01destytojascommandi = mV2_S01destytojascommand + i;
          var joinedmV2_S01nr = eval(mV2_S01nrcommandi);
          var joinedmV2_S01veikla = eval(mV2_S01veiklacommandi);
          var joinedmV2_S01dataVieta = eval(mV2_S01dataVietacommandi);
          var joinedmV2_S01destytojas = eval(mV2_S01destytojascommandi);
          foundUser.katedrosVedejas.mV2.mV2_S01.push({
            nr: joinedmV2_S01nr,
            veikla: joinedmV2_S01veikla,
            dataVieta: joinedmV2_S01dataVieta,
            destytojas: joinedmV2_S01destytojas
          })
        }
        for (let i = 1; i <= parseInt(req.body.yonder10); i++) {
          var mV2_Snrcommandi = mV2_Snrcommand + i;
          var mV2_Sstiprybescommandi = mV2_Sstiprybescommand + i;
          var mV2_Stobulintinacommandi = mV2_Stobulintinacommand + i;
          var joinedmV2_Snr = eval(mV2_Snrcommandi);
          var joinedmV2_Sstiprybes = eval(mV2_Sstiprybescommandi);
          var joinedmV2_Stobulintina = eval(mV2_Stobulintinacommandi);
          foundUser.katedrosVedejas.mV2.mV2_S.push({
            nr: joinedmV2_Snr,
            stiprybes: joinedmV2_Sstiprybes,
            tobulintina: joinedmV2_Stobulintina
          })
        }
        for (let l = 1; l <= parseInt(req.body.yond24); l++) {
          var iteracija12 = l;
          var tMTEP3_T01nriteracija = tMTEP3_T01nrcommand + iteracija12;
          var tyrTematiteracija = tyrTematcommand + iteracija12;
          var tyrGrupiteracija = tyrGrupcommand + iteracija12;
          var tMTEP3_T01mokslSrititeracija = tMTEP3_T01mokslSritcommand + iteracija12;
          var tMTEP3_T01mokslKryptiteracija = tMTEP3_T01mokslKryptcommand + iteracija12;
          var tMTEP3_T01destytojas = tMTEP3_T01destytojascommand + iteracija12;
          var joinedtMTEP3_T01nr = eval(tMTEP3_T01nriteracija);
          var joinedtyrTemat = eval(tyrTematiteracija);
          var joinedtyrGrup = eval(tyrGrupiteracija);
          var joinedtMTEP3_T01mokslSrit = eval(tMTEP3_T01mokslSrititeracija);
          var joinedtMTEP3_T01mokslKrypt = eval(tMTEP3_T01mokslKryptiteracija);
          var joinedtMTEP3_T01destytojas = eval(tMTEP3_T01destytojas);
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T01.push({
            nr: joinedtMTEP3_T01nr,
            tyrTemat: joinedtyrTemat,
            tyrGrup: joinedtyrGrup,
            mokslSrit: joinedtMTEP3_T01mokslSrit,
            mokslKrypt: joinedtMTEP3_T01mokslKrypt,
            destytojas: joinedtMTEP3_T01destytojas
          })
        }
        for (let m = 1; m <= parseInt(req.body.yond26); m++) {
          var iteracija13 = m;
          var tMTEP3_T02nriteracija = tMTEP3_T02nrcommand + iteracija13;
          var tMTEP3_T02bibliografApriteracija = tMTEP3_T02bibliografAprcommand + iteracija13;
          var tMTEP3_T02tipasiteracija = tMTEP3_T02tipascommand + iteracija13;
          var tMTEP3_T02mokslSrititeracija = tMTEP3_T02mokslSritcommand + iteracija13;
          var tMTEP3_T02mokslKryptiteracija = tMTEP3_T02mokslKryptcommand + iteracija13;
          var tMTEP3_T02duomBazeiteracija = tMTEP3_T02duomBazecommand + iteracija13;
          var joinedtMTEP3_T02nr = eval(tMTEP3_T02nriteracija);
          var joinedtMTEP3_T02bibliografApr = eval(tMTEP3_T02bibliografApriteracija);
          var joinedtMTEP3_T02tipas = eval(tMTEP3_T02tipasiteracija);
          var joinedtMTEP3_T02mokslSrit = eval(tMTEP3_T02mokslSrititeracija);
          var joinedtMTEP3_T02mokslKrypt = eval(tMTEP3_T02mokslKryptiteracija);
          var joinedtMTEP3_T02duomBaze = eval(tMTEP3_T02duomBazeiteracija);
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T02.push({
            nr: joinedtMTEP3_T02nr,
            bibliografApr: joinedtMTEP3_T02bibliografApr,
            tipas: joinedtMTEP3_T02tipas,
            mokslSrit: joinedtMTEP3_T02mokslSrit,
            mokslKrypt: joinedtMTEP3_T02mokslKrypt,
            duomBaze: joinedtMTEP3_T02duomBaze
          })
        }
        for (let n = 1; n <= parseInt(req.body.yond28); n++) {
          var iteracija14 = n;
          var tMTEP3_T03nriteracija = tMTEP3_T03nrcommand + iteracija14;
          var tMTEP3_T03pilnasBiblApriteracija = tMTEP3_T03pilnasBiblAprcommand + iteracija14;
          var joinedtMTEP3_T03nr = eval(tMTEP3_T03nriteracija);
          var joinedtMTEP3_T03pilnasBiblApr = eval(tMTEP3_T03pilnasBiblApriteracija);
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T03.push({
            nr: joinedtMTEP3_T03nr,
            pilnasBiblApr: joinedtMTEP3_T03pilnasBiblApr
          })
        }
        for (let o = 1; o <= parseInt(req.body.yond30); o++) {
          var tMTEP3_T04nriteracija = tMTEP3_T04nrcommand + o;
          var tMTEP3_T04uzsakovasiteracija = tMTEP3_T04uzsakovascommand + o;
          var tMTEP3_T04temaiteracija = tMTEP3_T04temacommand + o;
          var tMTEP3_T04dataiteracija = tMTEP3_T04datacommand + o;
          var tMTEP3_T04konsultantasiteracija = tMTEP3_T04konsultantascommand + o;
          var joinedtMTEP3_T04nr = eval(tMTEP3_T04nriteracija);
          var joinedtMTEP3_T04uzsakovas = eval(tMTEP3_T04uzsakovasiteracija);
          var joinedtMTEP3_T04tema = eval(tMTEP3_T04temaiteracija);
          var joinedtMTEP3_T04data = eval(tMTEP3_T04dataiteracija);
          var joinedtMTEP3_T04konsultantas = eval(tMTEP3_T04konsultantasiteracija);
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T04.push({
            nr: joinedtMTEP3_T04nr,
            uzsakovas: joinedtMTEP3_T04uzsakovas,
            tema: joinedtMTEP3_T04tema,
            data: joinedtMTEP3_T04data,
            konsultantas: joinedtMTEP3_T04konsultantas
          })
        }
        for (let p = 1; p <= parseInt(req.body.yond32); p++) {

          var tMTEP3_T05nriteracija = tMTEP3_T05nrcommand + p;
          var tMTEP3_T05veiklPavaditeracija = tMTEP3_T05veiklPavadcommand + p;
          var tMTEP3_T05veiklRezultiteracija = tMTEP3_T05veiklRezultcommand + p;
          var tMTEP3_T05destytojasiteracija = tMTEP3_T05destytojascommand + p;
          var joinedtMTEP3_T05nr = eval(tMTEP3_T05nriteracija);
          var joinedtMTEP3_T05veiklPavad = eval(tMTEP3_T05veiklPavaditeracija);
          var joinedtMTEP3_T05veiklRezult = eval(tMTEP3_T05veiklRezultiteracija);
          var joinedtMTEP3_T05destytojas = eval(tMTEP3_T05destytojasiteracija);
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T05.push({
            nr: joinedtMTEP3_T05nr,
            veiklPavad: joinedtMTEP3_T05veiklPavad,
            veiklRezult: joinedtMTEP3_T05veiklRezult,
            destytojas: joinedtMTEP3_T05destytojas
          })
        }
        for (let q = 1; q <= parseInt(req.body.yond34); q++) {
          var tMTEP3_T06nriteracija = tMTEP3_T06nrcommand + q;
          var tMTEP3_T06autoriusiteracija = tMTEP3_T06autoriuscommand + q;
          var tMTEP3_T06menoSrititeracija = tMTEP3_T06menoSritcommand + q;
          var tMTEP3_T06pobudisiteracija = tMTEP3_T06pobudiscommand + q;
          var tMTEP3_T06realizVietaiteracija = tMTEP3_T06realizVietacommand + q;
          var tMTEP3_T06dataiteracija = tMTEP3_T06datacommand + q;
          var joinedtMTEP3_T06nr = eval(tMTEP3_T06nriteracija);
          var joinedtMTEP3_T06autorius = eval(tMTEP3_T06autoriusiteracija);
          var joinedtMTEP3_T06menoSrit = eval(tMTEP3_T06menoSrititeracija);
          var joinedtMTEP3_T06pobudis = eval(tMTEP3_T06pobudisiteracija);
          var joinedtMTEP3_T06realizVieta = eval(tMTEP3_T06realizVietaiteracija);
          var joinedtMTEP3_T06data = eval(tMTEP3_T06dataiteracija);
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T06.push({
            nr: joinedtMTEP3_T06nr,
            autorius: joinedtMTEP3_T06autorius,
            menoSrit: joinedtMTEP3_T06menoSrit,
            pobudis: joinedtMTEP3_T06pobudis,
            realizVieta: joinedtMTEP3_T06realizVieta,
            data: joinedtMTEP3_T06data
          })
        }
        for (let r = 1; r <= parseInt(req.body.yond36); r++) {
          var tMTEP3_T07nriteracija = tMTEP3_T07nrcommand + r;
          var tMTEP3_T07atlikejasiteracija = tMTEP3_T07atlikejascommand + r;
          var tMTEP3_T07menoSrititeracija = tMTEP3_T07menoSritcommand + r;
          var tMTEP3_T07pavadinimasiteracija = tMTEP3_T07pavadinimascommand + r;
          var tMTEP3_T07atlikVietaiteracija = tMTEP3_T07atlikVietacommand + r;
          var tMTEP3_T07dataiteracija = tMTEP3_T07datacommand + r;
          var joinedtMTEP3_T07nr = eval(tMTEP3_T07nriteracija);
          var joinedtMTEP3_T07atlikejas = eval(tMTEP3_T07atlikejasiteracija);
          var joinedtMTEP3_T07menoSrit = eval(tMTEP3_T07menoSrititeracija);
          var joinedtMTEP3_T07pavadinimas = eval(tMTEP3_T07pavadinimasiteracija);
          var joinedtMTEP3_T07atlikVieta = eval(tMTEP3_T07atlikVietaiteracija);
          var joinedtMTEP3_T07data = eval(tMTEP3_T07dataiteracija);
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T07.push({
            nr: joinedtMTEP3_T07nr,
            atlikejas: joinedtMTEP3_T07atlikejas,
            menoSrit: joinedtMTEP3_T07menoSrit,
            pavadinimas: joinedtMTEP3_T07pavadinimas,
            atlikVieta: joinedtMTEP3_T07atlikVieta,
            data: joinedtMTEP3_T07data
          })
        }
        for (let s = 1; s <= parseInt(req.body.yond38); s++) {
          var tMTEP3_T08Snriteracija = tMTEP3_T08Snrcommand + s;
          var tMTEP3_T08atlikejasiteracija = tMTEP3_T08atlikejascommand + s;
          var tMTEP3_T08menoSrititeracija = tMTEP3_T08menoSritcommand + s;
          var tMTEP3_T08pavadinimasiteracija = tMTEP3_T08pavadinimascommand + s;
          var tMTEP3_T08atlikVietaiteracija = tMTEP3_T08atlikVietacommand + s;
          var tMTEP3_T08dataiteracija = tMTEP3_T08datacommand + s;
          var joinedtMTEP3_T08Snr = eval(tMTEP3_T08Snriteracija);
          var joinedtMTEP3_T08atlikejas = eval(tMTEP3_T08atlikejasiteracija);
          var joinedtMTEP3_T08menoSrit = eval(tMTEP3_T08menoSrititeracija);
          var joinedtMTEP3_T08pavadinimas = eval(tMTEP3_T08pavadinimasiteracija);
          var joinedtMTEP3_T08atlikVieta = eval(tMTEP3_T08atlikVietaiteracija);
          var joinedtMTEP3_T08data = eval(tMTEP3_T08dataiteracija);
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T08.push({
            nr: joinedtMTEP3_T08Snr,
            atlikejas: joinedtMTEP3_T08atlikejas,
            menoSrit: joinedtMTEP3_T08menoSrit,
            pavadinimas: joinedtMTEP3_T08pavadinimas,
            atlikVieta: joinedtMTEP3_T08atlikVieta,
            data: joinedtMTEP3_T08data
          })
        }
        for (let t = 1; t <= parseInt(req.body.yond40); t++) {
          var tMTEP3_T09nriteracija = tMTEP3_T09nrcommand + t;
          var tMTEP3_T09atlikejasiteracija = tMTEP3_T09atlikejascommand + t;
          var tMTEP3_T09menoSrititeracija = tMTEP3_T09menoSritcommand + t;
          var tMTEP3_T09pavadinimasiteracija = tMTEP3_T09pavadinimascommand + t;
          var tMTEP3_T09atlikVietaiteracija = tMTEP3_T09atlikVietacommand + t;
          var tMTEP3_T09dataiteracija = tMTEP3_T09datacommand + t;
          var joinedtMTEP3_T09nr = eval(tMTEP3_T09nriteracija);
          var joinedtMTEP3_T09atlikejas = eval(tMTEP3_T09atlikejasiteracija);
          var joinedtMTEP3_T09menoSrit = eval(tMTEP3_T09menoSrititeracija);
          var joinedtMTEP3_T09pavadinimas = eval(tMTEP3_T09pavadinimasiteracija);
          var joinedtMTEP3_T09atlikVieta = eval(tMTEP3_T09atlikVietaiteracija);
          var joinedtMTEP3_T09data = eval(tMTEP3_T09dataiteracija);
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T09.push({
            nr: joinedtMTEP3_T09nr,
            atlikejas: joinedtMTEP3_T09atlikejas,
            menoSrit: joinedtMTEP3_T09menoSrit,
            pavadinimas: joinedtMTEP3_T09pavadinimas,
            atlikVieta: joinedtMTEP3_T09atlikVieta,
            data: joinedtMTEP3_T09data
          })
        }
        for (let u = 1; u <= parseInt(req.body.yond42); u++) {
          var tMTEP3_T10nriteracija = tMTEP3_T10nrcommand + u;
          var tMTEP3_T10destytojasiteracija = tMTEP3_T10destytojascommand + u;
          var tMTEP3_T10veiklPobuditeracija = tMTEP3_T10veiklPobudcommand + u;
          var tMTEP3_T10veiklTiksliteracija = tMTEP3_T10veiklTikslcommand + u;
          var tMTEP3_T10dataVietaiteracija = tMTEP3_T10dataVietacommand + u;
          var tMTEP3_T10dalyvSkiteracija = tMTEP3_T10dalyvSkcommand + u;
          var tMTEP3_T10ktKomentaraiiteracija = tMTEP3_T10ktKomentaraicommand + u;
          var joinedtMTEP3_T10nr = eval(tMTEP3_T10nriteracija);
          var joinedtMTEP3_T10destytojas = eval(tMTEP3_T10destytojasiteracija);
          var joinedtMTEP3_T10veiklPobud = eval(tMTEP3_T10veiklPobuditeracija);
          var joinedtMTEP3_T10veiklTiksl = eval(tMTEP3_T10veiklTiksliteracija);
          var joinedtMTEP3_T10dataVieta = eval(tMTEP3_T10dataVietaiteracija);
          var joinedtMTEP3_T10dalyvSk = eval(tMTEP3_T10dalyvSkiteracija);
          var joinedtMTEP3_T10ktKomentarai = eval(tMTEP3_T10ktKomentaraiiteracija);
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T10.push({
            nr: joinedtMTEP3_T10nr,
            destytojas: joinedtMTEP3_T10destytojas,
            veiklPobud: joinedtMTEP3_T10veiklPobud,
            veiklTiksl: joinedtMTEP3_T10veiklTiksl,
            dataVieta: joinedtMTEP3_T10dataVieta,
            dalyvSk: joinedtMTEP3_T10dalyvSk,
            ktKomentarai: joinedtMTEP3_T10ktKomentarai
          })
        }
        for (let v = 1; v <= parseInt(req.body.yond44); v++) {
          var tMTEP3_T11nriteracija = tMTEP3_T11nrcommand + v;
          var tMTEP3_T11veiklPobuditeracija = tMTEP3_T11veiklPobudcommand + v;
          var tMTEP3_T11destytojasiteracija = tMTEP3_T11destytojascommand + v;
          var tMTEP3_T11veiklTiksliteracija = tMTEP3_T11veiklTikslcommand + v;
          var tMTEP3_T11dataVietaiteracija = tMTEP3_T11dataVietacommand + v;
          var tMTEP3_T11dalyvSkiteracija = tMTEP3_T11dalyvSkcommand + v;
          var tMTEP3_T11ktKomentaraiiteracija = tMTEP3_T11ktKomentaraicommand + v;
          var joinedtMTEP3_T11nr = eval(tMTEP3_T11nriteracija);
          var joinedtMTEP3_T11destytojas = eval(tMTEP3_T11destytojasiteracija);
          var joinedtMTEP3_T11veiklPobud = eval(tMTEP3_T11veiklPobuditeracija);
          var joinedtMTEP3_T11veiklTiksl = eval(tMTEP3_T11veiklTiksliteracija);
          var joinedtMTEP3_T11dataVieta = eval(tMTEP3_T11dataVietaiteracija);
          var joinedtMTEP3_T11dalyvSk = eval(tMTEP3_T11dalyvSkiteracija);
          var joinedtMTEP3_T11ktKomentarai = eval(tMTEP3_T11ktKomentaraiiteracija);
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T11.push({
            nr: joinedtMTEP3_T11nr,
            destytojas: joinedtMTEP3_T11destytojas,
            veiklPobud: joinedtMTEP3_T11veiklPobud,
            veiklTiksl: joinedtMTEP3_T11veiklTiksl,
            dataVieta: joinedtMTEP3_T11dataVieta,
            dalyvSk: joinedtMTEP3_T11dalyvSk,
            ktKomentarai: joinedtMTEP3_T11ktKomentarai
          })
        }
        for (let w = 1; w <= parseInt(req.body.yond46); w++) {
          var tMTEP3_T12nriteracija = tMTEP3_T12nrcommand + w;
          var tMTEP3_T12destytojasiteracija = tMTEP3_T12destytojascommand + w;
          var tMTEP3_T12veiklPobuditeracija = tMTEP3_T12veiklPobudcommand + w;
          var tMTEP3_T12dataVietaiteracija = tMTEP3_T12dataVietacommand + w;
          var joinedtMTEP3_T12nr = eval(tMTEP3_T12nriteracija);
          var joinedtMTEP3_T12destytojas = eval(tMTEP3_T12destytojasiteracija);
          var joinedtMTEP3_T12veiklPobud = eval(tMTEP3_T12veiklPobuditeracija);
          var joinedtMTEP3_T12dataVieta = eval(tMTEP3_T12dataVietaiteracija);
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T12.push({
            nr: joinedtMTEP3_T12nr,
            destytojas: joinedtMTEP3_T12destytojas,
            veiklPobud: joinedtMTEP3_T12veiklPobud,
            dataVieta: joinedtMTEP3_T12dataVieta
          })
        }
        for (let i = 1; i <= parseInt(req.body.yond48); i++) {
          var tMTEP3_T13nri = tMTEP3_T13nrcommand + i;
          var tMTEP3_T13destytojasi = tMTEP3_T13destytojascommand + i;
          var tMTEP3_T13studDuomi = tMTEP3_T13studDuomcommand + i;
          var tMTEP3_T13renginioPavadi = tMTEP3_T13renginioPavadcommand + i;
          var tMTEP3_T13rezultatasi = tMTEP3_T13rezultatascommand + i;
          var tMTEP3_T13datai = tMTEP3_T13datacommand + i;
          var joinedtMTEP3_T13nr = eval(tMTEP3_T13nri);
          var joinedtMTEP3_T13destytojas = eval(tMTEP3_T13destytojasi);
          var joinedtMTEP3_T13studDuom = eval(tMTEP3_T13studDuomi);
          var joinedtMTEP3_T13renginioPavad = eval(tMTEP3_T13renginioPavadi);
          var joinedtMTEP3_T13rezultatas = eval(tMTEP3_T13rezultatasi);
          var joinedtMTEP3_T13data = eval(tMTEP3_T13datai);
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T13.push({
            nr: joinedtMTEP3_T13nr,
            destytojas: joinedtMTEP3_T13destytojas,
            studDuom: joinedtMTEP3_T13studDuom,
            renginioPavad: joinedtMTEP3_T13renginioPavad,
            rezultatas: joinedtMTEP3_T13rezultatas,
            data: joinedtMTEP3_T13data
          })
        }
        for (let y = 1; y <= parseInt(req.body.yond50); y++) {
          var tMTEP3_T14nri = tMTEP3_T14nrcommand + y;
          var tMTEP3_T14destytojasi = tMTEP3_T14destytojascommand + y;
          var tMTEP3_T14renginysi = tMTEP3_T14renginyscommand + y;
          var tMTEP3_T14veiklPobudi = tMTEP3_T14veiklPobudcommand + y;
          var tMTEP3_T14dataVietai = tMTEP3_T14dataVietacommand + y;
          var joinedtMTEP3_T14nr = eval(tMTEP3_T14nri);
          var joinedtMTEP3_T14destytojas = eval(tMTEP3_T14destytojasi);
          var joinedtMTEP3_T14renginys = eval(tMTEP3_T14renginysi);
          var joinedtMTEP3_T14veiklPobud = eval(tMTEP3_T14veiklPobudi);
          var joinedtMTEP3_T14dataVieta = eval(tMTEP3_T14dataVietai);
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T14.push({
            nr: joinedtMTEP3_T14nr,
            destytojas: joinedtMTEP3_T14destytojas,
            renginys: joinedtMTEP3_T14renginys,
            veiklPobud: joinedtMTEP3_T14veiklPobud,
            dataVieta: joinedtMTEP3_T14dataVieta
          })
        }
        for (let i = 1; i <= parseInt(req.body.yonder12); i++) {
          var tMTEP3_T15nri = tMTEP3_T15nrcommand + i;
          var tMTEP3_T15mokymaii = tMTEP3_T15mokymaicommand + i;
          var tMTEP3_T15vykdytojaii = tMTEP3_T15vykdytojaicommand + i;
          var tMTEP3_T15uzsakovasi = tMTEP3_T15uzsakovascommand + i;
          var tMTEP3_T15sumai = tMTEP3_T15sumacommand + i;
          var tMTEP3_T15nrDatai = tMTEP3_T15nrDatacommand + i;
          var tMTEP3_T15klausytojaii = tMTEP3_T15klausytojaicommand + i;
          var tMTEP3_T15trukmei = tMTEP3_T15trukmecommand + i;
          var joinedtMTEP3_T15nr = eval(tMTEP3_T15nri);
          var joinedtMTEP3_T15mokymai = eval(tMTEP3_T15mokymaii);
          var joinedtMTEP3_T15vykdytojai = eval(tMTEP3_T15vykdytojaii);
          var joinedtMTEP3_T15uzsakovas = eval(tMTEP3_T15uzsakovasi);
          var joinedtMTEP3_T15suma = eval(tMTEP3_T15sumai);
          var joinedtMTEP3_T15nrData = eval(tMTEP3_T15nrDatai);
          var joinedtMTEP3_T15klausytojai = eval(tMTEP3_T15klausytojaii);
          var joinedtMTEP3_T15trukme = eval(tMTEP3_T15trukmei);
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T15.push({
            nr: joinedtMTEP3_T15nr,
            mokymai: joinedtMTEP3_T15mokymai,
            vykdytojai: joinedtMTEP3_T15vykdytojai,
            uzsakovas: joinedtMTEP3_T15uzsakovas,
            suma: joinedtMTEP3_T15suma,
            nrData: joinedtMTEP3_T15nrData,
            klausytojai: joinedtMTEP3_T15klausytojai,
            trukme: joinedtMTEP3_T15trukme
          })
        }
        for (let i = 1; i <= parseInt(req.body.yonder14); i++) {
          var tMTEP3_T16nri = tMTEP3_T16nrcommand + i;
          var tMTEP3_T16pavadinimasi = tMTEP3_T16pavadinimascommand + i;
          var tMTEP3_T16uzsakovasi = tMTEP3_T16uzsakovascommand + i;
          var tMTEP3_T16rengejaii = tMTEP3_T16rengejaicommand + i;
          var joinedtMTEP3_T16nr = eval(tMTEP3_T16nri);
          var joinedtMTEP3_T16pavadinimas = eval(tMTEP3_T16pavadinimasi);
          var joinedtMTEP3_T16uzsakovas = eval(tMTEP3_T16uzsakovasi);
          var joinedtMTEP3_T16rengejai = eval(tMTEP3_T16rengejaii);
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T16.push({
            nr: joinedtMTEP3_T16nr,
            pavadinimas: joinedtMTEP3_T16pavadinimas,
            uzsakovas: joinedtMTEP3_T16uzsakovas,
            rengejai: joinedtMTEP3_T16rengejai
          })
        }
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T17.komentaras = req.body.tMTEP3_T17komentaras,
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_T18.komentaras = req.body.tMTEP3_T18komentaras

        for (let i = 1; i <= parseInt(req.body.yonder16); i++) {
          var tMTEP3_Snri = tMTEP3_Snrcommand + i;
          var tMTEP3_Sstiprybesi = tMTEP3_Sstiprybescommand + i;
          var tMTEP3_Stobulintinai = tMTEP3_Stobulintinacommand + i;
          var tMTEP3_Snr = eval(tMTEP3_Snri);
          var tMTEP3_Sstiprybes = eval(tMTEP3_Sstiprybesi);
          var tMTEP3_Stobulintina = eval(tMTEP3_Stobulintinai);
          foundUser.katedrosVedejas.tMTEP3.tMTEP3_S.push({
            nr: tMTEP3_Snr,
            stiprybes: tMTEP3_Sstiprybes,
            tobulintina: tMTEP3_Stobulintina
          })
        }
        // //kTOV4_KV01
        // //kTOV4_KV01dalykines_komp
        for (let ba = 1; ba <= parseInt(req.body.number2); ba++) {
          var kTOV4_KV01dalykStazuotespavaditeracija = kTOV4_KV01dalykStazuotespavadcommand + ba;
          var kTOV4_KV01dalykStazuotespazymNriteracija = kTOV4_KV01dalykStazuotespazymNrcommand + ba;
          var kTOV4_KV01dalykStazuotestrukmeValiteracija = kTOV4_KV01dalykStazuotestrukmeValcommand + ba;
          var kTOV4_KV01dalykStazuotesdalyvisi = kTOV4_KV01dalykStazuotesdalyviscommand + ba;
          var joinedkTOV4_KV01dalykStazuotespavad = eval(kTOV4_KV01dalykStazuotespavaditeracija);
          var joinedkTOV4_KV01dalykStazuotespazymNr = eval(kTOV4_KV01dalykStazuotespazymNriteracija);
          var joinedkTOV4_KV01dalykStazuotestrukmeVal = eval(kTOV4_KV01dalykStazuotestrukmeValiteracija);
          var joinedkTOV4_KV01dalykStazuotesdalyvis = eval(kTOV4_KV01dalykStazuotesdalyvisi);
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01dalykines_komp.stazuotes.push({
            pavadinimas: joinedkTOV4_KV01dalykStazuotespavad,
            pazymNr: joinedkTOV4_KV01dalykStazuotespazymNr,
            trukmeVal: joinedkTOV4_KV01dalykStazuotestrukmeVal,
            dalyvis: joinedkTOV4_KV01dalykStazuotesdalyvis
          })
        }
        for (let bb = 1; bb <= parseInt(req.body.number4); bb++) {
          var kTOV4_KV01dalykSeminaraipavaditeracija = kTOV4_KV01dalykSeminaraipavadcommand + bb;
          var kTOV4_KV01dalykSeminaraipazymNriteracija = kTOV4_KV01dalykSeminaraipazymNrcommand + bb;
          var kTOV4_KV01dalykSeminaraitrukmeValiteracija = kTOV4_KV01dalykSeminaraitrukmeValcommand + bb;
          var kTOV4_KV01dalykSeminaraidalyvisi = kTOV4_KV01dalykSeminaraidalyviscommand + bb;
          var joinedkTOV4_KV01dalykSeminaraipavad = eval(kTOV4_KV01dalykSeminaraipavaditeracija);
          var joinedkTOV4_KV01dalykSeminaraipazymNr = eval(kTOV4_KV01dalykSeminaraipazymNriteracija);
          var joinedkTOV4_KV01dalykSeminaraitrukmeVal = eval(kTOV4_KV01dalykSeminaraitrukmeValiteracija);
          var joinedkTOV4_KV01dalykSeminaraidalyvis = eval(kTOV4_KV01dalykSeminaraidalyvisi);
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01dalykines_komp.seminarai.push({
            pavadinimas: joinedkTOV4_KV01dalykSeminaraipavad,
            pazymNr: joinedkTOV4_KV01dalykSeminaraipazymNr,
            trukmeVal: joinedkTOV4_KV01dalykSeminaraitrukmeVal,
            dalyvis: joinedkTOV4_KV01dalykSeminaraidalyvis
          })
        }
        for (let bc = 1; bc <= parseInt(req.body.number6); bc++) {
          var kTOV4_KV01dalykKonfpavaditeracija = kTOV4_KV01dalykKonfpavadcommand + bc;
          var kTOV4_KV01dalykKonfpazymNriteracija = kTOV4_KV01dalykKonfpazymNrcommand + bc;
          var kTOV4_KV01dalykKonftrukmeValiteracija = kTOV4_KV01dalykKonftrukmeValcommand + bc;
          var kTOV4_KV01dalykKonfdalyvisiteracija = kTOV4_KV01dalykKonfdalyviscommand + bc;
          var joinedkTOV4_KV01dalykKonfpavad = eval(kTOV4_KV01dalykKonfpavaditeracija);
          var joinedkTOV4_KV01dalykKonfpazymNr = eval(kTOV4_KV01dalykKonfpazymNriteracija);
          var joinedkTOV4_KV01dalykKonftrukmeVal = eval(kTOV4_KV01dalykKonftrukmeValiteracija);
          var joinedkTOV4_KV01dalykKonfdalyvis = eval(kTOV4_KV01dalykKonfdalyvisiteracija);
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01dalykines_komp.konferencijos.push({
            pavadinimas: joinedkTOV4_KV01dalykKonfpavad,
            pazymNr: joinedkTOV4_KV01dalykKonfpazymNr,
            trukmeVal: joinedkTOV4_KV01dalykKonftrukmeVal,
            dalyvis: joinedkTOV4_KV01dalykKonfdalyvis
          })
        }
        for (let bd = 1; bd <= parseInt(req.body.number8); bd++) {
          var kTOV4_KV01dalykKursaipavaditeracija = kTOV4_KV01dalykKursaipavadcommand + bd;
          var kTOV4_KV01dalykKursaipazymNriteracija = kTOV4_KV01dalykKursaipazymNrcommand + bd;
          var kTOV4_KV01dalykKursaitrukmeValiteracija = kTOV4_KV01dalykKursaitrukmeValcommand + bd;
          var kTOV4_KV01dalykKursaidalyvisiteracija = kTOV4_KV01dalykKursaidalyviscommand + bd;
          var joinedkTOV4_KV01dalykKursaipavad = eval(kTOV4_KV01dalykKursaipavaditeracija);
          var joinedkTOV4_KV01dalykKursaipazymNr = eval(kTOV4_KV01dalykKursaipazymNriteracija);
          var joinedkTOV4_KV01dalykKursaitrukmeVal = eval(kTOV4_KV01dalykKursaitrukmeValiteracija);
          var joinedkTOV4_KV01dalykKursaidalyvis = eval(kTOV4_KV01dalykKursaidalyvisiteracija);
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01dalykines_komp.kursai.push({
            pavadinimas: joinedkTOV4_KV01dalykKursaipavad,
            pazymNr: joinedkTOV4_KV01dalykKursaipazymNr,
            trukmeVal: joinedkTOV4_KV01dalykKursaitrukmeVal,
            dalyvis: joinedkTOV4_KV01dalykKursaidalyvis
          })
        }
        //kTOV4_KV01didaktines_komp
        for (let be = 1; be <= parseInt(req.body.number10); be++) {
          var kTOV4_KV01didakStazuotespavaditeracija = kTOV4_KV01didakStazuotespavadcommand + be;
          var kTOV4_KV01didakStazuotespazymNriteracija = kTOV4_KV01didakStazuotespazymNrcommand + be;
          var kTOV4_KV01didakStazuotestrukmeValiteracija = kTOV4_KV01didakStazuotestrukmeValcommand + be;
          var kTOV4_KV01didakStazuotesdalyvisiteracija = kTOV4_KV01didakStazuotesdalyviscommand + be;
          var joinedkTOV4_KV01didakStazuotespavad = eval(kTOV4_KV01didakStazuotespavaditeracija);
          var joinedkTOV4_KV01didakStazuotespazymNr = eval(kTOV4_KV01didakStazuotespazymNriteracija);
          var joinedkTOV4_KV01didakStazuotestrukmeVal = eval(kTOV4_KV01didakStazuotestrukmeValiteracija);
          var joinedkTOV4_KV01didakStazuotesdalyvis = eval(kTOV4_KV01didakStazuotesdalyvisiteracija);
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01didaktines_komp.stazuotes.push({
            pavadinimas: joinedkTOV4_KV01didakStazuotespavad,
            pazymNr: joinedkTOV4_KV01didakStazuotespazymNr,
            trukmeVal: joinedkTOV4_KV01didakStazuotestrukmeVal,
            dalyvis: joinedkTOV4_KV01didakStazuotesdalyvis
          })
        }
        for (let bf = 1; bf <= parseInt(req.body.number12); bf++) {
          var kTOV4_KV01didakSeminaraipavaditeracija = kTOV4_KV01didakSeminaraipavadcommand + bf;
          var kTOV4_KV01didakSeminaraipazymNriteracija = kTOV4_KV01didakSeminaraipazymNrcommand + bf;
          var kTOV4_KV01didakSeminaraitrukmeValiteracija = kTOV4_KV01didakSeminaraitrukmeValcommand + bf;
          var kTOV4_KV01didakSeminaraidalyvisiteracija = kTOV4_KV01didakSeminaraidalyviscommand + bf;
          var joinedkTOV4_KV01didakSeminaraipavad = eval(kTOV4_KV01didakSeminaraipavaditeracija);
          var joinedkTOV4_KV01didakSeminaraipazymNr = eval(kTOV4_KV01didakSeminaraipazymNriteracija);
          var joinedkTOV4_KV01didakSeminaraitrukmeVal = eval(kTOV4_KV01didakSeminaraitrukmeValiteracija);
          var joinedkTOV4_KV01didakSeminaraidalyvis = eval(kTOV4_KV01didakSeminaraidalyvisiteracija);
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01didaktines_komp.seminarai.push({
            pavadinimas: joinedkTOV4_KV01didakSeminaraipavad,
            pazymNr: joinedkTOV4_KV01didakSeminaraipazymNr,
            trukmeVal: joinedkTOV4_KV01didakSeminaraitrukmeVal,
            dalyvis: joinedkTOV4_KV01didakSeminaraidalyvis
          })
        }
        for (let bg = 1; bg <= parseInt(req.body.number14); bg++) {
          var kTOV4_KV01didakKonfpavaditeracija = kTOV4_KV01didakKonfpavadcommand + bg;
          var kTOV4_KV01didakKonfpazymNriteracija = kTOV4_KV01didakKonfpazymNrcommand + bg;
          var kTOV4_KV01didakKonftrukmeValiteracija = kTOV4_KV01didakKonftrukmeValcommand + bg;
          var kTOV4_KV01didakKonfdalyvisiteracija = kTOV4_KV01didakKonfdalyviscommand + bg;
          var joinedkTOV4_KV01didakKonfpavad = eval(kTOV4_KV01didakKonfpavaditeracija);
          var joinedkTOV4_KV01didakKonfpazymNr = eval(kTOV4_KV01didakKonfpazymNriteracija);
          var joinedkTOV4_KV01didakKonftrukmeVal = eval(kTOV4_KV01didakKonftrukmeValiteracija);
          var joinedkTOV4_KV01didakKonfdalyvis = eval(kTOV4_KV01didakKonfdalyvisiteracija);
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01didaktines_komp.konferencijos.push({
            pavadinimas: joinedkTOV4_KV01didakKonfpavad,
            pazymNr: joinedkTOV4_KV01didakKonfpazymNr,
            trukmeVal: joinedkTOV4_KV01didakKonftrukmeVal,
            dalyvis: joinedkTOV4_KV01didakKonfdalyvis
          })
        }
        for (let bh = 1; bh <= parseInt(req.body.number16); bh++) {
          var kTOV4_KV01didakKursaipavaditeracija = kTOV4_KV01didakKursaipavadcommand + bh;
          var kTOV4_KV01didakKursaipazymNriteracija = kTOV4_KV01didakKursaipazymNrcommand + bh;
          var kTOV4_KV01didakKursaitrukmeValiteracija = kTOV4_KV01didakKursaitrukmeValcommand + bh;
          var kTOV4_KV01didakKursaidalyvisiteracija = kTOV4_KV01didakKursaidalyviscommand + bh;
          var joinedkTOV4_KV01didakKursaipavad = eval(kTOV4_KV01didakKursaipavaditeracija);
          var joinedkTOV4_KV01didakKursaipazymNr = eval(kTOV4_KV01didakKursaipazymNriteracija);
          var joinedkTOV4_KV01didakKursaitrukmeVal = eval(kTOV4_KV01didakKursaitrukmeValiteracija);
          var joinedkTOV4_KV01didakKursaidalyvis = eval(kTOV4_KV01didakKursaidalyvisiteracija);
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01didaktines_komp.kursai.push({
            pavadinimas: joinedkTOV4_KV01didakKursaipavad,
            pazymNr: joinedkTOV4_KV01didakKursaipazymNr,
            trukmeVal: joinedkTOV4_KV01didakKursaitrukmeVal,
            dalyvis: joinedkTOV4_KV01didakKursaidalyvis
          })
        }
        //kTOV4_KV01bendrosios_komp
        for (let bi = 1; bi <= parseInt(req.body.number18); bi++) {
          var kTOV4_KV01bendrStazuotespavaditeracija = kTOV4_KV01bendrStazuotespavadcommand + bi;
          var kTOV4_KV01bendrStazuotespazymNriteracija = kTOV4_KV01bendrStazuotespazymNrcommand + bi;
          var kTOV4_KV01bendrStazuotestrukmeValiteracija = kTOV4_KV01bendrStazuotestrukmeValcommand + bi;
          var kTOV4_KV01bendrStazuotesdalyvisiteracija = kTOV4_KV01bendrStazuotesdalyviscommand + bi;
          var joinedkTOV4_KV01bendrStazuotespavad = eval(kTOV4_KV01bendrStazuotespavaditeracija);
          var joinedkTOV4_KV01bendrStazuotespazymNr = eval(kTOV4_KV01bendrStazuotespazymNriteracija);
          var joinedkTOV4_KV01bendrStazuotestrukmeVal = eval(kTOV4_KV01bendrStazuotestrukmeValiteracija);
          var joinedkTOV4_KV01bendrStazuotesdalyvis = eval(kTOV4_KV01bendrStazuotesdalyvisiteracija);
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01bendrosios_komp.stazuotes.push({
            pavadinimas: joinedkTOV4_KV01bendrStazuotespavad,
            pazymNr: joinedkTOV4_KV01bendrStazuotespazymNr,
            trukmeVal: joinedkTOV4_KV01bendrStazuotestrukmeVal,
            dalyvis: joinedkTOV4_KV01bendrStazuotesdalyvis
          })
        }
        for (let bj = 1; bj <= parseInt(req.body.number20); bj++) {
          var kTOV4_KV01bendrSeminaraipavaditeracija = kTOV4_KV01bendrSeminaraipavadcommand + bj;
          var kTOV4_KV01bendrSeminaraipazymNriteracija = kTOV4_KV01bendrSeminaraipazymNrcommand + bj;
          var kTOV4_KV01bendrSeminaraitrukmeValiteracija = kTOV4_KV01bendrSeminaraitrukmeValcommand + bj;
          var kTOV4_KV01bendrSeminaraidalyvisiteracija = kTOV4_KV01bendrSeminaraidalyviscommand + bj;
          var joinedkTOV4_KV01bendrSeminaraipavad = eval(kTOV4_KV01bendrSeminaraipavaditeracija);
          var joinedkTOV4_KV01bendrSeminaraipazymNr = eval(kTOV4_KV01bendrSeminaraipazymNriteracija);
          var joinedkTOV4_KV01bendrSeminaraitrukmeVal = eval(kTOV4_KV01bendrSeminaraitrukmeValiteracija);
          var joinedkTOV4_KV01bendrSeminaraidalyvis = eval(kTOV4_KV01bendrSeminaraidalyvisiteracija);
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01bendrosios_komp.seminarai.push({
            pavadinimas: joinedkTOV4_KV01bendrSeminaraipavad,
            pazymNr: joinedkTOV4_KV01bendrSeminaraipazymNr,
            trukmeVal: joinedkTOV4_KV01bendrSeminaraitrukmeVal,
            dalyvis: joinedkTOV4_KV01bendrSeminaraidalyvis
          })
        }
        for (let bk = 1; bk <= parseInt(req.body.number22); bk++) {
          var kTOV4_KV01bendrKonfpavaditeracija = kTOV4_KV01bendrKonfpavadcommand + bk;
          var kTOV4_KV01bendrKonfpazymNriteracija = kTOV4_KV01bendrKonfpazymNrcommand + bk;
          var kTOV4_KV01bendrKonftrukmeValiteracija = kTOV4_KV01bendrKonftrukmeValcommand + bk;
          var kTOV4_KV01bendrKonfdalyvisiteracija = kTOV4_KV01bendrKonfdalyviscommand + bk;
          var joinedkTOV4_KV01bendrKonfpavad = eval(kTOV4_KV01bendrKonfpavaditeracija);
          var joinedkTOV4_KV01bendrKonfpazymNr = eval(kTOV4_KV01bendrKonfpazymNriteracija);
          var joinedkTOV4_KV01bendrKonftrukmeVal = eval(kTOV4_KV01bendrKonftrukmeValiteracija);
          var joinedkTOV4_KV01bendrKonfdalyvis = eval(kTOV4_KV01bendrKonfdalyvisiteracija);
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01bendrosios_komp.konferencijos.push({
            pavadinimas: joinedkTOV4_KV01bendrKonfpavad,
            pazymNr: joinedkTOV4_KV01bendrKonfpazymNr,
            trukmeVal: joinedkTOV4_KV01bendrKonftrukmeVal,
            dalyvis: joinedkTOV4_KV01bendrKonfdalyvis
          })
        }
        for (let bl = 1; bl <= parseInt(req.body.number24); bl++) {
          var kTOV4_KV01bendrKursaipavaditeracija = kTOV4_KV01bendrKursaipavadcommand + bl;
          var kTOV4_KV01bendrKursaipazymNriteracija = kTOV4_KV01bendrKursaipazymNrcommand + bl;
          var kTOV4_KV01bendrKursaitrukmeValiteracija = kTOV4_KV01bendrKursaitrukmeValcommand + bl;
          var kTOV4_KV01bendrKursaidalyvisiteracija = kTOV4_KV01bendrKursaidalyviscommand + bl;
          var joinedkTOV4_KV01bendrKursaipavad = eval(kTOV4_KV01bendrKursaipavaditeracija);
          var joinedkTOV4_KV01bendrKursaipazymNr = eval(kTOV4_KV01bendrKursaipazymNriteracija);
          var joinedkTOV4_KV01bendrKursaitrukmeVal = eval(kTOV4_KV01bendrKursaitrukmeValiteracija);
          var joinedkTOV4_KV01bendrKursaidalyvis = eval(kTOV4_KV01bendrKursaidalyvisiteracija);
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_KV01bendrosios_komp.kursai.push({
            pavadinimas: joinedkTOV4_KV01bendrKursaipavad,
            pazymNr: joinedkTOV4_KV01bendrKursaipazymNr,
            trukmeVal: joinedkTOV4_KV01bendrKursaitrukmeVal,
            dalyvis: joinedkTOV4_KV01bendrKursaidalyvis
          })
        }
        //kTOV4_KV02
        //kTOV4_KV02dalykines_komp
        for (let bm = 1; bm <= parseInt(req.body.number26); bm++) {
          var kTOV4_KV02dalykStazuotespavaditeracija = kTOV4_KV02dalykStazuotespavadcommand + bm;
          var kTOV4_KV02dalykStazuotespazymNriteracija = kTOV4_KV02dalykStazuotespazymNrcommand + bm;
          var kTOV4_KV02dalykStazuotestrukmeValiteracija = kTOV4_KV02dalykStazuotestrukmeValcommand + bm;
          var kTOV4_KV02dalykStazuotesdalyvisiteracija = kTOV4_KV02dalykStazuotesdalyviscommand + bm;
          var joinedkTOV4_KV02dalykStazuotespavad = eval(kTOV4_KV02dalykStazuotespavaditeracija);
          var joinedkTOV4_KV02dalykStazuotespazymNr = eval(kTOV4_KV02dalykStazuotespazymNriteracija);
          var joinedkTOV4_KV02dalykStazuotestrukmeVal = eval(kTOV4_KV02dalykStazuotestrukmeValiteracija);
          var joinedkTOV4_KV02dalykStazuotesdalyvis = eval(kTOV4_KV02dalykStazuotesdalyvisiteracija);
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02dalykines_komp.stazuotes.push({
            pavadinimas: joinedkTOV4_KV02dalykStazuotespavad,
            pazymNr: joinedkTOV4_KV02dalykStazuotespazymNr,
            trukmeVal: joinedkTOV4_KV02dalykStazuotestrukmeVal,
            dalyvis: joinedkTOV4_KV02dalykStazuotesdalyvis
          })
        }
        for (let bn = 1; bn <= parseInt(req.body.number28); bn++) {
          var kTOV4_KV02dalykSeminaraipavaditeracija = kTOV4_KV02dalykSeminaraipavadcommand + bn;
          var kTOV4_KV02dalykSeminaraipazymNriteracija = kTOV4_KV02dalykSeminaraipazymNrcommand + bn;
          var kTOV4_KV02dalykSeminaraitrukmeValiteracija = kTOV4_KV02dalykSeminaraitrukmeValcommand + bn;
          var kTOV4_KV02dalykSeminaraidalyvisiteracija = kTOV4_KV02dalykSeminaraidalyviscommand + bn;
          var joinedkTOV4_KV02dalykSeminaraipavad = eval(kTOV4_KV02dalykSeminaraipavaditeracija);
          var joinedkTOV4_KV02dalykSeminaraipazymNr = eval(kTOV4_KV02dalykSeminaraipazymNriteracija);
          var joinedkTOV4_KV02dalykSeminaraitrukmeVal = eval(kTOV4_KV02dalykSeminaraitrukmeValiteracija);
          var joinedkTOV4_KV02dalykSeminaraidalyvis = eval(kTOV4_KV02dalykSeminaraidalyvisiteracija);
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02dalykines_komp.seminarai.push({
            pavadinimas: joinedkTOV4_KV02dalykSeminaraipavad,
            pazymNr: joinedkTOV4_KV02dalykSeminaraipazymNr,
            trukmeVal: joinedkTOV4_KV02dalykSeminaraitrukmeVal,
            dalyvis: joinedkTOV4_KV02dalykSeminaraidalyvis
          })
        }
        for (let bo = 1; bo <= parseInt(req.body.number30); bo++) {
          var kTOV4_KV02dalykKonfpavaditeracija = kTOV4_KV02dalykKonfpavadcommand + bo;
          var kTOV4_KV02dalykKonfpazymNriteracija = kTOV4_KV02dalykKonfpazymNrcommand + bo;
          var kTOV4_KV02dalykKonftrukmeValiteracija = kTOV4_KV02dalykKonftrukmeValcommand + bo;
          var kTOV4_KV02dalykKonfdalyvisiteracija = kTOV4_KV02dalykKonfdalyviscommand + bo;
          var joinedkTOV4_KV02dalykKonfpavad = eval(kTOV4_KV02dalykKonfpavaditeracija);
          var joinedkTOV4_KV02dalykKonfpazymNr = eval(kTOV4_KV02dalykKonfpazymNriteracija);
          var joinedkTOV4_KV02dalykKonftrukmeVal = eval(kTOV4_KV02dalykKonftrukmeValiteracija);
          var joinedkTOV4_KV02dalykKonfdalyvis = eval(kTOV4_KV02dalykKonfdalyvisiteracija);
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02dalykines_komp.konferencijos.push({
            pavadinimas: joinedkTOV4_KV02dalykKonfpavad,
            pazymNr: joinedkTOV4_KV02dalykKonfpazymNr,
            trukmeVal: joinedkTOV4_KV02dalykKonftrukmeVal,
            dalyvis: joinedkTOV4_KV02dalykKonfdalyvis
          })
        }
        for (let bp = 1; bp <= parseInt(req.body.number32); bp++) {
          var kTOV4_KV02dalykKursaipavaditeracija = kTOV4_KV02dalykKursaipavadcommand + bp;
          var kTOV4_KV02dalykKursaipazymNriteracija = kTOV4_KV02dalykKursaipazymNrcommand + bp;
          var kTOV4_KV02dalykKursaitrukmeValiteracija = kTOV4_KV02dalykKursaitrukmeValcommand + bp;
          var kTOV4_KV02dalykKursaidalyvisiteracija = kTOV4_KV02dalykKursaidalyviscommand + bp;
          var joinedkTOV4_KV02dalykKursaipavad = eval(kTOV4_KV02dalykKursaipavaditeracija);
          var joinedkTOV4_KV02dalykKursaipazymNr = eval(kTOV4_KV02dalykKursaipazymNriteracija);
          var joinedkTOV4_KV02dalykKursaitrukmeVal = eval(kTOV4_KV02dalykKursaitrukmeValiteracija);
          var joinedkTOV4_KV02dalykKursaidalyvis = eval(kTOV4_KV02dalykKursaidalyvisiteracija);
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02dalykines_komp.kursai.push({
            pavadinimas: joinedkTOV4_KV02dalykKursaipavad,
            pazymNr: joinedkTOV4_KV02dalykKursaipazymNr,
            trukmeVal: joinedkTOV4_KV02dalykKursaitrukmeVal,
            dalyvis: joinedkTOV4_KV02dalykKursaidalyvis
          })
        }
        //kTOV4_KV02didaktines_komp
        for (let bq = 1; bq <= parseInt(req.body.number34); bq++) {
          var kTOV4_KV02didakStazuotespavaditeracija = kTOV4_KV02didakStazuotespavadcommand + bq;
          var kTOV4_KV02didakStazuotespazymNriteracija = kTOV4_KV02didakStazuotespazymNrcommand + bq;
          var kTOV4_KV02didakStazuotestrukmeValiteracija = kTOV4_KV02didakStazuotestrukmeValcommand + bq;
          var kTOV4_KV02didakStazuotesdalyvisiteracija = kTOV4_KV02didakStazuotesdalyviscommand + bq;
          var joinedkTOV4_KV02didakStazuotespavad = eval(kTOV4_KV02didakStazuotespavaditeracija);
          var joinedkTOV4_KV02didakStazuotespazymNr = eval(kTOV4_KV02didakStazuotespazymNriteracija);
          var joinedkTOV4_KV02didakStazuotestrukmeVal = eval(kTOV4_KV02didakStazuotestrukmeValiteracija);
          var joinedkTOV4_KV02didakStazuotesdalyvis = eval(kTOV4_KV02didakStazuotesdalyvisiteracija);
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02didaktines_komp.stazuotes.push({
            pavadinimas: joinedkTOV4_KV02didakStazuotespavad,
            pazymNr: joinedkTOV4_KV02didakStazuotespazymNr,
            trukmeVal: joinedkTOV4_KV02didakStazuotestrukmeVal,
            dalyvis: joinedkTOV4_KV02didakStazuotesdalyvis
          })
        }
        for (let br = 1; br <= parseInt(req.body.number36); br++) {
          var kTOV4_KV02didakSeminaraipavaditeracija = kTOV4_KV02didakSeminaraipavadcommand + br;
          var kTOV4_KV02didakSeminaraipazymNriteracija = kTOV4_KV02didakSeminaraipazymNrcommand + br;
          var kTOV4_KV02didakSeminaraitrukmeValiteracija = kTOV4_KV02didakSeminaraitrukmeValcommand + br;
          var kTOV4_KV02didakSeminaraidalyvisiteracija = kTOV4_KV02didakSeminaraidalyviscommand + br;
          var joinedkTOV4_KV02didakSeminaraipavad = eval(kTOV4_KV02didakSeminaraipavaditeracija);
          var joinedkTOV4_KV02didakSeminaraipazymNr = eval(kTOV4_KV02didakSeminaraipazymNriteracija);
          var joinedkTOV4_KV02didakSeminaraitrukmeVal = eval(kTOV4_KV02didakSeminaraitrukmeValiteracija);
          var joinedkTOV4_KV02didakSeminaraidalyvis = eval(kTOV4_KV02didakSeminaraidalyvisiteracija);
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02didaktines_komp.seminarai.push({
            pavadinimas: joinedkTOV4_KV02didakSeminaraipavad,
            pazymNr: joinedkTOV4_KV02didakSeminaraipazymNr,
            trukmeVal: joinedkTOV4_KV02didakSeminaraitrukmeVal,
            dalyvis: joinedkTOV4_KV02didakSeminaraidalyvis
          })
        }
        for (let bs = 1; bs <= parseInt(req.body.number38); bs++) {
          var kTOV4_KV02didakKonfpavaditeracija = kTOV4_KV02didakKonfpavadcommand + bs;
          var kTOV4_KV02didakKonfpazymNriteracija = kTOV4_KV02didakKonfpazymNrcommand + bs;
          var kTOV4_KV02didakKonftrukmeValiteracija = kTOV4_KV02didakKonftrukmeValcommand + bs;
          var kTOV4_KV02didakKonfdalyvisiteracija = kTOV4_KV02didakKonfdalyviscommand + bs;
          var joinedkTOV4_KV02didakKonfpavad = eval(kTOV4_KV02didakKonfpavaditeracija);
          var joinedkTOV4_KV02didakKonfpazymNr = eval(kTOV4_KV02didakKonfpazymNriteracija);
          var joinedkTOV4_KV02didakKonftrukmeVal = eval(kTOV4_KV02didakKonftrukmeValiteracija);
          var joinedkTOV4_KV02didakKonfdalyvis = eval(kTOV4_KV02didakKonfdalyvisiteracija);
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02didaktines_komp.konferencijos.push({
            pavadinimas: joinedkTOV4_KV02didakKonfpavad,
            pazymNr: joinedkTOV4_KV02didakKonfpazymNr,
            trukmeVal: joinedkTOV4_KV02didakKonftrukmeVal,
            dalyvis: joinedkTOV4_KV02didakKonfdalyvis
          })
        }
        for (let bt = 1; bt <= parseInt(req.body.number40); bt++) {
          var kTOV4_KV02didakKursaipavaditeracija = kTOV4_KV02didakKursaipavadcommand + bt;
          var kTOV4_KV02didakKursaipazymNriteracija = kTOV4_KV02didakKursaipazymNrcommand + bt;
          var kTOV4_KV02didakKursaitrukmeValiteracija = kTOV4_KV02didakKursaitrukmeValcommand + bt;
          var kTOV4_KV02didakKursaidalyvisiteracija = kTOV4_KV02didakKursaidalyviscommand + bt;
          var joinedkTOV4_KV02didakKursaipavad = eval(kTOV4_KV02didakKursaipavaditeracija);
          var joinedkTOV4_KV02didakKursaipazymNr = eval(kTOV4_KV02didakKursaipazymNriteracija);
          var joinedkTOV4_KV02didakKursaitrukmeVal = eval(kTOV4_KV02didakKursaitrukmeValiteracija);
          var joinedkTOV4_KV02didakKursaidalyvis = eval(kTOV4_KV02didakKursaidalyvisiteracija);
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02didaktines_komp.kursai.push({
            pavadinimas: joinedkTOV4_KV02didakKursaipavad,
            pazymNr: joinedkTOV4_KV02didakKursaipazymNr,
            trukmeVal: joinedkTOV4_KV02didakKursaitrukmeVal,
            dalyvis: joinedkTOV4_KV02didakKursaidalyvis
          })
        }
        //kTOV4_KV02bendrosios_komp
        for (let bu = 1; bu <= parseInt(req.body.number42); bu++) {
          var kTOV4_KV02bendrStazuotespavaditeracija = kTOV4_KV02bendrStazuotespavadcommand + bu;
          var kTOV4_KV02bendrStazuotespazymNriteracija = kTOV4_KV02bendrStazuotespazymNrcommand + bu;
          var kTOV4_KV02bendrStazuotestrukmeValiteracija = kTOV4_KV02bendrStazuotestrukmeValcommand + bu;
          var kTOV4_KV02bendrStazuotesdalyvisiteracija = kTOV4_KV02bendrStazuotesdalyviscommand + bu;
          var joinedkTOV4_KV02bendrStazuotespavad = eval(kTOV4_KV02bendrStazuotespavaditeracija);
          var joinedkTOV4_KV02bendrStazuotespazymNr = eval(kTOV4_KV02bendrStazuotespazymNriteracija);
          var joinedkTOV4_KV02bendrStazuotestrukmeVal = eval(kTOV4_KV02bendrStazuotestrukmeValiteracija);
          var joinedkTOV4_KV02bendrStazuotesdalyvis = eval(kTOV4_KV02bendrStazuotesdalyvisiteracija);
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02bendrosios_komp.stazuotes.push({
            pavadinimas: joinedkTOV4_KV02bendrStazuotespavad,
            pazymNr: joinedkTOV4_KV02bendrStazuotespazymNr,
            trukmeVal: joinedkTOV4_KV02bendrStazuotestrukmeVal,
            dalyvis: joinedkTOV4_KV02bendrStazuotesdalyvis
          })
        }
        for (let bv = 1; bv <= parseInt(req.body.number44); bv++) {
          var kTOV4_KV02bendrSeminaraipavaditeracija = kTOV4_KV02bendrSeminaraipavadcommand + bv;
          var kTOV4_KV02bendrSeminaraipazymNriteracija = kTOV4_KV02bendrSeminaraipazymNrcommand + bv;
          var kTOV4_KV02bendrSeminaraitrukmeValiteracija = kTOV4_KV02bendrSeminaraitrukmeValcommand + bv;
          var kTOV4_KV02bendrSeminaraidalyvisiteracija = kTOV4_KV02bendrSeminaraidalyviscommand + bv;
          var joinedkTOV4_KV02bendrSeminaraipavad = eval(kTOV4_KV02bendrSeminaraipavaditeracija);
          var joinedkTOV4_KV02bendrSeminaraipazymNr = eval(kTOV4_KV02bendrSeminaraipazymNriteracija);
          var joinedkTOV4_KV02bendrSeminaraitrukmeVal = eval(kTOV4_KV02bendrSeminaraitrukmeValiteracija);
          var joinedkTOV4_KV02bendrSeminaraidalyvis = eval(kTOV4_KV02bendrSeminaraidalyvisiteracija);
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02bendrosios_komp.seminarai.push({
            pavadinimas: joinedkTOV4_KV02bendrSeminaraipavad,
            pazymNr: joinedkTOV4_KV02bendrSeminaraipazymNr,
            trukmeVal: joinedkTOV4_KV02bendrSeminaraitrukmeVal,
            dalyvis: joinedkTOV4_KV02bendrSeminaraidalyvis
          })
        }
        for (let bw = 1; bw <= parseInt(req.body.number46); bw++) {
          var kTOV4_KV02bendrKonfpavaditeracija = kTOV4_KV02bendrKonfpavadcommand + bw;
          var kTOV4_KV02bendrKonfpazymNriteracija = kTOV4_KV02bendrKonfpazymNrcommand + bw;
          var kTOV4_KV02bendrKonftrukmeValiteracija = kTOV4_KV02bendrKonftrukmeValcommand + bw;
          var kTOV4_KV02bendrKonfdalyvisiteracija = kTOV4_KV02bendrKonfdalyviscommand + bw;
          var joinedkTOV4_KV02bendrKonfpavad = eval(kTOV4_KV02bendrKonfpavaditeracija);
          var joinedkTOV4_KV02bendrKonfpazymNr = eval(kTOV4_KV02bendrKonfpazymNriteracija);
          var joinedkTOV4_KV02bendrKonftrukmeVal = eval(kTOV4_KV02bendrKonftrukmeValiteracija);
          var joinedkTOV4_KV02bendrKonfdalyvis = eval(kTOV4_KV02bendrKonfdalyvisiteracija);
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02bendrosios_komp.konferencijos.push({
            pavadinimas: joinedkTOV4_KV02bendrKonfpavad,
            pazymNr: joinedkTOV4_KV02bendrKonfpazymNr,
            trukmeVal: joinedkTOV4_KV02bendrKonftrukmeVal,
            dalyvis: joinedkTOV4_KV02bendrKonfdalyvis
          })
        }
        for (let bx = 1; bx <= parseInt(req.body.number48); bx++) {
          var kTOV4_KV02bendrKursaipavaditeracija = kTOV4_KV02bendrKursaipavadcommand + bx;
          var kTOV4_KV02bendrKursaipazymNriteracija = kTOV4_KV02bendrKursaipazymNrcommand + bx;
          var kTOV4_KV02bendrKursaitrukmeValiteracija = kTOV4_KV02bendrKursaitrukmeValcommand + bx;
          var kTOV4_KV02bendrKursaidalyvisiteracija = kTOV4_KV02bendrKursaidalyviscommand + bx;
          var joinedkTOV4_KV02bendrKursaipavad = eval(kTOV4_KV02bendrKursaipavaditeracija);
          var joinedkTOV4_KV02bendrKursaipazymNr = eval(kTOV4_KV02bendrKursaipazymNriteracija);
          var joinedkTOV4_KV02bendrKursaitrukmeVal = eval(kTOV4_KV02bendrKursaitrukmeValiteracija);
          var joinedkTOV4_KV02bendrKursaidalyvis = eval(kTOV4_KV02bendrKursaidalyvisiteracija);
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.kTOV4_KV02bendrosios_komp.kursai.push({
            pavadinimas: joinedkTOV4_KV02bendrKursaipavad,
            pazymNr: joinedkTOV4_KV02bendrKursaipazymNr,
            trukmeVal: joinedkTOV4_KV02bendrKursaitrukmeVal,
            dalyvis: joinedkTOV4_KV02bendrKursaidalyvis
          })
        }
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.dalykinesLT.destytojuSk = req.body.dalykinesLTdestytojuSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.dalykinesLT.trukmeVal = req.body.dalykinesLTtrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.dalykinesLT.stazuotSk = req.body.dalykinesLTstazuotSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.dalykinesLT.seminarSk = req.body.dalykinesLTseminarSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.dalykinesLT.konferencSk = req.body.dalykinesLTkonferencSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.dalykinesLT.kursaiSk = req.body.dalykinesLTkursaiSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.didaktinesLT.destytojuSk = req.body.didaktinesLTdestytojuSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.didaktinesLT.trukmeVal = req.body.didaktinesLTtrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.didaktinesLT.stazuotSk = req.body.didaktinesLTstazuotSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.didaktinesLT.seminarSk = req.body.didaktinesLTseminarSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.didaktinesLT.konferencSk = req.body.didaktinesLTkonferencSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.didaktinesLT.kursaiSk = req.body.didaktinesLTkursaiSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.bendrosiosLT.destytojuSk = req.body.bendrosiosLTdestytojuSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.bendrosiosLT.trukmeVal = req.body.bendrosiosLTtrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.bendrosiosLT.stazuotSk = req.body.bendrosiosLTstazuotSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.bendrosiosLT.seminarSk = req.body.bendrosiosLTseminarSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.bendrosiosLT.konferencSk = req.body.bendrosiosLTkonferencSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.bendrosiosLT.kursaiSk = req.body.bendrosiosLTkursaiSk,

          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.dalykinesNeLt.destytojuSk = req.body.dalykinesNeLtdestytojuSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.dalykinesNeLt.trukmeVal = req.body.dalykinesNeLttrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.dalykinesNeLt.stazuotSk = req.body.dalykinesNeLtstazuotSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.dalykinesNeLt.seminarSk = req.body.dalykinesNeLtseminarSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.dalykinesNeLt.konferencSk = req.body.dalykinesNeLtkonferencSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.dalykinesNeLt.kursaiSk = req.body.dalykinesNeLtkursaiSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.didaktinesNeLt.destytojuSk = req.body.didaktinesNeLtdestytojuSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.didaktinesNeLt.trukmeVal = req.body.didaktinesNeLttrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.didaktinesNeLt.stazuotSk = req.body.didaktinesNeLtstazuotSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.didaktinesNeLt.seminarSk = req.body.didaktinesNeLtseminarSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.didaktinesNeLt.konferencSk = req.body.didaktinesNeLtkonferencSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.didaktinesNeLt.kursaiSk = req.body.didaktinesNeLtkursaiSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.bendrosiosNeLt.destytojuSk = req.body.bendrosiosNeLtdestytojuSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.bendrosiosNeLt.trukmeVal = req.body.bendrosiosNeLttrukmeVal,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.bendrosiosNeLt.stazuotSk = req.body.bendrosiosNeLtstazuotSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.bendrosiosNeLt.seminarSk = req.body.bendrosiosNeLtseminarSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.bendrosiosNeLt.kursuoseSk = req.body.bendrosiosNeLtkursaiSk,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV02.bendrosiosNeLt.konferencSk = req.body.bendrosiosNeLtkonferencSk




        for (let i = 1; i <= parseInt(req.body.yonder28); i++) {
          var kTOV4_KV03nrcommandi = kTOV4_KV03nrcommand + i;
          var kTOV4_KV03destytojascommandi = kTOV4_KV03destytojascommand + i;
          var kTOV4_KV03saliscommandi = kTOV4_KV03saliscommand + i;
          var kTOV4_KV03institucijacommandi = kTOV4_KV03institucijacommand + i;
          var kTOV4_KV03dalykascommandi = kTOV4_KV03dalykascommand + i;
          var joinedkTOV4_KV03nr = eval(kTOV4_KV03nrcommandi);
          var joinedkTOV4_KV03destytojas = eval(kTOV4_KV03destytojascommandi);
          var joinedkTOV4_KV03salis = eval(kTOV4_KV03saliscommandi);
          var joinedkTOV4_KV03institucija = eval(kTOV4_KV03institucijacommandi);
          var joinedkTOV4_KV03dalykas = eval(kTOV4_KV03dalykascommandi);
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV03.push({
            nr: joinedkTOV4_KV03nr,
            destytojas: joinedkTOV4_KV03destytojas,
            salis: joinedkTOV4_KV03salis,
            institucija: joinedkTOV4_KV03institucija,
            dalykas: joinedkTOV4_KV03dalykas
          })
        }
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV04.judrumoDinamika = req.body.kTOV4_KV04judrumoDinamika,
          foundUser.katedrosVedejas.kTOV4.kTOV4_KV05.poveikisVeiklai = req.body.kTOV4_KV05poveikisVeiklai

        for (let i = 1; i <= parseInt(req.body.yond56); i++) {
          var kTOV4_O01_1nri = kTOV4_O01_1nrcommand + i;
          var kTOV4_O01_1destytojasi = kTOV4_O01_1destytojascommand + i;
          var kTOV4_O01_1veiklPobudi = kTOV4_O01_1veiklPobudcommand + i;
          var kTOV4_O01_1isakNrDatai = kTOV4_O01_1isakNrDatacommand + i;
          var joinedkTOV4_O01_1nr = eval(kTOV4_O01_1nri);
          var joinedkTOV4_O01_1destytojas = eval(kTOV4_O01_1destytojasi);
          var joinedkTOV4_O01_1veiklPobud = eval(kTOV4_O01_1veiklPobudi);
          var joinedkTOV4_O01_1isakNrData = eval(kTOV4_O01_1isakNrDatai);
          foundUser.katedrosVedejas.kTOV4.kTOV4_O01.kTOV4_O01_1.push({
            nr: joinedkTOV4_O01_1nr,
            destytojas: joinedkTOV4_O01_1destytojas,
            veiklPobud: joinedkTOV4_O01_1veiklPobud,
            isakNrData: joinedkTOV4_O01_1isakNrData
          })
        }
        for (let i = 1; i <= parseInt(req.body.yond58); i++) {
          var kTOV4_O01_2nri = kTOV4_O01_2nrcommand + i;
          var kTOV4_O01_2destytojasi = kTOV4_O01_2destytojascommand + i;
          var kTOV4_O01_2veiklPobudi = kTOV4_O01_2veiklPobudcommand + i;
          var kTOV4_O01_2dataVietai = kTOV4_O01_2dataVietacommand + i;
          var kTOV4_O01_2dalyvSki = kTOV4_O01_2dalyvSkcommand + i;
          var kTOV4_O01_2ktKomentaraii = kTOV4_O01_2ktKomentaraicommand + i;
          var joinedkTOV4_O01_2nr = eval(kTOV4_O01_2nri);
          var joinedkTOV4_O01_2destytojas = eval(kTOV4_O01_2destytojasi);
          var joinedkTOV4_O01_2veiklPobud = eval(kTOV4_O01_2veiklPobudi);
          var joinedkTOV4_O01_2dataVieta = eval(kTOV4_O01_2dataVietai);
          var joinedkTOV4_O01_2dalyvSk = eval(kTOV4_O01_2dalyvSki);
          var joinedkTOV4_O01_2ktKomentarai = eval(kTOV4_O01_2ktKomentaraii);
          foundUser.katedrosVedejas.kTOV4.kTOV4_O01.kTOV4_O01_2.push({
            nr: joinedkTOV4_O01_2nr,
            destytojas: joinedkTOV4_O01_2destytojas,
            veiklPobud: joinedkTOV4_O01_2veiklPobud,
            dataVieta: joinedkTOV4_O01_2dataVieta,
            dalyvSk: joinedkTOV4_O01_2dalyvSk,
            ktKomentarai: joinedkTOV4_O01_2ktKomentarai
          })
        }
        for (let i = 1; i <= parseInt(req.body.yonder18); i++) {
          var kTOV4_O02nri = kTOV4_O02nrcommand + i;
          var kTOV4_O02atstovasi = kTOV4_O02atstovascommand + i;
          var kTOV4_O02partneriaii = kTOV4_O02partneriaicommand + i;
          var kTOV4_O02formai = kTOV4_O02formacommand + i;
          var kTOV4_O02rezultataii = kTOV4_O02rezultataicommand + i;
          var kTOV4_O02sutartisi = kTOV4_O02sutartiscommand + i;
          var kTOV4_O02tipasi = kTOV4_O02tipascommand + i;
          var joinedkTOV4_O02nr = eval(kTOV4_O02nri);
          var joinedkTOV4_O02atstovas = eval(kTOV4_O02atstovasi);
          var joinedkTOV4_O02partneriai = eval(kTOV4_O02partneriaii);
          var joinedkTOV4_O02forma = eval(kTOV4_O02formai);
          var joinedkTOV4_O02rezultatai = eval(kTOV4_O02rezultataii);
          var joinedkTOV4_O02sutartis = eval(kTOV4_O02sutartisi);
          var joinedkTOV4_O02tipas = eval(kTOV4_O02tipasi);
          foundUser.katedrosVedejas.kTOV4.kTOV4_O02.push({
            nr: joinedkTOV4_O02nr,
            atstovas: joinedkTOV4_O02atstovas,
            partneriai: joinedkTOV4_O02partneriai,
            forma: joinedkTOV4_O02forma,
            rezultatai: joinedkTOV4_O02rezultatai,
            sutartis: joinedkTOV4_O02sutartis,
            tipas: joinedkTOV4_O02tipas
          })
        }
        for (let i = 1; i <= parseInt(req.body.yond60); i++) {
          var kTOV4_Snri = kTOV4_Snrcommand + i;
          var kTOV4_Sstiprybesi = kTOV4_Sstiprybescommand + i;
          var kTOV4_Stobulintinai = kTOV4_Stobulintinacommand + i;
          var joinedkTOV4_Snr = eval(kTOV4_Snri);
          var joinedkTOV4_Sstiprybes = eval(kTOV4_Sstiprybesi);
          var joinedkTOV4_Stobulintina = eval(kTOV4_Stobulintinai);
          foundUser.katedrosVedejas.kTOV4.kTOV4_S.push({
            nr: joinedkTOV4_Snr,
            stiprybes: joinedkTOV4_Sstiprybes,
            tobulintina: joinedkTOV4_Stobulintina
          })
        }
        for (let i = 1; i <= parseInt(req.body.yond62); i++) {
          var kV5_KT01nri = kV5_KT01nrcommand + i;
          var kV5_KT01diplomantasi = kV5_KT01diplomantascommand + i;
          var kV5_KT01studProgri = kV5_KT01studProgrcommand + i;
          var kV5_KT01darboTemai = kV5_KT01darboTemacommand + i;
          var kV5_KT01uzsakovasi = kV5_KT01uzsakovascommand + i;
          var joinedkV5_KT01nr = eval(kV5_KT01nri);
          var joinedkV5_KT01diplomantas = eval(kV5_KT01diplomantasi);
          var joinedkV5_KT01studProgr = eval(kV5_KT01studProgri);
          var joinedkV5_KT01darboTema = eval(kV5_KT01darboTemai);
          var joinedkV5_KT01uzsakovas = eval(kV5_KT01uzsakovasi);
          foundUser.katedrosVedejas.kV5.kV5_KT01.push({
            nr: joinedkV5_KT01nr,
            diplomantas: joinedkV5_KT01diplomantas,
            studProgr: joinedkV5_KT01studProgr,
            darboTema: joinedkV5_KT01darboTema,
            uzsakovas: joinedkV5_KT01uzsakovas
          })
        }
        for (let i = 1; i <= parseInt(req.body.yond64); i++) {
          var kV5_KT02nri = kV5_KT02nrcommand + i;
          var kV5_KT02diplomantasi = kV5_KT02diplomantascommand + i;
          var kV5_KT02studProgri = kV5_KT02studProgrcommand + i;
          var kV5_KT02darboTemai = kV5_KT02darboTemacommand + i;
          var joinedkV5_KT02nr = eval(kV5_KT02nri);
          var joinedkV5_KT02diplomantas = eval(kV5_KT02diplomantasi);
          var joinedkV5_KT02studProgr = eval(kV5_KT02studProgri);
          var joinedkV5_KT02darboTema = eval(kV5_KT02darboTemai);
          foundUser.katedrosVedejas.kV5.kV5_KT02.push({
            nr: joinedkV5_KT02nr,
            diplomantas: joinedkV5_KT02diplomantas,
            studProgr: joinedkV5_KT02studProgr,
            darboTema: joinedkV5_KT02darboTema
          })
        }
        for (let i = 1; i <= parseInt(req.body.yonder22); i++) {
          var kV5_KT03nri = kV5_KT03nrcommand + i;
          var kV5_KT03studProgri = kV5_KT03studProgrcommand + i;
          var kV5_KT03baigSki = kV5_KT03baigSkcommand + i;
          var kV5_KT03iregUzimtumSki = kV5_KT03iregUzimtumSkcommand + i;
          var kV5_KT03isidarbinProci = kV5_KT03isidarbinProccommand + i;
          var joinedkV5_KT03nr = eval(kV5_KT03nri);
          var joinedkV5_KT03studProgr = eval(kV5_KT03studProgri);
          var joinedkV5_KT03baigSk = eval(kV5_KT03baigSki);
          var joinedkV5_KT03iregUzimtumSk = eval(kV5_KT03iregUzimtumSki);
          var joinedkV5_KT03isidarbinProc = eval(kV5_KT03isidarbinProci);
          foundUser.katedrosVedejas.kV5.kV5_KT03.kV5_KT03_array.push({
            nr: joinedkV5_KT03nr,
            studProgr: joinedkV5_KT03studProgr,
            baigSk: joinedkV5_KT03baigSk,
            iregUzimtumSk: joinedkV5_KT03iregUzimtumSk,
            isidarbinProc: joinedkV5_KT03isidarbinProc
          })
        }
        for (let i = 1; i <= parseInt(req.body.yonder24); i++) {
          var kV5_KT04nri = kV5_KT04nrcommand + i;
          var kV5_KT04autoriusi = kV5_KT04autoriuscommand + i;
          var kV5_KT04veiklTipasi = kV5_KT04veiklTipascommand + i;
          var kV5_KT04pavadinimasi = kV5_KT04pavadinimascommand + i;
          var kV5_KT04sutartNri = kV5_KT04sutartNrcommand + i;
          var kV5_KT04uzsakovasi = kV5_KT04uzsakovascommand + i;
          var kV5_KT04uzsakSumai = kV5_KT04uzsakSumacommand + i;
          var joinedkV5_KT04nr = eval(kV5_KT04nri);
          var joinedkV5_KT04autorius = eval(kV5_KT04autoriusi);
          var joinedkV5_KT04veiklTipas = eval(kV5_KT04veiklTipasi);
          var joinedkV5_KT04pavadinimas = eval(kV5_KT04pavadinimasi);
          var joinedkV5_KT04sutartNr = eval(kV5_KT04sutartNri);
          var joinedkV5_KT04uzsakovas = eval(kV5_KT04uzsakovasi);
          var joinedkV5_KT04uzsakSuma = eval(kV5_KT04uzsakSumai);
          foundUser.katedrosVedejas.kV5.kV5_KT04.push({
            nr: joinedkV5_KT04nr,
            autorius: joinedkV5_KT04autorius,
            veiklTipas: joinedkV5_KT04veiklTipas,
            pavadinimas: joinedkV5_KT04pavadinimas,
            sutartNr: joinedkV5_KT04sutartNr,
            uzsakovas: joinedkV5_KT04uzsakovas,
            uzsakSuma: joinedkV5_KT04uzsakSuma
          })
        }
        for (let i = 1; i <= parseInt(req.body.yonder26); i++) {
          var veiklSavinalizenri = veiklSavinalizenrcommand + i;
          var veiklSavinalizestiprybesi = veiklSavinalizestiprybescommand + i;
          var veiklSavinalizetobulintinai = veiklSavinalizetobulintinacommand + i;
          var joinedveiklSavinalizenr = eval(veiklSavinalizenri);
          var joinedveiklSavinalizestiprybes = eval(veiklSavinalizestiprybesi);
          var joinedveiklSavinalizetobulintina = eval(veiklSavinalizetobulintinai);
          foundUser.katedrosVedejas.kV5.veiklSavinalize.veiklSavinaliz_array.push({
            nr: joinedveiklSavinalizenr,
            stiprybes: joinedveiklSavinalizestiprybes,
            tobulintina: joinedveiklSavinalizetobulintina
          })
        }
        foundUser.katedrosVedejas.kV5.kV5_KT05.bendradarbiavSklaid = req.body.kV5_KT05bendradarbiavSklaid,
          foundUser.katedrosVedejas.kV5.kV5_KT05.praktVeiklSklaid = req.body.kV5_KT05praktVeiklSklaid,
          foundUser.katedrosVedejas.kV5.kV5_KT05.dalyvavSklaid = req.body.kV5_KT05dalyvavSklaid,
          foundUser.katedrosVedejas.kV5.kV5_KT06.moklsPopSklaid = req.body.kV5_KT06moklsPopSklaid,
          foundUser.katedrosVedejas.kV5.kV5_KT06.tyrimuSklaid = req.body.kV5_KT06tyrimuSklaid,
          foundUser.katedrosVedejas.kV5.kV5_KT06.modernKultSklaid = req.body.kV5_KT06modernKultSklaid,
          foundUser.katedrosVedejas.kV5.kV5_KT06.bendrLavinSklaid = req.body.kV5_KT06bendrLavinSklaid,
          foundUser.katedrosVedejas.kV5.kV5_KT06.socAtskirtSklaid = req.body.kV5_KT06socAtskirtSklaid,
          foundUser.katedrosVedejas.kV5.kV5_KT06.aplinkApsaugSklaid = req.body.kV5_KT06aplinkApsaugSklaid,
          foundUser.katedrosVedejas.kV5.kV5_KT07.kompUgdymas = req.body.kV5_KT07kompUgdymas,
          foundUser.katedrosVedejas.kV5.kV5_KT08.rezFormulavimas = req.body.kV5_KT08rezFormulavimas,
          foundUser.katedrosVedejas.kV5.kV5_KT09.darnVystItrauk = req.body.kV5_KT09darnVystItrauk,
          foundUser.katedrosVedejas.kV5.veiklSavinalize.isvadosApieVeikl = req.body.isvadosApieVeikl,
          foundUser.katedrosVedejas.kV5.kV5_KT03.isVisoBaigSk = req.body.kV5_KT03isVisoBaigSk,
          foundUser.katedrosVedejas.kV5.kV5_KT03.isVisoIregUzimt = req.body.kV5_KT03isVisoIregUzimt,
          foundUser.katedrosVedejas.kV5.kV5_KT03.isVisoIsidarbProc = req.body.kV5_KT03isVisoIsidarbProc,
          foundUser.busenaVedejo = req.body.ataskaitos_busena,
          foundUser.updated_for = req.user.id,

          // User.findById(req.user.id, function(err, loggedUser) {
          //   if (err) {
          //     console.log(err);
          //   } else {
          //     foundUser.updated_for = loggedUser._id
          //   }
          // });

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
