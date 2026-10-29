class Empleado {
    #identificacion;
    #remuneracion;

    constructor(identificacion, nombre, remuneracion) {
        this.#identificacion = identificacion;
        this.nombre = nombre;
        this.#remuneracion = remuneracion;
    }

    get identificacion() {
        return this.#identificacion;
    }

    get remuneracion() {
        return this.#remuneracion;
    }

    calcularPago() {
        return this.#remuneracion;
    }
}

class EmpleadoPlanta extends Empleado {
    calcularPago() {
        // Planta: salario base menos 8% salud y pensión
        return this.remuneracion * 0.92;
    }
}

class Contratista extends Empleado {
    constructor(identificacion, nombre, tarifaHora, horas) {
        super(identificacion, nombre, tarifaHora);
        this.horas = horas;
    }

    calcularPago() {
        // Contratista: tarifa por hora * horas trabajadas
        return this.remuneracion * this.horas;
    }
}

let empleados = [];

function agregarEmpleado(empleado) {
    if (empleado.nombre === "" || empleado.nombre === null) {
        console.log("Error: faltan datos, el nombre está vacío.");
        return;
    }

    if (empleado.identificacion === "" || empleado.identificacion === null) {
        console.log("Error: faltan datos, la identificación está vacía.");
        return;
    }

    if (empleado.remuneracion < 0) {
        console.log("Error: salario o tarifa no puede ser negativo. Empleado: " + empleado.nombre);
        return;
    }

    if (empleado.horas !== undefined && empleado.horas < 0) {
        console.log("Error: las horas no pueden ser negativas. Empleado: " + empleado.nombre);
        return;
    }

    let duplicado = false;
    for (let i = 0; i < empleados.length; i++) {
        if (empleados[i].identificacion === empleado.identificacion) {
            duplicado = true;
        }
    }

    if (duplicado) {
        console.log("Error: identificación duplicada " + empleado.identificacion);
    } else {
        empleados.push(empleado);
        console.log("Empleado registrado: " + empleado.nombre);
    }
}

function generarNomina() {
    if (empleados.length === 0) {
        console.log("No hay empleados para generar nómina.");
        return;
    }

    console.log("--- LISTADO DE NÓMINA ---");
    for (let i = 0; i < empleados.length; i++) {
        let emp = empleados[i];
        let pago = emp.calcularPago();
        console.log("ID: " + emp.identificacion + " | Nombre: " + emp.nombre + " | Pago: $" + pago);
    }
}

let e1 = new EmpleadoPlanta("101", "Carlos", 2000000);
let e2 = new Contratista("102", "Ana", 50000, 80); 
let e3 = new EmpleadoPlanta("101", "Luis", 1800000); 
let e4 = new Contratista("103", "Sofia", -30000, 40); 
let e5 = new EmpleadoPlanta("104", "", 1500000); 
agregarEmpleado(e1);
agregarEmpleado(e2);
agregarEmpleado(e3);
agregarEmpleado(e4);
agregarEmpleado(e5);

generarNomina();