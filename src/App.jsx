import { useCallback, useEffect, useState } from 'react'
import './App.css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useUserListContext } from './contexts/user/UserListContext'

function App() {
  const { users, fetchUsers, setUsers } = useUserListContext()

  useEffect(() => {
    fetchUsers()}, [fetchUsers])

  const handleLoadUsers = useCallback(async () => {
    await fetchUsers()
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      <button style={{ marginRight: 10 }} onClick={() => setUsers()}>
        Clean
      </button>
      
      <div className="card">
        <button onClick={handleLoadUsers}>Load user</button>
      </div>
      {users?.length > 0 && (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <strong>{user.name}</strong> – {user.email}
            </li>
          ))}
        </ul>
      )} 
      
    </>
  )
}

export default App
