class Recurso {
    #codigo;

    constructor(codigo, titulo) {
        this.#codigo = codigo;
        this.titulo = titulo;
        this.disponible = true;
    }

    get codigo() {
        return this.#codigo;
    }

    prestar() {
        if (this.disponible === false) {
            console.log("Error: el recurso " + this.titulo + " no está disponible para préstamo.");
            return false;
        }
        this.disponible = false;
        console.log("Prestado: " + this.titulo);
        return true;
    }

    devolver() {
        if (this.disponible === true) {
            console.log("Error: el recurso " + this.titulo + " no tiene préstamo, no se puede devolver.");
            return false;
        }
        this.disponible = true;
        console.log("Devuelto: " + this.titulo);
        return true;
    }

    calcularPlazo() {
        return 0;
    }
}

class LibroImpreso extends Recurso {
    calcularPlazo() {
        return 15;
    }
}

class RecursoDigital extends Recurso {
    calcularPlazo() {        return 7;
    }
}

let biblioteca = [];
let prestamos = [];

function agregarRecurso(recurso) {
    let duplicado = false;
    for (let i = 0; i < biblioteca.length; i++) {
        if (biblioteca[i].codigo === recurso.codigo) {
            duplicado = true;
        }
    }

    if (duplicado) {
        console.log("Error: código duplicado " + recurso.codigo);
    } else {
        biblioteca.push(recurso);
        console.log("Recurso agregado: " + recurso.titulo);
    }
}

function buscarRecurso(codigo) {
    let encontrado = null;
    for (let i = 0; i < biblioteca.length; i++) {
        if (biblioteca[i].codigo === codigo) {
            encontrado = biblioteca[i];
        }
    }

    if (encontrado === null) {
        console.log("Error: búsqueda sin resultados, código " + codigo + " no existe.");
        return null;
    }

    return encontrado;
}

function prestarRecurso(codigo) {
    let recurso = buscarRecurso(codigo);
    if (recurso === null) {
        return;
    }

    let prestado = recurso.prestar();
    if (prestado) {
        prestamos.push(recurso);
        console.log("Plazo: " + recurso.calcularPlazo() + " días");
    }
}

function devolverRecurso(codigo) {
    let recurso = buscarRecurso(codigo);
    if (recurso === null) {
        return;
    }

    let devuelto = recurso.devolver();
    if (devuelto) {
        for (let i = 0; i < prestamos.length; i++) {
            if (prestamos[i].codigo === codigo) {
                prestamos.splice(i, 1);
                break;
            }
        }
    }
}

let l1 = new LibroImpreso("LIB01", "Cien años de soledad");
let l2 = new RecursoDigital("DIG01", "Curso JavaScript");
let l3 = new LibroImpreso("LIB01", "Don Quijote");

agregarRecurso(l1);
agregarRecurso(l2);
agregarRecurso(l3);

prestarRecurso("LIB01"); 
prestarRecurso("LIB01"); 
prestarRecurso("COD99");

devolverRecurso("LIB01"); 
devolverRecurso("LIB01"); 