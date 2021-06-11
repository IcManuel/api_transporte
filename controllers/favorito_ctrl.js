const {
    obtenerFavoritos,
    insertarFavorito
} = require("../database/repositories/favorito_repo");

const { response, request } = require("express");

const inserFavorito = async(req = request, res = response) => {
    try {
        const datos = req.body;
        console.log('Fav ', datos);
        let favorito = await insertarFavorito(datos);
        if (!favorito) {
            return res.status(500).json({
                ok: false,
                msg: "Error al ejecutar la BD"
            });
        }
        res.status(200).json({
            ok: true,
            favorito
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al insertar favorito",
            error
        });
    }
}

const getFavoritos = async(req, res = response) => {
    try {
        const datos = req.body;
        let favoritos = await obtenerFavoritos(datos.idUsuario, datos.idDispositivo);
        if (!favoritos) {
            return res.status(500).json({
                ok: false,
                msg: "Error en el select"
            });
        }
        res.status(200).json({
            ok: true,
            favoritos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al obtener favoritos",
            error
        });
    }
}

module.exports = {
    getFavoritos,
    inserFavorito
}