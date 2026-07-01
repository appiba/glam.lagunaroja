const STORAGE_KEYS = {
  settings: "glamp_v3_settings",
  units: "glamp_v3_units",
  bookings: "glamp_v3_bookings",
  services: "glamp_v3_services",
  expenses: "glamp_v3_expenses",
  specials: "glamp_v3_specials",
  session: "glamp_v3_session",
};

let selectedSearch = null;
let selectedUnit = null;
let selectedServices = [];
let calendarDate = new Date();
let currentRole = null;

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
    descriptionEn: "Private cabin ideal for couples.",
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
    descriptionEn: "Private refuge glamping.",
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
    descriptionEn: "Premium A-frame experience.",
    features: ["A-frame", "Vista panorámica", "Baño privado", "Experiencia premium"],
  },
];

const defaultServices = [
  { id: "S001", type: "food", nameEs: "Sin alimentación", nameEn: "No food", descriptionEs: "Reserva sin alimentación.", descriptionEn: "No food service.", price: 0, active: true },
  { id: "S002", type: "food", nameEs: "Desayuno básico", nameEn: "Basic breakfast", descriptionEs: "Café o aromática, pan, huevos y fruta.", descriptionEn: "Coffee, bread, eggs and fruit.", price: 10, active: true },
  { id: "S003", type: "food", nameEs: "Desayuno andino", nameEn: "Andean breakfast", descriptionEs: "Café, pan de casa, queso, huevos, fruta y jugo natural.", descriptionEn: "Andean breakfast.", price: 15, active: true },
  { id: "S004", type: "food", nameEs: "Desayuno premium romántico", nameEn: "Premium romantic breakfast", descriptionEs: "Bandeja especial para pareja con detalle romántico.", descriptionEn: "Special couple tray.", price: 25, active: true },
  { id: "S005", type: "food", nameEs: "Almuerzo especial", nameEn: "Special lunch", descriptionEs: "Almuerzo bajo coordinación previa.", descriptionEn: "Lunch by coordination.", price: 18, active: true },
  { id: "S006", type: "food", nameEs: "Merienda especial", nameEn: "Special dinner", descriptionEs: "Merienda bajo coordinación previa.", descriptionEn: "Dinner by coordination.", price: 18, active: true },
  { id: "S007", type: "experience", nameEs: "Cuna", nameEn: "Crib", descriptionEs: "Cuna sujeta a disponibilidad.", descriptionEn: "Crib subject to availability.", price: 10, active: true },
  { id: "S008", type: "experience", nameEs: "Decoración romántica", nameEn: "Romantic decoration", descriptionEs: "Decoración especial para pareja, aniversario o cumpleaños.", descriptionEn: "Romantic setup.", price: 20, active: true },
  { id: "S009", type: "experience", nameEs: "Fogata", nameEn: "Campfire", descriptionEs: "Fogata coordinada según clima y seguridad.", descriptionEn: "Campfire by coordination.", price: 10, active: true },
  { id: "S010", type: "experience", nameEs: "Transporte desde Ibarra", nameEn: "Transport from Ibarra", descriptionEs: "Transporte desde un punto estratégico de Ibarra hacia el glamping.", descriptionEn: "Transport from Ibarra.", price: 15, active: true },
  { id: "S011", type: "experience", nameEs: "Caminata", nameEn: "Hiking", descriptionEs: "Experiencia por zonas naturales cercanas.", descriptionEn: "Nature hiking.", price: 12, active: true },
  { id: "S012", type: "experience", nameEs: "Cabalgata", nameEn: "Horseback riding", descriptionEs: "Cabalgata bajo coordinación previa.", descriptionEn: "Horseback riding by coordination.", price: 25, active: true },
  { id: "S013", type: "consumption", nameEs: "Bebidas calientes", nameEn: "Hot drinks", descriptionEs: "Café, chocolate o aromática adicional.", descriptionEn: "Additional hot drinks.", price: 4, active: true },
  { id: "S014", type: "consumption", nameEs: "Late check-out", nameEn: "Late check-out", descriptionEs: "Salida tardía sujeta a disponibilidad.", descriptionEn: "Late checkout by availability.", price: 10, active: true },
];

const defaultSpecials = [
  { id: "SP001", name: "San Valentín", date: "", price: 110, description: "Glamping + decoración romántica + desayuno premium.", active: true },
];

function getData(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try { return JSON.parse(raw); } catch { return fallback; }
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
  return `${getSettings().currency}${Number(value || 0).toFixed(2)}`;
}

function todayISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
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

function escapeHTML(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function onlyDigits(str) {
  return String(str || "").replace(/\D/g, "");
}

function rangesOverlap(startA, endA, startB, endB) {
  return new Date(startA) < new Date(endB) && new Date(startB) < new Date(endA);
}

function nextDayISO(date) {
  const d = new Date(date);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
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

function isUnitAvailable(unitId, checkIn, checkOut) {
  const blockingStates = ["pending", "confirmed", "checked_in", "cleaning_pending"];
  return !getBookings().some((b) => {
    if (b.unitId !== unitId) return false;
    if (!blockingStates.includes(b.status)) return false;
    return rangesOverlap(checkIn, checkOut, b.checkIn, b.checkOut);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  seedData();
  expireOldPendingBookings();
  populateAgeSelectors();
  setupDates();
  bindEvents();
  applySettings();
  renderGlampings();
  renderAdminAll();

  const savedSession = getData(STORAGE_KEYS.session, null);
  if (savedSession) {
    currentRole = savedSession.role;
    openInternalPanel(savedSession.role);
  }

  if (window.location.hash === "#admin") openLogin();
});

function populateAgeSelectors() {
  const adultAges = ["holderAge", "manualAge"];
  adultAges.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = `<option value="">Edad</option>`;
    for (let i = 18; i <= 100; i++) el.innerHTML += `<option value="${i}">${i}</option>`;
  });
}

function setupDates() {
  const min = todayISO();
  ["checkIn", "checkOut", "manualCheckIn", "manualCheckOut", "expenseDate", "specialDate"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.min = min;
  });

  document.getElementById("checkIn").addEventListener("change", () => {
    const v = document.getElementById("checkIn").value;
    document.getElementById("checkOut").min = nextDayISO(v);
    if (document.getElementById("checkOut").value <= v) document.getElementById("checkOut").value = nextDayISO(v);
  });

  document.getElementById("manualCheckIn").addEventListener("change", () => {
    const v = document.getElementById("manualCheckIn").value;
    document.getElementById("manualCheckOut").min = nextDayISO(v);
    if (document.getElementById("manualCheckOut").value <= v) document.getElementById("manualCheckOut").value = nextDayISO(v);
  });
}

