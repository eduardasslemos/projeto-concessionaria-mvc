import { Request, Response } from "express";
import { NotaFiscalService } from "../services/notaFiscalService";
const notaFiscalService = new NotaFiscalService();

//listar todas as notas fiscais
export function listaNotasFiscais (req: Request, res: Response) {
    try {
        const notasFiscais = notaFiscalService.listaNotasFiscais();

        if(notasFiscais.length === 0){
            res.status(200).json({
                mensagem: "Lista vazia",
                notasFiscais: notasFiscais
            });
            return;
        }

        res.status(200).json (
        {
        mensagem: "Notas fiscais encontradas com sucesso!",
        notasFiscais: notasFiscais
        }
        );
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
};

//retorna nota fiscal por id
export function pesquisarNotaPorId (req: Request, res: Response) {
    try {
        let id = Number(req.params.id);

        const notaPesquisada = notaFiscalService.filtraNotaPorId(id);

        if(!notaPesquisada){
            res.status(404).json({
                mensagem: "Nota fiscal não encontrada"
            });
            return;
        }

        res.status(200).json (
        {
        mensagem: "Nota fiscal encontrada com sucesso!",
        notaFiscal: notaPesquisada
        }
        );
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
};

//cadastra nova nota fiscal
export function cadastrarNotaFiscal (req: Request, res: Response) {
    try {
        const novaNota = notaFiscalService.cadastrarNotaFiscal(req.body);

        res.status(201).json (
        {
        mensagem: "Nota fiscal adicionado com sucesso!",
        notaFiscal: novaNota
        }
        );
    } catch (error: any) {
        if(error.message == "Já existe uma nota fiscal com esse número"){
            return res.status(409).json({message: error.message});
        }

        if(error.message == "O estoque do id do carro deve ser maior que 0"){
            return res.status(422).json({message: error.message});
        }

        res.status(400).json({message: error.message});
    }
};