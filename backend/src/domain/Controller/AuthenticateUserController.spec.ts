import { AuthenticateUserController } from "./AuthenticateUserController"
import HttpResponse from "./models/HttpResponse"

function makeSut() {

  const sut = new AuthenticateUserController()
  return {
    sut
  }
}

describe("AuthenticateUserController", () => {
  it('The method handle of instance AuthenticateUserController should return a httpResponse', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        code: 'any_code'
      }
    }

    const response = await sut.handle(httpRequest)
    expect(response instanceof HttpResponse).toBeTruthy()
  })

  it("should return 400 if not code is provided", async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {}
    }

    const response = await sut.handle(httpRequest)
    
    expect(response.statusCode).toBe(400)
  })
})