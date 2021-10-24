import {Router} from 'express'
import AuthenticateControllerComposer from '../composers/AuthenticateControllerComposer'
import { RouterExpressAdapter } from '../adapter'

const userRouter = Router()

userRouter.get('', new RouterExpressAdapter(new AuthenticateControllerComposer()).handle)

export {
  userRouter
}