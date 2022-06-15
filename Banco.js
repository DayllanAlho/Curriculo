const express = require('express');
const app = express();
const port = process.env.PORT || 3030;
const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'banco.db';
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static("./"));
app.use(express.json());
/* Definição dos endpoints */
/****** CRUD ******************************************************************/
// Retorna todos registros (é o R do CRUD - Read)

//Esse aqui é apenas para visualizar no servidor o banco
app.get('/projetos', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
    var db = new sqlite3.Database(DBPATH); // Abre o banco
var sql = 'SELECT * FROM PROJETOS ORDER BY idProjeto COLLATE NOCASE';
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});



// Agora irei Inseri um registro (é o C do CRUD - Create)
app.post('/projetoinsert', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
    sql = "INSERT INTO PROJETOS (Título, Duração, Localização) VALUES ('" + req.body.Título + "','" + req.body.Duração + "','" + req.body.Localização + "' )";
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }
    });
    db.close(); // Fecha o banco
    res.end();
});




//atualiza um registro existente
app.post('/projetoupdate', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    // permite alterar o nome e o tipo dado certo id (chave primária)
    sql = "UPDATE PROJETOS SET Localização = '" + req.body.Localização + "' WHERE idProjeto = " + req.body.idProjeto;//O WHERE me ajuda a buscar pela chave primária (Título) onde está os atributos que quero atualizar
    var db = new sqlite3.Database(DBPATH);
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    db.close();
});




// NETWORKDELETE - deletar registros cadastrados na tabela NETWORK;
app.post('/projetodelete', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    // deleta segundo o id
    sql = "DELETE FROM PROJETOS WHERE idProjeto ="  + req.body.idProjeto;
    var db = new sqlite3.Database(DBPATH);
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    db.close();
});



/* Inicia o servidor */
app.listen(port, () => {
    console.log(`Server running at ${port}/`);
  });









