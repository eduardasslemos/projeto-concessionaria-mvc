"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarEstoque = listarEstoque;
exports.buscarEstoquePorId = buscarEstoquePorId;
exports.buscarPorCarro = buscarPorCarro;
exports.cadastrarEstoque = cadastrarEstoque;
exports.atualizarEstoque = atualizarEstoque;
exports.removerEstoque = removerEstoque;
const estoqueService_1 = require("../services/estoqueService");
const estoqueService = new estoqueService_1.EstoqueService();
// Lista todos os estoques
async function listarEstoque(req, res) {
    try {
        const estoques = await estoqueService.listar();
        res.status(200).json(estoques);
    }
    catch (error) {
        res.status(500).json({
            message: "Erro interno ao listar estoques",
        });
    }
}
// Busca estoque por id
async function buscarEstoquePorId(req, res) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({
                message: "ID inválido",
            });
            return;
        }
        const estoque = await estoqueService.buscarPorId(id);
        if (!estoque) {
            res.status(404).json({
                message: "Estoque não encontrado",
            });
            return;
        }
        res.status(200).json(estoque);
    }
    catch (error) {
        res.status(500).json({
            message: "Erro interno ao buscar estoque",
        });
    }
}
// Busca estoque pelo carro
async function buscarPorCarro(req, res) {
    try {
        const id_carro = Number(req.params.id_carro);
        if (isNaN(id_carro)) {
            res.status(400).json({
                message: "ID do carro inválido",
            });
            return;
        }
        const estoque = await estoqueService.buscarPorCarro(id_carro);
        if (!estoque) {
            res.status(404).json({
                message: "Estoque do carro não encontrado",
            });
            return;
        }
        res.status(200).json(estoque);
    }
    catch (error) {
        res.status(500).json({
            message: "Erro interno ao buscar estoque do carro",
        });
    }
}
// Cadastra estoque
async function cadastrarEstoque(req, res) {
    try {
        const estoque = await estoqueService.cadastrarEstoque(req.body);
        res.status(201).json(estoque);
    }
    catch (error) {
        if (error.message.includes("Já existe estoque")) {
            res.status(409).json({
                message: error.message,
            });
            return;
        }
        if (error.message.includes("Carro não encontrado")) {
            res.status(404).json({
                message: error.message,
            });
            return;
        }
        res.status(400).json({
            message: error.message,
        });
    }
}
// Atualiza estoque
async function atualizarEstoque(req, res) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({
                message: "ID inválido",
            });
            return;
        }
        const estoqueAtualizado = await estoqueService.atualizarEstoque(id, req.body);
        res.status(200).json(estoqueAtualizado);
    }
    catch (error) {
        if (error.message.includes("não encontrado")) {
            res.status(404).json({
                message: error.message,
            });
            return;
        }
        res.status(400).json({
            message: error.message,
        });
    }
}
// Remove estoque
async function removerEstoque(req, res) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({
                message: "ID inválido",
            });
            return;
        }
        const estoqueRemovido = await estoqueService.removerEstoque(id);
        res.status(200).json(estoqueRemovido);
    }
    catch (error) {
        if (error.message.includes("não encontrado")) {
            res.status(404).json({
                message: error.message,
            });
            return;
        }
        res.status(400).json({
            message: error.message,
        });
    }
}
