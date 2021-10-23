import { IEventObserver } from "../contracts";
import { IMessageRepository } from "../repositories/IMessageRepository";

class CreateMessageService {
  constructor(
    private readonly eventObserver: IEventObserver,
    private readonly messageRepository: IMessageRepository
  ) {}
  async execute(text: string, userId: string) {
    const message = await this.messageRepository.createMessage(text, userId)
    
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