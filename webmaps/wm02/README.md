# Exercício 02

Esse exercício usa como base o exercício anterior e adiciona um marcador (ponto) no mapa.

Eu aproveitei para melhorar um pouco o exercício criando uma função que adiciona vários pontos ao mapa.

Primeiro, crio uma série de pontos em um arquivo [JavaScript](https://www.javascript.com) `[pontos.js](../dados/pontos.js)` e o adiciono no html(linha 21) para que o arquivo index.js possa ter acesso aos pontos.

Esses pontos são passados para a função `makeMarkers(markers, thisMap = map)` que é a responsável por adicionar todos os pontos informados no paraâmetro `markers` ao mapa.

Também criei uma função `createPopup()` que recebe um marcador a partir de um Object que gera um um _popup_ a ser exibido quando clicado no marcador.

Aqui a estilização da tabela que aparece no popup não funcionou, pois a função retorna um html no formato de texto, é corrigido em algum exercício mais a frente.
