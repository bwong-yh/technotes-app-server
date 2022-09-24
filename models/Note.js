const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// create schema
const noteSchema = new mongoose.Schema(
  {
    user: {
      // retrieve ObjectId from another schema
      type: mongoose.Schema.Types.ObjectId,
      // specify which schema
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    // mongodb automatically sets timestamp
    timestamps: true,
  }
);

noteSchema.plugin(AutoIncrement, {
  inc_field: 'ticket',
  id: 'ticketNums',
  start_seq: 100,
});

module.exports = mongoose.model('Note', noteSchema);
