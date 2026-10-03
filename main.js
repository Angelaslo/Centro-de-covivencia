/**
 * TAPACHULA TURÍSTICA - JAVASCRIPT VANILLA (ES6)
 * Gestión de estados, búsqueda, filtros, modal y persistencia LocalStorage.
 */

// 1. Base de Datos de Atractivos de Tapachula
const SPOTS_DATA = [
  {
    id: 'parque-central-mutap',
    title: 'Parque Central Miguel Hidalgo y Museo de Tapachula (MUTAP)',
    category: 'culture',
    categoryLabel: 'Centro Histórico & Cultura',
    description: 'El núcleo cívico y patrimonial del municipio de Tapachula. Antiguo Palacio Municipal, MUTAP, Kiosco tradicional y Parroquia de San Agustín.',
    longDescription: 'El Parque Central Miguel Hidalgo es el latido urbano de Tapachula de Córdova y Ordóñez. Resguarda el monumental Antiguo Palacio Municipal de 1928, hoy habilitado como Museo de Tapachula (MUTAP).',
    image: 'images/palacio-tapachula.jpg',
    rating: 4.9,
    reviewCount: 640,
    distanceFromCenter: '0 km (Centro)',
    duration: '2 - 3 horas',
    durationType: 'half_day',
    difficulty: 'Fácil',
    zone: 'centro_urbano',
    zoneLabel: 'Centro Urbano de Tapachula',
    jurisdiction: 'Primer Cuadro, Cabecera Municipal de Tapachula',
    highlights: [
      'Exposiciones históricas y arqueológicas en el Museo de Tapachula (MUTAP)',
      'Conciertos vespertinos de Marimba Chiapaneca en vivo bajo el Kiosco Central',
      'Andador peatonal de la 3ª Calle Poniente con cafeterías y neverías',
      'Parroquia de San Agustín, el templo virreinal fundado en 1547'
    ],
    tips: [
      'El mejor ambiente familiar ocurre de 5:30 PM a 8:30 PM con la marimba municipal.',
      'El MUTAP abre de martes a domingo de 10:00 AM a 6:00 PM.'
    ],
    transportInfo: 'Ubicado en el primer cuadro de la ciudad; accesible caminando desde cualquier hotel céntrico.'
  },
  {
    id: 'ruta-del-cafe-tapachula',
    title: 'Ruta del Café: Fincas Hamburgo, Argovia e Irlanda',
    category: 'cafe',
    categoryLabel: 'Ruta Cafetalera Serrana',
    description: 'Enclavadas en la zona rural montañosa del municipio de Tapachula, ofrecen recorridos de beneficio de café, museos históricos y hospedaje ecológico.',
    longDescription: 'La Ruta del Café se ubica en la porción norte y montañosa del Municipio de Tapachula (rumbo a Nueva Alemania). Fundadas a partir de 1888, fincas como Hamburgo, Argovia, San Francisco e Irlanda constituyen un modelo turístico-agrícola único a altitudes de hasta 1,400 m s.n.m.',
    image: 'images/ruta-cafe.jpg',
    rating: 4.9,
    reviewCount: 485,
    altitude: '1,250 m s.n.m.',
    distanceFromCenter: '38 a 48 km al norte',
    duration: '1 a 2 días',
    durationType: 'multi_day',
    difficulty: 'Fácil',
    zone: 'rural_sierra',
    zoneLabel: 'Zona Rural Alta de Tapachula',
    jurisdiction: 'Región Serrana, Municipio de Tapachula (Carretera Nueva Alemania)',
    highlights: [
      'Visita guiada al beneficio húmedo y secado de café orgánico de altura',
      'Museo de Sitio de Finca Hamburgo con maquinaria industrial alemana de 1890',
      'Jardín botánico de orquídeas y flores tropicales en Finca Argovia',
      'Hospedaje de montaña con arquitectura en madera y chimenea'
    ],
    tips: [
      'Llevar calzado con buen agarre y chamarra o suéter para la noche.',
      'Se recomienda salir temprano por la mañana desde la cabecera municipal.'
    ],
    transportInfo: 'Carretera pavimentada Tapachula - Nueva Alemania. Servicio de colectivos rurales desde la terminal de Tapachula o en vehículo propio (1.5 horas).'
  },
  {
    id: 'cascada-san-francisco',
    title: 'Cascadas de San Francisco & Bosque de Niebla',
    category: 'nature',
    categoryLabel: 'Ecoturismo Rural',
    description: 'Impresionante caída de agua oculta en la cuenca cafetalera rural de Tapachula. Caída de agua pura, helechos gigantes y pozas cristalinas.',
    longDescription: 'Situada en la demarcación rural norte de Tapachula, la Cascada de San Francisco atraviesa cafetales de sombra y densos manchones de bosque mesófilo de montaña hasta llegar a la imponente caída de agua que se precipita sobre rocas basálticas.',
    image: 'images/cascada-san-francisco.jpg',
    rating: 4.8,
    reviewCount: 220,
    altitude: '980 m s.n.m.',
    distanceFromCenter: '32 km al norte',
    duration: 'Día completo',
    durationType: 'full_day',
    difficulty: 'Moderado',
    zone: 'rural_sierra',
    zoneLabel: 'Zona Rural Alta de Tapachula',
    jurisdiction: 'Ejido San Francisco, Municipio de Tapachula',
    highlights: [
      'Caminata por senderos ecológicos bajo el dosel selvático',
      'Pozas naturales de agua fresca de manantial volcánico',
      'Miradores naturales hacia el cañón del río y plantaciones'
    ],
    tips: [
      'Llevar traje de baño, toalla, repelente ecológico y calzado antiderrapante.',
      'Contratar a los guías ejidales locales para el descenso seguro a las pozas.'
    ],
    transportInfo: 'Carretera Tapachula - Nueva Alemania hasta la desviación a San Francisco (1 hora desde el centro).'
  },
  {
    id: 'puerto-chiapas-playa-linda',
    title: 'Puerto Chiapas, Playa Linda y Barra San Benito',
    category: 'costa',
    categoryLabel: 'Litoral & Playas de Tapachula',
    description: 'La franja costera oficial del municipio de Tapachula. Kilómetros de arena volcánica oscura, atardeceres dorados sobre el Pacífico, palapas y manglares.',
    longDescription: 'El municipio de Tapachula se extiende hasta las orillas del Pacífico a través de Puerto Chiapas, Playa Linda y la Barra de San Benito. Ofrece un malecón escénico donde atracan cruceros internacionales, restaurantes de mariscos frescos bajo palapas y recorridos en lancha por los esteros.',
    image: 'images/playa-linda-puerto-chiapas.jpg',
    rating: 4.7,
    reviewCount: 510,
    distanceFromCenter: '28 km al sur',
    duration: 'Medio día o día completo',
    durationType: 'full_day',
    difficulty: 'Fácil',
    zone: 'rural_costa',
    zoneLabel: 'Zona Rural Costera de Tapachula',
    jurisdiction: 'Corredor Costero Puerto Madero - San Benito, Mpio. de Tapachula',
    highlights: [
      'Paseo por el Malecón de Puerto Chiapas y vista del faro',
      'Pescado a la talla, camarones al coco y ceviche soconusquense fresco',
      'Paseos en lancha por los esteros y canales de manglar protegido',
      'Espectaculares puestas de sol sobre el Océano Pacífico'
    ],
    tips: [
      'Bloqueador solar, lentes y sombrero son indispensables.',
      'La mejor hora para degustar mariscos en las palapas es entre 1:00 PM y 4:30 PM.'
    ],
    transportInfo: 'Autopista de 4 carriles Tapachula - Puerto Madero (25 a 30 minutos). Servicio regular de combis y taxis colectivos.'
  },
  {
    id: 'sabores-tostadurias-tapachula',
    title: 'Circuito de Tostadurías y Sabores Tradicionales',
    category: 'gastronomy',
    categoryLabel: 'Gastronomía Local',
    description: 'Recorrido por las tostadurías de café de origen en el centro de Tapachula, marquesote artesanal y los puestos del Mercado General Sebastián Escobar.',
    longDescription: 'La identidad culinaria de Tapachula fusiona raíces mames, chiapanecas, chinas y europeas. Este circuito permite degustar cafés de especialidad recién tostados, marquesote tradicional, botanas tapachultecas y tascalate espumoso.',
    image: 'images/gastronomia-cafe.jpg',
    rating: 4.9,
    reviewCount: 560,
    distanceFromCenter: 'Primer cuadro y Zona Urbana',
    duration: '3 - 4 horas',
    durationType: 'half_day',
    difficulty: 'Fácil',
    zone: 'centro_urbano',
    zoneLabel: 'Centro Urbano de Tapachula',
    jurisdiction: 'Casco Central y Mercados Municipales de Tapachula',
    highlights: [
      'Catas guiadas de café de origen con métodos artesanales V60 y Chemex',
      'Prueba de la botana tapachulteca tradicional en fondas del centro',
      'Plátanos machos rellenos de queso chiapaneco con crema',
      'Visita al Mercado General Sebastián Escobar para adquirir tascalate y frutas'
    ],
    tips: [
      'Pide tu café sin azúcar para saborear sus notas naturales de cacao y flores.',
      'Acompaña tu comida con un vaso de tascalate chiapaneco bien frío.'
    ],
    transportInfo: 'Recorrido a pie por las avenidas Central, 2ª y 4ª Norte del centro de Tapachula.'
  }
];

