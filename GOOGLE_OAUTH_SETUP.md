# Configuración de Google OAuth para Factorial HR

## Error 403 - Solución

Si estás recibiendo un error 403 al cargar el botón de Google Sign-In, sigue estos pasos:

### 1. Verificar Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona tu proyecto
3. Ve a **APIs & Services** > **Credentials**
4. Busca tu OAuth 2.0 Client ID

### 2. Configurar Dominios Autorizados

En la configuración de tu Client ID, asegúrate de tener estos **Authorized JavaScript origins**:

```
http://localhost:4200
https://localhost:4200
http://127.0.0.1:4200
https://127.0.0.1:4200
```

### 3. Verificar Configuración de OAuth

En **APIs & Services** > **OAuth consent screen**:

- **User Type**: External (para desarrollo)
- **App status**: Testing (para desarrollo)
- **Test users**: Agrega tu email de Google

### 4. Habilitar APIs Necesarias

Ve a **APIs & Services** > **Library** y habilita:

- Google+ API (si está disponible)
- Google Identity API
- Google Sign-In API

### 5. Verificar Client ID

El Client ID actual en el código es:

```
407408718192.apps.googleusercontent.com
```

Si este no es tu Client ID correcto, actualízalo en:
`src/app/auth/presentation/pages/login/login.component.ts`

### 6. Solución Temporal

Si necesitas una solución temporal mientras configuras Google OAuth:

1. Comenta el botón de Google en el HTML
2. Usa solo el formulario de login tradicional
3. Configura Google OAuth correctamente
4. Descomenta el botón

### 7. Verificar en Consola del Navegador

Abre las herramientas de desarrollador y verifica:

1. **Console**: Busca errores relacionados con Google
2. **Network**: Verifica que las peticiones a `accounts.google.com` no devuelvan 403
3. **Application** > **Cookies**: Verifica que no haya cookies bloqueadas

### 8. Alternativas de Desarrollo

Para desarrollo local, puedes usar:

1. **ngrok** para crear un túnel HTTPS:

   ```bash
   ngrok http 4200
   ```

   Luego agrega la URL de ngrok a los dominios autorizados.

2. **Configuración de desarrollo** con un Client ID específico para localhost.

## Troubleshooting

### Error: "This app isn't verified"

- Normal en modo Testing
- Puedes hacer clic en "Advanced" > "Go to [app name] (unsafe)"

### Error: "Access blocked"

- Verifica que tu email esté en la lista de Test users
- Verifica que el dominio esté en Authorized origins

### Error: "Invalid client"

- Verifica que el Client ID sea correcto
- Verifica que el proyecto esté activo en Google Cloud Console

## Contacto

Si sigues teniendo problemas, verifica:

1. La documentación oficial de [Google Identity Services](https://developers.google.com/identity/gsi/web)
2. Los logs de Google Cloud Console
3. La configuración de tu proyecto Angular
