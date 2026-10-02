# STLEOS - Sistema Digital de Gestión Integral de Ventas e Inventario

Sistema web de punto de venta (POS) y gestión de inventarios para tienda física local, desarrollado para el **Instituto Tecnológico de Hermosillo**.

---

## 👥 Equipo de Desarrollo (Equipo 4)
* **Fernandez Sanchez Alexandra**
* **Gracia Mendoza Nicole Alejandra**
* **Manzano Salas Maximo Alejandro**
* **Mar Noriega Pedro**

**Materia:** Desarrollo de Software I  
**Docente:** Martha Patricia Sevilla Zazueta  

---

## 🚀 Descripción del Proyecto
Una tienda física con ventas diarias que depende de hojas de cálculo manuales sufre errores, pérdida de tiempo e inconsistencias en sus registros, además de no contar con control de stock, verificación de productos ni emisión automática de comprobantes.

STLEOS es una **aplicación web** que se sirve desde un servidor local de la tienda y se usa desde el navegador de las computadoras conectadas por LAN. Automatiza las operaciones clave: registro de ventas en tiempo real, control de inventario mediante escaneo de productos, emisión automática de tickets (y facturas cuando el cliente las solicite), corte de caja diario y reportes detallados. Incluye control de usuarios por rol y respaldo seguro de datos. Funciona sin internet y con los datos 100% locales; a futuro podrá exponer una consulta web de productos mediante su API REST.

### 🛠️ Características Principales
* **Punto de Venta:** Registro acelerado mediante lectura de código de barras/QR, carrito de compras con control de stock y cobro en efectivo (con cálculo de cambio), tarjeta y transferencia (folio SPEI).
* **Gestión de Inventarios:** Registro de productos nuevos con generación de código de barras único (con reimpresión), registro de mercancía entrante (nombre, cantidad, fecha, proveedor), existencias en tiempo real, búsqueda por nombre, código o categoría y alertas de stock bajo.
* **Comprobantes:** Ticket inmediato, impreso o digital, emitido 100% en local. La factura electrónica (CFDI) se emite solo si el cliente la solicita; si no hay internet queda como "Pendiente de timbrar" sin bloquear la venta.
* **Corte de Caja:** Arqueo físico, validación del Encargado, aprobación del Gerente, acta imprimible o en PDF y bloqueo de nuevas ventas del turno.
* **Control de Usuarios y Bitácora:** Roles jerárquicos, contraseñas cifradas y registro de auditoría de todas las acciones sensibles (la bitácora no se modifica ni se elimina).
* **Reportes:** Por día, semana, mes y año, y por categoría, talla y método de pago, con exportación a PDF y Excel.
* **Respaldo de datos:** Copias de seguridad de la base de datos local.

### 👤 Roles y Permisos
Jerarquía **Cajero ⊂ Encargado ⊂ Gerente**: cada rol hereda lo del anterior.

| Rol | Puede |
|---|---|
| **Cajero** | Escanear y consultar disponibilidad, registrar ventas y pagos, emitir tickets o facturas, generar reportes diarios. |
| **Encargado** | Lo del Cajero, registrar entradas de stock, consultar stock bajo, generar reportes operativos y validar el corte de caja. |
| **Gerente** | Lo del Encargado, registrar y eliminar (desactivar) productos, **actualizar precios** (con historial de fecha y responsable), autorizar ajustes de inventario y aprobar el corte de caja. |

### 📋 Casos de Uso
* **Venta y pago:** Escanear productos, Consultar disponibilidad, Registrar venta, Registrar pago (efectivo, tarjeta, transferencia), Emitir ticket, Emitir factura.
* **Inventario:** Registrar entradas, Detectar stock bajo, Registrar productos nuevos, Eliminar productos, Actualizar precio.
* **Caja:** Corte de caja diario.
* **Reportes:** Por día, semana, mes, año, talla y método de pago.

### 📏 Requisitos No Funcionales
* Una sola sucursal; se usa desde navegador en computadoras (no se diseña para móviles ni tablets) y sin internet.
* Hasta 3 usuarios simultáneos y hasta 5,000 productos.
* Ventas registradas en menos de 2 s y consultas en menos de 1 s.
* Disponibilidad del 99 %, arranque en menos de 10 s y registro de interrupciones mayores a 2 minutos.
* Contraseñas cifradas, validaciones estrictas y recuperación mediante transacciones.
* Interfaz y reportes en español, adaptados al contexto mexicano (IVA, RFC en facturación).
* Arquitectura modular (modelo 4+1 vistas): estaciones cliente conectadas por LAN a un servidor local con servicio de aplicación y base de datos 100% local.
* Periféricos: lector de código de barras (USB, funciona como teclado sobre un campo con foco), impresora de tickets y terminal de pago. *Pendiente de definir:* mecanismo de impresión de tickets desde el navegador y de integración con la terminal de pago.

