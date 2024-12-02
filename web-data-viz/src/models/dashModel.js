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

function listarIndicadoresFiltro(id_sensor, dia) {
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
        AND DATE(dataColeta_dado) = '${dia}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarTemperaturaHistorica() {
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

function buscarTemperaturaHistoricaFiltro(id_sensor, dia) {
  console.log("ACESSEI O DASH  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
  var instrucaoSql = `
        SELECT 
          dataColeta_dado, 
          temperatura_dado 
        FROM tb_dado 
        WHERE fk_sensor = ${id_sensor} 
        AND DATE(dataColeta_dado) = '${dia}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function mediaTemperatura(id_empresa) {
  console.log("ACESSEI O DASH  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
  var instrucaoSql = `
        SELECT 
          s.numeroSala_sensor AS num_sala,
            TRUNCATE(AVG(d.temperatura_dado),2) AS temp_media
        FROM tb_dado AS d
        JOIN tb_sensor AS s
        ON d.fk_sensor = s.id_sensor
        WHERE s.fk_empresa = ${id_empresa}
        GROUP BY s.numeroSala_sensor;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function alertasEmpresa(id_empresa) {
  console.log("ACESSEI O DASH  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
  var instrucaoSql = `
      SELECT 
        COUNT(*) AS total_alertas,
          s.numeroSala_sensor AS num_sala
      FROM tb_dado AS d
      JOIN tb_sensor AS s
      ON d.fk_sensor = s.id_sensor
      WHERE s.fk_empresa = ${id_empresa} AND d.temperatura_dado >= 25.00 OR d.temperatura_dado <= 21.00
      GROUP BY s.numeroSala_sensor;
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  listarIndicadores,
  buscarTemperaturaHistorica,
  buscarTemperaturaHistoricaFiltro,
  listarIndicadoresFiltro,
  mediaTemperatura,
  alertasEmpresa
}