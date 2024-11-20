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

function listarIndicadoresFiltro(req, res){
  var id_sensor = req.params.sensorId
  var dia = req.params.dia

  dashModel.listarIndicadoresFiltro(id_sensor, dia).then(function (resultado) {
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

function buscarTemperaturaHistorica(req, res) {
  dashModel.buscarTemperaturaHistorica().then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar temperaturas históricas: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function buscarTemperaturaHistoricaFiltro(req, res) {
  var id_sensor = req.params.sensorId
  var dia = req.params.dia
  dashModel.buscarTemperaturaHistoricaFiltro(id_sensor, dia).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar temperaturas históricas: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

module.exports = {
  listarIndicadores,
  buscarTemperaturaHistorica,
  buscarTemperaturaHistoricaFiltro,
  listarIndicadoresFiltro
}