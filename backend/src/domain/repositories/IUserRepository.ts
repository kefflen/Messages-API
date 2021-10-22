import { User, IUnregisteredUser } from '../entities'

interface IUserRepository {
  createUser(unregisteredUser: IUnregisteredUser): Promise<User>
  findById(id: string): Promise<User|null>
  findByGithubId(id: number): Promise<User|null>
}

export {
  IUserRepository
}