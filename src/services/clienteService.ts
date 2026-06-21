import { Cliente } from "../models/Cliente";
import { ClienteRepository } from "../repositories/clienteRepository";
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository";
import { NotaFiscal } from "../models/NotaFiscal";

export class ClienteService {
    private clienteRepository =  ClienteRepository.getInstance();
    private notaFiscalRepository = NotaFiscalRepository.getInstance();

    // listar clientes

    async listarCliente(): Promise<Cliente[]>{
        return await this.clienteRepository.listarCliente();
    }
    // listar cliente por id

    async buscarClienteId(id:number):  Promise<Cliente | null>{
        return await this.clienteRepository.buscarClientePorId(id);
    }

    // cadastrar cliente, com nome, cpf e telefone obrigatorios, e cpf nao duplicado.

    async cadastrarCliente(clienteData: any): Promise <Cliente> {
        const {nome, cpf, telefone, email, cidade} = clienteData;

        if (!nome || !cpf || !telefone) {
        throw new Error("Cliente precisa ter nome, cpf e telefone");
        }

        
       const cpfExistente = await this.clienteRepository.verficarClientePorCpf(cpf);

         if (cpfExistente) {
        throw new Error("Já existe um cliente com esse CPF");
    }

        const novoCliente = new Cliente (null, nome, cpf, telefone, email,cidade);
        
      return await this.clienteRepository.cadastrarCliente(novoCliente);

    }

    // atualizar dados do cliente.

    async atualizarCliente(id:number, clienteData: any): Promise<Cliente>{
        const clienteExistente = await this.clienteRepository.buscarClientePorId(id);

        if (!clienteExistente) {
            throw new Error("O cliente não foi encontrado");
        }

        const {nome, cpf, telefone, email, cidade} = clienteData;
        if (!nome || !cpf || !telefone) {
            throw new Error("Cliente precisa ter nome, cpf e telefone");
        }

        const cpfExistente = await this.clienteRepository.verficarClientePorCpf(cpf);

       if (cpfExistente && cpfExistente.id_cliente !== Number(id)){
            throw new Error("Já existe um cliente com esse CPF");
        }

        const clienteObjeto = new Cliente(id, nome, cpf, telefone, email, cidade);

        const clienteSalvo = await this.clienteRepository.atualizarDadosCliente(id, clienteObjeto);
        
        if (!clienteSalvo) {
            throw new Error("Erro ao atualizar os dados do cliente");
        }

        return clienteSalvo;
    }

    // remover cliente, somente se não tiver nota fiscal associada.
    async removerCliente(id: number): Promise<Cliente> {
        const clienteExistente = await this.clienteRepository.buscarClientePorId(id);

        if(!clienteExistente){
            throw new Error ("Cliente nao encontrado");
        }

        const notasCliente = await this.notaFiscalRepository.listaNotasPorCliente(id);

        if (notasCliente.length > 0) {
            throw new Error("Não é possível remover cliente com notas fiscais associadas");
        }
        const clienteRemovido = await this.clienteRepository.removeCliente(id);

        if (!clienteRemovido) {
            throw new Error("Erro ao remover o cliente");
        }

        return clienteRemovido;
    }

    // listar todas as notas fiscais de um cliente
    async listarNotasCliente(id: number): Promise<NotaFiscal[]> {
        return await this.notaFiscalRepository.listaNotasPorCliente(id);
    }
}