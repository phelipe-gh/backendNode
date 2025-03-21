import logger from "@webhook/utils/logger";
import { Request, Response } from "express";
import Clima from "../services/clima.service";


export async function getClima(_request: Request, response: Response): Promise<Response> {
    try {
        logger.info('Iniciando processo de obtenção de clima...');
        
        // Instancia o serviço e obtém os filmes
        const climaService = new Clima();
        const result = climaService.getClima();

        return response.json(result);
    } catch (error) {
        logger.error('Erro ao buscar clima:', error);
        return response.status(400).json({ error: `${error}` });
    }
}