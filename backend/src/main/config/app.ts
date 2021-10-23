import express from 'express'
import setup from './setup'
import setuptRoutes from './setuptRoutes'


const app = express()

setup(app)
setuptRoutes(app)

export default app