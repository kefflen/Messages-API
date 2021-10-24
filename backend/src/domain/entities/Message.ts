import { User } from './User'

class Message {
  constructor(
    public id: string,
    public text: string,
    public user_id: string,
    public created_at: Date,
    public user: User,
  ) {}
}

export {
  Message
}