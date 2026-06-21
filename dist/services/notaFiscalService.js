"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotaFiscalService = void 0;
const NotaFiscal_1 = require("../models/NotaFiscal");
const notaFiscalRepository_1 = require("../repositories/notaFiscalRepository");
const clienteRepository_1 = require("../repositories/clienteRepository");
const vendedorRepository_1 = require("../repositories/vendedorRepository");
const carroRepository_1 = require("../repositories/carroRepository");
const estoqueRepository_1 = require("../repositories/estoqueRepository");
class NotaFiscalService {
    notaFiscalRepository = notaFiscalRepository_1.NotaFiscalRepository.getInstance();
    clienteRepository = clienteRepository_1.ClienteRepository.getInstance();
    vendedorRepository = vendedorRepository_1.VendedorRepository.getInstance();
    carroRepository = carroRepository_1.CarroRepository.getInstance();
    estoqueRepository = estoqueRepository_1.EstoqueRepository.getInstance();
    //lista notas fiscais
    async listaNotasFiscais() {
        return await this.notaFiscalRepository.listaNotaFiscal();
    }
    //retorna nota fiscal por id
    async filtraNotaPorId(id) {
        return await this.notaFiscalRepository.filtraNotaPorId(id);
    }
    //cadastra nova fiscal
    async cadastrarNotaFiscal(notaData) {
        const { numero_nota, data_emissao, valor_total, id_cliente, id_vendedor, id_carro } = notaData;
        if (!numero_nota || !data_emissao || !valor_total || !id_cliente || !id_vendedor || !id_carro) {
            throw new Error("Nota fiscal requer número da nota, data da emissão, valor total, id do cliente, id do vendedor e id do carro");
        }
        const notaExistente = await this.notaFiscalRepository.filtraNotaPorNumero(numero_nota);
        if (notaExistente) {
            throw new Error("Já existe uma nota fiscal com esse número");
        }
        const dataEmissao = new Date(data_emissao);
        const dataAtual = new Date();
        if (dataEmissao > dataAtual) {
            throw new Error("A data de emissão não pode ser uma data futura");
        }
        if (Number(valor_total) <= 0) {
            throw new Error("O valor total deve ser maior que zero");
        }
        const clienteExistente = await this.clienteRepository.buscarClientePorId(id_cliente);
        if (!clienteExistente) {
            throw new Error("O id do cliente deve existir");
        }
        const vendedorExistente = await this.vendedorRepository.filtraVendedorPorId(id_vendedor);
        if (!vendedorExistente) {
            throw new Error("O id do vendedor deve existir");
        }
        const carroExistente = await this.carroRepository.buscarPorId(id_carro);
        if (!carroExistente) {
            throw new Error("O id do carro deve existir");
        }
        const estoque = await this.estoqueRepository.buscarPorCarro(id_carro);
        if (!estoque) {
            throw new Error("O estoque do id do carro deve existir");
        }
        else if (estoque.quantidade <= 0) {
            throw new Error("O estoque do id do carro deve ser maior que 0");
        }
        const novaNotaFiscal = new NotaFiscal_1.NotaFiscal(null, numero_nota, data_emissao, Number(valor_total), id_cliente, id_vendedor, id_carro);
        const notaCriada = await this.notaFiscalRepository.insereNotaFiscal(novaNotaFiscal);
        await this.estoqueRepository.decrementarQuantidade(id_carro);
        return notaCriada;
    }
}
exports.NotaFiscalService = NotaFiscalService;
