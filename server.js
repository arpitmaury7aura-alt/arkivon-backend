const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", (req, res) => {
    const userMessage = req.body.message;
    res.json({ reply: "Arkivon AI Reply: " + userMessage });
});

app.get("/status", (req, res) => {
    res.send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
