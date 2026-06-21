import { executarComandoSQL } from "../database/mysql";
import { Carro } from "../models/Carro";

export class CarroRepository {
  private static instance: CarroRepository;

  private constructor() {}

  public static getInstance(): CarroRepository {
    if (!CarroRepository.instance) {
      CarroRepository.instance = new CarroRepository();
    }

    return CarroRepository.instance;
  }

  static getCreateTableQuery(): string {
    return `
      CREATE TABLE IF NOT EXISTS carro (
        id_carro INT AUTO_INCREMENT PRIMARY KEY,
        marca VARCHAR(100) NOT NULL,
        modelo VARCHAR(100) NOT NULL,
        ano INT NOT NULL,
        placa VARCHAR(20) NOT NULL UNIQUE,
        preco DECIMAL(10,2) NOT NULL,
        cor VARCHAR(50) NOT NULL
      );
    `;
  }

  async listar(): Promise<Carro[]> {
    const linhas = await executarComandoSQL(
      "SELECT id_carro, marca, modelo, ano, placa, preco, cor FROM carro",
      []
    );

    const carros: Carro[] = linhas.map((linha: any) => {
      return new Carro(linha.id_carro,linha.marca,linha.modelo,linha.ano,linha.placa,Number(linha.preco),linha.cor);
    });

    return carros;
  }

  async buscarPorId(id: number): Promise<Carro | null> {
    const linhas = await executarComandoSQL(
      "SELECT id_carro, marca, modelo, ano, placa, preco, cor FROM carro WHERE id_carro = ?",[id]);

    if (linhas.length === 0) {
      return null;
    }

    const linha = linhas[0];

    return new Carro(linha.id_carro,linha.marca,linha.modelo,linha.ano,linha.placa,Number(linha.preco),linha.cor);
  }

  async buscaPorPlaca(placa: string): Promise<Carro | null> {
    const linhas = await executarComandoSQL(
      "SELECT id_carro, marca, modelo, ano, placa, preco, cor FROM carro WHERE placa = ?",[placa]);

    if (linhas.length === 0) {
      return null;
    }

    const linha = linhas[0];

    return new Carro(linha.id_carro,linha.marca,linha.modelo,linha.ano,linha.placa,Number(linha.preco),linha.cor);
  }

  async cadastrarCarro(carro: Carro): Promise<Carro> {
    const resultado = await executarComandoSQL(
      "INSERT INTO carro (marca, modelo, ano, placa, preco, cor) VALUES (?, ?, ?, ?, ?, ?)",
      [
        carro.marca,
        carro.modelo,
        carro.ano,
        carro.placa,
        carro.preco,
        carro.cor,
      ]
    );

    const idGerado = resultado.insertId;

    const novoCarro = new Carro(idGerado,carro.marca,carro.modelo,carro.ano,carro.placa,carro.preco,carro.cor);

    return novoCarro;
  }

  async atualizarCarro(id: number, carro: Carro): Promise<Carro | null> {
    const carroExistente = await this.buscarPorId(id);

    if (!carroExistente) {
      return null;
    }

    await executarComandoSQL(
      `UPDATE carro 
       SET marca = ?, modelo = ?, ano = ?, placa = ?, preco = ?, cor = ?
       WHERE id_carro = ?`,
      [
        carro.marca,
        carro.modelo,
        carro.ano,
        carro.placa,
        carro.preco,
        carro.cor,
        id,
      ]
    );

    return new Carro(id,carro.marca,carro.modelo,carro.ano,carro.placa,carro.preco,carro.cor);
  }

  async removerCarro(id: number): Promise<Carro | null> {
    const carroExistente = await this.buscarPorId(id);

    if (!carroExistente) {
      return null;
    }

    await executarComandoSQL(
      "DELETE FROM carro WHERE id_carro = ?",[id]);

    return carroExistente;
  }
}