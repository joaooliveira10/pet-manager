import api from './api';
import { AuthRequestDto, AuthResponseDto } from '@/types';

export const authService = {
  /**
   * Realiza login do usuário
   */
  async login(credentials: AuthRequestDto): Promise<AuthResponseDto> {
    const response = await api.post<AuthResponseDto>('/autenticacao/login', credentials);
    return response.data;
  },

  /**
   * Renova o token de acesso usando o refresh token
   */
  async refresh(): Promise<AuthResponseDto> {
    const refreshToken = localStorage.getItem('refresh_token');
    const response = await api.put<AuthResponseDto>(
      '/autenticacao/refresh',
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    return response.data;
  },

  /**
   * Salva tokens no localStorage
   */
  saveTokens(authResponse: AuthResponseDto): void {
    localStorage.setItem('access_token', authResponse.access_token);
    localStorage.setItem('refresh_token', authResponse.refresh_token);
    localStorage.setItem(
      'expires_at',
      String(Date.now() + authResponse.expires_in * 1000)
    );
  },

  /**
   * Remove tokens do localStorage (logout)
   */
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expires_at');
  },

  /**
   * Verifica se o usuário está autenticado
   */
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    
    const token = localStorage.getItem('access_token');
    const expiresAt = localStorage.getItem('expires_at');
    
    if (!token || !expiresAt) return false;
    
    return Date.now() < parseInt(expiresAt);
  },

  /**
   * Obtém o token de acesso atual
   */
  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('access_token');
  },
};
