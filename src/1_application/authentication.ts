import { User } from "../2_domain/User";
import { UserRepository } from "../2_domain/UserRepository";
import { HttpUserRepository } from "../3_infrastructure/HttpUserRepository";

const userRepository = HttpUserRepository();

export const signUp = async (
  user: User,
  onSuccess: () => void
): Promise<void> => {
  await userRepository.signUp(user, onSuccess);
};

export const signIn = async (
  user: User,
  onSuccess: () => void
): Promise<void> => {
  await userRepository.signIn(user, onSuccess);
};
