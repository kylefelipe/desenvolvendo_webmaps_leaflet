
const urls = ['../dados/pontos.geojson', '../dados/lim_municipio_a.geojson'];
const allData = Promise.all(
  urls.map((url) => fetch(url).then((resp) => resp.json())),
);

allData.then(([pontos, municipio]) => {
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
  // Adicionando marcadores geojson
  function pointToLayer(_feature, latlng) {
    `Função que transforma a camada de pontos para marcadores
    fonte: https://gis.stackexchange.com/questions/110402/changing-default-style-on-point-geojson-layer-in-leaflet 
    `;
    return L.marker(latlng, { icon: arvore });
  }
  function markersFromGEOJSON(markers) {
    'Função para adicionar pontos a partir de um GeoJSON.';
    return markers.map((marker) =>
      L.geoJson(marker.geometry, { pointToLayer }).bindPopup(
        createPopup(marker.properties),
      ),
    );
  }

  function polygonFromGEOJSON(polygons) {
    'Função para adicionar poligonos a partir de um GeoJSON.';
    return polygons.map((polygon) => {
      return L.geoJson(polygon.geometry).bindPopup(
        createPopup(polygon.properties),
      );
    });
  }
  // Criando grupos de marcadores (camadas)
  const layers = {};
  layers['Posicao Inicial'] = L.layerGroup([
    L.marker(INITIAL_VIEW.lagoa_santa).bindPopup(
      'Ponto do IBGE de Lagoa Santa',
    ),
  ]).addTo(map);
  layers[pontos.name] = L.layerGroup(markersFromGEOJSON(pontos.features)).addTo(
    map,
  );
  layers[municipio.name] = L.layerGroup(
    polygonFromGEOJSON(municipio.features),
  ).addTo(map);
  // adicionando grupos de camadas
  L.control.layers({}, layers, { collapsed: true }).addTo(map);
});
