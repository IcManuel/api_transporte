const { Router } = require("express");

const router = Router();

const {
    getBusquedas,
    insertBusqueda
} = require("../controllers/busqueda_ctrl");

router.post("/obtenerBusquedas", [], getBusquedas);
router.post("/insertarBusqueda", [], insertBusqueda);
module.exports = router;