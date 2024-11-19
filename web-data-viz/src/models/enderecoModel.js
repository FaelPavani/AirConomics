var database = require("../database/config");

// function listar(empresaId) {
//   var instrucaoSql = `SELECT id_endereco, rua, bairro, cidade, cep, estado, complemento, numero FROM tb_endereco;`;

//   return database.executar(instrucaoSql);
// }

function cadastrar(cep, numero, complemento, rua, cidade, uf, bairro) {
  if(bairro == null){
    bairro = 'N/A'
  }

  var instrucaoSql = `
                      INSERT INTO tb_endereco (id_endereco, rua, bairro, cidade, cep, estado, complemento, numero) 
                      VALUES (default, '${rua}', '${bairro}', '${cidade}', '${cep}', '${uf}', '${complemento}', '${numero}')
                    `;

  return database.executar_retorno(instrucaoSql);
}

module.exports = { cadastrar };
