var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var User = new Schema({
  firstname: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
  income: {
    type: Number,
    default: "",
  },
  familymembers: {
    type: Number,
    default: "",
  },
  email: {
    type: String,
    default: "",
    unique: false,
    required: false,
  },
  resetToken: String,
  expireToken: Date,
  facebookId: String,
  admin: {
    type: Boolean,
    default: false,
  },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);
