# Exercício 07

Nesse exercício eu acabei fazendo alguns outros exercícios em conjunto com o 7, e pulei alguns também.

Aqui a idéia é trabalhar com plugins do Leaflet, e no caminho acabei descobrindo que existem plugins dos plugins (sub plugins).

Lista de plugins [clique aqui](https://leafletjs.com/plugins.html)

Fiz também um refatoramento em algumas partes do código, como por exemplo a adição de camadas e basemaps ao mapa e ao controle de camadas.

Inseri novos basemaps (OSM e um basemaps com uma imagem de satélite).

## MakiMarkers

Esse foi o primeiro primeiro plugin a ser utilizado.

A função desse plugin é facilitar a customização dos icones dos marcadores, usando o conjunto de icones [Mapbox](www.mapbox.com) [Maki](https://labs.mapbox.com/maki-icons/)

Para isso, basta fazer o donwload do plugin e utilizá-lo para criar os ícones.

Vide Download no Readme.md [clique aqui](../../README.md#leafletmakimarkers)

A versão que usei aqui foi a 3.1.0 e foi necessário informar a chave da API do mapbox (o arquivo env.js salva novamente) (index.js linha 7)

## MarkerCluster

Esse plugin permite fazer a clusterização de pontos no mapa, e o sub plugin faz a integração do plugin com contole de camadas nativo do Leaflet.

Vide download no Readme.md [clique aqui](../../README.md#leafletmarkercluster)

Vide download do markercluster.layer.support no Readme.md [clique aqui](../../README.md#markerclusterlayersupport)
