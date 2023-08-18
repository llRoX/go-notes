import React, { useEffect, useMemo, useState } from 'react'
import api from "../../api/files"
import ListRow from '../ListRow/ListRow';
import Fuse from 'fuse.js';
import "./FileList.scss"

interface props {
    onClickFile: (path: string) => void
};

const FileList = ({ onClickFile }: props) => {

    const [data, setData] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true);
        api
            .getFiles()
            .then((request) => request.data)
            .then((files) => {
                setData(files);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);




    const rows = useMemo(() => {
        const fuse = new Fuse(data);
        const filteredRows = (searchTerm && searchTerm.length > 0) ? fuse.search(searchTerm).map(({ item }) => item) : data;
        return filteredRows.map((file) => <ListRow path={file} key={file} onClick={() => onClickFile(file)} />);
    }, [data, searchTerm])


    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const listAreaContent = () => {


        if (loading) {
            return (
                <div className="file-list-loading">
                    <h2>Loading...</h2>
                </div>
            );
        }
        if (rows && rows.length > 0) {
            return rows;
        }

        return (
            <div className="file-list-empty">
                <h2>No Rows Found</h2>
            </div>
        );
    };

    return (
        <div className="file-list">
            <div className="file-list-header">
                <h2>My Notes</h2>
                <input placeholder="Search..." type="text" onChange={handleChange} />
            </div>
            <div className="file-list-list">
                {listAreaContent()}
            </div>

        </div >
    )
}

export default FileList;