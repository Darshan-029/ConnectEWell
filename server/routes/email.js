const express = require("express");
const router = express.Router();
const {
  sendEmail,
  setTempUserHandler,
} = require("../controllers/emailController");

router.post("/sendEmail", sendEmail);
router.post("/setTempUser", setTempUserHandler);

module.exports = router;
