import { PrismaUserRepository } from "../../domain/infra/prisma/PrismaUserRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { AuthenticateUserService } from "../../domain/services";
import { IController } from "../../presentations/contract/IController";
import { AuthenticateUserController } from '../../presentations/AuthenticateUserController'
import HttpRequest from "../../presentations/helpters/HttpRequest";

export default class AuthenticateControllerComposer implements IController {
  private authenticateUserController: IController
  private userRepository: IUserRepository
  private authenticateUserService: AuthenticateUserService

  constructor() {
    this.userRepository = new PrismaUserRepository()
    this.authenticateUserService = new AuthenticateUserService(this.userRepository)
    this.authenticateUserController = new AuthenticateUserController(this.authenticateUserService)
  }

  async handle(httpRequest: HttpRequest) {
    return this.authenticateUserController.handle(httpRequest)
  }
}