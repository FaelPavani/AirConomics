var usuarioModel = require("../models/usuarioModel");
var enderecoModel = require("../models/enderecoModel");
var empresaModel = require("../models/empresaModel");

function autenticar(req, res) {
    var email = req.body.email;
    var senha = req.body.senha;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        return res.json({
                            id: resultadoAutenticar[0].id_usuario,
                            email: resultadoAutenticar[0].email_login,
                            nome: resultadoAutenticar[0].nome_usuario,
                            empresa_id: resultadoAutenticar[0].empresaId,
                            tecnico: resultadoAutenticar[0].usuario_tecnico,
                            master: resultadoAutenticar[0].usuario_master
                        })
                        // aquarioModel.buscarAquariosPorEmpresa(resultadoAutenticar[0].empresaId)
                        //     .then((resultadoAquarios) => {
                        //         if (resultadoAquarios.length > 0) {
                        //             res.json({
                        //                 id: resultadoAutenticar[0].id,
                        //                 email: resultadoAutenticar[0].email,
                        //                 nome: resultadoAutenticar[0].nome,
                        //                 senha: resultadoAutenticar[0].senha,
                        //                 aquarios: resultadoAquarios
                        //             });
                        //         } else {
                        //             res.status(204).json({ aquarios: [] });
                        //         }
                        //     })
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    var telefone = req.body.telefone;
    var dt_nascimento = req.body.dtNascimento;

    var razao_social = req.body.razao_social;
    var nome_fantasia = req.body.nome_fantasia;
    var responsavel = req.body.responsavel;
    var telefone_emp= req.body.telefone_emp;
    var cnpj = req.body.cnpj;

    var cep = req.body.cep;
    var numero = req.body.numero;
    var complemento = req.body.complemento; 
    var rua = req.body.rua;
    var cidade = req.body.cidade;
    var uf = req.body.uf;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined");
    } else if (dt_nascimento == undefined) {
        res.status(400).send("Data de nascimento undefined!");
    }else if (razao_social == undefined) {
        res.status(400).send("Razão social undefined!");
    }else if (nome_fantasia == undefined) {
        res.status(400).send("Nome Fantasia undefined!");
    }else if (responsavel == undefined) {
        res.status(400).send("Responsável undefined!");
    }else if (telefone_emp == undefined) {
        res.status(400).send("Telefone da empresa undefined!");
    }else if (cnpj == undefined) {
        res.status(400).send("CNPJ undefined!");
    }else if (cep == undefined) {
        res.status(400).send("CEP undefined!");
    }else if (numero == undefined) {
        res.status(400).send("Número do endereço undefined!");
    }else if (rua == undefined) {
        res.status(400).send("Rua undefined!");
    }else if (cidade == undefined) {
        res.status(400).send("Cidade undefined!");
    }else if (uf == undefined) {
        res.status(400).send("UF undefined!");
    }else if (complemento == undefined) {
        res.status(400).send("Coplemento undefined!");
    } else {
        usuarioModel.cadastrar(req.body)
                    .then(
                        function (resultado) {
                            res.json(resultado);
                        }
                    ).catch(function(erro){
                        console.log(
                            "\nHouve um erro ao realizar o cadastro! Erro: ",
                            erro.sqlMessage
                        );
                        res.status(500).json(erro.sqlMessage);
                    })


    }
}


function cadastrarPorEmpresa(req, res){
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    var telefone = req.body.telefone;
    var dt_nascimento = req.body.dtNascimento;
    var id_empresa = req.params.empresaId;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined");
    } else if (dt_nascimento == undefined) {
        res.status(400).send("Data de nascimento undefined!");
    } else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarPorEmpresa(nome, email, senha, telefone, dt_nascimento, id_empresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
module.exports = {
    autenticar,
    cadastrar,
    cadastrarPorEmpresa
}