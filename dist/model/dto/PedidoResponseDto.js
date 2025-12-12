"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoResponseDto = exports.ItemPedidoResponseDto = void 0;
class ItemPedidoResponseDto {
    constructor(model) {
        this.id = model.id;
        this.livro_id = model.livro_id;
        this.quantidade = model.quantidade;
        this.preco_unitario_pago = model.preco_unitario_pago;
    }
}
exports.ItemPedidoResponseDto = ItemPedidoResponseDto;
class PedidoResponseDto {
    constructor(model, itensDto) {
        this.id = model.id;
        this.usuario_id = model.usuario_id;
        this.endereco_entrega_id = model.endereco_entrega_id;
        this.data_pedido = model.data_pedido;
        this.valor_total = model.valor_total;
        this.status_pedido = model.status_pedido;
        this.forma_pagamento = model.forma_pagamento;
        this.itens = itensDto;
    }
}
exports.PedidoResponseDto = PedidoResponseDto;
