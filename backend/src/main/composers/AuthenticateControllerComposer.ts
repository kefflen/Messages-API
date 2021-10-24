import { PrismaUserRepository } from "../../infra/repositories/prisma/PrismaUserRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { AuthenticateUserService } from "../../domain/services";
import { Controller } from "../../presentations/contract/Controller";
import { AuthenticateUserController } from '../../presentations/AuthenticateUserController'
import HttpRequest from "../../presentations/helpers/HttpRequest";

export default class AuthenticateControllerComposer extends Controller {
  private authenticateUserController: Controller
  private userRepository: IUserRepository
  private authenticateUserService: AuthenticateUserService

  constructor() {
    super()
    this.userRepository = new PrismaUserRepository()
    this.authenticateUserService = new AuthenticateUserService(this.userRepository)
    this.authenticateUserController = new AuthenticateUserController(this.authenticateUserService)
  }

  async execute(httpRequest: HttpRequest) {
    return await this.authenticateUserController.handle(httpRequest)
  }
}