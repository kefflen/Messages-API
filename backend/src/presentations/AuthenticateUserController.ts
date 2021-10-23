import { AppError } from "../domain/errors/appError"
import { AuthenticateUserService } from "../domain/services"
import { IController } from "./contract/IController"
import HttpRequest from "./helpters/HttpRequest"
import HttpResponse from "./helpters/HttpResponse"


class AuthenticateUserController implements IController {
  constructor(
    private authenticateUserService: AuthenticateUserService
  ) {}

  async handle(httpRequest: HttpRequest) {
    if (!httpRequest.body.code) return new HttpResponse("any_error_message", 400)

    const { code } = httpRequest.body
    let result
    try {
      result = await this.authenticateUserService.execute(code)
    } catch (error) {
      if (error instanceof AppError) {
        return new HttpResponse(error.message, error.statusCode)
      }
    }
    
    return HttpResponse.ok(result)
  }
}

export {
  AuthenticateUserController
}