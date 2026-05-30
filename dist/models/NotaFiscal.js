"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotaFiscal = void 0;
class NotaFiscal {
    id_nota;
    numero_nota;
    data_emissao;
    valor_total;
    id_cliente;
    id_vendedor;
    id_carro;
    constructor(numero_nota, data_emissao, valor_total, cliente, vendedor, carro) {
        this.id_nota = this.geraId();
        this.numero_nota = numero_nota;
        this.data_emissao = data_emissao;
        this.valor_total = valor_total;
        this.id_cliente = cliente;
        this.id_vendedor = vendedor;
        this.id_carro = carro;
    }
    geraId() {
        return Date.now();
    }
}
exports.NotaFiscal = NotaFiscal;
