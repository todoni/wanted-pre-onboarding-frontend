import { User } from "./User";

export interface UserRepository {
  signUp(user: User): Promise<void>;
  signIn(user: User): Promise<void>;
}
