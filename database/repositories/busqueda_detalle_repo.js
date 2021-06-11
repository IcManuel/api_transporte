const pool = require("../db");

const insertarBusquedaDetalle = async(bde) => {
    try {
        const ins = await pool.query("insert into busqueda_detalle (bus_id, vho_id, bde_fecha) values ($1,$2,now()) returning bde_id", [bde.bus_id, bde.vho_id]);
        return ins.rowCount;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    insertarBusquedaDetalle
}