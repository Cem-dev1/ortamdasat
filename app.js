let timerId = null;
let selectedFreq = 1;
let selectedCategory = "hepsi";
let isAutoRunning = false;
let isTouched = false;

let aktifHavuz = [];
let currentQuestion = null;
let favorites = JSON.parse(localStorage.getItem("fav_quotes") || "[]");
let customQuotes = JSON.parse(localStorage.getItem("custom_quotes") || "[]");

// SAYFA GEÇİŞ SİSTEMİ (TAB SWITCHER)
function switchTab(tabName) {
  document.querySelectorAll(".page-content").forEach((page) => page.classList.add("hidden"));
  document.querySelectorAll(".tab-btn").forEach((btn) => btn.className = "tab-btn flex flex-col items-center gap-0.5 text-zinc-500");

  const targetPage = document.getElementById(`page-${tabName}`);
  const targetTab = document.getElementById(`tab-${tabName}`);

  if (targetPage) targetPage.classList.remove("hidden");
  if (targetTab) targetTab.className = "tab-btn flex flex-col items-center gap-0.5 text-amber-500";

  if (tabName === "game") nextGameQuestion();
  if (tabName === "feed") renderFeed();
  if (tabName === "favs") renderFavorites();
}

// BİLGİ RASTGELE SEÇİCİ
function getRandomQuote() {
  if (!aktifHavuz || aktifHavuz.length === 0) {
    let combined = [...bilgiDeposu, ...customQuotes];
    if (selectedCategory === "hepsi") {
      aktifHavuz = combined;
    } else {
      aktifHavuz = combined.filter((item) => item.category === selectedCategory);
    }
  }

  if (aktifHavuz.length === 0) {
    aktifHavuz = [...bilgiDeposu];
  }

  const randomIndex = Math.floor(Math.random() * aktifHavuz.length);
  const selectedItem = aktifHavuz.splice(randomIndex, 1)[0];

  if (typeof selectedItem === "object" && selectedItem.text) {
    return selectedItem.text;
  }
  return selectedItem;
}

// GERİ BİLDİRİM & SİS-TİTREŞİM MOTORU
function triggerFeedback() {
  try {
    if ("vibrate" in navigator) navigator.vibrate([40, 30, 60]);
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
      if (permission === "granted") gonderBildirim(quote);
      else alert("🧠 " + quote);
    });
    return;
  }

  gonderBildirim(quote);
}

// DOĞRU MI YALAN MI (İDDİA OYUN MODU)
const gameQuestions = [
  { question: "Ahtapotların 3 kalbi ve yeşil renkli kanı vardır.", answer: false, detail: "YALAN! 3 kalbi vardır ama kanları yeşil değil MAVİDİR!" },
  { question: "Konya yüzölçümü olarak Hollanda ülkesinden daha büyüktür.", answer: true, detail: "DOĞRU! Konya 40.838 km², Hollanda ise 41.543 km²'dir." },
  { category: "bilim", question: "Muzlar potasyum izotopu içerdiği için radyoaktif meyvelerdir.", answer: true, detail: "DOĞRU! Potasyum-40 içerirler ve yüksek miktarı radyoaktivite sensörünü tetikler." },
  { question: "Eyfel Kulesi yaz aylarında genleştiği için 15 cm uzar.", answer: true, detail: "DOĞRU! Isınan genleşen genleşmeyle 15 cm kadar yükselir." },
  { question: "Salyangozlar kış uykusuna yatamaz.", answer: false, detail: "YALAN! Salyangozlar 3 yıla kadar kış uykusuna yatabilir." }
];

function nextGameQuestion() {
  const randomIndex = Math.floor(Math.random() * gameQuestions.length);
  currentQuestion = gameQuestions[randomIndex];

  const card = document.getElementById("gameCard");
  if (card) {
    card.innerHTML = `
      <div class="w-full h-full flex flex-col justify-between">
        <div class="flex justify-between items-center">
          <span class="text-[10px] font-black bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2.5 py-1 rounded-full uppercase">İddia Sorusu</span>
          <span class="text-xs text-zinc-500 font-bold">Ortam Modu</span>
        </div>
        <p class="text-base font-bold text-zinc-100 text-center my-auto leading-relaxed">
          "${currentQuestion.question}"
        </p>
        <div class="grid grid-cols-2 gap-3 w-full">
          <button onclick="answerGame(true)" class="py-3 bg-emerald-600/20 border border-emerald-500/50 text-emerald-400 font-black text-sm rounded-2xl hover:bg-emerald-600/30 transition">✅ DOĞRU</button>
          <button onclick="answerGame(false)" class="py-3 bg-rose-600/20 border border-rose-500/50 text-rose-400 font-black text-sm rounded-2xl hover:bg-rose-600/30 transition">❌ YALAN</button>
        </div>
      </div>
    `;
  }
}

function answerGame(userChoice) {
  const isCorrect = userChoice === currentQuestion.answer;
  const card = document.getElementById("gameCard");

  if (card) {
    card.innerHTML = `
      <div class="w-full h-full flex flex-col justify-between items-center text-center py-2">
        <span class="text-4xl">${isCorrect ? "🎉" : "💀"}</span>
        <h3 class="text-lg font-black ${isCorrect ? "text-emerald-400" : "text-rose-400"} uppercase">
          ${isCorrect ? "TEBRİKLER, BİLDİN!" : "YANLIŞ TAHMİN!"}
        </h3>
        <p class="text-xs font-bold text-zinc-300 leading-relaxed px-2">
          ${currentQuestion.detail}
        </p>
        <button onclick="nextGameQuestion()" class="w-full py-2.5 bg-amber-500 text-zinc-950 font-black text-xs rounded-xl uppercase tracking-wider shadow-lg">
          Sonraki Soruya Geç
        </button>
      </div>
    `;
  }
}

