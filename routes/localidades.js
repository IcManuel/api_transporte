const { Router } = require("express");
const router = Router();

const {
    obtenerLocalidades,
    obtenerPorCodigo
} = require("../controllers/localidad_ctrl");

router.get("/obtenerTodos", [], obtenerLocalidades);
router.post("/obtenerPorCodigo", [], obtenerPorCodigo);

module.exports = router;