import { GetMessagesService } from "../domain/services/GetMessagesService";
import { Controller } from "./contract/Controller";
import HttpRequest from "./helpers/HttpRequest";
import HttpResponse from "./helpers/HttpResponse";

class GetTenMessageOfPageController extends Controller {
  constructor(
    private readonly getMessagesService: GetMessagesService
  ) {
    super()
  }
  async execute(httpRequest: HttpRequest) {
    let page: number
    if (httpRequest.params?.page) {
      page = 1
    } else {
      page = Number(httpRequest.params.page)
    }
    
    if (isNaN(page)) return HttpResponse.badRequest("Page need to be a number")
    if (page <= 0) return HttpResponse.badRequest("The page need to be greater than 0")

    const offset = (page-1) * 10
    const messages = await this.getMessagesService.execute(offset, 10)

    return HttpResponse.ok(messages)
  }
}

export {
  GetTenMessageOfPageController
}