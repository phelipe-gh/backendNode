import chalk from "chalk";
import { Ferramenta } from "../entity/Ferramenta";
import { FerramentaRepository } from "../repositorys/ferramenta.repository";
import sqlite3 from 'sqlite3';

const data: any = [
    // Itens existentes
    {
        "name": "Serra Circular 1400W",
        "description": "Serra circular de alta potência para cortes precisos em madeira e metal.",
        "purchase_date": "2024-02-15",
        "invoice_number": "98765",
        "supplier": "Ferramentas Brasil",
        "power": "1400W",
        "seal": "Certificado",
        "pricing": {
            "daily": 25.0,
            "biweekly": 45.0,
            "monthly": 80.0
        }
    },
    {
        "name": "Furadeira de Impacto 750W",
        "description": "Furadeira potente para perfuração de concreto, madeira e metal.",
        "purchase_date": "2024-01-10",
        "invoice_number": "12345",
        "supplier": "Loja das Ferramentas",
        "power": "750W",
        "seal": "Garantia de Qualidade",
        "pricing": {
            "daily": 20.0,
            "biweekly": 40.0,
            "monthly": 75.0
        }
    },
    {
        "name": "Lixadeira Orbital 300W",
        "description": "Lixadeira para acabamento fino em superfícies de madeira.",
        "purchase_date": "2023-12-05",
        "invoice_number": "56789",
        "supplier": "Madeira & Cia",
        "power": "300W",
        "seal": "Selo de Qualidade",
        "pricing": {
            "daily": 15.0,
            "biweekly": 35.0,
            "monthly": 60.0
        }
    },
    {
        "name": "Parafusadeira Elétrica 500W",
        "description": "Parafusadeira ergonômica para montagem e reparos.",
        "purchase_date": "2024-03-12",
        "invoice_number": "87654",
        "supplier": "ConstruMax",
        "power": "500W",
        "seal": "Certificado ISO",
        "pricing": {
            "daily": 18.0,
            "biweekly": 38.0,
            "monthly": 65.0
        }
    },
    {
        "name": "Esmerilhadeira Angular 900W",
        "description": "Esmerilhadeira potente para corte e desbaste de metais.",
        "purchase_date": "2023-11-20",
        "invoice_number": "34567",
        "supplier": "Ferragens Gerais",
        "power": "900W",
        "seal": "Certificado de Segurança",
        "pricing": {
            "daily": 22.0,
            "biweekly": 42.0,
            "monthly": 78.0
        }
    },
    {
        "name": "Compressor de Ar 2HP",
        "description": "Compressor de ar portátil para pinturas e limpezas.",
        "purchase_date": "2024-02-08",
        "invoice_number": "65432",
        "supplier": "Pneumax",
        "power": "2HP",
        "seal": "Garantia de 2 anos",
        "pricing": {
            "daily": 30.0,
            "biweekly": 55.0,
            "monthly": 100.0
        }
    },

    // Novos itens
    {
        "name": "Serra Tico-Tico 500W",
        "description": "Serra elétrica para cortes curvos em madeira e metais.",
        "purchase_date": "2024-03-01",
        "invoice_number": "11223",
        "supplier": "Ferramentas Express",
        "power": "500W",
        "seal": "Certificação de Qualidade",
        "pricing": {
            "daily": 18.0,
            "biweekly": 36.0,
            "monthly": 70.0
        }
    },
    {
        "name": "Soprador Térmico 650W",
        "description": "Soprador térmico para secagem e remoção de tintas.",
        "purchase_date": "2024-01-25",
        "invoice_number": "98764",
        "supplier": "Soluções Elétricas",
        "power": "650W",
        "seal": "Certificado de Segurança",
        "pricing": {
            "daily": 12.0,
            "biweekly": 25.0,
            "monthly": 55.0
        }
    },
    {
        "name": "Lixadeira de Cinta 750W",
        "description": "Lixadeira de alta potência para desbaste rápido em superfícies grandes.",
        "purchase_date": "2023-10-10",
        "invoice_number": "33456",
        "supplier": "Madeireira Nova",
        "power": "750W",
        "seal": "Selo de Garantia",
        "pricing": {
            "daily": 30.0,
            "biweekly": 60.0,
            "monthly": 120.0
        }
    },
    {
        "name": "Politriz 1100W",
        "description": "Politriz de alta performance para polimento de superfícies automotivas.",
        "purchase_date": "2024-02-28",
        "invoice_number": "65431",
        "supplier": "AutoTools",
        "power": "1100W",
        "seal": "Certificado de Qualidade",
        "pricing": {
            "daily": 25.0,
            "biweekly": 50.0,
            "monthly": 95.0
        }
    },
    {
        "name": "Alicate Hidráulico 12 Toneladas",
        "description": "Alicate para compressão e corte de metais pesados.",
        "purchase_date": "2023-12-22",
        "invoice_number": "76543",
        "supplier": "Ferramentas Pro",
        "power": "12T",
        "seal": "Certificado de Segurança",
        "pricing": {
            "daily": 40.0,
            "biweekly": 80.0,
            "monthly": 150.0
        }
    },
    {
        "name": "Betoneira 350L",
        "description": "Betoneira de alta capacidade para mistura de cimento e argamassa.",
        "purchase_date": "2023-11-30",
        "invoice_number": "54321",
        "supplier": "Construmix",
        "power": "350L",
        "seal": "Certificação de Qualidade",
        "pricing": {
            "daily": 50.0,
            "biweekly": 100.0,
            "monthly": 180.0
        }
    },
    {
        "name": "Martelo Perfurador 1000W",
        "description": "Martelo perfurador de alta potência para perfuração de concreto.",
        "purchase_date": "2024-01-20",
        "invoice_number": "43210",
        "supplier": "ToolsNow",
        "power": "1000W",
        "seal": "Selo de Qualidade",
        "pricing": {
            "daily": 28.0,
            "biweekly": 56.0,
            "monthly": 110.0
        }
    },
    {
        "name": "Macaco Hidráulico 10 Toneladas",
        "description": "Macaco hidráulico robusto para levantamento de cargas pesadas.",
        "purchase_date": "2023-12-15",
        "invoice_number": "98721",
        "supplier": "Ferramentas Pesadas",
        "power": "10T",
        "seal": "Garantia de 3 anos",
        "pricing": {
            "daily": 35.0,
            "biweekly": 70.0,
            "monthly": 130.0
        }
    },
    {
        "name": "Serra de Mármore 2000W",
        "description": "Serra de mármore para cortes precisos em pedras e pisos.",
        "purchase_date": "2024-02-10",
        "invoice_number": "67549",
        "supplier": "Construfácil",
        "power": "2000W",
        "seal": "Certificado de Segurança",
        "pricing": {
            "daily": 45.0,
            "biweekly": 85.0,
            "monthly": 160.0
        }
    },
    {
        "name": "Furadeira de Percussão 950W",
        "description": "Furadeira de percussão ideal para perfuração de concreto e alvenaria.",
        "purchase_date": "2023-11-12",
        "invoice_number": "56732",
        "supplier": "ConstruTech",
        "power": "950W",
        "seal": "Garantia Estendida",
        "pricing": {
            "daily": 23.0,
            "biweekly": 45.0,
            "monthly": 85.0
        }
    },
    {
        "name": "Serra de Bancada 1500W",
        "description": "Serra de bancada com alta potência para cortes retos em madeira.",
        "purchase_date": "2024-03-05",
        "invoice_number": "11224",
        "supplier": "ToolsMaster",
        "power": "1500W",
        "seal": "Certificado de Qualidade",
        "pricing": {
            "daily": 35.0,
            "biweekly": 70.0,
            "monthly": 130.0
        }
    },
    {
        "name": "Rebitadeira Pneumática 3mm",
        "description": "Rebitadeira para aplicações industriais com alta resistência.",
        "purchase_date": "2023-12-12",
        "invoice_number": "77654",
        "supplier": "Pneumáticos Ltda",
        "power": "Pneumática",
        "seal": "Selo de Segurança",
        "pricing": {
            "daily": 18.0,
            "biweekly": 38.0,
            "monthly": 72.0
        }
    },
    {
        "name": "Cortadora de Piso 1800W",
        "description": "Cortadora de piso para materiais cerâmicos e pedras com alto desempenho.",
        "purchase_date": "2024-01-30",
        "invoice_number": "43211",
        "supplier": "Construfacil",
        "power": "1800W",
        "seal": "Certificado de Segurança",
        "pricing": {
            "daily": 40.0,
            "biweekly": 80.0,
            "monthly": 150.0
        }
    },
    {
        "name": "Furadeira de Coluna 1200W",
        "description": "Furadeira de coluna para perfurações de alta precisão em diversos materiais.",
        "purchase_date": "2024-02-18",
        "invoice_number": "98763",
        "supplier": "Indústria Máquinas",
        "power": "1200W",
        "seal": "Selo de Qualidade",
        "pricing": {
            "daily": 28.0,
            "biweekly": 56.0,
            "monthly": 110.0
        }
    },
    {
        "name": "Esmerilhadeira de Bancada 750W",
        "description": "Esmerilhadeira de bancada ideal para desbaste e polimento de superfícies metálicas.",
        "purchase_date": "2023-11-15",
        "invoice_number": "23456",
        "supplier": "Ferramentas Profissionais",
        "power": "750W",
        "seal": "Garantia de 1 ano",
        "pricing": {
            "daily": 22.0,
            "biweekly": 45.0,
            "monthly": 85.0
        }
    },
    {
        "name": "Aspirador de Pó Industrial 2000W",
        "description": "Aspirador de pó para limpeza de ambientes industriais com alto poder de sucção.",
        "purchase_date": "2024-03-10",
        "invoice_number": "90872",
        "supplier": "CleanTech",
        "power": "2000W",
        "seal": "Certificado de Segurança",
        "pricing": {
            "daily": 50.0,
            "biweekly": 95.0,
            "monthly": 180.0
        }
    },
    {
        "name": "Plaina Elétrica 750W",
        "description": "Plaina elétrica para acabamento e desbaste de superfícies de madeira.",
        "purchase_date": "2024-01-12",
        "invoice_number": "56721",
        "supplier": "WoodCraft",
        "power": "750W",
        "seal": "Selo de Qualidade",
        "pricing": {
            "daily": 20.0,
            "biweekly": 40.0,
            "monthly": 75.0
        }
    },
    {
        "name": "Martelo de Demolição 1500W",
        "description": "Martelo de demolição com alta potência para remoção de concreto e alvenaria.",
        "purchase_date": "2024-02-20",
        "invoice_number": "87655",
        "supplier": "ConstruMax",
        "power": "1500W",
        "seal": "Certificação de Segurança",
        "pricing": {
            "daily": 35.0,
            "biweekly": 70.0,
            "monthly": 135.0
        }
    },
    {
        "name": "Furadeira de Impacto 1000W",
        "description": "Furadeira de impacto para perfurações pesadas em concreto e aço.",
        "purchase_date": "2024-03-08",
        "invoice_number": "34211",
        "supplier": "PowerTools",
        "power": "1000W",
        "seal": "Certificado de Garantia",
        "pricing": {
            "daily": 28.0,
            "biweekly": 55.0,
            "monthly": 100.0
        }
    },
    {
        "name": "Compactor de Solo 2000W",
        "description": "Compactor de solo para compactação eficiente em construção civil.",
        "purchase_date": "2023-12-28",
        "invoice_number": "65432",
        "supplier": "Máquinas Pesadas",
        "power": "2000W",
        "seal": "Certificado de Qualidade",
        "pricing": {
            "daily": 60.0,
            "biweekly": 120.0,
            "monthly": 220.0
        }
    }
];

