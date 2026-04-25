
import './App.css'
import { Main } from './components/Main/Main'
import { useState } from 'react'
function App() {
  const [isAdmin, setIsAdmin] = useState(false)

  return (
    <>
      <button onClick={()=>setIsAdmin(!isAdmin)}>Przełącz na {(isAdmin)? "Użytkownika" : "Administratora"}</button>
      <Main isAdmin={isAdmin} />    
    </>
  )
}
export default App
