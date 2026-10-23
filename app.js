let timerId = null;
let selectedFreq = 1;
let isAutoRunning = false;

// Haptic (Titreşim) Motoru - Mobilde hata vermemesi için korumalı
function triggerHaptic(pattern = [60]) {
  try {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  } catch (err) {
    // Desteklemeyen cihazlarda sessizce geç
  }
}

function requestPermission() {
  triggerHaptic([30, 30, 30]);
  
  if (!("Notification" in window)) {
    alert("Bu tarayıcı bildirim desteklemiyor kanka. (iPhone'daysan ana ekrana eklemen gerekebilir)");
    return;
  }

  Notification.requestPermission().then((permission) => {
    updatePermissionUI(permission);
  }).catch((err) => {
    console.log("İzin alınamadı:", err);
  });
}

function updatePermissionUI(permission) {
  const btn = document.getElementById("permBtn");
  if (!btn) return;

  if (permission === "granted") {
    btn.innerText = "✅ İzin Verildi";
    btn.className = "text-xs bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 px-3 py-1.5 rounded-full pointer-events-none font-semibold";
  } else if (permission === "denied") {
    btn.innerText = "❌ İzin Reddedildi";
    btn.className = "text-xs bg-red-950/60 border border-red-800/60 text-red-400 px-3 py-1.5 rounded-full font-semibold";
  }
}

function getRandomQuote() {
  const index = Math.floor(Math.random() * bilgiDeposu.length);
  return bilgiDeposu[index];
}

// ANLIK BİLGİ SATIŞI
function instantSat() {
  triggerHaptic([70, 40, 90]);

  // Şok Dalgası Efekti
  const ripple = document.getElementById("rippleRing");
  if (ripple) {
    ripple.classList.remove("ripple-effect");
    void ripple.offsetWidth;
    ripple.classList.add("ripple-effect");
  }

  // Emoji Sıçrama Animasyonu
  const emoji = document.getElementById("btnEmoji");
  if (emoji) {
    emoji.style.transform = "scale(1.4) rotate(-10deg)";
    setTimeout(() => {
      emoji.style.transform = "scale(1) rotate(0deg)";
    }, 200);
  }

  // Bildirim Gönderme Kontrolü
  if (!("Notification" in window)) {
    alert(getRandomQuote()); // Bildirim desteklemeyen telefonda direkt ekrana alert basıp bilgiyi versin!
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
  } catch (err) {
    // Mobil tarayıcı kısıtlaması varsa ekranda alert ile göster
    alert(getRandomQuote());
  }
}

// SIKLIK SEÇİMİ
function selectFreq(freq) {
  triggerHaptic([40]);
  selectedFreq = freq;
  
  document.querySelectorAll(".freq-btn").forEach((btn) => {
    btn.className = "freq-btn bg-zinc-800/50 border border-zinc-800 text-zinc-400 rounded-2xl py-2.5 text-center transition active:scale-95";
  });

  const activeBtn = document.getElementById(`freq-${freq}`);
  if (activeBtn) {
    activeBtn.className = "freq-btn bg-amber-500/10 border border-amber-500/40 text-amber-400 rounded-2xl py-2.5 text-center transition active:scale-95";
  }

  if (isAutoRunning) {
    startAutoSat();
  }
}

// OTOMATİK MOD
function toggleAutoSat() {
  triggerHaptic([50, 50]);

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
    toggleBtn.className = "w-full py-3.5 bg-zinc-100 text-zinc-950 font-black text-sm rounded-2xl active:scale-95 transition shadow-lg";
    badge.innerText = "Kapalı";
    badge.className = "text-[10px] bg-zinc-800 text-zinc-400 px-2.5 py-0.5 rounded-full font-semibold";
  } else {
    isAutoRunning = true;
    startAutoSat();
    toggleBtn.innerText = "Zamanlayıcıyı Durdur";
    toggleBtn.className = "w-full py-3.5 bg-red-600/20 border border-red-500/40 text-red-400 font-black text-sm rounded-2xl active:scale-95 transition";
    badge.innerText = "Aktif";
    badge.className = "text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800/50 px-2.5 py-0.5 rounded-full font-semibold";
  }
}

function startAutoSat() {
  if (timerId) clearInterval(timerId);

  const intervals = {
    1: 30000,
    2: 20000,
    3: 10000
  };

  const delay = intervals[selectedFreq];

  timerId = setInterval(() => {
    try {
      new Notification("💡 Ortamda Satmalık Bilgi", {
        body: getRandomQuote(),
        icon: "https://cdn-icons-png.flatic-on.com/512/1828/1828843.png"
      });
    } catch (e) {
      // Bildirim atamazsa sessiz kal
    }
  }, delay);
}

window.addEventListener("DOMContentLoaded", () => {
  if ("Notification" in window) {
    updatePermissionUI(Notification.permission);
  }
});