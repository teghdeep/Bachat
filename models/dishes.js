const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const dishSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    name: {
      type: String,
      required: true,
      unique: true,
    },
    target: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://www.monzo.com/static/images/blog/2018-07-10-making-quarterly-goals-public/q3-goals-blog.png",
    },
    time: {
      type: Number,
      required: true,
    },
    complete: {
      type: Number,
      default: "0",
    },
    saved: {
      type: Number,
      default: "0",
    },
    archive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

var Dishes = mongoose.model("Dish", dishSchema);

module.exports = Dishes;
