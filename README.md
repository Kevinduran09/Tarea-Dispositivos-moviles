# My Travels App

Aplicación móvil desarrollada con **Ionic** que permite el envío y recepción de notificaciones push, implementando un sistema de autenticación con **Firebase** y control de accesos mediante roles. Solo los usuarios con rol `admin` pueden acceder a la funcionalidad de envío de notificaciones.

## Características

- Envío y recepción de notificaciones push.
- Integración con Firebase Authentication, Firestore y Cloud Messaging.
- Control de roles: acceso restringido al envío de notificaciones para administradores.
- Soporte para imágenes en notificaciones.
- Configuración de prioridad en Android.

## Instalación

### 1. Clonar el repositorio y acceder a la carpeta del proyecto

```bash
cd my-travels-app
npm install --force
```

### 2. Agregar las variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables (reemplaza con los datos de tu proyecto Firebase):

```**env**
# Firebase Configuration
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
VITE_MEASUREMENT_ID=**tu_measurement_id**

# Variables adicionales requeridas
VITE_APP_NAME=My Travels App
VITE_APP_DESCRIPTION=Aplicación de viajes con notificaciones push
```

> **Nota**: El archivo `.env` está incluido en `.gitignore` por seguridad. Asegúrate de mantener una copia segura de tus variables de entorno.

### 3. Agregar archivo de configuración de Firebase

Desde [Firebase Console](https://console.firebase.google.com/), descarga el archivo `google-services.json` de tu proyecto y colócalo en la ruta:

```
android/app/google-services.json
```

### 4. Configurar Capacitor

Edita el archivo `capacitor.config.ts` y actualiza el `appId`:

```ts
appId: 'com.tuapp.id', // Reemplaza con tu identificador de aplicación
```

Edita también el `android/app/build.gradle` según sea necesario para que coincida con tu configuración.

---

## Servidor para envío de notificaciones

Para enviar las notificaciones, se utiliza un servidor basado en Node.js que se encarga de comunicarse con Firebase.

### Instalación del servidor

```bash
cd firebase-push-tester
npm install
```

### Credenciales

Crea un archivo llamado `serviceAccountKey.json` en la raíz del servidor con el contenido que puedes descargar desde Firebase Console > Configuración del proyecto > Cuentas de servicio.

El archivo se ve similar a:

```json
{
  "type": "service_account",
  "project_id": "tu_project_id",
  "private_key_id": "tu_private_key_id",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk@tu_project_id.iam.gserviceaccount.com",
  ...
}
```

### Ejecutar el servidor

```bash
node index.js
```

---

## Créditos

El código del servidor `firebase-push-tester` se basó en el repositorio original de [@alejofdezm](https://github.com/alejofdezm). Se realizaron modificaciones para permitir:

- Envío de imágenes en notificaciones.
- Configuración de prioridad personalizada en Android.

---

## Licencia

Este proyecto es de uso educativo y puede ser modificado libremente para pruebas y aprendizaje.