import mysql, { Connection, QueryError } from "mysql2";

// Entra os repositorios
import { CarroRepository } from "../repositories/carroRepository";
//import { EstoqueRepository } from "../repositories/estoqueRepository";
import { VendedorRepository } from "../repositories/vendedorRepository";
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository";
import { ClienteRepository } from "../repositories/clienteRepository";

const dbConfig = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "ifsp",
  database: "concessionaria",
};

const mysqlConnection: Connection = mysql.createConnection(dbConfig);

mysqlConnection.connect((err: QueryError | null) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    throw err;
  }

  console.log("Conexão bem-sucedida com o banco de dados MySQL.");
});

export function executarComandoSQL(query: string,valores: any[] = []): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    mysqlConnection.query(query, valores, (err, resultado) => {
      if (err) {
        console.error("Erro ao executar a query:", err);
        reject(err);
        return;
      }

      resolve(resultado);
    });
  });
}

export async function inicializarBanco(): Promise<void> {
  console.log("Sincronizando schemas do banco de dados...");

  const schemas = [
    // Quando criarmos os repositories, ficará assim:
    CarroRepository.getCreateTableQuery(),
    //EstoqueRepository.getCreateTableQuery(),
    VendedorRepository.getCreateTableQuery(),
    NotaFiscalRepository.getCreateTableQuery(),
    ClienteRepository.getCreateTableQuery()
  ];

  try {
    await executarComandoSQL(`USE ${dbConfig.database}`, []);

    console.log(`Conectado ao schema: ${dbConfig.database}`);

    for (const query of schemas) {
      await executarComandoSQL(query, []);
    }

    console.log("Todos os repositórios foram inicializados com sucesso.");
  } catch (err) {
    console.error("Erro crítico na sincronização dos repositórios:", err);
    process.exit(1);
  }
}