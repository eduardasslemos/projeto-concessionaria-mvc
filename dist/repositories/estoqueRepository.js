"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueRepository = void 0;
class EstoqueRepository {
    static instance;
    estoque = [];
    static getInstance() {
        if (!EstoqueRepository.instance) {
            EstoqueRepository.instance = new EstoqueRepository();
        }
        return EstoqueRepository.instance;
    }
    //Lista todos os registros de estoque
    listar() {
        return this.estoque;
    }
    //Busca estoque por id
    buscarPorId(id) {
        return this.estoque.find(estoque => estoque.id_estoque === id);
    }
    //Busca estoque pelo id do carro
    buscarPorCarro(id_carro) {
        return this.estoque.find(estoque => estoque.id_carro === id_carro);
    }
    listarDisponiveis() {
        return this.estoque.filter(estoque => estoque.quantidade > 0);
    }
    //Cadastra novo estoque
    cadastrarEstoque(estoque) {
        this.estoque.push(estoque);
    }
    //Atualiza estoque
    atualizarEstoque(id, dados) {
        const indice = this.estoque.findIndex(estoque => estoque.id_estoque === id);
        this.estoque[indice] = dados;
        return this.estoque[indice];
    }
    //Diminui 1 da quantidade do estoque quando buscado por carro
    decrementarQuantidade(id_carro) {
        const estoque = this.buscarPorCarro(id_carro);
        estoque.quantidade = estoque.quantidade - 1;
        return estoque;
    }
    //Remove estoque
    removerEstoque(id) {
        const indice = this.estoque.findIndex(estoque => estoque.id_estoque === id);
        if (indice === -1) {
            return undefined;
        }
        return this.estoque.splice(indice, 1)[0];
    }
}
exports.EstoqueRepository = EstoqueRepository;
