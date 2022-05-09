import { Games } from '@prisma/client'

//tipagem do dado que será criado no banco de dados
export type GameSave = {
  id: String
  name: String
  description: String
  developer: String
}

//Interface que terá os métodos que poderão ser utilizados nos services
export interface IGameRepository {
  create(data: Games): Promise<GameSave>
  findByName(name: string): Promise<GameSave | null>
}
