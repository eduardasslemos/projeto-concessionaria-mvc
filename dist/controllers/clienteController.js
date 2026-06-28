"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarCliente = listarCliente;
exports.buscarClientePorId = buscarClientePorId;
exports.cadastrarCliente = cadastrarCliente;
exports.atualizarCliente = atualizarCliente;
exports.removerCliente = removerCliente;
exports.listarNotasCliente = listarNotasCliente;
const clienteService_1 = require("../services/clienteService");
const clienteService = new clienteService_1.ClienteService();
//listar clientes
async function listarCliente(req, res) {
    try {
        const clientes = await clienteService.listarCliente();
        res.status(200).json(clientes);
    }
    catch (error) {
        res.status(400).json({ mensagem: error.message });
    }
}
//buscar cliente por id
async function buscarClientePorId(req, res) {
    try {
        const id = Number(req.params.id);
        const clienteId = await clienteService.buscarClienteId(id);
        if (!clienteId) {
            res.status(404).json({ mensagem: "Cliente não encontrado" });
            return;
        }
        res.status(200).json(clienteId);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
//cadastrar cliente 
async function cadastrarCliente(req, res) {
    try {
        const novoCliente = await clienteService.cadastrarCliente(req.body);
        res.status(201).json(novoCliente);
    }
    catch (error) {
        if (error.message === "Já existe um cliente com esse CPF") {
            return res.status(409).json({ message: error.message });
        }
        res.status(400).json({ message: error.message });
    }
}
//atualizar cliente
async function atualizarCliente(req, res) {
    try {
        const id = Number(req.params.id);
        const clienteAtualizado = await clienteService.atualizarCliente(id, req.body);
        res.status(200).json(clienteAtualizado);
    }
    catch (error) {
        if (error.message === "O cliente não foi encontrado") {
            return res.status(404).json({ message: error.message });
        }
        res.status(400).json({ message: error.message });
    }
}
//remover cliente
async function removerCliente(req, res) {
    try {
        const id = Number(req.params.id);
        const clientePesquisado = await clienteService.buscarClienteId(id);
        if (!clientePesquisado) {
            res.status(404).json({
                mensagem: "Cliente não encontrado",
            });
            return;
        }
        const clienteRemovido = await clienteService.removerCliente(id);
        res.status(200).json(clienteRemovido);
    }
    catch (error) {
        if (error.message === "Não é possível remover cliente com notas fiscais associadas") {
            return res.status(422).json({ message: error.message });
        }
        res.status(400).json({ message: error.message });
    }
}
//listar notas fiscais de um cliente
async function listarNotasCliente(req, res) {
    try {
        const id = Number(req.params.id);
        const cliente = await clienteService.buscarClienteId(id);
        if (!cliente) {
            res.status(404).json({
                mensagem: "Cliente não encontrado"
            });
            return;
        }
        const notasFiscais = await clienteService.listarNotasCliente(id);
        res.status(200).json(notasFiscais);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
