const STORAGE_KEYS = {
  settings: "glamp_v4_settings",
  units: "glamp_v4_units",
  bookings: "glamp_v4_bookings",
  services: "glamp_v4_services",
  expenses: "glamp_v4_expenses",
  specials: "glamp_v4_specials",
  session: "glamp_v4_session",
};

let selectedSearch = null;
let selectedUnit = null;
let selectedServices = [];
let calendarDate = new Date();
let currentRole = null;

const LANGUAGE_KEY = "glamp_v4_language";

const defaultSettings = {
  businessName: "Glamping Boutique",
  subtitle: "Naturaleza, descanso y experiencia privada",
  logoUrl: "",
  heroImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
  whatsappCode: "+593",
  whatsappNumber: "0980000000",
  checkin: "15:00",
  checkout: "11:00",
  depositPercent: 50,
  deadlineHours: 48,
  damageFee: 150,
  currency: "$",

  adminUser: "admin",
  adminPass: "admin123",

  houseUser: "housekeeping",
  housePass: "limpieza123",
  houseName: "Encargado Housekeeping",

  legalName: "",
  ruc: "",
  matrixAddress: "",
  branchAddress: "",
  billingEmail: "",
  businessPhone: "",
  establishment: "001",
  emissionPoint: "001",
  sequential: 1,
  accounting: "No",
};

const defaultUnits = [
  {
    id: "G001",
    name: "Glamping Andino",
    price: 65,
    adults: 2,
    children: 2,
    status: "active",
    housekeepingStatus: "ready",
    image: "https://images.unsplash.com/photo-1563299796-17596ed6b017?auto=format&fit=crop&w=1200&q=80",
    descriptionEs: "Cabaña privada ideal para pareja, con ambiente cálido y contacto directo con la naturaleza.",
    descriptionEn: "Private cabin ideal for couples, with a warm atmosphere and direct contact with nature.",
    features: ["Baño privado", "Ducha", "Cama doble", "Vista natural"],
  },
  {
    id: "G002",
    name: "Refugio Laguna",
    price: 75,
    adults: 2,
    children: 2,
    status: "active",
    housekeepingStatus: "ready",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
    descriptionEs: "Glamping con mayor privacidad, ideal para descanso, parejas y fechas especiales.",
    descriptionEn: "Private glamping unit, ideal for rest, couples and special dates.",
    features: ["Baño privado", "Calefón", "Recibidor frontal", "Luces cálidas"],
  },
  {
    id: "G003",
    name: "Cumbre A-Frame",
    price: 85,
    adults: 2,
    children: 2,
    status: "active",
    housekeepingStatus: "ready",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80",
    descriptionEs: "Unidad premium tipo A-frame con mejor vista, experiencia romántica y ambiente de montaña.",
    descriptionEn: "Premium A-frame unit with a better view, romantic experience and mountain atmosphere.",
    features: ["A-frame", "Vista panorámica", "Baño privado", "Experiencia premium"],
  },
];

const defaultServices = [
  {
    id: "S001",
    type: "food",
    nameEs: "Sin alimentación",
    nameEn: "No food service",
    descriptionEs: "Reserva sin alimentación.",
    descriptionEn: "Reservation without food service.",
    price: 0,
    active: true,
  },
  {
    id: "S002",
    type: "food",
    nameEs: "Desayuno básico",
    nameEn: "Basic breakfast",
    descriptionEs: "Café o aromática, pan, huevos y fruta.",
    descriptionEn: "Coffee or herbal tea, bread, eggs and fruit.",
    price: 10,
    active: true,
  },
  {
    id: "S003",
    type: "food",
    nameEs: "Desayuno andino",
    nameEn: "Andean breakfast",
    descriptionEs: "Café, pan de casa, queso, huevos, fruta y jugo natural.",
    descriptionEn: "Coffee, homemade bread, cheese, eggs, fruit and natural juice.",
    price: 15,
    active: true,
  },
  {
    id: "S004",
    type: "food",
    nameEs: "Desayuno premium romántico",
    nameEn: "Premium romantic breakfast",
    descriptionEs: "Bandeja especial para pareja con detalle romántico.",
    descriptionEn: "Special couple tray with a romantic detail.",
    price: 25,
    active: true,
  },
  {
    id: "S005",
    type: "food",
    nameEs: "Almuerzo especial",
    nameEn: "Special lunch",
    descriptionEs: "Almuerzo bajo coordinación previa.",
    descriptionEn: "Lunch by previous coordination.",
    price: 18,
    active: true,
  },
  {
    id: "S006",
    type: "food",
    nameEs: "Merienda especial",
    nameEn: "Special dinner",
    descriptionEs: "Merienda bajo coordinación previa.",
    descriptionEn: "Dinner by previous coordination.",
    price: 18,
    active: true,
  },
  {
    id: "S007",
    type: "experience",
    nameEs: "Cuna",
    nameEn: "Crib",
    descriptionEs: "Cuna sujeta a disponibilidad.",
    descriptionEn: "Crib subject to availability.",
    price: 10,
    active: true,
  },
  {
    id: "S008",
    type: "experience",
    nameEs: "Decoración romántica",
    nameEn: "Romantic decoration",
    descriptionEs: "Decoración especial para pareja, aniversario o cumpleaños.",
    descriptionEn: "Special decoration for couples, anniversaries or birthdays.",
    price: 20,
    active: true,
  },
  {
    id: "S009",
    type: "experience",
    nameEs: "Fogata",
    nameEn: "Campfire",
    descriptionEs: "Fogata coordinada según clima y seguridad.",
    descriptionEn: "Campfire coordinated according to weather and safety conditions.",
    price: 10,
    active: true,
  },
  {
    id: "S010",
    type: "experience",
    nameEs: "Transporte desde Ibarra",
    nameEn: "Transport from Ibarra",
    descriptionEs: "Transporte desde un punto estratégico de Ibarra hacia el glamping.",
    descriptionEn: "Transport from a strategic point in Ibarra to the glamping site.",
    price: 15,
    active: true,
  },
  {
    id: "S011",
    type: "experience",
    nameEs: "Caminata",
    nameEn: "Hiking",
    descriptionEs: "Experiencia por zonas naturales cercanas.",
    descriptionEn: "Experience through nearby natural areas.",
    price: 12,
    active: true,
  },
  {
    id: "S012",
    type: "experience",
    nameEs: "Cabalgata",
    nameEn: "Horseback riding",
    descriptionEs: "Cabalgata bajo coordinación previa.",
    descriptionEn: "Horseback riding by previous coordination.",
    price: 25,
    active: true,
  },
  {
    id: "S013",
    type: "consumption",
    nameEs: "Bebidas calientes",
    nameEn: "Hot drinks",
    descriptionEs: "Café, chocolate o aromática adicional.",
    descriptionEn: "Additional coffee, hot chocolate or herbal tea.",
    price: 4,
    active: true,
  },
  {
    id: "S014",
    type: "consumption",
    nameEs: "Late check-out",
    nameEn: "Late check-out",
    descriptionEs: "Salida tardía sujeta a disponibilidad.",
    descriptionEn: "Late check-out subject to availability.",
    price: 10,
    active: true,
  },
];

const defaultSpecials = [
  {
    id: "SP001",
    name: "San Valentín",
    nameEn: "Valentine's Day",
    date: "",
    price: 110,
    description: "Glamping + decoración romántica + desayuno premium.",
    descriptionEn: "Glamping + romantic decoration + premium breakfast.",
    active: true,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  seedData();
  expireOldPendingBookings();
  setupDates();
  bindEvents();
  bindLanguageButtons();
  applySettings();
  applyLanguage(getCurrentLanguage());
  renderGlampings();
  renderAdminAll();

  const savedSession = getData(STORAGE_KEYS.session, null);
  if (savedSession) {
    currentRole = savedSession.role;
    openInternalPanel(savedSession.role);
  }

  if (window.location.hash === "#admin") {
    openLogin();
  }
});

/* =========================
   DATA HELPERS
========================= */

function getData(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;

  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getSettings() {
  return getData(STORAGE_KEYS.settings, defaultSettings);
}

function getUnits() {
  return getData(STORAGE_KEYS.units, defaultUnits);
}

function getBookings() {
  return getData(STORAGE_KEYS.bookings, []);
}

function getServices() {
  return getData(STORAGE_KEYS.services, defaultServices);
}

function getExpenses() {
  return getData(STORAGE_KEYS.expenses, []);
}

function getSpecials() {
  return getData(STORAGE_KEYS.specials, defaultSpecials);
}

function seedData() {
  if (!localStorage.getItem(STORAGE_KEYS.settings)) {
    setData(STORAGE_KEYS.settings, defaultSettings);
  }

  if (!localStorage.getItem(STORAGE_KEYS.units)) {
    setData(STORAGE_KEYS.units, defaultUnits);
  }

  if (!localStorage.getItem(STORAGE_KEYS.services)) {
    setData(STORAGE_KEYS.services, defaultServices);
  }

  if (!localStorage.getItem(STORAGE_KEYS.bookings)) {
    setData(STORAGE_KEYS.bookings, []);
  }

  if (!localStorage.getItem(STORAGE_KEYS.expenses)) {
    setData(STORAGE_KEYS.expenses, []);
  }

  if (!localStorage.getItem(STORAGE_KEYS.specials)) {
    setData(STORAGE_KEYS.specials, defaultSpecials);
  }
}

/* =========================
   UTILIDADES
========================= */

function money(value) {
  return `${getSettings().currency}${Number(value || 0).toFixed(2)}`;
}

function todayISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().split("T")[0];
}

function nextDayISO(date) {
  const d = new Date(date);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

function dateDiffNights(checkIn, checkOut) {
  const a = new Date(checkIn);
  const b = new Date(checkOut);
  return Math.ceil((b - a) / 86400000);
}

function addHours(date, hours) {
  const d = new Date(date);
  d.setHours(d.getHours() + Number(hours));
  return d;
}

function onlyDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

function escapeHTML(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function rangesOverlap(startA, endA, startB, endB) {
  return new Date(startA) < new Date(endB) && new Date(startB) < new Date(endA);
}

function generateBookingCode() {
  const year = new Date().getFullYear();
  const count = getBookings().length + 1;
  return `GLAMP-${year}-${String(count).padStart(4, "0")}`;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3200);
}

function validatePhone(selectId, phoneId) {
  const select = document.getElementById(selectId);
  const selected = select.options[select.selectedIndex];
  const digitsNeeded = Number(selected.dataset.digits || 10);
  const phone = onlyDigits(document.getElementById(phoneId).value);

  if (phone.length !== digitsNeeded) {
    showToast(t("phoneDigits", { digits: digitsNeeded }));
    return false;
  }

  return true;
}

function ensureAgeOptions(selectId, minAge = 18, maxAge = 100) {
  const select = document.getElementById(selectId);
  if (!select) return;

  if (select.options.length > 5) return;

  select.innerHTML = `<option value="">${t("selectAge")}</option>`;

  for (let i = minAge; i <= maxAge; i++) {
    const option = document.createElement("option");
    option.value = String(i);
    option.textContent = `${i} ${t("years")}`;
    select.appendChild(option);
  }
}

/* =========================
   FECHAS / DISPONIBILIDAD
========================= */

function setupDates() {
  const min = todayISO();

  [
    "checkIn",
    "checkOut",
    "manualCheckIn",
    "manualCheckOut",
    "expenseDate",
    "specialDate",
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.min = min;
  });

  const checkIn = document.getElementById("checkIn");
  const checkOut = document.getElementById("checkOut");

  checkIn.addEventListener("change", () => {
    if (!checkIn.value) return;

    checkOut.min = nextDayISO(checkIn.value);

    if (!checkOut.value || checkOut.value <= checkIn.value) {
      checkOut.value = nextDayISO(checkIn.value);
    }
  });

  const manualCheckIn = document.getElementById("manualCheckIn");
  const manualCheckOut = document.getElementById("manualCheckOut");

  manualCheckIn.addEventListener("change", () => {
    if (!manualCheckIn.value) return;

    manualCheckOut.min = nextDayISO(manualCheckIn.value);

    if (!manualCheckOut.value || manualCheckOut.value <= manualCheckIn.value) {
      manualCheckOut.value = nextDayISO(manualCheckIn.value);
    }
  });
}

function expireOldPendingBookings() {
  const settings = getSettings();
  const bookings = getBookings();
  let changed = false;

  const updated = bookings.map((b) => {
    if (b.status !== "pending") return b;

    const deadline = b.paymentDeadline
      ? new Date(b.paymentDeadline)
      : addHours(new Date(b.createdAt), settings.deadlineHours);

    if (new Date() > deadline) {
      changed = true;
      return {
        ...b,
        status: "expired",
        expiredAt: new Date().toISOString(),
      };
    }

    return b;
  });

  if (changed) {
    setData(STORAGE_KEYS.bookings, updated);
  }
}

function isUnitAvailable(unitId, checkIn, checkOut) {
  const blockingStates = [
    "pending",
    "confirmed",
    "checked_in",
    "cleaning_pending",
  ];

  return !getBookings().some((b) => {
    if (b.unitId !== unitId) return false;
    if (!blockingStates.includes(b.status)) return false;
    return rangesOverlap(checkIn, checkOut, b.checkIn, b.checkOut);
  });
}

/* =========================
   EVENTOS
========================= */

