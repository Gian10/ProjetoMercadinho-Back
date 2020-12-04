module.exports = {
    somaSaida: `
    SELECT SUM(total) AS totalSaida FROM output_product
    `,
    somaEntrada: 
    `SELECT SUM(total) AS totalEntrada FROM input_product`,

    entradaQtd:
    `SELECT COUNT(*) AS qtdEntrada FROM input_product`
}