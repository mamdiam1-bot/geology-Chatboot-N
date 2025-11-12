const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 10000;

// מאפשר iframe מכל דומיין
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "ALLOWALL");
  next();
});

// Serve static files (HTML, JS, CSS)
app.use(express.static(path.join(__dirname, "public")));

// טעינת ה-KB אם קיים
let kb = {};
try {
  kb = JSON.parse(fs.readFileSync(path.join(__dirname, "kb/faqs.json")));
} catch (err) {
  console.warn("No KB found or failed to parse ./kb/faqs.json");
}

// API endpoint לדוגמא
app.get("/api/chat", express.json(), (req, res) => {
  const userMsg = req.query.q || "";
  // כאן אפשר להוסיף לוגיקה של OpenAI API
  res.json({ reply: "זוהי תגובה לדוגמא: " + userMsg });
});

// בועה צפה – bubble.html בתוך public
app.get("/bubble.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public/bubble.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
