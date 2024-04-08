// Importa o módulo mongoose, que é uma biblioteca para modelagem de objetos MongoDB para Node.js
const mongoose = require('mongoose');

// Importa o módulo bcryptjs para lidar com criptografia de senhas
const bcrypt = require('bcryptjs');

// Define um esquema (schema) para o modelo de usuário
const UserSchema = new mongoose.Schema({
  // Define um campo de email no esquema, que deve ser uma string única e obrigatória
  email: { type: String, unique: true, required: true },
  
  // Define um campo de senha no esquema, que deve ser uma string obrigatória
  password: { type: String, required: true },
});

// Define um middleware 'pre' para o evento 'save', que é acionado antes de salvar um documento no banco de dados
UserSchema.pre('save', async function (next) {
  // Verifica se a senha foi modificada antes de prosseguir
  if (!this.isModified('password')) return next();
  
  // Gera um salt para a criptografia da senha
  const salt = await bcrypt.genSalt(10);
  
  // Criptografa a senha antes de salvá-la no banco de dados
  this.password = await bcrypt.hash(this.password, salt);
});

// Define um método chamado 'comparePassword' no esquema para comparar uma senha fornecida com a senha armazenada no banco de dados
UserSchema.methods.comparePassword = function (candidatePassword) {
  // Retorna uma promessa que resolve se a senha fornecida corresponder à senha armazenada, ou rejeita caso contrário
  return bcrypt.compare(candidatePassword, this.password);
};

// Exporta o modelo de usuário, definido a partir do esquema criado
module.exports = mongoose.model('User', UserSchema);
