var express = require("express");
var router = express.Router();

var salasController = require("../controllers/salasController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.get("/listar/:empresaId", function (req, res) {
  salasController.listarPorId(req, res);
  // console.log("Chegou aqui")
})

router.get("/datas/:sensorId", function (req, res) {
  salasController.buscarDadosPorData(req, res);
})

module.exports = router;