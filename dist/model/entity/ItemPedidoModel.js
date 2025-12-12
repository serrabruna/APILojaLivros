"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemPedidoModel = void 0;
class ItemPedidoModel {
    constructor(pedido_id, livro_id, quantidade, preco_unitario_pago, id) {
        this.id = id;
        this.pedido_id = pedido_id;
        this.livro_id = livro_id;
        this.quantidade = quantidade;
        this.preco_unitario_pago = preco_unitario_pago;
    }
}
exports.ItemPedidoModel = ItemPedidoModel;
