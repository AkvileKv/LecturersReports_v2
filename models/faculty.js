const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');


var facultySchema = new mongoose.Schema({
  username:{
    type: String,
    unique: true
  }, //vietoj fakultetas, kad sukurtų uniq key value
  dekanas: String,
  prodekanas: String
});

facultySchema.plugin(passportLocalMongoose);

const Faculty = mongoose.model("Faculty", facultySchema);

module.exports = Faculty;
