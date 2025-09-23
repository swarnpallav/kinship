import { client } from './client'

export const DiscoverService = {
  feed: () => client.get('/discover/feed').then(r => r.data),
  like: (profileId: string) =>
    client.post(`/discover/${profileId}/like`).then(r => r.data),
  pass: (profileId: string) =>
    client.post(`/discover/${profileId}/pass`).then(r => r.data),
}
