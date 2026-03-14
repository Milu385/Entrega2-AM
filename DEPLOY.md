# Guía de Build y Publicación — Entrega2-AM

---

## Requisitos previos

- [Node.js](https://nodejs.org/) instalado
- [Android Studio](https://developer.android.com/studio) instalado (incluye JDK 21 y SDK de Android)
- Java 21 (viene incluido en Android Studio en `C:\Program Files\Android\Android Studio\jbr`)

---

## 1. Generar el archivo `.aab` para Google Play

### Paso a paso en terminal (PowerShell desde la raíz del proyecto)

```powershell
# 1. Instalar dependencias
npm install

# 2. Compilar el proyecto web
npm run build

# 3. Sincronizar los assets con el proyecto Android
npx cap sync android

# 4. Entrar a la carpeta Android
cd android

# 5. Usar el JDK 21 de Android Studio para compilar
$env:JAVA_HOME = 'C:\Program Files\Android\Android Studio\jbr'
$env:Path = "$env:JAVA_HOME\bin;$env:Path"

# 6. Generar el bundle release
.\gradlew.bat bundleRelease
```

### Resultado

El archivo `.aab` se genera en:

```
android/app/build/outputs/bundle/release/app-release.aab
```

Ese es el archivo que se sube directamente a **Google Play Console**.

---

## 2. Subir a Google Play Console

1. Entrá a [https://play.google.com/console](https://play.google.com/console).
2. Seleccioná tu app.
3. Ir a **Pruebas internas** (recomendado para pruebas) o **Producción**.
4. Crear versión → subir el archivo `app-release.aab`.
5. Completar notas de versión y hacer clic en **Enviar**.

> Si Play te indica error de `versionCode ya usado`, incrementar `versionCode` en `android/app/build.gradle` y repetir el paso 6.

---

## 3. Probar la app en Android Studio (emulador)

### Abrir el proyecto

1. Abrir **Android Studio**.
2. Clic en **Open**.
3. Seleccionar la carpeta: `c:\Users\santy\Downloads\Entrega2-AM\android`
4. Esperar a que termine el **Gradle Sync** (barra de progreso abajo).
   - Si pide seleccionar JDK: ir a **File → Project Structure → SDK Location → Gradle JDK** y elegir el JDK embebido de Android Studio (versión 21).

### Seleccionar el dispositivo

- En la barra superior, abrir el **dropdown de dispositivos**.
- Seleccionar `Medium_Phone_API_36.1` (emulador disponible).
- Si el emulador no está corriendo, Android Studio lo inicia automáticamente al presionar Run.

### Correr la app

- Presionar el botón **▶ Run** o usar el atajo `Shift + F10`.
- La app se compila, instala y abre sola en el emulador.

---

## 4. Flujo de desarrollo (iterar cambios)

Cada vez que se modifica código en el proyecto web (carpeta `src/`), repetir:

```powershell
# Desde la raíz del proyecto
npm run build
npx cap sync android
```

Luego en Android Studio presionar **▶ Run** nuevamente.

---

## Notas importantes

| Archivo | Descripción |
|---|---|
| `android/local.properties` | Apunta al SDK de Android. Generado automáticamente. |
| `android/app/build/outputs/bundle/release/app-release.aab` | Bundle para Google Play. |
| `android/app/build/outputs/apk/debug/app-debug.apk` | APK de prueba local (generado por Android Studio con Run). |
