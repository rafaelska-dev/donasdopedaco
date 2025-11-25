const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
    try {
        // Caminho correto para salvar o arquivo no Netlify
        const dirPath = path.join(process.cwd(), "data");
        const filePath = path.join(dirPath, "feedback.txt");

        // Cria a pasta /data se ela NÃO existir
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }

        const body = JSON.parse(event.body);
        const { nome, mensagem } = body;

        const dataAtual = new Date().toLocaleString("pt-BR", {
            timeZone: "America/Sao_Paulo"
        });

        const linha = 
`NOME: ${nome}
DATA: ${dataAtual}
MENSAGEM: ${mensagem}
---
`;

        // Salva no arquivo
        fs.appendFileSync(filePath, linha, "utf8");

        return {
            statusCode: 200,
            body: JSON.stringify({ ok: true })
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message })
        };
    }
};
