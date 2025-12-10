
✅ README.md

# TP_FINAL_UTN_FRONTEND

🚀 Frontend – Gestión de Tareas

Aplicación frontend desarrollada en **React** para el Trabajo Final de la UTN.  
Permite registrarse, verificar email, iniciar sesión, crear categorías, crear/editar tareas y gestionar autenticación con JWT.

---

## 📦 Tecnologías Utilizadas

- React 18  
- React Router DOM  
- Context API (manejo global de autenticación)  
- Custom Hooks (useFetch / useForm)  
- Fetch API  
- Vite  
- CSS modular  
- react-jwt (decodificación JWT)

---

## 🌐 Variables de entorno

Crear archivo:

.env

Y colocar:

VITE_APP_API_URL=https://abril-mh-tp-final-utn-backend.vercel.app

---

## 📁 Estructura del Proyecto
TP_FINAL_FRONTEND/
│
├── config/
│   └── environment.js
│       - Define la constante ENVIRONMENT con la URL del backend usando variables .env
│
├── Context/
│   └── AuthContext.jsx
│       - Maneja estado global de autenticación
│       - Decodifica token JWT
│       - Guarda y borra token en localStorage
│       - Expone: user, isLogged, checking, onLogin(), onLogout()
│
├── hooks/
│   ├── useFetch.jsx
│   │   - Hook genérico para peticiones HTTP
│   │   - Maneja loading, error, response
│   │   - Ejecuta funciones API enviadas por parámetros
│   │
│   └── useForm.jsx
│       - Hook para manejo de formularios
│       - Controla estados de inputs y submit
│
├── Middlewares/
│   └── AuthMiddleware.jsx
│       - Protege rutas privadas
│       - Redirige a /login si no hay usuario
│       - Muestra <Outlet /> si la sesión es válida
│
├── components/
│   (Si agregás luego, aquí irían componentes reutilizables)
│
├── screens/
│   ├── Home/
│   │   ├── HomeScreen.jsx
│   │   └── HomeScreen.css
│   │       - Pantalla principal de tareas
│   │       - Listado, creación rápida, edición inline
│   │       - Fondo con imagen de gatito
│   │
│   ├── Categories/
│   │   └── CategoriesScreen.jsx
│   │       - CRUD de categorías
│   │
│   ├── Tasks/
│   │   ├── CreateTaskScreen.jsx
│   │   │   - Formulario para crear tareas
│   │   │   - Envía datos al backend y redirige a Home
│   │   │
│   │   └── EditTaskScreen.jsx
│   │       - Carga tarea por ID
│   │       - Edita título + descripción
│   │       - Actualiza y navega a Home
│   │
│   ├── Auth/
│   │   ├── LoginScreen.jsx
│   │   ├── RegisterScreen.jsx
│   │   └── VerificationScreen.jsx
│   │       - Confirma email con token del backend
│   │
│   └── (otras pantallas que agregues)
│
├── services/
│   ├── AuthService.js
│   ├── CategoryService.js
│   └── TaskService.js
│       - Encapsulan todas las llamadas al backend (GET/POST/PUT/DELETE)
│
├── router/
│   └── AppRouter.jsx
│       - Define rutas públicas y privadas
│       - Usa AuthMiddleware
│
├── App.jsx
│   - Envuelve todo con AuthContextProvider y AppRouter
│
├── main.jsx
│   - Punto de entrada de React
│
├── index.css
│
└── package.json

---

## 🔐 Autenticación

Se utiliza JWT guardado en **localStorage**.  
Se decodifica con **react-jwt**.

El AuthContext maneja:

- `user`
- `isLogged`
- `checking`
- `onLogin()`
- `onLogout()`

Las rutas protegidas usan:

```jsx
<AuthMiddleware />


---

📬 Verificación de Email

El usuario recibe un link del backend:

/verify?token=123abc

El frontend llama a:

GET /auth/verify?token=...

Si el token es válido → redirige al login con mensaje de éxito.


---

📝 Funcionalidades principales

✔ Registro con verificación por correo
✔ Login con JWT
✔ Crear categorías
✔ Crear tareas
✔ Editar tareas
✔ Listado dinámico
✔ Rutas protegidas
✔ Hooks reutilizables (useFetch + useForm)


---

▶️ Cómo ejecutar

npm install
npm run dev

Abrir:

http://localhost:5173


---

⚙️ Configuración del entorno

Archivo:

src/config/environment.js

const ENVIRONMENT = {
  URL_API: import.meta.env.VITE_APP_API_URL
};

export default ENVIRONMENT;


---

[ver Documentacion tecnica](/DOCUMENTACION.md)

