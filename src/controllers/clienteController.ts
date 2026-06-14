import { Request, Response } from "express";
import { ClienteService } from "../services/clienteService";

     const clienteService = new ClienteService();

    //listar clientes
    export function listarCliente(req: Request, res: Response): void {

        try {
            const cliente = clienteService.listarCliente();

            res.status(200).json(cliente); 

            } catch (error: any) {
                res.status(400).json({
                mensagem: error.message
                });
                return;
            }

        }   
    
    //buscar cliente por id
    export function buscarClientePorId (req: Request, res: Response): void {

        try {
            const id = Number(req.params.id);
            const clienteId = clienteService.buscarClienteId(id);

            if (!clienteId) {
                res.status(404).json({
                    mensagem: "Cliente não encontrado"
                });
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
    export function cadastrarCliente(req: Request, res: Response): void {
    try {
        const novoCliente = clienteService.cadastrarCliente(req.body);
        res.status(201).json({
            mensagem: "Cliente cadastrado com sucesso!",
            cliente: novoCliente
        });
    } catch (error: any) {
        if (error.message === "Já existe um cliente com esse CPF") {
            res.status(409).json({ message: error.message });
            return;
        }
        res.status(400).json({ message: error.message });
    }
    }

    //atualizar cliente
    export function atualizarCliente(req: Request, res: Response): void {
        try {
            const id = Number(req.params.id);
            const clienteAtualizado = clienteService.atualizarCliente(id, req.body);
            res.status(200).json({
                mensagem: "Cliente atualizado com sucesso!",
                cliente: clienteAtualizado
            });
        } catch (error: any) {
            if (error.message === "O cliente não foi encontrado") {
                res.status(404).json({message: error.message});
                return;
            }
            res.status(400).json({message: error.message});
        }

    }
  
    //remover cliente
    export function removerCliente(req: Request, res: Response): void {
        try {
            const id = Number(req.params.id);

            const clientePesquisado = clienteService.buscarClienteId(id);

            if(!clientePesquisado){
                res.status(404).json({
                    mensagem: "Cliente não encontrado"
                });
                return;
            }

            const notasFiscais = clienteService.listarNotasCliente(id);

            if (notasFiscais && notasFiscais.length > 0) {
            res.status(422).json({ 
                message: "Não é possível remover cliente com notas fiscais associadas"
             });
            return;
            }

            const clienteRemovido = clienteService.removerCliente(id);
            res.status(200).json(clienteRemovido);

            } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    //listar notas fiscais de um cliente
    export function listarNotasCliente(req: Request, res: Response): void {
        try{
            const id = Number(req.params.id);

            const cliente = clienteService.buscarClienteId(id);

            if(!cliente){
                res.status(404).json({
                    mensagem: "Cliente não encontrado"
                });
                return;
            }

            const notasFiscais = clienteService.listarNotasCliente(id);
            res.status(200).json({
                mensagem: "Notas fiscais do cliente encontradas com sucesso!",
                notasFiscais: notasFiscais
            });
        }catch (error: any) {
            res.status(400).json({message: error.message});
        }

    }
