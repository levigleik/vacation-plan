import { UserApiProps } from "@/types/models/user"

export interface FormLoginProps {
  email: string
  password: string
}
export interface LoginResponseProps {
  idToken: string
  refreshToken: string
  user: UserApiProps
}