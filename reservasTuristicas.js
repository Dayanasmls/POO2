class Reserva {
    #codigo;
    #precio;

    constructor(codigo, cliente, fecha, precio) {
        this.#codigo = codigo;
        this.cliente = cliente;
        this.fecha = fecha;
        this.#precio = precio;
    }

    get codigo() {
        return this.#codigo;
    }

    get precio() {
        return this.#precio;
    }

    calcularCosto() {
        return this.#precio;
    }

    condicionCancelacion() {
        return "No definida";
    }
}

class ReservaHotel extends Reserva {
    constructor(codigo, cliente, fecha, precio, noches) {
        super(codigo, cliente, fecha, precio);
        this.noches = noches;
    }

    calcularCosto() {
        return this.precio * this.noches;
    }

    condicionCancelacion() {
        return "Cancelación gratis hasta 2 días antes de " + this.fecha;
    }
}

class ReservaTour extends Reserva {
    constructor(codigo, cliente, fecha, precio, personas) {
        super(codigo, cliente, fecha, precio);
        this.personas = personas;
        this.cupoMaximo = 20;
    }

    calcularCosto() {
        return this.precio * this.personas;
    }

    condicionCancelacion() {
        return "No se puede cancelar el mismo día del tour " + this.fecha;
    }
}

let reservas = [];

function validarFecha(fecha) {
    let hoy = new Date();
    hoy.setHours(0,0,0,0);
    let fechaReserva = new Date(fecha);
    if (fechaReserva < hoy) {
        return false;
    }
    return true;
}

function agregarReserva(reserva) {
    if (reserva.precio <= 0) {
        console.log("Error: precio inválido para reserva " + reserva.codigo + ", debe ser mayor a 0");
        return;
    }

    if (validarFecha(reserva.fecha) === false) {
        console.log("Error: fecha pasada " + reserva.fecha + " para reserva " + reserva.codigo);
        return;
    }

    if (reserva.noches !== undefined && reserva.noches <= 0) {
        console.log("Error: cupo/noches inválido, debe ser mayor a 0");
        return;
    }

    if (reserva.personas !== undefined) {
        if (reserva.personas > reserva.cupoMaximo) {
            console.log("Error: cupos agotados, máximo " + reserva.cupoMaximo + " personas para " + reserva.codigo);
            return;
        }
        if (reserva.personas <= 0) {
            console.log("Error: cupo agotado o inválido");
            return;
        }
    }

    let duplicada = false;
    for (let i = 0; i < reservas.length; i++) {
        if (reservas[i].codigo === reserva.codigo) {
            duplicada = true;
        }
    }

    if (duplicada) {
        console.log("Error: reserva duplicada con código " + reserva.codigo);
    } else {
        reservas.push(reserva);
        console.log("Reserva agregada: " + reserva.codigo + " cliente " + reserva.cliente + " costo $" + reserva.calcularCosto());
    }
}

function cancelarReserva(codigo) {
    let indice = -1;
    for (let i = 0; i < reservas.length; i++) {
        if (reservas[i].codigo === codigo) {
            indice = i;
        }
    }

    if (indice === -1) {
        console.log("Error: cancelación inexistente, reserva " + codigo + " no existe");
        return;
    }

    let reserva = reservas[indice];
    console.log(reserva.condicionCancelacion());
    reservas.splice(indice, 1);
    console.log("Reserva cancelada: " + codigo);
}

function consultarDisponibles() {
    console.log("--- RESERVAS ACTUALES ---");
    for (let i = 0; i < reservas.length; i++) {
        let r = reservas[i];
        console.log(r.codigo + " | " + r.cliente + " | " + r.fecha + " | $" + r.calcularCosto());
    }
}

let r1 = new ReservaHotel("H001", "Juan", "2026-12-10", 80000, 3);
let r2 = new ReservaTour("T001", "Maria", "2026-11-20", 50000, 2);
let r3 = new ReservaHotel("H001", "Pedro", "2026-12-12", 90000, 2); 
let r4 = new ReservaTour("T002", "Ana", "2025-01-01", 50000, 2); 
let r5 = new ReservaTour("T003", "Luis", "2026-11-25", -10000, 2); 
let r6 = new ReservaTour("T004", "Sofia", "2026-11-30", 50000, 25); 

agregarReserva(r1);
agregarReserva(r2);
agregarReserva(r3);
agregarReserva(r4);
agregarReserva(r5);
agregarReserva(r6);

consultarDisponibles();

cancelarReserva("H001");
cancelarReserva("H999");