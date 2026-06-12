"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendedorRepository = void 0;
class VendedorRepository {
    static instance;
    vendedorLista = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new VendedorRepository();
        }
        return this.instance;
    }
    //lista todos os vendedores
    listaVendedores() {
        return this.vendedorLista;
    }
    //retorna vendedor por id
    filtraVendedorPorId(id) {
        return this.vendedorLista.find(vendedor => vendedor.id_vendedor === id);
    }
    //cadastra novo vendedor
    insereVendedor(vendedor) {
        this.vendedorLista.push(vendedor);
    }
    //atualiza vendedor
    atualizaVendedor(id, vendedor) {
        const indice = this.vendedorLista.findIndex(vendedor => vendedor.id_vendedor === id);
        this.vendedorLista[indice] = vendedor;
    }
    //remove um vendedor
    removeVendedor(id) {
        const indice = this.vendedorLista.findIndex(vendedor => vendedor.id_vendedor === id);
        this.vendedorLista.splice(indice, 1)[0];
    }
    //retorna vendedor por matricula
    filtraVendedorPorMatricula(matricula) {
        return this.vendedorLista.find(vendedor => vendedor.matricula === matricula);
    }
}
exports.VendedorRepository = VendedorRepository;
