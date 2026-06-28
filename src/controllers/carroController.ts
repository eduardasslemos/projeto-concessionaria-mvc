import { Request, Response } from "express";
import { CarroService } from "../services/carroService";

const carroService = new CarroService();

// Lista todos os carros
export async function listarCarros(req: Request, res: Response) {
  try {
    const carros = await carroService.listar();

    return res.status(200).json(carros);
  } catch (error) {
    return res.status(500).json({
      erro: "Erro interno ao listar carros",
    });
  }
}

// Busca carro por ID
export async function buscarCarroPorId(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        erro: "ID inválido",
      });
    }

    const carro = await carroService.buscarPorId(id);

    if (!carro) {
      return res.status(404).json({
        erro: "Carro não encontrado",
      });
    }

    return res.status(200).json(carro);
  } catch (error) {
    return res.status(500).json({
      erro: "Erro interno ao buscar carro",
    });
  }
}

// Lista carros disponíveis
export async function listarDisponiveis(req: Request, res: Response) {
  try {
    const carrosDisponiveis = await carroService.listarDisponiveis();

    return res.status(200).json(carrosDisponiveis);
  } catch (error) {
    return res.status(500).json({
      erro: "Erro interno ao listar carros disponíveis",
    });
  }
}

// Cadastra novo carro
export async function cadastrarCarro(req: Request, res: Response) {
  try {
    const novoCarro = await carroService.CadastrarCarro(req.body);

    return res.status(201).json(novoCarro);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Já existe um carro com essa placa") {
        return res.status(409).json({ erro: error.message });
      }
      return res.status(400).json({
        erro: error.message,
      });
    }

    return res.status(500).json({
      erro: "Erro interno ao cadastrar carro",
    });
  }
}

// Atualiza carro
export async function atualizarCarro(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        erro: "ID inválido",
      });
    }

    const carroAtualizado = await carroService.atualizarCarro(id, req.body);

    return res.status(200).json(carroAtualizado);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Carro não encontrado") {
        return res.status(404).json({
          erro: error.message,
        });
      }

      if (error.message === "Já existe um carro com essa placa") {
        return res.status(409).json({
          erro: error.message
        });
      }

      return res.status(400).json({
        erro: error.message,
      });
    }

    return res.status(500).json({
      erro: "Erro interno ao atualizar carro",
    });
  }
}

// Remove carro
export async function removerCarro(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        erro: "ID inválido",
      });
    }

    const carroRemovido = await carroService.removerCarro(id);

    return res.status(200).json(carroRemovido);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Carro não encontrado") {
        return res.status(404).json({
          erro: error.message,
        });
      }

      if (
        error.message === "Não se pode remover carro com estoque vinculado" ||
        error.message === "Não se pode remover carro com nota fiscal vinculada"
      ) {
        return res.status(422).json({ erro: error.message });
      }

      return res.status(400).json({
        erro: error.message,
      });
    }

    return res.status(500).json({
      erro: "Erro interno ao remover carro",
    });
  }
}