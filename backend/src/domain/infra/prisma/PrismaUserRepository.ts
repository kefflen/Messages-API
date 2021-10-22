import { IUnregisteredUser, User } from "../../entities";
import { IUserRepository } from "../../repositories/IUserRepository";
import prismaClient from "./prismaClient";

class PrismaUserRepository implements IUserRepository {
  async createUser(unregisteredUser: IUnregisteredUser) {
    const user = await prismaClient.user.create({
      data: unregisteredUser
    })
    return this.convertToEntitieUser(user)
  }

  async findById(id: number) {
    const user = await prismaClient.user.findFirst({
      where: {github_id: id}
    })
    return this.convertToEntitieUser(user)
  }

  convertToEntitieUser(user: any) {
    return new User(user.id, user.name, user.github_id, user.avatar_url, user.login)
  }
}

export {
  PrismaUserRepository
}