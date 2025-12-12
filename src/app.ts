import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { setupSwagger } from "./config/swagger.js";
import livroRoutes from "./routes/livroRoutes.js";
import categoriaRoutes from "./routes/categoriaRoutes.js";
import itemPedidoRoutes from "./routes/itemPedidoRoutes.js";
import carrinhoRoutes from "./routes/carrinhoRoutes.js";
import { RegisterRoutes } from "./route/routes.js"; 
import { inicializarTabelas } from "./database/databaseInit.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
    credentials: false,
  })
);

app.options(/.*/, cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do Swagger
setupSwagger(app);

RegisterRoutes(app); 

// Rotas manuais (Express tradicional)
app.use("/livros", livroRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/item-pedido", itemPedidoRoutes);
app.use("/carrinho", carrinhoRoutes);

// Redirecionamento raiz
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

// Health Check
app.get("/health", (req, res) => {
  res.json({ status: "API em funcionamento", timestamp: new Date() });
});

// Middleware Global de Erro
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
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

    await inicializarTabelas();
    console.log("✅ Tabelas inicializadas com sucesso!");

    app.listen(port, () => {
      console.log(`🚀 Servidor rodando na porta ${port}`);
      console.log(`📄 Docs disponíveis em http://localhost:${port}/api-docs`);
    });
  } catch (error) {
    console.error("❌ Falha crítica ao iniciar o servidor:", error);
    process.exit(1);
  }
};

startServer();

export default app;