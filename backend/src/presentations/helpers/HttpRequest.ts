import { UserPayload } from "./UserPayload";

export default interface HttpRequest {
  body: any, user?: UserPayload
}