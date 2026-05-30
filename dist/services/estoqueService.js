"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const Estoque_1 = require("../models/Estoque");
const carroRepository_1 = require("../repositories/carroRepository");
const estoqueRepository_1 = require("../repositories/estoqueRepository");
class EstoqueService {
    estoqueRepository = estoqueRepository_1.EstoqueRepository.getInstance();
    carroRepository = carroRepository_1.CarroRepository.getInstance();
    //Lista todos os registros
    listar() {
        return this.estoqueRepository.listar();
    }
    //Busca estoque por id
    buscarPorId(id) {
        return this.estoqueRepository.buscarPorId(id);
    }
    //Busca estoque por carro
    buscarPorCarro(id_carro) {
        return this.estoqueRepository.buscarPorCarro(id_carro);
    }
    //Cadastra estoque
    cadastrarEstoque(data) {
        if (!data.id_carro || data.quantidade === undefined || !data.localizacao_patio || !data.data_entrada) {
            throw new Error("Estoque requer id_carro, quantidade, localizacao_patio e data_entrada");
        }
        //Verifica se carro existe
        const carro = this.carroRepository.buscarPorId(data.id_carro);
        if (!carro) {
            throw new Error("Carro não encontrado");
        }
        //Quantidade >= 0
        if (!Number.isInteger(data.quantidade) || data.quantidade < 0) {
            throw new Error("Quantidade deve ser um inteiro maior ou igual a zero");
        }
        //Data não pode ser futura
        const hoje = new Date();
        const dataEntrada = new Date(data.data_entrada);
        if (dataEntrada > hoje) {
            throw new Error("Data de entrada não pode ser futura");
        }
        //Não pode existir estoque para mesmo carro
        const estoqueExistente = this.estoqueRepository.buscarPorCarro(data.id_carro);
        if (estoqueExistente) {
            throw new Error("Já existe estoque para esse carro");
        }
        const estoque = new Estoque_1.Estoque(data.id_carro, data.quantidade, data.localizacao_patio, data.data_entrada);
        this.estoqueRepository.cadastrarEstoque(estoque);
        return estoque;
    }
    //Atualiza estoque
    atualizarEstoque(id, data) {
        const estoque = this.estoqueRepository.buscarPorId(id);
        if (!estoque) {
            throw new Error("Estoque não encontrado");
        }
        if (data.quantidade === undefined || !data.localizacao_patio) {
            throw new Error("Quantidade e localizacao_patio são obrigatórios");
        }
        //Quantidade >= 0
        if (!Number.isInteger(data.quantidade) || data.quantidade < 0) {
            throw new Error("Quantidade deve ser um inteiro maior ou igual a zero");
        }
        estoque.quantidade = data.quantidade;
        estoque.localizacao_patio = data.localizacao_patio;
        const estoqueAtualizado = this.estoqueRepository.atualizarEstoque(id, estoque);
        return estoqueAtualizado;
    }
    //Remove estoque
    removerEstoque(id) {
        const estoque = this.estoqueRepository.buscarPorId(id);
        if (!estoque) {
            throw new Error("Estoque não encontrado");
        }
        return this.estoqueRepository.removerEstoque(id);
    }
}
exports.EstoqueService = EstoqueService;
