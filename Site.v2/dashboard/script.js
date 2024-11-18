// Personaliza o título com o nome do usuário
title_hello.innerHTML = `Olá, <u>${sessionStorage.NOME_USUARIO}</u>`;


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