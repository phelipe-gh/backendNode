import { Response, Request } from 'express'
import logger from '@webhook/utils/logger'
import FerramentaService from '../services/ferramenta.service'

export async function saveFerramenta(request: Request, response: Response): Promise<Response> {
	try {
		logger.info('Iniciando processo...')

		const f = new FerramentaService()
        const data = await f.save(request.body)

		return response.status(200).json(data)
	} catch (error) {
		logger.error('Error: ', error)
		return response.status(400).json({ error: `${error}` })
	}
}

export async function listFerramenta(request: Request, response: Response): Promise<Response> {
	try {
		logger.info('Iniciando processo...')

		const f = new FerramentaService()
        const data = await f.list()

		return response.status(200).json(data)
	} catch (error) {
		logger.error('Error: ', error)
		return response.status(400).json({ error: `${error}` })
	}
}
