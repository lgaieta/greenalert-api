# GreenAlert

GreenAlert es una plataforma diseñada para gestionar y visualizar problemas ambientales en Argentina, facilitando la organización de usuarios y escuelas participantes en el programa.

La API de GreenAlert es una REST API que gestiona la información de usuarios, escuelas y problemas ambientales. Proporciona endpoints para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre:

-   **Usuarios**: Información sobre los usuarios registrados, incluyendo alumnos, profesores y directivos.
-   **Problemas Ambientales**: Reportes de incidentes ambientales, incluyendo descripción, ubicación y estado del incidente.
-   **Escuelas**: Detalles sobre las escuelas que están participando en el programa.
-   **Clases**: Información básica para organizar a los profesores.

## Comenzar el desarrollo

Para comenzar a trabajar en el proyecto, sigue estos pasos:

Primero, clona el repositorio del proyecto en tu máquina local:

```bash
git clone https://github.com/lgaieta/greenalert-api.git
```

Cambia al directorio del proyecto:

```bash
cd tu-repositorio
```

Utiliza npm para instalar todas las dependencias necesarias para el proyecto:

```bash
npm install
```

Después de instalar las dependencias, inicia el servidor de desarrollo:

```bash
npm run dev
```

Generalmente, esto levantará la aplicación en [http://localhost:3000](http://localhost:3000). Ahí podrás ver la aplicación en funcionamiento y comenzar a trabajar en ella.

## Documentación para desarrolladores

[Arquitectura](./docs/arquitectura.md)

[Entidades](./docs/entidades.md)
