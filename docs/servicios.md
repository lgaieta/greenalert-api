# Servicios

Los servicios son componentes que manejan la interacción con elementos externos a la lógica de negocio principal de la aplicación. Estos pueden incluir la comunicación con bases de datos, APIs externas, servicios de autenticación, y otros componentes auxiliares. Los servicios encapsulan estas operaciones externas, proporcionando una interfaz limpia y consistente para la lógica de negocio.

## Ejemplo de Servicio: Repositorio de Usuarios MySQL

```javascript
class MySQLUserRepository {
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

export default MySQLUserRepository;
```

En este ejemplo, `MySQLUserRepository` maneja operaciones relacionadas con la base de datos MySQL, como listar y guardar usuarios. La función `list` realizaría una consulta SELECT para obtener una lista de usuarios, mientras que la función `save` realizaría una consulta INSERT para agregar un nuevo usuario. Encapsular estas operaciones en un servicio permite a la lógica de negocio utilizar estas funciones sin preocuparse por los detalles de implementación, manteniendo el códi
