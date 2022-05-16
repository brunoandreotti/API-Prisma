//tipagem do dado que será recebido na request
export type CommentData = {
  text: string
  game_score: number
}

export type CommentUploadData = {
  id: string
  text: string
  game_score: number
}

//tipagem do dado que será criado no banco de dados
export type CommentSave = {
  id: string;
  text: string;
  game_score: number;
  gameId: string | null;
}

import { Comments } from "@prisma/client";

export interface ICommentRepository {
  create(gameName: string, data: CommentData): Promise<Comments>
  findById(id: string): Promise<Comments| null>
  update(data: CommentUploadData): Promise<Comments>
  delete(id: string): Promise<Comments>
}
