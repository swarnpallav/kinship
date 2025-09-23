import { useQuery } from '@tanstack/react-query'
import { mockApi } from '../services/mockApi'
import { MatchWithDetails, Message } from '../types'

export function useMatches() {
  // Get all matches
  const matchesQuery = useQuery({
    queryKey: ['matches'],
    queryFn: mockApi.matches.list,
    staleTime: 30 * 1000, // 30 seconds - matches update frequently
  })

  return {
    matchesQuery,
    // Convenience getters
    matches: matchesQuery.data || [],
    isLoading: matchesQuery.isLoading,
    error: matchesQuery.error,
  }
}

export function useMatchMessages(matchId: string) {
  // Get messages for a specific match
  const messagesQuery = useQuery({
    queryKey: ['matches', matchId, 'messages'],
    queryFn: () => mockApi.matches.messages(matchId),
    enabled: !!matchId,
    staleTime: 10 * 1000, // 10 seconds - messages should be fresh
  })

  return {
    messagesQuery,
    // Convenience getters
    messages: messagesQuery.data || [],
    isLoading: messagesQuery.isLoading,
    error: messagesQuery.error,
  }
}
