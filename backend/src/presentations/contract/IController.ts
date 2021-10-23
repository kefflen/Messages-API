import HttpRequest from "../helpters/HttpRequest";
import HttpResponse from "../helpters/HttpResponse";

interface IController {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>
}

export {
  IController
}