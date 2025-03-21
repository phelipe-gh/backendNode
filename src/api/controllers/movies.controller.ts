import logger from "@webhook/utils/logger";
import { Request, Response } from "express";
import MoviesService from "../services/movies.service";


export async function getMovies(_request: Request, response: Response): Promise<Response> {
	try {
		logger.info('Iniciando processo de obtenção de filmes...');
		
		// Instancia o serviço e obtém os filmes
		const result = new MoviesService().getMovies();

		return response.json(result);
	} catch (error) {
		logger.error('Erro ao buscar filmes:', error);
		return response.status(400).json({ error: `${error}` });
	}
}