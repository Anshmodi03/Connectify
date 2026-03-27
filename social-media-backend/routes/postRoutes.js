const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  createPost,
  getFeedPosts,
  getUserPosts,
  likeUnlikePost,
  commentOnPost,
  deletePost,
} = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, "_"));
  },
});
const upload = multer({ storage });

router.get("/", authMiddleware, getFeedPosts);
router.post("/", authMiddleware, upload.single("picture"), createPost);
router.get("/:userId/posts", authMiddleware, getUserPosts);
router.patch("/:id/like", authMiddleware, likeUnlikePost);
router.post("/comment/:id", authMiddleware, commentOnPost);
router.delete("/:id", authMiddleware, deletePost);

module.exports = router;
