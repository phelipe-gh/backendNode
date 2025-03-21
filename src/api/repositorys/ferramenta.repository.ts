import sqlite3 from 'sqlite3';
import { Ferramenta } from '../entity/Ferramenta';  // Importando a classe Ferramenta

// Criação ou conexão com o banco de dados SQLite
const db = new sqlite3.Database('./ferramentas.db', (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados:', err);
  } else {
    console.log('Banco de dados SQLite conectado!');
  }
});

class FerramentaRepository {

  // Método para salvar uma ferramenta no banco de dados
  static save(ferramenta: Ferramenta): Promise<Ferramenta> {
    const { name, description, purchase_date, invoice_number, supplier, power, seal, pricing } = ferramenta;
    const sql = `
      INSERT INTO ferramenta (name, description, purchase_date, invoice_number, supplier, power, seal, pricing_daily, pricing_biweekly, pricing_monthly)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    return new Promise((resolve, reject) => {
      db.run(sql, [
        name, description, purchase_date, invoice_number, supplier, power, seal, pricing.daily, pricing.biweekly, pricing.monthly
      ], function (err) {
        if (err) {
          console.error('Erro ao salvar a ferramenta:', err.message);
          reject(err);
        } else {
          console.log(`Ferramenta salva com ID: ${this.lastID}`);
          resolve(ferramenta.setId(this.lastID)); // Retorna a ferramenta com o ID atribuído
        }
      });
    });
  }

  // Método para listar todas as ferramentas
  static list(): Promise<Ferramenta[]> {
    const sql = 'SELECT * FROM ferramenta;';
    return new Promise((resolve, reject) => {
      db.all(sql, [], (err, rows) => {
        if (err) {
          console.error('Erro ao listar as ferramentas:', err.message);
          reject(err);
        } else {
          const ferramentas = rows.map(
            (row: any) =>
              Object.assign(new Ferramenta(
                row.name,
                row.description,
                row.purchase_date,
                row.invoice_number,
                row.supplier,
                row.power,
                row.seal,
                { daily: row.pricing_daily, biweekly: row.pricing_biweekly, monthly: row.pricing_monthly }
              ), { id: row.id })
          );
          resolve(ferramentas);
        }
      });
    });
  }

}

export { FerramentaRepository };
