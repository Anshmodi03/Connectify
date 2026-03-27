const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getUserProfile,
  getUserById,
  getFriends,
  updateUser,
  addRemoveFriend,
} = require("../controllers/userController");
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

router.get("/profile", authMiddleware, getUserProfile);
router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, upload.single("picture"), updateUser);
router.get("/:id/friends", authMiddleware, getFriends);
router.patch("/:id/:friendId", authMiddleware, addRemoveFriend);

module.exports = router;