### 🖥️ Vistas del Sistema
Inicio, Venta, Tickets, Devoluciones, Inventario (nuevo producto, actualizar stock, tiempo real), Pagos y Caja (métodos de pago, venta exitosa, corte de caja, historial de cortes), Reportes (ventas, inventario, resumen general), Gestión de Usuarios (inicio/cierre de sesión, bitácora de movimientos) y Configuraciones.

---

## 💻 Stack Tecnológico

| Elemento | Lo que adoptamos | ¿Por qué? |
|---|---|---|
| **Entorno de desarrollo** | VS Code; TypeScript en todo el proyecto; Next.js/React para la interfaz y capa de servicios en Node.js; PostgreSQL local; Docker solo para desarrollo y pruebas; Git/GitHub. | TypeScript permite compartir tipos y esquemas de validación entre interfaz y servicios. PostgreSQL es transaccional (ACID) y corre 100% local. Docker garantiza el mismo entorno para los cuatro integrantes. |
| **Diseño UI/UX** | Boceto a mano de cada pantalla y prototipo en Figma antes de programarla, partiendo de las vistas definidas (Dashboard, Ventas, Inventario, Pagos y Caja, Reportes, Usuarios, Configuración). | Flujo boceto → Figma que reduce retrabajo; Figma sirve para refinar y validar las vistas con el cliente. |
| **Diagramado y UML** | Las 5 vistas del modelo 4+1 (casos de uso, clases, secuencia, actividades, componentes y despliegue). Los diagramas nuevos se escriben en PlantUML/Mermaid dentro del repositorio; Lucidchart o draw.io como apoyo visual. | Tener los diagramas como texto versionado permite revisarlos en Pull Requests y mantenerlos sincronizados con el código. |
| **Canales de comunicación** | WhatsApp para avisos rápidos, Discord para reuniones y revisión conjunta de PRs, GitHub Issues/Projects para tareas y responsables, y Notion o Google Drive para documentación y actas. | Herramientas gratuitas que el equipo ya usa. |
| **Metodología e IA** | Scrum ligero: sprints de una semana, backlog en GitHub Issues donde cada caso de uso (Registrar venta, Pago en efectivo, Corte de caja, etc.) es una historia, y un Scrum Master rotativo. IA: Claude / Claude Code, ChatGPT y GitHub Copilot (plan estudiantil) para proponer casos de prueba, borradores de código y revisión, siempre validados por una persona. | Los casos de uso documentados son un backlog natural. La IA acelera, pero el equipo responde por la calidad. |
| **Estrategia TDD** | Ciclo rojo-verde-refactor con Vitest (unitarias e integración) y Playwright (extremo a extremo). | Las reglas críticas del negocio (totales, cambio, stock bajo, permisos) deben estar probadas antes de implementarse. |
| **Principios SOLID** | Checklist SOLID en cada Pull Request, inyección de dependencias, patrón Strategy para los métodos de pago, revisión por pares y archivo de reglas para la IA. | Debe poder agregarse un método de pago sin afectar otros módulos (principio abierto/cerrado). |
| **Contratos de API** | Diseño por contrato (precondiciones, poscondiciones, invariantes), DTOs en TypeScript, Zod para validación, OpenAPI 3 para documentar el servicio de aplicación, Postman para pruebas y restricciones CHECK en PostgreSQL. | Se deben validar datos (cantidad negativa, monto insuficiente, precio inválido). OpenAPI documenta el contrato y facilita la futura integración web. |

Docker se usa solo para desarrollo y pruebas (mismo entorno para los cuatro integrantes y base de datos de pruebas desechable); en producción el sistema corre en el servidor local. No se usan servicios en la nube ni self-hosting, porque el sistema debe ser 100% local.

### 🧪 Estrategia TDD
Cada historia de usuario sigue el ciclo **rojo → verde → refactor**: se toma el caso de uso y sus flujos alternativos, se escribe primero la prueba (debe fallar), se implementa lo mínimo para que pase, se refactoriza y se ejecutan todas las pruebas antes de abrir el Pull Request.

| Nivel | Herramienta | Qué se prueba |
|---|---|---|
| Unitarias | Vitest | Carrito (subtotal, IVA 16 % y total), pago en efectivo (cambio = monto recibido − total, rechazo de monto insuficiente), stock bajo (existencia ≤ stock mínimo), precio mayor a 0 y permisos por rol (solo el Gerente actualiza precios). |
| Integración | Vitest + PostgreSQL de pruebas en Docker | Registrar una venta descuenta stock, guarda el ticket y escribe la bitácora en una sola transacción; entrada de stock; reportes agrupados por día, talla y método de pago. |
| Extremo a extremo | Playwright | Escanear producto → carrito → pago en efectivo → ticket; corte de caja diario; el Cajero no puede actualizar precios; alerta de stock bajo en el dashboard. |
| No funcionales | Vitest (rendimiento) | Con 5,000 productos de prueba: venta en menos de 2 s y consulta de producto en menos de 1 s. |

