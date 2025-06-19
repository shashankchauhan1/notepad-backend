const Note = require("../models/Note.js");

// ✅ Get all notes of logged-in user
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }); // Secure filtering
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error: error.message });
  }
};

// ✅ Get one note by ID (only if it belongs to user)
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Error fetching note", error: error.message });
  }
};

// ✅ Create new note, attach userId
exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({
      title,
      content,
      userId: req.user.id, // Attach owner
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Error creating note", error: error.message });
  }
};

// ✅ Update a note (only if it belongs to the user)
exports.updateNote = async (req, res) => {
  try {
    const updated = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id }, // Secure filter
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Note not found or unauthorized" });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating note", error: error.message });
  }
};

// ✅ Delete a note (only if it belongs to the user)
exports.deleteNote = async (req, res) => {
  try {
    const deleted = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!deleted) {
      return res.status(404).json({ message: "Note not found or unauthorized" });
    }
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note", error: error.message });
  }
};
