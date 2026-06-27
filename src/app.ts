import express from "express";
import router from "./routes/router";
import { inicializarBanco } from "./database/mysql";

const app = express();

const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.use(router);

async function startServer(): Promise<void> {
  try {
    await inicializarBanco();

    app.listen(PORT, () => {
      console.log(`API rodando na URL: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar a API:", error);
    process.exit(1);
  }
}

startServer();