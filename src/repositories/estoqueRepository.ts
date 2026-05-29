import {Estoque} from "../models/Estoque";

export class EstoqueRepository {
    private static instance: EstoqueRepository;
    private estoque: Estoque[] = [];

    public static getInstance(): EstoqueRepository {

    if (!EstoqueRepository.instance) {
        EstoqueRepository.instance =new EstoqueRepository();
    }

    return EstoqueRepository.instance;
    }

    //Lista todos os registros de estoque
    listar(): Estoque[] {
        return this.estoque;
    }

    //Busca estoque por id
    buscarPorId(id: number): Estoque | undefined {
        return this.estoque.find(estoque => estoque.id_estoque === id);
    }

    //Busca estoque pelo id do carro
    buscarPorCarro(id_carro: number): Estoque | undefined {
        return this.estoque.find(estoque => estoque.id_carro === id_carro);
    }

    listarDisponiveis(): Estoque[] {
        return this.estoque.filter(estoque => estoque.quantidade > 0);
}

    //Cadastra novo estoque
    cadastrarEstoque(estoque: Estoque): void {
        this.estoque.push(estoque);
    }

    //Atualiza estoque
    atualizarEstoque(id: number,dados: Estoque): Estoque | undefined {
        const indice =this.estoque.findIndex(estoque => estoque.id_estoque === id);
        this.estoque[indice] = dados;
        return this.estoque[indice];
    }

    //Diminui 1 da quantidade do estoque quando buscado por carro
    decrementarQuantidade(id_carro: number): Estoque {
        const estoque = this.buscarPorCarro(id_carro)!;

        estoque.quantidade = estoque.quantidade - 1;
        return estoque;
    }

    //Remove estoque
    removerEstoque(id: number): Estoque | undefined {
        const indice =this.estoque.findIndex(estoque => estoque.id_estoque === id);
        
        if (indice === -1) {
            return undefined;
        }

        return this.estoque.splice(indice, 1)[0];
    }
}