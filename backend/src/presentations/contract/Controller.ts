import { AppError } from "../../domain/errors/appError";
import HttpRequest from "../helpers/HttpRequest";
import HttpResponse from "../helpers/HttpResponse";

class Controller {
  constructor() {}

  readonly handle = async (httpRequest: HttpRequest): Promise<HttpResponse> => {
    try {
      return await this.execute(httpRequest)
    } catch(err) {
      if (err instanceof AppError) {
        return HttpResponse.error(err.message, err.statusCode)
      } else {
        return HttpResponse.serverError("Unexpected server error", err)
      }
    }
  }

  async execute(httpRequest: HttpRequest): Promise<HttpResponse>{
    throw new Error("Not implemented")
  }
}

export {
  Controller
}