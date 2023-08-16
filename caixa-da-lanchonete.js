class CaixaDaLanchonete {
    
    calcularValorDaCompra(metodoDePagamento, itens) {
        
        const cardapio = {
            cafe:3.00,
            chantily:1.50,
            suco:6.20,
            sanduiche:6.50,
            queijo:2.00,
            salgado:7.25,
            combo1:9.50,
            combo2:7.50,
        };
        const extras = {
            chantily: 'cafe',
            queijo: 'sanduiche',
        };

        let total = 0;
                
        if (!['dinheiro', 'credito', 'debito'].includes(metodoDePagamento)) return "Forma de pagamento inválida!";
        
        if (itens == '') return "Não há itens no carrinho de compra!";

        for (let item of itens) {

            let [codigo, quantidade] = item.split(',');
            
            if (Number(quantidade) <= 0) return "Quantidade inválida!";
            if (!cardapio[codigo]) return "Item inválido!";
            if (extras[codigo] && !itens.some(temPrincipal => temPrincipal.startsWith(extras[codigo]))) {
                return "Item extra não pode ser pedido sem o principal";
            }
            
            total += cardapio[codigo] * Number(quantidade);
        };
        
        if (metodoDePagamento === 'dinheiro') {
            total -= (total * 0.05);
        }else if (metodoDePagamento === 'credito'){
            total += (total * 0.03);
        }else if (metodoDePagamento === 'debito'){
            total = total;
        }else return "Forma de pagamento inválida!";

        return `R$ ${total.toFixed(2).replace(".", ",")}`;
    }
}
export { CaixaDaLanchonete };
