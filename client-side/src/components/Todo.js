import React, { useState } from 'react'

const Todo = ({ id, text, status, delFunc, doneFunc, editFunc }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(text)

    const content = isEditing
        ? (<input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} />)
        : (<span style={status ? { color: "Green" } : { color: "red" }} >{text}</span>)

    return (
        <div>
            {content}
            <button onClick={() => { setIsEditing(!isEditing); editFunc(id, editText) }} >{isEditing ? "Save" : "Edit"}</button>
            <button onClick={() => delFunc(id)} >&#10060;</button>
            <button onClick={() => doneFunc(id)} >&#10004;</button>
        </div>
    )
}

export default Todo
