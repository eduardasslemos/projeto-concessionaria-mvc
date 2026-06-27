"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarroService = void 0;
const Carro_1 = require("../models/Carro");
const carroRepository_1 = require("../repositories/carroRepository");
const estoqueRepository_1 = require("../repositories/estoqueRepository");
const notaFiscalRepository_1 = require("../repositories/notaFiscalRepository");
class CarroService {
    carroRepository = carroRepository_1.CarroRepository.getInstance();
    estoqueRepository = estoqueRepository_1.EstoqueRepository.getInstance();
    notaFiscalRepository = notaFiscalRepository_1.NotaFiscalRepository.getInstance();
    async listar() {
        return await this.carroRepository.listar();
    }
    async buscarPorId(id) {
        return await this.carroRepository.buscarPorId(id);
    }
    async listarDisponiveis() {
        const estoques = await this.estoqueRepository.listarDisponiveis();
        const carrosDisponiveis = await Promise.all(estoques.map(async (estoque) => {
            return await this.carroRepository.buscarPorId(estoque.id_carro);
        }));
        return carrosDisponiveis.filter((carro) => carro !== null);
    }
    async CadastrarCarro(data) {
        if (!data.marca || !data.modelo || data.ano === undefined || !data.placa || data.preco === undefined || !data.cor) {
            throw new Error("Carro requer marca, modelo, ano, placa, preco e cor");
        }
        const anoAtual = new Date().getFullYear();
        if (Number(data.ano) < 1950 || Number(data.ano) > anoAtual + 1) {
            throw new Error("Ano deve estar entre 1950 e o próximo ano");
        }
        if (Number(data.preco) <= 0) {
            throw new Error("Preço deve ser maior que zero");
        }
        const placaExistente = await this.carroRepository.buscaPorPlaca(data.placa);
        if (placaExistente) {
            throw new Error("Já existe um carro com essa placa");
        }
        const carro = new Carro_1.Carro(null, data.marca, data.modelo, Number(data.ano), data.placa, Number(data.preco), data.cor);
        return await this.carroRepository.cadastrarCarro(carro);
    }
    async atualizarCarro(id, data) {
        const carro = await this.carroRepository.buscarPorId(id);
        if (!carro) {
            throw new Error("Carro não encontrado");
        }
        if (!data.marca || !data.modelo || data.ano === undefined || !data.placa || data.preco === undefined || !data.cor) {
            throw new Error("Carro requer marca, modelo, ano, placa, preco e cor");
        }
        const anoAtual = new Date().getFullYear();
        if (Number(data.ano) < 1950 || Number(data.ano) > anoAtual + 1) {
            throw new Error("Ano deve estar entre 1950 e o próximo ano");
        }
        if (Number(data.preco) <= 0) {
            throw new Error("Preço deve ser maior que zero");
        }
        const placaExistente = await this.carroRepository.buscaPorPlaca(data.placa);
        if (placaExistente && placaExistente.id_carro !== id) {
            throw new Error("Já existe um carro com essa placa");
        }
        const carroAtualizado = new Carro_1.Carro(id, data.marca, data.modelo, Number(data.ano), data.placa, Number(data.preco), data.cor);
        const resultado = await this.carroRepository.atualizarCarro(id, carroAtualizado);
        if (!resultado) {
            throw new Error("Erro ao atualizar carro");
        }
        return resultado;
    }
    async removerCarro(id) {
        const carro = await this.carroRepository.buscarPorId(id);
        if (!carro) {
            throw new Error("Carro não encontrado");
        }
        const estoqueVinculado = await this.estoqueRepository.buscarPorCarro(id);
        if (estoqueVinculado && estoqueVinculado.quantidade > 0) {
            throw new Error("Não se pode remover carro com estoque vinculado");
        }
        const notas = await this.notaFiscalRepository.listaNotasPorCarro(id);
        if (notas.length > 0) {
            throw new Error("Não se pode remover carro com nota fiscal vinculada");
        }
        const carroRemovido = await this.carroRepository.removerCarro(id);
        if (!carroRemovido) {
            throw new Error("Erro ao remover carro");
        }
        return carroRemovido;
    }
}
exports.CarroService = CarroService;
