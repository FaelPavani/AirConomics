title_hello.innerHTML = `Olá, <u>${sessionStorage.NOME_USUARIO}</u>`;
var is_master = sessionStorage.MASTER
console.log(is_master)

if(is_master == 1){
    novo_user.style.display = 'block';
    novo_user.style.visibility = 'visible';
}

function limparSessao() {
  sessionStorage.clear();
  window.location = "../../Site.v2/index.html";
}

// Configuração do Gráfico de Barras
const ctxBarra = document.getElementById('graficoBarra').getContext('2d');
const graficoBarra = new Chart(ctxBarra, {
  type: 'bar',  // Define o tipo de gráfico como barras
  data: {
      labels: ['KPI 1', 'KPI 2', 'KPI 3', 'KPI 4', 'KPI 5'], // Indicadores que deseja monitorar
      datasets: [{
          label: 'Desempenho Mensal',  // Nome do conjunto de dados
          data: [12, 19, 3, 5, 2],  // Valores dos indicadores
          backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1 // Espessura da borda das barras
      }]
  },
  options: {
      responsive: true,
      scales: {
          y: {
              beginAtZero: true // Inicia o eixo Y em zero
          }
      }
  }
});

// Configuração do Gráfico de Linhas
const ctxLinha = document.getElementById('graficoLinha').getContext('2d');
const graficoLinha = new Chart(ctxLinha, {
  type: 'line',  // Define o tipo de gráfico como linha
  data: {
      labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5'], // Semanas ou períodos de tempo
      datasets: [{
          label: 'Evolução Semanal',  // Nome do conjunto de dados
          data: [3, 6, 8, 5, 9],  // Valores da evolução semanal
          backgroundColor: 'rgba(54, 162, 235, 0.2)',  // Cor de fundo da linha
          borderColor: 'rgba(54, 162, 235, 1)',  // Cor da borda da linha
          borderWidth: 2,  // Espessura da linha
          tension: 0.3  // Suavidade da curva da linha
      }]
  },
  options: {
      responsive: true,
      scales: {
          y: {
              beginAtZero: true // Inicia o eixo Y em zero
          }
      }
  }
});

// Função para atualizar os dados dos gráficos dinamicamente
function atualizarGraficos(dadosBarras, dadosLinhas) {
  graficoBarra.data.datasets[0].data = dadosBarras;  // Atualiza os dados do gráfico de barras
  graficoLinha.data.datasets[0].data = dadosLinhas;  // Atualiza os dados do gráfico de linhas
  graficoBarra.update();  // Atualiza o gráfico de barras na tela
  graficoLinha.update();  // Atualiza o gráfico de linhas na tela
}

// Simulação de atualização de dados (substitua pelos dados do banco)
setTimeout(() => {
  const dadosAtualizadosBarra = [8, 14, 5, 6, 10];
  const dadosAtualizadosLinha = [4, 7, 6, 8, 10];
  atualizarGraficos(dadosAtualizadosBarra, dadosAtualizadosLinha);
}, 5000);