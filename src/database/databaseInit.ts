import { UsuarioRepository } from '../repository/UsuarioRepository.js';
import { EnderecoRepository } from '../repository/EnderecoRepository.js';
import { LivroRepository } from '../repository/LivroRepository.js';
import { CategoriaRepository } from '../repository/CategoriaRepository.js';
import { PedidoRepository } from '../repository/PedidoRepository.js';
import { CarrinhoRepository } from '../repository/CarrinhoRepository.js';
import { toggleForeignKeyChecks } from './mysql.js'; // Importe a função nova

export async function inicializarTabelas() {
    console.log("⬆️ Iniciando criação de tabelas (Modo Forçado)...");

    try {
        await toggleForeignKeyChecks(false);

        console.log("⏳ Instanciando tabelas...");
        
        await UsuarioRepository.getInstance(); 
        await CategoriaRepository.getInstance(); 
        await EnderecoRepository.getInstance();
        await LivroRepository.getInstance(); 
        await PedidoRepository.getInstance();
        await CarrinhoRepository.getInstance(); 

        console.log("🎉 Todas as tabelas foram processadas!");

    } catch(err) {
        console.error("❌ Erro ao criar tabelas:", err);
        throw err;
    } finally {
        await toggleForeignKeyChecks(true);
    }
}