class Ferramenta {
  id: number | null; // Agora o ID pode ser null antes da inserção
  name: string;
  description: string;
  purchase_date: string;
  invoice_number: string;
  supplier: string;
  power: string;
  seal: string;
  pricing: { daily: number; biweekly: number; monthly: number };

  constructor(
    name: string,
    description: string,
    purchase_date: string,
    invoice_number: string,
    supplier: string,
    power: string,
    seal: string,
    pricing: { daily: number; biweekly: number; monthly: number }
  ) {
    this.id = null; // ID será definido após inserção no banco
    this.name = name;
    this.description = description;
    this.purchase_date = purchase_date;
    this.invoice_number = invoice_number;
    this.supplier = supplier;
    this.power = power;
    this.seal = seal;
    this.pricing = pricing;
  }

  setId(id: number): this {
    this.id = id;
    return this;
  }
  
}

export { Ferramenta };
