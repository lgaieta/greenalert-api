# Casos de Uso

Los casos de uso representan las operaciones principales y la lógica de negocio de la aplicación. En la carpeta `usecases`, se implementan estas operaciones, encapsulando la lógica que maneja cómo interactúan las diferentes entidades del sistema. Esto asegura que la lógica de negocio esté centralizada y sea fácil de mantener y probar.

## Ejemplo de Caso de Uso: Registrar Usuario (con Funciones)

```javascript
import NewUser from "../entities/NewUser";

function registerUser({ user, userStorage }) {
    const newUser = new NewUser(user);
    /* 
        Lógica de encriptación y validación de usuario no repetido 
    */
    userStorage.save(newUser);
}

export default registerUser;
```

En este ejemplo, el caso de uso `registerUser` se implementa como una función en lugar de una clase. Esta función toma un objeto que contiene los datos del usuario y el almacenamiento del usuario (`userStorage`). Crea una nueva instancia de `NewUser`, aplica la lógica necesaria (como encriptación y validación de unicidad del usuario), y luego guarda el nuevo usuario utilizando el `userStorage`.

La carpeta `usecases` proporciona una manera organizada de implementar y manejar la lógica de negocio, asegurando que todas las operaciones principales se realicen de manera consistente y siguiendo las reglas definidas del negocio.

## Ejemplo de Caso de Uso: Registrar Usuario (con Clases)

```javascript
import NewUser from "../entities/NewUser";
import userService from "../services/userService";

/**
 * Caso de uso para registrar un nuevo usuario en el sistema.
 */
class RegisterUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(userData) {
        const newUser = new NewUser(userData);
        const savedUser = await this.userRepository.save(newUser);
        return savedUser;
    }
}

export default RegisterUser;
```

En este ejemplo, el caso de uso `RegisterUser` encapsula la lógica necesaria para registrar un nuevo usuario en el sistema. Utiliza el modelo de entidad `NewUser` para crear una instancia del nuevo usuario y luego utiliza el `userRepository` (un servicio de la capa de `services`) para guardar el usuario en la base de datos.
