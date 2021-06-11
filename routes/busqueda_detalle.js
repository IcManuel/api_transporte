const { Router } = require("express");
const { insertBusquedaDetalle } = require("../controllers/busqueda_detalle_ctrl");
const router = Router();

router.post("/insertarBusquedaDetalle", [], insertBusquedaDetalle);

module.exports = router;