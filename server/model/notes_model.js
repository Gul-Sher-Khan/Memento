const mongoose = require("mongoose");
const NotesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide a name"],
    trim: true,
    maxlength: [20, "name cannot be more than 20 characters"],
  },
  text: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Note", NotesSchema);
