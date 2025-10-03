import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { GoogleAuthService, GoogleUser } from '../services/googleAuth'
import { User } from '../types'

export function useAuth() {
  const queryClient = useQueryClient()

  // Google Sign-in mutation
  const googleSignInMutation = useMutation({
    mutationFn: async (): Promise<GoogleUser> => {
      const googleAuthService = GoogleAuthService.getInstance()
      return await googleAuthService.signInWithGoogle()
    },
    onSuccess: (googleUser: GoogleUser) => {
      // Convert GoogleUser to User and update cache
      const user: User = {
        id: googleUser.id,
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
      }
      queryClient.setQueryData(['auth', 'me'], user)
    },
    onError: error => {
      console.error('Google sign-in failed:', error)
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
    googleSignInMutation,
    logoutMutation,
  }
}
