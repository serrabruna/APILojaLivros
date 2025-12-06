import type { LivroModel } from "../model/LivroModel";
import { LivroRepository } from "../repository/LivroRepository";

export class LivroService{
    private livroRepository = LivroRepository.getInstance();

    async novoLivro(data: any): Promise<LivroModel>{
        if(!this.livroRepository.validacaoISBN(data.id)){
            throw new Error("É necessário de 13 digitos obrigatorios da ISBN para cadastrar um livro!");
        }

        if(await this.livroRepository.validacaoLivro(data.isbn)){
            throw new Error("Este livro já é cadastrado!");
        }

        return await this.livroRepository.insereLivro(data);
    }

    async filtrarLivro(data: any): Promise<LivroModel | null>{
        const id = data.id;
        const livro = await this.livroRepository.filtraLivroPorId(id);

        if(livro === null){
            throw new Error("Id não encontrado no sistema!");
        }

        return livro;
    }

    async removeLivro(id: number): Promise<LivroModel>{
        const livroRemovido = await this.livroRepository.removeLivroPorId(id);
        if(!livroRemovido){
            throw new Error("Livro não encontrado para remoção!");
        }
        return livroRemovido;
    }

    async listarLivros(): Promise<LivroModel[]>{
        return await this.livroRepository.listarLivros();
    }

    async atualizaLivro(data: any): Promise<LivroModel | null>{
        const id = data.id;
        const novosDados = data.novosDados;

        return await this.livroRepository.atualizarLivroPorId(id, novosDados);
    }
}