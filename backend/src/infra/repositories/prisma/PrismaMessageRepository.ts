import { Message } from "../../../domain/entities";
import { IMessageRepository } from "../../../domain/repositories/IMessageRepository";
import prismaClient from "./prismaClient"
import {
  Message as PrimasMessage,
  User as PrimasUser
} from ".prisma/client"


class PrismaMessageRepository implements IMessageRepository {
  async createMessage(text: string, user_id: string): Promise<Message> {
    const message = await prismaClient.message.create({
      data: {text, user_id}, include: {user: true}
    })
    return this.convertToEntitieMessage(message)
  }

  async getMessages(offset: number, limit: number): Promise<Message[]> {
    const messages = await prismaClient.message.findMany({
      take: limit, skip: offset, include: {user: true}
    })
    return messages.map(message => this.convertToEntitieMessage(message))
  }

  async getMessageById(id: string): Promise<Message|null> {
    const message = await prismaClient.message.findUnique({
      where: {id}, include: {user: true}
    })
    if (message) {
      return this.convertToEntitieMessage(message)
    } else {
      return null
    }
  }

  private convertToEntitieMessage(obj: PrimasMessage & {user: PrimasUser}) {
    return new Message(obj.id, obj.text, obj.user_id, obj.created_at, obj.user)
  } 
}

export {
  PrismaMessageRepository
}
