var dashModel = require("../models/dashModel");
// var avisoModel = require("../models/avisoModel");

function listarIndicadores(req, res) {
  dashModel.listarIndicadores().then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os indicadores: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

module.exports = {
  listarIndicadores
}