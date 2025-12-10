# 📘 **DOCUMENTACIÓN_TÉCNICA.md**

📘 Documentación Técnica del Frontend  
Aplicación desarrollada en React + Vite para la gestión de tareas con autenticación por JWT.

---

# 1️⃣ Arquitectura General

La aplicación implementa una arquitectura basada en:

- React + Vite  
- Servicios desacoplados  
- Estado global con Context API  
- Custom Hooks reutilizables  
- Middleware para rutas protegidas  
- Pantallas modulares  
- Capa de configuración para URL del backend  

La estructura permite separar responsabilidades y mantener un código mantenible y escalable.

---

# 2️⃣ Flujo de Autenticación (diagrama)

[ LoginScreen ] --- email/pass ---> [ authService.login ] ↓ [ Backend responde token JWT ] ↓ [ AuthContext.onLogin ] ↓

Guarda token en localStorage

Decodifica usuario con react-jwt

Cambia estado global ↓ Redirige a /home


Si el usuario no verificó email:  
→ Se informa en pantalla  
→ No puede ingresar a rutas protegidas  

---

# 3️⃣ Config – environment.js

Archivo: `src/config/environment.js`

```js
const ENVIRONMENT = {
  URL_API: import.meta.env.VITE_APP_API_URL
};

export default ENVIRONMENT;

Permite cambiar entre local, testing y producción simplemente modificando .env.


---

4️⃣ AuthContext.jsx — Manejo de Autenticación Global

Este contexto controla toda la sesión del usuario.

Funciones principales:

✔ Cargar usuario desde token
✔ Validar y decodificar JWT
✔ Redirigir después de login/logout
✔ Exponer estado global a todas las pantallas

Estados expuestos:

user

isLogged

checking

onLogin(token)

onLogout()


Si el token expira → se elimina automáticamente.


---

5️⃣ AuthMiddleware.jsx — Protección de rutas

Evita que usuarios no autenticados entren a:

/home

/create-task

/edit-task/:id

/categories


Funciona así:

return isLogged ? <Outlet /> : <Navigate to="/login" replace />;


---

6️⃣ Custom Hook: useFetch

Hook centralizado para peticiones HTTP.

Controla:

Estado	Uso

response	Respuesta del backend
loading	Estado de carga
error	Mensajes de error


Método principal:

execute(() => taskService.getTasks());

Implementa:

manejo automático de errores

loading global

compatibilidad con servicios reutilizables



---

7️⃣ Custom Hook: useForm

Simplifica el manejo de formularios:

Control de inputs

Estado del formulario

Reset

onSubmit reutilizable


Ideal para Login y Register.

Ejemplo:

const { form, handleChange, handleSubmit } = useForm({
  email: "",
  password: ""
});


---

8️⃣ Screens

A continuación el detalle de cada pantalla:


---

🔵 VerificationScreen.jsx

Valida el token enviado al correo.
Llama a:

GET /auth/verify?token=

Si es correcto → muestra mensaje y redirige al login.


---

🔵 LoginScreen.jsx

Usa:

useForm

useFetch

AuthContext


Cuando el backend responde:

onLogin(response.data.auth_token);

Si el usuario no está verificado → muestra advertencia.


---

🔵 RegisterScreen.jsx

Datos enviados:

name

email

password


Al registrarse → backend envía email de verificación.


---

🔵 HomeScreen.jsx

Carga tareas usando:

execute(() => taskService.getTasks());

Renderiza:

título

descripción

categoría

editar

eliminar



---

🔵 CreateTaskScreen.jsx

Formulario para crear una tarea.
Usa:

taskService.createTask(form)


---

🔵 EditTaskScreen.jsx

1. Carga la tarea por ID


2. Rellena formulario existente


3. Envía update con:



taskService.updateTask(id, form)


---

🔵 CategoriesScreen

Permite:

✔ Crear categorías
✔ Mostrar lista
✔ Eliminar categorías

Usa categoryService.


---

9️⃣ Servicios

Los servicios devuelven funciones para ser usadas dentro de useFetch.

Ejemplo:

export function getTasks() {
  return api.get("/tasks");
}

Uso:

execute(() => getTasks());

Esto mantiene el código desacoplado y limpio.


---

🔟 Buenas prácticas aplicadas

Código DRY

Separación lógica por capas

Middleware propio para rutas

Hooks reutilizables

Servicios desacoplados

Navegación clara

Validación global de autenticación

Componentes simples y modulares

