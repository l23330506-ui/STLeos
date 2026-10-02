# services/
Casos de uso (RegistrarVenta, RegistrarEntrada, ActualizarPrecio, CorteDeCaja, EmitirFactura...). Orquestan dominio, repositorios y bitácora; las operaciones críticas van en una sola transacción. Dependen de abstracciones inyectadas por constructor.
