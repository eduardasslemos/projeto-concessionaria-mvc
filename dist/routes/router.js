"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clienteController_1 = require("../controllers/clienteController");
const vendedorController_1 = require("../controllers/vendedorController");
const carroController_1 = require("../controllers/carroController");
const estoqueController_1 = require("../controllers/estoqueController");
const notaFiscalController_1 = require("../controllers/notaFiscalController");
const router = (0, express_1.Router)();
// Rotas clientes
router.get("/clientes", clienteController_1.listarCliente);
router.get("/clientes/notas/:id", clienteController_1.listarNotasCliente);
router.get("/clientes/:id", clienteController_1.buscarClientePorId);
router.post("/clientes", clienteController_1.cadastrarCliente);
router.put("/clientes/:id", clienteController_1.atualizarCliente);
router.delete("/clientes/:id", clienteController_1.removerCliente);
// Rotas vendedores
router.get("/vendedores", vendedorController_1.listaVendedores);
router.get("/vendedores/notas/:id", vendedorController_1.listaNotas);
router.get("/vendedores/:id", vendedorController_1.pesquisarVendedorPorId);
router.post("/vendedores", vendedorController_1.cadastrarVendedor);
router.put("/vendedores/:id", vendedorController_1.atualizaVendedor);
router.delete("/vendedores/:id", vendedorController_1.removeVendedor);
// Rotas carros
router.get("/carros", carroController_1.listarCarros);
router.get("/carros/disponiveis", carroController_1.listarDisponiveis);
router.get("/carros/:id", carroController_1.buscarCarroPorId);
router.post("/carros", carroController_1.cadastrarCarro);
router.put("/carros/:id", carroController_1.atualizarCarro);
router.delete("/carros/:id", carroController_1.removerCarro);
// Rotas estoque
router.get("/estoque", estoqueController_1.listarEstoque);
router.get("/estoque/carro/:id_carro", estoqueController_1.buscarPorCarro);
router.get("/estoque/:id", estoqueController_1.buscarEstoquePorId);
router.post("/estoque", estoqueController_1.cadastrarEstoque);
router.put("/estoque/:id", estoqueController_1.atualizarEstoque);
router.delete("/estoque/:id", estoqueController_1.removerEstoque);
// Rotas notas fiscais
router.get("/notas", notaFiscalController_1.listaNotasFiscais);
router.get("/notas/:id", notaFiscalController_1.pesquisarNotaPorId);
router.post("/notas", notaFiscalController_1.cadastrarNotaFiscal);
exports.default = router;
