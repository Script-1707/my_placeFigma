import { createContext, useContext, useState, type ReactNode } from 'react'
import type { PerfilUtilizador } from '../data/mock'

interface AuthUser {
  id: string
  nome: string
  email: string
  perfil: PerfilUtilizador
  token: string
}

interface AuthContextType {
  user: AuthUser | null
  login: (user: AuthUser) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem('myplace_user')
    return stored ? JSON.parse(stored) : null
  })

  function login(u: AuthUser) {
    setUser(u)
    localStorage.setItem('myplace_user', JSON.stringify(u))
    localStorage.setItem('myplace_token', u.token)
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('myplace_user')
    localStorage.removeItem('myplace_token')
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
