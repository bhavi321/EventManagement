const User = require("../models/User");

  const createUser = async (userData) => {
    const { name, timezone } = userData;

    if (!name || !name.trim()) {
      throw new Error("Name is required");
    }

    const user = new User({
      name: name.trim(),
      timezone: timezone,
    });

    return await user.save();
  }

  const getAllUsers = async () => {
    return await User.find().sort({ createdAt: -1 });
  }

  const getUserById = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  const updateUser = async (userId, userData) => {
      try {
        const { timezone } = userData;
    
        const user = await User.findByIdAndUpdate(
          userId,
          { timezone },
          { new: true, runValidators: true }
        );
    
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    }

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
};

