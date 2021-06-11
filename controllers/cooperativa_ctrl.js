const { response, request, json } = require("express");
const {
    metodoObtenerDatosCooperativa
} = require("../database/repositories/cooperativa_repo");

const obtenerDatosCoopeativa = async(req = request, res = response) => {
    try {
        const datos = req.body;
        const cooperativa = await metodoObtenerDatosCooperativa(datos.coo_id);
        if (!cooperativa) {
            res.status(500).json({
                ok: false,
                msg: "Error al obtener datos de cooperativa en el SQL"
            })
        }
        res.status(200).json({
            ok: false,
            cooperativa
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al obtener datos de cooperativa",
            error
        })
    }
}

module.exports = {
    obtenerDatosCoopeativa
}