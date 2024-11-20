var salasModel = require("../models/salasModel");

function listarPorId(req, res) {
  var empresa_id = req.params.empresaId;

  if (empresa_id == undefined) {
    res.status(400).send("Id empresa está undefined!");
  } else {

    salasModel.listarPorId(empresa_id)
      .then(
        function (resultado) {
          console.log(`\nResultados encontrados: ${resultado.length}`);
          console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String
          if(resultado.length > 0) {
            res.status(200).json(resultado);
          }else{
            res.status(204).send("Nenhuma sala encontrada!")
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

function buscarDadosPorData(req, res){
  var sensor_id = req.params.sensorId;

  if (sensor_id == undefined) {
    res.status(400).send("Id do sensor está undefined!");
  } else {

    salasModel.buscarDadosPorData(sensor_id)
      .then(
        function (resultado) {
          console.log(`\nResultados encontrados: ${resultado.length}`);
          console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String
          if(resultado.length > 0) {
            res.status(200).json(resultado);
          }else{
            res.status(204).send("Nenhuma sala encontrada!")
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

module.exports = {
  listarPorId,
  buscarDadosPorData
}