// Importa o módulo express, que é um framework para construir aplicações web em Node.js
const express = require('express');

// Importa o módulo bodyParser, que é um middleware para fazer o parsing do corpo das requisições em JSON
const bodyParser = require('body-parser');

// Importa o módulo mongoose, que é uma biblioteca para modelagem de objetos MongoDB para Node.js
const mongoose = require('mongoose');

// Importa o módulo bcryptjs para lidar com criptografia de senhas
const bcrypt = require('bcryptjs');

// Importa o módulo jsonwebtoken para lidar com autenticação via tokens JWT
const jwt = require('jsonwebtoken');

// Cria uma instância do aplicativo Express
const app = express();

// Configura o middleware bodyParser para fazer o parsing do corpo das requisições em JSON
app.use(bodyParser.json());

// Conecta-se ao banco de dados MongoDB usando o mongoose
mongoose.connect('mongodb://localhost:27017/my-app-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Importa as rotas de autenticação e de usuário
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// Define as rotas no aplicativo Express, prefixando-as com "/api/auth" e "/api/users", respectivamente
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Define a porta na qual o servidor irá escutar. Utiliza a porta definida no ambiente, ou 3000 por padrão
const PORT = process.env.PORT || 3000;

// Inicia o servidor Express e faz com que ele escute na porta definida
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

