var express = require("express");
var router = express.Router();

var enderecoController = require("../controllers/enderecoController");

router.get("/:empresaId", function (req, res) {
  enderecoController.listarPorEmpresa(req, res);
});

module.exports = router;