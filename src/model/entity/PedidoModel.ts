export class PedidoModel{
    id?: number;
    usuario_id: number;
    endereco_entrega_id: number;
    data_pedido: Date;
    valor_total: number;
    status_pedido: "PENDENTE" | "PAGO" | "ENVIADO" | "CANCELADO";

    constructor(usuario_id: number, endereco_entrega_id: number, data_pedido: Date, valor_total: number, status_pedido: "PENDENTE" | "PAGO" | "ENVIADO" | "CANCELADO", id?:number){
        this.id = id;
        this.usuario_id = usuario_id;
        this.endereco_entrega_id = endereco_entrega_id;
        this.data_pedido = data_pedido;
        this.valor_total = valor_total;
        this.status_pedido = status_pedido;
    }


}