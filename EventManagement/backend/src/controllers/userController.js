const userService = require("../service/userService");

  const createUser = async (req, res) => {
    try {
      console.log(req.body);
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  const getAllUsers = async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  const getUserById = async (req, res) => {
    try {
      const user = await userService.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      if (error.message === "User not found") {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  const updateUser = async (req, res) => {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
};

