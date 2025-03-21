import logger from '@webhook/utils/logger'
import { Ferramenta } from '../entity/Ferramenta';
import { FerramentaRepository } from '../repositorys/ferramenta.repository';

export default class FerramentaService {

    async save(body: any) {
        logger.info(`Criando ferramenta: ${JSON.stringify(body.tool.name)}`);
    
        try {
            // Criando a instância da ferramenta com os dados recebidos
            const ferramentaExemplo = new Ferramenta(
                body.tool.name,
                body.tool.description,
                body.tool.purchase_date,
                body.tool.invoice_number,
                body.tool.supplier,
                body.tool.power,
                body.tool.seal,
                body.tool.pricing
            );
    
            // Chama o repositório para salvar a ferramenta
            const ferramentaSalva = await FerramentaRepository.save(ferramentaExemplo);
    
            // Exibe o ID da ferramenta salva
            console.log(`Ferramenta salva com ID: ${ferramentaSalva.id}`);
            return {
                message: "Ferramenta cadastrada com sucesso!",
                id: ferramentaSalva.id
            }; 
        } catch (err) {
            console.error(`Erro ao salvar ferramenta: ${err}`);
            throw err; // Lança o erro para ser tratado por quem chamar essa função
        }
    }

    async list() {
        logger.info(`$ Buscando ferramentas`);
    
        try {
            // Chama o repositório para listar as ferramentas
            const ferramentas = await FerramentaRepository.list();
            return ferramentas;
        } catch (err) {
            console.log(`Error: fetch(URLDelivery): ${err}`);
            throw err; // Lança o erro para ser tratado por quem chamar essa função
        }
    }

}
