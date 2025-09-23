import { client } from './client'

export const ChatService = {
  rooms: () => client.get('/chat/rooms').then(r => r.data),
  messages: (roomId: string) =>
    client.get(`/chat/rooms/${roomId}/messages`).then(r => r.data),
  send: (roomId: string, content: string) =>
    client
      .post(`/chat/rooms/${roomId}/messages`, { content })
      .then(r => r.data),
}
