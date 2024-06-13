## Estructura de Carpetas

La estructura de carpetas del proyecto está organizada de la siguiente manera para mantener un código limpio y modular:

-   **entities**: Contiene los modelos de datos del sistema. Aquí se definen las estructuras de datos que se utilizan en la aplicación, como los modelos de usuario, clase, escuela, etc.

-   **usecases**: Incluye los casos de uso del negocio. Estos representan la lógica de negocio y las operaciones principales que se pueden realizar en la aplicación, como la gestión de usuarios, la organización de clases, y el registro de problemas ambientales.

-   **services**: Contiene los elementos externos a la lógica de negocio que se comunican con la aplicación. Aquí se encuentran los servicios que interactúan con bases de datos, APIs externas, y otros servicios auxiliares.

-   **routes**: Gestiona las rutas de Express que manejan los endpoints de la API. Aquí se definen las rutas y los controladores que responden a las solicitudes HTTP, gestionando las interacciones entre el cliente y el servidor.

-   **utils**: Contiene funciones y utilidades auxiliares que se utilizan en diferentes partes de la aplicación. Aquí se encuentran helpers, validadores, y otras herramientas que apoyan la funcionalidad general del sistema.
