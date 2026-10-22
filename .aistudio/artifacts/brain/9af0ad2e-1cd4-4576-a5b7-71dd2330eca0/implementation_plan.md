# Sincronización Automática y Desatendida con Google Sheets y Google Drive

Arquitectura para la sincronización continua, en tiempo real y desatendida de los datos de aprendices hacia una hoja de cálculo en Google Drive, eliminando aperturas manuales de modales y configuraciones recurrentes.

> [!IMPORTANT]
> ### Decisiones Confirmadas en la Fase de Consulta
> - **Momento de sincronización:** Guardado automático en cada hito clave del aprendiz (registro inicial del perfil, finalización de cada módulo y aprobación de la evaluación con emisión del certificado).
> - **Operación de conexión:** Sesión persistente y sincronización en segundo plano (*background worker*) sin interrumpir al aprendiz con ventanas modales ni pasos redundantes.
> - **Confirmación visual:** Indicador discreto y refinado en el encabezado superior con estado en vivo (*"Conectado a Drive"*, *"Sincronizando..."*, *"Al día"*) y enlace directo a la hoja de cálculo de Google.

---

## 1. Visión General y Concepto Central

- **Qué hace:** Automatiza por completo la persistencia institucional de datos de inducción hacia Google Sheets en Google Drive. Cuando el aprendiz diligencia su perfil, avanza en los módulos formativos o aprueba su evaluación final, el sistema detecta el hito y envía silenciosamente la actualización a la hoja de cálculo oficial sin requerir que el instructor o el aprendiz abran configuraciones manuales.
- **Público objetivo:** Instructores y coordinadores del SENA que supervisan cohortes de aprendices en tiempo real sin fricción técnica, y aprendices que realizan su inducción de forma fluida.
- **Valor clave:** Cero intervención manual recurrente. La hoja se autovincula o autogenera una sola vez y permanece sincronizada durante toda la sesión y sesiones posteriores.

---

## 2. Experiencia de Usuario y Diseño Visual

### Flujos Clave del Usuario
1. **Flujo de Conexión Inicial Invisible o Única:**
   - Si el usuario ya autorizó Google Workspace en su sesión, el sistema detecta el token en memoria o lo renueva automáticamente al cargar la aplicación.
   - Si se requiere una primera autorización, un discreto botón en la barra superior permite autenticar una sola vez con un clic. A partir de ese momento, la sincronización es 100% autónoma.
2. **Flujo de Registro de Aprendiz:**
   - Al guardar los datos en el modal de perfil (nombre, documento, ficha, programa), el sistema dispara la sincronización en segundo plano.
   - El indicador superior transiciona de forma suave: `En la nube ● Al día` -> `Sincronizando... ⟳` -> `Guardado ✓`.
3. **Flujo de Avance en Módulos:**
   - Al marcar un módulo como completado o realizar una actividad del simulador de casos, el registro del aprendiz en la fila de Google Sheets actualiza el número de módulos aprobados y los puntos XP acumulados.
4. **Flujo de Certificación Final:**
   - Al superar el cuestionario con $\ge 70\%$ y generar el código de verificación del certificado, la hoja de cálculo añade el código criptográfico, la fecha exacta y el estado `APROBADO - CERTIFICADO EMITIDO`.

### Diseño e Identidad Visual
- **Ubicación del Indicador:** Integrado en la barra superior (`Navbar`), respetando el *Top Bar Contract* (Wordmark SENA a la izquierda, enlaces al centro, e indicador con enlace a Drive a la derecha).
- **Tratamiento Visual:**
  - Sin píldoras saturadas ni parpadeos invasivos. 
  - Tipografía limpia con separadores sutiles, microindicador de estado en verde institucional `#39A900` para estado conectado, y enlace directo a Google Sheets con ícono discreto `ExternalLink`.
  - Tooltip informativo al pasar el cursor mostrando la última hora de sincronización y el correo institucional conectado.
- **Prevención de Errores y Reconexión:**
  - Manejo silencioso de reconexión si el token expira, solicitando reautenticación solo si es estrictamente indispensable mediante un aviso discreto sin bloquear la navegación del usuario.

---

## 3. Decisiones de Producto y Compensaciones Técnicas

