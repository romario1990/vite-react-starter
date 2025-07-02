import { createContext, useContext } from 'react'

export function createGenericContext<T>() {
  const context = createContext<T | undefined>(undefined)

  const useGenericContext = () => {
    const value = useContext(context)
    if (!value) {
      throw new Error('useGenericContext must be used within a Provider')
    }
    return value
  }

  return [useGenericContext, context.Provider] as const
}
