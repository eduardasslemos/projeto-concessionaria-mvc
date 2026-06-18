"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listaVendedores = listaVendedores;
exports.pesquisarVendedorPorId = pesquisarVendedorPorId;
exports.cadastrarVendedor = cadastrarVendedor;
exports.atualizaVendedor = atualizaVendedor;
exports.removeVendedor = removeVendedor;
exports.listaNotas = listaNotas;
const vendedorService_1 = require("../services/vendedorService");
const vendedorService = new vendedorService_1.VendedorService();
//lista todos os vendedores
async function listaVendedores(req, res) {
    try {
        const vendedores = await vendedorService.listaVendedores();
        res.status(200).json({
            mensagem: "Vendedores encontrados com sucesso!",
            vendedores: vendedores
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
;
//retorna vendedor por id
async function pesquisarVendedorPorId(req, res) {
    try {
        let id = Number(req.params.id);
        const vendedorPesquisado = await vendedorService.consultarVendedorId(id);
        if (!vendedorPesquisado) {
            res.status(404).json({
                mensagem: "Vendedor não encontrado"
            });
            return;
        }
        res.status(200).json({
            mensagem: "Vendedor encontrado com sucesso!",
            vendedor: vendedorPesquisado
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
;
//cadastra novo vendedor
async function cadastrarVendedor(req, res) {
    try {
        const novoVendedor = await vendedorService.cadastrarVendedor(req.body);
        res.status(201).json({
            mensagem: "Vendedor adicionado com sucesso!",
            vendedor: novoVendedor
        });
    }
    catch (error) {
        if (error.message == "Já existe um vendedor com essa matrícula") {
            return res.status(409).json({ message: error.message });
        }
        res.status(400).json({ message: error.message });
    }
}
;
//atualiza vendedor
async function atualizaVendedor(req, res) {
    try {
        let id = Number(req.params.id);
        const vendedor = await vendedorService.atualizaVendedor(id, req.body);
        res.status(200).json({
            mensagem: "Vendedor atualizado com sucesso!",
            vendedor: vendedor
        });
    }
    catch (error) {
        if (error.message == "Vendedor não encontrado") {
            return res.status(404).json({ message: error.message });
        }
        res.status(400).json({ message: error.message });
    }
}
;
//remove um vendedor
async function removeVendedor(req, res) {
    try {
        let id = Number(req.params.id);
        const vendedorPesquisado = await vendedorService.consultarVendedorId(id);
        if (!vendedorPesquisado) {
            res.status(404).json({
                mensagem: "Vendedor não encontrado"
            });
            return;
        }
        await vendedorService.removeVendedores(id);
        res.status(200).json({
            mensagem: "Vendedor removido com sucesso!",
        });
    }
    catch (error) {
        if (error.message == "O vendedor possui notas fiscais vinculadas a ele e não pode ser excluído") {
            return res.status(422).json({ message: error.message });
        }
        res.status(400).json({ message: error.message });
    }
}
;
//lista notas fiscais
async function listaNotas(req, res) {
    try {
        let id = Number(req.params.id);
        const vendedorPesquisado = await vendedorService.consultarVendedorId(id);
        if (!vendedorPesquisado) {
            res.status(404).json({
                mensagem: "Vendedor não encontrado"
            });
            return;
        }
        const notasFiscais = await vendedorService.listaNotasFiscais(id);
        res.status(200).json({
            mensagem: "Notas fiscais do vendedor encontradas com sucesso!",
            notasFiscais: notasFiscais
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
;
