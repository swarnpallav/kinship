import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { mockApi } from '../services/mockApi'
import { Message } from '../types'
import { useEffect } from 'react'

export function useChat(roomId?: string) {
  const queryClient = useQueryClient()

  // Get messages for a specific room/match
  const messagesQuery = useQuery({
    queryKey: ['chat', 'messages', roomId],
    queryFn: () => (roomId ? mockApi.matches.messages(roomId) : []),
    enabled: !!roomId,
    staleTime: 5 * 1000, // 5 seconds - chat messages should be fresh
    refetchInterval: 10 * 1000, // Poll every 10 seconds for new messages
  })

  // Send message mutation
  const sendMutation = useMutation({
    mutationFn: ({ roomId, content }: { roomId: string; content: string }) =>
      mockApi.chat.sendMessage(roomId, content),
    onSuccess: newMessage => {
      // Optimistically update the messages cache
      queryClient.setQueryData(
        ['chat', 'messages', roomId],
        (oldMessages: Message[] | undefined) => {
          return [...(oldMessages || []), newMessage]
        }
      )

      // Also update the matches cache with the new last message
      queryClient.invalidateQueries({ queryKey: ['matches'] })

      // Simulate incoming response message
      if (roomId) {
        mockApi.chat.simulateIncomingMessage(roomId)
      }
    },
    onError: error => {
      console.error('Send message failed:', error)
    },
  })

  // Simulate WebSocket connection for real-time updates
  useEffect(() => {
    if (!roomId) return

    // In a real app, this would be a WebSocket connection
    const interval = setInterval(() => {
      // Refetch messages to simulate real-time updates
      queryClient.invalidateQueries({ queryKey: ['chat', 'messages', roomId] })
    }, 15000) // Check for new messages every 15 seconds

    return () => clearInterval(interval)
  }, [roomId, queryClient])

  return {
    messagesQuery,
    sendMutation,
    // Convenience getters
    messages: messagesQuery.data || [],
    isLoading: messagesQuery.isLoading,
    isSending: sendMutation.isPending,
    error: messagesQuery.error,
  }
}
