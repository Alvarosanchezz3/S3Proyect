# App Full Stack para Gestión de Usuarios con S3 de AWS 🚀

Este repositorio contiene el código de una app de gestión de usuarios con imágenes de perfil.

## Tecnologías Utilizadas 🛠️

- **Java - TypeScript**: Lenguajes de programación principales.
- **Spring Boot - Angular**: Frameworks utilizados
- **MySQL**: Base de datos relacional para almacenar datos de usuarios.
- **Amazon S3 (Simple Storage Service)**: Almacenamiento en la nube para las imágenes de perfil de los usuarios.

## Endpoints del Backend🌐

- `**GET /usuarios**:` Obtiene la lista de todos los usuarios.
- `**GET /usuarios/profile/{username}**:` Obtiene los detalles del usuario por nombre de usuario.
- `**POST /usuarios/login**:` Autentica al usuario.
- `**GET /s3/downloadAsBytes/{fileName}**:` Descarga la imagen de S3 directamente.
- `**POST /s3/upload**:` Sube un archivo a S3.
- `**DELETE /s3/delete/{fileName}**:` Elimina un archivo de S3.

## Drag and drop de archivos 🗃️

Drag and drop para manejar la actualización o subida de las imágenes de los usuarios al bucket del servicio S3 de AWS.

## Video del proyecto:

[https://github.com/Alvarosanchezz3/S3Proyect_Back-End/assets/99328696/826e5abc-0b2e-4daa-846b-9a1f4f084105](https://github.com/Alvarosanchezz3/S3Proyect/assets/99328696/5ba28153-20c8-48fc-9d1f-920178db7c30
)
