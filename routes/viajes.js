const { Router } = require("express");
const {
    filtrarViajes
} = require("../controllers/viaje_ctrl");
const router = Router();

router.post("/filtrarViajes", [], filtrarViajes);

module.exports = router;