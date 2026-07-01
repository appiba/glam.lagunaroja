const STORAGE_KEYS = {
  settings: "glamp_v2_settings",
  units: "glamp_v2_units",
  bookings: "glamp_v2_bookings",
  services: "glamp_v2_services",
  expenses: "glamp_v2_expenses",
  specials: "glamp_v2_specials",
  adminSession: "glamp_v2_admin_session",
};

let currentLang = "es";
let selectedSearch = null;
let selectedUnit = null;
let selectedServices = [];
let calendarDate = new Date();

const i18n = {
  es: {
    hero_place: "Zuleta · Ibarra · Ecuador",
    hero_title: "Reserva tu experiencia en la naturaleza",
    hero_text: "Glampings privados cerca de Laguna Roja y Cubilche, con comodidad, paisaje y atención personalizada.",
    badge_private: "Hospedaje privado",
    badge_food: "Alimentación opcional",
    badge_nature: "Experiencias naturales",
    step_1: "Paso 1",
    availability_title: "Consulta disponibilidad",
    availability_text: "Selecciona fechas, adultos y niños. Las fechas pasadas no están disponibles.",
    checkin_date: "Fecha de ingreso",
    checkout_date: "Fecha de salida",
    adults: "Adultos",
    children: "Niños",
    children_note: "Niños permitidos hasta 8 años.",
    search_availability: "Buscar disponibilidad",
    step_2: "Paso 2",
    choose_unit: "Elige tu glamping",
    choose_unit_text: "Cada glamping tiene calendario propio. Una reserva pendiente bloquea la fecha por 48 horas.",
    step_3: "Paso 3",
    booking_data: "Datos de reserva",
    booking_data_text: "La reserva queda pendiente hasta confirmar el abono por WhatsApp.",
  },
  en: {
    hero_place: "Zuleta · Ibarra · Ecuador",
    hero_title: "Book your nature experience",
    hero_text: "Private glamping stays near Laguna Roja and Cubilche, with comfort, landscape and personalized service.",
    badge_private: "Private stay",
    badge_food: "Optional food",
    badge_nature: "Nature experiences",
    step_1: "Step 1",
    availability_title: "Check availability",
    availability_text: "Select dates, adults and children. Past dates are not available.",
    checkin_date: "Check-in date",
    checkout_date: "Check-out date",
    adults: "Adults",
    children: "Children",
    children_note: "Children allowed up to 8 years old.",
    search_availability: "Search availability",
    step_2: "Step 2",
    choose_unit: "Choose your glamping",
    choose_unit_text: "Each glamping has its own calendar. A pending reservation blocks the date for 48 hours.",
    step_3: "Step 3",
    booking_data: "Booking details",
    booking_data_text: "The booking remains pending until payment is confirmed by WhatsApp.",
  },
};

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
};

const defaultUnits = [
  {
    id: "G001",
    name: "Glamping Andino",
    price: 65,
    adults: 2,
    children: 2,
    status: "active",
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
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
    descriptionEs: "Glamping con mayor privacidad, ideal para descanso, parejas y fechas especiales.",
    descriptionEn: "Glamping with more privacy, ideal for rest, couples and special dates.",
    features: ["Baño privado", "Calefón", "Recibidor frontal", "Luces cálidas"],
  },
  {
    id: "G003",
    name: "Cumbre A-Frame",
    price: 85,
    adults: 2,
    children: 2,
    status: "active",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80",
    descriptionEs: "Unidad premium tipo A-frame con mejor vista, experiencia romántica y ambiente de montaña.",
    descriptionEn: "Premium A-frame unit with better views, romantic experience and mountain atmosphere.",
    features: ["A-frame", "Vista panorámica", "Baño privado", "Experiencia premium"],
  },
];

const defaultServices = [
  {
    id: "S001",
    type: "food",
    nameEs: "Sin alimentación",
    nameEn: "No food service",
    descriptionEs: "Reserva sin desayuno, almuerzo ni merienda.",
    descriptionEn: "Booking without breakfast, lunch or dinner.",
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
    descriptionEn: "Coffee, house bread, cheese, eggs, fruit and natural juice.",
    price: 15,
    active: true,
  },
  {
    id: "S004",
    type: "food",
    nameEs: "Desayuno premium romántico",
    nameEn: "Premium romantic breakfast",
    descriptionEs: "Bandeja especial para pareja con detalle romántico.",
    descriptionEn: "Special couple tray with romantic detail.",
    price: 25,
    active: true,
  },
  {
    id: "S005",
    type: "food",
    nameEs: "Almuerzo especial",
    nameEn: "Special lunch",
    descriptionEs: "Almuerzo bajo coordinación previa con administración.",
    descriptionEn: "Lunch coordinated in advance with administration.",
    price: 18,
    active: true,
  },
  {
    id: "S006",
    type: "food",
    nameEs: "Merienda especial",
    nameEn: "Special dinner",
    descriptionEs: "Merienda bajo coordinación previa con administración.",
    descriptionEn: "Dinner coordinated in advance with administration.",
    price: 18,
    active: true,
  },
  {
    id: "S007",
    type: "experience",
    nameEs: "Cuna",
    nameEn: "Crib",
    descriptionEs: "Cuna sujeta a disponibilidad para niños pequeños.",
    descriptionEn: "Crib subject to availability for small children.",
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
    descriptionEs: "Fogata coordinada según clima y seguridad del lugar.",
    descriptionEn: "Campfire coordinated depending on weather and site safety.",
    price: 10,
    active: true,
  },
  {
    id: "S010",
    type: "experience",
    nameEs: "Transporte desde Ibarra",
    nameEn: "Transport from Ibarra",
    descriptionEs: "Transporte desde un punto estratégico de la ciudad de Ibarra hacia el glamping. Punto y hora se coordinan por WhatsApp.",
    descriptionEn: "Transport from a strategic point in Ibarra city to the glamping. Meeting point and time are coordinated by WhatsApp.",
    price: 15,
    active: true,
  },
  {
    id: "S011",
    type: "experience",
    nameEs: "Caminata",
    nameEn: "Hiking",
    descriptionEs: "Experiencia de caminata por zonas naturales cercanas.",
    descriptionEn: "Hiking experience through nearby natural areas.",
    price: 12,
    active: true,
  },
  {
    id: "S012",
    type: "experience",
    nameEs: "Cabalgata",
    nameEn: "Horseback riding",
    descriptionEs: "Cabalgata bajo coordinación previa y disponibilidad.",
    descriptionEn: "Horseback riding with previous coordination and availability.",
    price: 25,
    active: true,
  },
];

