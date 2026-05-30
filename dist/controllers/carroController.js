"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarCarros = listarCarros;
exports.listarDisponiveis = listarDisponiveis;
exports.buscarCarroPorId = buscarCarroPorId;
exports.cadastrarCarro = cadastrarCarro;
exports.atualizarCarro = atualizarCarro;
exports.removerCarro = removerCarro;
const carroService_1 = require("../services/carroService");
const carroService = new carroService_1.CarroService();
//Lista todos os carros
function listarCarros(req, res) {
    try {
        const carros = carroService.listar();
        res.status(200).json(carros);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}
//Lista carros disponíveis
function listarDisponiveis(req, res) {
    try {
        const carros = carroService.listarDisponiveis();
        if (!carros || carros.length === 0) {
            res.status(422).json({
                message: "Nenhum carro disponível em estoque."
            });
            return;
        }
        res.status(200).json(carros);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}
//Busca carro por id
function buscarCarroPorId(req, res) {
    try {
        const id = Number(req.params.id);
        const carro = carroService.buscarPorId(id);
        if (!carro) {
            res.status(404).json({
                message: "Carro não encontrado"
            });
            return;
        }
        res.status(200).json(carro);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}
//Cadastra carro
function cadastrarCarro(req, res) {
    try {
        const carro = carroService.CadastrarCarro(req.body);
        res.status(201).json(carro);
    }
    catch (error) {
        if (error.message === "Já existe um carro com essa placa") {
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
//Atualiza carro
function atualizarCarro(req, res) {
    try {
        const id = Number(req.params.id);
        const carroAtualizado = carroService.atualizarCarro(id, req.body);
        res.status(200).json(carroAtualizado);
    }
    catch (error) {
        if (error.message === "Carro não encontrado") {
            res.status(404).json({
                message: error.message
            });
            return;
        }
        if (error.message === "Já existe um carro com essa placa") {
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
//Remove carro
function removerCarro(req, res) {
    try {
        const id = Number(req.params.id);
        const carroRemovido = carroService.removerCarro(id);
        res.status(200).json(carroRemovido);
    }
    catch (error) {
        if (error.message === "Carro não encontrado") {
            res.status(404).json({
                message: error.message
            });
            return;
        }
        if (error.message.includes("estoque") || error.message.includes("nota fiscal")) {
            res.status(422).json({
                message: error.message
            });
            return;
        }
        res.status(400).json({
            message: error.message
        });
    }
}
