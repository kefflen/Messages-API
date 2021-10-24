import { IEventObserver } from "../contracts";
import { AppError } from "../errors/appError";
import { IMessageRepository } from "../repositories/IMessageRepository";

class CreateMessageService {
  constructor(
    private readonly eventObserver: IEventObserver,
    private readonly messageRepository: IMessageRepository
  ) {}
  async execute(text: string, userId: string) {
    if (!text.trim()) throw new AppError("Message can´t be a bland value", 400)

    let message
    try {
      message = await this.messageRepository.createMessage(text, userId)
    } catch(error) {
      throw new AppError("Unable to create a message in repository", 500)
    }
    
    const dataToObserver = {
      text: message.text,
      user_id: message.user_id,
      created_at: message.created_at,
      user: {
        name: message.user.name,
        avatar_url: message.user.avatar_url
      }
    }
    
    this.eventObserver.emit("new_message", dataToObserver)

    return message
  }
}

export {
  CreateMessageService
}