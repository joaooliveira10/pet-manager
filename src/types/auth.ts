// Tipos para Autenticação

export interface AuthRequestDto {
  username: string;
  password: string;
}

export interface AuthResponseDto {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
}
