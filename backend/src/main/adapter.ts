import { Request, Response } from "express";
import { IController } from "../presentations/contract/IController";

class RouterExpressAdapter {
  adapte(router: IController) {
    return async (request: Request, response: Response) => {
      const httpRequest = {
        body: request.body
      }
      const httpResponse = await router.handle(httpRequest)
      response.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}

export {
  RouterExpressAdapter
}