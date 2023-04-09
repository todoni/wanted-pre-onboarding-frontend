import { User } from "../2_domain/User";
import { UserRepository } from "../2_domain/UserRepository";
import { validateUser } from "../2_domain/User";

export const signUp = async (
  user: User,
  userRepository: UserRepository
): Promise<void> => {
  try {
    // 유효성 검증
    validateUser(user);

    // 리포지토리를 통해 회원가입 수행
    await userRepository.signUp(user);
  } catch (error) {
    console.error(`Failed to sign up: ${error}`);
    throw new Error("Failed to sign up");
  }
};

export const signIn = async (
  user: User,
  userRepository: UserRepository
): Promise<void> => {
  try {
    validateUser(user);
    await userRepository.signIn(user);
  } catch (error) {
    console.error(`Failed sign in: ${error}`);
    throw new Error("Failed to sign in");
  }
};
