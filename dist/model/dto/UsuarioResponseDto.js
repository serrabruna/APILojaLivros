"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioResponseDto = void 0;
class UsuarioResponseDto {
    constructor(usuario) {
        this.id = usuario.id;
        this.nome = usuario.nome;
        this.email = usuario.email;
        this.telefone = usuario.telefone;
        this.tipo_usuario = usuario.tipo_usuario;
    }
}
exports.UsuarioResponseDto = UsuarioResponseDto;
