import { Request, Response } from "express";
import { NotaFiscalService } from "../services/notaFiscalService";
const notaFiscalService = new NotaFiscalService();

//listar todas as notas fiscais
export async function listaNotasFiscais(req: Request, res: Response) {
    try {
        const notasFiscais = await notaFiscalService.listaNotasFiscais();

        res.status(200).json(notasFiscais);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

//retorna nota fiscal por id
export async function pesquisarNotaPorId(req: Request, res: Response) {
    try {
        let id = Number(req.params.id);

        const notaPesquisada = await notaFiscalService.filtraNotaPorId(id);

        if (!notaPesquisada) {
            res.status(404).json({
                mensagem: "Nota fiscal não encontrada"
            });
            return;
        }

        res.status(200).json(notaPesquisada);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

//cadastra nova nota fiscal
export async function cadastrarNotaFiscal(req: Request, res: Response) {
    try {
        const novaNota = await notaFiscalService.cadastrarNotaFiscal(req.body);

        res.status(201).json(novaNota);
    } catch (error: any) {
        if (error.message == "Já existe uma nota fiscal com esse número") {
            return res.status(409).json({ message: error.message });
        }

        if (error.message == "O estoque do id do carro deve ser maior que 0") {
            return res.status(422).json({ message: error.message });
        }

        res.status(400).json({ message: error.message });
    }
};