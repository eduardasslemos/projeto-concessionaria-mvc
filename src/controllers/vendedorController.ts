import { Request, Response } from "express";
import { VendedorService } from "../services/vendedorService";
const vendedorService = new VendedorService();

//lista todos os vendedores
export async function listaVendedores (req: Request, res: Response) {
    try {
        const vendedores = await vendedorService.listaVendedores();

        return res.status(200).json(vendedores);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
};

//retorna vendedor por id
export async function pesquisarVendedorPorId (req: Request, res: Response) {
    try {
        let id = Number(req.params.id);

        const vendedorPesquisado = await vendedorService.consultarVendedorId(id);

        if(!vendedorPesquisado){
            res.status(404).json({
                mensagem: "Vendedor não encontrado"
            });
            return;
        }

        return res.status(200).json(vendedorPesquisado);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
};

//cadastra novo vendedor
export async function cadastrarVendedor (req: Request, res: Response) {
    try {
        const novoVendedor = await vendedorService.cadastrarVendedor(req.body);

        return res.status(201).json(novoVendedor);
    } catch (error: any) {
        if(error.message == "Já existe um vendedor com essa matrícula"){
            return res.status(409).json({message: error.message});
        }

        res.status(400).json({message: error.message});
    }
};

//atualiza vendedor
export async function atualizaVendedor (req: Request, res: Response) {
    try {
        let id = Number(req.params.id);
        
        const vendedor = await vendedorService.atualizaVendedor(id, req.body);

        return res.status(200).json(vendedor);
    } catch (error: any) {
        if(error.message == "Vendedor não encontrado"){
            return res.status(404).json({message: error.message});
        }

        res.status(400).json({message: error.message});
    }
};

//remove um vendedor
export async function removeVendedor (req: Request, res: Response) {
    try {
        let id = Number(req.params.id);

        const vendedorPesquisado = await vendedorService.consultarVendedorId(id);

        if(!vendedorPesquisado){
            res.status(404).json({
                mensagem: "Vendedor não encontrado"
            });
            return;
        }
        
        const vendedorRemovido = await vendedorService.removeVendedores(id);

        res.status(200).json (vendedorRemovido);
    } catch (error: any) {
        if(error.message == "O vendedor possui notas fiscais vinculadas a ele e não pode ser excluído"){
            return res.status(422).json({message: error.message});
        }

        res.status(400).json({message: error.message});
    }
};

//lista notas fiscais
export async function listaNotas (req: Request, res: Response) {
    try {
        let id = Number(req.params.id);

        const vendedorPesquisado = await vendedorService.consultarVendedorId(id);

        if(!vendedorPesquisado){
            res.status(404).json({
                mensagem: "Vendedor não encontrado"
            });
            return;
        }

        const notasFiscais = await vendedorService.listaNotasFiscais(id);

        res.status(200).json (notasFiscais);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
};