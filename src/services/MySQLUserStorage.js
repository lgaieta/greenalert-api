class MySQLUserStorage {
    static list() {
        /**
         * Usar la libreria mysql2 y hacer una consulta SELECT para listar los usuarios
         */
        console.log("Listando usuarios de la base de datos");
    }

    static save(user) {
        /**
         * Usar la libreria mysql2 y hacer una consulta INSERT para guardar el usuario
         */
        console.log(`Guardando usuario ${user.email} en la base de datos`);
    }
}

export default MySQLUserStorage;
