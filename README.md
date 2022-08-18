# Exercícios do livro Desenvolvendo Webmaps

Pelo bem desse repositório, estou usando o leaflet na pasta `webmaps/libs` para não duplicar sempre que um novo webmap for iniciado.
Farei o mesmo para outras pastas/bibliotecas/arquivos que forem sendo usada no decorrer do estudo.

O leaflet pode ser baixado no seguinte endereço:

https://leafletjs.com/download.html

```shell
# Versão 1.8.0
wget -q https://leafletjs-cdn.s3.amazonaws.com/content/leaflet/v1.8.0/leaflet.zip -O ./webmaps/libs/leaflet.zip
# Descompactando uzando unzip
unzip -q webmaps/libs/leaflet.zip -d webmaps/libs/leaflet/
```

**Obs:** Para facilitar a vida de quem usa linux criei o arquivo `download_files.sh

## Arquivo de configuração

Utilizo um arquivo de configuração para facilitar o trabalho com algumas coisas, como chaves de APIs, dados iniciais e etc. esse arquivo é o `env.js` que deve ser alocado na pasta `webmaps`.

Por segurança, para não ficar transitando chaves de api, eu criei um arquivo `env.js.example` com o exemplo de como configurar os dados dentro dele, basta fazer uma cópia do arquivo e remover o _.example_ do final e alterar com os dados necessários.

### Variáveis do arquivo env.js

- THUNDER_KEY -> Chave da api que pode ser feita gratuitamente no site da [Thunderforest](https://www.thunderforest.com/);
- MAPBOX_KEY -> Chave da api que pode ser feita gratuitamente no site da [mapbox](https://www.mapbox.com/);
- INITIAL_VIEW -> Aqui há duas coordenadas que podemos utilizar para iniciar o nosso mapa, a `default`: uma coordenada qualquer que peguei, e `lagoa_santa` que é o ponto do IBGE da cidade de Lagoa Santa;
- INITIAL_ZOOM -> zoom inicial do mapa;

## Rodando os exercícios

Dentro da pasta webmaps há uma série de pastas que inicial com _wm_ (ex.: wm01), nessas pastas estão os arquivos que usei para fazer os exercícios.

Dentro de cada pasta há um arquivo `index.html` que pode ser aberto diretamente no navegador, não precisando de nenhum servidor para rodar localmente.

Poode haver também um arquivo Readme.md explicando um pouco do que eu fiz em cada exercício.

## Plugins do Leaflet

### Leaflet.MakiMarkers

Plugin utilizado para customizar icones dos marcadores usando o conjunto Maki da Mapbox.

```shell
wget -q https://github.com/jseppi/Leaflet.MakiMarkers/archive/refs/tags/v3.1.0.zip -O ./webmaps/libs/leaflet_makimarkers.zip
unzip -q webmaps/libs/leaflet_makimarkers.zip -d webmaps/libs/
cp -r webmaps/libs/Leaflet.MakiMarkers-3.1.0/ webmaps/libs/Leaflet.MakiMarkers/
rm -r webmaps/libs/Leaflet.MakiMarkers-3.1.0/
```

### Leaflet.markercluster

O plugin [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) tem de ser usado na versão [1.4.1](https://github.com/Leaflet/Leaflet.markercluster/archive/v1.4.1.zip)

```shell
# Obs: se mudar a versão é necessário mudar o código
wget -q https://github.com/Leaflet/Leaflet.markercluster/archive/v1.4.1.zip -O ./webmaps/libs/leaflet_markercluster.zip
unzip -q webmaps/libs/leaflet_markercluster.zip -d webmaps/libs/
cp -r webmaps/libs/Leaflet.markercluster-1.4.1/ webmaps/libs/Leaflet.markercluster/
rm -r webmaps/libs/Leaflet.markercluster-1.4.1/
```

### Markercluster.Layer.Support

Para fazer com que o `Leaflet.markercluster` integrasse ao controle de camadas nativo, foi necessário um "sub plugin".

[Página do plugin](https://ghybs.github.io/Leaflet.MarkerCluster.LayerSupport/)

A versão que usei (2.0.1) funciona no leaflet 1.x

```shell
wget -q https://github.com/ghybs/Leaflet.MarkerCluster.LayerSupport/releases/download/v2.0.1/leaflet.markercluster.layersupport.js -O ./webmaps/libs/leaflet.markercluster.layersupport.js
```
