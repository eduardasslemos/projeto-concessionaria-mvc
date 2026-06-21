import { Vendedor } from "../models/Vendedor";
import { VendedorRepository } from "../repositories/vendedorRepository";
import { NotaFiscal } from "../models/NotaFiscal";
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository";

export class VendedorService {
    private vendedorRepository = VendedorRepository.getInstance();
    private notaFiscalRepository = NotaFiscalRepository.getInstance();

    async listaVendedores(): Promise<Vendedor[]> {
        return await this.vendedorRepository.listaVendedores();
    }

    async consultarVendedorId(id: number): Promise<Vendedor | null> {
        return await this.vendedorRepository.filtraVendedorPorId(id);
    }

    async cadastrarVendedor(vendedorData: any): Promise<Vendedor> {
        const { nome, matricula, comissao_percentual } = vendedorData;

        if (!nome || !matricula || comissao_percentual === undefined) {
        throw new Error("Vendedor requer nome, matrícula e percentual da comissão");
        }

        if (Number(comissao_percentual) < 0 || Number(comissao_percentual) > 30) {
        throw new Error("Percentual da comissão deve ser um número positivo entre 0 e 30");
        }

        const vendedorExistente = await this.vendedorRepository.filtraVendedorPorMatricula(matricula);

        if (vendedorExistente) {
        throw new Error("Já existe um vendedor com essa matrícula");
        }

        const novoVendedor = new Vendedor(null, nome, matricula, Number(comissao_percentual));

        return await this.vendedorRepository.insereVendedor(novoVendedor);
    }

    async atualizaVendedor(id: number, vendedorData: any): Promise<Vendedor> {
        const vendedorExistente = await this.vendedorRepository.filtraVendedorPorId(id);

        if (!vendedorExistente) {
        throw new Error("Vendedor não encontrado");
        }

        const { nome, matricula, comissao_percentual } = vendedorData;

        if (!nome || !matricula || comissao_percentual === undefined) {
        throw new Error("Vendedor requer nome, matrícula e percentual da comissão");
        }

        if (Number(comissao_percentual) < 0 || Number(comissao_percentual) > 30) {
        throw new Error("Percentual da comissão deve ser um número positivo entre 0 e 30");
        }

        const matriculaExistente = await this.vendedorRepository.filtraVendedorPorMatricula(matricula);

        if (matriculaExistente && matriculaExistente.id_vendedor !== id) {
        throw new Error("Já existe um vendedor com essa matrícula");
        }

        const vendedorAtualizado = new Vendedor(id, nome, matricula, Number(comissao_percentual));

        const resultado = await this.vendedorRepository.atualizaVendedor(id, vendedorAtualizado);

        if (!resultado) {
        throw new Error("Erro ao atualizar vendedor");
        }

        return resultado;
    }

    async removeVendedores(id: number): Promise<Vendedor> {
        const vendedorExistente = await this.vendedorRepository.filtraVendedorPorId(id);

        if (!vendedorExistente) {
        throw new Error("Vendedor não encontrado");
        }

        const notas = await this.notaFiscalRepository.listaNotasPorVendedor(id);

        if (notas && notas.length > 0) {
        throw new Error("O vendedor possui notas fiscais vinculadas a ele e não pode ser excluído");
        }

        const vendedorRemovido = await this.vendedorRepository.removeVendedor(id);

        if (!vendedorRemovido) {
        throw new Error("Erro ao remover vendedor");
        }

        return vendedorRemovido;
    }

    async listaNotasFiscais(id: number): Promise<NotaFiscal[]> {
        return await this.notaFiscalRepository.listaNotasPorVendedor(id);
    }
}