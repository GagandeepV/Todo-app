import React, { useState } from 'react'


const Add = ({ addFunc }) => {
    const [input, setInput] = useState('')

    return (
        <div>
            <form onClick={(e) => e.preventDefault()} >
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                <button onClick={() => { addFunc(input); setInput('') }} >+</button>
            </form>
        </div>
    )
}

export default Add