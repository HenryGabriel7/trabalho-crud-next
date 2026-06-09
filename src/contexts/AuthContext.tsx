import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { TOKEN_KEY, getErrorMessage } from '../lib/api';
import { authStore, delay } from '../lib/mockStore';
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
// Decodifica o payload do token fake (base64url)
// A estrutura é idêntica a um JWT real: header.payload.sig
// ===================================================
function decodeToken(token: string): JwtPayload | null {
  try {
    const part = token.split('.')[1];
    // Reconverte base64url → base64 padrão
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

  // Login: chama authStore.login (mock do POST /auth/login)
  const login = useCallback(async (credentials: LoginCredentials) => {
    await delay(500); // simula latência de rede

    // authStore.login lança erro se as credenciais forem inválidas
    const { access_token } = authStore.login(credentials.email, credentials.password);

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
