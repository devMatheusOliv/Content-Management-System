import React, { createContext, useContext, useReducer, useEffect } from "react";
import { User, AuthState } from "../types";

// Definindo as ações possíveis
type AuthAction =
  | { type: "LOGIN_REQUEST" }
  | { type: "LOGIN_SUCCESS"; payload: { user: User; token: string } }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "REGISTER_REQUEST" }
  | { type: "REGISTER_SUCCESS"; payload: { user: User; token: string } }
  | { type: "REGISTER_FAILURE"; payload: string };

// Estado inicial
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  error: null,
};

// Reducer para gerenciar o estado
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_REQUEST":
    case "REGISTER_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case "LOGIN_FAILURE":
    case "REGISTER_FAILURE":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

// Criando o contexto
interface AuthContextProps {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Efeito para salvar o token no localStorage
  useEffect(() => {
    if (state.token) {
      localStorage.setItem("token", state.token);
    } else {
      localStorage.removeItem("token");
    }
  }, [state.token]);

  // Função de login
  const login = async (email: string, password: string) => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      // Simulando uma chamada de API
      // Em um ambiente real, você faria uma chamada para seu backend
      const response = await new Promise<{ user: User; token: string }>(
        (resolve) => {
          setTimeout(() => {
            resolve({
              user: {
                id: "1",
                username: "admin",
                email: email,
                role: "admin",
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              token: "fake-jwt-token",
            });
          }, 1000);
        }
      );

      dispatch({ type: "LOGIN_SUCCESS", payload: response });
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: "Falha ao fazer login. Verifique suas credenciais.",
      });
    }
  };

  // Função de registro
  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    dispatch({ type: "REGISTER_REQUEST" });
    try {
      // Simulando uma chamada de API
      const response = await new Promise<{ user: User; token: string }>(
        (resolve) => {
          setTimeout(() => {
            resolve({
              user: {
                id: "2",
                username,
                email,
                role: "editor",
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              token: "fake-jwt-token",
            });
          }, 1000);
        }
      );

      dispatch({ type: "REGISTER_SUCCESS", payload: response });
    } catch (error) {
      dispatch({
        type: "REGISTER_FAILURE",
        payload: "Falha ao registrar. Tente novamente.",
      });
    }
  };

  // Função de logout
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
