import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("Arkivon AI Backend Running 🚀");
});

app.get("/status", (req, res) => {
  res.json({ status: "OK" });
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are Arkivon AI, smart and helpful assistant created by Arpit Maurya." },
        { role: "user", content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    res.json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "AI server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
