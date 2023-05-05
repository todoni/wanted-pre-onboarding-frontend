import { User } from "./User";

export interface IUserRepository {
  signUp(user: User, onSuccess: () => void): Promise<void>;
  signIn(user: User, onSuccess: () => void): Promise<void>;
}
