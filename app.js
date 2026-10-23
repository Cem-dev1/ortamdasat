let timerId = null;
let selectedFreq = 1;
let isAutoRunning = false;

// PWA Service Worker Kaydı
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

function requestPermission() {
  if (!("Notification" in window)) {
    alert("Bu cihaz bildirim desteklemiyor.");
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
    btn.className = "text-xs bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 px-3 py-1.5 rounded-full pointer-events-none";
  } else if (permission === "denied") {
    btn.innerText = "❌ İzin Reddedildi";
    btn.className = "text-xs bg-red-950/60 border border-red-800/60 text-red-400 px-3 py-1.5 rounded-full";
  }
}

function getRandomQuote() {
  const index = Math.floor(Math.random() * bilgiDeposu.length);
  return bilgiDeposu[index];
}

// ANLIK BİLGİ SATIŞI (Ortadaki Dev Buton)
function instantSat() {
  if (!("Notification" in window) || Notification.permission !== "granted") {
    requestPermission();
    return;
  }

  new Notification("🧠 Bunu Biliyor Muydun?", {
    body: getRandomQuote(),
    icon: "https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
  });
}

// SIKLIK SEÇİMİ (1x, 2x, 3x)
function selectFreq(freq) {
  selectedFreq = freq;
  document.querySelectorAll(".freq-btn").forEach((btn) => {
    btn.className = "freq-btn bg-zinc-800/50 border border-zinc-800 text-zinc-400 rounded-xl py-2.5 text-center transition";
  });

  const activeBtn = document.getElementById(`freq-${freq}`);
  if (activeBtn) {
    activeBtn.className = "freq-btn bg-amber-500/10 border border-amber-500/40 text-amber-400 rounded-xl py-2.5 text-center transition";
  }

  if (isAutoRunning) {
    startAutoSat(); // Çalışıyorsa yeni sıklıkla yenile
  }
}

// OTOMATİK MODU BAŞLAT / DURDUR
function toggleAutoSat() {
  if (!("Notification" in window) || Notification.permission !== "granted") {
    requestPermission();
    return;
  }

  const toggleBtn = document.getElementById("toggleAutoBtn");
  const badge = document.getElementById("statusBadge");

  if (isAutoRunning) {
    // Durdur
    clearInterval(timerId);
    timerId = null;
    isAutoRunning = false;
    toggleBtn.innerText = "Otomatik Zamanlayıcıyı Başlat";
    toggleBtn.className = "w-full py-3 bg-zinc-100 text-zinc-950 font-bold text-sm rounded-xl active:scale-98 transition shadow-lg";
    badge.innerText = "Kapalı";
    badge.className = "text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-md";
  } else {
    // Başlat
    isAutoRunning = true;
    startAutoSat();
    toggleBtn.innerText = "Zamanlayıcıyı Durdur";
    toggleBtn.className = "w-full py-3 bg-red-600/20 border border-red-500/40 text-red-400 font-bold text-sm rounded-xl active:scale-98 transition";
    badge.innerText = "Aktif";
    badge.className = "text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800/50 px-2 py-0.5 rounded-md";
  }
}

function startAutoSat() {
  if (timerId) clearInterval(timerId);

  // Web simülasyonu test süreleri (1x -> 30sn, 2x -> 20sn, 3x -> 10sn)
  const intervals = {
    1: 30000,
    2: 20000,
    3: 10000
  };

  const delay = intervals[selectedFreq];

  timerId = setInterval(() => {
    new Notification("💡 Ortamda Satmalık Bilgi", {
      body: getRandomQuote(),
      icon: "https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
    });
  }, delay);
}

// Sayfa yüklendiğinde durum kontrolü
window.addEventListener("DOMContentLoaded", () => {
  if ("Notification" in window) {
    updatePermissionUI(Notification.permission);
  }
});