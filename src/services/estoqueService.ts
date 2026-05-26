import { Estoque } from "../models/Estoque";
import { CarroRepository } from "../repositories/carroRepository";
import { EstoqueRepository } from "../repositories/estoqueRepository";

export class EstoqueService {

    private estoqueRepository = EstoqueRepository.getInstance();
    private carroRepository = new CarroRepository();

    //Lista todos os registros
    listar(): Estoque[] {
        return this.estoqueRepository.listar();
    }

    //Busca estoque por id
    buscarPorId(id: number): Estoque | undefined {
        return this.estoqueRepository.buscarPorId(id);
    }

    //Busca estoque por carro
    buscarPorCarro(id_carro: number): Estoque | undefined {
        return this.estoqueRepository.buscarPorCarro(id_carro);
    }

    //Cadastra estoque
    cadastrarEstoque(data: any): Estoque {

        if (!data.id_carro ||data.quantidade === undefined ||!data.localizacao ||!data.data_entrada) {
            throw new Error("Estoque requer id_carro, quantidade, localizacao e data_entrada");
        }

        //Verifica se carro existe
        const carro = this.carroRepository.buscarPorId(data.id_carro);

        if (!carro) {
            throw new Error("Carro não encontrado");
        }

        //Quantidade >= 0
        if (!Number.isInteger(data.quantidade) || data.quantidade < 0) { 
            throw new Error("Quantidade deve ser um inteiro maior ou igual a zero");
        }

        //Data não pode ser futura
        const hoje = new Date();
        const dataEntrada =new Date(data.data_entrada);

        if (dataEntrada > hoje) {
            throw new Error("Data de entrada não pode ser futura");
        }

        //Não pode existir estoque para mesmo carro
        const estoqueExistente = this.estoqueRepository.buscarPorCarro(data.id_carro);

        if (estoqueExistente) {
            throw new Error("Já existe estoque para esse carro");
        }

        const estoque =new Estoque(data.id_carro,data.quantidade,data.localizacao,data.data_entrada);
        this.estoqueRepository.cadastrarEstoque(estoque);
        return estoque;
    }

    //Atualiza estoque
    atualizarEstoque(id: number,data: any): Estoque {

        const estoque =this.estoqueRepository.buscarPorId(id);

        if (!estoque) {
        throw new Error("Estoque não encontrado");
        }

        if (data.quantidade === undefined || !data.localizacao) {
            throw new Error("Quantidade e localizacao são obrigatórios");
        }

        //Quantidade >= 0
        if (!Number.isInteger(data.quantidade) ||data.quantidade < 0) {
            throw new Error("Quantidade deve ser um inteiro maior ou igual a zero");
        }

        estoque.quantidade =data.quantidade;

        estoque.localizacao_patio =data.localizacao;

        const estoqueAtualizado =this.estoqueRepository.atualizarEstoque(id,estoque);
        return estoqueAtualizado!;
    }

    //Remove estoque
    removerEstoque(id: number): Estoque | undefined {

        const estoque =this.estoqueRepository.buscarPorId(id);

        if (!estoque) {
            throw new Error("Estoque não encontrado");
        }
        
        return this.estoqueRepository.removerEstoque(id);
    }
}