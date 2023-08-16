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

const testar = new CaixaDaLanchonete();

console.log(testar.calcularValorDaCompra('debito', ['chantily,1'])); // "Item extra não pode ser pedido sem o principal"
console.log(testar.calcularValorDaCompra('debito', ['chantily,1', 'cafe,1'])); // "R$ 4,50"
console.log(testar.calcularValorDaCompra('credito', ['combo1,1', 'cafe,2'])); // "R$ 15,96"
console.log(testar.calcularValorDaCompra('dinheiro', ['sanduiche,1', 'queijo,1'])); // "R$ 8,07"
console.log(testar.calcularValorDaCompra('vale-refeicao', ['chantily,1', 'cafe,2'])); //"Forma de pagamento inválida!"
console.log(testar.calcularValorDaCompra('credito', ['combo3,1', 'suco,2'])); // "Item inválido!"
console.log(testar.calcularValorDaCompra('debito', ['cafe,-1'])); // "Quantidade inválida!"
console.log(testar.calcularValorDaCompra('dinheiro', [''])); // "Não há itens no carrinho de compra!"

export { CaixaDaLanchonete };