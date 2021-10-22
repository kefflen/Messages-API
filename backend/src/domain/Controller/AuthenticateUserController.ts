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

    await this.authenticateUserService.execute(code)

    return HttpResponse.ok("valid response")
  }
}

export {
  AuthenticateUserController
}