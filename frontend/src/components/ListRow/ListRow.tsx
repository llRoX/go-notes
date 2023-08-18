import React from 'react'
import "./ListRow.scss"
interface props {
    path: string
}


const ListRow = ({ path }: props) => {
    return (
        <div className="list-row">{path}</div>
    )
}

export default ListRow