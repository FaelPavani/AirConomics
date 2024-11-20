var express = require("express");
var router = express.Router();

var dashController = require("../controllers/dashController");

router.get("/indicadores", function (req, res) {
  dashController.listarIndicadores(req, res);
});

router.get("/temperaturaHist", function (req, res) {
  dashController.buscarTemperaturaHistorica(req, res);
})

router.get("/temperaturaHist/:sensorId/:dia", function (req, res) {
  dashController.buscarTemperaturaHistoricaFiltro(req, res);
})

router.get("/temperaturaReal/:sensorId/:dia", function (req, res) {
  dashController.listarIndicadoresFiltro(req, res);
})

module.exports = router;