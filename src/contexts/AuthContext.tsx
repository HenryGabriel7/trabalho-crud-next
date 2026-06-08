import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { api, TOKEN_KEY, getErrorMessage } from '../lib/api';
import type { JwtPayload, LoginCredentials } from '../types';

// ===================================================
// Tipos do contexto
// ===================================================
interface AuthContextData {
  user: JwtPayload | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

// ===================================================
// Criação do contexto
// ===================================================
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// ===================================================
// Decodifica o payload do JWT (base64url)
// ===================================================
function decodeToken(token: string): JwtPayload | null {
  try {
    const part = token.split('.')[1];
    const base64 = part.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64)) as JwtPayload;
  } catch {
    return null;
  }
}

function isTokenValid(token: string): boolean {
  const payload = decodeToken(token);
  if (!payload) return false;
  return payload.exp * 1000 > Date.now();
}

// ===================================================
// Provider
// ===================================================
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verifica token salvo ao montar
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token && isTokenValid(token)) {
      setUser(decodeToken(token));
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
    setIsLoading(false);
  }, []);

  // Login: chama POST /auth/login no backend NestJS
  const login = useCallback(async (credentials: LoginCredentials) => {
    const response = await api.post<{ access_token: string }>('/auth/login', {
      email: credentials.email,
      password: credentials.password,
    });

    const { access_token } = response.data;
    localStorage.setItem(TOKEN_KEY, access_token);
    setUser(decodeToken(access_token));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ===================================================
// Hook de consumo
// ===================================================
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
}

export { getErrorMessage };
