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

// update a note; PATCH /api/notes
const updateNote = asyncHandler(async (req, res) => {
  const { id, user, title, text, completed } = req.body;

  if (!id || !user || !title || !text || typeof completed !== 'boolean') {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const note = await Note.findById(id).exec();

  if (!note) {
    return res.status(400).json({ message: 'No tickets found.' });
  }

  // check duplicated title
  const duplicate = await Note.findOne({ title }).lean().exec();

  if (duplicate) {
    return res
      .status(409)
      .json({ message: `Note with the title "${title}" already existed.` });
  }

  // check existing user
  const userId = await User.findById(user).lean().exec();

  if (!userId) {
    return res.status(409).json({ message: `User does not exist.` });
  }

  note.user = user;
  note.title = title;
  note.text = text;
  note.completed = completed;

  const updateTicket = await note.save();

  res.status(200).json({ message: `Ticket#${updateTicket.ticket} updated.` });
});

// get all notes; GET /api/notes
const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const note = await Note.findById(id).exec();
  const result = await note.deleteOne();

  res.json({ message: `Ticket#${result.ticket} has been removed.` });
});

export default { getAllNotes, createNote, updateNote, deleteNote };