// TWITTER TARZI TOPLULUK AKIŞI (FEED)
function renderFeed() {
  const feedList = document.getElementById("feedList");
  if (!feedList) return;

  let allQuotes = [...customQuotes, ...bilgiDeposu.slice(0, 15)];
  feedList.innerHTML = "";

  allQuotes.forEach((item, index) => {
    const text = typeof item === "object" ? item.text : item;
    const cat = typeof item === "object" ? item.category : "genel";
    const isFav = favorites.includes(text);

    feedList.innerHTML += `
      <div class="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-4 space-y-2 shadow-lg">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-xs font-black text-zinc-950">
              ${index % 2 === 0 ? "⚡" : "🧠"}
            </div>
            <span class="text-xs font-bold text-zinc-300">Ortamcı #${index + 101}</span>
          </div>
          <span class="text-[9px] bg-zinc-800 text-amber-400 border border-zinc-700 px-2 py-0.5 rounded-full uppercase font-bold">${cat}</span>
        </div>
        <p class="text-xs font-medium text-zinc-200 leading-relaxed">${text}</p>
        <div class="flex items-center justify-between pt-2 border-t border-zinc-800/60 text-xs">
          <button onclick="toggleFav('${text.replace(/'/g, "\\'")}')" class="flex items-center gap-1 ${isFav ? "text-rose-500 font-bold" : "text-zinc-500"}">
            <span>${isFav ? "❤️" : "🤍"}</span>
            <span class="text-[10px]">${isFav ? "Favoride" : "Favorile"}</span>
          </button>
          <button onclick="copyToClipboard('${text.replace(/'/g, "\\'")}')" class="text-zinc-500 hover:text-amber-400 text-[10px] font-bold flex items-center gap-1">
            📋 Kopyala
          </button>
        </div>
      </div>
    `;
  });
}

// FAVORİ YÖNETİMİ
function toggleFav(text) {
  if (favorites.includes(text)) {
    favorites = favorites.filter((f) => f !== text);
  } else {
    favorites.push(text);
  }
  localStorage.setItem("fav_quotes", JSON.stringify(favorites));
  renderFeed();
  renderFavorites();
}

function renderFavorites() {
  const favList = document.getElementById("favList");
  const favCountBadge = document.getElementById("favCountBadge");
  if (!favList) return;

  if (favCountBadge) favCountBadge.innerText = `${favorites.length} Bilgi`;

  if (favorites.length === 0) {
    favList.innerHTML = `<div class="text-center py-12 text-zinc-600 text-xs font-bold">Henüz favori bilgi eklemedin kanka.</div>`;
    return;
  }

  favList.innerHTML = "";
  favorites.forEach((text) => {
    favList.innerHTML += `
      <div class="bg-zinc-900 border border-amber-500/20 rounded-2xl p-4 space-y-2 shadow-lg">
        <p class="text-xs font-medium text-zinc-200 leading-relaxed">${text}</p>
        <div class="flex items-center justify-end gap-3 pt-2 border-t border-zinc-800/60">
          <button onclick="copyToClipboard('${text.replace(/'/g, "\\'")}')" class="text-amber-400 text-[10px] font-bold">📋 Kopyala</button>
          <button onclick="toggleFav('${text.replace(/'/g, "\\'")}')" class="text-rose-500 text-[10px] font-bold">🗑 Sil</button>
        </div>
      </div>
    `;
  });
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
  alert("📋 Bilgi panoya kopyalandı kanka!");
}

// KENDİ BİLGİNİ EKLE
function submitCustomQuote(e) {
  e.preventDefault();
  const cat = document.getElementById("addCatSelect").value;
  const text = document.getElementById("addQuoteText").value.trim();

  if (!text) return;

  const newQuote = { category: cat, text: text };
  customQuotes.unshift(newQuote);
  localStorage.setItem("custom_quotes", JSON.stringify(customQuotes));

  document.getElementById("addQuoteText").value = "";
  alert("🎉 Bilgin başarıyla eklendi kanka!");
  switchTab("feed");
}

function changeCategory(cat) {
  selectedCategory = cat;
  aktifHavuz = [];

  document.querySelectorAll(".cat-btn").forEach((btn) => {
    btn.className = "cat-btn bg-zinc-800 border border-zinc-700/60 text-zinc-400 text-xs px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition";
  });

  const activeBtn = document.getElementById(`cat-${cat}`);
  if (activeBtn) {
    activeBtn.className = "cat-btn bg-amber-500/20 border border-amber-500/50 text-amber-400 text-xs px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition";
  }

  const catText = document.getElementById("selectedCatText");
  if (catText) catText.innerText = cat.toUpperCase();
}

function requestPermission() {
  if (!("Notification" in window)) {
    alert("Bu cihaz bildirim desteklemiyor.");
    return;
  }
  Notification.requestPermission().then((permission) => updatePermissionUI(permission));
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
  const delay = { 1: 30000, 2: 20000, 3: 10000 }[selectedFreq];
  timerId = setInterval(() => gonderBildirim(getRandomQuote()), delay);
}

window.addEventListener("DOMContentLoaded", () => {
  if ("Notification" in window) updatePermissionUI(Notification.permission);
});