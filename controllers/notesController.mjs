import Note from '../models/Note.js';
import User from '../models/User.mjs';
import asyncHandler from 'express-async-handler';

// get all notes; GET /api/notes
const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().lean();

  if (!notes.length) {
    return res.status(400).json({ message: 'No Notes Found.' });
  }

  res.json(notes);
});

// create a note; POST /api/notes
const createNote = asyncHandler(async (req, res) => {
  const { user, title, text } = req.body;

  if (!user || !title || !text) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // check for existing user
  const existingUser = await User.findById(user).lean().exec();

  if (!existingUser) {
    return res.status(409).json({ message: `User does not exist.` });
  }

  // check for notes with the title
  const duplicate = await Note.findOne({ title }).lean().exec();

  if (duplicate) {
    return res
      .status(409)
      .json({ message: `Note with the title "${title}" already existed.` });
  }

  await Note.create({ user, title, text });

  res.status(201).json({ message: 'New note created.' });
});

export default { getAllNotes, createNote };
