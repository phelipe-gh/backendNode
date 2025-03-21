import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./meubanco.db', (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados:', err);
  } else {
    console.log('Banco de dados aberto com sucesso!');
  }
});

// Exemplo de criação de tabela
db.run('CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY, nome TEXT, idade INTEGER)', (err) => {
  if (err) {
    console.log('Erro ao criar tabela:', err);
  } else {
    console.log('Tabela criada com sucesso!');
  }
});

// Função para inserir dados
export const inserirUsuario = (nome: string, idade: number) => {
  db.run('INSERT INTO usuarios (nome, idade) VALUES (?, ?)', [nome, idade], function (err) {
    if (err) {
      console.log('Erro ao inserir:', err);
    } else {
      console.log(`Usuário inserido com ID: ${this.lastID}`);
    }
  });
};

// Função para ler dados
export const listarUsuarios = () => {
  db.all('SELECT * FROM usuarios', (err, rows) => {
    if (err) {
      console.log('Erro ao consultar dados:', err);
    } else {
      console.log('Dados:', rows);
    }
  });
};
