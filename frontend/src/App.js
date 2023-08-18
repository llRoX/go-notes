import './App.css';
import api from "./api/files"
import { useState, useEffect } from 'react';
function App() {

  const [files, setFiles] = useState([]);

  useEffect(() => {
    api.getFiles()
      .then((request) => request.data)
      .then((data) => data.map((item) => <p>{item}</p>))
      .then((files) => setFiles(files))
      .catch((e) => console.log(e));


  }, [])


  return (
    <div className="App">
      <div>{files}</div>
    </div>
  );
}

export default App;
