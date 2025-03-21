import logger from "@webhook/utils/logger";
import { Request, Response } from "express";
import UserService from "../services/users.service";

export async function addUser(_request: Request, response: Response): Promise<Response> {
    try {
        logger.info('Iniciando processo de obtenção de clima...');
        
        // Instancia o serviço e obtém os filmes
        const userService = new UserService();
        console.log(_request.body)
        const result = userService.cadastrar(_request.body);

        return response.json(result);
    } catch (error) {
        logger.error('Erro ao buscar clima:', error);
        return response.status(500).json({ error: `${error}` });
    }
}