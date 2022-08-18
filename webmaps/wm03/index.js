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

const arvore = L.icon({
  iconUrl: '../images/arvorezinha.png',
  iconSize: [25, 25],
  popupAnchor: [0, -10],
});
const teatro = L.icon({
  iconUrl: '../images/teatro.png',
  shadowUrl: '../images/teatro-sombra.png',
  iconSize: [80, 80],
  shadowSize: [80, 46],
  iconAnchor: [40, 40],
  shadowAnchor: [60, 0],
  popupAnchor: [0, -35],
});
// Adicionando marcadores
function makeMarkers(markers) {
  'Função para adicionar vários marcadores a partir de um Object.';
  return markers.map((marker) => L.marker(marker.ponto, { icon: arvore })
      .bindPopup(createPopup(marker)));
}
// Criando grupos de marcadores (camadas)
const layers = {}
layers["viveiros"] = L.layerGroup(makeMarkers(pontos)).addTo(map);
layers["Posicao Inicial"] = L.layerGroup([
  L.marker(INITIAL_VIEW.lagoa_santa, {icon: teatro})
    .bindPopup('Ponto do IBGE de Lagoa Santa')
    .openPopup(),
]).addTo(map);

// adicionando grupos de camadas
L.control.layers({}, layers, {collapsed: false}).addTo(map);