// 2. Directorio Comercial de Tapachula
const DIRECTORY_DATA = [
  {
    name: 'Cafetería y Tostaduría Café Soconusco Real',
    tag: 'Café & Tostaduría',
    desc: 'Café de estricta altura cultivado en la sierra de Tapachula con tueste artesanal a la vista.',
    address: '4ª Avenida Norte #18, Centro Histórico',
    phone: 'Tel: +52 962 626 4412'
  },
  {
    name: 'Restaurante Los Portales de Tapachula',
    tag: 'Restaurante Tradicional',
    desc: 'Botanas tapachultecas, cochito horneado tradicional y plátanos rellenos de queso.',
    address: 'Parque Central Miguel Hidalgo #4, Centro',
    phone: 'Tel: +52 962 625 1190'
  },
  {
    name: 'Finca Argovia Resort & Eco-Lodge',
    tag: 'Hospedaje Rural',
    desc: 'Cabañas en el bosque de niebla, spa con aromaterapia de café y senderismo de orquídeas.',
    address: 'Carretera Nueva Alemania Km 39.2, Sierra de Tapachula',
    phone: 'Tel: +52 962 626 0115'
  },
  {
    name: 'Hotel de Montaña Finca Hamburgo',
    tag: 'Hotel Histórico',
    desc: 'Suites con chimenea, mirador al dosel de niebla, museo histórico y cata de café.',
    address: 'Carretera Nueva Alemania Km 48, Sierra de Tapachula',
    phone: 'Tel: +52 962 626 7578'
  }
];

