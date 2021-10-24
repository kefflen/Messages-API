import { Router } from 'express'
import { RouterExpressAdapter } from '../adapters/RouterExpressAdapter'
import { CreateMessageControllerComposer } from '../composers/CreateMessageControllerComposer'

const router = Router()

router.post('messages', new RouterExpressAdapter(new CreateMessageControllerComposer()).handle)