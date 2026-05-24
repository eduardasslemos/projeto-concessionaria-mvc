export class Cliente {
    id_cliente: number;
    nome: string;
    cpf: string;
    telefone: string;
    email?: string; // nao obrigatorio 
    cidade?: string;// nao obrigatorio, verificar se é assim.

    constructor(nome: string, cpf: string, telefone: string, email?: string, cidade?: string){
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
        this.email = email;
        this.cidade = cidade;
        this.id_cliente = this.geraId();
    }

    private geraId(): number{
        return Date.now();
    }
}