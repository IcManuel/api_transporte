# API REST BASICA CON NODEJS

Esta API REST, se puede utilizar como base para iniciar cualquier proyecto con NodeJs y Express, la base incluye:

- Configuracion express
- Configuracion de cors
- Configuracion de jwt
- Configuracion de archivo de variables (.env)
- Express validations
- Configuracion de conexion a base de datos

# Caracteristicas presentes!

- Procesos para Login de usuario
- Procesos para Registro de usuario
- Encriptacion de password

### Puedes realizar:

- Un login de usuario mediante email y password
- Registro de usuario encriptando el password
- Unir esta API a otra base de datos o utilizar un ORM

### Tecnologias

Esta api esta utilizando las siguientes tecnologias:

- [NodeJs](https://nodejs.org/es/) - Framework para javaScript en servidor!
- [Express](https://expressjs.com/es/) - modulo para manejo de peticiones
- [JWT](https://jwt.io/) - Encriptacion de password

### Instalacion

Primero crear un archivo llamada .env y en este poner las siguientes variables:

```sh
PORT= puerto para levantar el servidor (Ej. 400)
SECRET_JWT_SEDD= cadena para encriptar el password (Ej. **ejemplo-string**)
DB_USER= nombre del usuario de la base de datos (Ej. postgres)
DB_PASSWORD= password del usuario de la base de datos (Ej. 12345)
DB_HOST= host de la base de datos (Ej. localhost)
DB_NAME= nombre de la base de datos (Ej. app_comercial)
DB_PORT= puerto de la base de datos (Ej. 5432)
```

Para iniciar el servidor una vez clona el repositorio:

```sh
$ cd api_rest_basica
$ npm i
$ npm run dev
```

Este API REST basica requiere [Node.js](https://nodejs.org/) v4+ para desplegar.

Instalar las dependencias e iniciar el servidor en modo desarrollo.

```sh
$ cd api_rest_basica
$ npm i
$ npm run dev
```

Para produccion:

```sh
$ npm start
```

### Autor: Claus Chocho
