import type { JWT } from 'next-auth/jwt'
import type { Session, User } from 'next-auth'

type UserId = string

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId
    role: Role
  }
}

declare module 'next-auth' {
  enum Role {
    Member,
    Admin,
  }

  interface User {
    id: string
    email: string
    name: string
    image: string
    role: Role
  }
  interface Session {
    expires: string
    user: User
    userId: string
  }
}
