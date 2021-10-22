
class AuthenticateUserService {
  async execute(code: string) {
    await this.getProfileFromGithub(code)
    
    return ''
  }

  async getProfileFromGithub(code: string) {

  }
}

export {
  AuthenticateUserService
}