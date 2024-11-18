var express = require("express");
var router = express.Router();

var dashController = require("../controllers/dashController");

router.get("/indicadores", function (req, res) {
  dashController.listarIndicadores(req, res);
});

router.get("/temperaturaHist", function (req, res) {
  dashController.buscarTemperaturaHistorica(req, res);
})

module.exports = router;