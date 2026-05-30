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
//Lista todos os estoques
function listarEstoque(req, res) {
    try {
        const estoques = estoqueService.listar();
        res.status(200).json(estoques);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}
//Busca estoque por id
function buscarEstoquePorId(req, res) {
    try {
        const id = Number(req.params.id);
        const estoque = estoqueService.buscarPorId(id);
        if (!estoque) {
            res.status(404).json({
                message: "Estoque não encontrado"
            });
            return;
        }
        res.status(200).json(estoque);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}
//Busca estoque pelo carro
function buscarPorCarro(req, res) {
    try {
        const id_carro = Number(req.params.id_carro);
        const estoque = estoqueService.buscarPorCarro(id_carro);
        if (!estoque) {
            res.status(404).json({
                message: "Estoque do carro não encontrado"
            });
            return;
        }
        res.status(200).json(estoque);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}
//Cadastra estoque
function cadastrarEstoque(req, res) {
    try {
        const estoque = estoqueService.cadastrarEstoque(req.body);
        res.status(201).json(estoque);
    }
    catch (error) {
        if (error.message.includes("Já existe estoque")) {
            res.status(409).json({
                message: error.message
            });
            return;
        }
        res.status(400).json({
            message: error.message
        });
    }
}
//Atualiza estoque
function atualizarEstoque(req, res) {
    try {
        const id = Number(req.params.id);
        const estoqueAtualizado = estoqueService.atualizarEstoque(id, req.body);
        res.status(200).json(estoqueAtualizado);
    }
    catch (error) {
        if (error.message.includes("não encontrado")) {
            res.status(404).json({
                message: error.message
            });
            return;
        }
        res.status(400).json({
            message: error.message
        });
    }
}
//Remove estoque
function removerEstoque(req, res) {
    try {
        const id = Number(req.params.id);
        const estoqueRemovido = estoqueService.removerEstoque(id);
        res.status(200).json(estoqueRemovido);
    }
    catch (error) {
        if (error.message.includes("não encontrado")) {
            res.status(404).json({
                message: error.message
            });
            return;
        }
        res.status(400).json({
            message: error.message
        });
    }
}
