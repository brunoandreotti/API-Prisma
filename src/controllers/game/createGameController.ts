import {Request, Response} from 'express'
import { GamePrismaRepository } from '../../repositories/game/GamePrismaRepository'
import { GameData } from '../../repositories/game/IGameRepository'
import { CreateGameService } from '../../services/createGameService'

class CreateGameController {

  static async create(req: Request, res: Response) {
    const prismaRepository = new GamePrismaRepository()
    const createGameService = new CreateGameService(prismaRepository)

    const {name, description, developer} = req.body

    if(!name || !description || !developer){
      res.status(400).json({status: 400, message: 'All fields are required!'})
    }

    const game: GameData = {
      name,
      description,
      developer
    }

    try {
      const result = await createGameService.execute(game)

      res.status(201).json({message: 'Game created successfully!', result})
    } catch (error: any) {
      res.status(400).json({error: error.message})
    }
    

    

  }
}

export { CreateGameController }