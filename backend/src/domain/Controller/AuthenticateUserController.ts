import HttpRequest from "./models/HttpRequest";
import HttpResponse from "./models/HttpResponse";


class AuthenticateUserController {
  async handle(httpRequest: HttpRequest) {
    if (!httpRequest.body.code) return new HttpResponse("any_error_message", 400)

    return HttpResponse.ok("valid response")
  }
}

export {
  AuthenticateUserController
}