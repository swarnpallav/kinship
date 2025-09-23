import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { mockApi } from '../services/mockApi'
import { Profile } from '../types'

export function useProfile(userId: string) {
  const queryClient = useQueryClient()

  // Get profile data
  const profileQuery = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => mockApi.profile.get(userId),
    enabled: !!userId,
  })

  // Update profile mutation
  const updateMutation = useMutation({
    mutationFn: (payload: Partial<Profile>) =>
      mockApi.profile.update(userId, payload),
    onSuccess: updatedProfile => {
      // Update the cache with new profile data
      queryClient.setQueryData(['profile', userId], updatedProfile)

      // Also invalidate related queries that might show profile info
      queryClient.invalidateQueries({ queryKey: ['discover'] })
      queryClient.invalidateQueries({ queryKey: ['matches'] })
    },
    onError: error => {
      console.error('Profile update failed:', error)
    },
  })

  return {
    profileQuery,
    updateMutation,
    // Convenience getters
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    isUpdating: updateMutation.isPending,
  }
}
