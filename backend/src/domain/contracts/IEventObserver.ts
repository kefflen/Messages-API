
interface IEventObserver {
  emit(event: string, data: any) : void
}

export {
  IEventObserver
}