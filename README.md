# STLEOS - Sistema Digital de Gestión Integral de Ventas e Inventario

Sistema de punto de venta (POS) y gestión de inventarios para tienda física local, desarrollado para el **Instituto Tecnológico de Hermosillo**.

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
STLEOS es una solución de escritorio local diseñada para optimizar los procesos de venta, control de inventario en tiempo real con alertas de stock bajo, corte de caja diario y generación de reportes operativos, eliminando el uso de hojas de cálculo manuales.

### 🛠️ Características Principales
* **Punto de Venta:** Registro acelerado mediante lectura de código de barras/QR, carrito de compras y soporte de cobro en efectivo, tarjeta y transferencia.
* **Gestión de Inventarios:** Control de existencias en tiempo real, registro de mercancía entrante, generación/reimpresión de códigos de barras y alertas de stock bajo.
* **Corte de Caja e Impresión:** Emisión automática de tickets impresos o digitales y actas de corte de caja diario.
* **Control de Usuarios y Bitácora:** Roles jerárquicos (*Gerente*, *Encargado*, *Cajero*) con registro de auditoría en bitácora para todas las acciones sensibles.
* **Reportes:** Módulo de análisis por período (día, semana, mes, año), método de pago y ventas por talla.

---

## 💻 Stack Tecnológico
* **Lenguaje:** C# (.NET 8)
* **GUI / Presentación:** WPF (Windows Presentation Foundation) / Windows App SDK
* **Base de Datos:** SQLite / SQL Server Express (Persistencia 100% Local)
* **ORM:** Entity Framework Core
* **Generación de Reportes:** QuestPDF / EPPlus

---

## 🏗️ Requisitos e Instalación
* **Sistema Operativo:** Windows 10/11 (Exclusivo para computadoras).
* **Periféricos:** Lector de código de barras USB y/o Impresora térmica de tickets (80mm).
* **Entorno de Desarrollo:** Visual Studio 2022 / SDK .NET 8.0+.

```bash
# Clonar el repositorio
git clone [https://github.com/l23330506-ui/STLeos.git](https://github.com/l23330506-ui/STLeos.git)

# Abrir el proyecto en Visual Studio y restaurar paquetes
dotnet restore

# Ejecutar la solución
dotnet run
