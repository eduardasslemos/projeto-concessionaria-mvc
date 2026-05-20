import { Cliente } from "./Cliente"
import { Vendedor } from "./Vendedor"
import { Carro } from "./Carro"

export class NotaFiscal {
    id_nota: number
    numero_nota: string
    data_emissao: Date
    valor_total: number
    id_cliente: number
    id_vendedor: number
    id_carro: number

    constructor(numero_nota: string, data_emissao: Date, valor_total: number, cliente: Cliente, vendedor: Vendedor, carro: Carro){
        this.id_nota = this.geraId();
        this.numero_nota = numero_nota
        this.data_emissao = data_emissao
        this.valor_total = valor_total
        this.id_cliente = cliente.id_cliente
        this.id_vendedor = vendedor.id_vendedor
        this.id_carro = carro.id_carro
    }

    private geraId(): number {
        return Date.now();
    }
}