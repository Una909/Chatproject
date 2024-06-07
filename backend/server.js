import express from 'express';
import dotenv from 'dotenv';

import authRoutes from "./routes/authRoutes.js";
import connectMongo from './db/connectMongo.js';

const app = express();

// Port for server to listen
const PORT = process.env.PORT || 5000;

dotenv.config();

// parse incoming req with json payloads
app.use(express.json());
// use auth routes
app.use("/api/auth", authRoutes);

// root route
app.get("/", (req, res) => {
  res.send("server running");
});

// Start server and listen on port 5000
app.listen(PORT, () => {
    connectMongo();
    console.log(`server running on port ${PORT}`);
});