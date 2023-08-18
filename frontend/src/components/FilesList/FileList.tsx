import React, { useEffect, useMemo, useState } from 'react'
import api from "../../api/files"
import ListRow from '../ListRow/ListRow';
import Fuse from 'fuse.js';
import "./FileList.scss"
const FileList = () => {

    const [data, setData] = useState([])
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        api
            .getFiles()
            .then((request) => request.data)
            .then((files) => {
                setData(files);
            })
            .catch(console.error);
    }, []);



    const rows = useMemo(() => {
        const fuse = new Fuse(data);
        const filteredRows = (searchTerm && searchTerm.length > 0) ? fuse.search(searchTerm).map(({ item }) => item) : data;
        return filteredRows.map((file) => <ListRow path={file} key={file} />);
    }, [data, searchTerm])


    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }
    const test = () => {

        console.log(fuse.search("2"));
    }

    return (
        <div className="file-list">
            <div className="file-list-header">
                <h2>My Notes</h2>
                <input placeholder="Search..." type="text" onChange={handleChange} />
            </div>
            <div className="file-list-list">
                {rows ? rows : <></>}
            </div>

        </div >
    )
}

export default FileList