// 3. Estado de la Aplicación
const state = {
  searchQuery: '',
  selectedCategory: 'all',
  selectedZone: 'all',
  selectedDuration: 'all',
  savedSpotIds: JSON.parse(localStorage.getItem('tapachula_itinerary') || '["parque-central-mutap", "ruta-del-cafe-tapachula"]'),
  activeSpot: null,
  hasError: false
};

// 4. Elementos del DOM
const DOM = {
  searchInput: document.getElementById('searchInput'),
  clearSearchBtn: document.getElementById('clearSearchBtn'),
  openFilterBtn: document.getElementById('openFilterBtn'),
  activeFiltersBadge: document.getElementById('activeFiltersBadge'),
  categoryChips: document.getElementById('categoryChips'),
  resultsCount: document.getElementById('resultsCount'),
  simulateErrorBtn: document.getElementById('simulateErrorBtn'),
  errorBanner: document.getElementById('errorBanner'),
  retryBtn: document.getElementById('retryBtn'),
  dismissErrorBtn: document.getElementById('dismissErrorBtn'),

  cardsGrid: document.getElementById('cardsGrid'),
  skeletonGrid: document.getElementById('skeletonGrid'),
  emptyState: document.getElementById('emptyState'),
  resetSearchBtn: document.getElementById('resetSearchBtn'),
  directoryGrid: document.getElementById('directoryGrid'),

  filterModal: document.getElementById('filterModal'),
  closeFilterBtn: document.getElementById('closeFilterBtn'),
  applyFiltersBtn: document.getElementById('applyFiltersBtn'),
  resetFiltersBtn: document.getElementById('resetFiltersBtn'),
  zoneOptions: document.querySelectorAll('#zoneFilterOptions .filter-opt'),
  durationOptions: document.querySelectorAll('#durationFilterOptions .filter-opt'),

  detailModal: document.getElementById('detailModal'),
  closeDetailBtn: document.getElementById('closeDetailBtn'),
  closeDetailActionBtn: document.getElementById('closeDetailActionBtn'),
  toggleSaveDetailBtn: document.getElementById('toggleSaveDetailBtn'),
  detailImg: document.getElementById('detailImg'),
  detailKicker: document.getElementById('detailKicker'),
  spotDetailTitle: document.getElementById('spotDetailTitle'),
  detailLocation: document.getElementById('detailLocation'),
  detailRating: document.getElementById('detailRating'),
  detailDuration: document.getElementById('detailDuration'),
  detailDistance: document.getElementById('detailDistance'),
  detailDifficulty: document.getElementById('detailDifficulty'),
  detailDescription: document.getElementById('detailDescription'),
  detailHighlights: document.getElementById('detailHighlights'),
  detailTransport: document.getElementById('detailTransport'),
  detailTips: document.getElementById('detailTips'),

  openItineraryBtn: document.getElementById('openItineraryBtn'),
  itineraryDrawer: document.getElementById('itineraryDrawer'),
  closeDrawerBtn: document.getElementById('closeDrawerBtn'),
  itineraryItemsList: document.getElementById('itineraryItemsList'),
  itineraryCount: document.getElementById('itineraryCount'),
  printItineraryBtn: document.getElementById('printItineraryBtn'),
  clearItineraryBtn: document.getElementById('clearItineraryBtn')
};

