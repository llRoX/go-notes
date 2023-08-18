
import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:8080",

});


function getFiles() {
    return instance.get("/files")
}

function getFile(path) {
    return instance.get(`/files/${path}`);
}


const api = {
    getFiles,
    getFile
}

export default api;