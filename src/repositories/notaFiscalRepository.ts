import { NotaFiscal } from "../models/NotaFiscal";
import { Estoque } from "../models/Estoque";
import { EstoqueRepository } from "../repositories/estoqueRepository";

export class NotaFiscalRepository {
    private static instance: NotaFiscalRepository;
    private notasLista: NotaFiscal[] = [];
    
    private estoqueRepo = EstoqueRepository.getInstance();

    private constructor() {}

    public static getInstance(): NotaFiscalRepository {
        if (!this.instance) {
            this.instance = new NotaFiscalRepository();
        }
        return this.instance;
    }

    //listar todas as notas fiscais
    listaNotaFiscal(): NotaFiscal[]{
        return this.notasLista;
    }

    //retorna nota fiscal por id
    filtraNotaPorId(id: number): NotaFiscal | undefined {
        return this.notasLista.find(nota => nota.id_nota === id);
    }

    //cadastra nova nota fiscal 
    insereNotaFiscal(notaFiscal: NotaFiscal) {
        this.notasLista.push(notaFiscal);
    }

    //retorna nota fiscal por numero
    filtraNotaPorNumero(numero_nota: string): NotaFiscal | undefined {
        return this.notasLista.find(nota => nota.numero_nota === numero_nota);
    }
}