function bindEvents() {
  document.getElementById("availabilityForm").addEventListener("submit", handleAvailabilitySearch);
  document.getElementById("closeReservationPanel").addEventListener("click", () => document.getElementById("reservationPanel").classList.add("hidden"));
  document.getElementById("reservationForm").addEventListener("submit", handleReservationSubmit);
  document.getElementById("transportType").addEventListener("change", toggleArrivalTime);
  document.getElementById("foodAllergySelect").addEventListener("change", toggleOtherFields);
  document.getElementById("medicalSelect").addEventListener("change", toggleOtherFields);
  document.getElementById("invoiceType").addEventListener("change", toggleInvoiceFields);

  document.getElementById("openLoginBtn").addEventListener("click", openLogin);
  document.getElementById("closeLoginBtn").addEventListener("click", () => document.getElementById("loginPanel").classList.add("hidden"));
  document.getElementById("loginForm").addEventListener("submit", handleLogin);
  document.getElementById("logoutBtn").addEventListener("click", logout);
  document.getElementById("backToPublicBtn").addEventListener("click", backToPublic);

  document.querySelectorAll(".admin-nav").forEach((btn) => {
    btn.addEventListener("click", () => switchAdminSection(btn.dataset.section));
  });

  document.getElementById("settingsForm").addEventListener("submit", saveSettings);
  document.getElementById("manualBookingForm").addEventListener("submit", saveManualBooking);
  document.getElementById("bookingSearch").addEventListener("input", renderAdminBookings);
  document.getElementById("bookingStatusFilter").addEventListener("change", renderAdminBookings);

  document.getElementById("prevMonthBtn").addEventListener("click", () => { calendarDate.setMonth(calendarDate.getMonth() - 1); renderCalendar(); });
  document.getElementById("nextMonthBtn").addEventListener("click", () => { calendarDate.setMonth(calendarDate.getMonth() + 1); renderCalendar(); });

  document.getElementById("addUnitBtn").addEventListener("click", () => openUnitModal());
  document.getElementById("closeUnitModal").addEventListener("click", () => document.getElementById("unitModal").classList.add("hidden"));
  document.getElementById("unitForm").addEventListener("submit", saveUnit);

  document.getElementById("addServiceBtn").addEventListener("click", () => openServiceModal());
  document.getElementById("closeServiceModal").addEventListener("click", () => document.getElementById("serviceModal").classList.add("hidden"));
  document.getElementById("serviceForm").addEventListener("submit", saveService);

  document.getElementById("closeCancelModal").addEventListener("click", () => document.getElementById("cancelModal").classList.add("hidden"));
  document.getElementById("cancelForm").addEventListener("submit", saveCancellation);

  document.getElementById("closeConsumptionModal").addEventListener("click", () => document.getElementById("consumptionModal").classList.add("hidden"));
  document.getElementById("consumptionService").addEventListener("change", syncConsumptionPrice);
  document.getElementById("consumptionForm").addEventListener("submit", saveConsumption);

  document.getElementById("closeCheckoutModal").addEventListener("click", () => document.getElementById("checkoutModal").classList.add("hidden"));
  document.getElementById("checkoutDamage").addEventListener("change", () => document.getElementById("damageValueBox").classList.toggle("hidden", document.getElementById("checkoutDamage").value !== "Sí"));
  document.getElementById("checkoutForm").addEventListener("submit", saveCheckout);

  document.getElementById("closeHousekeepingModal").addEventListener("click", () => document.getElementById("housekeepingModal").classList.add("hidden"));
  document.getElementById("housekeepingForm").addEventListener("submit", saveHousekeepingReport);

  document.getElementById("addExpenseBtn").addEventListener("click", openExpenseModal);
  document.getElementById("closeExpenseModal").addEventListener("click", () => document.getElementById("expenseModal").classList.add("hidden"));
  document.getElementById("expenseCategory").addEventListener("change", () => document.getElementById("expenseOtherBox").classList.toggle("hidden", document.getElementById("expenseCategory").value !== "Otros"));
  document.getElementById("expenseForm").addEventListener("submit", saveExpense);

  document.getElementById("addSpecialDateBtn").addEventListener("click", () => openSpecialModal());
  document.getElementById("closeSpecialDateModal").addEventListener("click", () => document.getElementById("specialDateModal").classList.add("hidden"));
  document.getElementById("specialDateForm").addEventListener("submit", saveSpecialDate);
}

function applySettings() {
  const s = getSettings();
  document.getElementById("publicBusinessName").textContent = s.businessName || "Glamping Boutique";
  document.getElementById("publicBusinessSubtitle").textContent = s.subtitle || "";
  document.getElementById("footerBusinessName").textContent = s.businessName || "Glamping Boutique";
  document.getElementById("publicCheckinText").textContent = `Desde ${s.checkin}`;
  document.getElementById("publicCheckoutText").textContent = `Hasta ${s.checkout}`;

  document.getElementById("publicLogo").innerHTML = s.logoUrl ? `<img src="${escapeHTML(s.logoUrl)}" alt="Logo">` : `<i class="fa-solid fa-mountain-sun"></i>`;

  if (s.heroImage) {
    document.querySelector(".hero").style.background = `
      linear-gradient(180deg, rgba(31, 61, 43, 0.08), rgba(31, 61, 43, 0.74)),
      url("${s.heroImage}") center/cover
    `;
  }
}

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

  if (!checkIn || !checkOut) return showToast("Selecciona ingreso y salida.");
  if (checkIn < todayISO()) return showToast("No se puede reservar fechas pasadas.");
  if (checkOut <= checkIn) return showToast("La salida debe ser posterior al ingreso.");

  selectedSearch = { checkIn, checkOut, adults, children, nights: dateDiffNights(checkIn, checkOut) };

  renderGlampings();
  document.querySelector(".glampings-section").scrollIntoView({ behavior: "smooth" });
}

