"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendedorService = void 0;
const Vendedor_1 = require("../models/Vendedor");
const vendedorRepository_1 = require("../repositories/vendedorRepository");
const notaFiscalRepository_1 = require("../repositories/notaFiscalRepository");
class VendedorService {
    vendedorRepository = vendedorRepository_1.VendedorRepository.getInstance();
    notaFiscalRepository = notaFiscalRepository_1.NotaFiscalRepository.getInstance();
    async listaVendedores() {
        return await this.vendedorRepository.listaVendedores();
    }
    async consultarVendedorId(id) {
        return await this.vendedorRepository.filtraVendedorPorId(id);
    }
    async cadastrarVendedor(vendedorData) {
        const { nome, matricula, comissao_percentual } = vendedorData;
        if (!nome || !matricula || comissao_percentual === undefined) {
            throw new Error("Vendedor requer nome, matrícula e percentual da comissão");
        }
        if (Number(comissao_percentual) < 0 || Number(comissao_percentual) > 30) {
            throw new Error("Percentual da comissão deve ser um número positivo entre 0 e 30");
        }
        const vendedorExistente = await this.vendedorRepository.filtraVendedorPorMatricula(matricula);
        if (vendedorExistente) {
            throw new Error("Já existe um vendedor com essa matrícula");
        }
        const novoVendedor = new Vendedor_1.Vendedor(null, nome, matricula, Number(comissao_percentual));
        return await this.vendedorRepository.insereVendedor(novoVendedor);
    }
    async atualizaVendedor(id, vendedorData) {
        const vendedorExistente = await this.vendedorRepository.filtraVendedorPorId(id);
        if (!vendedorExistente) {
            throw new Error("Vendedor não encontrado");
        }
        const { nome, matricula, comissao_percentual } = vendedorData;
        if (!nome || !matricula || comissao_percentual === undefined) {
            throw new Error("Vendedor requer nome, matrícula e percentual da comissão");
        }
        if (Number(comissao_percentual) < 0 || Number(comissao_percentual) > 30) {
            throw new Error("Percentual da comissão deve ser um número positivo entre 0 e 30");
        }
        const matriculaExistente = await this.vendedorRepository.filtraVendedorPorMatricula(matricula);
        if (matriculaExistente && matriculaExistente.id_vendedor !== id) {
            throw new Error("Já existe um vendedor com essa matrícula");
        }
        const vendedorAtualizado = new Vendedor_1.Vendedor(id, nome, matricula, Number(comissao_percentual));
        const resultado = await this.vendedorRepository.atualizaVendedor(id, vendedorAtualizado);
        if (!resultado) {
            throw new Error("Erro ao atualizar vendedor");
        }
        return resultado;
    }
    async removeVendedores(id) {
        const vendedorExistente = await this.vendedorRepository.filtraVendedorPorId(id);
        if (!vendedorExistente) {
            throw new Error("Vendedor não encontrado");
        }
        const notas = await this.notaFiscalRepository.listaNotasPorVendedor(id);
        if (notas && notas.length > 0) {
            throw new Error("O vendedor possui notas fiscais vinculadas a ele e não pode ser excluído");
        }
        const vendedorRemovido = await this.vendedorRepository.removeVendedor(id);
        if (!vendedorRemovido) {
            throw new Error("Erro ao remover vendedor");
        }
        return vendedorRemovido;
    }
    async listaNotasFiscais(id) {
        return await this.notaFiscalRepository.listaNotasPorVendedor(id);
    }
}
exports.VendedorService = VendedorService;
