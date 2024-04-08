const express = require('express');
const app = express();

// Importe os arquivos de rotas
const crudRoutes = require('./routes/crud');
const authRoutes = require('./routes/auth');

// Use as rotas definidas nos arquivos de rotas
app.use('/api/crud', crudRoutes);
app.use('/api/auth', authRoutes);

// Outras configurações e inicialização do servidor...




// Importa o módulo express, que é um framework para construir aplicações web em Node.js
const express = require('express');

// Cria um novo objeto Router a partir do express
const router = express.Router();

// Importa o módulo jsonwebtoken para lidar com autenticação via tokens JWT
const jwt = require('jsonwebtoken');

// Importa o módulo bcryptjs para lidar com criptografia de senhas
const bcrypt = require('bcryptjs');

// Importa o modelo de usuário (presumivelmente um arquivo onde o schema do usuário é definido)
const User = require('../models/User');

// Define uma rota POST chamada '/login' que será acessada quando o cliente enviar uma requisição POST para /login
router.post('/login', async (req, res) => {
  // Extrai o email e a senha do corpo da requisição
  const { email, password } = req.body;

  // Procura um usuário no banco de dados com o email fornecido
  const user = await User.findOne({ email });

  // Se não encontrar nenhum usuário, retorna um status de erro 400 e uma mensagem
  if (!user) return res.status(400).send('Email ou senha inválidos.');

  // Verifica se a senha fornecida corresponde à senha armazenada no banco de dados
  const isPasswordValid = await user.comparePassword(password);
  
  // Se a senha não for válida, retorna um status de erro 400 e uma mensagem
  if (!isPasswordValid)
    return res.status(400).send('Email ou senha inválidos.');

  // Se o email e a senha estiverem corretos, gera um token JWT contendo o id do usuário e o email
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // Retorna o token JWT como resposta da requisição
  res.send(token);
});

// Exporta o objeto Router criado, para que ele possa ser utilizado em outros arquivos da aplicação
module.exports = router;
