import { Cliente } from "../models/Cliente";
import { ClienteRepository } from "../repositories/clienteRepository";
import { NotaFiscal } from "../models/NotaFiscal";
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository";

export class ClienteService {
    clienteRepository = ClienteRepository.getInstance();
    notaFiscalRepository = NotaFiscalRepository.getInstance();

    // listar clientes

    listarCliente(): Cliente[]{
        return this.clienteRepository.listarCliente();
    }
    // listar cliente por id

    buscarClienteId(id: any): Cliente | undefined {
        const idCliente : number = parseInt(id, 10);
        return this.clienteRepository.buscarClientePorId(idCliente);
    }

    // cadastrar cliente, com nome, cpf e telefone obrigatorios, e cpf nao duplicado.

    cadastrarCliente(clienteData: any): Cliente {
        const {nome, cpf, telefone, email, cidade} = clienteData;

        if (!nome || !cpf || !telefone) {
        throw new Error("Cliente precisa ter nome, cpf e telefone");
        }

        if (this.clienteRepository.verficarClientePorCpf(cpf)) {
        throw new Error("Já existe um cliente com esse CPF");
        }

        const novoCliente = new Cliente (nome, cpf, telefone, email,cidade);
        this.clienteRepository.cadastrarCliente(novoCliente);
        return novoCliente;

    }

    // atualizar dados do cliente.

    atualizarCliente(id: any, clienteData: any): Cliente {
        const idCliente : number = parseInt(id, 10);
        const clienteExistente = this.clienteRepository.buscarClientePorId(idCliente);

        if (!clienteExistente) {
            throw new Error("O cliente não foi encontrado");
        }

        const {nome, cpf, telefone, email, cidade} = clienteData;
        if (!nome || !cpf || !telefone) {
            throw new Error("Cliente precisa ter nome, cpf e telefone");
        }

        const clienteAtualizado = new Cliente (nome, cpf, telefone, email, cidade);
        clienteAtualizado.id_cliente = idCliente;
        this.clienteRepository.atualizarDadosCliente(idCliente, clienteAtualizado);

        return clienteAtualizado;

    }

    // remover cliente, somente se não tiver nota fiscal associada.
    removerCliente(id: any): Cliente | undefined {
        const idCliente : number = parseInt(id, 10);
        const notasCliente = this.notaFiscalRepository.listaNotasPorCliente(idCliente);

        if (notasCliente.length > 0) {
            throw new Error("Não é possível remover cliente com notas fiscais associadas");
        }
        return this.clienteRepository.removeCliente(idCliente);
    }

    // listar todas as notas fiscais de um cliente
    listarNotasCliente(id: any): NotaFiscal[] {
        const idCliente : number = parseInt(id, 10);
        return this.notaFiscalRepository.listaNotasPorCliente(idCliente);
    }
}