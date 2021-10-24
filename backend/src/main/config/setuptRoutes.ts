import { Express } from "express"
import { userRouter } from "../routes"


export default (app: Express) => {
  app.use('/user', userRouter)
}