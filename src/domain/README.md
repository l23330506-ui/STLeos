# domain/ (Modelo)
Clases del negocio con su estado y comportamiento: Carrito, Inventario, Venta, Ticket, Bitacora, Reporte. Cada una tiene un solo motivo de cambio (SOLID) y documenta precondiciones, poscondiciones e invariantes. No depende de Next.js, Prisma ni hardware.

`pagos/` contiene la interfaz `MetodoPago` y sus implementaciones (`PagoEfectivo`, `PagoTarjeta`, `PagoTransferencia`, patrón Strategy).
