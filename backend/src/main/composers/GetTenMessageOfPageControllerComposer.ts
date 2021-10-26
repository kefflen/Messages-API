import { IMessageRepository } from "../../domain/repositories/IMessageRepository";
import { GetMessagesService } from "../../domain/services/GetMessagesService";
import { PrismaMessageRepository } from "../../infra/repositories/prisma/PrismaMessageRepository";
import { Controller } from "../../presentations/contract/Controller";
import { GetTenMessageOfPageController } from "../../presentations/GetTenMessageOfPageController";
import HttpRequest from "../../presentations/helpers/HttpRequest";

class GetTenMessageOfPageControllerComposer extends Controller {
  private readonly messageRepository: IMessageRepository
  private readonly getMessagesService: GetMessagesService
  private readonly getTenMessageOfPageController: GetTenMessageOfPageController
	constructor() {
    super()
    this.messageRepository = new PrismaMessageRepository()
    this.getMessagesService = new GetMessagesService(this.messageRepository)
    this.getTenMessageOfPageController = new GetTenMessageOfPageController(this.getMessagesService)
  }
  async execute(httpRequest: HttpRequest) {
    return await this.getTenMessageOfPageController.handle(httpRequest)
  }
}

export {
  GetTenMessageOfPageControllerComposer
}