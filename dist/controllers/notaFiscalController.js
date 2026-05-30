"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listaNotasFiscais = listaNotasFiscais;
exports.pesquisarNotaPorId = pesquisarNotaPorId;
exports.cadastrarNotaFiscal = cadastrarNotaFiscal;
const notaFiscalService_1 = require("../services/notaFiscalService");
const notaFiscalService = new notaFiscalService_1.NotaFiscalService();
//listar todas as notas fiscais
function listaNotasFiscais(req, res) {
    try {
        const notasFiscais = notaFiscalService.listaNotasFiscais();
        if (notasFiscais.length === 0) {
            res.status(404).json({
                mensagem: "Notas fiscais não encontrados"
            });
            return;
        }
        res.status(200).json({
            mensagem: "Notas fiscais encontradas com sucesso!",
            notasFiscais: notasFiscais
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
;
//retorna nota fiscal por id
function pesquisarNotaPorId(req, res) {
    try {
        let id = Number(req.params.id);
        const notaPesquisada = notaFiscalService.filtraNotaPorId(id);
        if (!notaPesquisada) {
            res.status(404).json({
                mensagem: "Nota fiscal não encontrada"
            });
            return;
        }
        res.status(200).json({
            mensagem: "Nota fiscal encontrada com sucesso!",
            notaFiscal: notaPesquisada
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
;
//cadastra nova nota fiscal
function cadastrarNotaFiscal(req, res) {
    try {
        const novaNota = notaFiscalService.cadastrarNotaFiscal(req.body);
        res.status(201).json({
            mensagem: "Nota fiscal adicionado com sucesso!",
            notaFiscal: novaNota
        });
    }
    catch (error) {
        if (error.message == "Já existe uma nota fiscal com esse número") {
            return res.status(409).json({ message: error.message });
        }
        if (error.message == "O estoque do id do carro deve ser maior que 0") {
            return res.status(422).json({ message: error.message });
        }
        res.status(400).json({ message: error.message });
    }
}
;
