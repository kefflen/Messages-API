import { User } from "../entities/User";

interface IUserRepository {
  createUser(
    name: string, github_id: string,
    avatarUrl: string, login: string
  ): Promise<User>

  findById(id: string): Promise<User>
  update(user: User): Promise<User>
}

export {
  IUserRepository
}