"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotaFiscalRepository = void 0;
const estoqueRepository_1 = require("../repositories/estoqueRepository");
class NotaFiscalRepository {
    static instance;
    notasLista = [];
    estoqueRepo = estoqueRepository_1.EstoqueRepository.getInstance();
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
}
exports.NotaFiscalRepository = NotaFiscalRepository;
