import { ReactNode, useCallback, useState } from 'react'
import { createGenericContext } from '../createGenericContext'
import { User } from '../../types/user/user'
import { getAllUsers } from '../../api/user/usersApi'

export interface UserListContextType {
  users: User[]
  setUsers: (users: User[]) => void
  fetchUsers: () => Promise<void>
}

const [useUserListContext, UserListContextProvider] = createGenericContext<UserListContextType>()

export const UserListProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([])

  const fetchUsers = useCallback(async () => {
    const data = await getAllUsers()
    setUsers(data)
  }, [])

  return (
    <UserListContextProvider value={{ users, setUsers, fetchUsers }}>
      {children}
    </UserListContextProvider>
  )
}

export { useUserListContext }
