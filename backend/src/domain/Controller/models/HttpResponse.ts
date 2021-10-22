export default class HttpResponse {
  #statusCode: number
  #body: any

  constructor(body: any, statusCode: number) {
    this.#statusCode = statusCode
    this.#body = body
  }

  static ok(body: any) {
    return new this(body, 200)
  }

  get statusCode() {
    return this.#statusCode
  }

  get body() {
    return this.#body
  }

}