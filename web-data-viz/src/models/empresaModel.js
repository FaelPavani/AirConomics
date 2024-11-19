var database = require("../database/config");

function listar() {
  var instrucaoSql = `SELECT DISTINCT(id_empresa), nome_empresa FROM tb_empresa;`;

  return database.executar(instrucaoSql);
}

function cadastrar(razao_social, nome_fantasia, responsavel, telefone_emp, cnpj, id_endereco) {
  var instrucaoSql = `
                      INSERT INTO tb_empresa (id_empresa, nome_empresa, cnpj_empresa, nomeFantasia_empresa, RazaoSocial_empresa, 
                                              responsavel_empresa, telefone_responsavel, fk_endereco) 
                      VALUES (default, '${nome_fantasia}', '${cnpj}', '${nome_fantasia}', '${razao_social}', '${responsavel}', '${telefone_emp}', ${id_endereco})`;

  return database.executar_retorno(instrucaoSql);
}

module.exports = { listar, cadastrar };
