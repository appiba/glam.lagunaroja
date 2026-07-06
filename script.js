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