// 5. Inicialización
document.addEventListener('DOMContentLoaded', () => {
  renderDirectory();
  updateItineraryUI();
  applyFiltersAndRender();
  setupEventListeners();
});

// 6. Asignación de Eventos
function setupEventListeners() {
  DOM.searchInput.addEventListener('input', (e) => {
    const val = e.target.value;
    state.searchQuery = val;
    DOM.clearSearchBtn.classList.toggle('is-hidden', !val);

    if (val.trim().toLowerCase() === 'error') {
      showError(true);
      return;
    } else {
      showError(false);
    }

    if (val.trim().length >= 3) {
      triggerSkeletonLoading(300);
    } else {
      applyFiltersAndRender();
    }
  });

  DOM.clearSearchBtn.addEventListener('click', () => {
    DOM.searchInput.value = '';
    state.searchQuery = '';
    DOM.clearSearchBtn.classList.add('is-hidden');
    applyFiltersAndRender();
  });

  DOM.resetSearchBtn.addEventListener('click', () => {
    DOM.searchInput.value = '';
    state.searchQuery = '';
    state.selectedCategory = 'all';
    state.selectedZone = 'all';
    state.selectedDuration = 'all';
    DOM.clearSearchBtn.classList.add('is-hidden');
    updateCategoryChipsUI();
    updateModalFiltersUI();
    applyFiltersAndRender();
  });

  DOM.categoryChips.addEventListener('click', (e) => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    state.selectedCategory = btn.getAttribute('data-category');
    updateCategoryChipsUI();
    triggerSkeletonLoading(200);
  });

  DOM.simulateErrorBtn.addEventListener('click', () => showError(true));
  DOM.dismissErrorBtn.addEventListener('click', () => showError(false));
  DOM.retryBtn.addEventListener('click', () => {
    showError(false);
    DOM.searchInput.value = '';
    state.searchQuery = '';
    applyFiltersAndRender();
  });

  DOM.openFilterBtn.addEventListener('click', () => openModal(DOM.filterModal));
  DOM.closeFilterBtn.addEventListener('click', () => closeModal(DOM.filterModal));
  DOM.filterModal.addEventListener('click', (e) => {
    if (e.target === DOM.filterModal) closeModal(DOM.filterModal);
  });

  DOM.zoneOptions.forEach((btn) => {
    btn.addEventListener('click', () => {
      DOM.zoneOptions.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.selectedZone = btn.getAttribute('data-zone');
    });
  });

  DOM.durationOptions.forEach((btn) => {
    btn.addEventListener('click', () => {
      DOM.durationOptions.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.selectedDuration = btn.getAttribute('data-duration');
    });
  });

  DOM.applyFiltersBtn.addEventListener('click', () => {
    closeModal(DOM.filterModal);
    triggerSkeletonLoading(250);
  });

  DOM.resetFiltersBtn.addEventListener('click', () => {
    state.selectedZone = 'all';
    state.selectedDuration = 'all';
    updateModalFiltersUI();
    closeModal(DOM.filterModal);
    applyFiltersAndRender();
  });

  DOM.closeDetailBtn.addEventListener('click', () => closeModal(DOM.detailModal));
  DOM.closeDetailActionBtn.addEventListener('click', () => closeModal(DOM.detailModal));
  DOM.detailModal.addEventListener('click', (e) => {
    if (e.target === DOM.detailModal) closeModal(DOM.detailModal);
  });

  DOM.toggleSaveDetailBtn.addEventListener('click', () => {
    if (!state.activeSpot) return;
    toggleSaveSpot(state.activeSpot.id);
    updateDetailSaveBtn();
  });

  DOM.openItineraryBtn.addEventListener('click', () => {
    renderItineraryDrawer();
    openModal(DOM.itineraryDrawer);
  });
  DOM.closeDrawerBtn.addEventListener('click', () => closeModal(DOM.itineraryDrawer));
  DOM.itineraryDrawer.addEventListener('click', (e) => {
    if (e.target === DOM.itineraryDrawer) closeModal(DOM.itineraryDrawer);
  });

  DOM.printItineraryBtn.addEventListener('click', () => window.print());
  DOM.clearItineraryBtn.addEventListener('click', () => {
    state.savedSpotIds = [];
    saveItinerary();
    updateItineraryUI();
    renderItineraryDrawer();
    applyFiltersAndRender();
  });
}

