const User = require("../models/User");

/* READ */
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const getFriends = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const friends = await User.find({ _id: { $in: user.friends } }).select(
      "_id firstName lastName picturePath occupation location"
    );

    res.status(200).json(friends);
  } catch (error) {
    next(error);
  }
};

/* UPDATE */
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.userId.toString() !== id) {
      return res.status(403).json({ message: "Unauthorized to update this profile" });
    }

    const updates = {};
    const allowedFields = ["firstName", "lastName", "location", "occupation"];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });
    if (req.file) updates.picturePath = req.file.filename;

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const addRemoveFriend = async (req, res, next) => {
  try {
    const { id, friendId } = req.params;

    if (id === friendId) {
      return res.status(400).json({ message: "Cannot add yourself as a friend" });
    }

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFriend = user.friends.some((f) => f.toString() === friendId);

    if (isFriend) {
      user.friends = user.friends.filter((f) => f.toString() !== friendId);
      friend.friends = friend.friends.filter((f) => f.toString() !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const updatedFriends = await User.find({ _id: { $in: user.friends } }).select(
      "_id firstName lastName picturePath occupation location"
    );

    res.status(200).json(updatedFriends);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserProfile,
  getUserById,
  getFriends,
  updateUser,
  addRemoveFriend,
};
