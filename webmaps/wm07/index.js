const dadosJson = '../dados/pontos_geojson.json';
const urls = ['../dados/pontos.geojson', '../dados/lim_municipio_a.geojson'];
const promises = urls.map((url) => fetch(url));
const allData = Promise.all(
  urls.map((url) => fetch(url).then((resp) => resp.json())),
);
L.MakiMarkers.accessToken = MAPBOX_KEY;

// Criando icone com o plugin MakiMarkers
const coracao = L.MakiMarkers.icon({
  icon: 'heart',
  color: 'red',
  size: 'm',
});

var mapboxAttribution =
  'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
var mapboxUrl = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${MAPBOX_KEY}`;
allData.then(([pontos, municipio]) => {
  // Adiciona um tile Layer ao mapa
  const thunderLandscape = L.tileLayer(
    `https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=${THUNDER_KEY}`,
    {
      attribution:
        'Mapas &copy; OpenCycleMap, Dados do Mapa &copy; contribuidores do OpenStreetMap',
    },
  );
  const osm = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    },
  );
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
  function clusteredPoints(layer) {
    // clusterizando
    const clusterPoints = L.markerClusterGroup.layerSupport();
    // add o cluster ao mapa
    clusterPoints.addTo(map);
    // Integrando com o controle de camadas nativo
    clusterPoints.checkIn(layer); // É aqui que a mágica acontece hahaha
    return clusterPoints;
  }
  // Criando grupos de marcadores (camadas)
  const layers = {};
  layers['Pontos'] = L.layerGroup(markersFromGEOJSON(pontos.features));
  clusteredPoints(layers['Pontos']);
  layers['Posicao Inicial'] = L.layerGroup([
    L.marker(INITIAL_VIEW.lagoa_santa, { icon: coracao }).bindPopup(
      'Ponto do IBGE de Lagoa Santa',
    ),
  ]).addTo(map);
  layers[municipio.name] = L.layerGroup(
    polygonFromGEOJSON(municipio.features),
  ).addTo(map);
  const layerControl = L.control
    .layers(baseMaps, layers, { collapsed: true })
    .addTo(map);
  layerControl.addBaseLayer(satellite, 'Satélite');
});
