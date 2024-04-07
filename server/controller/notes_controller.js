const Note = require("../model/notes_model");

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({});
    return res.status(200).json({ notes });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const addNote = async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res.status(200).json({ note });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const updateNote = async (req, res) => {
  try {
    const { id: noteID } = req.params;
    const note = await Note.findOneAndUpdate({ _id: noteID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!note) {
      return res.status(404).json({ msg: "note not found" });
    }
    return res.status(200).json({ note });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const getSingleNote = async (req, res) => {
  try {
    const { id: noteID } = req.params;
    const note = await Note.findOne({ _id: noteID });
    if (!note) {
      return res.status(404).json({ msg: "note not found" });
    }
    return res.status(200).json({ note });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id: noteID } = req.params;
    const note = await Note.findOneAndDelete({ _id: noteID });
    if (!note) {
      return res.status(404).json({ msg: "note not found" });
    }
    return res.status(200).json({ note });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllNotes,
  addNote,
  updateNote,
  getSingleNote,
  deleteNote,
};
