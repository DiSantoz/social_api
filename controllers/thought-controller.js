const { Thought, User } = require("../models");

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then((thoughtDb) => res.json(thoughtDb))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get thought user by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then((thoughtDb) => {
        if (!thoughtDb) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(thoughtDb);
      })
      .catch((err) => res.json(err));
  },

  // add a thought to user
  addThought({ body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((UserDb) => {
        if (!UserDb) {
          res.status(404).json({ message: "No users found with this id!" });
          return;
        }
        res.json(UserDb);
      })
      .catch((err) => res.json(err));
  },

  // update a thought by id
  thoughtUpdate({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((thoughtDb) => {
        if (!thoughtDb) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(thoughtDb);
      })
      .catch((err) => res.json(err));
  },

  //  remove a thought

  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((deletedThought) => {
        if (!deletedThought) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then((UserDb) => {
        if (!UserDb) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(UserDb);
      })
      .catch((err) => res.json(err));
  },

  // add reaction to a user's thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true }
    )
      .then((thoughtDb) => {
        if (!thoughtDb) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(thoughtDb);
      })
      .catch((err) => res.json(err));
  },

  // delete a reaction from a user's thought
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((thoughtDb) => res.json(thoughtDb))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
