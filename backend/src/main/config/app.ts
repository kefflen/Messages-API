import express from 'express'
import setup from './setup'
import setuptRoutes from './setuptRoutes'
import http from 'http'
import { Server } from 'socket.io'


const app = express()

const httpServer = http.createServer(app)
const io = new Server(httpServer, {
  cors: {origin: '*'}
})

setup(app)
setuptRoutes(app)

export {
  io
}
export default httpServer