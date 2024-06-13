# Entidades

Necesitamos declarar cómo son los datos en nuestra app, para eso usamos las entidades. En la carpeta **entities**, como se muestra en el ejemplo, se definen clases que representan estas entidades del sistema.


```javascript
/**
 * Clase que representa un nuevo usuario que posiblemente será registrado en el sistema.
 */
class NewUser {
    constructor({ email, password }) {
        this.email = email;
        this.password = password;
    }
}

export default NewUser;
```

Gracias a esto, siempre que hablemos de un nuevo usuario vamos a usar la clase NewUser. Entonces no nos preocupamos de si estamos poniendo bien los datos entre partes del sistema, porque todos hablan de la misma clase.

## Definición de entidad

Una entidad en el contexto de desarrollo de software representa un concepto o objeto del mundo real que se modela en el sistema. En términos de programación orientada a objetos, una entidad generalmente se define como una clase que encapsula datos y funcionalidades relacionadas con un objeto específico dentro de la aplicación.