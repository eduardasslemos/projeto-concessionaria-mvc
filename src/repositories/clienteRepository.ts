import { Cliente } from "../models/Cliente"; 
import { NotaFiscal } from "../models/NotaFiscal";
import { NotaFiscalRepository } from "./notaFiscalRepository";

export class ClienteRepository {
    private static instance : ClienteRepository;
    private cliente : Cliente [] = [];

    private notaFiscalRepository = NotaFiscalRepository.getInstance(); //perguntar duda


    // Singleton: garante que só existe UMA instância do repository
    static getInstance(): ClienteRepository {
        if (!ClienteRepository.instance) {
            ClienteRepository.instance = new ClienteRepository();
        }
        return ClienteRepository.instance;
    }

    //Listar clientes 

    listarCliente(): Cliente[]{
        return this.cliente;
    }

    //Buscar por id
    buscarClientePorId(id:number) : Cliente | undefined{
        return this.cliente.find(cliente=>cliente.id_cliente===id);
    }
    //Verfica duplicidade no cpf
    verficarClientePorCpf(cpf: string): Cliente | undefined {
        return this.cliente.find(cliente => cliente.cpf === cpf);
    }

    //Cadastrar cliente 

    cadastrarCliente(cliente : Cliente): void{
        this.cliente.push(cliente);
    }

    //Atualizar dados do cliente

    atualizarDadosCliente(id: number, cliente: Cliente){
        const indice = this.cliente.findIndex(cliente=>cliente.id_cliente ===id);
        this.cliente[indice] = cliente;
    }

    //Remove cliente

    removeCliente(id: number){
        const indice = this.cliente.findIndex(cliente=>cliente.id_cliente === id);
        if(indice === -1){
            return undefined
        }
        return this.cliente.splice(indice,1)[0];
    }

    //listar todas notas fiscais de um cliente
    listarNotasCliente(id: number): NotaFiscal[] {       
        return this.notaFiscalRepository.listaNotaFiscal().filter(nota => nota.id_cliente === id);
    }

}