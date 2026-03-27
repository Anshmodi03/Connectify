const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    location: { type: String, default: "" },
    description: { type: String, required: true },
    picturePath: { type: String, default: "" },
    userPicturePath: { type: String, default: "" },
    likes: { type: Map, of: Boolean, default: {} },
    comments: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
