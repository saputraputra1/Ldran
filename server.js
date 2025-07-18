const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

const dbPath = path.join(__dirname, "data.json");

// Buat data awal kalau belum ada
if (!fs.existsSync(dbPath)) {
  const defaultData = {
    users: [
      { username: "kamu", password: "12345" },
      { username: "pacarmu", password: "67890" }
    ],
    messages: [],
    quiz: []
  };
  fs.writeFileSync(dbPath, JSON.stringify(defaultData, null, 2));
}

function readDB() {
  return JSON.parse(fs.readFileSync(dbPath));
}

function saveDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// LOGIN API
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const db = readDB();
  const user = db.users.find(
    (u) => u.username === username && u.password === password
  );
  res.json({ success: !!user });
});

// KIRIM PESAN
app.post("/message", (req, res) => {
  const { from, text } = req.body;
  const db = readDB();
  db.messages.push({ from, text, time: new Date().toISOString() });
  saveDB(db);
  res.json({ success: true });
});

// AMBIL PESAN
app.get("/messages", (req, res) => {
  const db = readDB();
  res.json(db.messages);
});

// QUIZ
app.post("/quiz", (req, res) => {
  const { from, answer } = req.body;
  const db = readDB();
  db.quiz.push({ from, answer });
  saveDB(db);
  res.json({ success: true });
});

app.get("/quiz", (req, res) => {
  const db = readDB();
  res.json(db.quiz);
});

// Jalankan Server
app.listen(PORT, () => console.log(`✅ Love-LDR jalan di port ${PORT}`));
                  
