import { UserStorageService } from "../1_application/ports";
import { useStore } from "../1_application/dd";

export const useUserStorage = (): UserStorageService => {
  return useStore();
};
