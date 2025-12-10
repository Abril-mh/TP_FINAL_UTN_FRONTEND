
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
│
├── Context/
│   └── AuthContext.jsx
│
├── hooks/
│   ├── useFetch.jsx
│   │
│   └── useForm.jsx
│
├── Middlewares/
│   └── AuthMiddleware.jsx
│
├── components/
│
├── screens/
│   ├── Home/
│   │   ├── HomeScreen.jsx
│   │   └── HomeScreen.css
│   │
│   ├── Categories/
│   │   └── CategoriesScreen.jsx
│   │
│   ├── Tasks/
│   │   ├── CreateTaskScreen.jsx
│   │   │
│   │   └── EditTaskScreen.jsx
│   │
│   ├── Auth/
│   │   ├── LoginScreen.jsx
│   │   ├── RegisterScreen.jsx
│   │   └── VerificationScreen.jsx
├── services/
│   ├── AuthService.js
│   ├── CategoryService.js
│   └── TaskService.js
│
├── App.jsx
│
├── main.jsx
│
├── index.html
│
└── package.json
└── package-lock.json
│
├── README.md
│
├── DOCUMENTACION.md
│
├── vercel.json
│
├── vite.config.js

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

