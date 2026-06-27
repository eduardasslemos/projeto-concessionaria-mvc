"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./routes/router"));
const mysql_1 = require("./database/mysql");
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 3000;
app.use(express_1.default.json());
app.use(router_1.default);
async function startServer() {
    try {
        await (0, mysql_1.inicializarBanco)();
        app.listen(PORT, () => {
            console.log(`API rodando na URL: http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("Erro ao iniciar a API:", error);
        process.exit(1);
    }
}
startServer();
