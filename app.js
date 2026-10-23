let timerId = null;
let selectedFreq = 1;
let isAutoRunning = false;
let isTouched = false;

// Sarsıntı ve Titreşim Tetikleyici
function triggerFeedback() {
  // 1. Cihaz Titreşimi (Android & Destekleyen Cihazlar)
  try {
    if ("vibrate" in navigator) {
      navigator.vibrate([40, 30, 60]);
    }
  } catch (e) {}

  // 2. Görsel Titreme / Sarsıntı Animasyonu (iPhone/Safari İçin Tam Hissiyat)
  const btn = document.getElementById("satBtn");
  if (btn) {
    btn.classList.remove("shake-active");
    void btn.offsetWidth; // Reflow reset
    btn.classList.add("shake-active");
  }

  // 3. Şok Dalgası Halka Efekti
  const ring = document.getElementById("shockwaveRing");
  if (ring) {
    ring.classList.remove("shockwave-active");
    void ring.offsetWidth;
    ring.classList.add("shockwave-active");
  }

  // 4. Emoji Sıçrama
  const emoji = document.getElementById("btnEmoji");
  if (emoji) {
    emoji.style.transform = "scale(1.4) rotate(-12deg)";
    setTimeout(() => {
      emoji.style.transform = "scale(1) rotate(0deg)";
    }, 150);
  }
}

// Mobil Dokunmatik Olayları (0ms Gecikme)
function handleTouchStart(e) {
  isTouched = true;
  const btn = document.getElementById("satBtn");
  if (btn) btn.style.transform = "scale(0.88)";
  triggerFeedback();
}

function handleTouchEnd(e) {
  const btn = document.getElementById("satBtn");
  if (btn) btn.style.transform = "scale(1)";
}

// BİLGİ SATIŞI (Anlık Tıklama)
function instantSat() {
  // Eğer touchstart çalıştıysa tekrar tetikleme yapma
  if (!isTouched) {
    triggerFeedback();
  }
  isTouched = false;

  if (!("Notification" in window)) {
    alert("🧠 " + getRandomQuote());
    return;
  }

  if (Notification.permission !== "granted") {
    requestPermission();
    return;
  }

  try {
    new Notification("🧠 Bunu Biliyor Muydun?", {
      body: getRandomQuote(),
      icon: "https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
    });
  } catch (e) {
    alert("🧠 " + getRandomQuote());
  }
}

function getRandomQuote() {
  const index = Math.floor(Math.random() * bilgiDeposu.length);
  return bilgiDeposu[index];
}

function requestPermission() {
  if (!("Notification" in window)) {
    alert("Bu cihaz bildirim desteklemiyor kanka.");
    return;
  }

  Notification.requestPermission().then((permission) => {
    updatePermissionUI(permission);
  });
}

function updatePermissionUI(permission) {
  const btn = document.getElementById("permBtn");
  if (!btn) return;

  if (permission === "granted") {
    btn.innerText = "✅ İzin Verildi";
    btn.className = "text-xs bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 px-3 py-1.5 rounded-full pointer-events-none font-semibold";
  }
}

function selectFreq(freq) {
  selectedFreq = freq;
  document.querySelectorAll(".freq-btn").forEach((btn) => {
    btn.className = "freq-btn bg-zinc-800/50 border border-zinc-800 text-zinc-400 rounded-2xl py-2.5 text-center font-bold";
  });

  const activeBtn = document.getElementById(`freq-${freq}`);
  if (activeBtn) {
    activeBtn.className = "freq-btn bg-amber-500/10 border border-amber-500/40 text-amber-400 rounded-2xl py-2.5 text-center font-bold";
  }

  if (isAutoRunning) startAutoSat();
}

function toggleAutoSat() {
  if (!("Notification" in window) || Notification.permission !== "granted") {
    requestPermission();
    return;
  }

  const toggleBtn = document.getElementById("toggleAutoBtn");
  const badge = document.getElementById("statusBadge");

  if (isAutoRunning) {
    clearInterval(timerId);
    timerId = null;
    isAutoRunning = false;
    toggleBtn.innerText = "Otomatik Zamanlayıcıyı Başlat";
    toggleBtn.className = "w-full py-3.5 bg-zinc-100 text-zinc-950 font-black text-sm rounded-2xl transition shadow-lg";
    badge.innerText = "Kapalı";
    badge.className = "text-[10px] bg-zinc-800 text-zinc-400 px-2.5 py-0.5 rounded-full font-semibold";
  } else {
    isAutoRunning = true;
    startAutoSat();
    toggleBtn.innerText = "Zamanlayıcıyı Durdur";
    toggleBtn.className = "w-full py-3.5 bg-red-600/20 border border-red-500/40 text-red-400 font-black text-sm rounded-2xl transition";
    badge.innerText = "Aktif";
    badge.className = "text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800/50 px-2.5 py-0.5 rounded-full font-semibold";
  }
}

function startAutoSat() {
  if (timerId) clearInterval(timerId);

  const intervals = { 1: 30000, 2: 20000, 3: 10000 };
  const delay = intervals[selectedFreq];

  timerId = setInterval(() => {
    try {
      new Notification("💡 Ortamda Satmalık Bilgi", {
        body: getRandomQuote(),
        icon: "https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
      });
    } catch (e) {}
  }, delay);
}

window.addEventListener("DOMContentLoaded", () => {
  if ("Notification" in window) updatePermissionUI(Notification.permission);
});