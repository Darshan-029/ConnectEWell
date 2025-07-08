const mongoose = require("mongoose");

const helpRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },

  location: {
    address: String,
    city: String,
    pincode: String,
  },

  status: {
    type: String,
    enum: ["open", "assigned", "completed", "cancelled"],
    default: "open",
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Auto-update `updatedAt` before saving
helpRequestSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("HelpRequest", helpRequestSchema);
