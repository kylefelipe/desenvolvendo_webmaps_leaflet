function createPopup(feature, layer) {
  "Criando a tabela a partir de elementos HTML"
  const { properties } = feature;
  // Cria o elemento <table>
  const table = document.createElement('table');
  table.classList.add('table-marker-info')
  const fields = Object.keys(properties)
  // Cria o elemento <tr> para receber o cabeçalho da tabela
  const th = document.createElement('tr')
  // Cria elementos <th> para receber os nomes do cabeçalho da tabela
  const fieldName = document.createElement('th')
  fieldName.textContent = 'Campo'
  const fieldValue = document.createElement('th')
  fieldValue.textContent = 'Valor'
  // Adiciona os nomes dos cabeçalhos no <tr>
  th.append(fieldName, fieldValue)
  // Adiciona o elemento <th> ao elemento <table>
  table.appendChild(th)
  fields.forEach(field => {
    // Cria o elemento <tr> para receber os dados do campo e valor
    const tr = document.createElement('tr')
    // Cria os elementos para receber os dados do campo e valor
    const f = document.createElement('td')
    const value = document.createElement('td')
    f.textContent = field
    value.textContent = properties[field]
    // Adiciona os dados à linha (<tr>) 
    tr.append(f, value)
    // Adiciona a linha (<tr>) à tabela (<table>) 
    table.appendChild(tr)
  });
  // Retorna a tabela pronta
  return layer.bindPopup(table)
}
