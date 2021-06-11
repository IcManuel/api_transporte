const pool = require("../db");

const insertarBusqueda = async(bus) => {
    try {
        const id = await pool.query("insert into busqueda (usu_id, dis_id, loc_id_desde, loc_id_hasta,ttr_id,bus_fecha) values ($1,$2,$3,$4,$5,now()) returning bus_id", [bus.usu_id != -1 ? bus.usu_id : null, bus.dis_id, bus.loc_id_desde, bus.loc_id_hasta, bus.ttr_id]);
        const f = await obtenerBusquedaPorId(id.rows[0].bus_id);
        if (!f) {
            return null;
        }
        return f;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const obtenerBusquedaPorId = async(id) => {
    try {
        const resultados = await pool.query("select bus.bus_id, to_char(bus.bus_fecha, 'dd-MM-yyyy HH24:MI:ss') as bus_fecha, " +
            "des.loc_nombre as desde, has.loc_nombre hasta " +
            "from busqueda bus join localidad des on des.loc_id = bus.loc_id_desde " +
            "join localidad has on has.loc_id = bus.loc_id_hasta " +
            "where  bus.bus_id = $1 ", [id]);
        return resultados.rows;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const obtenerBusquedas = async(usu, dis) => {
    try {
        let ce = "";
        if (usu != -1) {
            ce = " bus.dis_id in (select dis_id from usuario_dispositivo where usu_id = " + usu + ") ";
        } else {
            ce = " bus.dis_id = " + dis;
        }
        const resultados = await pool.query("select bus.bus_id, to_char(bus.bus_fecha, 'dd-MM-yyyy HH24:MI:ss') as bus_fecha, " +
            "des.loc_nombre as desde, has.loc_nombre hasta " +
            "from busqueda bus join localidad des on des.loc_id = bus.loc_id_desde " +
            "join localidad has on has.loc_id = bus.loc_id_hasta " +
            "where " + ce + " order by bus.bus_fecha desc limit 10", []);
        return resultados.rows;
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = {
    obtenerBusquedas,
    insertarBusqueda
}