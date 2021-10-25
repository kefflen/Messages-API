import { Router } from 'express'
import { RouterExpressAdapter } from '../adapters/RouterExpressAdapter'
import { RouterExpressAdapterLogged } from '../adapters/RouterExpressAdapterLoged'
import { CreateMessageControllerComposer } from '../composers/CreateMessageControllerComposer'

const messageRouter = Router()

messageRouter.post('', new RouterExpressAdapterLogged(new CreateMessageControllerComposer()).handle)

export {
  messageRouter
}