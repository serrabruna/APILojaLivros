"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_js_1 = require("./config/swagger.js");
const livroRoutes_js_1 = __importDefault(require("./routes/livroRoutes.js"));
const categoriaRoutes_js_1 = __importDefault(require("./routes/categoriaRoutes.js"));
const itemPedidoRoutes_js_1 = __importDefault(require("./routes/itemPedidoRoutes.js"));
const carrinhoRoutes_js_1 = __importDefault(require("./routes/carrinhoRoutes.js"));
const routes_js_1 = require("./route/routes.js");
const databaseInit_js_1 = require("./database/databaseInit.js");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept",
    ],
    credentials: false,
}));
app.options(/.*/, (0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Configuração do Swagger
(0, swagger_js_1.setupSwagger)(app);
(0, routes_js_1.RegisterRoutes)(app);
// Rotas manuais (Express tradicional)
app.use("/livros", livroRoutes_js_1.default);
app.use("/categorias", categoriaRoutes_js_1.default);
app.use("/item-pedido", itemPedidoRoutes_js_1.default);
app.use("/carrinho", carrinhoRoutes_js_1.default);
// Redirecionamento raiz
app.get("/", (req, res) => {
    res.redirect("/api-docs");
});
// Health Check
app.get("/health", (req, res) => {
    res.json({ status: "API em funcionamento", timestamp: new Date() });
});
// Middleware Global de Erro
app.use((err, req, res, next) => {
    console.error("Erro interno:", err);
    res.status(500).json({
        message: "Erro interno do servidor",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
});
const port = process.env.PORT || 8080;
const startServer = async () => {
    try {
        console.log("⏳ Conectando ao banco de dados e sincronizando tabelas...");
        await (0, databaseInit_js_1.inicializarTabelas)();
        console.log("✅ Tabelas inicializadas com sucesso!");
        app.listen(port, () => {
            console.log(`🚀 Servidor rodando na porta ${port}`);
            console.log(`📄 Docs disponíveis em http://localhost:${port}/api-docs`);
        });
    }
    catch (error) {
        console.error("❌ Falha crítica ao iniciar o servidor:", error);
        process.exit(1);
    }
};
startServer();
exports.default = app;
