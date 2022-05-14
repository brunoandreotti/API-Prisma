//tipagem do dado que será recebido na request
export type CommentData = {
  text: string
  game_score: number
}

//tipagem do dado que será criado no banco de dados
export type CommentSave = {
  id: string;
  text: string;
  game_score: number;
  gamesId: string | null;
}

export interface ICommentRepository {
  create(gameName: string, data: CommentData): Promise<CommentSave>
}
