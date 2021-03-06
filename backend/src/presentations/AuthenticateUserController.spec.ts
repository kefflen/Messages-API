import { AuthenticateUserController } from "./AuthenticateUserController"
import HttpResponse from "./helpers/HttpResponse"
import { AppError } from '../domain/errors/appError'

function makeAuthenticateUserServiceSpy() {
  class AuthenticateUserServiceSpy {
    result: string|undefined
    code: string|undefined
    async execute(code: string) {
      this.code = code
      return this.result
    }
  }

  return new AuthenticateUserServiceSpy()
}

type Dependencies = {
  authenticateUserService: any|undefined
}

function makeSut(injectDepedency={} as Dependencies) {
  const authenticateUserServiceSpy = injectDepedency.authenticateUserService?? makeAuthenticateUserServiceSpy()
  const sut = new AuthenticateUserController(authenticateUserServiceSpy)
  return {
    sut, authenticateUserServiceSpy
  }
}

describe("AuthenticateUserController test cases that fails", () => {
  it('The method handle of instance AuthenticateUserController should return a httpResponse', async () => {
    const { sut } = makeSut()
    const httpRequest = validHttpRequest()

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

  it('The method execute of AuthenticateUserService should receive code as argument', async () => {
    const { sut, authenticateUserServiceSpy } = makeSut()
    const code = 'any_code'
    const httpRequest = validHttpRequest()

    await sut.handle(httpRequest)
    expect(authenticateUserServiceSpy.code).toBe(code)
  })

  it('Should handle appError and return it´s statusCode', async () => {
    const authenticateUserServiceMock = {
      execute(code: string) {
        throw new AppError("Any error", 400)
      }
    }
    const { sut } = makeSut({authenticateUserService: authenticateUserServiceMock})

    const httpRequest = validHttpRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
  })
})

describe("tests that should return a good response", () => {
  it('should return 200 if code is passed', async () => {
    const { sut } = makeSut()
    const httpRequest = validHttpRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(200)
  })

  it('if everything is alright. Should return on body the result of AthenticateUserService.execute', async () => {
    const { sut, authenticateUserServiceSpy } = makeSut()
    const result = 'valid_result'
    authenticateUserServiceSpy.result = result

    const httpResponse = validHttpRequest()
    const response = await sut.handle(httpResponse)

    expect(response.body).toBe(result)
  })
})


function validHttpRequest() {
  return {
    body: {
      code: 'any_code'
    }
  }
}