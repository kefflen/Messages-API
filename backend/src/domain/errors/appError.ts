class AppError extends Error {
  message: string
  statusCode: number
  name: string

  constructor(message: string, statusCode: number) {
    super(message)
    this.message = message
    this.statusCode = statusCode
    this.name = 'AppError'
  }
}

export {
  AppError
}