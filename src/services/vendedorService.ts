import { Vendedor } from "../models/Vendedor";
import { VendedorRepository } from "../repositories/vendedorRepository";
import { NotaFiscal } from "../models/NotaFiscal";

export class VendedorService {
    vendedorRepository: VendedorRepository = VendedorRepository.getInstance();

    //listar todos os vendedores
    listaVendedores(): Vendedor[]{
        return this.vendedorRepository.listaVendedores();
    }

    //retorna vendedor por id
    consultarVendedorId (id: any): Vendedor | undefined {
        const idNumber: number = parseInt(id, 10);
        console.log(id);
        return this.vendedorRepository.filtraVendedorPorId(idNumber);
    }

    //cadastra novo vendedor
    cadastrarVendedor (vendedorData: any): Vendedor {
        const {nome, matricula, comissao_percentual} = vendedorData;
        if (!nome || !matricula || !comissao_percentual) {
            throw new Error ("Informacoes incompletas");
        }
        const novoVendedor = new Vendedor(nome, matricula, comissao_percentual);
        this.vendedorRepository.insereVendedor(novoVendedor);
        return novoVendedor;
    }

    //atualiza vendedor
    atualizaVendedor(id:any, vendedorData: any): Vendedor {
        const idNumber: number = parseInt(id, 10);
        const vendedorExistente = this.vendedorRepository.filtraVendedorPorId(idNumber);

        if (!vendedorExistente) {
            throw new Error("Vendedor nao encontrado");
        }

        const {nome, matricula, comissao_percentual} = vendedorData;

        if (!nome || !matricula || !comissao_percentual) {
            throw new Error("Informacoes incompletas");
        }

        const vendedorAtualizado = new Vendedor(nome, matricula, comissao_percentual);
        vendedorAtualizado.id_vendedor = idNumber;
        this.vendedorRepository.atualizaVendedor(idNumber, vendedorAtualizado);

        return vendedorAtualizado;
    }

    //remove um vendedor
    removeVendedores(id:any) {
        this.vendedorRepository.removeVendedor(id);
    }

    //listar notas fiscais
    listaNotasFiscais(id: any): NotaFiscal[]{
        return this.vendedorRepository.listaNotasFiscais(id);
    }
}