import { IEventObserver } from "../domain/contracts";
import { io } from "../main/config/app"

class WebSocketObserver implements IEventObserver {
  emit(event: string, data: any): void {
    io.emit(event, data)
  }
}

export {
  WebSocketObserver
}