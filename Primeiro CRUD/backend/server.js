// IMPORTAR OS MODULOS NECESSARIOS
// express mysql2 e cors
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// CONFIGURAÇÃO DA APLICAÇAO EXPRESS
const app=express();
app.use(express.json());
app.use(cors());

// CONFIGURAÇAO DO BANCO DE DADOS
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senai',
    database: 'sistema_usuarios'
});

db.connect(err =>{
    if (err) {
        console.error('Erro ao conectar no banco:',err);
    }
    console.log('Conectado ao banco de dados');
});


// CRIAÇAO DAS ROTAS DO SERVIDO
// 1-ROTA READ: RETORNA TODOS OS USUARIOS CADASTRADOS
app.get('/usuarios',(req,res)=>{
    const q = "SELECT * FROM usuario";
    db.query(q,(err,data)=>{
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
});

// 2-ROTA CREATE: CRIA UM NOVO USUARIO DO BANCO
app.post('/usuarios',(req,res)=>{
    const q = "INSERT INTO usuario (`nome`, `email`) VALUES (?)";
    const values = [req.body.nome, req.body.email];
    
    db.query(q,[values],(err,data)=>{
        if (err) return res.status(500).json(err);
        return res.status(201).json({menssage:"Usario cadastrad"});
    });
});


// FIM DAS ROTAS DO SERVIDOR

// INICIALIZAÇAO DO SERVIDOR
const PORT=3000;
app.listen(PORT,()=>{
    console.log('Servidor está rodando');
})

// PARA INICIAR O SERVIDOR EXECUTE NO TERMINAL DA PASTA BACKEND O COMANDO node server.js