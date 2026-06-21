import { Request, Response } from "express";
import { ClienteService } from "../services/clienteService";

     const clienteService = new ClienteService();

    //listar clientes
    export async function listarCliente(req: Request, res: Response) {
        try {
            const clientes = await clienteService.listarCliente();

            res.status(200).json(
            {
            mensagem : "Clientes encontrados com sucesso!", 
            cliente: clientes
            }
            ); 

            } catch (error: any) {
                res.status(400).json({ mensagem: error.message });
            }

        }   
    
    //buscar cliente por id
    export async function buscarClientePorId (req: Request, res: Response){
        try {
            const id = Number(req.params.id);
            const clienteId = await clienteService.buscarClienteId(id);

            if (!clienteId) {
                res.status(404).json({mensagem: "Cliente não encontrado"});
                return;
            }
            res.status(200).json(
            {
            mensagem: "Cliente encontrado com sucesso!",
            cliente: clienteId
            }
            );
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    //cadastrar cliente 
    export async function cadastrarCliente(req: Request, res: Response) {
         try {
             const novoCliente = await clienteService.cadastrarCliente(req.body);

             res.status(201).json(
            {
            mensagem: "Cliente cadastrado com sucesso!",
            cliente: novoCliente
            }
            );
    } catch (error: any) {
        if (error.message === "Já existe um cliente com esse CPF") {
            return res.status(409).json({ message: error.message });
        }
        res.status(400).json({message: error.message});
        }
    }

    //atualizar cliente
    export async function atualizarCliente(req: Request, res: Response){
        try {
            const id = Number(req.params.id);
            const clienteAtualizado = await clienteService.atualizarCliente(id, req.body);

            res.status(200).json(
            {
            mensagem: "Cliente atualizado com sucesso!",
            cliente: clienteAtualizado
            }
            );
        } catch (error: any) {
            if (error.message === "O cliente não foi encontrado") {
                return res.status(404).json({message: error.message});
            }
            res.status(400).json({message: error.message});
        }

    }
  
    //remover cliente
    export async function removerCliente(req: Request, res: Response){
        try {
            const id = Number(req.params.id);

            const clientePesquisado = await clienteService.buscarClienteId(id);

            if(!clientePesquisado){
                res.status(404).json({
                    mensagem: "Cliente não encontrado",
                    cliente: clientePesquisado
                });
                return;
            }

            await clienteService.removerCliente(id);

            res.status(200).json(
            {
            mensagem: "Cliente removido com sucesso!",
            }
            )
        }catch (error: any){
            if(error.message === "Não é possível remover cliente com notas fiscais associadas"){
                return res.status(422).json({message: error.message});
            }

            res.status(400).json({ message: error.message });
        }
    }

    //listar notas fiscais de um cliente
    export async function listarNotasCliente(req: Request, res: Response){
        try{
            const id = Number(req.params.id);

            const cliente = await clienteService.buscarClienteId(id);

            if(!cliente){
                res.status(404).json({
                    mensagem: "Cliente não encontrado"
                });
                return;
            }

            const notasFiscais = await clienteService.listarNotasCliente(id);
            res.status(200).json(
            {
            mensagem: "Notas fiscais do cliente encontradas com sucesso!",
            notasFiscais: notasFiscais
            }
            );
        }catch (error: any) {
            res.status(400).json({message: error.message});
        }

    }
