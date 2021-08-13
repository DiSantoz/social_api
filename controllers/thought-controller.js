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
  addThought({ params, body }, res) {
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

  // add reply to comment
  //   addReply({ params, body }, res) {
  //     Comment.findOneAndUpdate(
  //       { _id: params.commentId },
  //       { $push: { replies: body } },
  //       { new: true }
  //     )
  //       .then((dbPizzaData) => {
  //         if (!dbPizzaData) {
  //           res.status(404).json({ message: "No pizza found with this id!" });
  //           return;
  //         }
  //         res.json(dbPizzaData);
  //       })
  //       .catch((err) => res.json(err));
  //   },

  //   // remove comment
  //   removeComment({ params }, res) {
  //     Comment.findOneAndDelete({ _id: params.commentId })
  //       .then((deletedComment) => {
  //         if (!deletedComment) {
  //           return res.status(404).json({ message: "No comment with this id!" });
  //         }
  //         return Pizza.findOneAndUpdate(
  //           { _id: params.pizzaId },
  //           { $pull: { comments: params.commentId } },
  //           { new: true }
  //         );
  //       })
  //       .then((dbPizzaData) => {
  //         if (!dbPizzaData) {
  //           res.status(404).json({ message: "No pizza found with this id!" });
  //           return;
  //         }
  //         res.json(dbPizzaData);
  //       })
  //       .catch((err) => res.json(err));
  //   },
  //   // remove reply
  //   removeReply({ params }, res) {
  //     Comment.findOneAndUpdate(
  //       { _id: params.commentId },
  //       { $pull: { replies: { replyId: params.replyId } } },
  //       { new: true }
  //     )
  //       .then((dbPizzaData) => res.json(dbPizzaData))
  //       .catch((err) => res.json(err));
  //   },
};

module.exports = thoughtController;
