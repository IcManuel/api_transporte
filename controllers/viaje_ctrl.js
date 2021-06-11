const { request, response } = require("express");
const {
    obtenerViajes
} = require("../database/repositories/viaje_repo");

const filtrarViajes = async(req = request, res = response) => {
    try {
        const viajes = await obtenerViajes(req.body);
        if (!viajes) {
            return res.status(500).json({
                ok: false,
                msg: "Error al ejecutar el select"
            });
        }
        res.status(200).json({
            ok: true,
            viajes
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: "Error al obtener viajes",
            error
        });
    }
}

module.exports = {
    filtrarViajes
}