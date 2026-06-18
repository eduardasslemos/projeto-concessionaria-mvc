"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarroRepository = void 0;
const mysql_1 = require("../database/mysql");
const Carro_1 = require("../models/Carro");
class CarroRepository {
    static instance;
    constructor() { }
    static getInstance() {
        if (!CarroRepository.instance) {
            CarroRepository.instance = new CarroRepository();
        }
        return CarroRepository.instance;
    }
    static getCreateTableQuery() {
        return `
      CREATE TABLE IF NOT EXISTS carro (
        id_carro INT AUTO_INCREMENT PRIMARY KEY,
        marca VARCHAR(100) NOT NULL,
        modelo VARCHAR(100) NOT NULL,
        ano INT NOT NULL,
        placa VARCHAR(20) NOT NULL UNIQUE,
        preco DECIMAL(10,2) NOT NULL,
        cor VARCHAR(50) NOT NULL
      );
    `;
    }
    async listar() {
        const linhas = await (0, mysql_1.executarComandoSQL)("SELECT id_carro, marca, modelo, ano, placa, preco, cor FROM carro", []);
        const carros = linhas.map((linha) => {
            return new Carro_1.Carro(linha.id_carro, linha.marca, linha.modelo, linha.ano, linha.placa, Number(linha.preco), linha.cor);
        });
        return carros;
    }
    async buscarPorId(id) {
        const linhas = await (0, mysql_1.executarComandoSQL)("SELECT id_carro, marca, modelo, ano, placa, preco, cor FROM carro WHERE id_carro = ?", [id]);
        if (linhas.length === 0) {
            return null;
        }
        const linha = linhas[0];
        return new Carro_1.Carro(linha.id_carro, linha.marca, linha.modelo, linha.ano, linha.placa, Number(linha.preco), linha.cor);
    }
    async buscaPorPlaca(placa) {
        const linhas = await (0, mysql_1.executarComandoSQL)("SELECT id_carro, marca, modelo, ano, placa, preco, cor FROM carro WHERE placa = ?", [placa]);
        if (linhas.length === 0) {
            return null;
        }
        const linha = linhas[0];
        return new Carro_1.Carro(linha.id_carro, linha.marca, linha.modelo, linha.ano, linha.placa, Number(linha.preco), linha.cor);
    }
    async cadastrarCarro(carro) {
        const resultado = await (0, mysql_1.executarComandoSQL)("INSERT INTO carro (marca, modelo, ano, placa, preco, cor) VALUES (?, ?, ?, ?, ?, ?)", [
            carro.marca,
            carro.modelo,
            carro.ano,
            carro.placa,
            carro.preco,
            carro.cor,
        ]);
        const idGerado = resultado.insertId;
        const novoCarro = new Carro_1.Carro(idGerado, carro.marca, carro.modelo, carro.ano, carro.placa, carro.preco, carro.cor);
        return novoCarro;
    }
    async atualizarCarro(id, carro) {
        const carroExistente = await this.buscarPorId(id);
        if (!carroExistente) {
            return null;
        }
        await (0, mysql_1.executarComandoSQL)(`UPDATE carro 
       SET marca = ?, modelo = ?, ano = ?, placa = ?, preco = ?, cor = ?
       WHERE id_carro = ?`, [
            carro.marca,
            carro.modelo,
            carro.ano,
            carro.placa,
            carro.preco,
            carro.cor,
            id,
        ]);
        return new Carro_1.Carro(id, carro.marca, carro.modelo, carro.ano, carro.placa, carro.preco, carro.cor);
    }
    async removerCarro(id) {
        const carroExistente = await this.buscarPorId(id);
        if (!carroExistente) {
            return null;
        }
        await (0, mysql_1.executarComandoSQL)("DELETE FROM carro WHERE id_carro = ?", [id]);
        return carroExistente;
    }
}
exports.CarroRepository = CarroRepository;
