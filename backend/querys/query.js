module.exports = {
    somaSaida: `
    SELECT SUM(total) AS totalSaida FROM output
    `,
    somaEntrada: 
    `SELECT SUM(total) AS totalEntrada FROM input`,

    entradaQtd:
    `SELECT COUNT(*) AS qtdEntrada FROM input`
}