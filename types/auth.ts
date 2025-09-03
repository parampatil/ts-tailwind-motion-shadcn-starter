// Authentication related types
export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: "admin" | "user" | "moderator";
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends AuthCredentials {
  name: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export type UserRole = User["role"];

export interface RouteGuardProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  fallbackPath?: string;
  showLoading?: boolean;
}
