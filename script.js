const express = require('express');
const cors = require('cors');

const app = express(); //Cria uma instância do Express
const Client = require('pg').Client;

app.use(cors());

app.get('/users', async (req, res) => {
    let cliente;
        try {
            cliente = new Client({
                user: "postgres",
                password: "Bd123@",
                host: "localhost",
                port: 5432,
                database: 'random_api_bd',
            });

            await cliente.connect(); // Estabelece a conexão com o banco de dados PostgreSQL

        const resultado = await cliente.query("SELECT * FROM users");
        let tableHtml = '<table>';
        tableHtml += '<thead><tr><th>Nome</th><th>Idade</th><th>Email</th><th>País</th></tr></thead>';
        tableHtml += '<tbody>';
        
        //adiciona as informações na tabela HTML
        resultado.rows.forEach(user => {
            tableHtml += `<tr><td>${user.name}</td><td>${user.age}</td><td>${user.email}</td><td>${user.country}</td></tr>`;
        });
        
        tableHtml += '</tbody></table>';
        res.send(tableHtml);
        
    } catch (ex) {
        console.log("Ocorreu um erro ao obter os usuários: " + ex);
        res.status(500).send({ error: "Erro ao obter os usuários" });
    } finally {
        
        if (cliente) {
            await cliente.end(); // Feche a conexão com o banco de dados 
        }
    }
});

// Inicia o servidor Express na porta 5500 e no host localhost
app.listen(5500, 'localhost', () => {
    console.log('Servidor iniciado na porta 5500');
});
