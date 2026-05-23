import{Request, Response} from "express";
import {CarroService} from "../services/carroService";

export class CarroController{
    private carroService = new CarroService();

    //Lista todos os carros
    listar(req: Request, res:Response){
        try{
            const carros = this.carroService.listar();

            res.status(200).json(carros);
        }catch (error: any) {

            res.status(400).json({
                message: error.message
            });
        }
    }

    //Busca carro por id
    buscarPorId(req: Request, res: Response): void {
        try {
            const id = Number(req.params.id);

            const carro = this.carroService.buscarPorId(id);

            if (!carro) {
                res.status(404).json({
                    message: "Carro nao encontrado"
                });

                return;
            }

            res.status(200).json(carro);

        } catch (error: any) {
            res.status(400).json({
                message: error.message
            });
        }
    }

     //Cadastra carro
    cadastrarCarro(req: Request, res: Response): void {
        try {
            const carro = this.carroService.CadastrarCarro(req.body);

            res.status(201).json(carro);

        } catch (error: any) {
            res.status(400).json({
                message: error.message
            });
        }
    }

    //Atualiza carro
    atualizarCarro(req: Request, res: Response): void {
        try {
            const id = Number(req.params.id);

            const carroAtualizado = this.carroService.atualizarCarro(id,req.body);

            res.status(200).json(carroAtualizado);

        } catch (error: any) {
            res.status(400).json({
                message: error.message
            });
        }
    }

     //Remove carro
    removerCarro(req: Request, res: Response): void {
        try {
            const id = Number(req.params.id);

            const carroRemovido = this.carroService.removerCarro(id);

            res.status(200).json(carroRemovido);

        } catch (error: any) {
            res.status(400).json({
                message: error.message
            });
        }
    }
}
