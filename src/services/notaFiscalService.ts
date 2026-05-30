import { NotaFiscal } from "../models/NotaFiscal";
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository";
import { ClienteRepository } from "../repositories/clienteRepository";
import { VendedorRepository } from "../repositories/vendedorRepository";
import { CarroRepository } from "../repositories/carroRepository";
import { EstoqueRepository } from "../repositories/estoqueRepository";

export class NotaFiscalService {
    notaFiscalRepository: NotaFiscalRepository = NotaFiscalRepository.getInstance();
    clienteRepository: ClienteRepository = ClienteRepository.getInstance();
    vendedorRepository: VendedorRepository = VendedorRepository.getInstance();
    carroRepository: CarroRepository = CarroRepository.getInstance();
    estoqueRepository: EstoqueRepository = EstoqueRepository.getInstance();

    //listar todas as notas fiscais
    listaNotasFiscais(): NotaFiscal[]{
        return this.notaFiscalRepository.listaNotaFiscal();
    }

    //retorna nota fiscal por id
    filtraNotaPorId(id: any): NotaFiscal | undefined {
        const idNumber: number = parseInt(id, 10);
        return this.notaFiscalRepository.filtraNotaPorId(idNumber);
    }

    //cadastra nova nota fiscal
    cadastrarNotaFiscal (notaData: any): NotaFiscal {
        const {numero_nota, data_emissao, valor_total, id_cliente, id_vendedor, id_carro} = notaData;

        if (!numero_nota || !data_emissao || !valor_total || !id_cliente || !id_vendedor || !id_carro) {
            throw new Error ("Nota fiscal requer número da nota, data da emissão, valor total, id do cliente, id do vendedor e id do carro");
        }

        const notaExistente = this.notaFiscalRepository.filtraNotaPorNumero(numero_nota);

        if(notaExistente){
            throw new Error ("Já existe uma nota fiscal com esse número");
        }

        const dataEmissao = new Date(data_emissao);
        const dataAtual = new Date();

        if(dataEmissao > dataAtual){
            throw new Error ("A data de emissão não pode ser uma data futura");
        }

        if(valor_total <= 0){
            throw new Error ("O valor total deve ser maior que zero");
        }

        const clienteId = this.clienteRepository.buscarClientePorId(id_cliente);

        if(!clienteId){
            throw new Error ("O id do cliente deve existir");
        }

        const vendedorId = this.vendedorRepository.filtraVendedorPorId(id_vendedor);

        if(!vendedorId){
            throw new Error ("O id do vendedor deve existir");
        }

        const carroId = this.carroRepository.buscarPorId(id_carro);

        if(!carroId){
            throw new Error ("O id do carro deve existir");
        }

        const estoque = this.estoqueRepository.listar().find(estoque => estoque.id_carro === id_carro);

        if(!estoque){
            throw new Error ("O estoque do id do carro deve existir");
        } else if(estoque.quantidade <= 0){
            throw new Error ("O estoque do id do carro deve ser maior que 0");
        }

        const novaNotaFiscal = new NotaFiscal(numero_nota, data_emissao, valor_total, id_cliente, id_vendedor, id_carro);
        this.notaFiscalRepository.insereNotaFiscal(novaNotaFiscal);
        this.estoqueRepository.decrementarQuantidade(id_carro);
        return novaNotaFiscal;
    }
}