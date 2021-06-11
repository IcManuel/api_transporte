const pool = require("../db");

const metodoExisteDispositivo = async(imei) => {
    try {
        const datos = await pool.query("select dis_id from dispositivo where dis_emai = $1 ", [imei]);
        if (datos.rowCount > 0) {
            return datos.rows[0].dis_id;
        } else {
            return -1;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

const metodoInsertarDispositivo = async(dis) => {
    try {
        const datos = await pool.query("insert into dispositivo (dis_emai,dis_modelo) values ($1,$2) returning dis_id ", [dis.dis_imei, dis.dis_modelo]);
        return datos.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    metodoExisteDispositivo,
    metodoInsertarDispositivo
}