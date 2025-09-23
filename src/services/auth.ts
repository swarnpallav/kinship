import { client } from './client'

export const AuthService = {
  login: (email: string, password: string) =>
    client.post('/auth/login', { email, password }).then(r => r.data),
  register: (payload: { email: string; password: string; name: string }) =>
    client.post('/auth/register', payload).then(r => r.data),
  me: () => client.get('/auth/me').then(r => r.data),
  logout: () => client.post('/auth/logout').then(r => r.data),
}
