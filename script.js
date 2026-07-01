/* =========================================================
   GLAMPING RESERVAS - SCRIPT DEMO
   Funciona sin Google Sheets por ahora usando localStorage.
   Después conectamos Apps Script.
========================================================= */

/* =========================
   ESTADO BASE
========================= */

const STORAGE_KEYS = {
  settings: "glamping_settings",
  units: "glamping_units",
  bookings: "glamping_bookings",
  breakfasts: "glamping_breakfasts",
  extras: "glamping_extras",
  adminSession: "glamping_admin_session",
};

let currentLang = "es";
let selectedSearch = null;
let selectedUnit = null;
let selectedExtras = [];
let companions = [];

/* =========================
   TRADUCCIONES
========================= */

const i18n = {
  es: {
    hero_eyebrow: "Zuleta · Ibarra · Ecuador",
    hero_title: "Reserva tu experiencia de glamping",
    hero_text: "Cabañas privadas en la naturaleza, con vista, comodidad y atención personalizada.",
    badge_private: "Privado",
    badge_breakfast: "Desayunos",
    badge_nature: "Naturaleza",
    step_1: "Paso 1",
    search_title: "Consulta disponibilidad",
    search_text: "Selecciona tus fechas para ver qué glampings están disponibles.",
    checkin: "Fecha de ingreso",
    checkout: "Fecha de salida",
    adults: "Adultos",
    children: "Niños",
    search_button: "Buscar disponibilidad",
    step_2: "Paso 2",
    choose_glamping: "Elige tu glamping",
    choose_glamping_text: "Selecciona una unidad disponible para continuar con tu reserva.",
    step_3: "Paso 3",
    reservation_details: "Datos de reserva",
    reservation_details_text: "Ingresa la información real de la persona responsable de la reserva.",
    breakfast_title: "Desayuno y extras",
    breakfast_option: "Tipo de desayuno",
    holder_data: "Datos del titular",
    full_name: "Nombre completo",
    document: "Cédula / Pasaporte",
    country: "País",
    whatsapp: "WhatsApp",
    phone_help: "Puedes escribir el número con cero inicial.",
    email: "Correo electrónico",
    city: "Ciudad",
    arrival_time: "Hora estimada de llegada",
    arrival_method: "Medio de llegada",
    own_transport: "Vehículo propio",
    project_transport: "Transporte del glamping",
    other: "Otro",
    companions: "Acompañantes",
    add_companion: "Agregar",
    health_notes: "Alergias y observaciones",
    allergies: "Alergias alimentarias o médicas",
    notes: "Observaciones adicionales",
    payment_summary: "Resumen de pago",
    total_reservation: "Total reserva",
    pending_balance: "Saldo pendiente al check-in",
    payment_note: "La reserva queda pendiente hasta confirmar el pago por WhatsApp.",
    policies_title: "Políticas de reserva",
    deposit_policy_title: "Abono:",
    deposit_policy: "Para confirmar la reserva se requiere el abono configurado por administración.",
    cancel_policy_title: "Cancelación:",
    cancel_policy: "Si el huésped cancela después de abonar, se aplicará una penalidad equivalente al 50% del valor abonado.",
    damage_policy_title: "Daños:",
    damage_policy: "Daños menores tendrán una multa base de $150. Daños superiores serán cobrados según evaluación administrativa.",
    data_policy_title: "Datos:",
    data_policy: "La información ingresada será usada para fines administrativos, seguridad y atención de la reserva.",
    accept_policies: "Acepto las políticas de reserva, cancelación, daños y uso administrativo de datos.",
    send_reservation: "Generar reserva y continuar por WhatsApp",
    general_policies: "Información importante",
    checkin_checkout: "Check-in / Check-out",
    payment: "Pago",
    payment_info: "La reserva se confirma solo con abono validado por administración.",
    security: "Seguridad",
    security_info: "Los datos de huéspedes y acompañantes son obligatorios para control interno.",
    footer_text: "Sistema de reservas administrable para hospedajes boutique.",
  },

  en: {
    hero_eyebrow: "Zuleta · Ibarra · Ecuador",
    hero_title: "Book your glamping experience",
    hero_text: "Private cabins in nature, with views, comfort, and personalized service.",
    badge_private: "Private",
    badge_breakfast: "Breakfast",
    badge_nature: "Nature",
    step_1: "Step 1",
    search_title: "Check availability",
    search_text: "Select your dates to see available glamping units.",
    checkin: "Check-in date",
    checkout: "Check-out date",
    adults: "Adults",
    children: "Children",
    search_button: "Search availability",
    step_2: "Step 2",
    choose_glamping: "Choose your glamping",
    choose_glamping_text: "Select an available unit to continue your booking.",
    step_3: "Step 3",
    reservation_details: "Booking details",
    reservation_details_text: "Enter real information for the person responsible for the booking.",
    breakfast_title: "Breakfast and extras",
    breakfast_option: "Breakfast option",
    holder_data: "Guest information",
    full_name: "Full name",
    document: "ID / Passport",
    country: "Country",
    whatsapp: "WhatsApp",
    phone_help: "You may enter the phone number with initial zero.",
    email: "Email",
    city: "City",
    arrival_time: "Estimated arrival time",
    arrival_method: "Arrival method",
    own_transport: "Own vehicle",
    project_transport: "Glamping transport",
    other: "Other",
    companions: "Companions",
    add_companion: "Add",
    health_notes: "Allergies and notes",
    allergies: "Food or medical allergies",
    notes: "Additional notes",
    payment_summary: "Payment summary",
    total_reservation: "Reservation total",
    pending_balance: "Balance due at check-in",
    payment_note: "The booking remains pending until payment is confirmed by WhatsApp.",
    policies_title: "Booking policies",
    deposit_policy_title: "Deposit:",
    deposit_policy: "To confirm the booking, the deposit configured by administration is required.",
    cancel_policy_title: "Cancellation:",
    cancel_policy: "If the guest cancels after paying a deposit, a penalty equivalent to 50% of the deposit will apply.",
    damage_policy_title: "Damages:",
    damage_policy: "Minor damages have a base penalty of $150. Higher damages will be charged according to administrative evaluation.",
    data_policy_title: "Data:",
    data_policy: "The information entered will be used for administration, security, and booking service.",
    accept_policies: "I accept the booking, cancellation, damage, and administrative data-use policies.",
    send_reservation: "Create booking and continue by WhatsApp",
    general_policies: "Important information",
    checkin_checkout: "Check-in / Check-out",
    payment: "Payment",
    payment_info: "The booking is confirmed only after payment is validated by administration.",
    security: "Security",
    security_info: "Guest and companion data are required for internal control.",
    footer_text: "Manageable booking system for boutique stays.",
  },
};

