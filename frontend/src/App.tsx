import { useState } from 'react'

import './App.css'
import Header from './components/Header/Header'
import FileList from './components/FilesList/FileList'
import FileEditor from './components/FileEditor/FileEditor';
function App() {

  const [activeFilePath, setActiveFilePath] = useState<string | null>();
  const onClickFile = (path: string) => {
    setActiveFilePath(path);
  }


  const correctView = () => {
    if (!activeFilePath) {
      return <FileList onClickFile={onClickFile} />
    }

    return <FileEditor path={activeFilePath} />


  }

  return (
    <>
      <Header />
      <div className="file-area">
        {correctView()}
      </div>
    </>
  )
}

export default App
