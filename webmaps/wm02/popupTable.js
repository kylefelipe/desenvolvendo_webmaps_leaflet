function createPopup(data) {
  let table = "<table class='marker-info'>\n\t<tr>\n\t\t<th>Campo</th> <th>Valor</th><tr>\n\t</tr>"
  const fields = Object.keys(data)
  fields.forEach(field => {
    table += `\n\t<tr>\n\t\t<td>${field}</td><td>${data[field]}</td>\n\t</tr>`
  });
  table += "\n</table>"
  return table
}
