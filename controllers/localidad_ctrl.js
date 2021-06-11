const {
    recuperarCantones,
    buscarPorCodigo
} = require("../database/repositories/localidad_repo");

const { response, request } = require("express");

const obtenerPorCodigo = async(req = request, res = response) => {
    try {
        const datos = req.body;
        let localidad = await buscarPorCodigo(datos.codigo);
        if (!localidad) {
            return res.status(500).json({
                ok: false,
                msg: "Error al obtener por codigo "
            });
        }
        res.status(200).json({
            ok: true,
            localidad
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al obtener por codigo",
            error
        });
    }
}

const obtenerLocalidades = async(req, res = response) => {
    try {
        let localidades = await recuperarCantones();
        if (!localidades) {
            return res.status(500).json({
                ok: false,
                msg: "Error al obtener la consulta de la base de datos"
            });
        }
        res.status(200).json({
            ok: true,
            localidades
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: "Error al obtener localidades",
            error
        });
    }
}

module.exports = {
    obtenerLocalidades,
    obtenerPorCodigo
}