// 7. Filtrado y Renderizado
function applyFiltersAndRender() {
  const filtered = SPOTS_DATA.filter((spot) => {
    if (state.selectedCategory !== 'all' && spot.category !== state.selectedCategory) return false;
    if (state.selectedZone !== 'all' && spot.zone !== state.selectedZone) return false;
    if (state.selectedDuration !== 'all' && spot.durationType !== state.selectedDuration) return false;

    if (state.searchQuery.trim()) {
      if (state.searchQuery.trim().toLowerCase() === 'nulo') return false;
      const q = state.searchQuery.toLowerCase();
      const matchText = (
        spot.title.toLowerCase().includes(q) ||
        spot.description.toLowerCase().includes(q) ||
        spot.zoneLabel.toLowerCase().includes(q) ||
        spot.jurisdiction.toLowerCase().includes(q)
      );
      if (!matchText) return false;
    }
    return true;
  });

  DOM.resultsCount.textContent = filtered.length;

  let activeFilters = 0;
  if (state.selectedZone !== 'all') activeFilters++;
  if (state.selectedDuration !== 'all') activeFilters++;
  if (activeFilters > 0) {
    DOM.activeFiltersBadge.textContent = activeFilters;
    DOM.activeFiltersBadge.classList.remove('is-hidden');
  } else {
    DOM.activeFiltersBadge.classList.add('is-hidden');
  }

  if (filtered.length === 0) {
    DOM.cardsGrid.innerHTML = '';
    DOM.emptyState.classList.remove('is-hidden');
  } else {
    DOM.emptyState.classList.add('is-hidden');
    renderSpotCards(filtered);
  }
}

