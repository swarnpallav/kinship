import { client } from './client'

export const AuthService = {
  sendOTP: (email: string) =>
    client.post('/auth/send-otp', { email }).then(r => r.data),
  verifyOTP: (email: string, otp: string) =>
    client.post('/auth/verify-otp', { email, otp }).then(r => r.data),
  me: () => client.get('/auth/me').then(r => r.data),
  logout: () => client.post('/auth/logout').then(r => r.data),
}
