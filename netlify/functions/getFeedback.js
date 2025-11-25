const fs = require("fs");
const path = require("path");

exports.handler = async () => {
    try {
        const filePath = path.join(__dirname, "../../data/feedback.txt");

        if (!fs.existsSync(filePath)) {
            return {
                statusCode: 200,
                body: JSON.stringify([])
            };
        }

        const conteudo = fs.readFileSync(filePath, "utf8");

        // Converte o arquivo em objetos
        const blocos = conteudo.trim().split("---").filter(b => b.trim().length > 0);

        const lista = blocos.map(b => {
            const nome = b.match(/NOME: (.*)/)?.[1]?.trim() || "";
            const data = b.match(/DATA: (.*)/)?.[1]?.trim() || "";
            const mensagem = b.match(/MENSAGEM:([\s\S]*)/)?.[1]?.trim() || "";

            return { nome, data, mensagem };
        });

        return {
            statusCode: 200,
            body: JSON.stringify(lista)
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message })
        };
    }
};
