#!/bin/bash

echo "Baixando leaflet"
wget -q https://leafletjs-cdn.s3.amazonaws.com/content/leaflet/v1.8.0/leaflet.zip -O ./webmaps/libs/leaflet.zip
unzip -q webmaps/libs/leaflet.zip -d webmaps/libs/leaflet/
# Descompactando uzando unzip
unzip -q webmaps/libs/leaflet.zip -d webmaps/libs/leaflet/

echo "Baixando Leaflet.MakiMarkers"
wget -q https://github.com/jseppi/Leaflet.MakiMarkers/archive/refs/tags/v3.1.0.zip -O ./webmaps/libs/leaflet_makimarkers.zip
unzip -q webmaps/libs/leaflet_makimarkers.zip -d webmaps/libs/
cp -r webmaps/libs/Leaflet.MakiMarkers-3.1.0/ webmaps/libs/Leaflet.MakiMarkers/
rm -r webmaps/libs/Leaflet.MakiMarkers-3.1.0/

echo "Baixando Leaflet.markercluster"
wget -q https://github.com/Leaflet/Leaflet.markercluster/archive/v1.4.1.zip -O ./webmaps/libs/leaflet_markercluster.zip
unzip -q webmaps/libs/leaflet_markercluster.zip -d webmaps/libs/
cp -r webmaps/libs/Leaflet.markercluster-1.4.1/ webmaps/libs/Leaflet.markercluster/
rm -r webmaps/libs/Leaflet.markercluster-1.4.1/

echo "Baixando Markercluster.Layer.Support"
wget -q https://github.com/ghybs/Leaflet.MarkerCluster.LayerSupport/releases/download/v2.0.1/leaflet.markercluster.layersupport.js -O ./webmaps/libs/leaflet.markercluster.layersupport.js

if [ ! -f ./webmaps/env.js ]; then 
  echo "Criando arquivo env.js"
  cp webmaps/env.js.example webmaps/env.js
fi
