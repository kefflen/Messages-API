import { AuthenticateUserService } from "../domain/services"
import { Controller } from "./contract/Controller"
import HttpRequest from "./helpers/HttpRequest"
import HttpResponse from "./helpers/HttpResponse"


class AuthenticateUserController extends Controller {
  authenticateUserService: AuthenticateUserService
  constructor(
    authenticateUserService: AuthenticateUserService
  ) {
    super()
    this.authenticateUserService = authenticateUserService
  }

  async execute(httpRequest: HttpRequest) {
    if (!httpRequest.body.code) return HttpResponse.badRequest('Need to pass code to request')
    const { code } = httpRequest.body
    const result = await this.authenticateUserService.execute(code)
    return HttpResponse.ok(result)
  }
}

export {
  AuthenticateUserController
}