/* =========================
   DATOS DEMO INICIALES
========================= */

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
    children: 1,
    status: "active",
    image: "https://images.unsplash.com/photo-1563299796-17596ed6b017?auto=format&fit=crop&w=1200&q=80",
    descriptionEs: "Cabaña privada ideal para pareja, con vista a la naturaleza y ambiente cálido.",
    descriptionEn: "Private cabin ideal for couples, with nature views and a warm atmosphere.",
    features: ["Baño privado", "Ducha", "Cama 2 plazas", "Vista natural"],
  },
  {
    id: "G002",
    name: "Refugio Laguna",
    price: 75,
    adults: 2,
    children: 1,
    status: "active",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
    descriptionEs: "Glamping tipo refugio con mejor privacidad, perfecto para fechas especiales.",
    descriptionEn: "Refuge-style glamping with extra privacy, perfect for special dates.",
    features: ["Baño privado", "Calefón", "Deck frontal", "Luces cálidas"],
  },
  {
    id: "G003",
    name: "Cumbre A-Frame",
    price: 85,
    adults: 2,
    children: 2,
    status: "active",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80",
    descriptionEs: "Unidad premium estilo A-frame, con mejor vista y experiencia más completa.",
    descriptionEn: "Premium A-frame unit, with better views and a more complete experience.",
    features: ["A-frame", "Vista panorámica", "Baño privado", "Desayuno opcional"],
  },
];

const defaultBreakfasts = [
  {
    id: "B0",
    nameEs: "Sin desayuno",
    nameEn: "No breakfast",
    descriptionEs: "Reserva sin desayuno.",
    descriptionEn: "Booking without breakfast.",
    price: 0,
    active: true,
  },
  {
    id: "B1",
    nameEs: "Desayuno básico",
    nameEn: "Basic breakfast",
    descriptionEs: "Café o aromática, pan, huevos y fruta.",
    descriptionEn: "Coffee or herbal tea, bread, eggs, and fruit.",
    price: 10,
    active: true,
  },
  {
    id: "B2",
    nameEs: "Desayuno andino",
    nameEn: "Andean breakfast",
    descriptionEs: "Café, pan de casa, queso, huevos, fruta y jugo natural.",
    descriptionEn: "Coffee, house bread, cheese, eggs, fruit, and natural juice.",
    price: 15,
    active: true,
  },
  {
    id: "B3",
    nameEs: "Desayuno premium romántico",
    nameEn: "Premium romantic breakfast",
    descriptionEs: "Bandeja especial para pareja con detalle romántico.",
    descriptionEn: "Special couple tray with romantic detail.",
    price: 25,
    active: true,
  },
];

const defaultExtras = [
  {
    id: "E1",
    nameEs: "Cama adicional",
    nameEn: "Extra bed",
    price: 15,
    active: true,
  },
  {
    id: "E2",
    nameEs: "Cuna",
    nameEn: "Crib",
    price: 10,
    active: true,
  },
  {
    id: "E3",
    nameEs: "Decoración romántica",
    nameEn: "Romantic decoration",
    price: 20,
    active: true,
  },
  {
    id: "E4",
    nameEs: "Fogata",
    nameEn: "Campfire",
    price: 10,
    active: true,
  },
  {
    id: "E5",
    nameEs: "Transporte / buseta",
    nameEn: "Transport / shuttle",
    price: 15,
    active: true,
  },
];

