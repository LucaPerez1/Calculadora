class Calculadora {
    sumar(numero1, numero2){
        return numero1 + numero2;
    }

    restar(numero1, numero2){
        return numero1 - numero2;
    }

    multiplicar(numero1, numero2){
        return numero1 * numero2;
    }

    dividir(numero1, numero2){
        return numero1 / numero2;
    }
}

class Display {
    constructor(displayValorAnterior, displayValorActual) {
        this.displayValorAnterior = displayValorAnterior
        this.displayValorActual = displayValorActual 
        this.calculador = new Calculadora(); 
        this.tipoOperacion = undefined;
        this.valorActual = '';
        this.valorAnterior = '';
        this.signos = {
            sumar: '+',
            restar: '-',
            dividir: '/',
            multiplicar: 'x',
        }
    }

    botonBorrar() {
        this.valorActual = this.valorActual.toString().slice(0,-1)
        this.imprimirValores()
    }

    botonBorrarTodo(){
        this.valorActual = ''
        this.valorAnterior = ''
        this.tipoOperacion = undefined;
        this.imprimirValores();
    }

    computo(tipo){
        this.tipoOperacion !== 'igual' && this.calcular();
        this.tipoOperacion = tipo; 
        this.valorAnterior = this.valorActual || this.valorAnterior;
        this.valorActual = ''
        this.imprimirValores();
    }

    agregarNumero(numero) {
        if(numero === '.' && this.valorActual.includes('.')) return
        this.valorActual += numero.toString();
        this.imprimirValores();
    } 

    imprimirValores() {
        this.displayValorActual.textContent = this.valorActual
        this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ''}`
    }

    calcular() {
        const valorAnterior = parseFloat(this.valorAnterior);
        const valorActual = parseFloat(this.valorActual);
    
        if (isNaN(valorActual) || isNaN(valorAnterior)) return;
    
        let resultado = this.calculador[this.tipoOperacion](valorAnterior, valorActual);

        if (this.tipoOperacion === 'dividir' && valorActual === 0) {
            this.valorActual = "Error";
            return;
        }

        if (resultado === 0) {
            this.valorActual = '0';
        } else {
            this.valorActual = resultado;
        }
    }
    
}