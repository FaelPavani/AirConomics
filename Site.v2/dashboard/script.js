// Personaliza o título com o nome do usuário
title_hello.innerHTML = `Olá, <u>${sessionStorage.NOME_USUARIO}</u>`;
var is_master = sessionStorage.MASTER
console.log(is_master)

if(is_master == 1){
    novo_user.style.display = 'block';
    novo_user.style.visibility = 'visible';
}

buscarIndicadores()
buscarHistorico()

function buscarIndicadores() {
    fetch('http://localhost:3333/dash/indicadores', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((resposta) => {
        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then((json) => {
                console.log(json[0])
                span_temp_media.innerHTML = `${json[0].temp_media} ºC`
                span_temp_atual.innerHTML = `${json[0].temp_atual} ºC`
                span_temp_max.innerHTML = `${json[0].temp_max} ºC`
                span_temp_min.innerHTML = `${json[0].temp_min} ºC`
            });

        } else {
            alert('Problema pegar dados')
        }
    })
}

function buscarHistorico() {
    fetch('http://localhost:3333/dash/temperaturaHist', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((resposta) => {
        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then((json) => {
                console.log(json)
                var datas_lista = []
                var temperaturas_lista = []

                for(var i = 0; i < json.length; i++) {
                    datas_lista.push(json[i].dataColeta_dado)
                    temperaturas_lista.push(json[i].temperatura_dado)
                }

                console.log(datas_lista)
                console.log(temperaturas_lista)
                atualizarGraficos(datas_lista, temperaturas_lista)
            });

        } else {
            alert('Problema pegar temperatura da sala')
        }
    })
}

// Função para limpar a sessão e redirecionar para a página inicial
function limparSessao() {
    sessionStorage.clear();
    window.location = "../../Site.v2/index.html";
}

// Configuração do Gráfico de Linhas
const ctxLinha = document.getElementById('graficoLinha').getContext('2d');
const graficoLinha = new Chart(ctxLinha, {
    type: 'line',  // Define o tipo de gráfico como linha
    data: {
        labels: [], // Semanas ou períodos de tempo
        datasets: [{
            label: 'Histórico de temperatura',  // Nome do conjunto de dados
            data: [],  // Valores da evolução semanal
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
function atualizarGraficos(label, data) { 
    graficoLinha.data.datasets[0].data = data;  // Atualiza os dados do gráfico de linhas  // Atualiza o gráfico de barras na tela
    graficoLinha.data.labels = label
    graficoLinha.update();  // Atualiza o gráfico de linhas na tela
}

// // Simulação de atualização de dados (substitua pelos dados do banco)
// setTimeout(() => {
//     const dadosAtualizadosBarra = [8, 14, 5, 6, 10];
//     const dadosAtualizadosLinha = [4, 7, 6, 8, 10];
//     atualizarGraficos(dadosAtualizadosBarra, dadosAtualizadosLinha);
// }, 5000);