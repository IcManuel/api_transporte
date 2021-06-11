const express = require("express");

require("dotenv").config();

//Crear el servidor de express
const app = express();

//CORS
const cors = require("cors");
app.use(cors());

//Directorio publico
app.use(express.static("public"));

//Lectura y parseo del body
app.use(express.json());

//Rutas
//app.use("/api/auth", require("./routes/auth"));
app.use("/api/localidad", require("./routes/localidades"));
app.use("/api/tipo_transporte", require("./routes/tipo_transporte"));
app.use("/api/favoritos", require("./routes/favoritos"));
app.use("/api/busquedas", require("./routes/buquedas"));
app.use("/api/busqueda_detalle", require("./routes/busqueda_detalle"));
app.use("/api/dispositivo", require("./routes/dispositivo"));
app.use("/api/cooperativa", require("./routes/cooperativa"));
app.use("/api/viaje", require("./routes/viajes"));

//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});

//.env configuraciones

// PORT=4000
// DB_CNN=mongodb+srv://admin:admin630@cluster0.04i1y.mongodb.net/mern_calendar
// SECRET_JWT_SEDD=*-mern-claus