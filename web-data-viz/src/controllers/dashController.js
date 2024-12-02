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

function mediaTemperatura(req, res){
  var empresa_id = req.params.empresaId

  if(empresa_id == undefined){
    res.status(404).send("Id da empresa indefinido")
  }else{
    dashModel.mediaTemperatura(empresa_id).then(function (resultado) {
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
}

function alertasEmpresa(req, res){
  var empresa_id = req.params.empresaId
  
  if(empresa_id == undefined){
    res.status(404).send("Id da empresa indefinido")
  }else{
    dashModel.alertasEmpresa(empresa_id).then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!")
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar alertas: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
  }
}

module.exports = {
  listarIndicadores,
  buscarTemperaturaHistorica,
  buscarTemperaturaHistoricaFiltro,
  listarIndicadoresFiltro,
  mediaTemperatura,
  alertasEmpresa
}