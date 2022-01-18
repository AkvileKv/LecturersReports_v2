const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const mongooseHistory = require('mongoose-history');

var kDS1Schema = new mongoose.Schema({
  nr: String,
  vardPavard: String,
  pareigos: String,
  darbovTipas: String,
  pedagogStazas: String,
  praktinStazas: String
});
var kD1_K01Schema = new mongoose.Schema({
  nr: String,
  dalykas: String,
  grupe: String,
  semestras: String,
  planuotosVal: Number,
  atliktosVal: Number
});
