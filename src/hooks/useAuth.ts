import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AuthService } from '../services/auth'
import { User } from '../types'

export function useAuth() {
  const queryClient = useQueryClient()

  // Send OTP mutation
  const sendOTPMutation = useMutation({
    mutationFn: async (email: string): Promise<void> => {
      return await AuthService.sendOTP(email)
    },
    onError: error => {
      console.error('Send OTP failed:', error)
    },
  })

  // Verify OTP mutation
  const verifyOTPMutation = useMutation({
    mutationFn: async (params: {
      email: string
      otp: string
    }): Promise<any> => {
      return await AuthService.verifyOTP(params.email, params.otp)
    },
    onSuccess: (data: any) => {
      // Update user cache after successful verification
      if (data.user) {
        queryClient.setQueryData(['auth', 'me'], data.user)
      }
    },
    onError: error => {
      console.error('Verify OTP failed:', error)
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
    sendOTPMutation,
    verifyOTPMutation,
    logoutMutation,
  }
}
