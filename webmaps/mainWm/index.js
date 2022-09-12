lagoaSanta = document.getElementById('lagoa-santa')
L.MakiMarkers.accessToken = MAPBOX_KEY;

// Criando icone com o plugin MakiMarkers
const coracao = L.MakiMarkers.icon({
  icon: 'heart',
  color: 'red',
  size: 'm',
});
lagoaSanta.src = coracao.options.iconUrl
var mapboxAttribution =
  'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
var mapboxUrl = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${MAPBOX_KEY}`;
// Adiciona um tile Layer ao mapa
const thunderLandscape = L.tileLayer(
  `https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=${THUNDER_KEY}`,
  {
    attribution:
      'Mapas &copy; OpenCycleMap, Dados do Mapa &copy; contribuidores do OpenStreetMap',
  },
);
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap',
});

const streets = L.tileLayer(mapboxUrl, {
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  attribution: mapboxAttribution,
});

const tileLayers = [thunderLandscape, streets, osm];

// Adiciona o mapa do leaflet à div mapa
const map = L.map('mapa', {
  layers: tileLayers,
  center: INITIAL_VIEW.lagoa_santa,
  zoom: INITIAL_ZOOM,
});
const layers = {};
// layers['Pontos'] = markersFromGEOJSON(null).addTo(map)
layers['Pontos'] = clusteredPoints(markersFromGEOJSON(null)).addTo(map);
const baseMaps = {
  'MapBox - Streets': streets,
  'Thunder - Landscape': thunderLandscape,
  OpenStreetMaps: osm,
};

var satellite = L.tileLayer(mapboxUrl, {
  id: 'mapbox/satellite-v9',
  tileSize: 512,
  zoomOffset: -1,
  attribution: mapboxAttribution,
});
const arvore = L.icon({
  iconUrl: '../images/arvorezinha.png',
  iconSize: [25, 25],
  popupAnchor: [0, -10],
});

// Filtrando os pontos
let pointsFilter = undefined;

const pointFilterSelect = document.getElementById('filtro-pontos');
pointFilterSelect.onchange = ({ target }) => {
  const { value } = target;
  if (value == '') {
    pointsFilter = undefined;
    pointInput.disabled = true;
    pointInput.value = '';
    // Limpando filtro
    applyFilter('Pontos');
  } else {
    pointInput.disabled = false;
    pointsFilter = {};
    const fieldToFilter = pontosFields.find(
      (field) => field['position'] == value,
    );
    pointsFilter['fieldToFilter'] = fieldToFilter;
  }
};

function applyFilter(layer) {
  layers[layer].clearLayers();
  layers[layer].addData(pontos);
  return layers[layer];
}

const pointInput = document.getElementById('filtro-pontos-value');
pointInput.value = '';
pointInput.onchange = () => {
  // Filtrando quando o imput Muda
  applyFilter('Pontos');
};

// Criando as opções do select
pontosFields.forEach((field) => {
  pointFilterSelect.appendChild(new Option(field['name'], field['position']));
});

function filterToApply(element) {
  if (!pointsFilter) {
    return true;
  }
  const f =
    element.properties[pointsFilter['fieldToFilter']['name']] ==
    pointInput.value;
  return f;
}

// Adicionando marcadores geojson
function pointToLayer(_feature, latlng) {
  `Função que transforma a camada de pontos para marcadores
  fonte: https://gis.stackexchange.com/questions/110402/changing-default-style-on-point-geojson-layer-in-leaflet 
  `;
  return L.marker(latlng, { icon: arvore });
}

function markersFromGEOJSON(markers) {
  'Função para adicionar pontos a partir de um GeoJSON.';
  return new L.geoJson(markers, {
    onEachFeature: createPopup,
    pointToLayer,
    filter: filterToApply,
  });
}

function polygonFromGEOJSON(polygons) {
  'Função para adicionar poligonos a partir de um GeoJSON.';
  return polygons.map((polygon) => {
    return L.geoJson(polygon, {
      onEachFeature: createPopup,
    });
  });
}

function clusteredPoints(layer) {
  // clusterizando
  const clusterPoints = L.markerClusterGroup.layerSupport();
  // add o cluster ao mapa
  clusterPoints.addTo(map);
  // Integrando com o controle de camadas nativo
  clusterPoints.checkIn(layer); // É aqui que a mágica acontece hahaha
  return layer;
}
// Criando grupos de marcadores (camadas)

layers['Pontos'].addData(pontos);
layers['Posicao Inicial'] = L.layerGroup([
  L.marker(INITIAL_VIEW.lagoa_santa, { icon: coracao }).bindPopup(
    'Ponto do IBGE de Lagoa Santa',
  ),
]).addTo(map);
layers[municipio.name] = L.layerGroup(polygonFromGEOJSON(municipio.features));
console.log(layers[municipio.name])
const layerControl = L.control
  .layers(baseMaps, layers, { collapsed: true })
  .addTo(map);
layerControl.addBaseLayer(satellite, 'Satélite');
