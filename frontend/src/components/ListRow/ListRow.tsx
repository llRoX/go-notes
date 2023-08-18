import React from 'react'
import "./ListRow.scss"
interface props {
    path: string
    onClick: (path: string) => void
}


const ListRow = ({ path, onClick }: props) => {
    return (
        <div className="list-row" onClick={onClick}>{path}</div>
    )
}

export default ListRow