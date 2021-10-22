import { AuthenticateUserService } from "./AuthenticateUserService"

function makeSut() {
  const spyMethodGetProfileFromGithub = new SpyMethodGetProfileFromGithub()
  const sut = new AuthenticateUserService()

  return {
    sut, spyMethodGetProfileFromGithub
  }
}

class SpyMethodGetProfileFromGithub {
  code: string|undefined
  call = async (code: string) => {
    this.code = code
  }
}

describe('AuthenticateUserService tests', () => {
  it("Should give to getProfileFromGithub method the code received", async () => {
    const { sut, spyMethodGetProfileFromGithub } = makeSut()

    sut.getProfileFromGithub = spyMethodGetProfileFromGithub.call
    const code = 'any_code'
    await sut.execute(code)

    expect(spyMethodGetProfileFromGithub.code).toBe(code)
  })

})