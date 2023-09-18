export interface SignInInput {
  email: string
  password: string
}

export interface SignUpResult {
  accessToken: string
}

export interface Admin {
  id: number
  username: string
  email: string
  registeredAt: string
}
