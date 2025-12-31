const chat = document.getElementById("chat");
const input = document.getElementById("input");

function add(text, cls) {
  const d = document.createElement("div");
  d.className = "message " + cls;
  d.textContent = text;
  chat.appendChild(d);
  chat.scrollTop = chat.scrollHeight;
}

async function send() {
  const text = input.value.trim();
  if (!text) return;

  add(text, "user");
  input.value = "";
  add("Yozilmoqda...", "ai");

  const res = await fetch("/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  });

  const data = await res.json();
  chat.lastChild.remove();
  add(data.reply || "Xatolik", "ai");
}
