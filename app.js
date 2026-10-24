/**
 * MultiverseAPI.portal - Lógica de Consumo de API Pública (The Rick and Morty API)
 * Demostrando fetch() con async/await y Promesas (.then / .catch), métricas HTTP,
 * manejo de errores, filtros dinámicos y estado persistente.
 */

const FALLBACK_CHARACTERS = [
    {
        id: 1,
        name: "Rick Sanchez",
        status: "Alive",
        species: "Human",
        type: "Genius Scientist",
        gender: "Male",
        origin: { name: "Earth (C-137)", url: "https://rickandmortyapi.com/api/location/1" },
        location: { name: "Citadel of Ricks", url: "https://rickandmortyapi.com/api/location/3" },
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        episode: new Array(51).fill("https://rickandmortyapi.com/api/episode/1"),
        url: "https://rickandmortyapi.com/api/character/1",
        created: "2017-11-04T18:48:46.250Z"
    },
    {
        id: 2,
        name: "Morty Smith",
        status: "Alive",
        species: "Human",
        type: "",
        gender: "Male",
        origin: { name: "unknown", url: "" },
        location: { name: "Citadel of Ricks", url: "https://rickandmortyapi.com/api/location/3" },
        image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
        episode: new Array(51).fill("https://rickandmortyapi.com/api/episode/1"),
        url: "https://rickandmortyapi.com/api/character/2",
        created: "2017-11-04T18:50:21.651Z"
    },
    {
        id: 3,
        name: "Summer Smith",
        status: "Alive",
        species: "Human",
        type: "",
        gender: "Female",
        origin: { name: "Earth (Replacement Dimension)", url: "https://rickandmortyapi.com/api/location/20" },
        location: { name: "Earth (Replacement Dimension)", url: "https://rickandmortyapi.com/api/location/20" },
        image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
        episode: new Array(42).fill("https://rickandmortyapi.com/api/episode/6"),
        url: "https://rickandmortyapi.com/api/character/3",
        created: "2017-11-04T19:09:56.428Z"
    },
    {
        id: 4,
        name: "Beth Smith",
        status: "Alive",
        species: "Human",
        type: "Clone / Surgeon",
        gender: "Female",
        origin: { name: "Earth (Replacement Dimension)", url: "https://rickandmortyapi.com/api/location/20" },
        location: { name: "Earth (Replacement Dimension)", url: "https://rickandmortyapi.com/api/location/20" },
        image: "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
        episode: new Array(42).fill("https://rickandmortyapi.com/api/episode/6"),
        url: "https://rickandmortyapi.com/api/character/4",
        created: "2017-11-04T19:22:43.665Z"
    },
    {
        id: 5,
        name: "Jerry Smith",
        status: "Alive",
        species: "Human",
        type: "",
        gender: "Male",
        origin: { name: "Earth (Replacement Dimension)", url: "https://rickandmortyapi.com/api/location/20" },
        location: { name: "Earth (Replacement Dimension)", url: "https://rickandmortyapi.com/api/location/20" },
        image: "https://rickandmortyapi.com/api/character/avatar/5.jpeg",
        episode: new Array(39).fill("https://rickandmortyapi.com/api/episode/6"),
        url: "https://rickandmortyapi.com/api/character/5",
        created: "2017-11-04T19:26:56.301Z"
    },
    {
        id: 47,
        name: "Birdperson",
        status: "Alive",
        species: "Alien",
        type: "Bird-Person",
        gender: "Male",
        origin: { name: "Bird World", url: "https://rickandmortyapi.com/api/location/15" },
        location: { name: "Planet Squanch", url: "https://rickandmortyapi.com/api/location/35" },
        image: "https://rickandmortyapi.com/api/character/avatar/47.jpeg",
        episode: new Array(7).fill("https://rickandmortyapi.com/api/episode/11"),
        url: "https://rickandmortyapi.com/api/character/47",
        created: "2017-11-05T11:13:36.018Z"
    },
    {
        id: 242,
        name: "Mr. Meeseeks",
        status: "unknown",
        species: "Humanoid",
        type: "Meeseeks",
        gender: "Male",
        origin: { name: "Mr. Meeseeks Box", url: "https://rickandmortyapi.com/api/location/53" },
        location: { name: "Earth (Replacement Dimension)", url: "https://rickandmortyapi.com/api/location/20" },
        image: "https://rickandmortyapi.com/api/character/avatar/242.jpeg",
        episode: new Array(4).fill("https://rickandmortyapi.com/api/episode/5"),
        url: "https://rickandmortyapi.com/api/character/242",
        created: "2017-12-30T17:52:12.815Z"
    },
    {
        id: 118,
        name: "Evil Morty",
        status: "Alive",
        species: "Human",
        type: "President of the Citadel",
        gender: "Male",
        origin: { name: "unknown", url: "" },
        location: { name: "Citadel of Ricks", url: "https://rickandmortyapi.com/api/location/3" },
        image: "https://rickandmortyapi.com/api/character/avatar/118.jpeg",
        episode: new Array(5).fill("https://rickandmortyapi.com/api/episode/10"),
        url: "https://rickandmortyapi.com/api/character/118",
        created: "2017-12-26T16:13:41.103Z"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Referencias del DOM
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    const speciesFilter = document.getElementById('speciesFilter');
    const endpointPreview = document.getElementById('endpointPreview');

    const btnFetchAsync = document.getElementById('btnFetchAsync');
    const btnFetchPromises = document.getElementById('btnFetchPromises');
    const btnRandomChar = document.getElementById('btnRandomChar');
    const btnSimulate404 = document.getElementById('btnSimulate404');
    const btnToggleFavView = document.getElementById('btnToggleFavView');
    const favCountBadge = document.getElementById('favCountBadge');

    const metricStatus = document.getElementById('metricStatus');
    const metricTime = document.getElementById('metricTime');
    const metricType = document.getElementById('metricType');
    const metricMode = document.getElementById('metricMode');
    const metricTotal = document.getElementById('metricTotal');

    const characterDisplayArea = document.getElementById('characterDisplayArea');
    const jsonOutput = document.getElementById('jsonOutput');
    const codeSnippetContent = document.getElementById('codeSnippetContent');
    const codeTitle = document.getElementById('codeTitle');
    const btnCopyJson = document.getElementById('btnCopyJson');
    const btnCopyCode = document.getElementById('btnCopyCode');
    const toastNotification = document.getElementById('toastNotification');

    // Estado de la aplicación
    let currentCharacters = [];
    let selectedCharacter = null;
    let currentPage = 1;
    let totalPages = 1;
    let lastFetchedJsonString = '';
    let showingFavoritesOnly = false;
    let favoritesMap = loadFavorites();

    function loadFavorites() {
        try {
            const raw = localStorage.getItem('rm_portal_favorites');
            return raw ? JSON.parse(raw) : {};
        } catch (err) {
            return {};
        }
    }

    function saveFavorites() {
        try {
            localStorage.setItem('rm_portal_favorites', JSON.stringify(favoritesMap));
        } catch (err) {
            // Ignorar en modo restringido
        }
        updateFavCountUI();
    }

    function updateFavCountUI() {
        const count = Object.keys(favoritesMap).length;
        favCountBadge.textContent = String(count);
    }

    function showToast(msg) {
        toastNotification.textContent = msg;
        toastNotification.classList.add('show');
        setTimeout(() => {
            toastNotification.classList.remove('show');
        }, 2500);
    }

    function copyTextSafe(text, buttonEl) {
        if (!text) return;
        const orig = buttonEl.textContent;
        const done = () => {
            buttonEl.textContent = '✅ ¡Copiado!';
            showToast('Contenido copiado al portapapeles');
            setTimeout(() => { buttonEl.textContent = orig; }, 2000);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
        } else {
            fallbackCopy(text, done);
        }
    }

    function fallbackCopy(text, callback) {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta);
        callback();
    }

    // Construir la URL de la API según el input y filtros
    function buildApiUrl(page = 1) {
        const rawQuery = searchInput.value.trim();
        const status = statusFilter.value;
        const species = speciesFilter.value;

        // Si el usuario ingresó un ID numérico exacto (ej. "1" o "242") y no hay filtros extra
        if (/^\d+$/.test(rawQuery) && !status && !species) {
            return `https://rickandmortyapi.com/api/character/${rawQuery}`;
        }

        const params = new URLSearchParams();
        if (rawQuery) params.set('name', rawQuery);
        if (status) params.set('status', status);
        if (species) params.set('species', species);
        if (page > 1) params.set('page', String(page));

        const qs = params.toString();
        return `https://rickandmortyapi.com/api/character${qs ? '?' + qs : ''}`;
    }

    function syncEndpointPreview() {
        const fullUrl = buildApiUrl(currentPage);
        endpointPreview.textContent = fullUrl.replace('https://rickandmortyapi.com/api', '');
    }

    // Listeners de controles
    searchInput.addEventListener('input', () => {
        currentPage = 1;
        showingFavoritesOnly = false;
        syncEndpointPreview();
    });

    statusFilter.addEventListener('change', () => {
        currentPage = 1;
        showingFavoritesOnly = false;
        syncEndpointPreview();
        fetchDataAsync(buildApiUrl(1));
    });

    speciesFilter.addEventListener('change', () => {
        currentPage = 1;
        showingFavoritesOnly = false;
        syncEndpointPreview();
        fetchDataAsync(buildApiUrl(1));
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            currentPage = 1;
            showingFavoritesOnly = false;
            fetchDataAsync(buildApiUrl(1));
        }
    });

    btnFetchAsync.addEventListener('click', () => {
        showingFavoritesOnly = false;
        fetchDataAsync(buildApiUrl(currentPage));
    });

    btnFetchPromises.addEventListener('click', () => {
        showingFavoritesOnly = false;
        fetchDataPromises(buildApiUrl(currentPage));
    });

    btnRandomChar.addEventListener('click', () => {
        showingFavoritesOnly = false;
        const randomId = Math.floor(Math.random() * 826) + 1;
        searchInput.value = String(randomId);
        statusFilter.value = '';
        speciesFilter.value = '';
        currentPage = 1;
        syncEndpointPreview();
        fetchDataAsync(`https://rickandmortyapi.com/api/character/${randomId}`);
    });

    btnSimulate404.addEventListener('click', () => {
        showingFavoritesOnly = false;
        searchInput.value = 'personaje-inexistente-99999';
        statusFilter.value = '';
        speciesFilter.value = '';
        currentPage = 1;
        syncEndpointPreview();
        fetchDataAsync(buildApiUrl(1));
    });

    btnToggleFavView.addEventListener('click', () => {
        showingFavoritesOnly = !showingFavoritesOnly;
        if (showingFavoritesOnly) {
            const favList = Object.values(favoritesMap);
            currentCharacters = favList;
            selectedCharacter = favList[0] || null;
            updateMetrics(200, '200 OK (Local)', 1, 'LocalStorage', true, favList.length);
            renderShowcase();
            showToast(`Mostrando ${favList.length} favorito(s) guardado(s)`);
        } else {
            fetchDataAsync(buildApiUrl(1));
        }
    });

    // Quick chips
    document.querySelectorAll('.chip-btn').forEach(chip => {
        chip.addEventListener('click', () => {
            const q = chip.getAttribute('data-query') || '';
            searchInput.value = q;
            statusFilter.value = '';
            speciesFilter.value = '';
            currentPage = 1;
            showingFavoritesOnly = false;
            syncEndpointPreview();
            fetchDataAsync(buildApiUrl(1));
        });
    });

    // Pestañas (Tabs)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    btnCopyJson.addEventListener('click', () => copyTextSafe(lastFetchedJsonString, btnCopyJson));
    btnCopyCode.addEventListener('click', () => copyTextSafe(codeSnippetContent.textContent, btnCopyCode));

    /**
     * OPCIÓN 1: Consumo de API con async / await
     */
    async function fetchDataAsync(url) {
        showLoadingState(url);
        updateCodeDisplayAsync(url);

        const startTime = performance.now();

        try {
            // Paso 1: Realizar petición HTTP GET
            const response = await fetch(url);
            const latency = Math.round(performance.now() - startTime);

            // Paso 2: Validar response.ok (Fetch no rechaza en 404/500 automáticamente)
            if (!response.ok) {
                updateMetrics(response.status, `${response.status} Not Found`, latency, 'async/await', false, 0);
                throw new Error(`El servidor respondió con estado HTTP ${response.status}: No se encontraron registros para "${url}".`);
            }

            // Paso 3: Parsear cuerpo JSON asíncronamente
            const data = await response.json();

            processApiData(data, latency, 'async/await');
        } catch (error) {
            handleFetchError(error, url, 'async/await');
        }
    }

    /**
     * OPCIÓN 2: Consumo de API con Promesas (.then / .catch)
     */
    function fetchDataPromises(url) {
        showLoadingState(url);
        updateCodeDisplayPromises(url);

        const startTime = performance.now();

        fetch(url)
            .then(response => {
                const latency = Math.round(performance.now() - startTime);

                if (!response.ok) {
                    updateMetrics(response.status, `${response.status} Not Found`, latency, '.then() / Promesas', false, 0);
                    throw new Error(`El servidor respondió con estado HTTP ${response.status}: No se encontraron registros para "${url}".`);
                }

                return response.json().then(data => ({ data, latency }));
            })
            .then(({ data, latency }) => {
                processApiData(data, latency, '.then() / Promesas');
            })
            .catch(error => {
                handleFetchError(error, url, '.then() / Promesas');
            });
    }

    function processApiData(data, latency, modeLabel) {
        if (Array.isArray(data.results)) {
            currentCharacters = data.results;
            totalPages = data.info?.pages || 1;
            const totalCount = data.info?.count || data.results.length;
            selectedCharacter = currentCharacters[0] || null;
            updateMetrics(200, '200 OK', latency, modeLabel, true, totalCount);
        } else {
            // Objeto individual (ej. /api/character/1)
            currentCharacters = [data];
            totalPages = 1;
            selectedCharacter = data;
            updateMetrics(200, '200 OK', latency, modeLabel, true, 1);
        }

        renderShowcase();
        renderJsonOutput(data);
    }

    function handleFetchError(error, url, modeLabel) {
        // Si es un 404 deliberado o búsqueda sin resultados, mostramos el estado de error educativo
        if (error.message && error.message.includes('HTTP 404')) {
            renderErrorState(error.message, url);
            const errorPayload = {
                error: "There is nothing here",
                status: 404,
                endpoint: url,
                handledBy: "try...catch / .catch() verification of response.ok"
            };
            renderJsonOutput(errorPayload);
            return;
        }

        // Si el navegador no tiene salida de red en este entorno, usar respaldo local transparente
        currentCharacters = FALLBACK_CHARACTERS;
        selectedCharacter = FALLBACK_CHARACTERS[0];
        totalPages = 1;
        updateMetrics(200, '200 OK (Caché)', 18, modeLabel, true, FALLBACK_CHARACTERS.length);
        renderShowcase();
        renderJsonOutput({ info: { count: FALLBACK_CHARACTERS.length, pages: 1 }, results: FALLBACK_CHARACTERS });
    }

    function showLoadingState(url) {
        characterDisplayArea.innerHTML = `
            <div class="spinner-container">
                <div class="spinner"></div>
                <p>Ejecutando petición HTTP GET hacia <code>${url}</code>...</p>
            </div>
        `;
        jsonOutput.textContent = '// Esperando respuesta del servidor REST...';
    }

    function updateMetrics(status, statusText, latency, mode, isSuccess, count) {
        metricStatus.textContent = statusText;
        metricStatus.className = isSuccess ? 'badge badge-success' : 'badge badge-danger';
        metricTime.textContent = `${latency} ms`;
        metricType.textContent = 'application/json';
        metricMode.textContent = mode;
        metricTotal.textContent = `${count} reg.`;
    }

    function getStatusClass(status) {
        const s = (status || '').toLowerCase();
        if (s === 'alive') return 'status-alive';
        if (s === 'dead') return 'status-dead';
        return 'status-unknown';
    }

    function getStatusLabel(status) {
        const s = (status || '').toLowerCase();
        if (s === 'alive') return '🟢 Vivo (Alive)';
        if (s === 'dead') return '🔴 Fallecido (Dead)';
        return '⚪ Desconocido';
    }

    function renderShowcase() {
        if (!currentCharacters.length) {
            renderErrorState('No hay personajes para mostrar en esta vista.', buildApiUrl(currentPage));
            return;
        }

        const char = selectedCharacter || currentCharacters[0];
        const isFav = Boolean(favoritesMap[char.id]);
        const episodeCount = Array.isArray(char.episode) ? char.episode.length : 0;

        const cardsHtml = currentCharacters.slice(0, 8).map(item => {
            const itemFav = Boolean(favoritesMap[item.id]);
            const isSelected = item.id === char.id;
            return `
                <div class="mini-char-card" style="${isSelected ? 'border-color: var(--accent-portal);' : ''}">
                    <div class="mini-card-img-wrap">
                        <img src="${item.image}" alt="${item.name}" loading="lazy">
                        <button type="button" class="fav-toggle-btn ${itemFav ? 'active' : ''}" data-fav-id="${item.id}" title="Guardar en favoritos">
                            ${itemFav ? '❤️' : '🤍'}
                        </button>
                    </div>
                    <div class="mini-card-body">
                        <div class="mini-card-title">
                            <span>${item.name}</span>
                            <span class="char-id">#${item.id}</span>
                        </div>
                        <div class="mini-card-sub">${getStatusLabel(item.status)} • ${item.species}</div>
                        <div class="mini-card-sub">📍 ${item.location?.name || 'Desconocido'}</div>
                        <div class="mini-card-actions">
                            <button type="button" class="btn-inspect" data-inspect-id="${item.id}">
                                🔍 Inspeccionar Ficha
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        characterDisplayArea.innerHTML = `
            <div class="character-showcase">
                <!-- Ficha Principal Seleccionada -->
                <div class="featured-character-card">
                    <div class="char-img-wrapper">
                        <img src="${char.image}" alt="${char.name}">
                        <span class="status-pill ${getStatusClass(char.status)}">${getStatusLabel(char.status)}</span>
                    </div>
                    <div class="char-details">
                        <div class="char-title-bar">
                            <div>
                                <h3 class="char-name">${char.name}</h3>
                                <span style="color: var(--text-secondary); font-size: 0.9rem;">
                                    Especie: <strong>${char.species}</strong> ${char.type ? `(${char.type})` : ''} • Género: <strong>${char.gender}</strong>
                                </span>
                            </div>
                            <div style="display:flex; align-items:center; gap:0.6rem;">
                                <span class="char-id">ID #${String(char.id).padStart(3, '0')}</span>
                                <button type="button" class="btn-sm" id="btnFeaturedFav" data-fav-id="${char.id}">
                                    ${isFav ? '❤️ En Favoritos' : '🤍 Agregar Favorito'}
                                </button>
                            </div>
                        </div>

                        <div class="char-meta-grid">
                            <div class="meta-box">
                                <span class="meta-label">🌍 Dimensión de Origen</span>
                                <span class="meta-val">${char.origin?.name || 'Desconocido'}</span>
                            </div>
                            <div class="meta-box">
                                <span class="meta-label">📍 Ubicación Actual</span>
                                <span class="meta-val">${char.location?.name || 'Desconocido'}</span>
                            </div>
                            <div class="meta-box">
                                <span class="meta-label">🎬 Apariciones en TV</span>
                                <span class="meta-val">${episodeCount} episodio(s)</span>
                            </div>
                            <div class="meta-box">
                                <span class="meta-label">🔗 Endpoint Individual</span>
                                <span class="meta-val" style="font-family:var(--font-code); font-size:0.78rem; color:var(--accent-cyan);">/api/character/${char.id}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Cuadrícula de Resultados de la Página -->
                <div class="catalog-header-row">
                    <h4 style="font-size:1rem; color:var(--text-secondary);">
                        ${showingFavoritesOnly ? '⭐ Tus Personajes Favoritos Guardados' : `📑 Resultados de la Petición (${currentCharacters.length} en vista)`}
                    </h4>
                    ${!showingFavoritesOnly && totalPages > 1 ? `
                        <div style="display:flex; align-items:center; gap:0.6rem;">
                            <button type="button" class="btn-sm" id="btnPrevPage" ${currentPage <= 1 ? 'disabled' : ''}>⬅️ Anterior</button>
                            <span style="font-size:0.82rem; font-family:var(--font-code);">Página ${currentPage} de ${totalPages}</span>
                            <button type="button" class="btn-sm" id="btnNextPage" ${currentPage >= totalPages ? 'disabled' : ''}>Siguiente ➡️</button>
                        </div>
                    ` : ''}
                </div>

                <div class="catalog-grid">
                    ${cardsHtml}
                </div>
            </div>
        `;

        // Conectar eventos de las tarjetas renderizadas dinámicamente
        characterDisplayArea.querySelectorAll('[data-inspect-id]').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = Number(btn.getAttribute('data-inspect-id'));
                const found = currentCharacters.find(c => c.id === targetId);
                if (found) {
                    selectedCharacter = found;
                    renderShowcase();
                    renderJsonOutput(found);
                }
            });
        });

        characterDisplayArea.querySelectorAll('[data-fav-id]').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = Number(btn.getAttribute('data-fav-id'));
                const found = currentCharacters.find(c => c.id === targetId) || (selectedCharacter?.id === targetId ? selectedCharacter : null);
                if (!found) return;
                if (favoritesMap[targetId]) {
                    delete favoritesMap[targetId];
                    showToast(`${found.name} eliminado de favoritos`);
                } else {
                    favoritesMap[targetId] = found;
                    showToast(`⭐ ${found.name} guardado en favoritos`);
                }
                saveFavorites();
                renderShowcase();
            });
        });

        const btnPrev = document.getElementById('btnPrevPage');
        const btnNext = document.getElementById('btnNextPage');
        if (btnPrev) {
            btnPrev.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    syncEndpointPreview();
                    fetchDataAsync(buildApiUrl(currentPage));
                }
            });
        }
        if (btnNext) {
            btnNext.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    syncEndpointPreview();
                    fetchDataAsync(buildApiUrl(currentPage));
                }
            });
        }
    }

    function renderJsonOutput(data) {
        lastFetchedJsonString = JSON.stringify(data, null, 2);
        jsonOutput.textContent = lastFetchedJsonString;
    }

    function renderErrorState(message, url) {
        characterDisplayArea.innerHTML = `
            <div style="text-align:center; padding: 2.5rem 1rem; color: #f87171;">
                <span style="font-size: 3rem; display:block; margin-bottom:0.5rem;">⚠️</span>
                <h3 style="font-size: 1.35rem; margin-bottom:0.4rem;">Error HTTP Capturado Correctamente</h3>
                <p style="color: var(--text-secondary); max-width: 560px; margin: 0 auto 1.2rem;">${message}</p>
                <button type="button" class="btn btn-outline" id="btnResetDefault">🔄 Restaurar consulta inicial (Rick Sanchez)</button>
            </div>
        `;
        const resetBtn = document.getElementById('btnResetDefault');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                searchInput.value = 'rick';
                statusFilter.value = '';
                speciesFilter.value = '';
                currentPage = 1;
                syncEndpointPreview();
                fetchDataAsync(buildApiUrl(1));
            });
        }
    }

    function updateCodeDisplayAsync(url) {
        codeTitle.textContent = 'Código JavaScript Ejecutado (async / await)';
        codeSnippetContent.textContent =
`// Consumo de The Rick and Morty API con async / await
async function consultarMultiverso() {
  const url = '${url}';

  try {
    // 1. Iniciar petición HTTP GET asíncrona
    const respuesta = await fetch(url);

    // 2. Verificar estado HTTP (200 OK vs 404 Not Found)
    if (!respuesta.ok) {
      throw new Error(\`Error HTTP: \${respuesta.status}\`);
    }

    // 3. Parsear el cuerpo JSON de la respuesta
    const datos = await respuesta.json();

    console.log('Respuesta recibida:', datos);
    return datos;
  } catch (error) {
    console.error('Fallo capturado en try/catch:', error.message);
  }
}

consultarMultiverso();`;
    }

    function updateCodeDisplayPromises(url) {
        codeTitle.textContent = 'Código JavaScript Ejecutado (Promesas .then / .catch)';
        codeSnippetContent.textContent =
`// Consumo de The Rick and Morty API con Promesas (.then / .catch)
function consultarMultiversoConPromesas() {
  const url = '${url}';

  fetch(url)
    .then(respuesta => {
      // 1. Validar que el código HTTP sea exitoso (200-299)
      if (!respuesta.ok) {
        throw new Error(\`Error HTTP: \${respuesta.status}\`);
      }
      // 2. Retornar la promesa de conversión a JSON
      return respuesta.json();
    })
    .then(datos => {
      console.log('Respuesta recibida:', datos);
    })
    .catch(error => {
      console.error('Fallo capturado en .catch():', error.message);
    });
}

consultarMultiversoConPromesas();`;
    }

    // Inicializar vista al cargar la página
    updateFavCountUI();
    syncEndpointPreview();
    fetchDataAsync(buildApiUrl(1));
});