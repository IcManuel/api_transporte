const { Router } = require("express");
const {
    getFavoritos,
    inserFavorito
} = require("../controllers/favorito_ctrl");

const router = Router();

router.post("/obtenerFavoritos", [], getFavoritos);
router.post("/insertFavorito", [], inserFavorito);

module.exports = router;