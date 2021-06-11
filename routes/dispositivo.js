const { Router } = require("express");
const { insertarDispositivo } = require("../controllers/dispositivo_ctrl");
const router = Router();

router.post("/insertarDispositivo", [], insertarDispositivo);

module.exports = router;