"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotaFiscalRepository = void 0;
class NotaFiscalRepository {
    static instance;
    notasLista = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new NotaFiscalRepository();
        }
        return this.instance;
    }
    //listar todas as notas fiscais
    listaNotaFiscal() {
        return this.notasLista;
    }
    //retorna nota fiscal por id
    filtraNotaPorId(id) {
        return this.notasLista.find(nota => nota.id_nota === id);
    }
    //cadastra nova nota fiscal 
    insereNotaFiscal(notaFiscal) {
        this.notasLista.push(notaFiscal);
    }
    //retorna nota fiscal por numero
    filtraNotaPorNumero(numero_nota) {
        return this.notasLista.find(nota => nota.numero_nota === numero_nota);
    }
    //lista notas fiscais por vendedor
    listaNotasPorVendedor(idVendedor) {
        return this.notasLista.filter(nota => nota.id_vendedor === idVendedor);
    }
    //lista notas fiscais por cliente
    listaNotasPorCliente(idCliente) {
        return this.notasLista.filter(nota => nota.id_cliente === idCliente);
    }
    //lista notas fiscais por carro
    listaNotasPorCarro(idCarro) {
        return this.notasLista.filter(nota => nota.id_carro === idCarro);
    }
}
exports.NotaFiscalRepository = NotaFiscalRepository;
