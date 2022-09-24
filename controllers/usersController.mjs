import Note from '../models/Note.js';
import User from '../models/User.mjs';
import bcrypt from 'bcrypt';
// limiting the use of try/catch blocks
import asyncHandler from 'express-async-handler';

// get all users; GET /api/users
const getAllUsers = asyncHandler(async (req, res) => {
  // '-password' exlcudes returning password from db
  // lean() returns a json format and excludes methods with the object
  const users = await User.find().select('-password').lean();

  if (!users.length) {
    return res.status(400).json({ message: 'No Users Found.' });
  }

  res.json(users);
});

// create new user; POST /api/users
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;

  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // check for existing user
  // // exec() to return a promise back when a arg is passed in
  const duplicate = await User.findOne({ username }).lean().exec();

  if (duplicate) {
    return res
      .status(409)
      .json({ message: `${username} is already registered.` });
  }

  // // 10 salt rounds
  const hashedPassword = await bcrypt.hash(password, 10);
  const userObject = { username, password: hashedPassword, roles };

  await User.create(userObject);

  res.status(201).json({ message: `New user ${username} is created.` });
});

// update a user; PUT /api/users/:id
const udpateUser = asyncHandler(async (req, res) => {
  const { id, username, password, roles, active } = req.body;

  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== 'boolean'
  ) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: 'User not found.' });
  }

  // update password if only provided
  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }
  user.username = username;
  user.roles = roles;
  user.active = active;

  const updatedUser = await user.save();

  res.json({ message: `${updatedUser.username} updated.` });
});

// delete a user; delete /api/users/:id
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'User ID required.' });
  }

  const note = await Note.findOne({ user: id }).lean().exec();

  // even if there's ONE note
  if (note) {
    return res.status(400).json({ message: 'User still has assigned notes.' });
  }

  const user = await User.findById(id).exec();

  // returns the object of the deleted user
  const result = await user.deleteOne();

  res.json(
    `Username: ${result.username} (ID: ${result._id}) has been deleted.`
  );
});

export default { getAllUsers, createNewUser, udpateUser, deleteUser };
