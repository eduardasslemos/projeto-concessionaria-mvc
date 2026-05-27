import { Request, Response } from "express";
import { EstoqueService } from "../services/estoqueService";

export class EstoqueController {

    private estoqueService = new EstoqueService();

    //Lista todos os estoques
    listar(req: Request,res: Response): void {

        try {
            const estoques = this.estoqueService.listar();
            
            res.status(200).json(estoques);

        } catch (error: any) {
            res.status(400).json({
                message: error.message
            });
        }
    }

    //Busca estoque por id
    buscarPorId(req: Request,res: Response): void {

        try {
            const id = Number(req.params.id);
            const estoque = this.estoqueService.buscarPorId(id);

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
    buscarPorCarro(req: Request,res: Response): void {

        try {
            const id_carro = Number(req.params.id_carro);
            const estoque = this.estoqueService.buscarPorCarro(id_carro);

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
    cadastrarEstoque(req: Request,res: Response): void {

        try {
            const estoque = this.estoqueService.cadastrarEstoque(req.body);

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
    atualizarEstoque(req: Request,res: Response): void {

        try {
            const id = Number(req.params.id);
            const estoqueAtualizado = this.estoqueService.atualizarEstoque(id,req.body);

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
    removerEstoque(req: Request,res: Response): void {

        try {
            const id = Number(req.params.id);
            const estoqueRemovido = this.estoqueService.removerEstoque(id);

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
}