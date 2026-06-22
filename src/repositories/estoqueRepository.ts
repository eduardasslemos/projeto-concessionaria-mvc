import { executarComandoSQL } from "../database/mysql";
import { Estoque } from "../models/Estoque";

export class EstoqueRepository {
  private static instance: EstoqueRepository;

  private constructor() {}

  public static getInstance(): EstoqueRepository {
    if (!EstoqueRepository.instance) {
      EstoqueRepository.instance = new EstoqueRepository();
    }

    return EstoqueRepository.instance;
  }

  static getCreateTableQuery(): string {
    return `
      CREATE TABLE IF NOT EXISTS estoque (
        id_estoque INT AUTO_INCREMENT PRIMARY KEY,
        id_carro INT NOT NULL,
        quantidade INT NOT NULL,
        localizacao_patio VARCHAR(100) NOT NULL,
        data_entrada DATE NOT NULL,
        FOREIGN KEY (id_carro) REFERENCES carro(id_carro)
          ON DELETE CASCADE
      );
    `;
  }

  async listar(): Promise<Estoque[]> {
    const linhas = await executarComandoSQL(
      `SELECT id_estoque, id_carro, quantidade, localizacao_patio, data_entrada
       FROM estoque`,
      []
    );

    return linhas.map((linha: any) => {
      return new Estoque(linha.id_estoque,linha.id_carro,linha.quantidade,linha.localizacao_patio,new Date(linha.data_entrada));
    });
  }

  async buscarPorId(id: number): Promise<Estoque | null> {
    const linhas = await executarComandoSQL(
      `SELECT id_estoque, id_carro, quantidade, localizacao_patio, data_entrada
       FROM estoque
       WHERE id_estoque = ?`,
      [id]
    );

    if (linhas.length === 0) {
      return null;
    }

    const linha = linhas[0];

    return new Estoque(linha.id_estoque,linha.id_carro,linha.quantidade,linha.localizacao_patio,new Date(linha.data_entrada));
  }

  async buscarPorCarro(id_carro: number): Promise<Estoque | null> {
    const linhas = await executarComandoSQL(
      `SELECT id_estoque, id_carro, quantidade, localizacao_patio, data_entrada
       FROM estoque
       WHERE id_carro = ?`,
      [id_carro]
    );

    if (linhas.length === 0) {
      return null;
    }

    const linha = linhas[0];

    return new Estoque(linha.id_estoque,linha.id_carro,linha.quantidade,linha.localizacao_patio,new Date(linha.data_entrada));
  }

  async listarDisponiveis(): Promise<Estoque[]> {
    const linhas = await executarComandoSQL(
      `SELECT id_estoque, id_carro, quantidade, localizacao_patio, data_entrada
       FROM estoque
       WHERE quantidade > 0`,
      []
    );

    return linhas.map((linha: any) => {
      return new Estoque(linha.id_estoque,linha.id_carro,linha.quantidade,linha.localizacao_patio,new Date(linha.data_entrada));
    });
  }

  async cadastrarEstoque(estoque: Estoque): Promise<Estoque> {
    const resultado = await executarComandoSQL(
      `INSERT INTO estoque 
       (id_carro, quantidade, localizacao_patio, data_entrada)
       VALUES (?, ?, ?, ?)`,
      [
        estoque.id_carro,
        estoque.quantidade,
        estoque.localizacao_patio,
        estoque.data_entrada,
      ]
    );

    const idGerado = resultado.insertId;

    return new Estoque(idGerado,estoque.id_carro,estoque.quantidade,estoque.localizacao_patio,estoque.data_entrada);
  }

  async atualizarEstoque(id: number, dados: Estoque): Promise<Estoque | null> {
    const estoqueExistente = await this.buscarPorId(id);

    if (!estoqueExistente) {
      return null;
    }

    await executarComandoSQL(
      `UPDATE estoque
       SET id_carro = ?, quantidade = ?, localizacao_patio = ?, data_entrada = ?
       WHERE id_estoque = ?`,
      [
        dados.id_carro,
        dados.quantidade,
        dados.localizacao_patio,
        dados.data_entrada,
        id,
      ]
    );

    return new Estoque(id,dados.id_carro,dados.quantidade,dados.localizacao_patio,dados.data_entrada);
  }

  async decrementarQuantidade(id_carro: number): Promise<Estoque | null> {
    const estoque = await this.buscarPorCarro(id_carro);

    if (!estoque) {
      return null;
    }

    if (estoque.quantidade <= 0) {
      return null;
    }

    await executarComandoSQL(
      `UPDATE estoque
       SET quantidade = quantidade - 1
       WHERE id_carro = ? AND quantidade > 0`,
      [id_carro]
    );

    return await this.buscarPorCarro(id_carro);
  }

  async removerEstoque(id: number): Promise<Estoque | null> {
    const estoqueExistente = await this.buscarPorId(id);

    if (!estoqueExistente) {
      return null;
    }

    await executarComandoSQL(
      "DELETE FROM estoque WHERE id_estoque = ?",
      [id]
    );

    return estoqueExistente;
  }
}