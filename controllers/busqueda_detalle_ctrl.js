const { request, response } = require("express");
const {
    insertarBusquedaDetalle
} = require("../database/repositories/busqueda_detalle_repo");

const insertBusquedaDetalle = async(req = request, res = response) => {
    try {
        const datos = req.body;
        let busqueda = await insertarBusquedaDetalle(datos);
        if (!busqueda) {
            return res.status(500).json({
                ok: false,
                msg: "Error al ejecutar la BD"
            });
        }
        res.status(200).json({
            ok: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al insertar busqueda detalle",
            error
        });
    }
}

module.exports = {
    insertBusquedaDetalle
}