class Producto {
    #id;
    #precio;

    constructor(id, nombre, precio) {
        this.#id = id;
        this.nombre = nombre;
        this.#precio = precio;
    }

    get id() {
        return this.#id;
    }

    get precio() {
        return this.#precio;
    }

    calcularCostoFinal() {
        return this.#precio;
    }
}

class ProductoFisico extends Producto {
    calcularCostoFinal() {
        return this.precio + 5000;
    }
}

class ProductoDigital extends Producto {
    calcularCostoFinal() {
        return this.precio * 0.9;
    }
}

let productosTienda = [];
let carrito = [];

function agregarProductoTienda(producto) {
    if (producto.precio < 0) {
        console.log("Error: el precio no puede ser negativo. Producto: " + producto.nombre);
        return;
    }

    let existe = false;
    for (let i = 0; i < productosTienda.length; i++) {
        if (productosTienda[i].id === producto.id) {
            existe = true;
        }
    }

    if (existe) {
        console.log("Error: producto duplicado con id " + producto.id);
    } else {
        productosTienda.push(producto);
        console.log("Producto registrado en tienda: " + producto.nombre);
    }
}

function agregarAlCarrito(id, cantidad) {
    if (cantidad <= 0) {
        console.log("Error: la cantidad debe ser mayor que cero.");
        return;
    }

    let productoEncontrado = null;
    for (let i = 0; i < productosTienda.length; i++) {
        if (productosTienda[i].id === id) {
            productoEncontrado = productosTienda[i];
        }
    }
    if (productoEncontrado === null) {
        console.log("Error: producto inexistente en tienda.");
        return;
    }

    carrito.push({ producto: productoEncontrado, cantidad: cantidad });
    console.log("Agregado al carrito: " + productoEncontrado.nombre + " x" + cantidad);
}

function quitarDelCarrito(id) {
    let indice = -1;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].producto.id === id) {
            indice = i;
        }
    }

    if (indice === -1) {
        console.log("Error: no se puede eliminar, producto inexistente en carrito id " + id);
    } else {
        carrito.splice(indice, 1);
        console.log("Producto eliminado del carrito id " + id);
    }
}

function calcularTotal() {
    if (carrito.length === 0) {
        console.log("Carrito vacío, total $0");
        return 0;
    }

    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
        let item = carrito[i];
        total = total + (item.producto.calcularCostoFinal() * item.cantidad);
    }

    console.log("Total del carrito: $" + total);
    return total;
}

let p1 = new ProductoFisico("001", "Mouse", 50000);
let p2 = new ProductoDigital("002", "Juego", 100000);
let p3 = new ProductoFisico("003", "Teclado", -20000);

agregarProductoTienda(p1);
agregarProductoTienda(p2);
agregarProductoTienda(p1); 
agregarProductoTienda(p3); 

agregarAlCarrito("001", 2);
agregarAlCarrito("002", 1);
agregarAlCarrito("001", 0); 
agregarAlCarrito("999", 1);

calcularTotal();

quitarDelCarrito("001");
quitarDelCarrito("999");

calcularTotal();