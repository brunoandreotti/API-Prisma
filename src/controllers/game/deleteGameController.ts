import {Request, Response} from 'express'
import { GamePrismaRepository } from '../../repositories/game/GamePrismaRepository'
import { DeleteGameService } from '../../services/game/deleteGameService'

class DeleteGameController {
  static async delete(req: Request, res: Response) {
    const prismaRepository = new GamePrismaRepository()
    const deleteGameService = new DeleteGameService(prismaRepository)

    const { name } = req.params

    try {
      const result = await deleteGameService.execute(name)

      res.status(200).json({ message: 'Game deleted successfully!', result })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
}

export { DeleteGameController }