"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendedorRepository = void 0;
const mysql_1 = require("../database/mysql");
const Vendedor_1 = require("../models/Vendedor");
class VendedorRepository {
    static instance;
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new VendedorRepository();
        }
        return this.instance;
    }
    static getCreateTableQuery() {
        return `
          CREATE TABLE IF NOT EXISTS vendedor (
            id_vendedor INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            matricula VARCHAR(50) NOT NULL UNIQUE,
            comissao_percentual DECIMAL(5,2) NOT NULL
          );
        `;
    }
    //lista todos os vendedores
    async listaVendedores() {
        const linhas = await (0, mysql_1.executarComandoSQL)("SELECT id_vendedor, nome, matricula, comissao_percentual FROM vendedor", []);
        const vendedores = linhas.map((linha) => {
            return new Vendedor_1.Vendedor(linha.id_vendedor, linha.nome, linha.matricula, Number(linha.comissao_percentual));
        });
        return vendedores;
    }
    //retorna vendedor por id
    async filtraVendedorPorId(id) {
        const linhas = await (0, mysql_1.executarComandoSQL)("SELECT id_vendedor, nome, matricula, comissao_percentual FROM vendedor WHERE id_vendedor = ?", [id]);
        if (linhas.length === 0) {
            return null;
        }
        const linha = linhas[0];
        return new Vendedor_1.Vendedor(linha.id_vendedor, linha.nome, linha.matricula, Number(linha.comissao_percentual));
    }
    //insere um novo vendedor
    async insereVendedor(vendedor) {
        const resultado = await (0, mysql_1.executarComandoSQL)("INSERT INTO vendedor (nome, matricula, comissao_percentual) VALUES (?, ?, ?)", [
            vendedor.nome,
            vendedor.matricula,
            vendedor.comissao_percentual,
        ]);
        const idGerado = resultado.insertId;
        return new Vendedor_1.Vendedor(idGerado, vendedor.nome, vendedor.matricula, vendedor.comissao_percentual);
    }
    //atualiza um vendedor
    async atualizaVendedor(id, vendedor) {
        const vendedorExistente = await this.filtraVendedorPorId(id);
        if (!vendedorExistente) {
            return null;
        }
        await (0, mysql_1.executarComandoSQL)(`UPDATE vendedor 
            SET nome = ?, matricula = ?, comissao_percentual = ?
            WHERE id_vendedor = ?`, [
            vendedor.nome,
            vendedor.matricula,
            vendedor.comissao_percentual,
            id,
        ]);
        return new Vendedor_1.Vendedor(id, vendedor.nome, vendedor.matricula, vendedor.comissao_percentual);
    }
    //remove um vendedor
    async removeVendedor(id) {
        const vendedorExistente = await this.filtraVendedorPorId(id);
        if (!vendedorExistente) {
            return null;
        }
        await (0, mysql_1.executarComandoSQL)("DELETE FROM vendedor WHERE id_vendedor = ?", [id]);
        return vendedorExistente;
    }
    //retorna vendedor por matricula
    async filtraVendedorPorMatricula(matricula) {
        const linhas = await (0, mysql_1.executarComandoSQL)("SELECT id_vendedor, nome, matricula, comissao_percentual FROM vendedor WHERE matricula = ?", [matricula]);
        if (linhas.length === 0) {
            return null;
        }
        const linha = linhas[0];
        return new Vendedor_1.Vendedor(linha.id_vendedor, linha.nome, linha.matricula, Number(linha.comissao_percentual));
    }
}
exports.VendedorRepository = VendedorRepository;
