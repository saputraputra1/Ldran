let currentUser = "";

// LOGIN
function login() {
  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: document.getElementById("username").value,
      password: document.getElementById("password").value
    })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        currentUser = document.getElementById("username").value;
        document.getElementById("loginCard").classList.add("hidden");
        document.getElementById("mainCard").classList.remove("hidden");
        document.getElementById("user").innerText = currentUser;
      } else {
        alert("Login gagal 💔");
      }
    });
}

// AMBIL PESAN
function loadMessages() {
  fetch("/messages")
    .then((res) => res.json())
    .then((data) => {
      let out = "<h4>Pesan Kalian:</h4>";
      if (data.length === 0) out += "<p>Belum ada pesan 💌</p>";
      data.forEach((m) => {
        out += `<p><b>${m.from}</b>: ${m.text} <small>(${new Date(
          m.time
        ).toLocaleString()})</small></p>`;
      });
      document.getElementById("output").innerHTML = out;
    });
}

// KIRIM PESAN
function sendMessage() {
  let msg = prompt("Tulis pesan romantis 💕");
  if (msg) {
    fetch("/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from: currentUser, text: msg })
    }).then(() => alert("Pesan terkirim 💌"));
  }
}

// JAWAB QUIZ
function answerQuiz() {
  let q = prompt("Pertanyaan: Siapa yang paling romantis? 💖");
  if (q) {
    fetch("/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from: currentUser, answer: q })
    }).then(() => alert("Jawaban tersimpan!"));
  }
}

// LIHAT JAWABAN QUIZ
function viewQuiz() {
  fetch("/quiz")
    .then((res) => res.json())
    .then((data) => {
      let out = "<h4>Jawaban Quiz:</h4>";
      if (data.length === 0) out += "<p>Belum ada jawaban quiz 🎲</p>";
      data.forEach((q) => {
        out += `<p><b>${q.from}</b>: ${q.answer}</p>`;
      });
      document.getElementById("output").innerHTML = out;
    });
}
