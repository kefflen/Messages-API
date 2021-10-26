import { Router } from 'express'
import { RouterExpressAdapter } from '../adapters/RouterExpressAdapter'
import { RouterExpressAdapterLogged } from '../adapters/RouterExpressAdapterLogged'
import { CreateMessageControllerComposer } from '../composers/CreateMessageControllerComposer'
import { GetTenMessageOfPageControllerComposer } from '../composers/GetTenMessageOfPageControllerComposer'

const messageRouter = Router()

messageRouter.get('/:page', new RouterExpressAdapter(new GetTenMessageOfPageControllerComposer()).handle)
messageRouter.post('', new RouterExpressAdapterLogged(new CreateMessageControllerComposer()).handle)

export {
  messageRouter
}