function renderGlampings() {
  const list = document.getElementById("glampingsList");
  const msg = document.getElementById("availabilityMessage");
  const units = getUnits().filter((u) => u.status === "active");
  let availableCount = 0;

  list.innerHTML = units.map((unit) => {
    const exceedsCapacity = selectedSearch && (selectedSearch.adults > unit.adults || selectedSearch.children > unit.children);
    const available = selectedSearch ? isUnitAvailable(unit.id, selectedSearch.checkIn, selectedSearch.checkOut) && !exceedsCapacity : true;
    if (available && selectedSearch) availableCount++;

    const statusText = !selectedSearch ? "Consultar" : available ? "Disponible" : exceedsCapacity ? "Capacidad no permitida" : "No disponible";

    return `
      <article class="glamping-card">
        <div class="glamping-img">
          <img src="${escapeHTML(unit.image)}" alt="${escapeHTML(unit.name)}">
          <span class="glamping-status">${statusText}</span>
        </div>
        <div class="glamping-body">
          <h4>${escapeHTML(unit.name)}</h4>
          <p>${escapeHTML(unit.descriptionEs || "")}</p>
          <div class="features">${(unit.features || []).map((f) => `<span>${escapeHTML(f)}</span>`).join("")}</div>
          <div class="glamping-footer">
            <div class="price"><span>Desde</span><strong>${money(unit.price)}</strong><span>por noche</span></div>
            <button class="primary-btn small-btn" ${available ? "" : "disabled"} onclick="openReservationPanel('${unit.id}')">Reservar</button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  if (selectedSearch && availableCount === 0) {
    msg.textContent = "No hay disponibilidad para estas fechas. Intenta con otras fechas.";
    msg.classList.remove("hidden");
  } else {
    msg.classList.add("hidden");
  }
}

function openReservationPanel(unitId) {
  if (!selectedSearch) return showToast("Primero selecciona las fechas.");

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
  document.getElementById("summaryImage").src = unit.image;
  document.getElementById("summaryGlampingName").textContent = unit.name;
  document.getElementById("summaryDates").textContent = `${selectedSearch.checkIn} → ${selectedSearch.checkOut} · ${selectedSearch.nights} noche(s)`;
  document.getElementById("summaryGuests").textContent = `${selectedSearch.adults} adulto(s) · ${selectedSearch.children} niño(s)`;
  document.getElementById("summaryPrice").textContent = `${money(unit.price)} / noche`;

  renderServicesForBooking();
  renderCompanionsRequired();
  renderSpecialPackage();
  toggleArrivalTime();
  toggleOtherFields();
  toggleInvoiceFields();
  updateReservationTotals();

  document.getElementById("reservationPanel").classList.remove("hidden");
}

function renderSpecialPackage() {
  const box = document.getElementById("specialPackageBox");
  const special = getSpecials().find((s) => s.active && s.date && s.date >= selectedSearch.checkIn && s.date < selectedSearch.checkOut);
  if (!special) {
    box.classList.add("hidden");
    return;
  }

  box.innerHTML = `
    <h4>Fecha especial detectada: ${escapeHTML(special.name)}</h4>
    <p>${escapeHTML(special.description)}</p>
    <p><strong>Precio sugerido:</strong> ${money(special.price)}</p>
  `;
  box.classList.remove("hidden");
}

function renderServicesForBooking() {
  const services = getServices().filter((s) => s.active);
  document.getElementById("foodServicesList").innerHTML = services.filter((s) => s.type === "food").map(renderServiceOption).join("");
  document.getElementById("experienceServicesList").innerHTML = services.filter((s) => s.type === "experience").map(renderServiceOption).join("");
}

function renderServiceOption(service) {
  return `
    <label class="service-option">
      <input type="checkbox" value="${service.id}" onchange="toggleBookingService('${service.id}', this.checked)">
      <span><strong>${escapeHTML(service.nameEs)} · ${money(service.price)}</strong><p>${escapeHTML(service.descriptionEs)}</p></span>
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

function renderCompanionsRequired() {
  const list = document.getElementById("companionsList");
  const totalRequired = Math.max(0, selectedSearch.adults - 1) + selectedSearch.children;

  if (totalRequired === 0) {
    list.innerHTML = `<p class="helper-note">Reserva para 1 adulto. No se requieren acompañantes.</p>`;
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
  const ageOptions = type === "niño"
    ? Array.from({ length: 9 }, (_, i) => `<option value="${i}">${i}</option>`).join("")
    : Array.from({ length: 83 }, (_, i) => `<option value="${i + 18}">${i + 18}</option>`).join("");

  const relationOptions = type === "niño"
    ? `<option>Hijo/a</option><option>Sobrino/a</option><option>Familiar</option><option>Otro</option>`
    : `<option>Pareja</option><option>Esposo/a</option><option>Familiar</option><option>Amigo/a</option><option>Padre/Madre</option><option>Otro</option>`;

  return `
    <div class="companion-card" data-companion-card>
      <h5>${title}</h5>
      <div class="form-grid">
        <div class="field"><label>Primer nombre</label><input type="text" data-companion-field="firstName" required minlength="2" maxlength="30"></div>
        <div class="field"><label>Primer apellido</label><input type="text" data-companion-field="lastName" required minlength="2" maxlength="30"></div>
        <div class="field"><label>Documento</label><input type="text" data-companion-field="document" required minlength="6" maxlength="15"></div>
        <div class="field"><label>Nacionalidad</label><select data-companion-field="nationality"><option>Ecuatoriana</option><option>Colombiana</option><option>Peruana</option><option>Chilena</option><option>Argentina</option><option>Mexicana</option><option>Estadounidense</option><option>Española</option><option>Otra</option></select></div>
        <div class="field"><label>Edad</label><select data-companion-field="age" required>${ageOptions}</select></div>
        <div class="field"><label>Sexo / género</label><select data-companion-field="gender"><option>Masculino</option><option>Femenino</option><option>Otro</option><option>Prefiere no decir</option></select></div>
        <div class="field"><label>Tipo</label><input type="text" data-companion-field="type" value="${type}" readonly></div>
        <div class="field"><label>Parentesco</label><select data-companion-field="relation">${relationOptions}</select></div>
      </div>
    </div>
  `;
}

function getCompanionsFromForm() {
  const cards = document.querySelectorAll("[data-companion-card]");
  const companions = [];

  for (const card of cards) {
    const data = {};
    card.querySelectorAll("[data-companion-field]").forEach((input) => data[input.dataset.companionField] = input.value.trim());

    if (!data.firstName || !data.lastName || !data.document || !data.age) return null;
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
    help.textContent = "Selecciona una hora estimada de llegada. El check-in aplica desde el horario configurado.";
  } else {
    field.classList.add("hidden");
    document.getElementById("arrivalTime").value = "";
    help.textContent = "El punto estratégico de salida desde Ibarra y la hora serán coordinados por WhatsApp.";
  }
}

function toggleOtherFields() {
  document.getElementById("foodAllergyOtherBox").classList.toggle("hidden", document.getElementById("foodAllergySelect").value !== "Otra");
  document.getElementById("medicalOtherBox").classList.toggle("hidden", document.getElementById("medicalSelect").value !== "Otra");
}

function toggleInvoiceFields() {
  const show = document.getElementById("invoiceType").value === "datos";
  document.querySelectorAll(".invoice-field").forEach((el) => el.classList.toggle("hidden", !show));
}

function validatePhone(selectId, phoneId) {
  const select = document.getElementById(selectId);
  const selected = select.options[select.selectedIndex];
  const digitsNeeded = Number(selected.dataset.digits || 10);
  const phone = onlyDigits(document.getElementById(phoneId).value);

  if (phone.length !== digitsNeeded) {
    showToast(`El número debe tener ${digitsNeeded} dígitos.`);
    return false;
  }

  return true;
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
  return { lodgingTotal, servicesTotal, total, deposit, pending: total - deposit };
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
  document.getElementById("depositLabel").textContent = `Abono requerido (${s.depositPercent}%)`;
}

function handleReservationSubmit(e) {
  e.preventDefault();

  if (!validatePhone("countryCode", "phoneNumber")) return;

  const companions = getCompanionsFromForm();
  if (companions === null) return showToast("Completa correctamente los datos de acompañantes.");

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
    return { id: service.id, type: service.type, name: service.nameEs, price: Number(service.price), qty: 1, total: Number(service.price), status: "pending" };
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
    foodAllergy: document.getElementById("foodAllergySelect").value === "Otra" ? document.getElementById("foodAllergyOther").value.trim() : document.getElementById("foodAllergySelect").value,
    medicalCondition: document.getElementById("medicalSelect").value === "Otra" ? document.getElementById("medicalOther").value.trim() : document.getElementById("medicalSelect").value,
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
    housekeepingStatus: "occupied",
    housekeepingNotes: "",
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
  const businessNumber = `${s.whatsappCode}${s.whatsappNumber}`.replace(/[^\d+]/g, "");
  const servicesText = b.services.length ? b.services.map((x) => `${x.name} (${money(x.total)})`).join(", ") : "Sin servicios";

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

  showToast("Usuario o contraseña incorrectos.");
}

function openInternalPanel(role) {
  document.getElementById("publicApp").classList.add("hidden");
  document.getElementById("adminPanel").classList.remove("hidden");
  document.getElementById("panelRoleTitle").textContent = role === "housekeeping" ? "Housekeeping" : "Admin";

  document.querySelectorAll(".admin-nav").forEach((btn) => {
    const section = btn.dataset.section;
    if (role === "housekeeping") {
      btn.style.display = section === "housekeeping" || section === "calendar" ? "flex" : "none";
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
    housekeeping: "Housekeeping",
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
  const activeIncome = bookings.filter((b) => ["confirmed", "checked_in", "cleaning_pending", "completed", "cancelled_penalty", "refund_pending", "refund_done"].includes(b.status));

  const pending = bookings.filter((b) => b.status === "pending").length;
  const confirmed = bookings.filter((b) => ["confirmed", "checked_in", "cleaning_pending"].includes(b.status)).length;
  const nights = activeIncome.reduce((sum, b) => sum + Number(b.nights || 0), 0);
  const income = activeIncome.reduce((sum, b) => sum + Number(b.paidValue || 0) + Number(b.retainedValue || 0), 0);
  const expenseTotal = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  document.getElementById("statPending").textContent = pending;
  document.getElementById("statConfirmed").textContent = confirmed;
  document.getElementById("statNights").textContent = nights;
  document.getElementById("statNet").textContent = money(income - expenseTotal);

  const recent = [...bookings].reverse().slice(0, 7);
  document.getElementById("recentBookings").innerHTML = recent.length ? recent.map(renderBookingAdminItem).join("") : `<p class="helper-note">Todavía no existen reservas.</p>`;
}

function renderCalendar() {
  const grid = document.getElementById("calendarGrid");
  if (!grid) return;

  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  document.getElementById("calendarMonthTitle").textContent = calendarDate.toLocaleDateString("es-EC", { month: "long", year: "numeric" }).toUpperCase();

  const units = getUnits().filter((u) => u.status === "active");
  const bookings = getBookings();

  let html = `<div class="calendar-cell header">Glamping</div>`;
  for (let d = 1; d <= 31; d++) html += `<div class="calendar-cell day-head">${d <= daysInMonth ? d : ""}</div>`;

  units.forEach((unit) => {
    html += `<div class="calendar-cell header">${escapeHTML(unit.name)}</div>`;
    for (let d = 1; d <= 31; d++) {
      if (d > daysInMonth) { html += `<div class="calendar-cell"></div>`; continue; }

      const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const booking = bookings.find((b) => b.unitId === unit.id && rangesOverlap(date, nextDayISO(date), b.checkIn, b.checkOut));

      if (booking) {
        html += `<div class="calendar-cell ${booking.status}" title="${escapeHTML(booking.fullName)}">${escapeHTML(booking.code)}</div>`;
      } else {
        html += `<div class="calendar-cell available" onclick="startManualFromCalendar('${unit.id}','${date}')">Libre</div>`;
      }
    }
  });

  grid.innerHTML = html;
}

function startManualFromCalendar(unitId, date) {
  if (currentRole === "housekeeping") return;
  switchAdminSection("manual");
  document.getElementById("manualUnit").value = unitId;
  document.getElementById("manualCheckIn").value = date;
  document.getElementById("manualCheckOut").min = nextDayISO(date);
  document.getElementById("manualCheckOut").value = nextDayISO(date);
  showToast("Fecha cargada para nueva reserva manual.");
}

function renderManualSelects() {
  const select = document.getElementById("manualUnit");
  if (!select) return;
  select.innerHTML = getUnits().filter((u) => u.status === "active").map((u) => `<option value="${u.id}">${escapeHTML(u.name)} · ${money(u.price)}</option>`).join("");

  const services = getServices().filter((s) => s.active);
  document.getElementById("manualServicesList").innerHTML = services.map((s) => `
    <label class="service-option">
      <input type="checkbox" value="${s.id}" data-manual-service>
      <span><strong>${escapeHTML(s.nameEs)} · ${money(s.price)}</strong><p>${escapeHTML(s.descriptionEs)}</p></span>
    </label>
  `).join("");
}

function saveManualBooking(e) {
  e.preventDefault();

  if (!validatePhone("manualWhatsappCode", "manualPhone")) return;

  const unit = getUnits().find((u) => u.id === document.getElementById("manualUnit").value);
  const checkIn = document.getElementById("manualCheckIn").value;
  const checkOut = document.getElementById("manualCheckOut").value;

  if (!unit || !checkIn || !checkOut) return showToast("Completa glamping y fechas.");
  if (checkOut <= checkIn) return showToast("La salida debe ser posterior al ingreso.");
  if (!isUnitAvailable(unit.id, checkIn, checkOut)) return showToast("Ese glamping no está disponible en esas fechas.");

  const nights = dateDiffNights(checkIn, checkOut);
  const selectedManualServices = [...document.querySelectorAll("[data-manual-service]:checked")].map((input) => {
    const s = getServices().find((x) => x.id === input.value);
    return { id: s.id, type: s.type, name: s.nameEs, price: Number(s.price), qty: 1, total: Number(s.price), status: "pending" };
  });

  const lodgingTotal = unit.price * nights;
  const servicesTotal = selectedManualServices.reduce((sum, s) => sum + Number(s.total), 0);
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
    services: selectedManualServices,
    consumptions: [],
    companions: [],
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
    housekeepingStatus: document.getElementById("manualStatus").value === "confirmed" ? "occupied" : "pending",
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

function renderAdminBookings() {
  const list = document.getElementById("adminBookingsList");
  if (!list) return;

  const search = document.getElementById("bookingSearch")?.value.toLowerCase() || "";
  const status = document.getElementById("bookingStatusFilter")?.value || "all";

  let bookings = getBookings();
  if (status !== "all") bookings = bookings.filter((b) => b.status === status);
  if (search) bookings = bookings.filter((b) => b.code.toLowerCase().includes(search) || String(b.fullName).toLowerCase().includes(search) || String(b.phoneNumber).toLowerCase().includes(search));

  list.innerHTML = bookings.length ? [...bookings].reverse().map(renderBookingAdminItem).join("") : `<p class="helper-note">No existen reservas con ese filtro.</p>`;
}

function renderBookingAdminItem(b) {
  return `
    <div class="admin-item">
      <div>
        <h4>${escapeHTML(b.code)} · ${escapeHTML(b.fullName)}</h4>
        <p>${escapeHTML(b.unitName)} · ${b.checkIn} al ${b.checkOut} · ${b.nights} noche(s)</p>
        <p>Total: <strong>${money(b.total)}</strong> · Pagado: <strong>${money(b.paidValue)}</strong> · Saldo: <strong>${money(b.pendingBalance)}</strong> · Devolución: <strong>${money(b.refundValue || 0)}</strong></p>
        <p>Estado: <span class="status-badge status-${escapeHTML(b.status)}">${translateStatus(b.status)}</span> · Housekeeping: ${escapeHTML(b.housekeepingStatus || "—")}</p>
      </div>
      <div class="item-actions">
        ${b.status === "pending" ? `<button class="action-btn confirm" onclick="confirmBooking('${b.code}')">Confirmar pago</button>` : ""}
        ${b.status === "confirmed" ? `<button class="action-btn blue" onclick="markCheckin('${b.code}')">Check-in</button>` : ""}
        ${b.status === "checked_in" ? `<button class="action-btn orange" onclick="openConsumptionModal('${b.code}')">Agregar consumo</button><button class="action-btn confirm" onclick="openCheckoutModal('${b.code}')">Check-out</button>` : ""}
        ${["pending","confirmed","checked_in"].includes(b.status) ? `<button class="action-btn danger" onclick="openCancelModal('${b.code}')">Cancelar</button>` : ""}
        <button class="action-btn" onclick="openConsumptionModal('${b.code}')">Consumos</button>
        <button class="action-btn" onclick="openHousekeepingModal('${b.code}')">Housekeeping</button>
        <button class="action-btn" onclick="printTicket('${b.code}')">Ticket</button>
        <button class="action-btn" onclick="copyBookingSummary('${b.code}')">Copiar</button>
      </div>
    </div>
  `;
}

function translateStatus(status) {
  const map = {
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
  return map[status] || status;
}

function confirmBooking(code) {
  const bookings = getBookings().map((b) => b.code === code ? {
    ...b,
    status: "confirmed",
    paidValue: Number(b.depositRequired || 0),
    pendingBalance: Number(b.total || 0) - Number(b.depositRequired || 0),
    confirmedAt: new Date().toISOString(),
    housekeepingStatus: "reserved",
  } : b);

  setData(STORAGE_KEYS.bookings, bookings);
  renderAdminAll();
  renderGlampings();
  showToast("Reserva confirmada.");
}

function markCheckin(code) {
  const bookings = getBookings().map((b) => b.code === code ? {
    ...b,
    status: "checked_in",
    checkinAt: new Date().toISOString(),
    housekeepingStatus: "occupied",
  } : b);

  setData(STORAGE_KEYS.bookings, bookings);
  renderAdminAll();
  showToast("Check-in registrado.");
}

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
  document.getElementById("refundStatus").value = refund > 0 ? "refund_pending" : "cancelled_penalty";
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
  showToast("Cancelación guardada.");
}

function openConsumptionModal(code) {
  document.getElementById("consumptionForm").reset();
  document.getElementById("consumptionCode").value = code;

  const select = document.getElementById("consumptionService");
  select.innerHTML = getServices().filter((s) => s.active).map((s) => `<option value="${s.id}">${escapeHTML(s.nameEs)} · ${money(s.price)}</option>`).join("");
  syncConsumptionPrice();

  document.getElementById("consumptionModal").classList.remove("hidden");
}

function syncConsumptionPrice() {
  const id = document.getElementById("consumptionService").value;
  const s = getServices().find((x) => x.id === id);
  document.getElementById("consumptionPrice").value = s ? s.price : 0;
}

function saveConsumption(e) {
  e.preventDefault();

  const code = document.getElementById("consumptionCode").value;
  const service = getServices().find((s) => s.id === document.getElementById("consumptionService").value);
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
    const consumptionTotal = consumptions.reduce((sum, c) => sum + Number(c.total || 0), 0);
    const newTotal = Number(b.lodgingTotal || 0) + Number(b.servicesTotal || 0) + consumptionTotal + Number(b.damageValue || 0) - Number(b.discount || 0);

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
  showToast("Consumo agregado.");
}

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
  const damageValue = hasDamage ? Number(document.getElementById("damageValue").value || 0) : 0;

  const bookings = getBookings().map((b) => {
    if (b.code !== code) return b;

    const newTotal = Number(b.lodgingTotal || 0) + Number(b.servicesTotal || 0) + Number(b.consumptionTotal || 0) + damageValue - Number(b.discount || 0);

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
  showToast("Check-out registrado. Ticket generado.");
}

function renderHousekeeping() {
  const list = document.getElementById("housekeepingList");
  if (!list) return;

  const relevant = getBookings().filter((b) => ["confirmed", "checked_in", "cleaning_pending"].includes(b.status));

  list.innerHTML = relevant.length ? relevant.map((b) => `
    <div class="admin-item">
      <div>
        <h4>${escapeHTML(b.unitName)} · ${escapeHTML(b.code)}</h4>
        <p>Huésped: ${escapeHTML(b.fullName)} · ${b.checkIn} al ${b.checkOut}</p>
        <p>Estado limpieza: <strong>${escapeHTML(b.housekeepingStatus || "—")}</strong> · Daños: ${b.damageReported ? money(b.damageValue) : "No reportados"}</p>
        <p>${escapeHTML(b.housekeepingNotes || "")}</p>
      </div>
      <div class="item-actions">
        <button class="action-btn orange" onclick="openHousekeepingModal('${b.code}')">Reportar</button>
      </div>
    </div>
  `).join("") : `<p class="helper-note">No hay habitaciones pendientes para housekeeping.</p>`;
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
  document.getElementById("housekeepingModal").classList.remove("hidden");
}

function saveHousekeepingReport(e) {
  e.preventDefault();

  const code = document.getElementById("houseCode").value;
  const status = document.getElementById("houseStatus").value;
  const damage = document.getElementById("houseDamage").value === "Sí";
  const damageValue = damage ? Number(document.getElementById("houseDamageValue").value || 0) : 0;

  const bookings = getBookings().map((b) => {
    if (b.code !== code) return b;
    let newStatus = b.status;
    if (status === "ready" && b.status === "cleaning_pending") newStatus = "completed";

    const newTotal = Number(b.lodgingTotal || 0) + Number(b.servicesTotal || 0) + Number(b.consumptionTotal || 0) + damageValue - Number(b.discount || 0);

    return {
      ...b,
      status: newStatus,
      housekeepingStatus: status,
      damageReported: damage,
      damageValue,
      total: newTotal,
      pendingBalance: newTotal - Number(b.paidValue || 0),
      housekeepingNotes: document.getElementById("houseNotes").value.trim(),
      housekeepingUpdatedAt: new Date().toISOString(),
      housekeepingBy: getSettings().houseName,
    };
  });

  setData(STORAGE_KEYS.bookings, bookings);
  document.getElementById("housekeepingModal").classList.add("hidden");
  renderAdminAll();
  showToast("Reporte Housekeeping guardado.");
}

function renderAdminUnits() {
  const list = document.getElementById("adminUnitsList");
  if (!list) return;
  list.innerHTML = getUnits().map((unit) => `
    <div class="admin-item">
      <div>
        <h4>${escapeHTML(unit.name)} · ${money(unit.price)}</h4>
        <p>${escapeHTML(unit.descriptionEs || "")}</p>
        <p>Adultos máx: ${unit.adults} · Niños máx: ${unit.children} · Estado: <span class="status-badge">${unit.status}</span></p>
      </div>
      <div class="item-actions">
        <button class="action-btn" onclick="openUnitModal('${unit.id}')">Editar</button>
        <button class="action-btn danger" onclick="deleteUnit('${unit.id}')">Eliminar</button>
      </div>
    </div>
  `).join("");
}

function openUnitModal(id = null) {
  document.getElementById("unitForm").reset();

  if (id) {
    const u = getUnits().find((x) => x.id === id);
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
    housekeepingStatus: "ready",
  };

  const exists = units.some((u) => u.id === id);
  setData(STORAGE_KEYS.units, exists ? units.map((u) => u.id === id ? unit : u) : [...units, unit]);
  document.getElementById("unitModal").classList.add("hidden");
  renderAdminAll();
  renderGlampings();
  showToast("Glamping guardado.");
}

function deleteUnit(id) {
  if (!confirm("¿Eliminar este glamping?")) return;
  setData(STORAGE_KEYS.units, getUnits().filter((u) => u.id !== id));
  renderAdminAll();
  renderGlampings();
}

function renderAdminServices() {
  const list = document.getElementById("adminServicesList");
  if (!list) return;
  list.innerHTML = getServices().map((s) => `
    <div class="admin-item">
      <div>
        <h4>${escapeHTML(s.nameEs)} · ${money(s.price)}</h4>
        <p>${escapeHTML(s.descriptionEs || "")}</p>
        <p>Tipo: ${s.type} · Estado: <span class="status-badge">${s.active ? "Activo" : "Inactivo"}</span></p>
      </div>
      <div class="item-actions">
        <button class="action-btn" onclick="openServiceModal('${s.id}')">Editar</button>
        <button class="action-btn danger" onclick="deleteService('${s.id}')">Eliminar</button>
      </div>
    </div>
  `).join("");
}

function openServiceModal(id = null) {
  document.getElementById("serviceForm").reset();

  if (id) {
    const s = getServices().find((x) => x.id === id);
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

  setData(STORAGE_KEYS.services, services.some((s) => s.id === id) ? services.map((s) => s.id === id ? service : s) : [...services, service]);
  document.getElementById("serviceModal").classList.add("hidden");
  renderAdminAll();
  showToast("Servicio guardado.");
}

function deleteService(id) {
  if (!confirm("¿Eliminar este servicio?")) return;
  setData(STORAGE_KEYS.services, getServices().filter((s) => s.id !== id));
  renderAdminAll();
}

function renderFinance() {
  const bookings = getBookings();
  const expenses = getExpenses();

  const income = bookings.reduce((sum, b) => sum + Number(b.paidValue || 0) + Number(b.retainedValue || 0), 0);
  const refunds = bookings.reduce((sum, b) => sum + Number(b.refundValue || 0), 0);
  const expenseTotal = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  document.getElementById("financeIncome").textContent = money(income);
  document.getElementById("financeRefunds").textContent = money(refunds);
  document.getElementById("financeExpenses").textContent = money(expenseTotal);
  document.getElementById("financeNet").textContent = money(income - refunds - expenseTotal);

  document.getElementById("expensesList").innerHTML = expenses.length ? expenses.map((e) => `
    <div class="admin-item">
      <div>
        <h4>${escapeHTML(e.category)} · ${money(e.amount)}</h4>
        <p>${e.date} · Responsable: ${escapeHTML(e.responsible || "")}</p>
        <p>${escapeHTML(e.description || "")}</p>
      </div>
      <div class="item-actions"><button class="action-btn danger" onclick="deleteExpense('${e.id}')">Eliminar</button></div>
    </div>
  `).join("") : `<p class="helper-note">No existen egresos registrados.</p>`;
}

function openExpenseModal() {
  document.getElementById("expenseForm").reset();
  document.getElementById("expenseDate").value = todayISO();
  document.getElementById("expenseOtherBox").classList.add("hidden");
  document.getElementById("expenseModal").classList.remove("hidden");
}

function saveExpense(e) {
  e.preventDefault();

  const category = document.getElementById("expenseCategory").value === "Otros"
    ? document.getElementById("expenseOther").value.trim()
    : document.getElementById("expenseCategory").value;

  const expenses = getExpenses();
  expenses.push({
    id: `EGR${Date.now()}`,
    date: document.getElementById("expenseDate").value,
    category,
    amount: Number(document.getElementById("expenseAmount").value),
    responsible: document.getElementById("expenseResponsible").value.trim(),
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
  `).join("") : `<p class="helper-note">No existen fechas especiales.</p>`;
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

  setData(STORAGE_KEYS.specials, specials.some((s) => s.id === id) ? specials.map((s) => s.id === id ? special : s) : [...specials, special]);
  document.getElementById("specialDateModal").classList.add("hidden");
  renderSpecialDates();
}

function deleteSpecialDate(id) {
  if (!confirm("¿Eliminar fecha especial?")) return;
  setData(STORAGE_KEYS.specials, getSpecials().filter((s) => s.id !== id));
  renderSpecialDates();
}

function renderSettingsForm() {
  const s = getSettings();
  const map = {
    settingBusinessName: "businessName",
    settingSubtitle: "subtitle",
    settingLogoUrl: "logoUrl",
    settingHeroImage: "heroImage",
    settingWhatsappCode: "whatsappCode",
    settingWhatsappNumber: "whatsappNumber",
    settingCheckin: "checkin",
    settingCheckout: "checkout",
    settingDeposit: "depositPercent",
    settingDeadlineHours: "deadlineHours",
    settingAdminUser: "adminUser",
    settingAdminPass: "adminPass",
    settingHouseUser: "houseUser",
    settingHousePass: "housePass",
    settingHouseName: "houseName",
    settingLegalName: "legalName",
    settingRuc: "ruc",
    settingMatrixAddress: "matrixAddress",
    settingBranchAddress: "branchAddress",
    settingBillingEmail: "billingEmail",
    settingBusinessPhone: "businessPhone",
    settingEstablishment: "establishment",
    settingEmissionPoint: "emissionPoint",
    settingSequential: "sequential",
    settingAccounting: "accounting",
  };

  Object.entries(map).forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el) el.value = s[key] ?? "";
  });
}

function saveSettings(e) {
  e.preventDefault();

  const s = {
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
    adminUser: document.getElementById("settingAdminUser").value.trim(),
    adminPass: document.getElementById("settingAdminPass").value.trim(),
    houseUser: document.getElementById("settingHouseUser").value.trim(),
    housePass: document.getElementById("settingHousePass").value.trim(),
    houseName: document.getElementById("settingHouseName").value.trim(),
    legalName: document.getElementById("settingLegalName").value.trim(),
    ruc: document.getElementById("settingRuc").value.trim(),
    matrixAddress: document.getElementById("settingMatrixAddress").value.trim(),
    branchAddress: document.getElementById("settingBranchAddress").value.trim(),
    billingEmail: document.getElementById("settingBillingEmail").value.trim(),
    businessPhone: document.getElementById("settingBusinessPhone").value.trim(),
    establishment: document.getElementById("settingEstablishment").value.trim(),
    emissionPoint: document.getElementById("settingEmissionPoint").value.trim(),
    sequential: Number(document.getElementById("settingSequential").value || 1),
    accounting: document.getElementById("settingAccounting").value,
  };

  setData(STORAGE_KEYS.settings, s);
  applySettings();
  renderAdminAll();
  showToast("Configuración guardada.");
}

function copyBookingSummary(code) {
  const b = getBookings().find((x) => x.code === code);
  if (!b) return;
  navigator.clipboard.writeText(`
Reserva: ${b.code}
Cliente: ${b.fullName}
Glamping: ${b.unitName}
Fechas: ${b.checkIn} al ${b.checkOut}
Total: ${money(b.total)}
Pagado: ${money(b.paidValue)}
Saldo: ${money(b.pendingBalance)}
Estado: ${translateStatus(b.status)}
  `.trim());
  showToast("Resumen copiado.");
}

function printTicket(code) {
  const b = getBookings().find((x) => x.code === code);
  const s = getSettings();
  if (!b) return;

  const services = [...(b.services || []), ...(b.consumptions || [])];
  const serviceRows = services.length ? services.map((x) => `
    <tr><td>${escapeHTML(x.name)}</td><td>${x.qty || 1}</td><td>${money(x.price || x.total)}</td><td>${money(x.total || x.price)}</td></tr>
  `).join("") : `<tr><td colspan="4">Sin consumos adicionales</td></tr>`;

  const ticket = `
    <html>
    <head>
      <title>Ticket ${b.code}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 24px; color: #111; }
        h1,h2,h3 { margin: 0 0 8px; }
        .box { border: 1px solid #ccc; padding: 12px; margin: 12px 0; border-radius: 8px; }
        table { width: 100%; border-collapse: collapse; margin-top: 12px; }
        th,td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .total { font-size: 20px; font-weight: bold; }
        .sign { margin-top: 50px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        .line { border-top: 1px solid #000; text-align: center; padding-top: 8px; }
      </style>
    </head>
    <body>
      <h1>${escapeHTML(s.businessName)}</h1>
      <p><strong>Razón social:</strong> ${escapeHTML(s.legalName || "")}</p>
      <p><strong>RUC:</strong> ${escapeHTML(s.ruc || "")}</p>
      <p><strong>Dirección:</strong> ${escapeHTML(s.branchAddress || s.matrixAddress || "")}</p>
      <p><strong>Ticket de salida:</strong> ${escapeHTML(b.code)}</p>

      <div class="box">
        <h3>Datos del huésped</h3>
        <p><strong>Cliente:</strong> ${escapeHTML(b.fullName)}</p>
        <p><strong>WhatsApp:</strong> ${escapeHTML(b.whatsappFull || "")}</p>
        <p><strong>Glamping:</strong> ${escapeHTML(b.unitName)}</p>
        <p><strong>Ingreso:</strong> ${b.checkIn} · <strong>Salida:</strong> ${b.checkOut} · <strong>Noches:</strong> ${b.nights}</p>
      </div>

      <div class="box">
        <h3>Detalle de consumos</h3>
        <table>
          <thead><tr><th>Concepto</th><th>Cant.</th><th>Unitario</th><th>Total</th></tr></thead>
          <tbody>
            <tr><td>Hospedaje</td><td>${b.nights}</td><td>${money((b.lodgingTotal || 0) / (b.nights || 1))}</td><td>${money(b.lodgingTotal || 0)}</td></tr>
            ${serviceRows}
            ${b.damageValue ? `<tr><td>Daños / multa</td><td>1</td><td>${money(b.damageValue)}</td><td>${money(b.damageValue)}</td></tr>` : ""}
            ${b.discount ? `<tr><td>Descuento</td><td>1</td><td>-${money(b.discount)}</td><td>-${money(b.discount)}</td></tr>` : ""}
          </tbody>
        </table>
      </div>

      <div class="box">
        <p class="total">Total final: ${money(b.total)}</p>
        <p><strong>Pagado:</strong> ${money(b.paidValue)}</p>
        <p><strong>Saldo:</strong> ${money(b.pendingBalance)}</p>
        <p><strong>Factura:</strong> ${escapeHTML(b.invoiceStatus || "sin_factura")}</p>
      </div>

      <p>Declaro haber recibido el detalle de consumo y cierre de estadía. Los valores pendientes, daños o consumos adicionales han sido revisados con administración.</p>

      <div class="sign">
        <div class="line">Firma huésped</div>
        <div class="line">Firma administración</div>
      </div>

      <script>window.print();</script>
    </body>
    </html>
  `;

  const win = window.open("", "_blank");
  win.document.write(ticket);
  win.document.close();
}
