import { Request, Response } from "express";
import { CarroService } from "../services/carroService";
const carroService = new CarroService();

//Lista todos os carros
export function listarCarros(req: Request, res: Response): void {

    try {
        const carros = carroService.listar();

        res.status(200).json(carros);

    } catch (error: any) {
            res.status(400).json({
            message: error.message
        });
    }
}

//Lista carros disponíveis
export function listarDisponiveis(req: Request, res: Response): void {

    try {
        const carros = carroService.listarDisponiveis();

        if (!carros || carros.length === 0) {
            res.status(422).json({
                message: "Nenhum carro disponível em estoque."
            });
            return;
        }

        res.status(200).json(carros);

    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
}


//Busca carro por id
export function buscarCarroPorId(req: Request, res: Response): void {

    try {
        const id =Number(req.params.id);
        const carro = carroService.buscarPorId(id);

        if (!carro) {
            res.status(404).json({
                message: "Carro não encontrado"
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
export function cadastrarCarro(req: Request, res: Response): void {

    try {
        const carro = carroService.CadastrarCarro(req.body);

        res.status(201).json(carro);

    } catch (error: any) {
        if (error.message ==="Já existe um carro com essa placa") {
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

//Atualiza carro
export function atualizarCarro(req: Request, res: Response): void {

    try {
        const id =Number(req.params.id);
        const carroAtualizado = carroService.atualizarCarro(id,req.body);

        res.status(200).json(carroAtualizado);

    } catch (error: any) {

        if (error.message ==="Carro não encontrado") {

            res.status(404).json({
                message: error.message
            });

            return;
        }
        if (error.message ==="Já existe um carro com essa placa") {

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

//Remove carro
export function removerCarro(req: Request, res: Response): void {

    try {
        const id =Number(req.params.id);
        const carroRemovido = carroService.removerCarro(id);

        res.status(200).json(carroRemovido);

    } catch (error: any) {

        if (error.message ==="Carro não encontrado") {

            res.status(404).json({
                message: error.message
            });

            return;
        }

        if (error.message.includes("estoque") || error.message.includes("nota fiscal")) {
            res.status(422).json({
                message: error.message
            });

            return;
        }

        res.status(400).json({
            message: error.message
        });
    }
}