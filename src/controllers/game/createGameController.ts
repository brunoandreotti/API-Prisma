import { Request, Response } from 'express'
import { GamePrismaRepository } from '../../repositories/game/GamePrismaRepository'
import { GameData } from '../../repositories/game/IGameRepository'
import { CreateGameService } from '../../services/game/createGameService'

class CreateGameController {
  static async create(req: Request, res: Response) {
    const prismaRepository = new GamePrismaRepository()
    const createGameService = new CreateGameService(prismaRepository)

    const { name, description, developer } = req.body

    const game: GameData = {
      name,
      description,
      developer
    }

    try {
      const result = await createGameService.execute(game)

      res.status(201).json({ message: 'Game created successfully!', result })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
}

export { CreateGameController }