const db = new sqlite3.Database('./ferramentas.db', (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados:', err);
  } else {
    console.log('Banco de dados SQLite conectado!');
  }
});


export default class Seeds {

    static async populate() {
        try {
          // Verificando se a tabela existe
          const tableExists = await this.checkIfTableExists();
          
          if (!tableExists) {
            console.log(chalk.hex('#0000FF')("Banco limpo!"));
            console.log(chalk.hex('#FFA500')("------- Criando a tabela e iniciando SEEDS -------"));
            
            // Cria a tabela caso não exista
            await this.createTable();
          }
      
          // Verificando o tamanho do banco
          const ferramentasDBSize: number = await (await FerramentaRepository.list()).length;
      
          if (ferramentasDBSize === 0) {
            console.log(chalk.hex('#FFA500')("------- Iniciando SEEDS no banco -------"));
            
            for (const element of data) {
              const toolsRepository = new Ferramenta(
                element.name,
                element.description,
                element.purchase_date,
                element.invoice_number,
                element.supplier,
                element.power,
                element.seal,
                element.pricing
              );
          
              // Salvando a ferramenta no banco
              await FerramentaRepository.save(toolsRepository);
            }
      
            console.log(chalk.green("Banco populado com sucesso!"));
          } else {
            console.log(chalk.yellow("O banco já contém dados. Não foi necessário popular."));
          }
        } catch (err) {
          console.error("Erro ao popular o banco:", err);
        }
      }
      
