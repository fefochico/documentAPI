# Instrucciones de uso
Servicio que permite subir documentos a la maquina donde se aloja el backend. Estos documentos estarían asociados a un usuario.

La aplicación se ha desarrollado utilizando una base de datos MySQL y una base de datos Redis para almacenar los uuid temporales de los email para cambiar la contraseña.

El fichero de configuración del proyecto se encuentra en el directorio config. Donde se pueden añadir las configuraciones de las bases de datos y cliente smtp.

Para levantar el servidor es necesario utilizar el comando.

> node server.js.

Los test se deberían hacer sobre una base de datos de test ya que son pruebas End-To-END. Así que para 
realizar los test es necesario apuntar a una base de datos de pruebas vacía. 

> npm test


En cuanto a las rutas existentes.
Por un lado, tenemos las rutas de usuario que serían.

### Crear usuario
- '${ruta_base}:${port}/user/new' (POST)

- Parámetros por body: \
{"username": "test1", 
"password": "1q2w3e4r", 
"email": "test@test.com"}

### Login usuario

>'${ruta_base}:${port}/user/login (POST)

- Parámetos por body: \
{"username": "test1", 
"password": "1q2w3e4r"}

### Recuperar cuenta de usuario

> '${ruta_base}:${port}/user/forgot' (POST)

- Parámetros por body: \
{"email": "test@test.com"}

### Cambiar contraseña de usuario, como consecuencia de recuperación de cuenta

> '${ruta_base}:${port}/user/updatepass' (PATCH)

- Parámetros por body: \
{"uuid": ${uuid}, "password": "1234"}

### Eliminar usuario

> '${ruta_base}:${port}/user/remove'

- Parámetros por header: \
{'Authorization', 'Bearer ${token}'} \
- Parámetros por body: \
{"id": ${id}}


Por otro lado, tenemos las rutas de ficheros:

### Subir documento

> '${ruta_base}:${port}/file/upload' (POST)

- Parámetros por header: \
{'Authorization', 'Bearer ${token}'} \
- Parámetros por body: \
{'file','test/test.jpg'}

### Listar documentos

> '${ruta_base}:/file/all/${iduser}'

- Parámetros por header: \
{'Authorization', 'Bearer ${token}'} \

### Renombrar documento

> '${ruta_base}:${port}/user/rename' (PATCH)

- Parámetros por header: \
{'Authorization', 'Bearer ${token}'} \
- Parámetros por body: \
{"id": ${id}, "name": "newname.jpg"}

> '${ruta_base}:${port}/user/remove'

### Descargar documento

> '${ruta_base}:${port}/file/download/${id}' (GET)

- Parámetros por header: \
{'Authorization', 'Bearer ${token}'} \


### Eliminar documento

> '${ruta_base}:${port}/file/remove' (DELETE)

- Parámetros por header: \
{'Authorization', 'Bearer ${token}'} \
- Parámetros por body: \
{"id": ${id}}