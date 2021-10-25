import { Express } from "express"
import { userRouter } from "../routes"
import { messageRouter } from "../routes/MessagesRouter"


export default (app: Express) => {
  app.use('/user', userRouter)
  app.use('/messages', messageRouter)
}