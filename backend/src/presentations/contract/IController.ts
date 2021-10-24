import HttpRequest from "../helpers/HttpRequest";
import HttpResponse from "../helpers/HttpResponse";

interface IController {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>
}

export {
  IController
}