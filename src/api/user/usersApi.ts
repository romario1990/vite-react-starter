import { User } from '../../types/user/user'
import { apiGet, apiPost, apiPut, apiPatch, apiDelete } from '../ApiClientGeneric'

const USER_PATH = '/users'

export const getAllUsers = async (): Promise<User[]> => {
  return await apiGet<User[]>(USER_PATH)
}

export const createUser = async (user: Partial<User>): Promise<User> => {
  return await apiPost<User, Partial<User>>(USER_PATH, user)
}

export const updateUser = async (id: number, user: User): Promise<User> => {
  return await apiPut<User, User>(`${USER_PATH}/${id}`, user)
}

export const patchUser = async (id: number, user: Partial<User>): Promise<User> => {
  return await apiPatch<User, Partial<User>>(`${USER_PATH}/${id}`, user)
}

export const deleteUser = async (id: number): Promise<boolean> => {
  return await apiDelete(`${USER_PATH}/${id}`)
}
