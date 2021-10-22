import { AuthenticateUserController } from "./AuthenticateUserController"
import HttpResponse from "./models/HttpResponse"


function makeAuthenticateUserServiceSpy() {
  class AuthenticateUserServiceSpy {
    code: string|undefined
    async execute(code: string) {
      this.code = code
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

  it('The method execute of AuthenticateUserService should receive code as argument', async () => {
    const { sut, authenticateUserServiceSpy } = makeSut()
    const code = 'any_code'
    const httpRequest = {
      body: {
        code
      }
    }

    await sut.handle(httpRequest)
    expect(authenticateUserServiceSpy.code).toBe(code)
  })
})

describe("tests that should return a good response", () => {
  it('should return 200 if code is passed', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        code: 'any_code'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(200)
  })
})