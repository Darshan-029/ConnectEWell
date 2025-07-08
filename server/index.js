require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const emailRoutes = require("./routes/email");
const requestRoutes = require("./routes/requests");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Community Support Backend is Running");
});

app.use("/auth", authRoutes); // POST /auth/signup, /auth/login
app.use("/email", emailRoutes); // POST /email/sendEmail, /email/setTempUser
app.use("/", requestRoutes); // POST /getVolunteers, GET /allHelpRequests, DELETE /deleteRequest/:id

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
