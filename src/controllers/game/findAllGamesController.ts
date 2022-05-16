import { Request, Response } from 'express'
import { GamePrismaRepository } from '../../repositories/game/GamePrismaRepository'
import { FindAllGamesService } from '../../services/game/findAllGamesService'

class FindAllGamesController {
  static async findAll(req: Request, res: Response) {
    const prismaRepository = new GamePrismaRepository()
    const findAllGamesService = new FindAllGamesService(prismaRepository)

    const result = await findAllGamesService.execute()

    return res.status(200).json({ result })
  }
}

export { FindAllGamesController }