function bindEvents() {
  document.getElementById("availabilityForm").addEventListener("submit", handleAvailabilitySearch);

  document.getElementById("closeReservationPanel").addEventListener("click", () => {
    document.getElementById("reservationPanel").classList.add("hidden");
  });

  document.getElementById("reservationForm").addEventListener("submit", handleReservationSubmit);

  document.getElementById("transportType").addEventListener("change", toggleArrivalTime);

  document.getElementById("foodAllergySelect").addEventListener("change", toggleOtherFields);
  document.getElementById("medicalSelect").addEventListener("change", toggleOtherFields);
  document.getElementById("invoiceType").addEventListener("change", toggleInvoiceFields);

  document.getElementById("openLoginBtn").addEventListener("click", openLogin);
  document.getElementById("closeLoginBtn").addEventListener("click", () => {
    document.getElementById("loginPanel").classList.add("hidden");
  });

  document.getElementById("loginForm").addEventListener("submit", handleLogin);
  document.getElementById("logoutBtn").addEventListener("click", logout);
  document.getElementById("backToPublicBtn").addEventListener("click", backToPublic);

  document.querySelectorAll(".admin-nav").forEach((btn) => {
    btn.addEventListener("click", () => switchAdminSection(btn.dataset.section));
  });

  document.getElementById("settingsForm").addEventListener("submit", saveSettings);

  document.getElementById("manualBookingForm").addEventListener("submit", saveManualBooking);
  document.getElementById("manualAdults").addEventListener("change", renderManualCompanionsRequired);
  document.getElementById("manualChildren").addEventListener("change", renderManualCompanionsRequired);
  document.getElementById("manualCheckIn").addEventListener("change", renderManualSpecials);
  document.getElementById("manualCheckOut").addEventListener("change", renderManualSpecials);

  document.getElementById("bookingSearch").addEventListener("input", renderAdminBookings);
  document.getElementById("bookingStatusFilter").addEventListener("change", renderAdminBookings);

  document.getElementById("prevMonthBtn").addEventListener("click", () => {
    calendarDate.setMonth(calendarDate.getMonth() - 1);
    renderCalendar();
  });

  document.getElementById("nextMonthBtn").addEventListener("click", () => {
    calendarDate.setMonth(calendarDate.getMonth() + 1);
    renderCalendar();
  });

  document.getElementById("addUnitBtn").addEventListener("click", () => openUnitModal());
  document.getElementById("closeUnitModal").addEventListener("click", () => {
    document.getElementById("unitModal").classList.add("hidden");
  });
  document.getElementById("unitForm").addEventListener("submit", saveUnit);

  document.getElementById("addServiceBtn").addEventListener("click", () => openServiceModal());
  document.getElementById("closeServiceModal").addEventListener("click", () => {
    document.getElementById("serviceModal").classList.add("hidden");
  });
  document.getElementById("serviceForm").addEventListener("submit", saveService);

  document.getElementById("closeCancelModal").addEventListener("click", () => {
    document.getElementById("cancelModal").classList.add("hidden");
  });
  document.getElementById("cancelForm").addEventListener("submit", saveCancellation);

  document.getElementById("closeConsumptionModal").addEventListener("click", () => {
    document.getElementById("consumptionModal").classList.add("hidden");
  });
  document.getElementById("consumptionService").addEventListener("change", syncConsumptionPrice);
  document.getElementById("consumptionForm").addEventListener("submit", saveConsumption);

  document.getElementById("closeCheckoutModal").addEventListener("click", () => {
    document.getElementById("checkoutModal").classList.add("hidden");
  });
  document.getElementById("checkoutDamage").addEventListener("change", () => {
    document.getElementById("damageValueBox").classList.toggle(
      "hidden",
      document.getElementById("checkoutDamage").value !== "Sí"
    );
  });
  document.getElementById("checkoutForm").addEventListener("submit", saveCheckout);

  document.getElementById("closeHousekeepingModal").addEventListener("click", () => {
    document.getElementById("housekeepingModal").classList.add("hidden");
  });

  document.getElementById("houseIssueType").addEventListener("change", () => {
    document.getElementById("houseOtherIssueBox").classList.toggle(
      "hidden",
      document.getElementById("houseIssueType").value !== "Otro"
    );
  });

  document.getElementById("housekeepingForm").addEventListener("submit", saveHousekeepingReport);

  document.getElementById("addExpenseBtn").addEventListener("click", openExpenseModal);
  document.getElementById("closeExpenseModal").addEventListener("click", () => {
    document.getElementById("expenseModal").classList.add("hidden");
  });
  document.getElementById("expenseCategory").addEventListener("change", () => {
    document.getElementById("expenseOtherBox").classList.toggle(
      "hidden",
      document.getElementById("expenseCategory").value !== "Otros"
    );
  });
  document.getElementById("expenseForm").addEventListener("submit", saveExpense);

  document.getElementById("addSpecialDateBtn").addEventListener("click", () => openSpecialModal());
  document.getElementById("closeSpecialDateModal").addEventListener("click", () => {
    document.getElementById("specialDateModal").classList.add("hidden");
  });
  document.getElementById("specialDateForm").addEventListener("submit", saveSpecialDate);
}
/* =========================
   SETTINGS / PUBLIC
========================= */

function applySettings() {
  const s = getSettings();

  document.getElementById("publicBusinessName").textContent =
    s.businessName || "Glamping Boutique";

  document.getElementById("publicBusinessSubtitle").textContent =
    s.subtitle || "";

  document.getElementById("footerBusinessName").textContent =
    s.businessName || "Glamping Boutique";

  document.getElementById("publicCheckinText").textContent =
    `Desde ${s.checkin}`;

  document.getElementById("publicCheckoutText").textContent =
    `Hasta ${s.checkout}`;

  document.getElementById("publicLogo").innerHTML = s.logoUrl
    ? `<img src="${escapeHTML(s.logoUrl)}" alt="Logo">`
    : `<i class="fa-solid fa-mountain-sun"></i>`;

  if (s.heroImage) {
    document.querySelector(".hero").style.background = `
      linear-gradient(180deg, rgba(31, 61, 43, 0.08), rgba(31, 61, 43, 0.74)),
      url("${s.heroImage}") center/cover
    `;
  }
}

/* =========================
   FLUJO CLIENTE
========================= */

function handleAvailabilitySearch(e) {
  e.preventDefault();

  selectedUnit = null;
  selectedServices = [];

  document.getElementById("reservationForm").reset();
  document.getElementById("companionsList").innerHTML = "";
  document.getElementById("specialPackageBox").classList.add("hidden");

  const checkIn = document.getElementById("checkIn").value;
  const checkOut = document.getElementById("checkOut").value;
  const adults = Number(document.getElementById("adults").value);
  const children = Number(document.getElementById("children").value);

  if (!checkIn || !checkOut) {
    showToast("Selecciona ingreso y salida.");
    return;
  }

  if (checkIn < todayISO()) {
    showToast("No se puede reservar fechas pasadas.");
    return;
  }

  if (checkOut <= checkIn) {
    showToast("La salida debe ser posterior al ingreso.");
    return;
  }

  selectedSearch = {
    checkIn,
    checkOut,
    adults,
    children,
    nights: dateDiffNights(checkIn, checkOut),
  };

  renderGlampings();
  document.querySelector(".glampings-section").scrollIntoView({ behavior: "smooth" });
}

