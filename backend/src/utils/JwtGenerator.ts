import { IJwtGenerator } from '../domain/contracts/IJwtGenerator'
import jsonwebtoken from 'jsonwebtoken'

class JwtGenerator implements IJwtGenerator {
  async sign(payload: any, authSecret: string) {
    const token = await jsonwebtoken.sign(payload, authSecret)
    return token
  }
}

export {
  JwtGenerator
}