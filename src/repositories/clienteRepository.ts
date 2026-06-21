import { Cliente } from "../models/Cliente"; 
import { executarComandoSQL } from "../database/mysql";

export class ClienteRepository {
    private static instance : ClienteRepository;

    private constructor(){}

    public static getInstance(): ClienteRepository {
        if (!this.instance){
            this.instance = new ClienteRepository();
        }
        return this.instance;
    }
    
    static getCreateTableQuery(): string {
       return `
        CREATE TABLE IF NOT EXISTS cliente (
            id_cliente INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            cpf VARCHAR(20) NOT NULL UNIQUE,
            telefone VARCHAR(20) NOT NULL,
            email VARCHAR(100),
            cidade VARCHAR(100)
        );
        `;
    }

    //Listar clientes 

    async listarCliente(): Promise<Cliente[]> {
        const linhas = await executarComandoSQL(
            "SELECT id_cliente, nome, cpf, telefone, email, cidade FROM cliente",
            []
        );

        const clientes : Cliente[]= linhas.map((linha: any)=>{
            return new Cliente(linha.id_cliente, linha.nome, linha.cpf, linha.telefone, linha.email, linha.cidade);
        });

        return clientes;
    }

    //Buscar por id
    async buscarClientePorId(id:number) :Promise <Cliente | null> {
           const linhas = await executarComandoSQL(
            "SELECT id_cliente, nome, cpf, telefone, email, cidade FROM cliente WHERE id_cliente = ?",[id]);
      
            if (linhas.length === 0) {
                return null;
    }

    const linha = linhas[0];

    return new Cliente(linha.id_cliente,linha.nome,linha.cpf,linha.telefone,linha.email,linha.cidade);
    }

      // VERIFICAR CPF
    async verficarClientePorCpf(cpf: string): Promise<Cliente | null> {
        const linhas = await executarComandoSQL(
            "SELECT id_cliente, nome, cpf, telefone, email, cidade FROM cliente WHERE cpf = ?",
            [cpf]
        );

        if (linhas.length === 0) return null;

        const linha = linhas[0];

        return new Cliente(linha.id_cliente,linha.nome,linha.cpf,linha.telefone,linha.email,linha.cidade);
    }

    //Cadastrar cliente 

    async cadastrarCliente(cliente : Cliente): Promise<Cliente> {
        const resultado = await executarComandoSQL(
            `INSERT INTO cliente (nome, cpf, telefone, email, cidade)
             VALUES (?, ?, ?, ?, ?)`,
            [
                cliente.nome,
                cliente.cpf,
                cliente.telefone,
                cliente.email,
                cliente.cidade
            ]
        );

        const idGerado = resultado.insertId;

        return new Cliente(idGerado, cliente.nome, cliente.cpf, cliente.telefone, cliente.email, cliente.cidade);
    }
    //Atualizar dados do cliente

    async atualizarDadosCliente(id: number, cliente: Cliente): Promise < Cliente| null>{
        const clienteExistente = await this.buscarClientePorId(id);

        if(!clienteExistente){
            return null;
        }
        await executarComandoSQL(
            `UPDATE cliente 
            SET nome = ?, cpf = ?, telefone = ?, email = ?, cidade = ?
            WHERE id_cliente = ?`,
            [
                cliente.nome,
                cliente.cpf,
                cliente.telefone,
                cliente.email,
                cliente.cidade,
                id
            ]
        );

        return new Cliente (id, cliente.nome,cliente.cpf,cliente.telefone,cliente.email,cliente.cidade);
    }


    //Remove cliente

    async removeCliente(id: number): Promise<Cliente | null>{
        const clienteExistente = await this.buscarClientePorId(id);

        if(!clienteExistente){
            return null;
        }
           await executarComandoSQL(
            "DELETE FROM cliente WHERE id_cliente = ?",
            [id]
        );

        return clienteExistente;
    }


}
