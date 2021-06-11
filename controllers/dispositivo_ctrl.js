const { request, response, json } = require("express");
const {
    metodoExisteDispositivo,
    metodoInsertarDispositivo
} = require("../database/repositories/dispositivo_repo");

const insertarDispositivo = async(req = request, res = response) => {
    try {
        const datos = req.body;
        const existe = await metodoExisteDispositivo(datos.dis_imei);
        if (existe == null) {
            return res.status(500).json({
                ok: false,
                msg: "Error al obtener existencia"
            });
        }
        if (existe == -1) {
            const id = await metodoInsertarDispositivo(datos);
            if (!id) {
                return res.status(500).json({
                    ok: false,
                    msg: "Error al obtener existencia"
                });
            }
            return res.status(201).json({
                ok: true,
                dis_id: id.dis_id
            });
        } else {
            return res.status(200).json({
                ok: true,
                dis_id: existe
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error entra en el catch",
            error
        });
    }
}
module.exports = { insertarDispositivo };