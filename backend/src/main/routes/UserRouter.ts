import {Router} from 'express'
import AuthenticateControllerComposer from '../composers/AuthenticateControllerComposer'
import { RouterExpressAdapter } from '../adapter'

const userRouter = Router()

userRouter.get('', RouterExpressAdapter.adapt(new AuthenticateControllerComposer()))

export {
  userRouter
}