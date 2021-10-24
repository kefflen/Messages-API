import { Request, Response } from "express";
import { IController } from "../presentations/contract/IController";

class RouterExpressAdapter {
  constructor(
    private readonly controller: IController
  ) {}

  handle() {
    return async (request: Request, response: Response) => {
      const httpRequest = {
        body: request.body
      }
      const httpResponse = await this.controller.handle(httpRequest)
      return response.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}

export {
  RouterExpressAdapter
}