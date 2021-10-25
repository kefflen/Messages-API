import { Request, Response } from "express";
import { RouterExpressAdapter } from "./RouterExpressAdapter";
import jsonwebtoken from 'jsonwebtoken'
import HttpResponse from "../../presentations/helpers/HttpResponse";
import { UserPayload } from "../../presentations/helpers/UserPayload";

class RouterExpressAdapterLogged extends RouterExpressAdapter {

  handle = async (request: Request, response: Response) => {
    const bearerToken = request.headers.authorization
    const payload = await this.athenticateToken(bearerToken)
    if (!payload) {
      const httpResponse = HttpResponse.unauthorized("Need to have a valid token to access")
      return response.status(httpResponse.statusCode).json(httpResponse.body)
    }
    const httpRequest = {
      body: request.body, user: payload
    }
    const httpResponse = await this.controller.handle(httpRequest)
    return response.status(httpResponse.statusCode).json(httpResponse.body)
  }

  async athenticateToken(bearerToken: string|undefined) {
    if (!bearerToken || !bearerToken.startsWith('Bearer ')) return null
    const [,token] = bearerToken.split(' ')
    let payload
    try {
      payload = await jsonwebtoken.verify(token, process.env.SECRET||'secret') as UserPayload
    } catch(err) {
      return null
    }
    return payload
  }
}


export {
  RouterExpressAdapterLogged
}