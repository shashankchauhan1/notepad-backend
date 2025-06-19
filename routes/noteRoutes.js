const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const { authenticateToken } = require("../middleware/auth"); // ✅ Import middleware

// ✅ Protected routes
router.get("/", authenticateToken, noteController.getNotes);
router.get("/:id", authenticateToken, noteController.getNoteById);
router.post("/", authenticateToken, noteController.createNote);
router.put("/:id", authenticateToken, noteController.updateNote);
router.delete("/:id", authenticateToken, noteController.deleteNote);

module.exports = router;
