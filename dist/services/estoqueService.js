"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const Estoque_1 = require("../models/Estoque");
const carroRepository_1 = require("../repositories/carroRepository");
const estoqueRepository_1 = require("../repositories/estoqueRepository");
class EstoqueService {
    estoqueRepository = estoqueRepository_1.EstoqueRepository.getInstance();
    carroRepository = carroRepository_1.CarroRepository.getInstance();
    // Lista todos os registros
    async listar() {
        return await this.estoqueRepository.listar();
    }
    // Busca estoque por id
    async buscarPorId(id) {
        return await this.estoqueRepository.buscarPorId(id);
    }
    // Busca estoque por carro
    async buscarPorCarro(id_carro) {
        return await this.estoqueRepository.buscarPorCarro(id_carro);
    }
    // Cadastra estoque
    async cadastrarEstoque(data) {
        if (data.id_carro === undefined || data.quantidade === undefined || !data.localizacao_patio || !data.data_entrada) {
            throw new Error("Estoque requer id_carro, quantidade, localizacao_patio e data_entrada");
        }
        const idCarro = Number(data.id_carro);
        const quantidade = Number(data.quantidade);
        const dataEntrada = new Date(data.data_entrada);
        if (!Number.isInteger(idCarro) || idCarro <= 0) {
            throw new Error("id_carro deve ser um número inteiro válido");
        }
        // Verifica se carro existe
        const carro = await this.carroRepository.buscarPorId(idCarro);
        if (!carro) {
            throw new Error("Carro não encontrado");
        }
        // Quantidade >= 0
        if (!Number.isInteger(quantidade) || quantidade < 0) {
            throw new Error("Quantidade deve ser um inteiro maior ou igual a zero");
        }
        // Data não pode ser futura
        const hoje = new Date();
        if (dataEntrada > hoje) {
            throw new Error("Data de entrada não pode ser futura");
        }
        // Não pode existir estoque para o mesmo carro
        const estoqueExistente = await this.estoqueRepository.buscarPorCarro(idCarro);
        if (estoqueExistente) {
            throw new Error("Já existe estoque para esse carro");
        }
        const estoque = new Estoque_1.Estoque(null, idCarro, quantidade, data.localizacao_patio, dataEntrada);
        return await this.estoqueRepository.cadastrarEstoque(estoque);
    }
    // Atualiza estoque
    async atualizarEstoque(id, data) {
        const estoque = await this.estoqueRepository.buscarPorId(id);
        if (!estoque) {
            throw new Error("Estoque não encontrado");
        }
        if (data.quantidade === undefined || !data.localizacao_patio) {
            throw new Error("Quantidade e localizacao_patio são obrigatórios");
        }
        const quantidade = Number(data.quantidade);
        // Quantidade >= 0
        if (!Number.isInteger(quantidade) || quantidade < 0) {
            throw new Error("Quantidade deve ser um inteiro maior ou igual a zero");
        }
        estoque.quantidade = quantidade;
        estoque.localizacao_patio = data.localizacao_patio;
        const estoqueAtualizado = await this.estoqueRepository.atualizarEstoque(id, estoque);
        if (!estoqueAtualizado) {
            throw new Error("Erro ao atualizar estoque");
        }
        return estoqueAtualizado;
    }
    // Remove estoque
    async removerEstoque(id) {
        const estoque = await this.estoqueRepository.buscarPorId(id);
        if (!estoque) {
            throw new Error("Estoque não encontrado");
        }
        const estoqueRemovido = await this.estoqueRepository.removerEstoque(id);
        if (!estoqueRemovido) {
            throw new Error("Erro ao remover estoque");
        }
        return estoqueRemovido;
    }
}
exports.EstoqueService = EstoqueService;
