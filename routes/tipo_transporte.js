const { Router } = require("express");

const router = Router();

const {
    obtenerTiposDeTransporte,
} = require("../controllers/tipo_transporte_ctrl");

router.get("/obtenerTodos", [], obtenerTiposDeTransporte);

module.exports = router;