const defaultSpecials = [
  {
    id: "SP001",
    name: "San Valentín",
    date: "",
    price: 110,
    description: "Glamping + decoración romántica + desayuno premium.",
    active: true,
  },
];

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

function getSettings() { return getData(STORAGE_KEYS.settings, defaultSettings); }
function getUnits() { return getData(STORAGE_KEYS.units, defaultUnits); }
function getBookings() { return getData(STORAGE_KEYS.bookings, []); }
function getServices() { return getData(STORAGE_KEYS.services, defaultServices); }
function getExpenses() { return getData(STORAGE_KEYS.expenses, []); }
function getSpecials() { return getData(STORAGE_KEYS.specials, defaultSpecials); }

function money(value) {
  const s = getSettings();
  return `${s.currency}${Number(value || 0).toFixed(2)}`;
}

function todayISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().split("T")[0];
}

function dateDiffNights(checkIn, checkOut) {
  const a = new Date(checkIn);
  const b = new Date(checkOut);
  return Math.ceil((b - a) / (1000 * 60 * 60 * 24));
}

function addHours(date, hours) {
  const d = new Date(date);
  d.setHours(d.getHours() + Number(hours));
  return d;
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
  const a1 = new Date(startA);
  const a2 = new Date(endA);
  const b1 = new Date(startB);
  const b2 = new Date(endB);
  return a1 < b2 && b1 < a2;
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
  setTimeout(() => toast.classList.add("hidden"), 3200);
}

function seedData() {
  if (!localStorage.getItem(STORAGE_KEYS.settings)) setData(STORAGE_KEYS.settings, defaultSettings);
  if (!localStorage.getItem(STORAGE_KEYS.units)) setData(STORAGE_KEYS.units, defaultUnits);
  if (!localStorage.getItem(STORAGE_KEYS.services)) setData(STORAGE_KEYS.services, defaultServices);
  if (!localStorage.getItem(STORAGE_KEYS.bookings)) setData(STORAGE_KEYS.bookings, []);
  if (!localStorage.getItem(STORAGE_KEYS.expenses)) setData(STORAGE_KEYS.expenses, []);
  if (!localStorage.getItem(STORAGE_KEYS.specials)) setData(STORAGE_KEYS.specials, defaultSpecials);
}

function expireOldPendingBookings() {
  const settings = getSettings();
  const bookings = getBookings();
  let changed = false;

  const updated = bookings.map((b) => {
    if (b.status !== "pending") return b;

    const deadline = b.paymentDeadline ? new Date(b.paymentDeadline) : addHours(new Date(b.createdAt), settings.deadlineHours);

    if (new Date() > deadline) {
      changed = true;
      return { ...b, status: "expired", expiredAt: new Date().toISOString() };
    }

    return b;
  });

  if (changed) setData(STORAGE_KEYS.bookings, updated);
}

function isUnitAvailable(unitId, checkIn, checkOut, ignoreCode = null) {
  const blockingStates = ["pending", "confirmed", "checked_in"];
  return !getBookings().some((b) => {
    if (ignoreCode && b.code === ignoreCode) return false;
    if (b.unitId !== unitId) return false;
    if (!blockingStates.includes(b.status)) return false;
    return rangesOverlap(checkIn, checkOut, b.checkIn, b.checkOut);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  seedData();
  expireOldPendingBookings();
  setupDates();
  bindEvents();
  applySettings();
  renderTranslations();
  renderGlampings();
  renderAdminAll();

  if (window.location.hash === "#admin") {
    openAdminLogin();
  }

  if (localStorage.getItem(STORAGE_KEYS.adminSession) === "true") {
    openAdminPanel();
  }
});

function setupDates() {
  const min = todayISO();

  ["checkIn", "checkOut", "manualCheckIn", "manualCheckOut", "expenseDate", "specialDate"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.min = min;
  });

  const checkIn = document.getElementById("checkIn");
  const checkOut = document.getElementById("checkOut");

  checkIn.addEventListener("change", () => {
    checkOut.min = checkIn.value || min;

    if (checkOut.value && checkOut.value <= checkIn.value) {
      const next = new Date(checkIn.value);
      next.setDate(next.getDate() + 1);
      checkOut.value = next.toISOString().split("T")[0];
    }
  });
}

