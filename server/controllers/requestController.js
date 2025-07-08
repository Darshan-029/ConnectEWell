const User = require("../models/User");
const HelpRequest = require("../models/HelpRequest");

exports.getVolunteers = async (req, res) => {
  try {
    const volunteers = await User.find({ role: "volunteer" }, "name email");
    res.json(volunteers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch volunteers" });
  }
};

exports.getAllHelpRequests = async (req, res) => {
  try {
    const requests = await HelpRequest.find()
      .populate("user", "name email location")
      .populate("assignedTo", "name email");
    res.json(requests);
  } catch (err) {
    console.error("Error fetching help requests:", err);
    res.status(500).json({ error: "Failed to fetch help requests" });
  }
};

exports.deleteRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await HelpRequest.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({ message: "Request deleted successfully" });
  } catch (error) {
    console.error("Error deleting request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
