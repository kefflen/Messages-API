import HttpRequest from "./models/HttpRequest";
import HttpResponse from "./models/HttpResponse";


class AuthenticateUserController {
  async handle(httpRequest: HttpRequest) {

    
    return new HttpResponse("any_error_message", 400)
  }
}

export {
  AuthenticateUserController
}