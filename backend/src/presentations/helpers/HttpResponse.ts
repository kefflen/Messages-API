export default class HttpResponse {
  #statusCode: number
  #body: any
  #error: any

  constructor(body: any, statusCode: number, error=null) {
    this.#statusCode = statusCode
    this.#body = body
    this.#error = error
  }

  static ok(body: any) {
    return new this(body, 200)
  }

  static badRequest(body: any) {
    return this.error(body, 400)
  }

  static serverError(body= 'Internal error', error: any) {
    return this.error(body, 500, error)
  }

  static error(body:any, statusCode: number, error=null) {
    return new this({
        error: body,
        statuCode: statusCode
      }, statusCode, error)
  }
  
  get statusCode() {
    return this.#statusCode
  }

  get body() {
    return this.#body
  }

  get error() {
    return this.#error
  }

}