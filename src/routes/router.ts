import { Router } from "express";

import {listarCliente,buscarClientePorId,cadastrarCliente,atualizarCliente,removerCliente,listarNotasCliente,} from "../controllers/clienteController";

import {listaVendedores,pesquisarVendedorPorId,cadastrarVendedor,atualizaVendedor,removeVendedor,listaNotas,} from "../controllers/vendedorController";

import {listarCarros,buscarCarroPorId,cadastrarCarro,listarDisponiveis,atualizarCarro,removerCarro,} from "../controllers/carroController";

import {listarEstoque,buscarEstoquePorId,buscarPorCarro,cadastrarEstoque,atualizarEstoque,removerEstoque,} from "../controllers/estoqueController";

import {listaNotasFiscais,pesquisarNotaPorId,cadastrarNotaFiscal,} from "../controllers/notaFiscalController";

const router = Router();

// Rotas clientes
router.get("/clientes", listarCliente);
router.get("/clientes/notas/:id", listarNotasCliente);
router.get("/clientes/:id", buscarClientePorId);
router.post("/clientes", cadastrarCliente);
router.put("/clientes/:id", atualizarCliente);
router.delete("/clientes/:id", removerCliente);

// Rotas vendedores
router.get("/vendedores", listaVendedores);
router.get("/vendedores/notas/:id", listaNotas);
router.get("/vendedores/:id", pesquisarVendedorPorId);
router.post("/vendedores", cadastrarVendedor);
router.put("/vendedores/:id", atualizaVendedor);
router.delete("/vendedores/:id", removeVendedor);

// Rotas carros
router.get("/carros", listarCarros);
router.get("/carros/disponiveis", listarDisponiveis);
router.get("/carros/:id", buscarCarroPorId);
router.post("/carros", cadastrarCarro);
router.put("/carros/:id", atualizarCarro);
router.delete("/carros/:id", removerCarro);

// Rotas estoque
router.get("/estoque", listarEstoque);
router.get("/estoque/carros/:id_carro", buscarPorCarro);
router.get("/estoque/:id", buscarEstoquePorId);
router.post("/estoque", cadastrarEstoque);
router.put("/estoque/:id", atualizarEstoque);
router.delete("/estoque/:id", removerEstoque);

// Rotas notas fiscais
router.get("/notas", listaNotasFiscais);
router.get("/notas/:id", pesquisarNotaPorId);
router.post("/notas", cadastrarNotaFiscal);

export default router;