import express from "express";
import {listarCliente, buscarClientePorId,cadastrarCliente,atualizarCliente, removerCliente, listarNotasCliente } from "./controllers/clienteController";
import {listaVendedores,pesquisarVendedorPorId, cadastrarVendedor,atualizaVendedor, removeVendedor,listaNotas} from "./controllers/vendedorController";
import {listarCarros,buscarCarroPorId, cadastrarCarro,listarDisponiveis, atualizarCarro,removerCarro  } from "./controllers/carroController";
import {listarEstoque,buscarEstoquePorId, buscarPorCarro,cadastrarEstoque,atualizarEstoque, removerEstoque } from "./controllers/estoqueController";
import {listaNotasFiscais,pesquisarNotaPorId, cadastrarNotaFiscal } from "./controllers/notaFiscalController";

const app = express();
const PORT = process.env.PORT ?? 3000;
app.use(express.json());



//Rotas clientes
app.get("/api/clientes",listarCliente);
app.get("/api/clientes/:id", buscarClientePorId);
app.post("/api/clientes",cadastrarCliente);
app.put("/api/clientes/:id",atualizarCliente);
app.delete("/api/clientes/:id",removerCliente);
app.get("/api/clientes/notas/:id",listarNotasCliente);

//Rotas vendedores
app.get("/api/vendedores",listaVendedores);
app.get("/api/vendedores/:id",pesquisarVendedorPorId);
app.post("/api/vendedores",cadastrarVendedor);
app.put("/api/vendedores/:id",atualizaVendedor);
app.delete("/api/vendedores/:id",removeVendedor);
app.get("/api/vendedores/notas/:id",listaNotas);

//Rotas carros
app.get("/api/carros",listarCarros);
app.get("/api/carros/:id",buscarCarroPorId);
app.get("/api/carros/disponiveis",listarDisponiveis);
app.post("/api/carros",cadastrarCarro);
app.put("/api/carros/:id",atualizarCarro);
app.delete("/api/carros/:id",removerCarro);

//Rotas estoque
app.get("/api/estoque",listarEstoque);
app.get("/api/estoque/:id", buscarEstoquePorId);
app.get("/api/carros/:id_carro",buscarPorCarro);
app.post("/api/estoque", cadastrarEstoque);
app.put("/api/estoque/:id", atualizarEstoque);
app.delete("/api/estoque/:id", removerEstoque);

//Rotas notas
app.get("/api/notas",listaNotasFiscais);
app.get("/api/notas/:id",pesquisarNotaPorId);
app.post("/api/notas",cadastrarNotaFiscal);

app.listen(PORT, () => console.log(`API rodando na URL: http://localhost:${PORT}`));