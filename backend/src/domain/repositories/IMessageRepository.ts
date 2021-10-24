import { Message } from "../entities";

interface IMessageRepository {
  createMessage(text: string, user_id: string): Promise<Message>
  getMessages(offset: number, limit: number): Promise<Message[]>
  getMessageById(id: string): Promise<Message|null>
}

export {
  IMessageRepository
}