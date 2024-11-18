var nome_usuario = sessionStorage.getItem('NOME_USUARIO');
title_hello.innerHTML = `Olá. ${nome_usuario}`

const ctx = document.getElementById('bar-graph').getContext('2d')

const barGraph = new Chart(ctx, {
  type: 'bar', // Tipo de gráfico (ex: 'line', 'bar', 'pie')
  data: {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
      datasets: [{
          label: 'Temperatura',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
              '#0080ff'
          ],
         
      }, {
        label: 'Umidade',
        data: [10, 15, 12, 20, 15, 10],
        backgroundColor: [
            '#ff0000'
        ],
      }]
  },
  options: {
      scales: {
          y: {
              beginAtZero: true
          }
      }
  }
})