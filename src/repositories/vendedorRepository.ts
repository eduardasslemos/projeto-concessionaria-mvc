import { Vendedor } from "../models/Vendedor";
import { NotaFiscal } from "../models/NotaFiscal";
import { NotaFiscalRepository } from "./notaFiscalRepository";

export class VendedorRepository {
    private static instance: VendedorRepository;
    private vendedorLista: Vendedor[] = [];

    private notaFiscalRepo = NotaFiscalRepository.getInstance();

    private constructor() {}

    public static getInstance(): VendedorRepository {
        if (!this.instance) {
            this.instance = new VendedorRepository();
        }
        return this.instance;
    }

    //listar todos os vendedores
    listaVendedores(): Vendedor[]{
        return this.vendedorLista;
    }

    //retorna vendedor por id
    filtraVendedorPorId(id: number): Vendedor | undefined {
        return this.vendedorLista.find(vendedor => vendedor.id_vendedor === id);
    }

    //cadastra novo vendedor
    insereVendedor(vendedor: Vendedor) {
        this.vendedorLista.push(vendedor);
    }

    //atualiza vendedor
    atualizaVendedor(id: number, vendedor: Vendedor) {
        const indice = this.vendedorLista.findIndex(vendedor => vendedor.id_vendedor === id);
        this.vendedorLista[indice] = vendedor;
    }

    //remove um vendedor
    removeVendedor(id: number) {
        const indice = this.vendedorLista.findIndex(vendedor => vendedor.id_vendedor === id);
        this.vendedorLista.splice(indice, 1);
    }

    //listar notas fiscais
    listaNotasFiscais(id: number): NotaFiscal[] {
        return this.notaFiscalRepo.listaNotaFiscal().filter(nota => nota.id_vendedor === id);
    }
}