### 🧩 Principios SOLID
* **S:** cada clase del dominio tiene un solo motivo de cambio (Carrito calcula totales, Inventario controla stock, Bitácora registra auditoría, Ticket representa el comprobante).
* **O / L:** interfaz `MetodoPago` con implementaciones `PagoEfectivo`, `PagoTarjeta` y `PagoTransferencia` (patrón Strategy), intercambiables y sin lanzar excepciones en casos normales del negocio.
* **I:** interfaces pequeñas (`LectorCodigoBarras`, `ImpresoraTickets`, `RepositorioProductos`, `RepositorioVentas`).
* **D:** la lógica de negocio depende de abstracciones inyectadas por constructor, lo que permite dobles de prueba y cambiar el hardware sin tocar el dominio.

### 📜 Contratos y Validación
La validación se hace en tres capas: (1) en la frontera con DTOs y esquemas **Zod**, (2) en el dominio con precondiciones, poscondiciones e invariantes y (3) en la base de datos con restricciones `CHECK`, `UNIQUE` y llaves foráneas de PostgreSQL. El servicio de aplicación se documenta con **OpenAPI 3**.

| Endpoint | DTO de entrada (Zod) | Respuestas |
|---|---|---|
| `POST /api/ventas` | `VentaDTO`: items (código, talla, cantidad), método de pago, monto recibido (si es efectivo) | 201 con `TicketDTO`; 400 datos inválidos; 409 stock insuficiente |
| `POST /api/inventario/entradas` | `EntradaStockDTO`: código, cantidad > 0, fecha, proveedor | 201 confirmación; 400 datos inválidos; 404 producto no existe |
| `PATCH /api/productos/{codigo}/precio` | `PrecioDTO`: precio > 0 | 200 actualizado; 400 inválido; 403 sin rol de Gerente |
| `GET /api/reportes/ventas` | `ReporteFiltroDTO`: período (día, semana, mes, año), fecha, agrupación (talla, método de pago) | 200 con `ReporteDTO`; 400 filtro inválido |

### 🤝 Reglas de Trabajo y Calidad
* La rama `main` está protegida: todo cambio entra por Pull Request desde una rama por historia (por ejemplo, `feature/registrar-venta`).
* Un Pull Request solo se aprueba si las pruebas pasan, cumple el checklist SOLID, los contratos (Zod y OpenAPI) están actualizados y, si cambió el diseño, también los diagramas.
* La aprobación la da al menos un integrante que no escribió el cambio.
* No se integra código generado por IA que el equipo no entienda y no pueda explicar: la IA propone, el equipo decide y responde.
* Antes de usar la IA para programar un módulo, el equipo define su alcance y casos de uso.

### 🗂️ Estructura del Proyecto
```
STLeos/
├─ docs/          diagramas 4+1, OpenAPI, diseño y actas
├─ prisma/        migraciones (con CHECK/UNIQUE) y datos de prueba
├─ src/
│  ├─ app/        Vista y rutas (Next.js): login, panel y /api
│  ├─ controllers/ Controlador (MVC)
│  ├─ domain/     Modelo: Carrito, Inventario, Venta, Ticket, Bitácora, pagos (Strategy)
│  ├─ services/   casos de uso
│  ├─ repositories/ acceso a datos
│  ├─ schemas/    DTOs y esquemas Zod
│  ├─ auth/       sesión, contraseñas y permisos por rol
│  ├─ infra/      lector, impresora, terminal de pago, CFDI y respaldo
│  ├─ components/ y lib/
└─ tests/         unit, integration, e2e y performance
```

---

## 🏗️ Requisitos e Instalación
* **Equipo:** Computadoras con acceso a la red local (LAN): estaciones cliente conectadas a un servidor local con servicio de aplicación y base de datos. No requiere internet para operar.
* **Periféricos:** Lector de código de barras USB, terminal de pago y/o impresora térmica de tickets (80mm).
* **Entorno de Desarrollo:** VS Code, Node.js (TypeScript), PostgreSQL local, Docker (solo desarrollo y pruebas) y Git/GitHub.
* **Pruebas:** Vitest (unitarias e integración) y Playwright (extremo a extremo); Postman para probar el servicio de aplicación.

```bash
# Clonar el repositorio
git clone https://github.com/l23330506-ui/STLeos.git
cd STLeos

# Variables de entorno (ajustar si es necesario)
cp .env.example .env

# Levantar PostgreSQL de desarrollo y pruebas (requiere Docker)
docker compose up -d

# Instalar dependencias y generar el cliente de Prisma
npm install
npx prisma generate

# Aplicar migraciones
npm run db:migrate

# Cargar usuarios de prueba (gerente, encargado, cajero; contraseña de desarrollo: stleos123)
npm run db:seed

# Ejecutar en modo desarrollo (http://localhost:3000)
npm run dev

# Pruebas
npm test
```
