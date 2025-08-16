### **Prueba Técnica Sinecta** 💻

Este repositorio contiene la solución a la prueba técnica de Sinecta, un proyecto full-stack con una API REST en Node.js, una base de datos PostgreSQL y una aplicación web en Next.js. Todos los servicios son orquestados mediante Docker Compose.

-----

### **Estructura del Repositorio** 📁

El proyecto está organizado de la siguiente manera:

  * **`backend/`**: Código fuente de la API (Node.js/Express).
  * **`frontend/`**: Código fuente de la aplicación web (Next.js).
  * **`docker-compose.yml`**: Archivo para la orquestación de los servicios de Docker.
  * **`.env`**: Archivo para las variables de entorno.
  * **`.gitignore`**: Archivo para las exclusiones de Git.
  * **`PruebaTecnicaCollect.json`**: Archivo de colección de Postman para probar la API.

-----

### **Pasos de Ambientación del Proyecto** 🛠️

Para poner el proyecto en funcionamiento, sigue estos pasos:

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/tu-usuario/nombre-del-repo.git
    cd nombre-del-repo
    ```

2.  **Configurar las variables de entorno:**

      * Crea un archivo llamado `.env` en la carpeta principal.
      * Copia y pega el siguiente contenido, reemplazando los valores con tu configuración:

    <!-- end list -->

    ```dotenv
    # Variables de la base de datos
    DB_USER=
    DB_PASSWORD=
    DB_HOST=db
    DB_NAME=prueba_collect

    # Variables del servidor de Node.js
    PORT=5000
    JWT_SECRET=super_secreto_y_largo
    ```

3.  **Ejecutar el proyecto con Docker Compose:**

      * Asegúrate de que **Docker** esté instalado y en ejecución.
      * Desde la carpeta principal, ejecuta el siguiente comando:

    <!-- end list -->

    ```bash
    docker-compose up --build
    ```

4.  **Acceder a la aplicación:**

      * El backend estará disponible en **`http://localhost:5000`**.
      * El frontend estará disponible en **`http://localhost:3000`**.

5.  **Probar los endpoints de la API:**

      * Importa el archivo **`PruebaTecnicaCollect.json`** en Postman.
      * Ejecuta la petición de **`Login User`** para obtener el token JWT.
      * Guarda el token en una variable de entorno de Postman llamada **`jwt_token`**.
      * Ahora puedes probar las demás rutas protegidas.

