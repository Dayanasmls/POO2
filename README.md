# POO2
# Sistema de Ejercicios POO en JavaScript

Repositorio con 5 ejercicios de Programación Orientada a Objetos usando clases, herencia, encapsulamiento con `#` y manejo de arreglos con validaciones.

## Objetivo del proyecto
Aplicar los principios de POO para crear sistemas funcionales que simulen casos reales: banco, tienda, nómina, biblioteca y turismo. Cada sistema evita errores comunes validando datos antes de usar `push` o `splice`.

## Tecnologías usadas
- JavaScript con Node.js
- Clases 
- Atributos privados con `#`
- Herencia con `extends` y `super`
- Validaciones con `if`, `for`, `setHours(0,0,0,0)`

## Estructura del proyecto
POO/
cuentaBancaria.js        -> Ejercicio 1
Compras.js               -> Ejercicio 2
empleadosNomima.js       -> Ejercicio 3
biblioteca.js            -> Ejercicio 4
reservasTuristicas.js    -> Ejercicio 5
README.md
Todos los archivos están en la carpeta raíz, no en subcarpetas, para ejecución directa.

## Como ejecutar
No se necesita instalar nada extra. Solo tener Node.js y Visual Studio Code.

1. Abrir la carpeta POO en VS Code.
2. Abrir el archivo que se quiere probar, por ejemplo `cuentaBancaria.js`.
3. Dar clic en el botón Run que aparece arriba a la derecha o clic derecho > Run Code.
4. Ver el resultado en la terminal de salida.

Repetir el mismo proceso para cada archivo.

## Descripción de ejercicios

### 1. Sistema de cuentas bancarias - cuentaBancaria.js
Clase padre `Cuenta` con atributos privados `#saldo` y `#codigo`. Clases hijas `CuentaAhorros` y `CuentaCorriente` con métodos sobrescritos para intereses y comisiones. Usa un arreglo `cuentas` para guardar todas.

*Validaciones:*
- Saldo negativo no permitido.
- Retiro mayor al saldo bloqueado.
- Códigos de cuenta duplicados no permitidos.
- Transferencias a cuenta inexistente.

### 2. Tienda y carrito de compras - Compras.js
Clase `Producto` con stock y clase `Carrito` que administra productos con un arreglo `productos`. Calcula total, IVA y aplica descuentos.

*Validaciones:*
- Cantidad 0 o negativa.
- Producto con stock 0.
- Producto duplicado en el carrito.
- Intento de pago con carrito vacío.

### 3. Gestión de empleados nómina - empleadosNomima.js
Clase padre `Empleado` con `#salario` privado. Clases hijas `TiempoCompleto` y `MedioTiempo` que calculan nómina diferente según horas y bonificaciones. Arreglo `empleados` para registro.

*Validaciones:*
- Salarios negativos.
- Horas negativas o mayores a lo permitido.
- Códigos de empleado duplicados.
- Empleado no encontrado al liquidar.

### 4. Biblioteca y préstamos - biblioteca.js
Clase padre `Recurso` con `#codigo` privado y clases hijas `LibroImpreso` y `RecursoDigital` con plazos de préstamo distintos. Maneja dos arreglos: `biblioteca` y `prestamos`.

*Validaciones:*
- Códigos duplicados en biblioteca.
- Prestar recurso que no existe.
- Prestar recurso que ya está prestado.
- Devolver un préstamo que no existe.
- Búsquedas sin resultados.

### 5. Sistema de reservas turísticas - reservasTuristicas.js
Clase padre `Reserva` con `#codigo` y `#precio` privados. Clases hijas `ReservaHotel` y `ReservaTour`. El costo cambia por noches o personas y la política de cancelación también. Arreglo `reservas` con límite de 20 personas.

*Validaciones:*
- Fechas pasadas. Se corrigió usando función `validarFecha()` con `setHours(0,0,0,0)` para comparar solo días y no la hora.
- Reservas con código duplicado.
- Cancelar reserva que no existe.
- Cupo agotado validado con `if reservas.length >= 20`.
- Precios inválidos o negativos.
- Uso de `splice` solo después de encontrar la posición con `for`.

## Manejo de errores
Todos los ejercicios usan `try catch` y `throw new Error()` para mostrar mensajes claros en consola. Antes de hacer `push` se verifica duplicado con `for` y antes de hacer `splice` se verifica que exista la posición.

## Autor
Proyecto académico de POO - 2026