function renderSpotCards(spots) {
  DOM.cardsGrid.innerHTML = spots.map((spot) => {
    const isSaved = state.savedSpotIds.includes(spot.id);
    return `
      <article class="card-spot" onclick="openSpotById('${spot.id}')" tabindex="0">
        <div class="card-media">
          <img 
            src="${spot.image}" 
            alt="${spot.title}" 
            class="card-img" 
            loading="lazy"
            onerror="this.src='images/palacio-tapachula.jpg'"
          >
          <div class="card-overlay"></div>
          <button 
            type="button" 
            class="btn-bookmark ${isSaved ? 'is-saved' : ''}" 
            onclick="event.stopPropagation(); toggleSaveSpot('${spot.id}')"
            aria-label="Guardar en itinerario"
            title="${isSaved ? 'Guardado en itinerario' : 'Guardar en itinerario'}"
          >
            ${isSaved ? '★' : '☆'}
          </button>
          <span class="card-zone-tag">📍 ${spot.zoneLabel}</span>
        </div>

        <div class="card-content">
          <div>
            <div class="card-meta">
              <span class="card-category">${spot.categoryLabel}</span>
              <span>·</span>
              <span>${spot.duration}</span>
              ${spot.altitude ? `<span>·</span><span>${spot.altitude}</span>` : ''}
            </div>

            <h3 class="card-title">${spot.title}</h3>
            <p class="card-desc">${spot.description}</p>
            <p class="card-jurisdiction">📍 ${spot.jurisdiction}</p>
          </div>

          <div class="card-footer">
            <span class="card-rating">★ ${spot.rating} (${spot.reviewCount})</span>
            <span class="card-action">Ver ficha →</span>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// 8. Ficha Detallada
function openSpotById(id) {
  const spot = SPOTS_DATA.find((s) => s.id === id);
  if (!spot) return;
  state.activeSpot = spot;

  DOM.detailImg.src = spot.image;
  DOM.detailImg.alt = spot.title;
  DOM.detailKicker.textContent = `${spot.zoneLabel} · ${spot.categoryLabel}`;
  DOM.spotDetailTitle.textContent = spot.title;
  DOM.detailLocation.textContent = `📍 ${spot.jurisdiction}`;

  DOM.detailRating.textContent = `★ ${spot.rating} (${spot.reviewCount})`;
  DOM.detailDuration.textContent = spot.duration;
  DOM.detailDistance.textContent = spot.distanceFromCenter;
  DOM.detailDifficulty.textContent = spot.difficulty || 'Fácil';

  DOM.detailDescription.textContent = spot.longDescription;
  DOM.detailHighlights.innerHTML = spot.highlights.map((h) => `<li>${h}</li>`).join('');
  DOM.detailTransport.textContent = spot.transportInfo;
  DOM.detailTips.innerHTML = spot.tips.map((t) => `<li>${t}</li>`).join('');

  updateDetailSaveBtn();
  openModal(DOM.detailModal);
}

function updateDetailSaveBtn() {
  if (!state.activeSpot) return;
  const isSaved = state.savedSpotIds.includes(state.activeSpot.id);
  if (isSaved) {
    DOM.toggleSaveDetailBtn.textContent = '★ Guardado en mi Itinerario';
    DOM.toggleSaveDetailBtn.classList.add('btn-primary');
    DOM.toggleSaveDetailBtn.classList.remove('btn-secondary');
  } else {
    DOM.toggleSaveDetailBtn.textContent = '☆ Guardar en mi Itinerario';
    DOM.toggleSaveDetailBtn.classList.remove('btn-primary');
    DOM.toggleSaveDetailBtn.classList.add('btn-secondary');
  }
}

// 9. Itinerario
function toggleSaveSpot(id) {
  if (state.savedSpotIds.includes(id)) {
    state.savedSpotIds = state.savedSpotIds.filter((item) => item !== id);
  } else {
    state.savedSpotIds.push(id);
  }
  saveItinerary();
  updateItineraryUI();
  applyFiltersAndRender();
}

function saveItinerary() {
  localStorage.setItem('tapachula_itinerary', JSON.stringify(state.savedSpotIds));
}

function updateItineraryUI() {
  DOM.itineraryCount.textContent = state.savedSpotIds.length;
}

function renderItineraryDrawer() {
  const savedSpots = SPOTS_DATA.filter((s) => state.savedSpotIds.includes(s.id));
  if (savedSpots.length === 0) {
    DOM.itineraryItemsList.innerHTML = `
      <div style="text-align: center; padding: 2rem 0; color: #78716c; font-size: 0.8125rem;">
        <p>No tienes atractivos guardados.</p>
        <p style="font-size: 0.75rem; margin-top: 0.5rem;">Haz clic en la estrella de cualquier tarjeta para agregar paradas a tu recorrido.</p>
      </div>
    `;
    return;
  }

  DOM.itineraryItemsList.innerHTML = savedSpots.map((spot, idx) => `
    <div class="itinerary-card">
      <img src="${spot.image}" alt="${spot.title}" class="itinerary-thumb">
      <div class="itinerary-info">
        <span style="font-size: 0.6875rem; color: #b45309; font-weight: 700;">PARADA ${idx + 1}</span>
        <h4 class="itinerary-name">${spot.title}</h4>
        <span class="itinerary-time">⏱️ ${spot.duration}</span>
      </div>
      <button 
        class="btn-remove-item" 
        onclick="toggleSaveSpot('${spot.id}'); renderItineraryDrawer();" 
        title="Quitar parada"
        aria-label="Quitar ${spot.title}"
      >&times;</button>
    </div>
  `).join('');
}

// 10. Directorio Comercial
function renderDirectory() {
  DOM.directoryGrid.innerHTML = DIRECTORY_DATA.map((biz) => `
    <article class="biz-card">
      <div>
        <span class="biz-tag">${biz.tag}</span>
        <h4 class="biz-name" style="margin-top: 0.25rem;">${biz.name}</h4>
        <p class="biz-desc" style="margin-top: 0.375rem;">${biz.desc}</p>
      </div>
      <div>
        <p class="biz-address">📍 ${biz.address}</p>
        <p class="biz-phone">📞 ${biz.phone}</p>
      </div>
    </article>
  `).join('');
}

// 11. Utilidades
function openModal(el) {
  el.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal(el) {
  el.classList.add('is-hidden');
  document.body.style.overflow = '';
}

function showError(visible) {
  state.hasError = visible;
  DOM.errorBanner.classList.toggle('is-hidden', !visible);
}

function triggerSkeletonLoading(duration) {
  DOM.cardsGrid.classList.add('is-hidden');
  DOM.emptyState.classList.add('is-hidden');
  DOM.skeletonGrid.classList.remove('is-hidden');

  setTimeout(() => {
    DOM.skeletonGrid.classList.add('is-hidden');
    DOM.cardsGrid.classList.remove('is-hidden');
    applyFiltersAndRender();
  }, duration);
}

function filterByCategory(cat) {
  state.selectedCategory = cat;
  updateCategoryChipsUI();
  triggerSkeletonLoading(200);
  const el = document.getElementById('rutas');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function updateCategoryChipsUI() {
  const chips = DOM.categoryChips.querySelectorAll('.chip');
  chips.forEach((c) => {
    const isTarget = c.getAttribute('data-category') === state.selectedCategory;
    c.classList.toggle('active', isTarget);
  });
}

function updateModalFiltersUI() {
  DOM.zoneOptions.forEach((b) => {
    b.classList.toggle('active', b.getAttribute('data-zone') === state.selectedZone);
  });
  DOM.durationOptions.forEach((b) => {
    b.classList.toggle('active', b.getAttribute('data-duration') === state.selectedDuration);
  });
}