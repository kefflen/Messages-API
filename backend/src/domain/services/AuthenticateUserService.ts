import axios from "axios"
import { IJwtGenerator } from "../contracts/IJwtGenerator"
import { AppError } from "../errors/appError"
import { IUserRepository } from "../repositories/IUserRepository"
interface IAccessTokenReponse {
  access_token: string
}

interface IUserGithubResponse {
  avatar_url: string,
  login: string,
  id: number,
  name: string
}

class AuthenticateUserService {
  constructor(
    private userRepository: IUserRepository,
    private jwtGenerator: IJwtGenerator
  ){}
  
  async execute(code: string) {
    const token = await this.getTokenFromGithub(code)
    const profile = await this.getProfileFromGithub(token)
    
    let user = await this.userRepository.findByGithubId(profile.id)
    if (!user) {
      user = await this.userRepository.createUser({
        name: profile.name,
        github_id: profile.id,
        avatar_url: profile.avatar_url,
        login: profile.login
      })
    } 

    const secret = process.env.SECRET
    if (!secret) throw new AppError("Internal error: Need secret password to generate jwt token", 500)
    const jwtToken = await this.jwtGenerator.sign({
      name: user.name, id: user.id
    }, secret)

    return {user, token: jwtToken}
  }

  async getTokenFromGithub(code: string) {
    const url = `http://github.com/login/oauth/access_token`
    const client_id = process.env.GITHUB_CLIENT_ID
    const client_secret = process.env.GITHUB_CLIENT_SECRET
    const { data: accessTokenResponse } = await axios.post<IAccessTokenReponse>(
      url, null, {
        params: { client_id, client_secret, code},
        headers: { "Accept": "application/json"}
      }
    )

    if (!accessTokenResponse.access_token) {
      throw new AppError("Access token invalid", 401)
    }
    return accessTokenResponse.access_token
  }

  async getProfileFromGithub(token: string) {
    const {data: user} = await axios.get<IUserGithubResponse>("http://api.github.com/user", {
      headers: {authorization: `Bearer ${token}`}
    })
    return user
  }
}


export {
  AuthenticateUserService
}