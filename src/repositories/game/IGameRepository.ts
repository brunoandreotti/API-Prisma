export type GameData = {
  name: string
  description: string
  developer: string
}

//tipagem do dado que será criado no banco de dados
export type GameSave = {
  id: string
  name: string
  description: string
  developer: string
}

//Interface que terá os métodos que poderão ser utilizados nos services
export interface IGameRepository {
  create(data: GameData): Promise<GameSave>
  findByName(name: string): Promise<GameSave | null>
  findAll(): Promise<GameSave[]>
  update(data: GameSave): Promise<GameSave>
  delete(name: string): Promise<GameSave>
}
