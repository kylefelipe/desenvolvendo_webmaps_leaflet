# Exercício 03

Aqui vamos estilizar os marcadores que criamos.Aqui

As imagens utilizadas nos icones estão na pasta [webmaps/images](../images/);

Também utilizado o `L.layerGroup()` para criar camadas e o `L.control.layer()` para controlar exibição das camadas que adicionamos ao mapa.

Nesse exercício é corrigido o problema da estilização da tabela que aparece no popup.

## helpers/popupTable

Nesse arquivo a função `createPopup()` foi refatorada.

Para que a estilização (css) funcionar foi necessário criar elementos html para gerar a tabela e utilizar esses elementos no lugar do texto.
