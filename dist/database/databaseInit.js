"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inicializarTabelas = inicializarTabelas;
const UsuarioRepository_js_1 = require("../repository/UsuarioRepository.js");
const EnderecoRepository_js_1 = require("../repository/EnderecoRepository.js");
const LivroRepository_js_1 = require("../repository/LivroRepository.js");
const CategoriaRepository_js_1 = require("../repository/CategoriaRepository.js");
const PedidoRepository_js_1 = require("../repository/PedidoRepository.js");
const CarrinhoRepository_js_1 = require("../repository/CarrinhoRepository.js");
const mysql_js_1 = require("./mysql.js"); // Importe a função nova
async function inicializarTabelas() {
    console.log("⬆️ Iniciando criação de tabelas (Modo Forçado)...");
    try {
        await (0, mysql_js_1.toggleForeignKeyChecks)(false);
        console.log("⏳ Instanciando tabelas...");
        await UsuarioRepository_js_1.UsuarioRepository.getInstance();
        await CategoriaRepository_js_1.CategoriaRepository.getInstance();
        await EnderecoRepository_js_1.EnderecoRepository.getInstance();
        await LivroRepository_js_1.LivroRepository.getInstance();
        await PedidoRepository_js_1.PedidoRepository.getInstance();
        await CarrinhoRepository_js_1.CarrinhoRepository.getInstance();
        console.log("🎉 Todas as tabelas foram processadas!");
    }
    catch (err) {
        console.error("❌ Erro ao criar tabelas:", err);
        throw err;
    }
    finally {
        await (0, mysql_js_1.toggleForeignKeyChecks)(true);
    }
}
