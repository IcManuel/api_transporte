const pool = require("../db");

const insertarFavorito = async(fav) => {
    try {
        const id = await pool.query("insert into favorito (usu_id, dis_id, loc_id, loc_id_hasta) values ($1,$2,$3,$4) returning fav_id", [fav.usu_id != -1 ? fav.usu_id : null, fav.dis_id, fav.loc_id, fav.loc_id_hasta]);
        const f = await obtenerFavoritoPorId(id.rows[0].fav_id);
        if (!f) {
            return null;
        }
        return f;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const obtenerFavoritoPorId = async(id) => {
    try {
        const resultados = await pool.query("select fav.fav_id, loc.loc_id, loc.loc_nombre, has.loc_id as loc_id_hasta, has.loc_nombre hastanombre " +
            "from favorito fav join localidad loc on loc.loc_id = fav.loc_id join localidad has on fav.loc_id_hasta = has.loc_id " +
            "where fav.fav_id = $1", [id]);
        return resultados.rows[0];
    } catch (error) {
        console.error(error);
        return null;
    }
}

const obtenerFavoritos = async(usu, dis) => {
    try {
        let ce = "";
        if (usu != -1) {
            ce = " fav.dis_id in (select dis_id from usuario_dispositivo where usu_id = " + usu + ") ";
        } else {
            ce = " fav.dis_id = " + dis;
        }
        const resultados = await pool.query("select fav.fav_id, loc.loc_id, loc.loc_nombre, has.loc_id as loc_id_hasta, has.loc_nombre hastanombre " +
            "from favorito fav join localidad loc on loc.loc_id = fav.loc_id join localidad has on fav.loc_id_hasta = has.loc_id " +
            "where " + ce, []);
        return resultados.rows;
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = {
    obtenerFavoritos,
    insertarFavorito
}