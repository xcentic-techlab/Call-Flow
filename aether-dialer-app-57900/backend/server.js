import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import promptRoutes from "./routes/promptRoutes.js";
import callRoutes from "./routes/callRoutes.js";
import bulkProxyRoutes from "./routes/bulkProxyRoutes.js";
import singleCallProxyRoutes from "./routes/singleCallProxyRoutes.js";
import promptsProxyRoutes from "./routes/promptsProxyRoutes.js";



dotenv.config();

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    return res.sendStatus(204);
  }
  next();
});



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get("/", (req, res) => {
  res.send("Backend is live.!");
});


app.use("/api/auth", authRoutes);
app.use("/api/call", callRoutes);
app.use("/prompts", promptRoutes);
app.use("/api", bulkProxyRoutes);
app.use("/api", singleCallProxyRoutes);
app.use("/api", promptsProxyRoutes);



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
