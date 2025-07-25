export interface FormLoginProps {
  email: string
  password: string
}
export interface LoginResponseProps {
  idToken: string
  refreshToken: string
  user: {
    email: string
    userId: number
    name: string
    photo?: string
  }
}
