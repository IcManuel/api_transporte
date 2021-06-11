const pool = require("../db");

const obtenerViajes = async(filtro) => {
    try {
        let ce = "";
        if (filtro.idCooperativa != undefined && filtro.idCooperativa != -1) {
            ce = " and coo.coo_id = " + filtro.idCooperativa + " ";
        }
        if (filtro.tipoRuta != undefined && filtro.tipoRuta != "") {
            ce += " CASE WHEN length(trim(COALESCE(via.via_ruta,''))) =0 THEN 'TRAMO NORMAL' else  COALESCE(via.via_ruta,'TRAMO NORMAL')  end = '" + filtro.tipoRuta + "' ";
        }
        if (filtro.tipoOrden != undefined && filtro.tipoOrden != -1) {
            if (filtro.tipoOrden == 1) {
                ce += " and vho.vho_hora_salida >= to_char(now(),'HH24:MI')::time ";
            } else if (filtro.tipoOrden == 2) {
                ce += " and vho.vho_hora_salida = '" + filtro.horaInicial + "' ";
            } else if (filtro.tipoOrden == 3) {
                ce += " and vho.vho_hora_salida between '" + filtro.horaInicial + "' and '" + filtro.horaFinal + "' ";
            }
        }
        console.log("select distinct coo.coo_id,coo.cco_nombre, upper(COALESCE(dir.dir_calle_primaria,'')||' '||COALESCE(dir.dir_calle_secundaria,'')) as direccion_salida, " +
            "COALESCE(has.dir_calle_primaria,'')||' '||COALESCE(has.dir_calle_secundaria,'') as direccion_llegada, " +
            "via.via_precio,    CASE WHEN length(trim(COALESCE(via.via_ruta,''))) =0 THEN 'TRAMO NORMAL' else  COALESCE(via.via_ruta,'TRAMO NORMAL')  end as via_ruta, vho.vho_hora_salida,via.via_tiempo, " +
            "mov.mov_capacidad, mov.mov_aire, mov.mov_tv, mov.mov_wifi, mov.mov_banio, mov.mov_asientos_reclinables " +
            "from viaje via join viaje_horario vho on via.via_id = vho.via_id " +
            "join cooperativa coo on coo.coo_id = via.coo_id " +
            "join direccion dir on dir.dir_id = via.dir_id_desde " +
            "join direccion has on has.dir_id = via.dir_id_hasta " +
            "join movil mov on vho.mov_id = mov.mov_id " +
            "where via.loc_id_desde = $1 and via.loc_id_hasta = $2 and via.ttr_id =$3 " + ce +
            " order by vho.vho_hora_salida, coo.cco_nombre,5");
        const resultados = await pool.query("select distinct coo.coo_id,coo.cco_nombre, upper(COALESCE(dir.dir_calle_primaria,'')||' '||COALESCE(dir.dir_calle_secundaria,'')) as direccion_salida, " +
            "COALESCE(has.dir_calle_primaria,'')||' '||COALESCE(has.dir_calle_secundaria,'') as direccion_llegada, " +
            "via.via_precio,    CASE WHEN length(trim(COALESCE(via.via_ruta,''))) =0 THEN 'TRAMO NORMAL' else  COALESCE(via.via_ruta,'TRAMO NORMAL')  end as via_ruta, vho.vho_hora_salida,via.via_tiempo, " +
            "mov.mov_capacidad, mov.mov_aire, mov.mov_tv, mov.mov_wifi, mov.mov_banio, mov.mov_asientos_reclinables " +
            "from viaje via join viaje_horario vho on via.via_id = vho.via_id " +
            "join cooperativa coo on coo.coo_id = via.coo_id " +
            "join direccion dir on dir.dir_id = via.dir_id_desde " +
            "join direccion has on has.dir_id = via.dir_id_hasta " +
            "join movil mov on vho.mov_id = mov.mov_id " +
            "where via.loc_id_desde = $1 and via.loc_id_hasta = $2 and via.ttr_id =$3 " + ce +
            " order by vho.vho_hora_salida, coo.cco_nombre,5", [filtro.idDesde, filtro.idHasta, filtro.tipoTransporte]);
        return resultados.rows;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    obtenerViajes
}