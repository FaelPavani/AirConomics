// Personaliza o título com o nome do usuário
title_hello.innerHTML = `Olá, <u>${sessionStorage.NOME_USUARIO}</u>`;
var is_master = sessionStorage.MASTER
var loop = false

if(is_master == 1){
    novo_user.style.display = 'block';
    novo_user.style.visibility = 'visible';
}

// buscarIndicadores()
// buscarHistorico()
buscarSalas()

function buscarSalas(){
    fetch(`http://localhost:3333/salas/listar/${sessionStorage.ID_EMPRESA}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((resposta) => {
        if (resposta.ok) {
            resposta.json().then((json) => {
                for(var i = 0; i < json.length; i++) {
                    select_salas.innerHTML += `<option value='${json[i].id_sensor}'> ${json[i].numero_sala} </option>`
                }
            });

        } else {
            alert('Problema pegar temperatura da sala')
        }
    })
}

function buscarIndicadores() {
    var sala = select_salas.value
    var sala_selecionada = select_salas
    var dia = select_datas.value
    fetch(`http://localhost:3333/dash/indicadores/${sala}/${dia}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((resposta) => {
        if (resposta.ok) {
            resposta.json().then((json) => {
                if(json[0].temp_media == null){
                    span_temp_media.innerHTML = `Dados indisponíveis`
                }else{
                    span_temp_media.innerHTML = `${json[0].temp_media} ºC`
                }

                if(json[0].temp_max == null){
                    span_temp_max.innerHTML = `Dados indisponíveis`
                }else{
                    span_temp_max.innerHTML = `${json[0].temp_max} ºC`
                }

                if(json[0].temp_min == null){
                    span_temp_min.innerHTML = `Dados indisponíveis`
                }else{
                    span_temp_min.innerHTML = `${json[0].temp_min} ºC`
                }

                if(json[0].temp_atual >= 25 || json[0].temp_atual <= 21){
                    div_alerta.style.display = 'flex'
                    let sala_selecionada = select_salas.value = sala
                    div_alerta.innerHTML = `<span>❗A temperatura da sala selecionada está fora dos padrões❗</span>`
                }else{
                    div_alerta.style.display = 'none'
                }
                span_temp_atual.innerHTML = `${json[0].temp_atual} ºC`
            });

        } else {
            alert('Problema pegar dados')
        }
    })
}

function filtrar_dados() {
    var sala = select_salas.value
    var dia = select_datas.value

    fetch(`http://localhost:3333/dash/temperaturaHist/${sala}/${dia}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((resposta) => {
        if (resposta.ok) {
            resposta.json().then((json) => {
                var datas_lista = []
                var temperaturas_lista = []

                for(var i = 0; i < json.length; i++) {
                    var data = json[i].dataColeta_dado.split('T')[1]
                    datas_lista.push(data.split('Z')[0])
                    temperaturas_lista.push(json[i].temperatura_dado)
                }
                atualizarGraficos(datas_lista, temperaturas_lista)
            });
            buscarIndicadores()
        } else {
            alert('Problema pegar temperatura da sala')
        }
    })
}

// Função para limpar a sessão e redirecionar para a página inicial
function limparSessao() {
    sessionStorage.clear();
    window.location = "../index.html";
}

// Função para atualizar os dados dos gráficos dinamicamente
function atualizarGraficos(label, data) { 
    graficoLinha.data.datasets[0].data = data;  // Atualiza os dados do gráfico de linhas  // Atualiza o gráfico de barras na tela
    graficoLinha.data.labels = label
    graficoLinha.update();  // Atualiza o gráfico de linhas na tela
}

function pegar_datas(){
    select_datas.disabled = false
    loop = true
    var sala = select_salas.value

    fetch(`http://localhost:3333/salas/datas/${sala}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((resposta) => {
        if (resposta.ok) {
            resposta.json().then((json) => {
                for(var i = 0; i < json.length; i++) {
                    var data = json[i].datas_disponiveis.split('T')[0]
                    select_datas.innerHTML += `<option value='${data}'> ${data} </option>`
                }
            });
        } else {
            alert('Problema pegar temperatura da sala')
        }
    })
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

var intervalo = setInterval(() => {
    if(select_datas.value != "#" && select_salas.value != "#"){
        console.log("Settimetou")
        filtrar_dados()
    }
}, 2000)

// clearInterval(intervalo) 

// setTimeout(() => {
//     if(select_datas.value != "#" && select_salas.value != "#"){
//         console.log("Settimetou")
//         filtrar_dados()
//     }
//     // filtrar_dados()
// }, 1000);