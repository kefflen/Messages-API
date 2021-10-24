import { IEventObserver } from "../../domain/contracts";
import { CreateMessageService } from "../../domain/services/CreateMessageService";
import { WebSocketObserver } from "../../utils/WebSocketObsever";
import { PrismaMessageRepository } from "../../infra/repositories/prisma/PrismaMessageRepository";
import { Controller } from "../../presentations/contract/Controller";
import { CreateMessageController } from "../../presentations/CreateMessageController";
import HttpRequest from "../../presentations/helpers/HttpRequest";



class CreateMessageControllerComposer extends Controller {
  createMessageController: CreateMessageController
  createMessageService: CreateMessageService
  prismaMessageRepository: PrismaMessageRepository
  eventObserver: IEventObserver

  constructor() {
    super()
    this.eventObserver = new WebSocketObserver()
    this.prismaMessageRepository = new PrismaMessageRepository()
    this.createMessageService = new CreateMessageService(this.eventObserver, this.prismaMessageRepository)
    this.createMessageController = new CreateMessageController(this.createMessageService)
  }

  async execute(httpRequest: HttpRequest) {
    return await this.createMessageController.handle(httpRequest)
  }
}

export {
  CreateMessageControllerComposer
}