import { GameSave, IGameRepository } from "./IGameRepository";
import { Games } from "@prisma/client";

import { prisma } from '../../database/client'

//Classe que implementa a interface com os métodos que serão utilizados nos services porém fazendo a conexão com o ORM
//Essa separação é vantajosa pois se no futuro o ORM mudar é só mudar o repositório do ORM
class GamePrismaRepository implements IGameRepository {

  async create(data: Games): Promise<GameSave> {

    const game = await prisma.games.create({
      data
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

}

export { GamePrismaRepository }