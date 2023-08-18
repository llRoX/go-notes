import { useState } from 'react'

import './App.css'
import Header from './components/Header/Header'
import FileList from './components/FilesList/FileList'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <div className="file-area">
        <FileList />
      </div>
    </>
  )
}

export default App
