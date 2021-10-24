import {Router} from 'express'
import AuthenticateControllerComposer from '../composers/AuthenticateControllerComposer'
import { RouterExpressAdapter } from '../adapters/adapter'

const userRouter = Router()

userRouter.post('/auth', (new RouterExpressAdapter(new AuthenticateControllerComposer()).handle))

export {
  userRouter
}