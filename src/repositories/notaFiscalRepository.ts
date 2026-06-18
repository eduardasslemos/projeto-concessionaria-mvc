import { executarComandoSQL } from "../database/mysql";
import { NotaFiscal } from "../models/NotaFiscal";

export class NotaFiscalRepository {
    private static instance: NotaFiscalRepository;
  
    private constructor() {}
  
    public static getInstance(): NotaFiscalRepository {
        if (!this.instance) {
            this.instance = new NotaFiscalRepository();
        }
        return this.instance;
    }
  
    //listar todas as notas fiscais
    async listaNotaFiscal(): Promise<NotaFiscal[]> {
        const linhas = await executarComandoSQL(
            "SELECT id_nota, numero_nota, data_emissao, valor_total, id_cliente, id_vendedor, id_carro FROM nota_fiscal",
            []
        );
    
        return linhas.map((linha: any) => {
            return new NotaFiscal(linha.id_nota, linha.numero_nota, linha.data_emissao, Number(linha.valor_total), linha.id_cliente, linha.id_vendedor, linha.id_carro);
        });
    }
  
    //retorna nota fiscal por id
    async filtraNotaPorId(id: number): Promise<NotaFiscal | null> {
        const linhas = await executarComandoSQL(
            "SELECT id_nota, numero_nota, data_emissao, valor_total, id_cliente, id_vendedor, id_carro FROM nota_fiscal WHERE id_nota = ?",
            [id]
        );
    
        if (linhas.length === 0) {
            return null;
        }
    
        const linha = linhas[0];
        return new NotaFiscal(linha.id_nota, linha.numero_nota, linha.data_emissao, Number(linha.valor_total), linha.id_cliente, linha.id_vendedor, linha.id_carro);
    }
  
    //cadastra nova nota fiscal 
    async insereNotaFiscal(notaFiscal: NotaFiscal): Promise<NotaFiscal> {
        const resultado = await executarComandoSQL(
            "INSERT INTO nota_fiscal (numero_nota, data_emissao, valor_total, id_cliente, id_vendedor, id_carro) VALUES (?, ?, ?, ?, ?, ?)",
            [notaFiscal.numero_nota, notaFiscal.data_emissao, notaFiscal.valor_total, notaFiscal.id_cliente, notaFiscal.id_vendedor, notaFiscal.id_carro]
        );
    
        const idGerado = resultado.insertId;
    
        return new NotaFiscal(idGerado, notaFiscal.numero_nota, notaFiscal.data_emissao, notaFiscal.valor_total, notaFiscal.id_cliente, notaFiscal.id_vendedor, notaFiscal.id_carro);
    }
  
    //retorna nota fiscal por numero
    async filtraNotaPorNumero(numero_nota: string): Promise<NotaFiscal | null> {
        const linhas = await executarComandoSQL(
            "SELECT id_nota, numero_nota, data_emissao, valor_total, id_cliente, id_vendedor, id_carro FROM nota_fiscal WHERE numero_nota = ?",
            [numero_nota]
        );
    
        if (linhas.length === 0) {
            return null;
        }
    
        const linha = linhas[0];
        return new NotaFiscal(linha.id_nota, linha.numero_nota, linha.data_emissao, Number(linha.valor_total), linha.id_cliente, linha.id_vendedor, linha.id_carro);
    }
  
    //lista notas fiscais por vendedor
    async listaNotasPorVendedor(idVendedor: number): Promise<NotaFiscal[]> {
        const linhas = await executarComandoSQL(
            "SELECT id_nota, numero_nota, data_emissao, valor_total, id_cliente, id_vendedor, id_carro FROM nota_fiscal WHERE id_vendedor = ?",
            [idVendedor]
        );
    
        return linhas.map((linha: any) => {
            return new NotaFiscal(linha.id_nota, linha.numero_nota, linha.data_emissao, Number(linha.valor_total), linha.id_cliente, linha.id_vendedor, linha.id_carro);
        });
    }
  
    //lista notas fiscais por cliente
    async listaNotasPorCliente(idCliente: number): Promise<NotaFiscal[]> {
        const linhas = await executarComandoSQL(
            "SELECT id_nota, numero_nota, data_emissao, valor_total, id_cliente, id_vendedor, id_carro FROM nota_fiscal WHERE id_cliente = ?",
            [idCliente]
        );
    
        return linhas.map((linha: any) => {
            return new NotaFiscal(linha.id_nota, linha.numero_nota, linha.data_emissao, Number(linha.valor_total), linha.id_cliente, linha.id_vendedor, linha.id_carro);
        });
    }
  
    //lista notas fiscais por carro
    async listaNotasPorCarro(idCarro: number): Promise<NotaFiscal[]> {
        const linhas = await executarComandoSQL(
            "SELECT id_nota, numero_nota, data_emissao, valor_total, id_cliente, id_vendedor, id_carro FROM nota_fiscal WHERE id_carro = ?",
            [idCarro]
        );
    
        return linhas.map((linha: any) => {
            return new NotaFiscal(linha.id_nota, linha.numero_nota, linha.data_emissao, Number(linha.valor_total), linha.id_cliente, linha.id_vendedor, linha.id_carro);
        });
    }
}