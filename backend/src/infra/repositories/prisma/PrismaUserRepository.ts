import { IUnregisteredUser, User } from "../../../domain/entities"
import { IUserRepository } from "../../../domain/repositories/IUserRepository"
import prismaClient from "./prismaClient";

class PrismaUserRepository implements IUserRepository {
  async createUser(unregisteredUser: IUnregisteredUser) {
    const user = await prismaClient.user.create({
      data: unregisteredUser
    })
    return this.convertToEntitieUser(user)
  }

  async findById(id: string) {
    const user = await prismaClient.user.findFirst({
      where: { id }
    })
    if (user) {
      return null
    } else {
      return this.convertToEntitieUser(user)
    }
  }

  async findByGithubId(id: number) {
    const user = await prismaClient.user.findFirst({
      where: {github_id: id}
    })
    if (user) {
      return null
    } else {
      return this.convertToEntitieUser(user)
    }
  }

  convertToEntitieUser(user: any) {
    return new User(user.id, user.name, user.github_id, user.avatar_url, user.login)
  }
}

export {
  PrismaUserRepository
}