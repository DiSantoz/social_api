const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  addThought,
  thoughtUpdate,
  removeThought,
} = require("../../controllers/thought-controller");

// /api/thoughts
router.route("/").get(getAllThoughts).post(addThought);

// api/thoughts/:id
router.route("/:id").get(getThoughtById).put(thoughtUpdate);

// api/thoughts/:userId/:thoughtId
router.route("/:userId/:thoughtId").delete(removeThought);

module.exports = router;
