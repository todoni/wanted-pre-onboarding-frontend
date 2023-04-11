import { User } from "./User";

export interface UserRepository {
  signUp(user: User, onSuccess: () => void): Promise<void>;
  signIn(user: User): Promise<void>;
}
