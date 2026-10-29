class Cuenta {
    #numero;
    #saldo;

    constructor(numero, titular, saldo) {
        this.#numero = numero;
        this.titular = titular;
        this.#saldo = saldo;
    }

    get numero() {
        return this.#numero;
    }

    get saldo() {
        return this.#saldo;
    }

    consignar(valor) {
        if (valor <= 0) {
            console.log("Error: la consignación debe ser mayor que cero.");
        } else {
            this.#saldo = this.#saldo + valor;
            console.log("Consignación realizada.");
        }
    }

    retirar(valor) {
        if (valor <= 0) {
            console.log("Error: el retiro debe ser mayor que cero.");
        } else if (valor > this.#saldo) {
            console.log("Error: saldo insuficiente.");
        } else {
            this.#saldo = this.#saldo - valor;
            console.log("Retiro realizado.");
        }
    }

    consultarSaldo() {
        console.log("Titular: " + this.titular);
        console.log("Número: " + this.#numero);
        console.log("Saldo: $" + this.#saldo);
    }
}

class CuentaAhorros extends Cuenta {
    retirar(valor) {
        if (valor > 1000000) {
            console.log("Error: máximo $1.000.000 por retiro en cuenta de ahorros.");
        } else {
            super.retirar(valor);
        }
    }
}

class CuentaCorriente extends Cuenta {
    retirar(valor) {
        if (valor > 2000000) {
            console.log("Error: máximo $2.000.000 por retiro en cuenta corriente.");
        } else {
            super.retirar(valor);
        }
    }
}

let cuentas = [];

function agregarCuenta(cuenta) {
    let existe = false;

    for (let i = 0; i < cuentas.length; i++) {
        if (cuentas[i].numero === cuenta.numero) {
            existe = true;
        }
    }

    if (existe) {
        console.log("Error: la cuenta ya existe.");
    } else {
        cuentas.push(cuenta);
        console.log("Cuenta registrada.");
    }
}

function buscarCuenta(numero) {
    for (let i = 0; i < cuentas.length; i++) {
        if (cuentas[i].numero === numero) {
            return cuentas[i];
        }
    }

    console.log("Error: cuenta inexistente.");
    return null;
}

let cuenta1 = new CuentaAhorros("001", "Ana", 1500000);
let cuenta2 = new CuentaCorriente("002", "Carlos", 3000000);

agregarCuenta(cuenta1);
agregarCuenta(cuenta2);
agregarCuenta(cuenta1);

cuenta1.consignar(200000);
cuenta1.consignar(0);
cuenta1.retirar(100000);
cuenta1.retirar(2000000);

cuenta2.retirar(500000);

let encontrada = buscarCuenta("001");

if (encontrada !== null) {
    encontrada.consultarSaldo();
}

buscarCuenta("999");