import express from 'express';
import dotenv from 'dotenv';

import authRoutes from "./routes/authRoutes.js";
import connectMongo from './db/connectMongo.js';

const app = express();

// Port for server to listen
dotenv.config();
const PORT = process.env.PORT || 5000;

// root route
app.get("/", (req, res) => {
    res.send("server running");
});

app.use("/api/auth",authRoutes)

// Start server and listen on port 5000
app.listen(PORT, () => {
    connectMongo();
    console.log(`server running on port ${PORT}`)
});