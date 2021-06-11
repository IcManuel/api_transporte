const pool = require("../db");

const obtenerTipos = async() => {
    try {
        const res = await pool.query("select ttr_id, ttr_codigo, ttr_nombre, COALESCE(ttr_imagen,'') as ttr_ " +
            "from tipo_transporte " +
            "where ttr_activo is true " +
            "order by ttr_orden", []);
        return res.rows;
    } catch (error) {
        console.error("Error al obtener tipos de transporte", error);
        return null;
    }
}

module.exports = {
    obtenerTipos
}