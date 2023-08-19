
import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:8080",

});


function getFiles() {
    return instance.get("/files")
}

function getFile(path: string) {
    return instance.get(`/files/${path}`);
}

function patchFile(path: string, markdown: string) {
    return instance.patch(`/files/${path}`, {
        markdown: markdown
    });
}


const api = {
    getFiles,
    getFile,
    patchFile
}

export default api;