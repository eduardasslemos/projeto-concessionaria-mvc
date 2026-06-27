"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteRepository = void 0;
const Cliente_1 = require("../models/Cliente");
const mysql_1 = require("../database/mysql");
class ClienteRepository {
    static instance;
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ClienteRepository();
        }
        return this.instance;
    }
    static getCreateTableQuery() {
        return `
        CREATE TABLE IF NOT EXISTS cliente (
            id_cliente INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            cpf VARCHAR(20) NOT NULL UNIQUE,
            telefone VARCHAR(20) NOT NULL,
            email VARCHAR(100),
            cidade VARCHAR(100)
        );
        `;
    }
    //Listar clientes 
    async listarCliente() {
        const linhas = await (0, mysql_1.executarComandoSQL)("SELECT id_cliente, nome, cpf, telefone, email, cidade FROM cliente", []);
        const clientes = linhas.map((linha) => {
            return new Cliente_1.Cliente(linha.id_cliente, linha.nome, linha.cpf, linha.telefone, linha.email, linha.cidade);
        });
        return clientes;
    }
    //Buscar por id
    async buscarClientePorId(id) {
        const linhas = await (0, mysql_1.executarComandoSQL)("SELECT id_cliente, nome, cpf, telefone, email, cidade FROM cliente WHERE id_cliente = ?", [id]);
        if (linhas.length === 0) {
            return null;
        }
        const linha = linhas[0];
        return new Cliente_1.Cliente(linha.id_cliente, linha.nome, linha.cpf, linha.telefone, linha.email, linha.cidade);
    }
    // VERIFICAR CPF
    async verficarClientePorCpf(cpf) {
        const linhas = await (0, mysql_1.executarComandoSQL)("SELECT id_cliente, nome, cpf, telefone, email, cidade FROM cliente WHERE cpf = ?", [cpf]);
        if (linhas.length === 0)
            return null;
        const linha = linhas[0];
        return new Cliente_1.Cliente(linha.id_cliente, linha.nome, linha.cpf, linha.telefone, linha.email, linha.cidade);
    }
    //Cadastrar cliente 
    async cadastrarCliente(cliente) {
        const resultado = await (0, mysql_1.executarComandoSQL)(`INSERT INTO cliente (nome, cpf, telefone, email, cidade)
             VALUES (?, ?, ?, ?, ?)`, [
            cliente.nome,
            cliente.cpf,
            cliente.telefone,
            cliente.email,
            cliente.cidade
        ]);
        const idGerado = resultado.insertId;
        return new Cliente_1.Cliente(idGerado, cliente.nome, cliente.cpf, cliente.telefone, cliente.email, cliente.cidade);
    }
    //Atualizar dados do cliente
    async atualizarDadosCliente(id, cliente) {
        const clienteExistente = await this.buscarClientePorId(id);
        if (!clienteExistente) {
            return null;
        }
        await (0, mysql_1.executarComandoSQL)(`UPDATE cliente 
            SET nome = ?, cpf = ?, telefone = ?, email = ?, cidade = ?
            WHERE id_cliente = ?`, [
            cliente.nome,
            cliente.cpf,
            cliente.telefone,
            cliente.email,
            cliente.cidade,
            id
        ]);
        return new Cliente_1.Cliente(id, cliente.nome, cliente.cpf, cliente.telefone, cliente.email, cliente.cidade);
    }
    //Remove cliente
    async removeCliente(id) {
        const clienteExistente = await this.buscarClientePorId(id);
        if (!clienteExistente) {
            return null;
        }
        await (0, mysql_1.executarComandoSQL)("DELETE FROM cliente WHERE id_cliente = ?", [id]);
        return clienteExistente;
    }
}
exports.ClienteRepository = ClienteRepository;
