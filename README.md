# My MobileApp

Aplicación móvil desarrollada con **Ionic** que demuestra las capacidades más importantes del framework para el desarrollo de aplicaciones móviles multiplataforma. Esta aplicación sirve como un ejemplo completo de integración de diversas funcionalidades móviles modernas.

## 🚀 Características Principales

### 🔔 Notificaciones Push
- Sistema completo de notificaciones push con Firebase Cloud Messaging
- Soporte para imágenes en notificaciones
- Configuración de prioridad personalizada para Android
- Panel de administración para envío de notificaciones

### 📸 Funcionalidades de Cámara
- Captura de fotos
- Procesamiento de imágenes en tiempo real
- Almacenamiento en la nube

### 🗺️ Integración con Mapas
- Visualización de mapas interactivos con Google Maps
- Geolocalización en tiempo real
- Marcadores personalizados
- Búsqueda de ubicaciones

### ☁️ Almacenamiento en la Nube
- Integración con Firebase Storage
- Gestión de archivos multimedia
- Sincronización automática
- Control de acceso basado en roles

### 🔐 Autenticación y Seguridad
- Sistema de autenticación con Firebase
- Múltiples proveedores de inicio de sesión:
  - Google
  - Email/Contraseña
  - Autenticación biométrica
- Control de roles y permisos
- Protección de rutas

## 🛠️ Instalación

### 1. Requisitos Previos
- Node.js (v14 o superior)
- npm o yarn
- Ionic CLI (`npm install -g @ionic/cli`)
- Android Studio (para desarrollo Android)
- Xcode (para desarrollo iOS, solo macOS)

### 2. Configuración del Proyecto

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/my-mobileapp.git

# Navegar al directorio del proyecto
cd my-mobileapp

# Instalar dependencias
npm install

# Iniciar la aplicación en modo desarrollo
ionic serve
```

### 3. Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id

# Google Maps
VITE_GOOGLE_MAPS_API_KEY=tu_google_maps_api_key

# Servidor de Notificaciones
VITE_SERVER_URL=tu_server_url

# API de Noticias
VITE_API_KEY_NEWS=tu_api_key_news
```

### 4. Configuración de Plataformas

#### Android
```bash
# Agregar plataforma Android
ionic capacitor add android

# Descargar google-services.json desde Firebase Console:
# 1. Ve a Firebase Console > Configuración del proyecto
# 2. En la sección "Tus aplicaciones", selecciona Android
# 3. Registra tu app con el nombre del paquete (com.tuapp.app)
# 4. Descarga el archivo google-services.json
# 5. Coloca el archivo en android/app/google-services.json

# Sincronizar cambios
ionic capacitor sync **android**

# Abrir en Android Studio
ionic capacitor open android
```

#### iOS
```bash
# Agregar plataforma iOS
ionic capacitor add ios

# Copiar GoogleService-Info.plist a ios/App/App/
# Descargar desde Firebase Console > Configuración del proyecto

# Sincronizar cambios
ionic capacitor sync ios

# Abrir en Xcode
ionic capacitor open ios
```

## 📱 Construcción y Despliegue

### Android
```bash
# Construir la aplicación
ionic build

# Sincronizar con Android
ionic capacitor sync android

# Construir APK
cd android
./gradlew assembleDebug
```

### Configuración del AndroidManifest.xml

El archivo `android/app/src/main/AndroidManifest.xml` debe contener las siguientes configuraciones importantes:

1. **Permisos necesarios**:
```xml
<!-- Permisos de ubicación -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />

<!-- Permisos de cámara y almacenamiento -->
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

<!-- Permiso de internet -->
<uses-permission android:name="android.permission.INTERNET" />
```

2. **Configuración de Google Maps**:
```xml
<meta-data 
    android:name="com.google.android.geo.API_KEY" 
    android:value="TU_API_KEY_DE_GOOGLE_MAPS" />
```

3. **Configuración de FileProvider** (necesario para compartir archivos):
```xml
<provider 
    android:authorities="${applicationId}.fileprovider"
    android:exported="false"
    android:grantUriPermissions="true"
    android:name="androidx.core.content.FileProvider">
    <meta-data 
        android:name="android.support.FILE_PROVIDER_PATHS"
        android:resource="@xml/file_paths" />
</provider>
```

### iOS
```bash
# Construir la aplicación
ionic build

# Sincronizar con iOS
ionic capacitor sync ios

# Abrir en Xcode para construir
ionic capacitor open ios
```

## 🔧 Configuración del Servidor de Notificaciones

El servidor de notificaciones está basado en Node.js y utiliza Firebase Admin SDK.

```bash
# Navegar al directorio del servidor
cd firebase-push-tester

# Instalar dependencias
npm install

# Configurar credenciales
# Copiar serviceAccountKey.json desde Firebase Console

# Iniciar el servidor
npm start
```

## 📚 Documentación Adicional

- [Documentación de Ionic](https://ionicframework.com/docs)
- [Documentación de Firebase](https://firebase.google.com/docs)
- [Documentación de Capacitor](https://capacitorjs.com/docs)

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, lee nuestras guías de contribución antes de enviar un pull request.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Créditos

Desarrollado como proyecto educativo para demostrar las capacidades de Ionic y Firebase en el desarrollo de aplicaciones móviles modernas.