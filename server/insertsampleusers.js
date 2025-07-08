const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Connection error:", err));

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  role: {
    type: String,
    enum: ["elderly", "volunteer", "admin"],
    default: "elderly",
  },
  location: {
    address: String,
    city: String,
    state: String,
    pincode: String,
  },
  availability: [String],
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

const sampleUsers = Array.from({ length: 10 }, (_, i) => ({
  name: `Random User ${i + 1}`,
  email: `random${i + 1}@testmail.com`,
  phone: `98765432${i}${i}`,
  password: `password${i + 1}`,
  role: i % 3 === 0 ? "admin" : i % 2 === 0 ? "elderly" : "volunteer",
  location: {
    address: `House No. ${i + 10}, Street ${i + 1}`,
    city: "Exampleville",
    state: "Teststate",
    pincode: `4000${i}`,
  },
  availability: ["Monday Morning", "Wednesday Afternoon", "Friday Evening"],
}));

User.insertMany(sampleUsers)
  .then((res) => {
    console.log(`✅ Inserted ${res.length} users`);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("❌ Error inserting users:", err);
    mongoose.connection.close();
  });
