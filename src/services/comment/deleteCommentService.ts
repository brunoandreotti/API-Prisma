import { ICommentRepository } from "../../repositories/comment/ICommentRepository";

class DeleteCommentService {
  constructor(private commentRepository: ICommentRepository) {}

  async execute(id: string) {

    //Verifica se o comentário existe
    const comment = await this.commentRepository.findById(id)

    if(!comment) {
      throw new Error('Comment not found!')
    }

    const result = await this.commentRepository.delete(id)

    return result
  }
}

export { DeleteCommentService }