const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  addThought,
} = require("../../controllers/thought-controller");

// /api/thoughts
router.route("/").get(getAllThoughts).post(addThought);

// api/thoughts/:id
router.route("/:id").get(getThoughtById);

module.exports = router;
