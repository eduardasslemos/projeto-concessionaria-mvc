"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueRepository = void 0;
const mysql_1 = require("../database/mysql");
const Estoque_1 = require("../models/Estoque");
class EstoqueRepository {
    static instance;
    constructor() { }
    static getInstance() {
        if (!EstoqueRepository.instance) {
            EstoqueRepository.instance = new EstoqueRepository();
        }
        return EstoqueRepository.instance;
    }
    static getCreateTableQuery() {
        return `
      CREATE TABLE IF NOT EXISTS estoque (
        id_estoque INT AUTO_INCREMENT PRIMARY KEY,
        id_carro INT NOT NULL,
        quantidade INT NOT NULL,
        localizacao_patio VARCHAR(100) NOT NULL,
        data_entrada DATE NOT NULL,
        FOREIGN KEY (id_carro) REFERENCES carro(id_carro)
          ON DELETE CASCADE
      );
    `;
    }
    async listar() {
        const linhas = await (0, mysql_1.executarComandoSQL)(`SELECT id_estoque, id_carro, quantidade, localizacao_patio, data_entrada
       FROM estoque`, []);
        return linhas.map((linha) => {
            return new Estoque_1.Estoque(linha.id_estoque, linha.id_carro, linha.quantidade, linha.localizacao_patio, new Date(linha.data_entrada));
        });
    }
    async buscarPorId(id) {
        const linhas = await (0, mysql_1.executarComandoSQL)(`SELECT id_estoque, id_carro, quantidade, localizacao_patio, data_entrada
       FROM estoque
       WHERE id_estoque = ?`, [id]);
        if (linhas.length === 0) {
            return null;
        }
        const linha = linhas[0];
        return new Estoque_1.Estoque(linha.id_estoque, linha.id_carro, linha.quantidade, linha.localizacao_patio, new Date(linha.data_entrada));
    }
    async buscarPorCarro(id_carro) {
        const linhas = await (0, mysql_1.executarComandoSQL)(`SELECT id_estoque, id_carro, quantidade, localizacao_patio, data_entrada
       FROM estoque
       WHERE id_carro = ?`, [id_carro]);
        if (linhas.length === 0) {
            return null;
        }
        const linha = linhas[0];
        return new Estoque_1.Estoque(linha.id_estoque, linha.id_carro, linha.quantidade, linha.localizacao_patio, new Date(linha.data_entrada));
    }
    async listarDisponiveis() {
        const linhas = await (0, mysql_1.executarComandoSQL)(`SELECT id_estoque, id_carro, quantidade, localizacao_patio, data_entrada
       FROM estoque
       WHERE quantidade > 0`, []);
        return linhas.map((linha) => {
            return new Estoque_1.Estoque(linha.id_estoque, linha.id_carro, linha.quantidade, linha.localizacao_patio, new Date(linha.data_entrada));
        });
    }
    async cadastrarEstoque(estoque) {
        const resultado = await (0, mysql_1.executarComandoSQL)(`INSERT INTO estoque 
       (id_carro, quantidade, localizacao_patio, data_entrada)
       VALUES (?, ?, ?, ?)`, [
            estoque.id_carro,
            estoque.quantidade,
            estoque.localizacao_patio,
            estoque.data_entrada,
        ]);
        const idGerado = resultado.insertId;
        return new Estoque_1.Estoque(idGerado, estoque.id_carro, estoque.quantidade, estoque.localizacao_patio, estoque.data_entrada);
    }
    async atualizarEstoque(id, dados) {
        const estoqueExistente = await this.buscarPorId(id);
        if (!estoqueExistente) {
            return null;
        }
        await (0, mysql_1.executarComandoSQL)(`UPDATE estoque
       SET id_carro = ?, quantidade = ?, localizacao_patio = ?, data_entrada = ?
       WHERE id_estoque = ?`, [
            dados.id_carro,
            dados.quantidade,
            dados.localizacao_patio,
            dados.data_entrada,
            id,
        ]);
        return new Estoque_1.Estoque(id, dados.id_carro, dados.quantidade, dados.localizacao_patio, dados.data_entrada);
    }
    async decrementarQuantidade(id_carro) {
        const estoque = await this.buscarPorCarro(id_carro);
        if (!estoque) {
            return null;
        }
        if (estoque.quantidade <= 0) {
            return null;
        }
        await (0, mysql_1.executarComandoSQL)(`UPDATE estoque
       SET quantidade = quantidade - 1
       WHERE id_carro = ? AND quantidade > 0`, [id_carro]);
        return await this.buscarPorCarro(id_carro);
    }
    async removerEstoque(id) {
        const estoqueExistente = await this.buscarPorId(id);
        if (!estoqueExistente) {
            return null;
        }
        await (0, mysql_1.executarComandoSQL)("DELETE FROM estoque WHERE id_estoque = ?", [id]);
        return estoqueExistente;
    }
}
exports.EstoqueRepository = EstoqueRepository;
