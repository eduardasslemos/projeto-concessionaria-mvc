"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendedorService = void 0;
const Vendedor_1 = require("../models/Vendedor");
const vendedorRepository_1 = require("../repositories/vendedorRepository");
class VendedorService {
    vendedorRepository = vendedorRepository_1.VendedorRepository.getInstance();
    //lista todos os vendedores
    listaVendedores() {
        return this.vendedorRepository.listaVendedores();
    }
    //retorna vendedor por id
    consultarVendedorId(id) {
        const idNumber = parseInt(id, 10);
        console.log(id);
        return this.vendedorRepository.filtraVendedorPorId(idNumber);
    }
    //cadastra novo vendedor
    cadastrarVendedor(vendedorData) {
        const { nome, matricula, comissao_percentual } = vendedorData;
        if (!nome || !matricula || !comissao_percentual) {
            throw new Error("Vendedor requer nome, matrícula e percentual da comissão");
        }
        if (comissao_percentual < 0 || comissao_percentual > 30) {
            throw new Error("Percentual da comissão deve ser um número positivo entre 0 e 30");
        }
        const vendedorExistente = this.vendedorRepository.filtraVendedorPorMatricula(matricula);
        if (vendedorExistente) {
            throw new Error("Já existe um vendedor com essa matrícula");
        }
        const novoVendedor = new Vendedor_1.Vendedor(nome, matricula, comissao_percentual);
        this.vendedorRepository.insereVendedor(novoVendedor);
        return novoVendedor;
    }
    //atualiza vendedor
    atualizaVendedor(id, vendedorData) {
        const idNumber = parseInt(id, 10);
        const vendedorExistente = this.vendedorRepository.filtraVendedorPorId(idNumber);
        if (!vendedorExistente) {
            throw new Error("Vendedor não encontrado");
        }
        const { nome, matricula, comissao_percentual } = vendedorData;
        if (!nome || !matricula || !comissao_percentual) {
            throw new Error("Vendedor requer nome, matrícula e percentual da comissão");
        }
        const vendedorAtualizado = new Vendedor_1.Vendedor(nome, matricula, comissao_percentual);
        vendedorAtualizado.id_vendedor = idNumber;
        this.vendedorRepository.atualizaVendedor(idNumber, vendedorAtualizado);
        return vendedorAtualizado;
    }
    //remove um vendedor
    removeVendedores(id) {
        const idNumber = parseInt(id, 10);
        const notas = this.vendedorRepository.listaNotasFiscais(idNumber);
        if (notas.length > 0) {
            throw new Error("O vendedor possui notas fiscais vinculadas a ele e não pode ser excluído");
        }
        this.vendedorRepository.removeVendedor(id);
    }
    //lista notas fiscais
    listaNotasFiscais(id) {
        return this.vendedorRepository.listaNotasFiscais(id);
    }
}
exports.VendedorService = VendedorService;
