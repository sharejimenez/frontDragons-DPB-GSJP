Nuestro login quedo de la siguiente forma:
![image](https://github.com/user-attachments/assets/78679114-d154-43ef-b22c-834a75a35e38)
Y nuestra tabla se ve de la siguiente forma:
![image](https://github.com/user-attachments/assets/7438e899-7691-4443-a9fd-c3261d3daf9e)

Tenemos nuestros servicios donde consumimos nuestras APIS creadas en laravel primero tenemos la de usuarios y asi mismo guardamos el usuario en nuestro LocalStorage:
![image](https://github.com/user-attachments/assets/3c1d5acd-3268-4d7b-850e-2f2ea22ca3d9)
![image](https://github.com/user-attachments/assets/4dc80427-87f2-4e96-a803-3eeca008d43b)

Asi mismo tenemos nuestro servicio para consumir nuestra API de dragones:
![image](https://github.com/user-attachments/assets/fcbe1af3-f918-462f-9887-4e0ba7ca3d08)

## 📂 Estructura del Proyecto

| **Carpeta / Archivo**      | **Descripción**                                                                              
|----------------------------|---------------------------------------------------------------------------------------------|
| `app.component.*`          | Componente raíz del proyecto. Contiene la lógica principal y la estructura base.            |
| `app.config.ts`            | Configuración global para la aplicación.                                                    |
| `app.routes.ts`            | Configuración y definición de las rutas principales de la aplicación.                       |
| `catalogo/`                | Componente para manejar y mostrar el catálogo de elementos.                                 |
| `dashboard/`               | Componente principal del panel de control (dashboard).                                      |
| `dragon/`                  | Componente específico para gestionar información de dragones.                               |
| `footer/`                  | Componente reutilizable para el pie de página.                                              |
| `header/`                  | Componente reutilizable para el encabezado.                                                 |
| `home/`                    | Página de inicio o landing page de la aplicación.                                           |
| `list/`                    | Componente para manejar y mostrar listas de elementos.                                      |
| `login/`                   | Página de inicio de sesión para la autenticación de usuarios.                               |
| `modalagrega/`             | Modal para agregar nuevos elementos.                                                        |
| `modaldescripcion/`        | Modal para mostrar la descripción de un elemento.                                           |
| `modaledit/`               | Modal para editar información de un elemento existente.                                     |
| `modaleliminar/`           | Modal para confirmar y realizar la eliminación de un elemento.                              |
| `models/`                  | Contiene los modelos de datos utilizados en la aplicación.                                  |
| `navbar/`                  | Componente reutilizable para la barra de navegación.                                        |
| `pruena/`                  | Componente de prueba para funcionalidades temporales o en desarrollo.                       |
| `services/`                | Servicios para comunicación con el backend y manejo de datos.                               |
| `topbar/`                  | Barra superior reutilizable (parte del dashboard).                                          |
| `welcome/`                 | Página de bienvenida para los usuarios.                                                     |

---

## 📜 Descripción General

Este proyecto utiliza Angular para construir un frontend dinámico y modular. Incluye componentes reutilizables, servicios para la interacción con un backend y un conjunto de modales para manejar CRUD de elementos como dragones.

### 🚀 Funcionalidades Principales
1. Gestión de dragones con CRUD completo con una API consumida en Larevel.
2. Panel de control dinámico con navegación y filtros.
3. Autenticación de usuarios.
4. Modales interactivos para agregar, editar y eliminar elementos.
5. Página de inicio de sesión y bienvenida personalizable.

Cargamos nuestros dragones en nuestra tabla:
![image](https://github.com/user-attachments/assets/e9710113-ce62-4be5-b4ce-f07df1ef7f3e)

Agregamos modales para la vista la edicion y la eliminacion de nuestros daragones un CRUD en la tabla:
![image](https://github.com/user-attachments/assets/3f5e9c5a-4aa1-4236-ae29-f4119dd515ed)

En nuestro HTML del compnente de dragones pues le dimos forma a nuestra pagina:
![image](https://github.com/user-attachments/assets/7345e05b-ce0e-4897-9a57-68b82cfad5bd)

Los modales tienen los siguientes estilos:
![image](https://github.com/user-attachments/assets/0972071e-bcf6-4ad0-9219-5ecb2c4f061b)

Hacemos una prueba (Antes)
![image](https://github.com/user-attachments/assets/f2161fbc-9c4a-480d-9f9d-6af3928f9cfc)

(Despues)
![image](https://github.com/user-attachments/assets/ec30358e-cbc8-40d6-9dcd-146244966fae)
Refrescamos nuestro gestor de BDD y podemos ver que los cambios se realizaron de forma correcta

Los demas componentes que utilizamos son los siguientes:
![image](https://github.com/user-attachments/assets/272411ef-7bb8-4d03-a15d-6486fd22452e)

Que nos ayudaron para poder agregar componentes a nuestro home como la barra de navegacion del lado izqeuierdo:
![image](https://github.com/user-attachments/assets/13761f95-4bfd-47b1-96c5-be33987a8446)

