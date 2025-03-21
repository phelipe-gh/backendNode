import logger from "@webhook/utils/logger"
import { Request, Response } from "express"
import Calculos from "../services/calculos.service"


export async function getcalculos(request: Request, response: Response): Promise<Response> {
	try {
		logger.info('Iniciando processo...')
        const result = new Calculos().soma(Number(request.query.valor1), Number(request.query.valor2))
		return response.json(result)
	} catch (error) {
		logger.error('Error: ', error)
		return response.status(400).json({ error: `${error}` })
	}
}
