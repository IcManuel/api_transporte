const {
    obtenerTipos
} = require("../database/repositories/tipo_transporte_repo");

const { response } = require("express");

const obtenerTiposDeTransporte = async(req, res = response) => {
    try {
        const tipos_transporte = await obtenerTipos();
        if (!tipos_transporte) {
            return res.status(500).json({
                ok: false,
                msg: "Error al ejecutar la consulta"
            })
        }
        res.status(200).json({
            ok: true,
            tipos_transporte
        })
    } catch (error) {
        console.error('Error en el controlado de tipos de transporte', error);
        res.status(500).json({
            ok: false,
            msg: "Error al obtener tipos de transporte",
            error
        })
    }
}

module.exports = {
    obtenerTiposDeTransporte
}