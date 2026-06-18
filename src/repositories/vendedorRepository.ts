import { executarComandoSQL } from "../database/mysql";
import { Vendedor } from "../models/Vendedor";

export class VendedorRepository {
    private static instance: VendedorRepository;

    private constructor() {}

    public static getInstance(): VendedorRepository {
        if (!this.instance) {
            this.instance = new VendedorRepository();
        }
        return this.instance;
    }

    static getCreateTableQuery(): string {
        return `
          CREATE TABLE IF NOT EXISTS vendedor (
            id_vendedor INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            matricula VARCHAR(50) NOT NULL UNIQUE,
            comissao_percentual DECIMAL(5,2) NOT NULL
          );
        `;
      }

    //lista todos os vendedores
    async listaVendedores(): Promise<Vendedor[]> {
        const linhas = await executarComandoSQL(
            "SELECT id_vendedor, nome, matricula, comissao_percentual FROM vendedor",
            []
        );

        const vendedores: Vendedor[] = linhas.map((linha: any) => {
            return new Vendedor(linha.id_vendedor, linha.nome, linha.matricula, Number(linha.comissao_percentual));
        });

        return vendedores;
    }

    //retorna vendedor por id
    async filtraVendedorPorId(id: number): Promise<Vendedor | null> {
        const linhas = await executarComandoSQL(
            "SELECT id_vendedor, nome, matricula, comissao_percentual FROM vendedor WHERE id_vendedor = ?", [id]);
    
        if (linhas.length === 0) {
            return null;
        }
    
        const linha = linhas[0];
    
        return new Vendedor(linha.id_vendedor, linha.nome, linha.matricula, Number(linha.comissao_percentual));
    }
    
    //insere um novo vendedor
    async insereVendedor(vendedor: Vendedor): Promise<Vendedor> {
        const resultado = await executarComandoSQL(
            "INSERT INTO vendedor (nome, matricula, comissao_percentual) VALUES (?, ?, ?)",
            [
                vendedor.nome,
                vendedor.matricula,
                vendedor.comissao_percentual,
            ]
        );
    
        const idGerado = resultado.insertId;
    
        return new Vendedor(idGerado, vendedor.nome, vendedor.matricula, vendedor.comissao_percentual);
    }
    
    //atualiza um vendedor
    async atualizaVendedor(id: number, vendedor: Vendedor): Promise<Vendedor | null> {
        const vendedorExistente = await this.filtraVendedorPorId(id);
    
        if (!vendedorExistente) {
            return null;
        }
    
        await executarComandoSQL(
            `UPDATE vendedor 
            SET nome = ?, matricula = ?, comissao_percentual = ?
            WHERE id_vendedor = ?`,
            [
                vendedor.nome,
                vendedor.matricula,
                vendedor.comissao_percentual,
                id,
            ]
        );
    
        return new Vendedor(id, vendedor.nome, vendedor.matricula, vendedor.comissao_percentual);
    }
    
    //remove um vendedor
    async removeVendedor(id: number): Promise<Vendedor | null> {
        const vendedorExistente = await this.filtraVendedorPorId(id);
    
        if (!vendedorExistente) {
            return null;
        }
    
        await executarComandoSQL(
            "DELETE FROM vendedor WHERE id_vendedor = ?", [id]);
    
        return vendedorExistente;
    }
    
    //retorna vendedor por matricula
    async filtraVendedorPorMatricula(matricula: string): Promise<Vendedor | null> {
        const linhas = await executarComandoSQL(
            "SELECT id_vendedor, nome, matricula, comissao_percentual FROM vendedor WHERE matricula = ?", [matricula]);
    
        if (linhas.length === 0) {
            return null;
        }
    
        const linha = linhas[0];
    
        return new Vendedor(linha.id_vendedor, linha.nome, linha.matricula, Number(linha.comissao_percentual));
    }
}