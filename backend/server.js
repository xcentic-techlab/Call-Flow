import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import callRoutes from "./routes/callRoutes.js";
import promptRoutes from "./routes/callRoutes.js"; // ✅ ADD THIS

dotenv.config();

const app = express();

// ✅ Proper CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://89.116.121.214",
      "https://call-flow-l08x.onrender.com/",
      "https://call-flow-rouge.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get("/", (req, res) => {
  res.send("🚀 Backend is live on Railway!");
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/call", callRoutes);
// app.get("/prompts", promptRoutes); // ✅ FIXED: uses router now

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