      // Método para verificar se a tabela 'ferramenta' existe
      static checkIfTableExists(): Promise<boolean> {
        const sql = "SELECT name FROM sqlite_master WHERE type='table' AND name='ferramenta';";
        return new Promise((resolve, reject) => {
          db.get(sql, [], (err, row) => {
            if (err) {
              console.error("Erro ao verificar a tabela:", err.message);
              reject(err);
            } else {
              resolve(row !== undefined);
            }
          });
        });
      }
      
      // Método para criar a tabela 'ferramenta' caso ela não exista
      static createTable(): Promise<void> {
        const sql = `
          CREATE TABLE IF NOT EXISTS ferramenta (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            purchase_date TEXT NOT NULL,
            invoice_number TEXT NOT NULL,
            supplier TEXT NOT NULL,
            power TEXT NOT NULL,
            seal TEXT NOT NULL,
            pricing_daily REAL NOT NULL,
            pricing_biweekly REAL NOT NULL,
            pricing_monthly REAL NOT NULL
          );
        `;
        return new Promise((resolve, reject) => {
          db.run(sql, (err:any) => {
            if (err) {
              console.error("Erro ao criar tabela:", err.message);
              reject(err);
            } else {
              console.log("Tabela 'ferramenta' criada com sucesso!");
              resolve();
            }
          });
        });
      }
}
