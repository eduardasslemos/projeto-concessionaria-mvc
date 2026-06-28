import { Request, Response } from "express";
import { EstoqueService } from "../services/estoqueService";

const estoqueService = new EstoqueService();

// Lista todos os estoques
export async function listarEstoque(req: Request, res: Response): Promise<void> {
  try {
    const estoques = await estoqueService.listar();

    res.status(200).json(estoques);
  } catch (error: any) {
    res.status(500).json({
      message: "Erro interno ao listar estoques",
    });
  }
}

// Busca estoque por id
export async function buscarEstoquePorId(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        message: "ID inválido",
      });
      return;
    }

    const estoque = await estoqueService.buscarPorId(id);

    if (!estoque) {
      res.status(404).json({
        message: "Estoque não encontrado",
      });
      return;
    }

    res.status(200).json(estoque);
  } catch (error: any) {
    res.status(500).json({
      message: "Erro interno ao buscar estoque",
    });
  }
}

// Busca estoque pelo carro
export async function buscarPorCarro(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id_carro = Number(req.params.id_carro);

    if (isNaN(id_carro)) {
      res.status(400).json({
        message: "ID do carro inválido",
      });
      return;
    }

    const estoque = await estoqueService.buscarPorCarro(id_carro);

    if (!estoque) {
      res.status(404).json({
        message: "Estoque do carro não encontrado",
      });
      return;
    }

    res.status(200).json(estoque);
  } catch (error: any) {
    res.status(500).json({
      message: "Erro interno ao buscar estoque do carro",
    });
  }
}

// Cadastra estoque
export async function cadastrarEstoque(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const estoque = await estoqueService.cadastrarEstoque(req.body);

    res.status(201).json(estoque);
  } catch (error: any) {
    if (error.message.includes("Já existe estoque")) {
      res.status(409).json({
        message: error.message,
      });
      return;
    }

    if (error.message.includes("Carro não encontrado")) {
      res.status(404).json({
        message: error.message,
      });
      return;
    }

    res.status(400).json({
      message: error.message,
    });
  }
}

// Atualiza estoque
export async function atualizarEstoque(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        message: "ID inválido",
      });
      return;
    }

    const estoqueAtualizado = await estoqueService.atualizarEstoque(
      id,
      req.body
    );

    res.status(200).json(estoqueAtualizado);
  } catch (error: any) {
    if (error.message.includes("não encontrado")) {
      res.status(404).json({
        message: error.message,
      });
      return;
    }

    res.status(400).json({
      message: error.message,
    });
  }
}

// Remove estoque
export async function removerEstoque(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        message: "ID inválido",
      });
      return;
    }

    const estoqueRemovido = await estoqueService.removerEstoque(id);

    res.status(200).json(estoqueRemovido,);
  } catch (error: any) {
    if (error.message.includes("não encontrado")) {
      res.status(404).json({
        message: error.message,
      });
      return;
    }

    res.status(400).json({
      message: error.message,
    });
  }
}