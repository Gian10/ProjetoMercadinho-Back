module.exports = {
    buscaProdutoCodigo: `
    SELECT nome_produto FROM product WHERE produto_id = ?
    `
}