/* =========================
   HELPERS
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

function money(value) {
  const settings = getSettings();
  return `${settings.currency}${Number(value || 0).toFixed(2)}`;
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

function getBreakfasts() {
  return getData(STORAGE_KEYS.breakfasts, defaultBreakfasts);
}

function getExtras() {
  return getData(STORAGE_KEYS.extras, defaultExtras);
}

function saveBookings(bookings) {
  setData(STORAGE_KEYS.bookings, bookings);
}

function todayISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().split("T")[0];
}

function addHours(date, hours) {
  const d = new Date(date);
  d.setHours(d.getHours() + Number(hours));
  return d;
}

function dateDiffNights(checkIn, checkOut) {
  const a = new Date(checkIn);
  const b = new Date(checkOut);
  const diff = b - a;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
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

function escapeHTML(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isUnitAvailable(unitId, checkIn, checkOut) {
  const bookings = getBookings();
  const blockingStates = ["pending", "confirmed", "checked_in"];

  return !bookings.some((b) => {
    if (b.unitId !== unitId) return false;
    if (!blockingStates.includes(b.status)) return false;
    return rangesOverlap(checkIn, checkOut, b.checkIn, b.checkOut);
  });
}

function expireOldPendingBookings() {
  const settings = getSettings();
  const bookings = getBookings();
  let changed = false;

  const updated = bookings.map((b) => {
    if (b.status !== "pending") return b;
    const limit = new Date(b.paymentDeadline);
    if (new Date() > limit) {
      changed = true;
      return { ...b, status: "expired", expiredAt: new Date().toISOString() };
    }
    return b;
  });

  if (changed) {
    saveBookings(updated);
  }
}

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
  seedInitialData();
  expireOldPendingBookings();
  setupDates();
  bindEvents();
  applySettingsToPublic();
  renderTranslations();
  renderGlampings();
  renderAdminAll();

  if (localStorage.getItem(STORAGE_KEYS.adminSession) === "true") {
    openAdminPanel();
  }
});

function seedInitialData() {
  if (!localStorage.getItem(STORAGE_KEYS.settings)) {
    setData(STORAGE_KEYS.settings, defaultSettings);
  }

  if (!localStorage.getItem(STORAGE_KEYS.units)) {
    setData(STORAGE_KEYS.units, defaultUnits);
  }

  if (!localStorage.getItem(STORAGE_KEYS.breakfasts)) {
    setData(STORAGE_KEYS.breakfasts, defaultBreakfasts);
  }

  if (!localStorage.getItem(STORAGE_KEYS.extras)) {
    setData(STORAGE_KEYS.extras, defaultExtras);
  }

  if (!localStorage.getItem(STORAGE_KEYS.bookings)) {
    setData(STORAGE_KEYS.bookings, []);
  }
}

function setupDates() {
  const min = todayISO();
  const checkIn = document.getElementById("checkIn");
  const checkOut = document.getElementById("checkOut");

  checkIn.min = min;
  checkOut.min = min;

  checkIn.addEventListener("change", () => {
    checkOut.min = checkIn.value || min;

    if (checkOut.value && checkOut.value <= checkIn.value) {
      const next = new Date(checkIn.value);
      next.setDate(next.getDate() + 1);
      checkOut.value = next.toISOString().split("T")[0];
    }
  });
}

/* =========================
   EVENTOS
========================= */

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

  document.getElementById("closeReservationPanel").addEventListener("click", closeReservationPanel);
  document.getElementById("reservationForm").addEventListener("submit", handleReservationSubmit);

  document.getElementById("breakfastSelect").addEventListener("change", updateReservationTotals);

  document.getElementById("addCompanionBtn").addEventListener("click", addCompanion);

  document.getElementById("openAdminBtn").addEventListener("click", openAdminLogin);
  document.getElementById("closeAdminLogin").addEventListener("click", closeAdminLogin);
  document.getElementById("adminLoginForm").addEventListener("submit", handleAdminLogin);
  document.getElementById("logoutAdminBtn").addEventListener("click", logoutAdmin);
  document.getElementById("backToPublicBtn").addEventListener("click", backToPublic);

  document.querySelectorAll(".admin-nav").forEach((btn) => {
    btn.addEventListener("click", () => {
      switchAdminSection(btn.dataset.section);
    });
  });

  document.getElementById("settingsForm").addEventListener("submit", handleSettingsSave);
  document.getElementById("addUnitBtn").addEventListener("click", () => openUnitModal());
  document.getElementById("closeUnitModal").addEventListener("click", closeUnitModal);
  document.getElementById("unitForm").addEventListener("submit", handleUnitSave);

  document.getElementById("bookingSearch").addEventListener("input", renderAdminBookings);
  document.getElementById("bookingStatusFilter").addEventListener("change", renderAdminBookings);
}

/* =========================
   TRADUCCIONES
========================= */

function renderTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (i18n[currentLang][key]) {
      el.textContent = i18n[currentLang][key];
    }
  });
}

/* =========================
   AJUSTES PÚBLICOS
========================= */

