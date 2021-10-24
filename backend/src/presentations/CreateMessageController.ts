import { AppError } from "../domain/errors/appError";
import { CreateMessageService } from "../domain/services/CreateMessageService";
import { IController } from "./contract/IController";
import HttpRequest from "./helpers/HttpRequest";
import HttpResponse from "./helpers/HttpResponse";

class CreateMessageController implements IController{
  constructor(
    private readonly createMessageService: CreateMessageService
  ) {}

  async handle(httpRequest: HttpRequest) {
    if (!httpRequest.body.text) return HttpResponse.badRequest("Need to pass a text to request body")
    if (!httpRequest.body.userId) return HttpResponse.serverError("Need user id to create message")
    const { text, userId} = httpRequest.body
    
    let message
    try {
      message = await this.createMessageService.execute(text, userId)
    } catch(error) {
      if (error instanceof AppError) {
        return new HttpResponse(error.message, error.statusCode)
      } else {
        return HttpResponse.serverError('Unknown error: Not able to authenticate user')
      }
    }

    return HttpResponse.ok(message)
  }
}

export {
  CreateMessageController
}