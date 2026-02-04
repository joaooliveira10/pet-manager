'use client'

import { authService } from '@/services'
import { AuthRequestDto, AuthState } from '@/types'
import { useRouter } from 'next/navigation'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: AuthRequestDto) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    expiresAt: null,
  })

  // Marca quando o componente foi montado no cliente
  useEffect(() => {
    setMounted(true)
  }, [])

  // Verificar autenticação ao carregar (somente no cliente)
  useEffect(() => {
    if (!mounted) return

    const checkAuth = () => {
      const isAuth = authService.isAuthenticated()
      setAuthState((prev) => ({
        ...prev,
        isAuthenticated: isAuth,
        accessToken: authService.getAccessToken(),
      }))
      setIsLoading(false)
    }

    checkAuth()
  }, [mounted])

  const login = useCallback(
    async (credentials: AuthRequestDto) => {
      try {
        setIsLoading(true)
        const response = await authService.login(credentials)
        authService.saveTokens(response)

        setAuthState({
          isAuthenticated: true,
          accessToken: response.access_token,
          refreshToken: response.refresh_token,
          expiresAt: Date.now() + response.expires_in * 1000,
        })

        router.push('/')
      } catch (error) {
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [router],
  )

  const logout = useCallback(() => {
    authService.logout()
    setAuthState({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
    })
    router.push('/login')
  }, [router])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
