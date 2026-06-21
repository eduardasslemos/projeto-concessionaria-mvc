"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executarComandoSQL = executarComandoSQL;
exports.inicializarBanco = inicializarBanco;
const mysql2_1 = __importDefault(require("mysql2"));
// Entra os repositorios
const carroRepository_1 = require("../repositories/carroRepository");
//import { EstoqueRepository } from "../repositories/estoqueRepository";
const vendedorRepository_1 = require("../repositories/vendedorRepository");
const notaFiscalRepository_1 = require("../repositories/notaFiscalRepository");
const dbConfig = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "ifsp",
    database: "concessionaria",
};
const mysqlConnection = mysql2_1.default.createConnection(dbConfig);
mysqlConnection.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
        throw err;
    }
    console.log("Conexão bem-sucedida com o banco de dados MySQL.");
});
function executarComandoSQL(query, valores = []) {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(query, valores, (err, resultado) => {
            if (err) {
                console.error("Erro ao executar a query:", err);
                reject(err);
                return;
            }
            resolve(resultado);
        });
    });
}
async function inicializarBanco() {
    console.log("Sincronizando schemas do banco de dados...");
    const schemas = [
        // Quando criarmos os repositories, ficará assim:
        carroRepository_1.CarroRepository.getCreateTableQuery(),
        //EstoqueRepository.getCreateTableQuery(),
        vendedorRepository_1.VendedorRepository.getCreateTableQuery(),
        notaFiscalRepository_1.NotaFiscalRepository.getCreateTableQuery(),
    ];
    try {
        await executarComandoSQL(`USE ${dbConfig.database}`, []);
        console.log(`Conectado ao schema: ${dbConfig.database}`);
        for (const query of schemas) {
            await executarComandoSQL(query, []);
        }
        console.log("Todos os repositórios foram inicializados com sucesso.");
    }
    catch (err) {
        console.error("Erro crítico na sincronização dos repositórios:", err);
        process.exit(1);
    }
}
