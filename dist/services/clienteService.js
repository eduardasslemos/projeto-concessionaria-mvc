"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteService = void 0;
const Cliente_1 = require("../models/Cliente");
const clienteRepository_1 = require("../repositories/clienteRepository");
class ClienteService {
    clienteRepository = clienteRepository_1.ClienteRepository.getInstance();
    // listar clientes
    listarCliente() {
        return this.clienteRepository.listarCliente();
    }
    // listar cliente por id
    buscarClienteId(id) {
        const idCliente = parseInt(id, 10);
        return this.clienteRepository.buscarClientePorId(idCliente);
    }
    // cadastrar cliente, com nome, cpf e telefone obrigatorios, e cpf nao duplicado.
    cadastrarCliente(clienteData) {
        const { nome, cpf, telefone, email, cidade } = clienteData;
        if (!nome || !cpf || !telefone) {
            throw new Error("Cliente precisa ter nome, cpf e telefone");
        }
        if (this.clienteRepository.verficarClientePorCpf(cpf)) {
            throw new Error("Já existe um cliente com esse CPF");
        }
        const novoCliente = new Cliente_1.Cliente(nome, cpf, telefone, email, cidade);
        this.clienteRepository.cadastrarCliente(novoCliente);
        return novoCliente;
    }
    // atualizar dados do cliente.
    atualizarCliente(id, clienteData) {
        const idCliente = parseInt(id, 10);
        const clienteExistente = this.clienteRepository.buscarClientePorId(idCliente);
        if (!clienteExistente) {
            throw new Error("O cliente não foi encontrado");
        }
        const { nome, cpf, telefone, email, cidade } = clienteData;
        if (!nome || !cpf || !telefone) {
            throw new Error("Cliente precisa ter nome, cpf e telefone");
        }
        const clienteAtualizado = new Cliente_1.Cliente(nome, cpf, telefone, email, cidade);
        clienteAtualizado.id_cliente = idCliente;
        this.clienteRepository.atualizarDadosCliente(idCliente, clienteAtualizado);
        return clienteAtualizado;
    }
    // remover cliente, somente se não tiver nota fiscal associada.
    removerCliente(id) {
        const idCliente = parseInt(id, 10);
        const notasCliente = this.clienteRepository.listarNotasCliente(idCliente);
        if (notasCliente.length > 0) {
            throw new Error("Não é possível remover cliente com notas fiscais associadas");
        }
        return this.clienteRepository.removeCliente(idCliente);
    }
    // listar todas as notas fiscais de um cliente
    listarNotasCliente(id) {
        const idCliente = parseInt(id, 10);
        return this.clienteRepository.listarNotasCliente(idCliente);
    }
}
exports.ClienteService = ClienteService;