function applySettingsToPublic() {
  const settings = getSettings();

  document.getElementById("publicBusinessName").textContent = settings.businessName || "Glamping Boutique";
  document.getElementById("publicBusinessSubtitle").textContent = settings.subtitle || "";
  document.getElementById("footerBusinessName").textContent = settings.businessName || "Glamping Boutique";

  const logo = document.getElementById("publicLogo");
  if (settings.logoUrl) {
    logo.innerHTML = `<img src="${escapeHTML(settings.logoUrl)}" alt="Logo" />`;
  } else {
    logo.innerHTML = `<i class="fa-solid fa-mountain-sun"></i>`;
  }

  if (settings.heroImage) {
    document.querySelector(".hero").style.background = `
      linear-gradient(180deg, rgba(31, 61, 43, 0.08), rgba(31, 61, 43, 0.72)),
      url("${settings.heroImage}") center/cover
    `;
  }

  document.getElementById("checkInOutText").textContent =
    `Ingreso desde ${settings.checkin} · Salida hasta ${settings.checkout}`;
}

/* =========================
   DISPONIBILIDAD / GLAMPINGS
========================= */

function handleAvailabilitySearch(e) {
  e.preventDefault();

  const checkIn = document.getElementById("checkIn").value;
  const checkOut = document.getElementById("checkOut").value;
  const adults = Number(document.getElementById("adults").value);
  const children = Number(document.getElementById("children").value);

  if (!checkIn || !checkOut) {
    showToast("Selecciona fecha de ingreso y salida.");
    return;
  }

  if (checkOut <= checkIn) {
    showToast("La fecha de salida debe ser posterior a la fecha de ingreso.");
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
  const units = getUnits().filter((u) => u.status === "active");

  if (!units.length) {
    list.innerHTML = `<p>No existen glampings activos.</p>`;
    return;
  }

  list.innerHTML = units
    .map((unit) => {
      const available = selectedSearch
        ? isUnitAvailable(unit.id, selectedSearch.checkIn, selectedSearch.checkOut)
        : true;

      const description = currentLang === "en" ? unit.descriptionEn : unit.descriptionEs;
      const buttonText = available ? (currentLang === "en" ? "Book" : "Reservar") : (currentLang === "en" ? "Unavailable" : "No disponible");

      return `
        <article class="glamping-card">
          <div class="glamping-img">
            <img src="${escapeHTML(unit.image)}" alt="${escapeHTML(unit.name)}" />
            <span class="glamping-status">${available ? "Disponible" : "Ocupado / pendiente"}</span>
          </div>

          <div class="glamping-body">
            <h4>${escapeHTML(unit.name)}</h4>
            <p>${escapeHTML(description)}</p>

            <div class="features">
              ${(unit.features || []).map((f) => `<span>${escapeHTML(f)}</span>`).join("")}
            </div>

            <div class="glamping-footer">
              <div class="price">
                <span>Desde</span>
                <strong>${money(unit.price)}</strong>
                <span>por noche</span>
              </div>

              <button 
                class="primary-btn small-btn"
                ${available ? "" : "disabled"}
                onclick="openReservationPanel('${unit.id}')"
              >
                ${buttonText}
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

/* =========================
   PANEL RESERVA
========================= */

function openReservationPanel(unitId) {
  if (!selectedSearch) {
    showToast("Primero selecciona las fechas de ingreso y salida.");
    document.querySelector(".booking-search").scrollIntoView({ behavior: "smooth" });
    return;
  }

  const units = getUnits();
  const unit = units.find((u) => u.id === unitId);

  if (!unit) return;

  if (!isUnitAvailable(unit.id, selectedSearch.checkIn, selectedSearch.checkOut)) {
    showToast("Esta fecha ya no está disponible para este glamping.");
    renderGlampings();
    return;
  }

  selectedUnit = unit;
  selectedExtras = [];
  companions = [];

  document.getElementById("summaryImage").src = unit.image;
  document.getElementById("summaryGlampingName").textContent = unit.name;
  document.getElementById("summaryDates").textContent =
    `${selectedSearch.checkIn} → ${selectedSearch.checkOut} · ${selectedSearch.nights} noche(s)`;
  document.getElementById("summaryGuests").textContent =
    `${selectedSearch.adults} adulto(s) · ${selectedSearch.children} niño(s)`;
  document.getElementById("summaryPrice").textContent =
    `${money(unit.price)} / noche`;

  renderBreakfastSelect();
  renderExtras();
  renderCompanions();
  updateReservationTotals();

  document.getElementById("reservationPanel").classList.remove("hidden");
}

function closeReservationPanel() {
  document.getElementById("reservationPanel").classList.add("hidden");
}

function renderBreakfastSelect() {
  const select = document.getElementById("breakfastSelect");
  const breakfasts = getBreakfasts().filter((b) => b.active);

  select.innerHTML = breakfasts
    .map((b) => {
      const name = currentLang === "en" ? b.nameEn : b.nameEs;
      const desc = currentLang === "en" ? b.descriptionEn : b.descriptionEs;
      return `
        <option value="${b.id}">
          ${escapeHTML(name)} · ${money(b.price)} · ${escapeHTML(desc)}
        </option>
      `;
    })
    .join("");
}

function renderExtras() {
  const container = document.getElementById("extrasList");
  const extras = getExtras().filter((e) => e.active);

  container.innerHTML = extras
    .map((extra) => {
      const name = currentLang === "en" ? extra.nameEn : extra.nameEs;
      return `
        <label class="extra-item">
          <input type="checkbox" value="${extra.id}" onchange="toggleExtra('${extra.id}', this.checked)" />
          <span>
            <strong>${escapeHTML(name)}</strong><br />
            <small>${money(extra.price)}</small>
          </span>
        </label>
      `;
    })
    .join("");
}

function toggleExtra(extraId, checked) {
  if (checked) {
    if (!selectedExtras.includes(extraId)) selectedExtras.push(extraId);
  } else {
    selectedExtras = selectedExtras.filter((id) => id !== extraId);
  }

  updateReservationTotals();
}

function calculateTotals() {
  const settings = getSettings();
  const breakfasts = getBreakfasts();
  const extras = getExtras();

  const breakfastId = document.getElementById("breakfastSelect").value;
  const breakfast = breakfasts.find((b) => b.id === breakfastId);

  const lodgingTotal = selectedUnit.price * selectedSearch.nights;
  const breakfastTotal = breakfast ? breakfast.price : 0;

  const extrasTotal = selectedExtras.reduce((sum, id) => {
    const ex = extras.find((e) => e.id === id);
    return sum + (ex ? Number(ex.price) : 0);
  }, 0);

  const total = lodgingTotal + breakfastTotal + extrasTotal;
  const deposit = total * (Number(settings.depositPercent) / 100);
  const pending = total - deposit;

  return {
    lodgingTotal,
    breakfastTotal,
    extrasTotal,
    total,
    deposit,
    pending,
  };
}

function updateReservationTotals() {
  if (!selectedUnit || !selectedSearch) return;

  const settings = getSettings();
  const totals = calculateTotals();

  document.getElementById("totalReservation").textContent = money(totals.total);
  document.getElementById("requiredDeposit").textContent = money(totals.deposit);
  document.getElementById("pendingBalance").textContent = money(totals.pending);
  document.getElementById("depositLabel").textContent =
    `Abono requerido (${settings.depositPercent}%)`;
}

/* =========================
   ACOMPAÑANTES
========================= */

function addCompanion() {
  const id = `C${Date.now()}`;
  companions.push({
    id,
    name: "",
    document: "",
    age: "",
    type: "adulto",
    relation: "",
    allergies: "",
  });

  renderCompanions();
}

function removeCompanion(id) {
  companions = companions.filter((c) => c.id !== id);
  renderCompanions();
}

function renderCompanions() {
  const list = document.getElementById("companionsList");

  if (!companions.length) {
    list.innerHTML = `<p style="color: var(--muted); margin: 0;">No se han agregado acompañantes.</p>`;
    return;
  }

  list.innerHTML = companions
    .map((c, index) => `
      <div class="companion-card">
        <button type="button" class="remove-companion" onclick="removeCompanion('${c.id}')">
          <i class="fa-solid fa-trash"></i>
        </button>

        <div class="form-grid">
          <div class="field">
            <label>Nombre completo</label>
            <input type="text" data-companion="${c.id}" data-field="name" onchange="updateCompanion(this)" required />
          </div>

          <div class="field">
            <label>Cédula / Pasaporte</label>
            <input type="text" data-companion="${c.id}" data-field="document" onchange="updateCompanion(this)" required />
          </div>

          <div class="field">
            <label>Edad</label>
            <input type="number" data-companion="${c.id}" data-field="age" onchange="updateCompanion(this)" required />
          </div>

          <div class="field">
            <label>Tipo</label>
            <select data-companion="${c.id}" data-field="type" onchange="updateCompanion(this)">
              <option value="adulto">Adulto</option>
              <option value="niño">Niño</option>
            </select>
          </div>

          <div class="field">
            <label>Relación</label>
            <input type="text" data-companion="${c.id}" data-field="relation" onchange="updateCompanion(this)" placeholder="Pareja, hijo, familiar..." />
          </div>

          <div class="field">
            <label>Alergias / observaciones</label>
            <input type="text" data-companion="${c.id}" data-field="allergies" onchange="updateCompanion(this)" />
          </div>
        </div>
      </div>
    `)
    .join("");
}

function updateCompanion(input) {
  const id = input.dataset.companion;
  const field = input.dataset.field;

  companions = companions.map((c) => {
    if (c.id === id) return { ...c, [field]: input.value };
    return c;
  });
}

/* =========================
   CREAR RESERVA
========================= */

function handleReservationSubmit(e) {
  e.preventDefault();

  if (!selectedUnit || !selectedSearch) {
    showToast("No existe glamping o fechas seleccionadas.");
    return;
  }

  if (!document.getElementById("acceptPolicies").checked) {
    showToast("Debes aceptar las políticas para continuar.");
    return;
  }

  if (!isUnitAvailable(selectedUnit.id, selectedSearch.checkIn, selectedSearch.checkOut)) {
    showToast("La fecha ya no está disponible.");
    renderGlampings();
    closeReservationPanel();
    return;
  }

  const settings = getSettings();
  const breakfasts = getBreakfasts();
  const extras = getExtras();
  const totals = calculateTotals();

  const breakfastId = document.getElementById("breakfastSelect").value;
  const breakfast = breakfasts.find((b) => b.id === breakfastId);

  const selectedExtraObjects = selectedExtras
    .map((id) => extras.find((e) => e.id === id))
    .filter(Boolean);

  const code = generateBookingCode();
  const now = new Date();
  const deadline = addHours(now, settings.deadlineHours);

  const booking = {
    code,
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
    country: document.getElementById("country").value.trim(),
    whatsappCode: document.getElementById("countryCode").value,
    phoneNumber: document.getElementById("phoneNumber").value.trim(),
    email: document.getElementById("email").value.trim(),
    city: document.getElementById("city").value.trim(),
    arrivalTime: document.getElementById("arrivalTime").value,
    transportType: document.getElementById("transportType").value,

    breakfastId,
    breakfastName: breakfast ? (currentLang === "en" ? breakfast.nameEn : breakfast.nameEs) : "",
    breakfastPrice: breakfast ? breakfast.price : 0,

    extras: selectedExtraObjects.map((e) => ({
      id: e.id,
      name: currentLang === "en" ? e.nameEn : e.nameEs,
      price: e.price,
    })),

    companions,
    allergies: document.getElementById("allergies").value.trim(),
    notes: document.getElementById("notes").value.trim(),

    total: totals.total,
    depositPercent: settings.depositPercent,
    depositRequired: totals.deposit,
    paidValue: 0,
    pendingBalance: totals.pending,
    paymentDeadline: deadline.toISOString(),

    policiesAccepted: true,
    dataUseAccepted: true,
    damagePolicyAccepted: true,

    checkinStatus: "pending",
    checkoutStatus: "pending",
    damageReported: false,
    damageValue: 0,
    adminNotes: "",
  };

  const bookings = getBookings();
  bookings.push(booking);
  saveBookings(bookings);

  showToast(`Reserva generada: ${code}. Se abrirá WhatsApp.`);
  closeReservationPanel();
  renderGlampings();
  renderAdminAll();

  openWhatsappForBooking(booking);
}

function openWhatsappForBooking(booking) {
  const settings = getSettings();

  const rawNumber = `${settings.whatsappCode}${settings.whatsappNumber}`.replace(/[^\d+]/g, "");
  const phone = rawNumber.replace("+", "");

  const extrasText = booking.extras.length
    ? booking.extras.map((e) => `${e.name} (${money(e.price)})`).join(", ")
    : "Sin extras";

  const companionsText = booking.companions.length
    ? booking.companions.map((c) => `${c.name} - ${c.document} - ${c.age} años`).join(" | ")
    : "Sin acompañantes registrados";

  const message = `
Hola, deseo confirmar mi reserva ${booking.code}.

Nombre: ${booking.fullName}
Documento: ${booking.documentId}
WhatsApp: ${booking.whatsappCode} ${booking.phoneNumber}
Correo: ${booking.email}

Glamping: ${booking.unitName}
Fechas: ${booking.checkIn} al ${booking.checkOut}
Noches: ${booking.nights}
Adultos: ${booking.adults}
Niños: ${booking.children}

Desayuno: ${booking.breakfastName}
Extras: ${extrasText}
Acompañantes: ${companionsText}

Total: ${money(booking.total)}
Abono requerido (${booking.depositPercent}%): ${money(booking.depositRequired)}
Saldo pendiente: ${money(booking.pendingBalance)}

Alergias: ${booking.allergies || "Ninguna"}
Observaciones: ${booking.notes || "Ninguna"}

Quedo atento para realizar el pago.
  `.trim();

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

/* =========================
   ADMIN LOGIN
========================= */

function openAdminLogin() {
  document.getElementById("adminLogin").classList.remove("hidden");
}

function closeAdminLogin() {
  document.getElementById("adminLogin").classList.add("hidden");
}

function handleAdminLogin(e) {
  e.preventDefault();

  const user = document.getElementById("adminUser").value.trim();
  const pass = document.getElementById("adminPass").value.trim();

  if (user === "admin" && pass === "admin123") {
    localStorage.setItem(STORAGE_KEYS.adminSession, "true");
    closeAdminLogin();
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
  document.querySelectorAll(".admin-nav").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.section === section);
  });

  document.querySelectorAll(".admin-section").forEach((sec) => {
    sec.classList.remove("active");
  });

  document.getElementById(`admin-${section}`).classList.add("active");

  const titles = {
    dashboard: "Dashboard",
    settings: "Configuración",
    units: "Glampings",
    bookings: "Reservas",
    services: "Desayunos / Extras",
  };

  document.getElementById("adminSectionTitle").textContent = titles[section] || "Admin";
}

/* =========================
   ADMIN RENDER
========================= */

function renderAdminAll() {
  renderAdminDashboard();
  renderAdminSettings();
  renderAdminUnits();
  renderAdminBookings();
  renderAdminServices();
}

function renderAdminDashboard() {
  const bookings = getBookings();
  const units = getUnits();

  const pending = bookings.filter((b) => b.status === "pending").length;
  const confirmed = bookings.filter((b) => b.status === "confirmed").length;
  const revenue = bookings
    .filter((b) => ["confirmed", "checked_in", "completed"].includes(b.status))
    .reduce((sum, b) => sum + Number(b.total || 0), 0);

  document.getElementById("statPending").textContent = pending;
  document.getElementById("statConfirmed").textContent = confirmed;
  document.getElementById("statRevenue").textContent = money(revenue);
  document.getElementById("statUnits").textContent = units.filter((u) => u.status === "active").length;

  const recent = document.getElementById("recentBookings");
  const last = [...bookings].reverse().slice(0, 6);

  if (!last.length) {
    recent.innerHTML = `<p style="color: var(--muted);">Todavía no existen reservas.</p>`;
    return;
  }

  recent.innerHTML = last.map(renderBookingAdminItem).join("");
}

function renderAdminSettings() {
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

function handleSettingsSave(e) {
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
  applySettingsToPublic();
  renderAdminAll();
  showToast("Configuración guardada.");
}

/* =========================
   ADMIN UNIDADES
========================= */

function renderAdminUnits() {
  const list = document.getElementById("adminUnitsList");
  const units = getUnits();

  if (!units.length) {
    list.innerHTML = `<p>No existen glampings.</p>`;
    return;
  }

  list.innerHTML = units
    .map((unit) => `
      <div class="admin-item">
        <div>
          <h4>${escapeHTML(unit.name)} · ${money(unit.price)}</h4>
          <p>${escapeHTML(unit.descriptionEs || "")}</p>
          <p>
            <span class="status-badge ${unit.status === "active" ? "status-confirmed" : "status-expired"}">
              ${unit.status === "active" ? "Activo" : "Inactivo"}
            </span>
          </p>
        </div>

        <div class="item-actions">
          <button class="action-btn" onclick="openUnitModal('${unit.id}')">Editar</button>
          <button class="action-btn danger" onclick="deleteUnit('${unit.id}')">Eliminar</button>
        </div>
      </div>
    `)
    .join("");
}

function openUnitModal(unitId = null) {
  const modal = document.getElementById("unitModal");
  const form = document.getElementById("unitForm");
  form.reset();

  if (unitId) {
    const unit = getUnits().find((u) => u.id === unitId);
    if (!unit) return;

    document.getElementById("unitModalTitle").textContent = "Editar glamping";
    document.getElementById("unitId").value = unit.id;
    document.getElementById("unitName").value = unit.name;
    document.getElementById("unitPrice").value = unit.price;
    document.getElementById("unitAdults").value = unit.adults;
    document.getElementById("unitChildren").value = unit.children;
    document.getElementById("unitDescriptionEs").value = unit.descriptionEs || "";
    document.getElementById("unitDescriptionEn").value = unit.descriptionEn || "";
    document.getElementById("unitImage").value = unit.image || "";
    document.getElementById("unitFeatures").value = (unit.features || []).join(", ");
    document.getElementById("unitStatus").value = unit.status;
  } else {
    document.getElementById("unitModalTitle").textContent = "Agregar glamping";
    document.getElementById("unitId").value = "";
    document.getElementById("unitAdults").value = 2;
    document.getElementById("unitChildren").value = 0;
    document.getElementById("unitStatus").value = "active";
  }

  modal.classList.remove("hidden");
}

function closeUnitModal() {
  document.getElementById("unitModal").classList.add("hidden");
}

function handleUnitSave(e) {
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
    features: document.getElementById("unitFeatures").value
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean),
    status: document.getElementById("unitStatus").value,
  };

  const exists = units.some((u) => u.id === id);
  const updated = exists
    ? units.map((u) => (u.id === id ? unit : u))
    : [...units, unit];

  setData(STORAGE_KEYS.units, updated);
  closeUnitModal();
  renderGlampings();
  renderAdminAll();
  showToast("Glamping guardado.");
}

function deleteUnit(unitId) {
  if (!confirm("¿Eliminar este glamping?")) return;

  const updated = getUnits().filter((u) => u.id !== unitId);
  setData(STORAGE_KEYS.units, updated);
  renderGlampings();
  renderAdminAll();
  showToast("Glamping eliminado.");
}

/* =========================
   ADMIN RESERVAS
========================= */

function renderAdminBookings() {
  const list = document.getElementById("adminBookingsList");
  const search = document.getElementById("bookingSearch")?.value.toLowerCase() || "";
  const status = document.getElementById("bookingStatusFilter")?.value || "all";

  let bookings = getBookings();

  if (status !== "all") {
    bookings = bookings.filter((b) => b.status === status);
  }

  if (search) {
    bookings = bookings.filter((b) => {
      return (
        b.code.toLowerCase().includes(search) ||
        b.fullName.toLowerCase().includes(search) ||
        b.phoneNumber.toLowerCase().includes(search)
      );
    });
  }

  bookings = bookings.reverse();

  if (!bookings.length) {
    list.innerHTML = `<p style="color: var(--muted);">No existen reservas con ese filtro.</p>`;
    return;
  }

  list.innerHTML = bookings.map(renderBookingAdminItem).join("");
}

function renderBookingAdminItem(b) {
  return `
    <div class="admin-item">
      <div>
        <h4>${escapeHTML(b.code)} · ${escapeHTML(b.fullName)}</h4>
        <p>${escapeHTML(b.unitName)} · ${b.checkIn} al ${b.checkOut} · ${b.nights} noche(s)</p>
        <p>Total: <strong>${money(b.total)}</strong> · Abono: <strong>${money(b.depositRequired)}</strong> · Saldo: <strong>${money(b.pendingBalance)}</strong></p>
        <p>WhatsApp: ${escapeHTML(b.whatsappCode)} ${escapeHTML(b.phoneNumber)} · Estado:
          <span class="status-badge status-${escapeHTML(b.status)}">${translateStatus(b.status)}</span>
        </p>
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
  const bookings = getBookings();
  const updated = bookings.map((b) => {
    if (b.code === code) {
      return {
        ...b,
        status: "confirmed",
        paidValue: b.depositRequired,
        pendingBalance: b.total - b.depositRequired,
        confirmedAt: new Date().toISOString(),
      };
    }
    return b;
  });

  saveBookings(updated);
  renderGlampings();
  renderAdminAll();
  showToast("Reserva confirmada.");
}

function cancelBooking(code) {
  if (!confirm("¿Cancelar esta reserva y liberar fechas?")) return;

  const bookings = getBookings();
  const updated = bookings.map((b) => {
    if (b.code === code) {
      return {
        ...b,
        status: "cancelled",
        cancelledAt: new Date().toISOString(),
      };
    }
    return b;
  });

  saveBookings(updated);
  renderGlampings();
  renderAdminAll();
  showToast("Reserva cancelada y fechas liberadas.");
}

function markCheckin(code) {
  const bookings = getBookings();
  const updated = bookings.map((b) => {
    if (b.code === code) {
      return {
        ...b,
        status: "checked_in",
        checkinStatus: "done",
        checkinAt: new Date().toISOString(),
        paidValue: b.total,
        pendingBalance: 0,
      };
    }
    return b;
  });

  saveBookings(updated);
  renderAdminAll();
  showToast("Check-in registrado.");
}

function markCheckout(code) {
  const bookings = getBookings();
  const updated = bookings.map((b) => {
    if (b.code === code) {
      return {
        ...b,
        status: "completed",
        checkoutStatus: "done",
        checkoutAt: new Date().toISOString(),
      };
    }
    return b;
  });

  saveBookings(updated);
  renderAdminAll();
  showToast("Check-out registrado. Reserva completada.");
}

function copyBookingSummary(code) {
  const b = getBookings().find((x) => x.code === code);
  if (!b) return;

  const text = `
Reserva: ${b.code}
Cliente: ${b.fullName}
Documento: ${b.documentId}
WhatsApp: ${b.whatsappCode} ${b.phoneNumber}
Glamping: ${b.unitName}
Fechas: ${b.checkIn} al ${b.checkOut}
Noches: ${b.nights}
Adultos: ${b.adults}
Niños: ${b.children}
Total: ${money(b.total)}
Abono: ${money(b.depositRequired)}
Saldo: ${money(b.pendingBalance)}
Estado: ${translateStatus(b.status)}
  `.trim();

  navigator.clipboard.writeText(text);
  showToast("Resumen copiado.");
}

/* =========================
   ADMIN SERVICIOS
========================= */

function renderAdminServices() {
  const breakfasts = getBreakfasts();
  const extras = getExtras();

  document.getElementById("adminBreakfastsList").innerHTML = breakfasts
    .map((b) => `
      <div class="admin-item">
        <div>
          <h4>${escapeHTML(b.nameEs)} · ${money(b.price)}</h4>
          <p>${escapeHTML(b.descriptionEs || "")}</p>
        </div>
        <div class="item-actions">
          <button class="action-btn" onclick="toggleBreakfast('${b.id}')">
            ${b.active ? "Desactivar" : "Activar"}
          </button>
        </div>
      </div>
    `)
    .join("");

  document.getElementById("adminExtrasList").innerHTML = extras
    .map((e) => `
      <div class="admin-item">
        <div>
          <h4>${escapeHTML(e.nameEs)} · ${money(e.price)}</h4>
          <p>${e.active ? "Activo" : "Inactivo"}</p>
        </div>
        <div class="item-actions">
          <button class="action-btn" onclick="toggleExtraAdmin('${e.id}')">
            ${e.active ? "Desactivar" : "Activar"}
          </button>
        </div>
      </div>
    `)
    .join("");
}

function toggleBreakfast(id) {
  const updated = getBreakfasts().map((b) =>
    b.id === id ? { ...b, active: !b.active } : b
  );

  setData(STORAGE_KEYS.breakfasts, updated);
  renderAdminServices();
  showToast("Desayuno actualizado.");
}

function toggleExtraAdmin(id) {
  const updated = getExtras().map((e) =>
    e.id === id ? { ...e, active: !e.active } : e
  );

  setData(STORAGE_KEYS.extras, updated);
  renderAdminServices();
  showToast("Extra actualizado.");
}
