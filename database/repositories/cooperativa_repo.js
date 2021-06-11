const pool = require("../db");

const metodoObtenerDirecciones = async(id) => {
    try {
        const resultado = await pool.query("select dir.dir_id,  " +
            "COALESCE(dir.dir_Calle_primaria,'')||' '||COALESCE(dir.dir_numeracion,'')||' '||COALESCE(dir.dir_calle_secundaria,'') as direccion, " +
            "dir.dir_telefono, dir.dir_celular, dir.dir_descripcion_atencion, dir.dir_info_adicional " +
            "from cooperativa_direccion coo join direccion dir on dir.dir_id = coo.dir_id " +
            "where coo.coo_id = $1", [id]);
        return resultado.rows;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const metodoObtenerDatosCooperativa = async(id) => {
    try {
        const coope = await pool.query("select coo.coo_id, coo.cco_nombre, coo.cco_acerca_de, coo.cco_imagen, dir.dir_id, " +
            "COALESCE(dir.dir_Calle_primaria,'')||' '||COALESCE(dir.dir_numeracion,'')||' '||COALESCE(dir.dir_calle_secundaria,'') as direccion, " +
            "dir.dir_telefono, dir.dir_celular, dir.dir_descripcion_atencion, dir.dir_info_adicional " +
            "from cooperativa coo join direccion dir on dir.dir_id = coo.dir_id " +
            "where coo.coo_id = $1", [id]);
        coope.rows[0].direcciones = await metodoObtenerDirecciones(coope.rows[0].coo_id);
        return coope.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    metodoObtenerDatosCooperativa,
    metodoObtenerDirecciones
}