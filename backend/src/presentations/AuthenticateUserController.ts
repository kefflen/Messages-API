import { AppError } from "../domain/errors/appError"
import { AuthenticateUserService } from "../domain/services"
import HttpRequest from "./helpters/HttpRequest"
import HttpResponse from "./helpters/HttpResponse"


class AuthenticateUserController {
  constructor(
    private authenticateUserService: AuthenticateUserService
  ) {}

  async handle(httpRequest: HttpRequest) {
    if (!httpRequest.body.code) return new HttpResponse("any_error_message", 400)

    const { code } = httpRequest.body
    try {
      await this.authenticateUserService.execute(code)
    } catch (error) {
      if (error instanceof AppError) {
        return new HttpResponse(error.message, error.statusCode)
      }
    }

    return HttpResponse.ok("valid response")
  }
}

export {
  AuthenticateUserController
}