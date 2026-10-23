let timerId = null;

function requestPermission() {
  if (!("Notification" in window)) {
    alert("Bu tarayıcı bildirim desteklemiyor kanka.");
    return;
  }

  Notification.requestPermission().then((permission) => {
    const btn = document.getElementById("permBtn");
    if (permission === "granted") {
      btn.innerText = "✅ Bildirim İzni Verildi";
      btn.classList.replace("bg-zinc-700", "bg-emerald-900/40");
      btn.classList.add("text-emerald-400", "pointer-events-none");
    } else {
      alert("Bildirim izni vermedin, uygulama çalışmaz.");
    }
  });
}

function getRandomQuote() {
  const index = Math.floor(Math.random() * bilgiDeposu.length);
  return bilgiDeposu[index];
}

// MOD 1: Butona basınca bildirim fırlatır
function instantSat() {
  if (Notification.permission !== "granted") {
    alert("Önce bildirim izni vermen lazım kanka.");
    return;
  }

  new Notification("🧠 Bunu Biliyor Muydun?", {
    body: getRandomQuote(),
  });
}

// MOD 2: Web simülasyon zamanlayıcısı
function startAutoSat() {
  if (Notification.permission !== "granted") {
    alert("Önce bildirim izni ver kanka.");
    return;
  }

  if (timerId) clearInterval(timerId);

  const freq = parseInt(document.getElementById("freq").value);
  const status = document.getElementById("statusText");

  // Web'de test ederken bekleme olmasın diye saniyelere böldük:
  // 1 bildirim -> 30 sn, 2 bildirim -> 20 sn, 3 bildirim -> 10 sn
  const intervals = {
    1: 30000,
    2: 20000,
    3: 10000
  };

  const delay = intervals[freq];

  status.innerText = `Aktif! Test için her ${delay / 1000} saniyede bir yeni bilgi düşecek.`;

  timerId = setInterval(() => {
    new Notification("💡 Ortamda Satmalık Bilgi", {
      body: getRandomQuote(),
    });
  }, delay);
}