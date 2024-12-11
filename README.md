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