function renderGlampings() {
  const list = document.getElementById("glampingsList");
  const msg = document.getElementById("availabilityMessage");

  const units = getUnits().filter((u) => u.status === "active");
  let availableCount = 0;

  list.innerHTML = units.map((unit) => {
    const exceedsCapacity =
      selectedSearch &&
      (selectedSearch.adults > unit.adults || selectedSearch.children > unit.children);

    const available = selectedSearch
      ? isUnitAvailable(unit.id, selectedSearch.checkIn, selectedSearch.checkOut) && !exceedsCapacity
      : true;

    if (available && selectedSearch) {
      availableCount++;
    }

    const statusText = !selectedSearch
      ? t("consult")
      : available
        ? t("available")
        : exceedsCapacity
          ? t("capacityNotAllowed")
          : t("unavailable");

    return `
      <article class="glamping-card">
        <div class="glamping-img">
          <img src="${escapeHTML(unit.image)}" alt="${escapeHTML(unit.name)}">
          <span class="glamping-status">${statusText}</span>
        </div>

        <div class="glamping-body">
          <h4>${escapeHTML(unit.name)}</h4>
          <p>${escapeHTML(getCurrentLanguage() === "en" ? (unit.descriptionEn || unit.descriptionEs || "") : (unit.descriptionEs || ""))}</p>

          <div class="features">
            ${(unit.features || []).map((f) => `<span>${escapeHTML(f)}</span>`).join("")}
          </div>

          <div class="glamping-footer">
            <div class="price">
              <span>${t("from")}</span>
              <strong>${money(unit.price)}</strong>
              <span>${t("perNight")}</span>
            </div>

            <button class="primary-btn small-btn" ${available ? "" : "disabled"} onclick="openReservationPanel('${unit.id}')">
              ${t("book")}
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  if (selectedSearch && availableCount === 0) {
    msg.textContent = t("noAvailability");
    msg.classList.remove("hidden");
  } else {
    msg.classList.add("hidden");
  }
}

function openReservationPanel(unitId) {
  if (!selectedSearch) {
    showToast("Primero selecciona las fechas.");
    return;
  }

  const unit = getUnits().find((u) => u.id === unitId);
  if (!unit) return;

  if (!isUnitAvailable(unitId, selectedSearch.checkIn, selectedSearch.checkOut)) {
    showToast("Este glamping no está disponible para esas fechas.");
    renderGlampings();
    return;
  }

  selectedUnit = unit;
  selectedServices = [];

  document.getElementById("reservationForm").reset();

  ensureAgeOptions("holderAge", 18, 100);

  document.getElementById("summaryImage").src = unit.image;
  document.getElementById("summaryGlampingName").textContent = unit.name;
  document.getElementById("summaryDates").textContent =
    `${selectedSearch.checkIn} → ${selectedSearch.checkOut} · ${selectedSearch.nights} noche(s)`;
  document.getElementById("summaryGuests").textContent =
    `${selectedSearch.adults} adulto(s) · ${selectedSearch.children} niño(s)`;
  document.getElementById("summaryPrice").textContent =
    `${money(unit.price)} / noche`;

  renderServicesForBooking();
  renderCompanionsRequired();
  renderSpecialPackage();
  toggleArrivalTime();
  toggleOtherFields();
  toggleInvoiceFields();
  updateReservationTotals();

  document.getElementById("reservationPanel").classList.remove("hidden");
}

function renderServicesForBooking() {
  const services = getServices().filter((s) => s.active);

  document.getElementById("foodServicesList").innerHTML =
    services.filter((s) => s.type === "food").map(renderServiceOption).join("");

  document.getElementById("experienceServicesList").innerHTML =
    services.filter((s) => s.type === "experience").map(renderServiceOption).join("");
}

function renderServiceOption(service) {
  return `
    <label class="service-option">
      <input type="checkbox" value="${service.id}" onchange="toggleBookingService('${service.id}', this.checked)">
      <span>
        <strong>${escapeHTML(getCurrentLanguage() === "en" ? (service.nameEn || service.nameEs) : service.nameEs)} · ${money(service.price)}</strong>
        <p>${escapeHTML(getCurrentLanguage() === "en" ? (service.descriptionEn || service.descriptionEs) : service.descriptionEs)}</p>
      </span>
    </label>
  `;
}

function toggleBookingService(id, checked) {
  if (checked) {
    if (!selectedServices.includes(id)) selectedServices.push(id);
  } else {
    selectedServices = selectedServices.filter((x) => x !== id);
  }

  updateReservationTotals();
}

function renderSpecialPackage() {
  const box = document.getElementById("specialPackageBox");

  const special = getSpecials().find((s) =>
    s.active &&
    s.date &&
    s.date >= selectedSearch.checkIn &&
    s.date < selectedSearch.checkOut
  );

  if (!special) {
    box.classList.add("hidden");
    return;
  }

  box.innerHTML = `
    <h4>${t("specialDetected")} ${escapeHTML(special.name)}</h4>
    <p>${escapeHTML(special.description)}</p>
    <p><strong>${t("suggestedPrice")}</strong> ${money(special.price)}</p>
  `;

  box.classList.remove("hidden");
}

function renderCompanionsRequired() {
  const list = document.getElementById("companionsList");

  const totalRequired =
    Math.max(0, selectedSearch.adults - 1) + selectedSearch.children;

  if (totalRequired === 0) {
    list.innerHTML =
      `<p class="helper-note">${t("holderSingle")}</p>`;
    return;
  }

  let html = "";
  let index = 1;

  for (let i = 0; i < selectedSearch.adults - 1; i++) {
    html += companionCard(index, "adulto", `${t("adultCompanion")} ${i + 1}`);
    index++;
  }

  for (let i = 0; i < selectedSearch.children; i++) {
    html += companionCard(index, "niño", `${t("childCompanion")} ${i + 1} · ${t("childMax")}`);
    index++;
  }

  list.innerHTML = html;
}

function companionCard(index, type, title) {
  const ageOptions = type === "niño"
    ? Array.from({ length: 9 }, (_, i) => `<option value="${i}">${i} ${t("years")}</option>`).join("")
    : Array.from({ length: 83 }, (_, i) => `<option value="${i + 18}">${i + 18} ${t("years")}</option>`).join("");

  const relationOptions = type === "niño"
    ? `<option>Hijo/a</option><option>Sobrino/a</option><option>Familiar</option><option>Otro</option>`
    : `<option>Pareja</option><option>Esposo/a</option><option>Familiar</option><option>Amigo/a</option><option>Padre/Madre</option><option>Otro</option>`;

  return `
    <div class="companion-card" data-companion-card>
      <h5>${title}</h5>

      <div class="form-grid">
        <div class="field">
          <label>${t("firstName")}</label>
          <input type="text" data-companion-field="firstName" required minlength="2" maxlength="30">
        </div>

        <div class="field">
          <label>${t("lastName")}</label>
          <input type="text" data-companion-field="lastName" required minlength="2" maxlength="30">
        </div>

        <div class="field">
          <label>${t("documentNumber")}</label>
          <input type="text" data-companion-field="document" required minlength="6" maxlength="15">
        </div>

        <div class="field">
          <label>${t("nationality")}</label>
          <select data-companion-field="nationality">
            <option>Ecuatoriana</option>
            <option>Colombiana</option>
            <option>Peruana</option>
            <option>Chilena</option>
            <option>Argentina</option>
            <option>Mexicana</option>
            <option>Estadounidense</option>
            <option>Española</option>
            <option>Otra</option>
          </select>
        </div>

        <div class="field">
          <label>${t("age")}</label>
          <select data-companion-field="age" required>${ageOptions}</select>
        </div>

        <div class="field">
          <label>${t("sexRegister")}</label>
          <select data-companion-field="gender">
            <option>Masculino</option>
            <option>Femenino</option>
            <option>No especifica</option>
          </select>
        </div>

        <div class="field">
          <label>Tipo</label>
          <input type="text" data-companion-field="type" value="${type}" readonly>
        </div>

        <div class="field">
          <label>Parentesco</label>
          <select data-companion-field="relation">${relationOptions}</select>
        </div>
      </div>
    </div>
  `;
}

function getCompanionsFromForm() {
  const cards = document.querySelectorAll("[data-companion-card]");
  const companions = [];

  for (const card of cards) {
    const data = {};

    card.querySelectorAll("[data-companion-field]").forEach((input) => {
      data[input.dataset.companionField] = input.value.trim();
    });

    if (!data.firstName || !data.lastName || !data.document || !data.age) {
      return null;
    }

    if (data.type === "niño" && Number(data.age) > 8) {
      showToast("Los niños deben tener máximo 8 años.");
      return null;
    }

    companions.push(data);
  }

  return companions;
}

function toggleArrivalTime() {
  const transport = document.getElementById("transportType").value;
  const field = document.getElementById("arrivalTimeField");
  const help = document.getElementById("transportHelp");

  if (transport === "propio" || transport === "otro") {
    field.classList.remove("hidden");
    help.textContent = t("transportOwnHelp");
  } else {
    field.classList.add("hidden");
    document.getElementById("arrivalTime").value = "";
    help.textContent = t("transportGlampingHelp");
  }
}

function toggleOtherFields() {
  document.getElementById("foodAllergyOtherBox").classList.toggle(
    "hidden",
    document.getElementById("foodAllergySelect").value !== "Otra"
  );

  document.getElementById("medicalOtherBox").classList.toggle(
    "hidden",
    document.getElementById("medicalSelect").value !== "Otra"
  );
}

function toggleInvoiceFields() {
  const show = document.getElementById("invoiceType").value === "datos";
  document.querySelectorAll(".invoice-field").forEach((el) => {
    el.classList.toggle("hidden", !show);
  });
}

function calculateTotals() {
  const s = getSettings();

  const lodgingTotal = selectedUnit.price * selectedSearch.nights;

  const servicesTotal = selectedServices.reduce((sum, id) => {
    const service = getServices().find((x) => x.id === id);
    return sum + (service ? Number(service.price) : 0);
  }, 0);

  const total = lodgingTotal + servicesTotal;
  const deposit = total * (Number(s.depositPercent) / 100);

  return {
    lodgingTotal,
    servicesTotal,
    total,
    deposit,
    pending: total - deposit,
  };
}

function updateReservationTotals() {
  if (!selectedUnit || !selectedSearch) return;

  const s = getSettings();
  const t = calculateTotals();

  document.getElementById("nightPrice").textContent = money(selectedUnit.price);
  document.getElementById("nightsCount").textContent = selectedSearch.nights;
  document.getElementById("lodgingTotal").textContent = money(t.lodgingTotal);
  document.getElementById("servicesTotal").textContent = money(t.servicesTotal);
  document.getElementById("totalReservation").textContent = money(t.total);
  document.getElementById("requiredDeposit").textContent = money(t.deposit);
  document.getElementById("pendingBalance").textContent = money(t.pending);
  document.getElementById("depositLabel").textContent = `${t("depositRequired")} (${s.depositPercent}%)`;
}

function handleReservationSubmit(e) {
  e.preventDefault();

  if (!selectedUnit || !selectedSearch) {
    showToast("Falta seleccionar glamping y fechas.");
    return;
  }

  if (!validatePhone("countryCode", "phoneNumber")) return;

  const companions = getCompanionsFromForm();

  if (companions === null) {
    showToast("Completa correctamente los datos de acompañantes.");
    return;
  }

  if (!isUnitAvailable(selectedUnit.id, selectedSearch.checkIn, selectedSearch.checkOut)) {
    showToast("La fecha ya no está disponible.");
    document.getElementById("reservationPanel").classList.add("hidden");
    renderGlampings();
    return;
  }

  const s = getSettings();
  const totals = calculateTotals();
  const now = new Date();

  const fullName = [
    document.getElementById("firstName").value.trim(),
    document.getElementById("middleName").value.trim(),
    document.getElementById("lastName").value.trim(),
    document.getElementById("secondLastName").value.trim(),
  ].filter(Boolean).join(" ");

  const serviceObjects = selectedServices.map((id) => {
    const service = getServices().find((x) => x.id === id);
    return {
      id: service.id,
      type: service.type,
      name: service.nameEs,
      price: Number(service.price),
      qty: 1,
      total: Number(service.price),
      status: "pending",
    };
  });

  const booking = {
    code: generateBookingCode(),
    createdAt: now.toISOString(),
    status: "pending",

    unitId: selectedUnit.id,
    unitName: selectedUnit.name,

    checkIn: selectedSearch.checkIn,
    checkOut: selectedSearch.checkOut,
    nights: selectedSearch.nights,

    adults: selectedSearch.adults,
    children: selectedSearch.children,

    fullName,

    holder: {
      firstName: document.getElementById("firstName").value.trim(),
      middleName: document.getElementById("middleName").value.trim(),
      lastName: document.getElementById("lastName").value.trim(),
      secondLastName: document.getElementById("secondLastName").value.trim(),
      documentType: document.getElementById("documentType").value,
      documentId: document.getElementById("documentId").value.trim(),
      nationality: document.getElementById("nationality").value,
      age: document.getElementById("holderAge").value,
      gender: document.getElementById("holderGender").value,
    },

    country: document.getElementById("country").value,
    whatsappCode: document.getElementById("countryCode").value,
    phoneNumber: document.getElementById("phoneNumber").value.trim(),
    whatsappFull: `${document.getElementById("countryCode").value} ${document.getElementById("phoneNumber").value.trim()}`,

    email: document.getElementById("email").value.trim(),
    city: document.getElementById("city").value.trim(),

    transportType: document.getElementById("transportType").value,
    arrivalTime: document.getElementById("arrivalTime").value,

    companions,
    services: serviceObjects,
    consumptions: [],

    foodAllergy:
      document.getElementById("foodAllergySelect").value === "Otra"
        ? document.getElementById("foodAllergyOther").value.trim()
        : document.getElementById("foodAllergySelect").value,

    medicalCondition:
      document.getElementById("medicalSelect").value === "Otra"
        ? document.getElementById("medicalOther").value.trim()
        : document.getElementById("medicalSelect").value,

    notes: document.getElementById("notes").value.trim(),
    invoice: getInvoiceData(),

    lodgingTotal: totals.lodgingTotal,
    servicesTotal: totals.servicesTotal,
    consumptionTotal: 0,
    damageValue: 0,
    discount: 0,
    refundValue: 0,
    retainedValue: 0,
    total: totals.total,

    depositPercent: s.depositPercent,
    depositRequired: totals.deposit,
    paidValue: 0,
    pendingBalance: totals.pending,

    paymentDeadline: addHours(now, s.deadlineHours).toISOString(),

    housekeepingStatus: "reserved",
    housekeepingNotes: "",
    housekeepingReports: [],

    invoiceStatus: "sin_factura",
    adminNotes: "",
  };

  const bookings = getBookings();
  bookings.push(booking);
  setData(STORAGE_KEYS.bookings, bookings);

  document.getElementById("reservationPanel").classList.add("hidden");

  renderGlampings();
  renderAdminAll();

  showToast(`Reserva generada: ${booking.code}`);
  openWhatsappForBooking(booking);
}

function getInvoiceData() {
  if (document.getElementById("invoiceType").value === "consumidor_final") {
    return { type: "consumidor_final" };
  }

  return {
    type: "datos",
    name: document.getElementById("invoiceName").value.trim(),
    document: document.getElementById("invoiceDocument").value.trim(),
    address: document.getElementById("invoiceAddress").value.trim(),
    email: document.getElementById("invoiceEmail").value.trim(),
  };
}

function openWhatsappForBooking(b) {
  const s = getSettings();

  const businessNumber = `${s.whatsappCode}${s.whatsappNumber}`
    .replace(/[^\d+]/g, "")
    .replace("+", "");

  const servicesText = b.services.length
    ? b.services.map((x) => `${x.name} (${money(x.total)})`).join(", ")
    : t("noFood");

  const message = `
Hola, deseo confirmar mi reserva ${b.code}.

Titular: ${b.fullName}
Documento: ${b.holder.documentType} ${b.holder.documentId}
WhatsApp: ${b.whatsappFull}
Correo: ${b.email}

Glamping: ${b.unitName}
Fechas: ${b.checkIn} al ${b.checkOut}
Noches: ${b.nights}
Adultos: ${b.adults}
Niños: ${b.children}

Servicios: ${servicesText}
Total: ${money(b.total)}
Abono requerido (${b.depositPercent}%): ${money(b.depositRequired)}
Saldo al check-in: ${money(b.pendingBalance)}

Alergias: ${b.foodAllergy}
Condición médica: ${b.medicalCondition}

Quedo atento para coordinar el pago.
`.trim();

  window.open(`https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`, "_blank");
}
/* =========================
   LOGIN / ROLES
========================= */

function openLogin() {
  document.getElementById("loginPanel").classList.remove("hidden");
}

function handleLogin(e) {
  e.preventDefault();

  const s = getSettings();
  const user = document.getElementById("loginUser").value.trim();
  const pass = document.getElementById("loginPass").value.trim();

  if (user === s.adminUser && pass === s.adminPass) {
    currentRole = "admin";
    setData(STORAGE_KEYS.session, { role: "admin" });
    document.getElementById("loginPanel").classList.add("hidden");
    openInternalPanel("admin");
    return;
  }

  if (user === s.houseUser && pass === s.housePass) {
    currentRole = "housekeeping";
    setData(STORAGE_KEYS.session, { role: "housekeeping" });
    document.getElementById("loginPanel").classList.add("hidden");
    openInternalPanel("housekeeping");
    return;
  }

  showToast(t("wrongLogin"));
}

function openInternalPanel(role) {
  document.getElementById("publicApp").classList.add("hidden");
  document.getElementById("adminPanel").classList.remove("hidden");

  document.getElementById("panelRoleTitle").textContent =
    role === "housekeeping" ? "Housekeeping" : "Admin";

  document.querySelectorAll(".admin-nav").forEach((btn) => {
    const section = btn.dataset.section;

    if (role === "housekeeping") {
      btn.style.display =
        section === "housekeeping" || section === "calendar" ? "flex" : "none";
    } else {
      btn.style.display = "flex";
    }
  });

  switchAdminSection(role === "housekeeping" ? "housekeeping" : "dashboard");
  renderAdminAll();
}

function logout() {
  localStorage.removeItem(STORAGE_KEYS.session);
  currentRole = null;

  document.getElementById("adminPanel").classList.add("hidden");
  document.getElementById("publicApp").classList.remove("hidden");

  showToast(t("sessionClosed"));
}

function backToPublic() {
  document.getElementById("adminPanel").classList.add("hidden");
  document.getElementById("publicApp").classList.remove("hidden");
}

function switchAdminSection(section) {
  document.querySelectorAll(".admin-nav").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.section === section);
  });

  document.querySelectorAll(".admin-section").forEach((sec) => {
    sec.classList.remove("active");
  });

  document.getElementById(`admin-${section}`).classList.add("active");

  const titles = {
    dashboard: t("dashboard"),
    calendar: t("calendarFrontDesk"),
    manual: t("manualBooking"),
    bookings: t("bookings"),
    housekeeping: t("housekeeping"),
    units: t("units"),
    services: t("servicesAdmin"),
    finance: t("finance"),
    alerts: t("specialDates"),
    settings: t("settings"),
  };

  document.getElementById("adminSectionTitle").textContent = titles[section] || "Admin";
}

/* =========================
   ADMIN GENERAL
========================= */

function renderAdminAll() {
  renderDashboard();
  renderCalendar();
  renderManualSelects();
  renderManualCompanionsRequired();
  renderManualSpecials();
  renderAdminBookings();
  renderHousekeeping();
  renderAdminUnits();
  renderAdminServices();
  renderFinance();
  renderSpecialDates();
  renderSettingsForm();
}

function renderDashboard() {
  const bookings = getBookings();
  const expenses = getExpenses();

  const activeIncome = bookings.filter((b) =>
    [
      "confirmed",
      "checked_in",
      "cleaning_pending",
      "completed",
      "cancelled_penalty",
      "refund_pending",
      "refund_done",
    ].includes(b.status)
  );

  const pending = bookings.filter((b) => b.status === "pending").length;

  const confirmed = bookings.filter((b) =>
    ["confirmed", "checked_in", "cleaning_pending"].includes(b.status)
  ).length;

  const nights = activeIncome.reduce((sum, b) => sum + Number(b.nights || 0), 0);

  const income = activeIncome.reduce(
    (sum, b) => sum + Number(b.paidValue || 0) + Number(b.retainedValue || 0),
    0
  );

  const refunds = bookings.reduce((sum, b) => sum + Number(b.refundValue || 0), 0);
  const expenseTotal = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  document.getElementById("statPending").textContent = pending;
  document.getElementById("statConfirmed").textContent = confirmed;
  document.getElementById("statNights").textContent = nights;
  document.getElementById("statNet").textContent = money(income - refunds - expenseTotal);

  const recent = [...bookings].reverse().slice(0, 7);

  document.getElementById("recentBookings").innerHTML = recent.length
    ? recent.map(renderBookingAdminItem).join("")
    : `<p class="helper-note">${t("noBookingsYet")}</p>`;
}

/* =========================
   CALENDARIO
========================= */

function renderCalendar() {
  const grid = document.getElementById("calendarGrid");
  if (!grid) return;

  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  document.getElementById("calendarMonthTitle").textContent =
    calendarDate.toLocaleDateString(getCurrentLanguage() === "en" ? "en-US" : "es-EC", {
      month: "long",
      year: "numeric",
    }).toUpperCase();

  const units = getUnits().filter((u) => u.status === "active");
  const bookings = getBookings();

  let html = `<div class="calendar-cell header">Glamping</div>`;

  for (let d = 1; d <= 31; d++) {
    html += `<div class="calendar-cell day-head">${d <= daysInMonth ? d : ""}</div>`;
  }

  units.forEach((unit) => {
    html += `<div class="calendar-cell header">${escapeHTML(unit.name)}</div>`;

    for (let d = 1; d <= 31; d++) {
      if (d > daysInMonth) {
        html += `<div class="calendar-cell"></div>`;
        continue;
      }

      const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

      const booking = bookings.find(
        (b) =>
          b.unitId === unit.id &&
          rangesOverlap(date, nextDayISO(date), b.checkIn, b.checkOut)
      );

      if (booking) {
        html += `
          <div class="calendar-cell ${booking.status}" title="${escapeHTML(booking.fullName)}">
            ${calendarShortText(booking)}
          </div>
        `;
      } else {
        html += `
          <div class="calendar-cell available" onclick="startManualFromCalendar('${unit.id}', '${date}')">
            ${t("free")}
          </div>
        `;
      }
    }
  });

  grid.innerHTML = html;
}

function calendarShortText(booking) {
  const statusMap = {
    pending: t("statusShortPending"),
    confirmed: t("statusShortConfirmed"),
    checked_in: t("statusShortStay"),
    cleaning_pending: t("statusShortCleaning"),
    completed: t("statusShortCompleted"),
    expired: t("statusShortExpired"),
    cancelled_penalty: t("statusShortCancelled"),
    refund_pending: t("statusShortRefund"),
    refund_done: t("statusShortRefundOk"),
    no_show: t("statusShortNoShow"),
  };

  return `
    <strong>${statusMap[booking.status] || booking.status}</strong><br>
    ${escapeHTML(booking.code)}
  `;
}

function startManualFromCalendar(unitId, date) {
  if (currentRole === "housekeeping") return;

  switchAdminSection("manual");

  document.getElementById("manualUnit").value = unitId;
  document.getElementById("manualCheckIn").value = date;
  document.getElementById("manualCheckOut").min = nextDayISO(date);
  document.getElementById("manualCheckOut").value = nextDayISO(date);

  renderManualSpecials();

  showToast(t("dateLoadedManual"));
}

/* =========================
   RESERVA MANUAL
========================= */

function renderManualSelects() {
  const select = document.getElementById("manualUnit");
  if (!select) return;

  select.innerHTML = getUnits()
    .filter((u) => u.status === "active")
    .map((u) => `<option value="${u.id}">${escapeHTML(u.name)} · ${money(u.price)}</option>`)
    .join("");

  const services = getServices().filter((s) => s.active);

  document.getElementById("manualServicesList").innerHTML = services.map((s) => `
    <label class="service-option">
      <input type="checkbox" value="${s.id}" data-manual-service>
      <span>
        <strong>${escapeHTML(getCurrentLanguage() === "en" ? (s.nameEn || s.nameEs) : s.nameEs)} · ${money(s.price)}</strong>
        <p>${escapeHTML(getCurrentLanguage() === "en" ? (s.descriptionEn || s.descriptionEs) : s.descriptionEs)}</p>
      </span>
    </label>
  `).join("");

  ensureAgeOptions("manualAge", 18, 100);
}

function renderManualSpecials() {
  const box = document.getElementById("manualSpecialsList");
  if (!box) return;

  const checkIn = document.getElementById("manualCheckIn").value;
  const checkOut = document.getElementById("manualCheckOut").value;

  const specials = getSpecials().filter((s) => {
    if (!s.active || !s.date) return false;
    if (!checkIn || !checkOut) return true;
    return s.date >= checkIn && s.date < checkOut;
  });

  box.innerHTML = specials.length
    ? specials.map((s) => `
      <label class="service-option">
        <input type="checkbox" value="${s.id}" data-manual-special>
        <span>
          <strong>${escapeHTML(getCurrentLanguage() === "en" ? (s.nameEn || s.name) : s.name)} · ${money(s.price || 0)}</strong>
          <p>${escapeHTML(getCurrentLanguage() === "en" ? (s.descriptionEn || s.description) : (s.description || ""))}</p>
        </span>
      </label>
    `).join("")
    : `<p class="helper-note">${t("noSpecialDatesSelected")}</p>`;
}

function renderManualCompanionsRequired() {
  const list = document.getElementById("manualCompanionsList");
  if (!list) return;

  const adults = Number(document.getElementById("manualAdults").value || 1);
  const children = Number(document.getElementById("manualChildren").value || 0);

  const totalRequired = Math.max(0, adults - 1) + children;

  if (totalRequired === 0) {
    list.innerHTML = `<p class="helper-note">${t("manualOneAdult")}</p>`;
    return;
  }

  let html = "";
  let index = 1;

  for (let i = 0; i < adults - 1; i++) {
    html += manualCompanionCard(index, "adulto", `${t("adultCompanion")} ${i + 1}`);
    index++;
  }

  for (let i = 0; i < children; i++) {
    html += manualCompanionCard(index, "niño", `${t("childCompanion")} ${i + 1} · ${t("childMax")}`);
    index++;
  }

  list.innerHTML = html;
}

function manualCompanionCard(index, type, title) {
  const ageOptions = type === "niño"
    ? Array.from({ length: 9 }, (_, i) => `<option value="${i}">${i} ${t("years")}</option>`).join("")
    : Array.from({ length: 83 }, (_, i) => `<option value="${i + 18}">${i + 18} ${t("years")}</option>`).join("");

  const relationOptions = type === "niño"
    ? `<option>Hijo/a</option><option>Sobrino/a</option><option>Familiar</option><option>Otro</option>`
    : `<option>Pareja</option><option>Esposo/a</option><option>Familiar</option><option>Amigo/a</option><option>Padre/Madre</option><option>Otro</option>`;

  return `
    <div class="companion-card" data-manual-companion-card>
      <h5>${title}</h5>

      <div class="form-grid">
        <div class="field">
          <label>${t("firstName")}</label>
          <input type="text" data-manual-companion-field="firstName" required minlength="2" maxlength="30">
        </div>

        <div class="field">
          <label>${t("lastName")}</label>
          <input type="text" data-manual-companion-field="lastName" required minlength="2" maxlength="30">
        </div>

        <div class="field">
          <label>${t("documentNumber")}</label>
          <input type="text" data-manual-companion-field="document" required minlength="6" maxlength="15">
        </div>

        <div class="field">
          <label>${t("nationality")}</label>
          <select data-manual-companion-field="nationality">
            <option>Ecuatoriana</option>
            <option>Colombiana</option>
            <option>Peruana</option>
            <option>Chilena</option>
            <option>Argentina</option>
            <option>Mexicana</option>
            <option>Estadounidense</option>
            <option>Española</option>
            <option>Otra</option>
          </select>
        </div>

        <div class="field">
          <label>${t("age")}</label>
          <select data-manual-companion-field="age" required>${ageOptions}</select>
        </div>

        <div class="field">
          <label>${t("sexRegister")}</label>
          <select data-manual-companion-field="gender">
            <option>Masculino</option>
            <option>Femenino</option>
            <option>No especifica</option>
          </select>
        </div>

        <div class="field">
          <label>Tipo</label>
          <input type="text" data-manual-companion-field="type" value="${type}" readonly>
        </div>

        <div class="field">
          <label>Parentesco</label>
          <select data-manual-companion-field="relation">${relationOptions}</select>
        </div>
      </div>
    </div>
  `;
}

function getManualCompanionsFromForm() {
  const cards = document.querySelectorAll("[data-manual-companion-card]");
  const companions = [];

  for (const card of cards) {
    const data = {};

    card.querySelectorAll("[data-manual-companion-field]").forEach((input) => {
      data[input.dataset.manualCompanionField] = input.value.trim();
    });

    if (!data.firstName || !data.lastName || !data.document || !data.age) {
      return null;
    }

    if (data.type === "niño" && Number(data.age) > 8) {
      showToast("Los niños deben tener máximo 8 años.");
      return null;
    }

    companions.push(data);
  }

  return companions;
}

function saveManualBooking(e) {
  e.preventDefault();

  if (!validatePhone("manualWhatsappCode", "manualPhone")) return;

  const manualCompanions = getManualCompanionsFromForm();

  if (manualCompanions === null) {
    showToast("Completa correctamente los datos de acompañantes de la reserva manual.");
    return;
  }

  const unit = getUnits().find(
    (u) => u.id === document.getElementById("manualUnit").value
  );

  const checkIn = document.getElementById("manualCheckIn").value;
  const checkOut = document.getElementById("manualCheckOut").value;

  if (!unit || !checkIn || !checkOut) {
    showToast("Completa glamping y fechas.");
    return;
  }

  if (checkOut <= checkIn) {
    showToast("La salida debe ser posterior al ingreso.");
    return;
  }

  if (!isUnitAvailable(unit.id, checkIn, checkOut)) {
    showToast("Ese glamping no está disponible en esas fechas.");
    return;
  }

  const nights = dateDiffNights(checkIn, checkOut);

  const selectedManualServices = [
    ...document.querySelectorAll("[data-manual-service]:checked")
  ].map((input) => {
    const s = getServices().find((x) => x.id === input.value);
    return {
      id: s.id,
      type: s.type,
      name: s.nameEs,
      price: Number(s.price),
      qty: 1,
      total: Number(s.price),
      status: "pending",
    };
  });

  const selectedManualSpecials = [
    ...document.querySelectorAll("[data-manual-special]:checked")
  ].map((input) => {
    const s = getSpecials().find((x) => x.id === input.value);
    return {
      id: s.id,
      type: "special",
      name: s.name,
      price: Number(s.price || 0),
      qty: 1,
      total: Number(s.price || 0),
      status: "pending",
    };
  });

  const allServices = [...selectedManualServices, ...selectedManualSpecials];

  const lodgingTotal = unit.price * nights;
  const servicesTotal = allServices.reduce((sum, s) => sum + Number(s.total), 0);
  const discount = Number(document.getElementById("manualDiscount").value || 0);
  const total = Math.max(0, lodgingTotal + servicesTotal - discount);
  const paid = Number(document.getElementById("manualPaid").value || 0);

  const booking = {
    code: generateBookingCode(),
    createdAt: new Date().toISOString(),
    status: document.getElementById("manualStatus").value,

    unitId: unit.id,
    unitName: unit.name,

    checkIn,
    checkOut,
    nights,

    adults: Number(document.getElementById("manualAdults").value),
    children: Number(document.getElementById("manualChildren").value),

    fullName: `${document.getElementById("manualFirstName").value.trim()} ${document.getElementById("manualLastName").value.trim()}`,

    holder: {
      firstName: document.getElementById("manualFirstName").value.trim(),
      lastName: document.getElementById("manualLastName").value.trim(),
      documentId: document.getElementById("manualDocument").value.trim(),
      age: document.getElementById("manualAge").value,
      gender: document.getElementById("manualGender").value,
    },

    whatsappCode: document.getElementById("manualWhatsappCode").value,
    phoneNumber: document.getElementById("manualPhone").value.trim(),
    whatsappFull: `${document.getElementById("manualWhatsappCode").value} ${document.getElementById("manualPhone").value.trim()}`,

    services: allServices,
    consumptions: [],
    companions: manualCompanions,

    lodgingTotal,
    servicesTotal,
    consumptionTotal: 0,
    damageValue: 0,
    discount,
    refundValue: 0,
    retainedValue: 0,
    total,

    depositPercent: getSettings().depositPercent,
    depositRequired: total * (getSettings().depositPercent / 100),
    paidValue: paid,
    pendingBalance: total - paid,

    paymentDeadline: addHours(new Date(), getSettings().deadlineHours).toISOString(),

    housekeepingStatus:
      document.getElementById("manualStatus").value === "confirmed"
        ? "reserved"
        : "pending",

    housekeepingReports: [],
    invoice: { type: "consumidor_final" },
    invoiceStatus: "sin_factura",
    adminNotes: document.getElementById("manualNotes").value.trim(),
  };

  const bookings = getBookings();
  bookings.push(booking);
  setData(STORAGE_KEYS.bookings, bookings);

  e.target.reset();
  renderAdminAll();
  renderGlampings();

  showToast("Reserva manual creada.");
}
/* =========================
   RESERVAS ADMIN
========================= */

function renderAdminBookings() {
  const list = document.getElementById("adminBookingsList");
  if (!list) return;

  const search = document.getElementById("bookingSearch")?.value.toLowerCase() || "";
  const status = document.getElementById("bookingStatusFilter")?.value || "all";

  let bookings = getBookings();

  if (status !== "all") {
    bookings = bookings.filter((b) => b.status === status);
  }

  if (search) {
    bookings = bookings.filter((b) =>
      String(b.code).toLowerCase().includes(search) ||
      String(b.fullName).toLowerCase().includes(search) ||
      String(b.phoneNumber).toLowerCase().includes(search)
    );
  }

  list.innerHTML = bookings.length
    ? [...bookings].reverse().map(renderBookingAdminItem).join("")
    : `<p class="helper-note">${t("noBookingsFilter")}</p>`;
}

function renderBookingAdminItem(b) {
  return `
    <div class="admin-item">
      <div>
        <h4>${escapeHTML(b.code)} · ${escapeHTML(b.fullName)}</h4>
        <p>${escapeHTML(b.unitName)} · ${b.checkIn} ${t("to")} ${b.checkOut} · ${b.nights} ${t("nightsText")}</p>
        <p>
          ${t("total")}: <strong>${money(b.total)}</strong> ·
          ${t("paid")}: <strong>${money(b.paidValue)}</strong> ·
          ${t("balance")}: <strong>${money(b.pendingBalance)}</strong> ·
          ${t("refund")}: <strong>${money(b.refundValue || 0)}</strong>
        </p>
        <p>
          ${t("status")}:
          <span class="status-badge status-${escapeHTML(b.status)}">
            ${translateStatus(b.status)}
          </span>
          · Housekeeping: ${escapeHTML(b.housekeepingStatus || "—")}
        </p>
      </div>

      <div class="item-actions">
        ${b.status === "pending"
          ? `<button class="action-btn confirm" onclick="confirmBooking('${b.code}')">${t("confirmPayment")}</button>`
          : ""}

        ${b.status === "confirmed"
          ? `<button class="action-btn blue" onclick="markCheckin('${b.code}')">Check-in</button>`
          : ""}

        ${b.status === "checked_in"
          ? `
            <button class="action-btn orange" onclick="openConsumptionModal('${b.code}')">${t("addConsumption")}</button>
            <button class="action-btn confirm" onclick="openCheckoutModal('${b.code}')">Check-out</button>
          `
          : ""}

        ${["pending", "confirmed", "checked_in"].includes(b.status)
          ? `<button class="action-btn danger" onclick="openCancelModal('${b.code}')">${t("cancel")}</button>`
          : ""}

        <button class="action-btn" onclick="openConsumptionModal('${b.code}')">${t("consumptions")}</button>
        <button class="action-btn" onclick="openHousekeepingModal('${b.code}')">Housekeeping</button>
        <button class="action-btn" onclick="printTicket('${b.code}')">Ticket</button>
        <button class="action-btn" onclick="copyBookingSummary('${b.code}')">${t("copy")}</button>
      </div>
    </div>
  `;
}

function translateStatus(status) {
  const mapEs = {
    pending: "Pendiente",
    confirmed: "Confirmada",
    checked_in: "En estadía",
    cleaning_pending: "Limpieza pendiente",
    completed: "Completada",
    cancelled_penalty: "Cancelada con penalidad",
    refund_pending: "Devolución pendiente",
    refund_done: "Devolución realizada",
    no_show: "No show",
    expired: "Expirada",
  };

  const mapEn = {
    pending: "Pending",
    confirmed: "Confirmed",
    checked_in: "In stay",
    cleaning_pending: "Cleaning pending",
    completed: "Completed",
    cancelled_penalty: "Cancelled with penalty",
    refund_pending: "Refund pending",
    refund_done: "Refund completed",
    no_show: "No show",
    expired: "Expired",
  };

  return getCurrentLanguage() === "en"
    ? (mapEn[status] || status)
    : (mapEs[status] || status);
}

function confirmBooking(code) {
  const bookings = getBookings().map((b) => {
    if (b.code !== code) return b;

    const paid = Math.max(Number(b.paidValue || 0), Number(b.depositRequired || 0));

    return {
      ...b,
      status: "confirmed",
      paidValue: paid,
      pendingBalance: Number(b.total || 0) - paid,
      confirmedAt: new Date().toISOString(),
      housekeepingStatus: "reserved",
    };
  });

  setData(STORAGE_KEYS.bookings, bookings);
  renderAdminAll();
  renderGlampings();

  showToast(t("bookingConfirmed"));
}

function markCheckin(code) {
  const bookings = getBookings().map((b) => {
    if (b.code !== code) return b;

    return {
      ...b,
      status: "checked_in",
      checkinAt: new Date().toISOString(),
      housekeepingStatus: "occupied",
    };
  });

  setData(STORAGE_KEYS.bookings, bookings);
  renderAdminAll();

  showToast(t("checkinSaved"));
}

function copyBookingSummary(code) {
  const b = getBookings().find((x) => x.code === code);
  if (!b) return;

  navigator.clipboard.writeText(`
Reserva: ${b.code}
Cliente: ${b.fullName}
Glamping: ${b.unitName}
Fechas: ${b.checkIn} al ${b.checkOut}
Noches: ${b.nights}
Total: ${money(b.total)}
Pagado: ${money(b.paidValue)}
Saldo: ${money(b.pendingBalance)}
Estado: ${translateStatus(b.status)}
Housekeeping: ${b.housekeepingStatus || "—"}
  `.trim());

  showToast(t("summaryCopied"));
}

/* =========================
   CANCELACIONES
========================= */

function openCancelModal(code) {
  const b = getBookings().find((x) => x.code === code);
  if (!b) return;

  const paid = Number(b.paidValue || 0);
  const retained = paid > 0 ? paid * 0.5 : 0;
  const refund = Math.max(0, paid - retained);

  document.getElementById("cancelCode").value = code;
  document.getElementById("cancelTotal").value = money(b.total);
  document.getElementById("cancelPaid").value = money(paid);
  document.getElementById("cancelRetained").value = money(retained);
  document.getElementById("cancelRefund").value = money(refund);
  document.getElementById("refundStatus").value =
    refund > 0 ? "refund_pending" : "cancelled_penalty";
  document.getElementById("cancelReason").value = "";

  document.getElementById("cancelModal").classList.remove("hidden");
}

function saveCancellation(e) {
  e.preventDefault();

  const code = document.getElementById("cancelCode").value;
  const status = document.getElementById("refundStatus").value;

  const bookings = getBookings().map((b) => {
    if (b.code !== code) return b;

    const paid = Number(b.paidValue || 0);
    const retained = paid > 0 ? paid * 0.5 : 0;
    const refund = Math.max(0, paid - retained);

    return {
      ...b,
      status,
      retainedValue: retained,
      refundValue: status === "cancelled_penalty" ? 0 : refund,
      pendingBalance: 0,
      cancellationReason: document.getElementById("cancelReason").value.trim(),
      cancelledAt: new Date().toISOString(),
      housekeepingStatus: "cancelled",
    };
  });

  setData(STORAGE_KEYS.bookings, bookings);

  document.getElementById("cancelModal").classList.add("hidden");

  renderAdminAll();
  renderGlampings();

  showToast(t("cancellationSaved"));
}

/* =========================
   CONSUMOS
========================= */

function openConsumptionModal(code) {
  document.getElementById("consumptionForm").reset();
  document.getElementById("consumptionCode").value = code;

  const select = document.getElementById("consumptionService");

  select.innerHTML = getServices()
    .filter((s) => s.active)
    .map((s) => {
      const name = getCurrentLanguage() === "en" ? (s.nameEn || s.nameEs) : s.nameEs;
      return `<option value="${s.id}">${escapeHTML(name)} · ${money(s.price)}</option>`;
    })
    .join("");

  syncConsumptionPrice();

  document.getElementById("consumptionModal").classList.remove("hidden");
}

function syncConsumptionPrice() {
  const id = document.getElementById("consumptionService").value;
  const service = getServices().find((x) => x.id === id);

  document.getElementById("consumptionPrice").value = service ? service.price : 0;
}

function saveConsumption(e) {
  e.preventDefault();

  const code = document.getElementById("consumptionCode").value;
  const service = getServices().find(
    (s) => s.id === document.getElementById("consumptionService").value
  );

  const qty = Number(document.getElementById("consumptionQty").value);
  const price = Number(document.getElementById("consumptionPrice").value);
  const total = qty * price;

  const bookings = getBookings().map((b) => {
    if (b.code !== code) return b;

    const consumption = {
      id: `C${Date.now()}`,
      date: new Date().toISOString(),
      name: service.nameEs,
      qty,
      price,
      total,
      paymentStatus: document.getElementById("consumptionPaid").value,
      note: document.getElementById("consumptionNote").value.trim(),
    };

    const consumptions = [...(b.consumptions || []), consumption];

    const consumptionTotal = consumptions.reduce(
      (sum, c) => sum + Number(c.total || 0),
      0
    );

    const newTotal =
      Number(b.lodgingTotal || 0) +
      Number(b.servicesTotal || 0) +
      consumptionTotal +
      Number(b.damageValue || 0) -
      Number(b.discount || 0);

    return {
      ...b,
      consumptions,
      consumptionTotal,
      total: newTotal,
      pendingBalance: newTotal - Number(b.paidValue || 0),
    };
  });

  setData(STORAGE_KEYS.bookings, bookings);

  document.getElementById("consumptionModal").classList.add("hidden");

  renderAdminAll();

  showToast(t("consumptionAdded"));
}

/* =========================
   CHECKOUT
========================= */

function openCheckoutModal(code) {
  const b = getBookings().find((x) => x.code === code);
  if (!b) return;

  document.getElementById("checkoutForm").reset();
  document.getElementById("checkoutCode").value = code;
  document.getElementById("damageValue").value = getSettings().damageFee || 150;
  document.getElementById("damageValueBox").classList.add("hidden");
  document.getElementById("invoiceStatus").value = b.invoiceStatus || "sin_factura";

  document.getElementById("checkoutModal").classList.remove("hidden");
}

function saveCheckout(e) {
  e.preventDefault();

  const code = document.getElementById("checkoutCode").value;
  const hasDamage = document.getElementById("checkoutDamage").value === "Sí";
  const damageValue = hasDamage
    ? Number(document.getElementById("damageValue").value || 0)
    : 0;

  const bookings = getBookings().map((b) => {
    if (b.code !== code) return b;

    const newTotal =
      Number(b.lodgingTotal || 0) +
      Number(b.servicesTotal || 0) +
      Number(b.consumptionTotal || 0) +
      damageValue -
      Number(b.discount || 0);

    return {
      ...b,
      status: "cleaning_pending",
      checkoutAt: new Date().toISOString(),
      checkoutGuestLeft: document.getElementById("checkoutGuestLeft").value,
      damageReported: hasDamage,
      damageValue,
      total: newTotal,
      pendingBalance: newTotal - Number(b.paidValue || 0),
      checkoutPaymentMethod: document.getElementById("checkoutPaymentMethod").value,
      invoiceStatus: document.getElementById("invoiceStatus").value,
      checkoutNotes: document.getElementById("checkoutNotes").value.trim(),
      housekeepingStatus: "clean_pending",
    };
  });

  setData(STORAGE_KEYS.bookings, bookings);

  document.getElementById("checkoutModal").classList.add("hidden");

  renderAdminAll();
  printTicket(code);

  showToast(t("checkoutSaved"));
}

/* =========================
   HOUSEKEEPING
========================= */

function renderHousekeeping() {
  const list = document.getElementById("housekeepingList");
  if (!list) return;

  const relevant = getBookings().filter((b) =>
    ["confirmed", "checked_in", "cleaning_pending", "completed"].includes(b.status)
  );

  list.innerHTML = relevant.length
    ? relevant.map((b) => {
      const reports = b.housekeepingReports || [];
      const lastReport = reports.length ? reports[reports.length - 1] : null;

      return `
        <div class="admin-item">
          <div>
            <h4>${escapeHTML(b.unitName)} · ${escapeHTML(b.code)}</h4>
            <p>${t("guest")}: ${escapeHTML(b.fullName)} · ${b.checkIn} ${t("to")} ${b.checkOut}</p>
            <p>${t("cleaningStatus")}: <strong>${escapeHTML(b.housekeepingStatus || "—")}</strong></p>

            ${lastReport ? `
              <div class="mini-report">
                <strong>${t("lastReport")}:</strong><br>
                ${t("area")}: ${escapeHTML(lastReport.area)}<br>
                ${t("issue")}: ${escapeHTML(lastReport.issueType)}<br>
                ${t("generatesCharge")}: ${lastReport.generatesCharge ? "Sí" : "No"}<br>
                ${t("suggestedValue")}: ${money(lastReport.suggestedCharge || 0)}<br>
                ${t("responsible")}: ${escapeHTML(lastReport.responsible || "")}<br>
                ${t("note")}: ${escapeHTML(lastReport.notes || "")}
              </div>
            ` : `
              <p class="helper-note">${t("noReports")}</p>
            `}
          </div>

          <div class="item-actions">
            <button class="action-btn orange" onclick="openHousekeepingModal('${b.code}')">
              ${t("newReport")}
            </button>

            <button class="action-btn" onclick="copyHousekeepingReport('${b.code}')">
              ${t("copyReport")}
            </button>
          </div>
        </div>
      `;
    }).join("")
    : `<p class="helper-note">${t("noHousekeepingRooms")}</p>`;
}

function openHousekeepingModal(code) {
  const b = getBookings().find((x) => x.code === code);
  if (!b) return;

  document.getElementById("housekeepingForm").reset();

  document.getElementById("houseCode").value = code;
  document.getElementById("houseStatus").value = b.housekeepingStatus || "clean_pending";
  document.getElementById("houseDamage").value = b.damageReported ? "Sí" : "No";
  document.getElementById("houseDamageValue").value = b.damageValue || 0;
  document.getElementById("houseNotes").value = b.housekeepingNotes || "";
  document.getElementById("houseOtherIssueBox").classList.add("hidden");

  document.getElementById("housekeepingModal").classList.remove("hidden");
}

function saveHousekeepingReport(e) {
  e.preventDefault();

  const code = document.getElementById("houseCode").value;
  const status = document.getElementById("houseStatus").value;
  const damage = document.getElementById("houseDamage").value === "Sí";
  const damageValue = damage
    ? Number(document.getElementById("houseDamageValue").value || 0)
    : 0;

  const issueType = document.getElementById("houseIssueType").value;

  const finalIssue =
    issueType === "Otro"
      ? document.getElementById("houseOtherIssue").value.trim()
      : issueType;

  const report = {
    date: new Date().toISOString(),
    area: document.getElementById("houseArea").value,
    status,
    issueType: finalIssue,
    generatesCharge: damage,
    suggestedCharge: damageValue,
    notes: document.getElementById("houseNotes").value.trim(),
    responsible: getSettings().houseName || "Housekeeping",
  };

  const bookings = getBookings().map((b) => {
    if (b.code !== code) return b;

    let newStatus = b.status;

    if (status === "ready" && b.status === "cleaning_pending") {
      newStatus = "completed";
    }

    const reports = [...(b.housekeepingReports || []), report];

    const newTotal =
      Number(b.lodgingTotal || 0) +
      Number(b.servicesTotal || 0) +
      Number(b.consumptionTotal || 0) +
      damageValue -
      Number(b.discount || 0);

    return {
      ...b,
      status: newStatus,
      housekeepingStatus: status,
      housekeepingReports: reports,
      damageReported: damage,
      damageValue,
      total: newTotal,
      pendingBalance: newTotal - Number(b.paidValue || 0),
      housekeepingNotes: report.notes,
      housekeepingUpdatedAt: new Date().toISOString(),
      housekeepingBy: report.responsible,
    };
  });

  setData(STORAGE_KEYS.bookings, bookings);

  document.getElementById("housekeepingModal").classList.add("hidden");

  renderAdminAll();

  showToast(t("housekeepingSaved"));
}

function copyHousekeepingReport(code) {
  const booking = getBookings().find((b) => b.code === code);
  if (!booking) return;

  const reports = booking.housekeepingReports || [];

  if (!reports.length) {
    showToast(t("noReportToCopy"));
    return;
  }

  const last = reports[reports.length - 1];

  const text = `
Reporte Housekeeping
Reserva: ${booking.code}
Glamping: ${booking.unitName}
Huésped: ${booking.fullName}

Área revisada: ${last.area}
Estado: ${last.status}
Novedad: ${last.issueType}
Genera cobro: ${last.generatesCharge ? "Sí" : "No"}
Valor sugerido: ${money(last.suggestedCharge || 0)}
Responsable: ${last.responsible}
Notas: ${last.notes || "Sin notas"}
  `.trim();

  navigator.clipboard.writeText(text);

  showToast(t("reportCopied"));
}
/* =========================
   GLAMPINGS ADMIN
========================= */

function renderAdminUnits() {
  const list = document.getElementById("adminUnitsList");
  if (!list) return;

  list.innerHTML = getUnits().map((unit) => `
    <div class="admin-item">
      <div>
        <h4>${escapeHTML(unit.name)} · ${money(unit.price)}</h4>
        <p>${escapeHTML(unit.descriptionEs || "")}</p>
        <p>
          ${t("capacity")}: ${unit.adults} ${t("adultsText")} · ${unit.children} ${t("childrenText")} ·
          ${t("status")}: <span class="status-badge">${unit.status === "active" ? t("active") : t("inactive")}</span>
        </p>
        <p>${t("features")}: ${(unit.features || []).map(escapeHTML).join(", ")}</p>
      </div>

      <div class="item-actions">
        <button class="action-btn" onclick="openUnitModal('${unit.id}')">${t("edit")}</button>
        <button class="action-btn danger" onclick="deleteUnit('${unit.id}')">${t("delete")}</button>
      </div>
    </div>
  `).join("");
}

function openUnitModal(id = null) {
  document.getElementById("unitForm").reset();

  if (id) {
    const u = getUnits().find((x) => x.id === id);

    document.getElementById("unitModalTitle").textContent = t("editGlamping");
    document.getElementById("unitId").value = u.id;
    document.getElementById("unitName").value = u.name;
    document.getElementById("unitPrice").value = u.price;
    document.getElementById("unitAdults").value = u.adults;
    document.getElementById("unitChildren").value = u.children;
    document.getElementById("unitDescriptionEs").value = u.descriptionEs || "";
    document.getElementById("unitDescriptionEn").value = u.descriptionEn || "";
    document.getElementById("unitImage").value = u.image || "";
    document.getElementById("unitFeatures").value = (u.features || []).join(", ");
    document.getElementById("unitStatus").value = u.status;
  } else {
    document.getElementById("unitModalTitle").textContent = t("addGlamping");
    document.getElementById("unitId").value = "";
    document.getElementById("unitAdults").value = 2;
    document.getElementById("unitChildren").value = 2;
    document.getElementById("unitStatus").value = "active";
  }

  document.getElementById("unitModal").classList.remove("hidden");
}

function saveUnit(e) {
  e.preventDefault();

  const units = getUnits();
  const id = document.getElementById("unitId").value || `G${Date.now()}`;

  const unit = {
    id,
    name: document.getElementById("unitName").value.trim(),
    price: Number(document.getElementById("unitPrice").value),
    adults: Number(document.getElementById("unitAdults").value),
    children: Number(document.getElementById("unitChildren").value),
    descriptionEs: document.getElementById("unitDescriptionEs").value.trim(),
    descriptionEn: document.getElementById("unitDescriptionEn").value.trim(),
    image:
      document.getElementById("unitImage").value.trim() ||
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80",
    features: document.getElementById("unitFeatures").value
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean),
    status: document.getElementById("unitStatus").value,
    housekeepingStatus: "ready",
  };

  const exists = units.some((u) => u.id === id);

  setData(
    STORAGE_KEYS.units,
    exists ? units.map((u) => (u.id === id ? unit : u)) : [...units, unit]
  );

  document.getElementById("unitModal").classList.add("hidden");

  renderAdminAll();
  renderGlampings();

  showToast(t("glampingSaved"));
}

function deleteUnit(id) {
  if (!confirm(t("confirmDeleteGlamping"))) return;

  setData(STORAGE_KEYS.units, getUnits().filter((u) => u.id !== id));

  renderAdminAll();
  renderGlampings();

  showToast(t("glampingDeleted"));
}

/* =========================
   SERVICIOS ADMIN
========================= */

function renderAdminServices() {
  const list = document.getElementById("adminServicesList");
  if (!list) return;

  list.innerHTML = getServices().map((s) => {
    const name = getCurrentLanguage() === "en" ? (s.nameEn || s.nameEs) : s.nameEs;
    const desc = getCurrentLanguage() === "en" ? (s.descriptionEn || s.descriptionEs) : s.descriptionEs;

    return `
      <div class="admin-item">
        <div>
          <h4>${escapeHTML(name)} · ${money(s.price)}</h4>
          <p>${escapeHTML(desc || "")}</p>
          <p>
            ${t("type")}: ${translateServiceType(s.type)} ·
            ${t("status")}: <span class="status-badge">${s.active ? t("active") : t("inactive")}</span>
          </p>
        </div>

        <div class="item-actions">
          <button class="action-btn" onclick="openServiceModal('${s.id}')">${t("edit")}</button>
          <button class="action-btn danger" onclick="deleteService('${s.id}')">${t("delete")}</button>
        </div>
      </div>
    `;
  }).join("");
}

function translateServiceType(type) {
  const lang = getCurrentLanguage();

  const mapEs = {
    food: "Alimentación",
    experience: "Experiencia / extra",
    consumption: "Consumo interno",
    special: "Fecha especial",
  };

  const mapEn = {
    food: "Food service",
    experience: "Experience / extra",
    consumption: "Internal consumption",
    special: "Special date",
  };

  return lang === "en" ? (mapEn[type] || type) : (mapEs[type] || type);
}

function openServiceModal(id = null) {
  document.getElementById("serviceForm").reset();

  if (id) {
    const s = getServices().find((x) => x.id === id);

    document.getElementById("serviceModalTitle").textContent = t("editService");
    document.getElementById("serviceId").value = s.id;
    document.getElementById("serviceNameEs").value = s.nameEs;
    document.getElementById("serviceNameEn").value = s.nameEn;
    document.getElementById("serviceType").value = s.type;
    document.getElementById("servicePrice").value = s.price;
    document.getElementById("serviceDescriptionEs").value = s.descriptionEs || "";
    document.getElementById("serviceDescriptionEn").value = s.descriptionEn || "";
    document.getElementById("serviceActive").value = String(s.active);
  } else {
    document.getElementById("serviceModalTitle").textContent = t("addService");
    document.getElementById("serviceId").value = "";
    document.getElementById("serviceActive").value = "true";
  }

  document.getElementById("serviceModal").classList.remove("hidden");
}

function saveService(e) {
  e.preventDefault();

  const services = getServices();
  const id = document.getElementById("serviceId").value || `S${Date.now()}`;

  const service = {
    id,
    nameEs: document.getElementById("serviceNameEs").value.trim(),
    nameEn: document.getElementById("serviceNameEn").value.trim(),
    type: document.getElementById("serviceType").value,
    price: Number(document.getElementById("servicePrice").value),
    descriptionEs: document.getElementById("serviceDescriptionEs").value.trim(),
    descriptionEn: document.getElementById("serviceDescriptionEn").value.trim(),
    active: document.getElementById("serviceActive").value === "true",
  };

  const exists = services.some((s) => s.id === id);

  setData(
    STORAGE_KEYS.services,
    exists ? services.map((s) => (s.id === id ? service : s)) : [...services, service]
  );

  document.getElementById("serviceModal").classList.add("hidden");

  renderAdminAll();
  renderGlampings();

  showToast(t("serviceSaved"));
}

function deleteService(id) {
  if (!confirm(t("confirmDeleteService"))) return;

  setData(STORAGE_KEYS.services, getServices().filter((s) => s.id !== id));

  renderAdminAll();
  renderGlampings();

  showToast(t("serviceDeleted"));
}

/* =========================
   FINANZAS
========================= */

function renderFinance() {
  const bookings = getBookings();
  const expenses = getExpenses();

  const income = bookings.reduce(
    (sum, b) => sum + Number(b.paidValue || 0) + Number(b.retainedValue || 0),
    0
  );

  const refunds = bookings.reduce((sum, b) => sum + Number(b.refundValue || 0), 0);
  const expenseTotal = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const net = income - refunds - expenseTotal;

  const incomeBox = document.getElementById("financeIncome");
  const refundsBox = document.getElementById("financeRefunds");
  const expensesBox = document.getElementById("financeExpenses");
  const netBox = document.getElementById("financeNet");

  if (incomeBox) incomeBox.textContent = money(income);
  if (refundsBox) refundsBox.textContent = money(refunds);
  if (expensesBox) expensesBox.textContent = money(expenseTotal);
  if (netBox) netBox.textContent = money(net);

  const list = document.getElementById("expensesList");
  if (!list) return;

  list.innerHTML = expenses.length
    ? [...expenses].reverse().map((e) => `
      <div class="admin-item">
        <div>
          <h4>${escapeHTML(e.category)} · ${money(e.amount)}</h4>
          <p>${escapeHTML(e.date || "")} · ${escapeHTML(e.description || "")}</p>
          <p>${t("paymentMethod")}: ${escapeHTML(e.paymentMethod || "—")}</p>
        </div>

        <div class="item-actions">
          <button class="action-btn danger" onclick="deleteExpense('${e.id}')">${t("delete")}</button>
        </div>
      </div>
    `).join("")
    : `<p class="helper-note">${t("noExpenses")}</p>`;
}

function openExpenseModal() {
  document.getElementById("expenseForm").reset();
  document.getElementById("expenseId").value = "";
  document.getElementById("expenseDate").value = todayISO();
  document.getElementById("expenseOtherBox").classList.add("hidden");
  document.getElementById("expenseModal").classList.remove("hidden");
}

function saveExpense(e) {
  e.preventDefault();

  const categorySelect = document.getElementById("expenseCategory").value;
  const category =
    categorySelect === "Otros"
      ? document.getElementById("expenseOther").value.trim()
      : categorySelect;

  const expense = {
    id: `E${Date.now()}`,
    date: document.getElementById("expenseDate").value,
    category,
    amount: Number(document.getElementById("expenseAmount").value || 0),
    paymentMethod: document.getElementById("expensePaymentMethod").value,
    description: document.getElementById("expenseDescription").value.trim(),
    createdAt: new Date().toISOString(),
  };

  setData(STORAGE_KEYS.expenses, [...getExpenses(), expense]);

  document.getElementById("expenseModal").classList.add("hidden");

  renderAdminAll();

  showToast(t("expenseSaved"));
}

function deleteExpense(id) {
  if (!confirm(t("confirmDeleteExpense"))) return;

  setData(STORAGE_KEYS.expenses, getExpenses().filter((e) => e.id !== id));

  renderAdminAll();

  showToast(t("expenseDeleted"));
}

/* =========================
   FECHAS ESPECIALES
========================= */

function renderSpecialDates() {
  const list = document.getElementById("specialDatesList");
  if (!list) return;

  const specials = getSpecials();

  list.innerHTML = specials.length
    ? specials.map((s) => `
      <div class="admin-item">
        <div>
          <h4>${escapeHTML(s.name)} · ${money(s.price || 0)}</h4>
          <p>${escapeHTML(s.date || t("noDate"))}</p>
          <p>${escapeHTML(s.description || "")}</p>
          <p>${t("status")}: <span class="status-badge">${s.active ? t("active") : t("inactive")}</span></p>
        </div>

        <div class="item-actions">
          <button class="action-btn" onclick="openSpecialModal('${s.id}')">${t("edit")}</button>
          <button class="action-btn danger" onclick="deleteSpecialDate('${s.id}')">${t("delete")}</button>
        </div>
      </div>
    `).join("")
    : `<p class="helper-note">${t("noSpecialDates")}</p>`;
}

function openSpecialModal(id = null) {
  document.getElementById("specialDateForm").reset();

  if (id) {
    const s = getSpecials().find((x) => x.id === id);

    document.getElementById("specialDateModalTitle").textContent = t("editSpecialDate");
    document.getElementById("specialId").value = s.id;
    document.getElementById("specialName").value = s.name || "";
    document.getElementById("specialDate").value = s.date || "";
    document.getElementById("specialPrice").value = s.price || 0;
    document.getElementById("specialDescription").value = s.description || "";
    document.getElementById("specialActive").value = String(s.active);
  } else {
    document.getElementById("specialDateModalTitle").textContent = t("addSpecialDate");
    document.getElementById("specialId").value = "";
    document.getElementById("specialActive").value = "true";
  }

  document.getElementById("specialDateModal").classList.remove("hidden");
}

function saveSpecialDate(e) {
  e.preventDefault();

  const specials = getSpecials();
  const id = document.getElementById("specialId").value || `SP${Date.now()}`;

  const special = {
    id,
    name: document.getElementById("specialName").value.trim(),
    date: document.getElementById("specialDate").value,
    price: Number(document.getElementById("specialPrice").value || 0),
    description: document.getElementById("specialDescription").value.trim(),
    active: document.getElementById("specialActive").value === "true",
  };

  const exists = specials.some((s) => s.id === id);

  setData(
    STORAGE_KEYS.specials,
    exists ? specials.map((s) => (s.id === id ? special : s)) : [...specials, special]
  );

  document.getElementById("specialDateModal").classList.add("hidden");

  renderAdminAll();

  showToast(t("specialDateSaved"));
}

function deleteSpecialDate(id) {
  if (!confirm(t("confirmDeleteSpecialDate"))) return;

  setData(STORAGE_KEYS.specials, getSpecials().filter((s) => s.id !== id));

  renderAdminAll();

  showToast(t("specialDateDeleted"));
}

/* =========================
   CONFIGURACIÓN
========================= */

function renderSettingsForm() {
  const s = getSettings();

  const fields = [
    "businessName",
    "subtitle",
    "logoUrl",
    "heroImage",
    "whatsappCode",
    "whatsappNumber",
    "checkin",
    "checkout",
    "depositPercent",
    "deadlineHours",
    "damageFee",
    "currency",
    "adminUser",
    "adminPass",
    "houseUser",
    "housePass",
    "houseName",
    "legalName",
    "ruc",
    "matrixAddress",
    "branchAddress",
    "billingEmail",
    "businessPhone",
    "establishment",
    "emissionPoint",
    "sequential",
    "accounting",
  ];

  fields.forEach((id) => {
    const el = document.getElementById(id);
    if (el && s[id] !== undefined) {
      el.value = s[id];
    }
  });
}

function saveSettings(e) {
  e.preventDefault();

  const current = getSettings();

  const settings = {
    ...current,
    businessName: document.getElementById("businessName").value.trim(),
    subtitle: document.getElementById("subtitle").value.trim(),
    logoUrl: document.getElementById("logoUrl").value.trim(),
    heroImage: document.getElementById("heroImage").value.trim(),
    whatsappCode: document.getElementById("whatsappCode").value.trim(),
    whatsappNumber: document.getElementById("whatsappNumber").value.trim(),
    checkin: document.getElementById("checkin").value,
    checkout: document.getElementById("checkout").value,
    depositPercent: Number(document.getElementById("depositPercent").value || 50),
    deadlineHours: Number(document.getElementById("deadlineHours").value || 48),
    damageFee: Number(document.getElementById("damageFee").value || 150),
    currency: document.getElementById("currency").value.trim() || "$",

    adminUser: document.getElementById("adminUser").value.trim(),
    adminPass: document.getElementById("adminPass").value.trim(),

    houseUser: document.getElementById("houseUser").value.trim(),
    housePass: document.getElementById("housePass").value.trim(),
    houseName: document.getElementById("houseName").value.trim(),

    legalName: document.getElementById("legalName").value.trim(),
    ruc: document.getElementById("ruc").value.trim(),
    matrixAddress: document.getElementById("matrixAddress").value.trim(),
    branchAddress: document.getElementById("branchAddress").value.trim(),
    billingEmail: document.getElementById("billingEmail").value.trim(),
    businessPhone: document.getElementById("businessPhone").value.trim(),
    establishment: document.getElementById("establishment").value.trim(),
    emissionPoint: document.getElementById("emissionPoint").value.trim(),
    sequential: Number(document.getElementById("sequential").value || 1),
    accounting: document.getElementById("accounting").value,
  };

  setData(STORAGE_KEYS.settings, settings);

  applySettings();
  applyLanguage(getCurrentLanguage());
  renderAdminAll();
  renderGlampings();

  showToast(t("settingsSaved"));
}

/* =========================
   TICKET / IMPRESIÓN
========================= */

function printTicket(code) {
  const b = getBookings().find((x) => x.code === code);
  if (!b) return;

  const s = getSettings();

  const services = (b.services || [])
    .map((x) => `
      <tr>
        <td>${escapeHTML(x.name)}</td>
        <td>${x.qty || 1}</td>
        <td>${money(x.price || 0)}</td>
        <td>${money(x.total || 0)}</td>
      </tr>
    `)
    .join("");

  const consumptions = (b.consumptions || [])
    .map((x) => `
      <tr>
        <td>${escapeHTML(x.name)}</td>
        <td>${x.qty || 1}</td>
        <td>${money(x.price || 0)}</td>
        <td>${money(x.total || 0)}</td>
      </tr>
    `)
    .join("");

  const invoiceData = b.invoice?.type === "datos"
    ? `
      <p><strong>Factura:</strong> ${escapeHTML(b.invoice.name || "")}</p>
      <p><strong>Documento:</strong> ${escapeHTML(b.invoice.document || "")}</p>
      <p><strong>Dirección:</strong> ${escapeHTML(b.invoice.address || "")}</p>
      <p><strong>Email:</strong> ${escapeHTML(b.invoice.email || "")}</p>
    `
    : `<p><strong>Factura:</strong> Consumidor final</p>`;

  const win = window.open("", "_blank");

  win.document.write(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Ticket ${escapeHTML(b.code)}</title>

      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 24px;
          color: #222;
        }

        .ticket {
          max-width: 760px;
          margin: auto;
          border: 1px solid #ddd;
          padding: 24px;
          border-radius: 14px;
        }

        h1, h2, h3 {
          margin: 0 0 8px;
        }

        .muted {
          color: #666;
          font-size: 13px;
        }

        .box {
          border: 1px solid #eee;
          border-radius: 10px;
          padding: 12px;
          margin: 12px 0;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }

        th, td {
          border-bottom: 1px solid #eee;
          padding: 8px;
          text-align: left;
        }

        .totals {
          text-align: right;
          margin-top: 14px;
          font-size: 16px;
        }

        .big {
          font-size: 22px;
          font-weight: bold;
        }

        .footer {
          margin-top: 24px;
          font-size: 12px;
          color: #555;
        }

        @media print {
          button {
            display: none;
          }

          body {
            padding: 0;
          }

          .ticket {
            border: none;
          }
        }
      </style>
    </head>

    <body>
      <div class="ticket">
        <button onclick="window.print()">Imprimir</button>

        <h1>${escapeHTML(s.businessName || "Glamping Boutique")}</h1>
        <p class="muted">${escapeHTML(s.legalName || "")} · RUC: ${escapeHTML(s.ruc || "")}</p>
        <p class="muted">${escapeHTML(s.branchAddress || s.matrixAddress || "")}</p>

        <hr>

        <h2>Ticket de hospedaje</h2>
        <p><strong>Reserva:</strong> ${escapeHTML(b.code)}</p>
        <p><strong>Estado:</strong> ${translateStatus(b.status)}</p>
        <p><strong>Fecha emisión:</strong> ${new Date().toLocaleString("es-EC")}</p>

        <div class="box">
          <h3>Huésped</h3>
          <p><strong>Nombre:</strong> ${escapeHTML(b.fullName)}</p>
          <p><strong>Documento:</strong> ${escapeHTML(b.holder?.documentType || "")} ${escapeHTML(b.holder?.documentId || b.holder?.document || "")}</p>
          <p><strong>WhatsApp:</strong> ${escapeHTML(b.whatsappFull || "")}</p>
          <p><strong>Correo:</strong> ${escapeHTML(b.email || "")}</p>
        </div>

        <div class="box">
          <h3>Hospedaje</h3>
          <p><strong>Glamping:</strong> ${escapeHTML(b.unitName)}</p>
          <p><strong>Fechas:</strong> ${escapeHTML(b.checkIn)} al ${escapeHTML(b.checkOut)}</p>
          <p><strong>Noches:</strong> ${b.nights}</p>
          <p><strong>Adultos:</strong> ${b.adults} · <strong>Niños:</strong> ${b.children}</p>
        </div>

        <div class="box">
          <h3>Factura</h3>
          ${invoiceData}
          <p><strong>Estado factura:</strong> ${escapeHTML(b.invoiceStatus || "sin_factura")}</p>
        </div>

        <div class="box">
          <h3>Servicios / consumos</h3>

          <table>
            <thead>
              <tr>
                <th>Detalle</th>
                <th>Cant.</th>
                <th>Precio</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hospedaje</td>
                <td>${b.nights}</td>
                <td>${money(Number(b.lodgingTotal || 0) / Math.max(1, Number(b.nights || 1)))}</td>
                <td>${money(b.lodgingTotal || 0)}</td>
              </tr>
              ${services}
              ${consumptions}
              ${Number(b.damageValue || 0) > 0 ? `
                <tr>
                  <td>Daños / multa</td>
                  <td>1</td>
                  <td>${money(b.damageValue)}</td>
                  <td>${money(b.damageValue)}</td>
                </tr>
              ` : ""}
              ${Number(b.discount || 0) > 0 ? `
                <tr>
                  <td>Descuento</td>
                  <td>1</td>
                  <td>-${money(b.discount)}</td>
                  <td>-${money(b.discount)}</td>
                </tr>
              ` : ""}
            </tbody>
          </table>

          <div class="totals">
            <p>Total: <strong>${money(b.total)}</strong></p>
            <p>Pagado: <strong>${money(b.paidValue)}</strong></p>
            <p>Saldo: <strong>${money(b.pendingBalance)}</strong></p>
            <p class="big">Total final: ${money(b.total)}</p>
          </div>
        </div>

        <div class="footer">
          <p>Este ticket es un comprobante interno de control de hospedaje, consumos, pagos, facturación y housekeeping.</p>
          <p>Generado por sistema de administración de glamping.</p>
        </div>
      </div>
    </body>
    </html>
  `);

  win.document.close();
}
/* =========================
   IDIOMA ES / EN
========================= */

const translations = {
  es: {
    publicBusinessSubtitle: "Naturaleza, descanso y experiencia privada",
    heroEyebrow: "Zuleta · Ibarra · Ecuador",
    heroTitle: "Reserva tu experiencia en la naturaleza",
    heroText: "Glampings privados cerca de Laguna Roja y Cubilche, con comodidad, paisaje y atención personalizada.",
    badgeStay: "Hospedaje privado",
    badgeFood: "Alimentación opcional",
    badgeNature: "Experiencias naturales",

    step1: "Paso 1",
    availabilityTitle: "Consulta disponibilidad",
    availabilityText: "Selecciona fechas, adultos y niños. Las fechas pasadas no están disponibles.",
    checkIn: "Fecha de ingreso",
    checkOut: "Fecha de salida",
    adults: "Adultos",
    children: "Niños",
    childrenHelp: "Niños permitidos hasta 8 años.",
    searchBtn: "Buscar disponibilidad",

    step2: "Paso 2",
    chooseGlamping: "Elige tu glamping",
    chooseGlampingText: "Una reserva pendiente bloquea temporalmente la fecha por 48 horas. Si un glamping está ocupado, revisa los otros disponibles para las mismas fechas.",

    step3: "Paso 3",
    reservationData: "Datos de reserva",
    reservationDataText: "La reserva queda pendiente hasta confirmar el abono por WhatsApp.",

    food: "Alimentación",
    experiences: "Experiencias y extras",
    holderData: "Datos del titular",
    firstName: "Primer nombre",
    middleName: "Segundo nombre",
    lastName: "Primer apellido",
    secondLastName: "Segundo apellido",
    documentType: "Tipo documento",
    documentNumber: "Número documento",
    nationality: "Nacionalidad",
    age: "Edad",
    sexRegister: "Sexo para registro",
    country: "País",
    whatsapp: "WhatsApp",
    email: "Correo electrónico",
    city: "Ciudad",
    transport: "Medio de llegada",
    arrivalTime: "Hora estimada de llegada",

    companionsTitle: "Acompañantes obligatorios",
    companionsText: "Los campos se generan según adultos y niños seleccionados.",

    healthTitle: "Alergias y condiciones médicas",
    allergies: "Alergias alimentarias",
    allergyOther: "Especificar alergia",
    medical: "Condición médica",
    medicalOther: "Especificar condición médica",
    notes: "Observaciones adicionales",

    invoiceTitle: "Datos para factura",
    invoiceType: "Tipo de factura",
    invoiceName: "Nombre / Razón social",
    invoiceDocument: "Cédula / RUC / Pasaporte",
    invoiceAddress: "Dirección",
    invoiceEmail: "Correo factura",

    paymentSummary: "Resumen de pago",
    nightPrice: "Precio por noche",
    nights: "Noches",
    lodging: "Hospedaje",
    services: "Servicios",
    totalReservation: "Total reserva",
    pendingBalance: "Saldo al check-in",
    depositRequired: "Abono requerido",

    policiesTitle: "Políticas obligatorias",
    policyReservation: "Reserva:",
    policyReservationText: "Para confirmar la reserva se requiere el abono configurado por administración.",
    policyCancellation: "Cancelación:",
    policyCancellationText: "Si el huésped cancela después de abonar, se aplicará una penalidad equivalente al 50% del valor pagado o abonado, según corresponda.",
    policyRefunds: "Devoluciones:",
    policyRefundsText: "Si existiera valor a devolver, administración gestionará la devolución según la forma de pago y registro interno.",
    policyDamages: "Daños:",
    policyDamagesText: "Daños menores tendrán una multa base de $150. Daños superiores serán cobrados según evaluación administrativa.",
    policyData: "Datos:",
    policyDataText: "La información ingresada será usada para fines administrativos, seguridad, control de reserva, facturación y atención del hospedaje.",
    acceptPolicies: "Acepto las políticas de reserva, cancelación, daños, facturación y uso administrativo de datos.",

    whatsappBtn: "Generar reserva y continuar por WhatsApp",

    infoTitle: "Información importante",
    infoReservation: "Reserva pendiente",
    infoReservationText: "La fecha se bloquea temporalmente hasta confirmar el abono.",
    infoPayment: "Pago y cancelación",
    infoPaymentText: "La reserva se confirma con abono. Si se cancela, puede aplicar penalidad.",
    infoTicket: "Ticket y factura",
    infoTicketText: "Al check-out se genera un ticket interno y datos para facturación.",

    access: "Acceso",
    internalAccess: "Acceso interno",
    adminOrHouse: "Administrador o Housekeeping.",
    user: "Usuario",
    password: "Contraseña",
    login: "Ingresar",

    dashboard: "Dashboard",
    calendar: "Calendario",
    calendarFrontDesk: "Calendario operativo / Front Desk",
    manualBooking: "Nueva reserva",
    bookings: "Reservas",
    housekeeping: "Housekeeping",
    units: "Glampings",
    servicesAdmin: "Servicios y alimentación",
    finance: "Finanzas",
    specialDates: "Fechas especiales",
    settings: "Configuración",
    logout: "Salir",
    viewSite: "Ver sitio",

    consult: "Consultar",
    available: "Disponible",
    unavailable: "No disponible",
    capacityNotAllowed: "Capacidad no permitida",
    noAvailability: "No hay disponibilidad para estas fechas. Intenta con otras fechas.",
    from: "Desde",
    perNight: "por noche",
    book: "Reservar",
    noFood: "Sin servicios",
    specialDetected: "Fecha especial detectada:",
    suggestedPrice: "Precio sugerido:",
    holderSingle: "Reserva para 1 adulto. No se requieren acompañantes.",
    adultCompanion: "Acompañante adulto",
    childCompanion: "Niño",
    childMax: "máximo 8 años",
    years: "años",
    selectAge: "Seleccionar edad",
    phoneDigits: "El número debe tener {digits} dígitos.",
    transportOwnHelp: "Selecciona una hora estimada de llegada. El check-in aplica desde el horario configurado.",
    transportGlampingHelp: "El punto estratégico de salida desde Ibarra y la hora serán coordinados por WhatsApp.",

    wrongLogin: "Usuario o contraseña incorrectos.",
    sessionClosed: "Sesión cerrada.",
    noBookingsYet: "Todavía no existen reservas.",
    free: "Libre",
    dateLoadedManual: "Fecha cargada para nueva reserva manual.",
    noSpecialDatesSelected: "No hay fechas especiales activas para las fechas seleccionadas.",
    manualOneAdult: "Reserva manual para 1 adulto. No se requieren acompañantes.",
    noBookingsFilter: "No existen reservas con ese filtro.",

    to: "al",
    nightsText: "noche(s)",
    total: "Total",
    paid: "Pagado",
    balance: "Saldo",
    refund: "Devolución",
    status: "Estado",
    confirmPayment: "Confirmar pago",
    addConsumption: "Agregar consumo",
    cancel: "Cancelar",
    consumptions: "Consumos",
    copy: "Copiar",
    bookingConfirmed: "Reserva confirmada.",
    checkinSaved: "Check-in registrado.",
    summaryCopied: "Resumen copiado.",
    cancellationSaved: "Cancelación guardada.",
    consumptionAdded: "Consumo agregado.",
    checkoutSaved: "Check-out guardado.",

    statusShortPending: "Pend.",
    statusShortConfirmed: "Conf.",
    statusShortStay: "Estadía",
    statusShortCleaning: "Limp.",
    statusShortCompleted: "Comp.",
    statusShortExpired: "Exp.",
    statusShortCancelled: "Cancel.",
    statusShortRefund: "Dev.",
    statusShortRefundOk: "Dev. ok",
    statusShortNoShow: "No show",

    guest: "Huésped",
    cleaningStatus: "Estado limpieza",
    lastReport: "Último reporte",
    area: "Área",
    issue: "Novedad",
    generatesCharge: "Genera cobro",
    suggestedValue: "Valor sugerido",
    responsible: "Responsable",
    note: "Nota",
    noReports: "Sin reportes todavía.",
    newReport: "Nuevo reporte",
    copyReport: "Copiar reporte",
    noHousekeepingRooms: "No hay habitaciones para housekeeping.",
    housekeepingSaved: "Reporte housekeeping guardado.",
    noReportToCopy: "No hay reporte para copiar.",
    reportCopied: "Reporte copiado.",

    capacity: "Capacidad",
    adultsText: "adultos",
    childrenText: "niños",
    active: "Activo",
    inactive: "Inactivo",
    features: "Características",
    edit: "Editar",
    delete: "Eliminar",
    editGlamping: "Editar glamping",
    addGlamping: "Agregar glamping",
    glampingSaved: "Glamping guardado.",
    confirmDeleteGlamping: "¿Eliminar este glamping?",
    glampingDeleted: "Glamping eliminado.",

    type: "Tipo",
    editService: "Editar servicio",
    addService: "Agregar servicio",
    serviceSaved: "Servicio guardado.",
    confirmDeleteService: "¿Eliminar este servicio?",
    serviceDeleted: "Servicio eliminado.",

    paymentMethod: "Método de pago",
    noExpenses: "No hay egresos registrados.",
    expenseSaved: "Egreso guardado.",
    confirmDeleteExpense: "¿Eliminar este egreso?",
    expenseDeleted: "Egreso eliminado.",

    noDate: "Sin fecha definida",
    noSpecialDates: "No hay fechas especiales registradas.",
    editSpecialDate: "Editar fecha especial",
    addSpecialDate: "Agregar fecha especial",
    specialDateSaved: "Fecha especial guardada.",
    confirmDeleteSpecialDate: "¿Eliminar esta fecha especial?",
    specialDateDeleted: "Fecha especial eliminada.",

    settingsSaved: "Configuración guardada.",
  },

  en: {
    publicBusinessSubtitle: "Nature, rest and private experience",
    heroEyebrow: "Zuleta · Ibarra · Ecuador",
    heroTitle: "Book your nature experience",
    heroText: "Private glamping stays near Laguna Roja and Cubilche, with comfort, landscape and personalized service.",
    badgeStay: "Private lodging",
    badgeFood: "Optional food service",
    badgeNature: "Nature experiences",

    step1: "Step 1",
    availabilityTitle: "Check availability",
    availabilityText: "Select dates, adults and children. Past dates are not available.",
    checkIn: "Check-in date",
    checkOut: "Check-out date",
    adults: "Adults",
    children: "Children",
    childrenHelp: "Children allowed up to 8 years old.",
    searchBtn: "Check availability",

    step2: "Step 2",
    chooseGlamping: "Choose your glamping",
    chooseGlampingText: "A pending reservation temporarily blocks the date for 48 hours. If one unit is occupied, check the other available units for the same dates.",

    step3: "Step 3",
    reservationData: "Reservation details",
    reservationDataText: "The reservation remains pending until the deposit is confirmed by WhatsApp.",

    food: "Food service",
    experiences: "Experiences and extras",
    holderData: "Main guest information",
    firstName: "First name",
    middleName: "Middle name",
    lastName: "Last name",
    secondLastName: "Second last name",
    documentType: "Document type",
    documentNumber: "Document number",
    nationality: "Nationality",
    age: "Age",
    sexRegister: "Sex for registration",
    country: "Country",
    whatsapp: "WhatsApp",
    email: "Email",
    city: "City",
    transport: "Arrival method",
    arrivalTime: "Estimated arrival time",

    companionsTitle: "Required companions",
    companionsText: "Fields are generated according to the selected adults and children.",

    healthTitle: "Allergies and medical conditions",
    allergies: "Food allergies",
    allergyOther: "Specify allergy",
    medical: "Medical condition",
    medicalOther: "Specify medical condition",
    notes: "Additional notes",

    invoiceTitle: "Invoice information",
    invoiceType: "Invoice type",
    invoiceName: "Name / Business name",
    invoiceDocument: "ID / Tax ID / Passport",
    invoiceAddress: "Address",
    invoiceEmail: "Invoice email",

    paymentSummary: "Payment summary",
    nightPrice: "Price per night",
    nights: "Nights",
    lodging: "Lodging",
    services: "Services",
    totalReservation: "Total reservation",
    pendingBalance: "Balance at check-in",
    depositRequired: "Required deposit",

    policiesTitle: "Mandatory policies",
    policyReservation: "Reservation:",
    policyReservationText: "To confirm the reservation, the deposit configured by administration is required.",
    policyCancellation: "Cancellation:",
    policyCancellationText: "If the guest cancels after paying, a penalty equal to 50% of the amount paid or deposited will apply.",
    policyRefunds: "Refunds:",
    policyRefundsText: "If there is an amount to refund, administration will manage the refund according to the payment method and internal record.",
    policyDamages: "Damages:",
    policyDamagesText: "Minor damages will have a base fee of $150. Higher damages will be charged according to administrative evaluation.",
    policyData: "Data:",
    policyDataText: "The entered information will be used for administrative purposes, security, reservation control, invoicing and guest service.",
    acceptPolicies: "I accept the reservation, cancellation, damage, invoice and administrative data-use policies.",

    whatsappBtn: "Create reservation and continue by WhatsApp",

    infoTitle: "Important information",
    infoReservation: "Pending reservation",
    infoReservationText: "The date is temporarily blocked until the deposit is confirmed.",
    infoPayment: "Payment and cancellation",
    infoPaymentText: "The reservation is confirmed with a deposit. Cancellation penalties may apply.",
    infoTicket: "Ticket and invoice",
    infoTicketText: "At check-out, an internal ticket and invoice information are generated.",

    access: "Access",
    internalAccess: "Internal access",
    adminOrHouse: "Administrator or Housekeeping.",
    user: "User",
    password: "Password",
    login: "Log in",

    dashboard: "Dashboard",
    calendar: "Calendar",
    calendarFrontDesk: "Operations calendar / Front Desk",
    manualBooking: "New reservation",
    bookings: "Reservations",
    housekeeping: "Housekeeping",
    units: "Glamping units",
    servicesAdmin: "Services and food",
    finance: "Finance",
    specialDates: "Special dates",
    settings: "Settings",
    logout: "Log out",
    viewSite: "View site",

    consult: "Check",
    available: "Available",
    unavailable: "Unavailable",
    capacityNotAllowed: "Capacity not allowed",
    noAvailability: "There is no availability for these dates. Try different dates.",
    from: "From",
    perNight: "per night",
    book: "Book",
    noFood: "No services",
    specialDetected: "Special date detected:",
    suggestedPrice: "Suggested price:",
    holderSingle: "Reservation for 1 adult. No companions are required.",
    adultCompanion: "Adult companion",
    childCompanion: "Child",
    childMax: "maximum 8 years old",
    years: "years old",
    selectAge: "Select age",
    phoneDigits: "The number must have {digits} digits.",
    transportOwnHelp: "Select an estimated arrival time. Check-in applies from the configured time.",
    transportGlampingHelp: "The strategic departure point from Ibarra and the time will be coordinated by WhatsApp.",

    wrongLogin: "Incorrect username or password.",
    sessionClosed: "Session closed.",
    noBookingsYet: "There are no reservations yet.",
    free: "Free",
    dateLoadedManual: "Date loaded for a new manual reservation.",
    noSpecialDatesSelected: "There are no active special dates for the selected dates.",
    manualOneAdult: "Manual reservation for 1 adult. No companions are required.",
    noBookingsFilter: "There are no reservations with that filter.",

    to: "to",
    nightsText: "night(s)",
    total: "Total",
    paid: "Paid",
    balance: "Balance",
    refund: "Refund",
    status: "Status",
    confirmPayment: "Confirm payment",
    addConsumption: "Add consumption",
    cancel: "Cancel",
    consumptions: "Consumptions",
    copy: "Copy",
    bookingConfirmed: "Reservation confirmed.",
    checkinSaved: "Check-in registered.",
    summaryCopied: "Summary copied.",
    cancellationSaved: "Cancellation saved.",
    consumptionAdded: "Consumption added.",
    checkoutSaved: "Check-out saved.",

    statusShortPending: "Pend.",
    statusShortConfirmed: "Conf.",
    statusShortStay: "Stay",
    statusShortCleaning: "Clean.",
    statusShortCompleted: "Done",
    statusShortExpired: "Exp.",
    statusShortCancelled: "Cancel.",
    statusShortRefund: "Ref.",
    statusShortRefundOk: "Ref. ok",
    statusShortNoShow: "No show",

    guest: "Guest",
    cleaningStatus: "Cleaning status",
    lastReport: "Last report",
    area: "Area",
    issue: "Issue",
    generatesCharge: "Generates charge",
    suggestedValue: "Suggested value",
    responsible: "Responsible",
    note: "Note",
    noReports: "No reports yet.",
    newReport: "New report",
    copyReport: "Copy report",
    noHousekeepingRooms: "No rooms for housekeeping.",
    housekeepingSaved: "Housekeeping report saved.",
    noReportToCopy: "There is no report to copy.",
    reportCopied: "Report copied.",

    capacity: "Capacity",
    adultsText: "adults",
    childrenText: "children",
    active: "Active",
    inactive: "Inactive",
    features: "Features",
    edit: "Edit",
    delete: "Delete",
    editGlamping: "Edit glamping",
    addGlamping: "Add glamping",
    glampingSaved: "Glamping saved.",
    confirmDeleteGlamping: "Delete this glamping?",
    glampingDeleted: "Glamping deleted.",

    type: "Type",
    editService: "Edit service",
    addService: "Add service",
    serviceSaved: "Service saved.",
    confirmDeleteService: "Delete this service?",
    serviceDeleted: "Service deleted.",

    paymentMethod: "Payment method",
    noExpenses: "No expenses registered.",
    expenseSaved: "Expense saved.",
    confirmDeleteExpense: "Delete this expense?",
    expenseDeleted: "Expense deleted.",

    noDate: "No date defined",
    noSpecialDates: "No special dates registered.",
    editSpecialDate: "Edit special date",
    addSpecialDate: "Add special date",
    specialDateSaved: "Special date saved.",
    confirmDeleteSpecialDate: "Delete this special date?",
    specialDateDeleted: "Special date deleted.",

    settingsSaved: "Settings saved.",
  },
};

function getCurrentLanguage() {
  return localStorage.getItem(LANGUAGE_KEY) || "es";
}

function setCurrentLanguage(lang) {
  localStorage.setItem(LANGUAGE_KEY, lang);
}

function t(key, params = {}) {
  const lang = getCurrentLanguage();
  const pack = translations[lang] || translations.es;
  let text = pack[key] || translations.es[key] || key;

  Object.keys(params).forEach((param) => {
    text = text.replaceAll(`{${param}}`, params[param]);
  });

  return text;
}

function bindLanguageButtons() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang || "es";

      setCurrentLanguage(lang);
      applyLanguage(lang);

      renderGlampings();
      renderAdminAll();

      if (selectedUnit && selectedSearch) {
        renderServicesForBooking();
        renderCompanionsRequired();
        updateReservationTotals();
      }
    });
  });
}

