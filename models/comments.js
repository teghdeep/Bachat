const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var commentSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    expense: {
      type: String,
      required: true,
    },

    ideal: {
      type: Number,
      required: true,
    },

    actual: {
      type: Number,
      default: "0",
    },
  },
  {
    timestamps: true,
  }
);

var Comments = mongoose.model("Comment", commentSchema);

module.exports = Comments;
