async function loadApp() {
  const URL = 'http://fifagama.herokuapp.com/fifa19/0/10';

  const response = await fetch(URL);

  const players = await response.json();

  fillTable(players);

  mapBarByPenaltis(players);
}

function fillTable(players) {
  const tbody = document.querySelector('#tbodyPlayers');

  players.forEach(player => {
    const tableRow = fillPlayerRow(player);

    tableRow.setAttribute('data-toggle', 'modal')
    tableRow.setAttribute('data-target', '#exampleModal')

    tableRow.onclick = openModal(player.data);

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

function openModal(playerInfo) {
  return function() {
    const modalTitle = document.querySelector('#playerNameTitle');
    const cardTitle = document.querySelector('#playerNameCard')
    modalTitle.innerHTML = playerInfo.Name
    cardTitle.innerHTML = playerInfo.Name

    const playerPhoto = document.querySelector('#playerPhoto');
    playerPhoto.src = playerInfo.Photo;
    playerPhoto.alt = `Foto do ${playerInfo.Name}`;

  }
}

function mapBarByPenaltis(players) {
  const labels = players.map(player => {
    return player.data.Name
  });

  const penaltis = players.map(player => {
    return player.data.Penalties
  });

  const ctx = document.getElementById('barChart').getContext('2d');
    
  new Chart(ctx, {
  type: 'bar',
  data: {
      labels,
      datasets: [{
          label: 'Nº of Penaltis',
          data: penaltis,
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}