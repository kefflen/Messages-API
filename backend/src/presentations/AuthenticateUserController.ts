import { AppError } from "../domain/errors/appError"
import { AuthenticateUserService } from "../domain/services"
import { IController } from "./contract/IController"
import HttpRequest from "./helpers/HttpRequest"
import HttpResponse from "./helpers/HttpResponse"


class AuthenticateUserController implements IController {
  constructor(
    private authenticateUserService: AuthenticateUserService
  ) {}

  async handle(httpRequest: HttpRequest) {
    if (!httpRequest.body.code) return HttpResponse.badRequest('Need to pass code to request')

    const { code } = httpRequest.body
    let result
    try {
      result = await this.authenticateUserService.execute(code)
    } catch (error) {
      if (error instanceof AppError) {
        return new HttpResponse(error.message, error.statusCode)
      } else {
        return HttpResponse.serverError('Unknown error: Not able to authenticate user')
      }
    }
    
    return HttpResponse.ok(result)
  }
}

export {
  AuthenticateUserController
}