# Creacion de API:
Creamos nuestro proyecto en Laravel debemos tener instalado PHP, composer:
![image](https://github.com/user-attachments/assets/b39ec4f0-b8d4-47e2-b5ad-37b725cd2500)

Podemos iniciar el servidor para revisar que realmente se puede visualizar con: $ php artisan serve:
![image](https://github.com/user-attachments/assets/1af80c3d-fd85-4da5-a0f8-8bf82f3cc256)
Podemos ver en nuestro navegador que efectivamente nos carga nuestro localhost
![image](https://github.com/user-attachments/assets/deb2680f-2f48-465d-93dd-6763f972186c)

Creamos nuestro modelo con su migraacion con $ php artisan make:model Usuario -m ,nuestra migración se asignamos los datos que nosotros requerimos para nuestra API
![image](https://github.com/user-attachments/assets/8b769068-fcad-4c92-8cc7-f8a4ec897cdc)

Los campos timestamps() generan automáticamente columnas created_at y updated_at para rastrear
cuándo se creó y actualizó cada registro, ara ejecutar la migracion y aplicar los cambios usamos el comando: php artisan migrate esto creara la tabla apis con los campos especificados.
Vamos a modificar los Modelos en nuestro caso api.php para poder rellenar los campos que ya
rellenamos en nuestra migracion.
![image](https://github.com/user-attachments/assets/93d3674d-38f5-4fcd-90ae-6dca50e73b24)

Controlador, crearemos un archivo controlador para los usuarios con el siguiente comando: $ php artisan make:controller Api/UsuarioController --model=Usuario

Para que sirven los contoladores?
![image](https://github.com/user-attachments/assets/89623948-2efe-4f4e-b53e-665bd1935c45)
En Laravel, los controladores son responsables de manejar la lógica del servidor y actuar como intermediarios entre las rutas y los modelos o la base de datos. Su propósito principal es organizar y gestionar las solicitudes HTTP (GET, POST, PUT, DELETE) que recibe tu aplicación, de manera que el código sea más limpio y modular.

Crear el controlador nos arroja un nuevo archivo en Controllers:
![image](https://github.com/user-attachments/assets/02555ed2-83f3-4d17-9b8d-e42957dad9a2)

Actualizamos nuestro archivo api.php en la carptea de routes:
![image](https://github.com/user-attachments/assets/bf33d13a-b1aa-4b8c-b187-8f953cf5514b)

Vamos a migrar nuestra tabla de usuarios con el comando de php artisan migrate antes debemos cambiar nuestra configuración en el archivo de .env, ahora debemos de crear nuestras rutas para nuestra API de usuarios necesitamos crear un archivo api.php en la carpeta de routes.
$ php artisan install:api
![image](https://github.com/user-attachments/assets/7359009d-fad3-40e3-afc4-2b2d1a2ec8e4)

Editamos el archivo que nos creo que es routes/api.php.
Definiendo donde esta nuestro controlador y la ruta donde podremos acceder a nuestra API.
![image](https://github.com/user-attachments/assets/36044bb2-63b0-45e3-bde0-d720f262ddff)
Le damos guardar y con el comando de php artisan route:list deberia ya de aparecer nuestras rutas:
![image](https://github.com/user-attachments/assets/4a915f22-07bf-4681-aace-168296228a93)

Configuramos nuestro .env para la conexión a la BDD
![image](https://github.com/user-attachments/assets/f1f1751b-ad42-48b5-bf8d-7c438ce8f563)

Usamos php artisan migrate para guardar los cambios en nuestra BDD mediante nuestras migraciones, con eso deberia crearse la tabla en nuestra base de datos:
![image](https://github.com/user-attachments/assets/33d3fd49-7ad8-464d-909c-81964dc2ac34)

Nosotros estamos usando MySQL con Workbench
![image](https://github.com/user-attachments/assets/85a0fef8-0ad5-408e-b5ac-2874bef29b6e)

Se nos creo la tabla de usuarios en nuestra BDD
Con esto ya podríamos usar la API y la probamos en POSTMAN:En nuestro navegador igual si ingresamos el localhost/ruta deberia de aparecer en formato de JSON:
![image](https://github.com/user-attachments/assets/24824985-6ba4-4071-8a8f-d273eb0f0553)

No tenemos datos así que solo nos da el resultado como arriba.
Ingresamos datos en POSTMAN:
Hacemos un metodo POST ingresamos los datos y depsues le di refresh a mi navegador y ya me aparece
Juan :D
![image](https://github.com/user-attachments/assets/936a65e9-8341-4845-a84f-ddb2b8f1cbef)
![image](https://github.com/user-attachments/assets/23287829-5968-4be1-be2c-c041b6be72e5)
