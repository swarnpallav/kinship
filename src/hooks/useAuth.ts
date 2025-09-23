import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { mockApi } from '../services/mockApi'
import { AuthResponse, User } from '../types'

export function useAuth() {
  const queryClient = useQueryClient()

  // Get current user
  const meQuery = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: mockApi.auth.me,
    retry: false,
  })

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      mockApi.auth.login(email, password),
    onSuccess: (data: AuthResponse) => {
      // Update the user cache
      queryClient.setQueryData(['auth', 'me'], data.user)
      // Store tokens would happen in AuthContext
    },
    onError: error => {
      console.error('Login failed:', error)
    },
  })

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: ({
      email,
      password,
      name,
    }: {
      email: string
      password: string
      name: string
    }) => mockApi.auth.register({ email, password, name }),
    onSuccess: (data: AuthResponse) => {
      queryClient.setQueryData(['auth', 'me'], data.user)
    },
  })

  // Refresh token mutation
  const refreshTokenMutation = useMutation({
    mutationFn: (refreshToken: string) =>
      mockApi.auth.refreshToken(refreshToken),
    onSuccess: data => {
      // Tokens would be updated in AuthContext
      console.log('Token refreshed:', data)
    },
  })

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      // Clear all auth-related queries
      queryClient.removeQueries({ queryKey: ['auth'] })
      queryClient.removeQueries({ queryKey: ['profile'] })
      queryClient.removeQueries({ queryKey: ['matches'] })
      queryClient.removeQueries({ queryKey: ['discover'] })
      return Promise.resolve()
    },
  })

  return {
    meQuery,
    loginMutation,
    registerMutation,
    refreshTokenMutation,
    logoutMutation,
  }
}