function applyLanguage(lang = "es") {
  const pack = translations[lang] || translations.es;

  document.documentElement.lang = lang;

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  safeText("#publicBusinessSubtitle", pack.publicBusinessSubtitle);
  safeText(".eyebrow", pack.heroEyebrow);
  safeText(".hero-content h2", pack.heroTitle);
  safeText(".hero-content p", pack.heroText);

  const badges = document.querySelectorAll(".hero-badges span");
  if (badges[0]) badges[0].innerHTML = `<i class="fa-solid fa-bed"></i> ${pack.badgeStay}`;
  if (badges[1]) badges[1].innerHTML = `<i class="fa-solid fa-utensils"></i> ${pack.badgeFood}`;
  if (badges[2]) badges[2].innerHTML = `<i class="fa-solid fa-tree"></i> ${pack.badgeNature}`;

  const bookingHeading = document.querySelector(".booking-search .section-heading");
  if (bookingHeading) {
    const step = bookingHeading.querySelector("span");
    const title = bookingHeading.querySelector("h3");
    const text = bookingHeading.querySelector("p");

    if (step) step.textContent = pack.step1;
    if (title) title.textContent = pack.availabilityTitle;
    if (text) text.textContent = pack.availabilityText;
  }

  labelFor("checkIn", pack.checkIn);
  labelFor("checkOut", pack.checkOut);
  labelFor("adults", pack.adults);
  labelFor("children", pack.children);
  safeText("#children + small", pack.childrenHelp);

  const searchBtn = document.querySelector(".search-btn");
  if (searchBtn) {
    searchBtn.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i> ${pack.searchBtn}`;
  }

  const glampingHeading = document.querySelector(".glampings-section .section-heading");
  if (glampingHeading) {
    const step = glampingHeading.querySelector("span");
    const title = glampingHeading.querySelector("h3");
    const text = glampingHeading.querySelector("p");

    if (step) step.textContent = pack.step2;
    if (title) title.textContent = pack.chooseGlamping;
    if (text) text.textContent = pack.chooseGlampingText;
  }

  const reservationHeading = document.querySelector("#reservationPanel .section-heading");
  if (reservationHeading) {
    const step = reservationHeading.querySelector("span");
    const title = reservationHeading.querySelector("h3");
    const text = reservationHeading.querySelector("p");

    if (step) step.textContent = pack.step3;
    if (title) title.textContent = pack.reservationData;
    if (text) text.textContent = pack.reservationDataText;
  }

  const subsectionTitles = document.querySelectorAll("#reservationForm .subsection h4");
  if (subsectionTitles[0]) subsectionTitles[0].textContent = pack.food;
  if (subsectionTitles[1]) subsectionTitles[1].textContent = pack.experiences;
  if (subsectionTitles[2]) subsectionTitles[2].textContent = pack.holderData;
  if (subsectionTitles[3]) subsectionTitles[3].textContent = pack.companionsTitle;
  if (subsectionTitles[4]) subsectionTitles[4].textContent = pack.healthTitle;
  if (subsectionTitles[5]) subsectionTitles[5].textContent = pack.invoiceTitle;

  labelFor("firstName", pack.firstName);
  labelFor("middleName", pack.middleName);
  labelFor("lastName", pack.lastName);
  labelFor("secondLastName", pack.secondLastName);
  labelFor("documentType", pack.documentType);
  labelFor("documentId", pack.documentNumber);
  labelFor("nationality", pack.nationality);
  labelFor("holderAge", pack.age);
  labelFor("holderGender", pack.sexRegister);
  labelFor("country", pack.country);
  labelFor("phoneNumber", pack.whatsapp);
  labelFor("email", pack.email);
  labelFor("city", pack.city);
  labelFor("transportType", pack.transport);
  labelFor("arrivalTime", pack.arrivalTime);

  const companionsNote = document.querySelector("#reservationForm .subsection:nth-of-type(4) .helper-note");
  if (companionsNote) companionsNote.textContent = pack.companionsText;

  labelFor("foodAllergySelect", pack.allergies);
  labelFor("foodAllergyOther", pack.allergyOther);
  labelFor("medicalSelect", pack.medical);
  labelFor("medicalOther", pack.medicalOther);
  labelFor("notes", pack.notes);

  labelFor("invoiceType", pack.invoiceType);
  labelFor("invoiceName", pack.invoiceName);
  labelFor("invoiceDocument", pack.invoiceDocument);
  labelFor("invoiceAddress", pack.invoiceAddress);
  labelFor("invoiceEmail", pack.invoiceEmail);

  safeText(".payment-summary h4", pack.paymentSummary);

  const summaryRows = document.querySelectorAll(".payment-summary .summary-row span");
  if (summaryRows[0]) summaryRows[0].textContent = pack.nightPrice;
  if (summaryRows[1]) summaryRows[1].textContent = pack.nights;
  if (summaryRows[2]) summaryRows[2].textContent = pack.lodging;
  if (summaryRows[3]) summaryRows[3].textContent = pack.services;
  if (summaryRows[4]) summaryRows[4].textContent = pack.totalReservation;
  if (summaryRows[6]) summaryRows[6].textContent = pack.pendingBalance;

  const depositLabel = document.getElementById("depositLabel");
  if (depositLabel) {
    depositLabel.textContent = `${pack.depositRequired} (${getSettings().depositPercent}%)`;
  }

  safeText(".policies-box h4", pack.policiesTitle);

  const policyBox = document.querySelector(".policy-text");
  if (policyBox) {
    policyBox.innerHTML = `
      <p><strong>${pack.policyReservation}</strong> ${pack.policyReservationText}</p>
      <p><strong>${pack.policyCancellation}</strong> ${pack.policyCancellationText}</p>
      <p><strong>${pack.policyRefunds}</strong> ${pack.policyRefundsText}</p>
      <p><strong>${pack.policyDamages}</strong> ${pack.policyDamagesText}</p>
      <p><strong>${pack.policyData}</strong> ${pack.policyDataText}</p>
    `;
  }

  const acceptText = document.querySelector(".checkbox-line span");
  if (acceptText) acceptText.textContent = pack.acceptPolicies;

  const whatsappBtn = document.querySelector("#reservationForm button[type='submit']");
  if (whatsappBtn) {
    whatsappBtn.innerHTML = `<i class="fa-brands fa-whatsapp"></i> ${pack.whatsappBtn}`;
  }

  safeText(".info-section .section-heading h3", pack.infoTitle);

  const infoCards = document.querySelectorAll(".info-card");
  if (infoCards[0]) {
    const h = infoCards[0].querySelector("h4");
    const p = infoCards[0].querySelector("p");
    if (h) h.textContent = pack.infoReservation;
    if (p) p.textContent = pack.infoReservationText;
  }

  if (infoCards[1]) {
    const h = infoCards[1].querySelector("h4");
    const p = infoCards[1].querySelector("p");
    if (h) h.textContent = pack.infoPayment;
    if (p) p.textContent = pack.infoPaymentText;
  }

  if (infoCards[2]) {
    const h = infoCards[2].querySelector("h4");
    const p = infoCards[2].querySelector("p");
    if (h) h.textContent = pack.infoTicket;
    if (p) p.textContent = pack.infoTicketText;
  }

  const accessBtn = document.querySelector(".admin-open-btn");
  if (accessBtn) {
    accessBtn.innerHTML = `<i class="fa-solid fa-user-lock"></i> ${pack.access}`;
  }

  safeText(".login-card h2", pack.internalAccess);
  safeText(".login-card p", pack.adminOrHouse);
  labelFor("loginUser", pack.user);
  labelFor("loginPass", pack.password);

  const loginBtn = document.querySelector("#loginForm button[type='submit']");
  if (loginBtn) loginBtn.textContent = pack.login;

  translateAdminMenu(pack);

  const title = document.getElementById("adminSectionTitle");
  const activeSection = document.querySelector(".admin-section.active");

  if (title && activeSection) {
    const id = activeSection.id.replace("admin-", "");
    const titles = {
      dashboard: pack.dashboard,
      calendar: pack.calendarFrontDesk,
      manual: pack.manualBooking,
      bookings: pack.bookings,
      housekeeping: pack.housekeeping,
      units: pack.units,
      services: pack.servicesAdmin,
      finance: pack.finance,
      alerts: pack.specialDates,
      settings: pack.settings,
    };

    title.textContent = titles[id] || "Admin";
  }
}

function translateAdminMenu(pack) {
  const menuMap = {
    dashboard: pack.dashboard,
    calendar: pack.calendar,
    manual: pack.manualBooking,
    bookings: pack.bookings,
    housekeeping: pack.housekeeping,
    units: pack.units,
    services: pack.servicesAdmin,
    finance: pack.finance,
    alerts: pack.specialDates,
    settings: pack.settings,
  };

  document.querySelectorAll(".admin-nav").forEach((btn) => {
    const section = btn.dataset.section;
    const icon = btn.querySelector("i");
    const iconHTML = icon ? icon.outerHTML : "";

    if (menuMap[section]) {
      btn.innerHTML = `${iconHTML} ${menuMap[section]}`;
    }
  });

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.innerHTML = `<i class="fa-solid fa-right-from-bracket"></i> ${pack.logout}`;
  }

  const viewBtn = document.getElementById("backToPublicBtn");
  if (viewBtn) {
    viewBtn.innerHTML = `<i class="fa-solid fa-eye"></i> ${pack.viewSite}`;
  }
}

function safeText(selector, text) {
  const el = document.querySelector(selector);
  if (el) el.textContent = text;
}

function labelFor(inputId, text) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const label = document.querySelector(`label[for="${inputId}"]`);
  if (label) label.textContent = text;
}
