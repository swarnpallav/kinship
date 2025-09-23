import { client } from './client'

export const ProfileService = {
  get: (userId: string) => client.get(`/profiles/${userId}`).then(r => r.data),
  update: (userId: string, payload: Record<string, unknown>) =>
    client.patch(`/profiles/${userId}`, payload).then(r => r.data),
}
