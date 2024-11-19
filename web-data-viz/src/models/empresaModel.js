var database = require("../database/config");

function listar() {
  var instrucaoSql = `SELECT DISTINCT(id_empresa), nome_empresa FROM tb_empresa;`;

  return database.executar(instrucaoSql);
}

function cadastrar(razaoSocial, cnpj) {
  var instrucaoSql = `INSERT INTO empresa (razao_social, cnpj) VALUES ('${razaoSocial}', '${cnpj}')`;

  return database.executar(instrucaoSql);
}

module.exports = { listar, cadastrar };
