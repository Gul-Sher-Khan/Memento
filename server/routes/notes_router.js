const express = require("express");

const router = express.Router();
const {
  getAllNotes,
  addNote,
  updateNote,
  getSingleNote,
  deleteNote,
} = require("../controller/notes_controller");

router.route("/").get(getAllNotes).post(addNote);
router.route("/:id").get(getSingleNote).patch(updateNote).delete(deleteNote);

module.exports = router;
