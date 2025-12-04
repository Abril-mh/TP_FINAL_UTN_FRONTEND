✅  TP_FINAL_UTN_FRONTEND

🚀 Frontend – Gestión de Tareas

Aplicación frontend desarrollada en React para el Trabajo Final de la UTN.
Permite registrarse, verificar email, iniciar sesión, crear categorías, crear/editar tareas y gestionar autenticación con JWT.


---

📦 Tecnologías Utilizadas

React 18

React Router DOM

Context API (manejo global de autenticación)

Custom Hooks

Fetch API

Vite

CSS modular



---

🌐 Variables de entorno

Crear archivo:

.env

Y colocar:

VITE_APP_API_URL=https://abril-mh-tp-final-utn-backend.vercel.app


---

📁 Estructura del Proyecto

src/
 ├─ config/
 │   └─ environment.js
 ├─ Context/
 │   └─ AuthContext.jsx
 ├─ hooks/
 │   ├─ useFetch.jsx
 │   └─ useForm.jsx
 ├─ middleware/
 │   └─ AuthMiddleware.jsx
 ├─ screens/
 │   ├─ LoginScreen.jsx
 │   ├─ RegisterScreen.jsx
 │   ├─ VerificationScreen.jsx
 │   ├─ HomeScreen.jsx
 │   ├─ CreateTaskScreen.jsx
 │   ├─ EditTaskScreen.jsx
 │   └─ CategoriesScreen.jsx
 ├─ services/
 │   ├─ authService.js
 │   ├─ CategoryService.js
 │   └─ TaskService.js
 └─ App.jsx


---

🔐 Autenticación

Se utiliza JWT guardado en localStorage.

Se decodifica con react-jwt.

El AuthContext maneja:

user

isLogged

checking

onLogin

onLogout



Las rutas protegidas usan:

<AuthMiddleware />


---

📬 Verificación de Email

El usuario recibe un link:

/verify/123token

El frontend llama:

GET /api/auth/verify?token=...

Si es válido → redirige al login con mensaje de éxito.


---

📝 Funcionalidades principales

✔️ Registro con verificación por correo

✔️ Login con JWT

✔️ Crear categorías

✔️ Crear tareas

✔️ Editar tareas

✔️ Listado dinámico

✔️ Rutas protegidas

✔️ Hooks reutilizables (useFetch + useForm)


---

▶️ Cómo ejecutar

npm install
npm run dev

Abrir:

http://localhost:5173


---

⚙️ Configuración del entorno

El archivo:

src/config/environment.js

const ENVIRONMENT = {
  URL_API: import.meta.env.VITE_APP_API_URL
};

export default ENVIRONMENT;

-------

[ver Documentacion tecnica](/DOCUMENTACION.md)

