export class LivroModel {
    static proximoId: number = 1;

    id: number;
    isbn: string;
    titulo: string;
    autor: string;
    editora: string;
    anoPublicacao: number;

    constructor(isbn: string, titulo: string, autor: string, editora: string, anoPublicacao: number) {
        this.id = LivroModel.proximoId++;
        this.isbn = isbn;
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.anoPublicacao = anoPublicacao;
    }
}