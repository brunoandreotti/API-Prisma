import { Games } from "@prisma/client";
import { IGameRepository } from "../repositories/game/IGameRepository";



class CreateGameService {

  constructor(private gameRepository: IGameRepository) {}
  
  
  async execute(data: Games) {
    //Verifica se o jogo já existe
    const gameAlreadyExistis = await this.gameRepository.findByName(data.name)
  }
}

export { CreateGameService }