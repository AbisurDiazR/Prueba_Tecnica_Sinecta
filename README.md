### **Prueba Técnica Sinecta** 💻

Este repositorio contiene la solución a la prueba técnica de Sinecta, un proyecto full-stack con una API REST en Node.js, una base de datos PostgreSQL y una aplicación web en Next.js. Todos los servicios son orquestados mediante Docker Compose.

---

### **Estructura del Repositorio** 📁

El proyecto está organizado de la siguiente manera:

- **`backend/`**: Código fuente de la API (Node.js/Express).
- **`frontend/`**: Código fuente de la aplicación web (Reactjs).
- **`docker-compose.yml`**: Archivo para la orquestación de los servicios de Docker.
- **`.env.example`**: Archivo para las variables de entorno.
- **`.gitignore`**: Archivo para las exclusiones de Git.
- **`PruebaTecnicaCollect.json`**: Archivo de colección de Postman para probar la API.

---

### **Pasos de Ambientación del Proyecto** 🛠️

Para poner el proyecto en funcionamiento, sigue estos pasos:

A continuación se presentan los pasos de ambientación del proyecto que describiste.

Pasos de Ambientación del Proyecto 🛠️
Para poner el proyecto en funcionamiento, sigue estos pasos:

Levantar los servicios con Docker:

Asegúrate de que Docker esté instalado y en ejecución.

Desde la carpeta principal, ejecuta el siguiente comando en la terminal:

Bash

docker-compose up -d --build
Este comando construirá las imágenes y levantará los servicios en segundo plano.

Configurar la base de datos:

Instala y abre DBeaver o cualquier otro cliente de bases de datos.

Crea una nueva conexión a PostgreSQL. Utiliza las variables del archivo .env para conectarte a la base de datos db.

Una vez conectado, copia y ejecuta los scripts de la base de datos (bd scripts).

Iniciar el backend:

Navega a la carpeta backend/.

Instala las dependencias:

Bash

npm install
Ejecuta el servidor en modo de desarrollo:

Bash

npm run dev
Iniciar el frontend:

Abre una nueva terminal y navega a la carpeta frontend/.

Instala las dependencias:

Bash

npm install
Ejecuta la aplicación:

Bash

npm start
Probar los endpoints de la API:

Importa el archivo PruebaTecnicaCollect.json en Postman.

Ejecuta la petición de Login User para obtener el token JWT.

Guarda el token en una variable de entorno de Postman llamada jwt_token.

Ahora puedes probar las demás rutas protegidas.
