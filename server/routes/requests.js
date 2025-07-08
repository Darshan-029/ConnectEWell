const express = require("express");
const router = express.Router();
const {
  getVolunteers,
  getAllHelpRequests,
  deleteRequest,
} = require("../controllers/requestController");

router.post("/getVolunteers", getVolunteers);
router.get("/allHelpRequests", getAllHelpRequests);
router.delete("/deleteRequest/:id", deleteRequest);

module.exports = router;
