import { User, IUnregisteredUser } from '../entities'

interface IUserRepository {
  createUser(unregisteredUser: IUnregisteredUser): Promise<User>
  findById(id: number): Promise<User>
}

export {
  IUserRepository
}