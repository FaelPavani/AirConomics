var database = require("../database/config");

function listarIndicadores() {
    console.log("ACESSEI O DASH  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
        SELECT 
	        TRUNCATE(AVG(temperatura_dado), 2) AS temp_media, 
          MAX(temperatura_dado) AS temp_max,
	        MIN(temperatura_dado) AS temp_min, 
          (SELECT 
            temperatura_dado FROM tb_dado 
            ORDER BY dataColeta_dado 
          DESC LIMIT 1) AS temp_atual 
        FROM tb_dado;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarIndicadoresFiltro(id_sensor, dia){
  console.log("ACESSEI O DASH  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
        SELECT 
	        TRUNCATE(AVG(temperatura_dado), 2) AS temp_media, 
          MAX(temperatura_dado) AS temp_max,
	        MIN(temperatura_dado) AS temp_min, 
          (SELECT 
            temperatura_dado FROM tb_dado 
            ORDER BY dataColeta_dado 
          DESC LIMIT 1) AS temp_atual 
        FROM tb_dado
        WHERE fk_sensor = ${id_sensor} 
        AND dataColeta_dado >= ${dia};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarTemperaturaHistorica(){
  console.log("ACESSEI O DASH  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
        SELECT 
          dataColeta_dado, 
          temperatura_dado 
        FROM tb_dado;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarTemperaturaHistoricaFiltro(id_sensor, dia){
  console.log("ACESSEI O DASH  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
        SELECT 
          dataColeta_dado, 
          temperatura_dado 
        FROM tb_dado 
        WHERE fk_sensor = ${id_sensor} 
        AND dataColeta_dado >= ${dia};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
  listarIndicadores,
  buscarTemperaturaHistorica,
  buscarTemperaturaHistoricaFiltro,
  listarIndicadoresFiltro
}