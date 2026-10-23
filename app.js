let timerId = null;

// Tarayıcı ve Safari kontrolü
function requestPermission() {
  if (!("Notification" in window)) {
    alert("Kanka bu tarayıcıda bildirim desteği kapalı. iPhone kullanıyorsan ana ekrana eklemen gerekebilir.");
    return;
  }

  // Safari hem Promise hem callback desteklediği için ikisini de kapsayan yapı:
  Notification.requestPermission().then((permission) => {
    handlePermissionResult(permission);
  }).catch(() => {
    // Eski Safari sürümleri için fallback
    Notification.requestPermission((permission) => {
      handlePermissionResult(permission);
    });
  });
}

function handlePermissionResult(permission) {
  const btn = document.getElementById("permBtn");
  if (permission === "granted") {
    if (btn) {
      btn.innerText = "✅ Bildirim İzni Verildi";
      btn.classList.replace("bg-zinc-700", "bg-emerald-900/40");
      btn.classList.add("text-emerald-400", "pointer-events-none");
    }
  } else {
    alert("Bildirim izni engellendi kanka. Tarayıcı ayarlarından izin vermen lazım.");
  }
}

function getRandomQuote() {
  const index = Math.floor(Math.random() * bilgiDeposu.length);
  return bilgiDeposu[index];
}

// MOD 1: Anlık Bilgi
function instantSat() {
  if (!("Notification" in window)) {
    alert("Bildirim desteği yok kanka.");
    return;
  }

  if (Notification.permission !== "granted") {
    alert("Önce bildirim izni vermen lazım.");
    return;
  }

  new Notification("🧠 Bunu Biliyor Muydun?", {
    body: getRandomQuote(),
  });
}

// MOD 2: Zamanlayıcı
function startAutoSat() {
  if (!("Notification" in window) || Notification.permission !== "granted") {
    alert("Önce bildirim izni vermen lazım kanka.");
    return;
  }

  if (timerId) clearInterval(timerId);

  const freq = parseInt(document.getElementById("freq").value);
  const status = document.getElementById("statusText");

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