import { useAuth } from "../3_infrastructure/authAdapter";
import { useStore } from "./dd";

import { AuthenticationService, UserStorageService } from "./ports";

export const useAuthenticate = () => {
  const auth: AuthenticationService = useAuth();
  const storage: UserStorageService = useStore();

  async function authenticate(email: Email, password: Password): Promise<void> {
    const user = await auth.auth(email, password);
    storage.updateUser(user);
  }

  return {
    user: storage.user,
    authenticate,
  };
};
