module.exports = {
    somaSaida: `
    SELECT SUM(total) AS totalSaida FROM output_product WHERE usuario_id = ?
    `,
    somaEntrada: 
    `SELECT SUM(total) AS totalEntrada FROM input_product WHERE usuario_id = ?`,

    entradaQtd:
    `SELECT COUNT(*) AS qtdEntrada FROM input_product WHERE usuario_id = ?`
}