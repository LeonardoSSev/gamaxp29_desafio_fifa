async function loadApp() {
  const URL = 'http://fifagama.herokuapp.com/fifa19/0/10';

  const response = await fetch(URL);

  const players = await response.json();

  fillTable(players);
}

function fillTable(players) {
  const tbody = document.querySelector('#tbodyPlayers');

  players.forEach(player => {
    const tableRow = fillPlayerRow(player);

    tbody.appendChild(tableRow);
  });
}

function fillPlayerRow(player) {
  const tableRow = document.createElement('tr');

  const tdId = document.createElement('td')
  const tdName = document.createElement('td')
  const tdAge = document.createElement('td')
  const tdNat = document.createElement('td')

  
  tdId.innerHTML = player.data.ID
  tdName.innerHTML = player.data.Name
  tdAge.innerHTML = player.data.Age
  tdNat.innerHTML = player.data.Nationality
    
  
  tableRow.appendChild(tdId);
  tableRow.appendChild(tdName);
  tableRow.appendChild(tdAge);
  tableRow.appendChild(tdNat);

  return tableRow;
}