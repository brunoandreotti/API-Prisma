import { prisma } from '../../database/client'
import { GameData, GameSave, IGameRepository } from './IGameRepository'

//Classe que implementa a interface com os métodos que serão utilizados nos services porém fazendo a conexão com o ORM
//Essa separação é vantajosa pois se no futuro o ORM mudar é só mudar o repositório do ORM
class GamePrismaRepository implements IGameRepository {
  async create({ name, description, developer }: GameData): Promise<GameSave> {
    const game = await prisma.games.create({
      data: {
        name,
        description,
        developer
      }
    })

    return game
  }

  async findByName(name: string): Promise<GameSave | null> {
    const game = await prisma.games.findUnique({
      where: {
        name
      }
    })
    
    return game
  }

  async findAll(): Promise<GameSave[]> {
    const games = await prisma.games.findMany()

    return games
  }
}

export { GamePrismaRepository }
