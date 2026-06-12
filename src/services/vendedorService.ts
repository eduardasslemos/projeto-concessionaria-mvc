import { Vendedor } from "../models/Vendedor";
import { VendedorRepository } from "../repositories/vendedorRepository";
import { NotaFiscal } from "../models/NotaFiscal";
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository";

export class VendedorService {
    vendedorRepository: VendedorRepository = VendedorRepository.getInstance();
    notaFiscalRepository: NotaFiscalRepository = NotaFiscalRepository.getInstance();

    //lista todos os vendedores
    listaVendedores(): Vendedor[]{
        return this.vendedorRepository.listaVendedores();
    }

    //retorna vendedor por id
    consultarVendedorId (id: any): Vendedor | undefined {
        const idNumber: number = parseInt(id, 10);
        return this.vendedorRepository.filtraVendedorPorId(idNumber);
    }

    //cadastra novo vendedor
    cadastrarVendedor (vendedorData: any): Vendedor {
        const {nome, matricula, comissao_percentual} = vendedorData;

        if (!nome || !matricula || !comissao_percentual) {
            throw new Error ("Vendedor requer nome, matrícula e percentual da comissão");
        }

        if(comissao_percentual < 0 || comissao_percentual > 30){
            throw new Error ("Percentual da comissão deve ser um número positivo entre 0 e 30");
        }

        const vendedorExistente = this.vendedorRepository.filtraVendedorPorMatricula(matricula);

        if(vendedorExistente){
            throw new Error ("Já existe um vendedor com essa matrícula");
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
            throw new Error("Vendedor não encontrado");
        }

        const {nome, matricula, comissao_percentual} = vendedorData;

        if (!nome || !matricula || !comissao_percentual) {
            throw new Error("Vendedor requer nome, matrícula e percentual da comissão");
        }

        const vendedorAtualizado = new Vendedor(nome, matricula, comissao_percentual);
        vendedorAtualizado.id_vendedor = idNumber;
        this.vendedorRepository.atualizaVendedor(idNumber, vendedorAtualizado);

        return vendedorAtualizado;
    }

    //remove um vendedor
    removeVendedores(id:any) {
        const idNumber: number = parseInt(id, 10);
        const notas = this.notaFiscalRepository.listaNotasPorVendedor(idNumber);

        if(notas.length > 0){
            throw new Error("O vendedor possui notas fiscais vinculadas a ele e não pode ser excluído");
        }

        this.vendedorRepository.removeVendedor(id);
    }

    //lista notas fiscais
    listaNotasFiscais(id: number): NotaFiscal[] {
        return this.notaFiscalRepository.listaNotasPorVendedor(id);
    }
}