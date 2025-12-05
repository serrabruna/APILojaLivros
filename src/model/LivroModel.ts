export class LivroModel {
    static proximoId: number = 1;

    id: number;
    isbn: string;
    titulo: string;
    autor: string;
    editora: string;
    anoPublicacao: number;
    promocao: boolean = false;

    constructor(isbn: string, titulo: string, autor: string, editora: string, anoPublicacao: number) {
        this.id = LivroModel.proximoId++;
        this.isbn = isbn;
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.anoPublicacao = anoPublicacao;
    }

    //GETTERS

    getId(): number{
        return this.id;
    }

    getIsbn(): string{
        return this.isbn;
    }

    getTitulo(): string{
        return this.titulo;
    }

    getAutor(): string{
        return this.autor;
    }

    getEditora(): string{
        return this.editora;
    }

    getAnoPublicacao(): number{
        return this.anoPublicacao;
    }

    getPromocao(): boolean{
        return this.promocao;
    }

    //SETTERS

    setIsbn(isbn: string): void{
        this.isbn = isbn;
    }

    setTitulo(titulo: string): void{
        this.titulo = titulo;
    }

    setAutor(autor: string): void{
        this.autor = autor;
    }

    seteditora(editora: string): void{
        this.editora = editora;
    }

    setAnoPublicacao(anoPublicacao: number){
        this.anoPublicacao = anoPublicacao;
    }

    setPromocao(promocao: boolean){
        this.promocao = promocao;
    }
}