const {
    obtenerBusquedas,
    insertarBusqueda
} = require("../database/repositories/busqueda_repo");

const { response, request } = require("express");

const insertBusqueda = async(req = request, res = response) => {
    try {
        const datos = req.body;
        let busqueda = await insertarBusqueda(datos);
        if (!busqueda) {
            return res.status(500).json({
                ok: false,
                msg: "Error al ejecutar la BD"
            });
        }
        res.status(200).json({
            ok: true,
            busqueda
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al insertar busqueda",
            error
        });
    }
}

const getBusquedas = async(req = request, res = response) => {
    try {
        const datos = req.body;
        let busquedas = await obtenerBusquedas(datos.idUsuario, datos.idDispositivo);
        if (!busquedas) {
            return res.status(500).json({
                ok: false,
                msg: "Error al obtener sentencia de select"
            });
        }
        res.status(200).json({
            ok: true,
            busquedas
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: "Error al ejecutar el SQL",
            error
        })
    }
}

module.exports = {
    getBusquedas,
    insertBusqueda
}