// Adiciona o mapa do leaflet à div mapa
console.log(INITIAL_ZOOM);
const map = L.map('mapa').setView(INITIAL_VIEW.lagoa_santa, INITIAL_ZOOM);
// Adiciona um tile Layer ao mapa
L.tileLayer(
  `https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=${THUNDER_KEY}`,
  {
    attribution:
      'Mapas &copy; OpenCycleMap, Dados do Mapa &copy; contribuidores do OpenStreetMap',
  },
).addTo(map);
