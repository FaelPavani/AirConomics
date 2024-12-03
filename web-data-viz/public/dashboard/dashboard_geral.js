title_hello.innerHTML = `Olá, <u>${sessionStorage.NOME_USUARIO}</u>`;
var is_master = sessionStorage.MASTER

if(is_master == 1){
    novo_user.style.display = 'block';
    novo_user.style.visibility = 'visible';
}

function limparSessao() {
  sessionStorage.clear();
  window.location = "../index.html";
}

function mediaPorSala(){
    fetch(`/dash/mediaTemp/${sessionStorage.ID_EMPRESA}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((resposta) => {
        if (resposta.ok) {
            resposta.json().then((json) => {
                var salas_lista = []
                var temperaturas_lista = []

                for(var i = 0; i < json.length; i++) {
                    salas_lista.push(json[i].num_sala)
                    temperaturas_lista.push(json[i].temp_media)
                }
                atualizarGraficoMedia(salas_lista, temperaturas_lista)

                var maior_temp = temperaturas_lista[0]

                for(var i = 0; i < temperaturas_lista.length; i++){
                    if(temperaturas_lista[i] > maior_temp){
                        maior_temp = temperaturas_lista[i]
                    }
                }
            
                var posicao_maior_temp = temperaturas_lista.indexOf(maior_temp)
                var sala_maior_temp = salas_lista[posicao_maior_temp]
                
                span_maior_media.innerHTML = sala_maior_temp
            });
        } else {
            alert('Problema pegar temperatura média das salas')
        }
    })
}

function alertasSala(){
    // 
    fetch(`/dash/alertas/${sessionStorage.ID_EMPRESA}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((resposta) => {
        if (resposta.ok) {
            resposta.json().then((json) => {
                var alertas_lista = []
                var salas_lista = []

                for(var i = 0; i < json.length; i++) {
                    salas_lista.push(json[i].num_sala)
                    alertas_lista.push(json[i].total_alertas)
                }
                atualizarGraficoAlertas(salas_lista, alertas_lista)

                var maior_alertas = alertas_lista[0]

                for(var i = 0; i < alertas_lista.length; i++){
                    if(alertas_lista[i] > maior_alertas){
                        maior_alertas = alertas_lista[i]
                    }
                }
            
                var posicao_maior_alertas = alertas_lista.indexOf(maior_alertas)
                var sala_maior_alertas = salas_lista[posicao_maior_alertas]
                
                span_maior_alertas.innerHTML = sala_maior_alertas
            });
        } else {
            alert('Problema pegar alertas das salas')
        }
    })
}

// Configuração do Gráfico de Barras
const ctxBarra = document.getElementById('graficoBarra').getContext('2d');
const graficoBarra = new Chart(ctxBarra, {
  type: 'bar',  // Define o tipo de gráfico como barras
  data: {
      labels: [], // Indicadores que deseja monitorar
      datasets: [{
          label: 'Total de alertas por sala',  // Nome do conjunto de dados
          data: [],  // Valores dos indicadores
          backgroundColor: 'rgba(255, 50, 50, 0.2)',  // Cor de fundo da linha
          borderColor: 'rgb(255, 50, 50)',  // Cor da borda da linha
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
      labels: [],
      datasets: [{
          label: 'Temperatura média por salas', 
          data: [], 
          backgroundColor: 'rgba(50, 50, 255, 0.2)',  // Cor de fundo da linha
          borderColor: 'rgb(50, 50, 255)',  // Cor da borda da linha
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
function atualizarGraficoMedia(label, data) {
    graficoLinha.data.labels = label // Atualiza as labels do gráfico
    graficoLinha.data.datasets[0].data = data;  // Atualiza os dados do gráfico de linhas
    graficoLinha.update();  // Atualiza o gráfico de linhas na tela
}

function atualizarGraficoAlertas(label, data){
    graficoBarra.data.labels = label
    graficoBarra.data.datasets[0].data = data
    graficoBarra.update()
}

var intervalo = setInterval(() => {
    alertasSala()
    mediaPorSala()
}, 2000)

mediaPorSala()
alertasSala()