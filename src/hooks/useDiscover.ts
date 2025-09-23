import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { mockApi } from '../services/mockApi'
import { notificationService } from '../services'
import { Profile } from '../types'

export function useDiscover() {
  const queryClient = useQueryClient()

  // Get discover feed
  const feedQuery = useQuery({
    queryKey: ['discover', 'feed'],
    queryFn: mockApi.discover.feed,
    staleTime: 2 * 60 * 1000, // 2 minutes - profiles don't change often
  })

  // Like a profile
  const likeMutation = useMutation({
    mutationFn: (profileId: string) => mockApi.discover.like(profileId),
    onSuccess: data => {
      // Remove the liked profile from the feed
      queryClient.setQueryData(
        ['discover', 'feed'],
        (oldData: Profile[] | undefined) => {
          return oldData?.filter(profile => profile.id !== data.profileId) || []
        }
      )

      // If it's a match, invalidate matches and send notification
      if (data.isMatch) {
        queryClient.invalidateQueries({ queryKey: ['matches'] })

        // Send match notification
        const likedProfile = (
          queryClient.getQueryData(['discover', 'feed']) as Profile[]
        )?.find(profile => profile.id === data.profileId)

        if (likedProfile) {
          notificationService.sendMatchNotification(
            likedProfile.userId || 'Someone'
          )
        }

        console.log("🎉 It's a match!")
      }
    },
    onError: error => {
      console.error('Like failed:', error)
    },
  })

  // Pass on a profile
  const passMutation = useMutation({
    mutationFn: (profileId: string) => mockApi.discover.pass(profileId),
    onSuccess: data => {
      // Remove the passed profile from the feed
      queryClient.setQueryData(
        ['discover', 'feed'],
        (oldData: Profile[] | undefined) => {
          return oldData?.filter(profile => profile.id !== data.profileId) || []
        }
      )
    },
    onError: error => {
      console.error('Pass failed:', error)
    },
  })

  return {
    feedQuery,
    likeMutation,
    passMutation,
    // Convenience getters
    profiles: feedQuery.data || [],
    isLoading: feedQuery.isLoading,
    isLiking: likeMutation.isPending,
    isPassing: passMutation.isPending,
  }
}
