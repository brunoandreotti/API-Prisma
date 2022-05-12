import { Request, Response } from 'express'
import { GamePrismaRepository } from '../../repositories/game/GamePrismaRepository'
import { FindGameByNameService } from '../../services/game/findGameByNameService'
import { HandleNameService } from '../../services/utils/handleNameService'

class FindGameByNameController {
  static async find(req: Request, res: Response) {
    const prismaRepository = new GamePrismaRepository()
    const findGameByNameService = new FindGameByNameService(prismaRepository)

    const { name } = req.params

    //Retira '-' do nome
    const nameWithoutHyphen = HandleNameService.execute(name)

    try {
      const result = await findGameByNameService.execute(nameWithoutHyphen)
      res.status(200).json({ result })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
}

export { FindGameByNameController }
