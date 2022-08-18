# Exercício 04

Nesse exercício adicionamos dados ao mapa a partir de [GeoJSON](https://geojson.org), nesse caso, adicionamos o polígono do município de Lagoa Santa - MG

Não é necessário a utlização do arquivo `pontos.js` pois os dados agora vem direto de um arquivo [GeoJSON](https://geojson.org).

Foi utilizado o [`fetch()`](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch) para ler os arquivos [GeoJSON](https://geojson.org) em conjunto com o [`Promise`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise), que fazem parte do [JavaScript](https://www.javascript.com) assíncrono.

## Promisse.all()

[`Promises`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise) são uma das formas que podemos utilizar para trabalhar assícronamente, e o que isso quer dizer?

Significa que podemos realizar enquanto esperamos uma determinada resposta desde que tais atividades não dependam dessa resposta.

Nesse caso, é necesário aguardar a leitura dos arquivos [GeoJSON](https://geojson.org) para que possamos adicionar os dados ao mapa.

Um fato que descobri ao fazer esse exercício foi que, quando usamos camadas de pontos, a partir de um [GeoJSON](https://geojson.org) por exemplo, precisamos tranformar a camada para marcadores (markers) para poder conseguir mudar o icone utilizado.  
Para isso, basta criar uma função que faça a transformação (index.js linha 25) e passar como parâmetro de configuração ao criar o dado apartir do [GeoJSON](https://geojson.org) (index.js linha 34)

## fetch(url)

O `fetch()` é o responsável por fazer a busca de dados (seja dados de uma api ou de um arquivo a ser lido) e seu retorno é uma [`Promise`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise), ou seja há uma promessa de um retorno de uma requisição feita.

A _url_ utilizada no `fetch()` (index.js linha 4) pode ser o caminho do arquivo a ser lido,e como o [GeoJSON](https://geojson.org) é um arquivo [JSON](https://www.json.org/json-pt.html) com dados espaciais, o seu valor pode ser retornado como um [JSON](https://www.json.org/json-pt.html) (index.js linha 4).

## Promise.all()

O método `Promise.all()` é responsável por resolver TODAS as promises passadas para ele dentro de um Array, mas só irá apontar que todas as promises resolver com sucesso se todas elas forem bem sucedidas, e seu retorno também é uma promisse.

## Promisse.then()

O método [`Promisse.then()`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) irá dar continuidade ao processo se a promisse onde estiver sendo invocado for resolvida com sucesso.

**OBS:** Esse método recebe dois parâmetros chamados de `callbacks`, que são funções a serem chamadas, a primeira função é chamada quando a promise resolve com sucesso, e a segunda (que não utlizei aqui) será utilizada quando a promisse for rejeitada. Consulte a documentação da [Mozila](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) para maiores esclarecimentos.
