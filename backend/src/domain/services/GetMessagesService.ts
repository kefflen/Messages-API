import { AppError } from "../errors/appError";
import { IMessageRepository } from "../repositories/IMessageRepository";

class GetMessagesService {
  constructor(
    private readonly messageRepository: IMessageRepository
  ) {}
  async execute(offset: number, limit: number) {
    if (0 > limit && limit > 100) throw new AppError("Limit need to be a value from 1 to 100", 400)
    const messages = await this.messageRepository.getMessages(offset, limit)

    return messages
  }
}

export {
  GetMessagesService
}