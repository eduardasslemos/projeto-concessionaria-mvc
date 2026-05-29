import { Request, Response } from "express";
import { EstoqueService } from "../services/estoqueService";
const estoqueService = new EstoqueService(); 

//Lista todos os estoques
export function listarEstoque(req: Request,res: Response): void {

    try {
        const estoques = estoqueService.listar();
        
        res.status(200).json(estoques);

    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
}

//Busca estoque por id
export function buscarEstoquePorId(req: Request,res: Response): void {

    try {
        const id = Number(req.params.id);
        const estoque = estoqueService.buscarPorId(id);

        if (!estoque) {
            res.status(404).json({
                message:"Estoque não encontrado"
            });

            return;
        }

        res.status(200).json(estoque);

    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
}

//Busca estoque pelo carro
export function buscarPorCarro(req: Request,res: Response): void {

    try {
        const id_carro = Number(req.params.id_carro);
        const estoque = estoqueService.buscarPorCarro(id_carro);

        if (!estoque) {
            res.status(404).json({
                message:"Estoque do carro não encontrado"
            });
            return;
        }

        res.status(200).json(estoque);

    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
}

//Cadastra estoque
export function cadastrarEstoque(req: Request,res: Response): void {

    try {
        const estoque = estoqueService.cadastrarEstoque(req.body);

        res.status(201).json(estoque);

    } catch (error: any) {
        
        if (
            error.message.includes("Já existe estoque")
        ) {
            res.status(409).json({
                message: error.message
            });

            return;
        }

        res.status(400).json({
            message: error.message
        });
    }
}

//Atualiza estoque
export function atualizarEstoque(req: Request,res: Response): void {

    try {
        const id = Number(req.params.id);
        const estoqueAtualizado = estoqueService.atualizarEstoque(id,req.body);

        res.status(200).json(estoqueAtualizado);

    } catch (error: any) {

        if (error.message.includes("não encontrado")) {
            res.status(404).json({
                message: error.message
            });

            return;
        }

        res.status(400).json({
            message: error.message
        });
    }
}

//Remove estoque
export function removerEstoque(req: Request,res: Response): void {

    try {
        const id = Number(req.params.id);
        const estoqueRemovido = estoqueService.removerEstoque(id);

        res.status(200).json(estoqueRemovido);

    } catch (error: any) {

        if (error.message.includes("não encontrado")) {
            res.status(404).json({
                message: error.message
            });

            return;
        }

        res.status(400).json({
            message: error.message
        });
    }
}