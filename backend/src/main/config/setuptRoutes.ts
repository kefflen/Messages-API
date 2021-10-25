import { Express, Request, Response } from "express"
import { userRouter } from "../routes"
import { messageRouter } from "../routes/MessagesRouter"


export default (app: Express) => {
  app.use('/user', userRouter)
  app.use('/messages', messageRouter)
  app.get('/login', (request: Request, response: Response) => {
    const clientId = process.env.GITHUB_CLIENT_ID
    return response.redirect(`http://github.com/login/oauth/authorize?client_id=${clientId}`)
  })
}