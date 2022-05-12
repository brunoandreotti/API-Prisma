import {Request, Response} from 'express'
import { GamePrismaRepository } from '../../repositories/game/GamePrismaRepository'
import { GameData } from '../../repositories/game/IGameRepository'
import { UpdateGameService } from '../../services/game/updateGameService'

class UpdateGameController {
  static async update(req: Request, res: Response) {
    const prismaRepository = new GamePrismaRepository()
    const updateGameService = new UpdateGameService(prismaRepository)

    const gameName: string = req.params.name

    const { name, description, developer}:GameData = req.body

    const updatedData: GameData = {
      name,
      description,
      developer
    }

    try {
      const result = await updateGameService.execute(gameName, updatedData)

      return res.status(200).json({message: 'Game updated successfully!', result })
    } catch (error: any) {
      return res.status(400).json({error: error.message})
    }
  }
}

export { UpdateGameController }