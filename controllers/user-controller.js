const { User } = require("../models");

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .then((UserDb) => res.json(UserDb))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((UserDb) => {
        if (!UserDb) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(UserDb);
      })
      .catch((err) => res.json(err));
  },

  // create a new user
  createUser({ body }, res) {
    User.create(body)
      .then((UserDb) => res.json(UserDb))
      .catch((err) => res.json(err));
  },

  // update user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((UserDb) => {
        if (!UserDb) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(UserDb);
      })
      .catch((err) => res.json(err));
  },

  // delete User
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((UserDb) => res.json(UserDb))
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