function bindEvents() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentLang = btn.dataset.lang;
      document.querySelectorAll(".lang-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderTranslations();
      renderGlampings();
      if (selectedUnit) openReservationPanel(selectedUnit.id);
    });
  });

  document.getElementById("availabilityForm").addEventListener("submit", handleAvailabilitySearch);
  document.getElementById("closeReservationPanel").addEventListener("click", () => document.getElementById("reservationPanel").classList.add("hidden"));
  document.getElementById("reservationForm").addEventListener("submit", handleReservationSubmit);
  document.getElementById("transportType").addEventListener("change", toggleArrivalTime);

  document.getElementById("openAdminBtn").addEventListener("click", openAdminLogin);
  document.getElementById("closeAdminLogin").addEventListener("click", () => document.getElementById("adminLogin").classList.add("hidden"));
  document.getElementById("adminLoginForm").addEventListener("submit", handleAdminLogin);
  document.getElementById("logoutAdminBtn").addEventListener("click", logoutAdmin);
  document.getElementById("backToPublicBtn").addEventListener("click", backToPublic);

  document.querySelectorAll(".admin-nav").forEach((btn) => {
    btn.addEventListener("click", () => switchAdminSection(btn.dataset.section));
  });

  document.getElementById("settingsForm").addEventListener("submit", saveSettings);
  document.getElementById("addUnitBtn").addEventListener("click", () => openUnitModal());
  document.getElementById("closeUnitModal").addEventListener("click", () => document.getElementById("unitModal").classList.add("hidden"));
  document.getElementById("unitForm").addEventListener("submit", saveUnit);

  document.getElementById("addServiceBtn").addEventListener("click", () => openServiceModal());
  document.getElementById("closeServiceModal").addEventListener("click", () => document.getElementById("serviceModal").classList.add("hidden"));
  document.getElementById("serviceForm").addEventListener("submit", saveService);

  document.getElementById("manualBookingForm").addEventListener("submit", saveManualBooking);
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

  document.getElementById("addExpenseBtn").addEventListener("click", () => {
    document.getElementById("expenseForm").reset();
    document.getElementById("expenseDate").value = todayISO();
    document.getElementById("expenseModal").classList.remove("hidden");
  });

  document.getElementById("closeExpenseModal").addEventListener("click", () => document.getElementById("expenseModal").classList.add("hidden"));
  document.getElementById("expenseForm").addEventListener("submit", saveExpense);

  document.getElementById("addSpecialDateBtn").addEventListener("click", () => openSpecialModal());
  document.getElementById("closeSpecialDateModal").addEventListener("click", () => document.getElementById("specialDateModal").classList.add("hidden"));
  document.getElementById("specialDateForm").addEventListener("submit", saveSpecialDate);
}

function renderTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (i18n[currentLang][key]) el.textContent = i18n[currentLang][key];
  });
}

function applySettings() {
  const s = getSettings();

  document.getElementById("publicBusinessName").textContent = s.businessName || "Glamping Boutique";
  document.getElementById("publicBusinessSubtitle").textContent = s.subtitle || "";
  document.getElementById("footerBusinessName").textContent = s.businessName || "Glamping Boutique";
  document.getElementById("publicCheckinText").textContent = `Desde ${s.checkin}`;
  document.getElementById("publicCheckoutText").textContent = `Hasta ${s.checkout}`;

  const logo = document.getElementById("publicLogo");
  logo.innerHTML = s.logoUrl ? `<img src="${escapeHTML(s.logoUrl)}" alt="Logo">` : `<i class="fa-solid fa-mountain-sun"></i>`;

  if (s.heroImage) {
    document.querySelector(".hero").style.background = `
      linear-gradient(180deg, rgba(31, 61, 43, 0.08), rgba(31, 61, 43, 0.74)),
      url("${s.heroImage}") center/cover
    `;
  }
}

