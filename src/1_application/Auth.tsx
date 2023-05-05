import React, { createContext, useContext } from "react";
import HttpUserRepository from "../3_infrastructure/HttpUserRepository";
import { User } from "../2_domain/User";

interface AuthContextType {
  isAuthenticated: () => boolean;
  login: (user: User, onSuccess: () => void) => Promise<void>;
  logout: () => void;
  signup: (user: User, onSuccess: () => void) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: () => false,
  login: () => Promise.resolve(),
  logout: () => {},
  signup: () => Promise.resolve(),
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const userRepository = new HttpUserRepository();

  const isAuthenticated = (): boolean => {
    return !!localStorage.getItem("token");
  };

  const login = async (user: User, onSuccess: () => void) => {
    try {
      await userRepository.signIn(user, onSuccess);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  const signup = async (user: User, onSuccess: () => void) => {
    try {
      await userRepository.signUp(user, onSuccess);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
