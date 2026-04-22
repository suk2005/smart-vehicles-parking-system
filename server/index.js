import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectToMongo from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import userVerification from "./middlewares/authMiddleware.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectToMongo();

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/api/getuser", userVerification, (req, res) => {
  res.json({ success: true, username: req.user.username });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});