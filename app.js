let timerId = null;
let selectedFreq = 1;
let selectedCategory = "hepsi";
let isAutoRunning = false;
let isTouched = false;

// KATEGORİYE GÖRE ELEMAN DİZİSİ (Sıfır Tekrar Mantığı)
let aktifHavuz = [];

function changeCategory(cat) {
  selectedCategory = cat;
  aktifHavuz = []; // Kategori değiştiğinde havuzu sıfırla

  document.querySelectorAll(".cat-btn").forEach((btn) => {
    btn.className = "cat-btn bg-zinc-800 border border-zinc-700/60 text-zinc-400 text-xs px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition";
  });

  const activeBtn = document.getElementById(`cat-${cat}`);
  if (activeBtn) {
    activeBtn.className = "cat-btn bg-amber-500/20 border border-amber-500/50 text-amber-400 text-xs px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition";
  }

  const catText = document.getElementById("selectedCatText");
  if (catText) {
    catText.innerText = cat.toUpperCase();
  }
}

function getRandomQuote() {
  // Eğer aktif havuz boşsa seçilen kategoriye göre yeniden doldur
  if (!aktifHavuz || aktifHavuz.length === 0) {
    if (selectedCategory === "hepsi") {
      aktifHavuz = [...bilgiDeposu];
    } else {
      aktifHavuz = bilgiDeposu.filter((item) => item.category === selectedCategory);
    }
  }

  // Havuz hâlâ boşsa (örneğin kategori eşleşmediyse) tüm depodan çek
  if (aktifHavuz.length === 0) {
    aktifHavuz = [...bilgiDeposu];
  }

  const randomIndex = Math.floor(Math.random() * aktifHavuz.length);
  const selectedItem = aktifHavuz.splice(randomIndex, 1)[0];

  // Obje kontrolü: text değerini garanti et
  if (typeof selectedItem === "object" && selectedItem.text) {
    return selectedItem.text;
  }
  return selectedItem;
}

function triggerFeedback() {
  try {
    if ("vibrate" in navigator) {
      navigator.vibrate([40, 30, 60]);
    }
  } catch (e) {}

  const btn = document.getElementById("satBtn");
  if (btn) {
    btn.classList.remove("shake-active");
    void btn.offsetWidth;
    btn.classList.add("shake-active");
  }

  const ring = document.getElementById("shockwaveRing");
  if (ring) {
    ring.classList.remove("shockwave-active");
    void ring.offsetWidth;
    ring.classList.add("shockwave-active");
  }

  const emoji = document.getElementById("btnEmoji");
  if (emoji) {
    emoji.style.transform = "scale(1.4) rotate(-12deg)";
    setTimeout(() => {
      emoji.style.transform = "scale(1) rotate(0deg)";
    }, 150);
  }
}

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

function gonderBildirim(quoteText) {
  try {
    new Notification("🧠 Bunu Biliyor Muydun?", {
      body: quoteText,
      icon: "https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
    });
  } catch (e) {
    alert("🧠 " + quoteText);
  }
}

function instantSat() {
  if (!isTouched) triggerFeedback();
  isTouched = false;

  const quote = getRandomQuote();

  if (!("Notification" in window)) {
    alert("🧠 " + quote);
    return;
  }

  if (Notification.permission !== "granted") {
    Notification.requestPermission().then((permission) => {
      updatePermissionUI(permission);
      if (permission === "granted") {
        gonderBildirim(quote);
      } else {
        alert("🧠 " + quote);
      }
    });
    return;
  }

  gonderBildirim(quote);
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
    btn.className = "text-xs bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 px-3 py-1.5 rounded-full font-semibold";
  }
}

function selectFreq(freq) {
  selectedFreq = freq;
  document.querySelectorAll(".freq-btn").forEach((btn) => {
    btn.className = "freq-btn bg-zinc-800 border border-zinc-800 text-zinc-400 rounded-xl py-1.5 text-center text-xs font-bold";
  });

  const activeBtn = document.getElementById(`freq-${freq}`);
  if (activeBtn) {
    activeBtn.className = "freq-btn bg-amber-500/10 border border-amber-500/40 text-amber-400 rounded-xl py-1.5 text-center text-xs font-bold";
  }

  if (isAutoRunning) startAutoSat();
}

function toggleAutoSat() {
  if (!("Notification" in window) || Notification.permission !== "granted") {
    requestPermission();
    return;
  }

  const toggleBtn = document.getElementById("toggleAutoBtn");

  if (isAutoRunning) {
    clearInterval(timerId);
    timerId = null;
    isAutoRunning = false;
    toggleBtn.innerText = "Otomatik Başlat";
    toggleBtn.className = "w-2/5 py-2.5 bg-zinc-100 text-zinc-950 font-black text-xs rounded-xl transition shadow-lg";
  } else {
    isAutoRunning = true;
    startAutoSat();
    toggleBtn.innerText = "Durdur";
    toggleBtn.className = "w-2/5 py-2.5 bg-red-600/20 border border-red-500/40 text-red-400 font-black text-xs rounded-xl transition";
  }
}

function startAutoSat() {
  if (timerId) clearInterval(timerId);

  const intervals = { 1: 30000, 2: 20000, 3: 10000 };
  const delay = intervals[selectedFreq];

  timerId = setInterval(() => {
    gonderBildirim(getRandomQuote());
  }, delay);
}

window.addEventListener("DOMContentLoaded", () => {
  if ("Notification" in window) updatePermissionUI(Notification.permission);
});