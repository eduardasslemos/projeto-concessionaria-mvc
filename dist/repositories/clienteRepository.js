"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteRepository = void 0;
const notaFiscalRepository_1 = require("./notaFiscalRepository");
class ClienteRepository {
    static instance;
    cliente = [];
    notaFiscalRepository = notaFiscalRepository_1.NotaFiscalRepository.getInstance(); //perguntar duda
    // Singleton: garante que só existe UMA instância do repository
    static getInstance() {
        if (!ClienteRepository.instance) {
            ClienteRepository.instance = new ClienteRepository();
        }
        return ClienteRepository.instance;
    }
    //Listar clientes 
    listarCliente() {
        return this.cliente;
    }
    //Buscar por id
    buscarClientePorId(id) {
        return this.cliente.find(cliente => cliente.id_cliente === id);
    }
    //Verfica duplicidade no cpf
    verficarClientePorCpf(cpf) {
        return this.cliente.find(cliente => cliente.cpf === cpf);
    }
    //Cadastrar cliente 
    cadastrarCliente(cliente) {
        this.cliente.push(cliente);
    }
    //Atualizar dados do cliente
    atualizarDadosCliente(id, cliente) {
        const indice = this.cliente.findIndex(cliente => cliente.id_cliente === id);
        this.cliente[indice] = cliente;
    }
    //Remove cliente
    removeCliente(id) {
        const indice = this.cliente.findIndex(cliente => cliente.id_cliente === id);
        if (indice === -1) {
            return undefined;
        }
        return this.cliente.splice(indice, 1)[0];
    }
}
exports.ClienteRepository = ClienteRepository;
