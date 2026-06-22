import { Estoque } from "../models/Estoque";
import { CarroRepository } from "../repositories/carroRepository";
import { EstoqueRepository } from "../repositories/estoqueRepository";

export class EstoqueService {
  private estoqueRepository = EstoqueRepository.getInstance();
  private carroRepository = CarroRepository.getInstance();

  // Lista todos os registros
  async listar(): Promise<Estoque[]> {
    return await this.estoqueRepository.listar();
  }

  // Busca estoque por id
  async buscarPorId(id: number): Promise<Estoque | null> {
    return await this.estoqueRepository.buscarPorId(id);
  }

  // Busca estoque por carro
  async buscarPorCarro(id_carro: number): Promise<Estoque | null> {
    return await this.estoqueRepository.buscarPorCarro(id_carro);
  }

  // Cadastra estoque
  async cadastrarEstoque(data: any): Promise<Estoque> {
    if (data.id_carro === undefined ||data.quantidade === undefined || !data.localizacao_patio || !data.data_entrada) {
      throw new Error("Estoque requer id_carro, quantidade, localizacao_patio e data_entrada");
    }

    const idCarro = Number(data.id_carro);
    const quantidade = Number(data.quantidade);
    const dataEntrada = new Date(data.data_entrada);

    if (!Number.isInteger(idCarro) || idCarro <= 0) {
      throw new Error("id_carro deve ser um número inteiro válido");
    }

    // Verifica se carro existe
    const carro = await this.carroRepository.buscarPorId(idCarro);

    if (!carro) {
      throw new Error("Carro não encontrado");
    }

    // Quantidade >= 0
    if (!Number.isInteger(quantidade) || quantidade < 0) {
      throw new Error("Quantidade deve ser um inteiro maior ou igual a zero");
    }

    // Data não pode ser futura
    const hoje = new Date();

    if (dataEntrada > hoje) {
      throw new Error("Data de entrada não pode ser futura");
    }

    // Não pode existir estoque para o mesmo carro
    const estoqueExistente = await this.estoqueRepository.buscarPorCarro(idCarro);

    if (estoqueExistente) {
      throw new Error("Já existe estoque para esse carro");
    }

    const estoque = new Estoque(null,idCarro,quantidade,data.localizacao_patio,dataEntrada);

    return await this.estoqueRepository.cadastrarEstoque(estoque);
  }

  // Atualiza estoque
  async atualizarEstoque(id: number, data: any): Promise<Estoque> {
    const estoque = await this.estoqueRepository.buscarPorId(id);

    if (!estoque) {
      throw new Error("Estoque não encontrado");
    }

    if (data.quantidade === undefined || !data.localizacao_patio) {
      throw new Error("Quantidade e localizacao_patio são obrigatórios");
    }

    const quantidade = Number(data.quantidade);

    // Quantidade >= 0
    if (!Number.isInteger(quantidade) || quantidade < 0) {
      throw new Error("Quantidade deve ser um inteiro maior ou igual a zero");
    }

    estoque.quantidade = quantidade;
    estoque.localizacao_patio = data.localizacao_patio;

    const estoqueAtualizado = await this.estoqueRepository.atualizarEstoque(id,estoque);

    if (!estoqueAtualizado) {
      throw new Error("Erro ao atualizar estoque");
    }

    return estoqueAtualizado;
  }

  // Remove estoque
  async removerEstoque(id: number): Promise<Estoque> {
    const estoque = await this.estoqueRepository.buscarPorId(id);

    if (!estoque) {
      throw new Error("Estoque não encontrado");
    }

    const estoqueRemovido = await this.estoqueRepository.removerEstoque(id);

    if (!estoqueRemovido) {
      throw new Error("Erro ao remover estoque");
    }

    return estoqueRemovido;
  }
}