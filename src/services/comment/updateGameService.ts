import {
  CommentUploadData,
  ICommentRepository
} from '../../repositories/comment/ICommentRepository'

class UpdateCommentService {
  constructor(private commentRepository: ICommentRepository) {}

  async execute(data: CommentUploadData) {
    //Verifica se o comentário existe
    const comment = await this.commentRepository.findById(data.id)

    if (!comment) {
      throw new Error('Comment not found!')
    }

    const updatedData = {
      ...data
    }

    const updatedComment = await this.commentRepository.update(updatedData)

    return updatedComment
  }
}

export { UpdateCommentService }
