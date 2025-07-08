const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MY_Gmail,
    pass: process.env.Pass, // App password
  },
});

module.exports = transporter;
