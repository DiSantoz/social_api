const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  addThought,
  thoughtUpdate,
  removeThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

// /api/thoughts
router.route("/").get(getAllThoughts).post(addThought);

// /api/thoughts/:id
router.route("/:id").get(getThoughtById).put(thoughtUpdate);

// /api/thoughts/:userId/:thoughtId
router.route("/:userId/:thoughtId").delete(removeThought);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
