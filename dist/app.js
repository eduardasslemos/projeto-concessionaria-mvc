"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clienteController_1 = require("./controllers/clienteController");
const vendedorController_1 = require("./controllers/vendedorController");
const carroController_1 = require("./controllers/carroController");
const estoqueController_1 = require("./controllers/estoqueController");
const notaFiscalController_1 = require("./controllers/notaFiscalController");
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 3000;
app.use(express_1.default.json());
//Rotas clientes
app.get("/api/clientes", clienteController_1.listarCliente);
app.get("/api/clientes/:id", clienteController_1.buscarClientePorId);
app.post("/api/clientes", clienteController_1.cadastrarCliente);
app.put("/api/clientes/:id", clienteController_1.atualizarCliente);
app.delete("/api/clientes/:id", clienteController_1.removerCliente);
app.get("/api/clientes/notas/:id", clienteController_1.listarNotasCliente);
//Rotas vendedores
app.get("/api/vendedores", vendedorController_1.listaVendedores);
app.get("/api/vendedores/:id", vendedorController_1.pesquisarVendedorPorId);
app.post("/api/vendedores", vendedorController_1.cadastrarVendedor);
app.put("/api/vendedores/:id", vendedorController_1.atualizaVendedor);
app.delete("/api/vendedores/:id", vendedorController_1.removeVendedor);
app.get("/api/vendedores/notas/:id", vendedorController_1.listaNotas);
//Rotas carros
app.get("/api/carros", carroController_1.listarCarros);
app.get("/api/carros/disponiveis", carroController_1.listarDisponiveis);
app.get("/api/carros/:id", carroController_1.buscarCarroPorId);
app.post("/api/carros", carroController_1.cadastrarCarro);
app.put("/api/carros/:id", carroController_1.atualizarCarro);
app.delete("/api/carros/:id", carroController_1.removerCarro);
//Rotas estoque
app.get("/api/estoque", estoqueController_1.listarEstoque);
app.get("/api/estoque/:id", estoqueController_1.buscarEstoquePorId);
app.get("/api/carros/:id_carro", estoqueController_1.buscarPorCarro);
app.post("/api/estoque", estoqueController_1.cadastrarEstoque);
app.put("/api/estoque/:id", estoqueController_1.atualizarEstoque);
app.delete("/api/estoque/:id", estoqueController_1.removerEstoque);
//Rotas notas
app.get("/api/notas", notaFiscalController_1.listaNotasFiscais);
app.get("/api/notas/:id", notaFiscalController_1.pesquisarNotaPorId);
app.post("/api/notas", notaFiscalController_1.cadastrarNotaFiscal);
app.listen(PORT, () => console.log(`API rodando na URL: http://localhost:${PORT}`));
