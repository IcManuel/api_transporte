const pool = require("../db");

const recuperarCantones = async() => {
    try {
        const resultado = await pool.query("select can.loc_id as id, can.loc_nombre as nombre, can.loc_imagen as imagen " +
            "from localidad can where can.loc_id in (select distinct loc_id_desde " +
            "from viaje " +
            "UNION " +
            "select distinct loc_id_hasta " +
            "from viaje) " +
            "order by 2 ", []);
        return resultado.rows;
    } catch (error) {
        console.error('Error al obtener cantones ==> ', error);
        return null;
    }
}

const buscarPorCodigo = async(codigo) => {
    try {
        const res = await pool.query("select loc_id, loc_nombre from localidad where loc_codigo = $1", [codigo]);
        return res.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = { recuperarCantones, buscarPorCodigo, };