const express = require("express");

const app = express();

// Port for server to listen. If theres a Port env it will use that
// otherwise it will use 5000
const PORT = process.env.PORT || 5000;

// Get req to / and respond for controlling
app.get("/", (req, res) => {
    res.send("server running");
});

// Start server and listen on port 5000
app.listen(PORT, () => console.log(`server running on port 5000`));