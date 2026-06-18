import { Carro } from "../models/Carro";
import { CarroRepository } from "../repositories/carroRepository";
import { EstoqueRepository } from "../repositories/estoqueRepository";
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository";

export class CarroService {
  private carroRepository = CarroRepository.getInstance();
  private estoqueRepository = EstoqueRepository.getInstance();
  private notaFiscalRepository = NotaFiscalRepository.getInstance();

  async listar(): Promise<Carro[]> {
    return await this.carroRepository.listar();
  }

  async buscarPorId(id: number): Promise<Carro | null> {
    return await this.carroRepository.buscarPorId(id);
  }

  async listarDisponiveis(): Promise<Carro[]> {
    const estoques = await this.estoqueRepository.listarDisponiveis();

    const carrosDisponiveis = await Promise.all(
      estoques.map(async (estoque: any) => {
        return await this.carroRepository.buscarPorId(estoque.id_carro);
      })
    );

    return carrosDisponiveis.filter((carro): carro is Carro => carro !== null);
  }

  async CadastrarCarro(data: any): Promise<Carro> {
    if (!data.marca ||!data.modelo ||data.ano === undefined ||!data.placa ||data.preco === undefined ||!data.cor) {
      throw new Error("Carro requer marca, modelo, ano, placa, preco e cor");
    }

    const anoAtual = new Date().getFullYear();

    if (Number(data.ano) < 1950 || Number(data.ano) > anoAtual + 1) {
      throw new Error("Ano deve estar entre 1950 e o próximo ano");
    }

    if (Number(data.preco) <= 0) {
      throw new Error("Preço deve ser maior que zero");
    }

    const placaExistente = await this.carroRepository.buscaPorPlaca(data.placa);

    if (placaExistente) {
      throw new Error("Já existe um carro com essa placa");
    }

    const carro = new Carro(
      null,
      data.marca,
      data.modelo,
      Number(data.ano),
      data.placa,
      Number(data.preco),
      data.cor
    );

    return await this.carroRepository.cadastrarCarro(carro);
  }

  async atualizarCarro(id: number, data: any): Promise<Carro> {
    const carro = await this.carroRepository.buscarPorId(id);

    if (!carro) {
      throw new Error("Carro não encontrado");
    }

    if (!data.marca ||!data.modelo ||data.ano === undefined ||!data.placa ||data.preco === undefined ||!data.cor) {
      throw new Error("Carro requer marca, modelo, ano, placa, preco e cor");
    }

    const anoAtual = new Date().getFullYear();

    if (Number(data.ano) < 1950 || Number(data.ano) > anoAtual + 1) {
      throw new Error("Ano deve estar entre 1950 e o próximo ano");
    }

    if (Number(data.preco) <= 0) {
      throw new Error("Preço deve ser maior que zero");
    }

    const placaExistente = await this.carroRepository.buscaPorPlaca(data.placa);

    if (placaExistente && placaExistente.id_carro !== id) {
      throw new Error("Já existe um carro com essa placa");
    }

    const carroAtualizado = new Carro(
      id,
      data.marca,
      data.modelo,
      Number(data.ano),
      data.placa,
      Number(data.preco),
      data.cor
    );

    const resultado = await this.carroRepository.atualizarCarro(id,carroAtualizado);

    if (!resultado) {
      throw new Error("Erro ao atualizar carro");
    }

    return resultado;
  }

  async removerCarro(id: number): Promise<Carro> {
    const carro = await this.carroRepository.buscarPorId(id);
  
    if (!carro) {
      throw new Error("Carro não encontrado");
    }
  
    const estoqueVinculado = await this.estoqueRepository.buscarPorCarro(id);
  
    if (estoqueVinculado && estoqueVinculado.quantidade > 0) {
      throw new Error("Não se pode remover carro com estoque vinculado");
    }
  
    const possuiNotaVinculada = await this.notaFiscalRepository.listaNotasPorCarro(id);
  
    if (possuiNotaVinculada) {
      throw new Error("Não se pode remover carro com nota fiscal vinculada");
    }
  
    const carroRemovido = await this.carroRepository.removerCarro(id);
  
    if (!carroRemovido) {
      throw new Error("Erro ao remover carro");
    }
  
    return carroRemovido;
  }
}