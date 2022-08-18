// Adiciona o mapa do leaflet à div mapa
const map = L.map('mapa').setView(INITIAL_VIEW.lagoa_santa, INITIAL_ZOOM);
// Adiciona um tile Layer ao mapa
L.tileLayer(
  `https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=${THUNDER_KEY}`,
  {
    attribution:
      'Mapas &copy; OpenCycleMap, Dados do Mapa &copy; contribuidores do OpenStreetMap',
  },
).addTo(map);
// Adicionando marcador
function makeMarkers(markers, thisMap = map) {
  "Função para adicionar vários marcadores a partir de um Array."
  markers.forEach(marker => {
    L.marker(marker.ponto).addTo(thisMap).bindPopup(createPopup(marker))
  });
};

makeMarkers(pontos);
L.marker(INITIAL_VIEW.lagoa_santa).addTo(map)
.bindPopup('Ponto do IBGE de Lagoa Santa').openPopup();
