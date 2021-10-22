import { AppError } from "../errors/appError"
import { AuthenticateUserService } from "../services"
import HttpRequest from "./models/HttpRequest"
import HttpResponse from "./models/HttpResponse"


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