📘 DOCUMENTACIÓN_TÉCNICA.md — TP FINAL UTN (Frontend)

📘 Documentación Técnica del Frontend


---

1️⃣ Arquitectura General

La aplicación implementa una arquitectura basada en:

React + Vite

Servicios desacoplados

Estado global con Context API

Custom Hooks reutilizables

Middleware para rutas protegidas

Pantallas modulares



---

2️⃣ Flujo de Autenticación (diagrama)

[ LoginScreen ] -- envia email/pass --> [ authService.login ]
       ↓
[ Backend responde token JWT ]
       ↓
[ AuthContext.onLogin ]
       ↓
- Guarda token
- Decodifica usuario
- Cambia estado global
       ↓
Redirige a /home


---

3️⃣ Config – environment.js

Define la URL base del backend:

const ENVIRONMENT = {
  URL_API: import.meta.env.VITE_APP_API_URL
};

export default ENVIRONMENT;


---

4️⃣ AuthContext.jsx — Manejo de Autenticación Global

Funciones clave:

✔️ Cargar usuario desde token

✔️ Validar token al iniciar

✔️ Redirigir después de login/logout

✔️ Exponer estado global

Estados:

user

isLogged

checking (evita saltos de pantalla)

onLogin()

onLogout()



---

5️⃣ AuthMiddleware.jsx — Protección de rutas

return isLogged ? <Outlet /> : <Navigate to="/login" replace />;

Evita entrar a rutas privadas sin sesión.


---

6️⃣ Custom Hook: useFetch

Encapsula TODA petición al backend.

Funciones internas:

Estado	Uso

response	respuesta del backend
loading	Booleano de carga
error	mensajes de error


Método principal:

async function sendRequest(requestCallback)

Permite:

sendRequest(() => getTasks())


---

7️⃣ Custom Hook: useForm

Estandariza formularios:

Estado del formulario

Manejador de cambios

onSubmit reutilizable

Reset automático opcional


Ideal porque evita código repetido en Register/Login.


---

8️⃣ Screens


---

🔵 VerificationScreen.jsx

Valida token de email enviado al correo.

Llama a:

GET /api/auth/verify?token=

Si OK → redirect a login.


---

🔵 LoginScreen.jsx

Usa:

useFetch

useForm

AuthContext


Cuando backend responde token:

onLogin(response.data.auth_token);


---

🔵 RegisterScreen.jsx

Envía:

name

email

password


Luego backend envía correo de verificación.


---

🔵 HomeScreen.jsx

Carga tareas con:

sendRequest(() => getTasks());

Renderiza tarjetas:

task.title
task.description


---

🔵 CreateTaskScreen

Formulario simple → POST al backend.


---

🔵 EditTaskScreen

1. Trae datos con getTaskById


2. Rellena el formulario existente


3. Envía updateTask




---

🔵 CategoriesScreen

Permite:

Crear categorías

Listarlas

Eliminarlas



---

9️⃣ Servicios (services)

Cada servicio devuelve una función lista para usar en useFetch.

Ejemplo:

export function getTasks() {
  return api.get("/api/tasks");
}

Permite:

sendRequest(() => getTasks());


---

🔟 Buenas prácticas aplicadas

Código DRY

Separación lógica por capas

Middleware propio

Hooks reutilizables

Servicios desacoplados

Navegación clara



---

📌 Este documento es APTO PARA ENTREGA en UTN

Cumple:

✔ Arquitectura clara
✔ Documentación técnica formal
✔ Explicación de flujo de negocio
✔ Estructura del proyecto
✔ Justificación técnica
✔ Diagramas
✔ Descripción de funciones


