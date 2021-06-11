const { Router } = require("express");
const {
    obtenerDatosCoopeativa
} = require("../controllers/cooperativa_ctrl");
const router = Router();

router.post("/obtenerDatos", [], obtenerDatosCoopeativa);

module.exports = router;