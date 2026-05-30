export class NotaFiscal {
    id_nota: number
    numero_nota: string
    data_emissao: Date
    valor_total: number
    id_cliente: number
    id_vendedor: number
    id_carro: number

    constructor(numero_nota: string, data_emissao: Date, valor_total: number, cliente: number, vendedor: number, carro: number){
        this.id_nota = this.geraId();
        this.numero_nota = numero_nota
        this.data_emissao = data_emissao
        this.valor_total = valor_total
        this.id_cliente = cliente
        this.id_vendedor = vendedor
        this.id_carro = carro
    }

    private geraId(): number {
        return Date.now();
    }
}