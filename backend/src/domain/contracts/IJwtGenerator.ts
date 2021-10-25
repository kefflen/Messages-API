
interface IJwtGenerator {
  sign: (payload: any, authSecret: string) => Promise<string>
}

export {
  IJwtGenerator
}