- **Decisión 1: Sincronización Automática por Eventos (Event-Driven Background Sync)**
  - *Enfoque Elegido:* Despachar un guardado asíncrono con *debounce* (espera de 1.5 segundos) cada vez que el estado del aprendiz cambia significativamente (registro de perfil, módulo completado, evaluación culminada).
  - *Por qué:* Evita saturar la cuota de la API de Google Sheets y garantiza que la información siempre esté fresca en Google Drive sin requerir clics del usuario.
  - *Alternativas Descartadas:* Guardado por intervalos de tiempo fijos (polling continuo de 30 segundos) que gastaría cuota innecesariamente incluso si el usuario no interactúa.

- **Decisión 2: Autodetección y Caché Persistente del ID de la Hoja**
  - *Enfoque Elegido:* Almacenar localmente el ID de la hoja de cálculo encontrada o creada (`sena_google_sheet_id`). Si existe, se reutiliza directamente; si no existe, se busca en Google Drive por nombre exacto (`SENA Inducción - Registro de Aprendices`) o se genera automáticamente en la primera sincronización.
  - *Por qué:* Elimina por completo la necesidad de que el usuario seleccione o ingrese IDs de hoja cada vez que abre el prototipo.

- **Decisión 3: Modo "Sin Bloqueo" (Optimistic Non-Blocking Sync)**
  - *Enfoque Elegido:* Si ocurre un problema temporal de red o el usuario navega entre pantallas mientras se sincroniza, la interfaz de inducción nunca se congela; la tarea se procesa en segundo plano y una cola interna reintenta la escritura en caso de fallo transitorio.

---

## 4. Arquitectura Técnica y Estrategia de Datos

### Diagrama de Arquitectura y Flujo de Componentes

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ESTADO GLOBAL REACT                             │
│                                                                        │
│   ApprenticeProfile (Perfil)        InductionProgress (Progreso & XP)  │
│   [Nombre, Doc, Ficha, Regional]    [Módulos, Quiz, Certificado]       │
└───────────────────────┬───────────────────────┬────────────────────────┘
                        │                       │
                        ▼                       ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     HOOK / SERVICE: useAutoDriveSync                   │
│                                                                        │
│  - Observa cambios en Profile & Progress                               │
│  - Filtra hitos clave (Perfil guardado / Módulo terminado / Certificado)│
│  - Aplica Debounce (1.5s) y Cola de tareas asíncronas                  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   SERVICIO GOOGLE SHEETS / DRIVE                       │
│                                                                        │
│  1. getAccessToken() (en memoria con Firebase Auth)                    │
│  2. findExistingSpreadsheet() -> Obtiene o crea la hoja                │
│  3. saveOrUpdateApprenticeToSheet() -> Escribe en filas "Aprendices"   │
│     y "Bitácora de Evaluaciones"                                       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                        ┌───────────┴───────────┐
                        ▼                       ▼
            ┌───────────────────────┐   ┌───────────────────────┐
            │   Google Drive API    │   │   Google Sheets API   │
            │   (drive.file)        │   │   (spreadsheets)      │
            └───────────────────────┘   └───────────────────────┘
                        │                       │
                        ▼                       ▼
            ┌───────────────────────────────────────────────────┐
            │ Hoja de Cálculo: "SENA Inducción - Aprendices"   │
            │ - Hoja 1: Registro consolidado de Aprendices      │
            │ - Hoja 2: Bitácora detallada de Evaluaciones      │
            └───────────────────────────────────────────────────┘
```

### Componentes y Módulos a Implementar
1. **`src/services/autoSyncService.ts`**:
   - Gestor centralizado de eventos de sincronización con cola de reintentos (*retry queue*).
   - Métodos `triggerAutoSync(profile, progress, milestone)` para invocar la persistencia de forma desatendida.
   - Estado reactivo para informar el estado (`idle`, `syncing`, `success`, `error`) al resto de la aplicación.
2. **`src/components/AutoSyncIndicator.tsx`**:
   - Componente visual para la barra superior (`Navbar`):
     - Muestra el enlace directo a la hoja con el texto *"Hoja de Google Drive"* y el estado de la última sincronización.
     - Permite abrir la hoja directamente en una pestaña nueva con un solo clic.
3. **Integración con Hitos en `App.tsx`**:
   - Escuchar `handleSaveProfile`: disparar autosync.
   - Escuchar `handleCompleteModule`: disparar autosync.
   - Escuchar `handleQuizComplete`: disparar autosync con puntaje y código de certificado.
