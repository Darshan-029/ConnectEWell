const transporter = require("../config/mailer");
const { getTempUser, setTempUser } = require("../utils/tempUserCache");
const HelpRequest = require("../models/HelpRequest");
const User = require("../models/User");

exports.sendEmail = async (req, res) => {
  console.log(req.body);

  if (!req.body || !req.body.to || !req.body.subject || !req.body.message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const { to, subject, message, toolCallId } = req.body;

  try {
    await transporter.sendMail({
      from: `"ConnectWell" <${process.env.MY_Gmail}>`,
      to,
      subject,
      text: message,
    });

    const userId = getTempUser();
    console.log("User id is", userId);

    if (userId) {
      const newRequest = new HelpRequest({
        user: userId,
        title: subject,
        description: message,
      });

      const volunteer = await User.findOne({ email: to });
      if (volunteer) newRequest.assignedTo = volunteer._id;

      await newRequest.save();
    }

    return res.json({
      results: [
        {
          toolCallId,
          result: `Email successfully sent to ${to}`,
        },
      ],
    });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({
      results: [
        {
          toolCallId,
          result: `Failed to send email to ${to}`,
        },
      ],
    });
  }
};

exports.setTempUserHandler = (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "User ID required" });

  setTempUser(userId);
  res.json({ message: "Temporary user ID set" });
};
