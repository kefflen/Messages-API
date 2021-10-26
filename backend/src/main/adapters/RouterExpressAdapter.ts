import { Request, Response } from "express";
import { Controller } from "../../presentations/contract/Controller";

class RouterExpressAdapter {
  constructor(
    protected readonly controller: Controller
  ) {}

  handle = async (request: Request, response: Response) => {
    const httpRequest = {
      body: request.body, params: request.params
    }
    const httpResponse = await this.controller.handle(httpRequest)
    return response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

export {
  RouterExpressAdapter
}