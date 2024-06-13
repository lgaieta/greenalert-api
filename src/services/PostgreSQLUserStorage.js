class PostgreSQLUserStorage {
    static list() {
        /**
         * Logica para listar usuarios en postgresql
         */
        console.log("Listando usuarios de la base de datos con PostgreSQL");
    }

    static save(user) {
        /**
         * Logica para guardar usuarios en postgresql
         */
        console.log(
            `Guardando usuario ${user.email} en la base de datos con PostgreSQL`,
        );
    }
}

export default PostgreSQLUserStorage;