function handleAvailabilitySearch(e) {
  e.preventDefault();

  const checkIn = document.getElementById("checkIn").value;
  const checkOut = document.getElementById("checkOut").value;
  const adults = Number(document.getElementById("adults").value);
  const children = Number(document.getElementById("children").value);

  if (!checkIn || !checkOut) return showToast("Selecciona ingreso y salida.");
  if (checkIn < todayISO()) return showToast("No se puede reservar fechas pasadas.");
  if (checkOut <= checkIn) return showToast("La salida debe ser posterior al ingreso.");

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
  const units = getUnits().filter((u) => u.status === "active");

  if (!units.length) {
    list.innerHTML = `<p>No existen glampings activos.</p>`;
    return;
  }

  list.innerHTML = units.map((unit) => {
    const desc = currentLang === "en" ? unit.descriptionEn : unit.descriptionEs;
    const exceedsCapacity = selectedSearch && (selectedSearch.adults > unit.adults || selectedSearch.children > unit.children);
    const available = selectedSearch ? isUnitAvailable(unit.id, selectedSearch.checkIn, selectedSearch.checkOut) && !exceedsCapacity : true;
    const statusText = !selectedSearch ? "Consultar" : available ? "Disponible" : exceedsCapacity ? "Capacidad no permitida" : "Ocupado / pendiente";

    return `
      <article class="glamping-card">
        <div class="glamping-img">
          <img src="${escapeHTML(unit.image)}" alt="${escapeHTML(unit.name)}">
          <span class="glamping-status">${statusText}</span>
        </div>

        <div class="glamping-body">
          <h4>${escapeHTML(unit.name)}</h4>
          <p>${escapeHTML(desc)}</p>

          <div class="features">
            ${(unit.features || []).map((f) => `<span>${escapeHTML(f)}</span>`).join("")}
          </div>

          <div class="glamping-footer">
            <div class="price">
              <span>Desde</span>
              <strong>${money(unit.price)}</strong>
              <span>por noche</span>
            </div>

            <button class="primary-btn small-btn" ${available ? "" : "disabled"} onclick="openReservationPanel('${unit.id}')">
              Reservar
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function openReservationPanel(unitId) {
  if (!selectedSearch) {
    showToast("Primero selecciona las fechas.");
    document.querySelector(".booking-search").scrollIntoView({ behavior: "smooth" });
    return;
  }

  const unit = getUnits().find((u) => u.id === unitId);
  if (!unit) return;

  if (!isUnitAvailable(unitId, selectedSearch.checkIn, selectedSearch.checkOut)) {
    showToast("Esta fecha ya no está disponible.");
    renderGlampings();
    return;
  }

  selectedUnit = unit;
  selectedServices = [];

  document.getElementById("summaryImage").src = unit.image;
  document.getElementById("summaryGlampingName").textContent = unit.name;
  document.getElementById("summaryDates").textContent = `${selectedSearch.checkIn} → ${selectedSearch.checkOut} · ${selectedSearch.nights} noche(s)`;
  document.getElementById("summaryGuests").textContent = `${selectedSearch.adults} adulto(s) · ${selectedSearch.children} niño(s)`;
  document.getElementById("summaryPrice").textContent = `${money(unit.price)} / noche`;

  renderServicesForBooking();
  renderCompanionsRequired();
  toggleArrivalTime();
  updateReservationTotals();

  document.getElementById("reservationPanel").classList.remove("hidden");
}

function renderServicesForBooking() {
  const services = getServices().filter((s) => s.active);
  const food = services.filter((s) => s.type === "food");
  const exp = services.filter((s) => s.type === "experience");

  document.getElementById("foodServicesList").innerHTML = food.map(renderServiceOption).join("");
  document.getElementById("experienceServicesList").innerHTML = exp.map(renderServiceOption).join("");
}

function renderServiceOption(service) {
  const name = currentLang === "en" ? service.nameEn : service.nameEs;
  const desc = currentLang === "en" ? service.descriptionEn : service.descriptionEs;

  return `
    <label class="service-option">
      <input type="checkbox" value="${service.id}" onchange="toggleBookingService('${service.id}', this.checked)">
      <span>
        <strong>${escapeHTML(name)} · ${money(service.price)}</strong>
        <p>${escapeHTML(desc)}</p>
      </span>
    </label>
  `;
}

function toggleBookingService(serviceId, checked) {
  if (checked) {
    if (!selectedServices.includes(serviceId)) selectedServices.push(serviceId);
  } else {
    selectedServices = selectedServices.filter((id) => id !== serviceId);
  }

  updateReservationTotals();
}

function renderCompanionsRequired() {
  const list = document.getElementById("companionsList");
  const totalRequired = Math.max(0, selectedSearch.adults - 1) + selectedSearch.children;

  if (totalRequired === 0) {
    list.innerHTML = `<p class="helper-note">No se requieren acompañantes adicionales porque la reserva es para 1 adulto.</p>`;
    return;
  }

  let html = "";
  let index = 1;

  for (let i = 0; i < selectedSearch.adults - 1; i++) {
    html += companionCard(index, "adulto", `Acompañante adulto ${i + 1}`);
    index++;
  }

  for (let i = 0; i < selectedSearch.children; i++) {
    html += companionCard(index, "niño", `Niño ${i + 1} · máximo 8 años`);
    index++;
  }

  list.innerHTML = html;
}

function companionCard(index, type, title) {
  return `
    <div class="companion-card" data-companion-card>
      <h5>${title}</h5>
      <div class="form-grid">
        <div class="field">
          <label>Nombre completo</label>
          <input type="text" data-companion-field="name" required>
        </div>
        <div class="field">
          <label>Cédula / Pasaporte</label>
          <input type="text" data-companion-field="document" required>
        </div>
        <div class="field">
          <label>Edad</label>
          <input type="number" data-companion-field="age" min="0" ${type === "niño" ? "max='8'" : ""} required>
        </div>
        <div class="field">
          <label>Tipo</label>
          <input type="text" data-companion-field="type" value="${type}" readonly>
        </div>
        <div class="field full-span">
          <label>Relación con el titular</label>
          <input type="text" data-companion-field="relation" placeholder="Pareja, hijo, familiar..." required>
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

    if (!data.name || !data.document || !data.age || !data.relation) {
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
    help.textContent = "Indica una hora estimada de llegada. Recuerda que el check-in aplica desde el horario configurado.";
  } else {
    field.classList.add("hidden");
    document.getElementById("arrivalTime").value = "";
    help.textContent = "Si usas transporte del glamping, el punto estratégico de salida desde Ibarra y la hora se coordinarán por WhatsApp.";
  }
}

function calculateTotals() {
  const settings = getSettings();
  const lodgingTotal = selectedUnit.price * selectedSearch.nights;
  const servicesTotal = selectedServices.reduce((sum, id) => {
    const service = getServices().find((s) => s.id === id);
    return sum + (service ? Number(service.price) : 0);
  }, 0);

  const total = lodgingTotal + servicesTotal;
  const deposit = total * (Number(settings.depositPercent) / 100);
  const pending = total - deposit;

  return { lodgingTotal, servicesTotal, total, deposit, pending };
}

function updateReservationTotals() {
  if (!selectedUnit || !selectedSearch) return;

  const settings = getSettings();
  const totals = calculateTotals();

  document.getElementById("nightPrice").textContent = money(selectedUnit.price);
  document.getElementById("nightsCount").textContent = selectedSearch.nights;
  document.getElementById("lodgingTotal").textContent = money(totals.lodgingTotal);
  document.getElementById("servicesTotal").textContent = money(totals.servicesTotal);
  document.getElementById("totalReservation").textContent = money(totals.total);
  document.getElementById("requiredDeposit").textContent = money(totals.deposit);
  document.getElementById("pendingBalance").textContent = money(totals.pending);
  document.getElementById("depositLabel").textContent = `Abono requerido (${settings.depositPercent}%)`;
}

function handleReservationSubmit(e) {
  e.preventDefault();

  if (!selectedUnit || !selectedSearch) return showToast("Falta seleccionar glamping y fechas.");
  if (!document.getElementById("acceptPolicies").checked) return showToast("Debes aceptar las políticas.");

  const companions = getCompanionsFromForm();
  if (companions === null) return showToast("Completa los datos obligatorios de acompañantes.");

  if (!isUnitAvailable(selectedUnit.id, selectedSearch.checkIn, selectedSearch.checkOut)) {
    showToast("La fecha ya no está disponible.");
    document.getElementById("reservationPanel").classList.add("hidden");
    renderGlampings();
    return;
  }

  const settings = getSettings();
  const totals = calculateTotals();
  const now = new Date();

  const serviceObjects = selectedServices.map((id) => {
    const s = getServices().find((x) => x.id === id);
    return {
      id: s.id,
      type: s.type,
      name: currentLang === "en" ? s.nameEn : s.nameEs,
      price: Number(s.price),
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
    fullName: document.getElementById("fullName").value.trim(),
    documentId: document.getElementById("documentId").value.trim(),
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
    foodAllergies: document.getElementById("foodAllergies").value.trim(),
    medicalNotes: document.getElementById("medicalNotes").value.trim(),
    notes: document.getElementById("notes").value.trim(),
    lodgingTotal: totals.lodgingTotal,
    servicesTotal: totals.servicesTotal,
    total: totals.total,
    depositPercent: settings.depositPercent,
    depositRequired: totals.deposit,
    paidValue: 0,
    pendingBalance: totals.pending,
    paymentDeadline: addHours(now, settings.deadlineHours).toISOString(),
    policiesAccepted: true,
    damagePolicyAccepted: true,
    dataUseAccepted: true,
    checkinStatus: "pending",
    checkoutStatus: "pending",
    damageReported: false,
    damageValue: 0,
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

function openWhatsappForBooking(b) {
  const settings = getSettings();
  const businessNumber = `${settings.whatsappCode}${settings.whatsappNumber}`.replace(/[^\d+]/g, "").replace("+", "");
  const servicesText = b.services.length ? b.services.map((s) => `${s.name} (${money(s.price)})`).join(", ") : "Sin servicios";
  const companionsText = b.companions.length ? b.companions.map((c) => `${c.name} - ${c.document} - ${c.age} años - ${c.type}`).join(" | ") : "Sin acompañantes";

  const message = `
Hola, deseo confirmar mi reserva ${b.code}.

Titular: ${b.fullName}
Documento: ${b.documentId}
WhatsApp: ${b.whatsappFull}
Correo: ${b.email}
Ciudad / País: ${b.city}, ${b.country}

Glamping: ${b.unitName}
Fechas: ${b.checkIn} al ${b.checkOut}
Noches: ${b.nights}
Adultos: ${b.adults}
Niños: ${b.children}

Servicios: ${servicesText}
Acompañantes: ${companionsText}

Total: ${money(b.total)}
Abono requerido (${b.depositPercent}%): ${money(b.depositRequired)}
Saldo al check-in: ${money(b.pendingBalance)}

Medio de llegada: ${b.transportType}
Hora estimada: ${b.arrivalTime || "Por coordinar"}

Alergias: ${b.foodAllergies || "Ninguna"}
Condiciones médicas: ${b.medicalNotes || "Ninguna"}
Observaciones: ${b.notes || "Ninguna"}

Quedo atento para coordinar el pago.
`.trim();

  window.open(`https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`, "_blank");
}

function openAdminLogin() {
  document.getElementById("adminLogin").classList.remove("hidden");
}

function handleAdminLogin(e) {
  e.preventDefault();

  const user = document.getElementById("adminUser").value.trim();
  const pass = document.getElementById("adminPass").value.trim();

  if (user === "admin" && pass === "admin123") {
    localStorage.setItem(STORAGE_KEYS.adminSession, "true");
    document.getElementById("adminLogin").classList.add("hidden");
    openAdminPanel();
    showToast("Administrador iniciado.");
  } else {
    showToast("Usuario o contraseña incorrectos.");
  }
}

function openAdminPanel() {
  document.getElementById("publicApp").classList.add("hidden");
  document.getElementById("adminPanel").classList.remove("hidden");
  renderAdminAll();
}

function logoutAdmin() {
  localStorage.removeItem(STORAGE_KEYS.adminSession);
  document.getElementById("adminPanel").classList.add("hidden");
  document.getElementById("publicApp").classList.remove("hidden");
  showToast("Sesión cerrada.");
}

function backToPublic() {
  document.getElementById("adminPanel").classList.add("hidden");
  document.getElementById("publicApp").classList.remove("hidden");
}

function switchAdminSection(section) {
  document.querySelectorAll(".admin-nav").forEach((btn) => btn.classList.toggle("active", btn.dataset.section === section));
  document.querySelectorAll(".admin-section").forEach((sec) => sec.classList.remove("active"));
  document.getElementById(`admin-${section}`).classList.add("active");

  const titles = {
    dashboard: "Dashboard",
    calendar: "Calendario",
    manual: "Nueva reserva",
    bookings: "Reservas",
    units: "Glampings",
    services: "Servicios y alimentación",
    finance: "Finanzas",
    alerts: "Fechas especiales",
    settings: "Configuración",
  };

  document.getElementById("adminSectionTitle").textContent = titles[section] || "Admin";
}

function renderAdminAll() {
  renderDashboard();
  renderCalendar();
  renderManualSelects();
  renderAdminBookings();
  renderAdminUnits();
  renderAdminServices();
  renderFinance();
  renderSpecialDates();
  renderSettingsForm();
}

function renderDashboard() {
  const bookings = getBookings();
  const expenses = getExpenses();

  const pending = bookings.filter((b) => b.status === "pending").length;
  const confirmed = bookings.filter((b) => ["confirmed", "checked_in", "completed"].includes(b.status)).length;
  const nights = bookings.filter((b) => ["confirmed", "checked_in", "completed"].includes(b.status)).reduce((sum, b) => sum + Number(b.nights || 0), 0);
  const income = bookings.filter((b) => ["confirmed", "checked_in", "completed"].includes(b.status)).reduce((sum, b) => sum + Number(b.total || 0), 0);
  const expenseTotal = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  document.getElementById("statPending").textContent = pending;
  document.getElementById("statConfirmed").textContent = confirmed;
  document.getElementById("statNights").textContent = nights;
  document.getElementById("statNet").textContent = money(income - expenseTotal);

  const recent = [...bookings].reverse().slice(0, 7);
  document.getElementById("recentBookings").innerHTML = recent.length
    ? recent.map(renderBookingAdminItem).join("")
    : `<p class="helper-note">Todavía no existen reservas.</p>`;
}

function renderCalendar() {
  const grid = document.getElementById("calendarGrid");
  if (!grid) return;

  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const monthName = calendarDate.toLocaleDateString("es-EC", { month: "long", year: "numeric" });
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  document.getElementById("calendarMonthTitle").textContent = monthName.toUpperCase();

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
      const booking = bookings.find((b) => {
        if (b.unitId !== unit.id) return false;
        return rangesOverlap(date, nextDayISO(date), b.checkIn, b.checkOut);
      });

      let cls = "available";
      let text = "Libre";

      if (booking) {
        cls = booking.status;
        text = booking.code;
      }

      html += `<div class="calendar-cell ${cls}" title="${escapeHTML(text)}">${escapeHTML(text)}</div>`;
    }
  });

  grid.innerHTML = html;
}

function nextDayISO(date) {
  const d = new Date(date);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

function renderManualSelects() {
  const select = document.getElementById("manualUnit");
  if (!select) return;

  select.innerHTML = getUnits()
    .filter((u) => u.status === "active")
    .map((u) => `<option value="${u.id}">${escapeHTML(u.name)} · ${money(u.price)}</option>`)
    .join("");

  document.getElementById("manualCheckIn").min = todayISO();
  document.getElementById("manualCheckOut").min = todayISO();
}

function saveManualBooking(e) {
  e.preventDefault();

  const unit = getUnits().find((u) => u.id === document.getElementById("manualUnit").value);
  const checkIn = document.getElementById("manualCheckIn").value;
  const checkOut = document.getElementById("manualCheckOut").value;

  if (!unit || !checkIn || !checkOut) return showToast("Completa glamping y fechas.");
  if (checkOut <= checkIn) return showToast("La salida debe ser posterior al ingreso.");
  if (!isUnitAvailable(unit.id, checkIn, checkOut)) return showToast("Ese glamping no está disponible en esas fechas.");

  const nights = dateDiffNights(checkIn, checkOut);
  const lodgingTotal = unit.price * nights;
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
    fullName: document.getElementById("manualName").value.trim(),
    documentId: document.getElementById("manualDocument").value.trim(),
    country: "Ecuador",
    whatsappCode: document.getElementById("manualWhatsappCode").value.trim(),
    phoneNumber: document.getElementById("manualPhone").value.trim(),
    whatsappFull: `${document.getElementById("manualWhatsappCode").value.trim()} ${document.getElementById("manualPhone").value.trim()}`,
    email: "",
    city: "",
    transportType: "por_coordinar",
    arrivalTime: "",
    companions: [],
    services: [],
    foodAllergies: "",
    medicalNotes: "",
    notes: "",
    lodgingTotal,
    servicesTotal: 0,
    total: lodgingTotal,
    depositPercent: getSettings().depositPercent,
    depositRequired: lodgingTotal * (getSettings().depositPercent / 100),
    paidValue: paid,
    pendingBalance: lodgingTotal - paid,
    paymentDeadline: addHours(new Date(), getSettings().deadlineHours).toISOString(),
    policiesAccepted: true,
    dataUseAccepted: true,
    damagePolicyAccepted: true,
    checkinStatus: "pending",
    checkoutStatus: "pending",
    damageReported: false,
    damageValue: 0,
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

function renderAdminBookings() {
  const list = document.getElementById("adminBookingsList");
  if (!list) return;

  const search = document.getElementById("bookingSearch")?.value.toLowerCase() || "";
  const status = document.getElementById("bookingStatusFilter")?.value || "all";

  let bookings = getBookings();

  if (status !== "all") bookings = bookings.filter((b) => b.status === status);
  if (search) {
    bookings = bookings.filter((b) =>
      b.code.toLowerCase().includes(search) ||
      b.fullName.toLowerCase().includes(search) ||
      String(b.phoneNumber).toLowerCase().includes(search)
    );
  }

  bookings = [...bookings].reverse();

  list.innerHTML = bookings.length
    ? bookings.map(renderBookingAdminItem).join("")
    : `<p class="helper-note">No existen reservas con ese filtro.</p>`;
}

function renderBookingAdminItem(b) {
  return `
    <div class="admin-item">
      <div>
        <h4>${escapeHTML(b.code)} · ${escapeHTML(b.fullName)}</h4>
        <p>${escapeHTML(b.unitName)} · ${b.checkIn} al ${b.checkOut} · ${b.nights} noche(s)</p>
        <p>Total: <strong>${money(b.total)}</strong> · Pagado: <strong>${money(b.paidValue)}</strong> · Saldo: <strong>${money(b.pendingBalance)}</strong></p>
        <p>WhatsApp: ${escapeHTML(b.whatsappFull || "")} · Estado: <span class="status-badge status-${escapeHTML(b.status)}">${translateStatus(b.status)}</span></p>
      </div>

      <div class="item-actions">
        ${b.status === "pending" ? `
          <button class="action-btn confirm" onclick="confirmBooking('${b.code}')">Confirmar pago</button>
          <button class="action-btn danger" onclick="cancelBooking('${b.code}')">Cancelar</button>
        ` : ""}

        ${b.status === "confirmed" ? `
          <button class="action-btn" onclick="markCheckin('${b.code}')">Check-in</button>
          <button class="action-btn danger" onclick="cancelBooking('${b.code}')">Cancelar</button>
        ` : ""}

        ${b.status === "checked_in" ? `
          <button class="action-btn confirm" onclick="markCheckout('${b.code}')">Check-out</button>
        ` : ""}

        <button class="action-btn" onclick="copyBookingSummary('${b.code}')">Copiar</button>
      </div>
    </div>
  `;
}

function translateStatus(status) {
  const map = {
    pending: "Pendiente",
    confirmed: "Confirmada",
    cancelled: "Cancelada",
    expired: "Expirada",
    checked_in: "Check-in",
    completed: "Completada",
  };
  return map[status] || status;
}

function confirmBooking(code) {
  const bookings = getBookings().map((b) => {
    if (b.code !== code) return b;
    return {
      ...b,
      status: "confirmed",
      paidValue: b.depositRequired,
      pendingBalance: b.total - b.depositRequired,
      confirmedAt: new Date().toISOString(),
    };
  });

  setData(STORAGE_KEYS.bookings, bookings);
  renderAdminAll();
  renderGlampings();
  showToast("Reserva confirmada.");
}

function cancelBooking(code) {
  if (!confirm("¿Cancelar esta reserva y liberar fechas?")) return;

  const bookings = getBookings().map((b) => {
    if (b.code !== code) return b;
    return { ...b, status: "cancelled", cancelledAt: new Date().toISOString() };
  });

  setData(STORAGE_KEYS.bookings, bookings);
  renderAdminAll();
  renderGlampings();
  showToast("Reserva cancelada.");
}

function markCheckin(code) {
  const bookings = getBookings().map((b) => {
    if (b.code !== code) return b;
    return {
      ...b,
      status: "checked_in",
      checkinStatus: "done",
      checkinAt: new Date().toISOString(),
      paidValue: b.total,
      pendingBalance: 0,
    };
  });

  setData(STORAGE_KEYS.bookings, bookings);
  renderAdminAll();
  showToast("Check-in registrado.");
}

function markCheckout(code) {
  const bookings = getBookings().map((b) => {
    if (b.code !== code) return b;
    return {
      ...b,
      status: "completed",
      checkoutStatus: "done",
      checkoutAt: new Date().toISOString(),
    };
  });

  setData(STORAGE_KEYS.bookings, bookings);
  renderAdminAll();
  showToast("Check-out registrado.");
}

function copyBookingSummary(code) {
  const b = getBookings().find((x) => x.code === code);
  if (!b) return;

  const text = `
Reserva: ${b.code}
Cliente: ${b.fullName}
Documento: ${b.documentId}
WhatsApp: ${b.whatsappFull}
Glamping: ${b.unitName}
Fechas: ${b.checkIn} al ${b.checkOut}
Noches: ${b.nights}
Adultos: ${b.adults}
Niños: ${b.children}
Total: ${money(b.total)}
Pagado: ${money(b.paidValue)}
Saldo: ${money(b.pendingBalance)}
Estado: ${translateStatus(b.status)}
`.trim();

  navigator.clipboard.writeText(text);
  showToast("Resumen copiado.");
}

function renderAdminUnits() {
  const list = document.getElementById("adminUnitsList");
  if (!list) return;

  list.innerHTML = getUnits().map((unit) => `
    <div class="admin-item">
      <div>
        <h4>${escapeHTML(unit.name)} · ${money(unit.price)}</h4>
        <p>${escapeHTML(unit.descriptionEs || "")}</p>
        <p>Adultos máx: ${unit.adults} · Niños máx: ${unit.children} · <span class="status-badge">${unit.status}</span></p>
      </div>

      <div class="item-actions">
        <button class="action-btn" onclick="openUnitModal('${unit.id}')">Editar</button>
        <button class="action-btn danger" onclick="deleteUnit('${unit.id}')">Eliminar</button>
      </div>
    </div>
  `).join("");
}

function openUnitModal(unitId = null) {
  document.getElementById("unitForm").reset();

  if (unitId) {
    const u = getUnits().find((x) => x.id === unitId);
    document.getElementById("unitModalTitle").textContent = "Editar glamping";
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
    document.getElementById("unitModalTitle").textContent = "Agregar glamping";
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
    image: document.getElementById("unitImage").value.trim() || "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80",
    features: document.getElementById("unitFeatures").value.split(",").map((x) => x.trim()).filter(Boolean),
    status: document.getElementById("unitStatus").value,
  };

  const exists = units.some((u) => u.id === id);
  const updated = exists ? units.map((u) => u.id === id ? unit : u) : [...units, unit];

  setData(STORAGE_KEYS.units, updated);
  document.getElementById("unitModal").classList.add("hidden");
  renderAdminAll();
  renderGlampings();
  showToast("Glamping guardado.");
}

function deleteUnit(unitId) {
  if (!confirm("¿Eliminar este glamping?")) return;
  setData(STORAGE_KEYS.units, getUnits().filter((u) => u.id !== unitId));
  renderAdminAll();
  renderGlampings();
  showToast("Glamping eliminado.");
}

function renderAdminServices() {
  const list = document.getElementById("adminServicesList");
  if (!list) return;

  list.innerHTML = getServices().map((s) => `
    <div class="admin-item">
      <div>
        <h4>${escapeHTML(s.nameEs)} · ${money(s.price)}</h4>
        <p>${escapeHTML(s.descriptionEs || "")}</p>
        <p>Tipo: ${s.type === "food" ? "Alimentación" : "Experiencia / extra"} · Estado: <span class="status-badge">${s.active ? "Activo" : "Inactivo"}</span></p>
      </div>

      <div class="item-actions">
        <button class="action-btn" onclick="openServiceModal('${s.id}')">Editar</button>
        <button class="action-btn danger" onclick="deleteService('${s.id}')">Eliminar</button>
      </div>
    </div>
  `).join("");
}

function openServiceModal(serviceId = null) {
  document.getElementById("serviceForm").reset();

  if (serviceId) {
    const s = getServices().find((x) => x.id === serviceId);
    document.getElementById("serviceModalTitle").textContent = "Editar servicio";
    document.getElementById("serviceId").value = s.id;
    document.getElementById("serviceNameEs").value = s.nameEs;
    document.getElementById("serviceNameEn").value = s.nameEn;
    document.getElementById("serviceType").value = s.type;
    document.getElementById("servicePrice").value = s.price;
    document.getElementById("serviceDescriptionEs").value = s.descriptionEs || "";
    document.getElementById("serviceDescriptionEn").value = s.descriptionEn || "";
    document.getElementById("serviceActive").value = String(s.active);
  } else {
    document.getElementById("serviceModalTitle").textContent = "Agregar servicio";
    document.getElementById("serviceId").value = "";
    document.getElementById("serviceType").value = "food";
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
  const updated = exists ? services.map((s) => s.id === id ? service : s) : [...services, service];

  setData(STORAGE_KEYS.services, updated);
  document.getElementById("serviceModal").classList.add("hidden");
  renderAdminAll();
  if (selectedUnit) renderServicesForBooking();
  showToast("Servicio guardado.");
}

function deleteService(serviceId) {
  if (!confirm("¿Eliminar este servicio?")) return;
  setData(STORAGE_KEYS.services, getServices().filter((s) => s.id !== serviceId));
  renderAdminAll();
  showToast("Servicio eliminado.");
}

function renderFinance() {
  const bookings = getBookings();
  const expenses = getExpenses();
  const activeIncomeBookings = bookings.filter((b) => ["confirmed", "checked_in", "completed"].includes(b.status));

  const income = activeIncomeBookings.reduce((sum, b) => sum + Number(b.total || 0), 0);
  const expenseTotal = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const net = income - expenseTotal;

  const units = getUnits().filter((u) => u.status === "active").length || 1;
  const days = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0).getDate();
  const soldNights = activeIncomeBookings.reduce((sum, b) => sum + Number(b.nights || 0), 0);
  const occupancy = Math.min(100, Math.round((soldNights / (units * days)) * 100));

  document.getElementById("financeIncome").textContent = money(income);
  document.getElementById("financeExpenses").textContent = money(expenseTotal);
  document.getElementById("financeNet").textContent = money(net);
  document.getElementById("financeOccupancy").textContent = `${occupancy}%`;

  const list = document.getElementById("expensesList");
  list.innerHTML = expenses.length ? expenses.map((e) => `
    <div class="admin-item">
      <div>
        <h4>${escapeHTML(e.category)} · ${money(e.amount)}</h4>
        <p>${e.date} · ${escapeHTML(e.description || "")}</p>
      </div>
      <div class="item-actions">
        <button class="action-btn danger" onclick="deleteExpense('${e.id}')">Eliminar</button>
      </div>
    </div>
  `).join("") : `<p class="helper-note">Todavía no existen egresos registrados.</p>`;
}

function saveExpense(e) {
  e.preventDefault();

  const expenses = getExpenses();
  expenses.push({
    id: `EGR${Date.now()}`,
    date: document.getElementById("expenseDate").value,
    category: document.getElementById("expenseCategory").value.trim(),
    amount: Number(document.getElementById("expenseAmount").value),
    description: document.getElementById("expenseDescription").value.trim(),
  });

  setData(STORAGE_KEYS.expenses, expenses);
  document.getElementById("expenseModal").classList.add("hidden");
  renderAdminAll();
  showToast("Egreso guardado.");
}

function deleteExpense(id) {
  if (!confirm("¿Eliminar egreso?")) return;
  setData(STORAGE_KEYS.expenses, getExpenses().filter((e) => e.id !== id));
  renderAdminAll();
  showToast("Egreso eliminado.");
}

function renderSpecialDates() {
  const list = document.getElementById("specialDatesList");
  if (!list) return;

  const specials = getSpecials();

  list.innerHTML = specials.length ? specials.map((s) => `
    <div class="admin-item">
      <div>
        <h4>${escapeHTML(s.name)} · ${s.date || "Sin fecha"} · ${money(s.price || 0)}</h4>
        <p>${escapeHTML(s.description || "")}</p>
        <p>Estado: <span class="status-badge">${s.active ? "Activo" : "Inactivo"}</span></p>
      </div>
      <div class="item-actions">
        <button class="action-btn" onclick="openSpecialModal('${s.id}')">Editar</button>
        <button class="action-btn danger" onclick="deleteSpecialDate('${s.id}')">Eliminar</button>
      </div>
    </div>
  `).join("") : `<p class="helper-note">Todavía no existen fechas especiales.</p>`;
}

function openSpecialModal(id = null) {
  document.getElementById("specialDateForm").reset();

  if (id) {
    const s = getSpecials().find((x) => x.id === id);
    document.getElementById("specialDateId").value = s.id;
    document.getElementById("specialName").value = s.name;
    document.getElementById("specialDate").value = s.date || "";
    document.getElementById("specialPrice").value = s.price || 0;
    document.getElementById("specialDescription").value = s.description || "";
    document.getElementById("specialActive").value = String(s.active);
  } else {
    document.getElementById("specialDateId").value = "";
    document.getElementById("specialActive").value = "true";
  }

  document.getElementById("specialDateModal").classList.remove("hidden");
}

function saveSpecialDate(e) {
  e.preventDefault();

  const specials = getSpecials();
  const id = document.getElementById("specialDateId").value || `SP${Date.now()}`;

  const special = {
    id,
    name: document.getElementById("specialName").value.trim(),
    date: document.getElementById("specialDate").value,
    price: Number(document.getElementById("specialPrice").value || 0),
    description: document.getElementById("specialDescription").value.trim(),
    active: document.getElementById("specialActive").value === "true",
  };

  const exists = specials.some((s) => s.id === id);
  const updated = exists ? specials.map((s) => s.id === id ? special : s) : [...specials, special];

  setData(STORAGE_KEYS.specials, updated);
  document.getElementById("specialDateModal").classList.add("hidden");
  renderSpecialDates();
  showToast("Fecha especial guardada.");
}

function deleteSpecialDate(id) {
  if (!confirm("¿Eliminar fecha especial?")) return;
  setData(STORAGE_KEYS.specials, getSpecials().filter((s) => s.id !== id));
  renderSpecialDates();
  showToast("Fecha especial eliminada.");
}

function renderSettingsForm() {
  const s = getSettings();

  document.getElementById("settingBusinessName").value = s.businessName || "";
  document.getElementById("settingSubtitle").value = s.subtitle || "";
  document.getElementById("settingLogoUrl").value = s.logoUrl || "";
  document.getElementById("settingHeroImage").value = s.heroImage || "";
  document.getElementById("settingWhatsappCode").value = s.whatsappCode || "+593";
  document.getElementById("settingWhatsappNumber").value = s.whatsappNumber || "";
  document.getElementById("settingCheckin").value = s.checkin || "15:00";
  document.getElementById("settingCheckout").value = s.checkout || "11:00";
  document.getElementById("settingDeposit").value = String(s.depositPercent || 50);
  document.getElementById("settingDeadlineHours").value = String(s.deadlineHours || 48);
}

function saveSettings(e) {
  e.preventDefault();

  const settings = {
    ...getSettings(),
    businessName: document.getElementById("settingBusinessName").value.trim(),
    subtitle: document.getElementById("settingSubtitle").value.trim(),
    logoUrl: document.getElementById("settingLogoUrl").value.trim(),
    heroImage: document.getElementById("settingHeroImage").value.trim(),
    whatsappCode: document.getElementById("settingWhatsappCode").value.trim(),
    whatsappNumber: document.getElementById("settingWhatsappNumber").value.trim(),
    checkin: document.getElementById("settingCheckin").value,
    checkout: document.getElementById("settingCheckout").value,
    depositPercent: Number(document.getElementById("settingDeposit").value),
    deadlineHours: Number(document.getElementById("settingDeadlineHours").value),
  };

  setData(STORAGE_KEYS.settings, settings);
  applySettings();
  renderAdminAll();
  showToast("Configuración guardada.");
}
