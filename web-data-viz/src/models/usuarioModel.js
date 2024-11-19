var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id_usuario, nome_usuario, email_login, fk_empresa as empresaId, usuario_tecnico, usuario_master FROM tb_usuario WHERE email_login = '${email}' AND senha_login = md5('${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(body) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.

    var instrucaoSql = `
                    INSERT INTO tb_endereco (id_endereco, rua, bairro, cidade, cep, estado, complemento, numero) 
                    VALUES (default, '${body.rua}', '${''}', '${body.cidade}', '${body.cep}', '${body.uf}', '${body.complemento}', '${body.numero}')
    `;
    return database.executar(instrucaoSql).then((res) => {
        var endereco_id = res.insertId
        var instrucaoSql2 = `
                        INSERT INTO tb_empresa (id_empresa, nome_empresa, cnpj_empresa, nomeFantasia_empresa, RazaoSocial_empresa, 
                        responsavel_empresa, telefone_responsavel, fk_endereco) 
                        VALUES (default, '${body.nome_fantasia}', '${body.cnpj}', '${body.nome_fantasia}', '${body.razao_social}', '${body.responsavel}', '${body.telefone_emp}', ${endereco_id})`;
    
        database.executar(instrucaoSql2).then((res) => {
            var empresa_id = res.insertId
            var instrucaoSql3 = `
                                INSERT INTO tb_usuario (nome_usuario, email_login, senha_login, telefone_usuario, fk_empresa, dt_nascimento, usuario_master) VALUES ('${body.nome}', '${body.email}', md5('${body.senha}'), '${body.telefone}', ${empresa_id}, '${body.dtNascimento}', true);
            `;
            database.executar(instrucaoSql3)
        })
    })
   
    
   
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
}

function cadastrarPorEmpresa(nome, email, senha, telefone, dt_nascimento, id_empresa, tecnico) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, telefone);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO tb_usuario (nome_usuario, email_login, senha_login, telefone_usuario, fk_empresa, dt_nascimento, usuario_tecnico) VALUES ('${nome}', '${email}', md5('${senha}'), '${telefone}', ${id_empresa}, '${dt_nascimento}', ${tecnico});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    cadastrarPorEmpresa
};