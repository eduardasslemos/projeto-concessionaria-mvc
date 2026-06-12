"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarroService = void 0;
const Carro_1 = require("../models/Carro");
const carroRepository_1 = require("../repositories/carroRepository");
const estoqueRepository_1 = require("../repositories/estoqueRepository");
const notaFiscalRepository_1 = require("../repositories/notaFiscalRepository");
class CarroService {
    CarroRepository = carroRepository_1.CarroRepository.getInstance();
    estoqueRepository = estoqueRepository_1.EstoqueRepository.getInstance();
    notaFiscalRepository = notaFiscalRepository_1.NotaFiscalRepository.getInstance();
    listar() {
        return this.CarroRepository.listar();
    }
    buscarPorId(id) {
        return this.CarroRepository.buscarPorId(id);
    }
    listarDisponiveis() {
        const estoques = this.estoqueRepository.listarDisponiveis();
        const carrosDisponiveis = estoques.map(estoque => {
            return this.CarroRepository.buscarPorId(estoque.id_carro);
        });
        return carrosDisponiveis.filter(carro => carro !== undefined);
    }
    CadastrarCarro(data) {
        if (!data.marca || !data.modelo || !data.ano || !data.placa || !data.preco || !data.preco) {
            throw new Error("Carro requer marca, modelo, ano, placa, preco e cor");
        }
        const anoAtual = new Date().getFullYear();
        if (data.ano < 1950 || data.ano > anoAtual + 1) {
            throw new Error("Ano deve estar entre 1950 e o próximo ano");
        }
        if (data.preco <= 0) {
            throw new Error("Preço deve ser maior que zero");
        }
        const placaExistente = this.CarroRepository.buscaPorPlaca(data.placa);
        if (placaExistente) {
            throw new Error("Já existe um carro com essa placa");
        }
        const carro = new Carro_1.Carro(data.marca, data.modelo, data.ano, data.placa, data.preco, data.cor);
        this.CarroRepository.cadastrarCarro(carro);
        return carro;
    }
    atualizarCarro(id, data) {
        const carro = this.CarroRepository.buscarPorId(id);
        if (!carro) {
            throw new Error("Carro não encontrado");
        }
        if (!data.marca || !data.modelo || !data.ano || !data.placa || !data.preco || !data.cor) {
            throw new Error("Carro requer marca, modelo, ano, placa, preco e cor");
        }
        const anoAtual = new Date().getFullYear();
        if (data.ano < 1950 || data.ano > anoAtual + 1) {
            throw new Error("Ano deve estar entre 1950 e o próximo ano");
        }
        if (data.preco <= 0) {
            throw new Error("Preço deve ser maior que zero");
        }
        const placaExistente = this.CarroRepository.buscaPorPlaca(data.placa);
        if (placaExistente && placaExistente.id_carro !== id) {
            throw new Error("Já existe um carro com essa placa");
        }
        const carroAtualizado = this.CarroRepository.atualizarCarro(id, data);
        return carroAtualizado;
    }
    removerCarro(id) {
        const carro = this.CarroRepository.buscarPorId(id);
        if (!carro) {
            throw new Error("Carro não encontrado");
        }
        const estoqueVinculado = this.estoqueRepository.buscarPorCarro(id);
        if (estoqueVinculado && estoqueVinculado.quantidade > 0) {
            throw new Error("Não se pode remover carro com estoque vinculado");
        }
        const notas = this.notaFiscalRepository.listaNotasPorCarro(id);
        if (notas) {
            throw new Error("Não se pode remover carro com nota fiscal vinculada");
        }
        return this.CarroRepository.removerCarro(id);
    }
}
exports.CarroService = CarroService;
